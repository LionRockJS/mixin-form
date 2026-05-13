import querystring from 'node:querystring';
import { ControllerMixin, ControllerState } from '@lionrockjs/mvc';
import MultipartParser from '../MultipartParser.mjs';
export default class MultipartForm extends ControllerMixin {
    static POST_DATA = '$_POST';
    static GET_DATA = '$_GET';
    static REQUEST_DATA = '$_REQUEST';
    static async setup(state) {
        const request = state.get(ControllerState.REQUEST);
        state.set(this.GET_DATA, request.query || {});
        state.set(this.REQUEST_DATA, { ...state.get(this.GET_DATA) });
        const isWebRequest = typeof request.raw?.formData === 'function';
        if (isWebRequest) {
            const raw = request.raw;
            const contentType = raw.headers.get('content-type') || '';
            if (/multipart\/form-data/.test(contentType)) {
                request.body = await MultipartParser.parseWebRequest(raw);
            }
            else if (/application\/json/.test(contentType)) {
                request.body = JSON.parse(request.body);
            }
        }
        else {
            if (request.raw?.headers && /multipart\/form-data/.test(request.raw.headers['content-type'])) {
                await new Promise(resolve => {
                    MultipartParser.parse(request.raw, body => {
                        request.body = body;
                        resolve();
                    });
                });
            }
            if (request.raw?.headers && /application\/json/.test(request.raw.headers['content-type'])) {
                request.body = JSON.parse(request.body);
            }
        }
        if (!request.body)
            return;
        const postData = (typeof request.body === 'object')
            ? ({ ...request.body })
            : querystring.parse(request.body, '&', '=', { maxKeys: 65536 });
        //check post data key, change [] to array
        Object.keys(postData).forEach(key => {
            if (!/\[\]$/.test(key))
                return;
            postData[key.replace('[]', '')] = Array.isArray(postData[key]) ? postData[key] : [postData[key]];
        });
        Object.keys(postData).forEach(key => {
            const m = key.match(/^([^\[]+)\[([\w-_:]+)]$/);
            if (!m)
                return;
            postData[m[1]] = postData[m[1]] || {};
            postData[m[1]][m[2]] = postData[key];
        });
        state.set(this.POST_DATA, postData);
        state.set(this.REQUEST_DATA, { ...state.get(this.POST_DATA), ...state.get(this.GET_DATA) });
    }
}
