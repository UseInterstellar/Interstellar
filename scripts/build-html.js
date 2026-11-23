import { bootScript, buildSingleFile } from "./singlefile.js";

const wrap = ({ payload, cacheName, loaderName, count }) => `<!doctype html>
<html lang="en" data-singlefile>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Loading</title>
</head>
<body data-shell="true" style="margin:0;background:#000;color:#ccc;font:14px sans-serif">
<iframe id="f" allow="fullscreen; autoplay; clipboard-read; clipboard-write; microphone; camera; encrypted-media; gamepad" style="position:fixed;top:0;left:0;width:100%;height:100%;border:0;margin:0"></iframe>
<div id="m" style="position:fixed;top:0;left:0;right:0;padding:16px;display:none"></div>
<pre id="p" style="display:none">${payload}</pre>
<script>
${bootScript({ cacheName, loaderName, count })}
</script>
</body>
</html>
`;

await buildSingleFile({ kind: "html", wrap });
