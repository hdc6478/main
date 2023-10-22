const ToolGlobal = require("./ToolGlobal");

const path = require("path");
const ShellUtil = require("./lib/ShellUtil");
const FileUtil = require("./lib/FileUtil");
const LogUtil = require("./lib/LogUtil");
const fs = require("fs");
const MaxT = require("os").cpus().length;

/**
 * @param {string} p
 * @param {boolean} declaration
 * @param {boolean} sourceMap
 * @returns {Promise<string>}
 */
async function compile(p, declaration, sourceMap) {
    LogUtil.consoleLog("compile:", p);
    return new Promise((resolve, reject) => {
        let parent = "";
        let cfgPath = "";
        if (p.indexOf("tsconfig.json") < 0) {
            parent = p;
            cfgPath = path.join(p, "tsconfig.json");
        } else {
            parent = path.dirname(p);
            cfgPath = p;
        }
        let prjRoot = parent;
        while (prjRoot.indexOf("src") > -1) {
            prjRoot = path.dirname(prjRoot);
        }
        let outName = parent.replace("src", "").replace(prjRoot, "");
        let args = [
            path.join(__dirname, "..", "node_modules", ".bin", "tsc-plus"),
            "-p", cfgPath
        ];
        let output = "";
        let opts = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
        if (!opts.compilerOptions) {
            output = path.join(prjRoot, "dist", outName) + ".js";
            args.push("-outFile", output);
            if (declaration) {
                args.push("-d", declaration);
            }
            if (sourceMap) {
                args.push("-sourceMap", sourceMap);
            }
            args.push("-reorderFiles", true);
            args.push("-emitReflection", true);
        } else {
            if (!opts.compilerOptions.outFile && !opts.compilerOptions.outDir) {
                output = path.join(prjRoot, "dist", outName) + ".js";
                args.push("-outFile", output);
            } else {
                output = opts.compilerOptions.outFile || opts.compilerOptions.outDir;
                if (output.replace(/\\/g, "/").indexOf(prjRoot.replace(/\\/g, "/")) < 0) {
                    output = path.join(prjRoot, output);
                }
            }
            if (typeof opts.compilerOptions.declaration !== "boolean" && declaration) {
                args.push("-d", declaration);
            }
            if (typeof opts.compilerOptions.sourceMap !== "boolean" && sourceMap) {
                args.push("-sourceMap", sourceMap);
            }
            if (typeof opts.compilerOptions.reorderFiles !== "boolean") {
                args.push("-reorderFiles", true);
            }
            if (typeof opts.compilerOptions.emitReflection !== "boolean") {
                args.push("-emitReflection", true);
            }
        }
        args.push((error, stdout, stderr) => {
            if (error || stdout.toLowerCase().indexOf("warning") > -1) {
                if (stderr && stderr !== "") {
                    console.error(error || stderr || stdout);
                }
                reject(error);
            } else {
                resolve(output);
            }
        });
        ShellUtil.shell.apply(null, args).stdout.pipe(process.stdout);
    });
}

/**
 * @param {string[]} list
 * @returns {Promise<void>}
 */
async function miniCode(list) {
    if (!list || !list.length) {
        return;
    }
    return new Promise((resolve, reject) => {
        let working = 0;
        let miniOne = (f) => {
            LogUtil.consoleLog("minify:", f);
            working++;
            let tar = f.replace(".js", ".min.js");
            ShellUtil.shell(path.join(__dirname, "..", "node_modules", ".bin", "uglifyjs"),
                f,
                "--compress", "sequences=true,conditionals=true,booleans=true",
                "--mangle",
                "--output", tar,
                (error, stdout, stderr) => {
                    working--;
                    while (working < MaxT && list.length) {
                        miniOne(list.shift())
                    }
                    if (!list.length && !working) {
                        resolve();
                    }
                }
            ).stdout.pipe(process.stdout);
        };
        while (working < MaxT && list.length) {
            miniOne(list.shift())
        }
    });
}

/**
 * @param {string} project
 * @param {boolean} [declaration]
 * @param {boolean} [sourceMap]
 * @param {boolean} [minify]
 * @returns {Promise<void>}
 */
async function start(project, declaration, sourceMap, minify) {
    if (!project) {
        return;
    }
    let output = await compile(project, declaration, sourceMap).catch(r => Promise.reject(r));
    if (minify) {
        if (fs.existsSync(output)) {
            let stat = fs.statSync(output);
            let files = [];
            if (stat.isDirectory()) {
                for (let f of FileUtil.walkSync(output)) {
                    if (path.extname(f) === ".js" && path.basename(f).indexOf(".min.") < 0) {
                        files.push(f);
                    }
                }
            } else {
                files.push(output);
            }
            await miniCode(files);
        }
    }
}

async function main() {
    let {project, declaration, sourceMap, minify} = ToolGlobal;
    await start(project, declaration, sourceMap, minify);
}

if (ToolGlobal.isMain(__filename)) {
    main().catch(reason => {
        console.error(reason);
        process.exit(1);
    });
}

module.exports = {start};