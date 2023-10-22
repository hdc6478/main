const child_process = require("child_process");
const LogUtil = require("./LogUtil");
const os = require("os");
const fs = require("fs");
const FileUtil = require("./FileUtil");

async function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function shellCwd(command, cwd, ...args) {
    let cfg = {maxBuffer: 1024 * 1024 * 100, encoding: "utf8", cwd: cwd};
    if (args && typeof args[args.length - 1] === "function") {
        let callback = args.pop();
        return child_process.exec(command + " " + args.join(" "), cfg, callback);
    }
    return new Promise((resolve, reject) => {
        const cmd = command + " " + args.join(" ");
        child_process.exec(cmd, cfg, (error, stdout, stderr) => {
            if (error) {
                LogUtil.consoleLog(stdout);
                LogUtil.consoleLog(stderr);
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

function shell(command, ...args) {
    let cfg = {maxBuffer: 1024 * 1024 * 100, encoding: "utf8"};
    if (args && typeof args[args.length - 1] === "function") {
        let callback = args.pop();
        return child_process.exec(command + " " + args.join(" "), cfg, callback);
    }
    return new Promise((resolve, reject) => {
        const cmd = command + " " + args.join(" ");
        child_process.exec(cmd, cfg, (error, stdout, stderr) => {
            if (error) {
                LogUtil.consoleLog(stdout);
                LogUtil.consoleLog(stderr);
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

/**
 * 获取目录svn信息
 * @param tar
 * @returns {Promise<{
 * Path: string,
 * WorkingCopyRootPath: string,
 * URL: string,
 * RelativeURL: string,
 * RepositoryRoot: string,
 * RepositoryUUID: string,
 * Revision: string,
 * NodeKind: string,
 * Schedule: string,
 * LastChangedAuthor: string,
 * LastChangedRev: string,
 * LastChangedDate: string,
 * }>}
 */
async function svnInfo(tar) {
    let res = await shell("svn", "info", tar);
    let ret = {};
    res.split(os.EOL).map(function (str) {
        if (!str || !str.length) {
            return;
        }
        let index = str.indexOf(":");
        if (index < 0) {
            return;
        }
        let key = str.substring(0, index).trim().replace(/\s/g, "");
        ret[key] = str.substring(index + 1).trim();
    });
    return ret;
}

/**
 * 获取目录svn文件状态
 * @param {string} tar
 * @returns {Promise<{non_versioned: string[], missing: string[], added: string[], deleted: string[], modified: string[]}>}
 */
async function svnStatus(tar) {
    let res = await shell("svn", "st", tar);
    let ret = {non_versioned: [], missing: [], added: [], deleted: [], modified: []};
    res.split(os.EOL).map(function (str) {
        let t = str.charAt(0);
        let p = str.substr(7).trim();
        switch (t) {
            case "?":
                ret.non_versioned.push(p);
                break;
            case "!":
                ret.missing.push(p);
                break;
            case "A":
                ret.added.push(p);
                break;
            case "D":
                ret.deleted.push(p);
                break;
            case "M":
                ret.modified.push(p);
                break;
        }
    });
    return ret;
}

/**
 *
 * @param {string} repos
 * @param {string} tar
 * @return {Promise<void>}
 */
async function svnSwitch(repos, tar) {
    await shell("svn", "sw", repos, tar, "--ignore-ancestry");
}

async function svnUpdate(tar) {
    return await shell("svn", "up", `${tar}`, "--accept", "tc");
}

async function svnAdd(tar) {
    return await shell("svn", "add", `${tar}`, "--force");
}

async function svnDel(tar) {
    return await shell("svn", "delete", `${tar}`);
}

async function svnRevert(tar) {
    if (fs.statSync(tar).isDirectory()) {
        let status = await svnStatus(tar);
        let revertList = [].concat(status.added, status.deleted, status.modified, status.missing);
        let delList = [].concat(status.added, status.non_versioned);
        for (let p of revertList) {
            await shell("svn", "revert", `${p}`);
        }
        for (let p of delList) {
            FileUtil.delAnyway(p);
        }
        return;
    }
    return await shell("svn", "revert", `${tar}`);
}

async function svnCommit(tar, ciMsg) {
    let stat = fs.statSync(tar);
    if (stat.isDirectory()) {
        let status = await svnStatus(tar);
        for (let p of status.missing) {
            await svnDel(p);
        }
        for (let p of status.non_versioned) {
            await svnAdd(p);
        }
    }
    await shell("svn", "ci", `"${tar}"`, "-m", `"${ciMsg}"`);
}

async function svnCleanup(tar) {
    await shell("svn", "cleanup", "--remove-unversioned", "--remove-ignored", "--vacuum-pristines", "--include-externals",
        "-q", `${tar}`);
}

module.exports = {
    sleep,
    shellCwd,
    shell,
    svnInfo,
    svnStatus,
    svnSwitch,
    svnUpdate,
    svnAdd,
    svnDel,
    svnRevert,
    svnCommit,
    svnCleanup
};