self.__uv$config = {
    prefix: "/~/uv/",
    bare: "/bare/",
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: "/sw/uv/uv.handler.js",
    client: "/sw/uv/uv.client.js",
    bundle: "/sw/uv/uv.bundle.js",
    config: "/sw/uv/uv.config.js",
    sw: "/sw/uv/uv.sw.js"
}