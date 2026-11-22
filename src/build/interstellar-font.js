import { randomInt } from "node:crypto";

const ALPHABET_GROUPS = ["abcdefghijklmnopqrstuvwxyz", "0123456789"];
const BMP_LIMIT = 0xffff;

function u16(buffer, offset) {
  return buffer.readUInt16BE(offset);
}

function u32(buffer, offset) {
  return buffer.readUInt32BE(offset);
}

function checksum(buffer) {
  let sum = 0;
  for (let offset = 0; offset < buffer.length; offset += 4) {
    let word = 0;
    for (let byte = 0; byte < 4 && offset + byte < buffer.length; byte++) word |= buffer[offset + byte] << (24 - byte * 8);
    sum = (sum + (word >>> 0)) >>> 0;
  }
  return sum;
}

function fontTables(font) {
  const count = u16(font, 4);
  const tables = new Map();
  for (let i = 0; i < count; i++) {
    const record = 12 + i * 16;
    const tag = font.toString("ascii", record, record + 4);
    const offset = u32(font, record + 8);
    const length = u32(font, record + 12);
    tables.set(tag, { record, data: font.subarray(offset, offset + length) });
  }
  return tables;
}

function cmapSubtables(cmap) {
  const count = u16(cmap, 2);
  const result = [];
  for (let i = 0; i < count; i++) {
    const record = 4 + i * 8;
    const offset = u32(cmap, record + 4);
    result.push({ platform: u16(cmap, record), encoding: u16(cmap, record + 2), offset, format: u16(cmap, offset) });
  }
  return result;
}

function parseFormat4(table, map) {
  const count = u16(table, 6) / 2;
  const endAt = 14;
  const startAt = endAt + count * 2 + 2;
  const deltaAt = startAt + count * 2;
  const rangeAt = deltaAt + count * 2;
  for (let i = 0; i < count; i++) {
    const start = u16(table, startAt + i * 2);
    const end = u16(table, endAt + i * 2);
    const delta = u16(table, deltaAt + i * 2);
    const range = u16(table, rangeAt + i * 2);
    for (let codepoint = start; codepoint <= end && codepoint < BMP_LIMIT; codepoint++) {
      let glyph;
      if (range === 0) {
        glyph = (codepoint + delta) & 0xffff;
      } else {
        const glyphAt = rangeAt + i * 2 + range + (codepoint - start) * 2;
        glyph = glyphAt + 2 <= table.length ? u16(table, glyphAt) : 0;
        if (glyph) glyph = (glyph + delta) & 0xffff;
      }
      if (glyph) map.set(codepoint, glyph);
    }
  }
}

function parseFormat12(table, map) {
  const count = u32(table, 12);
  for (let i = 0; i < count; i++) {
    const at = 16 + i * 12;
    const start = u32(table, at);
    const end = u32(table, at + 4);
    const firstGlyph = u32(table, at + 8);
    for (let codepoint = start; codepoint <= end && codepoint <= 0x10ffff; codepoint++) {
      const glyph = firstGlyph + codepoint - start;
      if (glyph) map.set(codepoint, glyph);
    }
  }
}

function buildFormat4(map) {
  const entries = [...map]
    .filter(([codepoint, glyph]) => codepoint < BMP_LIMIT && glyph > 0)
    .sort(([a], [b]) => a - b);
  const segments = [];
  for (const [codepoint, glyph] of entries) {
    const last = segments.at(-1);
    if (last && codepoint === last.end + 1) {
      last.end = codepoint;
      last.glyphs.push(glyph);
    } else {
      segments.push({ start: codepoint, end: codepoint, glyphs: [glyph] });
    }
  }
  segments.push({ start: BMP_LIMIT, end: BMP_LIMIT, glyphs: null });

  const count = segments.length;
  const glyphCount = segments.reduce((total, segment) => total + (segment.glyphs?.length ?? 0), 0);
  const output = Buffer.alloc(16 + count * 8 + glyphCount * 2);
  output.writeUInt16BE(4, 0);
  output.writeUInt16BE(output.length, 2);
  output.writeUInt16BE(0, 4);
  output.writeUInt16BE(count * 2, 6);
  const searchRangePower = 2 ** Math.floor(Math.log2(count));
  output.writeUInt16BE(searchRangePower * 2, 8);
  output.writeUInt16BE(Math.log2(searchRangePower), 10);
  output.writeUInt16BE(count * 2 - searchRangePower * 2, 12);
  const endAt = 14;
  const startAt = endAt + count * 2 + 2;
  const deltaAt = startAt + count * 2;
  const rangeAt = deltaAt + count * 2;
  const glyphAt = rangeAt + count * 2;
  let glyphIndex = 0;
  for (let i = 0; i < count; i++) {
    const segment = segments[i];
    output.writeUInt16BE(segment.end, endAt + i * 2);
    output.writeUInt16BE(segment.start, startAt + i * 2);
    output.writeUInt16BE(segment.glyphs ? 0 : 1, deltaAt + i * 2);
    if (!segment.glyphs) {
      output.writeUInt16BE(0, rangeAt + i * 2);
      continue;
    }
    const firstGlyphOffset = glyphAt + glyphIndex * 2;
    const rangeOffset = firstGlyphOffset - (rangeAt + i * 2);
    if (rangeOffset > 0xffff) throw new Error("Inter font cmap format 4 offset overflow");
    output.writeUInt16BE(rangeOffset, rangeAt + i * 2);
    for (const glyph of segment.glyphs) output.writeUInt16BE(glyph, glyphAt + glyphIndex++ * 2);
  }
  return output;
}

function buildFormat12(map) {
  const entries = [...map].filter(([, glyph]) => glyph > 0).sort(([a], [b]) => a - b);
  const groups = [];
  for (const [codepoint, glyph] of entries) {
    const last = groups.at(-1);
    if (last && codepoint === last.end + 1 && glyph === last.firstGlyph + codepoint - last.start) {
      last.end = codepoint;
    } else {
      groups.push({ start: codepoint, end: codepoint, firstGlyph: glyph });
    }
  }
  const output = Buffer.alloc(16 + groups.length * 12);
  output.writeUInt16BE(12, 0);
  output.writeUInt32BE(output.length, 4);
  output.writeUInt32BE(0, 8);
  output.writeUInt32BE(groups.length, 12);
  groups.forEach((group, index) => {
    const at = 16 + index * 12;
    output.writeUInt32BE(group.start, at);
    output.writeUInt32BE(group.end, at + 4);
    output.writeUInt32BE(group.firstGlyph, at + 8);
  });
  return output;
}

function buildCmap(fontMap) {
  const format4 = buildFormat4(fontMap);
  const format12 = buildFormat12(fontMap);
  const format12At = 36 + format4.length + (format4.length % 4 ? 4 - (format4.length % 4) : 0);
  const output = Buffer.alloc(format12At + format12.length);
  output.writeUInt16BE(0, 0);
  output.writeUInt16BE(4, 2);
  const records = [
    [0, 3, 36],
    [0, 4, format12At],
    [3, 1, 36],
    [3, 10, format12At],
  ];
  records.forEach(([platform, encoding, offset], index) => {
    const at = 4 + index * 8;
    output.writeUInt16BE(platform, at);
    output.writeUInt16BE(encoding, at + 2);
    output.writeUInt32BE(offset, at + 4);
  });
  format4.copy(output, 36);
  format12.copy(output, format12At);
  return output;
}

function rebuildFont(source, cmap) {
  const tables = fontTables(source);
  if (!tables.has("head") || !tables.has("cmap")) throw new Error("Inter source must be an OpenType TrueType font");
  const entries = [...tables.entries()]
    .filter(([tag]) => tag !== "DSIG")
    .map(([tag, table]) => [tag, tag === "cmap" ? cmap : Buffer.from(table.data)]);
  const count = entries.length;
  const header = Buffer.from(source.subarray(0, 12 + count * 16));
  const outputParts = [header];
  let offset = header.length;
  let headOffset = -1;
  const directory = [];
  for (const [tag, data] of entries) {
    while (offset % 4) {
      outputParts.push(Buffer.from([0]));
      offset++;
    }
    const aligned = Buffer.from(data);
    if (tag === "head") {
      aligned.writeUInt32BE(0, 8);
      headOffset = offset;
    }
    const record = Buffer.alloc(16);
    record.write(tag, 0, 4, "ascii");
    record.writeUInt32BE(checksum(aligned), 4);
    record.writeUInt32BE(offset, 8);
    record.writeUInt32BE(aligned.length, 12);
    directory.push(record);
    outputParts.push(aligned);
    offset += aligned.length;
  }
  directory.forEach((record, index) => record.copy(outputParts[0], 12 + index * 16));
  const output = Buffer.concat(outputParts);
  if (headOffset < 0) throw new Error("Inter font has no head table");
  output.writeUInt32BE((0xb1b0afba - checksum(output)) >>> 0, headOffset + 8);
  return output;
}

export function createShiftedInterFont(source) {
  const subtables = cmapSubtables(fontTables(source).get("cmap").data);
  const originalFormat4 = subtables.find(entry => entry.format === 4 && (entry.platform === 3 || entry.platform === 0));
  const originalFormat12 = subtables.find(entry => entry.format === 12 && (entry.platform === 3 || entry.platform === 0));
  if (!originalFormat4 && !originalFormat12) throw new Error("Inter source has no supported Unicode cmap table");

  const glyphs = new Map();
  const cmap = fontTables(source).get("cmap").data;
  if (originalFormat12) parseFormat12(cmap.subarray(originalFormat12.offset), glyphs);
  if (originalFormat4) parseFormat4(cmap.subarray(originalFormat4.offset), glyphs);
  const originalGlyphs = new Map(glyphs);

  const encode = new Map();
  const decode = new Map();
  for (const group of ALPHABET_GROUPS) {
    const alphabet = [...group];
    let shuffled;
    do {
      shuffled = [...alphabet];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    } while (shuffled.some((character, index) => character === alphabet[index]));

    alphabet.forEach((character, index) => {
      const upperCharacter = character.toUpperCase();
      const encoded = shuffled[index];
      const upperEncoded = encoded.toUpperCase();
      const lowerGlyph = originalGlyphs.get(character.codePointAt(0));
      const upperGlyph = originalGlyphs.get(upperCharacter.codePointAt(0));
      if (!lowerGlyph || !upperGlyph) throw new Error(`Inter font is missing the ${JSON.stringify(character)} glyph pair`);
      glyphs.set(encoded.codePointAt(0), lowerGlyph);
      encode.set(character, encoded);
      decode.set(encoded, character);
      if (upperCharacter !== character) {
        glyphs.set(upperEncoded.codePointAt(0), upperGlyph);
        encode.set(upperCharacter, upperEncoded);
        decode.set(upperEncoded, upperCharacter);
      }
    });
  }

  return {
    font: rebuildFont(source, buildCmap(glyphs)),
    encode,
    decode,
  };
}

export function createTextFontRuntime(encode, decode) {
  const encoder = Object.fromEntries(encode);
  const decoder = Object.fromEntries(decode);
  return `(()=>{
    const e=${JSON.stringify(encoder)};
    const d=${JSON.stringify(decoder)};
    const enc=s=>Array.from(String(s),c=>e[c]||c).join("");
    const dec=s=>Array.from(String(s),c=>d[c]||c).join("");
    const skip=n=>!n||(n.nodeType===1&&/^(SCRIPT|STYLE|TEXTAREA|TITLE|PRE|CODE)$/.test(n.tagName))||![1,3,11].includes(n.nodeType);
    const marked=new WeakSet();
    const dp=Object.getOwnPropertyDescriptor(CharacterData.prototype,"data");
    const np=Object.getOwnPropertyDescriptor(Node.prototype,"textContent");
    const vp=Object.getOwnPropertyDescriptor(Node.prototype,"nodeValue");
    const ip=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"innerText");
    let ready=false;
    const readText=n=>{
      if(n.nodeType===3){const value=dp.get.call(n);return marked.has(n)?dec(value):value}
      if(n.nodeType===2||n.nodeType===7||n.nodeType===8||n.nodeType===9||n.nodeType===10)return null;
      let value="";
      for(const c of n.childNodes||[])if(c.nodeType!==8&&c.nodeType!==7)value+=readText(c);
      return value;
    };
    const fullyMarked=n=>{
      if(n.nodeType===3)return skip(n.parentElement)||marked.has(n);
      if(n.nodeType===1&&skip(n))return true;
      for(const c of n.childNodes||[])if(!fullyMarked(c))return false;
      return true;
    };
    const mark=n=>{
      if(!n)return;
      if(n.nodeType===3){marked.add(n);return}
      if(n.nodeType===1&&skip(n))return;
      for(const c of n.childNodes||[])mark(c);
      if(n.nodeType===1)marked.add(n);
    };
    const walk=n=>{
      if(!n)return;
      if(n.nodeType===3){
        if(!skip(n.parentElement)&&!marked.has(n)){dp.set.call(n,enc(dp.get.call(n)));marked.add(n)}
        return;
      }
      if(n.nodeType===1&&skip(n))return;
      for(const c of n.childNodes||[])walk(c);
      if(n.nodeType===1)marked.add(n);
    };
    Object.defineProperty(CharacterData.prototype,"data",{
      configurable:true,enumerable:dp.enumerable,
      get(){const value=dp.get.call(this);return marked.has(this)?dec(value):value},
      set(v){const parent=this.parentElement;const map=ready&&this.nodeType===3&&parent&&!skip(parent);dp.set.call(this,map?enc(v):v);if(map)marked.add(this)}
    });
    Object.defineProperty(Node.prototype,"textContent",{
      configurable:true,enumerable:np.enumerable,
      get(){return readText(this)},
      set(v){const map=ready&&!skip(this);np.set.call(this,map?enc(v):v);if(map)mark(this)}
    });
    if(vp)Object.defineProperty(Node.prototype,"nodeValue",{
      configurable:true,enumerable:vp.enumerable,
      get(){const value=vp.get.call(this);return this.nodeType===3&&marked.has(this)?dec(value):value},
      set(v){const parent=this.parentElement;const map=ready&&this.nodeType===3&&parent&&!skip(parent);vp.set.call(this,map?enc(v):v);if(map)marked.add(this)}
    });
    if(ip)Object.defineProperty(HTMLElement.prototype,"innerText",{
      configurable:true,enumerable:ip.enumerable,
      get(){const value=ip.get.call(this);return fullyMarked(this)?dec(value):readText(this)},
      set(v){const map=ready&&!skip(this);ip.set.call(this,map?enc(v):v);if(map)mark(this)}
    });
    const mo=new MutationObserver(ms=>{if(ready)for(const m of ms)for(const n of m.addedNodes)walk(n)});
    mo.observe(document,{subtree:true,childList:true});
    const fontReady=document.fonts?.load?document.fonts.load("16px InterstellarShift"):Promise.resolve();
    const activate=()=>{
      if(!document.body)return;
      walk(document.body);
      ready=true;
      document.body.setAttribute("data-interstellar-font-shifted","");
    };
    const activateWhenReady=()=>fontReady.then(activate,()=>{});
    if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",activateWhenReady,{once:true});
    else activateWhenReady();
  })();`;
}
