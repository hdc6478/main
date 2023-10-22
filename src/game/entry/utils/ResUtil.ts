namespace game {
    import TitleConfig = game.config.TitleConfig;
    import DressConfig = game.config.DressConfig;
    import RebirthConfig = game.config.RebirthConfig;
    import ShenlingConfig = game.config.ShenlingConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import RingConfig = game.config.RingConfig;
    import YishouShouyingConfig = game.config.YishouShouyingConfig

    /**外显模型数据结构接口*/
    export interface ISurfaceData {
        index?: number,
        /**外显index */
        url?: string,
        /**外显资源 */
        x?: number,
        /**外显x坐标偏移 */
        y?: number,
        /**外显y坐标偏移 */
        scale?: number,/**外显缩放 */
    }

    export class ResUtil {
        /**********************地图*********************/
        public static getMapMaskUrl(mapId: string | number): string {
            return "assets/map/" + mapId + "/mask.bin";
        }

        public static getMapBlurUrl(mapId: string | number): string {
            return "assets/map/" + mapId + "/blur/blur.jpg";
        }

        /**********************字体*********************/
        public static getFontUrl(name: string): string {
            return "assets/font/" + name;
        }

        /**********************Ui字体*********************/
        public static getFontUiUrl(name: string): string {
            return "assets/font_ui/" + name;
        }

        /**********************特效*********************/
        public static getEffectUI(src: string | number): string {
            return "assets/ui_effect/" + src;
        }

        public static getSkillEftUrl(id: string | number): string {
            return "assets/anim/effect/" + id;
        }

        public static getSkillEftSubUrl(id: string | number, sub: number): string {
            return "assets/anim/effect/" + id + "_" + sub;
        }

        public static getGroupEftUrl(id: string | number): string {
            return "assets/data_effect/" + id + ".json";
        }

        /**********************声音*********************/
        public static getSoundUrl(name: string): string {
            return "assets/sound/" + name; // 这里不加扩展名
        }

        /**
         * 技能提示图片
         * @param {string} name
         * @returns {string}
         */
        public static getSkillEffectSrc(name: string): string {
            return "assets/skill_effect/" + name + ".png";
        }

        /************************新的资源获取*****************************/
        public static getMapBmpUrl(mapId: string | number, c: number, r: number): string {
            return "assets/map/" + mapId + "/pic/" + c + "_" + r + ".jpg";
        }

        /**
         * 获取道具品质底
         * @param quality
         * @param isHex 是否是六边形品质框
         */
        public static getPropQualityImg(quality: number, isHex?: boolean): string {
            if (isHex) {
                return `daojupinzhikuang_${quality}`;
            }
            return "icon_quality_" + quality;
        }

        /**获取道具图标*/
        public static getUiProp(des: string | { index: number, icon: string }, isGray?: boolean): string {
            if (des == null) {
                return null;
            }
            let str: string;
            if (typeof des == "string") {
                str = des;
            } else {
                if (des.icon == null) {
                    console.error("缺少道具图标" + des.index);
                    return null;
                }
                let _type: number = PropData.getPropParse(des.index, PropParseType.Type);
                //todo
                if (_type == ConfigHead.Body) {
                    let _sex: number = RoleVo.ins.sex || 1;
                    str = des.icon + "_" + _sex;
                } else {
                    str = des.icon;
                }
            }
            let garyStr: string = isGray ? "_gray" : "";
            if (str.indexOf("sz_") != -1) {
                return str + "_" + gso.roleSex + garyStr;
            } else {
                return str + garyStr;
            }
        }

        /**
         * 获取转生字体资源
         * @param index，转生index
         * @param withoutChong，不显示重数
         */
        public static getRebirthFontStr(index: number, withoutChong?: boolean): string {
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index);
            if (!cfg || !cfg.relv) {
                return "xtq";//默认显示先天期
            }
            let fontStr = "";
            let zhuanLv = cfg.relv;
            // if(zhuanLv > RebirthMaxLv){
            //     //＞10转需要转换成仙人x转
            //     zhuanLv = zhuanLv - RebirthMaxLv;
            //     fontStr += "r";//仙人
            // }
            // let zhuanTen = Math.floor(zhuanLv / 10);//计算十位数
            // let zhuanStr = zhuanTen == 0 ? "" : (zhuanTen == 1 ? "0" : zhuanTen + "0");
            // if (zhuanLv % 10 > 0) {
            //     zhuanStr += zhuanLv % 10;//加上个位数
            // }
           
            let zhuanStr = zhuanLv + '';
            if (zhuanLv >= RebirthMaxLv) {
                fontStr += "r";//仙人
                zhuanStr = (zhuanLv - RebirthMaxLv + 1) + '';
            }
            fontStr += zhuanStr + "z";
            if (!withoutChong) {
                //显示重数
                let chongLv = cfg.relv2;
                fontStr += chongLv + "c";
            }
            return fontStr;
        }

        /**
         * 获取中文字体资源
         * @param stage,等级之类的数值
         */
        public static getChineseFontStr(stage: number): string {
            let stageStr = "";
            if (!stage) {
                stageStr = StringUtil.ChineseNum[stage];
            } else {
                let stageTen = Math.floor(stage / 10);//计算十位数
                stageStr = stageTen == 0 ? "" : (stageTen == 1 ? "0" : stageTen + "0");
                if (stage % 10 > 0) {
                    stageStr += stage % 10;//加上个位数
                }
            }
            return stageStr;
        }

        public static getTitleSrc(idx: number, star: number = 0): string {
            let cfg: TitleConfig = getConfigByNameId(ConfigName.Title, idx);
            if(!cfg){
                console.error("称号取不到配置：", idx);
                return "";
            }
            let isEft = cfg.eft_star > 0 && star >= cfg.eft_star;
            return "assets/title/" + cfg.resource + (isEft ? "_1" : "");
        }

        //获取装扮相关资源
        public static getDressUpIcon(str: string | number, sex?: number): string {
            if (typeof str == "number") {
                let idx: number = str;
                let cfg: DressConfig = getConfigById(idx);
                if (!cfg || cfg.resource == undefined) return "";
                str = cfg.resource;
                if (cfg.minute && cfg.minute == 1) {
                    str += "_" + (sex || 1);
                }
            }
            return str;
        }

        public static getUiPng(src: string): string {
            if (!src) {
                return '';
            }
            return "assets/ui_png/" + src + ".png";
        }

        public static getUiJpg(name: string) {
            if (!name) {
                return '';
            }
            return "assets/ui_jpg/" + name + ".jpg";
        }

        /**
         * 获取品质底图
         * @param quality 品质，技能品质底默认品质5红色
         */
        public static getBgQuality(quality: number = QualityType.RED): string {
            return this.getUiPng(`p1_bg_quality_${quality}`);
        }

        /**
         * 获取SR角标
         * @param quality 品质
         * @param specialQuality 特殊品质（黄玄地天）优先级更高
         */
        public static getSrQuality(quality: number, specialQuality?: SpecialQualityType): string {
            if (specialQuality != undefined) {
                return `avatarspecialquality${specialQuality}`;
            }
            return `avatarquality${quality}`;
        }

        /**
         * 获取品质底图
         * @param quality 品质
         * @param specialQuality 特殊品质（黄玄地天）优先级更高
         */
        public static getBigBg(quality: number, specialQuality?: SpecialQualityType): string {
            if (specialQuality != undefined) {
                let qua = SpecialQuality[specialQuality];
                return "avatardi" + qua
            }
            return "avatardi" + quality;
        }

        /**
         * 获取品质边框
         * @param quality 品质
         * @param specialQuality 特殊品质（黄玄地天）优先级更高
         */
        public static getBigFrame(quality: number, specialQuality?: SpecialQualityType): string {
            if (specialQuality != undefined) {
                let qua = SpecialQuality[specialQuality];
                return "avatarkuang" + qua
            }
            return "avatarkuang" + quality;
        }

        /**
         * 获取大图标
         * @param icon string
         */
        public static getBigIcon(icon: string): string {
            return "big_" + icon;
        }

        //表情
        public static getUiFace(name: string) {
            return "face_" + name;
        }

        /**
         * 获取模型资源数据，用于界面模型显示，玩家自己的数据
         * @param index 外显index
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认false
         * @param isWeapon 是否是武器，默认false
         */
        public static getSurfaceData(index: number, dir: number, act: string, isUi: boolean = false, isWeapon: boolean = false): ISurfaceData {
            let data: ISurfaceData = {};
            data.index = index;

            data.url = this.getModelUrl(index, dir, act, isUi, RoleVo.ins.sex, true, isWeapon);

            let cfg = getConfigById(index) as ShenlingConfig;
            data.scale = cfg.scale ? cfg.scale / 10000 : 1;//缩放，5表示0.5

            let type = PropData.getPropParse(index, PropParseType.Type);
            switch (type) {
                case ConfigHead.Horse:
                    data.y = -120;//需要设置偏移量，缩放大小的模型，一般不处理
                    break;
                case ConfigHead.Tianshen:
                    data.y = -50;//需要设置偏移量，缩放大小的模型，一般不处理
                    break;
            }
            return data;
        }

        /**
         * 获取模型动作资源，如：assets\anim\body\female_01\atk1_2
         * */
        public static getModelUrl(index: number, dir: number, act: string, isUi: boolean = false, sex: number = Sex.Male, isSingle: boolean = false, isWeapon: boolean = false): string {
            let type = PropData.getPropParse(index, PropParseType.Type);
            let modelName = this.getModelName(index, sex, isSingle);
            return this.getModelUrlByModelName(type, modelName, dir, act, isUi, isWeapon);
        }

        /**
         * 获取模型名称，如：female_01
         * @param index
         * @param sex 默认Sex.Male
         * @param isSingle 翅膀和神兵模型区分UI显示 默认false
         * @param shenlingEvolve 神灵进化次数，默认0
         */
        public static getModelName(index: number, sex: number = Sex.Male, isSingle: boolean = false, shenlingEvolve: number = 0): string {
            if(!index){
                return null;
            }
            let type = PropData.getPropParse(index, PropParseType.Type);
            let cfg = getConfigById(index);
            if (!cfg) {
                console.error("外显配置错误，配置index：", index);
                return null;
            }
            let modelName: string = cfg.icon;//模型名称

            if (type == ConfigHead.Wing || type == ConfigHead.Weapon) {
                //翅膀和神兵模型区分UI显示
                if (isSingle) {
                    let strArr: string[] = modelName.split("_");
                    modelName = strArr[0] + "_ui_" + strArr[1];
                }
            } else if (type == ConfigHead.Body) {
                //时装模型区分男女
                let strArr: string[] = modelName.split("_");
                modelName = (sex == Sex.Male ? "male_" : "female_") + strArr[1];
            } else if (type == ConfigHead.Shenling) {
                //进化神灵或者女仆的神灵幻化等级
                if (shenlingEvolve) {
                    let icons = cfg.icons.split(',') || [];
                    shenlingEvolve = Math.max(0, shenlingEvolve - 1);//需要自减一次
                    modelName = icons[shenlingEvolve];
                    if (!modelName) {
                        modelName = cfg.icon;
                    }
                }
            }
            return modelName;
        }
        /**
         * 通过外显表头，模型名称获取模型动作资源，如：assets\anim\body\female_01\atk1_2
         * */
        public static getModelUrlByModelName(headType: number, modelName: string, dir: number, act: string, isUi: boolean = false, isWeapon: boolean = false): string {
            if(!modelName){
                return null;
            }
            if(isWeapon && headType == ConfigHead.Huashen){
                headType = ConfigHead.Huashen2;//化神武器部位
            }
            let surfaceStr = SurfaceConfigList[headType];
            let modelAct = this.getModelAct(dir, act, isUi);
            return "assets/anim/" + surfaceStr + "/" + modelName + "/" + modelAct;
        }
        /**
         * 获取模型动作资源，如：atk1_2
         * */
        public static getModelAct(dir: number, act: string, isUi: boolean = false): string {
            let ui: string = isUi ? "ui_" : "";
            if(!isUi){
                dir = MirDirFor3[dir] || dir;//模型映射
            }
            return ui + act + "_" + dir;
        }

        /**
         * 获取战队旗帜
         */
        public static getZhanduiFlag(index: number): string {
            return `zhandui_flag${index}`
        }

        /**
         * 技能展示类型
         * @param skillId
         */
        public static getSkillShowType(skillId: number): string {
            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            if (cfg && cfg.show_type) {
                return `jineng_show_type_` + cfg.show_type;
            }
            return '';
        }

        /**
         * 戒指外显突破
         * @param id 戒指id
         */
        public static getRingSrc(id: number): string {
            let cfg: RingConfig = getConfigById(id);
            if (!cfg) {
                return '';
            }
            return 'assets/ring/' + cfg.icon + '.png';
        }

        /**
         *兽印外显突破
         * @param id 兽印id
         */
        public static getShouyinSrc(id: number): string {
            let cfg: YishouShouyingConfig = getConfigById(id);
            if (!cfg) {
                return '';
            }
            return 'assets/shouyin/' + cfg.icon + '.png';
        }

    }
}
