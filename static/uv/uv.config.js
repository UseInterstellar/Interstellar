/*global Ultraviolet*/
self.__uv$config = {
    prefix: '/service/',
    bare: '/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/worksheets/uv/uv.handler.js',
    client: '/worksheets/uv/uv.client.js',
    bundle: '/worksheets/uv/uv.bundle.js',
    config: '/worksheets/uv/uv.config.js',
    sw: '/worksheets/uv/uv.sw.js',
};