const path = require("path");
const minimist = require("minimist");
const LogUtil = require("./lib/LogUtil");

function normalize(filename) {
    return path.normalize(filename)
        .replace(path.extname(filename), "")
        .toLowerCase();
}

let opts = minimist(process.argv.slice(2), {
    boolean: ["trace", "declaration", "sourceMap", "minify"],
    alias: {p: "prjRoot"}
});

LogUtil.initLog(opts.trace);

opts.isMain = function isMain(filename) {
    return normalize(process.argv[1]) === normalize(filename);
};

module.exports = opts;