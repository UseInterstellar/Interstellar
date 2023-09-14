self.__uv$config = {
    prefix: '/astronomy/',
    bare: '/outerspace/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/h/uv.handler.js',
    bundle: '/h/uv.bundle.js',
    config: '/h/uv.config.js',
    sw: '/h/uv.sw.js',
};
