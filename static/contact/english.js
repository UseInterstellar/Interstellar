importScripts('/contact/mathematics.js');
importScripts('/contact/geography.js');

class UVServiceWorker extends EventEmitter {   
    constructor(config = __uv$config) {
        super();
        if (!config.bare) config.bare = '/outerspace/';
        this.addresses = typeof config.bare === 'string' ? [ new URL(config.bare, location) ] : config.bare.map(str => new URL(str, location));
        this.headers = {
            csp: [
                'cross-origin-embedder-policy',
                'cross-origin-opener-policy',
                'cross-origin-resource-policy',
                'content-security-policy',
                'content-security-policy-report-only',
                'expect-ct',
                'feature-policy',
                'origin-isolation',
                'strict-transport-security',
                'upgrade-insecure-requests',
                'x-content-type-options',
                'x-download-options',
                'x-frame-options',
                'x-permitted-cross-domain-policies',
                'x-powered-by',
                'x-xss-protection',
            ],
            forward: [
                'accept-encoding', 
                'connection',
                'content-length',
            ],
        };
        this.method = {
            empty: [
                'GET',
                'HEAD'
            ]
        };
        this.statusCode = {
            empty: [ 
                204,
                304,
            ],
        };  
        this.config = config;
        this.browser = Ultraviolet.Bowser.getParser(self.navigator.userAgent).getBrowserName();

        if (this.browser === 'Firefox') {
            this.headers.forward.push('user-agent');
            this.headers.forward.push('content-type');
        };
    };
    async fetch({ request }) {
        if (!request.url.startsWith(location.origin + (this.config.prefix || '/reviews/'))) {
            return fetch(request);
        };
        try {

            const ultraviolet = new Ultraviolet(this.config);

            if (typeof this.config.construct === 'function') {
                this.config.construct(ultraviolet, 'service');
            };

            const db = await ultraviolet.cookie.db();

            ultraviolet.meta.origin = location.origin;
            ultraviolet.meta.base = ultraviolet.meta.url = new URL(ultraviolet.sourceUrl(request.url));

            const requestCtx = new RequestContext(
                request, 
                this, 
                ultraviolet, 
                !this.method.empty.includes(request.method.toUpperCase()) ? await request.blob() : null
            );

            if (ultraviolet.meta.url.protocol === 'blob:') {
                requestCtx.blob = true;
                requestCtx.base = requestCtx.url = new URL(requestCtx.url.pathname);
            };

            if (request.referrer && request.referrer.startsWith(location.origin)) {
                const referer = new URL(ultraviolet.sourceUrl(request.referrer));

                if (requestCtx.headers.origin || ultraviolet.meta.url.origin !== referer.origin && request.mode === 'cors') {
                    requestCtx.headers.origin = referer.origin;
                };

                requestCtx.headers.referer = referer.href;
            };

            const cookies = await ultraviolet.cookie.getCookies(db) || [];
            const cookieStr = ultraviolet.cookie.serialize(cookies, ultraviolet.meta, false);

            if (this.browser === 'Firefox' && !(request.destination === 'iframe' || request.destination === 'document')) {
                requestCtx.forward.shift();
            };

            if (cookieStr) requestCtx.headers.cookie = cookieStr;
            requestCtx.headers.Host = requestCtx.url.host;


            const reqEvent = new HookEvent(requestCtx, null, null);
            this.emit('request', reqEvent);

            if (reqEvent.intercepted) return reqEvent.returnValue;

            const response = await fetch(requestCtx.send);

            if (response.status === 500) {
                return Promise.reject('');
            };

            const responseCtx = new ResponseContext(requestCtx, response, this);
            const resEvent = new HookEvent(responseCtx, null, null);

            this.emit('beforemod', resEvent);
            if (resEvent.intercepted) return resEvent.returnValue;

            for (const name of this.headers.csp) {
                if (responseCtx.headers[name]) delete responseCtx.headers[name];
            }; 
            
            if (responseCtx.headers.location) {
                responseCtx.headers.location = ultraviolet.rewriteUrl(responseCtx.headers.location);
            };

            if (responseCtx.headers['set-cookie']) {
                Promise.resolve(ultraviolet.cookie.setCookies(responseCtx.headers['set-cookie'], db, ultraviolet.meta)).then(() => {
                    self.clients.matchAll().then(function (clients){
                        clients.forEach(function(client){
                            client.postMessage({
                                msg: 'updateCookies',
                                url: ultraviolet.meta.url.href,
                            });
                        });
                    });
                });
                delete responseCtx.headers['set-cookie'];
            };

            if (responseCtx.body) {
                switch(request.destination) {
                    case 'script':
                    case 'worker':
                        responseCtx.body = `if (!self.__uv && self.importScripts) importScripts('${__uv$config.bundle}', '${__uv$config.config}', '${__uv$config.handler}');\n`;
                        responseCtx.body += ultraviolet.js.rewrite(
                            await response.text()
                        );
                        break;
                    case 'style':
                        responseCtx.body = ultraviolet.rewriteCSS(
                            await response.text()
                        ); 
                        break;
                case 'iframe':
                case 'document':
                        if (isHtml(ultraviolet.meta.url, (responseCtx.headers['content-type'] || ''))) {
                            responseCtx.body = ultraviolet.rewriteHtml(
                                await response.text(), 
                                { 
                                    document: true ,
                                    injectHead: ultraviolet.createHtmlInject(
                                        this.config.handler, 
                                        this.config.bundle, 
                                        this.config.config,
                                        ultraviolet.cookie.serialize(cookies, ultraviolet.meta, true), 
                                        request.referrer
                                    )
                                }
                            );      
                        };
                };
            };

            if (requestCtx.headers.accept === 'text/event-stream') {
                responseCtx.headers['content-type'] = 'text/event-stream';
            };

            this.emit('response', resEvent);
            if (resEvent.intercepted) return resEvent.returnValue;

            return new Response(responseCtx.body, {
                headers: responseCtx.headers,
                status: responseCtx.status,
                statusText: responseCtx.statusText,
            });

        } catch(err) {
            return new Response(err.toString(), {
                status: 500,
            });
        };
    };
    getBarerResponse(response) {
        const headers = {};
        const raw = JSON.parse(response.headers.get('x-bare-headers'));

        for (const key in raw) {
            headers[key.toLowerCase()] = raw[key];
        };

        return {
            headers,
            status: +response.headers.get('x-bare-status'),
            statusText: response.headers.get('x-bare-status-text'),
            body: !this.statusCode.empty.includes(+response.headers.get('x-bare-status')) ? response.body : null,
        };
    };
    get address() {
        return this.addresses[Math.floor(Math.random() * this.addresses.length)];
    };
    static Ultraviolet = Ultraviolet;
};

self.UVServiceWorker = UVServiceWorker;


class ResponseContext {
    constructor(request, response, worker) {
        const { headers, status, statusText, body } = !request.blob ? worker.getBarerResponse(response) : {
            status: response.status, 
            statusText: response.statusText,
            headers: Object.fromEntries([...response.headers.entries()]),
            body: response.body,
        };
        this.request = request;
        this.raw = response;
        this.ultraviolet = request.ultraviolet;
        this.headers = headers;
        this.status = status;
        this.statusText = statusText;
        this.body = body;
    };
    get url() {
        return this.request.url;
    }
    get base() {
        return this.request.base;
    };
    set base(val) {
        this.request.base = val;
    };
};

class RequestContext {
    constructor(request, worker, ultraviolet, body = null) {
        this.ultraviolet = ultraviolet;
        this.request = request;
        this.headers = Object.fromEntries([...request.headers.entries()]);
        this.method = request.method;
        this.forward = [...worker.headers.forward];
        this.address = worker.address;
        this.body = body || null;
        this.redirect = request.redirect;
        this.credentials = 'omit';
        this.mode = request.mode === 'cors' ? request.mode : 'same-origin';
        this.blob = false;
    };
    get send() {
        return new Request((!this.blob ? this.address.href + 'v1/' : 'blob:' + location.origin + this.url.pathname), {
            method: this.method,
            headers: {
                'x-bare-protocol': this.url.protocol,
                'x-bare-host': this.url.hostname,
                'x-bare-path': this.url.pathname + this.url.search,
                'x-bare-port': this.url.port || (this.url.protocol === 'https:' ? '443' : '80'),
                'x-bare-headers': JSON.stringify(this.headers),
                'x-bare-forward-headers': JSON.stringify(this.forward),
                'userKey': userKey,
            },
            redirect: this.redirect,
            credentials: this.credentials,
            mode: location.origin !== this.address.origin ? 'cors' : this.mode,
            body: this.body
        });
    };
    get url() {
        return this.ultraviolet.meta.url;
    };
    set url(val) {
        this.ultraviolet.meta.url = val;
    };
    get base() {
        return this.ultraviolet.meta.base;
    };
    set base(val) {
        this.ultraviolet.meta.base = val;
    };
}

function isHtml(url, contentType = '') {
    return (Ultraviolet.mime.contentType((contentType  || url.pathname)) || 'text/html').split(';')[0] === 'text/html';
};

class HookEvent {
    #intercepted;
    #returnValue;
    constructor(data = {}, target = null, that = null) {
        this.#intercepted = false;
        this.#returnValue = null;
        this.data = data;
        this.target = target;
        this.that = that;
    };
    get intercepted() {
        return this.#intercepted;
    };
    get returnValue() {
        return this.#returnValue;
    };
    respondWith(input) {
        this.#returnValue = input;
        this.#intercepted = true;
    };
};  

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}