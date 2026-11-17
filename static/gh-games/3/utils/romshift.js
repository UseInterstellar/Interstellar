// node.js tool

const fs = require("fs");
const args = process.argv.slice(2);

if (!args[0] || !parseInt(args[0])) throw "Argument 0 needs to be the number to shift";

var romshift = parseInt(args[0]);
var romloc = args[1] || "../roms/";

function getChildFiles(dir) {
	var children = fs.readdirSync(dir);
	var files = [];
	for (var i = 0; i < children.length; i++) {
		if (!fs.statSync(dir + children[i]).isDirectory()) files.push(children[i]);
	}
	return files;
}

function avShift(array, shift) {
	for (var i = 0; i < array.length; i++) {
		array[i] += shift;
	}
	return array;
}

var roms = getChildFiles(romloc);

for (var i = 0; i < roms.length; i++) {
	fs.writeFileSync(romloc + roms[i], Buffer.from(avShift(new Uint8Array(fs.readFileSync(romloc + roms[i])), romshift)));
}

console.log("Done");
console.log(roms);
