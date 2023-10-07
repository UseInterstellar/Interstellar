/* 
importScripts("/h/mathematics.js");
importScripts("/h/geography.js");
importScripts("/h/english.js");

const sw = new UVServiceWorker();
let userKey = new URL(location).searchParams.get('userkey');

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));
*/
importScripts('/d/mathematics.js');
importScripts('/d/geography.js');
importScripts('/h/mathematics.js');
importScripts('/h/geography.js');
importScripts(__uv$config.sw || '/h/english.js');

const uv = new UVServiceWorker();
const dynamic = new Dynamic();

self.dynamic = dynamic;

self.addEventListener('fetch',
    event => {
        event.respondWith(
            (async function() {
                if (await dynamic.route(event)) {
                    return await dynamic.fetch(event);
                }

                if (event.request.url.startsWith(location.origin + "/astronomy/uv/")) {
                    return await uv.fetch(event);
                }

                return await fetch(event.request);
            })()
        );
    }
);