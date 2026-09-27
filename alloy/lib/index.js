const http = require('http'),
    https = require('https'),
    fs = require('fs'),
    zlib = require('zlib'),
    querystring = require('querystring'),
    WebSocket = require('ws'),
    btoa = str => new Buffer.from(str).toString('base64'),
    atob = str => new Buffer.from(str, 'base64').toString('utf-8');

module.exports = class {
    // Constructor function.
    constructor(prefix = "/web/", config = {}) {
        this.prefix = prefix;
        this.config = config;
        this.proxifyRequestURL = (url, type) => type ? atob(url.split('_').slice(1).splice(0, 1).join()) + url.split('_').slice(2).join('_') : `_${btoa(url.split('/').splice(0, 3).join('/'))}_/${url.split('/').splice(3).join('/')}`

        if (!prefix.startsWith('/')) this.prefix = '/' + prefix;
        if (!prefix.endsWith('/')) this.prefix = prefix + '/';   
    };
    // HTTP(S) proxy.
    http(req, res, next = () => res.end('')) {

        if (!req.url.startsWith(this.prefix)) return next();

        // Defining alternatives to `req.url` that don't contain web proxy prefix (req.path) and with the additional prop (req.pathname) not containing any hash or query params.
        req.path = req.url.replace(this.prefix.slice(1), '');
        req.pathname = req.path.split('#')[0].split('?')[0];
        
        if (req.pathname == '/client_hook' || req.pathname == '/client_hook/') return res.end(fs.readFileSync(__dirname + '/window.js', 'utf-8'));
    
        try {new URL(this.proxifyRequestURL(req.path, true))} catch {return res.end('URL Parse Error')};
    
        var proxyURL = {
            href: this.proxifyRequestURL(req.path, true),
            origin: this.proxifyRequestURL(req.path, true).split('/').splice(0, 3).join('/'),
            hostname: this.proxifyRequestURL(req.path, true).split('/').splice(0, 3).slice(2).join('/')
        },
            proxify = {},
            isBlocked = false,
            protocol = proxyURL.href.startsWith('https://') ? https : http, 
            proxyOptions = {
                headers: Object.assign({}, req.headers),
                method: req.method,
                rejectUnauthorized: false
            };
    
        if (proxyURL.href.startsWith('https://') || proxyURL.href.startsWith('http://')); else return res.end('URL Parse Error');
    
        delete proxyOptions.headers['host']; 
    
        // URL hostname blocklist.
        if (typeof this.config.blacklist == 'object' && this.config.blacklist.length != 0) this.config.blacklist.forEach(blacklisted => proxyURL.hostname == blacklisted ? isBlocked = true : isBlocked = false);
        if (isBlocked) return res.end('The URL you are trying to access is not permitted for use.')

        if (!req.path.startsWith(`/_${btoa(proxyURL.origin)}_/`)) return (res.writeHead(308, { location: this.prefix + `_${btoa(proxyURL.origin)}_/`}), res.end(''));
    
        // Proxifying "Origin" request header. Vital since some websites might have a failsafe for their API involving the "Origin" request header.
        if (proxyOptions.headers['origin']) {
            var proxified_header = this.proxifyRequestURL(`/${proxyOptions.headers['origin'].split('/').splice(3).join('/')}`.replace(this.prefix, ''), true);
            if (proxified_header.startsWith('https://') || proxified_header.startsWith('http://')) proxified_header = proxified_header.split('/').splice(0, 3).join('/');
            else proxified_header = proxyURL.origin;
            proxyOptions.headers['origin'] = proxified_header;
        }
    
        // Proxifying "Referer" request header. Vital since some websites might have a failsafe for their API involving the "Referer" request header.
        if (proxyOptions.headers['referer']) {
    
            var proxified_header = this.proxifyRequestURL('/' + proxyOptions.headers['referer'].split('/').splice(3).join('/').replace(this.prefix, ''), true);
            if (proxified_header.startsWith('https://') || proxified_header.startsWith('http://')) proxified_header = proxified_header;
            else proxified_header = proxyURL.href;
    
            proxyOptions.headers['referer'] = proxified_header;
    
        }
    
    
        if (proxyOptions.headers['cookie']) {        
            var new_cookie = [],
                cookie_array = proxyOptions.headers['cookie'].split('; ');
    
            cookie_array.forEach(cookie => {
    
                const cookie_name = cookie.split('=').splice(0, 1).join(),
                    cookie_value = cookie.split('=').splice(1).join();
    
                if (proxyURL.hostname.includes(cookie_name.split('@').splice(1).join())) new_cookie.push(cookie_name.split('@').splice(0, 1).join() + '=' + cookie_value);
    
            });
    
            proxyOptions.headers['cookie'] = new_cookie.join('; ');
        };

        if (typeof this.config.localAddress == 'object' &&  this.config.localAddress.length != 0) proxyOptions.localAddress = this.config.localAddress[Math.floor(Math.random() * this.config.localAddress.length)];
    
        var makeRequest = protocol.request(proxyURL.href, proxyOptions, proxyResponse => {
    
            var rawData = [],
                sendData = '';
        
            proxyResponse.on('data', data => rawData.push(data)).on('end', () => {
    
                const inject_config = {
                    prefix: this.prefix,
                    url: proxyURL.href
                }
            
                // General URL proxifer.
                proxify.url = url => {
             
                     if (url.match(/^(#|about:|data:|blob:|mailto:|javascript:|{|\*)/)) return url;
             
                     if (url.startsWith('//')) url = new URL('http:' + url);
                     else if (url.startsWith('/')) url = new URL(proxyURL.origin + url);
                     else if (url.startsWith('https://') || url.startsWith('http://')) url = new URL(url);
                     else url = new URL(proxyURL.href.split('/').slice(0, -1).join('/') + '/' + url);
                     
                     if (url.protocol == 'https:' || url.protocol == 'http:') return this.prefix + this.proxifyRequestURL(url.href);
                     else return url.href; 
             
                 };
             
                 // Javascript "location" object proxifier. Will be replaced in the future with a more efficient one.
                 proxify.js = buffer => buffer.toString().replace(/(,| |=|\()document.location(,| |=|\)|\.)/gi, str => { return str.replace('.location', `.alloyLocation`); })
                     .replace(/(,| |=|\()window.location(,| |=|\)|\.)/gi, str => { return str.replace('.location', `.alloyLocation`); })
                     .replace(/(,| |=|\()location(,| |=|\)|\.)/gi, str => { return str.replace('location', `alloyLocation`); });
                
             
                 // CSS proxifier.
                 proxify.css = buffer => {
                     return buffer.replace(/url\("(.*?)"\)/gi, str => {
                         var url = str.replace(/url\("(.*?)"\)/gi, '$1');
                         return `url("${proxify.url(url)}")`;
                     }).replace(/url\('(.*?)'\)/gi, str => {
                         var url = str.replace(/url\('(.*?)'\)/gi, '$1');
                         return `url('${proxify.url(url)}')`;
                     }).replace(/url\((.*?)\)/gi, str => {
                         var url = str.replace(/url\((.*?)\)/gi, '$1');
             
                         if (url.startsWith(`"`) || url.startsWith(`'`)) return str;
             
                         return `url("${proxify.url(url)}")`;
                     }).replace(/@import (.*?)"(.*?)";/gi, str => {
                         var url = str.replace(/@import (.*?)"(.*?)";/, '$2');
                         return `@import "${proxify.url(url)}";`
                     }).replace(/@import (.*?)'(.*?)';/gi, str => {
                         var url = str.replace(/@import (.*?)'(.*?)';/, '$2');
                         return `@import '${proxify.url(url)}';`
                     })
                 };
            
                 // DOM based HTML proxifier.
                 proxify.html = body => {
            
                    const html = new (require('./dom')).JSDOM(body, {contentType: 'text/html'}), document = html.window.document;
            
                    var base_tag = false;    
            
                    if (document.querySelector('head base')) base_tag = document.querySelector('head base').getAttribute('href');
            
                    // Sloppy due to having to release this fast.
                    if (base_tag) {
            
                        if (base_tag.includes('#') || base_tag.includes('?')) base_tag = base_tag.split('#')[0].split('?')[0];
            
                        if (base_tag.startsWith('//')) base_tag = 'http:' + base_tag;
            
                        if (base_tag.startsWith('https://') || base_tag.startsWith('http://')) base_tag = new URL(base_tag).href;
                        else if (base_tag.startsWith('/')) base_tag = new URL(proxyURL.origin + base_tag).href;
                        else base_tag = new URL(proxyURL.href.split('/').slice(0, -1).join('/') + '/' + base_tag).href;
            
                        inject_config.baseURL = base_tag;
            
                    };
            
                    proxify.attribute = attribute => {
                        if (attribute.startsWith('https://') || attribute.startsWith('http://') || attribute.startsWith('//')) return proxify.url(attribute);
                        else if (base_tag) {
                            if (attribute.startsWith('/')) return attribute = proxify.url(base_tag.split('/').splice(0, 3).join('/') + attribute);
                            else return attribute = proxify.url(base_tag.split('/').slice(0, -1).join('/') + '/' + attribute);
                        } else return proxify.url(attribute);
                    };
            
                    // Removing all "nonce" and "integrity" attributes.    
                    document.querySelectorAll('*').forEach(node => {
                        if (node.getAttribute('nonce')) node.removeAttribute('nonce');
                        if (node.getAttribute('integrity')) node.removeAttribute('integrity');
                        if (node.getAttribute('style')) node.setAttribute('style', proxify.css(node.getAttribute('style')));
                    });
            
                    // Rewriting "src" attributes on elements.
                    document.querySelectorAll("script, embed, iframe, audio, video, img, input, source, track").forEach(node => {
                        if (node.src) node.src = proxify.attribute(node.src);
                        if (node.tagName.toLowerCase() == 'script' && node.innerHTML != '') node.innerHTML = proxify.js(node.innerHTML);
                    });
            
                    document.querySelectorAll("img[srcset], source[srcset]").forEach(node => {
                            var arr = [];
            
                            node.srcset.split(',').forEach(url => {
                                url = url.trimStart().split(' ');
                                url[0] = proxify.attribute(url[0]);
                                arr.push(url.join(' '));
                            });
            
                            node.srcset = arr.join(', ')
                    });
            
                    // Rewriting "href" attributes on elements.
                    document.querySelectorAll("a, link, area").forEach(node => {
                        if (node.href) node.href = proxify.attribute(node.href);
                    });
            
                    document.querySelectorAll('base').forEach(node => node.href = proxify.attribute(node.href));
            
                    // Rewriting "action" attribute for forms.
                    document.querySelectorAll('form').forEach(node => {
                        if (node.action) node.action = proxify.attribute(node.action);
                    });
            
                    document.querySelectorAll('style').forEach(node => {
                        node.textContent = proxify.css(node.textContent);
                    });
            
                    // Creating injection script element.
                    const inject_script = document.createElement('script');
            
                    // Setting injection script attributes.
                    inject_script.src = this.prefix + 'client_hook';
                    inject_script.setAttribute('data-config', btoa(JSON.stringify(inject_config)));
            
                    // Putting "script" element for injection in the beginning of "head" element.
                    document.querySelector('head').insertBefore(inject_script, document.querySelector('head').childNodes[0])
            
                    return html.serialize();
            
                 };
    
                // Handling response body Content-Encoding.
                if (rawData.length != 0) switch(proxyResponse.headers['content-encoding']) {
                    case 'gzip':
                        sendData = zlib.gunzipSync(Buffer.concat(rawData));
                    break;
                    case 'deflate':
                        sendData = zlib.inflateSync(Buffer.concat(rawData));
                    break;
                    case 'br':
                        sendData = zlib.brotliDecompressSync(Buffer.concat(rawData));
                    break;
                    default: sendData = Buffer.concat(rawData); break;
                };
    
                // Handling response headers.
                Object.entries(proxyResponse.headers).forEach(([header_name, header_value]) => {
                    if (header_name == 'set-cookie') {
                        const cookie_array = [];
                        header_value.forEach(cookie => cookie_array.push(cookie.replace(/Domain=(.*?);/gi, `Domain=` + req.headers['host'] + ';').replace(/(.*?)=(.*?);/, '$1' + '@' + proxyURL.hostname + `=` + '$2' + ';')));
                        proxyResponse.headers[header_name] = cookie_array;
            
                    };
            
                    if (header_name.startsWith('content-encoding') || header_name.startsWith('x-') || header_name.startsWith('cf-') || header_name.startsWith('strict-transport-security') || header_name.startsWith('content-security-policy') || header_name.startsWith('content-length')) delete proxyResponse.headers[header_name];
            
                    if (header_name == 'location') proxyResponse.headers[header_name] = proxify.url(header_value);
                });
    
                // Rewriting the response body based off of the Content-Type response header.
                if (proxyResponse.headers['content-type'] && proxyResponse.headers['content-type'].startsWith('text/html')) sendData = proxify.html(sendData.toString());
                else if (proxyResponse.headers['content-type'] && (proxyResponse.headers['content-type'].startsWith('application/javascript') || proxyResponse.headers['content-type'].startsWith('text/javascript'))) sendData = proxify.js(sendData.toString());
                else if (proxyResponse.headers['content-type'] && proxyResponse.headers['content-type'].startsWith('text/css')) sendData = proxify.css(sendData.toString());
    
                // Sending proxy response with processed headers and body.
                res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
                res.end(sendData);
    
            });
    
        });
    
        makeRequest.on('error', err => res.end(err.toString()))
        
        if (!res.writableEnded) req.on('data', data => makeRequest.write(data)).on('end', () => makeRequest.end());
    
    };
    // Websocket Proxy
    ws(server) {
        new WebSocket.Server({server: server}).on('connection', (cli, req) => {

            var queryParams = querystring.parse(req.url.split('?').splice(1).join('?')), proxyURL, options = { 
                headers: {},
                followRedirects: true
            }, protocol = [];
        
            if (!queryParams.ws) return cli.close();
        
            proxyURL = atob(queryParams.ws);
        
            try { new URL(proxyURL) } catch{ return cli.close() };
        
            Object.entries(req.headers).forEach(([header_name, header_value]) => {
               if (header_name == 'sec-websocket-protocol') header_value.split(', ').forEach(proto => protocol.push(proto));
               if (header_name.startsWith('cf-') || header_name.startsWith('cdn-loop'));
               else if (!header_name.startsWith('sec-websocket'))  options.headers[header_name] = header_value;
            })
        
            if (queryParams.origin) (options.origin = atob(queryParams.origin), options.headers.origin = atob(queryParams.origin));        
        
            delete options.headers['host'];
            delete options.headers['cookie'];
        
            if (typeof this.config.localAddress == 'object' &&  this.config.localAddress.length != 0) options.localAddress = this.config.localAddress[Math.floor(Math.random() * this.config.localAddress.length)];

            const proxy = new WebSocket(proxyURL, protocol, options),
                before_open = [];
        
            if (proxy.readyState == 0) cli.on('message', data => before_open.push(data));
        
            cli.on('close', () => proxy.close());
            proxy.on('close', () => cli.close());
            cli.on('error', () => proxy.terminate())
            proxy.on('error', () => cli.terminate());
        
            proxy.on('open', () => {
        
                if (before_open.length != 0) before_open.forEach(data => proxy.send(data))
        
                cli.on('message', data => proxy.send(data));
                proxy.on('message', data => cli.send(data));
        
            
            });
        
        });
    };
}; 
