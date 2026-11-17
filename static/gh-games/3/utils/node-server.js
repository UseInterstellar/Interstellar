const fs = require("fs");
const http = require("http");
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);

app.use(express.static("..", {
	setHeaders: (res) => {
		res.set({
			"Cross-Origin-Embedder-Policy": "require-corp",
			"Cross-Origin-Opener-Policy": "same-origin",
			"Access-Control-Allow-Origin": "*"
		});
	}
}));

app.use(function(req, res) {
	res.status(404).send("<pre>Error 404</pre>");
});

server.listen(port);
console.log("Listening on port " + port);
