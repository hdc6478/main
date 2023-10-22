const CodePath = "D:/project/y3/main/src/";
const SkinPath = "D:/project/y3/eui_prj/resource/eui_skins/";

let fs = require("fs");
let path = require("path");
let readline = require("readline");

function walkSync(dir, res, ext) {
    res = res || [];
    let files = fs.readdirSync(dir);
    for (let f of files) {
        if (f.charAt(0) === ".") {
            continue;
        }
        let p = path.join(dir, f);
        let stat = fs.lstatSync(p);
        if (stat.isDirectory()) {
            walkSync(p, res, ext);
        } else if (stat.isFile()) {
            let extF = path.extname(f);
            if (typeof ext === "string") {
                if (extF !== ext) {
                    continue;
                }
            } else if (Array.isArray(ext)) {
                if (ext.indexOf(extF) < 0) {
                    continue;
                }
            }
            res.push(p);
        }
    }
    return res;
}

function readLineFilter(p, callback) {
    let rl = readline.createInterface({
        input: fs.createReadStream(p, "utf8")
    });
    let arr = [];
    let comment = false;
    let lineNum = 0;
    rl.on("line", function (line) {
        lineNum++;
        let source = line;
        if (line.indexOf("/*") > -1 && line.indexOf("*/") < 0) {
            comment = true;
            return;
        }
        if (line.indexOf("*/") > -1) {
            comment = false;
            return;
        }
        if (comment) {
            return;
        }
        if (line.indexOf("Error(") > -1) {
            return;
        }
        if (line.indexOf("//") > -1) {
            line = line.split("//")[0];
        }
        if (line.indexOf("console.") > -1) {
            line = line.split("console.")[0];
        }
        if (/[\u4e00-\u9fa5]/.test(line)) {
            arr.push(`[${lineNum}]  ${source.trim()}`);
        }
    });
    rl.on("close", function () {
        if (arr.length) {
            res[p] = arr;
        }
        callback();
    });
}

function next() {
    if (tsList.length === 0) {
        let arr = [];
        for (let k of Object.keys(res)) {
            let fileName = k.replace(/\\/g, "/")
                .replace(CodePath, "")
                .replace(SkinPath, "");
            arr.push(fileName + "\n" + res[k].join("\n"));
        }
        console.log(arr.join("\n\n"));
        return;
    }
    readLineFilter(tsList.shift(), next);
}

let tsList = walkSync(CodePath, [], [".ts"])
    .filter(p => p.indexOf(".d.ts") < 0 && p.indexOf("Def.ts") < 0)
    .concat(walkSync(SkinPath, [], [".exml"]));
let res = {};
next();