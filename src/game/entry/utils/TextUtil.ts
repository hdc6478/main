namespace game {
    import ITextElement = egret.ITextElement;
    import HtmlTextParser = egret.HtmlTextParser;
    import DropShadowFilter = egret.DropShadowFilter;
    import Label = eui.Label;
    import FightpowerConfig = game.config.FightpowerConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import SkillLevelConfig = game.config.SkillLevelConfig;
    import LanDef = game.localization.LanDef;

    export class TextUtil {
        private static _htmlParser: HtmlTextParser = new HtmlTextParser();

        /**改变字体*/
        private static changeFont(content: string, font: string = null): string {
            return "<font face='" + font + "'>" + content + "</font>";
        }

        /**
         * 返回对content，添加指定color的html文本
         */
        public static addColor(content: string, color: string | number, font: string = null): string {
            let str: string = "<font color='" + color + "'>" + content + "</font>";
            if (!font) {
                return str;
            }
            return this.changeFont(str, font);
        }

        /**
         *
         * @param str
         * @param isWhite 是否是白底颜色
         */
        public static parseHtml(str: string, isWhite: boolean = false): ITextElement[] {
            if (!str) str = "";
            if (str.indexOf("#") > -1) {
                str = StringUtil.replaceColorCode(str, isWhite);
            }
            return this._htmlParser.parse(str);
        }

        /**
         * 参数指定的带有link的文本,带下划线
         * @param content 文本
         * @param color 字体颜色
         * @param event 事件，不设置的话为null
         * @param font 需要改变的字体
         */
        public static addLinkHtmlTxt(content: string, color: number | string = null, event: string = null, font: string = null): string {
            let str: string;
            if (event == null) {
                str = "<font color='" + color + "' ><u>" + content + "</u></font>";
            } else {
                str = "<a href='event:" + event + "'><font color='" + color + "' ><u>" + content + "</u></font></a>";
            }
            if (!font) {
                return str;
            }
            return this.changeFont(str, font);
        }

        /**
         * 参数指定的带有link的文本,带下划线和描边
         * @param label 标签
         * @param content 文本
         * @param color 字体颜色
         * @param event 事件，不设置的话为null
         * @param font 需要改变的字体
         */
        public static addLinkHtmlTxt2(label: Label, content: string, color: number | string = null, event: string = null, font: string = null): Label {
            label.textFlow = this.parseHtml(this.addLinkHtmlTxt(content, color, event, font));
            let filter: DropShadowFilter = new DropShadowFilter(0, 0, 0x000000, 1, 2, 2, 3);
            label.filters = [filter];
            return label;
        }

        /**
         * 计算属性，基础属性*数量
         * @param {attributes} attr，基础属性
         * @param {number} num，数量
         * @returns {attributes}
         */
        public static calcAttr(attr: msg.attributes, num: number): msg.attributes {
            let newAttr = new msg.attributes();
            if (!attr) {
                return newAttr;
            }
            let keys = Object.keys(attr);
            for (let i = 0, len = keys.length; i < len; i++) {
                let attrKey = keys[i];
                let addVal: Long | number = attr[attrKey];
                if (typeof addVal == "number") {
                    newAttr[attrKey] = addVal * num;
                } else {
                    newAttr[attrKey] = addVal.multiply(num);
                }
            }
            return newAttr;
        }

        /**
         * 计算属性，多个属性相加
         * @param {attributes[]} attrList，属性列表
         * @returns {attributes}
         */
        public static calcAttrList(attrList: msg.attributes[]) {
            let newAttr = new msg.attributes();
            if (!attrList || !attrList.length) {
                return newAttr;
            }
            for (let attr of attrList) {
                if (!attr) {
                    continue;
                }
                let keys = Object.keys(attr);
                for (let i = 0, len = keys.length; i < len; i++) {
                    let attrKey = keys[i];
                    let addVal = attr[attrKey];
                    let curVal: Long | number = newAttr[attrKey];
                    if (curVal) {
                        if (typeof curVal == "number") {
                            newAttr[attrKey] = curVal + addVal;
                        } else {
                            newAttr[attrKey] = curVal.add(addVal);
                        }
                    } else {
                        newAttr[attrKey] = addVal;
                    }

                }
            }
            return newAttr;
        }

        /**
         * 获取属性表有用的属性字段，排序后的字段
         * @param {attributes} attr
         * @returns {string[]}
         */
        public static getAttrOrderKeys(attr: msg.attributes): string[] {
            let res: string[] = [];
            if (!attr) return res;
            let keys = Object.keys(attr);
            let tmpCfgList: FightpowerConfig[] = [];
            for (let i = 0, len = keys.length; i < len; i++) {
                let attrKey = keys[i];
                let cfg: FightpowerConfig = getConfigByNameId(ConfigName.Fightpower, attrKey);
                if (!cfg || cfg.ishide) {
                    continue;
                }
                tmpCfgList.push(cfg);
            }
            tmpCfgList.sort(SortTools.sortByRort);
            for (let cfg of tmpCfgList) {
                res.push(cfg.index);
            }
            return res;
        }

        /**
         * 获取属性字段文本，atk：攻击
         * @param {string} key
         * @returns {string}
         */
        public static getAttrsText(key: string): string {
            if (key == AttrKey.cd) {
                return getLanById(LanDef.tishi_15);
            }
            let cfg: FightpowerConfig = getConfigByNameId(ConfigName.Fightpower, key);
            return cfg.content;
        }

        /**
         * 转换属性值
         * @param {string} key
         * @param {number | Long} value
         * @param fractionDigits 假如有小数保留多少位
         * @returns {string}
         */
        public static getAttrsPerCent(key: string, value: number | Long, fractionDigits: number = 1) {
            let vStr: string;
            let cfg: FightpowerConfig = getConfigByNameId(ConfigName.Fightpower, key);
            if (cfg.isfloat) {
                if (typeof value == "number") {
                    vStr = (value / 100).toFixed(fractionDigits) + "%";
                } else {
                    vStr = value.div(100) + "%";
                }
            } else {
                vStr = value.toString();
            }
            return vStr;
        }

        /**
         * 获取属性文本显示
         * * @param attr 属性
         * * @param color 颜色，默认白底绿色
         * * @param endStr 结束文本，默认换行
         * * @param joinStr 中间文本，默认：
         * * @param attrVal 替换显示的属性值，用于显示0属性用
         * * @param attrStr 替换显示的属性文本，用于只显示属性值用
         */

        public static getAttrText(attr: msg.attributes, color: number = WhiteColor.GREEN, endStr: string = "\n", joinStr: string = ": ", attrVal?: number, attrStr?: string): string {
            let txt: string = "";
            if (!attr) {
                return txt;
            }
            let keys: string[] = this.getAttrOrderKeys(attr);
            for (let i = 0, len = keys.length; i < len; i++) {
                let k: string = keys[i];
                let a: string = attrStr != undefined ? attrStr : TextUtil.getAttrsText(k);
                let val = attrVal != undefined ? attrVal : attr[k];
                let v = TextUtil.getAttrsPerCent(k, val);
                if (joinStr.indexOf("+") > -1) {
                    txt += a + TextUtil.addColor(joinStr + v, color) + (i < len - 1 ? endStr : "");
                } else {
                    txt += a + joinStr + TextUtil.addColor("" + v, color) + (i < len - 1 ? endStr : "");
                }
            }
            return txt;
        }

        /**
         * 获取属性文本显示，+号
         * * @param attr 属性
         * * @param color 颜色，默认白底绿色
         * * @param endStr 结束文本，默认换行
         * * @param joinStr 中间文本，默认 +
         * * @param attrVal 替换显示的属性值，用于显示0属性用
         * * @param attrStr 替换显示的属性文本，用于只显示属性值用
         */
        public static getAttrTextAdd(attr: msg.attributes, color: number = WhiteColor.GREEN, endStr: string = "\n", joinStr: string = " +", attrVal?: number, attrStr?: string): string {
            return this.getAttrText(attr, color, endStr, joinStr, attrVal, attrStr);
        }

        /**
         * 获取属性文本显示列表
         * * @param attr 属性
         * * @param color 颜色，默认白底绿色
         * * @param endStr 结束文本，默认换行
         * * @param joinStr 中间文本，默认：
         * * @param defaultColor 文本默认颜色
         */
        public static getAttrTextInfos(attr: msg.attributes, color: number = WhiteColor.GREEN, endStr: string = "\n", joinStr: string = ": ", defaultColor?: number): string[] {
            let attrStr = this.getAttrText(attr, color, endStr, joinStr);
            if (!attrStr) {
                return [];
            }
            let infos = attrStr.split("\n");
            let tmpInfos: string[] = infos;
            if (defaultColor) {
                tmpInfos = [];
                for (let info of infos) {
                    tmpInfos.push(TextUtil.addColor(info, defaultColor));
                }
            }
            return tmpInfos;
        }

        /**
         * 获取主动技能描述
         * @param cfg 技能配置
         * @param lv 技能等级
         * @param showZero 是否显示0级技能，默认是没有0级技能的
         * @param lvDesc 直接取等级描述
         */
        public static getSkillDesc(cfg: BattleSkillConfig, lv: number, showZero?: boolean, lvDesc?: boolean): string {
            let desc = cfg.describe;
            let index = lv || showZero ? cfg.index + lv : cfg.index + 1;//0级技能也可以显示
            let lvCfg: SkillLevelConfig = getConfigByNameId(ConfigName.SkillLv, index);
            if (lvCfg) {
                if (lvDesc) {
                    return lvCfg.describe;//直接返回技能等级描述
                }
                let param1 = lvCfg.skill_coefs && lvCfg.skill_coefs.length ? Math.floor(lvCfg.skill_coefs[0] / 100) : 0;
                if (param1) {
                    desc = StringUtil.substitute(desc, [param1]);
                }
                let param2 = lvCfg.fixdma_show && lvCfg.fixdma_show.length ? lvCfg.fixdma_show[0] : 0;
                if (param2) {
                    desc = StringUtil.substitute(desc, [param2]);
                }
            }
            return desc;
        }

        /**
         * 获取技能属性描述
         * * @param baseAttr 基础属性
         * * @param attr 服务端下发的属性
         * * @param replaceStr 需要替换显示的属性文本
         */
        public static getSkillListDesc(baseAttr: msg.sys_attrs, attr?: msg.sys_attrs, replaceStr?: { key: string, aStr: string }[]): string[][] {
            if (attr) {
                /**计算属性*/
                for (let k in baseAttr) {
                    if (!attr.hasOwnProperty(k)) {
                        continue;
                    }
                    let val = k == AttrKey.cd ? baseAttr[k] * Math.max((1 - Math.floor(attr[k] / 10000)), 0) : attr[k];//自己减去cd
                    baseAttr[k] = val;
                }
            }
            let infos: string[][] = [];
            for (let k in baseAttr) {
                if (!baseAttr.hasOwnProperty(k)) {
                    continue;
                }
                let val = baseAttr[k];
                let aStr = this.getAttrsText(k);
                if (replaceStr) {
                    for (let info of replaceStr) {
                        if (info.key == k) {
                            aStr = info.aStr;
                            break;
                        }
                    }
                }
                let vStr: string;
                if (k == AttrKey.cd) {
                    //冷却时间显示秒
                    vStr = Math.floor(val / 1000) + getLanById(LanDef.shijian_4);
                } else if (k == AttrKey.theGod_addtime) {
                    //变身时间显示秒
                    vStr = val + getLanById(LanDef.shijian_4);
                } else {
                    vStr = "+" + (val / 100).toFixed(1) + "%";
                }
                infos.push([aStr, vStr]);
            }
            return infos;
        }

        /**随机玩家名字*/
        public static getRandomName(sex?: number): string {
            type NameCfg = { adv: string, name_f: string, name_1: string, name_2: string };
            let cfg: { [key: string]: NameCfg } = LoadMgr.ins.getRes("assets/data/role_name.json");
            let keyList: string[] = Object.keys(cfg);
            let r: number = Math.random();
            if (!sex) {
                sex = r > 0.5 ? Sex.Male : Sex.Female;//随机性别
            }
            let adv: string = "";
            r = Math.random();
            if (r > 0.5) {
                adv = cfg[keyList[Math.floor(keyList.length * r)]].adv;
            }
            r = Math.random();
            let f: string = cfg[keyList[Math.floor(keyList.length * r)]].name_f;
            r = Math.random();
            let name: string = cfg[keyList[Math.floor(keyList.length * r)]]["name_" + sex];
            return adv + f + name;
        }

        /** */
        public static addEnoughColor(value1: number | string, value2: number, symbol: boolean = true): string {
            let color = +value1 >= +value2 ? WhiteColor.GREEN : WhiteColor.RED;
            if (symbol) {
                return this.addColor(`(${value1}/${value2})`, color);
            } else {
                return this.addColor(`${value1}/${value2}`, color);
            }
        }

        public static truncateString(str: string, maxLength: number = 7) {
            if (str.length > maxLength) {
                return str.slice(0, maxLength - 1) + '...';
            }
            return str;
        }

    }
}
