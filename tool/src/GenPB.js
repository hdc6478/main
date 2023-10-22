const fs = require("fs");
const path = require("path");
const ShellUtil = require("./lib/ShellUtil");
const LogUtil = require("./lib/LogUtil");
const os = require("os");

const pbjs = require("protobufjs/cli/pbjs"); // or require("protobufjs/cli").pbjs / .pbts
const pbts = require("protobufjs/cli/pbts");

let rootDir;
const destJsonPath = "eui_prj/assets/data_server/protobuf-bundle.json";

function svnUp() {
    ShellUtil.svnUpdate(path.join(rootDir, "..", "proto")).then(start);
}

function start() {
    let protoPath = path.join(rootDir, "..", "proto", "message.proto");
    fs.copyFileSync(protoPath, path.join(rootDir, "tool", "message.proto"));
    pbjs.main(["-t", "json", "--keep-case", "--force-long", "--force-message",
        protoPath], pbJsonComp);
}

function pbJsonComp(err, output) {
    if (err) throw err;
    let idJson = JSON.parse(fs.readFileSync(path.join(rootDir, "..", "proto", "protocol.json"), "utf-8"));
    let version = idJson.version;
    delete idJson.version;
    let proto = JSON.parse(output);

    let msgNames = [];
    for (let k of Object.keys(proto.nested)) {
        for (let k1 of Object.keys(proto.nested[k].nested)) {
            if (/s2c|c2s/.test(k1)) {
                msgNames.push(k + "." + k1);
            }
        }
    }
    for (let n of msgNames) {
        if (!idJson[n]) {
            LogUtil.consoleLog(`生成失败：${n} 没有对应协议id`);
            return;
        }
    }

    proto.version = version;
    let keys = Object.keys(idJson);
    for (let key of keys) {
        if (key.indexOf(".") > -1) {
            let kA = key.split(".");
            let msg = proto.nested;
            for (let k of kA) {
                msg = msg[k];
                if (msg == null) {
                    throw(`message.proto no key: ${k} ，Please communicate with the server  `)
                } else if (msg.nested) {
                    msg = msg.nested;
                }
            }
            if (msg && msg !== proto.nested) {
                msg.msgId = idJson[key];
            }
        } else {
            if (proto[key]) {
                proto[key].msgId = idJson[key];
            }
        }
    }
    let jsonPath = path.join(rootDir, "..", destJsonPath);
    fs.writeFileSync(jsonPath, JSON.stringify(proto, null, "  "), "utf8");
    pbjs.main(["-t", "static",
        "--keep-case",
        "--no-create",
        "--no-encode",
        "--no-decode",
        "--no-verify",
        "--no-convert",
        "--no-delimited",
        "--no-beautify",
        "--force-long",
        "--force-message",
        path.join(rootDir, "..", "proto", "message.proto")], pbJsComp);
}

function pbJsComp(err, output) {
    if (err) throw err;
    let jsPath = path.join(os.tmpdir(), "protobuf-bundles.js");
    fs.writeFileSync(jsPath, output, "utf-8");
    pbts.main([jsPath], pbTsComp);
}

function pbTsComp(err, output) {
    if (err) throw err;
    let tsPath = path.join(rootDir, "libs", "protobuf-bundles.d.ts");
    output = output.replace("import * as $protobuf from \"protobufjs\";", "")
        .replace(/\$protobuf/gi, "protobuf")
        .replace(/export namespace/gi, "declare namespace")
        .trim();
    fs.writeFileSync(tsPath, output, "utf-8");
    LogUtil.consoleLog("生成完成，记得提交 " + destJsonPath);
}

rootDir = process.argv.splice(2)[0];
svnUp();