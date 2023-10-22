const express = require("express");
const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const configList = require("./devserver.config");

function resolve(p, root) {
    if (path.isAbsolute(p)) {
        return p;
    }
    return path.resolve(root, p);
}

function watch(watchConfig, url, wwwRoot) {
    if (!watchConfig.physicalPath || !watchConfig.watchPath || !watchConfig.execCmd) {
        return (req, res, next) => next();
    }
    let physicalPath = resolve(watchConfig.physicalPath, wwwRoot);
    let pCfg = {changed: true, execing: false, cbs: []};
    fs.watch(resolve(watchConfig.watchPath, wwwRoot), {recursive: true}, (event, filename) => pCfg.changed = true);
    return (req, res, next) => {
        if (!pCfg.changed) {
            express.static(physicalPath)(req, res, next);
            return;
        }
        pCfg.cbs.push({req, res, next});
        if (pCfg.execing) {
            return;
        }
        pCfg.execing = true;
        if (fs.existsSync(physicalPath)) {
            try {
                fs.unlinkSync(physicalPath);
            } catch (e) {
            }
        }
        child_process.exec(watchConfig.execCmd, (error, stdout, stderr) => {
            pCfg.changed = false;
            pCfg.execing = false;
            pCfg.cbs.forEach(obj => {
                let _req = obj.req;
                let _res = obj.res;
                let _next = obj.next;
                if (error || stdout.indexOf(" Error") > -1 || stdout.indexOf(" Warning") > -1) {
                    _next(error || stdout || stderr);
                    return;
                }
                express.static(physicalPath)(_req, _res, _next);
            });
            pCfg.cbs.length = 0;
        });
    };
}

function startServer(config) {
    let wwwRoot = config.root;
    if (!wwwRoot || !fs.existsSync(wwwRoot)) {
        return;
    }
    if (!config.host || !config.root) {
        return;
    }
    let port = config.port || 80;
    const server = express();
    server.all("*", (req, res, next) => {
        res.header("Cache-Control", "no-cache,no-store,must-revalidate");
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
    server.use("/", express.static(wwwRoot));
    if (config.watch) {
        for (let w of config.watch) {
            server.use(w.path, watch(w, config.host + ":" + port + w.path, wwwRoot));
        }
    }
    if (config.virtualDirectory) {
        for (let dir of config.virtualDirectory) {
            server.use(dir.path, express.static(resolve(dir.physicalPath, wwwRoot)));
        }
    }
    server.listen(port, config.host);
    console.log("start server:", config.host, port);
}

function main() {
    configList.forEach(startServer);
}

main();