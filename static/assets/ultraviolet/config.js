self.__uv$config = {
  prefix: "/uv/",
  bare: "/bare/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/assets/ultraviolet/handler.js",
  bundle: "/assets/ultraviolet/bundle.js",
  config: "/assets/ultraviolet/config.js",
  sw: "/assets/ultraviolet/sw.js",
};
