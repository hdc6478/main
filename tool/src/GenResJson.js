const path = require("path");
const fs = require("fs");
const FileUtil = require("./lib/FileUtil");
const images = require("images");
const LogUtil = require("./lib/LogUtil");
const child_process = require("child_process");

function main(resourceRoot) {
	let time = Date.now();
	let uiList = ["ui"];
	let groupMap = {};
	let resMap = {};
	let nameMap = {};
	let bigList = [];
	let repetition = [];
	let catalog = [];
	let nameList = [];

	for(let r of uiList){
		genResMap(r,)
	}
	function genResMap(r, ) {
		let uiRoot = path.join(resourceRoot, r);
		let dirList = FileUtil.readDirListSync(uiRoot);
		(function (inRoot, dir) {
			for (let d of dir) {
				let in2Root = path.join(inRoot, d);
				let dir2 = FileUtil.readDirListSync(in2Root);
				if (dir2.length === 0) {
					groupMap[path.basename(d)] = [];
				} else {
					arguments.callee(in2Root, dir2);
				}
			}
		})(uiRoot, dirList);
		let list = FileUtil.walkSync(uiRoot);
		for (let f of list) {
			if (f.indexOf(".png") < 0) {
				console.error("文件格式错误：", f);
				return;
			}
			let ext = path.extname(f).toLowerCase();
			let dir = path.dirname(f);
			// if (path.dirname(dir) !== uiRoot) {
			//     console.error("Error:ui目录下不允许再嵌套文件夹：", dir);
			//     // return;
			// }
			let group = path.basename(dir);
			let resName = path.basename(f).replace(ext, "");

			let url = f.replace(resourceRoot + path.sep, "").replace(/\\/g, "/");

			if (url.indexOf(" ") > -1) {
				console.error("Error:文件路径有空格：", url);
				return;
			}
			let img = images(f);
			if (img.width() > 512 || img.height() > 512) {
				bigList.push(url);
			}
			if (ext !== ".png") {
				console.error("Error:ui目录下只能放png文件：", url);
				return;
			}
			if (resMap[resName]) {
				repetition.push({ name: resMap[resName], url: url });
				// console.error("Error:重复的文件名：", resMap[resName], url);
				// return;
			}
			if (groupMap[resName]) {
				catalog.push({ name: resName, url: url });
				// console.error("Error:文件与目录重名：：", resName, url);
				// return;
			}

			// if (nameMap[resName]) {
			// 	nameList.push({ name: resName });
			// } else {
			// 	nameMap[resName] = true;
			// }

			// 判断目录是否同名
			let prefixDir = path
				.dirname(dir)
				.replace(resourceRoot + path.sep, "")
				.replace(/\\/g, "/");
			let lastDirName = path.basename(dir);
			if (nameMap[lastDirName]) {
				let curPath = nameMap[lastDirName];
				if (curPath && curPath.length > 0 && curPath.indexOf(prefixDir) < 0) {
					curPath.push(prefixDir);
					nameList.push({ name: lastDirName, dir: nameMap[lastDirName] });
				}
			} else {
				nameMap[lastDirName] = [prefixDir];
			}

			groupMap[group].push(resName);
			resMap[resName] = url;
		}
	}

	if (repetition.length || catalog.length || nameList.length) {
		for (let i = 0, len = repetition.length; i < len; i++) {
			console.error("Error:重复的文件名：", repetition[i].name, repetition[i].url);
		}
		console.log("");
		for (let i = 0, len = catalog.length; i < len; i++) {
			console.error("Error:文件与目录重名：", catalog[i].name, catalog[i].url);
		}
		console.log("");
		for (let i = 0, len = nameList.length; i < len; i++) {
			console.error("Error:目录重名：", nameList[i].name, nameList[i].dir);
		}
		return;
	}
	if (bigList.length) {
		console.error("Error:图片尺寸过大：\n" + bigList.join("\n"));
		return;
	}
	let obj = { groups: [], resources: [] };
	let groupList = Object.keys(groupMap).sort();
	for (let g of groupList) {
		let list = groupMap[g];
		list.sort();
		obj.groups.push({ name: g, keys: list.join() });
	}
	let resList = Object.keys(resMap).sort();
	for (let r of resList) {
		obj.resources.push({ name: r, type: "image", url: resMap[r] });
	}
	let str = JSON.stringify(obj, null, "    ");
	fs.writeFileSync(path.join(resourceRoot, "default.res.json"), str, "utf-8");
	LogUtil.consoleLog("生成完成 res.json" + (Date.now() - time) / 1000 + "s");
}

/**
 * @param {string} p
 * @returns {Promise<void>}
 */
async function egretPublishEui(p) {
	return new Promise((resolve, reject) => {
		let cfg = { maxBuffer: 1024 * 1024 * 100, encoding: "utf8", cwd: p };
		child_process.exec("egret publish " + p, cfg, (error, stdout, stderr) => {
			if (error || stdout.toString().toLowerCase().indexOf("warning") > -1) {
				reject(error || stderr || stdout);
			} else {
				resolve();
			}
		});
	});
}

async function skinJson(resourceRoot) {
	let time = Date.now();
	await egretPublishEui(path.resolve(resourceRoot, "..")).catch((reason) => Promise.reject(reason));
	LogUtil.consoleLog("生成完成 skins json" + (Date.now() - time) / 1000 + "s");
}

async function all(resourceRoot) {
	LogUtil.consoleLog("开始生成 res.json");
	main(resourceRoot);
	LogUtil.consoleLog("开始生成 skins json");
	await skinJson(resourceRoot);
}

if (process.argv.length > 2) {
	let argv = process.argv.splice(2);
	let resourceRoot = argv[0];
	if (argv[1] === "res") {
		LogUtil.consoleLog("开始生成 res.json");
		main(resourceRoot);
	} else if (argv[1] === "skins") {
		LogUtil.consoleLog("开始生成 skins json");
		skinJson(resourceRoot);
	} else if (argv[1] === "all") {
		all(resourceRoot);
	}
}
