// Cloudflare Worker R2 adapter for multipart form uploads
// Implements the WebFileParser interface expected by MultipartForm.fileAdapter.
// Usage: MultipartForm.fileAdapter = MultipartParserR2;
export default class MultipartParserR2 {
    /** Standard WebFileParser interface — delegates to parseWebRequestToR2 */
    static async parseWebRequest(request, env) {
        return this.parseWebRequestToR2(request, env);
    }
    static async parseWebRequestToR2(request, env) {
        const contentType = request.headers.get('content-type') || '';
        if (!/^multipart\/form-data/.test(contentType))
            return {};
        if (!env || !env.FORM_UPLOADS)
            throw new Error('R2 binding FORM_UPLOADS missing');
        const formData = await request.formData();
        const body = {};
        for (const [name, value] of formData.entries()) {
            if (typeof value !== 'string') {
                // File upload
                const fileValue = value;
                if (!fileValue.name)
                    continue;
                const r2Key = `${Date.now()}-${Math.random().toString(36).slice(2)}-${fileValue.name}`;
                const putRes = await env.FORM_UPLOADS.put(r2Key, fileValue.stream ? fileValue.stream() : fileValue, {
                    httpMetadata: {
                        contentType: fileValue.type,
                        contentDisposition: `inline; filename="${fileValue.name}"`,
                    },
                });
                const fileEntry = {
                    r2Key,
                    filename: fileValue.name,
                    encoding: 'binary',
                    mimetype: fileValue.type,
                    size: fileValue.size || 0,
                };
                if (/\[]$/.test(name)) {
                    const k = name.replace('[]', '');
                    body[k] = body[k] ?? [];
                    body[k].push(fileEntry);
                }
                else {
                    body[name] = fileEntry;
                }
            }
            else {
                if (/\[]$/.test(name)) {
                    const k = name.replace('[]', '');
                    body[k] = body[k] ?? [];
                    body[k].push(value);
                }
                else {
                    body[name] = value;
                }
            }
        }
        return body;
    }
}
