// Alloy Proxy javascript object rewriter.
// Rewrites functions that makes HTTP or Websocket requests, and DOM element selectors & creators.

// Alloy configurations retrieved from attribute.

var alloy = JSON.parse(atob(document.currentScript.getAttribute('data-config')));
alloy.url = new URL(alloy.url)

// "document.location" and "window.location" are rewritten server-side and replaced with this object.
window.alloyLocation = new Proxy({}, {
    set(obj, prop, value) {

        if (prop == 'assign' || prop == 'reload' || prop == 'replace' || prop == 'toString') return;

        console.log(proxify.url(alloy.url.href.replace(alloy.url[prop], value)));

        console.log((alloy.url.href.replace(alloy.url[prop], value)));


        return location[prop] = proxify.url(alloy.url.href.replace(alloy.url[prop], value));
    },
    get(obj, prop) {
        // Had to be done in order to fix Discord.
        if (alloy.url.origin == atob('aHR0cHM6Ly9kaXNjb3JkLmNvbQ==') && alloy.url.pathname == '/app') return window.location[prop];

        if (prop == 'assign' || prop == 'reload' || prop == 'replace' || prop == 'toString') return {
            assign: arg => window.location.assign(proxify.url(arg)),
            replace: arg => window.location.replace(proxify.url(arg)),
            reload: () => window.location.reload(),
            toString: () => { return alloy.url.href }
        }[prop];
        else return alloy.url[prop];
    }    
});

window.document.alloyLocation = window.alloyLocation;

Object.defineProperty(document, 'domain', {
    get() {
        return alloy.url.hostname;
    },
    set(value) {
        return value;
    }
});
    
// Any alloy function that rewrites request URLs go under this object.
var proxify = {
    url: (url, type) => {

        if (!url) return;

        var proxified;
        // If type equals "true" then the function will decode "/prefix/_aHR0cHM6Ly9kaXNjb3JkLmNvbQ==_/" to "https://discord.com/".
        //By default, the function will proxify the URL with the proxy prefix and base64 encoded URL origin.
        switch(type) {
            case true:
                proxified = atob(url.replace(alloy.prefix, '').split('_').slice(1).splice(0, 1).join()) + url.split('_').slice(2).join('_');
            break;

            default:

                if (url.match(/^(#|about:|data:|blob:|mailto:|javascript:|{|\*)/) || url.startsWith(alloy.prefix) || url.startsWith(window.location.origin + alloy.prefix)) return url;

                if (url.startsWith(window.location.origin + '/') && !url.startsWith(window.location.origin + alloy.prefix)) url = '/' + url.split('/').splice(3).join('/');

                if (url.startsWith('//')) url = 'http:' + url;
                if (url.startsWith('/') && !url.startsWith(alloy.prefix)) url = alloy.url.origin + url;

                if (url.startsWith('https://') || url.startsWith('http://')) url = new URL(url);
                else url = new URL(alloy.url.href.split('/').slice(0, -1).join('/') + '/' + url);

                proxified = alloy.prefix + '_' + btoa(url.href.split('/').splice(0, 3).join('/')) + '_' + "/" + url.href.split('/').splice(3).join('/');

            break;    
        }
        return proxified;
    }
};

// Customized URL proxifier for any DOM element or HTTP request function that can get morphed by <base> element.
proxify.url_http = url => {

    if (url.match(/^(#|about:|data:|blob:|mailto:|javascript:|{|\*)/) || url.startsWith(alloy.prefix) || url.startsWith(window.location.origin + alloy.prefix)) return url;
    
    // Rewriting based on <base> element href needs to be developed more.
    if (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('//')) return proxify.url(url);
    else if (alloy.baseURL) {
        if (url.startsWith('/')) return url = proxify.url(alloy.baseURL.split('/').splice(0, 3).join('/') + url);
        else return url = proxify.url(alloy.baseURL.split('/').slice(0, -1).join('/') + '/' + url);
    } else return proxify.url(url);
};


let originalFetch = window.fetch,
    originalXMLOpen = window.XMLHttpRequest.prototype.open,
    originalOpen = window.open,
    originalPostMessage = window.postMessage,
    originalSendBeacon = window.Navigator.prototype.sendBeacon;

// HTTP request function proxifying.

window.fetch = function(url, options) {

    if (url) (url.replace(location.hostname, alloy.url.hostname), url = proxify.url_http(url));
    return originalFetch.apply(this, arguments);
};
window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
    if (url) (url.replace(location.hostname, alloy.url.hostname), url = proxify.url_http(url));
    return originalXMLOpen.apply(this, arguments);
};
window.open = function(url, windowName, windowFeatures) {
    if (url) url = proxify.url(url);
    return originalOpen.apply(this, arguments);
};
window.postMessage = function(msg, origin, transfer) {
    if (origin) origin = location.origin;
    return originalPostMessage.apply(this, arguments);
};
window.Navigator.prototype.sendBeacon = function(url, data) {
    if (url) url = proxify.url(url);
    return originalSendBeacon.apply(this, arguments);
};

// Websocket function proxifying.
window.WebSocket = new Proxy(window.WebSocket, {
    construct(target, args) {
        var protocol;
        if (location.protocol == 'https:') protocol = 'wss://'; else protocol = 'ws://'; 

        args[0] = protocol + location.origin.split('/').splice(2).join('/') + alloy.prefix + '?ws=' + btoa(args[0]) + '&origin=' + btoa(alloy.url.origin);

        return Reflect.construct(target, args);
    }
});

// DOM element proxifying.

// Element.innerHTML & Element.outerHTML proxifying.
proxify.elementHTML = element_array => {
    element_array.forEach(element => {
        Object.defineProperty(element.prototype, 'innerHTML', {
            set(value) {
                const elem = new DOMParser().parseFromString(Object.getOwnPropertyDescriptor(window.Element.prototype, "outerHTML").get.call(this), 'text/html').body.querySelectorAll('*')[0];
                Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML").set.call(elem, value);
                elem.querySelectorAll("script[src], iframe[src], embed[src], audio[src], img[src], input[src], source[src], track[src], video[src]").forEach(node => node.setAttribute('src', node.getAttribute('src')));
                elem.querySelectorAll("object[data]").forEach(node => node.setAttribute('data', node.getAttribute('data')));
                elem.querySelectorAll("a[href], link[href], area[href").forEach(node => node.setAttribute('href', node.getAttribute('href')));
                return Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML").set.call(this, elem.innerHTML);
            },
            get() {
                return Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML").get.call(this);
            }
        });
        Object.defineProperty(element.prototype, 'outerHTML', {
            set(value) {
                const elem = new DOMParser().parseFromString(Object.getOwnPropertyDescriptor(window.Element.prototype, "outerHTML").get.call(this), 'text/html').body;
                Object.getOwnPropertyDescriptor(window.Element.prototype, "outerHTML").set.call(elem.querySelectorAll('*')[0], value);
                elem.querySelectorAll("script[src], iframe[src], embed[src], audio[src], img[src], input[src], source[src], track[src], video[src]").forEach(node => node.setAttribute('src', node.getAttribute('src')));
                elem.querySelectorAll("object[data]").forEach(node => node.setAttribute('data', node.getAttribute('data')));
                elem.querySelectorAll("a[href], link[href], area[href").forEach(node => node.setAttribute('href', node.getAttribute('href')));
                return Object.getOwnPropertyDescriptor(window.Element.prototype, "outerHTML").set.call(this, elem.innerHTML);
            },
            get() {
                return Object.getOwnPropertyDescriptor(window.Element.prototype, "outerHTML").get.call(this);
            }
        });
    });
};

// Element.attribute 
proxify.elementAttribute = (element_array, attribute_array) => {
    element_array.forEach(element => {

        // If the element being rewritten is "script". Prevent "integrity" and "nonce" attributes from being created.
        if (element == window.HTMLScriptElement) {
            Object.defineProperty(element.prototype, 'integrity', {
                set(value) {
                    return this.removeAttribute('integrity')
                },
                get() {
                    return this.getAttribute('integrity');
                }
            });
            Object.defineProperty(element.prototype, 'nonce', {
                set(value) {
                    return this.removeAttribute('nonce')
                },
                get() {
                    return this.getAttribute('nonce');
                }
            });
        }

        element.prototype.setAttribute = new Proxy(element.prototype.setAttribute, {
            apply(target, thisArg, [ element_attribute, value ]) {
                attribute_array.forEach(array_attribute => {

                      // Customized "srcset" rewriting.
                    if (array_attribute == 'srcset' && element_attribute.toLowerCase() == array_attribute) {
                        var arr = [];

                        value.split(',').forEach(url => {
                            url = url.trimStart().split(' ');
                            url[0] = proxify.url_http(url[0]);
                            arr.push(url.join(' '));
                        });

                        return Reflect.apply(target, thisArg, [ element_attribute, arr.join(', ') ]);
                    };

                    // General attribute rewriting.
                    if (element_attribute.toLowerCase() == array_attribute) value = proxify.url_http(value);
                });
                return Reflect.apply(target, thisArg, [ element_attribute, value ]);
            }
        });

        // No need to rewrite values here because of Element.setAttribute already being proxified.
        attribute_array.forEach(attribute => {

            Object.defineProperty(element.prototype, attribute, {
                set(value) {
                    return this.setAttribute(attribute, value);
                },
                get() {
                    return this.getAttribute(attribute);
                }
            }); 

        });

    });
};


document.write = new Proxy(document.write, {
    apply(target, thisArg, args) {
        var processedHTML = new DOMParser().parseFromString(args[0], 'text/html');
        
        processedHTML.querySelectorAll("script[src], iframe[src], embed[src], audio[src], img[src], input[src], source[src], track[src], video[src]").forEach(node => node.setAttribute('src', node.getAttribute('src')));
        processedHTML.querySelectorAll("object[data]").forEach(node => node.setAttribute('data', node.getAttribute('data')));
        processedHTML.querySelectorAll("a[href], link[href], area[href").forEach(node => node.setAttribute('href', node.getAttribute('href')));

        return Reflect.apply(target, thisArg, [ processedHTML.querySelector('html').outerHTML ]);
    
    }
});


// Proxifying DOM elements here. 
proxify.elementHTML([ window.HTMLDivElement ]);
// Proxifying "href" attribute elements (Except for <base> element at this time).
proxify.elementAttribute([ window.HTMLAnchorElement, window.HTMLLinkElement, window.HTMLAreaElement ], [ 'href' ]);
// Proxifying "src" attribute elements (<img> and <source> elements proxified separately).
proxify.elementAttribute([ window.HTMLScriptElement, window.HTMLIFrameElement, window.HTMLEmbedElement, window.HTMLAudioElement, window.HTMLInputElement, window.HTMLTrackElement, window.HTMLVideoElement ], [ 'src' ]);
// Proxifying <img> and <source> elements for "src" and "srcset" attributes.
proxify.elementAttribute([ window.HTMLImageElement, HTMLSourceElement ], [ 'src', 'srcset' ]);
// Proxifying "data" attribute elements.
proxify.elementAttribute([ window.HTMLObjectElement ], [ 'data' ]);
// Proxifying "action" attribute elements.
proxify.elementAttribute([ window.HTMLFormElement ], [ 'action' ]); 


// History method proxifying.
window.History.prototype.pushState = new Proxy(window.History.prototype.pushState, {
    apply(target, thisArg, args) {

        // Discord support
        if (alloy.url.origin == atob('aHR0cHM6Ly9kaXNjb3JkLmNvbQ==') && args[2] == '/app') {
            args[2] = proxify.url(args[2])
            Reflect.apply(target, thisArg, args);
            return window.location.reload();
        }

        args[2] = proxify.url(args[2])
        return Reflect.apply(target, thisArg, args)
    }
});

window.History.prototype.replaceState = new Proxy(window.History.prototype.replaceState, {
    apply(target, thisArg, args) {
        args[2] = proxify.url(args[2])
        return Reflect.apply(target, thisArg, args)
    }
});

window.Worker = new Proxy(window.Worker, {
    construct(target, args) {
        args[0] = proxify.url(args[0]);
        return Reflect.construct(target, args);
    }
});

Object.defineProperty(document, 'cookie', {
    get() {
        var cookie = Object.getOwnPropertyDescriptor(window.Document.prototype, 'cookie').get.call(this),
                new_cookie = [],
                cookie_array = cookie.split('; ');
    
            cookie_array.forEach(cookie => {
    
                const cookie_name = cookie.split('=').splice(0, 1).join(),
                    cookie_value = cookie.split('=').splice(1).join();
    
                if (alloy.url.hostname.includes(cookie_name.split('@').splice(1).join())) new_cookie.push(cookie_name.split('@').splice(0, 1).join() + '=' + cookie_value);
    
            });
        return new_cookie.join('; ');;
    },
    set(value) {
        return Object.getOwnPropertyDescriptor(window.Document.prototype, 'cookie').set.call(this, value);
    }
}); 


// Doing this so the <script> tag calling this JS script won't interfere with DOM functions such as "insertBefore" and "appendChild".
document.currentScript.remove();