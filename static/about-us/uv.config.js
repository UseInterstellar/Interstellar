/*global Ultraviolet*/
self.__uv$config = {
    prefix: '/astronomy/',
    bare: '/outerspace/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/about-us/uv.handler.js',
    client: '/about-us/uv.client.js',
    bundle: '/about-us/uv.bundle.js',
    config: '/about-us/uv.config.js',
    sw: '/about-us/uv.sw.js',
};
