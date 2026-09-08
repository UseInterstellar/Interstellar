self.__uv$config = {
  prefix: "/uv/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/assets/ultraviolet/uv.handler.js",
  client: "/assets/ultraviolet/uv.client.js",
  bundle: "/assets/ultraviolet/uv.bundle.js",
  config: "/assets/ultraviolet/uv.config.js",
  sw: "/assets/ultraviolet/uv.sw.js",
};
