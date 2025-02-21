import path from "node:path";
import fetch from "node-fetch";
import mime from "mime";

const cache = new Map();
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // Cache for 30 Days

export async function handler(event) {
  const reqPath = event.path.replace("/.netlify/functions/fetch-asset", "");

  if (cache.has(reqPath)) {
    const { data, contentType, timestamp } = cache.get(reqPath);
    if (Date.now() - timestamp <= CACHE_TTL) {
      return {
        statusCode: 200,
        headers: { "Content-Type": contentType },
        body: data.toString("base64"),
        isBase64Encoded: true,
      };
    } else {
      cache.delete(reqPath);
    }
  }

  const baseUrls = {
    "/e/1/": "https://raw.githubusercontent.com/qrs/x/fixy/",
    "/e/2/": "https://raw.githubusercontent.com/3v1/V5-Assets/main/",
    "/e/3/": "https://raw.githubusercontent.com/3v1/V5-Retro/master/",
  };

  let reqTarget;
  for (const [prefix, baseUrl] of Object.entries(baseUrls)) {
    if (reqPath.startsWith(prefix)) {
      reqTarget = baseUrl + reqPath.slice(prefix.length);
      break;
    }
  }

  if (!reqTarget) {
    return { statusCode: 404, body: "Asset not found." };
  }

  try {
    const asset = await fetch(reqTarget);
    if (!asset.ok) {
      return { statusCode: 404, body: "Failed to fetch asset." };
    }

    const data = Buffer.from(await asset.arrayBuffer());
    const ext = path.extname(reqTarget);
    const contentType = [".unityweb"].includes(ext)
      ? "application/octet-stream"
      : mime.getType(ext) || "application/octet-stream";

    cache.set(reqPath, { data, contentType, timestamp: Date.now() });

    return {
      statusCode: 200,
      headers: { "Content-Type": contentType },
      body: data.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("Error fetching asset:", error);
    return { statusCode: 500, body: "Error fetching asset." };
  }
}
