const path = require("path");
const fs = require("fs");
const FileUtil = require("./lib/FileUtil");
const images = require("images");

const source = path.normalize("D:\\project\\y3\\assets\\ui_effect");
const dest = path.normalize("D:\\project\\y3\\editorout\\anim_pic\\ui_effect");

const filter = (jsonFile) => {
    return true;
    // return path.basename(path.dirname(jsonFile)) === "展示";
};

let files = FileUtil.walkSync(source, null, ".json").filter(filter);
for (let jsonFile of files) {
    let destDir = jsonFile.replace(source, dest).replace(path.extname(jsonFile), "");
    FileUtil.mkdirsSync(destDir);
    let png = jsonFile.replace(".json", ".png");
    let json = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
    let jsonKeys = Object.keys(json.frames);
    let imgSource = images(png);

    function getVal(frame, key) {
        let frameObj = json.frames[frame];
        if (frameObj) {
            return frameObj[key];
        }
        return 0;
    }

    for (let frame of jsonKeys) {
        let x = getVal(frame, "x");
        let y = getVal(frame, "y");
        let w = getVal(frame, "w");
        let h = getVal(frame, "h");
        let offX = getVal(frame, "offX");
        let offY = getVal(frame, "offY");
        let sourceW = getVal(frame, "sourceW");
        let sourceH = getVal(frame, "sourceH");
        images(sourceW, sourceH)
            .draw(images(imgSource, x, y, w, h), offX, offY)
            .save(path.join(destDir, frame + ".png"));
    }
}