/**
 * @type {import('../uv').UltravioletCtor}
 */
const Ultraviolet = self.Ultraviolet;

/**
 * @type {import('../uv').UVClientCtor}
 */
const UVClient = self.UVClient;

/**
 * @type {import('../uv').UVConfig}
 */
const __uv$config = self.__uv$config;

/**
 * @type {import('@tomphttp/bare-client').BareManifest}
 */
const __uv$bareData = self.__uv$bareData;

/**
 * @type {string}
 */
const __uv$bareURL = self.__uv$bareURL;

/**
 * @type {string}
 */
const __uv$cookies = self.__uv$cookies;

if (
    typeof __uv$bareData !== 'object' ||
    typeof __uv$bareURL !== 'string' ||
    typeof __uv$cookies !== 'string'
)
    throw new TypeError('Unable to load global UV data');

if (!self.__uv) __uvHook(self);

self.__uvHook = __uvHook;

function __uvHook(window) {
    if ('__uv' in window && window.__uv instanceof Ultraviolet) return false;

    if (window.document && !!window.window) {
        window.document
            .querySelectorAll('script[__uv-script]')
            .forEach((node) => node.remove());
    }

    const worker = !window.window;
    const master = '__uv';
    const methodPrefix = '__uv$';
    const __uv = new Ultraviolet(__uv$config);

    /*if (typeof config.construct === 'function') {
        config.construct(__uv, worker ? 'worker' : 'window');
    }*/

    const client = new UVClient(window);
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
            if (href.startsWith('about:')) return new URL(href);
            if (href.startsWith('blob:')) href = href.slice('blob:'.length);
            return new URL(__uv.sourceUrl(href));
        },
        (href) => {
            return __uv.rewriteUrl(href);
        }
    );

    let cookieStr = __uv$cookies;

    __uv.meta.url = __uv.location;
    __uv.domain = __uv.meta.url.host;
    __uv.blobUrls = new window.Map();
    __uv.referrer = '';
    __uv.cookies = [];
    __uv.localStorageObj = {};
    __uv.sessionStorageObj = {};

    // websockets
    const bareClient = new Ultraviolet.BareClient(__uv$bareURL, __uv$bareData);

    if (window.EventTarget) {
        __uv.addEventListener = window.EventTarget.prototype.addEventListener;
        __uv.removeListener = window.EventTarget.prototype.removeListener;
        __uv.dispatchEvent = window.EventTarget.prototype.dispatchEvent;
    }

    // Storage wrappers
    client.nativeMethods.defineProperty(
        client.storage.storeProto,
        '__uv$storageObj',
        {
            get() {
                if (this === client.storage.sessionStorage)
                    return __uv.sessionStorageObj;
                if (this === client.storage.localStorage)
                    return __uv.localStorageObj;
            },
            enumerable: false,
        }
    );

    if (window.localStorage) {
        for (const key in window.localStorage) {
            if (key.startsWith(methodPrefix + __uv.location.origin + '@')) {
                __uv.localStorageObj[
                    key.slice(
                        (methodPrefix + __uv.location.origin + '@').length
                    )
                ] = window.localStorage.getItem(key);
            }
        }

        __uv.lsWrap = client.storage.emulate(
            client.storage.localStorage,
            __uv.localStorageObj
        );
    }

    if (window.sessionStorage) {
        for (const key in window.sessionStorage) {
            if (key.startsWith(methodPrefix + __uv.location.origin + '@')) {
                __uv.sessionStorageObj[
                    key.slice(
                        (methodPrefix + __uv.location.origin + '@').length
                    )
                ] = window.sessionStorage.getItem(key);
            }
        }

        __uv.ssWrap = client.storage.emulate(
            client.storage.sessionStorage,
            __uv.sessionStorageObj
        );
    }

    let rawBase = window.document
        ? client.node.baseURI.get.call(window.document)
        : window.location.href;
    let base = __uv.sourceUrl(rawBase);

    client.nativeMethods.defineProperty(__uv.meta, 'base', {
        get() {
            if (!window.document) return __uv.meta.url.href;

            if (client.node.baseURI.get.call(window.document) !== rawBase) {
                rawBase = client.node.baseURI.get.call(window.document);
                base = __uv.sourceUrl(rawBase);
            }

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
        client.nativeMethods.defineProperty(
            wrapped,
            'name',
            client.nativeMethods.getOwnPropertyDescriptor(target, 'name')
        );
        client.nativeMethods.defineProperty(
            wrapped,
            'length',
            client.nativeMethods.getOwnPropertyDescriptor(target, 'length')
        );

        client.nativeMethods.defineProperty(wrapped, __uv.methods.string, {
            enumerable: false,
            value: client.nativeMethods.fnToString.call(target),
        });

        client.nativeMethods.defineProperty(wrapped, __uv.methods.function, {
            enumerable: false,
            value: target,
        });
    });

    client.fetch.on('request', (event) => {
        event.data.input = __uv.rewriteUrl(event.data.input);
    });

    client.fetch.on('requestUrl', (event) => {
        event.data.value = __uv.sourceUrl(event.data.value);
    });

    client.fetch.on('responseUrl', (event) => {
        event.data.value = __uv.sourceUrl(event.data.value);
    });

    // XMLHttpRequest
    client.xhr.on('open', (event) => {
        event.data.input = __uv.rewriteUrl(event.data.input);
    });

    client.xhr.on('responseUrl', (event) => {
        event.data.value = __uv.sourceUrl(event.data.value);
    });

    // Workers
    client.workers.on('worker', (event) => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });

    client.workers.on('addModule', (event) => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });

    client.workers.on('importScripts', (event) => {
        for (const i in event.data.scripts) {
            event.data.scripts[i] = __uv.rewriteUrl(event.data.scripts[i]);
        }
    });

    client.workers.on('postMessage', (event) => {
        let to = event.data.origin;

        event.data.origin = '*';
        event.data.message = {
            __data: event.data.message,
            __origin: __uv.meta.url.origin,
            __to: to,
        };
    });

    // Navigator
    client.navigator.on('sendBeacon', (event) => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });

    // Cookies
    client.document.on('getCookie', (event) => {
        event.data.value = cookieStr;
    });

    client.document.on('setCookie', (event) => {
        Promise.resolve(
            __uv.cookie.setCookies(event.data.value, __uv.db, __uv.meta)
        ).then(() => {
            __uv.cookie.db().then((db) => {
                __uv.cookie.getCookies(db).then((cookies) => {
                    cookieStr = __uv.cookie.serialize(cookies, __uv.meta, true);
                });
            });
        });
        const cookie = __uv.cookie.setCookie(event.data.value)[0];

        if (!cookie.path) cookie.path = '/';
        if (!cookie.domain) cookie.domain = __uv.meta.url.hostname;

        if (__uv.cookie.validateCookie(cookie, __uv.meta, true)) {
            if (cookieStr.length) cookieStr += '; ';
            cookieStr += `${cookie.name}=${cookie.value}`;
        }

        event.respondWith(event.data.value);
    });

    // HTML
    client.element.on('setInnerHTML', (event) => {
        switch (event.that.tagName) {
            case 'SCRIPT':
                event.data.value = __uv.js.rewrite(event.data.value);
                break;
            case 'STYLE':
                event.data.value = __uv.rewriteCSS(event.data.value);
                break;
            default:
                event.data.value = __uv.rewriteHtml(event.data.value);
        }
    });

    client.element.on('getInnerHTML', (event) => {
        switch (event.that.tagName) {
            case 'SCRIPT':
                event.data.value = __uv.js.source(event.data.value);
                break;
            default:
                event.data.value = __uv.sourceHtml(event.data.value);
        }
    });

    client.element.on('setOuterHTML', (event) => {
        event.data.value = __uv.rewriteHtml(event.data.value, {
            document: event.that.tagName === 'HTML',
        });
    });

    client.element.on('getOuterHTML', (event) => {
        switch (event.that.tagName) {
            case 'HEAD':
                event.data.value = __uv
                    .sourceHtml(
                        event.data.value.replace(
                            /<head(.*)>(.*)<\/head>/s,
                            '<op-head$1>$2</op-head>'
                        )
                    )
                    .replace(
                        /<op-head(.*)>(.*)<\/op-head>/s,
                        '<head$1>$2</head>'
                    );
                break;
            case 'BODY':
                event.data.value = __uv
                    .sourceHtml(
                        event.data.value.replace(
                            /<body(.*)>(.*)<\/body>/s,
                            '<op-body$1>$2</op-body>'
                        )
                    )
                    .replace(
                        /<op-body(.*)>(.*)<\/op-body>/s,
                        '<body$1>$2</body>'
                    );
                break;
            default:
                event.data.value = __uv.sourceHtml(event.data.value, {
                    document: event.that.tagName === 'HTML',
                });
                break;
        }

        //event.data.value = __uv.sourceHtml(event.data.value, { document: event.that.tagName === 'HTML' });
    });

    client.document.on('write', (event) => {
        if (!event.data.html.length) return false;
        event.data.html = [__uv.rewriteHtml(event.data.html.join(''))];
    });

    client.document.on('writeln', (event) => {
        if (!event.data.html.length) return false;
        event.data.html = [__uv.rewriteHtml(event.data.html.join(''))];
    });

    client.element.on('insertAdjacentHTML', (event) => {
        event.data.html = __uv.rewriteHtml(event.data.html);
    });

    // EventSource

    client.eventSource.on('construct', (event) => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });

    client.eventSource.on('url', (event) => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });

    // History
    client.history.on('replaceState', (event) => {
        if (event.data.url)
            event.data.url = __uv.rewriteUrl(
                event.data.url,
                '__uv' in event.that ? event.that.__uv.meta : __uv.meta
            );
    });
    client.history.on('pushState', (event) => {
        if (event.data.url)
            event.data.url = __uv.rewriteUrl(
                event.data.url,
                '__uv' in event.that ? event.that.__uv.meta : __uv.meta
            );
    });

    // Element get set attribute methods
    client.element.on('getAttribute', (event) => {
        if (
            client.element.hasAttribute.call(
                event.that,
                __uv.attributePrefix + '-attr-' + event.data.name
            )
        ) {
            event.respondWith(
                event.target.call(
                    event.that,
                    __uv.attributePrefix + '-attr-' + event.data.name
                )
            );
        }
    });

    // Message
    client.message.on('postMessage', (event) => {
        let to = event.data.origin;
        let call = __uv.call;

        if (event.that) {
            call = event.that.__uv$source.call;
        }

        event.data.origin = '*';
        event.data.message = {
            __data: event.data.message,
            __origin: (event.that || event.target).__uv$source.location.origin,
            __to: to,
        };

        event.respondWith(
            worker
                ? call(
                      event.target,
                      [event.data.message, event.data.transfer],
                      event.that
                  )
                : call(
                      event.target,
                      [
                          event.data.message,
                          event.data.origin,
                          event.data.transfer,
                      ],
                      event.that
                  )
        );
    });

    client.message.on('data', (event) => {
        const { value: data } = event.data;
        if (
            typeof data === 'object' &&
            '__data' in data &&
            '__origin' in data
        ) {
            event.respondWith(data.__data);
        }
    });

    client.message.on('origin', (event) => {
        const data = client.message.messageData.get.call(event.that);
        if (typeof data === 'object' && data.__data && data.__origin) {
            event.respondWith(data.__origin);
        }
    });

    client.overrideDescriptor(window, 'origin', {
        get: () => {
            return __uv.location.origin;
        },
    });

    client.node.on('baseURI', (event) => {
        if (event.data.value.startsWith(__uv.meta.origin))
            event.data.value = __uv.sourceUrl(event.data.value);
    });

    client.element.on('setAttribute', (event) => {
        if (
            event.that instanceof HTMLMediaElement &&
            event.data.name === 'src' &&
            event.data.value.startsWith('blob:')
        ) {
            event.target.call(
                event.that,
                __uv.attributePrefix + '-attr-' + event.data.name,
                event.data.value
            );
            event.data.value = __uv.blobUrls.get(event.data.value);
            return;
        }

        if (__uv.attrs.isUrl(event.data.name)) {
            event.target.call(
                event.that,
                __uv.attributePrefix + '-attr-' + event.data.name,
                event.data.value
            );
            event.data.value = __uv.rewriteUrl(event.data.value);
        }

        if (__uv.attrs.isStyle(event.data.name)) {
            event.target.call(
                event.that,
                __uv.attributePrefix + '-attr-' + event.data.name,
                event.data.value
            );
            event.data.value = __uv.rewriteCSS(event.data.value, {
                context: 'declarationList',
            });
        }

        if (__uv.attrs.isHtml(event.data.name)) {
            event.target.call(
                event.that,
                __uv.attributePrefix + '-attr-' + event.data.name,
                event.data.value
            );
            event.data.value = __uv.rewriteHtml(event.data.value, {
                ...__uv.meta,
                document: true,
                injectHead: __uv.createHtmlInject(
                    __uv.handlerScript,
                    __uv.bundleScript,
                    __uv.clientScript,
                    __uv.configScript,
                    __uv$bareURL,
                    __uv$bareData,
                    cookieStr,
                    window.location.href
                ),
            });
        }

        if (__uv.attrs.isSrcset(event.data.name)) {
            event.target.call(
                event.that,
                __uv.attributePrefix + '-attr-' + event.data.name,
                event.data.value
            );
            event.data.value = __uv.html.wrapSrcset(
                event.data.value.toString()
            );
        }

        if (__uv.attrs.isForbidden(event.data.name)) {
            event.data.name = __uv.attributePrefix + '-attr-' + event.data.name;
        }
    });

    client.element.on('audio', (event) => {
        event.data.url = __uv.rewriteUrl(event.data.url);
    });

    // Element Property Attributes
    client.element.hookProperty(
        [HTMLAnchorElement, HTMLAreaElement, HTMLLinkElement, HTMLBaseElement],
        'href',
        {
            get: (target, that) => {
                return __uv.sourceUrl(target.call(that));
            },
            set: (target, that, [val]) => {
                client.element.setAttribute.call(
                    that,
                    __uv.attributePrefix + '-attr-href',
                    val
                );
                target.call(that, __uv.rewriteUrl(val));
            },
        }
    );

    client.element.hookProperty(
        [
            HTMLScriptElement,
            HTMLAudioElement,
            HTMLVideoElement,
            HTMLMediaElement,
            HTMLImageElement,
            HTMLInputElement,
            HTMLEmbedElement,
            HTMLIFrameElement,
            HTMLTrackElement,
            HTMLSourceElement,
        ],
        'src',
        {
            get: (target, that) => {
                return __uv.sourceUrl(target.call(that));
            },
            set: (target, that, [val]) => {
                if (
                    new String(val).toString().trim().startsWith('blob:') &&
                    that instanceof HTMLMediaElement
                ) {
                    client.element.setAttribute.call(
                        that,
                        __uv.attributePrefix + '-attr-src',
                        val
                    );
                    return target.call(that, __uv.blobUrls.get(val) || val);
                }

                client.element.setAttribute.call(
                    that,
                    __uv.attributePrefix + '-attr-src',
                    val
                );
                target.call(that, __uv.rewriteUrl(val));
            },
        }
    );

    client.element.hookProperty([HTMLFormElement], 'action', {
        get: (target, that) => {
            return __uv.sourceUrl(target.call(that));
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(
                that,
                __uv.attributePrefix + '-attr-action',
                val
            );
            target.call(that, __uv.rewriteUrl(val));
        },
    });

    client.element.hookProperty([HTMLImageElement], 'srcset', {
        get: (target, that) => {
            return (
                client.element.getAttribute.call(
                    that,
                    __uv.attributePrefix + '-attr-srcset'
                ) || target.call(that)
            );
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(
                that,
                __uv.attributePrefix + '-attr-srcset',
                val
            );
            target.call(that, __uv.html.wrapSrcset(val.toString()));
        },
    });

    client.element.hookProperty(HTMLScriptElement, 'integrity', {
        get: (target, that) => {
            return client.element.getAttribute.call(
                that,
                __uv.attributePrefix + '-attr-integrity'
            );
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(
                that,
                __uv.attributePrefix + '-attr-integrity',
                val
            );
        },
    });

    client.element.hookProperty(HTMLIFrameElement, 'sandbox', {
        get: (target, that) => {
            return (
                client.element.getAttribute.call(
                    that,
                    __uv.attributePrefix + '-attr-sandbox'
                ) || target.call(that)
            );
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(
                that,
                __uv.attributePrefix + '-attr-sandbox',
                val
            );
        },
    });

    // HTMLIFrameElement may not be defined (workers)
    const contentWindowGet =
        HTMLIFrameElement &&
        Object.getOwnPropertyDescriptor(
            HTMLIFrameElement.prototype,
            'contentWindow'
        ).get;

    /**
     *
     * @param {typeof globalThis} win
     */
    function uvInject(win) {
        if (!win.__uv)
            try {
                __uvHook(win);
            } catch (err) {
                console.error('catastrophic failure');
                console.error(err);
            }
    }

    client.element.hookProperty(HTMLIFrameElement, 'contentWindow', {
        get: (target, that) => {
            const win = contentWindowGet.call(that);
            uvInject(win);
            return sandboxWindow(win);
        },
    });

    client.element.hookProperty(HTMLIFrameElement, 'contentDocument', {
        get: (target, that) => {
            const win = contentWindowGet.call(that);
            uvInject(win);
            try {
                return sandboxWindow(win).document;
            } catch (err) {
                // we are sandboxed, return null
                return null;
            }
        },
    });

    const sandboxed = new WeakMap();

    function illegalSandbox() {
        throw new DOMException(
            `Blocked a frame with "${__uv.location.origin}" from accessing a cross-origin frame.`
        );
    }

    /**
     *
     * @template T
     * @param {T} object
     * @returns {T}
     */
    function sandboxObject(object) {
        lockProperties(object);
        const target = {};
        Reflect.setPrototypeOf(target, null);
        return new Proxy(target, {
            get: (target, prop, receiver) => {
                const descriptor = Reflect.getOwnPropertyDescriptor(
                    object,
                    prop
                );

                if (
                    !(prop in object) ||
                    (!('value' in descriptor) &&
                        typeof descriptor.get !== 'function')
                )
                    illegalSandbox();

                return Reflect.get(target, prop, receiver);
            },
            set: (target, prop, value) => {
                const descriptor = Reflect.getOwnPropertyDescriptor(
                    object,
                    prop
                );

                if (!(prop in object) || typeof descriptor.set !== 'function')
                    illegalSandbox();

                return Reflect.set(target, prop, value);
            },
            defineProperty: () => {
                illegalSandbox();
            },
            getOwnPropertyDescriptor: (target, prop, descriptor) => {
                if (!(prop in object)) illegalSandbox();

                return Reflect.getOwnPropertyDescriptor(
                    target,
                    prop,
                    descriptor
                );
            },
            setPrototypeOf: () => {
                illegalSandbox();
            },
            has: (target, prop) => {
                if (!(prop in object)) illegalSandbox();

                return true;
            },
        });
    }

    const unknownSandboxed = [
        'then',
        Symbol.toStringTag,
        Symbol.hasInstance,
        Symbol.isConcatSpreadable,
    ];

    function lockProperties(object) {
        Reflect.setPrototypeOf(object, null);

        for (const unknown of unknownSandboxed)
            Reflect.defineProperty(object, unknown, {
                value: undefined,
                writable: false,
                enumerable: false,
                configurable: false,
            });

        for (const [key, descriptor] of Object.entries(
            Object.getOwnPropertyDescriptors(object)
        )) {
            if (!descriptor.configurable) continue;

            descriptor.enumerable = false;
            descriptor.configurable = true;

            if ('value' in descriptor) {
                descriptor.writable = false;
                /*if (typeof descriptor.value === 'function')
                    restrict(descriptor.value);*/
            }

            /*
            if ('get' in descriptor && typeof descriptor.get === 'function')
                descriptor.get = restrict(descriptor.get);

            if ('set' in descriptor && typeof descriptor.set === 'function')
                descriptor.set = restrict(descriptor.set);
            */

            Reflect.defineProperty(object, key, descriptor);
        }
    }

    /**
     *
     * @param {typeof globalThis} win
     * @returns {Location}
     */
    function sandboxLocation(win) {
        return sandboxObject({
            set href(value) {
                win.__uv.location.href = value;
            },
            replace(value) {
                win.__uv.location.replace(value);
            },
        });
    }

    /**
     *
     * @param {typeof globalThis} win
     * @returns {typeof globalThis}
     */
    function sandboxWindow(win) {
        if (sandboxed.has(win)) return sandboxed.get(win);
        if (
            new URL(win.__uv.meta.base).origin ===
            new URL(window.__uv.meta.base).origin
        )
            return win;

        const obj = {
            get window() {
                return sandboxedWin;
            },
            get location() {
                return loc;
            },
            set location(value) {
                win.__uv.location.href = value;
            },
            get closed() {
                return win.closed;
            },
            get frames() {
                return sandboxedWin;
            },
            get length() {
                return win.length;
            },
            get top() {
                return win[__uv.methods.top];
            },
            get opener() {
                return sandboxWindow(win.opener);
            },
            get parent() {
                return sandboxWindow(win.parent);
            },
            blur() {
                win.blur();
            },
            close() {
                win.close();
            },
            focus() {
                win.focus();
            },
            postMessage(...args) {
                // todo: remove old workaround for postMessage
                win.__uv$setSource(__uv).postMessage(...args);
            },
        };
        const loc = sandboxLocation(win.location);

        const sandboxedWin = sandboxObject(obj);
        return sandboxedWin;
    }

    client.element.hookProperty(HTMLIFrameElement, 'srcdoc', {
        get: (target, that) => {
            return (
                client.element.getAttribute.call(
                    that,
                    __uv.attributePrefix + '-attr-srcdoc'
                ) || target.call(that)
            );
        },
        set: (target, that, [val]) => {
            target.call(
                that,
                __uv.rewriteHtml(val, {
                    document: true,
                    injectHead: __uv.createHtmlInject(
                        __uv.handlerScript,
                        __uv.bundleScript,
                        __uv.clientScript,
                        __uv.configScript,
                        __uv$bareURL,
                        __uv$bareData,
                        cookieStr,
                        window.location.href
                    ),
                })
            );
        },
    });

    client.node.on('getTextContent', (event) => {
        if (event.that.tagName === 'SCRIPT') {
            event.data.value = __uv.js.source(event.data.value);
        }
    });

    client.node.on('setTextContent', (event) => {
        if (event.that.tagName === 'SCRIPT') {
            event.data.value = __uv.js.rewrite(event.data.value);
        }
    });

    // Until proper rewriting is implemented for service workers.
    // Not sure atm how to implement it with the already built in service worker
    if ('serviceWorker' in window.navigator) {
        delete window.Navigator.prototype.serviceWorker;
    }

    // Document
    client.document.on('getDomain', (event) => {
        event.data.value = __uv.domain;
    });
    client.document.on('setDomain', (event) => {
        if (
            !event.data.value
                .toString()
                .endsWith(__uv.meta.url.hostname.split('.').slice(-2).join('.'))
        )
            return event.respondWith('');
        event.respondWith((__uv.domain = event.data.value));
    });

    client.document.on('url', (event) => {
        event.data.value = __uv.location.href;
    });

    client.document.on('documentURI', (event) => {
        event.data.value = __uv.location.href;
    });

    client.document.on('referrer', (event) => {
        event.data.value = __uv.referrer || __uv.sourceUrl(event.data.value);
    });

    client.document.on('parseFromString', (event) => {
        if (event.data.type !== 'text/html') return false;
        event.data.string = __uv.rewriteHtml(event.data.string, {
            ...__uv.meta,
            document: true,
        });
    });

    // Attribute (node.attributes)
    client.attribute.on('getValue', (event) => {
        if (
            client.element.hasAttribute.call(
                event.that.ownerElement,
                __uv.attributePrefix + '-attr-' + event.data.name
            )
        ) {
            event.data.value = client.element.getAttribute.call(
                event.that.ownerElement,
                __uv.attributePrefix + '-attr-' + event.data.name
            );
        }
    });

    client.attribute.on('setValue', (event) => {
        if (__uv.attrs.isUrl(event.data.name)) {
            client.element.setAttribute.call(
                event.that.ownerElement,
                __uv.attributePrefix + '-attr-' + event.data.name,
                event.data.value
            );
            event.data.value = __uv.rewriteUrl(event.data.value);
        }

        if (__uv.attrs.isStyle(event.data.name)) {
            client.element.setAttribute.call(
                event.that.ownerElement,
                __uv.attributePrefix + '-attr-' + event.data.name,
                event.data.value
            );
            event.data.value = __uv.rewriteCSS(event.data.value, {
                context: 'declarationList',
            });
        }

        if (__uv.attrs.isHtml(event.data.name)) {
            client.element.setAttribute.call(
                event.that.ownerElement,
                __uv.attributePrefix + '-attr-' + event.data.name,
                event.data.value
            );
            event.data.value = __uv.rewriteHtml(event.data.value, {
                ...__uv.meta,
                document: true,
                injectHead: __uv.createHtmlInject(
                    __uv.handlerScript,
                    __uv.bundleScript,
                    __uv.clientScript,
                    __uv.configScript,
                    __uv$bareURL,
                    __uv$bareData,
                    cookieStr,
                    window.location.href
                ),
            });
        }

        if (__uv.attrs.isSrcset(event.data.name)) {
            client.element.setAttribute.call(
                event.that.ownerElement,
                __uv.attributePrefix + '-attr-' + event.data.name,
                event.data.value
            );
            event.data.value = __uv.html.wrapSrcset(
                event.data.value.toString()
            );
        }
    });

    // URL
    client.url.on('createObjectURL', (event) => {
        let url = event.target.call(event.that, event.data.object);
        if (url.startsWith('blob:' + location.origin)) {
            let newUrl =
                'blob:' +
                (__uv.meta.url.href !== 'about:blank'
                    ? __uv.meta.url.origin
                    : window.parent.__uv.meta.url.origin) +
                url.slice('blob:'.length + location.origin.length);
            __uv.blobUrls.set(newUrl, url);
            event.respondWith(newUrl);
        } else {
            event.respondWith(url);
        }
    });

    client.url.on('revokeObjectURL', (event) => {
        if (__uv.blobUrls.has(event.data.url)) {
            const old = event.data.url;
            event.data.url = __uv.blobUrls.get(event.data.url);
            __uv.blobUrls.delete(old);
        }
    });

    client.storage.on('get', (event) => {
        event.data.name =
            methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('set', (event) => {
        if (event.that.__uv$storageObj) {
            event.that.__uv$storageObj[event.data.name] = event.data.value;
        }
        event.data.name =
            methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('delete', (event) => {
        if (event.that.__uv$storageObj) {
            delete event.that.__uv$storageObj[event.data.name];
        }
        event.data.name =
            methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('getItem', (event) => {
        event.data.name =
            methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('setItem', (event) => {
        if (event.that.__uv$storageObj) {
            event.that.__uv$storageObj[event.data.name] = event.data.value;
        }
        event.data.name =
            methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('removeItem', (event) => {
        if (event.that.__uv$storageObj) {
            delete event.that.__uv$storageObj[event.data.name];
        }
        event.data.name =
            methodPrefix + __uv.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('clear', (event) => {
        if (event.that.__uv$storageObj) {
            for (const key of client.nativeMethods.keys.call(
                null,
                event.that.__uv$storageObj
            )) {
                delete event.that.__uv$storageObj[key];
                client.storage.removeItem.call(
                    event.that,
                    methodPrefix + __uv.meta.url.origin + '@' + key
                );
                event.respondWith();
            }
        }
    });

    client.storage.on('length', (event) => {
        if (event.that.__uv$storageObj) {
            event.respondWith(
                client.nativeMethods.keys.call(null, event.that.__uv$storageObj)
                    .length
            );
        }
    });

    client.storage.on('key', (event) => {
        if (event.that.__uv$storageObj) {
            event.respondWith(
                client.nativeMethods.keys.call(
                    null,
                    event.that.__uv$storageObj
                )[event.data.index] || null
            );
        }
    });

    function eventTarget(target, event) {
        const property = `on${event}`;
        const listeners = new WeakMap();

        Reflect.defineProperty(target, property, {
            enumerable: true,
            configurable: true,
            get() {
                if (listeners.has(this)) {
                    return listeners.get(this);
                } else {
                    return null;
                }
            },
            set(value) {
                if (typeof value == 'function') {
                    if (listeners.has(this)) {
                        this.removeEventListener(event, listeners.get(this));
                    }

                    listeners.set(this, value);
                    this.addEventListener(event, value);
                }
            },
        });
    }

    const wsProtocols = ['ws:', 'wss:'];

    class MockWebSocket extends EventTarget {
        /**
         * @type {import("@tomphttp/bare-client").BareWebSocket}
         */
        #socket;
        #ready;
        #binaryType = 'blob';
        #protocol = '';
        #extensions = '';
        #url = '';
        /**
         *
         * @param {URL} remote
         * @param {any} protocol
         */
        async #open(url, protocol) {
            const requestHeaders = {};
            Reflect.setPrototypeOf(requestHeaders, null);

            requestHeaders['Origin'] = __uv.meta.url.origin;
            requestHeaders['User-Agent'] = navigator.userAgent;

            if (cookieStr !== '')
                requestHeaders['Cookie'] = cookieStr.toString();

            this.#socket = await bareClient.createWebSocket(
                url,
                requestHeaders,
                protocol
            );

            this.#socket.binaryType = this.#binaryType;

            this.#socket.addEventListener('message', (event) => {
                this.dispatchEvent(new MessageEvent('message', event));
            });

            this.#socket.addEventListener('open', async (event) => {
                this.dispatchEvent(new Event('open', event));
            });

            this.#socket.addEventListener('error', (event) => {
                this.dispatchEvent(new ErrorEvent('error', event));
            });

            this.#socket.addEventListener('close', (event) => {
                this.dispatchEvent(new Event('close', event));
            });

            const meta = await this.#socket.meta;

            if (meta.headers.has('sec-websocket-protocol'))
                this.#protocol = meta.headers.get('sec-websocket-protocol');

            if (meta.headers.has('sec-websocket-extensions'))
                this.#extensions = meta.headers.get('sec-websocket-extensions');

            let setCookie = meta.rawHeaders['set-cookie'] || [];
            if (!Array.isArray(setCookie)) setCookie = [];
            // trip the hook
            for (const cookie of setCookie) document.cookie = cookie;
        }
        get url() {
            return this.#url;
        }
        constructor(...args) {
            super();

            if (!args.length)
                throw new DOMException(
                    `Failed to construct 'WebSocket': 1 argument required, but only 0 present.`
                );

            const [url, protocol] = args;

            let parsed;

            try {
                parsed = new URL(url);
            } catch (err) {
                throw new DOMException(
                    `Faiiled to construct 'WebSocket': The URL '${url}' is invalid.`
                );
            }

            if (!wsProtocols.includes(parsed.protocol)) {
                throw new DOMException(
                    `Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. '${parsed.protocol}' is not allowed.`
                );
            }

            this.#ready = this.#open(parsed, protocol);
        }
        get protocol() {
            return this.#protocol;
        }
        get extensions() {
            return this.#extensions;
        }
        get readyState() {
            if (this.#socket) {
                return this.#socket.readyState;
            } else {
                return MockWebSocket.CONNECTING;
            }
        }
        get binaryType() {
            return this.#binaryType;
        }
        set binaryType(value) {
            this.#binaryType = value;

            if (this.#socket) {
                this.#socket.binaryType = value;
            }
        }
        send(data) {
            if (!this.#socket) {
                throw new DOMException(
                    `Failed to execute 'send' on 'WebSocket': Still in CONNECTING state.`
                );
            }
            this.#socket.send(data);
        }
        close(code, reason) {
            if (typeof code !== 'undefined') {
                if (typeof code !== 'number') {
                    code = 0;
                }

                if (code !== 1000 && (code < 3000 || code > 4999)) {
                    throw new DOMException(
                        `Failed to execute 'close' on 'WebSocket': The code must be either 1000, or between 3000 and 4999. ${code} is neither.`
                    );
                }
            }

            this.#ready.then(() => this.#socket.close(code, reason));
        }
    }

    eventTarget(MockWebSocket.prototype, 'close');
    eventTarget(MockWebSocket.prototype, 'open');
    eventTarget(MockWebSocket.prototype, 'message');
    eventTarget(MockWebSocket.prototype, 'error');

    for (const hook of [
        'url',
        'protocol',
        'extensions',
        'readyState',
        'binaryType',
    ]) {
        const officialDesc = Object.getOwnPropertyDescriptor(
            window.WebSocket.prototype,
            hook
        );
        const customDesc = Object.getOwnPropertyDescriptor(
            MockWebSocket.prototype,
            hook
        );

        if (customDesc?.get && officialDesc?.get)
            client.emit('wrap', customDesc.get, officialDesc.get);

        if (customDesc?.set && officialDesc?.set)
            client.emit('wrap', customDesc.get, officialDesc.get);
    }

    client.emit(
        'wrap',
        window.WebSocket.prototype.send,
        MockWebSocket.prototype.send
    );
    client.emit(
        'wrap',
        window.WebSocket.prototype.close,
        MockWebSocket.prototype.close
    );

    client.override(
        window,
        'WebSocket',
        (target, that, args) => new MockWebSocket(...args),
        true
    );

    MockWebSocket.prototype.constructor = window.WebSocket;

    client.function.on('function', (event) => {
        event.data.script = __uv.rewriteJS(event.data.script);
    });

    client.function.on('toString', (event) => {
        if (__uv.methods.string in event.that)
            event.respondWith(event.that[__uv.methods.string]);
    });

    client.object.on('getOwnPropertyNames', (event) => {
        event.data.names = event.data.names.filter(
            (element) => !__uv.filterKeys.includes(element)
        );
    });

    client.object.on('getOwnPropertyDescriptors', (event) => {
        for (const forbidden of __uv.filterKeys) {
            delete event.data.descriptors[forbidden];
        }
    });

    client.style.on('setProperty', (event) => {
        if (client.style.dashedUrlProps.includes(event.data.property)) {
            event.data.value = __uv.rewriteCSS(event.data.value, {
                context: 'value',
                ...__uv.meta,
            });
        }
    });

    client.style.on('getPropertyValue', (event) => {
        if (client.style.dashedUrlProps.includes(event.data.property)) {
            event.respondWith(
                __uv.sourceCSS(
                    event.target.call(event.that, event.data.property),
                    {
                        context: 'value',
                        ...__uv.meta,
                    }
                )
            );
        }
    });

    if ('CSS2Properties' in window) {
        for (const key of client.style.urlProps) {
            client.overrideDescriptor(window.CSS2Properties.prototype, key, {
                get: (target, that) => {
                    return __uv.sourceCSS(target.call(that), {
                        context: 'value',
                        ...__uv.meta,
                    });
                },
                set: (target, that, val) => {
                    target.call(
                        that,
                        __uv.rewriteCSS(val, {
                            context: 'value',
                            ...__uv.meta,
                        })
                    );
                },
            });
        }
    } else if ('HTMLElement' in window) {
        client.overrideDescriptor(window.HTMLElement.prototype, 'style', {
            get: (target, that) => {
                const value = target.call(that);
                if (!value[methodPrefix + 'modifiedStyle']) {
                    for (const key of client.style.urlProps) {
                        client.nativeMethods.defineProperty(value, key, {
                            enumerable: true,
                            configurable: true,
                            get() {
                                const value =
                                    client.style.getPropertyValue.call(
                                        this,
                                        key
                                    ) || '';
                                return __uv.sourceCSS(value, {
                                    context: 'value',
                                    ...__uv.meta,
                                });
                            },
                            set(val) {
                                client.style.setProperty.call(
                                    this,
                                    client.style.propToDashed[key] || key,
                                    __uv.rewriteCSS(val, {
                                        context: 'value',
                                        ...__uv.meta,
                                    })
                                );
                            },
                        });
                        client.nativeMethods.defineProperty(
                            value,
                            methodPrefix + 'modifiedStyle',
                            {
                                enumerable: false,
                                value: true,
                            }
                        );
                    }
                }
                return value;
            },
        });
    }

    client.style.on('setCssText', (event) => {
        event.data.value = __uv.rewriteCSS(event.data.value, {
            context: 'declarationList',
            ...__uv.meta,
        });
    });

    client.style.on('getCssText', (event) => {
        event.data.value = __uv.sourceCSS(event.data.value, {
            context: 'declarationList',
            ...__uv.meta,
        });
    });

    // Proper hash emulation.
    __uv.addEventListener.call(window, 'hashchange', (event) => {
        if (event.__uv$dispatched) return false;
        event.stopImmediatePropagation();
        const hash = window.location.hash;
        client.history.replaceState.call(window.history, '', '', event.oldURL);
        __uv.location.hash = hash;
    });

    client.location.on('hashchange', (oldUrl, newUrl, ctx) => {
        if (ctx.HashChangeEvent && client.history.replaceState) {
            client.history.replaceState.call(
                window.history,
                '',
                '',
                __uv.rewriteUrl(newUrl)
            );

            const event = new ctx.HashChangeEvent('hashchange', {
                newURL: newUrl,
                oldURL: oldUrl,
            });

            client.nativeMethods.defineProperty(
                event,
                methodPrefix + 'dispatched',
                {
                    value: true,
                    enumerable: false,
                }
            );

            __uv.dispatchEvent.call(window, event);
        }
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
    client.location.overrideWorkerLocation((href) => {
        return new URL(__uv.sourceUrl(href));
    });

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

    __uv.$wrap = function (name) {
        if (name === 'location') return __uv.methods.location;
        if (name === 'eval') return __uv.methods.eval;
        return name;
    };

    __uv.$get = function (that) {
        if (that === window.location) return __uv.location;
        if (that === window.eval) return __uv.eval;
        if (that === window.parent) {
            return window.__uv$parent;
        }
        if (that === window.top) {
            return window.__uv$top;
        }
        return that;
    };

    __uv.eval = client.wrap(window, 'eval', (target, that, args) => {
        if (!args.length || typeof args[0] !== 'string')
            return target.apply(that, args);
        let [script] = args;

        script = __uv.rewriteJS(script);
        return target.call(that, script);
    });

    __uv.call = function (target, args, that) {
        return that ? target.apply(that, args) : target(...args);
    };

    __uv.call$ = function (obj, prop, args = []) {
        return obj[prop].apply(obj, args);
    };

    client.nativeMethods.defineProperty(window.Object.prototype, master, {
        get: () => {
            return __uv;
        },
        enumerable: false,
    });

    client.nativeMethods.defineProperty(
        window.Object.prototype,
        __uv.methods.setSource,
        {
            value: function (source) {
                if (!client.nativeMethods.isExtensible(this)) return this;

                client.nativeMethods.defineProperty(this, __uv.methods.source, {
                    value: source,
                    writable: true,
                    enumerable: false,
                });

                return this;
            },
            enumerable: false,
        }
    );

    client.nativeMethods.defineProperty(
        window.Object.prototype,
        __uv.methods.source,
        {
            value: __uv,
            writable: true,
            enumerable: false,
        }
    );

    client.nativeMethods.defineProperty(
        window.Object.prototype,
        __uv.methods.location,
        {
            configurable: true,
            get() {
                return this === window.document || this === window
                    ? __uv.location
                    : this.location;
            },
            set(val) {
                if (this === window.document || this === window) {
                    __uv.location.href = val;
                } else {
                    this.location = val;
                }
            },
        }
    );

    client.nativeMethods.defineProperty(
        window.Object.prototype,
        __uv.methods.parent,
        {
            configurable: true,
            get() {
                const val = this.parent;

                if (this === window) {
                    try {
                        return '__uv' in val ? sandboxWindow(val) : this;
                    } catch (e) {
                        return this;
                    }
                }
                return val;
            },
            set(val) {
                this.parent = val;
            },
        }
    );

    client.nativeMethods.defineProperty(
        window.Object.prototype,
        __uv.methods.top,
        {
            configurable: true,
            get() {
                const val = this.top;

                if (this === window) {
                    if (val === this.parent) return this[__uv.methods.parent];
                    try {
                        if (!('__uv' in val)) {
                            let current = this;

                            while (current.parent !== val) {
                                current = current.parent;
                            }

                            return '__uv' in current ? current : this;
                        } else {
                            return val;
                        }
                    } catch (e) {
                        return this;
                    }
                }
                return val;
            },
            set(val) {
                this.top = val;
            },
        }
    );

    client.nativeMethods.defineProperty(
        window.Object.prototype,
        __uv.methods.eval,
        {
            configurable: true,
            get() {
                return this === window ? __uv.eval : this.eval;
            },
            set(val) {
                this.eval = val;
            },
        }
    );
}
