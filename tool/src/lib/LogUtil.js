const os = require("os");

let tmpObj = {};
let cnt = 0;
let trace = false;

let log = function log(...arg) {
    process.stdout.write(".");
    cnt++;
    if (cnt >= 100) {
        cnt = 0;
        process.stdout.write(os.EOL);
    }
};

let logEnd = function logEnd() {
    if (cnt > 0) {
        cnt = 0;
        process.stdout.write(os.EOL);
    }
};

/**
 * @param {boolean} [verbose]
 */
function initLog(verbose) {
    trace = verbose;
    if (verbose) {
        log = (...arg) => console.log.apply(null, arg);
        logEnd = () => void 0;
    }
}

function writeline(...args) {
    process.stdout.write((args.length ? args.join(" ") : "") + os.EOL, "utf8");
}

function consoleLog(...args) {
    args.unshift(new Date().toLocaleTimeString());
    console.log.apply(null, args);
}

function tmpReplacer(k) {
    let v = tmpObj[k.charAt(0)];
    while (v.length < k.length) {
        v = "0" + v;
    }
    return v;
}

/**
 * 格式化时间戳，毫秒
 * @param {number|Date} time 时间戳，毫秒
 * @param {string} [format=yyyy-MM-dd HH:mm:ss.SSS] y年，M月，d日，H时，m分，s秒，S毫秒
 * @returns {string}
 */
function formatTime(time, format = "yyyy-MM-dd HH:mm:ss.SSS") {
    let date;
    if (typeof time === "number") {
        date = new Date(time);
    } else {
        date = time;
    }
    tmpObj["y"] = "" + date.getFullYear();
    tmpObj["M"] = "" + (date.getMonth() + 1);
    tmpObj["d"] = "" + date.getDate();
    tmpObj["H"] = "" + date.getHours();
    tmpObj["m"] = "" + date.getMinutes();
    tmpObj["s"] = "" + date.getSeconds();
    tmpObj["S"] = "" + date.getMilliseconds();
    return format.replace(/y+|M+|d+|H+|m+|s+|S+/g, tmpReplacer);
}

module.exports = {initLog, trace, log, logEnd, consoleLog, formatTime};