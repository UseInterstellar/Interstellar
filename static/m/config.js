self.__uv$config = {
    prefix: '/a/',
    bare: '/v/',
    encodeUrl:  Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/m/handler.js',
    bundle: '/m/bundle.js',
    config: '/m/config.js',
    sw: '/m/sw.js?v=2',
};