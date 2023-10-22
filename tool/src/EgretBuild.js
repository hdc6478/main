const ToolGlobal = require("./ToolGlobal");
const path = require("path");
const FileUtil = require("./lib/FileUtil");
const ShellUtil = require("./lib/ShellUtil");
const fs = require("fs");
const TSCompile = require("./TSCompile");
const MaxT = require("os").cpus().length;
const rollup = require("rollup");
const terser = require("rollup-plugin-terser").terser;

/**
 * @param {string|string[]} prjDir
 * @param {string[]} [common]
 * @param {boolean} [declaration]
 * @param {boolean} [sourceMap]
 * @param {string} prjRoot
 * @returns {Promise<void>}
 */
async function build(prjDir, common, declaration, sourceMap, prjRoot) {
    if (typeof prjDir === "string") {
        return TSCompile.start(prjDir, declaration, sourceMap);
    }
    if (!common) {
        common = [];
    }
    if (!common.length && !prjDir.length) {
        return;
    }
    return new Promise((resolve, reject) => {
        let total = common.length + prjDir.length;
        let count = 0;
        let working = 0;
        let comp = (lastDir) => {
            count++;
            working--;
            if (lastDir && lastDir.indexOf("mod" + path.sep) === -1 && lastDir.indexOf("game" + path.sep) !== -1) {
                let newDir = lastDir.replace(path.sep + "tsconfig.json", "");
                let dtsRoot = path.join(prjRoot, "main", "dist");
                let outDtsRoot2 = path.join(prjRoot, "main", "libs");
                let f = path.join(dtsRoot, "game", path.basename(newDir) + ".d.ts");
                let t2 = f.replace(dtsRoot, outDtsRoot2);
                FileUtil.mkdirsSync(path.dirname(t2));
                fs.copyFileSync(f, t2);
            }
            if (common.length) {
                working++;
                let dir = common.shift();
                TSCompile.start(dir, declaration, sourceMap).then(() => {
                    comp(dir)
                }, reject);
            } else if (prjDir.length) {
                while (prjDir.length && working < MaxT) {
                    working++;
                    let dir = prjDir.shift();
                    TSCompile.start(dir, declaration, sourceMap).then(() => {
                        comp(dir)
                    }, reject);
                }
            }
            if (count === total) {
                resolve();
            }
        };
        working++;
        if (common.length) {
            let dir = common.shift();
            TSCompile.start(dir, declaration, sourceMap).then(() => {
                comp(dir)
            }, reject);
        } else {
            let dir = prjDir.shift();
            TSCompile.start(dir, declaration, sourceMap).then(() => {
                comp(dir)
            }, reject);
        }
    });
}

/**
 * @param {string} prjRoot
 */
function genThmJson(prjRoot) {
    let prjDir = path.join(prjRoot, "eui_prj");
    let euiRoot = path.join(prjDir, "resource", "eui_skins");
    let obj = {skins: {}, autoGenerateExmlsList: true, exmls: [], "path": "resource/default.thm.json"};
    FileUtil.walkSync(euiRoot, obj.exmls, ".exml");
    obj.exmls = obj.exmls.map((f) => f.replace(prjDir + path.sep, "").replace(/\\/g, "/"));
    obj.exmls.sort();
    fs.writeFileSync(path.join(prjDir, "resource", "default.thm.json"), JSON.stringify(obj, null, "    "), "utf8");
}

/**
 * @param {string} prjRoot
 */
function genManifest(prjRoot) {
    let manifestPath = path.join(prjRoot, "main", "manifest.json");
    let manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    let base = [].concat(manifest.launcher, manifest.login);
    let outRoot = path.join(prjRoot, "main", "dist");
    let jsList = [];
    for (let f of FileUtil.walkSync(outRoot, [], ".js")) {
        let p = "dist/" + f.replace(outRoot + path.sep, "")
            .replace(/\\/g, "/");
        if (path.basename(p) === "index.js") {
            continue;
        }
        if (path.basename(path.dirname(p)) === "sdk"
            || path.basename(path.dirname(p)) === "eui") {
            continue;
        }
        if (base.indexOf(p) > -1) {
            continue;
        }
        if (jsList.indexOf(p) < 0) {
            jsList.push(p);
        }
    }
    manifest.modules = jsList;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, "    "), "utf8");
}

/**
 * @param {string} prjRoot
 */
function cpDts(prjRoot) {
    let dtsRoot = path.join(prjRoot, "main", "dist");
    let outDtsRoot = path.join(prjRoot, "eui_prj", "libs");
    let outDtsRoot2 = path.join(prjRoot, "main", "libs");
    let dts = FileUtil.walkSync(dtsRoot, [], ".ts");
    for (let f of dts) {
        if (f.indexOf("game" + path.sep) < 0) {
            continue;
        }
        let t = f.replace(dtsRoot, outDtsRoot);
        FileUtil.mkdirsSync(path.dirname(t));
        fs.copyFileSync(f, t);
    }
}

/**
 * @param {string} prjRoot
 * @param {string} target
 * @param {boolean} [isMiniGame]
 * @returns {{common: string[], cfg: string[]}}
 */
function findCfg(prjRoot, target, isMiniGame) {
    if (fs.existsSync(path.join(target, "tsconfig.json"))) {
        return {cfg: [path.join(target, "tsconfig.json")], common: []};
    }
    let jsonFileList = FileUtil.walkSync(target, [], ".json");
    if (jsonFileList.length) {
        let common = ["launcher", "login", "entry", "mod_common", "scene"]
            .map((name) => path.join(prjRoot, "main", "src", "game", name, "tsconfig.json"));
        let hasCommon = false;
        let cfgList = [];
        for (let jsonFile of jsonFileList) {
            if (common.indexOf(jsonFile) > -1) {
                hasCommon = true;
                continue;
            }
            if (path.basename(jsonFile) !== "tsconfig.json") {
                continue;
            }
            if (jsonFile.indexOf("sdk-minigame") > -1) {
                continue;
            }
            if (!isMiniGame && jsonFile.replace(/\\/g, "/").indexOf("/minigame/") > -1) {
                continue;
            }
            cfgList.push(jsonFile);
        }
        if (cfgList.length || hasCommon) {
            return {cfg: cfgList, common: hasCommon ? common : []};
        }
    }
    let cfgPath;
    while (true) {
        let dirname = path.dirname(target);
        if (dirname === target) {
            break;
        }
        target = dirname;
        let cfg = path.join(target, "tsconfig.json");
        if (fs.existsSync(cfg)) {
            cfgPath = cfg;
            break;
        }
    }
    if (cfgPath) {
        return {cfg: [cfgPath], common: []};
    }
    return {cfg: [], common: []};
}

/**
 * @param {string} prjRoot
 * @param {string} target
 * @param {boolean} [declaration]
 * @param {boolean} [sourceMap]
 * @returns {Promise<void>}
 */
async function start(prjRoot, target, declaration, sourceMap) {
    let {cfg, common} = findCfg(prjRoot, target);
    await build(cfg, common, declaration, sourceMap, prjRoot);
    genThmJson(prjRoot);
    genManifest(prjRoot);
    if (declaration) {
        cpDts(prjRoot);
    }
}

/**
 * @param {string} prjRoot
 * @param {string} target
 * @returns {Promise<void>}
 */
async function startMiniGame(prjRoot, target) {
    let {cfg} = findCfg(prjRoot, target, true);
    const EntryNames = ["game", "main"];
    for (let cfgPath of cfg) {
        let srcDir = path.join(path.dirname(cfgPath), "src");
        let tmpDir = path.join(path.dirname(cfgPath), "tmp");
        let pkgDir = path.join(path.dirname(cfgPath), "pkg");
        if (fs.existsSync(tmpDir)) {
            FileUtil.rmdirsSync(tmpDir);
        }
        await ShellUtil.shellCwd("tsc", path.dirname(cfgPath));
        let entryName;
        for (let name of EntryNames) {
            if (fs.existsSync(path.join(srcDir, name + ".ts"))) {
                entryName = name;
                break;
            }
        }
        if (!entryName) {
            FileUtil.mkdirsSync(pkgDir);
            let jsFiles = FileUtil.walkSync(tmpDir);
            for (let jsFile of jsFiles) {
                let targetFile = jsFile.replace(tmpDir, pkgDir);
                FileUtil.mkdirsSync(path.dirname(targetFile));
                fs.copyFileSync(jsFile, targetFile);
            }
            FileUtil.rmdirsSync(tmpDir);
            continue;
        }
        let opts = {
            input: path.join(tmpDir, entryName + ".js"),
        };
        if (!/\.alias[_\d]*\./.test(target)) {
            opts.plugins = [terser()];
        }
        let bundle = await rollup.rollup(opts);
        await bundle.write({
            file: path.join(pkgDir, entryName + ".js"),
            format: "cjs"
        });
        FileUtil.rmdirsSync(tmpDir);
    }
}

async function main() {
    let {prjRoot, target, declaration, sourceMap} = ToolGlobal;
    if (target && target.replace(/\\/g, "/").indexOf("/minigame/") > -1) {
        return startMiniGame(prjRoot, target);
    }
    await start(prjRoot, target, declaration, sourceMap);
}

if (ToolGlobal.isMain(__filename)) {
    let t = Date.now();
    main().then(
        () => {
            console.log(`build cost:${(Date.now() - t) / 1000}S`);
            process.exit(0);
        }
    ).catch(reason => {
        console.error(reason);
        process.exit(1);
    });
}

module.exports = {start};
