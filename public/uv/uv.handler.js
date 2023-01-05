if (!self.__uv) {
    __uvHook(self, self.__uv$config, self.__uv$config.bare);
};

async function __uvHook(window, config = {}, bare = '/bare/') {
    if ('__uv' in window && window.__uv instanceof Ultraviolet) return false;

    if (window.document && !!window.window) {
        window.document.querySelectorAll("script[__uv-script]").forEach(node => node.remove())
    };

    const worker = !window.window;
    const master = '__uv';
    const methodPrefix = '__uv$';
    const __uv = new Ultraviolet({
        ...config,
        window,
    });

    if (typeof config.construct === 'function') {
        config.construct(__uv, worker ? 'worker' : 'window');
    };

    const { client } = __uv;
    const {
        HTMLMediaElement,
        HTMLScriptElement,
        HTMLAudioElement,
        HTMLVideoElement,
        HTMLInputElement,
        HTMLEmbedElement,
        HTMLTrackElement,
        HTMLAnchorElement,
        HTMLIFrameElement,
        HTMLAreaElement,
        HTMLLinkElement,
        HTMLBaseElement,
        HTMLFormElement,
        HTMLImageElement,
        HTMLSourceElement,
    } = window;

    client.nativeMethods.defineProperty(window, '__uv', {
        value: __uv,
        enumerable: false,
    });


    __uv.meta.origin = location.origin;
    __uv.location = client.location.emulate(
        (href) => {
            if (href === 'about:srcdoc') return new URL(href);
            if (href.startsWith('blob:')) href = href.slice('blob:'.length);
            return new URL(__uv.sourceUrl(href));
        },
        (href) => {
            return __uv.rewriteUrl(href);
        },
    );

    __uv.cookieStr = window.__uv$cookies || '';
    __uv.meta.url = __uv.location;
    __uv.domain = __uv.meta.url.host;
    __uv.blobUrls = new window.Map();
    __uv.referrer = '';
    __uv.cookies = [];
    __uv.localStorageObj = {};
    __uv.sessionStorageObj = {};

    try {
        __uv.bare = new URL(bare, window.location.href);
    } catch(e) {
        __uv.bare = window.parent.__uv.bare;
    };

    if (__uv.location.href === 'about:srcdoc') {
        __uv.meta = window.parent.__uv.meta;
    };

    if (window.EventTarget) {
        __uv.addEventListener = window.EventTarget.prototype.addEventListener;
        __uv.removeListener = window.EventTarget.prototype.removeListener;
        __uv.dispatchEvent = window.EventTarget.prototype.dispatchEvent;
    };

    // Storage wrappers
    client.nativeMethods.defineProperty(client.storage.storeProto, '__uv$storageObj', {
        get() {
            if (this === client.storage.sessionStorage) return __uv.sessionStorageObj;
            if (this === client.storage.localStorage) return __uv.localStorageObj;
        },
        enumerable: false,
    });

    if (window.localStorage) {
        for (const key in window.localStorage) {
            if (key.startsWith(methodPrefix + __uv.location.origin + '@')) {
                __uv.localStorageObj[key.slice((methodPrefix + __uv.location.origin + '@').length)] = window.localStorage.getItem(key);
            };
        };

        __uv.lsWrap = client.storage.emulate(client.storage.localStorage, __uv.localStorageObj);
    };

    if (window.sessionStorage) {
        for (const key in window.sessionStorage) {
            if (key.startsWith(methodPrefix + __uv.location.origin + '@')) {
                __uv.sessionStorageObj[key.slice((methodPrefix + __uv.location.origin + '@').length)] = window.sessionStorage.getItem(key);
            };
        };

        __uv.ssWrap = client.storage.emulate(client.storage.sessionStorage, __uv.sessionStorageObj);
    };



    let rawBase = window.document ? client.node.baseURI.get.call(window.document) : window.location.href;
    let base = __uv.sourceUrl(rawBase);

    client.nativeMethods.defineProperty(__uv.meta, 'base', {
        get() {
            if (!window.document) return __uv.meta.url.href;

            if (client.node.baseURI.get.call(window.document) !== rawBase) {
                rawBase = client.node.baseURI.get.call(window.document);
                base = __uv.sourceUrl(rawBase);
            };

            return base;
        },
    });


    __uv.methods = {
        setSource: methodPrefix + 'setSource',
        source: methodPrefix + 'source',
        location: methodPrefix + 'location',
        function: methodPrefix + 'function',
        string: methodPrefix + 'string',
        eval: methodPrefix + 'eval',
        parent: methodPrefix + 'parent',
        top: methodPrefix + 'top',
    };

    __uv.filterKeys = [
        master,
        __uv.methods.setSource,
        __uv.methods.source,
        __uv.methods.location,
        __uv.methods.function,
        __uv.methods.string,
        __uv.methods.eval,
        __uv.methods.parent,
        __uv.methods.top,
        methodPrefix + 'protocol',
        methodPrefix + 'storageObj',
        methodPrefix + 'url',
        methodPrefix + 'modifiedStyle',
        methodPrefix + 'config',
        methodPrefix + 'dispatched',
        'Ultraviolet',
        '__uvHook',
    ];


    client.on('wrap', (target, wrapped) => {
        client.nativeMethods.defineProperty(wrapped, 'name', client.nativeMethods.getOwnPropertyDescriptor(target, 'name'));
        client.nativeMethods.defineProperty(wrapped, 'length', client.nativeMethods.getOwnPropertyDescriptor(target, 'length'));

        client.nativeMethods.defineProperty(wrapped, __uv.methods.string, {
            enumerable: false,
            value: client.nativeMethods.fnToString.call(target),
        });

        client.nativeMethods.defineProperty(wrapped, __uv.methods.function, {
            enumerable: false,
            value: target,
        });
    });

    client.fetch.on('request', event => {
        event.data.input = __uv.rewriteUrl(event.data.input);
    });

    client.fetch.on('requestUrl', event => {
        event.data.value = __uv.sourceUrl(event.data.value);
    });

    client.fetch.on('responseUrl', event => {
        event.data.value = __uv.sourceUrl(event.data.value);
    });

    // XMLHttpRequest
    client.xhr.on('open', event => {
        event.data.input = __uv.rewriteUrl(event.data.input);
    });

    client.xhr.on('responseUrl', event => {
        event.data.value = __uv.sourceUrl(event.data.value);
    });


    // Workers
    client.workers.on('worker', event => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });

    client.workers.on('addModule', event => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });

    client.workers.on('importScripts', event => {
        for (const i in event.data.scripts) {
            event.data.scripts[i] = __uv.rewriteUrl(event.data.scripts[i]);
        };
    });

    client.workers.on('postMessage', event => {
        let to = event.data.origin;

        event.data.origin = '*';
        event.data.message = {
            __data: event.data.message,
            __origin: __uv.meta.url.origin,
            __to: to,
        };
    });

    // Navigator
    client.navigator.on('sendBeacon', event => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });

    // Cookies
    client.document.on('getCookie', event => {
        event.data.value = __uv.cookieStr;
    });

    client.document.on('setCookie', event => {
        Promise.resolve(__uv.cookie.setCookies(event.data.value, __uv.db, __uv.meta)).then(() => {
            __uv.cookie.db().then(db => {
                __uv.cookie.getCookies(db).then(cookies => {
                    __uv.cookieStr = __uv.cookie.serialize(cookies, __uv.meta, true);
                });
            });
        });
        const cookie = __uv.cookie.setCookie(event.data.value)[0];

        if (!cookie.path) cookie.path = '/';
        if (!cookie.domain) cookie.domain = __uv.meta.url.hostname;

        if (__uv.cookie.validateCookie(cookie, __uv.meta, true)) {
            if (__uv.cookieStr.length) __uv.cookieStr += '; ';
            __uv.cookieStr += `${cookie.name}=${cookie.value}`;
        };

        event.respondWith(event.data.value);
    });

    // HTML
    client.element.on('setInnerHTML', event => {
        switch (event.that.tagName) {
            case 'SCRIPT':
                event.data.value = __uv.js.rewrite(event.data.value);
                break;
            case 'STYLE':
                event.data.value = __uv.rewriteCSS(event.data.value);
                break;
            default:
                event.data.value = __uv.rewriteHtml(event.data.value);
        };
    });

    client.element.on('getInnerHTML', event => {
        switch (event.that.tagName) {
            case 'SCRIPT':
                event.data.value = __uv.js.source(event.data.value);
                break;
            default:
                event.data.value = __uv.sourceHtml(event.data.value);
        };
    });

    client.element.on('setOuterHTML', event => {
        event.data.value = __uv.rewriteHtml(event.data.value, { document: event.that.tagName === 'HTML' });
    });

    client.element.on('getOuterHTML', event => {
        switch (event.that.tagName) {
            case 'HEAD':
                event.data.value = __uv.sourceHtml(
                    event.data.value.replace(/<head(.*)>(.*)<\/head>/s, '<op-head$1>$2</op-head>')
                ).replace(/<op-head(.*)>(.*)<\/op-head>/s, '<head$1>$2</head>');
                break;
            case 'BODY':
                event.data.value = __uv.sourceHtml(
                    event.data.value.replace(/<body(.*)>(.*)<\/body>/s, '<op-body$1>$2</op-body>')
                ).replace(/<op-body(.*)>(.*)<\/op-body>/s, '<body$1>$2</body>');
                break;
            default:
                event.data.value = __uv.sourceHtml(event.data.value, { document: event.that.tagName === 'HTML' });
                break;
        };

        //event.data.value = __uv.sourceHtml(event.data.value, { document: event.that.tagName === 'HTML' });
    });

    client.document.on('write', event => {
        if (!event.data.html.length) return false;
        event.data.html = [__uv.rewriteHtml(event.data.html.join(''))];
    });

    client.document.on('writeln', event => {
        if (!event.data.html.length) return false;
        event.data.html = [__uv.rewriteHtml(event.data.html.join(''))];
    });

    client.element.on('insertAdjacentHTML', event => {
        event.data.html = __uv.rewriteHtml(event.data.html);
    });

    // EventSource

    client.eventSource.on('construct', event => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });


    client.eventSource.on('url', event => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });

    // History
    client.history.on('replaceState', event => {
        if (event.data.url) event.data.url = __uv.rewriteUrl(event.data.url, '__uv' in event.that ? event.that.__uv.meta : __uv.meta);
    });
    client.history.on('pushState', event => {
        if (event.data.url) event.data.url = __uv.rewriteUrl(event.data.url, '__uv' in event.that ? event.that.__uv.meta : __uv.meta);
    });

    // Element get set attribute methods
    client.element.on('getAttribute', event => {
        if (client.element.hasAttribute.call(event.that, __uv.attributePrefix + '-attr-' + event.data.name)) {
            event.respondWith(
                event.target.call(event.that, __uv.attributePrefix + '-attr-' + event.data.name)
            );
        };
    });

    // Message
    client.message.on('postMessage', event => {
        let to = event.data.origin;
        let call = __uv.call;


        if (event.that) {
            call = event.that.__uv$source.call;
        };

        event.data.origin = '*';
        event.data.message = {
            __data: event.data.message,
            __origin: (event.that || event.target).__uv$source.location.origin,
            __to: to,
        };

        event.respondWith(
            worker ?
            call(event.target, [event.data.message, event.data.transfer], event.that) :
            call(event.target, [event.data.message, event.data.origin, event.data.transfer], event.that)
        );

    });

    client.message.on('data', event => {
        const { value: data } = event.data;
        if (typeof data === 'object' && '__data' in data && '__origin' in data) {
            event.respondWith(data.__data);
        };
    });

    client.message.on('origin', event => {
        const data = client.message.messageData.get.call(event.that);
        if (typeof data === 'object' && data.__data && data.__origin) {
            event.respondWith(data.__origin);
        };
    });

    client.overrideDescriptor(window, 'origin', {
        get: (target, that) => {
            return __uv.location.origin;
        },
    });

    client.node.on('baseURI', event => {
        if (event.data.value.startsWith(window.location.origin)) event.data.value = __uv.sourceUrl(event.data.value);
    });

    client.element.on('setAttribute', event => {
        if (event.that instanceof HTMLMediaElement && event.data.name === 'src' && event.data.value.startsWith('blob:')) {
            event.target.call(event.that, __uv.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __uv.blobUrls.get(event.data.value);
            return;
        };

        if (__uv.attrs.isUrl(event.data.name)) {
            event.target.call(event.that, __uv.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __uv.rewriteUrl(event.data.value);
        };

        if (__uv.attrs.isStyle(event.data.name)) {
            event.target.call(event.that, __uv.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __uv.rewriteCSS(event.data.value, { context: 'declarationList' });
        };

        if (__uv.attrs.isHtml(event.data.name)) {
            event.target.call(event.that, __uv.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __uv.rewriteHtml(event.data.value, {...__uv.meta, document: true, injectHead:__uv.createHtmlInject(__uv.handlerScript, __uv.bundleScript, __uv.configScript, __uv.cookieStr, window.location.href) });
        };

        if (__uv.attrs.isSrcset(event.data.name)) {
            event.target.call(event.that, __uv.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __uv.html.wrapSrcset(event.data.value);
        };

        if (__uv.attrs.isForbidden(event.data.name)) {
            event.data.name = __uv.attributePrefix + '-attr-' + event.data.name;
        };
    });

    client.element.on('audio', event => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });

    // Element Property Attributes
    client.element.hookProperty([HTMLAnchorElement, HTMLAreaElement, HTMLLinkElement, HTMLBaseElement], 'href', {
        get: (target, that) => {
            return __uv.sourceUrl(
                target.call(that)
            );
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(that, __uv.attributePrefix + '-attr-href', val)
            target.call(that, __uv.rewriteUrl(val));
        },
    }); 

    client.element.hookProperty([HTMLScriptElement, HTMLAudioElement, HTMLVideoElement,  HTMLMediaElement, HTMLImageElement, HTMLInputElement, HTMLEmbedElement, HTMLIFrameElement, HTMLTrackElement, HTMLSourceElement], 'src', {
        get: (target, that) => {
            return __uv.sourceUrl(
                target.call(that)
            );
        },
        set: (target, that, [val]) => {
            if (new String(val).toString().trim().startsWith('blob:') && that instanceof HTMLMediaElement) {
                client.element.setAttribute.call(that, __uv.attributePrefix + '-attr-src', val)
                return target.call(that, __uv.blobUrls.get(val) || val);
            };

            client.element.setAttribute.call(that, __uv.attributePrefix + '-attr-src', val)
            target.call(that, __uv.rewriteUrl(val));
        },
    });

    client.element.hookProperty([HTMLFormElement], 'action', {
        get: (target, that) => {
            return __uv.sourceUrl(
                target.call(that)
            );
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(that, __uv.attributePrefix + '-attr-action', val)
            target.call(that, __uv.rewriteUrl(val));
        },
    });

    client.element.hookProperty([HTMLImageElement], 'srcset', {
        get: (target, that) => {
            return client.element.getAttribute.call(that, __uv.attributePrefix + '-attr-srcset') || target.call(that);
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(that, __uv.attributePrefix + '-attr-srcset', val)
            target.call(that, __uv.html.wrapSrcset(val));
        },
    });

    client.element.hookProperty(HTMLScriptElement, 'integrity', {
        get: (target, that) => {
            return client.element.getAttribute.call(that, __uv.attributePrefix + '-attr-integrity');
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(that, __uv.attributePrefix + '-attr-integrity', val);
        },
    });

    client.element.hookProperty(HTMLIFrameElement, 'sandbox', {
        get: (target, that) => {
            return client.element.getAttribute.call(that, __uv.attributePrefix + '-attr-sandbox') || target.call(that);
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(that, __uv.attributePrefix + '-attr-sandbox', val);
        },
    });

    client.element.hookProperty(HTMLIFrameElement, 'contentWindow', {
        get: (target, that) => {
            const win = target.call(that);
            try {
                if (!win.__uv) __uvHook(win, config, bare);
                return win;
            } catch (e) {
                return win;
            };
        },
    });

    client.element.hookProperty(HTMLIFrameElement, 'contentDocument', {
        get: (target, that) => {
            const doc = target.call(that);
            try {
                const win = doc.defaultView
                if (!win.__uv) __uvHook(win, config, bare);
                return doc;
            } catch (e) {
                return win;
            };
        },
    });

    client.element.hookProperty(HTMLIFrameElement, 'srcdoc', {
        get: (target, that) => {
            return client.element.getAttribute.call(that, __uv.attributePrefix + '-attr-srcdoc') || target.call(that);
        },
        set: (target, that, [val]) => {
            target.call(that, __uv.rewriteHtml(val, {
                document: true,
                injectHead: __uv.createHtmlInject(__uv.handlerScript, __uv.bundleScript, __uv.configScript, __uv.cookieStr, window.location.href)
            }))
        },
    });

    client.node.on('getTextContent', event => {
        if (event.that.tagName === 'SCRIPT') {
            event.data.value = __uv.js.source(event.data.value);
        };
    });

    client.node.on('setTextContent', event => {
        if (event.that.tagName === 'SCRIPT') {
            event.data.value = __uv.js.rewrite(event.data.value);
        };
    });

    // Until proper rewriting is implemented for service workers.
    // Not sure atm how to implement it with the already built in service worker
    if ('serviceWorker' in window.navigator) {
        delete window.Navigator.prototype.serviceWorker;
    };

    // Document
    client.document.on('getDomain', event => {
        event.data.value = __uv.domain;
    });
    client.document.on('setDomain', event => {
        if (!event.data.value.toString().endsWith(__uv.meta.url.hostname.split('.').slice(-2).join('.'))) return event.respondWith('');
        event.respondWith(__uv.domain = event.data.value);
    })

    client.document.on('url', event => {
        event.data.value = __uv.location.href;
    });

    client.document.on('documentURI', event => {
        event.data.value = __uv.location.href;
    });

    client.document.on('referrer', event => {
        event.data.value = __uv.referrer || __uv.sourceUrl(event.data.value);
    });

    client.document.on('parseFromString', event => {
        if (event.data.type !== 'text/html') return false;
        event.data.string = __uv.rewriteHtml(event.data.string, {...__uv.meta, document: true, });
    });

    // Attribute (node.attributes)
    client.attribute.on('getValue', event => {
        if (client.element.hasAttribute.call(event.that.ownerElement, __uv.attributePrefix + '-attr-' + event.data.name)) {
            event.data.value = client.element.getAttribute.call(event.that.ownerElement, __uv.attributePrefix + '-attr-' + event.data.name);
        };
    });

    client.attribute.on('setValue', event => {
        if (__uv.attrs.isUrl(event.data.name)) {
            client.element.setAttribute.call(event.that.ownerElement, __uv.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __uv.rewriteUrl(event.data.value);
        };

        if (__uv.attrs.isStyle(event.data.name)) {
            client.element.setAttribute.call(event.that.ownerElement, __uv.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __uv.rewriteCSS(event.data.value, { context: 'declarationList' });
        };

        if (__uv.attrs.isHtml(event.data.name)) {
            client.element.setAttribute.call(event.that.ownerElement, __uv.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __uv.rewriteHtml(event.data.value, {...__uv.meta, document: true, injectHead:__uv.createHtmlInject(__uv.handlerScript, __uv.bundleScript, __uv.configScript, __uv.cookieStr, window.location.href) });
        };

        if (__uv.attrs.isSrcset(event.data.name)) {
            client.element.setAttribute.call(event.that.ownerElement, __uv.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __uv.html.wrapSrcset(event.data.value);
        };

    });

    // URL
    client.url.on('createObjectURL', event => {
        let url = event.target.call(event.that, event.data.object);
        if (url.startsWith('blob:' + location.origin)) {
            let newUrl = 'blob:' + (__uv.meta.url.href !== 'about:blank' ?  __uv.meta.url.origin : window.parent.__uv.meta.url.origin) + url.slice('blob:'.length + location.origin.length);
            __uv.blobUrls.set(newUrl, url);
            event.respondWith(newUrl);
        } else {
            event.respondWith(url);
        };
    });

    client.url.on('revokeObjectURL', event => {
        if (__uv.blobUrls.has(event.data.url)) {
            const old = event.data.url;
            event.data.url = __uv.blobUrls.get(event.data.url);
            __uv.blobUrls.delete(old);
        };
    });

    client.storage.on('get', event => {
        event.data.name = methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('set', event => {
        if (event.that.__uv$storageObj) {
            event.that.__uv$storageObj[event.data.name] = event.data.value;
        };
        event.data.name = methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('delete', event => {
        if (event.that.__uv$storageObj) {
            delete event.that.__uv$storageObj[event.data.name];
        };
        event.data.name = methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('getItem', event => {
        event.data.name = methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('setItem', event => {
        if (event.that.__uv$storageObj) {
            event.that.__uv$storageObj[event.data.name] = event.data.value;
        };
        event.data.name = methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('removeItem', event => {
        if (event.that.__uv$storageObj) {
            delete event.that.__uv$storageObj[event.data.name];
        };
        event.data.name = methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('clear', event => {
        if (event.that.__uv$storageObj) {
            for (const key of client.nativeMethods.keys.call(null, event.that.__uv$storageObj)) {
                delete event.that.__uv$storageObj[key];
                client.storage.removeItem.call(event.that, methodPrefix + __uv.meta.url.origin + '@' + key);
                event.respondWith();
            };
        };
    });

    client.storage.on('length', event => {
        if (event.that.__uv$storageObj) {
            event.respondWith(client.nativeMethods.keys.call(null, event.that.__uv$storageObj).length);
        };
    });

    client.storage.on('key', event => {
        if (event.that.__uv$storageObj) {
            event.respondWith(
                (client.nativeMethods.keys.call(null, event.that.__uv$storageObj)[event.data.index] || null)
            );
        };
    });

    client.websocket.on('websocket', async event => {
        let url;
        try {
            url = new URL(event.data.url);
        } catch(e) {
            return;
        };

        const headers = {
            Host: url.host,
            Origin: __uv.meta.url.origin,
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
            Upgrade: 'websocket',
            'User-Agent': window.navigator.userAgent,
            'Connection': 'Upgrade',
        };

        const cookies = __uv.cookie.serialize(__uv.cookies, { url }, false);

        if (cookies) headers.Cookie = cookies;
        const protocols = [...event.data.protocols];

        const remote = {
            protocol: url.protocol,
            host: url.hostname,
            port: url.port || (url.protocol === 'wss:' ? '443' : '80'),
            path: url.pathname + url.search,
        };

        if (protocols.length) headers['Sec-WebSocket-Protocol'] = protocols.join(', ');

        event.data.url =  (__uv.bare.protocol === 'https:' ? 'wss://' : 'ws://') + __uv.bare.host + __uv.bare.pathname + 'v1/';
        event.data.protocols = [
            'bare',
            __uv.encodeProtocol(JSON.stringify({
                remote,
                headers,
                forward_headers: [
                    'accept',
                    'accept-encoding',
                    'accept-language',
                    'sec-websocket-extensions',
                    'sec-websocket-key',
                    'sec-websocket-version',
                ],
            })),
        ];

        const ws = new event.target(event.data.url, event.data.protocols);

        client.nativeMethods.defineProperty(ws, methodPrefix + 'url', {
            enumerable: false,
            value: url.href,
        });

        event.respondWith(
            ws
        );
    });

    client.websocket.on('url', event => {
        if ('__uv$url' in event.that) {
            event.data.value = event.that.__uv$url;
        };
    });

    client.websocket.on('protocol', event => {
        if ('__uv$protocol' in event.that) {
            event.data.value = event.that.__uv$protocol;
        };
    });

    client.function.on('function', event => {
        event.data.script = __uv.rewriteJS(event.data.script);
    });

    client.function.on('toString', event => {
        if (__uv.methods.string in event.that) event.respondWith(event.that[__uv.methods.string]);
    });

    client.object.on('getOwnPropertyNames', event => {
        event.data.names = event.data.names.filter(element => !(__uv.filterKeys.includes(element)));
    });

    client.object.on('getOwnPropertyDescriptors', event => {
        for (const forbidden of __uv.filterKeys) {
            delete event.data.descriptors[forbidden];
        };

    });

    client.style.on('setProperty', event => {
        if (client.style.dashedUrlProps.includes(event.data.property)) {
            event.data.value = __uv.rewriteCSS(event.data.value, {
                context: 'value',
                ...__uv.meta
            })
        };
    });

    client.style.on('getPropertyValue', event => {
        if (client.style.dashedUrlProps.includes(event.data.property)) {
            event.respondWith(
                __uv.sourceCSS(
                    event.target.call(event.that, event.data.property),
                    {
                        context: 'value',
                        ...__uv.meta
                    }
                )
            );
        };
    });

    if ('CSS2Properties' in window) {
        for (const key of client.style.urlProps) {
            client.overrideDescriptor(window.CSS2Properties.prototype, key, {
                get: (target, that) => {
                    return __uv.sourceCSS(
                        target.call(that),
                        {
                            context: 'value',
                            ...__uv.meta
                        }
                    )
                },
                set: (target, that, val) => {
                    target.call(
                        that,
                        __uv.rewriteCSS(val, {
                            context: 'value',
                            ...__uv.meta
                        })
                    );
                }
            });
        };
    } else if ('HTMLElement' in window) {

        client.overrideDescriptor(
            window.HTMLElement.prototype,
            'style',
            {
                get: (target, that) => {
                    const value = target.call(that);
                    if (!value[methodPrefix + 'modifiedStyle']) {

                        for (const key of client.style.urlProps) {
                            client.nativeMethods.defineProperty(value, key, {
                                enumerable: true,
                                configurable: true,
                                get() {
                                    const value = client.style.getPropertyValue.call(this, key) || '';
                                    return __uv.sourceCSS(
                                        value,
                                        {
                                            context: 'value',
                                            ...__uv.meta
                                        }
                                    )
                                },
                                set(val) {
                                    client.style.setProperty.call(this, 
                                        (client.style.propToDashed[key] || key),
                                        __uv.rewriteCSS(val, {
                                            context: 'value',
                                            ...__uv.meta
                                        })    
                                    )
                                }
                            });
                            client.nativeMethods.defineProperty(value, methodPrefix + 'modifiedStyle', {
                                enumerable: false,
                                value: true
                            });
                        };
                    };
                    return value;
                }
            }
        );
    };

    client.style.on('setCssText', event => {
        event.data.value = __uv.rewriteCSS(event.data.value, {
            context: 'declarationList',
            ...__uv.meta
        });
    });

    client.style.on('getCssText', event => {
        event.data.value = __uv.sourceCSS(event.data.value, {
            context: 'declarationList',
            ...__uv.meta
        });
    });

    // Proper hash emulation.
    if (!!window.window) {
        __uv.addEventListener.call(window, 'hashchange', event => {
            if (event.__uv$dispatched) return false;
            event.stopImmediatePropagation();
            const hash = window.location.hash;
            client.history.replaceState.call(window.history, '', '', event.oldURL);
            __uv.location.hash = hash;
        });
    };

    client.location.on('hashchange', (oldUrl, newUrl, ctx) => {
        if (ctx.HashChangeEvent && client.history.replaceState) {
            client.history.replaceState.call(window.history, '', '', __uv.rewriteUrl(newUrl));

            const event = new ctx.HashChangeEvent('hashchange', { newURL: newUrl, oldURL: oldUrl });

            client.nativeMethods.defineProperty(event, methodPrefix + 'dispatched', {
                value: true,
                enumerable: false,
            }); 

            __uv.dispatchEvent.call(window, event);
        };
    });

    // Hooking functions & descriptors
    client.fetch.overrideRequest();
    client.fetch.overrideUrl();
    client.xhr.overrideOpen();
    client.xhr.overrideResponseUrl();
    client.element.overrideHtml();
    client.element.overrideAttribute();
    client.element.overrideInsertAdjacentHTML();
    client.element.overrideAudio();
    // client.element.overrideQuerySelector();
    client.node.overrideBaseURI();
    client.node.overrideTextContent();
    client.attribute.overrideNameValue();
    client.document.overrideDomain();
    client.document.overrideURL();
    client.document.overrideDocumentURI();
    client.document.overrideWrite();
    client.document.overrideReferrer();
    client.document.overrideParseFromString();
    client.storage.overrideMethods();
    client.storage.overrideLength();
    //client.document.overrideQuerySelector();
    client.object.overrideGetPropertyNames();
    client.object.overrideGetOwnPropertyDescriptors();
    client.history.overridePushState();
    client.history.overrideReplaceState();
    client.eventSource.overrideConstruct();
    client.eventSource.overrideUrl();
    client.websocket.overrideWebSocket();
    client.websocket.overrideProtocol();
    client.websocket.overrideUrl();
    client.url.overrideObjectURL();
    client.document.overrideCookie();
    client.message.overridePostMessage();
    client.message.overrideMessageOrigin();
    client.message.overrideMessageData();
    client.workers.overrideWorker();
    client.workers.overrideAddModule();
    client.workers.overrideImportScripts();
    client.workers.overridePostMessage();
    client.style.overrideSetGetProperty();
    client.style.overrideCssText();
    client.navigator.overrideSendBeacon();
    client.function.overrideFunction();
    client.function.overrideToString();
    client.location.overrideWorkerLocation(
        (href) => {
            return new URL(__uv.sourceUrl(href));
        }
    );

    client.overrideDescriptor(window, 'localStorage', {
        get: (target, that) => {
            return (that || window).__uv.lsWrap;
        },
    });
    client.overrideDescriptor(window, 'sessionStorage', {
        get: (target, that) => {
            return (that || window).__uv.ssWrap;
        },
    });


    client.override(window, 'open', (target, that, args) => {
        if (!args.length) return target.apply(that, args);
        let [url] = args;

        url = __uv.rewriteUrl(url);

        return target.call(that, url);
    });

    __uv.$wrap = function(name) {
        if (name === 'location') return __uv.methods.location;
        if (name === 'eval') return __uv.methods.eval;
        return name;
    };


    __uv.$get = function(that) {
        if (that === window.location) return __uv.location;
        if (that === window.eval) return __uv.eval;
        if (that === window.parent) {
            return window.__uv$parent;
        };
        if (that === window.top) {
            return window.__uv$top;
        };
        return that;
    };

    __uv.eval = client.wrap(window, 'eval', (target, that, args) => {
        if (!args.length || typeof args[0] !== 'string') return target.apply(that, args);
        let [script] = args;

        script = __uv.rewriteJS(script);
        return target.call(that, script);
    });

    __uv.call = function(target, args, that) {
        return that ? target.apply(that, args) : target(...args);
    };

    __uv.call$ = function(obj, prop, args = []) {
        return obj[prop].apply(obj, args);
    };

    client.nativeMethods.defineProperty(window.Object.prototype, master, {
        get: () => {
            return __uv;
        },
        enumerable: false
    });

    client.nativeMethods.defineProperty(window.Object.prototype, __uv.methods.setSource, {
        value: function(source) {
            if (!client.nativeMethods.isExtensible(this)) return this;

            client.nativeMethods.defineProperty(this, __uv.methods.source, {
                value: source,
                writable: true,
                enumerable: false
            });

            return this;
        },
        enumerable: false,
    });

    client.nativeMethods.defineProperty(window.Object.prototype, __uv.methods.source, {
        value: __uv,
        writable: true,
        enumerable: false
    });

    client.nativeMethods.defineProperty(window.Object.prototype, __uv.methods.location, {
        configurable: true,
        get() {
            return (this === window.document || this === window) ? __uv.location : this.location;
        },
        set(val) {
            if (this === window.document || this === window) {
                __uv.location.href = val;
            } else {
                this.location = val;
            };
        },
    });

    client.nativeMethods.defineProperty(window.Object.prototype, __uv.methods.parent, {
        configurable: true,
        get() {
            const val = this.parent;

            if (this === window) {
                try {
                    return '__uv' in val ? val : this;
                } catch (e) {
                    return this;
                };
            };
            return val;
        },
        set(val) {
            this.parent = val;
        },
    });

    client.nativeMethods.defineProperty(window.Object.prototype, __uv.methods.top, {
        configurable: true,
        get() {
            const val = this.top;

            if (this === window) {
                if (val === this.parent) return this[__uv.methods.parent];
                try {
                    if (!('__uv' in val)) {
                        let current = this;

                        while (current.parent !== val) {
                            current = current.parent
                        };

                        return '__uv' in current ? current : this;

                    } else {
                        return val;
                    };
                } catch (e) {
                    return this;
                };
            };
            return val;
        },
        set(val) {
            this.top = val;
        },
    });


    client.nativeMethods.defineProperty(window.Object.prototype, __uv.methods.eval, {
        configurable: true,
        get() {
            return this === window ? __uv.eval : this.eval;
        },
        set(val) {
            this.eval = val;
        },
    });
};