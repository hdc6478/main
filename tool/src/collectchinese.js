const fs = require("fs");
const readline = require("readline");

const TableSplitter = "|";
let exportName;
let res = [];
let unfinishedLine;

const rl = readline.createInterface({
    input: fs.createReadStream("../../src/game/launcher/LanDef.ts", "utf8")
});

function replaceNewline(str) {
    return str.replace(/\n/g, "\\n");
}

rl.on("line", function (line) {
    let name = /export(\sconst)?(\senum)?\s([\w]+)/.exec(line);
    if (name) {
        exportName = name[3];
    }
    if (/\[[^\]]+$/.test(line)) {
        unfinishedLine = line;
        return;
    }
    if (unfinishedLine) {
        unfinishedLine += line;
    }
    if (unfinishedLine && /^[\s]+[^\[]+\][\s;]+$/.test(line)) {
        line = unfinishedLine.replace(/\r?\n/g, "");
        unfinishedLine = null;
    }
    let match = /\[?([\w.]+)\]?:?\s?=?\s?(\[?".*"\]?)/.exec(line);
    if (match) {
        let key = match[1];
        if (/^[\d]+$/.test(key)) {
            key = exportName + "_" + key;
        }
        try {
            let value = JSON.parse(match[2]);
            if (Array.isArray(value)) {
                for (let i = 0, len = value.length; i < len; i++) {
                    res.push(key + "_" + i + TableSplitter + replaceNewline(value[i]));
                }
            } else {
                res.push(key + TableSplitter + replaceNewline(value));
            }
        } catch (e) {
            console.log(line);
            console.log(e);
        }
    }
});
rl.on("close", function () {
    fs.writeFileSync("../客户端中文.txt", res.join("\n"), "utf8");
});