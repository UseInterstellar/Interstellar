self.__dynamic$config = {
	prefix: "/uv/dynamic/",
	encoding: "xor",
	mode: "production",
	logLevel: 0,
	bare: {
		version: 2,
		path: "/bare/",
	},
	tab: {
		title: null,
		icon: null,
		ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.3",
	},
	assets: {
		prefix: "/assets/dynamic/",
		files: {
			handler: "handler.js",
			client: "client.js",
			worker: "worker.js",
			config: "config.js",
			inject: "",
		},
	},
	block: [],
};
