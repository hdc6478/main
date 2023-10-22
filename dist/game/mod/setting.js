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
    var mod;
    (function (mod) {
        var setting;
        (function (setting) {
            var SettingMod = /** @class */ (function (_super) {
                __extends(SettingMod, _super);
                function SettingMod() {
                    return _super.call(this, "54" /* Setting */) || this;
                }
                SettingMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                SettingMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                };
                SettingMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* SettingMain */, setting.SettingMainMdr);
                };
                return SettingMod;
            }(game.ModBase));
            setting.SettingMod = SettingMod;
            __reflect(SettingMod.prototype, "game.mod.setting.SettingMod");
            gso.modCls.push(SettingMod);
        })(setting = mod.setting || (mod.setting = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var setting;
        (function (setting) {
            var SettingMainView = /** @class */ (function (_super) {
                __extends(SettingMainView, _super);
                function SettingMainView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.setting.settingSkin";
                    return _this;
                }
                return SettingMainView;
            }(eui.Component));
            setting.SettingMainView = SettingMainView;
            __reflect(SettingMainView.prototype, "game.mod.setting.SettingMainView");
        })(setting = mod.setting || (mod.setting = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var setting;
        (function (setting) {
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            var facade = base.facade;
            var SettingMainMdr = /** @class */ (function (_super) {
                __extends(SettingMainMdr, _super);
                function SettingMainMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", setting.SettingMainView);
                    //下方按钮列表
                    _this._btnData = [
                        {
                            icon: "jihuoma"
                        },
                        {
                            icon: "guajitubiao",
                            openIdx: 1041670240 /* XiuxianNvpu */,
                            param: ["06" /* Role */, "28" /* XiuxianNvpuOnlineSetting */]
                        }
                    ];
                    _this.isEasyHide = true;
                    return _this;
                }
                SettingMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    var test = this._view;
                    //this._view.horizontalCenter = 0;
                    this._proxy = facade.retMod("04" /* Misc */).retProxy(4 /* Misc */);
                    this._view.list_btn.itemRenderer = mod.TabSecondItem;
                    this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
                };
                SettingMainMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    //this.onNt(SettingEvent.ON_SETTING_HINT_UPDATE, this.updateHint, this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    //top
                    addEventListener(this._view.btn_modify, TouchEvent.TOUCH_TAP, this.btn_modifyFunc); //修改
                    addEventListener(this._view.male, TouchEvent.TOUCH_TAP, this.maleFunc); //男
                    addEventListener(this._view.female, TouchEvent.TOUCH_TAP, this.femaleFunc); //女
                    addEventListener(this._view.btn_copy, TouchEvent.TOUCH_TAP, this.btn_copyFunc); //
                    addEventListener(this._view.btn_head, TouchEvent.TOUCH_TAP, this.btn_headFunc); //
                    addEventListener(this._view.HeadVip_head, TouchEvent.TOUCH_TAP, this.btn_headFunc);
                    //addEventListener(this._view.btn_head, TouchEvent.TOUCH_TAP, this.btn_copyFunc); //
                    //middle
                    addEventListener(this._view.bgMusic, TouchEvent.TOUCH_TAP, this.checkBoxFunc);
                    addEventListener(this._view.autoShenjiang, TouchEvent.TOUCH_TAP, this.checkBoxFunc);
                    addEventListener(this._view.gameMusic, TouchEvent.TOUCH_TAP, this.checkBoxFunc);
                    addEventListener(this._view.autoHuashen, TouchEvent.TOUCH_TAP, this.checkBoxFunc);
                    addEventListener(this._view.gameShake, TouchEvent.TOUCH_TAP, this.checkBoxFunc);
                    //bottom
                    this._smooths = [this._view.m_smooth1, this._view.m_smooth2, this._view.m_smooth3];
                    this._selectedImg = [this._view.img_select01, this._view.img_select02, this._view.img_select03];
                    addEventListener(this._view.m_smooth1, TouchEvent.TOUCH_TAP, this.smoothFunc1);
                    addEventListener(this._view.m_smooth2, TouchEvent.TOUCH_TAP, this.smoothFunc2);
                    addEventListener(this._view.m_smooth3, TouchEvent.TOUCH_TAP, this.smoothFunc3);
                    addEventListener(this._view.btn_activation, TouchEvent.TOUCH_TAP, this.btn_activationFunc);
                    addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickBtnList);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                };
                SettingMainMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.setTopStatic();
                    this.updateTop();
                    this.updateMid();
                    this.updateBttom();
                    this._listBtn.replaceAll(this._btnData);
                };
                SettingMainMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SettingMainMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    var ret = false;
                    if (keys.indexOf("name" /* name */) >= 0 || keys.indexOf("sex" /* sex */) >= 0) {
                        mod.ViewMgr.getIns().show("修改个人信息成功");
                        ret = true;
                    }
                    if (ret || keys.indexOf("head" /* head */) >= 0 || keys.indexOf("head_frame" /* head_frame */) >= 0
                        || keys.indexOf("vip_lv" /* vip_lv */) >= 0) {
                        this.updateTop();
                    }
                };
                SettingMainMdr.prototype.btn_headFunc = function () {
                    if (mod.ViewMgr.getIns().checkViewOpen(1041670091 /* DressUp */)) {
                        mod.ViewMgr.getIns().showView("06" /* Role */, "01" /* RoleMain */, "03" /* TabBtnType03 */);
                    }
                    else {
                        game.PromptBox.getIns().show("装扮系统未开启");
                    }
                };
                SettingMainMdr.prototype.smoothFunc1 = function (e) {
                    this.setIconSelManys(this._view.m_smooth1);
                    egret.localStorage.setItem("3" /* gameModel */, "1");
                    this._proxy.setSetting("3" /* gameModel */, "1");
                    this.showConfirm();
                };
                SettingMainMdr.prototype.smoothFunc2 = function (e) {
                    this.setIconSelManys(this._view.m_smooth2);
                    egret.localStorage.setItem("3" /* gameModel */, "2");
                    this._proxy.setSetting("3" /* gameModel */, "2");
                    this.showConfirm();
                };
                SettingMainMdr.prototype.smoothFunc3 = function (e) {
                    this.setIconSelManys(this._view.m_smooth3);
                    egret.localStorage.setItem("3" /* gameModel */, "3");
                    this._proxy.setSetting("3" /* gameModel */, "3");
                    this.showConfirm();
                };
                SettingMainMdr.prototype.showConfirm = function () {
                    mod.ViewMgr.getIns().showConfirm("重启游戏才会立刻生效，需要立刻重启吗？", Handler.alloc(this, function () {
                        if (window.location && window.location.reload) {
                            gso.versionIsLoaded = false;
                            gzyyou.sdk.logout();
                            window.location.reload();
                        }
                    }));
                };
                SettingMainMdr.prototype.setIconSelManys = function (e) {
                    for (var i = 0; i < this._smooths.length; i++) {
                        var img = this._selectedImg[i];
                        if (this._smooths[i] == e) {
                            img.visible = true;
                        }
                        else {
                            img.visible = false;
                        }
                    }
                };
                SettingMainMdr.prototype.setTopStatic = function () {
                    this._view.secondPop.updateTitleStr("设置");
                    //uiid 修改
                    this._view.label_uid.text = "(" + "UID:" + game.RoleVo.ins.role_id + "" + ")";
                };
                SettingMainMdr.prototype.updateTop = function () {
                    //
                    //玩家名字
                    this._view.editable_name.text = game.RoleVo.ins.name;
                    //
                    this._view.HeadVip_head.updateShow(game.RoleVo.ins.head, game.RoleVo.ins.head_frame, game.RoleVo.ins.sex, game.RoleVo.ins.vip_lv);
                    //消耗
                    var config = game.GameConfig.getParamConfigById("gaimingka_xiaohao");
                    var values = config.value;
                    var id = values[0];
                    var bag = facade.retMod("12" /* Bag */).retProxy(12 /* Bag */);
                    var ret = bag.isHasItem(1450100029 /* ChangeNameCard */);
                    var cfg = game.getConfigByNameId("prop.json" /* Prop */, id);
                    if (ret) {
                        //消耗道具，显示道具图标
                        //let propCfg: PropConfig = getConfigByNameId(ConfigName.Prop,id);
                        //let url = ResUtil.getUiProp({index:id,icon:propCfg.icon});
                        this._view.modifi_gai.imgCost = cfg.icon;
                        this._view.modifi_gai.setLabCost("x1");
                        //图标
                        this._view.modifi_gai.imgCost = cfg.icon;
                    }
                    else {
                        //消耗仙玉，显示仙玉图标
                        var icon = game.PropIndexToKey[1450000002 /* Xianyu */];
                        var cfg_1 = game.GameConfig.getPropConfigById(1450000002 /* Xianyu */);
                        this._view.modifi_gai.setLabCost(values[1]);
                        //图标
                        this._view.modifi_gai.imgCost = cfg_1.icon;
                    }
                    var isMale = game.RoleVo.ins.sex == 1;
                    this._view.male.selected = isMale;
                    this._view.female.selected = !isMale;
                };
                SettingMainMdr.prototype.updateMid = function () {
                    //屏蔽背景音乐
                    var bgMusic = this._proxy.getSettingN("bgMusic" /* bgMusic */);
                    this._view.bgMusic.selected = !!bgMusic;
                    //自动召唤光暗神将
                    var autoShenjiang = this._proxy.getSettingN("autoShenjiang" /* autoShenjiang */);
                    this._view.autoShenjiang.selected = !!autoShenjiang;
                    //屏蔽游戏音效
                    var gameMusic = this._proxy.getSettingN("gameMusic" /* gameMusic */);
                    this._view.gameMusic.selected = !!gameMusic;
                    //自动释放化神
                    var autoHuashen = this._proxy.getSettingN("autoHuashen" /* autoHuashen */);
                    this._view.autoHuashen.selected = !!autoHuashen;
                    //屏蔽游戏震屏
                    var gameShake = this._proxy.getSettingN("gameShake" /* gameShake */);
                    this._view.gameShake.selected = !!gameShake;
                };
                SettingMainMdr.prototype.updateBttom = function () {
                    // //游戏流畅度选择
                    // let performance =  this._proxy.getSetting(SettingKey.performance) || 1;
                    // this._view.smooth.img_sel
                    // this._view.recommend, this._view.fullyopen
                    var model = this._proxy.getSetting("3" /* gameModel */) || "2";
                    egret.localStorage.setItem("3" /* gameModel */, model);
                    this.setIconSelManys(this._view["m_smooth" + model]);
                };
                //复选按钮
                SettingMainMdr.prototype.checkBoxFunc = function (e) {
                    var settingKey;
                    var ret = e.target.selected;
                    switch (e.target) {
                        case this._view.bgMusic: {
                            settingKey = "bgMusic" /* bgMusic */;
                            game.SoundMgr.ins.enableSound(!ret);
                            if (ret) {
                                game.SoundMgr.ins.stopBg();
                            }
                            else {
                                game.SoundMgr.ins.playBg();
                            }
                            break;
                        }
                        case this._view.autoShenjiang: {
                            settingKey = "autoShenjiang" /* autoShenjiang */;
                            break;
                        }
                        case this._view.gameMusic: {
                            settingKey = "gameMusic" /* gameMusic */;
                            game.SoundMgr.ins.soundEftEnabled = !ret;
                            break;
                        }
                        case this._view.autoHuashen: {
                            settingKey = "autoHuashen" /* autoHuashen */;
                            break;
                        }
                        case this._view.gameShake: {
                            settingKey = "gameShake" /* gameShake */;
                            break;
                        }
                    }
                    this._proxy.setSetting(settingKey, ret ? "1" : "0");
                };
                //激活码
                SettingMainMdr.prototype.btn_activationFunc = function () {
                    game.PromptBox.getIns().show("激活码，待实现");
                };
                //修改玩家信息
                SettingMainMdr.prototype.btn_modifyFunc = function () {
                    var text = this._view.editable_name;
                    if (text.text == "") {
                        game.PromptBox.getIns().show("修改姓名不能为空");
                        return;
                    }
                    var self = this;
                    mod.ViewMgr.getIns().showConfirm("确定要修改个人信息吗？", Handler.alloc(this, function () {
                        var ret = self._view.male.selected;
                        self._proxy.changeName(text.text, ret ? 1 : 2);
                    }));
                };
                //复制信息uiid
                SettingMainMdr.prototype.btn_copyFunc = function () {
                    var text = this._view.label_uid;
                    if (text.text == "") {
                        game.PromptBox.getIns().show("变强，待实现");
                        return;
                    }
                    this.copyTextToClipboard(text.text);
                };
                // private setSelected(checkBox: eui.CheckBox, ret: boolean): void {
                //     checkBox.currentState = ret ? "upAndSelected" : "disabled";
                // }
                // private getSelected(checkBox: eui.CheckBox): boolean {
                //     return checkBox.currentState == "upAndSelected";
                // }
                SettingMainMdr.prototype.maleFunc = function () {
                    this._view.female.selected = !this._view.male.selected;
                };
                SettingMainMdr.prototype.femaleFunc = function () {
                    this._view.male.selected = !this._view.female.selected;
                };
                SettingMainMdr.prototype.copyTextToClipboard = function (text) {
                    try {
                        var textArea = window.document.createElement("textarea");
                        textArea.style.position = "fixed";
                        textArea.style.top = "0";
                        textArea.style.left = "0";
                        textArea.style.width = "2em";
                        textArea.style.height = "2em";
                        textArea.style.padding = "0";
                        textArea.style.border = "none";
                        textArea.style.outline = "none";
                        textArea.style.boxShadow = "none";
                        textArea.style.background = "transparent";
                        textArea.value = text;
                        window.document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        var successful = window.document.execCommand("copy");
                        window.document.body.removeChild(textArea);
                        return successful;
                    }
                    catch (err) {
                        console.error(err);
                    }
                    return false;
                };
                //todo 下方按钮列表点击
                SettingMainMdr.prototype.onClickBtnList = function (e) {
                    var d = e.item;
                    if (d && d.openIdx && !mod.ViewMgr.getIns().checkViewOpen(d.openIdx, true)) {
                        return;
                    }
                    //激活码按钮
                    if (d && d.icon == 'jihuoma') {
                        game.PromptBox.getIns().show("激活码，待实现");
                        return;
                    }
                    if (d && d.openIdx == 1041670240 /* XiuxianNvpu */) {
                        if (!mod.RoleUtil.isNvpuAct(true)) {
                            return;
                        }
                        mod.ViewMgr.getIns().showView(d.param[0], d.param[1]);
                        this.hide();
                        return;
                    }
                };
                return SettingMainMdr;
            }(game.MdrBase));
            setting.SettingMainMdr = SettingMainMdr;
            __reflect(SettingMainMdr.prototype, "game.mod.setting.SettingMainMdr");
        })(setting = mod.setting || (mod.setting = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=setting.js.map