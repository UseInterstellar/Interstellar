self.__uv$config = {
    prefix: '/reviews/',
    bare: '/outerspace/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/contact/handler.js',
    bundle: '/contact/bundle.js',
    config: '/contact/config.js',
    sw: '/contact/sw.js',
};
