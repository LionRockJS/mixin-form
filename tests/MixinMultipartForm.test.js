import { Controller } from '@lionrockjs/mvc';
import ControllerMixinMultipartForm from "../classes/controller-mixin/MultipartForm";

class C extends Controller {
  static mixins = [ControllerMixinMultipartForm];

  constructor(request) {
    super(request);

  }
}

describe('Controller Mixin Multipart Form test', () => {
  test('constructor', async () => {
    const c = new C({ raw: { url: '/articles/recent.aspx' }, body: '' });

    try {
      await c.execute();
      expect('no error').toBe('no error');
    } catch (e) {
      expect('should not run this').toBe('');
    }
  });

  test('get data', async ()=>{
    const c = new C({
      raw: { url: '/articles/recent.aspx?foo=bar' },
      query: {foo:'bar'},
      body: 'hello=world&tar=sha' }
    );
    await c.execute();
    const $_GET = c.state.get(ControllerMixinMultipartForm.GET_DATA);
    expect($_GET['foo']).toBe('bar');
  })

  test('post data', async ()=>{
    const c = new C({
      raw: { url: '/articles/recent.aspx?foo=bar' },
      query: {foo:'bar'},
      body: 'hello=world&tar=sha' }
    );
    await c.execute();
    const $_POST = c.state.get(ControllerMixinMultipartForm.POST_DATA);
    expect($_POST['hello']).toBe('world');
    expect($_POST['tar']).toBe('sha');
  });

  test('post array data', async ()=>{
    const c = new C({
      raw: { url: '/articles/recent.aspx?foo=bar' },
      query: {foo:'bar'},
      body: 'hello=world&tar=sha&ka[]=1&ka[]=2&ka[]=3' }
    );
    await c.execute();
    const $_POST = c.state.get(ControllerMixinMultipartForm.POST_DATA);
    expect($_POST['hello']).toBe('world');
    expect($_POST['tar']).toBe('sha');

    expect(Array.isArray($_POST['ka'])).toBe(true);
    expect($_POST['ka'].length).toBe(3);
    expect($_POST['ka'][0]).toBe('1');
    expect($_POST['ka'][1]).toBe('2');
    expect($_POST['ka'][2]).toBe('3');
  })

  test('post array object data', async ()=>{
    const c = new C({
      raw: { url: '/articles/recent.aspx?foo=bar' },
      query: {foo:'bar'},
      body: 'hello=world&info[abc]=1&info[bc_d]=2&info[ef-g]=3&info[hi:j]=4' }
    );
    await c.execute();
    const $_POST = c.state.get(ControllerMixinMultipartForm.POST_DATA);
    expect($_POST['hello']).toBe('world');
    expect($_POST.info['abc']).toBe('1');
    expect($_POST.info['bc_d']).toBe('2');
    expect($_POST.info['ef-g']).toBe('3');
    expect($_POST.info['hi:j']).toBe('4');
  })

  test('post object data', async ()=>{
    const c = new C({
      raw: { url: '/articles/recent.aspx?foo=bar' },
      query: {foo:'bar'},
      body: 'hello=world&tar=sha&ka[one]=1&ka[two]=2&ka[three]=3' }
    );
    await c.execute();
    const $_POST = c.state.get(ControllerMixinMultipartForm.POST_DATA);
    expect($_POST['hello']).toBe('world');
    expect($_POST['tar']).toBe('sha');

    expect($_POST['ka'].one).toBe('1');
    expect($_POST['ka'].two).toBe('2');
    expect($_POST['ka'].three).toBe('3');
  })
});
