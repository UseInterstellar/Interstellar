import { bootScript, buildSingleFile } from "./singlefile.js";

const wrap = ({ payload, cacheName, loaderName, count }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
<title>Loading</title>
<foreignObject x="0" y="0" width="100%" height="100%">
<body xmlns="http://www.w3.org/1999/xhtml" style="margin:0;background:#000;color:#ccc;font:14px sans-serif">
<iframe id="f" allow="fullscreen; autoplay; clipboard-read; clipboard-write; microphone; camera; encrypted-media; gamepad" style="position:fixed;top:0;left:0;width:100%;height:100%;border:0;margin:0"></iframe>
<div id="m" style="position:fixed;top:0;left:0;right:0;padding:16px;display:none"></div>
<pre id="p" style="display:none">${payload}</pre>
<script><![CDATA[
${bootScript({ cacheName, loaderName, count })}
]]></script>
</body>
</foreignObject>
</svg>
`;

await buildSingleFile({ kind: "svg", wrap });
