var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var _a;
    /**角色界面装备位置（从左到右从上到下）[0, 5, 1, 6, 2, 7, 3, 8, 4, 9]*/
    game.EquipPosAry = [
        0 /* SWORD */, 5 /* JADE */, 1 /* CLOTHES */,
        6 /* SHOULDER */, 2 /* BELT */, 7 /* HELMET */,
        3 /* PANTS */, 8 /* BOOT */, 4 /* NECKLACE */, 9 /* RING */
    ];
    /**装备部位名称*/
    game.EquipPosName = (_a = {},
        _a[0 /* SWORD */] = "equip_type_0" /* equip_type_0 */,
        _a[1 /* CLOTHES */] = "equip_type_1" /* equip_type_1 */,
        _a[2 /* BELT */] = "equip_type_2" /* equip_type_2 */,
        _a[3 /* PANTS */] = "equip_type_3" /* equip_type_3 */,
        _a[4 /* NECKLACE */] = "equip_type_4" /* equip_type_4 */,
        _a[5 /* JADE */] = "equip_type_5" /* equip_type_5 */,
        _a[6 /* SHOULDER */] = "equip_type_6" /* equip_type_6 */,
        _a[7 /* HELMET */] = "equip_type_7" /* equip_type_7 */,
        _a[8 /* BOOT */] = "equip_type_8" /* equip_type_8 */,
        _a[9 /* RING */] = "equip_type_9" /* equip_type_9 */,
        _a);
})(game || (game = {}));
var game;
(function (game) {
    var _a, _b, _c, _d;
    /**拆表的配置，用于遍历获取配置*/
    game.MonsterConfigList = ["monster1.json" /* Monster */];
    game.GateConfigList = ["gate1.json" /* Gate */];
    game.SplitConfigMap = (_a = {},
        _a["monster1.json" /* Monster */] = game.MonsterConfigList,
        _a["gate1.json" /* Gate */] = game.GateConfigList,
        _a);
    /** 表头映射 getConfigById表头只匹配了两位数*/
    game.ConfigMap = (_b = {},
        /*****************************新加的**************************/
        _b[145 /* Prop */] = "prop.json" /* Prop */,
        _b[290 /* Equip */] = "equipment.json" /* Equip */,
        _b[370 /* Title */] = "title.json" /* Title */,
        _b[390 /* DressUp */] = "dress.json" /* DressUp */,
        _b[400 /* Shenling */] = "shenling.json" /* Shenling */,
        _b[360 /* Horse */] = "horse.json" /* Horse */,
        _b[640 /* Tianshen */] = "yuanling.json" /* Tianshen */,
        _b[361 /* Lingchong */] = "xianchong.json" /* Lingchong */,
        _b[404 /* Wing */] = "wing.json" /* WingSkin */,
        _b[403 /* Weapon */] = "weapon.json" /* Weapon */,
        _b[405 /* Body */] = "body.json" /* Body */,
        _b[601 /* Child */] = "child.json" /* Child */,
        _b[602 /* ChildShenbing */] = "child_shenbing.json" /* ChildShenbing */,
        _b[603 /* ChildLingyi */] = "child_lingyi.json" /* ChildLingyi */,
        _b[604 /* Ring */] = "ring.json" /* Ring */,
        _b[408 /* Xianjian */] = "xianjian.json" /* Xianjian */,
        _b[409 /* Huashen */] = "huashen.json" /* Huashen */,
        _b[605 /* Shouling */] = "yishou_shouling.json" /* YishouShouling */,
        _b[606 /* Shouyin */] = "yishou_shouying.json" /* YishouShouyin */,
        _b[701 /* ZhanduiJitanHuanhua */] = "zhandui_jitan_huanhua.json" /* ZhanduiJitanHuanhua */,
        _b);
    /**外显类的配置定义，映射外显资源，SurfaceUtil需要加下映射，ResUtil.getSurfaceData根据具体需求修改*/
    game.SurfaceConfigList = (_c = {},
        _c[400 /* Shenling */] = "general",
        _c[360 /* Horse */] = "horse",
        _c[640 /* Tianshen */] = "yuanling",
        _c[361 /* Lingchong */] = "lingchong",
        _c[404 /* Wing */] = "wing",
        _c[405 /* Body */] = "body",
        _c[403 /* Weapon */] = "weapon",
        _c[9900 /* Horse2 */] = "horse",
        _c[9901 /* Creature */] = "creature",
        _c[601 /* Child */] = "child",
        _c[602 /* ChildShenbing */] = "child_shenbing",
        _c[603 /* ChildLingyi */] = "child_lingyi",
        _c[604 /* Ring */] = "ring",
        _c[408 /* Xianjian */] = "xianjian",
        _c[409 /* Huashen */] = "huashen",
        _c[9902 /* Huashen2 */] = "huashen_weapon",
        _c[605 /* Shouling */] = "shouling",
        _c[606 /* Shouyin */] = "shouyin",
        _c[701 /* ZhanduiJitanHuanhua */] = "zhanduijitan",
        _c);
    /**根据表头获取提示文本*/
    game.ConfigHeadToName = (_d = {},
        _d[400 /* Shenling */] = "general_tips" /* general_tips */,
        _d[360 /* Horse */] = "horse_tips" /* horse_tips */,
        _d[640 /* Tianshen */] = "yuanling_tips" /* yuanling_tips */,
        _d[361 /* Lingchong */] = "lingchong_tips" /* lingchong_tips */,
        _d[404 /* Wing */] = "wing_tips" /* wing_tips */,
        _d[405 /* Body */] = "body_tips" /* body_tips */,
        _d[403 /* Weapon */] = "weapon_tips" /* weapon_tips */,
        _d[290 /* Equip */] = "equipment_tips" /* equipment_tips */,
        _d[409 /* Huashen */] = "huashen_tips" /* huashen_tips */ //化神
    ,
        _d);
})(game || (game = {}));
var game;
(function (game) {
    var _a, _b, _c, _d, _e, _f;
    game.MirDir = (_a = {},
        _a[7 /* LEFT */] = 3 /* RIGHT */,
        _a[8 /* LEFT_UP */] = 2 /* RIGHT_UP */,
        _a[6 /* LEFT_DOWN */] = 4 /* RIGHT_DOWN */,
        _a);
    game.ReversalDir = (_b = {},
        _b[3 /* RIGHT */] = 7 /* LEFT */,
        _b[2 /* RIGHT_UP */] = 6 /* LEFT_DOWN */,
        _b[1 /* UP */] = 5 /* DOWN */,
        _b[8 /* LEFT_UP */] = 4 /* RIGHT_DOWN */,
        _b[7 /* LEFT */] = 3 /* RIGHT */,
        _b[6 /* LEFT_DOWN */] = 2 /* RIGHT_UP */,
        _b[5 /* DOWN */] = 1 /* UP */,
        _b[4 /* RIGHT_DOWN */] = 8 /* LEFT_UP */,
        _b);
    /** 2面资源 纯向左向右时，考虑不切换方向 */
    game.MirDirFor2 = (_c = {},
        _c[1 /* UP */] = 2 /* RIGHT_UP */,
        _c[7 /* LEFT */] = 2 /* RIGHT_UP */,
        _c[8 /* LEFT_UP */] = 2 /* RIGHT_UP */,
        _c[6 /* LEFT_DOWN */] = 4 /* RIGHT_DOWN */,
        _c[3 /* RIGHT */] = 4 /* RIGHT_DOWN */,
        _c[5 /* DOWN */] = 4 /* RIGHT_DOWN */,
        _c);
    /** 3面资源 纯向左向右时，考虑不切换方向 */
    game.MirDirFor3 = (_d = {},
        _d[1 /* UP */] = 2 /* RIGHT_UP */,
        _d[7 /* LEFT */] = 3 /* RIGHT */,
        _d[8 /* LEFT_UP */] = 2 /* RIGHT_UP */,
        _d[6 /* LEFT_DOWN */] = 4 /* RIGHT_DOWN */,
        _d[5 /* DOWN */] = 4 /* RIGHT_DOWN */,
        _d);
    game.AlterXDirs2 = (_e = {},
        _e[7 /* LEFT */] = -1,
        _e[8 /* LEFT_UP */] = -1,
        _e[6 /* LEFT_DOWN */] = -1,
        _e[5 /* DOWN */] = -1,
        _e);
    game.AlterXDirs3 = (_f = {},
        _f[7 /* LEFT */] = -1,
        _f[8 /* LEFT_UP */] = -1,
        _f[6 /* LEFT_DOWN */] = -1,
        _f[1 /* UP */] = -1,
        _f);
    game.DefaultSortOrder = [360 /* Horse */, 404 /* Wing */, 405 /* Body */, 409 /* Huashen */, 403 /* Weapon */, 9902 /* Huashen2 */, 9900 /* Horse2 */];
    var SortStdDir;
    var SortOtherDir;
    function getSortOrder(dir, actionName) {
        if (actionName === void 0) { actionName = "std" /* STAND */; }
        var last_dir = game.MirDir[dir] ? game.MirDir[dir] : dir;
        if (SortStdDir == null) {
            SortStdDir = {};
            SortStdDir[2 /* RIGHT_UP */] = [360 /* Horse */, 405 /* Body */, 409 /* Huashen */, 403 /* Weapon */, 9902 /* Huashen2 */, 404 /* Wing */, 9900 /* Horse2 */];
            SortStdDir[3 /* RIGHT */] = [360 /* Horse */, 404 /* Wing */, 405 /* Body */, 409 /* Huashen */, 403 /* Weapon */, 9902 /* Huashen2 */, 9900 /* Horse2 */];
            SortStdDir[4 /* RIGHT_DOWN */] = [360 /* Horse */, 404 /* Wing */, 405 /* Body */, 409 /* Huashen */, 403 /* Weapon */, 9902 /* Huashen2 */, 9900 /* Horse2 */];
            SortOtherDir = {};
            SortOtherDir[2 /* RIGHT_UP */] = [360 /* Horse */, 405 /* Body */, 409 /* Huashen */, 403 /* Weapon */, 9902 /* Huashen2 */, 404 /* Wing */, 9900 /* Horse2 */];
            SortOtherDir[3 /* RIGHT */] = [360 /* Horse */, 405 /* Body */, 409 /* Huashen */, 404 /* Wing */, 403 /* Weapon */, 9902 /* Huashen2 */, 9900 /* Horse2 */];
            SortOtherDir[4 /* RIGHT_DOWN */] = [360 /* Horse */, 404 /* Wing */, 405 /* Body */, 409 /* Huashen */, 403 /* Weapon */, 9902 /* Huashen2 */, 9900 /* Horse2 */];
        }
        if (actionName == "std" /* STAND */) {
            return SortStdDir[last_dir] || game.DefaultSortOrder;
        }
        else {
            return SortOtherDir[last_dir] || game.DefaultSortOrder;
        }
    }
    game.getSortOrder = getSortOrder;
    /** 重剑攻击不显示轻剑 */
    game.AtkNoWeapon = [
        "atk" /* ATTACK */ + 7,
        "atk" /* ATTACK */ + 8,
        "atk" /* ATTACK */ + 9
    ];
    // /** 骑行不显示跑动作 */
    // export const RideNoRun: number[] = [
    //     ConfigHead.Body,
    //     ConfigHead.Wing,
    //     ConfigHead.Weapon,
    // ];
    /**不放大模型*/
    game.NoScaleSurface = [
        9901 /* Creature */,
        400 /* Shenling */,
    ];
})(game || (game = {}));
var game;
(function (game) {
    var _a, _b;
    game.EquipMeltQuality = 3; //装备熔炼品质限制*/
    game.BagEquipTipsCnt = 20; //装备背包剩余数量小于20时提示熔炼，检测背包也用到*/
    /**背包名字*/
    game.BagTypeToName = (_a = {},
        _a[1 /* Goods */] = "道具背包",
        _a[2 /* Material */] = "材料背包",
        _a[5 /* Gem */] = "宝石背包",
        _a[3 /* RoleEquip */] = "装备背包",
        _a[4 /* ShenlingEquip */] = "神灵装备背包",
        _a[6 /* YuanlinEquip */] = "元灵装备背包",
        _a);
    /**index规则取字段*/
    game.PropParseTypeList = (_b = {},
        _b[0 /* BigType */] = [0, 5],
        _b[1 /* Type */] = [0, 3],
        _b[2 /* PropType */] = [3, 2],
        _b[3 /* PropSubType */] = [5, 2],
        _b);
    /**道具需要监听子类型的类型集合，比如外显系统需要子类型来区分*/
    game.PropListenerSubType = [
        11 /* Surface */,
        17 /* Lianshendan */,
        32 /* UpStar */
    ];
    /**道具数量显示成时间文本，统一秒*/
    game.PropCntShowTimeStr = [
        1451201005 /* Gongfeng */,
        1453501001 /* XujieJitanJiasu */,
        1453701001 /* NvshenJiasu */
    ];
})(game || (game = {}));
var game;
(function (game) {
    var TimeMgr = base.TimeMgr;
    var MdrBase = /** @class */ (function (_super) {
        __extends(MdrBase, _super);
        function MdrBase(parent) {
            return _super.call(this, parent) || this;
        }
        MdrBase.prototype.addListeners = function () {
            _super.prototype.addListeners.call(this);
            var addEventListener = this.onEgret.bind(this);
            var view = this.getView();
            var secondPop = view && view["secondPop"];
            if (secondPop) {
                addEventListener(secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide);
            }
        };
        MdrBase.prototype.doHide = function (disposeImmediately) {
            var view = this.getView();
            if (!view) {
                return;
            }
            if (this._tab) {
                this._tab.hide();
            }
            this.$clearList();
            _super.prototype.doHide.call(this, disposeImmediately);
        };
        // private $clearList(exclude: string = undefined): void {
        MdrBase.prototype.$clearList = function () {
            var view = this.getView();
            if (!view) {
                return;
            }
            if (typeof view.numChildren !== "number") {
                return;
            }
            for (var i = 0, n = view.numChildren; i < n; i++) {
                var list = view.getChildAt(i);
                if (egret.is(list, "eui.Scroller")) {
                    list = list.viewport;
                }
                if (!list) {
                    continue;
                }
                // if (exclude && list.name === exclude) {
                //     continue;
                // }
                if (!egret.is(list, "eui.List")) {
                    continue;
                }
                var dataProvider = list.dataProvider;
                if (egret.is(dataProvider, "eui.ArrayCollection")) {
                    dataProvider.removeAll();
                }
                else {
                    list.dataProvider = null;
                }
            }
        };
        MdrBase.prototype.onHide = function () {
            _super.prototype.onHide.call(this);
            if (TimeMgr.hasUpdateItem(this)) {
                TimeMgr.removeUpdateItem(this);
            }
        };
        MdrBase.prototype.dispose = function () {
            if (this._tab) {
                this._tab.dispose();
                this._tab = undefined;
            }
            var view = this.getView();
            if (egret.is(view, "eui.Component")) {
                view.skinName = null;
            }
            this.$clearList();
            _super.prototype.dispose.call(this);
        };
        MdrBase.prototype.genMdrTab = function (t, list) {
            if (this._tab) {
                console.error(this.name, "重复genMdrTab");
                return undefined;
            }
            var m = new t(this._owner, this.getView(), list);
            return this._tab = m;
        };
        //设置View层级
        MdrBase.prototype.setViewIndex = function (index) {
            if (index === void 0) { index = 0; }
            var view = this.getView();
            if (!view) {
                return;
            }
            if (view.parent) {
                view.parent.setChildIndex(view, index);
            }
        };
        /**解析showArgs数据，notShowArgs传true时，表示不默认返回showArgs*/
        MdrBase.prototype.decodeShowArgs = function (notShowArgs) {
            if (this._showArgs && Array.isArray(this._showArgs) && this._showArgs.length) {
                return +this._showArgs.shift();
            }
            if (notShowArgs) {
                //不返回showArgs
                return null;
            }
            return this._showArgs; //默认返回showArgs
        };
        return MdrBase;
    }(base.Mdr));
    game.MdrBase = MdrBase;
    __reflect(MdrBase.prototype, "game.MdrBase");
})(game || (game = {}));
var game;
(function (game) {
    var _a, _b, _c, _d;
    /**需要显示时间的中控活动类型，todo：需要注意的*/
    game.NeedShowTimeAct = (_a = {},
        _a[8 /* FlyRank */] = true,
        _a[9 /* FlyGift */] = true,
        _a[10 /* FlyRebate */] = true,
        _a);
    /**中控活动标签命名规则，todo：需要注意的*/
    game.ActivityTabName = "activity_tab_"; //ActivityTabName + ActivityType + _，如：activity_tab_8_1
    /**战令类型前往按钮文本*/
    game.GameOrderTypeBtnStr = (_b = {},
        _b[1 /* Chuangguanling */] = '前往挑战',
        _b[7 /* Chaojilicai */] = '前往日常',
        _b[8 /* Zhizunlicai */] = '前往供奉',
        _b);
    /**战令类型数值文本*/
    game.GameOrderTypeStr = (_c = {},
        _c[1 /* Chuangguanling */] = "当前闯关值：",
        _c[2 /* Huoyueling */] = "当前活跃值：",
        _c[3 /* Yaojiling */] = "当前瑶姬值：",
        _c[4 /* XiuXian */] = "当前修仙等级：",
        _c[5 /* Tansuo */] = "当前探索值：",
        _c[6 /* Huanjing */] = "当前击败幻境BOSS数量：",
        _c[7 /* Chaojilicai */] = "当前活跃值：",
        _c[8 /* Zhizunlicai */] = "当前供奉时间：",
        _c);
    /**战令类型解锁弹窗标题*/
    game.GameOrderUnlockTitle = (_d = {},
        _d[1 /* Chuangguanling */] = "闯关战令",
        _d[2 /* Huoyueling */] = "活跃战令",
        _d[3 /* Yaojiling */] = "瑶姬令",
        _d[4 /* XiuXian */] = "修仙战令",
        _d[5 /* Tansuo */] = "探索战令",
        _d[6 /* Huanjing */] = "幻境战令",
        _d[7 /* Chaojilicai */] = "超级理财",
        _d[8 /* Zhizunlicai */] = "至尊理财",
        _d);
})(game || (game = {}));
var game;
(function (game) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    /**套装类型名*/
    game.SuitTypeName = (_a = {},
        _a[1 /* CangTian */] = '苍天',
        _a[2 /* YanTian */] = '炎天',
        _a[3 /* HaoTian */] = '颢天',
        _a[4 /* XuanTian */] = '玄天',
        _a[5 /* JunTian */] = '钧天',
        _a);
    /**套装类型对应的功能开启id*/
    game.SuitTypeOpenIdx = (_b = {},
        _b[1 /* CangTian */] = 1041670126 /* SuitType1 */,
        _b[2 /* YanTian */] = 1041670127 /* SuitType2 */,
        _b[3 /* HaoTian */] = 1041670128 /* SuitType3 */,
        _b[4 /* XuanTian */] = 1041670129 /* SuitType4 */,
        _b[5 /* JunTian */] = 1041670130 /* SuitType5 */,
        _b);
    /**不同套装不同部位展示的属性*/
    game.SuitTypePosAttr = (_c = {},
        _c[0 /* SWORD */] = (_d = {},
            _d[3 /* HaoTian */] = ['atk', 'crit'],
            _d[4 /* XuanTian */] = ['atk', 'crit'],
            _d[5 /* JunTian */] = ['atk', 'hit'],
            _d),
        _c[1 /* CLOTHES */] = (_e = {},
            _e[3 /* HaoTian */] = ['max_hp', 'armor'],
            _e[4 /* XuanTian */] = ['max_hp', 'armor'],
            _e[5 /* JunTian */] = ['max_hp', 'armor'],
            _e),
        _c[2 /* BELT */] = (_f = {},
            _f[3 /* HaoTian */] = ['atk', 'armor_break'],
            _f[4 /* XuanTian */] = ['atk', 'armor_break'],
            _f[5 /* JunTian */] = ['atk', 'armor_break'],
            _f),
        _c[3 /* PANTS */] = (_g = {},
            _g[3 /* HaoTian */] = ['max_hp', 'armor'],
            _g[4 /* XuanTian */] = ['max_hp', 'armor'],
            _g[5 /* JunTian */] = ['max_hp', 'armor'],
            _g),
        _c[4 /* NECKLACE */] = (_h = {},
            _h[3 /* HaoTian */] = ['atk', 'crit'],
            _h[4 /* XuanTian */] = ['atk', 'crit'],
            _h[5 /* JunTian */] = ['atk', 'hit'],
            _h),
        _c[5 /* JADE */] = (_j = {},
            _j[3 /* HaoTian */] = ['atk', 'armor_break'],
            _j[4 /* XuanTian */] = ['atk', 'armor_break'],
            _j[5 /* JunTian */] = ['atk', 'armor_break'],
            _j),
        _c[6 /* SHOULDER */] = (_k = {},
            _k[3 /* HaoTian */] = ['max_hp', 'recrit'],
            _k[4 /* XuanTian */] = ['max_hp', 'recrit'],
            _k[5 /* JunTian */] = ['max_hp', 'dodge'],
            _k),
        _c[7 /* HELMET */] = (_l = {},
            _l[3 /* HaoTian */] = ['max_hp', 'recrit'],
            _l[4 /* XuanTian */] = ['max_hp', 'recrit'],
            _l[5 /* JunTian */] = ['max_hp', 'dodge'],
            _l),
        _c[8 /* BOOT */] = (_m = {},
            _m[3 /* HaoTian */] = ['max_hp', 'armor'],
            _m[4 /* XuanTian */] = ['max_hp', 'armor'],
            _m[5 /* JunTian */] = ['max_hp', 'armor'],
            _m),
        _c[9 /* RING */] = (_o = {},
            _o[3 /* HaoTian */] = ['atk', 'crit'],
            _o[4 /* XuanTian */] = ['atk', 'crit'],
            _o[5 /* JunTian */] = ['atk', 'hit'],
            _o),
        _c);
    /**套装类型1,2的装备部位 从左到右从上到下 0 5 1 6 2 7 3 4*/
    game.SuitEquipPosAry = [
        0 /* SWORD */, 5 /* JADE */, 1 /* CLOTHES */, 6 /* SHOULDER */,
        2 /* BELT */, 7 /* HELMET */, 3 /* PANTS */, 4 /* NECKLACE */
    ];
    /**套装类型3,4,5的装备部位 todo 跟EquipPosAry一样*/
    game.SuitEquipPosAry1 = [
        0 /* SWORD */, 5 /* JADE */, 1 /* CLOTHES */, 6 /* SHOULDER */, 2 /* BELT */,
        7 /* HELMET */, 3 /* PANTS */, 8 /* BOOT */, 4 /* NECKLACE */, 9 /* RING */
    ];
    /**Vo属性Long需要转化成number的字段*/
    game.RoleLongKeys = ["title_index" /* title_index */, "head" /* head */, "head_frame" /* head_frame */];
    /**道具index转化成角色属性key，只有货币类型才需要定义*/
    game.PropIndexToKey = (_p = {},
        _p[1450000001 /* Yuanbao */] = "gold" /* gold */,
        _p[1450000002 /* Xianyu */] = "diamond" /* diamond */,
        _p[1450000004 /* Lingqi */] = "lingqi" /* lingqi */,
        _p[1450000005 /* Shenlingjinghua */] = "godess" /* godess */,
        _p[1450000006 /* Mucai */] = "wood" /* wood */,
        _p[1450000007 /* Maiqi */] = "maiqi" /* maiqi */,
        _p[1450000008 /* Xianqi */] = "xianqi" /* xianqi */,
        _p[1450000011 /* Jingjibi */] = "jjb" /* jingjibi */,
        _p[1450000012 /* Fscoin */] = "fscoin" /* Fscoin */,
        _p[1450000013 /* Ylcoin */] = "ylcoin" /* Ylcoin */,
        _p[1450000014 /* Dlcoin */] = "dlcoin" /* Dlcoin */,
        _p[1450000015 /* Lmcoin */] = "lmcoin" /* Lmcoin */,
        _p[1450000016 /* Xzcoin */] = "xzcoin" /* Xzcoin */,
        _p[1450000017 /* Pretige */] = "pretige" /* Pretige */,
        _p[1450000018 /* Sgcoin */] = "sgcoin" /* Sgcoin */,
        _p[1450000025 /* Gfjs */] = "gfjs" /* Gfjs */,
        _p[1450000026 /* GuildTiantan */] = "guild_tiantan" /* GuildTiantan */,
        _p[1450000027 /* GuildShengtan */] = "guild_shengtan" /* GuildShengtan */,
        _p[1450000021 /* Linglipoint1 */] = "feng_linglipoint" /* LingliPoint1 */,
        _p[1450000022 /* Linglipoint2 */] = "lei_linglipoint" /* LingliPoint2 */,
        _p[1450000020 /* Linglipoint3 */] = "shui_linglipoint" /* LingliPoint3 */,
        _p[1450000019 /* Linglipoint4 */] = "huo_linglipoint" /* LingliPoint4 */,
        _p[1450000024 /* Linglipoint5 */] = "guang_linglipoint" /* LingliPoint5 */,
        _p[1450000023 /* Linglipoint6 */] = "an_linglipoint" /* LingliPoint6 */,
        _p[1450000028 /* Xtlqcoin */] = "xtlqcoin" /* Xtlqcoin */,
        _p[1450000029 /* Ssscoin */] = "ssscoin" /* Ssscoin */,
        _p[1450000030 /* Chengjiujifen */] = "chengjiu_jifen" /* chengjiu_jifen */,
        _p[1450000031 /* Tianxingzhu */] = "attic_point" /* Tianxingzhu */,
        _p[1451201005 /* Gongfeng */] = "storage_time" /* storage_time */,
        _p[1450000032 /* Feishengjingyanzhi */] = "feisheng_exp" /* feisheng_exp */,
        _p[1450000033 /* Huashenzhilujifen */] = "huashen_exp" /* huashen_exp */,
        _p[1450000035 /* Caiyunyinji */] = "caiyun_yinji" /* caiyun_yinji */,
        _p[1450000036 /* Xingshi */] = "xingshi" /* xingshi */,
        _p[1450000037 /* GuildScore */] = "guild_score" /* GuildScore */,
        _p[1450000038 /* GuildXianshouExp */] = "guild_xianshou_exp" /* GuildXianshouExp */,
        _p[1450000039 /* XujieNengliangshi */] = "zhandui_jitan_value" /* zhandui_jitan_value */,
        _p[1450000040 /* XujieShuijing */] = "zhandui_jitan_shuijin" /* zhandui_jitan_shuijin */,
        _p[1453501001 /* XujieJitanJiasu */] = "zhandui_jitan_total_speed_time" /* zhandui_jitan_total_speed_time */,
        // [PropIndex.Chuangshinengliang]: RolePropertyKey.cs_nvshen_nengliang,//创世能量
        _p[1453701001 /* NvshenJiasu */] = "cs_nvshen_total_speed_time" /* cs_nvshen_total_speed_time */,
        _p[1450000043 /* FengmoScore */] = "fengmo_score" /* fengmo_score */,
        _p[1450000044 /* XianmaiScore */] = "xianmai_score" /* xianmai_score */,
        _p[1450000045 /* Sea1 */] = "xjzh_nl" /* xjzh_nl */,
        _p[1450000046 /* Sea2 */] = "sjzh_nl" /* sjzh_nl */,
        _p[1450000047 /* Sea3 */] = "sgjzh_nl" /* sgjzh_nl */,
        _p[1450000050 /* Huanggushuijing */] = "huanggu_shuijing" /* huanggu_shuijing */,
        _p[1450000051 /* Xianqivalue */] = "xianqi_value" /* xianqi_value */,
        _p);
    game.RoleGodKeyToConfigHead = (_q = {},
        _q["\u65F6\u88C5" /* Body */] = 405 /* Body */,
        _q["\u7FBD\u7FFC" /* Wing */] = 404 /* Wing */,
        _q["\u795E\u5175" /* Weapon */] = 403 /* Weapon */,
        _q["\u5750\u9A91" /* Horse */] = 360 /* Horse */,
        _q["\u5143\u7075" /* Tianshen */] = 640 /* Tianshen */,
        _q["\u5316\u795E" /* Huashen */] = 409 /* Huashen */,
        _q);
    //映射个人副本类型
    game.FubenToNvpuEventType = (_r = {},
        _r[1 /* Type1 */] = 11 /* Fengmoshengdian */,
        _r[2 /* Type2 */] = 12 /* Jinguibaoxue */,
        _r[3 /* Type3 */] = 13 /* Penglaixianjing */,
        _r);
    //映射仙塔类型
    game.XiantaTypeToNvpuEventType = (_s = {},
        _s[1 /* Type1 */] = 16 /* Lingshouxianta */,
        _s[2 /* Type2 */] = 15 /* Wanjianxianta */,
        _s);
    //映射禁地类型
    game.JindiToNvpuEventType = (_t = {},
        _t[2 /* Type2 */] = 17 /* Huanggujindi */,
        _t[3 /* Type3 */] = 18 /* Xianlingjindi */,
        _t[4 /* Type4 */] = 19 /* Tianzhijindi */,
        _t[5 /* Type5 */] = 20 /* Shenzhijindi */,
        _t);
})(game || (game = {}));
var game;
(function (game) {
    var _a;
    game.ForbiddenTypeName = (_a = {},
        _a[1 /* Type1 */] = '血色禁地',
        _a[2 /* Type2 */] = '荒古禁地',
        _a[3 /* Type3 */] = '仙灵禁地',
        _a[4 /* Type4 */] = '天之禁地',
        _a[5 /* Type5 */] = '神之禁地',
        _a);
    game.YuanLingDiffAry = ['', '普通', '困难', '传说', '炼狱'];
})(game || (game = {}));
var game;
(function (game) {
    var _a;
    /**固定帧率的特效*/
    game.UIEftSrcFrame = (_a = {},
        _a["boss_coming" /* BossComing */] = 9 //boss来袭帧率固定9
    ,
        _a);
})(game || (game = {}));
var game;
(function (game) {
    /**
     * 经常调用的配置接口，可统一写在此处
     */
    var GameConfig = /** @class */ (function () {
        function GameConfig() {
        }
        GameConfig.getParamConfigById = function (id) {
            return getConfigByNameId("param.json" /* Param */, id);
        };
        GameConfig.getPropConfigById = function (id) {
            var cfg = getConfigById(id);
            if (!cfg) {
                DEBUG && console.error("\u9053\u5177\u8868\u6CA1\u6709\u914D\u7F6E\uFF1A" + id);
                return null;
            }
            return cfg;
        };
        GameConfig.getEquipmentCfg = function (id) {
            var cfg = getConfigById(id);
            if (!cfg) {
                DEBUG && console.error("\u88C5\u5907\u8868\u6CA1\u6709\u914D\u7F6E\uFF1A" + id);
                return null;
            }
            return cfg;
        };
        return GameConfig;
    }());
    game.GameConfig = GameConfig;
    __reflect(GameConfig.prototype, "game.GameConfig");
    var configListMap = {};
    function getConfigByName(name) {
        return game.LoadMgr.ins.getRes("assets/data/" + name)
            || game.LoadMgr.ins.getRes("assets/data_server/" + name);
    }
    game.getConfigByName = getConfigByName;
    function getConfigListByName(name) {
        var list = configListMap[name];
        if (list) {
            return list;
        }
        var obj = getConfigByName(name);
        if (!obj)
            return null;
        configListMap[name] = list = [];
        var kList = getObjKList(obj);
        for (var i = 0, len = kList.length; i < len; i++) {
            list.push(obj[kList[i]]);
        }
        return list;
    }
    game.getConfigListByName = getConfigListByName;
    function getObjKList(obj) {
        var kList = Object.keys(obj);
        kList.sort(/^[0-9]*$/.test(kList[0]) ? sortNum : undefined);
        return kList;
    }
    function sortNum(a, b) {
        var na = +a | 0;
        var nb = +b | 0;
        return na < nb ? -1 : 1;
    }
    function getConfigByNameId(name, id) {
        if (name == undefined || id == undefined) {
            return null;
        }
        var obj = getConfigByName(name);
        if (obj && obj.hasOwnProperty(id.toString())) {
            return obj[id];
        }
        //for (let configName in SplitConfigMap) {
        var configList = game.SplitConfigMap[name]; // SplitConfigMap[configName];
        if (!configList) {
            return null;
        }
        for (var j = 0; j < configList.length; j++) {
            var data = configList[j];
            var tab = getConfigByName(data);
            if (!tab[id]) {
                continue;
            }
            return tab[id];
        }
        return null;
        //let ret = getNextConfig(configName, configList);
        //}
        // function getNextConfig(configName: string, configList: string[]): any {
        //     let num = parseInt(name.substring(configName.length, configName.length + 1));
        //     if (num >= configList.length) return null;
        //     num++;
        //     let nextName = configName + num + ".json";
        //     return getConfigByNameId(nextName, id);
        // }
    }
    game.getConfigByNameId = getConfigByNameId;
    function getConfigById(id) {
        if (id == undefined) {
            return null;
        }
        if (typeof id == "string") {
            id = parseInt(id);
        }
        var head = game.PropData.getPropParse(id, 1 /* Type */);
        var configName = game.ConfigMap[head];
        return getConfigByNameId(configName, id);
    }
    game.getConfigById = getConfigById;
    function getLanById(id) {
        if (id == undefined) {
            return "";
        }
        var obj = getConfigByName("tips.json" /* Tips */);
        if (obj && obj.hasOwnProperty(id.toString())) {
            var cfg = obj[id];
            return cfg.content.replace(/\#N/g, "\n");
        }
        return "";
    }
    game.getLanById = getLanById;
    function getConfigZh() {
        var key = {};
        var time = Date.now();
        var cfg_list = getConfigListByName("tips.json" /* Tips */);
        for (var _i = 0, cfg_list_1 = cfg_list; _i < cfg_list_1.length; _i++) {
            var cfg = cfg_list_1[_i];
            var str = cfg;
            var list = str.content.split("");
            for (var i = 0, len = list.length; i < len; i++) {
                if (key[list[i]])
                    continue;
                key[list[i]] = true;
            }
        }
        var time1 = Date.now();
        console.warn("耗时1 " + ((time1 - time) / 1000) + "s");
        console.warn(key);
        var keys = Object.keys(key);
        var time2 = Date.now();
        console.warn("耗时2 " + ((time2 - time1) / 1000) + "s");
        console.warn(keys);
        console.warn("字符长度为" + keys.length);
        var time3 = Date.now();
        console.warn("耗时3 " + ((time3 - time2) / 1000) + "s");
    }
    game.getConfigZh = getConfigZh;
    function getProxy(modName, proxyType) {
        var mod = base.facade.retMod(modName);
        if (!mod) {
            return null;
        }
        return mod.retProxy(proxyType);
    }
    game.getProxy = getProxy;
})(game || (game = {}));
var game;
(function (game) {
    var Sprite = egret.Sprite;
    var TextField = egret.TextField;
    var HorizontalAlign = egret.HorizontalAlign;
    var Black = /** @class */ (function () {
        function Black() {
            this.initUI();
        }
        Black.ins = function () {
            if (this._ins == null) {
                this._ins = new Black();
            }
            return this._ins;
        };
        Black.prototype.initUI = function () {
            this._sp = new Sprite();
            this._sp.x = -game.Layer.tip.x;
            this._sp.y = -game.Layer.tip.y;
            this._sp.touchEnabled = true;
            var sw = game.Layer.tip.stage.stageWidth;
            var sh = game.Layer.tip.stage.stageHeight;
            this._sp.graphics.beginFill(0, 0.75);
            this._sp.graphics.drawRect(0, 0, 256, 256);
            this._sp.graphics.endFill();
            this._sp.scaleX = sw / 256;
            this._sp.scaleY = sh / 256;
            var lab = new TextField();
            lab.width = sw;
            lab.textAlign = HorizontalAlign.CENTER;
            lab.lineSpacing = 10;
            lab.textColor = 0xffffff;
            lab.stroke = 1;
            lab.strokeColor = 0xbb7644;
            lab.size = 40;
            lab.text = "请稍后...";
            lab.x = 0;
            lab.y = sh * 0.5 - 100;
            this._sp.addChild(lab);
        };
        Black.prototype.show = function () {
            game.Layer.tip.addChild(this._sp);
        };
        Black.prototype.hide = function () {
            if (this._sp && this._sp.parent) {
                this._sp.parent.removeChild(this._sp);
            }
        };
        return Black;
    }());
    game.Black = Black;
    __reflect(Black.prototype, "game.Black");
})(game || (game = {}));
var game;
(function (game) {
    var delayCall = base.delayCall;
    var Handler = base.Handler;
    var clearDelay = base.clearDelay;
    var Tween = base.Tween;
    /**
     * 字体跳动
     */
    var BmpDanceComp = /** @class */ (function (_super) {
        __extends(BmpDanceComp, _super);
        function BmpDanceComp() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        BmpDanceComp.prototype.onAddToStage = function () {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.name = 'bmp_dance';
            this.createContainer();
            if (!this._hub) {
                this._hub = new game.UIEftHub(this);
            }
        };
        BmpDanceComp.prototype.onRemoveFromStage = function () {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            var numChild = this._container.numChildren;
            for (var i = 0; i < numChild; i++) {
                var child = this._container.getChildAt(i);
                if (child) {
                    Tween.remove(child);
                }
            }
            this.clearDelayCall();
            game.DisplayUtils.UnParent(this); //从父级移除
            this._hub.removeAllEffects();
        };
        BmpDanceComp.prototype.createContainer = function () {
            if (!this._container) {
                this._container = new egret.DisplayObjectContainer();
            }
            this.addChild(this._container);
        };
        /**
         * 字体跳动，从头到尾不断循环
         * @param txt
         */
        BmpDanceComp.prototype.updateDance = function (txt) {
            if (!txt) {
                return;
            }
            if (!this._container) {
                this.createContainer();
            }
            this._hub.addBmpFont(txt, game.BmpTextCfg[226 /* BmpDance */], this._container, true, 2, false, -3);
            this._delayCall = delayCall(Handler.alloc(this, this.danceFunc), 500);
        };
        BmpDanceComp.prototype.clearDelayCall = function () {
            if (this._delayCall) {
                clearDelay(this._delayCall);
                this._delayCall = null;
            }
        };
        BmpDanceComp.prototype.danceFunc = function () {
            this.clearDelayCall();
            if (this._container && this._container.numChildren) {
                this.childDance(0);
            }
        };
        //字体跳动
        BmpDanceComp.prototype.childDance = function (childIdx) {
            if (!this._container || !this._container.numChildren) {
                return;
            }
            var delayTime = 100;
            if (childIdx >= this._container.numChildren) {
                childIdx = 0;
                delayTime = 1000; //下一轮间隔1秒
            }
            var child = this._container.getChildAt(childIdx);
            if (!child) {
                return;
            }
            Tween.remove(child);
            Tween.get(child)
                .delay(delayTime)
                .to({ y: -10 }, 300)
                .delay(100)
                .to({ y: 0 }, 300)
                .exec(Handler.alloc(this, this.childDance, [childIdx + 1]));
        };
        return BmpDanceComp;
    }(eui.Component));
    game.BmpDanceComp = BmpDanceComp;
    __reflect(BmpDanceComp.prototype, "game.BmpDanceComp");
})(game || (game = {}));
var game;
(function (game) {
    var DisplayObjectContainer = egret.DisplayObjectContainer;
    var Pool = base.Pool;
    var Handler = base.Handler;
    var delayCall = base.delayCall;
    var Tween = base.Tween;
    var CloudEffectCtr = /** @class */ (function (_super) {
        __extends(CloudEffectCtr, _super);
        function CloudEffectCtr() {
            var _this = _super.call(this) || this;
            var _self = _this;
            _self.touchEnabled = false;
            _self.touchChildren = false;
            _self.img_bg0 = Pool.alloc(game.BitmapBase);
            _self.img_bg0.touchEnabled = false;
            _self.addChild(_this.img_bg0);
            _self.img_bg1 = Pool.alloc(game.BitmapBase);
            _self.img_bg1.touchEnabled = false;
            _self.addChild(_this.img_bg1);
            _self.img_bg0.source = _self.img_bg1.source = game.ResUtil.getUiPng("scene_cloud");
            return _this;
        }
        CloudEffectCtr.ins = function () {
            if (this._ins == null) {
                this._ins = new CloudEffectCtr();
            }
            return this._ins;
        };
        CloudEffectCtr.prototype.show = function (src, _handler, _endHandler) {
            if (src === void 0) { src = "scene_cloud"; }
            if (_handler === void 0) { _handler = null; }
            if (_endHandler === void 0) { _endHandler = null; }
            var _self = this;
            if (_self._isTween) {
                if (_handler) {
                    _handler.exec();
                }
                _handler = null;
                return;
            }
            _self._isTween = true;
            _self._endHandle = _endHandler;
            _self._handle = _handler;
            // _self.img_bg0.source = _self.img_bg1.source = ResUtil.getUiPng(src);
            var sw = _self.width = gso.gameStage.stageWidth;
            var sh = _self.height = gso.gameStage.stageHeight;
            var _scale = sw / 640;
            var imgW = _self.img_bg0.width = _self.img_bg1.width = 868 * 2.5 * _scale; //isFullScene ? 1206 * sw / yyClientGso.contentWidth : 680 * 2.5 * sw / yyClientGso.contentWidth;
            var imgH = _self.img_bg0.height = _self.img_bg1.height = 1136 * 2.5 * _scale; //isFullScene ? yyClientGso.contentHeight : 864 * 2.5 * sh / yyClientGso.contentHeight;
            _self.x = -game.Layer.tip.x;
            _self.img_bg0.x = -imgW * 0.8;
            _self.img_bg1.x = sw - imgW * 0.4;
            _self.img_bg0.y = _self.img_bg1.y = (sh - imgH) * 0.5;
            game.Layer.tip.addChild(_self);
            var showTime = 800;
            var hideTime = 800;
            Tween.get(_self.img_bg0)
                .to({ x: -imgW * 0.6 }, showTime)
                .to({ x: sw }, hideTime);
            Tween.get(_self.img_bg1)
                .to({ x: sw - imgW * 0.6 }, showTime)
                .to({ x: -imgW }, hideTime)
                .exec(Handler.alloc(_self, _self.hideCloudEftShow));
            if (_self._handle) {
                delayCall(_self._handle, showTime);
            }
        };
        CloudEffectCtr.prototype.hideCloudEftShow = function () {
            var _self = this;
            // _self.img_bg0.source = null;
            // _self.img_bg1.source = null;
            if (_self.parent) {
                _self.parent.removeChild(_self);
            }
            _self._isTween = false;
            if (_self._endHandle)
                _self._endHandle.exec();
        };
        CloudEffectCtr.prototype.isCloudEfting = function () {
            return this._isTween;
        };
        return CloudEffectCtr;
    }(DisplayObjectContainer));
    game.CloudEffectCtr = CloudEffectCtr;
    __reflect(CloudEffectCtr.prototype, "game.CloudEffectCtr");
})(game || (game = {}));
var game;
(function (game) {
    var _a, _b;
    game.BmpTextCfg = (_a = {},
        //客户端专用
        _a[104 /* MainVip */] = "main_vip",
        _a[123 /* ReviveNum */] = "revive_num",
        _a[128 /* RedFrame */] = "redframefont",
        /**新加的字体*/
        _a[200 /* RebirthLv */] = "rebirth_font",
        _a[100 /* CommonPower */] = "common_power",
        _a[201 /* CommonPower2 */] = "common_power2",
        _a[202 /* PowerAdd1 */] = "power_add1",
        _a[203 /* PowerAdd2 */] = "power_add2",
        _a[204 /* Stage */] = "stage_font",
        _a[205 /* ChineseLayer */] = "chinese_layer_font",
        _a[206 /* Layer */] = "layer_font",
        _a[207 /* Price */] = "price_font",
        _a[208 /* Score */] = "common_score",
        _a[209 /* CommonStage */] = "common_stage",
        _a[210 /* Vip */] = 'vip',
        _a[211 /* Vip1 */] = 'vip1',
        _a[212 /* VipFont */] = 'vip_font',
        _a[213 /* XianYu */] = 'xianyu',
        _a[214 /* XianYu1 */] = 'xianyu1',
        _a[215 /* Summon */] = 'font_1',
        _a[216 /* Supremegit */] = 'zhizunlibao',
        _a[217 /* CommonStage1 */] = 'common_stage1',
        _a[218 /* EquipStage */] = 'equip_stage',
        _a[219 /* Feishenglibao */] = 'feishenglibao',
        _a[220 /* VipChatFont */] = 'vip_chat_font',
        _a[221 /* GoddessFont */] = 'goddess_font',
        _a[222 /* XujietansuoTbs */] = 'xujietansuo_tbs',
        _a[223 /* XujietansuoLayer */] = 'xujietansuo_layer',
        _a[224 /* XiuxianNvpu */] = 'xiuxiannvpu',
        _a[225 /* Zhandui */] = 'zhandui',
        _a[226 /* BmpDance */] = 'bmp_dance',
        _a[227 /* LingYuanGou */] = 'lingyuangou',
        _a[228 /* HuanJingFont */] = 'huanjing_font',
        _a);
    game.FontGap = (_b = {},
        _b[game.BmpTextCfg[100 /* CommonPower */]] = -8,
        _b[game.BmpTextCfg[104 /* MainVip */]] = -4,
        _b[game.BmpTextCfg[128 /* RedFrame */]] = -30,
        _b[game.BmpTextCfg[208 /* Score */]] = -60,
        _b[game.BmpTextCfg[215 /* Summon */]] = -5,
        _b[game.BmpTextCfg[216 /* Supremegit */]] = -10,
        _b[game.BmpTextCfg[214 /* XianYu1 */]] = -4,
        _b[game.BmpTextCfg[219 /* Feishenglibao */]] = -15,
        _b[game.BmpTextCfg[227 /* LingYuanGou */]] = -8,
        _b);
    game.TextDuration = 35;
    game.AtkRandomX = [10, 30, 50, 70, 90, 110, 130];
    game.AtkRandomY = [70, 90, 110, 130, 150, 170, 190];
    game.HitRandomX = [0, 15, 30, 45, 60, 75, 105];
    game.HitRandomY = [15, 35, 45, 55, 75, 95, 115];
    game.CritRandomX = [60, 80, 100, 120, 140, 160, 180];
    game.CritRandomY = [90, 120, 150, 180, 200, 230, 250];
    game.AtkAttr = [
        { x: 0.00, y: 0.00, a: 1.00, sx: 1.00, sy: 1.00, t: 51 },
        { x: 1.95, y: -8.00, a: 1.00, sx: 2.37, sy: 2.37, t: 67 },
        { x: 3.36, y: -13.55, a: 1.00, sx: 2.28, sy: 2.28, t: 83 },
        { x: 4.76, y: -18.88, a: 1.00, sx: 2.19, sy: 2.19, t: 99 },
        { x: 6.25, y: -24.29, a: 1.00, sx: 2.10, sy: 2.10, t: 133 },
        { x: 9.20, y: -34.35, a: 1.00, sx: 1.94, sy: 1.94, t: 150 },
        { x: 10.66, y: -39.01, a: 1.00, sx: 1.86, sy: 1.86, t: 167 },
        { x: 12.12, y: -43.40, a: 1.00, sx: 1.78, sy: 1.78, t: 183 },
        { x: 13.48, y: -47.31, a: 1.00, sx: 1.71, sy: 1.71, t: 200 },
        { x: 14.92, y: -51.21, a: 1.00, sx: 1.65, sy: 1.65, t: 217 },
        { x: 16.44, y: -55.07, a: 1.00, sx: 1.58, sy: 1.58, t: 250 },
        { x: 19.12, y: -61.22, a: 1.00, sx: 1.46, sy: 1.46, t: 283 },
        { x: 21.86, y: -66.62, a: 1.00, sx: 1.36, sy: 1.36, t: 300 },
        { x: 23.26, y: -69.03, a: 1.00, sx: 1.31, sy: 1.31, t: 316 },
        { x: 24.58, y: -71.07, a: 1.00, sx: 1.27, sy: 1.27, t: 332 },
        { x: 25.88, y: -72.88, a: 1.00, sx: 1.23, sy: 1.23, t: 350 },
        { x: 27.26, y: -74.55, a: 1.00, sx: 1.19, sy: 1.19, t: 367 },
        { x: 28.63, y: -75.98, a: 1.00, sx: 1.16, sy: 1.16, t: 401 },
        { x: 31.36, y: -78.06, a: 1.00, sx: 1.10, sy: 1.10, t: 417 },
        { x: 32.63, y: -78.69, a: 1.00, sx: 1.08, sy: 1.08, t: 451 },
        { x: 36.56, y: -79.20, a: 1.00, sx: 1.02, sy: 1.02, t: 483 },
        { x: 37.89, y: -78.88, a: 1.00, sx: 1.01, sy: 1.01, t: 500 },
        { x: 39.21, y: -78.30, a: 1.00, sx: 1.00, sy: 1.00, t: 516 },
        { x: 40.36, y: -77.58, a: 1.00, sx: 1.00, sy: 1.00, t: 550 },
        { x: 42.96, y: -75.21, a: 1.00, sx: 1.00, sy: 1.00, t: 567 },
        { x: 44.25, y: -73.64, a: 1.00, sx: 1.00, sy: 1.00, t: 583 },
        { x: 45.53, y: -71.82, a: 1.00, sx: 1.00, sy: 1.00, t: 600 },
        { x: 46.81, y: -69.75, a: 1.00, sx: 1.00, sy: 1.00, t: 616 },
        { x: 47.92, y: -67.71, a: 1.00, sx: 1.00, sy: 1.00, t: 633 },
        { x: 49.18, y: -65.15, a: 0.91, sx: 0.94, sy: 0.94, t: 650 },
        { x: 50.44, y: -62.35, a: 0.80, sx: 0.86, sy: 0.86, t: 666 },
        { x: 51.61, y: -59.48, a: 0.71, sx: 0.80, sy: 0.80, t: 684 },
        { x: 52.93, y: -55.97, a: 0.61, sx: 0.73, sy: 0.73, t: 701 },
        { x: 55.24, y: -49.05, a: 0.46, sx: 0.62, sy: 0.62, t: 733 },
        { x: 56.53, y: -44.75, a: 0.38, sx: 0.57, sy: 0.57, t: 751 },
        { x: 57.81, y: -40.18, a: 0.31, sx: 0.52, sy: 0.52, t: 783 },
        { x: 60.00, y: -31.63, a: 0.21, sx: 0.44, sy: 0.44, t: 800 },
        { x: 61.26, y: -26.27, a: 0.15, sx: 0.41, sy: 0.41, t: 816 },
        { x: 62.31, y: -21.60, a: 0.12, sx: 0.38, sy: 0.38, t: 833 },
        { x: 63.69, y: -15.05, a: 0.08, sx: 0.35, sy: 0.35, t: 851 },
        { x: 64.72, y: -9.91, a: 0.05, sx: 0.34, sy: 0.34, t: 867 },
        { x: 65.82, y: -4.21, a: 0.03, sx: 0.32, sy: 0.32, t: 883 },
        { x: 66.91, y: 1.71, a: 0.01, sx: 0.31, sy: 0.31, t: 900 },
        { x: 68.06, y: 8.25, a: 0.00, sx: 0.30, sy: 0.30, t: 917 }
    ];
    game.CirtAttr = [
        { x: 0.00, y: 0.00, a: 0.00, sx: 1.00, sy: 1.00, t: 34 },
        { x: 22.09, y: -7.68, a: 1.00, sx: 2.36, sy: 2.36, t: 67 },
        { x: 24.17, y: -15.75, a: 1.00, sx: 2.23, sy: 2.23, t: 101 },
        { x: 27.19, y: -26.74, a: 1.00, sx: 2.04, sy: 2.04, t: 151 },
        { x: 30.12, y: -36.48, a: 1.00, sx: 1.87, sy: 1.87, t: 200 },
        { x: 32.14, y: -42.65, a: 1.00, sx: 1.77, sy: 1.77, t: 234 },
        { x: 35.03, y: -50.68, a: 1.00, sx: 1.62, sy: 1.62, t: 283 },
        { x: 37.01, y: -55.65, a: 1.00, sx: 1.53, sy: 1.53, t: 317 },
        { x: 38.92, y: -60.02, a: 1.00, sx: 1.45, sy: 1.45, t: 350 },
        { x: 40.83, y: -63.93, a: 1.00, sx: 1.38, sy: 1.38, t: 383 },
        { x: 42.77, y: -67.47, a: 1.00, sx: 1.31, sy: 1.31, t: 417 },
        { x: 44.65, y: -70.45, a: 1.00, sx: 1.25, sy: 1.25, t: 450 },
        { x: 46.56, y: -73.03, a: 1.00, sx: 1.19, sy: 1.19, t: 484 },
        { x: 48.41, y: -75.07, a: 1.00, sx: 1.14, sy: 1.14, t: 517 },
        { x: 50.30, y: -76.70, a: 1.00, sx: 1.10, sy: 1.10, t: 551 },
        { x: 53.00, y: -78.19, a: 1.00, sx: 1.05, sy: 1.05, t: 600 },
        { x: 54.81, y: -78.62, a: 1.00, sx: 1.03, sy: 1.03, t: 633 },
        { x: 56.65, y: -78.58, a: 1.00, sx: 1.01, sy: 1.01, t: 667 },
        { x: 58.43, y: -78.08, a: 1.00, sx: 1.00, sy: 1.00, t: 700 },
        { x: 60.25, y: -77.08, a: 1.00, sx: 1.00, sy: 1.00, t: 734 },
        { x: 62.00, y: -75.65, a: 1.00, sx: 1.00, sy: 1.00, t: 767 },
        { x: 64.68, y: -72.54, a: 1.00, sx: 1.00, sy: 1.00, t: 818 },
        { x: 67.23, y: -68.51, a: 1.00, sx: 1.00, sy: 1.00, t: 867 },
        { x: 68.92, y: -65.23, a: 1.00, sx: 1.00, sy: 1.00, t: 900 },
        { x: 70.66, y: -61.37, a: 0.96, sx: 0.97, sy: 0.97, t: 934 },
        { x: 73.14, y: -54.95, a: 0.78, sx: 0.84, sy: 0.84, t: 983 },
        { x: 74.84, y: -49.90, a: 0.66, sx: 0.76, sy: 0.76, t: 1017 },
        { x: 76.48, y: -44.53, a: 0.56, sx: 0.69, sy: 0.69, t: 1051 },
        { x: 78.99, y: -35.33, a: 0.42, sx: 0.59, sy: 0.59, t: 1101 },
        { x: 81.38, y: -25.47, a: 0.30, sx: 0.51, sy: 0.51, t: 1150 },
        { x: 82.97, y: -18.25, a: 0.23, sx: 0.46, sy: 0.46, t: 1183 },
        { x: 84.59, y: -10.34, a: 0.17, sx: 0.42, sy: 0.42, t: 1217 },
        { x: 86.15, y: -2.19, a: 0.12, sx: 0.38, sy: 0.38, t: 1250 },
        { x: 87.70, y: 6.42, a: 0.08, sx: 0.36, sy: 0.36, t: 1283 },
        { x: 89.24, y: 15.48, a: 0.05, sx: 0.33, sy: 0.33, t: 1316 },
        { x: 90.07, y: 20.62, a: 0.02, sx: 0.32, sy: 0.32, t: 1350 },
        { x: 90.07, y: 20.62, a: 0.01, sx: 0.30, sy: 0.30, t: 1383 },
        { x: 90.07, y: 20.62, a: 0.00, sx: 0.30, sy: 0.30, t: 1417 }
    ];
    game.CritAttr_1 = [
        { x: 0.00, y: -3.92, a: 1.00, sx: 1.02, sy: 1.02 },
        { x: 0.00, y: -19.13, a: 1.00, sx: 1.08, sy: 1.08 },
        { x: 0.00, y: -35.08, a: 1.00, sx: 1.14, sy: 1.14 },
        { x: 0.00, y: -46.04, a: 1.00, sx: 1.18, sy: 1.18 },
        { x: 0.00, y: -49.55, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 3.43, y: -50.00, a: 0.93, sx: 1.20, sy: 1.20 },
        { x: 13.25, y: -50.00, a: 0.74, sx: 1.20, sy: 1.20 },
        { x: 21.53, y: -50.00, a: 0.57, sx: 1.20, sy: 1.20 },
        { x: 38.66, y: -50.00, a: 0.23, sx: 1.20, sy: 1.20 },
        { x: 46.41, y: -50.00, a: 0.00, sx: 1.20, sy: 1.20 }
    ];
    game.CritAttr_2 = [
        { x: 0.00, y: 0.00, a: 1.00, sx: 1.00, sy: 1.00 },
        { x: 0.00, y: -13.57, a: 1.00, sx: 1.05, sy: 1.05 },
        { x: 0.00, y: -26.46, a: 1.00, sx: 1.11, sy: 1.11 },
        { x: 0.00, y: -35.36, a: 1.00, sx: 1.14, sy: 1.14 },
        { x: 0.00, y: -43.62, a: 1.00, sx: 1.17, sy: 1.17 },
        { x: 0.00, y: -48.33, a: 1.00, sx: 1.19, sy: 1.19 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 2.07, y: -50.00, a: 0.96, sx: 1.20, sy: 1.20 },
        { x: 6.75, y: -50.00, a: 0.87, sx: 1.20, sy: 1.20 },
        { x: 13.85, y: -50.00, a: 0.72, sx: 1.20, sy: 1.20 },
        { x: 17.37, y: -50.00, a: 0.65, sx: 1.20, sy: 1.20 },
        { x: 25.04, y: -50.00, a: 0.50, sx: 1.20, sy: 1.20 },
        { x: 31.46, y: -50.00, a: 0.37, sx: 1.20, sy: 1.20 },
        { x: 36.32, y: -50.00, a: 0.27, sx: 1.20, sy: 1.20 },
        { x: 45.44, y: -50.00, a: 0.00, sx: 1.20, sy: 1.20 } //1958
    ];
    game.CritAttr_3 = [
        { x: 0.00, y: -2.75, a: 1.00, sx: 1.01, sy: 1.01 },
        { x: 0.00, y: -16.20, a: 1.00, sx: 1.06, sy: 1.06 },
        { x: 0.00, y: -29.07, a: 1.00, sx: 1.12, sy: 1.12 },
        { x: 0.00, y: -39.02, a: 1.00, sx: 1.16, sy: 1.16 },
        { x: 0.00, y: -49.98, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 0.00, y: -50.00, a: 1.00, sx: 1.20, sy: 1.20 },
        { x: 4.31, y: -50.00, a: 0.91, sx: 1.20, sy: 1.20 },
        { x: 7.32, y: -50.00, a: 0.85, sx: 1.20, sy: 1.20 },
        { x: 10.02, y: -50.00, a: 0.80, sx: 1.20, sy: 1.20 },
        { x: 12.17, y: -50.00, a: 0.76, sx: 1.20, sy: 1.20 },
        { x: 16.71, y: -50.00, a: 0.67, sx: 1.20, sy: 1.20 },
        { x: 20.53, y: -50.00, a: 0.59, sx: 1.20, sy: 1.20 },
        { x: 23.37, y: -50.00, a: 0.53, sx: 1.20, sy: 1.20 },
        { x: 26.17, y: -50.00, a: 0.48, sx: 1.20, sy: 1.20 },
        { x: 30.41, y: -50.00, a: 0.39, sx: 1.20, sy: 1.20 },
        { x: 33.43, y: -50.00, a: 0.33, sx: 1.20, sy: 1.20 },
        { x: 38.23, y: -50.00, a: 0.24, sx: 1.20, sy: 1.20 },
        { x: 47.94, y: -50.00, a: 0.00, sx: 1.20, sy: 1.20 }
    ];
    game.LeechAttr_1 = [
        { x: 0, y: -5.23, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -28.10, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -48.01, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -52.36, a: 0.92, sx: 1, sy: 1 },
        { x: 0, y: -58.60, a: 0.71, sx: 1, sy: 1 },
        { x: 0, y: -61.93, a: 0.60, sx: 1, sy: 1 },
        { x: 0, y: -65.00, a: 0.34, sx: 1, sy: 1 },
        { x: 0, y: -70.00, a: 0.04, sx: 1, sy: 1 }
    ];
    game.LeechAttr_2 = [
        { x: 0, y: -5.23, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -25.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -43.04, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -49.11, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -53.99, a: 0.87, sx: 1, sy: 1 },
        { x: 0, y: -58.65, a: 0.71, sx: 1, sy: 1 },
        { x: 0, y: -61.02, a: 0.63, sx: 1, sy: 1 },
        { x: 0, y: -63.53, a: 0.45, sx: 1, sy: 1 },
        { x: 0, y: -65.13, a: 0.26, sx: 1, sy: 1 },
        { x: 0, y: -70.00, a: 0.00, sx: 1, sy: 1 }
    ];
    game.LeechAttr_3 = [
        { x: 0, y: -3.66, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -22.70, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -48.80, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -50.84, a: 0.97, sx: 1, sy: 1 },
        { x: 0, y: -52.06, a: 0.93, sx: 1, sy: 1 },
        { x: 0, y: -53.36, a: 0.89, sx: 1, sy: 1 },
        { x: 0, y: -58.26, a: 0.72, sx: 1, sy: 1 },
        { x: 0, y: -61.27, a: 0.62, sx: 1, sy: 1 },
        { x: 0, y: -63.03, a: 0.57, sx: 1, sy: 1 },
        { x: 0, y: -65.66, a: 0.38, sx: 1, sy: 1 },
        { x: 0, y: -67.51, a: 0.22, sx: 1, sy: 1 },
        { x: 0, y: -70.00, a: 0.00, sx: 1, sy: 1 }
    ];
    game.HitAttr_1 = [
        //旧的
        // {x: 0, y: -0.02, a: 1.00, sx: 1, sy: 1},
        // {x: 0, y: -0.11, a: 1.00, sx: 1, sy: 1},
        // {x: 0, y: -2.70, a: 1.00, sx: 1, sy: 1},
        // {x: 0, y: -4.76, a: 1.00, sx: 1, sy: 1},
        // {x: 0, y: -7.12, a: 1.00, sx: 1, sy: 1},
        // {x: 0, y: -11.57, a: 1.00, sx: 1, sy: 1},
        // {x: 0, y: -16.93, a: 1.00, sx: 1, sy: 1},
        // {x: 0, y: -23.21, a: 1.00, sx: 1, sy: 1},
        // {x: 0, y: -28.00, a: 1.00, sx: 1, sy: 1},
        // {x: 0, y: -37.72, a: 1.00, sx: 1, sy: 1},
        // {x: 0, y: -55.16, a: 0.83, sx: 1, sy: 1},
        // {x: 0, y: -58.19, a: 0.73, sx: 1, sy: 1},
        // {x: 0, y: -62.52, a: 0.58, sx: 1, sy: 1},
        // {x: 0, y: -65.43, a: 0.40, sx: 1, sy: 1},
        // {x: 0, y: -70.40, a: 0.32, sx: 1, sy: 1},
        // {x: 0, y: -74.49, a: 0.18, sx: 1, sy: 1},
        // {x: 0, y: -77.64, a: 0.08, sx: 1, sy: 1},
        // {x: 0, y: -79.88, a: 0.00, sx: 1, sy: 1}
        { x: 0, y: 40.02, a: 1.00, sx: 0.5, sy: 0.5 },
        { x: 0, y: 36.11, a: 0.90, sx: 0.5, sy: 0.5 },
        { x: 0, y: 32.70, a: 0.80, sx: 0.5, sy: 0.5 },
        { x: 0, y: 28.76, a: 0.70, sx: 0.5, sy: 0.5 },
        { x: 0, y: 24.12, a: 0.60, sx: 0.5, sy: 0.5 },
        { x: 0, y: 20.57, a: 0.50, sx: 0.5, sy: 0.5 },
        { x: 0, y: 16.93, a: 0.40, sx: 0.5, sy: 0.5 },
        { x: 0, y: 10.21, a: 0.30, sx: 0.5, sy: 0.5 },
        { x: 0, y: 7.00, a: 0.15, sx: 0.5, sy: 0.5 },
        { x: 0, y: 4.72, a: 0.00, sx: 0.5, sy: 0.5 }
    ];
    game.HitAttr_2 = [
        { x: 0, y: -0.01, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -1.95, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -3.37, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -7.16, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -9.63, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -13.73, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -17.03, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -20.29, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -27.77, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -35.92, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -40.25, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -48.82, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -55.34, a: 0.82, sx: 1, sy: 1 },
        { x: 0, y: -57.67, a: 0.74, sx: 1, sy: 1 },
        { x: 0, y: -60.09, a: 0.66, sx: 1, sy: 1 },
        { x: 0, y: -63.30, a: 0.56, sx: 1, sy: 1 },
        { x: 0, y: -66.50, a: 0.45, sx: 1, sy: 1 },
        { x: 0, y: -68.44, a: 0.39, sx: 1, sy: 1 },
        { x: 0, y: -70.27, a: 0.32, sx: 1, sy: 1 },
        { x: 0, y: -73.57, a: 0.21, sx: 1, sy: 1 },
        { x: 0, y: -76.86, a: 0.10, sx: 1, sy: 1 },
        { x: 0, y: -77.81, a: 0.07, sx: 1, sy: 1 },
        { x: 0, y: -79.25, a: 0.03, sx: 1, sy: 1 },
        { x: 0, y: -79.94, a: 0.00, sx: 1, sy: 1 }
    ];
    game.HitAttr_3 = [
        { x: 0, y: -0.00, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -1.23, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -2.10, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -3.21, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -4.54, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -8.82, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -13.27, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -15.62, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -18.29, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -22.42, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -26.93, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -33.36, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -36.76, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -45.40, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -48.74, a: 1.00, sx: 1, sy: 1 },
        { x: 0, y: -51.32, a: 0.96, sx: 1, sy: 1 },
        { x: 0, y: -53.45, a: 0.89, sx: 1, sy: 1 },
        { x: 0, y: -55.44, a: 0.82, sx: 1, sy: 1 },
        { x: 0, y: -57.58, a: 0.75, sx: 1, sy: 1 },
        { x: 0, y: -59.57, a: 0.68, sx: 1, sy: 1 },
        { x: 0, y: -63.40, a: 0.55, sx: 1, sy: 1 },
        { x: 0, y: -66.13, a: 0.46, sx: 1, sy: 1 },
        { x: 0, y: -71.03, a: 0.30, sx: 1, sy: 1 },
        { x: 0, y: -72.50, a: 0.25, sx: 1, sy: 1 },
        { x: 0, y: -75.60, a: 0.15, sx: 1, sy: 1 },
        { x: 0, y: -76.62, a: 0.11, sx: 1, sy: 1 },
        { x: 0, y: -78.91, a: 0.04, sx: 1, sy: 1 },
        { x: 0, y: -79.94, a: 0.00, sx: 1, sy: 1 }
    ];
    game.ShakeCfg = [
        { x: 0.00, y: 0.00, t: 0 },
        { x: -0.50, y: -1.50, t: 16 },
        { x: -8.75, y: -26.25, t: 23 },
        { x: -6.50, y: -19.50, t: 28 },
        { x: -2.50, y: -7.50, t: 34 },
        { x: -1.75, y: 5.25, t: 40 },
        { x: -6.25, y: 18.75, t: 45 },
        { x: -9.75, y: 29.25, t: 51 },
        { x: -5.50, y: 16.50, t: 56 },
        { x: -1.50, y: 4.50, t: 62 },
        { x: 2.75, y: -8.25, t: 67 },
        { x: 6.75, y: -20.25, t: 73 },
        { x: 9.00, y: -27.00, t: 79 },
        { x: 4.75, y: -14.25, t: 84 },
        { x: 0.75, y: -2.25, t: 90 },
        { x: 3.75, y: 11.25, t: 95 },
        { x: 7.75, y: 23.25, t: 101 },
        { x: 8.00, y: 24.00, t: 106 },
        { x: 4.00, y: 12.00, t: 112 },
        { x: 0.00, y: -1.50, t: 118 },
        { x: 0.00, y: -14.25, t: 123 },
        { x: 0.00, y: -26.25, t: 129 },
        { x: 0.00, y: -21.75, t: 134 },
        { x: 0.00, y: -9.00, t: 140 },
        { x: 0.00, y: 0.00, t: 145 }
    ];
})(game || (game = {}));
var game;
(function (game) {
    game.BossShowRebirthLimit = 143009001; /**VIP BOSS 和多人BOSS在9转之前全部都显示*/
})(game || (game = {}));
var game;
(function (game) {
    game.FACE_NUM = 24; //默认表情数量
    game.VIP_FACE_NUM = 45; //Vip表情数量
    game.CHAT_LIMIT = 30; //信息数量限制
    game.CHAT_DEFAULT_NUM = 6; //快捷语数量上限
    game.ChatEmoW = [68, 96]; //聊天单个表情宽
    game.CHAT_LIMIT_LEVEL = 200; //屏蔽200级以下发言
    game.CHAT_LIMIT_VIP = 110000002; //屏蔽VIP2以下发言
    game.CHAT_PRIVATE_LIMIT = 100; //私聊信息数量限制
    game.MAIN_CHAT_LIMIT = 5; //主界面聊天信息数量限制
    game.CHAT_UNION_LIMIT = 20; //仙宗纪行数量限制
})(game || (game = {}));
var game;
(function (game) {
    game.KuafuDoufaWaitTime = 60; //战场开启等待时间：1分钟
})(game || (game = {}));
var game;
(function (game) {
    game.EnterEffectAllStep = ["config" /* CONFIG */, "anim" /* ANIM */];
})(game || (game = {}));
var game;
(function (game) {
    var Pool = base.Pool;
    var Handler = base.Handler;
    var Rectangle = egret.Rectangle;
    var delayCall = base.delayCall;
    var EffectMdrBase = /** @class */ (function (_super) {
        __extends(EffectMdrBase, _super);
        function EffectMdrBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EffectMdrBase.prototype.addListeners = function () {
            _super.prototype.addListeners.call(this);
            this.onNt("common_add_eft" /* COMMON_ADD_EFT */, this.updateAddEft, this); //特效飞动
        };
        EffectMdrBase.prototype.newView = function () {
            _super.prototype.newView.call(this);
            this._effHub = new game.UIEftHub(this.getView());
        };
        EffectMdrBase.prototype.clearFont = function (container, clearRef) {
            if (clearRef === void 0) { clearRef = true; }
            this._effHub.clearFont(container, clearRef);
        };
        /**
         * 添加字体
         * @param text 显示的文本
         * @param font 字体
         * @param container 存放字体的容器，一般为Group
         * @param horizontal 默认水平显示
         * @param scale 缩放，默认1
         * @param center 默认不居中显示
         * @param gap 字体间隔，默认0
         * @param expandParent 默认不设置container大小
         */
        EffectMdrBase.prototype.addBmpFont = function (text, font, container, horizontal, scale, center, gap, expandParent) {
            if (horizontal === void 0) { horizontal = true; }
            if (scale === void 0) { scale = 1; }
            if (center === void 0) { center = false; }
            if (gap === void 0) { gap = 0; }
            if (expandParent === void 0) { expandParent = false; }
            this._effHub.addBmpFont(text, font, container, horizontal, scale, center, gap, expandParent);
        };
        EffectMdrBase.prototype.addEft = function (src, x, y, cb, times, idx, scale, autoRemove, speed) {
            if (cb === void 0) { cb = null; }
            if (times === void 0) { times = 1; }
            if (idx === void 0) { idx = -1; }
            if (scale === void 0) { scale = 1; }
            if (autoRemove === void 0) { autoRemove = true; }
            if (speed === void 0) { speed = 1; }
            return this._effHub.add(src, x, y, cb, times, null, idx, scale, autoRemove, speed);
        };
        /**
         * 添加特效
         * @param src 特效资源，UIEftSrc
         * @param parent 存放特效的Group
         * */
        EffectMdrBase.prototype.addEftByParent = function (src, parent, x, y, idx, cb, times, scale, autoRemove, speed, isMirror, scaleXBmpOffX, rotation) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (idx === void 0) { idx = -1; }
            if (cb === void 0) { cb = null; }
            if (times === void 0) { times = 0; }
            if (scale === void 0) { scale = 1; }
            if (autoRemove === void 0) { autoRemove = true; }
            if (speed === void 0) { speed = 1; }
            if (isMirror === void 0) { isMirror = false; }
            if (scaleXBmpOffX === void 0) { scaleXBmpOffX = 0; }
            this._eftId = this._effHub.add(src, x, y, cb, times, parent, idx, scale, autoRemove, speed, isMirror, scaleXBmpOffX, rotation);
            return this._eftId;
        };
        /**
         * 添加特效
         * @param parent 存放特效的Group
         * */
        EffectMdrBase.prototype.addEftByParentScale = function (parent) {
            this.addEftByParent("chongzhi" /* ShouChongQianWang */, parent);
        };
        /**
         * 添加特效
         * @param src 特效资源，UIEftSrc
         * @param parent 存放特效的Group
         * */
        EffectMdrBase.prototype.addEftByParent2 = function (src, parent, isMirror, scaleXBmpOffX) {
            if (isMirror === void 0) { isMirror = false; }
            if (scaleXBmpOffX === void 0) { scaleXBmpOffX = 0; }
            this._eftId = this._effHub.add(src, 0, 0, null, 0, parent, -1, 1, true, 1, isMirror, scaleXBmpOffX);
            return this._eftId;
        };
        EffectMdrBase.prototype.addEftByDsp = function (src, display, idx, cb, times, scale) {
            if (idx === void 0) { idx = -1; }
            if (cb === void 0) { cb = null; }
            if (times === void 0) { times = 0; }
            if (scale === void 0) { scale = 1; }
            var rect = display.getTransformedBounds(this.getView(), Pool.alloc(Rectangle));
            var x = display.width * 0.5 + rect.x;
            var y = display.height * 0.5 + rect.y;
            Pool.release(rect);
            return this._effHub.add(src, x, y, cb, times, null, idx, scale);
        };
        EffectMdrBase.prototype.stopEffect = function (id) {
            this._effHub.stopEffect(id);
        };
        EffectMdrBase.prototype.playEffect = function (id) {
            this._effHub.playEffect(id);
        };
        EffectMdrBase.prototype.checkEffectPlaying = function (id) {
            return this._effHub.isPlaying(id);
        };
        EffectMdrBase.prototype.removeEffect = function (id) {
            if (!id) {
                return;
            }
            this._effHub.removeEffect(id);
        };
        EffectMdrBase.prototype.getEffHub = function () {
            return this._effHub;
        };
        EffectMdrBase.prototype.getEffectById = function (id) {
            return this._effHub.getEffectById(id);
        };
        //子类重写，调用setAddEft()
        EffectMdrBase.prototype.updateAddEft = function (n) {
        };
        //子类调用setAddEft()
        /**efftContainer：一般是View
         * group_eft1：按钮组件特效容器
         * dest：特效的终点*/
        EffectMdrBase.prototype.setAddEft = function (efftContainer, group_eft1, dest) {
            var self = this;
            delayCall(Handler.alloc(this, function () {
                self.addRotationEfft("richang_1" /* Richang_1 */, efftContainer, group_eft1, dest, -350, 0, -10);
            }), 200);
            self.addRotationEfft("richang_1" /* Richang_1 */, efftContainer, group_eft1, dest, -350, -20, 0);
            delayCall(Handler.alloc(this, function () {
                self.addRotationEfft("richang_1" /* Richang_1 */, efftContainer, group_eft1, dest, -350, 0, 10);
            }), 200);
        };
        EffectMdrBase.prototype.addRotationEfft = function (src, efftContainer, group_eft1, dest, anchorOffsetX, offX, offY) {
            if (anchorOffsetX === void 0) { anchorOffsetX = 0; }
            if (offX === void 0) { offX = 0; }
            if (offY === void 0) { offY = 0; }
            var pos = group_eft1.localToGlobal();
            //按钮正中心
            var pos2 = efftContainer.globalToLocal(pos.x, pos.y);
            pos2.x += offX;
            pos2.y += offY;
            //目标中心点
            var eftId = this.addEftByParent(src, efftContainer, 0, 0, -1, null, 1);
            var ani = this.getEffectById(eftId);
            var bmp = ani.bmp;
            var dis = game.PointUtil.distance(pos2.x, pos2.y, dest.x, dest.y);
            bmp.width = dis;
            ani.x = pos2.x;
            ani.y = pos2.y;
            ani.anchorOffsetX = anchorOffsetX;
            var angle = game.PointUtil.angle(pos2.x, pos2.y, dest.x, dest.y) * 180 / Math.PI;
            ani.rotation = angle;
        };
        EffectMdrBase.prototype.onHide = function () {
            this._effHub.clearAllFont();
            this._effHub.removeAllEffects();
            game.scene.SkillEftMgr.ins.resetUIEf();
            _super.prototype.onHide.call(this);
        };
        EffectMdrBase.prototype.removeAllEffects = function () {
            this._effHub.removeAllEffects();
        };
        //对外移除特效接口
        EffectMdrBase.prototype.removeEft = function () {
            if (this._eftId) {
                this.removeEffect(this._eftId);
                this._eftId = null;
            }
        };
        /**
         * 添加角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param fashion 时装
         * @param weapon 武器
         * @param wing 翅膀
         * @param sex 性别
         * @param scale 缩放，默认1.1
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param otherRole 新的模型，用于展示两个玩家，默认false
         * @param isSingle 翅膀和神兵模型区分UI显示 默认true
         */
        EffectMdrBase.prototype.updateUIRole = function (parent, fashion, weapon, wing, sex, scale, dir, act, isUi, otherRole, isSingle) {
            if (scale === void 0) { scale = 1.1; }
            if (dir === void 0) { dir = 5 /* DOWN */; }
            if (act === void 0) { act = "std" /* STAND */; }
            if (isUi === void 0) { isUi = true; }
            if (otherRole === void 0) { otherRole = false; }
            if (isSingle === void 0) { isSingle = true; }
            var body = game.ResUtil.getModelName(fashion, sex); //时装区分性别
            var weaponStr = game.ResUtil.getModelName(weapon); //神兵ui模型有两套，一套身上，一套独立显示
            var wingStr = game.ResUtil.getModelName(wing, sex, isSingle); //羽翼只有一套，取单独显示的
            this._effHub.updateUIRole(body, weaponStr, wingStr, parent, scale, dir, act, isUi, otherRole);
        };
        /**
         * 添加外显模型接口
         * @param index 外显index
         * @param parent 存放外显的容器，一般为Group
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param isWeapon 是否是武器，默认false
         * @param isGray 是否置灰，默认false
         * @param cb 动作播放完的回调
         * @param times 动作播放次数
         */
        EffectMdrBase.prototype.addAnimate = function (index, parent, dir, act, isUi, isWeapon, isGray, cb, times) {
            if (dir === void 0) { dir = 5 /* DOWN */; }
            if (act === void 0) { act = "std" /* STAND */; }
            if (isUi === void 0) { isUi = true; }
            if (isWeapon === void 0) { isWeapon = false; }
            if (isGray === void 0) { isGray = false; }
            return this._effHub.addAnimate(index, parent, dir, act, isUi, isWeapon, isGray, cb, times);
        };
        /**
         * 添加怪物模型接口
         * @param index 怪物index
         * @param parent 存放外显的容器，一般为Group
         */
        EffectMdrBase.prototype.addMonster = function (index, parent) {
            return this._effHub.addMonster(index, parent);
        };
        EffectMdrBase.prototype.addMonsterByRes = function (res, parent, dir, act) {
            if (dir === void 0) { dir = 4 /* RIGHT_DOWN */; }
            if (act === void 0) { act = "std" /* STAND */; }
            return this._effHub.addMonsterByRes(res, parent, dir, act);
        };
        /**
         * 添加自己角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param scale 缩放，默认1.1
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param isSingle 翅膀和神兵模型区分UI显示 默认true
         */
        EffectMdrBase.prototype.updateSelfUIRole = function (parent, scale, dir, act, isUi, isSingle) {
            if (scale === void 0) { scale = 1.1; }
            if (dir === void 0) { dir = 5 /* DOWN */; }
            if (act === void 0) { act = "std" /* STAND */; }
            if (isUi === void 0) { isUi = true; }
            if (isSingle === void 0) { isSingle = true; }
            var vo = game.RoleVo.ins;
            this.updateUIRole(parent, vo.fashion, vo.weapon, vo.wing, vo.sex, scale, dir, act, isUi, false, isSingle);
        };
        /**
         * 添加排行榜角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param info 通用排行榜外显
         * @param scale 缩放，默认1.1
         * @param otherRole 新的模型，用于展示两个玩家，默认false
         */
        EffectMdrBase.prototype.updateRankUIRole = function (parent, info, scale, otherRole) {
            if (scale === void 0) { scale = 1.1; }
            if (otherRole === void 0) { otherRole = false; }
            this.updateUIRole(parent, info.fashion, info.weapon, info.wing, info.sex, scale, 5 /* DOWN */, "std" /* STAND */, true, otherRole);
        };
        //额外设置 UI 属性
        EffectMdrBase.prototype.updateUIRoleAtr = function (isLoop, handler) {
            if (isLoop === void 0) { isLoop = true; }
            if (handler === void 0) { handler = null; }
            this._effHub.updateUIRoleAtr(isLoop, handler);
        };
        //播放玩家攻击动作，不需要翅膀
        EffectMdrBase.prototype.updateRoleAct = function (parent, dir, act, isLoop, handler) {
            if (dir === void 0) { dir = 5 /* DOWN */; }
            if (act === void 0) { act = "std" /* STAND */; }
            if (isLoop === void 0) { isLoop = true; }
            if (handler === void 0) { handler = null; }
            var vo = game.RoleVo.ins;
            this.updateUIRole(parent, vo.fashion, vo.weapon, null, vo.sex, 1, dir, act, false);
            this.updateUIRoleAtr(isLoop, handler);
        };
        return EffectMdrBase;
    }(game.MdrBase));
    game.EffectMdrBase = EffectMdrBase;
    __reflect(EffectMdrBase.prototype, "game.EffectMdrBase");
})(game || (game = {}));
var game;
(function (game) {
    var DisplayObjectContainer = egret.DisplayObjectContainer;
    var Pool = base.Pool;
    var Tween = base.Tween;
    var Handler = base.Handler;
    var Back = base.Back;
    var Rectangle = egret.Rectangle;
    /**
     * 神技飘字
     */
    var GodSkillEftName = /** @class */ (function (_super) {
        __extends(GodSkillEftName, _super);
        function GodSkillEftName() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GodSkillEftName.getIns = function () {
            if (!this._ins) {
                this._ins = new GodSkillEftName();
            }
            return this._ins;
        };
        GodSkillEftName.prototype.show = function (idx) {
            var _skill = Pool.alloc(GodSkillEftNameItem);
            _skill.show(idx);
        };
        return GodSkillEftName;
    }(DisplayObjectContainer));
    game.GodSkillEftName = GodSkillEftName;
    __reflect(GodSkillEftName.prototype, "game.GodSkillEftName");
    var GodSkillEftNameItem = /** @class */ (function (_super) {
        __extends(GodSkillEftNameItem, _super);
        function GodSkillEftNameItem() {
            var _this = _super.call(this) || this;
            _this.y = 263;
            _this.width = 290;
            _this.height = 172;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            _this.img_godBg = Pool.alloc(game.BitmapBase);
            _this.addChild(_this.img_godBg);
            _this.img_godName = Pool.alloc(game.BitmapBase);
            _this.img_godName.y = 86;
            _this.img_godName.anchorOffsetX = 100;
            _this.img_godName.anchorOffsetY = 64;
            _this.addChild(_this.img_godName);
            return _this;
        }
        GodSkillEftNameItem.prototype.show = function (idx) {
            this.x = (game.Layer.main.width - 372) / 2 + 187;
            game.Layer.main.addChild(this);
            this.img_godBg.source = game.ResUtil.getSkillEffectSrc("jinengdi2");
            this.img_godBg.mask = Pool.alloc(Rectangle).setTo(0, 0, 0, 255);
            this.img_godBg.alpha = 1;
            this.img_godBg.x = 0;
            Tween.get(this.img_godBg.mask)
                .to({ width: 450 }, 200);
            Tween.get(this.img_godBg)
                .delay(800)
                .to({ x: -20, alpha: 0 }, 1200);
            this.img_godName.source = game.ResUtil.getSkillEffectSrc("jineng_" + idx);
            this.img_godName.scaleX = 6;
            this.img_godName.scaleY = 6;
            this.img_godName.alpha = 0;
            this.img_godName.x = 145;
            Tween.get(this.img_godName)
                .delay(200)
                .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200, null, Back.easeOut)
                .delay(400)
                .to({ x: 245, alpha: 0 }, 1200)
                .delay(100)
                .exec(Handler.alloc(this, this.hideGSShow));
        };
        GodSkillEftNameItem.prototype.hideGSShow = function () {
            this.img_godBg.source = null;
            this.img_godName.source = null;
            Pool.release(this.img_godBg.mask);
            this.img_godBg.mask = null;
            if (this.parent) {
                this.parent.removeChild(this);
            }
            Pool.release(this);
        };
        return GodSkillEftNameItem;
    }(DisplayObjectContainer));
    game.GodSkillEftNameItem = GodSkillEftNameItem;
    __reflect(GodSkillEftNameItem.prototype, "game.GodSkillEftNameItem");
})(game || (game = {}));
var game;
(function (game) {
    game.DEFAULT_EXP = 10;
})(game || (game = {}));
var game;
(function (game) {
    game.GuideFingerName = "guide_finger"; //指引名字
    //todo,主界面的指引点击后需要手动clear下，防止策划只配置单个指引，打开界面后没有新的指引进来，导致旧指引未删除
    //todo,系统界面的指引点击后不需要手动clear，统一由任务完成状态去清除，界面onHide()的时候需要清除界面的指引
    //todo,入口刷新显示的时候，需要showGuide()一下，防止接收到任务时入口还未开启，导致没指引
    //todo,当前指引执行后，需要暂停的，pauseGuideKey传需要暂停执行的下一指引，恢复指引则当对应的界面关闭时，触发triggerGuide()
})(game || (game = {}));
var game;
(function (game) {
    game.MailRemindTime = 60;
})(game || (game = {}));
var game;
(function (game) {
    var DisplayObjectContainer = egret.DisplayObjectContainer;
    var Pool = base.Pool;
    var Tween = base.Tween;
    var Handler = base.Handler;
    var Back = base.Back;
    var Rectangle = egret.Rectangle;
    /**
     * 神技飘字(新)
     */
    var GodSkillEftNameNew = /** @class */ (function (_super) {
        __extends(GodSkillEftNameNew, _super);
        function GodSkillEftNameNew() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GodSkillEftNameNew.getIns = function () {
            if (!this._ins) {
                this._ins = new GodSkillEftNameNew();
            }
            return this._ins;
        };
        GodSkillEftNameNew.prototype.show = function (idx) {
            var _skill = Pool.alloc(GodSkillEftNameItemNew);
            _skill.show(idx);
        };
        return GodSkillEftNameNew;
    }(DisplayObjectContainer));
    game.GodSkillEftNameNew = GodSkillEftNameNew;
    __reflect(GodSkillEftNameNew.prototype, "game.GodSkillEftNameNew");
    var GodSkillEftNameItemNew = /** @class */ (function (_super) {
        __extends(GodSkillEftNameItemNew, _super);
        function GodSkillEftNameItemNew() {
            var _this = _super.call(this) || this;
            _this.y = 263;
            _this.width = 319;
            _this.height = 217;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            _this.img_godBg = Pool.alloc(game.BitmapBase);
            _this.addChild(_this.img_godBg);
            _this.img_godName = Pool.alloc(game.BitmapBase);
            _this.img_godName.y = 86;
            _this.img_godName.anchorOffsetX = 171;
            _this.img_godName.anchorOffsetY = 70;
            _this.addChild(_this.img_godName);
            return _this;
        }
        GodSkillEftNameItemNew.prototype.show = function (idx) {
            this.x = (game.Layer.main.width - 372) / 2 + 187;
            game.Layer.main.addChild(this);
            this.img_godBg.source = game.ResUtil.getSkillEffectSrc("jinengdi3");
            this.img_godBg.mask = Pool.alloc(Rectangle).setTo(0, 0, 0, 255);
            this.img_godBg.alpha = 1;
            this.img_godBg.x = 0;
            Tween.get(this.img_godBg.mask)
                .to({ width: 450 }, 200);
            Tween.get(this.img_godBg)
                .delay(800)
                .to({ x: -20, alpha: 0 }, 1200);
            this.img_godName.source = game.ResUtil.getSkillEffectSrc("jineng_" + idx);
            this.img_godName.scaleX = 6;
            this.img_godName.scaleY = 6;
            this.img_godName.alpha = 0;
            this.img_godName.x = 145;
            Tween.get(this.img_godName)
                .delay(200)
                .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200, null, Back.easeOut)
                .delay(400)
                .to({ x: 245, alpha: 0 }, 1200)
                .delay(100)
                .exec(Handler.alloc(this, this.hideGSShow));
        };
        GodSkillEftNameItemNew.prototype.hideGSShow = function () {
            this.img_godBg.source = null;
            this.img_godName.source = null;
            Pool.release(this.img_godBg.mask);
            this.img_godBg.mask = null;
            if (this.parent) {
                this.parent.removeChild(this);
            }
            Pool.release(this);
        };
        return GodSkillEftNameItemNew;
    }(DisplayObjectContainer));
    game.GodSkillEftNameItemNew = GodSkillEftNameItemNew;
    __reflect(GodSkillEftNameItemNew.prototype, "game.GodSkillEftNameItemNew");
})(game || (game = {}));
var game;
(function (game) {
    var _a, _b;
    game.HuashenZhiluCnt = 10; //化神之路10个节点
    /**墟界祭坛献祭个数*/
    game.XujieJitanSacrificeCnt = 7;
    game.TimeGoddessGongfengCnt = 4; //创世女神供奉数量
    game.HunkaPosCnt = 7; //创世女神魂卡数量
    /**墟界探索每层排数（行数）固定12*/
    game.XujieTansuoRowCnt = 12;
    game.LegionTypeAry = [1 /* Shenling */, 2 /* Huashen */, 3 /* Nvshen */];
    /**军团阵容上阵个数*/
    game.LegionTypeCnt = (_a = {},
        _a[1 /* Shenling */] = 12,
        _a[2 /* Huashen */] = 3,
        _a[3 /* Nvshen */] = 1,
        _a);
    /**军团阵容类型名称*/
    game.LegionTypeName = (_b = {},
        _b[1 /* Shenling */] = '神灵',
        _b[2 /* Huashen */] = '化神',
        _b[3 /* Nvshen */] = '女神',
        _b);
})(game || (game = {}));
var game;
(function (game) {
    var Tween = base.Tween;
    var Sine = base.Sine;
    var Handler = base.Handler;
    var ProgressBarMdr = /** @class */ (function () {
        /**
         *进度条管理
         * @param {eui.Image} img img 默认最大长度
         * @param {eui.Label} lab
         * @param {game.ProgressBarType} type
         * @param gr_eff 是否显示特效
         */
        function ProgressBarMdr(img, lab, type, gr_eff) {
            if (type === void 0) { type = 0 /* Percent */; }
            if (gr_eff === void 0) { gr_eff = null; }
            this._queue = [];
            this._state = false;
            this._img = img;
            this.gr_eff = gr_eff;
            this._width = img.width;
            this._lab = lab;
            this._type = type;
        }
        //* tweenTime: Tween时间
        ProgressBarMdr.prototype.show = function (value, max, tween, lv, tweenTime) {
            if (tween === void 0) { tween = true; }
            if (lv === void 0) { lv = 0; }
            this._tweenTime = tweenTime ? tweenTime : 200;
            if (tween) {
                this._queue.push([value, max, lv]);
                if (this._state) {
                    return;
                }
                this.showTween();
            }
            else {
                var num = value > 0 ? value / max : 0;
                if (num > 1)
                    num = 1;
                this._value = value;
                this._max = max;
                this._level = lv;
                this._img.width = this._width * num;
                if (this.gr_eff) {
                    this.gr_eff.x = this._width * num; // - 30;
                    this.gr_eff.visible = num != 0;
                }
                this.updateLab(value, max);
            }
        };
        ProgressBarMdr.prototype.hide = function () {
            this._queue.length = 0;
            this._state = false;
            this._img.width = this._width;
            Tween.remove(this._img);
            if (this.gr_eff) {
                Tween.remove(this.gr_eff);
            }
        };
        ProgressBarMdr.prototype.showTween = function () {
            var value = this._queue[0];
            var num = value[0] > 0 ? value[0] / value[1] : 0;
            if (num > 1)
                num = 1;
            this._state = true;
            var width = this._width * num;
            if (this._max == value[1] && this._level == value[2] && this._value <= value[0] && this._img.width <= width) {
                Tween.get(this._img).to({ width: width }, this._tweenTime, null, Sine.easeIn).exec(Handler.alloc(this, this.tweenNext));
                this.showEff(width);
            }
            else {
                Tween.get(this._img).to({ width: this._width }, this._tweenTime, null, Sine.easeIn).exec(Handler.alloc(this, this.tweenCallBack));
                this.showEff(this._width);
            }
        };
        ProgressBarMdr.prototype.showEff = function (width) {
            if (this.gr_eff) {
                this.gr_eff.visible = 0 != width;
                Tween.get(this.gr_eff).to({ x: width }, 200, null, Sine.easeIn);
            }
        };
        ProgressBarMdr.prototype.tweenNext = function () {
            var value = this._queue.shift();
            this.updateLab(value[0], value[1]);
            if (this._queue.length) {
                this.showTween();
            }
            else {
                this._state = false;
            }
            if (this.onceCallBack) {
                this.onceCallBack.exec();
            }
        };
        ProgressBarMdr.prototype.tweenCallBack = function () {
            var value = this._queue[0];
            if (this.finallyCallBack) {
                this.finallyCallBack.exec();
            }
            this.updateLab(this._max, this._max);
            if (value[1] != value[0]) {
                this._max = value[1];
                this._level = value[2];
                this._value = 0;
                this._img.width = 0;
                if (this.gr_eff) {
                    this.gr_eff.visible = false;
                }
                this.updateLab(this._value, this._max);
                this.showTween();
            }
            else {
                this._state = false;
            }
        };
        ProgressBarMdr.prototype.updateLab = function (value, max) {
            var self = this;
            if (!self._lab)
                return;
            if (self._type == 0 /* Percent */) {
                self._lab.text = Math.floor(value * 100 / max) + "%";
            }
            else if (self._type == 1 /* Value */) {
                self._lab.text = value + " / " + max;
            }
            else {
                self._lab.text = "";
            }
        };
        Object.defineProperty(ProgressBarMdr.prototype, "type", {
            set: function (val) {
                this._type = val;
            },
            enumerable: true,
            configurable: true
        });
        /**显示满级*/
        ProgressBarMdr.prototype.showMax = function () {
            this.hide();
            this._lab.text = game.getLanById("maxlv" /* maxlv */);
        };
        return ProgressBarMdr;
    }());
    game.ProgressBarMdr = ProgressBarMdr;
    __reflect(ProgressBarMdr.prototype, "game.ProgressBarMdr");
})(game || (game = {}));
var game;
(function (game) {
    var _a;
    game.MAX_RANK_NUM = 20; //排行榜显示前20名玩家
    game.MAX_RANK_SHOW = 21; //第21名展示奖励
    /**排行榜类型名字*/
    game.RankTypeName = (_a = {},
        _a[2001 /* Zhanli */] = "showpower" /* showpower */,
        _a[2002 /* Shenling */] = "general_tips" /* general_tips */,
        _a[2003 /* Dengji */] = "level" /* level */,
        _a[2004 /* Xiuxian */] = "xiuxian_tips" /* xiuxian_tips */,
        _a[2005 /* Zuoqi */] = "horse_tips" /* horse_tips */,
        _a[2006 /* Feijian */] = "feijian" /* feijian */,
        _a[2007 /* Yuyi */] = "wing" /* wing */,
        _a[2008 /* Shenbing */] = "weapon_tips" /* weapon_tips */,
        _a[2009 /* Shizhuang */] = "surface_tips1" /* surface_tips1 */,
        _a[2010 /* Yuanling */] = "yuanling_tips" /* yuanling_tips */,
        _a);
})(game || (game = {}));
var game;
(function (game) {
    var _a, _b, _c;
    game.QualityTypeSrName = (_a = {},
        _a[1 /* BLUE */] = "R",
        _a[2 /* PURPLE */] = "SR",
        _a[3 /* ORANGE */] = "SSR",
        _a[4 /* RED */] = "SSSR",
        _a[5 /* GOLD */] = "UR",
        _a[6 /* GREEN */] = "SP",
        _a[7 /* WHITE */] = "UTR",
        _a[8 /* BLUE_PURPLE */] = "UTR+",
        _a[9 /* COLOR */] = "EX",
        _a);
    /** SpecialQualityType 与 QualityType 映射*/
    game.SpecialQuality = (_b = {},
        _b[1 /* Huang */] = 4 /* RED */,
        _b[2 /* Xuan */] = 5 /* GOLD */,
        _b[3 /* Di */] = 6 /* GREEN */,
        _b[4 /* Tian */] = 7 /* WHITE */,
        _b);
    /**SpecialQualityType的特效资源*/
    game.SpecialQualityEftSrc = (_c = {},
        _c[1 /* Huang */] = "jinhua_1" /* Jinhua1 */,
        _c[2 /* Xuan */] = "jinhua_2" /* Jinhua2 */,
        _c[3 /* Di */] = "jinhua_3" /* Jinhua3 */,
        _c[4 /* Tian */] = "jinhua_4" /* Jinhua4 */,
        _c);
})(game || (game = {}));
var game;
(function (game) {
    var Component = eui.Component;
    var TouchEvent = egret.TouchEvent;
    var BaseLayer = /** @class */ (function (_super) {
        __extends(BaseLayer, _super);
        function BaseLayer(idx) {
            var _this = _super.call(this) || this;
            _this.width = gso.contentWidth;
            _this.height = gso.contentHeight;
            _this.idx = idx;
            _this.touchEnabled = false;
            _this.name = "Layer_" + _this.idx;
            return _this;
        }
        BaseLayer.prototype.onResize = function () {
            var stage = this.stage;
            this.x = (stage.stageWidth - this.width) / 2;
            this.y = (stage.stageHeight - this.height) / 2;
        };
        return BaseLayer;
    }(Component));
    __reflect(BaseLayer.prototype, "BaseLayer", ["game.UILayer"]);
    var MainLayer = /** @class */ (function (_super) {
        __extends(MainLayer, _super);
        function MainLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainLayer.prototype.onResize = function () {
            var stage = this.stage;
            var top = +gso.mainTop | 0;
            var bottom = +gso.mainBottom | 0;
            var left = +gso.mainLeft | 0;
            var right = +gso.mainRight | 0;
            this.width = stage.stageWidth - left - right;
            this.height = stage.stageHeight - top - bottom;
            this.x = left;
            this.y = top;
        };
        return MainLayer;
    }(BaseLayer));
    __reflect(MainLayer.prototype, "MainLayer");
    var WindowLayer = /** @class */ (function (_super) {
        __extends(WindowLayer, _super);
        function WindowLayer() {
            return _super.call(this, 3 /* window */) || this;
        }
        WindowLayer.prototype.$doAddChild = function (child, index, notifyListeners) {
            var res = _super.prototype.$doAddChild.call(this, child, index, notifyListeners);
            if (res == game.Layer.winSp) {
                return res;
            }
            this.updateModal();
            return res;
        };
        WindowLayer.prototype.$doRemoveChild = function (index, notifyListeners) {
            var res = _super.prototype.$doRemoveChild.call(this, index, notifyListeners);
            if (res == game.Layer.winSp) {
                return res;
            }
            this.updateModal();
            return res;
        };
        WindowLayer.prototype.onResize = function () {
            _super.prototype.onResize.call(this);
            this.updateModal();
        };
        WindowLayer.prototype.updateModal = function () {
            if (this.idx != 3 /* window */) {
                return;
            }
            if (this.numChildren == 0) {
                return;
            }
            var sp = game.Layer.winSp;
            var idx = this.getChildIndex(sp);
            if (idx == 0 && this.numChildren == 1) {
                this.remModal();
                return;
            }
            if (idx > -1) {
                //设置压黑的层级
                var guideFinger = this.getChildByName(game.GuideFingerName);
                var num = guideFinger ? this.numChildren - 3 : this.numChildren - 2;
                this.setChildIndex(sp, num);
                return;
            }
            this.addModal();
        };
        WindowLayer.prototype.addModal = function () {
            var sp = game.Layer.winSp;
            sp.scaleX = gso.gameStage.stageWidth / sp.width;
            sp.scaleY = gso.gameStage.stageHeight / sp.height;
            sp.x = (this.width - sp.width * sp.scaleX) / 2;
            sp.y = (this.height - sp.height * sp.scaleY) / 2;
            this.addChildAt(sp, this.numChildren - 1);
        };
        WindowLayer.prototype.remModal = function () {
            var sp = game.Layer.winSp;
            if (sp == null) {
                return;
            }
            if (!this.contains(sp)) {
                return;
            }
            this.removeChild(sp);
        };
        return WindowLayer;
    }(BaseLayer));
    __reflect(WindowLayer.prototype, "WindowLayer");
    var ModalLayer = /** @class */ (function (_super) {
        __extends(ModalLayer, _super);
        function ModalLayer() {
            return _super.call(this, 5 /* modal */) || this;
        }
        ModalLayer.prototype.$doAddChild = function (child, index, notifyListeners) {
            var res = _super.prototype.$doAddChild.call(this, child, index, notifyListeners);
            if (res == game.Layer.modalSp) {
                return res;
            }
            this.updateModal();
            return res;
        };
        ModalLayer.prototype.$doRemoveChild = function (index, notifyListeners) {
            var res = _super.prototype.$doRemoveChild.call(this, index, notifyListeners);
            if (res == game.Layer.modalSp) {
                return res;
            }
            this.updateModal();
            return res;
        };
        ModalLayer.prototype.onResize = function () {
            _super.prototype.onResize.call(this);
            this.updateModal();
        };
        ModalLayer.prototype.updateModal = function () {
            if (this.idx != 5 /* modal */) {
                return;
            }
            if (this.numChildren == 0) {
                return;
            }
            var modalSp = game.Layer.modalSp;
            var idx = this.getChildIndex(modalSp);
            if (idx == 0 && this.numChildren == 1) {
                this.remModal();
                return;
            }
            if (idx > -1) {
                //设置压黑的层级
                var guideFinger = this.getChildByName(game.GuideFingerName);
                var num = guideFinger ? this.numChildren - 3 : this.numChildren - 2;
                this.setChildIndex(modalSp, num);
                return;
            }
            this.addModal();
        };
        ModalLayer.prototype.addModal = function () {
            var modalSp = game.Layer.modalSp;
            modalSp.scaleX = gso.gameStage.stageWidth / modalSp.width;
            modalSp.scaleY = gso.gameStage.stageHeight / modalSp.height;
            modalSp.x = (this.width - modalSp.width * modalSp.scaleX) / 2;
            modalSp.y = (this.height - modalSp.height * modalSp.scaleY) / 2;
            this.addChildAt(modalSp, this.numChildren - 1);
            modalSp.addEventListener(TouchEvent.TOUCH_TAP, ModalLayer.onSpTap, ModalLayer);
        };
        ModalLayer.prototype.remModal = function () {
            var modalSp = game.Layer.modalSp;
            if (modalSp == null) {
                return;
            }
            if (!this.contains(modalSp)) {
                return;
            }
            this.removeChild(modalSp);
            modalSp.removeEventListener(TouchEvent.TOUCH_TAP, ModalLayer.onSpTap, ModalLayer);
        };
        ModalLayer.onSpTap = function (e) {
            game.Layer.onSpTap();
        };
        return ModalLayer;
    }(BaseLayer));
    __reflect(ModalLayer.prototype, "ModalLayer");
    function initMainLayer() {
        game.Layer.setLyr(new MainLayer(2 /* main */));
        game.Layer.setLyr(new WindowLayer());
        game.Layer.setLyr(new MainLayer(4 /* upperWin */));
        game.Layer.setLyr(new ModalLayer());
        game.Layer.setLyr(new BaseLayer(6 /* bossReliveTip */));
        game.Layer.setLyr(new BaseLayer(7 /* tip */));
        game.Layer.setLyr(new BaseLayer(8 /* top */));
        game.Layer.ins.onResize();
    }
    game.initMainLayer = initMainLayer;
    // export function loadWinBg(): void {
    //     let self = WindowLayer;
    //     self._imgBg.keepOnRem = true;
    //     self._imgBg.addEventListener(Event.COMPLETE, () => {
    //         resLoaded();
    //     }, self);
    //     self._imgBg.source = "assets/game_bg/bg.jpg";
    // }
})(game || (game = {}));
var game;
(function (game) {
    var DisplayObjectContainer = egret.DisplayObjectContainer;
    var TextField = egret.TextField;
    var Tween = base.Tween;
    var Pool = base.Pool;
    var TimeMgr = base.TimeMgr;
    var Sine = base.Sine;
    var Handler = base.Handler;
    var Rectangle = egret.Rectangle;
    var PromptBox = /** @class */ (function () {
        function PromptBox() {
            this._lastShowTime = 0;
            this.DURATION = 220;
            this.showItems = [];
        }
        PromptBox.getIns = function () {
            if (this._instance == null) {
                this._instance = new PromptBox();
            }
            return this._instance;
        };
        PromptBox.prototype.show = function (str) {
            if (!this._tips) {
                this._tips = [];
            }
            //正在显示，加入显示队列
            if (TimeMgr.time.serverTime - this._lastShowTime < this.DURATION) {
                this._tips.push(str);
                return;
            }
            if (this._tips.length == 0) {
                this.showTips(str);
            }
        };
        PromptBox.prototype.showLanTips = function (str) {
            var s = game.getLanById(str);
            this.show(s);
        };
        PromptBox.prototype.showTips = function (str) {
            if (this.showItems.length > 3) {
                var item = this.showItems[0];
                item.dispose();
            }
            this._lastShowTime = TimeMgr.time.serverTime;
            for (var _i = 0, _a = this.showItems; _i < _a.length; _i++) {
                var item = _a[_i];
                var h = item.height;
                Tween.get(item).to({ y: item.y - h }, 200, null, Sine.easeIn);
            }
            var boxItem = Pool.alloc(PromptBoxItem);
            PromptBox.getIns().showItems.push(boxItem);
            boxItem.show(str);
            TimeMgr.addUpdateItem(this, 100);
        };
        PromptBox.prototype.checkNext = function () {
            if (this._tips.length == 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            var tips = this._tips.shift();
            this.showTips(tips);
        };
        PromptBox.prototype.update = function (time) {
            if (time.serverTime - this._lastShowTime >= this.DURATION) {
                this.checkNext();
            }
        };
        return PromptBox;
    }());
    game.PromptBox = PromptBox;
    __reflect(PromptBox.prototype, "game.PromptBox", ["base.UpdateItem"]);
    var PromptBoxItem = /** @class */ (function (_super) {
        __extends(PromptBoxItem, _super);
        function PromptBoxItem() {
            var _this = _super.call(this) || this;
            _this.MIN_W = 376;
            _this.COLOR = ["#W", "#G", "#B", "#P", "#O", "#R"];
            _this.initUI();
            return _this;
        }
        PromptBoxItem.prototype.initUI = function () {
            var self = this;
            self.width = this.MIN_W;
            self.height = 72;
            this.touchEnabled = false;
            this.touchChildren = false;
            self._imgBg = Pool.alloc(game.BitmapBase);
            self._imgBg.source = "common_tips";
            self._imgBg.height = self.height;
            self._imgBg.scale9Grid = Pool.alloc(Rectangle).setTo(this.MIN_W * 0.5, 24, 1, 1);
            self.addChild(self._imgBg);
            self._txt = Pool.alloc(TextField);
            self._txt.textAlign = egret.HorizontalAlign.CENTER;
            self._txt.verticalAlign = egret.VerticalAlign.MIDDLE;
            self._txt.height = self.height;
            self._txt.stroke = 1;
            self._txt.size = 26;
            self._txt.y = 0;
            self._txt.x = 0;
            self.addChild(self._txt);
        };
        PromptBoxItem.prototype.isFormatColor = function (str) {
            for (var _i = 0, _a = this.COLOR; _i < _a.length; _i++) {
                var c = _a[_i];
                if (str.indexOf(c) > -1) {
                    return true;
                }
            }
            return false;
        };
        PromptBoxItem.prototype.show = function (str, layer) {
            if (layer === void 0) { layer = game.Layer.tip; }
            var self = this;
            var isFormat = this.isFormatColor(str);
            this._txt.textColor = isFormat ? 16777215 /* WHITE */ : 16711680 /* RED */;
            if (isFormat) {
                this._txt.textFlow = game.TextUtil.parseHtml(game.StringUtil.replaceColorCode(str));
            }
            else {
                this._txt.textFlow = null;
                this._txt.text = str;
            }
            self.alpha = 1;
            var tW = this._txt.textWidth + 10;
            self.width = Math.max(tW + 200, self.MIN_W);
            self._imgBg.width = self.width;
            self._txt.width = self.width;
            self.x = (layer.width - self.width) * 0.5;
            self.y = (layer.height + self.height) * 0.5;
            if (isFormat) {
                self.y = (layer.height + self.height) * 0.25;
            }
            Tween.get(self)
                .to({ y: self.y - 60, alpha: 1 }, 200, null, Sine.easeIn)
                .delay(700)
                .to({ alpha: 0 }, 200, null, Sine.easeIn)
                .exec(Handler.alloc(self, self.onTweenDone));
            layer.addChild(this);
        };
        PromptBoxItem.prototype.onTweenDone = function () {
            Pool.release(this);
        };
        PromptBoxItem.prototype.dispose = function () {
            this.onRelease();
        };
        PromptBoxItem.prototype.onAlloc = function () {
        };
        PromptBoxItem.prototype.onRelease = function () {
            Tween.remove(this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
            var items = PromptBox.getIns().showItems;
            var idx = items.indexOf(this);
            if (idx > -1) {
                game.ArrayUtil.removeAt(items, idx);
            }
        };
        return PromptBoxItem;
    }(DisplayObjectContainer));
    game.PromptBoxItem = PromptBoxItem;
    __reflect(PromptBoxItem.prototype, "game.PromptBoxItem", ["base.PoolObject", "base.DisposeObject"]);
})(game || (game = {}));
var game;
(function (game) {
    var _a;
    /**不显示玩家复活提示的场景*/
    game.NotShowRoleRevive = [129 /* KuafuDoufa */, 130 /* XianjieLuandou */];
    /**特殊场景退出提示文本*/
    game.SceneExitTips = (_a = {},
        _a[130 /* XianjieLuandou */] = "xianjieluandou_tips4" /* xianjieluandou_tips4 */,
        _a);
    game.ViewWidthLimit = 720 * 3;
    game.SceneRedFrameTime = 10; //场景，副本红色倒计时
    /**挂机地图移动类型*/
    var MapMoveType;
    (function (MapMoveType) {
        MapMoveType[MapMoveType["Null"] = 0] = "Null";
        MapMoveType[MapMoveType["Left"] = 1] = "Left";
        MapMoveType[MapMoveType["Right"] = 2] = "Right";
        MapMoveType[MapMoveType["Up"] = 3] = "Up";
        MapMoveType[MapMoveType["Down"] = 4] = "Down";
        MapMoveType[MapMoveType["LeftUp"] = 5] = "LeftUp";
        MapMoveType[MapMoveType["RightUp"] = 6] = "RightUp";
        MapMoveType[MapMoveType["LeftDown"] = 7] = "LeftDown";
        MapMoveType[MapMoveType["RightDown"] = 8] = "RightDown";
    })(MapMoveType = game.MapMoveType || (game.MapMoveType = {}));
    var SliceStatus;
    (function (SliceStatus) {
        SliceStatus[SliceStatus["Disable"] = 0] = "Disable";
        SliceStatus[SliceStatus["Enable"] = 1] = "Enable";
        SliceStatus[SliceStatus["Shelter"] = 2] = "Shelter";
        SliceStatus[SliceStatus["Jump"] = 4] = "Jump";
        SliceStatus[SliceStatus["Safety"] = 8] = "Safety";
    })(SliceStatus = game.SliceStatus || (game.SliceStatus = {}));
    game.SliceColor = {
        0: 0xFF0000,
        1: 0x00FFFF,
        2: 0xFFFF00,
        4: 0x0000FF,
        8: 0x00FF00,
    };
    game.DefaultSpeed = 120;
    game.CameraOffsetY = 193;
})(game || (game = {}));
var game;
(function (game) {
    var _a, _b, _c, _d;
    /**神灵类型数组，火水风雷*/
    game.ShenLingTypeAry = [4 /* Fire */, 3 /* Water */, 1 /* Wind */, 2 /* Mine */];
    /**神灵类型按钮，所有类型0+火水风雷*/
    game.ShenLingTypeBtnAry = [0 /* Default */, 4 /* Fire */, 3 /* Water */, 1 /* Wind */, 2 /* Mine */];
    /**神灵类型名称，风雷水火光暗*/
    game.ShenlingTypeName = (_a = {},
        _a[1 /* Wind */] = "shenling_name1" /* shenling_name1 */,
        _a[2 /* Mine */] = "shenling_name2" /* shenling_name2 */,
        _a[3 /* Water */] = "shenling_name3" /* shenling_name3 */,
        _a[4 /* Fire */] = "shenling_name4" /* shenling_name4 */,
        _a[5 /* Light */] = "shenling_name5" /* shenling_name5 */,
        _a[6 /* Dark */] = "shenling_name6" /* shenling_name6 */,
        _a);
    /**
     * 神灵 等级|攻击 属性
     */
    game.ShenLingTypeAttrKey = (_b = {},
        _b[1 /* Wind */] = ["wind_val" /* wind_val */, "wind_atk" /* wind_atk */],
        _b[2 /* Mine */] = ["mine_val" /* mine_val */, "mine_atk" /* mine_atk */],
        _b[3 /* Water */] = ["water_val" /* water_val */, "water_atk" /* water_atk */],
        _b[4 /* Fire */] = ["fire_val" /* fire_val */, "fire_atk" /* fire_atk */],
        _b);
    /**
     * 神灵合击tips展示内容
     * [读取人物属性，技能表cd字段，buff表probability字段]
     */
    game.ShenLingHeJiAttrType = (_c = {},
        _c[1 /* Wind */] = ["wind_val" /* wind_val */, 'cd', 'probability'],
        _c[2 /* Mine */] = ["mine_val" /* mine_val */, 'cd', 'probability'],
        _c[3 /* Water */] = ["water_val" /* water_val */, 'cd', 'probability'],
        _c[4 /* Fire */] = ["fire_val" /* fire_val */, 'cd', 'probability'],
        _c);
    /**
     * ShenLingHeJiAttrType 对应的 中文名
     */
    game.ShenLingHeJiAttrTypeName = (_d = {},
        _d[1 /* Wind */] = ['', '冷却时间', '风蚀概率'],
        _d[2 /* Mine */] = ['', '冷却时间', '雷驰概率'],
        _d[3 /* Water */] = ['', '冷却时间', '水浸概率'],
        _d[4 /* Fire */] = ['', '冷却时间', '火灼概率'],
        _d);
    /**神灵普攻技能展示内容*/
    game.ShenLingPuGongAttr = ['skill_coefs', 'fixdma', 'next_cd'];
    game.ShenLingPuGongAttrName = ['普攻倍率', '固定伤害', '攻击频率'];
    /**灵魄套装icon数量*/
    game.LingPoMaxCnt = 8;
    /**灵力主动技能idx*/
    game.LingliMainSkillIdx = 999;
    /**灵力货币index*/
    game.LingliPointAry = [1450000021 /* Linglipoint1 */, 1450000022 /* Linglipoint2 */, 1450000020 /* Linglipoint3 */,
        1450000019 /* Linglipoint4 */, 1450000024 /* Linglipoint5 */, 1450000023 /* Linglipoint6 */];
})(game || (game = {}));
var game;
(function (game) {
    var DisplayObjectContainer = egret.DisplayObjectContainer;
    var Pool = base.Pool;
    var Rectangle = egret.Rectangle;
    var Tween = base.Tween;
    var Handler = base.Handler;
    var Back = base.Back;
    /**
     * 技能飘字
     */
    var SkillEftName = /** @class */ (function (_super) {
        __extends(SkillEftName, _super);
        function SkillEftName() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillEftName.getIns = function () {
            if (!this._ins) {
                this._ins = new SkillEftName();
            }
            return this._ins;
        };
        SkillEftName.prototype.show = function (idx) {
            var _skill = Pool.alloc(SkillEftNameItem);
            _skill.show(idx);
        };
        return SkillEftName;
    }(DisplayObjectContainer));
    game.SkillEftName = SkillEftName;
    __reflect(SkillEftName.prototype, "game.SkillEftName");
    var SkillEftNameItem = /** @class */ (function (_super) {
        __extends(SkillEftNameItem, _super);
        function SkillEftNameItem() {
            var _this = _super.call(this) || this;
            _this.y = 300;
            _this.width = 275;
            _this.height = 140;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            _this.img_bg = Pool.alloc(game.BitmapBase);
            _this.addChild(_this.img_bg);
            _this.img_name = Pool.alloc(game.BitmapBase);
            _this.img_name.y = 70;
            _this.img_name.anchorOffsetX = 100;
            _this.img_name.anchorOffsetY = 64;
            _this.addChild(_this.img_name);
            return _this;
        }
        SkillEftNameItem.prototype.show = function (idx) {
            this.x = (game.Layer.main.width - 372) / 2 + 203;
            game.Layer.main.addChildAt(this, 3);
            if (idx == 123801000) {
                //大招
                this.img_bg.source = game.ResUtil.getSkillEffectSrc("jinengdi3");
            }
            else {
                this.img_bg.source = game.ResUtil.getSkillEffectSrc("jinengdi1");
            }
            this.img_bg.mask = Pool.alloc(Rectangle).setTo(0, 0, 0, 143);
            this.img_bg.alpha = 1;
            this.img_bg.x = 0;
            Tween.get(this.img_bg.mask)
                .to({ width: 298 }, 200);
            Tween.get(this.img_bg)
                .delay(600)
                .to({ x: -20, alpha: 0 }, 800);
            this.img_name.source = game.ResUtil.getSkillEffectSrc("jineng_" + idx);
            this.img_name.scaleX = 5;
            this.img_name.scaleY = 5;
            this.img_name.alpha = 0;
            this.img_name.x = 149;
            Tween.get(this.img_name)
                .delay(200)
                .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200, null, Back.easeOut)
                .delay(200)
                .to({ x: 169, alpha: 0 }, 800)
                .delay(300)
                .exec(Handler.alloc(this, this.hideSNShow));
        };
        SkillEftNameItem.prototype.hideSNShow = function () {
            this.img_bg.source = null;
            this.img_name.source = null;
            Pool.release(this.img_bg.mask);
            this.img_bg.mask = null;
            if (this.parent) {
                this.parent.removeChild(this);
            }
            Pool.release(this);
        };
        return SkillEftNameItem;
    }(DisplayObjectContainer));
    game.SkillEftNameItem = SkillEftNameItem;
    __reflect(SkillEftNameItem.prototype, "game.SkillEftNameItem");
})(game || (game = {}));
var game;
(function (game) {
    var _a;
    //需要特殊处理的技能类型
    game.SpecialSkillList = (_a = {},
        _a[1 /* Immortal */] = { preTime: 0, preSkillId: 0, delay: 2000 },
        _a[11 /* Xianjian */] = { preTime: 0, preSkillId: 0, delay: 2000 },
        _a);
    game.SpecialSkillList2 = {
        skillTypes: [10 /* Shenbing */, 7 /* Zuoqi */, 8 /* YuanLing */],
        preTime: 0,
        preSkillId: 0,
        delay: 2000
    };
})(game || (game = {}));
var game;
(function (game) {
    var _a;
    /**每日每周商城的类型对应pb类型*/
    game.DirectType2PbType = (_a = {},
        _a[3 /* Daily */] = 1,
        _a[4 /* Weekly */] = 2,
        _a);
})(game || (game = {}));
var game;
(function (game) {
    game.SurfacePerExp = 10; //外显单次升级10经验
    game.SurfacePerLv = 10; //外显小等级为10
})(game || (game = {}));
var game;
(function (game) {
    var DisplayObjectContainer = egret.DisplayObjectContainer;
    var TimeMgr = base.TimeMgr;
    var Pool = base.Pool;
    var Handler = base.Handler;
    var Tween = base.Tween;
    var UIAvatar = /** @class */ (function (_super) {
        __extends(UIAvatar, _super);
        function UIAvatar() {
            var _this = _super.call(this) || this;
            _this._animateTwFrame = 0;
            _this._animateCurTime = 0;
            _this.CROWN_DURATION_TIME = 8000;
            _this._nextSwitchTime = 2000;
            _this._showTime = 0;
            _this._isShowCrown = false;
            _this._isLoop = true;
            _this.touchEnabled = _this.touchChildren = false;
            _this.init();
            return _this;
        }
        UIAvatar.prototype.init = function () {
            var self = this;
            self._wing = self.addChild(Pool.alloc(game.BitmapBase));
            self._body = self.addChild(Pool.alloc(game.BitmapBase));
            self._weapon = self.addChild(Pool.alloc(game.BitmapBase));
        };
        //设置回调函数
        UIAvatar.prototype.setCtrlCompHandler = function (handler) {
            if (this._ctrl) {
                this._ctrl.compHandler = handler;
            }
        };
        //设置是否循环播放
        UIAvatar.prototype.setCtrlLoop = function (isLoop) {
            if (this._ctrl) {
                this._isLoop = isLoop;
                this._ctrl.loop = isLoop;
            }
        };
        UIAvatar.prototype.sortPart = function (dir) {
            var self = this;
            var order = game.getSortOrder(dir);
            for (var i = 0, len = order.length; i < len; i++) {
                switch (order[i]) {
                    case 405 /* Body */:
                        self.addChild(self._body);
                        break;
                    case 403 /* Weapon */:
                        self.addChild(self._weapon);
                        break;
                    case 404 /* Wing */:
                        self.addChild(self._wing);
                        if (self._animate) {
                            self.addChild(self._animate);
                        }
                        break;
                }
            }
        };
        UIAvatar.prototype.setBody = function (src) {
            var self = this;
            if (self._bodySource == src) {
                return;
            }
            self.removeBody();
            self._bodySource = src;
            if (!src) {
                return;
            }
            game.LoadMgr.ins.addRef(src);
            game.LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoaded), game.LoadPri.UI);
        };
        UIAvatar.prototype.removeBody = function () {
            var self = this;
            self._body.texture = null;
            self._body.scaleX = self._body.scaleY = 1;
            self._bodyData = undefined;
            game.LoadMgr.ins.decRef(self._bodySource);
            self._bodySource = undefined;
            if (self._ctrl) {
                self._ctrl.stop();
            }
            TimeMgr.removeUpdateItem(self);
        };
        UIAvatar.prototype.setWeapon = function (src) {
            var self = this;
            if (self._weaponSource == src) {
                return;
            }
            self.removeWeapon();
            self._weaponSource = src;
            if (!src) {
                return;
            }
            game.LoadMgr.ins.addRef(src);
            game.LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoaded), game.LoadPri.UI);
        };
        UIAvatar.prototype.isHaveWeapon = function () {
            return this._weaponSource != null;
        };
        UIAvatar.prototype.removeWeapon = function () {
            var self = this;
            self._weapon.texture = null;
            self._weapon.scaleX = self._weapon.scaleY = 1;
            self._weaponData = undefined;
            game.LoadMgr.ins.decRef(self._weaponSource);
            self._weaponSource = undefined;
        };
        UIAvatar.prototype.setWing = function (src) {
            var self = this;
            if (self._wingSrc == src) {
                return;
            }
            self.removeWing();
            self._wingSrc = src;
            game.LoadMgr.ins.addRef(src);
            game.LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoaded), game.LoadPri.UI);
        };
        UIAvatar.prototype.removeWing = function () {
            var self = this;
            self._wing.texture = null;
            self._wing.scaleX = self._wing.scaleY = 1;
            self._wingData = undefined;
            game.LoadMgr.ins.decRef(self._wingSrc);
            self._wingSrc = undefined;
        };
        UIAvatar.prototype.setAnimate = function (src, x, y, times, speed, scale) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (times === void 0) { times = 0; }
            if (speed === void 0) { speed = 1; }
            if (scale === void 0) { scale = 1; }
            if (!src) {
                this.removeAnimate();
                return;
            }
            var self = this;
            var source = game.ResUtil.getEffectUI(src);
            var idx = self.getChildIndex(self._wing);
            self._wing.y -= 220;
            if (!self._animate) {
                self._animate = self.addChildAt(Pool.alloc(game.UIAnimate), idx + 1);
            }
            var animate = self._animate;
            animate.x = x;
            animate.y = y;
            animate.times = times;
            animate.speed = speed;
            animate.scaleX = animate.scaleY = scale;
            animate.load(source);
        };
        UIAvatar.prototype.removeAnimate = function () {
            var self = this;
            if (self._animate && self._animate.parent) {
                self._animate.parent.removeChild(self._animate);
            }
            Pool.release(self._animate);
            self._animate = null;
            self._animateTwFrame = 0;
            self._animateCurTime = 0;
        };
        UIAvatar.prototype.onLoaded = function (data, url) {
            var self = this;
            switch (url) {
                case self._bodySource:
                    self._body.scaleX = self._body.scaleY = data.scale;
                    self._bodyData = data;
                    var durList = [];
                    for (var i = 0, n = data.numFrames; i < n; i++) {
                        durList.push(data.getVal(i, "dur"));
                    }
                    self._ctrl.init(durList, url, 1, this._isLoop);
                    self._ctrl.play();
                    TimeMgr.addUpdateItem(self);
                    self.onFrameChange(0);
                    break;
                case self._weaponSource:
                    self._weapon.scaleX = self._weapon.scaleY = data.scale;
                    self._weaponData = data;
                    break;
                case self._wingSrc:
                    self._wingData = data;
                    self._wing.scaleX = self._wing.scaleY = data.scale * 1.25;
                    break;
            }
        };
        UIAvatar.prototype.onFrameChange = function (frame) {
            var self = this;
            self._bodyData.drawTo(self._body, frame);
            if (self._weaponData) {
                self._weaponData.drawTo(self._weapon, frame);
                if (self.is_ui && self.sex == 1 /* Male */) {
                    self._weapon.x -= 10;
                    self._weapon.y += 15;
                }
            }
            if (self._wingData) {
                self._wingData.drawTo(self._wing, frame);
            }
        };
        UIAvatar.prototype.dispose = function () {
            this.onRelease();
        };
        UIAvatar.prototype.onAlloc = function () {
            var self = this;
            self._ctrl = Pool.alloc(game.AnimCtrl);
            self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChange);
        };
        UIAvatar.prototype.onRelease = function () {
            var self = this;
            self.removeAnimate();
            self.removeBody();
            self.removeWeapon();
            self.removeWing();
            if (self.parent) {
                self.parent.removeChild(self);
            }
            self._nextSwitchTime = 2000;
            self._showTime = 0;
            self._isShowCrown = false;
            Tween.remove(self._wing);
            self._wing.alpha = 1;
            if (self._animate) {
                self._animate.visible = true;
            }
            self.x = self.y = 0;
            Pool.release(self._ctrl);
            self._ctrl = undefined;
            self.is_ui = null;
            self.sex = null;
        };
        UIAvatar.prototype.update = function (time) {
            var self = this;
            var elapseTime = TimeMgr.getElapseTime(self);
            self._ctrl.advanceTime(elapseTime);
        };
        return UIAvatar;
    }(DisplayObjectContainer));
    game.UIAvatar = UIAvatar;
    __reflect(UIAvatar.prototype, "game.UIAvatar", ["base.PoolObject", "base.DisposeObject", "base.UpdateItem"]);
})(game || (game = {}));
var game;
(function (game) {
    var Handler = base.Handler;
    var Pool = base.Pool;
    var UIEftHub = /** @class */ (function () {
        function UIEftHub(host) {
            this._host = host;
            this._effect = {};
            this._id = 0;
            this._fontData = {};
        }
        UIEftHub.prototype.clearFont = function (container, clearRef) {
            var self = this;
            var id = container.hashCode;
            if (clearRef && self._fontData[id]) {
                var url = self._fontData[id].url;
                if (url) {
                    game.LoadMgr.ins.decRef(url);
                }
                self._fontData[id] = null;
                delete self._fontData[id];
            }
            for (var i = container.numChildren - 1; i >= 0; i--) {
                var c = container.removeChildAt(i);
                if (c instanceof game.BitmapBase) {
                    Pool.release(c);
                }
            }
        };
        /**
         * 添加字体
         * @param text 显示的文本
         * @param font 字体
         * @param container 存放字体的容器，一般为Group
         * @param horizontal 默认水平显示
         * @param scale 缩放，默认1
         * @param center 默认不居中显示
         * @param gap 字体间隔，默认0
         * @param expandParent 默认不设置container大小
         */
        UIEftHub.prototype.addBmpFont = function (text, font, container, horizontal, scale, center, gap, expandParent) {
            if (horizontal === void 0) { horizontal = true; }
            if (scale === void 0) { scale = 1; }
            if (center === void 0) { center = false; }
            if (gap === void 0) { gap = 0; }
            if (expandParent === void 0) { expandParent = false; }
            var self = this;
            var id = container.hashCode;
            var url = game.ResUtil.getFontUiUrl(font);
            var obj = self._fontData[id];
            if (!obj) {
                self._fontData[id] = obj = { container: container, text: text, font: font, url: url, horizontal: horizontal, scale: scale, center: center, gap: gap, expandParent: expandParent };
            }
            else {
                obj.text = text;
                obj.font = font;
                obj.url = url;
                obj.horizontal = horizontal;
                obj.scale = scale;
                obj.gap = gap;
                obj.expandParent = expandParent;
            }
            game.LoadMgr.ins.addRef(url);
            var data = game.LoadMgr.ins.getRes(url);
            if (data) {
                self.updateFont(obj, data);
            }
            else {
                game.LoadMgr.ins.loadMerge(url, Handler.alloc(self, self.onLoadedFont), game.LoadPri.UI);
            }
        };
        UIEftHub.prototype.onLoadedFont = function (data, url) {
            var keys = Object.keys(this._fontData);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var k = keys_1[_i];
                var obj = this._fontData[k];
                var _url = obj.url;
                if (_url != url) {
                    continue;
                }
                this.updateFont(obj, data);
            }
        };
        UIEftHub.prototype.updateFont = function (obj, data) {
            var container = obj.container;
            var text = obj.text;
            var gap = obj.gap || game.FontGap[obj.font] || 0;
            var numChildren = container.numChildren;
            var textLen = text.length;
            var bmp;
            // while (numChildren > textLen) {
            //     Pool.release(<BitmapBase>container.getChildAt(numChildren - 1));
            //     numChildren--;
            // }
            // while (numChildren < textLen) {
            //     container.addChild(Pool.alloc(BitmapBase));
            //     numChildren++;
            // }
            var disNum = numChildren - textLen;
            if (disNum != 0) {
                var disAbs = Math.abs(disNum);
                for (var i = 0; i < disAbs; i++) {
                    if (disNum < 0) {
                        //追加
                        container.addChild(Pool.alloc(game.BitmapBase));
                    }
                    else {
                        //删除
                        Pool.release(container.getChildAt(disAbs - i));
                    }
                }
            }
            var totalWidth = 0;
            var totalHeight = 0;
            var texW = 0;
            var texH = 0;
            var bmpY = 0;
            var bmpX = 0;
            if (obj.horizontal) {
                var maxHeight = container.height;
                for (var i = 0, l = text.length; i < l; ++i) {
                    bmp = container.getChildAt(i);
                    bmp.texture = text[i] == " " ? null : data.getTexture(text[i]);
                    texW = bmp.texture ? bmp.texture.textureWidth : 10;
                    texH = bmp.texture ? bmp.texture.textureHeight : 0;
                    totalWidth += texW;
                    bmp.x = bmpX;
                    bmp.width = texW;
                    bmp.height = texH;
                    bmpX += (texW + gap) * obj.scale;
                    bmp.scaleX = bmp.scaleY = obj.scale;
                    maxHeight = Math.max(texH, maxHeight);
                    if (obj.expandParent && i == l - 1) {
                        container.width = bmp.x + bmp.width * bmp.scaleX; //设置容器大小
                    }
                }
                container.height = maxHeight;
                for (var i = 0, l = container.numChildren; i < l; ++i) {
                    bmp = container.getChildAt(i);
                    bmp.y = (maxHeight - bmp.height) / 2; //居中显示
                }
            }
            else {
                var maxWidth = container.width;
                for (var i = 0, l = text.length; i < l; ++i) {
                    bmp = container.getChildAt(i);
                    bmp.texture = data.getTexture(text[i]);
                    texW = bmp.texture.textureWidth;
                    texH = bmp.texture.textureHeight;
                    totalHeight += texH;
                    bmp.y = bmpY;
                    bmpY += (texH + gap) * obj.scale;
                    bmp.scaleX = bmp.scaleY = obj.scale;
                    maxWidth = Math.max(texW, maxWidth);
                    if (obj.expandParent && i == l - 1) {
                        container.height = bmp.y + bmp.height * bmp.scaleY; //设置容器大小
                    }
                }
                container.width = maxWidth;
                for (var i = 0, l = container.numChildren; i < l; ++i) {
                    bmp = container.getChildAt(i);
                    bmp.x = (maxWidth - bmp.width) / 2; //居中显示
                }
            }
            if (obj.center) {
                var offset = (obj.horizontal ? totalWidth : totalHeight) / 2 * obj.scale;
                for (var i = 0, l = container.numChildren; i < l; ++i) {
                    bmp = container.getChildAt(i);
                    obj.horizontal ? bmp.x -= offset : bmp.y -= offset;
                }
            }
            // if (obj.expandParent) {
            //     obj.horizontal ? (obj.container.width = bmpX) : (obj.container.height = bmpY);
            // }
        };
        UIEftHub.prototype.clearAllFont = function () {
            var self = this;
            var keys = Object.keys(self._fontData);
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var k = keys_2[_i];
                self.clearFont(self._fontData[k].container, true);
            }
        };
        UIEftHub.prototype.stopEffect = function (id) {
            var e = this._effect[id];
            if (e) {
                e.animate.stop();
            }
        };
        UIEftHub.prototype.playEffect = function (id) {
            var e = this._effect[id];
            if (e) {
                e.animate.play();
            }
        };
        UIEftHub.prototype.isPlaying = function (id) {
            var e = this._effect[id];
            if (e) {
                return e.animate.playing;
            }
            return false;
        };
        UIEftHub.prototype.getEffectById = function (id) {
            var effect = this._effect[id];
            if (!effect) {
                return null;
            }
            return effect.animate;
        };
        UIEftHub.prototype.removeEffect = function (id) {
            var effect = this._effect[id];
            this._effect[id] = null;
            if (effect && effect.animate.id2) {
                this.removeEffect(effect.animate.id2);
                effect.animate.id2 = null;
            }
            delete this._effect[id];
            if (effect) {
                if (effect.animate.parent) {
                    effect.animate.parent.removeChild(effect.animate);
                }
                if (effect.cb) {
                    Pool.release(effect.cb);
                    effect.cb = null;
                }
                Pool.release(effect.animate);
            }
        };
        UIEftHub.prototype.removeAvatar = function (role) {
            if (role) {
                role.scaleX = role.scaleY = 1;
                Pool.release(role);
            }
        };
        UIEftHub.prototype.removeAllEffects = function () {
            var self = this;
            self.removeAvatar(self._uiRole);
            self._uiRole = null;
            if (this._uiRoleOther) {
                self.removeAvatar(this._uiRoleOther);
                this._uiRoleOther = null;
            }
            for (var k in self._effect) {
                self.removeEffect(k);
            }
        };
        UIEftHub.prototype.add = function (src, x, y, cb, times, parent, idx, scale, autoRemove, speed, isMirror, scaleXBmpOffX, rotation) {
            if (scale === void 0) { scale = 1; }
            if (autoRemove === void 0) { autoRemove = true; }
            if (speed === void 0) { speed = 1; }
            if (isMirror === void 0) { isMirror = false; }
            if (scaleXBmpOffX === void 0) { scaleXBmpOffX = 0; }
            if (!src) {
                return 0;
            }
            var self = this;
            var id = ++self._id;
            var animate = Pool.alloc(game.UIAnimate);
            var source = src.indexOf("assets") > -1 ? src : game.ResUtil.getEffectUI(src);
            animate.x = x;
            animate.y = y;
            animate.id = id;
            animate.times = times;
            animate.scaleX = animate.scaleY = scale;
            animate.speed = speed;
            animate.complete = Handler.alloc(self, self.onPlayComp);
            if (rotation) {
                animate.rotation = rotation;
            }
            parent = parent || self._host;
            if (idx >= 0) {
                parent.addChildAt(animate, idx);
            }
            else {
                parent.addChild(animate);
            }
            self._effect[id] = { animate: animate, cb: cb, autoRemove: autoRemove };
            var frameRate = game.UIEftSrcFrame[src] || 12;
            animate.load(source, frameRate, false, isMirror, scaleXBmpOffX);
            return id;
        };
        UIEftHub.prototype.onPlayComp = function (animate) {
            if (!animate) {
                return;
            }
            var effect = this._effect[animate.id];
            if (!effect) {
                return;
            }
            var cb = effect.cb;
            effect.cb = null;
            if (effect.autoRemove) {
                this.removeEffect(animate.id);
            }
            if (cb) {
                cb.exec();
                Pool.release(cb);
            }
        };
        /**
         * 添加外显模型接口
         * @param index 外显index
         * @param parent 存放外显的容器，一般为Group
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param isWeapon 是否是武器，默认false
         * @param isGray 是否置灰，默认false
         * @param cb 动作播放完的回调
         * @param times 动作播放次数
         */
        UIEftHub.prototype.addAnimate = function (index, parent, dir, act, isUi, isWeapon, isGray, cb, times) {
            if (dir === void 0) { dir = 5 /* DOWN */; }
            if (act === void 0) { act = "std" /* STAND */; }
            if (isUi === void 0) { isUi = true; }
            if (isWeapon === void 0) { isWeapon = false; }
            if (isGray === void 0) { isGray = false; }
            /**坐骑模型统一处理*/
            var headType = game.PropData.getPropParse(index, 1 /* Type */);
            if (headType == 360 /* Horse */) {
                dir = 4 /* RIGHT_DOWN */;
                isUi = false;
            }
            var id = ++this._id;
            var animate = Pool.alloc(game.UIAnimate);
            var data = game.ResUtil.getSurfaceData(index, dir, act, isUi, isWeapon);
            animate.id = id;
            animate.x = data.x || 0;
            animate.y = data.y || 0;
            var scale = data.scale || 1;
            animate.scaleY = scale;
            var isMir = !!game.MirDir[dir];
            if (isMir) {
                //左下，左，左上支持旋转
                scale = scale * -1;
            }
            animate.scaleX = scale;
            animate.complete = Handler.alloc(this, this.onPlayComp);
            if (times) {
                animate.times = times;
            }
            parent.addChild(animate);
            this._effect[id] = { animate: animate, cb: cb, autoRemove: true };
            animate.load(data.url);
            /**坐骑模型加载双层模型，放后面加载*/
            if (headType == 360 /* Horse */) {
                var cfg = game.getConfigByNameId("horse.json" /* Horse */, index);
                if (cfg.is_double && act != "std" /* STAND */ + 2) {
                    /**双层坐骑*/
                    animate.id2 = this.addAnimate(index, parent, dir, "std" /* STAND */ + 2, isUi);
                }
            }
            else if (headType == 409 /* Huashen */) {
                /**化神需要加载武器*/
                var cfg = game.getConfigByNameId("huashen.json" /* Huashen */, index);
                if (cfg.is_double && !isWeapon && !animate.id2) {
                    animate.id2 = this.addAnimate(index, parent, dir, act, isUi, true);
                }
            }
            if (isGray) {
                //颜色矩阵滤镜，模型置灰用
                var colorMatrix = [
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                parent.filters = [colorFlilter];
            }
            else {
                parent.filters = null;
            }
            return id;
        };
        /**
         * 添加怪物模型接口
         * @param index 怪物index
         * @param parent 存放外显的容器，一般为Group
         */
        UIEftHub.prototype.addMonster = function (index, parent, dir, act) {
            if (dir === void 0) { dir = 4 /* RIGHT_DOWN */; }
            if (act === void 0) { act = "std" /* STAND */; }
            var cfg = game.getConfigByNameId("monster1.json" /* Monster */, index);
            return this.addMonsterByRes(cfg.res_id, parent, dir, act);
        };
        UIEftHub.prototype.addMonsterByRes = function (res, parent, dir, act) {
            if (dir === void 0) { dir = 4 /* RIGHT_DOWN */; }
            if (act === void 0) { act = "std" /* STAND */; }
            var id = ++this._id;
            var animate = Pool.alloc(game.UIAnimate);
            var source = game.ResUtil.getModelUrlByModelName(9901 /* Creature */, res, dir, act);
            animate.id = id;
            animate.x = 0;
            animate.y = 0;
            var scale = 1;
            animate.scaleY = scale;
            var isMir = !!game.MirDir[dir];
            if (isMir) {
                //左下，左，左上支持旋转
                scale = scale * -1;
            }
            animate.scaleX = scale;
            parent.addChild(animate);
            this._effect[id] = { animate: animate, cb: null, autoRemove: true };
            animate.load(source);
            return id;
        };
        UIEftHub.prototype.updateAvatar = function (role, body, weapon, wing, parent, scale, dir, isMir) {
            if (!role.parent) {
                parent = parent || this._host;
                parent.addChild(role);
            }
            role.scaleY = scale;
            role.scaleX = scale * (isMir ? -1 : 1);
            role.sex = body.indexOf("female") >= 0 ? 2 /* Female */ : 1 /* Male */;
            role.is_ui = body.indexOf("ui_") >= 0;
            role.setBody(body);
            role.setWeapon(weapon);
            role.setWing(wing);
            role.sortPart(dir);
        };
        /**
         * 添加角色模型接口
         * @param body 身体
         * @param weapon 武器
         * @param wing 翅膀
         * @param parent 存放外显的容器，一般为Group
         * @param scale 缩放，默认1
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param otherRole 新的模型，用于展示两个玩家，默认false
         */
        UIEftHub.prototype.updateUIRole = function (body, weapon, wing, parent, scale, dir, act, isUi, otherRole) {
            if (scale === void 0) { scale = 1; }
            if (dir === void 0) { dir = 5 /* DOWN */; }
            if (act === void 0) { act = "std" /* STAND */; }
            if (isUi === void 0) { isUi = true; }
            if (otherRole === void 0) { otherRole = false; }
            var self = this;
            var role = otherRole ? this._uiRoleOther : self._uiRole;
            if (!body && !weapon) {
                self.removeAvatar(role);
                if (otherRole) {
                    self._uiRoleOther = null;
                }
                else {
                    self._uiRole = null;
                }
                return;
            }
            if (!role) {
                role = Pool.alloc(game.UIAvatar);
                if (otherRole) {
                    self._uiRoleOther = role;
                }
                else {
                    self._uiRole = role;
                }
            }
            var urlDir = game.MirDir[dir] ? game.MirDir[dir] : dir;
            var isMir = urlDir != dir;
            self.updateAvatar(role, game.ResUtil.getModelUrlByModelName(405 /* Body */, body, urlDir, act, isUi), game.ResUtil.getModelUrlByModelName(403 /* Weapon */, weapon, urlDir, act, isUi), game.ResUtil.getModelUrlByModelName(404 /* Wing */, wing, urlDir, act, isUi), parent, scale, dir, isMir);
        };
        //额外设置 UI 属性
        UIEftHub.prototype.updateUIRoleAtr = function (isLoop, handler) {
            if (isLoop === void 0) { isLoop = true; }
            if (handler === void 0) { handler = null; }
            var role = this._uiRole;
            if (role) {
                role.setCtrlLoop(isLoop);
                role.setCtrlCompHandler(handler);
            }
        };
        /**
         * 字体跳动
         * @param txt
         * @param container
         */
        UIEftHub.prototype.addBmpDance = function (txt, container) {
            if (!txt || !container) {
                return;
            }
            var bmpDance = new game.BmpDanceComp();
            container.addChild(bmpDance);
            bmpDance.updateDance(txt);
        };
        return UIEftHub;
    }());
    game.UIEftHub = UIEftHub;
    __reflect(UIEftHub.prototype, "game.UIEftHub");
})(game || (game = {}));
var game;
(function (game) {
    var _a;
    /**职位文本 */
    game.UnionJobStr = (_a = {},
        _a[1 /* Leader */] = "宗主",
        _a[2 /* Deputy */] = "副宗主",
        _a[3 /* Elite */] = "精英",
        _a[4 /* General */] = "成员",
        _a);
    game.UnionSelectDefault = {
        key: "0",
        value: "全部"
    };
})(game || (game = {}));
var game;
(function (game) {
    var _a, _b, _c;
    /**跳转数据*/
    game.JumpDataList = (_a = {},
        _a[1 /* Xianlu */] = {
            openIdx: 1041670084 /* Xiuxian */,
            viewDatas: ["41" /* Xianlu */, "01" /* XianluMain */],
            icon: "xiuxian_tab1"
        },
        _a[2 /* Shilian */] = {
            openIdx: 1041670107 /* Shilian */,
            viewDatas: ["49" /* Shilian */, "01" /* ShilianMain */, "01" /* Fuben */, "01" /* TabBtnType01 */],
            icon: "fuben_tab1"
        },
        _a[3 /* Fuben2 */] = {
            openIdx: 1041670108 /* Fuben2 */,
            viewDatas: ["49" /* Shilian */, "01" /* ShilianMain */, "01" /* Fuben */, "02" /* TabBtnType02 */],
            icon: "fuben_tab1"
        },
        _a[4 /* Fuben3 */] = {
            openIdx: 1041670109 /* Fuben3 */,
            viewDatas: ["49" /* Shilian */, "01" /* ShilianMain */, "01" /* Fuben */, "03" /* TabBtnType03 */],
            icon: "fuben_tab1"
        },
        _a[5 /* OfflineGain */] = {
            viewDatas: ["05" /* Main */, "10" /* OffLineGain */],
            layer: 3 /* Third */
        },
        _a[6 /* Boss */] = {
            openIdx: 1041670118 /* Boss */,
            viewDatas: ["22" /* Boss */, "01" /* BossMain */, "01" /* Many */],
            icon: "many_tab1"
        },
        _a[78 /* CrossBoss */] = {
            openIdx: 1041670119 /* CrossBoss */,
            viewDatas: ["22" /* Boss */, "01" /* BossMain */, "04" /* Cross */],
            icon: "cross_tab1"
        },
        _a[7 /* Shenling */] = {
            openIdx: 1041670102 /* Shenling */,
            viewDatas: ["45" /* Shenling */, "01" /* ShenLingMain */, "01" /* Main */],
            icon: "shenlingbiaoqiantubiao1"
        },
        _a[129 /* Shenling3 */] = {
            openIdx: 1041670102 /* Shenling */,
            viewDatas: ["45" /* Shenling */, "01" /* ShenLingMain */, "03" /* Lingqi */],
            icon: "shenqibiaoqiantubiao1"
        },
        _a[130 /* Shenling4 */] = {
            openIdx: 1041670102 /* Shenling */,
            viewDatas: ["45" /* Shenling */, "01" /* ShenLingMain */, "04" /* Lingpo */],
            icon: "lingpobiaoqiantubiao1"
        },
        _a[131 /* Shenling5 */] = {
            openIdx: 1041670102 /* Shenling */,
            viewDatas: ["45" /* Shenling */, "01" /* ShenLingMain */, "05" /* Lingli */],
            icon: "linglibiaoqiantubiao1"
        },
        _a[8 /* Pass */] = {
            openIdx: 1040190001 /* Pass */,
            viewDatas: ["42" /* Pass */, "01" /* PassMain */, "00" /* Main */],
            icon: "ui_tab_pass_1"
        },
        _a[9 /* Role */] = {
            openIdx: 1041670089 /* Role */,
            viewDatas: ["06" /* Role */, "01" /* RoleMain */],
            icon: "role_tab1"
        },
        _a[147 /* Title */] = {
            openIdx: 1041670090 /* Title */,
            viewDatas: ["06" /* Role */, "01" /* RoleMain */, "02" /* TabBtnType02 */],
            icon: "title_tab1"
        },
        _a[10 /* RoleCollect */] = {
            openIdx: 1041670134 /* RoleCollect */,
            viewDatas: ["47" /* Jiban */, "01" /* JibanMain */, "03" /* Collect */],
            icon: "zhuangbeibiaoqiantubiao1"
        },
        _a[11 /* Xianfa */] = {
            openIdx: 1041670103 /* Xianfa */,
            viewDatas: ["44" /* Xianfa */, "01" /* XianfaMain */],
            icon: "ui_tab_xianfa_1"
        },
        _a[12 /* Body */] = {
            openIdx: 1041670125 /* Body */,
            viewDatas: ["06" /* Role */, "18" /* Body */],
            icon: "huanhua_tab1"
        },
        _a[13 /* Youli */] = {
            openIdx: 1041670121 /* Youli */,
            viewDatas: ["52" /* Compete */, "02" /* YouliMain */],
            icon: "youli_tab1"
        },
        _a[14 /* Xianlu2 */] = {
            openIdx: 1041670084 /* Xiuxian */,
            viewDatas: ["41" /* Xianlu */, "01" /* XianluMain */],
            icon: "xiuxian_tab1"
        },
        _a[15 /* Lingchong */] = {
            openIdx: 1041670105 /* Lingchong */,
            viewDatas: ["46" /* Surface */, "12" /* LingChongMain */],
            icon: "lingchongtubiao1"
        },
        _a[16 /* Horse */] = {
            openIdx: 1041670104 /* Horse */,
            viewDatas: ["46" /* Surface */, "02" /* HorseMain */],
            icon: "horse_tab1"
        },
        _a[17 /* Xianta */] = {
            openIdx: 1041670114 /* Xianta */,
            viewDatas: ["49" /* Shilian */, "01" /* ShilianMain */, "03" /* Xianta */],
            icon: "xianta_tab1"
        },
        _a[18 /* Wing */] = {
            openIdx: 1041670124 /* Wing */,
            viewDatas: ["06" /* Role */, "16" /* Wing */],
            icon: "wing_tab1"
        },
        _a[19 /* Forbidden */] = {
            openIdx: 1041670113 /* Forbidden */,
            viewDatas: ["49" /* Shilian */, "01" /* ShilianMain */, "02" /* Forbidden */],
            icon: "forbidden_tab1"
        },
        _a[20 /* Xiandan */] = {
            openIdx: 1041670085 /* Xiandan */,
            viewDatas: ["41" /* Xianlu */, "01" /* XianluMain */, "02" /* Xiandan */],
            icon: "xiandan_tab1"
        },
        _a[21 /* Strength */] = {
            openIdx: 1041670094 /* Strength */,
            viewDatas: ["43" /* Enhance */, "01" /* StrengthMain */, "01" /* BtnStrength */],
            icon: "ui_tab_strength_1"
        },
        _a[22 /* Advanced */] = {
            openIdx: 1041670096 /* Advanced */,
            viewDatas: ["43" /* Enhance */, "01" /* StrengthMain */, "03" /* BtnAdvanced */],
            icon: "ui_tab_advanced_1"
        },
        _a[23 /* Gem */] = {
            openIdx: 1041670095 /* Gem */,
            viewDatas: ["43" /* Enhance */, "01" /* StrengthMain */, "02" /* BtnGem */],
            icon: "ui_tab_gem_1"
        },
        _a[24 /* SuitType1 */] = {
            openIdx: 1041670126 /* SuitType1 */,
            viewDatas: ["06" /* Role */, "06" /* SuitMain */],
            icon: "cangtianbiaoqiantubiao1"
        },
        _a[25 /* BagMelt */] = {
            openIdx: 1041670099 /* BagMelt */,
            viewDatas: ["12" /* Bag */, "01" /* BagMain */, "03" /* Melt */], icon: "melt_tab1"
        },
        _a[26 /* Yuanling */] = {
            openIdx: 1041670115 /* Yuanling */,
            viewDatas: ["49" /* Shilian */, "01" /* ShilianMain */, "04" /* YuanLing */],
            icon: "yuanlingshilian_tab1"
        },
        _a[27 /* Store */] = {
            openIdx: 1041670138 /* Store */,
            viewDatas: ["29" /* Store */, "01" /* StoreMain */, "01" /* Btn1 */],
            icon: "cangbaogetubiao1"
        },
        _a[28 /* WonderfulAct1 */] = {
            openIdx: 1041670159 /* WonderfulAct1 */,
            viewDatas: ["27" /* Activity */, "57" /* WonderfulAct */, "02" /* Btn2 */],
            icon: "xiannvsonglibiaoqiantubiao1"
        },
        _a[29 /* Summon */] = {
            openIdx: 1041670137 /* Summon */,
            viewDatas: ["27" /* Activity */, "31" /* SummonMain */],
            icon: "zhaohuanbiaoqiantubiao1"
        },
        _a[143 /* Fuchenlinghu */] = {
            openIdx: 1041670263 /* Fuchenlinghu */,
            viewDatas: ["27" /* Activity */, "31" /* SummonMain */, "03" /* Fuchenlinghu */],
            icon: "fuchenlinghubiaoqiantubiao1"
        },
        _a[144 /* Linghujingling */] = {
            openIdx: 1041670263 /* Fuchenlinghu */,
            viewDatas: ["27" /* Activity */, "112" /* FuchenlinghuXianling */],
            layer: 3 /* Third */
        },
        _a[30 /* Daily */] = {
            openIdx: 1040180001 /* Daily */,
            viewDatas: ["48" /* Daily */, "01" /* DailyMain */, "01" /* BtnLiveness */],
            icon: "ui_tab_liveness_1"
        },
        _a[31 /* Amass */] = {
            openIdx: 1041670162 /* Amass */,
            viewDatas: ["57" /* Consecrate */, "01" /* Consecrate */, "02" /* TabBtnType02 */],
            icon: "amass_tab1"
        },
        _a[32 /* Amass2 */] = {
            openIdx: 1041670163 /* Amass2 */,
            viewDatas: ["57" /* Consecrate */, "01" /* Consecrate */, "03" /* TabBtnType03 */],
            icon: "amass_tab21"
        },
        _a[33 /* Consecrate */] = {
            openIdx: 1041670161 /* Consecrate */,
            viewDatas: ["57" /* Consecrate */, "01" /* Consecrate */, "01" /* TabBtnType01 */],
            icon: "gongfengbiaoqiandubiao1"
        },
        _a[34 /* Chat */] = {
            openIdx: 1041670150 /* Chat */,
            viewDatas: ["25" /* Chat */, "01" /* ChatMain */, "01" /* Cross */],
            icon: "chat_tab1_1"
        },
        _a[35 /* SignGift */] = {
            openIdx: 1041670141 /* SignGift */,
            viewDatas: ["27" /* Activity */, "39" /* SignGift */]
        },
        _a[36 /* Union */] = {
            openIdx: 1041670154 /* Union */,
            viewDatas: ["55" /* Union */, "01" /* UnionIn */],
            icon: "xianzongliebiaobiaoqiantubiao1"
        },
        _a[37 /* Tianshen */] = {
            openIdx: 1041670106 /* Tianshen */,
            viewDatas: ["46" /* Surface */, "08" /* TianshenMain */],
            icon: "yuanling_tab1"
        },
        _a[109 /* Xianjian */] = {
            openIdx: 1041670201 /* Xianjian */,
            viewDatas: ["46" /* Surface */, "18" /* Xianjian */],
            icon: "xianjiantubiao1"
        },
        _a[38 /* RoleRing */] = {
            openIdx: 1041670146 /* RoleRing */,
            viewDatas: ["27" /* Activity */, "45" /* RoleRingMain */], icon: "rolering_tab1"
        },
        _a[39 /* Friend */] = {
            openIdx: 1041670180 /* Friend */,
            viewDatas: ["59" /* Friend */, "01" /* FriendMain */],
            icon: "friend_tab1"
        },
        _a[40 /* FirstCharge */] = {
            openIdx: 1041670143 /* FirstCharge */,
            viewDatas: ["27" /* Activity */, "49" /* FirstCharge */],
            icon: "shouchong",
            layer: 3 /* Third */
        },
        _a[41 /* Lingchi */] = {
            openIdx: 1041670086 /* Lingchi */,
            viewDatas: ["41" /* Xianlu */, "01" /* XianluMain */, "03" /* Lingchi */],
            icon: "lingchi_tab1"
        },
        _a[42 /* Yaojijiangshi */] = {
            openIdx: 1041670153 /* Yaojijiangshi */,
            viewDatas: ["27" /* Activity */, "51" /* YjjsFirstMain */],
            icon: "yaojijiangshibiaoqiantubiao1"
        },
        _a[119 /* Yaojijiangshi2 */] = {
            openIdx: 1041670153 /* Yaojijiangshi */,
            viewDatas: ["27" /* Activity */, "52" /* YjjsMain */, "02" /* Btn2 */],
            icon: "sanshiweijibiaoqiantubiao1"
        },
        _a[118 /* Yaojijiangshi3 */] = {
            openIdx: 1041670153 /* Yaojijiangshi */,
            viewDatas: ["27" /* Activity */, "52" /* YjjsMain */, "03" /* Btn3 */],
            icon: "shenqixiuxingbiaoqiantubiao1"
        },
        _a[43 /* VIP */] = { viewDatas: ["28" /* Vip */, "01" /* VipMain */], icon: "VIPbiaoqiantubiao1" },
        _a[122 /* VipPrivilege */] = { viewDatas: ["28" /* Vip */, "01" /* VipMain */, "02" /* VipPrivilege */] },
        _a[44 /* PrerogativeWrit */] = {
            openIdx: 1041670155 /* PrerogativeWrit */,
            viewDatas: ["27" /* Activity */, "45" /* RoleRingMain */, "02" /* TabBtnType02 */],
            icon: "tequanlingtubiao1"
        },
        _a[45 /* WorldMap */] = {
            openIdx: 1040660001 /* WorldMap */,
            viewDatas: ["42" /* Pass */, "01" /* PassMain */, "01" /* WorldMap */],
            icon: "ui_tab_worldmap_1"
        },
        _a[46 /* StoreXianyu */] = {
            openIdx: 1041670148 /* StoreXianyu */,
            viewDatas: ["29" /* Store */, "01" /* StoreMain */, "02" /* Btn2 */],
            icon: "xianyushangchengtubiao1"
        },
        _a[47 /* KillBoss */] = {
            openIdx: 1041670147 /* KillBoss */,
            viewDatas: ["27" /* Activity */, "50" /* KillBoss */],
            icon: "1zhuan1"
        },
        _a[48 /* PersonalBoss */] = {
            openIdx: 1041670116 /* PersonalBoss */,
            viewDatas: ["22" /* Boss */, "01" /* BossMain */, "02" /* Personal */],
            icon: "personal_tab1"
        },
        _a[139 /* Abyss */] = {
            openIdx: 1041670237 /* Abyss */,
            viewDatas: ["22" /* Boss */, "01" /* BossMain */, "05" /* Abyss */],
            icon: "zhuimoshenyuanbiaoqiantubiao1"
        },
        _a[49 /* Yijie */] = {
            openIdx: 1041670156 /* Yijie */,
            viewDatas: ["56" /* Yijie */, "01" /* YijieMain */, "01" /* Yijie */],
            icon: "yijie_tab1"
        },
        _a[50 /* YonghengYijie */] = {
            openIdx: 1041670157 /* YonghengYijie */,
            viewDatas: ["56" /* Yijie */, "01" /* YijieMain */, "02" /* YonghengYijie */],
            icon: "yonghengyijie_tab1"
        },
        _a[51 /* VipBoos */] = {
            openIdx: 1041670117 /* VipBoss */,
            viewDatas: ["22" /* Boss */, "01" /* BossMain */, "03" /* Vip */], icon: "vip_tab1"
        },
        _a[52 /* StoreDaily */] = {
            openIdx: 1041670149 /* StoreDaily */,
            viewDatas: ["29" /* Store */, "01" /* StoreMain */, "03" /* Btn3 */],
            icon: "meirishangchengtubiao1"
        },
        _a[53 /* StoreWeek */] = {
            openIdx: 1041670149 /* StoreDaily */,
            viewDatas: ["29" /* Store */, "01" /* StoreMain */, "04" /* Btn4 */],
            icon: "meizhoushangchengtubiao1"
        },
        _a[54 /* ExchangeType1 */] = {
            openIdx: 1041670164 /* ExchangeType1 */,
            viewDatas: ["27" /* Activity */, "54" /* ExchangeShop */, "0" + 2 /* Type1 */],
            icon: "shop_type21"
        },
        _a[55 /* ExchangeType2 */] = {
            openIdx: 1041670165 /* ExchangeType2 */,
            viewDatas: ["27" /* Activity */, "54" /* ExchangeShop */, "0" + 3 /* Type2 */],
            icon: "shop_type31"
        },
        _a[56 /* ExchangeType3 */] = {
            openIdx: 1041670166 /* ExchangeType3 */,
            viewDatas: ["27" /* Activity */, "54" /* ExchangeShop */, "0" + 4 /* Type3 */],
            icon: "shop_type41"
        },
        _a[57 /* ExchangeType4 */] = {
            openIdx: 1041670167 /* ExchangeType4 */,
            viewDatas: ["27" /* Activity */, "54" /* ExchangeShop */, "0" + 5 /* Type4 */],
            icon: "shop_type51"
        },
        _a[58 /* ExchangeType5 */] = {
            openIdx: 1041670168 /* ExchangeType5 */,
            viewDatas: ["27" /* Activity */, "54" /* ExchangeShop */, "0" + 10 /* Type5 */],
            icon: "shop_type101"
        },
        _a[59 /* ExchangeType6 */] = {
            openIdx: 1041670169 /* ExchangeType6 */,
            viewDatas: ["27" /* Activity */, "54" /* ExchangeShop */, "0" + 6 /* Type6 */],
            icon: "shop_type61"
        },
        _a[60 /* ExchangeType7 */] = {
            openIdx: 1041670170 /* ExchangeType7 */,
            viewDatas: ["27" /* Activity */, "54" /* ExchangeShop */, "0" + 7 /* Type7 */],
            icon: "shop_type71"
        },
        _a[61 /* ExchangeType8 */] = {
            openIdx: 1041670171 /* ExchangeType8 */,
            viewDatas: ["27" /* Activity */, "54" /* ExchangeShop */, "0" + 8 /* Type8 */],
            icon: "shop_type81"
        },
        _a[62 /* ExchangeType9 */] = {
            openIdx: 1041670172 /* ExchangeType9 */,
            viewDatas: ["27" /* Activity */, "54" /* ExchangeShop */, "0" + 9 /* Type9 */],
            icon: "shop_type91"
        },
        _a[63 /* Zhaocaixian */] = {
            openIdx: 1041670144 /* Zhaocaixian */,
            viewDatas: ["27" /* Activity */, "42" /* ZcxMain */],
            icon: "xingyunshuzibiaoqiantubiao1"
        },
        _a[64 /* Chuangguanling */] = {
            openIdx: 1041670142 /* Giving */,
            viewDatas: ["27" /* Activity */, "38" /* Giving */, "01" /* TabBtnType01 */],
            icon: "tab_1_giving1"
        },
        _a[65 /* Huoyueling */] = {
            openIdx: 1041670142 /* Giving */,
            viewDatas: ["27" /* Activity */, "38" /* Giving */, "02" /* TabBtnType02 */],
            icon: "tab_2_giving1"
        },
        _a[72 /* Xiuxianling */] = {
            openIdx: 1041670142 /* Giving */,
            viewDatas: ["27" /* Activity */, "38" /* Giving */, "04" /* TabBtnType04 */],
            icon: "tab_4_giving1"
        },
        _a[66 /* ZeroBuy */] = {
            openIdx: 1041670145 /* ZeroBuy */,
            viewDatas: ["27" /* Activity */, "48" /* ZeroBuy */],
            layer: 3 /* Third */
        },
        _a[67 /* Doufa */] = {
            openIdx: 1041670122 /* Doufa */,
            viewDatas: ["52" /* Compete */, "19" /* DoufaMain */], icon: "doufa_tab1"
        },
        _a[68 /* Weapon */] = {
            openIdx: 1041670123 /* Weapon */,
            viewDatas: ["06" /* Role */, "17" /* Weapon */],
            icon: "weapon_tab1"
        },
        _a[69 /* PunshList */] = {
            openIdx: 1041670203 /* PunshList */,
            viewDatas: ["27" /* Activity */, "78" /* PunshList */, "02" /* TabBtnType02 */],
            icon: "chongbangtehui1"
        },
        _a[70 /* PrerogativeWrit2 */] = {
            openIdx: 1041670155 /* PrerogativeWrit */,
            viewDatas: ["27" /* Activity */, "45" /* RoleRingMain */, "02" /* TabBtnType02 */, "01" /* TabBtnType01 */],
            icon: "tequanlingtubiao1"
        },
        _a[71 /* PrerogativeWrit3 */] = {
            openIdx: 1041670155 /* PrerogativeWrit */,
            viewDatas: ["27" /* Activity */, "45" /* RoleRingMain */, "02" /* TabBtnType02 */, "02" /* TabBtnType02 */],
            icon: "tequanlingtubiao1"
        },
        _a[73 /* BagDel */] = {
            openIdx: 1041670101 /* BagDel */,
            viewDatas: ["12" /* Bag */, "01" /* BagMain */, "05" /* Del */], icon: "del_tab1"
        },
        _a[74 /* Xianlv */] = {
            openIdx: 1041670173 /* Xianlv */,
            viewDatas: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */],
            icon: "xianlvbiaoqiantubiao1"
        },
        _a[75 /* XianlvRenwu */] = {
            openIdx: 1041670176 /* XianlvRenwu */,
            viewDatas: ["58" /* Xianyuan */, "01" /* Xianlv */, "02" /* Renwu */],
            icon: "renwubiaoqiantubiao1"
        },
        _a[76 /* XianlvShilian */] = {
            openIdx: 1041670177 /* XianlvShilian */,
            viewDatas: ["58" /* Xianyuan */, "01" /* Xianlv */, "03" /* Shilian */],
            icon: "shilianbiaoqiantubiao1"
        },
        _a[77 /* XianlvChild */] = {
            openIdx: 1041670174 /* XianlvChild */,
            viewDatas: ["58" /* Xianyuan */, "09" /* ChildMain */],
            icon: "gongxiangbiaoqiantubiao1"
        },
        _a[79 /* HorseGitf */] = {
            openIdx: 1041670104 /* Horse */,
            viewDatas: ["46" /* Surface */, "05" /* SurfaceGiftMain */, 360 /* Horse */ + ''],
            icon: "horse_tab1"
        },
        _a[80 /* TianshenGift */] = {
            openIdx: 1041670106 /* Tianshen */,
            viewDatas: ["46" /* Surface */, "05" /* SurfaceGiftMain */, 640 /* Tianshen */ + ''],
            icon: "yuanling_tab1"
        },
        _a[81 /* WingGift */] = {
            openIdx: 1041670124 /* Wing */,
            viewDatas: ["46" /* Surface */, "05" /* SurfaceGiftMain */, 404 /* Wing */ + ''],
            icon: "wing_tab1"
        },
        _a[82 /* WeaponGift */] = {
            openIdx: 1041670123 /* Weapon */,
            viewDatas: ["46" /* Surface */, "05" /* SurfaceGiftMain */, 403 /* Weapon */ + ''],
            icon: "weapon_tab1"
        },
        _a[83 /* XianlvRing */] = {
            openIdx: 1041670175 /* XianlvRing */,
            viewDatas: ["53" /* Gift */, "01" /* Main */, 7 /* Ring */ + ""]
        },
        _a[84 /* HuangGuForbidden */] = {
            openIdx: 1041670113 /* Forbidden */,
            viewDatas: ["49" /* Shilian */, "01" /* ShilianMain */, "02" /* Forbidden */, 2 /* Type2 */ + ""],
            icon: "forbidden_tab1"
        },
        _a[85 /* XianLingForbidden */] = {
            openIdx: 1041670113 /* Forbidden */,
            viewDatas: ["49" /* Shilian */, "01" /* ShilianMain */, "02" /* Forbidden */, 3 /* Type3 */ + ""],
            icon: "forbidden_tab1"
        },
        _a[86 /* TianZhiForbidden */] = {
            openIdx: 1041670113 /* Forbidden */,
            viewDatas: ["49" /* Shilian */, "01" /* ShilianMain */, "02" /* Forbidden */, 4 /* Type4 */ + ""],
            icon: "forbidden_tab1"
        },
        _a[87 /* Xianta2 */] = {
            openIdx: 1041670207 /* Xianta2 */,
            viewDatas: ["49" /* Shilian */, "01" /* ShilianMain */, "03" /* Xianta */, "02" /* TabBtnType02 */],
            icon: "xianta_tab1"
        },
        _a[88 /* UnionJuanXian */] = {
            openIdx: 1041670154 /* Union */,
            viewDatas: ["55" /* Union */, "05" /* UnionDonate */],
            layer: 2 /* SecondPop */
        },
        _a[127 /* UnionWage */] = {
            openIdx: 1041670154 /* Union */,
            viewDatas: ["55" /* Union */, "06" /* UnionWage */],
            layer: 2 /* SecondPop */
        },
        _a[89 /* XianMengTianTan */] = {
            openIdx: 1041670154 /* Union */,
            viewDatas: ["55" /* Union */, "09" /* UnionLottery */, "01" /* TabBtnType01 */],
            icon: "xianmentiantanbiaoqiantubiao1"
        },
        _a[121 /* UnionTreasure */] = {
            openIdx: 1041670154 /* Union */,
            viewDatas: ["55" /* Union */, "14" /* UnionTreasure */],
            icon: "xianzongyibao1"
        },
        _a[123 /* UnionStorage */] = {
            openIdx: 1041670154 /* Union */,
            viewDatas: ["55" /* Union */, "22" /* UnionStorage */],
            icon: "xianzongcangkubiaoqiantubiao1"
        },
        _a[124 /* UnionHeroShop */] = {
            openIdx: 1041670154 /* Union */,
            viewDatas: ["55" /* Union */, "10" /* UnionHeroShop */],
            icon: "xianzinmibaobiaoqiantubiao1"
        },
        _a[125 /* UnionBeast */] = {
            openIdx: 1041670154 /* Union */,
            viewDatas: ["55" /* Union */, "26" /* UnionBeast */],
            icon: "xianshouzhufubiaoqiantubiao1"
        },
        _a[126 /* UnionBook */] = {
            openIdx: 1041670154 /* Union */,
            viewDatas: ["55" /* Union */, "25" /* UnionBook */],
            icon: "diyicengbiaoqiantubiao1"
        },
        _a[90 /* XianMengShengTan */] = {
            openIdx: 1041670154 /* Union */,
            viewDatas: ["55" /* Union */, "09" /* UnionLottery */, "02" /* TabBtnType02 */],
            icon: "xianmenshengtanbiaoqiantubiao1"
        },
        _a[91 /* RoleRing2 */] = {
            openIdx: 1041670146 /* RoleRing */,
            viewDatas: ["27" /* Activity */, "45" /* RoleRingMain */, "01" /* BtnMonth */, "02" /* TabBtnType02 */],
            icon: "rolering_tab1"
        },
        _a[92 /* RoleRing3 */] = {
            openIdx: 1041670146 /* RoleRing */,
            viewDatas: ["27" /* Activity */, "45" /* RoleRingMain */, "01" /* BtnMonth */, "03" /* TabBtnType03 */],
            icon: "rolering_tab1"
        },
        _a[93 /* Bossgift */] = {
            openIdx: 1041670118 /* Boss */,
            viewDatas: ["50" /* Pay */, "01" /* Gift */, 100013 /* Id100013 */ + ""],
            layer: 3 /* Third */
        },
        _a[94 /* Yijiegift */] = {
            openIdx: 1041670156 /* Yijie */,
            viewDatas: ["50" /* Pay */, "01" /* Gift */, 100014 /* Id100014 */ + ""],
            layer: 3 /* Third */
        },
        _a[95 /* Shiliangift */] = {
            openIdx: 1041670107 /* Shilian */,
            viewDatas: ["50" /* Pay */, "01" /* Gift */, 100010 /* Id100010 */ + ""],
            layer: 3 /* Third */
        },
        _a[96 /* Fuben2gift */] = {
            openIdx: 1041670108 /* Fuben2 */,
            viewDatas: ["50" /* Pay */, "01" /* Gift */, 100011 /* Id100011 */ + ""],
            layer: 3 /* Third */
        },
        _a[97 /* Fuben3gift */] = {
            openIdx: 1041670109 /* Fuben3 */,
            viewDatas: ["50" /* Pay */, "01" /* Gift */, 100012 /* Id100012 */ + ""],
            layer: 3 /* Third */
        },
        _a[98 /* Fuben4gift */] = {
            openIdx: 1041670115 /* Yuanling */,
            viewDatas: ["53" /* Gift */, "01" /* Main */, 1 /* Yuanling */ + ''],
            icon: "mubiaofanlibiaoqiantubiao1"
        },
        _a[99 /* Youligift */] = {
            openIdx: 1041670121 /* Youli */,
            viewDatas: ["52" /* Compete */, "03" /* YouliAwardMain */],
            icon: "youli_award_tab1"
        },
        _a[100 /* XianYuanGift */] = {
            openIdx: 1041670179 /* XianlvGift */,
            viewDatas: ["27" /* Activity */, "60" /* XianlvGift */],
            layer: 3 /* Third */
        },
        _a[101 /* Tiandilu */] = {
            openIdx: 1041670200 /* Tiandilu */,
            viewDatas: ["60" /* God */, "01" /* GodMain */, "02" /* TabBtnType02 */],
            icon: "tiandilubiaoqiantubiao1"
        },
        _a[102 /* Tiandiluxuanyuan */] = {
            openIdx: 1041670200 /* Tiandilu */,
            viewDatas: ["60" /* God */, "04" /* GodTreasure */],
            icon: "xuanyuandikubiaoqiantubiao1"
        },
        _a[103 /* SupremeGit */] = {
            openIdx: 1041670194 /* SupremeGit */,
            viewDatas: ["27" /* Activity */, "71" /* SupremeGitMain */],
            icon: "zhizun_tab1"
        },
        _a[104 /* Shenlingjiban */] = {
            openIdx: 1041670102 /* Shenling */,
            viewDatas: ["47" /* Jiban */, "01" /* JibanMain */, "02" /* ShenLing */],
            icon: "shenlingbiaoqiantubiao1"
        },
        _a[105 /* Huashen */] = {
            openIdx: 1041670202 /* Huashen */,
            viewDatas: ["61" /* More */, "02" /* HuashenMain */],
            icon: "huashen_tab1"
        },
        _a[106 /* Huashenzhilu */] = {
            openIdx: 1041670202 /* Huashen */,
            viewDatas: ["61" /* More */, "09" /* HuashenZhilu */], layer: 2 /* SecondPop */
        },
        _a[107 /* Achieve */] = {
            openIdx: 1041670198 /* Achieve */,
            viewDatas: ["61" /* More */, "01" /* AchieveMain */, "01" /* Achieve */],
            icon: "achieve_tab1"
        },
        _a[108 /* Lottery */] = {
            openIdx: 1041670136 /* Lottery */,
            viewDatas: ["27" /* Activity */, "30" /* Lottery */],
            icon: "icon_lottery1"
        },
        _a[110 /* UnionKill */] = {
            openIdx: 1041670154 /* Union */,
            viewDatas: ["55" /* Union */, "18" /* UnionKill */],
            icon: "zhanyaotai1"
        },
        _a[111 /* Zhandui */] = {
            openIdx: 1041670222 /* Zhandui */,
            viewDatas: ["61" /* More */, "11" /* ZhanduiBuildMain */],
            icon: "xiuxian_tab1"
        },
        _a[112 /* Zhandui1 */] = {
            openIdx: 1041670222 /* Zhandui */,
            viewDatas: ["61" /* More */, "13" /* ZhanduiJoin */],
            layer: 2 /* SecondPop */
        },
        _a[113 /* HorseStar */] = {
            openIdx: 1041670104 /* Horse */,
            viewDatas: ["46" /* Surface */, "02" /* HorseMain */, "02" /* HorseStar */],
            icon: "huanhua_tab1"
        },
        _a[114 /* TianshenStar */] = {
            openIdx: 1041670106 /* Tianshen */,
            viewDatas: ["46" /* Surface */, "08" /* TianshenMain */, "02" /* TianshenStar */],
            icon: "huanhua_tab1"
        },
        _a[115 /* WingStar */] = {
            openIdx: 1041670124 /* Wing */,
            viewDatas: ["06" /* Role */, "16" /* Wing */, "02" /* WingStar */],
            icon: "huanhua_tab1"
        },
        _a[116 /* WeaponStar */] = {
            openIdx: 1041670123 /* Weapon */,
            viewDatas: ["06" /* Role */, "17" /* Weapon */, "02" /* WeaponStar */],
            icon: "huanhua_tab1"
        },
        _a[117 /* HuashenStar */] = {
            openIdx: 1041670202 /* Huashen */,
            viewDatas: ["61" /* More */, "02" /* HuashenMain */, "02" /* HuashenStar */],
            icon: "huashen_task_tab1"
        },
        _a[140 /* Sea1 */] = {
            openIdx: 1041670245 /* Sea1 */,
            viewDatas: ["56" /* Yijie */, "25" /* SeaBossMain */, "01" /* Sea1 */],
            layer: 1 /* Main */,
            icon: "sea_boss_tab3_1"
        },
        _a[141 /* Sea2 */] = {
            openIdx: 1041670246 /* Sea2 */,
            viewDatas: ["56" /* Yijie */, "25" /* SeaBossMain */, "02" /* Sea2 */],
            layer: 1 /* Main */,
            icon: "sea_boss_tab3_1"
        },
        _a[142 /* Sea3 */] = {
            openIdx: 1041670247 /* Sea3 */,
            viewDatas: ["56" /* Yijie */, "25" /* SeaBossMain */, "03" /* Sea3 */],
            layer: 1 /* Main */,
            icon: "sea_boss_tab3_1"
        },
        _a[120 /* XujieJitan */] = {
            openIdx: 1041670226 /* XujieJitan */,
            viewDatas: ["61" /* More */, "20" /* XujieJitanMain */, "01" /* Btn1 */],
            icon: "xujiejitanbiaoqiantubiao1"
        },
        _a[132 /* XujieTansuo */] = {
            openIdx: 1041670223 /* XujieTansuo */,
            viewDatas: ["61" /* More */, "51" /* XujieTansuoMain */, "01" /* Btn1 */],
            icon: "xujietansuo_tab1"
        },
        _a[133 /* XujieKuangmai */] = {
            openIdx: 1041670224 /* XujieKuangmai */,
            viewDatas: ["61" /* More */, "40" /* MiningMain */, "02" /* TabBtnType02 */],
            icon: "shengxubiaoqiantubiao1"
        },
        _a[128 /* KuafuDoufa */] = {
            openIdx: 1041670251 /* KuafuDoufa */,
            viewDatas: ["52" /* Compete */, "19" /* DoufaMain */, "03" /* KuafuDoufa */],
            icon: "kuafu_doufa_tab1"
        },
        _a[134 /* Xiandi */] = {
            openIdx: 1041670242 /* Xiandi */,
            viewDatas: ["61" /* More */, "120" /* Xiandi */],
            icon: "xiandi_huanggutiangong1"
        },
        _a[135 /* XianmaiZhengduo */] = {
            openIdx: 1041670243 /* XianmaiZhengduo */,
            viewDatas: ["61" /* More */, "100" /* XianmaiMain */],
            icon: "XianmaiMain"
        },
        _a[136 /* ZuoqiGift */] = {
            openIdx: 1041670104 /* Horse */,
            viewDatas: ["46" /* Surface */, "05" /* SurfaceGiftMain */, 360 /* Horse */ + ''],
            icon: 'horse_tab1'
        },
        _a[137 /* Qiyuan */] = {
            openIdx: 1041670087 /* Qiyuan */,
            viewDatas: ["42" /* Pass */, "01" /* PassMain */, "02" /* Qiyuan */],
            icon: 'ui_tab_qiyuan_1'
        },
        _a[138 /* XianLvJinJie */] = {
            openIdx: 1041670261 /* XianLvJinJie */,
            viewDatas: ["53" /* Gift */, "01" /* Main */, 8 /* XianLvJinJie */ + ""]
        },
        _a[145 /* Huanjing */] = {
            openIdx: 1041670248 /* Huanjing */,
            viewDatas: ["61" /* More */, "140" /* HuanjingMain */],
            icon: 'huanjingbiaoqiantubiao1'
        },
        _a[146 /* Huanggu */] = {
            openIdx: 1041670232 /* Huanggu */,
            viewDatas: ["61" /* More */, "121" /* XiandiShow */],
            icon: 'xiandi_huanggutiangong1'
        },
        _a[148 /* Goddess */] = {
            openIdx: 1041670233 /* Goddess */,
            viewDatas: ["61" /* More */, "31" /* GoddessMain */],
            icon: 'goddess_tab1'
        },
        _a[149 /* GoddessRecord */] = {
            openIdx: 1041670239 /* GoddessRecord */,
            viewDatas: ["61" /* More */, "71" /* TimeGoddessMain */],
            icon: 'timeGoddess_tab1'
        },
        _a);
    /**飞升榜进阶丹映射跳转ID,todo*/
    game.FlyPropToJumpIdx = (_b = {},
        _b[1450100042 /* Zuoqijinjiedan */] = 16 /* Horse */,
        _b[1450100106 /* Yuyijinjiedan */] = 18 /* Wing */,
        _b[1450100105 /* Shenbinjiedan */] = 68 /* Weapon */,
        _b[1450100064 /* Yuanlingjinjiedan */] = 37 /* Tianshen */,
        _b[1450100140 /* Xianjianjinjiedan */] = 109 /* Xianjian */ //仙剑初级锻炼石
    ,
        _b);
    /**外显炼神丹映射跳转ID,todo*/
    game.LianshendanToJumpIdx = (_c = {},
        _c[1 /* Horse */] = 113 /* HorseStar */,
        _c[2 /* Tianshen */] = 114 /* TianshenStar */,
        _c[3 /* Wing */] = 115 /* WingStar */,
        _c[4 /* Weapon */] = 116 /* WeaponStar */,
        _c[5 /* Body */] = 12 /* Body */,
        _c[6 /* Huashen */] = 117 /* HuashenStar */,
        _c);
})(game || (game = {}));
var game;
(function (game) {
    game.XianfaSkillNum = 6; //仙法技能位置
})(game || (game = {}));
var game;
(function (game) {
    game.LingmaiMaxLv = 10; //灵脉每一重固定10级
    game.RebirthMaxLv = 10; //＞10转需要转换成仙人x转
})(game || (game = {}));
var game;
(function (game) {
    /**子女神兵灵翼名称*/
    game.XianlvSurfaceName = ['', '神兵', '灵翼'];
})(game || (game = {}));
var game;
(function (game) {
    var _a, _b, _c, _d, _e;
    game.YijieBossNum = 5; //异界boss数量
    /**幻境之海类型数组*/
    game.SeaTypeAry = [1 /* Sea1 */, 2 /* Sea2 */, 3 /* Sea3 */];
    game.SeaTypeToTaskType = (_a = {},
        _a[1 /* Sea1 */] = 50 /* Sea1 */,
        _a[2 /* Sea2 */] = 51 /* Sea2 */,
        _a[3 /* Sea3 */] = 52 /* Sea3 */,
        _a);
    game.SeaTypeToRoleKey = (_b = {},
        _b[1 /* Sea1 */] = "xjzh_nl" /* xjzh_nl */,
        _b[2 /* Sea2 */] = "sjzh_nl" /* sjzh_nl */,
        _b[3 /* Sea3 */] = "sgjzh_nl" /* sgjzh_nl */ //圣界之海能量
    ,
        _b);
    game.SeaBossPosNum = 5; //位置数量
    game.SeaShenlingNum = 4; //神灵数量
    //神灵四个部位对应的攻击特效，todo
    game.SeaShenlingEft = (_c = {},
        _c[0] = "sn_11_2",
        _c[1] = "sn_11_2",
        _c[2] = "sn_11_2",
        _c[3] = "sn_11_2",
        _c);
    game.SeaShenlingEftRotation = (_d = {},
        _d[0] = -45,
        _d[1] = -60,
        _d[2] = -120,
        _d[3] = -135,
        _d);
    game.SeaShenlingDir = (_e = {},
        _e[0] = 2 /* RIGHT_UP */,
        _e[1] = 2 /* RIGHT_UP */,
        _e[2] = 8 /* LEFT_UP */,
        _e[3] = 8 /* LEFT_UP */,
        _e);
})(game || (game = {}));
var game;
(function (game) {
    /**兽骨分类数组*/
    game.YishouShouguPosAry = [
        0 /* Shouya */, 1 /* Shouhe */, 2 /* Shouke */,
        3 /* Shoulin */, 4 /* Shouyi */, 5 /* ShouZhua */,
        6 /* Shouci */, 7 /* Shouwei */
    ];
    /**异兽类型对应数组*/
    game.YishouTypeAry = [
        1 /* Type1 */, 2 /* Type2 */, 3 /* Type3 */,
        4 /* Type4 */, 5 /* Type5 */
    ];
    /**异兽背包icon数量*/
    game.YishouBagCnt = 100;
    /**合成材料icon数量*/
    game.YishouComposeIconCnt = 3;
})(game || (game = {}));
var game;
(function (game) {
    var Handler = base.Handler;
    var Pool = base.Pool;
    var delayCall = base.delayCall;
    var InitAnim = /** @class */ (function () {
        function InitAnim() {
        }
        InitAnim.getNum = function (handler) {
            var self = this;
            if (gso.configList) {
                handler.exec(0);
                Pool.release(handler);
                return;
            }
            self._url = self.AnimBin;
            handler.exec(1);
            Pool.release(handler);
        };
        InitAnim.load = function () {
            var self = this;
            if (!self._url) {
                return;
            }
            var mgr = game.LoadMgr.ins;
            mgr.load(self._url, Handler.alloc(self, function (data, url) {
                new game.JsonTask().start(data, Handler.alloc(self, function (obj) { return mgr.addJsonRes(obj.key, obj.value); }), Handler.alloc(self, function () {
                    game.resLoaded();
                    self._url = null;
                }));
                delayCall(Handler.alloc(null, function () { return mgr.unload(url); }));
            }), game.LoadPri.Init);
        };
        InitAnim.AnimBin = "assets/anim/anim.json";
        return InitAnim;
    }());
    game.InitAnim = InitAnim;
    __reflect(InitAnim.prototype, "game.InitAnim");
})(game || (game = {}));
var game;
(function (game) {
    var Handler = base.Handler;
    var Pool = base.Pool;
    var DefaultCfgRoot = "assets/data/";
    var ServerCfgRoot = "assets/data_server/";
    var InitCfg = /** @class */ (function () {
        function InitCfg() {
        }
        InitCfg.getNum = function (handler) {
            var self = this;
            var mgr = game.LoadMgr.ins;
            if (gso.configList) {
                handler.exec(0);
                Pool.release(handler);
                return;
            }
            // if (gso.jzsj_channel === CHANNEL_NAME.VIVO || gso.jzsj_channel === CHANNEL_NAME.OPPO) {
            //     self.CfgRoot = "assets/data_ov/";
            // }
            // else if (gso.jzsj_channel === CHANNEL_NAME.SHOUQ || gso.jzsj_channel === CHANNEL_NAME.QZONE) {
            //     self.CfgRoot = "assets/data_shouq/";
            // }else
            if (gso.isWeixin || gso.source == "shengye" /* SHENGYE */ || gso.source == "shengyeaudit" /* SHENGYEAUDIT */ || gso.source == "shengyeshipin" /* SHENGYE_SHIPIN */) {
                self.CfgRoot = "assets/data_weixin/";
            }
            else {
                self.CfgRoot = DefaultCfgRoot;
            }
            console.info("加载配置文件");
            mgr.load(self.CfgRoot + "data_cfg.json", Handler.alloc(self, function (list, url) {
                self._urlList = [];
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var f = list_1[_i];
                    self._urlList.push(self.CfgRoot + f);
                }
                self._urlList.push(ServerCfgRoot + "tips_client.json");
                self._urlList.push(ServerCfgRoot + "gm_doc.json");
                handler.exec(self._urlList.length);
                Pool.release(handler);
            }), game.LoadPri.Init);
        };
        InitCfg.load = function () {
            var self = this;
            if (!self._urlList) {
                return;
            }
            var mgr = game.LoadMgr.ins;
            mgr.loadGroup(self._urlList, Handler.alloc(self, function (idx) {
                if (self.CfgRoot !== DefaultCfgRoot) {
                    for (var _i = 0, _a = self._urlList; _i < _a.length; _i++) {
                        var url = _a[_i];
                        if (url.indexOf(self.CfgRoot) === 0) {
                            var res = mgr.getRes(url);
                            mgr.unload(url);
                            mgr.addJsonRes(url.replace(self.CfgRoot, DefaultCfgRoot), res);
                        }
                    }
                }
                self._urlList = null;
            }), game.LoadPri.Init, Handler.alloc(self, function (idx, url) { return game.resLoaded(); }));
        };
        return InitCfg;
    }());
    game.InitCfg = InitCfg;
    __reflect(InitCfg.prototype, "game.InitCfg");
})(game || (game = {}));
var game;
(function (game) {
    var Image = eui.Image;
    var UIComponentImpl = eui.sys.UIComponentImpl;
    var Event = egret.Event;
    var ItemRenderer = eui.ItemRenderer;
    var getQualifiedClassName = egret.getQualifiedClassName;
    var registerImplementation = egret.registerImplementation;
    var Handler = base.Handler;
    var facade = base.facade;
    var getClassName = base.getClassName;
    function initEui() {
        registerImplementation("eui.IAssetAdapter", { getAsset: getAsset });
        testEuiImage();
        testEuiRender();
    }
    game.initEui = initEui;
    function getAsset(source, callBack, thisObject) {
        game.AssetsMgr.ins.getResAsync(source, Handler.alloc(thisObject, callBack));
    }
    function testEuiImage() {
        var sourceStr = "source";
        var typeStr = "string";
        var prototype = Image.prototype;
        var propDesc = Object.getOwnPropertyDescriptor(prototype, sourceStr);
        var setter = propDesc.set;
        propDesc.set = function (value) {
            var img = this;
            var source = img.source;
            if (source != value) {
                if (typeof source === typeStr) {
                    game.AssetsMgr.ins.decRef(source);
                }
                source = value;
                if (typeof source === typeStr) {
                    if (DEBUG) {
                        checkImg(img);
                    }
                    game.AssetsMgr.ins.addRef(source);
                }
            }
            setter.call(img, value);
        };
        Object.defineProperty(prototype, sourceStr, propDesc);
        var initStr = "initializeUIValues";
        var oldStr = "oldSource";
        prototype.__addedHack__ = function () {
            var img = this;
            if (img[oldStr]) {
                if (!img.source) {
                    img.source = img[oldStr];
                }
                img[oldStr] = undefined;
            }
            if (DEBUG) {
                checkImg(img);
            }
        };
        prototype.__removedHack__ = function () {
            var img = this;
            if (typeof img.source === typeStr) {
                img[oldStr] = img.source;
                img.source = undefined;
            }
        };
        prototype[initStr] = function () {
            var img = this;
            UIComponentImpl.prototype[initStr].call(img);
            img.addEventListener(Event.ADDED_TO_STAGE, img.__addedHack__, img);
            img.addEventListener(Event.REMOVED_FROM_STAGE, img.__removedHack__, img);
        };
    }
    function testEuiRender() {
        var dataStr = "data";
        var prototype = ItemRenderer.prototype;
        var propDesc = Object.getOwnPropertyDescriptor(prototype, dataStr);
        propDesc.set = function (value) {
            var renderer = this;
            renderer._data = value;
            eui.PropertyEvent.dispatchPropertyEvent(renderer, eui.PropertyEvent.PROPERTY_CHANGE, dataStr);
            try {
                renderer.dataChanged();
            }
            catch (e) {
                console.error("data setter at " + getQualifiedClassName(renderer), e);
            }
        };
        Object.defineProperty(prototype, dataStr, propDesc);
        eui.ArrayCollection.prototype.replaceAll = function (newSource) {
            if (!newSource)
                newSource = [];
            newSource = newSource.concat();
            var newLength = newSource.length;
            // @ts-ignore
            var oldLength = this._source.length;
            for (var i = newLength; i < oldLength; i++) {
                this.removeItemAt(newLength);
            }
            for (var i = 0; i < newLength; i++) {
                if (i >= oldLength)
                    this.addItemAt(newSource[i], i);
                else
                    this.replaceItemAt(newSource[i], i);
            }
            // @ts-ignore
            this._source = newSource;
        };
    }
    var getModName, checkImg;
    if (DEBUG) {
        getModName = function (img) {
            var p = img.parent;
            while (p) {
                var property = Object.getOwnPropertyDescriptor(p, "__mdr__");
                if (property) {
                    var mdr = property.value;
                    var mdrName = egret.getQualifiedClassName(mdr);
                    var mod_1 = mdr._owner;
                    if (mod_1) {
                        var numName = mod_1.getName();
                        var map = facade["_moduleMap"];
                        for (var k in map) {
                            if (map[k]["__name"] === numName) {
                                var modName = getClassName(map[k]);
                                var list = modName.split(".");
                                modName = list[list.length - 1];
                                modName = modName.replace("Mod", "");
                                return { mdrName: mdrName, modName: modName };
                            }
                        }
                    }
                }
                p = p.parent;
            }
            return null;
        };
        checkImg = function (img) {
            // if (!img.stage) {
            //     return;
            // }
            // if (typeof img.source !== "string") {
            //     return;
            // }
            // let resInfo = AssetsMgr.ins["getResInfo"](img.source);
            // if (resInfo) {
            //     let url = resInfo.url;
            //     if (url.indexOf("/common/main") > -1) {
            //         return;
            //     }
            //     if (url.indexOf("/aaaa/ui_btn_icon") > -1) {
            //         return;
            //     }
            //     console.error("新号加载了多余的UI", url);
            //     // if (url.indexOf("/other_ui") > -1) {
            //     //     return;
            //     // }
            //     // if (url.indexOf("ui/") === 0) {
            //     //     let a = url.split("/");
            //     //     let mod = a[1];
            //     //     let obj = getModName(img);
            //     //     if (!obj) {
            //     //         console.error("checkUI:", egret.getQualifiedClassName(img), img, url);
            //     //     } else if (mod.toLowerCase() !== obj.modName.toLowerCase()) {
            //     //         console.error("checkUI:", obj.mdrName, url);
            //     //     }
            //     // }
            // }
        };
    }
})(game || (game = {}));
var game;
(function (game) {
    function initLog() {
        if (DEBUG) {
            var filter_1 = [
                "msg.s2c_scene_entity_add",
                "msg.s2c_scene_entity_update",
                "msg.s2c_scene_entity_delete",
                "msg.s2c_scene_entity_move",
                "msg.s2c_instance_find_monster",
                "msg.s2c_instance_pickup_drop",
                "msg.s2c_scene_entity_stop_moving",
                "msg.s2c_scene_add_system_team_members",
                "msg.c2s_instance_pickup_drop",
                "msg.c2s_scene_move",
                "msg.c2s_scene_buddy_move",
                "msg.s2c_fly_bool",
            ];
            var skill_list_1 = ["msg.s2c_battle_info",
                "msg.c2s_battle_use_skill",
                "msg.c2s_battle_buddy_use_skill"];
            var dbg_1 = ["c2s_scene_print_entity", "s2c_scene_print_entity"];
            base.traceProto = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                var msg = logger.getList(params);
                if (msg.length > 1 && msg[1] && msg[1].indexOf("msg.s2c_entity_xy_change") > -1) {
                    return;
                }
                if ((gso.dbg_scene & 1) == 0 && msg.length > 1 && msg[1]) {
                    var str = msg[1];
                    for (var _a = 0, filter_2 = filter_1; _a < filter_2.length; _a++) {
                        var f = filter_2[_a];
                        if (str.indexOf(f) > -1) {
                            return;
                        }
                    }
                }
                if (dbg_1 && msg.length > 1 && msg[1]) {
                    var str = msg[1];
                    for (var _b = 0, dbg_2 = dbg_1; _b < dbg_2.length; _b++) {
                        var f = dbg_2[_b];
                        if (str.indexOf(f) > -1) {
                            return;
                        }
                    }
                }
                if ((gso.dbg_skill & 1) == 0 && msg.length > 1 && msg[1]) {
                    var str = msg[1];
                    for (var _c = 0, skill_list_2 = skill_list_1; _c < skill_list_2.length; _c++) {
                        var f = skill_list_2[_c];
                        if (str.indexOf(f) > -1) {
                            return;
                        }
                    }
                }
                console.proto.apply(console, msg);
            };
        }
    }
    game.initLog = initLog;
})(game || (game = {}));
var game;
(function (game) {
    var Handler = base.Handler;
    var Pool = base.Pool;
    var delayCall = base.delayCall;
    var InitMap = /** @class */ (function () {
        function InitMap() {
        }
        InitMap.getNum = function (handler) {
            var self = this;
            if (gso.configList) {
                handler.exec(0);
                Pool.release(handler);
                return;
            }
            self._url = self.MapData;
            handler.exec(1);
            Pool.release(handler);
        };
        InitMap.load = function () {
            var self = this;
            if (!self._url) {
                return;
            }
            var mgr = game.LoadMgr.ins;
            mgr.load(self._url, Handler.alloc(self, function (data, url) {
                new game.JsonTask().start(data, Handler.alloc(self, function (obj) { return mgr.addJsonRes(obj.key, obj.value); }), Handler.alloc(self, function () {
                    game.resLoaded();
                    self._url = null;
                }));
                delayCall(Handler.alloc(null, function () { return mgr.unload(url); }));
            }), game.LoadPri.Init);
        };
        InitMap.MapData = "assets/map/map.json";
        return InitMap;
    }());
    game.InitMap = InitMap;
    __reflect(InitMap.prototype, "game.InitMap");
})(game || (game = {}));
var game;
(function (game) {
    var Handler = base.Handler;
    var Pool = base.Pool;
    var InitPreload = /** @class */ (function () {
        function InitPreload() {
        }
        InitPreload.getNum = function (handler) {
            var self = this;
            self.init();
            var preloadGroups = self.groupList;
            var cnt = 0;
            for (var i = 0, n = preloadGroups.length; i < n; i++) {
                cnt += game.AssetsMgr.ins.getGroup(preloadGroups[i]).length;
            }
            cnt += this.preloadList.length;
            handler.exec(cnt);
            Pool.release(handler);
        };
        InitPreload.init = function () {
            // if (gso.isNew && gso.jzsj_channel != CHANNEL_NAME.SHOUQ) {
            //     this.preloadList[this.preloadList.length] = "assets/anim/effect/xinshou_luojian.png";
            //     this.preloadList[this.preloadList.length] = "assets/anim/effect/chuansong.png";
            //     this.preloadList[this.preloadList.length] = "assets/anim/effect/boss_enter.png";
            //     this.preloadList[this.preloadList.length] = "assets/anim/effect/luojian_xie.png";
            // }
        };
        InitPreload.load = function () {
            var self = this;
            var list = self.groupList;
            var n = list.length;
            for (var i = 0; i < n; i++) {
                game.AssetsMgr.ins.loadGroup(list[i], Handler.alloc(self, function (group) { return undefined; }), Handler.alloc(self, function (name, url, loaded, total) { return game.resLoaded(); }));
            }
            if (self.preloadList.length) {
                game.LoadMgr.ins.loadGroup(this.preloadList, Handler.alloc(self, function (group) { return undefined; }), game.LoadPri.Init, Handler.alloc(self, function (name, url, loaded, total) { return game.resLoaded(); }));
            }
        };
        //private static groupList: string[] = ["common_main"];
        InitPreload.groupList = [];
        InitPreload.preloadList = [];
        return InitPreload;
    }());
    game.InitPreload = InitPreload;
    __reflect(InitPreload.prototype, "game.InitPreload");
})(game || (game = {}));
var game;
(function (game) {
    var Handler = base.Handler;
    var Theme = eui.Theme;
    var Pool = base.Pool;
    var registerImplementation = egret.registerImplementation;
    var InitTheme = /** @class */ (function () {
        function InitTheme() {
        }
        InitTheme.getTheme = function (source, onSuccess, onError, thisObject) {
            var _a;
            var self = InitTheme;
            self.handlerMap[source] = Handler.alloc(thisObject, onSuccess);
            if (gso.configList) {
                self.onListLoaded();
                return;
            }
            // LoadMgr.ins.load(source, Handler.alloc(self, self.onLoadOne), LoadPri.Init);
            var list = game.LoadMgr.ins.getRes("dist-product/eui/gameEui.json");
            game.LoadMgr.ins.unload("dist-product/eui/gameEui.json");
            JSONParseClass.setData({});
            for (var f in list) {
                JSONParseClass.setData((_a = {}, _a[f] = list[f], _a));
            }
            var h = self.handlerMap[self.ThemeRoot];
            self.handlerMap[self.ThemeRoot] = null;
            delete self.handlerMap[self.ThemeRoot];
            if (h) {
                h.exec(generateEUI2);
                Pool.release(h);
            }
        };
        InitTheme.onListLoaded = function () {
            var _a;
            var self = InitTheme;
            var list = game.LoadMgr.ins.getRes("euiKeys");
            game.LoadMgr.ins.unload("euiKeys");
            JSONParseClass.setData({});
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var f = list_2[_i];
                var cfg = game.LoadMgr.ins.getRes(f);
                game.LoadMgr.ins.unload(f);
                JSONParseClass.setData((_a = {}, _a[f] = cfg, _a));
            }
            var h = self.handlerMap[self.ThemeRoot];
            self.handlerMap[self.ThemeRoot] = null;
            delete self.handlerMap[self.ThemeRoot];
            if (h) {
                h.exec(generateEUI2);
                Pool.release(h);
            }
        };
        InitTheme.onLoadOne = function (data, url) {
            var self = InitTheme;
            var h = self.handlerMap[url];
            self.handlerMap[url] = null;
            delete self.handlerMap[url];
            if (h) {
                h.exec(data);
                Pool.release(h);
            }
            if (url !== self.ThemeRoot) {
                game.resLoaded();
            }
        };
        InitTheme.newTheme = function () {
            registerImplementation("eui.IThemeAdapter", { getTheme: this.getTheme });
            new Theme(this.ThemeRoot, gso.gameStage);
        };
        InitTheme.getNum = function (handler) {
            var self = this;
            if (gso.configList) {
                handler.exec(0);
                Pool.release(handler);
                return;
            }
            var path = "dist-product/eui/gameEui.json";
            game.LoadMgr.ins.load(path, Handler.alloc(self, function (data, url) {
                handler.exec(0);
                Pool.release(handler);
            }), game.LoadPri.Init);
            // LoadMgr.ins.load(self.ThemeRoot,
            //     Handler.alloc(self, (data: { exmls: string[] }, url: string) => {
            //         handler.exec(data.exmls.length);
            //         Pool.release(handler);
            //     }),
            //     LoadPri.Init);
        };
        InitTheme.load = function () {
            if (gso.configList) {
                return;
            }
            this.newTheme();
        };
        InitTheme.handlerMap = {};
        InitTheme.ThemeRoot = "resource/default.thm.json";
        return InitTheme;
    }());
    game.InitTheme = InitTheme;
    __reflect(InitTheme.prototype, "game.InitTheme");
})(game || (game = {}));
var game;
(function (game) {
    var Handler = base.Handler;
    var delayCall = base.delayCall;
    var _cur;
    var _total;
    function loadRes() {
        _cur = 0;
        _total = 0;
        var callTime = 0;
        var totalCallTime = 6;
        var onGotNum = function (num) {
            callTime++;
            _total += num;
            if (callTime == totalCallTime) {
                delayCall(Handler.alloc(null, startLoad));
            }
        };
        if (gso.configList) {
            _total += gso.configList.length;
        }
        onGotNum(1);
        game.InitMap.getNum(Handler.alloc(null, onGotNum));
        game.InitAnim.getNum(Handler.alloc(null, onGotNum));
        game.InitTheme.getNum(Handler.alloc(null, onGotNum));
        game.InitCfg.getNum(Handler.alloc(null, onGotNum));
        game.InitPreload.getNum(Handler.alloc(null, onGotNum));
    }
    game.loadRes = loadRes;
    function startLoad() {
        if (gso.configList) {
            game.LoadMgr.ins.loadJsonList(gso.configList, Handler.alloc(null, function () { return resLoaded(); }), Handler.alloc(null, function () { return game.InitTheme.newTheme(); }));
        }
        // loadWinBg();
        resLoaded();
        game.InitMap.load();
        game.InitAnim.load();
        game.InitTheme.load();
        game.InitCfg.load();
        game.InitPreload.load();
    }
    function resLoaded() {
        _cur++;
        game.PreloadMgr.onResPro(Math.floor(_cur / _total * 100));
        //console.info("resLoaded，_cur：", _cur, "_total:", _total)
        if (_cur >= _total) {
            base.delayCall(Handler.alloc(game.PreloadMgr, game.PreloadMgr.onResComp));
        }
    }
    game.resLoaded = resLoaded;
})(game || (game = {}));
var game;
(function (game) {
    var Handler = base.Handler;
    var Pool = base.Pool;
    var ObjBase = base.ObjBase;
    var ResExt = /** @class */ (function (_super) {
        __extends(ResExt, _super);
        function ResExt() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResExt.prototype.load = function (groups, onComp) {
            this._groups = groups;
            this._onComp = onComp;
            this._total = groups.length;
            this._loaded = 0;
            for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
                var g = groups_1[_i];
                game.AssetsMgr.ins.loadGroup(g, Handler.alloc(this, this.onGroupCom));
            }
        };
        ResExt.prototype.onGroupCom = function (name) {
            var idx = this._groups.indexOf(name);
            if (idx > -1) {
                this._loaded++;
            }
            if (this._loaded == this._total) {
                var h = this._onComp;
                this._onComp = undefined;
                if (h) {
                    h.exec(this);
                    Pool.release(h);
                }
                Pool.release(this);
            }
        };
        ResExt.prototype.dispose = function () {
            this.onRelease();
        };
        ResExt.prototype.onAlloc = function () {
        };
        ResExt.prototype.onRelease = function () {
            this._groups = undefined;
            this._loaded = 0;
            this._total = 0;
            if (this._onComp) {
                Pool.release(this._onComp);
            }
            this._onComp = undefined;
        };
        ResExt.loadGroupList = function (groups, onComp) {
            var self = ResExt;
            var r = Pool.alloc(ResExt);
            self._listMap[r.hashCode] = onComp;
            r.load(groups, Handler.alloc(self, self.onListComp));
        };
        ResExt.onListComp = function (r) {
            var k = r.hashCode;
            var h = this._listMap[k];
            this._listMap[k] = null;
            delete this._listMap[k];
            if (h) {
                h.exec();
                Pool.release(h);
            }
        };
        ResExt._listMap = {};
        return ResExt;
    }(ObjBase));
    game.ResExt = ResExt;
    __reflect(ResExt.prototype, "game.ResExt", ["base.PoolObject", "base.DisposeObject"]);
})(game || (game = {}));
var game;
(function (game) {
    var CmdBase = /** @class */ (function (_super) {
        __extends(CmdBase, _super);
        function CmdBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CmdBase;
    }(base.Cmd));
    game.CmdBase = CmdBase;
    __reflect(CmdBase.prototype, "game.CmdBase");
})(game || (game = {}));
var game;
(function (game) {
    var Game = /** @class */ (function () {
        function Game() {
            this.init();
        }
        Game.prototype.init = function () {
            game.initLog();
            game.initEui();
            game.loadRes();
        };
        return Game;
    }());
    game.Game = Game;
    __reflect(Game.prototype, "game.Game");
    gso.gameCls = Game;
})(game || (game = {}));
var game;
(function (game) {
    var ModBase = /** @class */ (function (_super) {
        __extends(ModBase, _super);
        function ModBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModBase.prototype.regProxy = function (type, cls) {
            _super.prototype.regProxy.call(this, type, cls);
            //内网调试使用
            if (DEBUG && window) {
                var name = egret.getQualifiedClassName(cls);
                var lastName = name.split('.');
                var className = lastName[lastName.length - 1];
                window[className] = this.retProxy(type);
            }
        };
        return ModBase;
    }(base.Mod));
    game.ModBase = ModBase;
    __reflect(ModBase.prototype, "game.ModBase");
})(game || (game = {}));
var game;
(function (game) {
    var facade = base.facade;
    var ProxyBase = /** @class */ (function (_super) {
        __extends(ProxyBase, _super);
        function ProxyBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ProxyBase.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            //*****************************背包**********************************
            facade.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateByPropIndex, this); //通过道具index监听背包数据变更
            facade.onNt("on_bag_update_by_prop_type" /* ON_BAG_UPDATE_BY_PROP_TYPE */, this.onBagUpdateByPropType, this); //通过道具类型监听背包数据变更
            facade.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onBagUpdateByBagType, this); //通过背包类型监听背包数据变更
            facade.onNt("on_bag_update_by_prop_type_and_subtype" /* ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE */, this.onBagUpdateByPropTypeAndSubType, this); //通过道具类型、子类型监听
            facade.onNt("on_bag_update_by_head_type" /* ON_BAG_UPDATE_BY_HEAD_TYPE */, this.onBagUpdateByHeadType, this); //通过表头 ConfigHead 监听背包数据变更
            //*****************************角色**********************************
            facade.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this); //角色属性更新，会携带属性字段数组
            facade.onNt("reincarnate_info_update" /* REINCARNATE_INFO_UPDATE */, this.reincarnateInfoUpdate, this); //转生信息更新，只有转数发生变化才更新
            facade.onNt("on_role_privilege_update" /* ON_ROLE_PRIVILEGE_UPDATE */, this.onRolePrivilegeUpdate, this); //特权更新，携带特权字段数组
            //*****************************任务**********************************
            facade.onNt("on_task_update" /* ON_TASK_UPDATE */, this.onTaskUpdate, this); //任务数据变更，数据携带任务类型列表
            facade.onNt("on_task_hint" /* ON_TASK_HINT */, this.onTaskHint, this); //任务红点，数据携带任务类型列表
            //*****************************功能开启**********************************
            facade.onNt("on_open_func_init" /* ON_OPEN_FUNC_INIT */, this.onOpenFuncInit, this); //功能开启，数据携带功能idx列表
            facade.onNt("on_open_func_update" /* ON_OPEN_FUNC_UPDATE */, this.onOpenFuncUpdate, this); //功能开启，数据携带功能idx列表
            //*****************************开服天数，登录天数**********************************
            facade.onNt("on_server_day_update" /* ON_SERVER_DAY_UPDATE */, this.onServerDayUpdate, this);
            //*****************************闯关**********************************
            facade.onNt("main_pass_guanqia_update" /* MAIN_PASS_GUANQIA_UPDATE */, this.onMainPassGuanqiaUpdate, this);
            //*****************************外显数据更新**********************************
            facade.onNt("surface_info_update" /* SURFACE_INFO_UPDATE */, this.onSurfaceInfoUpdate, this); //数据携带headType
            facade.onNt("on_shen_ling_update_info" /* ON_SHEN_LING_UPDATE_INFO */, this.onShenlingInfoUpdate, this); //神灵信息更新
            facade.onNt("on_surface_tips_hide" /* ON_SURFACE_TIPS_HIDE */, this.onSurfaceTipsHide, this); //外显激活tips关闭抛出
            //*****************************中控活动**********************************
            facade.onNt("on_activity_init" /* ON_ACTIVITY_INIT */, this.onActivityInit, this);
            facade.onNt("on_activity_update_by_type" /* ON_ACTIVITY_UPDATE_BY_TYPE */, this.onActivityUpdateByType, this); //数据携带actType列表
            //*****************************军团阵容更新**********************************
            facade.onNt("on_update_zhenrong_info" /* ON_UPDATE_ZHENRONG_INFO */, this.onUpdateZhenrongInfo, this);
            //*****************************战令更新**********************************
            facade.onNt("on_update_giving_list" /* ON_UPDATE_GIVING_LIST */, this.onUpdateGivingList, this);
            //*****************************场景变化**********************************
            facade.onNt("on_scene_enter" /* ON_SCENE_ENTER */, this.onUpdateSceneEnter, this);
            //*****************************仙侣伴侣信息变化**********************************
            facade.onNt("on_update_banlv_info" /* ON_UPDATE_BANLV_INFO */, this.onBanlvInfoUpdate, this);
            //*****************************幻境之海信息变化**********************************
            facade.onNt("on_sea_info_update" /* ON_SEA_INFO_UPDATE */, this.onSeaInfoUpdate, this); //携带已开启的区域SeaType数组
        };
        /**需要监听的，子类重写下*/
        ProxyBase.prototype.onBagUpdateByPropIndex = function (n) { };
        ProxyBase.prototype.onBagUpdateByPropType = function (n) { };
        ProxyBase.prototype.onBagUpdateByBagType = function (n) { };
        ProxyBase.prototype.onBagUpdateByPropTypeAndSubType = function (n) { };
        ProxyBase.prototype.onBagUpdateByHeadType = function (n) { };
        ProxyBase.prototype.onRoleUpdate = function (n) { };
        ProxyBase.prototype.reincarnateInfoUpdate = function (n) { };
        ProxyBase.prototype.onRolePrivilegeUpdate = function (n) { };
        ProxyBase.prototype.onTaskUpdate = function (n) { };
        ProxyBase.prototype.onTaskHint = function (n) { };
        ProxyBase.prototype.onOpenFuncInit = function (n) { };
        ProxyBase.prototype.onOpenFuncUpdate = function (n) { };
        ProxyBase.prototype.onServerDayUpdate = function (n) { };
        ProxyBase.prototype.onMainPassGuanqiaUpdate = function (n) { };
        ProxyBase.prototype.onSurfaceInfoUpdate = function (n) { };
        ProxyBase.prototype.onShenlingInfoUpdate = function (n) { };
        ProxyBase.prototype.onSurfaceTipsHide = function (n) { };
        ProxyBase.prototype.onActivityInit = function (n) { };
        ProxyBase.prototype.onActivityUpdateByType = function (n) { };
        ProxyBase.prototype.onUpdateZhenrongInfo = function (n) { };
        ProxyBase.prototype.onUpdateGivingList = function (n) { };
        ProxyBase.prototype.onUpdateSceneEnter = function (n) { };
        ProxyBase.prototype.onBanlvInfoUpdate = function (n) { };
        ProxyBase.prototype.onSeaInfoUpdate = function (n) { };
        return ProxyBase;
    }(base.Proxy));
    game.ProxyBase = ProxyBase;
    __reflect(ProxyBase.prototype, "game.ProxyBase");
})(game || (game = {}));
var game;
(function (game) {
    var Pool = base.Pool;
    /**
     * 道具数据类
     */
    var PropData = /** @class */ (function () {
        function PropData() {
            this._iconShowType = 1 /* Reward */; /**显示类型，客户端定义*/
        }
        /**
         *更新数据
         * @param {msg.prop_attributes} attr
         * @param {boolean} _isSome 是否缺省替换
         */
        PropData.prototype.update = function (attr, _isSome) {
            if (_isSome === void 0) { _isSome = false; }
            var self = this;
            var keys;
            keys = Object.keys(attr);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (_isSome && self["_" + key] == undefined)
                    continue;
                if (key == "index" && Long.isLong(attr[key])) {
                    self["_" + key] = attr[key].toNumber(); /**index转换成number类型*/
                    continue;
                }
                self["_" + key] = attr[key];
            }
        };
        /**
         *更新数据
         */
        PropData.prototype.update2 = function (obj, name, _isSome) {
            if (_isSome === void 0) { _isSome = false; }
            var self = this;
            if (obj) {
                self["_" + name] = obj;
            }
        };
        PropData.prototype.onAlloc = function () {
        };
        PropData.prototype.onRelease = function () {
            var self = this;
            var keys = Object.keys(self);
            for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
                var i = keys_3[_i];
                if (typeof self[i] != "function") {
                    self[i] = null;
                }
            }
        };
        PropData.prototype.dispose = function () {
            this.onRelease();
        };
        /**
         * 克隆数据
         * @param prop
         */
        PropData.clone = function (prop) {
            if (!prop) {
                return null;
            }
            var data = Pool.alloc(PropData);
            var keys = Object.keys(prop);
            for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
                var k = keys_4[_i];
                data[k] = prop[k];
            }
            return data;
        };
        /**
         * 过滤掉属性为 0 的属性
         */
        PropData.filterAtr0 = function (source) {
            var attr = {};
            for (var k in source) {
                var d = source[k];
                if (Long.isLong(d)) {
                    if (d.toNumber() != 0) {
                        attr[k] = d;
                    }
                }
                else {
                    if (d != 0) {
                        attr[k] = d;
                    }
                }
                // if(egret.NumberUtils.isNumber(d)){
                //     if(d != 0){
                //         attr[k] = d;
                //     }
                // }
            }
            return attr;
        };
        /**
         *创建数据
         * @param {number} index
         * @param {number} count
         * @param {number} iconShowType 类型
         * @returns {game.PropData}
         */
        PropData.create = function (index, count, iconShowType) {
            if (count === void 0) { count = 0; }
            if (index instanceof Long) {
                index = index.toNumber();
            }
            var cfg = game.getConfigById(index);
            if (!cfg) {
                console.error("cfg error! " + index);
                return null;
            }
            var data = Pool.alloc(PropData);
            data._index = index;
            data._count = count;
            data._quality = cfg.quality;
            if (iconShowType) {
                data.iconShowType = iconShowType;
            }
            return data;
        };
        /**转换数据*/
        PropData.fromData = function (attr) {
            if (!attr) {
                return null;
            }
            var data = this.create(attr.index.toNumber(), attr.count);
            if (!data)
                return null;
            data._prop_id = attr.prop_id;
            data.update(attr);
            return data;
        };
        /** 根据物品id获取物品类型 -DE，PropType*/
        PropData.propType = function (index) {
            return PropData.getPropParse(index, 2 /* PropType */);
        };
        Object.defineProperty(PropData.prototype, "iconShowType", {
            /**显示类型，客户端定义*/
            get: function () {
                return this._iconShowType;
            },
            set: function (value) {
                this._iconShowType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "prop_id", {
            /** 唯一id*/
            get: function () {
                return this._prop_id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "index", {
            /** 物品编号*/
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "count", {
            /** 数量*/
            get: function () {
                return this._count;
            },
            set: function (value) {
                this._count = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "quality", {
            /** 品质*/
            get: function () {
                return this._quality;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "cfg", {
            /** 获取配置*/
            get: function () {
                return game.getConfigById(this._index);
            },
            enumerable: true,
            configurable: true
        });
        /**获取index规则对应的类型，目前只有进背包的道具会用到*/
        PropData.getPropParse = function (index, parseType) {
            if (parseType === void 0) { parseType = 1 /* Type */; }
            this.headMap[parseType] = this.headMap[parseType] || {};
            var parseMap = this.headMap[parseType];
            if (parseMap[index]) {
                return parseMap[index];
            }
            else {
                var info = game.PropParseTypeList[parseType];
                var str = index.toString().slice(info[0], info[0] + info[1]);
                parseMap[index] = parseInt(str);
                return parseMap[index];
            }
            // let info = PropParseTypeList[parseType];
            // let str = index.toString().slice(info[0], info[0] + info[1]);
            // return parseInt(str);
        };
        Object.defineProperty(PropData.prototype, "bigType", {
            /** 大类 -ABCDE，用于bag_type配置取排序*/
            get: function () {
                return PropData.getPropParse(this._index, 0 /* BigType */);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "type", {
            /** 表头 -ABC，表头ConfigHead*/
            get: function () {
                return PropData.getPropParse(this._index, 1 /* Type */);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "propType", {
            /** 道具表物品类型 -DE，PropType*/
            get: function () {
                return PropData.getPropParse(this._index, 2 /* PropType */);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "propSubType", {
            /** 物品子类型 -FG*/
            get: function () {
                return PropData.getPropParse(this._index, 3 /* PropSubType */);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "resolve", {
            /** 物品或者装备分解获得*/
            get: function () {
                return this.cfg.resolve;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "desc", {
            /** 物品描述*/
            get: function () {
                return this.cfg.desc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "gain_id", {
            /** 获取途径跳转ID*/
            get: function () {
                return this.cfg.gain_id;
            },
            enumerable: true,
            configurable: true
        });
        /** 物品名称，格式化好的*/
        PropData.prototype.getPropName = function (isWhite) {
            if (isWhite === void 0) { isWhite = true; }
            return game.TextUtil.parseHtml(this.getPropNameStr(isWhite));
        };
        /** 物品名称*/
        PropData.prototype.getPropNameStr = function (isWhite) {
            if (isWhite === void 0) { isWhite = true; }
            if (isWhite) {
                return game.TextUtil.addColor(this.cfg.name, game.ColorUtil.getColorByQuality1(this.quality));
            }
            return game.TextUtil.addColor(this.cfg.name, game.ColorUtil.getColorByQuality2(this.quality));
        };
        Object.defineProperty(PropData.prototype, "equipPos", {
            /**装备部位*/
            get: function () {
                return this.index % 10;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "equipStar", {
            /**装备星级*/
            get: function () {
                return Math.floor(this.index / 10) % 10;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "regular_attrs", {
            // /** 武器/装备战力*/
            // public get showPower(): Long {
            //     let totalPower: Long = Long.fromValue(0);
            //     if (this.regular_attrs && this.regular_attrs.showpower) {
            //         totalPower = totalPower.add(this.regular_attrs.showpower);
            //     }
            //     //todo，计算强化等战力
            //     return totalPower;
            // }
            /** 装备固定属性*/
            get: function () {
                return this._regular_attrs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "zengfu_attrs", {
            /**装备增幅属性*/
            get: function () {
                return this._zengfu_attrs;
            },
            enumerable: true,
            configurable: true
        });
        /**根据属性key获取对应的增幅属性文本*/
        PropData.prototype.getZengFuAttrStrByKey = function (key) {
            var attrs = this.zengfu_attrs;
            var str = '';
            if (attrs && attrs[key]) {
                str = game.TextUtil.getAttrsPerCent(key, attrs[key]);
            }
            if (!str) {
                str = '0';
            }
            return game.TextUtil.addColor("  (\u589E\u5E45+" + str + ")", 5893887 /* BLUE */);
        };
        Object.defineProperty(PropData.prototype, "jipin_list", {
            /**装备极品属性*/
            get: function () {
                return this._jipin_list || [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "zengfu_lv", {
            /**装备增幅属性等级*/
            get: function () {
                return this._zengfu_lv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "advanced_lv", {
            /**装备进阶等级*/
            get: function () {
                return this._advanced_lv;
            },
            set: function (val) {
                this._advanced_lv = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "advanced_attrs", {
            /**装备进阶属性*/
            get: function () {
                return this._advanced_attrs;
            },
            set: function (val) {
                this._advanced_attrs = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "strength", {
            /**强化等级*/
            get: function () {
                return this._strength;
            },
            set: function (val) {
                this._strength = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "strength_attrs", {
            /**强化属性*/
            get: function () {
                return this._strength_attrs;
            },
            set: function (val) {
                this._strength_attrs = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "gems", {
            /**宝石列表 */
            get: function () {
                return this._gems;
            },
            set: function (val) {
                this._gems = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "advanced_master_attrs", {
            /**进阶套装属性*/
            get: function () {
                return this._advanced_master_attrs;
            },
            set: function (val) {
                this._advanced_master_attrs = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "hunka_star", {
            //魂卡星级
            get: function () {
                return this._hunka_star;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "hunka_zizhi", {
            //魂卡资质
            get: function () {
                return this._hunka_zizhi;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "guding", {
            //固定词条
            get: function () {
                return this._guding;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "shuiji", {
            //随机词条
            get: function () {
                return this._shuiji;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "pingfen", {
            //魂卡评分
            get: function () {
                return this._pingfen;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropData.prototype, "born_login_days", {
            //得到时候玩家的登录天数
            get: function () {
                return this._born_login_days;
            },
            enumerable: true,
            configurable: true
        });
        PropData.headMap = {};
        return PropData;
    }());
    game.PropData = PropData;
    __reflect(PropData.prototype, "game.PropData", ["base.PoolObject", "base.DisposeObject"]);
})(game || (game = {}));
var game;
(function (game) {
    //import VipUtil = game.mod.VipUtil;
    var facade = base.facade;
    var RoleVo = /** @class */ (function () {
        function RoleVo(isBack) {
            if (isBack === void 0) { isBack = false; }
            /**系统时间相关数值*/
            //private readonly _backVo: RoleVo;
            this.isOpenAutoOneKey = false;
            // if (!isBack) {
            //     this._backVo = new RoleVo(true);
            // }
            // eui.Watcher.watch(this,[RolePropertyKey.level],this.levelChange,this);
        }
        RoleVo.setIns = function (value) {
            this._ins = value;
        };
        Object.defineProperty(RoleVo, "ins", {
            get: function () {
                return this._ins;
            },
            enumerable: true,
            configurable: true
        });
        RoleVo.prototype.levelChange = function (value) {
            this.isOpenAutoOneKey = value >= 150; //一键升级限制
        };
        /**通过属性key获取属性数值，统一用这个*/
        RoleVo.prototype.getValueByKey = function (key) {
            if (key == "max_hp" /* max_hp */) {
                //最大生命，服务端需要支持减去仙力生命
                var god_hp = this.god_hp || 0;
                return this.max_hp.toNumber() - god_hp;
            }
            var val = this[key];
            if (val && val instanceof Long) {
                val = val.toNumber();
            }
            return val || 0;
        };
        /**外部设置属性数值，不建议使用*/
        RoleVo.prototype.setValueByKey = function (key, val) {
            this[key] = val;
            facade.sendNt("on_role_update" /* ON_ROLE_UPDATE */, [key]);
        };
        // public backup(): void {
        //     let obj: any = this._backVo;
        //     let self = this;
        //     for (let k in self) {
        //         if (!self.hasOwnProperty(k)
        //             || k.indexOf("__") === 0
        //             || typeof self[k] === "function") {
        //             continue;
        //         }
        //         let v = self[k];
        //         if (v instanceof Long) {
        //             if (!obj[k]) {
        //                 obj[k] = new Long(v.low, v.high);
        //             } else {
        //                 obj[k].low = v.low;
        //                 obj[k].high = v.high;
        //             }
        //         } else if (typeof v === "string" || typeof v === "number") {
        //             obj[k] = v;
        //         }
        //     }
        // }
        RoleVo.prototype.update = function (prop, res) {
            if (res === void 0) { res = null; }
            var list = res || [];
            for (var k in prop) {
                if (!prop.hasOwnProperty(k)
                    || k.indexOf("__") === 0
                    || typeof prop[k] === "function") {
                    continue;
                }
                var v = prop[k];
                switch (k) {
                    case "level" /* level */:
                        gso.roleLv = v;
                        console.info("RoleVo gso.roleLv = " + gso.roleLv);
                        gzyyou.sdk.cacheQQPlayerRankInfo && gzyyou.sdk.cacheQQPlayerRankInfo(v);
                        gzyyou.sdk.loadReport("role_up" /* ROLE_UP */);
                        break;
                    case "role_id" /* role_id */:
                        gso.roleId = v.toString();
                        console.info("RoleVo gso.roleId = " + gso.roleId);
                        break;
                    case "name" /* name */:
                        gso.roleName = v;
                        break;
                    case "vip_lv" /* vip_lv */:
                        gso.roleVipLv = game.mod.VipUtil.getShowVipLv(v);
                        console.info("gso.roleVipLv = " + gso.roleVipLv);
                        break;
                    case "sex" /* sex */:
                        gso.roleSex = v;
                        break;
                    case "gold" /* gold */:
                        gso.roleMoney = v.toNumber();
                        break;
                    case "showpower" /* showpower */:
                        gso.rolePower = v.toString();
                        console.info(" gso.rolePower = " + gso.rolePower);
                        break;
                    case "reincarnate" /* reincarnate */:
                        gso.roleChangeLv = v;
                        break;
                }
                if (game.RoleLongKeys.indexOf(k) > -1) {
                    v = v.toNumber();
                }
                this[k] = v;
                list.push(k);
            }
            return list;
        };
        return RoleVo;
    }());
    game.RoleVo = RoleVo;
    __reflect(RoleVo.prototype, "game.RoleVo");
})(game || (game = {}));
var game;
(function (game) {
    var TimeMgr = base.TimeMgr;
    var facade = base.facade;
    var SkillData = /** @class */ (function () {
        function SkillData() {
        }
        SkillData.getActIdx = function (skillIdx) {
            var cfg = this.getCfg(skillIdx);
            if (0 == cfg.skillshow) {
                //目前用于处理化神技能
                return [];
            }
            var showCfg = this.getEffCfg(cfg.skillshow);
            if (!showCfg) {
                console.error("技能id " + skillIdx + " 对应的表 skillshow 缺少 " + cfg.skillshow + " 配置记录");
                return [];
            }
            var list = [];
            for (var i = 1; i <= 3; i++) {
                var act = showCfg["act" + i];
                if (!act)
                    continue;
                list.push(act);
            }
            return list;
        };
        /**
         * 获取某个技能的信息
         * @param skillId
         */
        SkillData.getSkillInfo = function (skillId) {
            var self = this;
            var secnePoxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
            var mainPlayer = secnePoxy.mainPlayerObj;
            if (!mainPlayer || !mainPlayer.vo || !mainPlayer.vo.skills) {
                return null;
            }
            var skills = mainPlayer.vo.skills;
            if (!skills || !skills.length) {
                return null;
            }
            for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
                var s = skills_1[_i];
                if (s.skill_idx == skillId) {
                    return s;
                }
            }
            return null;
        };
        SkillData.getLeftCd = function (skill) {
            var curTime = TimeMgr.time.serverTime;
            var t = skill.next_use_time | 0;
            if (!t) {
                return 0;
            }
            var nextUseTime = t * 10 + (game.RoleVo.ins.starttime * 1000);
            return nextUseTime - curTime;
        };
        SkillData.getPassTime = function (skill) {
            var curTime = TimeMgr.time.serverTime;
            var t = +skill.use_time | 0;
            var useTime = t * 10 + (game.RoleVo.ins.starttime * 1000);
            return curTime - useTime;
        };
        SkillData.getTotalCd = function (skill) {
            var n = +skill.next_use_time | 0;
            var u = +skill.use_time | 0;
            return (n - u) * 10;
        };
        /**判断是否冷却*/
        SkillData.isEnable = function (skill) {
            return skill && this.getLeftCd(skill) <= 0;
        };
        /**普攻技能*/
        SkillData.isCommonAtk = function (idx) {
            if (!this._normal_skill) {
                var param = game.getConfigByNameId("param.json" /* Param */, "normal_skill");
                this._normal_skill = param.value[0];
            }
            return this._normal_skill.indexOf(idx) != -1;
        };
        /**是否是仙法技能*/
        SkillData.isImmortalSkill = function (idx) {
            var cfg = this.getCfg(idx);
            return cfg && cfg.type1 == 1 /* Immortal */;
        };
        /**是否是仙剑技能*/
        SkillData.isXianjianSkill = function (idx) {
            var cfg = this.getCfg(idx);
            return cfg && cfg.type1 == 11 /* Xianjian */;
        };
        /**是否是化神技能 */
        SkillData.isHuashenSkill = function (idx) {
            var cfg = this.getCfg(idx);
            return cfg && cfg.type1 == 18 /* Huasheng */;
        };
        /**是否是化神普工 */
        SkillData.isHuashenCommonSkill = function (idx) {
            var cfg = this.getCfg(idx);
            return cfg && cfg.type1 == 17 /* HuashengCommon */;
        };
        /**是否在化神中*/
        SkillData.isHuashenXing = function () {
            return this._isHuashenXing;
        };
        /**是否在化神中*/
        SkillData.setHuashenXing = function (ret) {
            this._isHuashenXing = ret || false;
        };
        /**是否是需要特殊处理的技能 */
        SkillData.isSpecialSkill = function (idx) {
            var cfg = this.getCfg(idx);
            return cfg && !!game.SpecialSkillList[cfg.type1];
        };
        /**是否是需要特殊处理的技能2 */
        SkillData.isSpecialSkill2 = function (idx) {
            var cfg = this.getCfg(idx);
            return game.SpecialSkillList2.skillTypes.indexOf(cfg.type1) > -1;
        };
        // public static isGodSkill(idx: number): boolean {
        //     let cfg = this.getCfg(idx);
        //     return cfg && cfg.type1 == SkillType.RoleHighSkill;
        // }
        // public static isElementarySkill(idx: number): boolean {
        //     let cfg = this.getCfg(idx);
        //     return cfg && cfg.type1 == SkillType.firstSword;
        // }
        SkillData.isShenJueSkill = function (idx) {
            var cfg = this.getCfg(idx);
            return cfg != null && cfg.type2 == 13;
        };
        SkillData.isDiBingSkill = function (idx) {
            var cfg = this.getCfg(idx);
            return cfg != null && cfg.type2 == 15;
        };
        SkillData.getCfg = function (idx) {
            return game.getConfigByNameId("battle_skill.json" /* Skill */, idx);
        };
        /**获取技能类型*/
        SkillData.getSkillType1 = function (idx) {
            var cfg = this.getCfg(idx);
            return cfg.type1;
        };
        SkillData.getEffCfg = function (idx) {
            return game.getConfigByNameId("skill_show.json" /* SkillShow */, idx);
        };
        /**获取技能优先级*/
        SkillData.getSkillPriority = function (idx) {
            var cfg = this.getCfg(idx);
            return (cfg && cfg.precedence) || 1;
        };
        SkillData.NEXT_SKILL_CD = 500;
        SkillData.USE_SKILL_TIME = 0;
        SkillData._normal_skill = null;
        SkillData._isHuashenXing = false;
        return SkillData;
    }());
    game.SkillData = SkillData;
    __reflect(SkillData.prototype, "game.SkillData");
})(game || (game = {}));
var game;
(function (game) {
    var ColorUtil = /** @class */ (function () {
        function ColorUtil() {
        }
        /**根据品质获取颜色*/
        ColorUtil.getColorByQuality = function (quality) {
            if (null == ColorUtil.colorMap) {
                ColorUtil.colorMap = {};
                ColorUtil.colorMap[0 /* DEFAULT */] = 16777215 /* WHITE */;
                ColorUtil.colorMap[1 /* BLUE */] = 31431 /* BLUE */;
                ColorUtil.colorMap[2 /* PURPLE */] = 10617087 /* PURPLE */;
                ColorUtil.colorMap[3 /* ORANGE */] = 12150784 /* ORANGE */;
                ColorUtil.colorMap[4 /* RED */] = 13895688 /* RED */;
                ColorUtil.colorMap[5 /* GOLD */] = 15577620 /* YELLOW */;
                ColorUtil.colorMap[6 /* GREEN */] = 1022764 /* GREEN */;
                ColorUtil.colorMap[7 /* WHITE */] = 16777215 /* WHITE */;
                ColorUtil.colorMap[8 /* BLUE_PURPLE */] = 16777215 /* WHITE */;
                ColorUtil.colorMap[9 /* COLOR */] = 16777215 /* WHITE */;
            }
            return ColorUtil.colorMap[quality];
        };
        /**根据品质获取#颜色缩写*/
        ColorUtil.getColorStrByQua = function (quality) {
            if (null == ColorUtil.colorStrMap) {
                ColorUtil.colorStrMap = {};
                ColorUtil.colorStrMap[0 /* DEFAULT */] = "#W";
                ColorUtil.colorStrMap[1 /* BLUE */] = "#B";
                ColorUtil.colorStrMap[2 /* PURPLE */] = "#P";
                ColorUtil.colorStrMap[3 /* ORANGE */] = "#O";
                ColorUtil.colorStrMap[4 /* RED */] = "#R";
                ColorUtil.colorStrMap[5 /* GOLD */] = "#Y";
                ColorUtil.colorStrMap[6 /* GREEN */] = "#G";
                ColorUtil.colorStrMap[7 /* WHITE */] = "#W";
                ColorUtil.colorStrMap[8 /* BLUE_PURPLE */] = "#W";
                ColorUtil.colorStrMap[9 /* COLOR */] = "#W";
            }
            return ColorUtil.colorStrMap[quality];
        };
        /**根据品质获取颜色（白底）*/
        ColorUtil.getColorByQuality1 = function (quality) {
            if (null == ColorUtil.whitColorMap) {
                ColorUtil.whitColorMap = {};
                ColorUtil.whitColorMap[0 /* DEFAULT */] = 16777215 /* WHITE */;
                ColorUtil.whitColorMap[1 /* BLUE */] = 31431 /* BLUE */;
                ColorUtil.whitColorMap[2 /* PURPLE */] = 10617087 /* PURPLE */;
                ColorUtil.whitColorMap[3 /* ORANGE */] = 16748553 /* ORANGE */;
                ColorUtil.whitColorMap[4 /* RED */] = 16719376 /* RED */;
                ColorUtil.whitColorMap[5 /* GOLD */] = 15855403 /* YELLOW */;
                ColorUtil.whitColorMap[6 /* GREEN */] = 2330156 /* GREEN */;
                ColorUtil.whitColorMap[7 /* WHITE */] = 16777215 /* WHITE */;
                ColorUtil.whitColorMap[8 /* BLUE_PURPLE */] = 16777215 /* WHITE */;
                ColorUtil.whitColorMap[9 /* COLOR */] = 16777215 /* WHITE */;
            }
            return ColorUtil.whitColorMap[quality];
        };
        /**根据品质获取颜色（黑底）*/
        ColorUtil.getColorByQuality2 = function (quality) {
            if (null == ColorUtil.blackColorMap) {
                ColorUtil.blackColorMap = {};
                ColorUtil.blackColorMap[0 /* DEFAULT */] = 4435385 /* DEFAULT */;
                ColorUtil.blackColorMap[1 /* BLUE */] = 5893887 /* BLUE */;
                ColorUtil.blackColorMap[2 /* PURPLE */] = 15763967 /* PURPLE */;
                ColorUtil.blackColorMap[3 /* ORANGE */] = 16757068 /* ORANGE */;
                ColorUtil.blackColorMap[4 /* RED */] = 16731212 /* RED */;
                ColorUtil.blackColorMap[5 /* GOLD */] = 16773203 /* YELLOW */;
                ColorUtil.blackColorMap[6 /* GREEN */] = 8585074 /* GREEN */;
                ColorUtil.blackColorMap[7 /* WHITE */] = 15262666 /* WHITE */;
                ColorUtil.blackColorMap[8 /* BLUE_PURPLE */] = 15262666 /* WHITE */;
                ColorUtil.blackColorMap[9 /* COLOR */] = 15262666 /* WHITE */;
            }
            return ColorUtil.blackColorMap[quality];
        };
        ColorUtil.getColorChineseStrByQua2 = function (quality) {
            if (null == ColorUtil.colorChineseStrMap) {
                ColorUtil.colorChineseStrMap = {};
                ColorUtil.colorChineseStrMap[0 /* DEFAULT */] = "灰";
                ColorUtil.colorChineseStrMap[1 /* BLUE */] = "蓝";
                ColorUtil.colorChineseStrMap[2 /* PURPLE */] = "紫";
                ColorUtil.colorChineseStrMap[3 /* ORANGE */] = "橙";
                ColorUtil.colorChineseStrMap[4 /* RED */] = "红";
                ColorUtil.colorChineseStrMap[5 /* GOLD */] = "金";
                ColorUtil.colorChineseStrMap[6 /* GREEN */] = "绿";
                ColorUtil.colorChineseStrMap[7 /* WHITE */] = "白";
                ColorUtil.colorChineseStrMap[8 /* BLUE_PURPLE */] = "蓝紫";
                ColorUtil.colorChineseStrMap[9 /* COLOR */] = "彩";
            }
            return ColorUtil.colorChineseStrMap[quality];
        };
        ColorUtil.colorMap = null;
        ColorUtil.colorStrMap = null;
        ColorUtil.whitColorMap = null;
        ColorUtil.blackColorMap = null;
        //蓝、紫、橙、红、金、绿、白、蓝紫、彩
        ColorUtil.colorChineseStrMap = null;
        return ColorUtil;
    }());
    game.ColorUtil = ColorUtil;
    __reflect(ColorUtil.prototype, "game.ColorUtil");
})(game || (game = {}));
var game;
(function (game) {
    var Tween = base.Tween;
    var Handler = base.Handler;
    var MathUtil = /** @class */ (function () {
        function MathUtil() {
        }
        MathUtil.rad2deg = function (rad) {
            return rad * this.RAD_2_DEG;
        };
        MathUtil.deg2rad = function (degrees) {
            return degrees * this.DEG_2_RAD;
        };
        MathUtil.round = function (val) {
            return ((val + 0.5) * this.ONE >> 0) / this.ONE;
        };
        MathUtil.clamp = function (input, min, max) {
            var tmp = 0;
            if (min > max) {
                tmp = min;
                min = max;
                max = tmp;
            }
            if (input < min) {
                input = min;
            }
            if (input > max) {
                input = max;
            }
            return input;
        };
        MathUtil.randomDir = function (dir) {
            if (dir == 5 /* DOWN */ || dir == 1 /* UP */ || dir == 0 /* NONE */) {
                dir = Math.random() > 0.5 ? 2 /* Right */ : 1 /* Left */;
            }
            else if (dir > 5 /* DOWN */) {
                dir = 2 /* Right */;
            }
            else {
                dir = 1 /* Left */;
            }
            return dir;
        };
        MathUtil.parabolic2 = function (node, time, p2, handler, tween, atr) {
            //Tween.remove(node);
            //let tween = Tween.get(node);
            var p1 = { x: node.x, y: node.y };
            var cp = { x: node.x, y: node.y };
            node["factor"] = 0;
            var dis = Math.abs(p2.x - p1.x) * 0.4;
            if (p1.x < p2.x) {
                cp.x = p1.x + dis;
            }
            else {
                cp.x = p1.x - dis;
            }
            cp.y = Math.max(p1.y, p2.y) - 200;
            // let scale = node.scaleX;
            // let alpha = node.alpha;
            var scale = -1;
            var alpha = -1;
            var func = function () {
                var t = node["factor"];
                node.x = ((1 - t) * (1 - t)) * p1.x + 2 * t * (1 - t) * cp.x + t * t * p2.x;
                node.y = ((1 - t) * (1 - t)) * p1.y + 2 * t * (1 - t) * cp.y + t * t * p2.y;
                if (!atr) {
                    return;
                }
                if (scale == -1) {
                    scale = node.scaleX;
                }
                if (alpha == -1) {
                    alpha = node.alpha;
                }
                if (atr.alpha != undefined) {
                    node.alpha = (1 - t) * alpha + atr.alpha;
                }
                if (atr.scale != undefined) {
                    var s = (1 - t) * scale + atr.scale;
                    node.scaleX = s;
                    node.scaleY = s;
                }
            };
            tween = tween.to({ factor: 0.4 }, time * 0.2, Handler.alloc(this, function () {
                func();
            })).to({ factor: 1 }, time * 0.7, Handler.alloc(this, function () {
                func();
            }));
            if (handler) {
                tween.exec(handler);
            }
            return tween;
        };
        //������
        MathUtil.parabolic3 = function (node, time, cp, p2, handler, tween, atr) {
            Tween.remove(node);
            tween = Tween.get(node);
            var p1 = { x: node.x, y: node.y };
            node["factor"] = 0;
            if (!cp) {
                cp = { x: p2.x, y: p2.y };
                var dis = Math.abs(p2.x - p1.x) * 0.5;
                if (p1.x < p2.x) {
                    cp.x = p1.x + dis;
                }
                else {
                    cp.x = p1.x - dis;
                }
                cp.y = Math.max(p1.y, p2.y) + 100;
            }
            var preX = node.x;
            var preY = node.y;
            var func = function () {
                var t = node["factor"];
                //��������
                node.x = ((1 - t) * (1 - t)) * p1.x + 2 * t * (1 - t) * cp.x + t * t * p2.x;
                node.y = ((1 - t) * (1 - t)) * p1.y + 2 * t * (1 - t) * cp.y + t * t * p2.y;
                //�������߷���
                var abcX = node.x - preX;
                var abcY = node.y - preY;
                var rotation = Math.atan2(abcY, abcX) * 180 / Math.PI;
                0 > rotation ? rotation += 360 : rotation > 360 && (rotation %= 360);
                console.log("rotation = " + rotation);
                node.rotation = rotation; //Math.atan2(abcY,abcX)*180 / Math.PI;
                node.scaleX = 2;
                node.scaleY = 2;
                preX = node.x;
                preY = node.y;
            };
            tween = tween.to({ factor: 0.4 }, time * 0.2, Handler.alloc(this, function () {
                func();
            })).to({ factor: 1 }, time * 0.7, Handler.alloc(this, function () {
                func();
            }));
            if (handler) {
                tween.exec(handler);
            }
            return tween;
        };
        MathUtil.getMinNumber = function (ary) {
            var min = ary[0];
            for (var _i = 0, ary_1 = ary; _i < ary_1.length; _i++) {
                var v = ary_1[_i];
                min = Math.min(v, min);
            }
            return min;
        };
        MathUtil.RAD_2_DEG = 180 / Math.PI;
        MathUtil.DEG_2_RAD = Math.PI / 180;
        MathUtil.ONE = 1;
        MathUtil.sinArr = [0.000000, 0.017452, 0.034899, 0.052336, 0.069756, 0.087156, 0.104528, 0.121869, 0.139173, 0.156434, 0.173648, 0.190809, 0.207912, 0.224951, 0.241922, 0.258819, 0.275637, 0.292372, 0.309017, 0.325568, 0.342020, 0.358368, 0.374607, 0.390731, 0.406737, 0.422618, 0.438371, 0.453990, 0.469472, 0.484810, 0.500000, 0.515038, 0.529919, 0.544639, 0.559193, 0.573576, 0.587785, 0.601815, 0.615661, 0.629320, 0.642788, 0.656059, 0.669131, 0.681998, 0.694658, 0.707107, 0.719340, 0.731354, 0.743145, 0.754710, 0.766044, 0.777146, 0.788011, 0.798636, 0.809017, 0.819152, 0.829038, 0.838671, 0.848048, 0.857167, 0.866025, 0.874620, 0.882948, 0.891007, 0.898794, 0.906308, 0.913545, 0.920505, 0.927184, 0.933580, 0.939693, 0.945519, 0.951057, 0.956305, 0.961262, 0.965926, 0.970296, 0.974370, 0.978148, 0.981627, 0.984808, 0.987688, 0.990268, 0.992546, 0.994522, 0.996195, 0.997564, 0.998630, 0.999391, 0.999848, 1.000000, 0.999848, 0.999391, 0.998630, 0.997564, 0.996195, 0.994522, 0.992546, 0.990268, 0.987688, 0.984808, 0.981627, 0.978148, 0.974370, 0.970296, 0.965926, 0.961262, 0.956305, 0.951057, 0.945519, 0.939693, 0.933580, 0.927184, 0.920505, 0.913545, 0.906308, 0.898794, 0.891007, 0.882948, 0.874620, 0.866025, 0.857167, 0.848048, 0.838671, 0.829038, 0.819152, 0.809017, 0.798636, 0.788011, 0.777146, 0.766044, 0.754710, 0.743145, 0.731354, 0.719340, 0.707107, 0.694658, 0.681998, 0.669131, 0.656059, 0.642788, 0.629320, 0.615661, 0.601815, 0.587785, 0.573576, 0.559193, 0.544639, 0.529919, 0.515038, 0.500000, 0.484810, 0.469472, 0.453990, 0.438371, 0.422618, 0.406737, 0.390731, 0.374607, 0.358368, 0.342020, 0.325568, 0.309017, 0.292372, 0.275637, 0.258819, 0.241922, 0.224951, 0.207912, 0.190809, 0.173648, 0.156434, 0.139173, 0.121869, 0.104528, 0.087156, 0.069756, 0.052336, 0.034899, 0.017452, 0.000000, -0.017452, -0.034899, -0.052336, -0.069756, -0.087156, -0.104528, -0.121869, -0.139173, -0.156434, -0.173648, -0.190809, -0.207912, -0.224951, -0.241922, -0.258819, -0.275637, -0.292372, -0.309017, -0.325568, -0.342020, -0.358368, -0.374607, -0.390731, -0.406737, -0.422618, -0.438371, -0.453990, -0.469472, -0.484810, -0.500000, -0.515038, -0.529919, -0.544639, -0.559193, -0.573576, -0.587785, -0.601815, -0.615661, -0.629320, -0.642788, -0.656059, -0.669131, -0.681998, -0.694658, -0.707107, -0.719340, -0.731354, -0.743145, -0.754710, -0.766044, -0.777146, -0.788011, -0.798636, -0.809017, -0.819152, -0.829038, -0.838671, -0.848048, -0.857167, -0.866025, -0.874620, -0.882948, -0.891007, -0.898794, -0.906308, -0.913545, -0.920505, -0.927184, -0.933580, -0.939693, -0.945519, -0.951057, -0.956305, -0.961262, -0.965926, -0.970296, -0.974370, -0.978148, -0.981627, -0.984808, -0.987688, -0.990268, -0.992546, -0.994522, -0.996195, -0.997564, -0.998630, -0.999391, -0.999848, -1.000000, -0.999848, -0.999391, -0.998630, -0.997564, -0.996195, -0.994522, -0.992546, -0.990268, -0.987688, -0.984808, -0.981627, -0.978148, -0.974370, -0.970296, -0.965926, -0.961262, -0.956305, -0.951057, -0.945519, -0.939693, -0.933580, -0.927184, -0.920505, -0.913545, -0.906308, -0.898794, -0.891007, -0.882948, -0.874620, -0.866025, -0.857167, -0.848048, -0.838671, -0.829038, -0.819152, -0.809017, -0.798636, -0.788011, -0.777146, -0.766044, -0.754710, -0.743145, -0.731354, -0.719340, -0.707107, -0.694658, -0.681998, -0.669131, -0.656059, -0.642788, -0.629320, -0.615661, -0.601815, -0.587785, -0.573576, -0.559193, -0.544639, -0.529919, -0.515038, -0.500000, -0.484810, -0.469472, -0.453990, -0.438371, -0.422618, -0.406737, -0.390731, -0.374607, -0.358368, -0.342020, -0.325568, -0.309017, -0.292372, -0.275637, -0.258819, -0.241922, -0.224951, -0.207912, -0.190809, -0.173648, -0.156434, -0.139173, -0.121869, -0.104528, -0.087156, -0.069756, -0.052336, -0.034899, -0.017452, -0.000000];
        MathUtil.cosArr = [1.000000, 0.999848, 0.999391, 0.998630, 0.997564, 0.996195, 0.994522, 0.992546, 0.990268, 0.987688, 0.984808, 0.981627, 0.978148, 0.974370, 0.970296, 0.965926, 0.961262, 0.956305, 0.951057, 0.945519, 0.939693, 0.933580, 0.927184, 0.920505, 0.913545, 0.906308, 0.898794, 0.891007, 0.882948, 0.874620, 0.866025, 0.857167, 0.848048, 0.838671, 0.829038, 0.819152, 0.809017, 0.798636, 0.788011, 0.777146, 0.766044, 0.754710, 0.743145, 0.731354, 0.719340, 0.707107, 0.694658, 0.681998, 0.669131, 0.656059, 0.642788, 0.629320, 0.615661, 0.601815, 0.587785, 0.573576, 0.559193, 0.544639, 0.529919, 0.515038, 0.500000, 0.484810, 0.469472, 0.453990, 0.438371, 0.422618, 0.406737, 0.390731, 0.374607, 0.358368, 0.342020, 0.325568, 0.309017, 0.292372, 0.275637, 0.258819, 0.241922, 0.224951, 0.207912, 0.190809, 0.173648, 0.156434, 0.139173, 0.121869, 0.104528, 0.087156, 0.069756, 0.052336, 0.034899, 0.017452, 0.000000, -0.017452, -0.034899, -0.052336, -0.069756, -0.087156, -0.104528, -0.121869, -0.139173, -0.156434, -0.173648, -0.190809, -0.207912, -0.224951, -0.241922, -0.258819, -0.275637, -0.292372, -0.309017, -0.325568, -0.342020, -0.358368, -0.374607, -0.390731, -0.406737, -0.422618, -0.438371, -0.453990, -0.469472, -0.484810, -0.500000, -0.515038, -0.529919, -0.544639, -0.559193, -0.573576, -0.587785, -0.601815, -0.615661, -0.629320, -0.642788, -0.656059, -0.669131, -0.681998, -0.694658, -0.707107, -0.719340, -0.731354, -0.743145, -0.754710, -0.766044, -0.777146, -0.788011, -0.798636, -0.809017, -0.819152, -0.829038, -0.838671, -0.848048, -0.857167, -0.866025, -0.874620, -0.882948, -0.891007, -0.898794, -0.906308, -0.913545, -0.920505, -0.927184, -0.933580, -0.939693, -0.945519, -0.951057, -0.956305, -0.961262, -0.965926, -0.970296, -0.974370, -0.978148, -0.981627, -0.984808, -0.987688, -0.990268, -0.992546, -0.994522, -0.996195, -0.997564, -0.998630, -0.999391, -0.999848, -1.000000, -0.999848, -0.999391, -0.998630, -0.997564, -0.996195, -0.994522, -0.992546, -0.990268, -0.987688, -0.984808, -0.981627, -0.978148, -0.974370, -0.970296, -0.965926, -0.961262, -0.956305, -0.951057, -0.945519, -0.939693, -0.933580, -0.927184, -0.920505, -0.913545, -0.906308, -0.898794, -0.891007, -0.882948, -0.874620, -0.866025, -0.857167, -0.848048, -0.838671, -0.829038, -0.819152, -0.809017, -0.798636, -0.788011, -0.777146, -0.766044, -0.754710, -0.743145, -0.731354, -0.719340, -0.707107, -0.694658, -0.681998, -0.669131, -0.656059, -0.642788, -0.629320, -0.615661, -0.601815, -0.587785, -0.573576, -0.559193, -0.544639, -0.529919, -0.515038, -0.500000, -0.484810, -0.469472, -0.453990, -0.438371, -0.422618, -0.406737, -0.390731, -0.374607, -0.358368, -0.342020, -0.325568, -0.309017, -0.292372, -0.275637, -0.258819, -0.241922, -0.224951, -0.207912, -0.190809, -0.173648, -0.156434, -0.139173, -0.121869, -0.104528, -0.087156, -0.069756, -0.052336, -0.034899, -0.017452, -0.000000, 0.017452, 0.034899, 0.052336, 0.069756, 0.087156, 0.104528, 0.121869, 0.139173, 0.156434, 0.173648, 0.190809, 0.207912, 0.224951, 0.241922, 0.258819, 0.275637, 0.292372, 0.309017, 0.325568, 0.342020, 0.358368, 0.374607, 0.390731, 0.406737, 0.422618, 0.438371, 0.453990, 0.469472, 0.484810, 0.500000, 0.515038, 0.529919, 0.544639, 0.559193, 0.573576, 0.587785, 0.601815, 0.615661, 0.629320, 0.642788, 0.656059, 0.669131, 0.681998, 0.694658, 0.707107, 0.719340, 0.731354, 0.743145, 0.754710, 0.766044, 0.777146, 0.788011, 0.798636, 0.809017, 0.819152, 0.829038, 0.838671, 0.848048, 0.857167, 0.866025, 0.874620, 0.882948, 0.891007, 0.898794, 0.906308, 0.913545, 0.920505, 0.927184, 0.933580, 0.939693, 0.945519, 0.951057, 0.956305, 0.961262, 0.965926, 0.970296, 0.974370, 0.978148, 0.981627, 0.984808, 0.987688, 0.990268, 0.992546, 0.994522, 0.996195, 0.997564, 0.998630, 0.999391, 0.999848, 1.000000];
        return MathUtil;
    }());
    game.MathUtil = MathUtil;
    __reflect(MathUtil.prototype, "game.MathUtil");
})(game || (game = {}));
var game;
(function (game) {
    var Md5Tool = /** @class */ (function () {
        function Md5Tool() {
            this.hexcase = 0;
            /* hex output format. 0 - lowercase; 1 - uppercase        */
            this.b64pad = "";
        }
        Md5Tool.ins = function () {
            if (this._instance == null) {
                this._instance = new Md5Tool();
            }
            return this._instance;
        };
        /* base-64 pad character. "=" for strict RFC compliance   */
        /*
        * These are the privates you'll usually want to call
        * They take string arguments and return either hex or base-64 encoded strings
        */
        Md5Tool.prototype.hex_md5 = function (s) {
            return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s)));
        }; //这个函数就行了，
        Md5Tool.prototype.b64_md5 = function (s) {
            return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s)));
        };
        Md5Tool.prototype.any_md5 = function (s, e) {
            return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e);
        };
        Md5Tool.prototype.hex_hmac_md5 = function (k, d) {
            return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
        };
        Md5Tool.prototype.b64_hmac_md5 = function (k, d) {
            return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
        };
        Md5Tool.prototype.any_hmac_md5 = function (k, d, e) {
            return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e);
        };
        /*
        * Perform a simple self-test to see if the VM is working
        */
        Md5Tool.prototype.md5_vm_test = function () {
            return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
        };
        /*
        * Calculate the MD5 of a raw string
        */
        Md5Tool.prototype.rstr_md5 = function (s) {
            return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
        };
        /*
        * Calculate the HMAC-MD5, of a key and some data (raw strings)
        */
        Md5Tool.prototype.rstr_hmac_md5 = function (key, data) {
            var bkey = this.rstr2binl(key);
            if (bkey.length > 16)
                bkey = this.binl_md5(bkey, key.length * 8);
            var ipad = Array(16), opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }
            var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
            return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
        };
        /*
        * Convert a raw string to a hex string
        */
        Md5Tool.prototype.rstr2hex = function (input) {
            try {
                this.hexcase;
            }
            catch (e) {
                this.hexcase = 0;
            }
            var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var output = "";
            var x;
            for (var i = 0; i < input.length; i++) {
                x = input.charCodeAt(i);
                output += hex_tab.charAt((x >>> 4) & 0x0F)
                    + hex_tab.charAt(x & 0x0F);
            }
            return output;
        };
        /*
        * Convert a raw string to a base-64 string
        */
        Md5Tool.prototype.rstr2b64 = function (input) {
            try {
                this.b64pad;
            }
            catch (e) {
                this.b64pad = '';
            }
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var output = "";
            var len = input.length;
            for (var i = 0; i < len; i += 3) {
                var triplet = (input.charCodeAt(i) << 16)
                    | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                    | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > input.length * 8)
                        output += this.b64pad;
                    else
                        output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
                }
            }
            return output;
        };
        /*
        * Convert a raw string to an arbitrary string encoding
        */
        Md5Tool.prototype.rstr2any = function (input, encoding) {
            var divisor = encoding.length;
            var i, j, q, x, quotient;
            /* Convert to an array of 16-bit big-endian values, forming the dividend */
            var dividend = Array(Math.ceil(input.length / 2));
            for (i = 0; i < dividend.length; i++) {
                dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
            }
            /*
            * Repeatedly perform a long division. The binary array forms the dividend,
            * the length of the encoding is the divisor. Once computed, the quotient
            * forms the dividend for the next step. All remainders are stored for later
            * use.
            */
            var full_length = Math.ceil(input.length * 8 /
                (Math.log(encoding.length) / Math.log(2)));
            var remainders = Array(full_length);
            for (j = 0; j < full_length; j++) {
                quotient = Array();
                x = 0;
                for (i = 0; i < dividend.length; i++) {
                    x = (x << 16) + dividend[i];
                    q = Math.floor(x / divisor);
                    x -= q * divisor;
                    if (quotient.length > 0 || q > 0)
                        quotient[quotient.length] = q;
                }
                remainders[j] = x;
                dividend = quotient;
            }
            /* Convert the remainders to the output string */
            var output = "";
            for (i = remainders.length - 1; i >= 0; i--)
                output += encoding.charAt(remainders[i]);
            return output;
        };
        /*
        * Encode a string as utf-8.
        * For efficiency, this assumes the input is valid utf-16.
        */
        Md5Tool.prototype.str2rstr_utf8 = function (input) {
            var output = "";
            var i = -1;
            var x, y;
            while (++i < input.length) {
                /* Decode utf-16 surrogate pairs */
                x = input.charCodeAt(i);
                y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                    x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                    i++;
                }
                /* Encode output as utf-8 */
                if (x <= 0x7F)
                    output += String.fromCharCode(x);
                else if (x <= 0x7FF)
                    output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
                else if (x <= 0xFFFF)
                    output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
                else if (x <= 0x1FFFFF)
                    output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            }
            return output;
        };
        /*
        * Encode a string as utf-16
        */
        Md5Tool.prototype.str2rstr_utf16le = function (input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
            return output;
        };
        Md5Tool.prototype.str2rstr_utf16be = function (input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
            return output;
        };
        /*
        * Convert a raw string to an array of little-endian words
        * Characters >255 have their high-byte silently ignored.
        */
        Md5Tool.prototype.rstr2binl = function (input) {
            var output = Array(input.length >> 2);
            for (var i = 0; i < output.length; i++)
                output[i] = 0;
            for (var i = 0; i < input.length * 8; i += 8)
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
            return output;
        };
        /*
        * Convert an array of little-endian words to a string
        */
        Md5Tool.prototype.binl2rstr = function (input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8)
                output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
            return output;
        };
        /*
        * Calculate the MD5 of an array of little-endian words, and a bit length.
        */
        Md5Tool.prototype.binl_md5 = function (x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = this.safe_add(a, olda);
                b = this.safe_add(b, oldb);
                c = this.safe_add(c, oldc);
                d = this.safe_add(d, oldd);
            }
            return [a, b, c, d];
        };
        /*
        * These privates implement the four basic operations the algorithm uses.
        */
        Md5Tool.prototype.md5_cmn = function (q, a, b, x, s, t) {
            return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
        };
        Md5Tool.prototype.md5_ff = function (a, b, c, d, x, s, t) {
            return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        };
        Md5Tool.prototype.md5_gg = function (a, b, c, d, x, s, t) {
            return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        };
        Md5Tool.prototype.md5_hh = function (a, b, c, d, x, s, t) {
            return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
        };
        Md5Tool.prototype.md5_ii = function (a, b, c, d, x, s, t) {
            return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        };
        /*
        * Add integers, wrapping at 2^32. This uses 16-bit operations internally
        * to work around bugs in some JS interpreters.
        */
        Md5Tool.prototype.safe_add = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };
        /*
        * Bitwise rotate a 32-bit number to the left.
        */
        Md5Tool.prototype.bit_rol = function (num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        };
        return Md5Tool;
    }());
    game.Md5Tool = Md5Tool;
    __reflect(Md5Tool.prototype, "game.Md5Tool");
})(game || (game = {}));
var game;
(function (game) {
    var Point = egret.Point;
    var Pool = base.Pool;
    var PointUtil = /** @class */ (function () {
        function PointUtil() {
        }
        PointUtil.distance = function (x0, y0, x1, y1) {
            var dx = (x0 - x1);
            var dy = (y0 - y1);
            return Math.sqrt(dx * dx + dy * dy);
        };
        PointUtil.distancePt = function (p0, p1) {
            return Math.sqrt(this.distanceSquare(p0.x, p0.y, p1.x, p1.y));
        };
        PointUtil.distance1 = function (p0, x1, y1) {
            return Math.sqrt(this.distanceSquare(p0.x, p0.y, x1, y1));
        };
        PointUtil.distanceSquare = function (x0, y0, x1, y1) {
            var dx = x0 - x1;
            var dy = y0 - y1;
            return dx * dx + dy * dy;
        };
        PointUtil.distanceSquarePt = function (p0, p1) {
            return this.distanceSquare(p0.x, p0.y, p1.x, p1.y);
        };
        PointUtil.distanceSquare1 = function (p0, x1, y1) {
            return this.distanceSquare(p0.x, p0.y, x1, y1);
        };
        PointUtil.getDistPt = function (fromPt, radians, dist, res) {
            res = res || Pool.alloc(Point);
            dist = +dist | 0;
            var tx = Math.cos(radians) * dist;
            var ty = Math.sin(radians) * dist;
            res.x = fromPt.x + tx;
            res.y = fromPt.y + ty;
            return res;
        };
        /**
         * 获取从pt0 到距离pt1 dist距离的点，pt0起点，pt1终点
         * @param {egret.Point} pt0
         * @param {egret.Point} pt1
         * @param {number} dist
         * @param {egret.Point} res
         * @return {egret.Point}
         */
        PointUtil.getDistPt2 = function (pt0, pt1, dist, res) {
            res = res || Pool.alloc(Point);
            dist = +dist | 0;
            var dis = this.distancePt(pt0, pt1);
            if (dis < dist) {
                res.setTo(pt0.x, pt0.y);
                return res;
            }
            var p = 1 - dist / dis;
            res.setTo(pt0.x + (pt1.x - pt0.x) * p, pt0.y + (pt1.y - pt0.y) * p);
            return res;
        };
        PointUtil.anglePt = function (sPt, ePt) {
            return this.angle(sPt.x, sPt.y, ePt.x, ePt.y);
        };
        PointUtil.angle1 = function (sx, sy, ePt) {
            return this.angle(sx, sy, ePt.x, ePt.y);
        };
        PointUtil.angle = function (sx, sy, ex, ey) {
            var a = Math.atan2(ey - sy, ex - sx);
            return a >= 0 ? a : 2 * Math.PI + a;
        };
        /**坐标转换 某个点转到某个层的坐标  local
         *
         * @param localPos 通过接口 localToGlobal 获得
         * @param layer 需要转到该对象的坐标系统
         */
        PointUtil.switchLocalPos = function (localPos, layer) {
            return layer.globalToLocal(localPos.x, localPos.y);
        };
        /**坐标转换 某个点转到某个层的坐标  local
         *
         * @param localNode 节点对象
         * @param layer 需要转到该对象的坐标系统
         */
        PointUtil.switchLocalPos2 = function (localNode, layer) {
            var pos = localNode.localToGlobal();
            return layer.globalToLocal(pos.x, pos.y);
        };
        return PointUtil;
    }());
    game.PointUtil = PointUtil;
    __reflect(PointUtil.prototype, "game.PointUtil");
})(game || (game = {}));
var game;
(function (game) {
    var ResUtil = /** @class */ (function () {
        function ResUtil() {
        }
        /**********************地图*********************/
        ResUtil.getMapMaskUrl = function (mapId) {
            return "assets/map/" + mapId + "/mask.bin";
        };
        ResUtil.getMapBlurUrl = function (mapId) {
            return "assets/map/" + mapId + "/blur/blur.jpg";
        };
        /**********************字体*********************/
        ResUtil.getFontUrl = function (name) {
            return "assets/font/" + name;
        };
        /**********************Ui字体*********************/
        ResUtil.getFontUiUrl = function (name) {
            return "assets/font_ui/" + name;
        };
        /**********************特效*********************/
        ResUtil.getEffectUI = function (src) {
            return "assets/ui_effect/" + src;
        };
        ResUtil.getSkillEftUrl = function (id) {
            return "assets/anim/effect/" + id;
        };
        ResUtil.getSkillEftSubUrl = function (id, sub) {
            return "assets/anim/effect/" + id + "_" + sub;
        };
        ResUtil.getGroupEftUrl = function (id) {
            return "assets/data_effect/" + id + ".json";
        };
        /**********************声音*********************/
        ResUtil.getSoundUrl = function (name) {
            return "assets/sound/" + name; // 这里不加扩展名
        };
        /**
         * 技能提示图片
         * @param {string} name
         * @returns {string}
         */
        ResUtil.getSkillEffectSrc = function (name) {
            return "assets/skill_effect/" + name + ".png";
        };
        /************************新的资源获取*****************************/
        ResUtil.getMapBmpUrl = function (mapId, c, r) {
            return "assets/map/" + mapId + "/pic/" + c + "_" + r + ".jpg";
        };
        /**
         * 获取道具品质底
         * @param quality
         * @param isHex 是否是六边形品质框
         */
        ResUtil.getPropQualityImg = function (quality, isHex) {
            if (isHex) {
                return "daojupinzhikuang_" + quality;
            }
            return "icon_quality_" + quality;
        };
        /**获取道具图标*/
        ResUtil.getUiProp = function (des, isGray) {
            if (des == null) {
                return null;
            }
            var str;
            if (typeof des == "string") {
                str = des;
            }
            else {
                if (des.icon == null) {
                    console.error("缺少道具图标" + des.index);
                    return null;
                }
                var _type = game.PropData.getPropParse(des.index, 1 /* Type */);
                //todo
                if (_type == 405 /* Body */) {
                    var _sex = game.RoleVo.ins.sex || 1;
                    str = des.icon + "_" + _sex;
                }
                else {
                    str = des.icon;
                }
            }
            var garyStr = isGray ? "_gray" : "";
            if (str.indexOf("sz_") != -1) {
                return str + "_" + gso.roleSex + garyStr;
            }
            else {
                return str + garyStr;
            }
        };
        /**
         * 获取转生字体资源
         * @param index，转生index
         * @param withoutChong，不显示重数
         */
        ResUtil.getRebirthFontStr = function (index, withoutChong) {
            var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, index);
            if (!cfg || !cfg.relv) {
                return "xtq"; //默认显示先天期
            }
            var fontStr = "";
            var zhuanLv = cfg.relv;
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
            var zhuanStr = zhuanLv + '';
            if (zhuanLv >= game.RebirthMaxLv) {
                fontStr += "r"; //仙人
                zhuanStr = (zhuanLv - game.RebirthMaxLv + 1) + '';
            }
            fontStr += zhuanStr + "z";
            if (!withoutChong) {
                //显示重数
                var chongLv = cfg.relv2;
                fontStr += chongLv + "c";
            }
            return fontStr;
        };
        /**
         * 获取中文字体资源
         * @param stage,等级之类的数值
         */
        ResUtil.getChineseFontStr = function (stage) {
            var stageStr = "";
            if (!stage) {
                stageStr = game.StringUtil.ChineseNum[stage];
            }
            else {
                var stageTen = Math.floor(stage / 10); //计算十位数
                stageStr = stageTen == 0 ? "" : (stageTen == 1 ? "0" : stageTen + "0");
                if (stage % 10 > 0) {
                    stageStr += stage % 10; //加上个位数
                }
            }
            return stageStr;
        };
        ResUtil.getTitleSrc = function (idx, star) {
            if (star === void 0) { star = 0; }
            var cfg = game.getConfigByNameId("title.json" /* Title */, idx);
            if (!cfg) {
                console.error("称号取不到配置：", idx);
                return "";
            }
            var isEft = cfg.eft_star > 0 && star >= cfg.eft_star;
            return "assets/title/" + cfg.resource + (isEft ? "_1" : "");
        };
        //获取装扮相关资源
        ResUtil.getDressUpIcon = function (str, sex) {
            if (typeof str == "number") {
                var idx = str;
                var cfg = game.getConfigById(idx);
                if (!cfg || cfg.resource == undefined)
                    return "";
                str = cfg.resource;
                if (cfg.minute && cfg.minute == 1) {
                    str += "_" + (sex || 1);
                }
            }
            return str;
        };
        ResUtil.getUiPng = function (src) {
            if (!src) {
                return '';
            }
            return "assets/ui_png/" + src + ".png";
        };
        ResUtil.getUiJpg = function (name) {
            if (!name) {
                return '';
            }
            return "assets/ui_jpg/" + name + ".jpg";
        };
        /**
         * 获取品质底图
         * @param quality 品质，技能品质底默认品质5红色
         */
        ResUtil.getBgQuality = function (quality) {
            if (quality === void 0) { quality = 4 /* RED */; }
            return this.getUiPng("p1_bg_quality_" + quality);
        };
        /**
         * 获取SR角标
         * @param quality 品质
         * @param specialQuality 特殊品质（黄玄地天）优先级更高
         */
        ResUtil.getSrQuality = function (quality, specialQuality) {
            if (specialQuality != undefined) {
                return "avatarspecialquality" + specialQuality;
            }
            return "avatarquality" + quality;
        };
        /**
         * 获取品质底图
         * @param quality 品质
         * @param specialQuality 特殊品质（黄玄地天）优先级更高
         */
        ResUtil.getBigBg = function (quality, specialQuality) {
            if (specialQuality != undefined) {
                var qua = game.SpecialQuality[specialQuality];
                return "avatardi" + qua;
            }
            return "avatardi" + quality;
        };
        /**
         * 获取品质边框
         * @param quality 品质
         * @param specialQuality 特殊品质（黄玄地天）优先级更高
         */
        ResUtil.getBigFrame = function (quality, specialQuality) {
            if (specialQuality != undefined) {
                var qua = game.SpecialQuality[specialQuality];
                return "avatarkuang" + qua;
            }
            return "avatarkuang" + quality;
        };
        /**
         * 获取大图标
         * @param icon string
         */
        ResUtil.getBigIcon = function (icon) {
            return "big_" + icon;
        };
        //表情
        ResUtil.getUiFace = function (name) {
            return "face_" + name;
        };
        /**
         * 获取模型资源数据，用于界面模型显示，玩家自己的数据
         * @param index 外显index
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认false
         * @param isWeapon 是否是武器，默认false
         */
        ResUtil.getSurfaceData = function (index, dir, act, isUi, isWeapon) {
            if (isUi === void 0) { isUi = false; }
            if (isWeapon === void 0) { isWeapon = false; }
            var data = {};
            data.index = index;
            data.url = this.getModelUrl(index, dir, act, isUi, game.RoleVo.ins.sex, true, isWeapon);
            var cfg = game.getConfigById(index);
            data.scale = cfg.scale ? cfg.scale / 10000 : 1; //缩放，5表示0.5
            var type = game.PropData.getPropParse(index, 1 /* Type */);
            switch (type) {
                case 360 /* Horse */:
                    data.y = -120; //需要设置偏移量，缩放大小的模型，一般不处理
                    break;
                case 640 /* Tianshen */:
                    data.y = -50; //需要设置偏移量，缩放大小的模型，一般不处理
                    break;
            }
            return data;
        };
        /**
         * 获取模型动作资源，如：assets\anim\body\female_01\atk1_2
         * */
        ResUtil.getModelUrl = function (index, dir, act, isUi, sex, isSingle, isWeapon) {
            if (isUi === void 0) { isUi = false; }
            if (sex === void 0) { sex = 1 /* Male */; }
            if (isSingle === void 0) { isSingle = false; }
            if (isWeapon === void 0) { isWeapon = false; }
            var type = game.PropData.getPropParse(index, 1 /* Type */);
            var modelName = this.getModelName(index, sex, isSingle);
            return this.getModelUrlByModelName(type, modelName, dir, act, isUi, isWeapon);
        };
        /**
         * 获取模型名称，如：female_01
         * @param index
         * @param sex 默认Sex.Male
         * @param isSingle 翅膀和神兵模型区分UI显示 默认false
         * @param shenlingEvolve 神灵进化次数，默认0
         */
        ResUtil.getModelName = function (index, sex, isSingle, shenlingEvolve) {
            if (sex === void 0) { sex = 1 /* Male */; }
            if (isSingle === void 0) { isSingle = false; }
            if (shenlingEvolve === void 0) { shenlingEvolve = 0; }
            if (!index) {
                return null;
            }
            var type = game.PropData.getPropParse(index, 1 /* Type */);
            var cfg = game.getConfigById(index);
            if (!cfg) {
                console.error("外显配置错误，配置index：", index);
                return null;
            }
            var modelName = cfg.icon; //模型名称
            if (type == 404 /* Wing */ || type == 403 /* Weapon */) {
                //翅膀和神兵模型区分UI显示
                if (isSingle) {
                    var strArr = modelName.split("_");
                    modelName = strArr[0] + "_ui_" + strArr[1];
                }
            }
            else if (type == 405 /* Body */) {
                //时装模型区分男女
                var strArr = modelName.split("_");
                modelName = (sex == 1 /* Male */ ? "male_" : "female_") + strArr[1];
            }
            else if (type == 400 /* Shenling */) {
                //进化神灵或者女仆的神灵幻化等级
                if (shenlingEvolve) {
                    var icons = cfg.icons.split(',') || [];
                    shenlingEvolve = Math.max(0, shenlingEvolve - 1); //需要自减一次
                    modelName = icons[shenlingEvolve];
                    if (!modelName) {
                        modelName = cfg.icon;
                    }
                }
            }
            return modelName;
        };
        /**
         * 通过外显表头，模型名称获取模型动作资源，如：assets\anim\body\female_01\atk1_2
         * */
        ResUtil.getModelUrlByModelName = function (headType, modelName, dir, act, isUi, isWeapon) {
            if (isUi === void 0) { isUi = false; }
            if (isWeapon === void 0) { isWeapon = false; }
            if (!modelName) {
                return null;
            }
            if (isWeapon && headType == 409 /* Huashen */) {
                headType = 9902 /* Huashen2 */; //化神武器部位
            }
            var surfaceStr = game.SurfaceConfigList[headType];
            var modelAct = this.getModelAct(dir, act, isUi);
            return "assets/anim/" + surfaceStr + "/" + modelName + "/" + modelAct;
        };
        /**
         * 获取模型动作资源，如：atk1_2
         * */
        ResUtil.getModelAct = function (dir, act, isUi) {
            if (isUi === void 0) { isUi = false; }
            var ui = isUi ? "ui_" : "";
            if (!isUi) {
                dir = game.MirDirFor3[dir] || dir; //模型映射
            }
            return ui + act + "_" + dir;
        };
        /**
         * 获取战队旗帜
         */
        ResUtil.getZhanduiFlag = function (index) {
            return "zhandui_flag" + index;
        };
        /**
         * 技能展示类型
         * @param skillId
         */
        ResUtil.getSkillShowType = function (skillId) {
            var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
            if (cfg && cfg.show_type) {
                return "jineng_show_type_" + cfg.show_type;
            }
            return '';
        };
        /**
         * 戒指外显突破
         * @param id 戒指id
         */
        ResUtil.getRingSrc = function (id) {
            var cfg = game.getConfigById(id);
            if (!cfg) {
                return '';
            }
            return 'assets/ring/' + cfg.icon + '.png';
        };
        /**
         *兽印外显突破
         * @param id 兽印id
         */
        ResUtil.getShouyinSrc = function (id) {
            var cfg = game.getConfigById(id);
            if (!cfg) {
                return '';
            }
            return 'assets/shouyin/' + cfg.icon + '.png';
        };
        return ResUtil;
    }());
    game.ResUtil = ResUtil;
    __reflect(ResUtil.prototype, "game.ResUtil");
})(game || (game = {}));
var game;
(function (game) {
    var SortTools = /** @class */ (function () {
        function SortTools() {
        }
        /**排序任务*/
        SortTools.sortTask = function (a, b) {
            var idx1 = a.task_id;
            var idx2 = b.task_id;
            var aCfg = game.getConfigByNameId("main_task1.json" /* MainTask1 */, idx1);
            var aSort = aCfg ? aCfg.is_special : 0;
            var bCfg = game.getConfigByNameId("main_task1.json" /* MainTask1 */, idx2);
            var bSort = bCfg ? bCfg.is_special : 0;
            if (aSort != bSort) {
                return bSort - aSort; //特殊任务显示在首位
            }
            var aFinish = a.status == 1 /* Finish */ ? 1 : 0;
            var bFinish = b.status == 1 /* Finish */ ? 1 : 0;
            if (aFinish != bFinish) {
                return bFinish - aFinish;
            }
            var aDraw = a.status == 2 /* Draw */ ? 1 : 0;
            var bDraw = b.status == 2 /* Draw */ ? 1 : 0;
            if (aDraw != bDraw) {
                return aDraw - bDraw;
            }
            return idx1 - idx2;
        };
        /**通用道具排序*/
        SortTools.sortProp = function (a, b) {
            var aCfg = game.getConfigByNameId("bag_type.json" /* BagType */, a.bigType);
            var aSort = aCfg ? aCfg.sort : 0;
            var bCfg = game.getConfigByNameId("bag_type.json" /* BagType */, b.bigType);
            var bSort = bCfg ? bCfg.sort : 0;
            if (aSort != bSort) {
                return aSort - bSort;
            }
            var aQuality = a.quality;
            var bQuality = b.quality;
            if (aQuality != bQuality) {
                return bQuality - aQuality;
            }
            return a.index - b.index;
        };
        /**根据sort字段，从小到大排序，配置相关的跟策划约定好sort字段，从小到大排序*/
        SortTools.sortByRort = function (a, b) {
            return a.sort - b.sort;
        };
        /**默认从小到大排序*/
        SortTools.sortNum = function (a, b, type) {
            if (type === void 0) { type = 1 /* UPPER */; }
            if (type == 1 /* UPPER */) {
                return a - b;
            }
            return b - a;
        };
        /**
         * 排序 [{age:11}, {age:12}]
         * @param arr 要排序的数组
         * @param key 排序的key 比如 age
         * @param type 排序类型，默认从小到大
         */
        SortTools.sortMap = function (arr, key, type) {
            if (type === void 0) { type = 1 /* UPPER */; }
            arr.sort(function (a, b) {
                var aVal = a[key];
                var bVal = b[key];
                if (type == 1 /* UPPER */) {
                    if (aVal instanceof Long && bVal instanceof Long) {
                        return aVal.toNumber() - bVal.toNumber();
                    }
                    return aVal - bVal;
                }
                else {
                    if (aVal instanceof Long && bVal instanceof Long) {
                        return bVal.toNumber() - aVal.toNumber();
                    }
                    return b[key] - a[key];
                }
            });
        };
        /**
         * 奖励领取状态排序  （1可领取，0不可领取，2已领取）
         * @param arr 待排序的数组
         * @param key 排序的key，默认status
         */
        SortTools.sortReward = function (arr, key) {
            if (key === void 0) { key = 'status'; }
            arr.sort(function (a, b) {
                var aVal = a[key];
                var bVal = b[key];
                var aFinish = aVal == 1 ? 1 : 0;
                var bFinish = bVal == 1 ? 1 : 0;
                if (aFinish != bFinish) {
                    return bFinish - aFinish;
                }
                var aDraw = aVal == 2 ? 1 : 0;
                var bDraw = bVal == 2 ? 1 : 0;
                if (aDraw != bDraw) {
                    return aDraw - bDraw;
                }
                return aVal - bVal;
            });
        };
        /**排序好友*/
        SortTools.sortFriend = function (a, b) {
            var aOnline = a.is_online ? 1 : 0;
            var bOnline = b.is_online ? 1 : 0;
            if (aOnline != bOnline) {
                return bOnline - aOnline;
            }
            return b.time - a.time;
        };
        return SortTools;
    }());
    game.SortTools = SortTools;
    __reflect(SortTools.prototype, "game.SortTools");
})(game || (game = {}));
var game;
(function (game) {
    var HtmlTextParser = egret.HtmlTextParser;
    var DropShadowFilter = egret.DropShadowFilter;
    var TextUtil = /** @class */ (function () {
        function TextUtil() {
        }
        /**改变字体*/
        TextUtil.changeFont = function (content, font) {
            if (font === void 0) { font = null; }
            return "<font face='" + font + "'>" + content + "</font>";
        };
        /**
         * 返回对content，添加指定color的html文本
         */
        TextUtil.addColor = function (content, color, font) {
            if (font === void 0) { font = null; }
            var str = "<font color='" + color + "'>" + content + "</font>";
            if (!font) {
                return str;
            }
            return this.changeFont(str, font);
        };
        /**
         *
         * @param str
         * @param isWhite 是否是白底颜色
         */
        TextUtil.parseHtml = function (str, isWhite) {
            if (isWhite === void 0) { isWhite = false; }
            if (!str)
                str = "";
            if (str.indexOf("#") > -1) {
                str = game.StringUtil.replaceColorCode(str, isWhite);
            }
            return this._htmlParser.parse(str);
        };
        /**
         * 参数指定的带有link的文本,带下划线
         * @param content 文本
         * @param color 字体颜色
         * @param event 事件，不设置的话为null
         * @param font 需要改变的字体
         */
        TextUtil.addLinkHtmlTxt = function (content, color, event, font) {
            if (color === void 0) { color = null; }
            if (event === void 0) { event = null; }
            if (font === void 0) { font = null; }
            var str;
            if (event == null) {
                str = "<font color='" + color + "' ><u>" + content + "</u></font>";
            }
            else {
                str = "<a href='event:" + event + "'><font color='" + color + "' ><u>" + content + "</u></font></a>";
            }
            if (!font) {
                return str;
            }
            return this.changeFont(str, font);
        };
        /**
         * 参数指定的带有link的文本,带下划线和描边
         * @param label 标签
         * @param content 文本
         * @param color 字体颜色
         * @param event 事件，不设置的话为null
         * @param font 需要改变的字体
         */
        TextUtil.addLinkHtmlTxt2 = function (label, content, color, event, font) {
            if (color === void 0) { color = null; }
            if (event === void 0) { event = null; }
            if (font === void 0) { font = null; }
            label.textFlow = this.parseHtml(this.addLinkHtmlTxt(content, color, event, font));
            var filter = new DropShadowFilter(0, 0, 0x000000, 1, 2, 2, 3);
            label.filters = [filter];
            return label;
        };
        /**
         * 计算属性，基础属性*数量
         * @param {attributes} attr，基础属性
         * @param {number} num，数量
         * @returns {attributes}
         */
        TextUtil.calcAttr = function (attr, num) {
            var newAttr = new msg.attributes();
            if (!attr) {
                return newAttr;
            }
            var keys = Object.keys(attr);
            for (var i = 0, len = keys.length; i < len; i++) {
                var attrKey = keys[i];
                var addVal = attr[attrKey];
                if (typeof addVal == "number") {
                    newAttr[attrKey] = addVal * num;
                }
                else {
                    newAttr[attrKey] = addVal.multiply(num);
                }
            }
            return newAttr;
        };
        /**
         * 计算属性，多个属性相加
         * @param {attributes[]} attrList，属性列表
         * @returns {attributes}
         */
        TextUtil.calcAttrList = function (attrList) {
            var newAttr = new msg.attributes();
            if (!attrList || !attrList.length) {
                return newAttr;
            }
            for (var _i = 0, attrList_1 = attrList; _i < attrList_1.length; _i++) {
                var attr = attrList_1[_i];
                if (!attr) {
                    continue;
                }
                var keys = Object.keys(attr);
                for (var i = 0, len = keys.length; i < len; i++) {
                    var attrKey = keys[i];
                    var addVal = attr[attrKey];
                    var curVal = newAttr[attrKey];
                    if (curVal) {
                        if (typeof curVal == "number") {
                            newAttr[attrKey] = curVal + addVal;
                        }
                        else {
                            newAttr[attrKey] = curVal.add(addVal);
                        }
                    }
                    else {
                        newAttr[attrKey] = addVal;
                    }
                }
            }
            return newAttr;
        };
        /**
         * 获取属性表有用的属性字段，排序后的字段
         * @param {attributes} attr
         * @returns {string[]}
         */
        TextUtil.getAttrOrderKeys = function (attr) {
            var res = [];
            if (!attr)
                return res;
            var keys = Object.keys(attr);
            var tmpCfgList = [];
            for (var i = 0, len = keys.length; i < len; i++) {
                var attrKey = keys[i];
                var cfg = game.getConfigByNameId("fightpower.json" /* Fightpower */, attrKey);
                if (!cfg || cfg.ishide) {
                    continue;
                }
                tmpCfgList.push(cfg);
            }
            tmpCfgList.sort(game.SortTools.sortByRort);
            for (var _i = 0, tmpCfgList_1 = tmpCfgList; _i < tmpCfgList_1.length; _i++) {
                var cfg = tmpCfgList_1[_i];
                res.push(cfg.index);
            }
            return res;
        };
        /**
         * 获取属性字段文本，atk：攻击
         * @param {string} key
         * @returns {string}
         */
        TextUtil.getAttrsText = function (key) {
            if (key == "cd" /* cd */) {
                return game.getLanById("tishi_15" /* tishi_15 */);
            }
            var cfg = game.getConfigByNameId("fightpower.json" /* Fightpower */, key);
            return cfg.content;
        };
        /**
         * 转换属性值
         * @param {string} key
         * @param {number | Long} value
         * @param fractionDigits 假如有小数保留多少位
         * @returns {string}
         */
        TextUtil.getAttrsPerCent = function (key, value, fractionDigits) {
            if (fractionDigits === void 0) { fractionDigits = 1; }
            var vStr;
            var cfg = game.getConfigByNameId("fightpower.json" /* Fightpower */, key);
            if (cfg.isfloat) {
                if (typeof value == "number") {
                    vStr = (value / 100).toFixed(fractionDigits) + "%";
                }
                else {
                    vStr = value.div(100) + "%";
                }
            }
            else {
                vStr = value.toString();
            }
            return vStr;
        };
        /**
         * 获取属性文本显示
         * * @param attr 属性
         * * @param color 颜色，默认白底绿色
         * * @param endStr 结束文本，默认换行
         * * @param joinStr 中间文本，默认：
         * * @param attrVal 替换显示的属性值，用于显示0属性用
         * * @param attrStr 替换显示的属性文本，用于只显示属性值用
         */
        TextUtil.getAttrText = function (attr, color, endStr, joinStr, attrVal, attrStr) {
            if (color === void 0) { color = 2330156 /* GREEN */; }
            if (endStr === void 0) { endStr = "\n"; }
            if (joinStr === void 0) { joinStr = ": "; }
            var txt = "";
            if (!attr) {
                return txt;
            }
            var keys = this.getAttrOrderKeys(attr);
            for (var i = 0, len = keys.length; i < len; i++) {
                var k = keys[i];
                var a = attrStr != undefined ? attrStr : TextUtil.getAttrsText(k);
                var val = attrVal != undefined ? attrVal : attr[k];
                var v = TextUtil.getAttrsPerCent(k, val);
                if (joinStr.indexOf("+") > -1) {
                    txt += a + TextUtil.addColor(joinStr + v, color) + (i < len - 1 ? endStr : "");
                }
                else {
                    txt += a + joinStr + TextUtil.addColor("" + v, color) + (i < len - 1 ? endStr : "");
                }
            }
            return txt;
        };
        /**
         * 获取属性文本显示，+号
         * * @param attr 属性
         * * @param color 颜色，默认白底绿色
         * * @param endStr 结束文本，默认换行
         * * @param joinStr 中间文本，默认 +
         * * @param attrVal 替换显示的属性值，用于显示0属性用
         * * @param attrStr 替换显示的属性文本，用于只显示属性值用
         */
        TextUtil.getAttrTextAdd = function (attr, color, endStr, joinStr, attrVal, attrStr) {
            if (color === void 0) { color = 2330156 /* GREEN */; }
            if (endStr === void 0) { endStr = "\n"; }
            if (joinStr === void 0) { joinStr = " +"; }
            return this.getAttrText(attr, color, endStr, joinStr, attrVal, attrStr);
        };
        /**
         * 获取属性文本显示列表
         * * @param attr 属性
         * * @param color 颜色，默认白底绿色
         * * @param endStr 结束文本，默认换行
         * * @param joinStr 中间文本，默认：
         * * @param defaultColor 文本默认颜色
         */
        TextUtil.getAttrTextInfos = function (attr, color, endStr, joinStr, defaultColor) {
            if (color === void 0) { color = 2330156 /* GREEN */; }
            if (endStr === void 0) { endStr = "\n"; }
            if (joinStr === void 0) { joinStr = ": "; }
            var attrStr = this.getAttrText(attr, color, endStr, joinStr);
            if (!attrStr) {
                return [];
            }
            var infos = attrStr.split("\n");
            var tmpInfos = infos;
            if (defaultColor) {
                tmpInfos = [];
                for (var _i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
                    var info = infos_1[_i];
                    tmpInfos.push(TextUtil.addColor(info, defaultColor));
                }
            }
            return tmpInfos;
        };
        /**
         * 获取主动技能描述
         * @param cfg 技能配置
         * @param lv 技能等级
         * @param showZero 是否显示0级技能，默认是没有0级技能的
         * @param lvDesc 直接取等级描述
         */
        TextUtil.getSkillDesc = function (cfg, lv, showZero, lvDesc) {
            var desc = cfg.describe;
            var index = lv || showZero ? cfg.index + lv : cfg.index + 1; //0级技能也可以显示
            var lvCfg = game.getConfigByNameId("skill_level.json" /* SkillLv */, index);
            if (lvCfg) {
                if (lvDesc) {
                    return lvCfg.describe; //直接返回技能等级描述
                }
                var param1 = lvCfg.skill_coefs && lvCfg.skill_coefs.length ? Math.floor(lvCfg.skill_coefs[0] / 100) : 0;
                if (param1) {
                    desc = game.StringUtil.substitute(desc, [param1]);
                }
                var param2 = lvCfg.fixdma_show && lvCfg.fixdma_show.length ? lvCfg.fixdma_show[0] : 0;
                if (param2) {
                    desc = game.StringUtil.substitute(desc, [param2]);
                }
            }
            return desc;
        };
        /**
         * 获取技能属性描述
         * * @param baseAttr 基础属性
         * * @param attr 服务端下发的属性
         * * @param replaceStr 需要替换显示的属性文本
         */
        TextUtil.getSkillListDesc = function (baseAttr, attr, replaceStr) {
            if (attr) {
                /**计算属性*/
                for (var k in baseAttr) {
                    if (!attr.hasOwnProperty(k)) {
                        continue;
                    }
                    var val = k == "cd" /* cd */ ? baseAttr[k] * Math.max((1 - Math.floor(attr[k] / 10000)), 0) : attr[k]; //自己减去cd
                    baseAttr[k] = val;
                }
            }
            var infos = [];
            for (var k in baseAttr) {
                if (!baseAttr.hasOwnProperty(k)) {
                    continue;
                }
                var val = baseAttr[k];
                var aStr = this.getAttrsText(k);
                if (replaceStr) {
                    for (var _i = 0, replaceStr_1 = replaceStr; _i < replaceStr_1.length; _i++) {
                        var info = replaceStr_1[_i];
                        if (info.key == k) {
                            aStr = info.aStr;
                            break;
                        }
                    }
                }
                var vStr = void 0;
                if (k == "cd" /* cd */) {
                    //冷却时间显示秒
                    vStr = Math.floor(val / 1000) + game.getLanById("shijian_4" /* shijian_4 */);
                }
                else if (k == "theGod_addtime" /* theGod_addtime */) {
                    //变身时间显示秒
                    vStr = val + game.getLanById("shijian_4" /* shijian_4 */);
                }
                else {
                    vStr = "+" + (val / 100).toFixed(1) + "%";
                }
                infos.push([aStr, vStr]);
            }
            return infos;
        };
        /**随机玩家名字*/
        TextUtil.getRandomName = function (sex) {
            var cfg = game.LoadMgr.ins.getRes("assets/data/role_name.json");
            var keyList = Object.keys(cfg);
            var r = Math.random();
            if (!sex) {
                sex = r > 0.5 ? 1 /* Male */ : 2 /* Female */; //随机性别
            }
            var adv = "";
            r = Math.random();
            if (r > 0.5) {
                adv = cfg[keyList[Math.floor(keyList.length * r)]].adv;
            }
            r = Math.random();
            var f = cfg[keyList[Math.floor(keyList.length * r)]].name_f;
            r = Math.random();
            var name = cfg[keyList[Math.floor(keyList.length * r)]]["name_" + sex];
            return adv + f + name;
        };
        /** */
        TextUtil.addEnoughColor = function (value1, value2, symbol) {
            if (symbol === void 0) { symbol = true; }
            var color = +value1 >= +value2 ? 2330156 /* GREEN */ : 16719376 /* RED */;
            if (symbol) {
                return this.addColor("(" + value1 + "/" + value2 + ")", color);
            }
            else {
                return this.addColor(value1 + "/" + value2, color);
            }
        };
        TextUtil.truncateString = function (str, maxLength) {
            if (maxLength === void 0) { maxLength = 7; }
            if (str.length > maxLength) {
                return str.slice(0, maxLength - 1) + '...';
            }
            return str;
        };
        TextUtil._htmlParser = new HtmlTextParser();
        return TextUtil;
    }());
    game.TextUtil = TextUtil;
    __reflect(TextUtil.prototype, "game.TextUtil");
})(game || (game = {}));
//# sourceMappingURL=entry.js.map