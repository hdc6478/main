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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var BaseListenerRenderer = /** @class */ (function (_super) {
            __extends(BaseListenerRenderer, _super);
            function BaseListenerRenderer() {
                var _this = _super.call(this) || this;
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this._eventList = [];
                return _this;
            }
            BaseListenerRenderer.prototype.addEventListenerEx = function (type, listenerObjParam, listenerFuncParam, funcObjParam) {
                if (!this._eventList[type]) {
                    this._eventList[type] = [];
                }
                var maps = this._eventList[type];
                var len = maps.length;
                for (var i = 0; i < len; i++) {
                    var d = maps[i];
                    if (d.listenerObj == listenerObjParam && d.listener == listenerFuncParam && d.funcObj == funcObjParam) {
                        return;
                    }
                }
                listenerObjParam.addEventListener(type, listenerFuncParam, funcObjParam);
                maps.push({ listenerObj: listenerObjParam, listenerFunc: listenerFuncParam, funcObj: funcObjParam });
            };
            BaseListenerRenderer.prototype.onAddToStage = function () {
                this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            };
            BaseListenerRenderer.prototype.onRemoveFromStage = function () {
                for (var k in this._eventList) {
                    var d = this._eventList[k] || [];
                    var len = d.length;
                    for (var i = 0; i < len; i++) {
                        var d2 = d[i];
                        if (!d2) {
                            continue;
                        }
                        d2.listenerObj.removeEventListener(k, d2.listenerFunc, d2.funcObj);
                    }
                }
                this._eventList = [];
                this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            };
            return BaseListenerRenderer;
        }(eui.ItemRenderer));
        mod.BaseListenerRenderer = BaseListenerRenderer;
        __reflect(BaseListenerRenderer.prototype, "game.mod.BaseListenerRenderer", ["eui.UIComponent", "egret.DisplayObject"]);
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Pool = base.Pool;
        var Rectangle = egret.Rectangle;
        var BaseRenderer = /** @class */ (function (_super) {
            __extends(BaseRenderer, _super);
            function BaseRenderer() {
                var _this = _super.call(this) || this;
                _this._effHub = new game.UIEftHub(_this);
                return _this;
            }
            BaseRenderer.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
                this.onHide();
            };
            BaseRenderer.prototype.clearFont = function (container, clearRef) {
                if (clearRef === void 0) { clearRef = true; }
                this._effHub.clearFont(container, clearRef);
            };
            BaseRenderer.prototype.addBmpFont = function (text, font, container, horizontal, scale, center, gap, expandParent) {
                if (horizontal === void 0) { horizontal = true; }
                if (scale === void 0) { scale = 1; }
                if (center === void 0) { center = false; }
                if (gap === void 0) { gap = 0; }
                if (expandParent === void 0) { expandParent = false; }
                this._effHub.addBmpFont(text, font, container, horizontal, scale, center, gap, expandParent);
            };
            BaseRenderer.prototype.addEft = function (src, x, y, cb, times, idx, scale, autoRemove, speed) {
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
            BaseRenderer.prototype.addEftByParent = function (src, parent, x, y, idx, cb, times, scale, autoRemove, speed) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (idx === void 0) { idx = -1; }
                if (cb === void 0) { cb = null; }
                if (times === void 0) { times = 0; }
                if (scale === void 0) { scale = 1; }
                if (autoRemove === void 0) { autoRemove = true; }
                if (speed === void 0) { speed = 1; }
                this.eftSrc = src;
                this._eftId = this._effHub.add(src, x, y, cb, times, parent, idx, scale, autoRemove, speed);
                return this._eftId;
            };
            /**
             * 添加特效
             * @param parent 存放特效的Group
             * */
            BaseRenderer.prototype.addEftByParentScale = function (parent) {
                this.addEftByParent("chongzhi" /* ShouChongQianWang */, parent);
            };
            BaseRenderer.prototype.addEftByDsp = function (src, display, idx, cb, times) {
                if (idx === void 0) { idx = -1; }
                if (cb === void 0) { cb = null; }
                if (times === void 0) { times = 0; }
                var rect = display.getTransformedBounds(this, Pool.alloc(Rectangle));
                var x = display.width * 0.5 + rect.x;
                var y = display.height * 0.5 + rect.y;
                Pool.release(rect);
                return this._effHub.add(src, x, y, cb, times, null, idx);
            };
            BaseRenderer.prototype.stopEffect = function (id) {
                this._effHub.stopEffect(id);
            };
            BaseRenderer.prototype.removeEffect = function (id) {
                this._effHub.removeEffect(id);
            };
            BaseRenderer.prototype.removeAllEffects = function () {
                this._effHub.removeAllEffects();
            };
            BaseRenderer.prototype.getEffectById = function (id) {
                return this._effHub.getEffectById(id);
            };
            BaseRenderer.prototype.onHide = function () {
                this._effHub.clearAllFont();
                this._effHub.removeAllEffects();
            };
            //对外移除特效接口
            BaseRenderer.prototype.removeEft = function () {
                if (this._eftId) {
                    this.removeEffect(this._eftId);
                    this._eftId = null;
                }
                this.eftSrc = null;
            };
            /**
             * 添加模型接口
             * @param index 外显index
             * @param parent 存放外显的容器，一般为Group
             * @param dir 方向，不需要传，默认5
             * @param act 动作，不需要传，默认站立
             * @param isUi UI模型，默认true
             */
            BaseRenderer.prototype.addAnimate = function (index, parent, dir, act, isUi) {
                if (dir === void 0) { dir = 5 /* DOWN */; }
                if (act === void 0) { act = "std" /* STAND */; }
                if (isUi === void 0) { isUi = true; }
                return this._effHub.addAnimate(index, parent, dir, act, isUi);
            };
            /**
             * 添加怪物模型接口
             * @param index 怪物index
             * @param parent 存放外显的容器，一般为Group
             */
            BaseRenderer.prototype.addMonster = function (index, parent) {
                return this._effHub.addMonster(index, parent);
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
             */
            BaseRenderer.prototype.updateUIRole = function (parent, fashion, weapon, wing, sex, scale, dir, act, isUi) {
                if (scale === void 0) { scale = 1.1; }
                if (dir === void 0) { dir = 5 /* DOWN */; }
                if (act === void 0) { act = "std" /* STAND */; }
                if (isUi === void 0) { isUi = true; }
                var body = game.ResUtil.getModelName(fashion, sex); //时装区分性别
                var weaponStr = game.ResUtil.getModelName(weapon); //神兵ui模型有两套，一套身上，一套独立显示
                var wingStr = game.ResUtil.getModelName(wing, sex, true); //羽翼只有一套，取单独显示的
                this._effHub.updateUIRole(body, weaponStr, wingStr, parent, scale, dir, act, isUi);
            };
            /**
             * 添加自己角色模型接口
             * @param parent 存放外显的容器，一般为Group
             * @param scale 缩放，默认1.1
             * @param dir 方向，不需要传，默认5
             * @param act 动作，不需要传，默认站立
             * @param isUi UI模型，默认true
             */
            BaseRenderer.prototype.updateSelfUIRole = function (parent, scale, dir, act, isUi) {
                if (scale === void 0) { scale = 1.1; }
                if (dir === void 0) { dir = 5 /* DOWN */; }
                if (act === void 0) { act = "std" /* STAND */; }
                if (isUi === void 0) { isUi = true; }
                var vo = game.RoleVo.ins;
                this.updateUIRole(parent, vo.fashion, vo.weapon, vo.wing, vo.sex, scale, dir, act, isUi);
            };
            /**
             * 添加排行榜角色模型接口
             * @param parent 存放外显的容器，一般为Group
             * @param info 通用排行榜外显
             * @param scale 缩放，默认1.1
             */
            BaseRenderer.prototype.updateRankUIRole = function (parent, info, scale) {
                if (scale === void 0) { scale = 1.1; }
                this.updateUIRole(parent, info.fashion, info.weapon, info.wing, info.sex, scale);
            };
            //额外设置 UI 属性
            BaseRenderer.prototype.updateUIRoleAtr = function (isLoop, handler) {
                if (isLoop === void 0) { isLoop = true; }
                if (handler === void 0) { handler = null; }
                this._effHub.updateUIRoleAtr(isLoop, handler);
            };
            return BaseRenderer;
        }(mod.BaseListenerRenderer));
        mod.BaseRenderer = BaseRenderer;
        __reflect(BaseRenderer.prototype, "game.mod.BaseRenderer");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 拥有Icon组件的消耗组件，水平布局
         */
        var CostIcon2 = /** @class */ (function (_super) {
            __extends(CostIcon2, _super);
            function CostIcon2() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.CostItem2Skin";
                return _this;
            }
            CostIcon2.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                this.updateShow(data);
            };
            /**
             * (拥有数量/消耗数量)
             */
            CostIcon2.prototype.updateView = function (index, cnt, isShowName) {
                if (cnt === void 0) { cnt = 1; }
                if (isShowName === void 0) { isShowName = false; }
                var curCnt = mod.BagUtil.getPropCntByIdx(index);
                var str = "(" + game.StringUtil.getHurtNumStr(curCnt) + "/" + game.StringUtil.getHurtNumStr(cnt) + ")";
                var color = curCnt >= cnt ? 0x3cfe00 : 16719376 /* RED */;
                var txt = '';
                if (isShowName) {
                    var cfg = game.getConfigById(index);
                    txt = game.TextUtil.addColor(cfg && cfg['name'] || '', game.ColorUtil.getColorByQuality1(cfg && cfg['quality'] || 0))
                        + '\n';
                    this.lab_cost.lineSpacing = 5;
                }
                this.lab_cost.textFlow = game.TextUtil.parseHtml(txt + game.TextUtil.addColor(str, color));
            };
            /**
             * 设置icon的缩放
             * @param scale 默认1
             */
            CostIcon2.prototype.setIconScale = function (scale) {
                if (scale === void 0) { scale = 1; }
                this.icon.scaleX = this.icon.scaleY = scale;
                this.lab_cost.x = this.icon.x + this.icon.width * scale + 10;
            };
            /**设置数值*/
            CostIcon2.prototype.setLabCost = function (str, color) {
                if (color === void 0) { color = 2330156 /* GREEN */; }
                this.lab_cost.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(str, color));
            };
            /**设置消耗显示，一般会配置一个数组【index，count】*/
            CostIcon2.prototype.updateShow = function (cost, isShowName) {
                if (isShowName === void 0) { isShowName = false; }
                var index = cost[0], cnt = cost[1];
                var propData = game.PropData.create(index);
                if (!propData) {
                    return;
                }
                this.icon.data = propData;
                this.updateView(index, cnt, isShowName);
            };
            return CostIcon2;
        }(eui.ItemRenderer));
        mod.CostIcon2 = CostIcon2;
        __reflect(CostIcon2.prototype, "game.mod.CostIcon2");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var AvatarIcon = /** @class */ (function (_super) {
            __extends(AvatarIcon, _super);
            function AvatarIcon() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AvatarIconSkin";
                return _this;
            }
            AvatarIcon.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
            };
            AvatarIcon.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
            };
            AvatarIcon.prototype.dataChanged = function () {
                var data = this.data;
                if (!data || !data.cfg) {
                    this.defaultView();
                    return;
                }
                var cfg = data.cfg;
                this.img_icon.source = cfg.icon;
                this.img_quality.source = game.ResUtil.getPropQualityImg(cfg.quality);
                this.img_battle.visible = !!data.isBattle;
                this.redPoint.visible = !!data.showHint;
                var star = this.data.star || 0;
                this.starListView.visible = true;
                this.starListView.updateStar(star, star);
                this.img_type.visible = false;
                var propData = game.PropData.create(data.cfg.index);
                if (propData.type == 400 /* Shenling */) {
                    //神灵
                    var shenlingProxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var shenlingCfg = game.getConfigByNameId("shenling.json" /* Shenling */, data.cfg.index);
                    this.img_type.visible = true;
                    this.img_type.source = "shuxingtubiao_" + shenlingCfg.type;
                    var star_1 = this.data.star;
                    if (star_1) {
                        var maxUpStar = shenlingProxy.getMaxStar(this.data.cfg.index);
                        var src = star_1 > maxUpStar ? 'moon_yellow' : 'star_6';
                        var starCnt = star_1 > maxUpStar ? star_1 - maxUpStar : star_1;
                        this.starListView.updateStarSrc(starCnt, src);
                    }
                    else {
                        this.starListView.updateStar(0, 0);
                    }
                }
            };
            //默认界面+
            AvatarIcon.prototype.defaultView = function () {
                this.img_icon.source = "icon_jia";
                this.img_battle.visible = this.img_type.visible = this.starListView.visible = false;
                this.img_quality.source = game.ResUtil.getPropQualityImg(0 /* DEFAULT */);
                this.redPoint.visible = false;
            };
            return AvatarIcon;
        }(mod.BaseRenderer));
        mod.AvatarIcon = AvatarIcon;
        __reflect(AvatarIcon.prototype, "game.mod.AvatarIcon");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var AvatarItem = /** @class */ (function (_super) {
            __extends(AvatarItem, _super);
            function AvatarItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AvatarItemSkin";
                return _this;
            }
            AvatarItem.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
                this.removeQualityEft();
            };
            AvatarItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                if (this.data.cfg != undefined) {
                    var cfg = this.data.cfg;
                    this.item.setData(cfg);
                }
                if (this.data.showHint != undefined) {
                    this.redPoint.visible = this.data.showHint;
                }
                if (this.data.star != undefined) {
                    var star = this.data.star;
                    this.img_gray.visible = this.img_gray0.visible = !star;
                    this.starCom.updateStar(star);
                }
                if (this.data.isBattle != undefined) {
                    this.img_chuzhan.visible = this.data.isBattle;
                }
                if (this.data.isSel != undefined) {
                    this.removeEft(); //移除选中特效
                    //防止刷新其他数据时影响到选中特效
                    if (this.data.isSel) {
                        //选中添加特效
                        this.addEftByParent("surface_sel" /* SurfaceSel */, this.grp_eft);
                    }
                }
                this.removeQualityEft();
                var head = game.PropData.getPropParse(this.data.cfg.index, 1 /* Type */);
                //神灵特殊处理
                if (head == 400 /* Shenling */) {
                    var proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var star = this.data.star;
                    if (star) {
                        var maxUpStar = proxy.getMaxStar(this.data.cfg.index);
                        var src = star > maxUpStar ? 'moon_yellow' : 'star_6';
                        var starCnt = star > maxUpStar ? star - maxUpStar : star;
                        this.starCom.updateStarSrc(starCnt, src);
                    }
                    else {
                        this.starCom.updateStar(0, 0);
                    }
                    //进化神灵的进化次数或修仙女仆幻化等级
                    var evolution = this.data.evolution; //可以传入其他玩家的数值，不传就用玩家自身的数值
                    var nvpuShenlingId = mod.RoleUtil.getNvpuShenlingId();
                    var cfg = this.data.cfg;
                    if (evolution || nvpuShenlingId == cfg.index || (cfg.subtype && cfg.subtype == 1)) {
                        if (evolution == undefined) {
                            //获取玩家自身的进化等级，女仆神灵幻化等级也被服务端赋值到此
                            var info = proxy.getInfoByIndex(cfg.index);
                            evolution = info && info.evolutions || 1;
                        }
                        var icons = (cfg.icons || '').split(',');
                        var icon = icons[evolution - 1];
                        if (!icon) {
                            icon = cfg.icon;
                        }
                        //女仆神灵
                        if (cfg.index == nvpuShenlingId) {
                            this.item.img_avatar.source = game.ResUtil.getBigIcon(icon);
                            return;
                        }
                        //进化神灵
                        var initQua = cfg.character ? cfg.character[0] : 1;
                        var speQuality = Math.max(initQua, initQua + evolution - 1); //特殊品质
                        var eftSrc = game.SpecialQualityEftSrc[speQuality];
                        if (eftSrc) {
                            this._qualityEftId = this.addEft(eftSrc, 35, 0, null, 0);
                        }
                        this.item.img_quality.source = '';
                        this.item.img_bg.source = game.ResUtil.getBigBg(0, speQuality);
                        this.item.img_frame.source = game.ResUtil.getBigFrame(0, speQuality);
                        this.item.img_avatar.source = game.ResUtil.getBigIcon(icon);
                    }
                }
            };
            /**单个item设置用*/
            AvatarItem.prototype.setData = function (data) {
                this.data = data;
            };
            /**是否显示置灰层，默认不显示*/
            AvatarItem.prototype.setGray = function (isShow) {
                if (isShow === void 0) { isShow = false; }
                this.img_gray.visible = this.img_gray0.visible = isShow;
            };
            /**品质特效*/
            AvatarItem.prototype.removeQualityEft = function () {
                if (this._qualityEftId) {
                    this.removeEffect(this._qualityEftId);
                    this._qualityEftId = null;
                }
            };
            return AvatarItem;
        }(mod.BaseRenderer));
        mod.AvatarItem = AvatarItem;
        __reflect(AvatarItem.prototype, "game.mod.AvatarItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var Btn = /** @class */ (function (_super) {
            __extends(Btn, _super);
            function Btn() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.touchScale = true;
                return _this;
            }
            Btn.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
                if (this.redPoint && this.redPoint.source === "hongdian") {
                    this.redPoint.visible = false;
                    var scale = 1 / this.scaleX;
                    this.redPoint.scaleY = this.redPoint.scaleX = scale;
                }
                if (this.touchScale && !this.scaleGroup) {
                    this.scaleGroup = new eui.Group();
                    while (this.numChildren != 0) {
                        this.scaleGroup.addChild(this.getChildAt(0));
                    }
                    this.scaleGroup.width = this.width;
                    this.scaleGroup.height = this.height;
                    this.scaleGroup.verticalCenter = 0;
                    this.scaleGroup.horizontalCenter = 0;
                    this.addChild(this.scaleGroup);
                }
                this.addEventListener(egret.Event.RESIZE, this.updateScaleGroup, this);
            };
            Btn.prototype.addBtnChild = function (child) {
                if (this.touchScale && this.scaleGroup) {
                    this.scaleGroup.addChild(child);
                }
                else {
                    this.addChild(child);
                }
            };
            Btn.prototype.onTouchBegin = function (event) {
                _super.prototype.onTouchBegin.call(this, event);
                if (this.touchScale) {
                    this.scaleGroup.scaleX = this.scaleGroup.scaleY = 0.9;
                    this.addEventListener(TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
                }
                game.SoundMgr.ins.playEffect(game.ResUtil.getSoundUrl("ui"), null, true);
            };
            Btn.prototype.buttonReleased = function () {
                _super.prototype.buttonReleased.call(this);
                if (this.touchScale) {
                    this.removeEventListener(TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
                    this.scaleGroup.scaleX = this.scaleGroup.scaleY = 1;
                }
                this.removeEventListener(egret.Event.RESIZE, this.updateScaleGroup, this);
            };
            //刷新组大小，设置皮肤不同状态时，按钮大小变更时调用
            Btn.prototype.updateScaleGroup = function () {
                this.scaleGroup.width = this.width;
                this.scaleGroup.height = this.height;
            };
            /**
             * btn按钮文本设置超文本
             * @param textFlow 超文本内容
             * @param stroke 外描边
             */
            Btn.prototype.setLabelStyle2 = function (textFlow, stroke) {
                if (stroke === void 0) { stroke = 0; }
                if (this.labelDisplay && egret.is(this.labelDisplay, "eui.Label")) {
                    var _lab = this.labelDisplay;
                    _lab.textFlow = game.TextUtil.parseHtml(textFlow);
                    _lab.stroke = stroke;
                }
            };
            /**
             * @param props {x:number, y:number,left:number,right:number,...}
             */
            Btn.prototype.setLabelStyle3 = function (props) {
                if (!props) {
                    return;
                }
                if (this.labelDisplay && egret.is(this.labelDisplay, "eui.Label")) {
                    var _lab = this.labelDisplay;
                    for (var i in props) {
                        _lab[i] = props[i];
                    }
                }
            };
            Btn.prototype.setLabelStyle = function (size, textColor, strokeColor, text, textFlow) {
                if (this.labelDisplay && egret.is(this.labelDisplay, "eui.Label")) {
                    var _lab = this.labelDisplay;
                    _lab.size = size;
                    if (textColor) {
                        _lab.textColor = textColor;
                    }
                    if (strokeColor) {
                        _lab.strokeColor = strokeColor;
                    }
                    if (textFlow) {
                        _lab.textFlow = game.TextUtil.parseHtml(textFlow);
                    }
                    else if (text) {
                        _lab.text = text;
                    }
                }
            };
            /**
             * 设置原价和现价
             * @param price 现价
             * @param faker 原价
             * @param clearFontPrice 清除font价格，默认true
             */
            Btn.prototype.setTwoPrice = function (price, faker, clearFontPrice) {
                if (clearFontPrice === void 0) { clearFontPrice = true; }
                if (this.gr_price) {
                    this.gr_price.visible = true;
                    this.lab_price.text = price + "\u5143";
                    this.lab_faker_price.text = "\u539F\u4EF7" + faker + "\u5143";
                }
                if (clearFontPrice) {
                    this.clearFontPrice();
                }
            };
            /**隐藏原价和现价的group*/
            Btn.prototype.resetTwoPrice = function () {
                if (this.gr_price) {
                    this.gr_price.visible = false;
                }
            };
            Btn.prototype.addEftHub = function () {
                if (!this._eftHub) {
                    this._eftHub = new game.UIEftHub(this);
                }
            };
            /**设置价格，font字体*/
            Btn.prototype.setFontPrice = function (price) {
                this.addEftHub();
                this.setImage('', true); //清空图片
                this.resetTwoPrice(); //重置两种价格
                this._eftHub.addBmpFont(price + 'y', game.BmpTextCfg[207 /* Price */], this.group_font, true, 1, true);
            };
            /**清除font价格*/
            Btn.prototype.clearFontPrice = function () {
                if (this._eftHub) {
                    this._eftHub.clearFont(this.group_font, false);
                }
            };
            /**设置font字体*/
            Btn.prototype.addBmpFont = function (text, font, container, horizontal, scale, center, gap, expandParent) {
                if (horizontal === void 0) { horizontal = true; }
                if (scale === void 0) { scale = 1; }
                if (center === void 0) { center = false; }
                if (gap === void 0) { gap = 0; }
                if (expandParent === void 0) { expandParent = false; }
                this.addEftHub();
                this._eftHub.addBmpFont(text, font, container, horizontal, scale, center, gap, expandParent);
            };
            /**增加特效 */
            Btn.prototype.setEffect = function (src, parent, x, y, idx, cb, times, scale, autoRemove, speed, isMirror, scaleXBmpOffX) {
                if (parent === void 0) { parent = this.group_eft; }
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
                this.clearEffect();
                this.addEftHub();
                return this._eftHub.add(src, x, y, cb, times, parent, idx, scale, autoRemove, speed, isMirror, scaleXBmpOffX);
            };
            Btn.prototype.clearEffect = function (id) {
                if (this._eftHub) {
                    if (id) {
                        this._eftHub.removeEffect(id);
                    }
                    else {
                        this._eftHub.removeAllEffects();
                    }
                }
            };
            /**不显示文字显示图片 */
            Btn.prototype.setImage = function (skin, clearFontPrice) {
                this.img.source = skin;
                if (clearFontPrice) {
                    this.clearFontPrice();
                }
            };
            /**黄色底按钮*/
            Btn.prototype.setYellow = function () {
                this.currentState = "yellow";
                this.touchEnabled = true;
            };
            /**蓝色底按钮*/
            Btn.prototype.setBlue = function () {
                this.currentState = "blue";
                this.touchEnabled = true;
            };
            /**绿色底按钮*/
            Btn.prototype.setGreen = function () {
                this.currentState = "green";
                this.touchEnabled = true;
            };
            /**灰色底按钮，不可点击*/
            Btn.prototype.setDisabled = function () {
                this.currentState = "disabled";
                this.touchEnabled = false;
            };
            /**设置红点*/
            Btn.prototype.setHint = function (hint) {
                if (hint === void 0) { hint = false; }
                this.redPoint && (this.redPoint.visible = hint);
            };
            /**
             * 更新 this.redPoint 的 top|right 位置
             * @param top 默认-15
             * @param right 默认-8
             */
            Btn.prototype.setHintStyle = function (top, right) {
                if (top === void 0) { top = -15; }
                if (right === void 0) { right = -8; }
                if (this.redPoint) {
                    this.redPoint.top = top;
                    this.redPoint.right = right;
                }
            };
            Btn.prototype.setLabelColor = function (color) {
                var _lab = this.labelDisplay;
                _lab.textColor = color;
            };
            /**
             * 设置消耗
             * @param cost
             * @param preLab 消耗前的文本，默认不显示
             */
            Btn.prototype.setCost = function (cost, preLab) {
                //用于PriceBtnSkin
                if (this.gr_cost) {
                    this.gr_cost.visible = true;
                }
                var idx = cost[0];
                var cnt = cost[1];
                var cfg = game.getConfigById(idx);
                this.img_cost.source = cfg.icon;
                this.lab_cost.text = cnt + "";
                if (preLab) {
                    this.lab_cost0.text = preLab;
                }
            };
            /**重置消耗*/
            Btn.prototype.resetCost = function () {
                this.img_cost.source = "";
                this.lab_cost.text = "";
            };
            Btn.prototype.setTag = function (bool, img) {
                if (img === void 0) { img = "chongbang1"; }
                this.img_tag.visible = bool;
                this.img_tag.source = img;
            };
            /**
             * 设置 PriceBtnSkin 的消耗
             * @param cost
             */
            Btn.prototype.setPriceCost = function (cost) {
                if (this.gr_cost) {
                    this.gr_cost.visible = true;
                    var cfg = game.getConfigById(cost[0]);
                    var bagCnt = mod.BagUtil.getPropCntByIdx(cost[0]);
                    this.img_cost.source = cfg.icon;
                    this.lab_cost.text = cost[1] + '';
                    var color = bagCnt >= cost[1] ? 2330156 /* GREEN */ : 16719376 /* RED */;
                    this.lab_cost.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(bagCnt + "/" + cost[1], color));
                }
            };
            /**
             * 重置 PriceBtnSkin 的消耗
             */
            Btn.prototype.resetPriceCost = function () {
                if (this.img_cost) {
                    this.img_cost.visible = false;
                    this.resetCost();
                }
            };
            return Btn;
        }(eui.Button));
        mod.Btn = Btn;
        __reflect(Btn.prototype, "game.mod.Btn");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var CostIcon = /** @class */ (function (_super) {
            __extends(CostIcon, _super);
            function CostIcon() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.CostItemSkin";
                return _this;
            }
            CostIcon.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_cost, this.onClick, this);
            };
            /**点击弹出道具tips*/
            CostIcon.prototype.onClick = function () {
                if (this._index) {
                    mod.ViewMgr.getIns().showPropTips(this._index);
                }
            };
            CostIcon.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                this.updateShow(data);
            };
            Object.defineProperty(CostIcon.prototype, "imgCost", {
                /**设置图标*/
                set: function (img) {
                    this.img_cost.source = img;
                },
                enumerable: true,
                configurable: true
            });
            /**设置数值*/
            CostIcon.prototype.setLabCost = function (str, color) {
                if (color === void 0) { color = 8585074 /* GREEN */; }
                this.lab_cost.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(str, color));
            };
            /**设置道具索引*/
            CostIcon.prototype.updateIndex = function (index) {
                this._index = index;
                var cfg = game.GameConfig.getPropConfigById(index);
                this.imgCost = cfg.icon;
            };
            /**设置消耗显示，一般会配置一个数组【index，count】*/
            CostIcon.prototype.updateShow = function (cost) {
                var index = cost[0];
                var costCnt = cost[1];
                this.updateIndex(index);
                var curCnt = mod.BagUtil.getPropCntByIdx(index);
                var str = game.StringUtil.getHurtNumStr(curCnt) + "/" + game.StringUtil.getHurtNumStr(costCnt); //拥有的道具 / 消耗的道具
                var color = curCnt >= costCnt ? 8585074 /* GREEN */ : 16731212 /* RED */;
                this.setLabCost(str, color);
            };
            return CostIcon;
        }(mod.BaseListenerRenderer));
        mod.CostIcon = CostIcon;
        __reflect(CostIcon.prototype, "game.mod.CostIcon");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var Pool = base.Pool;
        var Icon = /** @class */ (function (_super) {
            __extends(Icon, _super);
            function Icon() {
                var _this = _super.call(this) || this;
                _this._iconShowType = 0; //不能设置默认类型，会影响到其他类型使用，比如背包可使用宝箱
                _this.skinName = "skins.common.IconSkin";
                _this.touchEnabled = false;
                return _this;
            }
            Icon.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.img_icon.addEventListener(TouchEvent.TOUCH_TAP, this.onClickIcon, this);
            };
            Icon.prototype.onRemoveFromStage = function () {
                this.img_icon.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickIcon, this);
                if (this._clickHandler) {
                    Pool.release(this._clickHandler);
                }
                this._clickHandler = null;
                this.removeEft();
                _super.prototype.onRemoveFromStage.call(this);
            };
            Icon.prototype.dataChanged = function () {
                if (!this.data) {
                    this.defaultIcon();
                    return;
                }
                if (this.data instanceof msg.prop_tips_data) {
                    this.propData = game.PropData.create(this.data.idx.toNumber(), this.data.cnt);
                }
                else if (this.data instanceof msg.prop_attributes) {
                    this.propData = game.PropData.fromData(this.data);
                }
                else if (this.data instanceof game.PropData) {
                    this.propData = this.data;
                }
                else if (Array.isArray(this.data)) {
                    this.propData = game.PropData.create(this.data[0], this.data[1]);
                    this._tagType = this.data.length > 2 ? this.data[2] : 0; /**数组第三个为角标定义，IconTagType*/
                }
                else if (this.data instanceof Long) {
                    this.propData = game.PropData.create(this.data.toNumber());
                }
                else {
                    this.propData = game.PropData.create(this.data);
                }
                if (!this.propData) {
                    return;
                }
                // if (this._iconShowType) {
                //     this.iconShowType = this._iconShowType;
                // }
                this.updateQualityImg();
                this.updateIconImg();
                this.updateCnt();
                this.setEft();
                this.updateTagImg();
                this.updateTagRightImg();
                this.updatePropName(); //刷新显示道具名字
                this.updateEquipIcon();
                this.updatePropIcon();
            };
            //点击图标
            Icon.prototype.onClickIcon = function (e) {
                // if(DEBUG){
                //     let proxy:IMiscProxy = getProxy(ModName.Misc,ProxyType.Misc);
                //     proxy.sendGM(`$addprop ${this.propData.index} 1000`);
                // }
                if (this._clickHandler) {
                    this._clickHandler.exec(e);
                    return;
                }
                if (!this.propData || !this.propData.cfg) {
                    return;
                }
                if (this.iconShowType == 3 /* NotTips */) {
                    return;
                }
                mod.ViewMgr.getIns().showPropTips(this.propData);
            };
            //特效
            Icon.prototype.setEft = function () {
                var quality = this.propData.quality;
                if (quality < 4 /* RED */) {
                    //低于4品质不显示特效
                    this.removeEft();
                    return;
                }
                var eftSrc = "pinzhi_" + quality;
                //let eftSrc = "pinzhi_" + (4 + Math.round(5 * Math.random()));
                if (this.eftSrc == eftSrc) {
                    return;
                }
                this.removeEft();
                this.addEftByParent(eftSrc, this.grp_eft);
                this.grp_eft.visible = true;
            };
            /**设置tag资源*/
            Icon.prototype.updateTagImg = function () {
                this.img_tag.visible = !!this._tagType;
                if (this.img_tag.visible) {
                    this.img_tag.source = "icon_tag" + this._tagType;
                }
            };
            /**刷新名字显示*/
            Icon.prototype.updatePropName = function () {
                if (this.iconShowType == 5 /* Name */) {
                    this.updateName();
                }
                else {
                    this.updateName("");
                }
            };
            /**---------------------以下接口支持外部访问-----------------------*/
            /**设置默认显示*/
            Icon.prototype.defaultIcon = function () {
                this.img_gray.visible = false;
                this.img_tag.visible = false;
                this.img_tag_right.visible = false;
                this.propData = null;
                this.setHint();
                this.updateName("");
                this.updateQualityImg("icon_quality_0");
                this.updateIconImg("");
                this.updateCnt("");
                this.removeEft();
                this.updateStar(0);
                this.updateStage(0);
                this.updateStarTopRight(0);
            };
            /**设置点击回调*/
            Icon.prototype.setClickHandler = function (handler) {
                this._clickHandler = handler;
            };
            /**设置数据data，单个icon时候调用，iconShowType不会保存进PropData里面*/
            Icon.prototype.setData = function (data, iconShowType) {
                if (iconShowType) {
                    //不能设置默认类型，会影响到其他类型使用，比如背包可使用宝箱
                    this._iconShowType = iconShowType;
                }
                this.data = data;
            };
            Object.defineProperty(Icon.prototype, "iconShowType", {
                get: function () {
                    if (this._iconShowType) {
                        return this._iconShowType; //优先返回
                    }
                    return this.propData && this.propData.iconShowType;
                },
                /**设置iconShowType，iconShowType会保存进PropData里面**/
                set: function (type) {
                    if (!this.propData) {
                        return;
                    }
                    // if (type == IconShowType.Name) {
                    //     //显示名字的时候，不保存数据进propData，防止修改数据
                    //     return;
                    // }
                    this.propData.iconShowType = type;
                },
                enumerable: true,
                configurable: true
            });
            /**获取道具名称*/
            Icon.prototype.getPropName = function (isWhite, truncate) {
                if (isWhite === void 0) { isWhite = true; }
                if (truncate === void 0) { truncate = false; }
                var name = this.propData.cfg.name;
                if (truncate) {
                    name = game.TextUtil.truncateString(name);
                }
                if (isWhite) {
                    return game.TextUtil.parseHtml(game.TextUtil.addColor(name, game.ColorUtil.getColorByQuality1(this.propData.quality)));
                }
                return game.TextUtil.parseHtml(game.TextUtil.addColor(name, game.ColorUtil.getColorByQuality2(this.propData.quality)));
            };
            /**设置道具名称*/
            Icon.prototype.updateName = function (name) {
                if (name == undefined) {
                    /**支持name设置为空*/
                    this.lab_name.textFlow = this.getPropName();
                    return;
                }
                this.lab_name.textFlow = game.TextUtil.parseHtml(name);
            };
            /**设置激活置灰层*/
            Icon.prototype.setImgActed = function (isActed) {
                if (isActed === void 0) { isActed = false; }
                if (isActed) {
                    this.setImgGray('');
                }
                else {
                    this.setImgGray();
                }
            };
            /**设置置灰层*/
            Icon.prototype.setImgGray = function (icon) {
                if (icon == undefined) {
                    /**支持icon设置为空*/
                    icon = "common_gray"; //通用置灰
                }
                this.img_gray.source = icon;
                this.img_gray.visible = true;
            };
            /**设置置灰层加锁*/
            Icon.prototype.setImgLock = function () {
                this.setImgGray("common_gray_icon");
            };
            /**设置红点*/
            Icon.prototype.setHint = function (hint) {
                this.redPoint.visible = !!hint;
            };
            /**设置quality类按钮的样式*/
            Icon.prototype.updateQualityImg = function (icon) {
                if (icon == undefined) {
                    /**支持icon设置为空*/
                    icon = game.ResUtil.getPropQualityImg(this.propData.quality);
                }
                this.img_quality.source = icon;
            };
            /**设置icon资源*/
            Icon.prototype.updateIconImg = function (icon) {
                if (icon == undefined) {
                    /**支持icon设置为空*/
                    icon = game.ResUtil.getUiProp(this.propData.cfg.icon);
                }
                this.img_icon.source = icon;
            };
            /**显示数量文本，支持外部设置*/
            Icon.prototype.updateCnt = function (cntStr) {
                this.grp_cnt.visible = false;
                if (this.iconShowType == 4 /* NotCnt */) {
                    this.lab_cnt.text = "";
                    return;
                }
                if (cntStr == undefined) {
                    cntStr = this.propData.count > 1 ? game.StringUtil.getHurtNumStr(this.propData.count) : "";
                }
                this.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                this.grp_cnt.visible = cntStr != "";
            };
            /**显示消耗数量文本，支持外部设置*/
            Icon.prototype.updateCostLab = function (cost, curCnt) {
                var cntStr = "";
                if (cost && cost.length) {
                    var cnt = cost[1] || 1;
                    if (curCnt == undefined) {
                        //支持外部传数据
                        curCnt = mod.BagUtil.getPropCntByIdx(cost[0]);
                    }
                    var color = curCnt >= cnt ? 8585074 /* GREEN */ : 16731212 /* RED */;
                    cntStr = game.TextUtil.addColor("(" + game.StringUtil.getHurtNumStr(curCnt) + "/" + game.StringUtil.getHurtNumStr(cnt) + ")", color);
                }
                this.updateCnt(cntStr);
            };
            /**
             * 设置右上角tag资源
             * @param tagImg 右上角tag资源，不传则默认配置表规则
             * @protected
             */
            Icon.prototype.updateTagRightImg = function (tagImg) {
                var scale = 1;
                if (tagImg == undefined) {
                    if (this.propData.type == 290 /* Equip */ && this.propData.propType == 9 /* Lingqi */) {
                        tagImg = "icon_tag_lingqi"; //神灵灵器
                    }
                    else if (this.propData.type == 145 /* Prop */ && this.propData.propType == 11 /* Surface */) {
                        tagImg = game.ResUtil.getSrQuality(this.propData.quality); //外显
                        scale = 0.6;
                    }
                    else if (this.propData.type == 290 /* Equip */ && this.propData.propType == 3 /* Shouling */) {
                        tagImg = 'icon_tag_shouling'; //异兽兽灵
                    }
                }
                this.img_tag_right.visible = !!tagImg;
                if (!!tagImg) {
                    this.img_tag_right.source = tagImg;
                    this.img_tag_right.scaleX = this.img_tag_right.scaleY = scale;
                }
            };
            /**
             * 更新左下角的星星
             * 星数大于5，就展示【星数文本+一颗星星资源】
             * @param starCnt
             */
            Icon.prototype.updateStar = function (starCnt) {
                var isShow = starCnt > 0;
                this.gr_star.visible = isShow;
                if (!isShow) {
                    return;
                }
                if (starCnt <= 5) {
                    this.lb_starcnt.text = '';
                    this.starListView.updateStar(starCnt, starCnt);
                }
                else {
                    this.starListView.updateStar(1, 1);
                    this.lb_starcnt.text = starCnt + '';
                }
            };
            /**
             * 更新右上角的星星
             * @param starCnt
             */
            Icon.prototype.updateStarTopRight = function (starCnt) {
                var isShow = starCnt > 0;
                this.listStarTopRight.visible = isShow;
                if (!isShow) {
                    return;
                }
                var list = [];
                list.length = starCnt;
                this.listStarTopRight.dataProvider = new eui.ArrayCollection(list);
            };
            /**
             * 更新阶数，左下角
             * @param stage
             * @param str 默认转
             */
            Icon.prototype.updateStage = function (stage, str) {
                if (str === void 0) { str = game.getLanById("zhuan" /* zhuan */); }
                var isShow = stage > 0;
                this.gr_stage.removeChildren();
                this.gr_stage.visible = isShow;
                if (isShow) {
                    this.addBmpFont(stage + str, game.BmpTextCfg[218 /* EquipStage */], this.gr_stage, true, 1, false, -2);
                }
            };
            /**
             * 角色装备icon，统一处理阶数，星数
             * @private
             */
            Icon.prototype.updateEquipIcon = function () {
                if (!this.propData || this.propData.type != 290 /* Equip */) {
                    this.updateStarTopRight(0);
                    this.updateStage(0);
                    return;
                }
                var cfg = this.propData.cfg;
                if (this.propData.propType == 1 /* RoleEquip */) {
                    //角色装备
                    if (cfg.equip_lv) {
                        this.updateStage(cfg.equip_lv);
                    }
                    else {
                        this.updateStage(50, game.getLanById("lv" /* lv */)); //策划要求，0转默认都显示50级。不用配置表字段
                    }
                    var star = this.propData.equipStar;
                    this.updateStarTopRight(star);
                }
                else if (this.propData.propType == 8 /* Suit */) {
                    //套装装备
                    if (cfg.equip_lv) {
                        this.updateStage(cfg.equip_lv, '阶');
                    }
                }
            };
            /**
             * 更新一些通用的展示逻辑
             * @private
             */
            Icon.prototype.updatePropIcon = function () {
                if (!this.propData) {
                    return;
                }
                if (this.propData.type == 145 /* Prop */) {
                    if (this.propData.propType == 38 /* Hunka */) {
                        //魂卡
                        var star = this.propData.hunka_star;
                        if (star) {
                            this.updateStar(star);
                        }
                    }
                    else {
                        this.updateStar(0);
                    }
                }
                else {
                    this.updateStar(0);
                }
            };
            return Icon;
        }(mod.BaseRenderer));
        mod.Icon = Icon;
        __reflect(Icon.prototype, "game.mod.Icon");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var IconSel = /** @class */ (function (_super) {
            __extends(IconSel, _super);
            function IconSel() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            //皮肤设置就行了
            // constructor() {
            //     super();
            //     this.skinName = "skins.common.IconSelSkin";
            // }
            /**不做具体实现，子类重写*/
            IconSel.prototype.dataChanged = function () {
            };
            return IconSel;
        }(mod.BaseRenderer));
        mod.IconSel = IconSel;
        __reflect(IconSel.prototype, "game.mod.IconSel");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var TaskRender = /** @class */ (function (_super) {
            __extends(TaskRender, _super);
            function TaskRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TaskRender.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_go, this.onClickDraw, this);
            };
            TaskRender.prototype.dataChanged = function () {
                var task = this.data;
                if (!task) {
                    return;
                }
                var cfg = mod.TaskUtil.getCfg(task.task_id);
                this.lab_desc.text = mod.TaskUtil.getTaskDescNotSchedule(task);
                this.bar.show(task.schedule, task.target, false, 0, false);
                var hasDraw = mod.TaskUtil.hasRewardDraw(task);
                this.btn_go.visible = !hasDraw;
                this.img_finished.visible = hasDraw;
                if (this.btn_go.visible) {
                    var canDraw = mod.TaskUtil.canRewardDraw(task);
                    this.btn_go.redPoint.visible = canDraw;
                    if (canDraw) {
                        this.btn_go.labelDisplay.text = game.getLanById("tishi_29" /* tishi_29 */);
                        this.btn_go.setYellow();
                    }
                    else {
                        this.btn_go.labelDisplay.text = game.getLanById("goto" /* goto */);
                        this.btn_go.setBlue();
                    }
                }
                var rewards = cfg && cfg.rewards;
                var cnt = rewards && rewards[0][1] || 0;
                this.lab_num.text = game.StringUtil.getHurtNumStr(cnt);
            };
            TaskRender.prototype.onClickDraw = function () {
                mod.TaskUtil.clickTask(this.data);
            };
            return TaskRender;
        }(mod.BaseListenerRenderer));
        mod.TaskRender = TaskRender;
        __reflect(TaskRender.prototype, "game.mod.TaskRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 基础的 egret.Event.ADDED_TO_STAGE 和 egret.Event.REMOVED_FROM_STAGE 事件
         */
        var BaseStageEventItem = /** @class */ (function (_super) {
            __extends(BaseStageEventItem, _super);
            function BaseStageEventItem() {
                var _this = _super.call(this) || this;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            BaseStageEventItem.prototype.onAddToStage = function () {
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            };
            BaseStageEventItem.prototype.onRemoveFromStage = function () {
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            };
            return BaseStageEventItem;
        }(eui.Component));
        mod.BaseStageEventItem = BaseStageEventItem;
        __reflect(BaseStageEventItem.prototype, "game.mod.BaseStageEventItem");
        /**基础文本*/
        var BaseLabelItem = /** @class */ (function (_super) {
            __extends(BaseLabelItem, _super);
            function BaseLabelItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseLabelItemSkin";
                return _this;
            }
            BaseLabelItem.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
            };
            BaseLabelItem.prototype.dataChanged = function () {
                var str = this.data;
                this.setLabel(str);
            };
            /**
             * 设置文本样式
             * @param props {textColor: 0xffffff, size: 22, ...}
             */
            BaseLabelItem.prototype.setLabelStyle = function (props) {
                if (!props || !this.lb_desc) {
                    return;
                }
                for (var key in props) {
                    this.lb_desc[key] = props[key];
                }
            };
            /**
             * 设置文本
             * @param txt 文本
             * @param props 文本样式 比如：{textColor: 0xffffff, size: 22, ...}
             */
            BaseLabelItem.prototype.setLabel = function (txt, props) {
                this.lb_desc.textFlow = game.TextUtil.parseHtml(txt);
                if (props) {
                    this.setLabelStyle(props);
                }
            };
            return BaseLabelItem;
        }(mod.BaseListenerRenderer));
        mod.BaseLabelItem = BaseLabelItem;
        __reflect(BaseLabelItem.prototype, "game.mod.BaseLabelItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Handler = base.Handler;
        var ArrayCollection = eui.ArrayCollection;
        //一级界面公共类，不绑定view
        var WndMdr = /** @class */ (function (_super) {
            __extends(WndMdr, _super);
            function WndMdr() {
                var _this = _super.call(this, game.Layer.window) || this;
                _this._firstEnter = false; /**是否首次进入，用于保存界面数据*/
                return _this;
            }
            WndMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._btnList = new ArrayCollection();
                this._tab = this.genMdrTab(mod.TabMdr);
                this._tab.condCheck = Handler.alloc(this, this.onTabCheck);
                this._tab.changeHandler = Handler.alloc(this, this.onTabChanged);
            };
            WndMdr.prototype.addListeners = function () {
                var addEventListener = this.onEgret.bind(this);
                this.onNt("on_common_back" /* ON_COMMON_BACK */, this.onClickBack, this);
                this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                this.onNt("update_wnd_base_mdr_bg" /* UPDATE_WND_BASE_MDR_BG */, this.onBgUpdate, this);
                this.onNt("update_wnd_base_mdr_sel_tab" /* UPDATE_WND_BASE_MDR_SEL_TAB */, this.onTabUpdate, this);
                this.onNt("on_open_func_update" /* ON_OPEN_FUNC_UPDATE */, this.onOpenFuncUpdate, this); //功能开启
            };
            WndMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                egret["entityLayer"] = [
                    "_layerDown", "_layerAvatar", "_layerDropItem", "_layerEffect", "_layerEffect2",
                    "MainLeftView", "MainRightView", "MainBottomView", "MainLeftActTopView", "MainLeftActMidView" //部分主界面
                ];
                this._firstEnter = true;
                this.updateBtnList();
                this.updateViewShow();
                this.updateTabHint();
            };
            WndMdr.prototype.onHide = function () {
                egret["entityLayer"] = null;
                _super.prototype.onHide.call(this);
            };
            WndMdr.prototype.onClickBack = function () {
                mod.ViewMgr.getIns().back();
            };
            /**更新list数据*/
            WndMdr.prototype.updateBtnList = function () {
                var list = [];
                var mdrs = [];
                for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                    var data = _a[_i];
                    if (data.openIdx && !mod.ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                        continue;
                    }
                    mdrs.push(data.mdr);
                    list.push(data);
                }
                this._btnList.source = list;
                this._tab.mdrClsList = mdrs;
            };
            /**刷新显示界面*/
            WndMdr.prototype.updateViewShow = function () {
                var type = this.getDefaultBtnType();
                if (this._showArgs) {
                    if (Array.isArray(this._showArgs)) {
                        type = this._showArgs.shift();
                        this._tab.params = this._showArgs;
                    }
                    else {
                        type = this._showArgs;
                    }
                }
                this._tab.selectIndex = Math.max(this.getMdrPosByType(type), 0);
                this._tab.show();
            };
            /**获取对应的mdr*/
            WndMdr.prototype.getMdrPosByType = function (type) {
                if (!type) {
                    return -1;
                }
                var list = this._btnList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    if (list[i].btnType == type) {
                        return i;
                    }
                }
                return -1;
            };
            /**默认选中的BtnType，可重写*/
            WndMdr.prototype.getDefaultBtnType = function () {
                return "";
            };
            /**分页点击时检测*/
            WndMdr.prototype.onTabCheck = function (index) {
                var data = this._btnList.source[index];
                if (gso.consoleIcon && data.icon) {
                    //打印图标资源
                    console.info("打印图标：", data.icon + 1);
                }
                if (!data.openIdx) {
                    return true;
                }
                return mod.ViewMgr.getIns().checkViewOpen(data.openIdx, true);
            };
            /**分页选中变更时调用，比Mdr的onShow()方法晚执行*/
            WndMdr.prototype.onTabChanged = function () {
                var data = this._btnList.source[this._tab.selectIndex];
                if (!data) {
                    console.error("取不到分页数据");
                    return;
                }
                this.updateBg(data.bg);
                this.setTop();
                this.setViewData();
                this._btnList.replaceAll(this._btnList.source); //刷新分页选中状态
            };
            /** 通用背景监听 */
            WndMdr.prototype.onBgUpdate = function (n) {
                var bg = n.body;
                this.updateBg(bg);
            };
            /**更新背景，子类重写 */
            WndMdr.prototype.updateBg = function (bg) {
            };
            /** 通用移动层级监听，子类重写 */
            WndMdr.prototype.setTop = function () {
            };
            /**保存分页数据，子类可重写*/
            WndMdr.prototype.setViewData = function () {
                var data = this._btnList.source[this._tab.selectIndex];
                if (!this._firstEnter) {
                    /**非首次切换分页时，保存分页数据*/
                    mod.ViewMgr.getIns().lastData = [data.btnType];
                }
                this._firstEnter = false;
            };
            WndMdr.prototype.onTabUpdate = function (n) {
                var type = n.body;
                var index = this.getMdrPosByType(type);
                if (index < 0) {
                    return;
                }
                if (!this.onTabCheck(index)) {
                    return;
                }
                this._tab.selectIndex = index;
                this._tab.show();
            };
            /** 通用红点事件监听 */
            WndMdr.prototype.onHintUpdate = function (n) {
                var data = n.body;
                var list = this._btnList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    var btnData = list[i];
                    if (!btnData.hintTypes) {
                        continue;
                    }
                    var type = mod.HintMgr.getType(btnData.hintTypes); /**转化为红点类型*/
                    if (type != data.node) {
                        continue;
                    }
                    if (!!btnData.showHint != data.value) { //过滤undefined!=false
                        btnData.showHint = data.value;
                        this._btnList.itemUpdated(btnData);
                    }
                    break; /**找到对应红点后则break，减少循环*/
                }
            };
            /** 刷新分页红点 */
            WndMdr.prototype.updateTabHint = function () {
                var list = this._btnList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    var btnData = list[i];
                    if (!btnData.hintTypes) {
                        continue;
                    }
                    var hint = mod.HintMgr.getHint(btnData.hintTypes);
                    if (!!btnData.showHint != hint) { //过滤undefined!=false
                        btnData.showHint = hint;
                        this._btnList.itemUpdated(btnData);
                    }
                }
            };
            /**功能开启刷新按钮*/
            WndMdr.prototype.onOpenFuncUpdate = function (n) {
                var addIdx = n.body;
                for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                    var data = _a[_i];
                    if (addIdx.indexOf(data.openIdx) > -1) {
                        this.updateBtnList();
                        break;
                    }
                }
            };
            return WndMdr;
        }(game.MdrBase));
        mod.WndMdr = WndMdr;
        __reflect(WndMdr.prototype, "game.mod.WndMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod_1) {
        var facade = base.facade;
        var Handler = base.Handler;
        var Tween = base.Tween;
        var TimeMgr = base.TimeMgr;
        var ViewMgr = /** @class */ (function () {
            function ViewMgr() {
                /**记录界面数据，用于返回上一级界面用，会记录data*/
                this._curPath = []; //用any类型保存，有些界面需要保存特殊的数据
                /**记录副本界面数据，突出场景返回副本界面用*/
                this._lastPath = []; //用any类型保存，有些界面需要保存特殊的数据
                /**二级弹窗绑定数据用*/
                // private _curSecondPop: string[][] = [];
                this._propTipsViewType = 0; //道具提示界面
            }
            ViewMgr.getIns = function () {
                if (!this._instance) {
                    this._instance = new ViewMgr();
                }
                return this._instance;
            };
            ViewMgr.prototype.checkVipLv = function (vipLv) {
                var lv = mod_1.VipUtil.getShowVipLv(); //策划配置的是VIP等级
                return lv >= vipLv;
            };
            /**等级开启判断*/
            ViewMgr.prototype.checkLv = function (lv) {
                return game.RoleVo.ins.level >= lv;
            };
            /**等级开启提示文本*/
            ViewMgr.prototype.checkLvStr = function (lv) {
                return game.StringUtil.substitute(game.getLanById("open_level_funcopen" /* open_level_funcopen */), [lv]);
            };
            ViewMgr.prototype.checkPower = function (power) {
                var _power = game.RoleVo.ins.showpower || Long.fromValue(0);
                return _power.gte(power);
            };
            //达到xx关卡判断
            ViewMgr.prototype.checkMainLine = function (mainline) {
                var _p = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                var nextId = _p.passNextIdx; //下一关id
                return nextId > mainline;
            };
            /**判断是否通过当前关卡 */
            ViewMgr.prototype.checkPass = function (pass) {
                var _p = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                return _p.curStep > pass;
            };
            ViewMgr.prototype.checkServerOpen = function (day) {
                return mod_1.RoleUtil.getServerDay() >= day;
            };
            /**转生开启判断*/
            ViewMgr.prototype.checkRebirth = function (rebirth) {
                return (+game.RoleVo.ins.reincarnate | 0) >= rebirth;
            };
            /**转生开启提示文本*/
            ViewMgr.prototype.checkRebirthStr = function (rebirth) {
                return game.StringUtil.substitute(game.getLanById("rebirth_funcopen" /* rebirth_funcopen */), [mod_1.RoleUtil.getRebirthStr(rebirth)]);
            };
            /**系统提示，返回的文本剪切前面几位*/
            ViewMgr.prototype.getOpenFuncShow = function (_idx, spliceNum) {
                var cfg = game.getConfigByNameId("open_function.json" /* OpenFunction */, _idx);
                var tips = "";
                if (!cfg || !cfg.is_show_tips) {
                    return tips;
                }
                if (cfg.attendre && cfg.attendre == 1) {
                    return game.getLanById("world_boss1" /* world_boss1 */);
                }
                if (cfg.mainline && !this.checkMainLine(cfg.mainline)) { //主线关卡开启
                    var line_cfg = game.getConfigByNameId("gate1.json" /* Gate */, cfg.mainline);
                    var str = game.StringUtil.substitute(game.getLanById("mainline_funcopen" /* mainline_funcopen */), [line_cfg.gate_name]);
                    if (spliceNum) {
                        return str.slice(spliceNum, str.length);
                    }
                    return str;
                }
                else if (cfg.open_level && !this.checkLv(cfg.open_level)) { //角色等级开启
                    return this.checkLvStr(cfg.open_level);
                }
                else if (cfg.rebirth && !this.checkRebirth(cfg.rebirth)) { //转生开启
                    return this.checkRebirthStr(cfg.rebirth);
                }
                else if (cfg.svr_open && !this.checkServerOpen(cfg.svr_open)) { //开服第几天开启
                    return game.StringUtil.substitute(game.getLanById("svr_open_funcopen" /* svr_open_funcopen */), [cfg.svr_open]);
                }
                else if (cfg.power && !this.checkPower(cfg.power)) { //战力开启
                    return game.StringUtil.substitute(game.getLanById("power_funcopen" /* power_funcopen */), [game.StringUtil.getHurtNumStr(cfg.power)]);
                }
                else if (cfg.vip_index && !this.checkVipLv(cfg.vip_index)) { //vip开启
                    var vipStr = mod_1.VipUtil.getVipStr(cfg.vip_index);
                    return game.StringUtil.substitute(game.getLanById("vip_index_funcopen" /* vip_index_funcopen */), [vipStr]);
                }
                else if (cfg.main_task_index) { //主线任务开启
                    //return StringUtil.substitute(getLanById(LanDef.shenzhuang_tips), [cfg.name]);
                    return "主线任务开启";
                }
                else if (cfg.wear_condition) { //禁地关卡条件
                    var shilianProxy = game.getProxy("49" /* Shilian */, 194 /* Shilian */);
                    var type = Math.floor(cfg.wear_condition[0] / 100);
                    var info = shilianProxy.getFbdInfo(type);
                    var fbdCfgs = game.getConfigByNameId("forbidden_gate.json" /* ForbiddenGate */, cfg.wear_condition[0]);
                    if (fbdCfgs) {
                        var fbdCfg = fbdCfgs[cfg.wear_condition[1]];
                        if (!info || info.index < cfg.wear_condition[0]
                            || (cfg.wear_condition[0] == info.index && cfg.wear_condition[1] > info.id)) {
                            tips = game.ForbiddenTypeName[type] + cfg.wear_condition[0] % 100 + '章' + fbdCfg.gate_id + '关开启';
                        }
                    }
                }
                return tips;
            };
            /**判断当前界面是否已打开，先保留，不推荐使用*/
            ViewMgr.prototype.isShow = function (mName, vType) {
                var mod = facade.retMod(mName);
                if (!mod)
                    return null;
                var view = mod["__mdrIns"][vType];
                if (!view)
                    return null;
                return view["__show"];
            };
            /**当前是否在主界面*/
            ViewMgr.prototype.isMain = function () {
                var self = this;
                if (self._curName == null || self._curType == null) {
                    return true;
                }
                return !self.isShow(self._curName, self._curType);
            };
            ViewMgr.prototype.checkModOpen = function (mName) {
                return this._curName == mName;
            };
            /***************************以下为新加的接口******************************/
            /**
             * 一级弹窗界面，会关闭旧的一级界面
             * @param {string} mName，ModName
             * @param {string} vType，ViewType
             * @param data，界面数据
             * @param showBack，走通用返回逻辑
             */
            ViewMgr.prototype.showView = function (mName, vType, data, showBack) {
                if (showBack === void 0) { showBack = true; }
                if (this._curName && (this._curName != mName || this._curType != vType)) {
                    /**关闭旧的一级弹窗*/
                    this.hideMainView();
                }
                // if (this._curSecondPop && this._curSecondPop.length) {
                //     /**关闭二级弹窗*/
                //     for (let i of this._curSecondPop) {
                //         facade.hideView(i[0], i[1]);
                //     }
                //     this._curSecondPop = [];
                // }
                this._curName = mName;
                this._curType = vType;
                if (showBack) {
                    this.setLastView(mName, vType, data);
                }
                facade.showView(mName, vType, data);
            };
            /**记录上一个界面*/
            ViewMgr.prototype.setLastView = function (mName, vType, data) {
                var last = this._curPath.length ? this._curPath[this._curPath.length - 1] : [];
                if (!last.length || last[0] != mName || last[1] != vType) {
                    var path = [mName, vType];
                    if (data) {
                        path = path.concat(data);
                    }
                    this._curPath.push(path); /**记录上一个界面*/
                }
            };
            /**清除界面数据，断线重连时候也会清除*/
            ViewMgr.prototype.clearView = function () {
                this._curPath = [];
            };
            Object.defineProperty(ViewMgr.prototype, "lastData", {
                get: function () {
                    if (this._curPath.length) {
                        var path = this._curPath[this._curPath.length - 1];
                        return path.length > 2 ? path.slice(2, path.length) : null;
                    }
                    return null;
                },
                /**
                 * 保存的界面数据，退出场景返回界面用
                 * @param data 界面数据，一般是BtnType
                 */
                set: function (data) {
                    if (this._curPath.length) {
                        var path = this._curPath[this._curPath.length - 1];
                        path.splice(2, path.length - 2); //去除多余数据
                        this._curPath[this._curPath.length - 1] = path.concat(data);
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 绑定二级弹窗界面,方便实现关闭按钮
             * @param {string} mName，ModName
             * @param {string} vType，ViewType
             * @param data，界面数据
             */
            ViewMgr.prototype.showSecondPop = function (mName, vType, data) {
                // let isSame = false;
                // for (let i of this._curSecondPop) {
                //     if (i[0] == mName && i[1] == vType) {
                //         isSame = true;
                //         break;
                //     }
                // }
                // if (!isSame) {
                //     this._curSecondPop.push([mName, vType]);
                // }
                //this.setLastView(mName, vType, data);
                facade.showView(mName, vType, data);
            };
            // public getSecondPopMod(): string[] {
            //     for (let i = this._curSecondPop.length - 1; i >= 0; --i) {
            //         let info = this._curSecondPop.pop();
            //         let mName = info[0];
            //         let vType = info[1];
            //         if (this.isShow(mName, vType)) {
            //             return info;
            //         }
            //     }
            //     return [];
            // }
            /**
             * 回到主界面
             */
            ViewMgr.prototype.showMain = function () {
                this.hideMainView(); //关闭当前界面
                this.clearView(); //清除界面数据
                mod_1.GuideMgr.getIns().backMain(); //返回主界面时触发
                mod_1.PropTipsMgr.getIns().continueBoss(); //继续boss弹窗
            };
            /**
             * 统一关闭系统主界面
             */
            ViewMgr.prototype.hideMainView = function () {
                if (this._curName) {
                    facade.hideView(this._curName, this._curType);
                    this._curName = null;
                    this._curType = null;
                }
            };
            /**
             * 返回上一级界面
             */
            ViewMgr.prototype.back = function () {
                var path = this._curPath[this._curPath.length - 2];
                if (path) {
                    var mName = path[0];
                    var vType = path[1];
                    var data = path.length > 2 ? path.slice(2, path.length) : null;
                    this._curPath.length = this._curPath.length - 2;
                    this.showView(mName, vType, data);
                    return;
                }
                this.showMain();
            };
            /**
             * 返回第一个界面,用于退出副本后返回界面
             */
            ViewMgr.prototype.backLast = function () {
                var path = this._lastPath.pop();
                if (path) {
                    var mName = path[0];
                    var vType = path[1];
                    var data = path.length > 2 ? path.slice(2, path.length) : null;
                    this.showView(mName, vType, data);
                }
            };
            /**
             * 保存副本界面数据
             */
            ViewMgr.prototype.saveLast = function () {
                var path = this._curPath[this._curPath.length - 1];
                if (path) {
                    this._lastPath.push(path.concat());
                    this.clearView(); //清除界面数据
                }
            };
            /**
             * 判断是否隐藏按钮
             * @returns {boolean}
             * @param openIdx
             */
            ViewMgr.prototype.checkBtnShow = function (openIdx) {
                if (!this.checkViewOpen(openIdx, false)) {
                    var cfg = game.getConfigByNameId("open_function.json" /* OpenFunction */, openIdx);
                    if (!cfg) {
                        return true; //没功能开启配置先显示着
                    }
                    return cfg.is_hide != 1;
                }
                return true;
            };
            /**
             * 判断功能开启
             * @param openIdx
             * @param showTips 是否提示，默认false
             */
            ViewMgr.prototype.checkViewOpen = function (openIdx, showTips) {
                if (showTips === void 0) { showTips = false; }
                if (typeof openIdx == "string") {
                    openIdx = parseInt(openIdx);
                }
                var _m = facade.retMod("05" /* Main */).retProxy(3 /* Main */);
                var isOpen = _m.openFuncIdx && _m.openFuncIdx.indexOf(openIdx) > -1;
                if (isOpen) {
                    return true;
                }
                if (!showTips) {
                    return false;
                }
                //先暂时使用前端判断着，等后端
                var _tips = this.getOpenFuncShow(openIdx);
                if (_tips) {
                    game.PromptBox.getIns().show(_tips);
                }
                return false;
            };
            /**
             * 根据跳转id跳转
             * @param {number} id 跳转id
             * @param {any} param 附带参数
             * @param showBack，走通用返回逻辑
             * @param showTips 跳转不成功提示
             */
            ViewMgr.prototype.showViewByID = function (id, param, showBack, showTips) {
                if (showBack === void 0) { showBack = true; }
                if (showTips === void 0) { showTips = ""; }
                if (1002 /* HangUp2 */ == id) {
                    if (!mod_1.SceneUtil.isShowMain()) {
                        game.PromptBox.getIns().show(game.getLanById("area_tips" /* area_tips */));
                        return;
                    }
                    //回到挂机界面
                    facade.sendNt("on_view_hide" /* ON_VIEW_HIDE */); //跳转界面时发送关闭原界面事件，需要的可以监听
                    this.showMain();
                    return;
                }
                var jumpData = game.JumpDataList[id];
                if (!jumpData) {
                    // 没配置跳转路径的直接返回
                    var cfg = game.getConfigByNameId("jump.json" /* Jump */, id);
                    game.PromptBox.getIns().show(cfg.name);
                    return;
                }
                if (jumpData.openIdx && !this.checkViewOpen(jumpData.openIdx, true)) {
                    return;
                }
                var openInfo = this.checkJumpOpen(id, jumpData);
                if (!openInfo.isOpen) {
                    //跳转的界面特殊情况下关闭的
                    if (showTips && showTips != "") {
                        game.PromptBox.getIns().show(showTips);
                    }
                    return;
                }
                var list = jumpData.viewDatas.concat();
                if (list.length == 2) {
                    list.push("00");
                }
                var moduleId = list.shift();
                var vType = list.shift();
                var showArgs = list.length > 0 ? list : null;
                if (param != undefined) {
                    if (!showArgs) {
                        showArgs = [];
                    }
                    showArgs.push(param);
                }
                facade.sendNt("on_view_hide" /* ON_VIEW_HIDE */); //跳转界面时发送关闭原界面事件，需要的可以监听
                if (jumpData.layer == 2 /* SecondPop */) {
                    //二级界面
                    this.showSecondPop(moduleId, vType, showArgs);
                }
                else if (jumpData.layer == 3 /* Third */) {
                    facade.showView(moduleId, vType, showArgs);
                }
                else {
                    this.showView(moduleId, vType, showArgs, showBack);
                }
            };
            //检测跳转ID，特殊的活动需要处理下，比如领完奖励后关闭的，后台控制的活动等等
            ViewMgr.prototype.checkJumpOpen = function (id, jumpData) {
                var isAct = true; //是否特殊的活动
                var isOpen = true; //是否开启，todo，各自系统各自处理
                switch (id) {
                    case 84 /* HuangGuForbidden */:
                    case 85 /* XianLingForbidden */:
                    case 86 /* TianZhiForbidden */:
                        var type = this.decodeJumpData(jumpData);
                        var shilianProxy = facade.retMod("49" /* Shilian */).retProxy(194 /* Shilian */);
                        isOpen = shilianProxy.isFbdTypeOpen(type, true);
                        break;
                    case 93 /* Bossgift */:
                    case 94 /* Yijiegift */:
                    case 95 /* Shiliangift */:
                    case 96 /* Fuben2gift */:
                    case 97 /* Fuben3gift */:
                        var productId = this.decodeJumpData(jumpData);
                        isOpen = mod_1.PayUtil.checkShowGift(productId);
                        break;
                    case 88 /* UnionJuanXian */:
                    case 110 /* UnionKill */:
                    case 121 /* UnionTreasure */:
                    case 123 /* UnionStorage */:
                    case 124 /* UnionHeroShop */:
                    case 125 /* UnionBeast */:
                    case 126 /* UnionBook */:
                    case 127 /* UnionWage */:
                        var unionProxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                        isOpen = unionProxy.isInUnion;
                        break;
                    case 69 /* PunshList */:
                        isOpen = !!game.ActivityUtil.getType();
                        break;
                    case 66 /* ZeroBuy */:
                        var zerobuyProxy = facade.retMod("27" /* Activity */).retProxy(210 /* ZeroBuy */);
                        isOpen = zerobuyProxy.isOpen;
                        break;
                    case 76 /* XianlvShilian */:
                        var xianlvProxy = facade.retMod("58" /* Xianyuan */).retProxy(226 /* Xianlv */);
                        isOpen = xianlvProxy.isOpenShilian();
                        break;
                    case 101 /* Tiandilu */:
                    case 102 /* Tiandiluxuanyuan */:
                        isOpen = mod_1.RoleUtil.isRoleRingAct();
                        break;
                    case 108 /* Lottery */:
                        var lotteryProxy = facade.retMod("27" /* Activity */).retProxy(203 /* Lottery */);
                        isOpen = lotteryProxy.isOpen();
                        break;
                    case 106 /* Huashenzhilu */:
                        var huashenProxy = facade.retMod("61" /* More */).retProxy(241 /* Huashen */);
                        isOpen = huashenProxy.checkRoadOpen(true);
                        break;
                    case 118 /* Yaojijiangshi3 */:
                        var yjjsProxy = facade.retMod("27" /* Activity */).retProxy(214 /* Yjjs */);
                        isOpen = yjjsProxy.isOpen();
                        break;
                    case 120 /* XujieJitan */:
                    case 132 /* XujieTansuo */:
                    case 133 /* XujieKuangmai */:
                        var zhanduiProxy = facade.retMod("61" /* More */).retProxy(251 /* Zhandui */);
                        isOpen = zhanduiProxy.haveTeam();
                        break;
                    case 83 /* XianlvRing */:
                        var ringProxy = facade.retMod("58" /* Xianyuan */).retProxy(228 /* Ring */);
                        isOpen = ringProxy.canOpenGift();
                        break;
                    case 135 /* XianmaiZhengduo */:
                        var XianmaiProxy = facade.retMod("61" /* More */).retProxy(261 /* Xianmai */);
                        isOpen = XianmaiProxy.isActTime();
                        break;
                    case 134 /* Xiandi */:
                        var XiandiProxy = facade.retMod("61" /* More */).retProxy(260 /* Xiandi */);
                        isOpen = XiandiProxy.checkOpen();
                        break;
                    /**这里不要做功能开启判断*/
                    default:
                        isAct = false; //默认不是
                        break;
                }
                return { isOpen: isOpen, isAct: isAct };
            };
            //解析JumpData里面viewDatas的最后一个数据，特殊系统用
            ViewMgr.prototype.decodeJumpData = function (jumpData) {
                var list = jumpData.viewDatas.concat();
                var data = parseInt(list.pop());
                return data;
            };
            //是否显示跳转按钮
            ViewMgr.prototype.showJumpBtn = function (id) {
                var jumpData = game.JumpDataList[id];
                var showJump = !!jumpData;
                if (showJump) {
                    //显示跳转按钮时候，判断是否特殊的活动，是的话根据活动开启状态显示跳转
                    var openInfo = this.checkJumpOpen(id, jumpData);
                    if (openInfo.isAct) {
                        return openInfo.isOpen;
                    }
                }
                return showJump;
            };
            /**
             * 成功提示，例如激活成功、升级成功
             * @param type 资源类型
             */
            ViewMgr.prototype.showSuccessTips = function (type) {
                if (type === void 0) { type = 2 /* Up */; }
                facade.showView("05" /* Main */, "16" /* SuccessTips */, type);
            };
            /**
             * 道具提示
             * @param data 道具数据
             * @param iconShowType Icon显示类型：IconShowType
             */
            ViewMgr.prototype.showPropTips = function (data, iconShowType) {
                if (typeof data == "number") {
                    if (iconShowType == 2 /* Bag */) {
                        data = mod_1.BagUtil.getPropDataByIdx(data); //取背包的数据
                        data.iconShowType = iconShowType;
                    }
                    else {
                        data = game.PropData.create(data); //创建道具数据
                    }
                }
                if (data.type == 290 /* Equip */) {
                    //装备
                    if (data.propType == 9 /* Lingqi */) {
                        facade.showView("45" /* Shenling */, "10" /* ShenlingLingqiBagTips */, data);
                    }
                    else if (data.propType == 3 /* Shouling */) {
                        facade.showView("62" /* Yishou */, "11" /* ShoulingEquipTipsBag */, data);
                    }
                    else if (data.propType == 2 /* Yishou */) {
                        facade.showView("62" /* Yishou */, "06" /* ShouguEquipTips */, data);
                    }
                    else if (data.propType == 8 /* Suit */) {
                        facade.showView("06" /* Role */, "22" /* SuitEquipBagTips */, data);
                    }
                    else {
                        this.showRoleEquipTips(data);
                    }
                }
                else if (data.type == 400 /* Shenling */) {
                    //神灵
                    var shenlingProxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var starCfg = shenlingProxy.getStarCfg(data.cfg.index, 1);
                    if (starCfg && starCfg.star_consume) {
                        var costId = starCfg.star_consume[0][0]; //获取对应消耗id
                        ViewMgr.getIns().showPropTips(costId);
                    }
                }
                else if (data.propType == 11 /* Surface */) {
                    //外显
                    facade.showView("12" /* Bag */, "08" /* PropSurfaceTips */, data);
                }
                else if (data.propType == 13 /* Amass */ || data.propType == 36 /* ZhanduiLingbao */) {
                    //图鉴
                    facade.showView("57" /* Consecrate */, "22" /* AmassTips */, data);
                }
                else if (data.propType == 34 /* BaozangSuipian */) {
                    //宝藏碎片
                    facade.showView("27" /* Activity */, "62" /* SummonTreasureTips */, data);
                }
                else if (data.propType == 17 /* Lianshendan */) {
                    //炼神丹
                    facade.showView("12" /* Bag */, "11" /* PropPillTips */, data);
                }
                else if (data.propType == 33 /* Lingpo */) {
                    //灵魄
                    facade.showView("45" /* Shenling */, "13" /* ShenlingLingpoIconTipsBag */, data);
                }
                else {
                    //通用道具提示
                    this._propTipsViewType = this._propTipsViewType % 5;
                    var viewType = (this._propTipsViewType + parseInt("101" /* PropTips1 */)) + "";
                    facade.showView("12" /* Bag */, viewType, data);
                    this._propTipsViewType++;
                }
            };
            /**
             * 玩家身上装备提示
             * @param data 道具数据
             * @param isSelf 是否是自己的信息
             * @param isBag 是否在背包点击
             */
            ViewMgr.prototype.showRoleEquipTips = function (data, isSelf, isBag) {
                facade.showView("06" /* Role */, "05" /* RoleEquipTips */, {
                    data: data,
                    isSelf: isSelf,
                    isBag: isBag
                });
            };
            /**
             * 获得外显，激活外显提示
             * @param index 外显index
             * @param triggerGuide 关闭后继续指引，服务端下发获得碎片弹窗不执行这个，激活外显时候执行
             */
            ViewMgr.prototype.showSurfaceTips = function (index, triggerGuide) {
                if (triggerGuide === void 0) { triggerGuide = true; }
                if (index instanceof Long) {
                    index = index.toNumber();
                }
                mod_1.PropTipsMgr.getIns().showSurface(index, triggerGuide);
            };
            /**
             * 外显进阶成功提示
             * @param skillId 技能ID
             * @param lv 技能等级
             * @param lvDesc 直接取等级描述
             */
            ViewMgr.prototype.showSurfaceUpTips = function (skillId, lv, lvDesc) {
                var data = { skillId: skillId, lv: lv, lvDesc: lvDesc };
                if (lv <= 1) {
                    facade.showView("46" /* Surface */, "16" /* SurfaceUpTips */, data); //进阶成功
                }
                else {
                    facade.showView("46" /* Surface */, "19" /* SurfaceUpTips2 */, data); //进阶成功
                }
            };
            /**
             * 突破成功提示
             * @param skillId 技能id
             * @param lv 突破后的阶数
             * @param attrDesc0 突破前的文本或属性
             * @param attrDesc1 突破后的文本或属性
             */
            ViewMgr.prototype.showBreakthroughTips = function (skillId, lv, attrDesc0, attrDesc1) {
                var data = {
                    skillId: skillId,
                    lv: lv,
                    attrDesc0: attrDesc0, attrDesc1: attrDesc1
                };
                if (lv <= 1) {
                    facade.showView("05" /* Main */, "43" /* BreakthroughTips */, data);
                }
                else {
                    facade.showView("05" /* Main */, "44" /* BreakthroughTips2 */, data);
                }
            };
            /**
             * 升星成功提示
             * @param data
             */
            ViewMgr.prototype.showUpStarTips = function (data) {
                if (data.skillId) {
                    facade.showView("05" /* Main */, "46" /* UpStarTips2 */, data); //有天赋技能等
                }
                else {
                    facade.showView("05" /* Main */, "45" /* UpStarTips */, data); //只有星级+属性
                }
            };
            /**
             * 道具来源提示界面
             * @param index 道具index
             */
            ViewMgr.prototype.showGainWaysTips = function (index) {
                this.showSecondPop("12" /* Bag */, "07" /* GainWaysTips */, index);
            };
            /**
             * 通用的属性展示面板 (带有仙力属性)
             * @param titleStr 弹窗标题，未支持传入提示表的key
             * @param attrs 属性
             */
            ViewMgr.prototype.showAttrTips = function (titleStr, attrs) {
                this.showSecondPop("05" /* Main */, "30" /* BaseAttrTips */, {
                    titleStr: titleStr, attrs: attrs, state: 1
                });
            };
            /**
             * 通用的属性展示面板（没有仙力属性相关的）
             * @param titleStr 弹窗标题，未支持传入提示表的key
             * @param attrs 属性
             * @param attrItemStr 属性标题，默认【基础属性】
             * @param layoutType 展示属性的list布局，默认【2:TileLayout】 1: VerticalLayout, 2: TileLayout
             */
            ViewMgr.prototype.showAttrTipsWithoutGod = function (titleStr, attrs, attrItemStr, layoutType) {
                if (attrItemStr === void 0) { attrItemStr = game.getLanById("base_attr" /* base_attr */); }
                if (layoutType === void 0) { layoutType = 2; }
                this.showSecondPop("05" /* Main */, "30" /* BaseAttrTips */, {
                    titleStr: titleStr, attrs: attrs, attrItemStr: attrItemStr, state: 2, layoutType: layoutType
                });
            };
            /**
             * 通用的奖励领取tips
             * @param titleStr 面板title，传空，默认奖励预览
             * @param reward 奖励数组
             * @param state 状态0：未完成，1: 可领取，2：已领取
             * @param handler 点击领取按钮回调。点击后抛出 MainEvent.UPDATE_BASE_REWARD_MDR_STATE 用于更新领取状态
             * @param tipsStr 提示文本，存在提示文本时，不显示领取状态
             */
            ViewMgr.prototype.showRewardTips = function (titleStr, reward, state, handler, tipsStr) {
                this.showSecondPop("05" /* Main */, "31" /* BaseRewardTips */, {
                    titleStr: titleStr, reward: reward, state: state, handler: handler, tipsStr: tipsStr
                });
            };
            /**
             * 通用的宝箱奖励查看
             * @param tips 描述文本
             * @param reward 奖励数组
             * @param tips1 描述文本2
             * @param okFunc 点击确定函数
             */
            ViewMgr.prototype.showBoxReward = function (tips, reward, tips1, okFunc, time) {
                this.showSecondPop("05" /* Main */, "34" /* BoxReward */, {
                    tips: tips, reward: reward, tips1: tips1, okFunc: okFunc, time: time
                });
            };
            /**通用的宝箱奖励查看与上同 参数整合 */
            ViewMgr.prototype.showBoxReward2 = function (data) {
                this.showSecondPop("05" /* Main */, "34" /* BoxReward */, data);
            };
            /**
             * 通用的购买次数
             * @param tips 描述文本
             * @param cost 单次购买消耗
             * @param cnt 剩余可购买次数
             * @param maxBuyCnt 当前可购买次数
             * @param maxCnt 最大可购买次数
             * @param handler 点击购买按钮回调
             */
            ViewMgr.prototype.showBuyTimes = function (tips, cost, cnt, maxBuyCnt, maxCnt, handler) {
                this.showSecondPop("05" /* Main */, "35" /* BuyTimes */, {
                    tips: tips, cost: cost, cnt: cnt, maxBuyCnt: maxBuyCnt, maxCnt: maxCnt, handler: handler
                });
            };
            /**
             * 被动技能界面，激活后发送 SurfaceEvent.SURFACE_SKILL_UPDATE 并携带是否激活参数，以刷新状态
             * @param skillId 技能index
             * @param isAct 是否激活
             * @param confirm 激活回调
             * @param condHandler 其他激活条件
             */
            ViewMgr.prototype.showSkillTips = function (skillId, isAct, confirm, condHandler) {
                facade.showView("46" /* Surface */, "07" /* SkillTips */, {
                    skillId: skillId,
                    isAct: isAct,
                    confirm: confirm,
                    condHandler: condHandler
                });
            };
            /**
             * 技能一般提示界面
             * @param skillId 技能index
             * @param lv 等级
             * @param isXianfaSkill 是否仙法技能展示
             */
            ViewMgr.prototype.showSkillNormalTips = function (skillId, lv, isXianfaSkill) {
                if (isXianfaSkill === void 0) { isXianfaSkill = false; }
                facade.showView("46" /* Surface */, "17" /* SkillNormalTips */, {
                    skillId: skillId,
                    lv: lv,
                    isXianfaSkill: isXianfaSkill
                });
            };
            /**
             * 技能激活条件展示
             * @param skillId 技能id
             * @param isActed 是否激活
             * @param actStr  未激活时，展示的激活条件
             */
            ViewMgr.prototype.showSkillConditionTips = function (skillId, isActed, actStr) {
                facade.showView("58" /* Xianyuan */, "12" /* SkillConditionTips */, {
                    skillId: skillId,
                    isActed: isActed,
                    actStr: actStr
                });
            };
            /**
             * 规则说明界面
             * @param str 文本
             * @param titleStr 标题，默认玩法说明
             */
            ViewMgr.prototype.showRuleTips = function (str, titleStr) {
                if (titleStr === void 0) { titleStr = game.getLanById("wanfashuoming" /* wanfashuoming */); }
                this.showSecondPop("05" /* Main */, "32" /* BaseRuleDesc */, [str, titleStr]);
            };
            /**
             * 挑战第几层
             * @param lv 层级
             */
            ViewMgr.prototype.showChallengeTips = function (lv) {
                facade.showView("03" /* Scene */, "03" /* ChallengeTips */, lv);
            };
            /**
             * 排行榜界面
             * @param rankType 排行榜类型
             */
            ViewMgr.prototype.showRank = function (rankType) {
                this.showView("31" /* Rank */, "01" /* RankMain */, ["01" /* Rank */, rankType]);
            };
            /**
             * 礼包界面
             * @param productId 商品id
             */
            ViewMgr.prototype.showGift = function (productId) {
                facade.showView("50" /* Pay */, "01" /* Gift */, productId);
            };
            /**
             * Boss奖励预览
             * @param rewardId 奖励预览id，可拓展
             * @param tips 提示文本
             */
            ViewMgr.prototype.bossReward = function (rewardId, tips) {
                this.showSecondPop("22" /* Boss */, "02" /* BossReward */, { rewardId: rewardId, tips: tips });
            };
            /**
             * 奖励获取
             * @param rewards 奖励
             */
            ViewMgr.prototype.bossRewardShow = function (rewards) {
                this.showSecondPop("22" /* Boss */, "07" /* BossRewardShow */, rewards);
            };
            /**
             * 奖励预览
             * @param rewards 奖励
             * @param tips 提示文本
             * @param title 标题，不传默认：奖励预览
             */
            ViewMgr.prototype.rewardShow = function (rewards, tips, title) {
                this.showSecondPop("61" /* More */, "35" /* RewardShow */, {
                    rewards: rewards,
                    tips: tips,
                    title: title
                });
            };
            /**
             * 查看玩家信息
             * @param roleId，玩家角色id
             * @param serverId，玩家服务器id
             * @param isRobot，是否机器人
             */
            ViewMgr.prototype.showRoleTips = function (roleId, serverId, isRobot) {
                var proxy = facade.retMod("25" /* Chat */).retProxy(35 /* Chat */);
                if (!isRobot) {
                    isRobot = 0;
                }
                proxy.c2s_chat_look_user(serverId, roleId, isRobot, 2 /* Show */);
            };
            /**
             * 私聊玩家
             * @param info，玩家信息或者角色id
             */
            ViewMgr.prototype.chat = function (info) {
                if (!this.checkViewOpen(1041670231 /* ChatPrivate */, true)) {
                    //未开启私聊时不给聊天
                    return;
                }
                var chatProxy = facade.retMod("25" /* Chat */).retProxy(35 /* Chat */);
                chatProxy.setPrivateInfo(info);
                this.showView("25" /* Chat */, "01" /* ChatMain */, "03" /* Private */); //跳转私聊
            };
            /**
             * 只有确定按钮
             * @param {string} content
             * @param confirm
             */
            ViewMgr.prototype.show = function (content, confirm) {
                var showArg = {
                    currentState: "1",
                    content: content,
                    confirm: confirm
                };
                this.showSecondPop("05" /* Main */, "33" /* Alert */, showArg);
            };
            /**
             * 有确定和取消按钮
             * @param {string} content
             * @param {base.Handler} confirm
             * @param {base.Handler} cancel
             * @param changeHide 场景变化后关闭否，默认false
             */
            ViewMgr.prototype.showConfirm = function (content, confirm, cancel, changeHide) {
                var showArg = {
                    currentState: "2",
                    content: content,
                    confirm: confirm,
                    cancel: cancel,
                    changeHide: changeHide
                };
                this.showSecondPop("05" /* Main */, "33" /* Alert */, showArg);
            };
            /**
             * 只有确定按钮以及本次登录不再提示
             * @param {string} content
             * @param type 不再提示类型
             * @param confirm
             */
            ViewMgr.prototype.showNotTips = function (content, type, confirm) {
                var showArg = {
                    currentState: "3",
                    content: content,
                    type: type,
                    confirm: confirm
                };
                this.showSecondPop("05" /* Main */, "33" /* Alert */, showArg);
            };
            /**
             * 活动最后一天提示
             * @param endTime，活动结束时间戳
             * @param type 不再提示类型
             * @param content，默认：活动仅剩最后一天，若有奖励可领取或兑换，请记得前往
             */
            ViewMgr.prototype.showActTips = function (endTime, type, content) {
                var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                if (leftTime >= game.Second.Day) {
                    return;
                }
                //小于一天时提示
                var mainProxy = facade.retMod("05" /* Main */).retProxy(3 /* Main */);
                var isSel = mainProxy.getNotTipsType(type);
                if (!isSel) {
                    if (!content) {
                        content = game.getLanById("carnival_tips5" /* carnival_tips5 */);
                    }
                    this.showNotTips(content, type);
                }
            };
            /** 跳转VIP界面 */
            ViewMgr.prototype.openVipView = function () {
                this.showViewByID(43 /* VIP */);
            };
            /**
             * 常规充值流程 先判断首充 再跳转商城
             * */
            ViewMgr.prototype.openCommonRechargeView = function () {
                if (mod_1.PayUtil.checkFirstCharge()) {
                    if (!this.checkViewOpen(1041670148 /* StoreXianyu */, true)) {
                        return;
                    }
                    ViewMgr.getIns().showView("29" /* Store */, "01" /* StoreMain */, "02" /* Btn2 */);
                }
                else {
                    if (!this.checkViewOpen(1041670143 /* FirstCharge */, true)) {
                        return;
                    }
                    ViewMgr.getIns().showSecondPop("27" /* Activity */, "49" /* FirstCharge */);
                }
            };
            /**
             * 通用的批量购买tips todo
             * @param index 商店表的商品
             * @param left_cnt 剩余购买数量
             * @param handler 购买回调
             */
            ViewMgr.prototype.openStoreBuyTips = function (index, left_cnt, handler) {
                facade.showView("29" /* Store */, "02" /* StoreBuyTips */, {
                    index: index, left_cnt: left_cnt, handler: handler
                });
            };
            /**批量购买（不读配置） */
            ViewMgr.prototype.openBuyBulkTips = function (param) {
                this.showSecondPop("27" /* Activity */, "55" /* ExchangeShopTips */, param);
            };
            /**跳转兑换商店界面 */
            ViewMgr.prototype.openExchangeShopView = function (btnType) {
                ViewMgr.getIns().showView("27" /* Activity */, "54" /* ExchangeShop */, btnType);
            };
            /**
             * 检查boss是否开启
             * @param openType boss表开启条件第一个参数 1等级条件 2转生条件
             * @param openLevel boss表开启条件第二个参数
             * @param showTips
             * */
            ViewMgr.prototype.checkBossOpen = function (openType, openLevel, showTips) {
                var isOpen = false;
                if (openType == 1 /* Lv */) {
                    isOpen = ViewMgr.getIns().checkLv(openLevel);
                    if (!isOpen && showTips) {
                        game.PromptBox.getIns().show(ViewMgr.getIns().checkLvStr(openLevel));
                    }
                }
                else {
                    isOpen = ViewMgr.getIns().checkRebirth(openLevel);
                    if (!isOpen && showTips) {
                        game.PromptBox.getIns().show(ViewMgr.getIns().checkRebirthStr(openLevel));
                    }
                }
                return isOpen;
            };
            /**
             * 抖动界面，效果还需要调，都是由缓动组成
             * @param layer 被抖动的层
             */
            ViewMgr.prototype.shakeUI = function (view) {
                var oriX = view.x;
                var oriY = view.y;
                Tween.remove(view);
                var tween = Tween.get(view);
                var dis = 5;
                tween.to({ y: oriY - dis }, 100).to({ y: oriY + dis }, 100)
                    .to({ x: oriX - dis }, 100).to({ x: oriX + dis }, 100)
                    .to({ y: oriY - dis }, 100).to({ y: oriY + dis }, 100)
                    .to({ x: oriX - dis }, 100).to({ x: oriX + dis }, 100).exec(Handler.alloc(this, function () {
                    view.x = oriX;
                    view.y = oriY;
                    Tween.remove(view);
                }));
            };
            ViewMgr.prototype.shakeUI2 = function (view) {
                var oriX = view.x;
                var oriY = view.y;
                Tween.remove(view);
                var tween = Tween.get(view);
                var dis = 5;
                tween.to({ x: oriX - dis }, 50).to({ x: oriX + dis }, 50)
                    .exec(Handler.alloc(this, function () {
                    view.x = oriX;
                    view.y = oriY;
                    Tween.remove(view);
                }));
            };
            /**
             * 奖励预览弹窗，带有权重
             * @param data
             */
            ViewMgr.prototype.openPreviewReward = function (data) {
                this.showSecondPop("27" /* Activity */, "77" /* BasePreviewReward */, data);
            };
            /**
             * 达标奖励界面，传入礼包类型【J_进阶奖励的dabiaojiangli页】
             * @param giftType
             */
            ViewMgr.prototype.openGiftView = function (giftType) {
                this.showView("53" /* Gift */, "01" /* Main */, giftType);
            };
            /**检测战队军团阵容是否上阵
             * 没上阵的话跳转上阵界面
             * */
            ViewMgr.prototype.checkZhenrong = function (jump) {
                var proxy = facade.retMod("61" /* More */).retProxy(256 /* XujieTansuo */);
                if (!proxy.shenling_list) {
                    if (jump) {
                        this.showSecondPop("61" /* More */, "66" /* Zhenrong */);
                    }
                    return false; //不能挑战
                }
                return true;
            };
            /**检测战队军团阵容仙力
             * 仙力不足时，提示：敌人军团仙力较高，是否继续挑战？*/
            ViewMgr.prototype.checkZhenrongGod = function (god, handler) {
                var proxy = facade.retMod("61" /* More */).retProxy(256 /* XujieTansuo */);
                var attr = proxy.legion_attr;
                var curGod = attr && attr.legion_god ? attr.legion_god.toNumber() : 0;
                if (god > curGod) {
                    if (handler) {
                        this.showConfirm(game.getLanById("huanggu_nvshen_tips16" /* huanggu_nvshen_tips16 */), Handler.alloc(this, function () {
                            handler.exec();
                        }));
                    }
                    return false;
                }
                if (handler) {
                    handler.exec();
                }
                return true;
            };
            /**通用匹配 具体传参看MatchData */
            ViewMgr.prototype.showCommonMatch = function (data) {
                ViewMgr.getIns().showSecondPop("61" /* More */, "131" /* CommonMatch */, data);
            };
            /** 判断中控活动是否开启 */
            ViewMgr.prototype.isOpenCentralActivity = function (data) {
                //let now = Date.now();
                var now = TimeMgr.time.serverTimeSecond;
                //let now2 = TimeMgr.time.serverTime;
                if (data.s_begin_time <= now && now <= data.s_end_time) {
                    return true;
                }
                return false;
            };
            /**仙宗排行榜结算领取奖励弹窗 */
            ViewMgr.prototype.showUnionRankTips = function (type) {
                ViewMgr.getIns().showSecondPop("55" /* Union */, "35" /* UnionRankReward */, type);
            };
            return ViewMgr;
        }());
        mod_1.ViewMgr = ViewMgr;
        __reflect(ViewMgr.prototype, "game.mod.ViewMgr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var ComProgressRewardItem = /** @class */ (function (_super) {
            __extends(ComProgressRewardItem, _super);
            function ComProgressRewardItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.ComProgressRewardItemSkin";
                return _this;
            }
            ComProgressRewardItem.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this); //
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_box, this.onClickBtn, this);
            };
            ComProgressRewardItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                var state = this.data.state;
                if (!this.data.index) {
                    this.img_got.visible = false;
                    this.btn_box.icon = state == 2 /* Done */ ? "box_open" : "box_close";
                }
                else {
                    var index = this.data.index;
                    if (index > mod.BOX_ASSETS_COUNT) {
                        index = mod.BOX_ASSETS_COUNT;
                    }
                    this.currentState = "" + index;
                    this.img_got.visible = state == 2 /* Done */;
                }
                this.lab_value.text = "" + this.data.count;
                this.redPoint.visible = state == 1 /* Reward */;
            };
            ComProgressRewardItem.prototype.onClickBtn = function () {
                var state = this.data.state;
                if (!state) {
                    mod.ViewMgr.getIns().showBoxReward(this.data.content || "", this.data.rewards);
                    return;
                }
                if (state == 1 && this.data.handler) {
                    this.data.handler.exec();
                }
            };
            ComProgressRewardItem.prototype.setData = function (data) {
                this.data = data;
            };
            return ComProgressRewardItem;
        }(mod.BaseRenderer));
        mod.ComProgressRewardItem = ComProgressRewardItem;
        __reflect(ComProgressRewardItem.prototype, "game.mod.ComProgressRewardItem");
        /**ComRewardSkin 宽度 */
        mod.ITEM_WIDTH = 136;
        mod.BOX_ASSETS_COUNT = 5;
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var WndBaseNewView = /** @class */ (function (_super) {
            __extends(WndBaseNewView, _super);
            function WndBaseNewView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.WndBaseNewSkin";
                return _this;
            }
            return WndBaseNewView;
        }(eui.Component));
        mod.WndBaseNewView = WndBaseNewView;
        __reflect(WndBaseNewView.prototype, "game.mod.WndBaseNewView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var WndBaseView = /** @class */ (function (_super) {
            __extends(WndBaseView, _super);
            function WndBaseView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.WndBaseSkin";
                return _this;
            }
            return WndBaseView;
        }(eui.Component));
        mod.WndBaseView = WndBaseView;
        __reflect(WndBaseView.prototype, "game.mod.WndBaseView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var WndSecondMainView = /** @class */ (function (_super) {
            __extends(WndSecondMainView, _super);
            function WndSecondMainView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.WndSecondMainSkin";
                return _this;
            }
            return WndSecondMainView;
        }(eui.Component));
        mod.WndSecondMainView = WndSecondMainView;
        __reflect(WndSecondMainView.prototype, "game.mod.WndSecondMainView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var WndSecondView = /** @class */ (function (_super) {
            __extends(WndSecondView, _super);
            function WndSecondView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.WndSecondSkin";
                return _this;
            }
            return WndSecondView;
        }(eui.Component));
        mod.WndSecondView = WndSecondView;
        __reflect(WndSecondView.prototype, "game.mod.WndSecondView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var AmassItem = /** @class */ (function (_super) {
            __extends(AmassItem, _super);
            function AmassItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AmassItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                var index = this.data;
                var _proxy = facade.retMod("57" /* Consecrate */).retProxy(225 /* Consecrate */);
                var cfg = _proxy.getAmassCfg(index);
                this.lab_name.text = cfg.name;
                var propCfg = game.GameConfig.getPropConfigById(index);
                this.lab_name.textColor = game.ColorUtil.getColorByQuality2(propCfg.quality);
                this.img_icon.source = game.ResUtil.getBigIcon(propCfg.icon);
                var lv = _proxy.getAmassLv(index);
                this.img_gray.visible = lv <= 0;
                this.lab_lv.text = lv + "";
                this.redPoint.visible = _proxy.canAmassItemUp(index);
            };
            return AmassItem;
        }(eui.ItemRenderer));
        mod.AmassItem = AmassItem;
        __reflect(AmassItem.prototype, "game.mod.AmassItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var AmassView = /** @class */ (function (_super) {
            __extends(AmassView, _super);
            function AmassView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.consecrate.AmassSkin";
                return _this;
            }
            return AmassView;
        }(eui.Component));
        mod.AmassView = AmassView;
        __reflect(AmassView.prototype, "game.mod.AmassView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var AvatarBaseItem = /** @class */ (function (_super) {
            __extends(AvatarBaseItem, _super);
            function AvatarBaseItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AvatarBaseItemSkin";
                return _this;
            }
            AvatarBaseItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                this.updateShow(this.data);
            };
            /**
             * 更新
             * @param cfg 配置中须有quality,icon字段
             */
            AvatarBaseItem.prototype.updateShow = function (cfg) {
                if (!cfg) {
                    return;
                }
                this.img_bg.source = game.ResUtil.getBigBg(cfg.quality);
                this.img_frame.source = game.ResUtil.getBigFrame(cfg.quality);
                this.img_avatar.source = game.ResUtil.getBigIcon(cfg.icon);
                this.img_quality.source = game.ResUtil.getSrQuality(cfg.quality);
            };
            /**单个item设置用*/
            AvatarBaseItem.prototype.setData = function (data) {
                this.data = data;
            };
            return AvatarBaseItem;
        }(eui.ItemRenderer));
        mod.AvatarBaseItem = AvatarBaseItem;
        __reflect(AvatarBaseItem.prototype, "game.mod.AvatarBaseItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var delayCall = base.delayCall;
        var clearDelay = base.clearDelay;
        var Handler = base.Handler;
        /**
         * 具有长按弹出tips效果的外显组件
         */
        var AvatarIconLongPress = /** @class */ (function (_super) {
            __extends(AvatarIconLongPress, _super);
            function AvatarIconLongPress() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.isBegin = false;
                _this.delayId = 0;
                return _this;
            }
            AvatarIconLongPress.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_BEGIN, this, this.onBegin, this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_CANCEL, this, this.onCancel, this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this, this.onCancel, this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_END, this, this.onCancel, this);
            };
            AvatarIconLongPress.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
                this.onCancel();
            };
            AvatarIconLongPress.prototype.onBegin = function () {
                if (this.isBegin) {
                    return;
                }
                this.isBegin = true;
                this.delayId = delayCall(Handler.alloc(this, this.callOpenTips), 1000);
            };
            //长按打开tips
            AvatarIconLongPress.prototype.callOpenTips = function () {
                if (!this.data || !this.data.cfg) {
                    return;
                }
                var index = this.data.cfg.index;
                var head = game.PropData.getPropParse(index);
                if (head && head == 409 /* Huashen */) {
                    //todo
                    var huaShenCfg = game.getConfigByNameId("huashen.json" /* Huashen */, index);
                    if (huaShenCfg && huaShenCfg.material) {
                        var cost = huaShenCfg.material[0];
                        mod.ViewMgr.getIns().showPropTips(cost[0]);
                    }
                    return;
                }
                mod.ViewMgr.getIns().showPropTips(this.data.cfg.index);
                this.onCancel();
            };
            AvatarIconLongPress.prototype.onCancel = function () {
                this.isBegin = false;
                this.delayId && clearDelay(this.delayId);
            };
            return AvatarIconLongPress;
        }(mod.AvatarIcon));
        mod.AvatarIconLongPress = AvatarIconLongPress;
        __reflect(AvatarIconLongPress.prototype, "game.mod.AvatarIconLongPress");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var delayCall = base.delayCall;
        var Handler = base.Handler;
        var clearDelay = base.clearDelay;
        /**
         * 具有长按弹出tips效果的外显组件
         */
        var AvatarItemLongPress = /** @class */ (function (_super) {
            __extends(AvatarItemLongPress, _super);
            function AvatarItemLongPress() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.isBegin = false;
                _this.delayId = 0;
                return _this;
            }
            AvatarItemLongPress.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_BEGIN, this, this.onBegin, this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_CANCEL, this, this.onCancel, this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this, this.onCancel, this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_END, this, this.onCancel, this);
            };
            AvatarItemLongPress.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
                this.onCancel();
            };
            AvatarItemLongPress.prototype.onBegin = function () {
                if (this.isBegin) {
                    return;
                }
                this.isBegin = true;
                this.delayId = delayCall(Handler.alloc(this, this.callOpenTips), 1000);
            };
            AvatarItemLongPress.prototype.callOpenTips = function () {
                if (!this.data || !this.data.cfg) {
                    return;
                }
                mod.ViewMgr.getIns().showPropTips(this.data.cfg.index);
                this.onCancel();
            };
            AvatarItemLongPress.prototype.onCancel = function () {
                this.isBegin = false;
                this.delayId && clearDelay(this.delayId);
            };
            return AvatarItemLongPress;
        }(mod.AvatarItem));
        mod.AvatarItemLongPress = AvatarItemLongPress;
        __reflect(AvatarItemLongPress.prototype, "game.mod.AvatarItemLongPress");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 基础外显名称组件
         */
        var AvatarNameItem = /** @class */ (function (_super) {
            __extends(AvatarNameItem, _super);
            function AvatarNameItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AvatarNameItemSkin";
                return _this;
            }
            /**
             * @param name 属性
             * @param quality 品质
             */
            AvatarNameItem.prototype.updateShow = function (name, quality) {
                this.lab_name.text = name;
                if (quality) {
                    this.lab_name.textColor = game.ColorUtil.getColorByQuality1(quality);
                }
            };
            AvatarNameItem.prototype.updateSr = function (img) {
                this.img_sr.source = img;
            };
            return AvatarNameItem;
        }(eui.Component));
        mod.AvatarNameItem = AvatarNameItem;
        __reflect(AvatarNameItem.prototype, "game.mod.AvatarNameItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 基础外显名称组件,SR
         */
        var AvatarNameSrItem = /** @class */ (function (_super) {
            __extends(AvatarNameSrItem, _super);
            function AvatarNameSrItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AvatarNameSrItemSkin";
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            AvatarNameSrItem.prototype.onAddToStage = function () {
                if (!this._eftHub) {
                    this._eftHub = new game.UIEftHub(this);
                }
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            };
            AvatarNameSrItem.prototype.onRemoveFromStage = function () {
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this._eftHub.removeAllEffects();
            };
            /**
             * @param name 属性
             * @param quality 品质
             * @param specialQua 特殊品质（黄玄地天，SpecialQualityType）
             */
            AvatarNameSrItem.prototype.updateShow = function (name, quality, specialQua) {
                this.lab_name.text = name;
                if (this._eftId) {
                    this._eftHub.removeEffect(this._eftId);
                }
                if (specialQua != undefined) {
                    this.img_sr.source = "";
                    var eftSrc = game.SpecialQualityEftSrc[specialQua];
                    if (eftSrc) {
                        this._eftId = this._eftHub.add(eftSrc, 0, 0, null, 0, this.gr_eft, -1);
                    }
                    quality = game.SpecialQuality[specialQua]; //品质转换
                }
                else {
                    this.img_sr.source = game.ResUtil.getSrQuality(quality, specialQua);
                }
                this.lab_name.textColor = game.ColorUtil.getColorByQuality1(quality);
            };
            return AvatarNameSrItem;
        }(eui.Component));
        mod.AvatarNameSrItem = AvatarNameSrItem;
        __reflect(AvatarNameSrItem.prototype, "game.mod.AvatarNameSrItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var UnionMasterItem = /** @class */ (function (_super) {
            __extends(UnionMasterItem, _super);
            function UnionMasterItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.UnionMasterItemSkin";
                return _this;
            }
            UnionMasterItem.prototype.updateShow = function (name, job) {
                this.lab_name.text = name;
                if (job) {
                    this.lab_job.text = job;
                }
            };
            return UnionMasterItem;
        }(eui.Component));
        mod.UnionMasterItem = UnionMasterItem;
        __reflect(UnionMasterItem.prototype, "game.mod.UnionMasterItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var facade = base.facade;
        /**
         * 购买按钮组件
         * 设置最大购买次数 setMaxCnt(cnt:number)
         * 抛出 ActivityEvent.ON_BTN_BUY_CNT_POST，带有文本的购买次数
         */
        var BuyBtnListView = /** @class */ (function (_super) {
            __extends(BuyBtnListView, _super);
            function BuyBtnListView() {
                var _this = _super.call(this) || this;
                /**最大购买数量*/
                _this._maxCnt = 0;
                _this.skinName = "skins.common.BuyBtnListSkin";
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            BuyBtnListView.prototype.onAddToStage = function () {
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this.btn_add.addEventListener(TouchEvent.TOUCH_TAP, this.onAdd, this);
                this.btn_addTen.addEventListener(TouchEvent.TOUCH_TAP, this.onAddTen, this);
                this.btn_sub.addEventListener(TouchEvent.TOUCH_TAP, this.onSub, this);
                this.btn_subTen.addEventListener(TouchEvent.TOUCH_TAP, this.onSubTen, this);
                this.setCnt(1);
            };
            BuyBtnListView.prototype.onRemoveFromStage = function () {
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this.btn_add.removeEventListener(TouchEvent.TOUCH_TAP, this.onAdd, this);
                this.btn_addTen.removeEventListener(TouchEvent.TOUCH_TAP, this.onAddTen, this);
                this.btn_sub.removeEventListener(TouchEvent.TOUCH_TAP, this.onSub, this);
                this.btn_subTen.removeEventListener(TouchEvent.TOUCH_TAP, this.onSubTen, this);
            };
            BuyBtnListView.prototype.onSub = function () {
                var cnt = this.getCnt();
                if (cnt <= 1) {
                    return;
                }
                this.setCntAndNt(--cnt);
            };
            BuyBtnListView.prototype.onSubTen = function () {
                var cnt = this.getCnt();
                if (cnt <= 1) {
                    return;
                }
                this.setCntAndNt(Math.max(cnt - 10, 1));
            };
            BuyBtnListView.prototype.onAdd = function () {
                var cnt = this.getCnt();
                if (cnt >= this._maxCnt) {
                    return;
                }
                this.setCntAndNt(++cnt);
            };
            BuyBtnListView.prototype.onAddTen = function () {
                var cnt = this.getCnt();
                if (cnt >= this._maxCnt) {
                    return;
                }
                this.setCntAndNt(Math.min(cnt + 10, this._maxCnt));
            };
            /**
             * 设置购买次数，并抛出事件 ActivityEvent.ON_BTN_BUY_CNT_POST
             * @param cnt
             * @private
             */
            BuyBtnListView.prototype.setCntAndNt = function (cnt) {
                this.setCnt(cnt);
                facade.sendNt("on_btn_buy_cnt_post" /* ON_BTN_BUY_CNT_POST */, cnt);
            };
            /**
             * 购买数量
             * @param cnt 默认1
             */
            BuyBtnListView.prototype.setCnt = function (cnt) {
                if (cnt === void 0) { cnt = 1; }
                this.lb_cnt.text = cnt + '';
            };
            /**
             * 设置最大购买数量
             * @param cnt 默认1
             */
            BuyBtnListView.prototype.setMaxCnt = function (cnt) {
                if (cnt === void 0) { cnt = 1; }
                this._maxCnt = cnt;
            };
            /**
             * 获取购买数量
             */
            BuyBtnListView.prototype.getCnt = function () {
                return Number(this.lb_cnt.text) || 1;
            };
            /**
             * 设置消耗道具icon和数量
             * @param index
             * @param cnt
             * @param color 数量色号，默认 BlackColor.GREEN
             */
            BuyBtnListView.prototype.setCostCnt = function (index, cnt, color) {
                if (color === void 0) { color = 8585074 /* GREEN */; }
                var cfg = game.GameConfig.getPropConfigById(index);
                this.img_cost.source = cfg && cfg.icon || '';
                var str = cnt + '';
                if (color) {
                    str = game.TextUtil.addColor(cnt + '', color);
                }
                this.lb_cnt.textFlow = game.TextUtil.parseHtml(str);
            };
            return BuyBtnListView;
        }(eui.Component));
        mod.BuyBtnListView = BuyBtnListView;
        __reflect(BuyBtnListView.prototype, "game.mod.BuyBtnListView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Handler = base.Handler;
        var Event = egret.Event;
        var TouchEvent = egret.TouchEvent;
        var GiftBtn = /** @class */ (function (_super) {
            __extends(GiftBtn, _super);
            function GiftBtn() {
                var _this = _super.call(this) || this;
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            GiftBtn.prototype.onAddToStage = function () {
                this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            };
            GiftBtn.prototype.onRemoveFromStage = function () {
                this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            };
            GiftBtn.prototype.onClick = function () {
                if (this._clickHandler) {
                    this._clickHandler.exec();
                    return;
                }
                if (!this._productId) {
                    return;
                }
                mod.ViewMgr.getIns().showGift(this._productId);
            };
            GiftBtn.prototype.removeEftSel = function () {
                if (this._eftId_sel) {
                    this.clearEffect(this._eftId_sel);
                    this._eftId_sel = null;
                }
                if (this._eftId_sel2) {
                    this.clearEffect(this._eftId_sel2);
                    this._eftId_sel2 = null;
                }
            };
            //传入商品ID，默认显示特效
            GiftBtn.prototype.updateGift = function (productId, showEffect, clickHandler) {
                if (showEffect === void 0) { showEffect = true; }
                this._productId = productId;
                this._clickHandler = clickHandler;
                if (productId) {
                    var isShow = mod.PayUtil.checkShowGift(productId);
                    this.visible = isShow;
                }
                if (!this.visible || !showEffect) {
                    return;
                }
                this.iconDisplay.visible = false;
                this.removeEftSel();
                var self = this;
                this._eftId_sel = this.setEffect("fuben_1" /* Fuben_1 */, this.group_eft, 0, 0, 0, Handler.alloc(this, function () {
                    self.iconDisplay.visible = true;
                    self._eftId_sel2 = self.setEffect("fuben_5" /* Fuben_5 */, self.group_eft);
                }), 1);
            };
            return GiftBtn;
        }(mod.Btn));
        mod.GiftBtn = GiftBtn;
        __reflect(GiftBtn.prototype, "game.mod.GiftBtn");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var CoinItem = /** @class */ (function (_super) {
            __extends(CoinItem, _super);
            function CoinItem() {
                var _this = _super.call(this) || this;
                _this._clickable = true; //可点击
                _this.skinName = "skins.common.CoinItemSkin";
                return _this;
            }
            CoinItem.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_cost, this.onClick, this);
            };
            /**点击弹出道具tips*/
            CoinItem.prototype.onClick = function () {
                if (!this._clickable) {
                    return;
                }
                if (this._index) {
                    mod.ViewMgr.getIns().showPropTips(this._index);
                }
            };
            /**设置显示的道具index*/
            CoinItem.prototype.setData = function (index, clickable) {
                if (clickable === void 0) { clickable = true; }
                this.initIcon(index, clickable);
                this.updateShow();
            };
            Object.defineProperty(CoinItem.prototype, "index", {
                /**获取显示道具index*/
                get: function () {
                    return this._index;
                },
                enumerable: true,
                configurable: true
            });
            /**刷新图标显示*/
            CoinItem.prototype.initIcon = function (index, clickable) {
                if (clickable === void 0) { clickable = true; }
                this._index = index;
                this._clickable = clickable;
                var cfg = game.GameConfig.getPropConfigById(this._index);
                this.img_cost.source = cfg.icon;
            };
            /**刷新显示，外部监听时候会调用*/
            CoinItem.prototype.updateShow = function () {
                this.lab_cost.text = mod.BagUtil.getPropCntByIdx(this._index) + "";
            };
            return CoinItem;
        }(mod.BaseListenerRenderer));
        mod.CoinItem = CoinItem;
        __reflect(CoinItem.prototype, "game.mod.CoinItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var CoinItemCenter = /** @class */ (function (_super) {
            __extends(CoinItemCenter, _super);
            function CoinItemCenter() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.CoinItemCenterSkin";
                return _this;
            }
            CoinItemCenter.prototype.dataChanged = function () {
                _super.prototype.dataChanged.call(this);
                this.setLabCost(this.data[1], 16777215 /* WHITE */);
            };
            return CoinItemCenter;
        }(mod.CostIcon));
        mod.CoinItemCenter = CoinItemCenter;
        __reflect(CoinItemCenter.prototype, "game.mod.CoinItemCenter");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 垂直布局的消耗组件
         */
        var CostIcon3 = /** @class */ (function (_super) {
            __extends(CostIcon3, _super);
            function CostIcon3() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.CostItem3Skin";
                return _this;
            }
            return CostIcon3;
        }(mod.CostIcon2));
        mod.CostIcon3 = CostIcon3;
        __reflect(CostIcon3.prototype, "game.mod.CostIcon3");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var TouchEvent = egret.TouchEvent;
        var Tween = base.Tween;
        var Handler = base.Handler;
        var TopCoinItem = /** @class */ (function (_super) {
            __extends(TopCoinItem, _super);
            function TopCoinItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.TopCoinItemSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                return _this;
            }
            TopCoinItem.prototype.onAddToStage = function () {
                this.btn_add.addEventListener(TouchEvent.TOUCH_TAP, this.onClickAdd, this);
            };
            TopCoinItem.prototype.onRemove = function () {
                this.btn_add.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickAdd, this);
                this.removeTween();
            };
            TopCoinItem.prototype.onClickAdd = function () {
                if (!this._index) {
                    return;
                }
                if (this._index == 1450000002 /* Xianyu */) {
                    //仙玉的话跳转仙玉商城
                    mod.ViewMgr.getIns().openCommonRechargeView();
                    return;
                }
                mod.ViewMgr.getIns().showGainWaysTips(this._index);
            };
            /**设置显示的道具index*/
            TopCoinItem.prototype.setData = function (index, currentState) {
                this._index = index;
                var cfg = game.GameConfig.getPropConfigById(this._index);
                this.img_cost.source = cfg.icon;
                this.updateShow();
                if (currentState) {
                    this.currentState = currentState;
                }
            };
            //黄色加按钮
            TopCoinItem.prototype.setDataYellow = function (index) {
                this.setData(index, "2");
            };
            Object.defineProperty(TopCoinItem.prototype, "index", {
                /**获取显示道具index*/
                get: function () {
                    return this._index;
                },
                enumerable: true,
                configurable: true
            });
            /**刷新显示，外部监听时候会调用，是否显示增加文本*/
            TopCoinItem.prototype.updateShow = function (showAdd) {
                var _this = this;
                var cnt = mod.BagUtil.getPropCntByIdx(this._index);
                var cntStr = cnt + "";
                if (game.PropCntShowTimeStr.indexOf(this._index) > -1) {
                    cntStr = game.TimeUtil.formatSecond(cnt, "d天H时", true);
                }
                else {
                    cntStr = game.StringUtil.getPowerNumStr(cnt, 0, "", 6);
                }
                if (showAdd && (this._index == 1450000002 /* Xianyu */ || this._index == 1450000001 /* Yuanbao */)) {
                    //仙玉、元宝增加提示
                    var addCnt = cnt - this._lastCnt;
                    if (addCnt != 0) {
                        this._isAdd = addCnt > 0;
                        var addStr = (this._isAdd ? "+" : "") + addCnt;
                        this.lab_add.text = addStr;
                        this.removeTween();
                        this.lab_add.y = 36;
                        this.lab_add.alpha = 1;
                        Tween.get(this.lab_add)
                            .to({ y: 10, alpha: 0.5 }, 500)
                            .exec(Handler.alloc(this, function () {
                            _this.lab_add.text = "";
                        }));
                        this._curCnt = this._lastCnt; //设置为当前
                        this._perAdd = Math.max(Math.floor(Math.abs(addCnt) / 100), 1) * (this._isAdd ? 1 : -1); //可能是负的
                        this._endCnt = cnt;
                        this.playCntTween();
                    }
                }
                else {
                    this.lab_cost.text = cntStr;
                }
                this._lastCnt = cnt;
            };
            TopCoinItem.prototype.removeTween = function () {
                Tween.remove(this.lab_add);
                Tween.remove(this.lab_cost);
            };
            TopCoinItem.prototype.playCntTween = function () {
                if (this._isAdd) {
                    this._curCnt = Math.min(this._curCnt + this._perAdd, this._endCnt);
                }
                else {
                    this._curCnt = Math.max(this._curCnt + this._perAdd, this._endCnt);
                }
                var cntStr = game.StringUtil.getPowerNumStr(this._curCnt, 0, "", 6);
                this.lab_cost.text = cntStr;
                if ((this._isAdd && this._curCnt < this._endCnt)
                    || (!this._isAdd && this._curCnt > this._endCnt)) {
                    Tween.get(this.lab_cost)
                        .delay(15)
                        .exec(Handler.alloc(this, this.playCntTween));
                }
            };
            return TopCoinItem;
        }(eui.Component));
        mod.TopCoinItem = TopCoinItem;
        __reflect(TopCoinItem.prototype, "game.mod.TopCoinItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var CountItem = /** @class */ (function (_super) {
            __extends(CountItem, _super);
            function CountItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.CountItemSkin";
                return _this;
            }
            CountItem.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onAdd, this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_addTen, this.onAddTen, this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_subtract, this.onSubtract, this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_subtractTen, this.onSubtractTen, this);
            };
            CountItem.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
                this._leftCnt = 0;
                if (this._handler) {
                    this._handler.dispose();
                    this._handler = null;
                }
            };
            CountItem.prototype.setData = function (_leftCnt, handler) {
                this._leftCnt = _leftCnt;
                if (handler) {
                    this._handler = handler;
                }
                this.setCnt(_leftCnt);
            };
            CountItem.prototype.setCnt = function (cnt) {
                this.lb_cnt.text = "" + cnt;
                if (this._handler) {
                    this._handler.exec();
                }
            };
            CountItem.prototype.onAdd = function () {
                var cnt = this.getCnt;
                if (cnt >= this._leftCnt) {
                    return;
                }
                this.setCnt(++cnt);
            };
            CountItem.prototype.onAddTen = function () {
                var cnt = this.getCnt;
                if (cnt >= this._leftCnt) {
                    return;
                }
                this.setCnt(Math.min(cnt + 10, this._leftCnt));
            };
            CountItem.prototype.onSubtract = function () {
                var cnt = this.getCnt;
                if (cnt <= 1) {
                    return;
                }
                this.setCnt(--cnt);
            };
            CountItem.prototype.onSubtractTen = function () {
                var cnt = this.getCnt;
                if (cnt <= 1) {
                    return;
                }
                this.setCnt(Math.max(cnt - 10, 1));
            };
            Object.defineProperty(CountItem.prototype, "getCnt", {
                get: function () {
                    return Number(this.lb_cnt.text) || 1;
                },
                enumerable: true,
                configurable: true
            });
            return CountItem;
        }(mod.BaseListenerRenderer));
        mod.CountItem = CountItem;
        __reflect(CountItem.prototype, "game.mod.CountItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 通用装备列表组件
         */
        var EquipListView = /** @class */ (function (_super) {
            __extends(EquipListView, _super);
            function EquipListView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.EquipListSkin";
                _this.touchEnabled = false;
                _this._equipProxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                return _this;
            }
            EquipListView.prototype.onAddToStage = function () {
                this.initEquipList();
            };
            EquipListView.prototype.onRemove = function () {
            };
            EquipListView.prototype.initEquipList = function () {
                this._equipList = new ArrayCollection();
                this.list_equip.itemRenderer = mod.IconEquip;
                this.list_equip.dataProvider = this._equipList;
                this._lastSelPos = -1;
            };
            EquipListView.prototype.getBtnData = function (pos) {
                var list = this._equipList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    var btnData = list[i];
                    if (!btnData.prop) {
                        continue;
                    }
                    var equipPos = btnData.prop instanceof game.PropData ? btnData.prop.equipPos : btnData.prop;
                    if (equipPos == pos) {
                        return btnData;
                    }
                }
                return null;
            };
            /**刷新装备显示*/
            EquipListView.prototype.updateEquip = function (lvList) {
                var list = [];
                for (var i = 0; i < game.EquipPosAry.length; ++i) {
                    var pos = game.EquipPosAry[i];
                    var equip = this._equipProxy.getEquipByPos(pos);
                    var prop = equip ? equip : pos;
                    var data = this._equipList.source && this._equipList.source.length ? this._equipList.source[i] : {};
                    data.prop = prop;
                    if (lvList && lvList[i]) {
                        data.lv = lvList[i];
                    }
                    list.push(data);
                }
                this._equipList.replaceAll(list);
            };
            /**刷新装备红点，红点逻辑自己判断*/
            EquipListView.prototype.updateHint = function (hints) {
                var list = this._equipList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len && i < hints.length; i++) {
                    var btnData = list[i];
                    var hint = hints[i];
                    if (!!btnData.showHint != hint) { //过滤undefined!=false
                        btnData.showHint = hint;
                        this._equipList.itemUpdated(btnData);
                    }
                }
            };
            /**刷新装备选中，选中逻辑自己判断，selList是所有数据*/
            EquipListView.prototype.updateSel = function (selList) {
                var list = this._equipList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len && i < selList.length; i++) {
                    var btnData = list[i];
                    var sel = selList[i];
                    if (!!btnData.sel != sel) { //过滤undefined!=false
                        btnData.sel = sel;
                        this._equipList.itemUpdated(btnData);
                    }
                }
            };
            /**刷新装备选中，pos是需要选中的部位：EquipPosAry*/
            EquipListView.prototype.updateSelByPos = function (pos) {
                if (pos == this._lastSelPos) {
                    return;
                }
                var selList = [];
                if (this._lastSelPos >= 0) {
                    selList.push({ pos: this._lastSelPos, sel: false });
                }
                selList.push({ pos: pos, sel: true });
                this._lastSelPos = pos;
                var len = selList ? selList.length : 0;
                for (var i = 0; i < len; i++) {
                    var selInfo = selList[i];
                    var sel = selInfo.sel;
                    var btnData = this.getBtnData(selInfo.pos);
                    if (btnData && !!btnData.sel != sel) { //过滤undefined!=false
                        btnData.sel = sel;
                        this._equipList.itemUpdated(btnData);
                    }
                }
            };
            return EquipListView;
        }(eui.Component));
        mod.EquipListView = EquipListView;
        __reflect(EquipListView.prototype, "game.mod.EquipListView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var IconEquip = /** @class */ (function (_super) {
            __extends(IconEquip, _super);
            function IconEquip() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.IconEquipSkin";
                return _this;
            }
            IconEquip.prototype.dataChanged = function () {
                if (this.data == null) {
                    this.icon.defaultIcon();
                    return;
                }
                if (this.data.showHint != undefined) {
                    this.redPoint.visible = this.data.showHint;
                }
                if (this.data.prop != undefined) {
                    // 未激活装备
                    if (typeof this.data.prop === 'number') {
                        this.icon.updateIconImg("equip_icon_gray_" + this.data.prop);
                        return;
                    }
                    this.icon.setData(this.data.prop, 3 /* NotTips */);
                    this.img_tag.source = this.data.prop.advanced_lv ? "role_advance_lv" + this.data.prop.advanced_lv : "";
                }
                // if(this.data.lv != undefined){
                var cntStr = this.data.lv ? "+" + this.data.lv : "";
                this.icon.updateCnt(cntStr);
                // }
                if (this.data.sel !== undefined) {
                    this.img_sel.visible = this.data.sel;
                }
            };
            /**设置数据data，单个icon时候调用*/
            IconEquip.prototype.setData = function (data) {
                this.data = data;
            };
            return IconEquip;
        }(eui.ItemRenderer));
        mod.IconEquip = IconEquip;
        __reflect(IconEquip.prototype, "game.mod.IconEquip");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ExchangeView = /** @class */ (function (_super) {
            __extends(ExchangeView, _super);
            function ExchangeView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.ExchangeSkin";
                return _this;
            }
            /**更新顶部大奖数据*/
            ExchangeView.prototype.updateBigReward = function (data) {
                if (!data) {
                    this.iconBigReward.visible = false;
                    return;
                }
                this.iconBigReward.visible = true;
                this.iconBigReward.data = data;
            };
            return ExchangeView;
        }(eui.Component));
        mod.ExchangeView = ExchangeView;
        __reflect(ExchangeView.prototype, "game.mod.ExchangeView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Handler = base.Handler;
        var delayCall = base.delayCall;
        var IconBigReward = /** @class */ (function (_super) {
            __extends(IconBigReward, _super);
            function IconBigReward() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.IconBigReward";
                _this.touchEnabled = false;
                return _this;
            }
            IconBigReward.prototype.dataChanged = function () {
                var _this = this;
                if (!this.data) {
                    return;
                }
                this.icon.setData(this.data);
                this.removeEftSel();
                delayCall(Handler.alloc(this, function () {
                    _this._eftId1 = _this.addEftByParent("dajiangtishi" /* Dajiangtishi */, _this.grp_eft1, 0, 0, 0, null, 1);
                }), 500);
                this._eftId2 = this.addEftByParent("dajiangdizuo" /* DaJiangDiZuo */, this.grp_eft2);
            };
            IconBigReward.prototype.removeEftSel = function () {
                if (this._eftId1) {
                    this.removeEffect(this._eftId1);
                    this._eftId1 = null;
                }
                if (this._eftId2) {
                    this.removeEffect(this._eftId2);
                    this._eftId2 = null;
                }
            };
            IconBigReward.prototype.setData = function (data) {
                this.data = data;
            };
            return IconBigReward;
        }(mod.BaseRenderer));
        mod.IconBigReward = IconBigReward;
        __reflect(IconBigReward.prototype, "game.mod.IconBigReward");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var IconGot = /** @class */ (function (_super) {
            __extends(IconGot, _super);
            function IconGot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            IconGot.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
            };
            IconGot.prototype.dataChanged = function () {
                if (this.data == null) {
                    this.icon.defaultIcon();
                    this.gr_got.visible = this.redPoint.visible = false;
                    return;
                }
                if (this.data.showHint !== undefined) {
                    this.redPoint.visible = this.data.showHint;
                }
                if (this.data.prop != undefined) {
                    this.icon.setData(this.data.prop, 3 /* NotTips */);
                }
                if (this.data.isGot !== undefined) {
                    this.gr_got.visible = this.data.isGot;
                }
                if (this.data.isLock != undefined) {
                    this.img_gray.visible = this.data.isLock;
                }
            };
            /**设置数据data，单个icon时候调用*/
            IconGot.prototype.setData = function (data) {
                this.data = data;
                // this.dataChanged();
            };
            IconGot.prototype.onClick = function () {
                var data = this.data;
                if (!data || !data.showTips) {
                    return;
                }
                var prop = data.prop;
                if (Array.isArray(prop)) {
                    mod.ViewMgr.getIns().showPropTips(prop[0]);
                }
                else {
                    mod.ViewMgr.getIns().showPropTips(prop);
                }
            };
            return IconGot;
        }(mod.BaseListenerRenderer));
        mod.IconGot = IconGot;
        __reflect(IconGot.prototype, "game.mod.IconGot");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var IconName = /** @class */ (function (_super) {
            __extends(IconName, _super);
            function IconName() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            IconName.prototype.dataChanged = function () {
                _super.prototype.dataChanged.call(this);
                if (this.data) {
                    this.updateName();
                }
            };
            return IconName;
        }(mod.Icon));
        mod.IconName = IconName;
        __reflect(IconName.prototype, "game.mod.IconName");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var IconReward = /** @class */ (function (_super) {
            __extends(IconReward, _super);
            function IconReward() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.IconRewardSkin";
                _this.touchEnabled = false;
                return _this;
            }
            IconReward.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_sel, this.onClick, this);
            };
            IconReward.prototype.dataChanged = function () {
                if (this.data == null) {
                    this.icon.defaultIcon();
                    this.img_sel.visible = this.redPoint.visible = false;
                    return;
                }
                if (this.data.showHint != undefined) {
                    this.redPoint.visible = this.data.showHint;
                }
                if (this.data.prop != undefined) {
                    this.icon.setData(this.data.prop);
                }
                if (this.data.sel != undefined) {
                    this.img_sel.visible = this.data.sel;
                }
                if (this.data.isGot != undefined) {
                    this.gr_got.visible = this.data.isGot;
                }
                if (this.data.isReward != undefined) {
                    this.img_reward.visible = this.data.isReward;
                }
            };
            /**设置数据data，单个icon时候调用*/
            IconReward.prototype.setData = function (data) {
                this.data = data;
            };
            //选中框点击
            IconReward.prototype.onClick = function () {
                if (!this.data || !this.data.prop) {
                    return;
                }
                var propData;
                if (!(this.data.prop instanceof game.PropData)) {
                    var prop = this.data.prop;
                    propData = game.PropData.create(prop[0], prop[1]);
                }
                else {
                    propData = this.data.prop;
                }
                mod.ViewMgr.getIns().showPropTips(propData);
            };
            return IconReward;
        }(mod.BaseListenerRenderer));
        mod.IconReward = IconReward;
        __reflect(IconReward.prototype, "game.mod.IconReward");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var IconSelMany = /** @class */ (function (_super) {
            __extends(IconSelMany, _super);
            function IconSelMany() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.IconSelManySkin";
                _this.touchEnabled = false;
                return _this;
            }
            IconSelMany.prototype.dataChanged = function () {
                if (this.data == null) {
                    this.icon.defaultIcon();
                    this.img_sel.visible = this.redPoint.visible = this.img_true.visible = false;
                    return;
                }
                if (this.data.showHint != undefined) {
                    this.redPoint.visible = this.data.showHint;
                }
                if (this.data.prop != undefined) {
                    this.icon.setData(this.data.prop, 3 /* NotTips */);
                }
                if (this.data.sel != undefined) {
                    this.img_sel.visible = this.data.sel;
                }
                if (this.data.selTrue != undefined) {
                    this.img_true.visible = this.data.selTrue;
                }
            };
            /**设置数据data，单个icon时候调用*/
            IconSelMany.prototype.setData = function (data) {
                this.data = data;
            };
            return IconSelMany;
        }(eui.ItemRenderer));
        mod.IconSelMany = IconSelMany;
        __reflect(IconSelMany.prototype, "game.mod.IconSelMany");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var IconShop = /** @class */ (function (_super) {
            __extends(IconShop, _super);
            function IconShop() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.IconShopSkin";
                _this.touchEnabled = false;
                return _this;
            }
            IconShop.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn, this.onClickBuy, this);
            };
            IconShop.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
            };
            IconShop.prototype.dataChanged = function () {
                var cfg = this.data;
                if (!cfg) {
                    return;
                }
                var ary = cfg.prop[0];
                var prop = game.PropData.create(ary[0], ary[1]);
                if (!prop) {
                    DEBUG && console.log("PropData error: ", ary[0]);
                    return;
                }
                this.icon.setData(prop);
                this.lab_name.textFlow = prop.getPropName();
                this.updateLmtLab();
                this.updateCostBtn();
            };
            /**
             * 更新限购次数label
             * @param left_cnt 剩余次数 默认0
             * @param total_cnt 总共次数 默认：商店表的限购次数lmt_cnt
             * @param str 限购文本，默认：限购
             */
            IconShop.prototype.updateLmtLab = function (left_cnt, total_cnt, str) {
                if (left_cnt === void 0) { left_cnt = 0; }
                if (total_cnt == null) {
                    total_cnt = this.data.lmt_cnt;
                }
                if (str == null) {
                    str = '限购';
                }
                var txt = game.TextUtil.addColor(left_cnt + "/" + total_cnt, left_cnt > 0 ? 2330156 /* GREEN */ : 16719376 /* RED */);
                this.lab_limit.textFlow = game.TextUtil.parseHtml(str + txt);
                this.img_bought.visible = left_cnt <= 0;
                this.btn.visible = !this.img_bought.visible;
            };
            /**
             * 按钮购买消耗
             * @param cost 购买消耗，不传则默认商店表的 price * discount / 10000
             * @protected
             */
            IconShop.prototype.updateCostBtn = function (cost) {
                if (cost && cost.length) {
                    this._cost = cost;
                }
                else {
                    var cfg = this.data;
                    var cost_cnt = void 0;
                    if (cfg.discount) {
                        cost_cnt = Math.floor(cfg.price * cfg.discount / 10000);
                    }
                    else {
                        cost_cnt = cfg.price;
                    }
                    this._cost = [cfg.coin_type, cost_cnt];
                }
                this.btn.setCost(this._cost);
            };
            /**
             * 能否购买，只判断购买消耗
             */
            IconShop.prototype.canBuy = function () {
                if (!this._cost || !mod.BagUtil.checkPropCnt(this._cost[0], this._cost[1], 1 /* Dialog */)) {
                    return false;
                }
                return true;
            };
            /**
             * 点击购买，子类重载实现
             */
            IconShop.prototype.onClickBuy = function () {
            };
            return IconShop;
        }(mod.BaseListenerRenderer));
        mod.IconShop = IconShop;
        __reflect(IconShop.prototype, "game.mod.IconShop");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**带有文本以及加号的组件，比如副本收益次数*/
        var AddCntComp = /** @class */ (function (_super) {
            __extends(AddCntComp, _super);
            function AddCntComp() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AddCntCompSkin";
                return _this;
            }
            /**
             * 更新文本
             * @param str
             * @param prefixStr str的前缀，默认 次数：
             */
            AddCntComp.prototype.updateShow = function (str, prefixStr) {
                if (prefixStr === void 0) { prefixStr = game.getLanById("blacksmith_cue5" /* blacksmith_cue5 */); }
                this.lb_cnt.textFlow = game.TextUtil.parseHtml(prefixStr + str);
            };
            /**蓝色按钮*/
            AddCntComp.prototype.setBlue = function () {
                this.currentState = 'blue';
            };
            /**黄色按钮*/
            AddCntComp.prototype.setYellow = function () {
                this.currentState = 'yellow';
            };
            return AddCntComp;
        }(eui.Component));
        mod.AddCntComp = AddCntComp;
        __reflect(AddCntComp.prototype, "game.mod.AddCntComp");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var facade = base.facade;
        var Event = egret.Event;
        /**
         * 通用仙力组件
         */
        var AttrGodItem = /** @class */ (function (_super) {
            __extends(AttrGodItem, _super);
            function AttrGodItem() {
                var _this = _super.call(this) || this;
                _this._clickable = true; //可点击
                //不设置皮肤，支持复用
                //this.skinName = "skins.common.AttrGodSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            AttrGodItem.prototype.onAddToStage = function () {
                this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                if (this.grp_eft) {
                    this.setEffect("xianli" /* Xianli */, this.grp_eft);
                }
            };
            AttrGodItem.prototype.onRemoveFromStage = function () {
                this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            };
            AttrGodItem.prototype.onClick = function () {
                if (this._clickHandler) {
                    this._clickHandler.exec();
                    return;
                }
                if (!this._clickable) {
                    return;
                }
                facade.showView("06" /* Role */, "20" /* RoleGod */);
            };
            /**仙力值，clickable：设置是否可点击，一般其他玩家不给查看*/
            AttrGodItem.prototype.updateGod = function (god, clickable, clickHandler) {
                if (clickable === void 0) { clickable = true; }
                this._clickable = clickable;
                this._clickHandler = clickHandler;
                this.addBmpFont(god + "", game.BmpTextCfg[201 /* CommonPower2 */], this.grp_god, true, 1, true);
            };
            return AttrGodItem;
        }(mod.Btn));
        mod.AttrGodItem = AttrGodItem;
        __reflect(AttrGodItem.prototype, "game.mod.AttrGodItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 带有属性提升值的item
         * 例子：攻击+5000     向上绿色箭头 +8000
         */
        var AttrItemAddRender = /** @class */ (function (_super) {
            __extends(AttrItemAddRender, _super);
            function AttrItemAddRender() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AttrItemAddSkin";
                return _this;
            }
            AttrItemAddRender.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                this.setAttr();
            };
            AttrItemAddRender.prototype.setAttr = function () {
                var data = this.data;
                var name = game.TextUtil.getAttrsText(data.key);
                var val = game.TextUtil.getAttrsPerCent(data.key, data.val);
                this.lb_cur.textFlow = game.TextUtil.parseHtml(name + game.TextUtil.addColor(" +" + val, 8585074 /* GREEN */));
                this.lb_add.text = "+" + data.add_val;
                this.img_add.visible = this.lb_add.visible = data.add_val > 0; //默认0不展示提升
            };
            return AttrItemAddRender;
        }(eui.ItemRenderer));
        mod.AttrItemAddRender = AttrItemAddRender;
        __reflect(AttrItemAddRender.prototype, "game.mod.AttrItemAddRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 属性前带有图片的组件
         * 【图片 属性文本】
         */
        var AttrItemImgRender = /** @class */ (function (_super) {
            __extends(AttrItemImgRender, _super);
            function AttrItemImgRender() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AttrItemImgSkin";
                return _this;
            }
            AttrItemImgRender.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                this.setAttr(data.attrStr, data.img);
            };
            /**
             * 更新属性信息
             * @param attrStr 属性文本
             * @param imgTag 属性前面的图片资源，没有则隐藏，默认星星资源
             */
            AttrItemImgRender.prototype.setAttr = function (attrStr, imgTag) {
                if (imgTag === void 0) { imgTag = 'star_6'; }
                this.lb_attr.textFlow = game.TextUtil.parseHtml(attrStr);
                this.img_tag.visible = !!imgTag;
                if (imgTag) {
                    this.img_tag.source = imgTag;
                }
            };
            return AttrItemImgRender;
        }(eui.ItemRenderer));
        mod.AttrItemImgRender = AttrItemImgRender;
        __reflect(AttrItemImgRender.prototype, "game.mod.AttrItemImgRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 通用属性组件
         */
        var AttrItemRender = /** @class */ (function (_super) {
            __extends(AttrItemRender, _super);
            function AttrItemRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AttrItemRender.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                this.lab_attr.textFlow = game.TextUtil.parseHtml(this.data);
            };
            return AttrItemRender;
        }(eui.ItemRenderer));
        mod.AttrItemRender = AttrItemRender;
        __reflect(AttrItemRender.prototype, "game.mod.AttrItemRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 带有属性提升值的list
         */
        var AttrListAddView = /** @class */ (function (_super) {
            __extends(AttrListAddView, _super);
            function AttrListAddView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AttrListAddSkin";
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            AttrListAddView.prototype.onAddToStage = function () {
                this.list.itemRenderer = mod.AttrItemAddRender;
                this.list.dataProvider = this._listData = new eui.ArrayCollection();
            };
            /**
             * 更新属性，带有属性提升值
             * @param attr
             * @param next_attr
             */
            AttrListAddView.prototype.updateShow = function (attr, next_attr) {
                if (!attr) {
                    return;
                }
                var map = {};
                var keys = game.TextUtil.getAttrOrderKeys(attr);
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    if (!map[key]) {
                        map[key] = [];
                    }
                    map[key].push(attr[key] || 0);
                }
                keys = game.TextUtil.getAttrOrderKeys(next_attr);
                for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                    var key = keys_2[_a];
                    if (!map[key]) {
                        map[key] = [0, next_attr[key]];
                    }
                    else {
                        map[key][1] = next_attr[key];
                    }
                }
                var list = [];
                for (var key in map) {
                    list.push({
                        key: key,
                        val: map[key][0] || 0,
                        add_val: map[key][1] || 0
                    });
                }
                this._listData.replaceAll(list);
            };
            return AttrListAddView;
        }(eui.Component));
        mod.AttrListAddView = AttrListAddView;
        __reflect(AttrListAddView.prototype, "game.mod.AttrListAddView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 属性前带有图片的列表组件
         */
        var AttrListImgView = /** @class */ (function (_super) {
            __extends(AttrListImgView, _super);
            function AttrListImgView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AttrListImgSkin";
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            AttrListImgView.prototype.onAddToStage = function () {
                this.list.itemRenderer = mod.AttrItemImgRender;
                this.list.dataProvider = this._listData = new eui.ArrayCollection();
            };
            /**
             * 更新属性文本
             * @param attrAry 属性文本数组
             * @param img 属性文本前面的图片资源，默认星星资源
             */
            AttrListImgView.prototype.updateShow = function (attrAry, img) {
                if (attrAry === void 0) { attrAry = []; }
                if (img === void 0) { img = 'star_6'; }
                if (!attrAry || !attrAry.length) {
                    return;
                }
                var list = [];
                for (var _i = 0, attrAry_1 = attrAry; _i < attrAry_1.length; _i++) {
                    var item = attrAry_1[_i];
                    list.push({
                        attrStr: item,
                        img: img
                    });
                }
                this._listData.replaceAll(list);
            };
            /**
             * 更新属性
             * @param attrList
             */
            AttrListImgView.prototype.updateAttr = function (attrList) {
                if (!attrList || !attrList.length) {
                    return;
                }
                this._listData.replaceAll(attrList);
            };
            /**
             * 更新属性，+号
             * @param attr
             * @param color 默认 WhiteColor.GREEN
             * @param endStr 默认 \n
             * @param joinStr 默认 +
             * @param defaultColor 默认null
             * @param imgTag 不传则默认star_6资源
             */
            AttrListImgView.prototype.updateAttrAdd = function (attr, color, endStr, joinStr, defaultColor, imgTag) {
                if (color === void 0) { color = 2330156 /* GREEN */; }
                if (endStr === void 0) { endStr = "\n"; }
                if (joinStr === void 0) { joinStr = " +"; }
                var attrList = game.TextUtil.getAttrTextInfos(attr, color, endStr, joinStr, defaultColor);
                this.updateShow(attrList, imgTag);
            };
            return AttrListImgView;
        }(eui.Component));
        mod.AttrListImgView = AttrListImgView;
        __reflect(AttrListImgView.prototype, "game.mod.AttrListImgView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 通用属性列表组件
         */
        var AttrListView = /** @class */ (function (_super) {
            __extends(AttrListView, _super);
            function AttrListView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AttrListSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                return _this;
            }
            AttrListView.prototype.onAddToStage = function () {
                this.initAttrList();
            };
            AttrListView.prototype.onRemove = function () {
            };
            AttrListView.prototype.initAttrList = function () {
                if (!this._attrList) {
                    this._attrList = new ArrayCollection();
                }
                this.list_attr.itemRenderer = mod.AttrItemRender;
                this.list_attr.dataProvider = this._attrList;
            };
            /**属性赋值，defaultColor文本默认颜色*/
            AttrListView.prototype.updateAttr = function (attr, color, endStr, joinStr, defaultColor) {
                if (color === void 0) { color = 2330156 /* GREEN */; }
                if (endStr === void 0) { endStr = "\n"; }
                if (joinStr === void 0) { joinStr = ": "; }
                if (!this._attrList) {
                    this._attrList = new ArrayCollection();
                }
                var infos = game.TextUtil.getAttrTextInfos(attr, color, endStr, joinStr, defaultColor);
                if (this._attrList.source.length > 0) {
                    this._attrList.replaceAll(infos);
                }
                else {
                    this._attrList.source = infos;
                }
            };
            /**属性赋值，显示 +号，defaultColor文本默认颜色*/
            AttrListView.prototype.updateAttrAdd = function (attr, color, endStr, joinStr, defaultColor) {
                if (color === void 0) { color = 2330156 /* GREEN */; }
                if (endStr === void 0) { endStr = "\n"; }
                if (joinStr === void 0) { joinStr = " +"; }
                this.updateAttr(attr, color, endStr, joinStr, defaultColor);
            };
            /**属性赋值，不建议使用，先保留*/
            AttrListView.prototype.updateAttr2 = function (list) {
                this._attrList.replaceAll(list || []);
            };
            AttrListView.prototype.setListGap = function (gap) {
                if (gap === void 0) { gap = 6; }
                var layout = this.list_attr.layout;
                layout && (layout.gap = gap);
            };
            return AttrListView;
        }(eui.Component));
        mod.AttrListView = AttrListView;
        __reflect(AttrListView.prototype, "game.mod.AttrListView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 通用属性列表组件，带装饰角标
         */
        var AttrListZhuangshiView = /** @class */ (function (_super) {
            __extends(AttrListZhuangshiView, _super);
            function AttrListZhuangshiView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AttrListZhuangshiSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                return _this;
            }
            AttrListZhuangshiView.prototype.onAddToStage = function () {
                this.initAttrList();
            };
            AttrListZhuangshiView.prototype.onRemove = function () {
            };
            AttrListZhuangshiView.prototype.initAttrList = function () {
                if (!this._attrList) {
                    this._attrList = new ArrayCollection();
                }
                this.list_attr.itemRenderer = mod.BaseZhuangshiItem;
                this.list_attr.dataProvider = this._attrList;
            };
            /**属性赋值，defaultColor文本默认颜色*/
            AttrListZhuangshiView.prototype.updateAttr = function (attr, color, endStr, joinStr, defaultColor) {
                if (color === void 0) { color = 2330156 /* GREEN */; }
                if (endStr === void 0) { endStr = "\n"; }
                if (joinStr === void 0) { joinStr = ": "; }
                var infos = game.TextUtil.getAttrTextInfos(attr, color, endStr, joinStr, defaultColor);
                this.updateAttrByDescList(infos);
            };
            /**属性赋值，显示 +号，defaultColor文本默认颜色*/
            AttrListZhuangshiView.prototype.updateAttrAdd = function (attr, color, endStr, joinStr, defaultColor) {
                if (color === void 0) { color = 2330156 /* GREEN */; }
                if (endStr === void 0) { endStr = "\n"; }
                if (joinStr === void 0) { joinStr = " +"; }
                this.updateAttr(attr, color, endStr, joinStr, defaultColor);
            };
            /**直接显示属性文本*/
            AttrListZhuangshiView.prototype.updateAttrByDescList = function (infos) {
                if (!this._attrList) {
                    this._attrList = new ArrayCollection();
                }
                if (this._attrList.source.length > 0) {
                    this._attrList.replaceAll(infos);
                }
                else {
                    this._attrList.source = infos;
                }
            };
            /**设置间距*/
            AttrListZhuangshiView.prototype.setListGap = function (gap) {
                if (gap === void 0) { gap = 6; }
                var layout = this.list_attr.layout;
                layout && (layout.gap = gap);
            };
            /**设置x坐标*/
            AttrListZhuangshiView.prototype.setListX = function (x) {
                if (x === void 0) { x = 27; }
                this.list_attr.x = x;
            };
            return AttrListZhuangshiView;
        }(eui.Component));
        mod.AttrListZhuangshiView = AttrListZhuangshiView;
        __reflect(AttrListZhuangshiView.prototype, "game.mod.AttrListZhuangshiView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 属性面板的属性项标题
         */
        var AttrNameItem = /** @class */ (function (_super) {
            __extends(AttrNameItem, _super);
            function AttrNameItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.AttrNameItemSkin";
                return _this;
            }
            AttrNameItem.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.updateTitleSrc();
            };
            Object.defineProperty(AttrNameItem.prototype, "titleStr", {
                /**皮肤设置标题用*/
                set: function (str) {
                    this._titleStr = str;
                },
                enumerable: true,
                configurable: true
            });
            AttrNameItem.prototype.updateTitleSrc = function () {
                if (this._titleStr) {
                    var strList = this._titleStr.split(",");
                    var allStr = "";
                    for (var _i = 0, strList_1 = strList; _i < strList_1.length; _i++) {
                        var str = strList_1[_i];
                        allStr += game.getLanById(str);
                    }
                    this.lb_name.text = allStr;
                }
            };
            /**
             * 设置属性项标题
             * @param str 默认基础属性
             */
            AttrNameItem.prototype.setTitle = function (str) {
                if (str === void 0) { str = game.getLanById("ywl_baseAttr" /* ywl_baseAttr */); }
                this.lb_name.textFlow = game.TextUtil.parseHtml(str);
            };
            return AttrNameItem;
        }(mod.BaseStageEventItem));
        mod.AttrNameItem = AttrNameItem;
        __reflect(AttrNameItem.prototype, "game.mod.AttrNameItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var BaseAttrView = /** @class */ (function (_super) {
            __extends(BaseAttrView, _super);
            function BaseAttrView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseAttrViewSkin";
                return _this;
            }
            return BaseAttrView;
        }(eui.Component));
        mod.BaseAttrView = BaseAttrView;
        __reflect(BaseAttrView.prototype, "game.mod.BaseAttrView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var BubbleFrameItem = /** @class */ (function (_super) {
            __extends(BubbleFrameItem, _super);
            function BubbleFrameItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BubbleFrameItemSkin";
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            BubbleFrameItem.prototype.onAddToStage = function () {
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHide, this);
            };
            BubbleFrameItem.prototype.onRemoveFromStage = function () {
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHide, this);
            };
            /**
             * 更新文本
             * @param str
             */
            BubbleFrameItem.prototype.updateShow = function (str) {
                this.visible = true;
                this.lb_desc.textFlow = game.TextUtil.parseHtml(str);
            };
            return BubbleFrameItem;
        }(eui.Component));
        mod.BubbleFrameItem = BubbleFrameItem;
        __reflect(BubbleFrameItem.prototype, "game.mod.BubbleFrameItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var CommonLimitItemRender = /** @class */ (function (_super) {
            __extends(CommonLimitItemRender, _super);
            function CommonLimitItemRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CommonLimitItemRender.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                this.lab_desc.textFlow = game.TextUtil.parseHtml(mod.RoleUtil.getLimitStr(this.data));
            };
            return CommonLimitItemRender;
        }(eui.ItemRenderer));
        mod.CommonLimitItemRender = CommonLimitItemRender;
        __reflect(CommonLimitItemRender.prototype, "game.mod.CommonLimitItemRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var SpecialAttrItemRender = /** @class */ (function (_super) {
            __extends(SpecialAttrItemRender, _super);
            function SpecialAttrItemRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SpecialAttrItemRender.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                this.lab_desc.textFlow = game.TextUtil.parseHtml(this.data.descStr);
                if (this.data.maxWidth) {
                    this.lab_desc.maxWidth = this.data.maxWidth;
                }
            };
            return SpecialAttrItemRender;
        }(eui.ItemRenderer));
        mod.SpecialAttrItemRender = SpecialAttrItemRender;
        __reflect(SpecialAttrItemRender.prototype, "game.mod.SpecialAttrItemRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var facade = base.facade;
        var TouchEvent = egret.TouchEvent;
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 特殊属性组件
         */
        var SpecialAttrView = /** @class */ (function (_super) {
            __extends(SpecialAttrView, _super);
            function SpecialAttrView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.SpecialAttrSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                _this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                return _this;
            }
            SpecialAttrView.prototype.onAddToStage = function () {
                facade.onNt("surface_special_attr_update" /* SURFACE_SPECIAL_ATTR_UPDATE */, this.onInfoUpdate, this);
                this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                this.initAttrList();
            };
            SpecialAttrView.prototype.onRemove = function () {
                facade.offNt("surface_special_attr_update" /* SURFACE_SPECIAL_ATTR_UPDATE */, this.onInfoUpdate, this);
                this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            };
            SpecialAttrView.prototype.initAttrList = function () {
                if (!this._attrList) {
                    this._attrList = new ArrayCollection();
                }
                this.list_desc.itemRenderer = mod.SpecialAttrItemRender;
                this.list_desc.dataProvider = this._attrList;
            };
            SpecialAttrView.prototype.onClick = function () {
                this.visible = false;
            };
            SpecialAttrView.prototype.onInfoUpdate = function () {
                if (!this.visible) {
                    return;
                }
                if (this.currentState == "1") {
                    this.updateShow();
                }
                else {
                    this.updateShowList();
                }
            };
            SpecialAttrView.prototype.updateShow = function () {
                var descStr = "";
                if (this._special_desc) {
                    //特殊属性前置描述
                    descStr = this._special_desc;
                }
                if (this._specialIndexList.length) {
                    //特殊属性
                    var specialIndex = this._specialIndexList[0][0];
                    descStr += this.getDesc(specialIndex, this._index);
                }
                if (this._privilegeIdList.length) {
                    //特权ID
                    var privilegeId = this._privilegeIdList[0][0];
                    descStr += this.getDesc(privilegeId);
                }
                if (this._buffIdList.length) {
                    //buffId
                    var buffId = this._buffIdList[0];
                    descStr += this.getDesc(buffId);
                }
                this.lab_desc.textFlow = game.TextUtil.parseHtml(descStr);
                if (this._maxWidth) {
                    this.lab_desc.maxWidth = this._maxWidth;
                }
            };
            SpecialAttrView.prototype.getDesc = function (id, index) {
                if (index) {
                    //特殊属性
                    return this._proxy.getSpecialAttrDesc(index, id);
                }
                //buffId
                var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, id);
                if (buffCfg) {
                    return buffCfg.des || '';
                }
                var pCfg = game.getConfigByNameId("new_privilege.json" /* NewPrivilege */, id);
                if (!pCfg) {
                    console.info("灵宠ID：", this._index, "灵宠特权配置不对，特权ID：", id);
                }
                return pCfg && pCfg.desc || "";
            };
            SpecialAttrView.prototype.getDescByCfg = function (id, star, index) {
                var descStr = this.getDesc(id, index);
                if (star) {
                    //星级属性
                    descStr = star + "★：" + descStr;
                    var curStar = mod.SurfaceUtil.getStar(this._index);
                    if (curStar >= star) {
                        descStr = game.TextUtil.addColor(descStr, 2330156 /* GREEN */);
                    }
                }
                return descStr;
            };
            SpecialAttrView.prototype.updateShowList = function () {
                var infos = [];
                if (this._special_desc) {
                    //特殊属性前置描述
                    infos.push({ descStr: this._special_desc, maxWidth: this._maxWidth });
                }
                var tmpList = [];
                for (var _i = 0, _a = this._specialIndexList; _i < _a.length; _i++) {
                    var i = _a[_i];
                    var id = i[0]; //第一个是属性ID
                    var star = i.length > 1 ? i[1] : 0; //有星级的时候取星级
                    var descStr = this.getDescByCfg(id, star, this._index);
                    if (star) {
                        //存在星级配置
                        tmpList.push({ sort: star, descStr: descStr });
                    }
                    else {
                        infos.push({ descStr: descStr, maxWidth: this._maxWidth });
                    }
                }
                for (var _b = 0, _c = this._privilegeIdList; _b < _c.length; _b++) {
                    var i = _c[_b];
                    var id = i[0]; //第一个是特权ID
                    var star = i.length > 1 ? i[1] : 0; //有星级的时候取星级
                    var descStr = this.getDescByCfg(id, star);
                    if (star) {
                        //存在星级配置
                        tmpList.push({ sort: star, descStr: descStr });
                    }
                    else {
                        infos.push({ descStr: descStr, maxWidth: this._maxWidth });
                    }
                }
                for (var _d = 0, _e = this._buffIdList; _d < _e.length; _d++) {
                    var i = _e[_d];
                    var descStr = this.getDescByCfg(i, null);
                    infos.push({ descStr: descStr, maxWidth: this._maxWidth });
                }
                if (tmpList.length) {
                    tmpList.sort(game.SortTools.sortByRort);
                    for (var _f = 0, tmpList_1 = tmpList; _f < tmpList_1.length; _f++) {
                        var i = tmpList_1[_f];
                        infos.push({ descStr: i.descStr, maxWidth: this._maxWidth });
                    }
                }
                this._attrList.source = infos;
            };
            /**属性显示
             * cfg 外显配置
             * maxWidth 文本最大宽度，特殊界面设置用
             * */
            SpecialAttrView.prototype.updateDesc = function (cfg, maxWidth) {
                if (!cfg || (!cfg.special_attr_id && !cfg.privilege_id && !cfg.special_desc && !cfg.buff_id)) {
                    //灵宠需要额外判断特权ID
                    this.visible = false;
                    return;
                }
                this.visible = true;
                this._index = cfg.index;
                this._maxWidth = maxWidth;
                this._specialIndexList = []; //置空
                this._privilegeIdList = []; //置空
                this._buffIdList = []; //置空
                this._special_desc = null;
                var special_attr_id = cfg.special_attr_id;
                if (special_attr_id) {
                    //特殊属性
                    if (Array.isArray(special_attr_id)) {
                        //数组
                        this._specialIndexList = special_attr_id;
                    }
                    else {
                        this._specialIndexList.push([special_attr_id]);
                    }
                }
                var privilege_id = cfg.privilege_id;
                if (privilege_id) {
                    //特权ID
                    if (Array.isArray(privilege_id)) {
                        //数组
                        this._privilegeIdList = privilege_id;
                    }
                    else {
                        this._privilegeIdList.push([privilege_id]);
                    }
                }
                var buff_id = cfg.buff_id;
                if (buff_id) {
                    //buffId
                    if (Array.isArray(buff_id)) {
                        this._buffIdList = buff_id;
                    }
                    else {
                        this._buffIdList.push(buff_id);
                    }
                }
                var len = this._specialIndexList.length + this._privilegeIdList.length + this._buffIdList.length; //属性条数
                if (cfg.special_desc) {
                    this._special_desc = cfg.special_desc;
                    len++; //加上前置属性描述
                }
                if (len > 1) {
                    //多条属性的时候
                    this.currentState = "2";
                    this.updateShowList();
                }
                else {
                    //只有一条属性的时候
                    this.currentState = "1";
                    this.updateShow();
                }
            };
            return SpecialAttrView;
        }(eui.Component));
        mod.SpecialAttrView = SpecialAttrView;
        __reflect(SpecialAttrView.prototype, "game.mod.SpecialAttrView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 线条
         * 两种状态：蓝色，黄色
         */
        var CommonLine = /** @class */ (function (_super) {
            __extends(CommonLine, _super);
            function CommonLine() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.CommonLineSkin";
                return _this;
            }
            /**设置蓝色*/
            CommonLine.prototype.setBlue = function () {
                this.currentState = 'blue';
            };
            /**设置黄色*/
            CommonLine.prototype.setYellow = function () {
                this.currentState = 'yellow';
            };
            return CommonLine;
        }(eui.Component));
        mod.CommonLine = CommonLine;
        __reflect(CommonLine.prototype, "game.mod.CommonLine");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TimeMgr = base.TimeMgr;
        /**
         * 按钮基类
         */
        var BtnIconBase = /** @class */ (function (_super) {
            __extends(BtnIconBase, _super);
            function BtnIconBase(id, isBig) {
                var _this = _super.call(this) || this;
                // /**初次点击红点*/
                // private _clickHint = false;
                // /**初次点击特效*/
                // private _clickEff = false;
                _this._isBig = false; //是否冲榜按钮
                _this.skinName = isBig ? 'skins.activity.BtnIconBigSkin' : 'skins.activity.BtnIconBaseSkin';
                _this._isBig = isBig;
                _this._id = id;
                _this.name = "btnIcon_" + id;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            BtnIconBase.prototype.onAddToStage = function () {
                if (this.gr_time) {
                    this.gr_time.visible = false;
                }
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                this.addEventListener(eui.UIEvent.MOVE, this.onMove, this);
                this.updateUI();
            };
            BtnIconBase.prototype.onRemoveFromStage = function () {
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this.removeEffect();
                if (this.gr_time) {
                    this.gr_time.visible = false;
                }
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            };
            Object.defineProperty(BtnIconBase.prototype, "data", {
                get: function () {
                    return this._data;
                },
                set: function (data) {
                    this._data = data;
                    // if (data.hintType == BtnIconHintType.Once) {
                    //     if (BtnIconBase._hintCache[data.id] == undefined) {
                    //         // this._clickHint = true; //初次点击红点，初始为true
                    //     }
                    // }
                    // if (data.effType == BtnIconEffType.Once) {
                    //     if (!BtnIconBase._effCache[data.id] == undefined) {
                    //         // this._clickEff = true;
                    //     }
                    // }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BtnIconBase.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 设置icon
             * 默认icon都是放在 aaaa\ui_btn_icon1
             */
            BtnIconBase.prototype.setIcon = function () {
                if (this._data && this._data.icon) {
                    return this._data.icon;
                }
                return '';
            };
            /**
             * 点击事件，设置为公共，支持外部指引回调
             */
            BtnIconBase.prototype.onTap = function () {
                var btnData = this.data;
                if (btnData.guideKey) {
                    mod.GuideMgr.getIns().clear(btnData.guideKey); //清除指引
                }
                //点击后，红点处理
                if (btnData.hintType == BtnIconHintType.Once) {
                    // this._clickHint = false;
                    BtnIconBase._hintCache[btnData.id] = true; //点击过了
                    this.setHint(false);
                }
                if (btnData.hintType == BtnIconHintType.FirstCommon) {
                    var hint = this.getHint(); //红点规则
                    // this._clickHint = hint;
                    BtnIconBase._hintCache[btnData.id] = true; //点击过了
                    this.setHint(hint);
                }
                //点击后，特效处理
                if (btnData.effType == BtnIconEffType.Once) {
                    // this._clickEff = false;
                    BtnIconBase._effCache[btnData.id] = true; //点击过了
                    this.updateEffect(false);
                }
                if (btnData.effType == BtnIconEffType.FirstCommon) {
                    var hint = this.getHint(); //红点规则
                    // this._clickEff = hint;
                    BtnIconBase._effCache[btnData.id] = true; //点击过了
                    this.updateEffect(hint);
                }
                if (btnData.clickHandler) {
                    btnData.clickHandler.exec(this.data);
                    return;
                }
                if (btnData) {
                    var showBack = !!btnData.showBack;
                    mod.ViewMgr.getIns().showView(btnData.m, btnData.v, btnData.param, showBack);
                }
            };
            BtnIconBase.prototype.onMove = function () {
                var btnData = this.data;
                if (btnData.showTips) {
                    mod.BtnTipsMgr.getIns().updatePos(this);
                }
            };
            // /**强制刷一次*/
            // public onUpdateUI(): void {
            //     this.updateUI();
            // }
            /**
             * 更新按钮的ui
             * 只触发一次，添加到舞台时
             */
            BtnIconBase.prototype.updateUI = function () {
                if (this.setIcon()) {
                    this.iconDisplay.source = this.setIcon();
                }
                var hintType = this.data.hintType;
                var hint = false;
                if (hintType == BtnIconHintType.Once) {
                    hint = BtnIconBase._hintCache[this.data.id] == undefined;
                }
                else if (hintType == BtnIconHintType.FirstCommon) {
                    hint = BtnIconBase._hintCache[this.data.id] == undefined || this.getHint();
                }
                else if (hintType == BtnIconHintType.Common) {
                    hint = this.getHint();
                }
                this.setHint(hint);
                var effType = this.data.effType;
                var showEff = false;
                if (effType == BtnIconEffType.Forever) {
                    showEff = true;
                }
                else if (effType == BtnIconEffType.Once) {
                    showEff = BtnIconBase._hintCache[this.data.id] == undefined;
                }
                else if (effType == BtnIconEffType.FirstCommon) {
                    showEff = BtnIconBase._hintCache[this.data.id] == undefined || hint;
                }
                else if (effType == BtnIconEffType.Common) {
                    showEff = hint;
                }
                this.updateEffect(showEff);
                var showSweepEff = this.data.sweepType && this.data.sweepType == 1;
                this.updateSweepEffect(showSweepEff);
                this.updateTime();
            };
            BtnIconBase.prototype.getHint = function () {
                if (this.data.hintMsg) {
                    return mod.HintMgr.getHint(this.data.hintMsg); //默认红点规则
                }
                else if (this.data.hintMsgList) {
                    var hint = false;
                    for (var _i = 0, _a = this.data.hintMsgList; _i < _a.length; _i++) {
                        var hintMsg = _a[_i];
                        if (mod.HintMgr.getHint(hintMsg)) {
                            hint = true;
                            break;
                        }
                    }
                    return hint; //组合模块红点
                }
                return false;
            };
            /**
             * 设置按钮红点
             */
            BtnIconBase.prototype.setHint = function (hint) {
                this.redPoint.visible = hint;
                if (this.data.effType == BtnIconEffType.Common || this.data.effType == BtnIconEffType.FirstCommon) {
                    this.updateEffect(hint);
                }
            };
            /**
             * 0 表示插入末尾
             * >0 表示序号
             */
            BtnIconBase.prototype.getSortNum = function () {
                if (this._data) {
                    return this._data.sort_num;
                }
                return 0;
            };
            /**
             * 更新特效
             * @param showEff 红点规则下的特效展示，默认false
             * @private
             */
            BtnIconBase.prototype.updateEffect = function (showEff) {
                if (showEff === void 0) { showEff = false; }
                if (!showEff) {
                    this.removeEffect();
                    return;
                }
                if (showEff && !this._effId) {
                    var eftSrc = this._isBig ? "feishengbang" /* FeiShengBang */ : "icon_rotate" /* ActBtnEffect */;
                    this._effId = mod.BtnIconMgr.ins().addEftByParent(game.ResUtil.getEffectUI(eftSrc), 0, this.gr_eff);
                }
            };
            BtnIconBase.prototype.removeEffect = function () {
                if (this._effId) {
                    mod.BtnIconMgr.ins().removeEffect(this._effId);
                    this._effId = null;
                }
            };
            /**
             * 更新特效
             * @param showEff 扫描光特效
             * @private
             */
            BtnIconBase.prototype.updateSweepEffect = function (showEff) {
                if (showEff === void 0) { showEff = false; }
                if (!showEff) {
                    this.removeSweepEffect();
                    return;
                }
                if (showEff && !this._effSweeppId) {
                    this._effSweeppId = mod.BtnIconMgr.ins().addEftByParent(game.ResUtil.getEffectUI("tubiaosaoguang" /* SweepBtnEffect */), 0, this.gr_eff);
                }
            };
            BtnIconBase.prototype.removeSweepEffect = function () {
                if (this._effSweeppId) {
                    mod.BtnIconMgr.ins().removeEffect(this._effSweeppId);
                    this._effSweeppId = null;
                }
            };
            /**
             * 更新时间或者其他文本
             * @param timeStr 若有，则优先展示这个文本
             */
            BtnIconBase.prototype.updateTime = function (timeStr) {
                if (!this.gr_time) {
                    return;
                }
                if (!this.gr_time.visible) {
                    this.gr_time.visible = true;
                }
                if (timeStr) {
                    this.lb_time.textFlow = game.TextUtil.parseHtml(timeStr);
                    return;
                }
                var endTime = this.data.endTime || 0;
                var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                if (leftTime <= 0) {
                    this.gr_time.visible = false;
                    return;
                }
                this.lb_time.text = game.TimeUtil.formatSecond(leftTime, 'd天H时', true);
            };
            /**点击缓存*/
            BtnIconBase._hintCache = {};
            /**点击缓存*/
            BtnIconBase._effCache = {};
            return BtnIconBase;
        }(mod.Btn));
        mod.BtnIconBase = BtnIconBase;
        __reflect(BtnIconBase.prototype, "game.mod.BtnIconBase");
        //todo 提取到配置表
        var BtnIconHintType;
        (function (BtnIconHintType) {
            /**永不展示红点*/
            BtnIconHintType[BtnIconHintType["None"] = 1] = "None";
            /**初次点击红点*/
            BtnIconHintType[BtnIconHintType["Once"] = 2] = "Once";
            /**根据红点规则展示*/
            BtnIconHintType[BtnIconHintType["Common"] = 3] = "Common";
            /**首次进入有红点，点击之后根据红点规则展示*/
            BtnIconHintType[BtnIconHintType["FirstCommon"] = 4] = "FirstCommon";
        })(BtnIconHintType = mod.BtnIconHintType || (mod.BtnIconHintType = {}));
        //对应配置表
        var BtnIconEffType;
        (function (BtnIconEffType) {
            /**永不展示特效*/
            BtnIconEffType[BtnIconEffType["None"] = 1] = "None";
            /**单次点击特效*/
            BtnIconEffType[BtnIconEffType["Once"] = 2] = "Once";
            /**根据红点显示与否展示*/
            BtnIconEffType[BtnIconEffType["Common"] = 3] = "Common";
            /**永久展示*/
            BtnIconEffType[BtnIconEffType["Forever"] = 4] = "Forever";
            /**首次进入有特效，点击之后根据红点规则展示*/
            BtnIconEffType[BtnIconEffType["FirstCommon"] = 5] = "FirstCommon";
        })(BtnIconEffType = mod.BtnIconEffType || (mod.BtnIconEffType = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Pool = base.Pool;
        var Handler = base.Handler;
        var TimeMgr = base.TimeMgr;
        var facade = base.facade;
        //import oper_act_item = msg.oper_act_item;
        var BtnIconMgr = /** @class */ (function () {
            //用于Mdr中传入按钮容器
            function BtnIconMgr(group) {
                /**所有的按钮*/
                this._btnDataMap = {};
                /**展示中的按钮*/
                this._showBtnMap = {};
                /**有倒计时文本的按钮*/
                this._btnTimeMap = {};
                /**按钮的监听事件*/
                this._btnNtMap = {};
                /**中控活动openIdx映射活动ID列表*/
                this._btnOpenIdxMap = {};
                /**================================ 按钮特效 ================================*/
                this._id = 0;
                this._effect = {};
                this._group = group;
                if (this._group) {
                    this._group.removeChildren();
                }
            }
            //用于特效处理
            BtnIconMgr.ins = function () {
                if (!this._ins) {
                    this._ins = new BtnIconMgr();
                }
                return this._ins;
            };
            BtnIconMgr.insTop = function () {
                if (!this._insTop) {
                    this._insTop = new BtnIconMgr();
                }
                return this._insTop;
            };
            BtnIconMgr.insBig = function () {
                if (!this._insBig) {
                    this._insBig = new BtnIconMgr();
                }
                return this._insBig;
            };
            BtnIconMgr.insLeft = function () {
                if (!this._insLeft) {
                    this._insLeft = new BtnIconMgr();
                }
                return this._insLeft;
            };
            BtnIconMgr.insChaozhilibao = function () {
                if (!this._insChaozhilibao) {
                    this._insChaozhilibao = new BtnIconMgr();
                }
                return this._insChaozhilibao;
            };
            BtnIconMgr.prototype.findInsertIndex = function (list, btn) {
                if (!list || !list.length || !btn || btn.getSortNum() == 0) {
                    return -1;
                }
                var btnIdx = btn.getSortNum() || 0;
                var left = 0;
                var right = list.length - 1;
                while (left <= right) {
                    var mid = Math.floor((left + right) / 2);
                    var btnItem = list[mid];
                    if (!btnItem) {
                        break;
                    }
                    var midBtnIdx = btnItem.getSortNum() || 0;
                    if (btnIdx == midBtnIdx) {
                        return mid;
                    }
                    else if (btnIdx < midBtnIdx || midBtnIdx == 0) {
                        right = mid - 1;
                    }
                    else if (btnIdx > midBtnIdx) {
                        left = mid + 1;
                    }
                }
                return left;
            };
            BtnIconMgr.prototype.addBtn = function (btn) {
                if (!btn || !this._group) {
                    return;
                }
                var btnId = btn.id;
                if (!this._showBtnMap[btnId]) {
                    var idx = this.findInsertIndex(this._group.$children, btn);
                    if (idx < 0) {
                        this._group.addChild(btn);
                    }
                    else {
                        this._group.addChildAt(btn, idx);
                    }
                    this._showBtnMap[btnId] = btn;
                    // if(btn.data && btn.data.mainBtnType){
                    //     FunctionNoticeMgr.getIns().show(btn.data.mainBtnType, btn, btn.parent.parent);//展示预告气泡
                    // }
                }
                var btnData = btn.data;
                if (btnData.isInit === false && btnData.initHandler) {
                    btnData.isInit = true;
                    btnData.initHandler.exec();
                }
                //展示时间
                var isTime = this.checkBtnTime(this._btnDataMap[btnId]);
                if (isTime && !this._btnTimeMap[btnId]) {
                    this._btnTimeMap[btnId] = btn;
                }
                else if (!isTime && this._btnTimeMap[btnId]) {
                    this._btnTimeMap[btnId] = null;
                    delete this._btnTimeMap[btnId];
                }
            };
            BtnIconMgr.prototype.removeBtn = function (btn) {
                if (!btn || !this._group) {
                    return;
                }
                var btnId = btn.id;
                if (this._showBtnMap[btnId]) {
                    if (btn.data && btn.data.guideKey) {
                        mod.GuideMgr.getIns().clear(btn.data.guideKey); //清除指引
                    }
                    // if(btn.data && btn.data.mainBtnType){
                    //     FunctionNoticeMgr.getIns().clear(btn.data.mainBtnType);//清除预告气泡
                    // }
                    if (btn.data && btn.data.showTips) {
                        mod.BtnTipsMgr.getIns().hideTips(btnId);
                    }
                    this._group.removeChild(btn);
                    this._showBtnMap[btnId] = null;
                    delete this._showBtnMap[btnId];
                }
                if (this._btnTimeMap[btnId]) {
                    this._btnTimeMap[btnId] = null;
                    delete this._btnTimeMap[btnId];
                }
            };
            /**
             * 初始所有的按钮
             * @param btnData 按钮数组
             * @param isShow 是否显示
             * @param isBig 是否冲榜按钮
             */
            BtnIconMgr.prototype.dealBtnIconList = function (btnData, isShow, isBig) {
                for (var _i = 0, btnData_1 = btnData; _i < btnData_1.length; _i++) {
                    var data = btnData_1[_i];
                    //初始化所有按钮时候，判断是否存在缓存值
                    var isOpen = BtnIconMgr._btnTmpMap[data.id];
                    if (isOpen != undefined) {
                        data.isHide = !isOpen;
                        if (!BtnIconMgr._btnTmpCacheMap[data.id]) {
                            delete BtnIconMgr._btnTmpMap[data.id];
                        }
                    }
                    this._btnDataMap[data.id] = data; //转成map格式
                    this.dealSingleBtnIcon(data.id, isShow, isBig);
                }
            };
            /**
             * 处理单个按钮
             * @param id 按钮id
             * @param isShow 是否显示
             * @param isBig 是否冲榜按钮
             * @return 返回true或false，true表示展示按钮
             */
            BtnIconMgr.prototype.dealSingleBtnIcon = function (id, isShow, isBig) {
                if (!this._btnDataMap[id]) {
                    return false;
                }
                var btnData = this._btnDataMap[id];
                var btnIcon = this.regBtn(btnData, isShow, isBig);
                //有监听回调的，绑定监听
                if (btnData.handler && btnData.handlerMsg) {
                    var handlerMsg = btnData.handlerMsg;
                    if (!this._btnNtMap[handlerMsg]) {
                        this._btnNtMap[handlerMsg] = [];
                    }
                    if (this._btnNtMap[handlerMsg].indexOf(id) < 0) {
                        this._btnNtMap[handlerMsg].push(id);
                    }
                }
                if (!btnIcon) {
                    //展示中的要移除
                    if (this._showBtnMap[id]) {
                        this.removeBtn(this._showBtnMap[id]);
                    }
                    return false;
                }
                this.addBtn(btnIcon);
                return true;
            };
            /**
             * 清理数据
             */
            BtnIconMgr.prototype.clear = function () {
                this._btnDataMap = {};
                this._showBtnMap = {};
                this._btnTimeMap = {};
                this._btnNtMap = {};
                this._btnOpenIdxMap = {};
            };
            /**
             * 注册按钮
             * @param btnData 按钮数据
             * @param isShow 是否显示所有按钮
             * @param isBig 是否冲榜按钮
             */
            BtnIconMgr.prototype.regBtn = function (btnData, isShow, isBig) {
                //对应功能开启表的，判断对应的功能是否开启
                var id = btnData.id; //常驻活动时是功能开启ID，中控活动是活动ID
                var openIdx = id; //功能开启ID
                if (btnData.openIdx) {
                    //存在openIdx时，做下映射
                    openIdx = btnData.openIdx;
                    if (!this._btnOpenIdxMap[btnData.openIdx]) {
                        this._btnOpenIdxMap[btnData.openIdx] = [];
                    }
                    if (this._btnOpenIdxMap[btnData.openIdx].indexOf(id) < 0) {
                        this._btnOpenIdxMap[btnData.openIdx].push(id);
                    }
                }
                var cfg = game.getConfigByNameId("open_function.json" /* OpenFunction */, openIdx);
                if (cfg && !mod.ViewMgr.getIns().checkViewOpen(openIdx)) {
                    return null;
                }
                // 显示逻辑判断，收缩时候判断是否还显示
                if (isShow != undefined) {
                    if (isShow == false && !cfg.always_show) {
                        return null;
                    }
                }
                // 隐藏
                if (btnData.isHide) {
                    return null;
                }
                // 有回调，不展示按钮。回调对应的handlerMsg放到mdr处理
                if (btnData.handler) {
                    var _isShow = btnData.handler.exec();
                    if (!_isShow) {
                        return null;
                    }
                }
                //倒计时结束
                if (!btnData.showTime && btnData.endTime && btnData.endTime > TimeMgr.time.serverTimeSecond) {
                    return null;
                }
                var btn = new mod.BtnIconBase(id, isBig); //todo 传入IBtnIconData
                //若不传红点路径，则取默认[m,v]
                if ((!btnData.hintMsg || !btnData.hintMsg.length) && !btnData.hintMsgList) {
                    btnData.hintMsg = [btnData.m, btnData.v];
                }
                //若不传红点类型，默认红点规则Common
                if (!btnData.hintType) {
                    btnData.hintType = mod.BtnIconHintType.Common;
                }
                //默认永不展示特效，修改配置了。
                // if (!btnData.effType) {
                //     btnData.effType = BtnIconEffType.None;
                // }
                btnData.effType = cfg.effType || mod.BtnIconEffType.None;
                btnData.sweepType = cfg.sweepType || 0;
                var icon = cfg && cfg.icon ? cfg.icon : '';
                //OperActivityData
                if (btnData.param && btnData.param.actInfo && btnData.param.actInfo instanceof msg.oper_act_item) {
                    icon = btnData.icon; //中控活动取配置的icon
                }
                btnData.icon = icon;
                btnData.sort_num = cfg ? cfg.sort_num : 0;
                btn.data = btnData;
                return btn;
            };
            /**
             * 展示时间否
             * @param btnData
             */
            BtnIconMgr.prototype.checkBtnTime = function (btnData) {
                if (btnData && btnData.showTime) {
                    return true;
                }
                var endTime = btnData && btnData.endTime || 0;
                var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                return leftTime > 0;
            };
            /**
             * 特效播放 ---- 搭配removeEffect使用
             * @param src 特效资源
             * @param times 播放次数， <1 无限次播放
             * @param parent 特效容器，默认加入容器的显示列表尾部
             * @param cb 特效播放完回调函数
             * @param scale scale，默认1
             * @param autoRemove 播放完是否移除，默认true
             * @param speed 播放速度，默认1
             * @param frameRate 播放帧率，默认12
             */
            BtnIconMgr.prototype.addEftByParent = function (src, times, parent, cb, scale, autoRemove, speed, frameRate) {
                if (cb === void 0) { cb = null; }
                if (scale === void 0) { scale = 1; }
                if (autoRemove === void 0) { autoRemove = true; }
                if (speed === void 0) { speed = 1; }
                if (frameRate === void 0) { frameRate = 12; }
                return this.add(src, 0, 0, cb, times, parent, -1, scale, autoRemove, speed, frameRate);
            };
            BtnIconMgr.prototype.add = function (src, x, y, cb, times, parent, idx, scale, autoRemove, speed, frameRate) {
                if (scale === void 0) { scale = 1; }
                if (autoRemove === void 0) { autoRemove = true; }
                if (speed === void 0) { speed = 1; }
                if (frameRate === void 0) { frameRate = 12; }
                if (!src) {
                    return 0;
                }
                var id = ++this._id;
                var animate = Pool.alloc(game.UIAnimate);
                var source = src.indexOf("assets") > -1 ? src : game.ResUtil.getEffectUI(src);
                animate.x = x;
                animate.y = y;
                animate.id = id;
                animate.times = times;
                animate.scaleX = animate.scaleY = scale;
                animate.speed = speed;
                animate.complete = Handler.alloc(this, this.onPlayComp);
                if (parent) {
                    if (idx >= 0) {
                        parent.addChildAt(animate, idx);
                    }
                    else {
                        parent.addChild(animate);
                    }
                }
                this._effect[id] = { animate: animate, cb: cb, autoRemove: autoRemove };
                animate.load(source, frameRate);
                return id;
            };
            BtnIconMgr.prototype.onPlayComp = function (animate) {
                if (!animate) {
                    return;
                }
                var effect = this._effect[animate.id];
                if (!effect) {
                    return;
                }
                var cb = effect.cb;
                if (effect.autoRemove) {
                    this.removeEffect(animate.id);
                }
                if (cb) {
                    cb.exec();
                    Pool.release(cb);
                }
                effect.cb = null;
            };
            BtnIconMgr.prototype.removeEffect = function (id) {
                var effect = this._effect[id];
                if (!effect) {
                    return;
                }
                if (effect.animate.parent) {
                    effect.animate.parent.removeChild(effect.animate);
                }
                if (effect.cb) {
                    Pool.release(effect.cb);
                    effect.cb = null;
                }
                Pool.release(effect.animate);
                this._effect[id] = null;
                delete this._effect[id];
            };
            //按钮管理器，显示指引
            BtnIconMgr.prototype.showGuide = function () {
                var showBtnMap = this._showBtnMap;
                for (var k in showBtnMap) {
                    var btnIcon = showBtnMap[k];
                    var btnData = btnIcon ? btnIcon.data : null;
                    if (btnData && btnData.guideKey) {
                        mod.GuideMgr.getIns().show(btnData.guideKey, btnIcon, Handler.alloc(btnIcon, btnIcon.onTap)); //指引
                    }
                }
            };
            //按钮管理器，清除指引
            BtnIconMgr.prototype.clearGuide = function () {
                var showBtnMap = this._showBtnMap;
                for (var k in showBtnMap) {
                    var btnIcon = showBtnMap[k];
                    var btnData = btnIcon ? btnIcon.data : null;
                    if (btnData && btnData.guideKey) {
                        mod.GuideMgr.getIns().clear(btnData.guideKey); //指引
                    }
                }
            };
            /**
             * 更新活动开启，中控活动不用缓存，一般设置关闭的时候才用
             * @param id BtnIconId
             * @param isOpen 开启
             * @param isAct 是否中控活动
             * @param isCache 删除缓存isOpen否，默认删除。传入true不删除
             */
            BtnIconMgr.prototype.updateOpen = function (id, isOpen, isAct, isCache) {
                if (!this._btnDataMap[id]) {
                    if (!isAct) {
                        BtnIconMgr._btnTmpMap[id] = isOpen; //缓存数据，中控活动不用缓存
                        if (isCache) {
                            BtnIconMgr._btnTmpCacheMap[id] = isCache;
                        }
                    }
                    return false;
                }
                var btnData = this._btnDataMap[id];
                var lastIsHide = !!btnData.isHide; //转化为布尔值
                var isHide = !isOpen;
                if (lastIsHide != isHide) {
                    //判断不一致时才处理
                    btnData.isHide = isHide; //修改按钮字段
                    this.dealSingleBtnIcon(id);
                    if (isHide) {
                        facade.sendNt("on_activity_icon_hide" /* ON_ACTIVITY_ICON_HIDE */, id); //发送事件关闭界面
                    }
                }
                return true;
            };
            /**缓存的开启关闭数据，收到数据时Mdr还未实例化BtnIconMgr时做数据缓存，存的是isOpen*/
            BtnIconMgr._btnTmpMap = {};
            BtnIconMgr._btnTmpCacheMap = {};
            return BtnIconMgr;
        }());
        mod.BtnIconMgr = BtnIconMgr;
        __reflect(BtnIconMgr.prototype, "game.mod.BtnIconMgr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var CommonMatchItem = /** @class */ (function (_super) {
            __extends(CommonMatchItem, _super);
            function CommonMatchItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CommonMatchItem.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
            };
            CommonMatchItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                var info = this.data;
                this.lab_name.text = info.name;
                var sex = info.sex;
                this.img_player.source = "doufa_palyer" + sex;
                this.powerLabel.visible = !!info.showpower;
                if (this.powerLabel.visible) {
                    this.powerLabel.setPowerValue(info.showpower);
                }
                if (info.index) {
                    this.currentState = "" + info.index;
                }
            };
            CommonMatchItem.prototype.setData = function (data) {
                this.data = data;
            };
            return CommonMatchItem;
        }(mod.BaseRenderer));
        mod.CommonMatchItem = CommonMatchItem;
        __reflect(CommonMatchItem.prototype, "game.mod.CommonMatchItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var CommonMatchView = /** @class */ (function (_super) {
            __extends(CommonMatchView, _super);
            function CommonMatchView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.CommonMatchSkin";
                return _this;
            }
            return CommonMatchView;
        }(eui.Component));
        mod.CommonMatchView = CommonMatchView;
        __reflect(CommonMatchView.prototype, "game.mod.CommonMatchView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var PassBossTip = /** @class */ (function () {
            function PassBossTip() {
            }
            PassBossTip.show = function (handler) {
                var showArg = {
                    handler: handler
                };
                facade.showView("42" /* Pass */, "14" /* PassBossTip */, showArg);
            };
            return PassBossTip;
        }());
        mod.PassBossTip = PassBossTip;
        __reflect(PassBossTip.prototype, "game.mod.PassBossTip");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        /**
         * 战力组件
         */
        var Power = /** @class */ (function (_super) {
            __extends(Power, _super);
            function Power() {
                var _this = _super.call(this) || this;
                _this.touchChildren = false;
                _this.touchEnabled = false;
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this._effHub = new game.UIEftHub(_this);
                return _this;
            }
            Power.prototype.createChildren = function () {
                // this.showFlameEff();
            };
            Power.prototype.showFlameEff = function () {
                var self = this;
                if (self.group_flame) {
                    if (this._effIdx) {
                        return;
                    }
                    //this._effIdx = self._effHub.add(UIEftSrc.CommPower, 0, 0, null, 0, self.group_flame, -1, 1, true, 1);
                }
            };
            Power.prototype.removeFlameEff = function () {
                if (this._effIdx) {
                    this._effHub.removeEffect(this._effIdx);
                    this._effIdx = null;
                }
            };
            Power.prototype.onAddToStage = function () {
                this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            };
            Power.prototype.onRemoveFromStage = function () {
                this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this.onHide();
            };
            Power.prototype.onHide = function () {
                this.removeFlameEff();
                this._effHub.clearAllFont();
                this._effHub.removeAllEffects();
            };
            /**
             * 添加字体
             * @param text 显示的文本
             * @param expandParent 默认不设置container大小
             */
            Power.prototype.setPowerValue = function (text, expandParent) {
                if (expandParent === void 0) { expandParent = false; }
                var powerValue = text ? text.toString() : "0";
                this._effHub.addBmpFont(powerValue, game.BmpTextCfg[100 /* CommonPower */], this.group_power, true, 1, false, 0, expandParent);
            };
            return Power;
        }(eui.Component));
        mod.Power = Power;
        __reflect(Power.prototype, "game.mod.Power");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 战力组件，带详情按钮
         */
        var Power2 = /** @class */ (function (_super) {
            __extends(Power2, _super);
            function Power2() {
                var _this = _super.call(this) || this;
                _this._powerR = 30; //战力group右对齐30
                _this._powerW = 326; //战力组件默认大小
                _this.skinName = "skins.common.PowerSkin2";
                return _this;
            }
            /** 战力赋值 */
            Power2.prototype.setPowerValue = function (value) {
                this.power.setPowerValue(value, true);
                var width = Math.max(this.power.group_power.x + this.power.group_power.width + this._powerR, this._powerW);
                this.power.width = width;
            };
            return Power2;
        }(eui.Component));
        mod.Power2 = Power2;
        __reflect(Power2.prototype, "game.mod.Power2");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 战力文本组件
         */
        var PowerLabel = /** @class */ (function (_super) {
            __extends(PowerLabel, _super);
            function PowerLabel() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * @param power 战力
             * @param color 文本颜色
             * @param size 文本大小
             */
            PowerLabel.prototype.setPowerValue = function (power, color, size) {
                if (power instanceof Long) {
                    power = power.toNumber();
                }
                this.lab_power.text = game.StringUtil.getHurtNumStr(power);
                if (color) {
                    this.lab_power.textColor = color;
                }
                if (size) {
                    this.lab_power.size = size;
                }
            };
            PowerLabel.prototype.setIcon = function (src) {
                this.img_icon.source = src;
            };
            return PowerLabel;
        }(eui.Component));
        mod.PowerLabel = PowerLabel;
        __reflect(PowerLabel.prototype, "game.mod.PowerLabel");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**推荐战力 */
        var RecommendPower = /** @class */ (function (_super) {
            __extends(RecommendPower, _super);
            function RecommendPower() {
                var _this = _super.call(this) || this;
                _this.touchEnabled = false;
                _this.touchChildren = false;
                _this.skinName = "skins.common.RecommendPowerSkin";
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            RecommendPower.prototype.onAddToStage = function () {
                this._hub = new game.UIEftHub(this);
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            };
            RecommendPower.prototype.onRemoveFromStage = function () {
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this._hub.clearFont(this.grp_font, true);
            };
            /**
             * 设置推荐战力
             * @param value 战力值
             */
            RecommendPower.prototype.setPowerValue = function (value) {
                var powerValue = value ? value.toString() : "0";
                this._hub.addBmpFont(powerValue, game.BmpTextCfg[100 /* CommonPower */], this.grp_font, true, 1, false, 0, true);
            };
            return RecommendPower;
        }(eui.Component));
        mod.RecommendPower = RecommendPower;
        __reflect(RecommendPower.prototype, "game.mod.RecommendPower");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**战队军团仙力组件*/
        var TeamGodPower = /** @class */ (function (_super) {
            __extends(TeamGodPower, _super);
            function TeamGodPower() {
                var _this = _super.call(this) || this;
                _this.touchEnabled = false;
                _this.touchChildren = false;
                _this.skinName = "skins.common.TeamGodPower";
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            TeamGodPower.prototype.onAddToStage = function () {
                this._hub = new game.UIEftHub(this);
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            };
            TeamGodPower.prototype.onRemoveFromStage = function () {
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this._hub.clearFont(this.gr_power, true);
            };
            /**
             * 设置军团仙力等
             * @param value
             */
            TeamGodPower.prototype.setPowerValue = function (value) {
                var powerValue = value ? value.toString() : "0";
                this._hub.addBmpFont(powerValue, game.BmpTextCfg[201 /* CommonPower2 */], this.gr_power, true, 1, false, 0, true);
            };
            return TeamGodPower;
        }(eui.Component));
        mod.TeamGodPower = TeamGodPower;
        __reflect(TeamGodPower.prototype, "game.mod.TeamGodPower");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**仙力战力组件*/
        var XianLiPower = /** @class */ (function (_super) {
            __extends(XianLiPower, _super);
            function XianLiPower() {
                var _this = _super.call(this) || this;
                _this.touchEnabled = false;
                _this.touchChildren = false;
                _this.skinName = "skins.common.XianLiPowerSkin";
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            XianLiPower.prototype.onAddToStage = function () {
                this._hub = new game.UIEftHub(this);
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            };
            XianLiPower.prototype.onRemoveFromStage = function () {
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this._hub.clearFont(this.gr_power, true);
            };
            /**
             * 设置仙力等
             * @param value 战力值
             * @param prefixStr 数值前面文本，默认：当前仙力:
             * @param gap 间距，默认-2
             */
            XianLiPower.prototype.setPowerValue = function (value, prefixStr, gap) {
                if (prefixStr === void 0) { prefixStr = '当前仙力:'; }
                if (gap === void 0) { gap = -2; }
                var powerValue = value ? value.toString() : "0";
                this._hub.addBmpFont(prefixStr + powerValue, game.BmpTextCfg[201 /* CommonPower2 */], this.gr_power, true, 1, false, gap, true);
            };
            return XianLiPower;
        }(eui.Component));
        mod.XianLiPower = XianLiPower;
        __reflect(XianLiPower.prototype, "game.mod.XianLiPower");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ArrayCollection = eui.ArrayCollection;
        var BasePreviewRewardItem = /** @class */ (function (_super) {
            __extends(BasePreviewRewardItem, _super);
            function BasePreviewRewardItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BasePreviewRewardItem.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this._rewardList = new ArrayCollection();
                this.list_reward.itemRenderer = mod.Icon;
                this.list_reward.dataProvider = this._rewardList;
                // this.list_reward.useVirtualLayout = false;
            };
            BasePreviewRewardItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                this.onUpdateType();
                this.onUpdateDesc();
                this.onUpdateReward();
            };
            BasePreviewRewardItem.prototype.onUpdateType = function () {
                if (this.data.nameStr) {
                    this.img_type.visible = true;
                    this.img_type.source = this.data.nameStr;
                }
                else {
                    this.img_type.visible = false;
                }
            };
            BasePreviewRewardItem.prototype.onUpdateDesc = function () {
                var data = this.data;
                if (data.descStr) {
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(data.descStr);
                    this.lab_desc.x = this.img_type.x;
                }
                else {
                    this.lab_desc.x = 140;
                    var weight = data.weight || 0;
                    var lan = game.getLanById("gailv_tips" /* gailv_tips */);
                    var str = game.TextUtil.addColor(weight / 100 + "%", 2330156 /* GREEN */);
                    this.lab_desc.textFlow = game.TextUtil.parseHtml("(" + lan + ":" + str + ")");
                }
            };
            BasePreviewRewardItem.prototype.onUpdateReward = function () {
                this._rewardList.replaceAll(this.data.award.concat());
            };
            return BasePreviewRewardItem;
        }(mod.BaseRenderer));
        mod.BasePreviewRewardItem = BasePreviewRewardItem;
        __reflect(BasePreviewRewardItem.prototype, "game.mod.BasePreviewRewardItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var BasePreviewRewardView = /** @class */ (function (_super) {
            __extends(BasePreviewRewardView, _super);
            function BasePreviewRewardView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.activity.RoleRingRewardSkin";
                return _this;
            }
            return BasePreviewRewardView;
        }(eui.Component));
        mod.BasePreviewRewardView = BasePreviewRewardView;
        __reflect(BasePreviewRewardView.prototype, "game.mod.BasePreviewRewardView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ComProgressItem = /** @class */ (function (_super) {
            __extends(ComProgressItem, _super);
            function ComProgressItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ComProgressItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                if (!this.data.val) {
                    this.progress.show(0, this.data.target, false, 0, false, 2 /* NoValue */);
                }
                else {
                    var val = this.data.val - this.data.start;
                    val = val < 0 ? 0 : val;
                    var target = this.data.target - this.data.start;
                    this.progress.show(val, target, false, 0, false, 2 /* NoValue */);
                }
            };
            return ComProgressItem;
        }(mod.BaseRenderer));
        mod.ComProgressItem = ComProgressItem;
        __reflect(ComProgressItem.prototype, "game.mod.ComProgressItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var Pool = base.Pool;
        var TabMdr = /** @class */ (function () {
            function TabMdr(m, p, list) {
                this._selectIndex = -1;
                this._owner = m;
                this._parent = p;
                this._mdrClsList = list;
                if (list) {
                    this._mdrInstList = new Array(list.length);
                }
            }
            Object.defineProperty(TabMdr.prototype, "mdrClsList", {
                get: function () {
                    return this._mdrClsList;
                },
                set: function (value) {
                    if (!this._mdrInstList) {
                        this._mdrClsList = value;
                        this._mdrInstList = new Array(value.length);
                        return;
                    }
                    //this.hideCurMdr();//设置mdr列表的时候，不清除当前选中的分页，防止中途开启新分页时候，刷新显示异常
                    var i, n, m;
                    for (i = 0, n = value.length; i < n; i++) {
                        m = i < this._mdrInstList.length ? this._mdrInstList[i] : null;
                        if (m && m.constructor !== value[i]) {
                            this._mdrInstList[i] = null;
                            m.dispose();
                        }
                    }
                    for (i = value.length, n = this._mdrInstList.length; i < n; i++) {
                        m = this._mdrInstList[i];
                        if (m) {
                            this._mdrInstList[i] = null;
                            m.dispose();
                        }
                    }
                    this._mdrClsList = value;
                    this._mdrInstList.length = value.length;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabMdr.prototype, "btnList", {
                get: function () {
                    return this._btnList;
                },
                set: function (value) {
                    this._btnList = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabMdr.prototype, "selectIndex", {
                get: function () {
                    return this._selectIndex;
                },
                set: function (value) {
                    var self = this;
                    // if (value == self._selectIndex) { //2级wnd使用 透传
                    //     return;
                    // }
                    if (self.condCheck && !self.condCheck.exec(value)) {
                        return;
                    }
                    if (!self._mdrClsList || self._mdrClsList.length == 0) {
                        return;
                    }
                    self.hideCurMdr();
                    self._selectIndex = value;
                    self._btnList.selectedIndex = value;
                    var mdr = self._mdrInstList[value];
                    if (!mdr) {
                        var t = self._mdrClsList[value];
                        if (null == t) {
                            return;
                        }
                        self._mdrInstList[value] = mdr = new t(self._parent);
                        mdr.$setOwner(self._owner);
                    }
                    mdr.show(self.params);
                    if (self.changeHandler) {
                        self.changeHandler.exec();
                    }
                    var group = self._parent["moveArea"];
                    if (group) {
                        self._parent.setChildIndex(group, self._parent.numChildren - 1);
                    }
                },
                enumerable: true,
                configurable: true
            });
            TabMdr.prototype.show = function () {
                var self = this;
                if (self._btnList) {
                    self._btnList.addEventListener(Event.CHANGE, self.onBtnSelected, self);
                    self._btnList.addEventListener(Event.CHANGING, self.onBtnChanging, self);
                }
            };
            TabMdr.prototype.hide = function () {
                var self = this;
                self.hideCurMdr();
                if (self._btnList) {
                    self._btnList.removeEventListener(Event.CHANGE, self.onBtnSelected, self);
                    self._btnList.removeEventListener(Event.CHANGING, self.onBtnChanging, self);
                }
            };
            TabMdr.prototype.hideCurMdr = function () {
                var self = this;
                if (self._selectIndex != -1 && self._mdrInstList[self._selectIndex]) {
                    self._mdrInstList[self._selectIndex].hide();
                }
                self._selectIndex = -1;
            };
            TabMdr.prototype.onBtnSelected = function (e) {
                //跳转时候params不为空，切换tab时应该把params清空
                this.params = undefined;
                this.selectIndex = this._btnList.selectedIndex;
            };
            TabMdr.prototype.onBtnChanging = function (e) {
                var res = true;
                if (this.condCheck) {
                    res = this.condCheck.exec(this._btnList.selectedIndex);
                }
                if (!res) {
                    e.preventDefault();
                }
            };
            TabMdr.prototype.dispose = function () {
                var self = this;
                self.hide();
                Pool.release(self.condCheck);
                self.condCheck = undefined;
                Pool.release(self.changeHandler);
                self.changeHandler = undefined;
                self._owner = undefined;
                self._parent = undefined;
                self._mdrClsList = undefined;
                if (self._mdrInstList) {
                    for (var _i = 0, _a = self._mdrInstList; _i < _a.length; _i++) {
                        var m = _a[_i];
                        if (m) {
                            m.dispose();
                        }
                    }
                }
                self._mdrInstList = undefined;
                self._btnList = undefined;
                self.params = undefined;
            };
            return TabMdr;
        }());
        mod.TabMdr = TabMdr;
        __reflect(TabMdr.prototype, "game.mod.TabMdr", ["game.MdrTab", "base.DisposeObject"]);
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ProgressBarCntComp = /** @class */ (function (_super) {
            __extends(ProgressBarCntComp, _super);
            function ProgressBarCntComp() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.ComProgressBarCntSkin";
                return _this;
            }
            /**
             * @param cnt
             * @param light 是否点亮，默认灰色
             */
            ProgressBarCntComp.prototype.updateShow = function (cnt, light) {
                if (light === void 0) { light = false; }
                this.lb_cnt.text = cnt + '';
                this.setLight(light);
            };
            ProgressBarCntComp.prototype.setLight = function (light) {
                if (light === void 0) { light = false; }
                this.img_bg.source = light ? "xiaokuang_huangse" : "xiaokuang_huise";
            };
            return ProgressBarCntComp;
        }(eui.Component));
        mod.ProgressBarCntComp = ProgressBarCntComp;
        __reflect(ProgressBarCntComp.prototype, "game.mod.ProgressBarCntComp");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ProgressBarCntComp2 = /** @class */ (function (_super) {
            __extends(ProgressBarCntComp2, _super);
            function ProgressBarCntComp2() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.ComProgressBarCntSkin2";
                return _this;
            }
            /**
             * @param cnt 当前进度值，与maxCnt判断展示次数点亮状态
             * @param minCnt 进度条最小值
             * @param maxCnt 进度条最大值
             */
            ProgressBarCntComp2.prototype.updateShow = function (cnt, minCnt, maxCnt) {
                this.barCnt.updateShow(maxCnt, cnt >= maxCnt);
                if (cnt < minCnt) {
                    cnt = 0;
                }
                else if (cnt >= maxCnt) {
                    cnt = maxCnt;
                }
                this.bar.show(cnt, maxCnt, false, 0, false, 2 /* NoValue */);
            };
            return ProgressBarCntComp2;
        }(eui.Component));
        mod.ProgressBarCntComp2 = ProgressBarCntComp2;
        __reflect(ProgressBarCntComp2.prototype, "game.mod.ProgressBarCntComp2");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 此组件含有scroller，若其祖先节点中也有scroller，则其祖先节点的scroller需要设置 ["$hasScissor"] = true;
         */
        var VProgressBar = /** @class */ (function (_super) {
            __extends(VProgressBar, _super);
            function VProgressBar() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._height = 49;
                return _this;
            }
            VProgressBar.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this._height = (this.height - 40) * 0.5; //除去中间圆40再平分
            };
            VProgressBar.prototype.dataChanged = function () {
                _super.prototype.dataChanged.call(this);
                var data = this.data;
                if (!data) {
                    return;
                }
                if (data.val <= data.start) {
                    this.scr.height = 0;
                    this.thumb.height = 0;
                    return;
                }
                var p = (data.val - data.start) / (data.target - data.start);
                if (p > 1) {
                    p = 1;
                }
                else if (p < 0) {
                    p = 0;
                }
                this.scr.height = this.height * p;
                var p2 = (data.val - data.target) / (data.next - data.target);
                if (p2 > 1) {
                    p2 = 1;
                }
                else if (p2 < 0) {
                    p2 = 0;
                }
                else if (data.val <= data.target) {
                    p2 = 0; //未到下半进度
                }
                this.thumb.height = this._height * p2;
            };
            VProgressBar.prototype.setData = function (data) {
                this.data = data;
            };
            return VProgressBar;
        }(mod.BaseRenderer));
        mod.VProgressBar = VProgressBar;
        __reflect(VProgressBar.prototype, "game.mod.VProgressBar");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 排行榜组件，公共结构
         */
        var RankCommonRender = /** @class */ (function (_super) {
            __extends(RankCommonRender, _super);
            function RankCommonRender() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.RankItemSkin";
                return _this;
            }
            RankCommonRender.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                var rankNo = data.rank;
                this.currentState = rankNo == 1 ? "first" : "default";
                if (rankNo <= 3) {
                    //前三名显示图标
                    this.img_rank.visible = true;
                    this.img_rank.source = 'rank' + rankNo;
                    this.lab_rank.text = "";
                }
                else {
                    this.img_rank.visible = false;
                    this.lab_rank.text = "" + rankNo;
                }
                this.lab_name.text = data.name;
                this.lab_power.text = data.powerStr;
                this.lab_num.text = data.hurtStr;
            };
            return RankCommonRender;
        }(eui.ItemRenderer));
        mod.RankCommonRender = RankCommonRender;
        __reflect(RankCommonRender.prototype, "game.mod.RankCommonRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TextEvent = egret.TextEvent;
        var Event = egret.Event;
        var facade = base.facade;
        /**
         * 榜首大神组件
         */
        var RankFirstItem = /** @class */ (function (_super) {
            __extends(RankFirstItem, _super);
            function RankFirstItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.RankFirstItemSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                return _this;
            }
            RankFirstItem.prototype.onAddToStage = function () {
                this.lab_more.addEventListener(TextEvent.LINK, this.onClickMore, this);
                this.lab_more.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(game.getLanById("cycle_tower3" /* cycle_tower3 */), 8585074 /* GREEN */, ""));
                facade.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
            };
            RankFirstItem.prototype.onRemove = function () {
                this.lab_more.removeEventListener(TextEvent.LINK, this.onClickMore, this);
                facade.offNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
            };
            RankFirstItem.prototype.onClickMore = function () {
                mod.ViewMgr.getIns().showRank(this._rankType);
            };
            /** 通用红点事件监听 */
            RankFirstItem.prototype.onHintUpdate = function (n) {
                var data = n.body;
                if (!this._rankType) {
                    return;
                }
                var hintType = mod.RankUtil.getHintTypes(this._rankType);
                if (data.node == mod.HintMgr.getType(hintType)) {
                    this.setHint(data.value);
                }
            };
            /** 更新红点 */
            RankFirstItem.prototype.updateHint = function () {
                var hintType = mod.RankUtil.getHintTypes(this._rankType);
                this.setHint(mod.HintMgr.getHint(hintType));
            };
            /** 设置红点 */
            RankFirstItem.prototype.setHint = function (val) {
                this.redPoint.visible = val;
            };
            /**
             * @param rankType 排行榜类型
             * @param nameStr 第一名玩家
             * @param cntStr 层数文本
             */
            RankFirstItem.prototype.updateShow = function (rankType, nameStr, cntStr) {
                this._rankType = rankType;
                var str = nameStr ? nameStr + "\n" + cntStr : game.getLanById("tishi_2" /* tishi_2 */);
                this.lab_rank.text = str;
                this.updateHint();
            };
            return RankFirstItem;
        }(eui.Component));
        mod.RankFirstItem = RankFirstItem;
        __reflect(RankFirstItem.prototype, "game.mod.RankFirstItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 排行榜组件
         */
        var RankGodRender = /** @class */ (function (_super) {
            __extends(RankGodRender, _super);
            function RankGodRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RankGodRender.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_check, this.onClickCheck, this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_get, this.onClickGet, this);
                this._itemList = new ArrayCollection();
                this.list_reward.itemRenderer = mod.Icon;
                this.list_reward.dataProvider = this._itemList;
            };
            RankGodRender.prototype.onClickCheck = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                var rankInfo = data.rankInfo;
                mod.ViewMgr.getIns().showRoleTips(rankInfo.role_id, rankInfo.server_id);
            };
            RankGodRender.prototype.onClickGet = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                var rankType = data.rankType;
                var cfg = data.cfg;
                mod.RankUtil.c2s_first_rank_award(rankType, cfg.index);
            };
            RankGodRender.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                var rankType = data.rankType;
                var cfg = data.cfg;
                var rankInfo = data.rankInfo;
                var status = data.status;
                var titleStr;
                var rankConfCfg = game.getConfigByNameId("rank_conf.json" /* RankConf */, rankType);
                if (rankConfCfg) {
                    titleStr = game.StringUtil.substitute(rankConfCfg.god_desc, [cfg.level]);
                }
                else {
                    titleStr = game.getLanById("rank_tips" + rankType) + cfg.level;
                }
                this.lab_title.text = titleStr;
                this.currentState = rankInfo ? "2" : "1";
                if (this.currentState == "2") {
                    //上榜玩家
                    this.head.updateHeadShow(rankInfo.head, rankInfo.head_frame, rankInfo.sex, rankInfo.role_id, rankInfo.server_id, rankInfo.is_robot);
                    this.lab_name.text = rankInfo.name;
                }
                this._itemList.source = cfg.award; //奖励
                var canDraw = status == 1 /* Finish */;
                var hasDraw = status == 3 /* Draw */;
                this.img_get.visible = hasDraw;
                this.btn_get.visible = !hasDraw;
                this.btn_get.redPoint.visible = canDraw;
                if (canDraw) {
                    this.btn_get.setYellow();
                }
                else {
                    this.btn_get.setDisabled();
                }
            };
            return RankGodRender;
        }(mod.BaseListenerRenderer));
        mod.RankGodRender = RankGodRender;
        __reflect(RankGodRender.prototype, "game.mod.RankGodRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var RankGodView = /** @class */ (function (_super) {
            __extends(RankGodView, _super);
            function RankGodView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.RankGodSkin";
                return _this;
            }
            return RankGodView;
        }(eui.Component));
        mod.RankGodView = RankGodView;
        __reflect(RankGodView.prototype, "game.mod.RankGodView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 排行榜组件
         */
        var RankRender = /** @class */ (function (_super) {
            __extends(RankRender, _super);
            function RankRender() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.RankItemSkin";
                return _this;
            }
            RankRender.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                var rankNo = data.rank_no;
                this.currentState = rankNo == 1 ? "first" : "default";
                if (rankNo <= 3) {
                    //前三名显示图标
                    this.img_rank.visible = true;
                    this.img_rank.source = 'rank' + rankNo;
                    this.lab_rank.text = "";
                }
                else {
                    this.img_rank.visible = false;
                    this.lab_rank.text = "" + rankNo;
                }
                this.lab_name.text = data.name;
                var power = data.showpower ? game.StringUtil.getHurtNumStr(data.showpower.toNumber()) : 0;
                this.lab_power.text = power + "";
                this.lab_num.text = data.count + "";
            };
            return RankRender;
        }(eui.ItemRenderer));
        mod.RankRender = RankRender;
        __reflect(RankRender.prototype, "game.mod.RankRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ArrayCollection = eui.ArrayCollection;
        var TextEvent = egret.TextEvent;
        /**
         * 带奖励的排行榜组件
         */
        var RankRewardRender = /** @class */ (function (_super) {
            __extends(RankRewardRender, _super);
            function RankRewardRender() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.RankItemSkin";
                return _this;
            }
            RankRewardRender.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this._rewardList = new ArrayCollection();
                this.list_reward.itemRenderer = mod.Icon;
                this.list_reward.dataProvider = this._rewardList;
                this.list_reward.visible = true;
                this.lab_num.text = "";
                this.lab_power.text = "";
                this.lab_look.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(game.getLanById("tongtiange_tips12" /* tongtiange_tips12 */), 3496307 /* DEFAULT */, ""));
                this.addEventListenerEx(TextEvent.LINK, this.lab_look, this.onClickRank, this);
            };
            RankRewardRender.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                var rankNo = data.rank;
                this.currentState = rankNo == 1 ? "first" : "default";
                if (rankNo <= 3) {
                    //前三名显示图标
                    this.img_rank.visible = true;
                    this.img_rank.source = 'rank' + rankNo;
                    this.lab_rank.text = "";
                }
                else {
                    this.img_rank.visible = false;
                    this.lab_rank.text = this.data.rankStr ? this.data.rankStr : "" + rankNo; //优先显示外部文本
                }
                this.lab_name.textFlow = game.TextUtil.parseHtml(data.name);
                // this.lab_power.text = data.hurtStr;
                this._rewardList.source = data.reward || [];
                //若没有奖励，hurtStr展示在右边；否则展示在中间
                if (data.reward && data.reward.length) {
                    this.lab_power.text = data.hurtStr;
                }
                else {
                    this.lab_num.text = data.hurtStr;
                }
                var lookHandler = data.lookHandler;
                this.lab_look.visible = !!lookHandler;
            };
            RankRewardRender.prototype.onClickRank = function () {
                if (this.data && this.data.lookHandler) {
                    this.data.lookHandler.exec();
                }
            };
            return RankRewardRender;
        }(mod.BaseListenerRenderer));
        mod.RankRewardRender = RankRewardRender;
        __reflect(RankRewardRender.prototype, "game.mod.RankRewardRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 排行榜组件
         */
        var RankSectionItem = /** @class */ (function (_super) {
            __extends(RankSectionItem, _super);
            function RankSectionItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RankSectionItem.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
            };
            RankSectionItem.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                this.lab_rank.text = "" + data.rank;
                this.lab_name.text = "" + data.name;
                this.lab_num.text = "" + data.value;
            };
            return RankSectionItem;
        }(mod.BaseRenderer));
        mod.RankSectionItem = RankSectionItem;
        __reflect(RankSectionItem.prototype, "game.mod.RankSectionItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var RankSectionView = /** @class */ (function (_super) {
            __extends(RankSectionView, _super);
            function RankSectionView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.RankSectionSkin";
                return _this;
            }
            return RankSectionView;
        }(eui.Component));
        mod.RankSectionView = RankSectionView;
        __reflect(RankSectionView.prototype, "game.mod.RankSectionView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var RankView = /** @class */ (function (_super) {
            __extends(RankView, _super);
            function RankView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.RankSkin";
                _this.scr['$hasScissor'] = true; //奖励list_rank加上scroller了，所以src需设定此
                return _this;
            }
            /**
             * 更新 img_type3 和 img_type2 的 horizontalCenter位置。
             * img_type3 不展示，则 img_type2 展示到 img_type3 的位置
             * @param isShowType3 是否展示 img_type3，默认展示true
             */
            RankView.prototype.updateImgTypeHorizontal = function (isShowType3) {
                if (isShowType3 === void 0) { isShowType3 = true; }
                if (isShowType3) {
                    this.img_type3.visible = true;
                    this.img_type2.horizontalCenter = 0;
                }
                else {
                    this.img_type3.visible = false;
                    this.img_type2.horizontalCenter = 205;
                }
            };
            return RankView;
        }(eui.Component));
        mod.RankView = RankView;
        __reflect(RankView.prototype, "game.mod.RankView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var ArrayCollection = eui.ArrayCollection;
        var ResultHurt = /** @class */ (function (_super) {
            __extends(ResultHurt, _super);
            function ResultHurt() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.result.ResultHurtSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                return _this;
            }
            ResultHurt.prototype.onAddToStage = function () {
                this.initHurtList();
            };
            ResultHurt.prototype.onRemove = function () {
            };
            ResultHurt.prototype.initHurtList = function () {
                if (!this._hurtList) {
                    this._hurtList = new ArrayCollection();
                }
                this.list_hurt.itemRenderer = mod.ResultWinRender;
                this.list_hurt.dataProvider = this._hurtList;
            };
            // 伤害统计列表
            ResultHurt.prototype.updateHurtList = function (hurtList) {
                this.initHurtList();
                if (!hurtList || !hurtList.length) {
                    hurtList = [];
                }
                var maxHurt; //最高伤害
                for (var _i = 0, hurtList_1 = hurtList; _i < hurtList_1.length; _i++) {
                    var i = hurtList_1[_i];
                    if (!maxHurt || maxHurt.damage.lt(i.damage)) {
                        maxHurt = i;
                    }
                }
                var infos = []; //神灵类型，伤害，是否MVP
                for (var _a = 0, ShenLingTypeAry_1 = game.ShenLingTypeAry; _a < ShenLingTypeAry_1.length; _a++) {
                    var type = ShenLingTypeAry_1[_a];
                    var hurt = void 0;
                    for (var _b = 0, hurtList_2 = hurtList; _b < hurtList_2.length; _b++) {
                        var i = hurtList_2[_b];
                        var index = i.index;
                        var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, index.toNumber());
                        if (cfg.type == type) {
                            hurt = i;
                            break;
                        }
                    }
                    var info = { type: type, hurt: hurt, maxHurt: maxHurt };
                    infos.push(info);
                }
                this._hurtList.source = infos;
            };
            return ResultHurt;
        }(eui.Component));
        mod.ResultHurt = ResultHurt;
        __reflect(ResultHurt.prototype, "game.mod.ResultHurt");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ResultWinRender = /** @class */ (function (_super) {
            __extends(ResultWinRender, _super);
            function ResultWinRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ResultWinRender.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                var type = this.data.type;
                var hurt = this.data.hurt;
                var maxHurt = this.data.maxHurt;
                var isMvp = !!(hurt && maxHurt && hurt.damage.eq(maxHurt.damage));
                this.img_shuxing.source = "shuxingtubiao_" + type;
                this.img_mvp.visible = isMvp;
                var index = hurt ? hurt.index.toNumber() : 0;
                if (!index) {
                    //服务端未下发伤害时，需要取神灵系统数据
                    var _proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var info = _proxy.getTypeInfo(type);
                    index = info ? info.upindex : 0;
                }
                var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, index);
                this.img_icon.source = cfg ? cfg.icon : 'icon_jia';
                this.lab_act.visible = !index;
                this.progress.visible = this.labelDisplay.visible = !!index;
                if (!!index) {
                    var curVal = hurt && hurt.damage ? hurt.damage.toNumber() : 0;
                    var maxVal = maxHurt && maxHurt.damage ? maxHurt.damage.toNumber() : 0;
                    var tweenTime = curVal / maxVal * 1000;
                    this.progress.show(0, maxVal, false, 0, false, 2 /* NoValue */);
                    this.progress.show(curVal, maxVal, true, 0, false, 2 /* NoValue */, null, tweenTime);
                    this.labelDisplay.text = game.StringUtil.getHurtNumStr(curVal);
                }
            };
            return ResultWinRender;
        }(mod.BaseRenderer));
        mod.ResultWinRender = ResultWinRender;
        __reflect(ResultWinRender.prototype, "game.mod.ResultWinRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TimeMgr = base.TimeMgr;
        var Pool = base.Pool;
        var Tween = base.Tween;
        var TouchEvent = egret.TouchEvent;
        var ResultReward = /** @class */ (function (_super) {
            __extends(ResultReward, _super);
            function ResultReward() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.ITEM_N = 4; //item显示的水平数量
                _this.ITEM_H = 94; //item高度
                _this.SCR_W = 471; //滚动区域默认宽度，需要的话可以计算出来
                return _this;
            }
            ResultReward.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, game.Layer.modal, this.onClick, this);
            };
            ResultReward.prototype.onRemoveFromStage = function () {
                this._endHandler = null;
                for (var _i = 0, _a = this._iconList; _i < _a.length; _i++) {
                    var icon = _a[_i];
                    Pool.release(icon);
                    if (icon.parent) {
                        icon.parent.removeChild(icon);
                    }
                }
                TimeMgr.removeUpdateItem(this);
                Tween.remove(this.scr.viewport);
                _super.prototype.onRemoveFromStage.call(this);
            };
            ResultReward.prototype.onClick = function () {
                this.endRewardTween();
                //点击后移除监听
                game.Layer.modal.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            };
            // private initRewardList(): void {
            //     if(!this._rewardList){
            //         this._rewardList = new ArrayCollection();
            //     }
            //     this.list_reward.itemRenderer = Icon;
            //     this.list_reward.dataProvider = this._rewardList;
            // }
            ResultReward.prototype.update = function (time) {
                this.updateRewardTween();
            };
            ResultReward.prototype.updateRewardTween = function () {
                if (!this._rewards || !this._rewards.length) {
                    this.onRewardTweenEnd();
                    return;
                }
                this._showing = true;
                var reward = this._rewards.shift();
                this.setRewardShow([reward]);
            };
            ResultReward.prototype.setRewardShow = function (rewards) {
                // let oldRewards = this._rewardList.source.concat();
                // oldRewards = oldRewards.concat(rewards);
                // this._rewardList.replaceAll(oldRewards);
                // let allNum = oldRewards.length;
                for (var _i = 0, rewards_1 = rewards; _i < rewards_1.length; _i++) {
                    var prop = rewards_1[_i];
                    var icon = Pool.alloc(mod.Icon);
                    icon.setData(prop);
                    this.grp_reward.addChild(icon);
                    this._iconList.push(icon);
                    this.addEftByParent("daojushanguang" /* PropEffect */, icon, icon.width / 2, icon.height / 2, -1, null, 1);
                }
                this._showRewards = this._showRewards.concat(rewards);
                var allNum = this._showRewards.length;
                var viewport = this.scr.viewport;
                var layout = viewport.layout;
                var gap = layout.verticalGap;
                var showRowCount = Math.floor(this.scr.height / (this.ITEM_H + gap)); //最多完整显示多少行
                var showNum = this.ITEM_N * showRowCount; //显示多少个,一列就是4,2列就是8
                if (allNum > showNum) {
                    var rowCount = Math.ceil(allNum / this.ITEM_N); //行数
                    var listHeight = rowCount * this.ITEM_H + (rowCount - 1) * gap + layout.paddingTop + layout.paddingBottom; //加上paddingTop
                    var tarScrollV = listHeight - this.scr.height;
                    Tween.remove(viewport);
                    Tween.get(viewport).to({ scrollV: tarScrollV }, 200);
                }
            };
            //结束动画后执行
            ResultReward.prototype.onRewardTweenEnd = function () {
                this._showing = false;
                TimeMgr.removeUpdateItem(this);
                if (this._endHandler) {
                    this._endHandler.exec();
                }
            };
            //设置滚动区域宽度，用于奖励居中
            ResultReward.prototype.updateScr = function () {
                var viewport = this.scr.viewport;
                var layout = viewport.layout;
                var gap = layout.horizontalGap; //水平间距21
                var rewardCnt = this._rewards.length;
                var columnCount = this.ITEM_N; //默认显示4列
                if (rewardCnt < this.ITEM_N) {
                    //奖励小于4时，做居中处理
                    columnCount = rewardCnt; //设置列数
                }
                layout.requestedColumnCount = columnCount;
                //计算滚动区域宽度
                var width = layout.paddingLeft + layout.paddingRight + this.ITEM_H * columnCount + (columnCount - 1) * gap;
                this.scr.width = width;
            };
            //初始化滚动区域宽度，防止奖励居中后没有重置
            ResultReward.prototype.initScr = function () {
                if (this.scr.width != this.SCR_W) {
                    this.scr.width = this.SCR_W;
                    var viewport = this.scr.viewport;
                    var layout = viewport.layout;
                    layout.requestedColumnCount = this.ITEM_N; //默认显示4列
                }
            };
            //设置奖励最大行数，这个改变的是ResultReward的高度
            ResultReward.prototype.setMaxRowCount = function (maxRowCount) {
                var rewardCnt = this._rewards.length;
                var rowCount = Math.ceil(rewardCnt / this.ITEM_N); //计算奖励行数
                rowCount = Math.min(rowCount, maxRowCount); //行数限制
                var viewport = this.scr.viewport;
                var layout = viewport.layout;
                var gap = layout.verticalGap; //垂直间距6
                var height = layout.paddingTop + layout.paddingBottom + this.ITEM_H * rowCount + (rowCount - 1) * gap;
                this.height = height;
            };
            //主动结束动画
            ResultReward.prototype.endRewardTween = function () {
                if (!this._showing) {
                    return false;
                }
                var rewards = this._rewards.concat();
                this.setRewardShow(rewards);
                this._rewards = [];
                return true;
            };
            // 奖励列表
            // endHandler：结束动画后的回调
            // isCenter：奖励小于4时是否居中
            // maxRowCount: 最多显示X行奖励
            ResultReward.prototype.updateRewardList = function (rewardList, endHandler, isCenter, maxRowCount) {
                //this.initRewardList();
                this._rewards = mod.BagUtil.changeRewards(rewardList);
                this._showRewards = [];
                this._iconList = [];
                this.scr.viewport.scrollV = 0;
                if (isCenter) {
                    this.updateScr();
                }
                else {
                    this.initScr();
                }
                if (maxRowCount) {
                    this.setMaxRowCount(maxRowCount);
                }
                this.updateRewardTween();
                TimeMgr.addUpdateItem(this, 100);
                if (endHandler) {
                    this._endHandler = endHandler;
                }
            };
            return ResultReward;
        }(mod.BaseRenderer));
        mod.ResultReward = ResultReward;
        __reflect(ResultReward.prototype, "game.mod.ResultReward", ["base.UpdateItem"]);
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var BaseGiftDrawView = /** @class */ (function (_super) {
            __extends(BaseGiftDrawView, _super);
            function BaseGiftDrawView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseGiftDrawViewSkin";
                return _this;
            }
            return BaseGiftDrawView;
        }(eui.Component));
        mod.BaseGiftDrawView = BaseGiftDrawView;
        __reflect(BaseGiftDrawView.prototype, "game.mod.BaseGiftDrawView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 通用的奖励领取项
         * 弹窗类使用：skins.common.BaseGiftItemSkin
         * 一级界面使用：skins.common.BaseGiftItemSkin2
         * (todo width不一致，看下能不能统一起来)
         */
        var BaseGiftItemRender = /** @class */ (function (_super) {
            __extends(BaseGiftItemRender, _super);
            function BaseGiftItemRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BaseGiftItemRender.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.list.itemRenderer = mod.Icon;
                this.list.dataProvider = this._listData = new eui.ArrayCollection();
                this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
            };
            BaseGiftItemRender.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
            };
            BaseGiftItemRender.prototype.dataChanged = function () {
            };
            /**点击购买*/
            BaseGiftItemRender.prototype.onClick = function () {
            };
            return BaseGiftItemRender;
        }(mod.BaseListenerRenderer));
        mod.BaseGiftItemRender = BaseGiftItemRender;
        __reflect(BaseGiftItemRender.prototype, "game.mod.BaseGiftItemRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 通用的礼包界面，有倒计时、大奖
         */
        var BaseGiftView = /** @class */ (function (_super) {
            __extends(BaseGiftView, _super);
            function BaseGiftView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseGiftViewSkin";
                return _this;
            }
            /**
             * 更新顶部的banner资源
             * @param imgStr 资源名称
             * @param isJpg 是否为jpg，默认false
             */
            BaseGiftView.prototype.updateBanner = function (imgStr, isJpg) {
                if (isJpg === void 0) { isJpg = false; }
                this.img_banner.source = isJpg ? game.ResUtil.getUiJpg(imgStr) : game.ResUtil.getUiPng(imgStr);
            };
            /**更新顶部大奖数据*/
            BaseGiftView.prototype.updateBigReward = function (data) {
                if (!data) {
                    this.iconBigReward.visible = false;
                    return;
                }
                this.iconBigReward.visible = true;
                this.iconBigReward.data = data;
            };
            return BaseGiftView;
        }(eui.Component));
        mod.BaseGiftView = BaseGiftView;
        __reflect(BaseGiftView.prototype, "game.mod.BaseGiftView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var BaseRewardView = /** @class */ (function (_super) {
            __extends(BaseRewardView, _super);
            function BaseRewardView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseRewardSkin";
                return _this;
            }
            return BaseRewardView;
        }(eui.Component));
        mod.BaseRewardView = BaseRewardView;
        __reflect(BaseRewardView.prototype, "game.mod.BaseRewardView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        /**
         * 修仙女仆的自动挑战勾选框
         */
        var XiuxianNvpuCheckBox = /** @class */ (function (_super) {
            __extends(XiuxianNvpuCheckBox, _super);
            function XiuxianNvpuCheckBox() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.CheckSkin1";
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            XiuxianNvpuCheckBox.prototype.onAddToStage = function () {
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                facade.onNt("on_open_func_update" /* ON_OPEN_FUNC_UPDATE */, this.onOpenFuncUpdate, this);
                this.label = '自动挑战';
            };
            XiuxianNvpuCheckBox.prototype.onRemoveFromStage = function () {
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                facade.offNt("on_open_func_update" /* ON_OPEN_FUNC_UPDATE */, this.onOpenFuncUpdate, this);
            };
            /**
             * 更新展示
             * @param eventType
             */
            XiuxianNvpuCheckBox.prototype.updateShow = function (eventType) {
                this._eventType = eventType;
                var isOpen = mod.ViewMgr.getIns().checkViewOpen(1041670240 /* XiuxianNvpu */);
                this.visible = isOpen;
                if (!isOpen) {
                    return;
                }
                this.selected = mod.RoleUtil.isNvpuOnlineSelected(eventType);
            };
            XiuxianNvpuCheckBox.prototype.onClick = function () {
                if (!mod.RoleUtil.isNvpuAct(false, true)) {
                    this.selected = false;
                    return;
                }
                mod.RoleUtil.setNvpuOnlineSetting(1 /* ManyBoss */, this.selected);
            };
            XiuxianNvpuCheckBox.prototype.onOpenFuncUpdate = function (n) {
                var idxs = n.body;
                if (this._eventType && idxs.indexOf(1041670240 /* XiuxianNvpu */) > -1) {
                    this.updateShow(this._eventType);
                }
            };
            return XiuxianNvpuCheckBox;
        }(eui.CheckBox));
        mod.XiuxianNvpuCheckBox = XiuxianNvpuCheckBox;
        __reflect(XiuxianNvpuCheckBox.prototype, "game.mod.XiuxianNvpuCheckBox");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var BaseRuleDescView = /** @class */ (function (_super) {
            __extends(BaseRuleDescView, _super);
            function BaseRuleDescView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseRuleDescSkin";
                return _this;
            }
            return BaseRuleDescView;
        }(eui.Component));
        mod.BaseRuleDescView = BaseRuleDescView;
        __reflect(BaseRuleDescView.prototype, "game.mod.BaseRuleDescView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var EnemyInfoView = /** @class */ (function (_super) {
            __extends(EnemyInfoView, _super);
            function EnemyInfoView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.EnemyInfoSkin";
                return _this;
            }
            /**
             * 更新信息
             * @param info
             */
            EnemyInfoView.prototype.updateShow = function (info) {
                if (info) {
                    this.lab_name.text = '昵称：' + info.name;
                    var power = info.showpower && info.showpower.toNumber() || 0;
                    this.lab_power.text = '战力：' + game.StringUtil.getPowerNumStr(power);
                    this.lab_guild.text = '仙宗：' + (info.guild_name || '无');
                }
                else {
                    this.updateShowDefault();
                }
            };
            /**
             * 更新信息
             * @param vo
             */
            EnemyInfoView.prototype.updateShowByObj = function (vo) {
                if (!vo) {
                    this.updateShowDefault();
                    return;
                }
                this.lab_name.text = '昵称：' + vo.name;
                var power = vo.showpower && vo.showpower.toNumber() || 0;
                this.lab_power.text = '战力：' + game.StringUtil.getPowerNumStr(power);
                this.lab_guild.text = '仙宗：' + vo.guild_name;
            };
            /**
             * 默认展示
             * 昵称：无
             * 战力：0
             * 仙宗：无
             */
            EnemyInfoView.prototype.updateShowDefault = function () {
                this.lab_name.text = '昵称：无';
                this.lab_power.text = '战力：0';
                this.lab_guild.text = '仙宗：无';
            };
            return EnemyInfoView;
        }(eui.Component));
        mod.EnemyInfoView = EnemyInfoView;
        __reflect(EnemyInfoView.prototype, "game.mod.EnemyInfoView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 积分奖励
         */
        var KuafuDoufaScoreView = /** @class */ (function (_super) {
            __extends(KuafuDoufaScoreView, _super);
            function KuafuDoufaScoreView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.compete.KuafuDoufaScoreSkin";
                return _this;
            }
            return KuafuDoufaScoreView;
        }(eui.Component));
        mod.KuafuDoufaScoreView = KuafuDoufaScoreView;
        __reflect(KuafuDoufaScoreView.prototype, "game.mod.KuafuDoufaScoreView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 战场技能列表
         */
        var KuafuDoufaSkillView = /** @class */ (function (_super) {
            __extends(KuafuDoufaSkillView, _super);
            function KuafuDoufaSkillView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.compete.KuafuDoufaSkillSkin";
                return _this;
            }
            return KuafuDoufaSkillView;
        }(eui.Component));
        mod.KuafuDoufaSkillView = KuafuDoufaSkillView;
        __reflect(KuafuDoufaSkillView.prototype, "game.mod.KuafuDoufaSkillView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 角色复活界面
         * 战场技能
         */
        var RoleBuffReviveView = /** @class */ (function (_super) {
            __extends(RoleBuffReviveView, _super);
            function RoleBuffReviveView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.RoleBuffReviveSkin";
                _this.lab_revive.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt("立即复活", 8585074 /* GREEN */, ""));
                return _this;
            }
            /**
             * 更新复活倒计时
             * @param leftTime 剩余时间
             * @param sufStr 时间末尾文本，默认：秒后复活
             */
            RoleBuffReviveView.prototype.updateShow = function (leftTime, sufStr) {
                if (sufStr === void 0) { sufStr = '秒后复活'; }
                this.lab_reviveTime.text = leftTime + sufStr;
            };
            return RoleBuffReviveView;
        }(eui.Component));
        mod.RoleBuffReviveView = RoleBuffReviveView;
        __reflect(RoleBuffReviveView.prototype, "game.mod.RoleBuffReviveView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var YouliKillerFightView = /** @class */ (function (_super) {
            __extends(YouliKillerFightView, _super);
            function YouliKillerFightView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.compete.YouliKillerFightSkin";
                return _this;
            }
            return YouliKillerFightView;
        }(eui.Component));
        mod.YouliKillerFightView = YouliKillerFightView;
        __reflect(YouliKillerFightView.prototype, "game.mod.YouliKillerFightView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ShenLingSkillIcon = /** @class */ (function (_super) {
            __extends(ShenLingSkillIcon, _super);
            function ShenLingSkillIcon() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.shenling.ShenLingSkillIcon";
                return _this;
            }
            ShenLingSkillIcon.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    this.defaultIcon();
                    return;
                }
                this.img_gray.visible = !data.is_act;
                this.setHint(!!data.hint);
                var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, data.skill_index);
                if (!cfg) {
                    this.defaultIcon();
                    return;
                }
                this.setIcon(cfg.icon);
                this.img_bg.source = 'tianfukuang';
                if (!data.skill_type || data.skill_type == 2 /* LingBao */ || data.skill_type == 4 /* Talent */) {
                    this.gr_lb.visible = false;
                    return;
                }
                if (data.skill_type == 1 /* HeJi */) {
                    this.setLabel(data.lv ? data.lv + '' : '');
                }
                else if (data.skill_type == 3 /* PuGong */) {
                    this.gr_lb.visible = this.img_ji.visible = true;
                    this.lb_num.text = '';
                    this.img_bg.source = 'jinengkuang';
                }
            };
            ShenLingSkillIcon.prototype.defaultIcon = function () {
                this.img_gray.visible = true;
                this.gr_lb.visible = false;
                this.setIcon();
                this.setHint(false);
            };
            ShenLingSkillIcon.prototype.setIcon = function (src) {
                if (src === void 0) { src = ''; }
                this.img_icon.source = src;
            };
            ShenLingSkillIcon.prototype.setLabel = function (str) {
                if (str === void 0) { str = ''; }
                this.gr_lb.visible = !!str;
                this.lb_num.textFlow = game.TextUtil.parseHtml(str);
                this.img_ji.visible = false;
            };
            ShenLingSkillIcon.prototype.setHint = function (hint) {
                if (hint === void 0) { hint = false; }
                this.redPoint.visible = hint;
            };
            /**改变技能底框*/
            ShenLingSkillIcon.prototype.setBg = function (src) {
                if (src === void 0) { src = 'tianfukuang'; }
                this.img_bg.source = src;
            };
            return ShenLingSkillIcon;
        }(mod.BaseListenerRenderer));
        mod.ShenLingSkillIcon = ShenLingSkillIcon;
        __reflect(ShenLingSkillIcon.prototype, "game.mod.ShenLingSkillIcon");
        /**拥有点击缩放效果的技能icon*/
        var ShenLingSkillIconTap = /** @class */ (function (_super) {
            __extends(ShenLingSkillIconTap, _super);
            function ShenLingSkillIconTap() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ShenLingSkillIconTap.prototype.dataChanged = function () {
                this.skill_icon.data = this.data;
            };
            return ShenLingSkillIconTap;
        }(mod.BaseListenerRenderer));
        mod.ShenLingSkillIconTap = ShenLingSkillIconTap;
        __reflect(ShenLingSkillIconTap.prototype, "game.mod.ShenLingSkillIconTap");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**神灵类型按钮*/
        var ShenlingTypeBtn = /** @class */ (function (_super) {
            __extends(ShenlingTypeBtn, _super);
            function ShenlingTypeBtn() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.shenling.ShenLingShangZhenBtnSkin";
                return _this;
            }
            ShenlingTypeBtn.prototype.dataChanged = function () {
                var data = this.data;
                if (data == null) {
                    return;
                }
                this.img_icon.source = "shuxingtubiao_" + data;
            };
            return ShenlingTypeBtn;
        }(mod.BaseListenerRenderer));
        mod.ShenlingTypeBtn = ShenlingTypeBtn;
        __reflect(ShenlingTypeBtn.prototype, "game.mod.ShenlingTypeBtn");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 神灵属性按钮基类
         * ShenLingTypeIconBaseSkin
         * ShenLingTypeIconBaseUpSkin
         */
        var ShenlingTypeIconBase = /** @class */ (function (_super) {
            __extends(ShenlingTypeIconBase, _super);
            function ShenlingTypeIconBase() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ShenlingTypeIconBase.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                this.img_icon.source = "sl_type_" + data.type;
                this.redPoint.visible = !!data.showHint;
                this.img_di.source = 'tubiaokuang';
            };
            return ShenlingTypeIconBase;
        }(mod.BaseListenerRenderer));
        mod.ShenlingTypeIconBase = ShenlingTypeIconBase;
        __reflect(ShenlingTypeIconBase.prototype, "game.mod.ShenlingTypeIconBase");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var BattleSkillItemRender = /** @class */ (function (_super) {
            __extends(BattleSkillItemRender, _super);
            function BattleSkillItemRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BattleSkillItemRender.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                if (this.data.skillId) {
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, this.data.skillId);
                    this.img_icon.source = cfg.icon;
                }
                if (this.data.showHint != undefined) {
                    this.redPoint.visible = this.data.showHint;
                }
                if (this.data.lv != undefined && this.data.showLv != false) {
                    this.img_lock.visible = !this.data.lv;
                    this.grp_lv.visible = !!this.data.lv || !this.data.hideTips; //显示等级
                    this.lab_lv.text = this.data.lv ? this.data.lv + game.getLanById("tishi_43" /* tishi_43 */) : 1 + game.getLanById("tishi_43" /* tishi_43 */) + game.getLanById("boss_cue5" /* boss_cue5 */);
                }
                if (this.data.imgTag != undefined) {
                    this.img_tag.visible = true;
                    this.img_tag.source = this.data.imgTag;
                }
            };
            /**单个技能外部调用*/
            BattleSkillItemRender.prototype.setData = function (skillId, lv, showLv, showZero) {
                this.data = { skillId: skillId, lv: lv, showLv: showLv, showZero: showZero };
            };
            return BattleSkillItemRender;
        }(eui.ItemRenderer));
        mod.BattleSkillItemRender = BattleSkillItemRender;
        __reflect(BattleSkillItemRender.prototype, "game.mod.BattleSkillItemRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var SkillConditionTipsView = /** @class */ (function (_super) {
            __extends(SkillConditionTipsView, _super);
            function SkillConditionTipsView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.SkillConditionTipsSkin";
                return _this;
            }
            return SkillConditionTipsView;
        }(eui.Component));
        mod.SkillConditionTipsView = SkillConditionTipsView;
        __reflect(SkillConditionTipsView.prototype, "game.mod.SkillConditionTipsView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var SkillItemRender = /** @class */ (function (_super) {
            __extends(SkillItemRender, _super);
            function SkillItemRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SkillItemRender.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                this.grp_level.visible = false;
                if (this.data.skillId != undefined) {
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, this.data.skillId);
                    this.img_icon.source = cfg && cfg.icon || "";
                    // this.img_icon.source = cfg.icon;
                }
                if (this.data.showHint != undefined) {
                    this.redPoint.visible = this.data.showHint;
                }
                if (this.data.isAct != undefined) {
                    this.img_lock.visible = !this.data.isAct;
                    if (this.data.lockStr) {
                        this.img_lock.source = this.data.lockStr;
                    }
                    if (!this.data.isAct && this.data.limitStr) {
                        this.grp_level.visible = true;
                        this.lab_level.text = this.data.limitStr;
                    }
                }
                if (this.data.bgStr != undefined) {
                    this.img_bg.source = this.data.bgStr;
                }
                if (this.data.level) {
                    this.grp_level.visible = true;
                    this.lab_level.text = this.data.level + "\u9636";
                }
            };
            /**单个技能外部调用*/
            SkillItemRender.prototype.setData = function (skillId) {
                this.data = { skillId: skillId };
            };
            SkillItemRender.prototype.setIcon = function (icon) {
                this.img_icon.source = icon;
            };
            return SkillItemRender;
        }(eui.ItemRenderer));
        mod.SkillItemRender = SkillItemRender;
        __reflect(SkillItemRender.prototype, "game.mod.SkillItemRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var SkillNormalTipsView = /** @class */ (function (_super) {
            __extends(SkillNormalTipsView, _super);
            function SkillNormalTipsView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.SkillNormalTipsSkin";
                _this.horizontalCenter = 0;
                _this.verticalCenter = 0;
                return _this;
            }
            return SkillNormalTipsView;
        }(eui.Component));
        mod.SkillNormalTipsView = SkillNormalTipsView;
        __reflect(SkillNormalTipsView.prototype, "game.mod.SkillNormalTipsView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var SkillTipsView = /** @class */ (function (_super) {
            __extends(SkillTipsView, _super);
            function SkillTipsView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.SkillTipsSkin";
                return _this;
            }
            return SkillTipsView;
        }(eui.Component));
        mod.SkillTipsView = SkillTipsView;
        __reflect(SkillTipsView.prototype, "game.mod.SkillTipsView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var StarItemFuRender = /** @class */ (function (_super) {
            __extends(StarItemFuRender, _super);
            function StarItemFuRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            StarItemFuRender.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                var starStr = this.data.starStr;
                this.img_star.source = starStr;
                var width = this.data.width;
                if (width) {
                    this.img_star.width = width;
                }
            };
            return StarItemFuRender;
        }(eui.ItemRenderer));
        mod.StarItemFuRender = StarItemFuRender;
        __reflect(StarItemFuRender.prototype, "game.mod.StarItemFuRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var StarItemRender = /** @class */ (function (_super) {
            __extends(StarItemRender, _super);
            function StarItemRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            StarItemRender.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                this.img_star.source = this.data;
            };
            return StarItemRender;
        }(eui.ItemRenderer));
        mod.StarItemRender = StarItemRender;
        __reflect(StarItemRender.prototype, "game.mod.StarItemRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 通用星星列表组件，列表设置负间距时候用
         */
        var StarListFuView = /** @class */ (function (_super) {
            __extends(StarListFuView, _super);
            function StarListFuView() {
                var _this = _super.call(this) || this;
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            StarListFuView.prototype.onAddToStage = function () {
                this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
                this.initStarList();
            };
            StarListFuView.prototype.onRemove = function () {
            };
            StarListFuView.prototype.initStarList = function () {
                if (!this._starList) {
                    this._starList = new ArrayCollection();
                }
                this.list_star.itemRenderer = mod.StarItemFuRender;
                this.list_star.dataProvider = this._starList;
            };
            /**星星显示
             * @param star，当前星级
             * @param gap 间距
             * */
            StarListFuView.prototype.updateStar = function (star, gap) {
                if (!this._starList) {
                    this._starList = new ArrayCollection();
                }
                var infos = [];
                for (var i = 1; i <= star; ++i) {
                    infos.push({ starStr: "star_6", width: 24 });
                }
                this._starList.replaceAll(infos);
                if (gap != undefined) {
                    var layout = this.list_star.layout;
                    layout && (layout.gap = gap);
                }
            };
            return StarListFuView;
        }(eui.Component));
        mod.StarListFuView = StarListFuView;
        __reflect(StarListFuView.prototype, "game.mod.StarListFuView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 通用星星列表组件
         */
        var StarListView = /** @class */ (function (_super) {
            __extends(StarListView, _super);
            function StarListView() {
                var _this = _super.call(this) || this;
                //不设置皮肤，支持复用
                _this.skinName = "skins.common.StarListSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            StarListView.prototype.onAddToStage = function () {
                this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
                this.initStarList();
            };
            StarListView.prototype.onRemove = function () {
            };
            StarListView.prototype.initStarList = function () {
                if (!this._starList) {
                    this._starList = new ArrayCollection();
                }
                this.list_star.itemRenderer = mod.StarItemRender;
                this.list_star.dataProvider = this._starList;
            };
            /**星星显示
             * @param star，当前星级
             * @param maxStar，最大星级
             * @param starSrc，星星资源
             * */
            StarListView.prototype.updateStar = function (star, maxStar, starSrc) {
                if (maxStar === void 0) { maxStar = 5; }
                if (starSrc === void 0) { starSrc = "star_"; }
                if (!this._starList) {
                    this._starList = new ArrayCollection();
                }
                var infos = [];
                for (var i = 1; i <= maxStar; ++i) {
                    var str = starSrc;
                    str += star >= i ? "6" : "0";
                    infos.push(str);
                }
                this._starList.replaceAll(infos);
            };
            /**新的星星显示*/
            StarListView.prototype.updateNewStar = function (star, maxStar, starSrc) {
                if (maxStar === void 0) { maxStar = 5; }
                if (starSrc === void 0) { starSrc = "new_star_"; }
                this.updateStar(star, maxStar, starSrc);
            };
            /**大星星显示*/
            StarListView.prototype.updateBigStar = function (star, maxStar, starSrc) {
                if (maxStar === void 0) { maxStar = 5; }
                if (starSrc === void 0) { starSrc = "jitan_star_"; }
                this.updateStar(star, maxStar, starSrc);
            };
            /**
             * 星星显示数量以及资源
             * @param starCnt 星级
             * @param src   星星资源
             */
            StarListView.prototype.updateStarSrc = function (starCnt, src) {
                var stars = [];
                for (var i = 0; i < starCnt; i++) {
                    stars.push(src);
                }
                this._starList.replaceAll(stars);
            };
            Object.defineProperty(StarListView.prototype, "listGap", {
                /**
                 * 设置list的gap
                 * @param gap
                 */
                set: function (gap) {
                    var layout = this.list_star.layout;
                    layout && (layout.gap = gap);
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 更新外显星级
             * @param index 外显id
             */
            StarListView.prototype.updateSurfaceStar = function (index) {
                if (!index) {
                    return;
                }
                var headType = game.PropData.getPropParse(index);
                var star = mod.SurfaceUtil.getStar(index);
                var maxStar = mod.SurfaceUtil.getMaxStar(index);
                if (headType == 400 /* Shenling */) {
                    if (star > maxStar) {
                        //觉醒星级
                        this.updateStarSrc(star - maxStar, 'moon_yellow');
                    }
                    else {
                        this.updateStar(star, maxStar);
                    }
                }
                else {
                    this.updateStar(star, maxStar);
                }
            };
            return StarListView;
        }(eui.Component));
        mod.StarListView = StarListView;
        __reflect(StarListView.prototype, "game.mod.StarListView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**升星觉醒按钮*/
        var UpStarBtn = /** @class */ (function (_super) {
            __extends(UpStarBtn, _super);
            function UpStarBtn() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * 获取拥有数量
             * @param index
             */
            UpStarBtn.prototype.getCurCnt = function (index) {
                if (!index) {
                    return 0;
                }
                return mod.BagUtil.getPropCntByIdx(index);
            };
            /**
             *
             * @param cost
             **@param isAct: 是否已经激活
             * @param tips tips：提示的文本，默认不显示
             * @param isCnt: 显示数量
             * @param curCnt: 当前数量，外部传进来的话，就不取背包的
             */
            UpStarBtn.prototype.updateCost = function (cost, isAct, tips, isCnt, curCnt) {
                if (isCnt === void 0) { isCnt = true; }
                if (!cost || !cost.length) {
                    return;
                }
                var index = cost[0];
                var costCnt = cost[1];
                var propCfg = game.GameConfig.getPropConfigById(index);
                if (!propCfg) {
                    return;
                }
                this.currentState = 'default';
                if (curCnt == undefined) {
                    curCnt = this.getCurCnt(index); //默认不传数量的话，取背包的
                }
                var str;
                if (isCnt) {
                    str = game.StringUtil.getHurtNumStr(curCnt) + "/" + game.StringUtil.getHurtNumStr(costCnt); //拥有的道具 / 消耗的道具
                }
                else {
                    if (curCnt < costCnt) {
                        str = Math.floor(curCnt / costCnt * 100) + "%";
                    }
                    else {
                        str = "100%";
                    }
                }
                this.lb_cost.text = str; //修改为不使用颜色
                var canUp = curCnt >= costCnt && isCnt; //显示数量的时候才判断
                this.grp_tips.visible = !!tips || canUp;
                if (this.grp_tips.visible) {
                    if (canUp) {
                        this.lb_tips.text = isAct ? "可升星" : "可激活";
                    }
                    else {
                        this.lb_tips.textFlow = game.TextUtil.parseHtml(tips);
                    }
                }
                this.upStarEft.updateCost(curCnt, costCnt);
            };
            UpStarBtn.prototype.updateLab = function (str) {
                this.lb_cost.textFlow = game.TextUtil.parseHtml(str);
            };
            /**满星状态*/
            UpStarBtn.prototype.updateMaxStar = function () {
                this.currentState = 'maxStar';
                this.upStarEft.updateMaxStar();
            };
            /**神灵觉醒状态*/
            UpStarBtn.prototype.updateJuexing = function () {
                this.currentState = 'juexing';
                this.upStarEft.updateMaxStar();
            };
            /**设置红点*/
            UpStarBtn.prototype.setHint = function (hint) {
                if (hint === void 0) { hint = false; }
                this.upStarEft.setHint(hint);
            };
            /**满特效，球*/
            UpStarBtn.prototype.setFullEft = function () {
                this.upStarEft.setFullEft();
            };
            return UpStarBtn;
        }(mod.Btn));
        mod.UpStarBtn = UpStarBtn;
        __reflect(UpStarBtn.prototype, "game.mod.UpStarBtn");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**升星觉醒按钮*/
        var UpStarEft = /** @class */ (function (_super) {
            __extends(UpStarEft, _super);
            function UpStarEft() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UpStarEft.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
                this._effHub = new game.UIEftHub(this);
            };
            /**
             * 添加特效
             * @param src 特效资源，UIEftSrc
             * @param parent 存放特效的Group
             * */
            UpStarEft.prototype.addEftByParent = function (src, parent, x, y, idx, cb, times, scale, autoRemove, speed) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (idx === void 0) { idx = -1; }
                if (cb === void 0) { cb = null; }
                if (times === void 0) { times = 0; }
                if (scale === void 0) { scale = 1; }
                if (autoRemove === void 0) { autoRemove = true; }
                if (speed === void 0) { speed = 1; }
                return this._effHub.add(src, x, y, cb, times, parent, idx, scale, autoRemove, speed);
            };
            UpStarEft.prototype.addEft1 = function () {
                if (!this._eftIdx1) {
                    this._eftIdx1 = this.addEftByParent("shengxing_huoyan" /* UpStar1 */, this.group_eft1);
                }
            };
            UpStarEft.prototype.addEft2 = function () {
                if (!this._eftIdx2) {
                    this._eftIdx2 = this.addEftByParent("shengxing_qiu" /* UpStar2 */, this.group_eft2);
                }
            };
            UpStarEft.prototype.addEft3 = function (scale) {
                this.clearEft3();
                this._eftIdx3 = this.addEftByParent("shengxing_shuimian" /* UpStar3 */, this.group_eft3, 0, 0, -1, null, 0, scale);
            };
            UpStarEft.prototype.clearEft1 = function () {
                if (this._eftIdx1) {
                    this._effHub.removeEffect(this._eftIdx1);
                    this._eftIdx1 = null;
                }
            };
            UpStarEft.prototype.clearEft2 = function () {
                if (this._eftIdx2) {
                    this._effHub.removeEffect(this._eftIdx2);
                    this._eftIdx2 = null;
                }
            };
            UpStarEft.prototype.clearEft3 = function () {
                if (this._eftIdx3) {
                    this._effHub.removeEffect(this._eftIdx3);
                    this._eftIdx3 = null;
                }
            };
            UpStarEft.prototype.clearAllEft = function () {
                this.clearEft1();
                this.clearEft2();
                this.clearEft3();
            };
            /**
             * @param curCnt: 当前数量
             * @param costCnt: 最大数量
             * @param showRate: 显示百分比
             * @param fullTips: 满级后显示文本
             */
            UpStarEft.prototype.updateCost = function (curCnt, costCnt, showRate, fullTips) {
                var imgHeight = 102; //mask最大高度
                var markHeight = 0; //mask高度
                var rate = costCnt > 0 ? (curCnt / costCnt) : 0; //40/100
                if (showRate) {
                    var barVal = Math.round(rate * 100);
                    barVal = barVal == 0 && curCnt > 0 ? 1 : barVal; //0%有进度时客户端特殊处理下：1%
                    var barValStr = barVal >= 100 && fullTips ? fullTips : barVal + "%";
                    this.labelDisplay.text = barValStr;
                }
                if (rate <= 0) {
                    //没碎片的时候不显示特效
                    this.clearAllEft();
                    markHeight = imgHeight;
                }
                else {
                    //有碎片的时候显示球特效
                    this.addEft2();
                    if (rate >= 1) {
                        //可升星时候显示火特效
                        this.addEft1();
                        this.clearEft3();
                    }
                    else {
                        this.clearEft1();
                        //不可升星时候显示水特效
                        var scale = 0.5 + (0.4 - Math.abs(rate - 0.5)) / 0.4 * 0.5; //rate等于0.5时，scale取最大值1，rate小于0.1时，scale取最小值0.5
                        this.addEft3(scale);
                        var minY = 12; //限制位置
                        var maxY = imgHeight - minY; //限制位置
                        var posY = Math.max(imgHeight - rate * imgHeight, minY); //限制在12
                        posY = Math.min(posY, maxY); //限制在90
                        this.group_eft3.y = posY;
                        markHeight = (1 - rate) * imgHeight;
                    }
                }
                this.img_mark.height = markHeight;
            };
            /**满星状态*/
            UpStarEft.prototype.updateMaxStar = function () {
                this.setHint(false);
                this.setFullEft();
            };
            /**满特效，球*/
            UpStarEft.prototype.setFullEft = function () {
                this.img_mark.height = 0;
                //满星时候只显示球特效
                this.clearEft1();
                this.clearEft3();
                this.addEft2();
            };
            /**设置红点*/
            UpStarEft.prototype.setHint = function (hint) {
                if (hint === void 0) { hint = false; }
                this.redPoint && (this.redPoint.visible = hint);
            };
            return UpStarEft;
        }(mod.Btn));
        mod.UpStarEft = UpStarEft;
        __reflect(UpStarEft.prototype, "game.mod.UpStarEft");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**通用的批量购买tips*/
        var StoreBuyTipsMdr = /** @class */ (function (_super) {
            __extends(StoreBuyTipsMdr, _super);
            function StoreBuyTipsMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", mod.StoreBuyTipsView);
                _this._cost = 0; //购买消耗数量
                _this._leftCnt = 0; //剩余限购次数
                _this.isEasyHide = true;
                return _this;
            }
            StoreBuyTipsMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
            };
            StoreBuyTipsMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                addEventListener(this._view.btn_confirm, egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
                addEventListener(this._view.btn_add, egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
                addEventListener(this._view.btn_addTen, egret.TouchEvent.TOUCH_TAP, this.onAddTen, this);
                addEventListener(this._view.btn_subtract, egret.TouchEvent.TOUCH_TAP, this.onSubtract, this);
                addEventListener(this._view.btn_subtractTen, egret.TouchEvent.TOUCH_TAP, this.onSubtractTen, this);
            };
            StoreBuyTipsMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                if (!this._showArgs) {
                    return;
                }
                this._cfg = game.getConfigByNameId("shop.json" /* Store */, this._showArgs.index);
                if (!this._cfg) {
                    DEBUG && console.error("\u6CA1\u6709 " + this._showArgs.index + " \u7684\u5546\u54C1");
                    return;
                }
                this.updateView();
                this.setCnt(1); //重置次数
            };
            StoreBuyTipsMdr.prototype.updateView = function () {
                var prop = this._cfg.prop[0];
                var propCfg = game.GameConfig.getPropConfigById(prop[0]);
                if (!propCfg) {
                    return;
                }
                this._view.lb_name.text = propCfg.name;
                this._view.icon.data = game.PropData.create(prop[0], prop[1]);
                // let bought_cnt = this._showArgs.bought_cnt;//已购买次数
                this._leftCnt = this._showArgs.left_cnt; //剩余购买次数
                var str = this._cfg.lmt_type == 1 ? game.getLanById("store5" /* store5 */) : (this._cfg.lmt_type == 2 ? game.getLanById("store6" /* store6 */) : game.getLanById("store7" /* store7 */));
                this._view.lb_buyDesc.textFlow = game.TextUtil.parseHtml(str + game.TextUtil.addColor(this._leftCnt + "/" + this._cfg.lmt_cnt, 8585074 /* GREEN */));
                if (this._cfg.discount) {
                    this._cost = Math.floor(this._cfg.price * this._cfg.discount / 10000);
                }
                else {
                    this._cost = this._cfg.price;
                }
                var costCfg = game.GameConfig.getPropConfigById(this._cfg.coin_type);
                this._view.costIcon.imgCost = costCfg.icon;
                this.updateCostIcon();
            };
            //更新购买n次所需消耗数量
            StoreBuyTipsMdr.prototype.updateCostIcon = function () {
                var cost = this._cost * this.getCnt();
                var color = 8585074 /* GREEN */;
                if (!mod.BagUtil.checkPropCnt(this._cfg.coin_type, cost)) {
                    color = 16731212 /* RED */;
                }
                this._view.costIcon.setLabCost(cost + '', color);
            };
            StoreBuyTipsMdr.prototype.onHide = function () {
                _super.prototype.onHide.call(this);
            };
            StoreBuyTipsMdr.prototype.onConfirm = function () {
                var cnt = this.getCnt();
                if (this._leftCnt < cnt) {
                    return;
                }
                if (!mod.BagUtil.checkPropCnt(this._cfg.coin_type, this._cost * cnt, 1 /* Dialog */)) {
                    if (this._cfg.coin_type == 1450000002 /* Xianyu */) {
                        mod.ViewMgr.getIns().openCommonRechargeView();
                        this.hide();
                    }
                    return;
                }
                var handler = this._showArgs.handler;
                if (handler) {
                    handler.exec(cnt); //回调购买次数，其他参数构建handler时携带
                }
                this.hide();
            };
            /**todo 有通用组件，待处理*/
            StoreBuyTipsMdr.prototype.getCnt = function () {
                return Number(this._view.lb_cnt.text) || 1;
            };
            StoreBuyTipsMdr.prototype.setCnt = function (cnt) {
                this._view.lb_cnt.text = cnt + '';
                this.updateCostIcon();
            };
            StoreBuyTipsMdr.prototype.onAdd = function () {
                var cnt = this.getCnt();
                if (cnt >= this._leftCnt) {
                    return;
                }
                this.setCnt(++cnt);
            };
            StoreBuyTipsMdr.prototype.onAddTen = function () {
                var cnt = this.getCnt();
                if (cnt >= this._leftCnt) {
                    return;
                }
                this.setCnt(Math.min(cnt + 10, this._leftCnt));
            };
            StoreBuyTipsMdr.prototype.onSubtract = function () {
                var cnt = this.getCnt();
                if (cnt <= 1) {
                    return;
                }
                this.setCnt(--cnt);
            };
            StoreBuyTipsMdr.prototype.onSubtractTen = function () {
                var cnt = this.getCnt();
                if (cnt <= 1) {
                    return;
                }
                this.setCnt(Math.max(cnt - 10, 1));
            };
            return StoreBuyTipsMdr;
        }(game.MdrBase));
        mod.StoreBuyTipsMdr = StoreBuyTipsMdr;
        __reflect(StoreBuyTipsMdr.prototype, "game.mod.StoreBuyTipsMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var StoreBuyTipsView = /** @class */ (function (_super) {
            __extends(StoreBuyTipsView, _super);
            function StoreBuyTipsView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.store.StoreBuyTipsSkin";
                return _this;
            }
            return StoreBuyTipsView;
        }(eui.Component));
        mod.StoreBuyTipsView = StoreBuyTipsView;
        __reflect(StoreBuyTipsView.prototype, "game.mod.StoreBuyTipsView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var SurfaceGiftView = /** @class */ (function (_super) {
            __extends(SurfaceGiftView, _super);
            function SurfaceGiftView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.surface.SurfaceGiftSkin";
                return _this;
            }
            return SurfaceGiftView;
        }(eui.Component));
        mod.SurfaceGiftView = SurfaceGiftView;
        __reflect(SurfaceGiftView.prototype, "game.mod.SurfaceGiftView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var SurfaceLvItemRender = /** @class */ (function (_super) {
            __extends(SurfaceLvItemRender, _super);
            function SurfaceLvItemRender() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SurfaceLvItemRender.prototype.dataChanged = function () {
                var lv = this.itemIndex + 1;
                var _proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                var smallLv = _proxy.getSurfaceSmallLv(_proxy.headType);
                this.img_icon.source = smallLv >= lv ? "lv_icon_" + _proxy.headType : "lv_icon_gray_" + _proxy.headType;
            };
            return SurfaceLvItemRender;
        }(eui.ItemRenderer));
        mod.SurfaceLvItemRender = SurfaceLvItemRender;
        __reflect(SurfaceLvItemRender.prototype, "game.mod.SurfaceLvItemRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var TouchEvent = egret.TouchEvent;
        var Tween = base.Tween;
        var SurfacePillItemRender = /** @class */ (function (_super) {
            __extends(SurfacePillItemRender, _super);
            function SurfacePillItemRender() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._canUseCnt = 0; //可以使用的数量
                return _this;
            }
            SurfacePillItemRender.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this, this.onClick, this);
            };
            SurfacePillItemRender.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
                this.removeTween();
            };
            SurfacePillItemRender.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                if (!this._proxy) {
                    this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                }
                var index = this.data[0];
                var maxCnt = this.data[1];
                var propCfg = game.GameConfig.getPropConfigById(index);
                var pos = propCfg.quality - 2; //品质3开始的
                this.img_icon.source = "hundan_" + this._proxy.headType + "_" + pos;
                var isAct = !!this._proxy.selData.star && !!maxCnt;
                this.img_lock.visible = !isAct;
                this.grp_cnt.visible = isAct;
                this.grp_add.removeChildren();
                this._canUseCnt = 0;
                if (isAct) {
                    var cfg = this._proxy.selData.cfg;
                    var useCnt = this._proxy.getPillUseCnt(cfg.index, index);
                    this.lab_cnt.text = useCnt + "/" + maxCnt;
                    var curCnt = mod.BagUtil.getPropCntByIdx(index);
                    this._canUseCnt = Math.min(curCnt, maxCnt - useCnt);
                }
                this.removeEft();
                this.removeTween();
                if (this._canUseCnt > 0) {
                    this.addBmpFont("+" + this._canUseCnt, game.BmpTextCfg[203 /* PowerAdd2 */], this.grp_add, true, 0.5, true);
                    this.grp_add.y = -5;
                    Tween.get(this.grp_add, { loop: true })
                        .to({ y: 5 }, 500)
                        .to({ y: -5 }, 500);
                    this.addEftByParent("surface_pill" /* SurfacePill */, this.grp_eft);
                }
                this.redPoint.visible = this._canUseCnt > 0;
            };
            SurfacePillItemRender.prototype.onClick = function () {
                if (!this.data) {
                    return;
                }
                var index = this.data[0];
                if (!this._proxy.selData.star) {
                    //未解锁
                    game.PromptBox.getIns().show(game.StringUtil.substitute(game.getLanById("lianshendan_tips" /* lianshendan_tips */), [1]));
                }
                else {
                    if (this._canUseCnt) {
                        //可以使用
                        var cfg = this._proxy.selData.cfg;
                        this._proxy.c2s_lianshendan_swal(cfg.index, index);
                        return;
                    }
                }
                facade.showView("46" /* Surface */, "06" /* SurfacePillTips */, { selData: this._proxy.selData, data: this.data });
            };
            SurfacePillItemRender.prototype.removeTween = function () {
                Tween.remove(this.grp_add);
            };
            return SurfacePillItemRender;
        }(mod.BaseRenderer));
        mod.SurfacePillItemRender = SurfacePillItemRender;
        __reflect(SurfacePillItemRender.prototype, "game.mod.SurfacePillItemRender");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var SurfaceStarView = /** @class */ (function (_super) {
            __extends(SurfaceStarView, _super);
            function SurfaceStarView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.surface.SurfaceStarSkin";
                return _this;
            }
            return SurfaceStarView;
        }(eui.Component));
        mod.SurfaceStarView = SurfaceStarView;
        __reflect(SurfaceStarView.prototype, "game.mod.SurfaceStarView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var SurfaceView = /** @class */ (function (_super) {
            __extends(SurfaceView, _super);
            function SurfaceView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.surface.SurfaceSkin";
                return _this;
            }
            return SurfaceView;
        }(eui.Component));
        mod.SurfaceView = SurfaceView;
        __reflect(SurfaceView.prototype, "game.mod.SurfaceView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var BtnTabItem = /** @class */ (function (_super) {
            __extends(BtnTabItem, _super);
            function BtnTabItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BtnTabItem.prototype.setData = function (data) {
                this.data = data;
                this.dataChanged();
            };
            BtnTabItem.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                this.lab.text = data.name;
                this.redPoint.visible = !!this.data.showHint;
            };
            return BtnTabItem;
        }(mod.BaseRenderer));
        mod.BtnTabItem = BtnTabItem;
        __reflect(BtnTabItem.prototype, "game.mod.BtnTabItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TabBaseItem = /** @class */ (function (_super) {
            __extends(TabBaseItem, _super);
            function TabBaseItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TabBaseItem.prototype.dataChanged = function () {
                if (this.data.icon) {
                    this.img_icon.source = this.data.icon + (this.selected ? 1 : 2);
                }
                if (this.img_tag) {
                    this.img_tag.source = this.data.tag || '';
                }
                this.redPoint.visible = !!this.data.showHint;
            };
            return TabBaseItem;
        }(eui.ItemRenderer));
        mod.TabBaseItem = TabBaseItem;
        __reflect(TabBaseItem.prototype, "game.mod.TabBaseItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TabSecondItem = /** @class */ (function (_super) {
            __extends(TabSecondItem, _super);
            function TabSecondItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TabSecondItem.prototype.setData = function (data) {
                this.data = data;
                this.dataChanged();
            };
            TabSecondItem.prototype.dataChanged = function () {
                if (this.data.icon) {
                    this.img_icon.source = this.data.icon;
                }
                if (this.data.nameIcon) {
                    this.img_name.visible = true;
                    this.img_name.source = this.data.nameIcon;
                }
                if (this.img_gray) {
                    this.img_gray.visible = !!this.data.gray;
                }
                if (this.grp_name) {
                    if (this.data.nameGrpStr) {
                        this.img_name.visible = false;
                        this.addBmpFont(this.data.nameGrpStr, this.data.nameGrpFont, this.grp_name, true, 1, true, -8);
                    }
                    else {
                        this.grp_name.removeChildren();
                    }
                }
                if (this.img_tag) {
                    this.img_tag.source = this.data.tag;
                }
                if (this.grp_count) {
                    this.grp_count.visible = this.data.strCount && !!this.data.strCount.length;
                }
                if (this.grp_count && this.grp_count.visible) {
                    this.lab_count.textFlow = game.TextUtil.parseHtml(this.data.strCount);
                }
                if (this.lb_name) {
                    this.lb_name.textFlow = game.TextUtil.parseHtml(this.data.nameStr);
                }
                this.redPoint.visible = !!this.data.showHint;
            };
            return TabSecondItem;
        }(mod.BaseRenderer));
        mod.TabSecondItem = TabSecondItem;
        __reflect(TabSecondItem.prototype, "game.mod.TabSecondItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var TaskRender2 = /** @class */ (function (_super) {
            __extends(TaskRender2, _super);
            function TaskRender2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TaskRender2.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_go, this.onClickDraw, this);
            };
            TaskRender2.prototype.dataChanged = function () {
                var task = this.data;
                if (!task) {
                    return;
                }
                this.lab_desc.text = mod.TaskUtil.getTaskDescNotSchedule(task);
                var hasDraw = mod.TaskUtil.hasRewardDraw(task);
                this.btn_go.visible = !hasDraw;
                this.img_finished.visible = hasDraw;
                if (this.btn_go.visible) {
                    var canDraw = mod.TaskUtil.canRewardDraw(task);
                    ;
                    this.btn_go.redPoint.visible = canDraw;
                    if (canDraw) {
                        this.btn_go.labelDisplay.text = game.getLanById("tishi_29" /* tishi_29 */);
                        this.btn_go.setYellow();
                    }
                    else {
                        this.btn_go.labelDisplay.text = game.getLanById("goto" /* goto */);
                        this.btn_go.setBlue();
                    }
                    this.lab_schedule.textFlow = game.TextUtil.parseHtml(mod.TaskUtil.getTaskSchedule(task));
                }
                else {
                    this.lab_schedule.text = "";
                }
                var cfg = mod.TaskUtil.getCfg(task.task_id);
                var reward = cfg.rewards.length > 0 ? cfg.rewards[0] : null;
                this.icon.data = reward;
            };
            TaskRender2.prototype.onClickDraw = function () {
                mod.TaskUtil.clickTask(this.data);
            };
            return TaskRender2;
        }(mod.BaseListenerRenderer));
        mod.TaskRender2 = TaskRender2;
        __reflect(TaskRender2.prototype, "game.mod.TaskRender2");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        //显示两个奖励的任务
        var TaskRenderIcon = /** @class */ (function (_super) {
            __extends(TaskRenderIcon, _super);
            function TaskRenderIcon() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TaskRenderIcon.prototype.dataChanged = function () {
                _super.prototype.dataChanged.call(this);
                var task = this.data;
                if (!task) {
                    return;
                }
                var cfg = mod.TaskUtil.getCfg(task.task_id);
                this.currentState = cfg.is_special ? "special" : "default";
                var rewards = cfg.rewards;
                if (rewards.length > 1) {
                    var index = rewards[1][0];
                    var iconCnt = rewards[1][1];
                    var propCfg = game.GameConfig.getPropConfigById(index);
                    this.img_icon.source = propCfg.icon;
                    this.lab_icon.text = game.StringUtil.getHurtNumStr(iconCnt);
                }
                else {
                    this.img_icon.source = "";
                    this.lab_icon.text = "";
                }
            };
            return TaskRenderIcon;
        }(mod.TaskRender));
        mod.TaskRenderIcon = TaskRenderIcon;
        __reflect(TaskRenderIcon.prototype, "game.mod.TaskRenderIcon");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TimeMgr = base.TimeMgr;
        /**时间组件*/
        var TimeItem = /** @class */ (function (_super) {
            __extends(TimeItem, _super);
            function TimeItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.TimeItemSkin";
                return _this;
            }
            /**
             * 更新倒计时
             * 大于1天：dd天HH时
             * 大于1小时：HH时mm分
             * 小于1小时：mm分ss秒
             * @param endTime 结束时间戳，单位秒
             * @param sufStr 时间末尾文本，默认空
             * @param zeroStr 倒计时为0时显示的文本，默认空
             */
            TimeItem.prototype.updateTime = function (endTime, sufStr, zeroStr) {
                if (endTime === void 0) { endTime = 0; }
                var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                this.updateLeftTime(leftTime, sufStr, zeroStr);
            };
            /**
             * 更新倒计时
             * @param leftTime 剩余时间，单位：秒
             * @param sufStr 时间末尾文本，默认空
             * @param zeroStr 倒计时为0时显示的文本，默认空
             * @param textColor 文本颜色
             */
            TimeItem.prototype.updateLeftTime = function (leftTime, sufStr, zeroStr, textColor) {
                if (leftTime === void 0) { leftTime = 0; }
                if (leftTime <= 0) {
                    this.lab_time.textFlow = game.TextUtil.parseHtml(zeroStr ? zeroStr : '');
                    return;
                }
                var timeStr = game.TimeUtil.formatSecond(leftTime, 'd天H时', true) + (sufStr ? sufStr : '');
                if (textColor) {
                    this.lab_time.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(timeStr, textColor));
                }
                else {
                    this.lab_time.text = timeStr;
                }
            };
            /**
             * 更新中控活动倒计时
             * */
            TimeItem.prototype.updateActTime = function (actInfo) {
                var endTime = actInfo.c_end_time;
                var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                this.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
            };
            return TimeItem;
        }(eui.Component));
        mod.TimeItem = TimeItem;
        __reflect(TimeItem.prototype, "game.mod.TimeItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 基础道具描述组件
         */
        var BaseAttrItem = /** @class */ (function (_super) {
            __extends(BaseAttrItem, _super);
            function BaseAttrItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseAttrItemSkin";
                return _this;
            }
            /**
             * @param attr 属性
             * @param showAdd 是否显示+号属性
             * @param title 描述标题，默认：基础属性
             */
            BaseAttrItem.prototype.updateShow = function (attr, showAdd, title, color) {
                if (showAdd === void 0) { showAdd = false; }
                if (title === void 0) { title = game.getLanById("ywl_baseAttr" /* ywl_baseAttr */); }
                if (showAdd) {
                    this.list_attr.updateAttrAdd(attr, color || 8585074 /* GREEN */, "\n", " +", color || 4435385 /* DEFAULT */);
                }
                else {
                    this.list_attr.updateAttr(attr, color || 8585074 /* GREEN */, "\n", ": ", color || 4435385 /* DEFAULT */);
                }
                this.baseNameItem.setTitle(title);
            };
            return BaseAttrItem;
        }(eui.Component));
        mod.BaseAttrItem = BaseAttrItem;
        __reflect(BaseAttrItem.prototype, "game.mod.BaseAttrItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 带有属性提升值的属性组件
         */
        var BaseAttrItemAdd = /** @class */ (function (_super) {
            __extends(BaseAttrItemAdd, _super);
            function BaseAttrItemAdd() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseAttrItemAddSkin";
                return _this;
            }
            /**
             * 带有提升属性的
             * @param attr
             * @param next_attr
             * @param title
             */
            BaseAttrItemAdd.prototype.updateShow = function (attr, next_attr, title) {
                if (title === void 0) { title = game.getLanById("ywl_baseAttr" /* ywl_baseAttr */); }
                this.baseNameItem.setTitle(title);
                this.list_attr.updateShow(attr, next_attr);
            };
            return BaseAttrItemAdd;
        }(eui.Component));
        mod.BaseAttrItemAdd = BaseAttrItemAdd;
        __reflect(BaseAttrItemAdd.prototype, "game.mod.BaseAttrItemAdd");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 基础道具描述组件
         */
        var BaseDescItem = /** @class */ (function (_super) {
            __extends(BaseDescItem, _super);
            function BaseDescItem() {
                var _this = _super.call(this) || this;
                _this._descY = 45;
                _this._lineSpacing = 10;
                _this.skinName = "skins.common.BaseDescItemSkin";
                return _this;
            }
            BaseDescItem.prototype.dataChanged = function () {
                var _a = __assign({}, this.data), desc = _a.desc, title = _a.title, lineSpacing = _a.lineSpacing, color = _a.color;
                this.lab_desc.textFlow = game.TextUtil.parseHtml(desc);
                this.baseNameItem.setTitle(title);
                if (lineSpacing != undefined && lineSpacing != this._lineSpacing) {
                    this.lab_desc.lineSpacing = lineSpacing;
                    this.lab_desc.y = this._descY + lineSpacing - this._lineSpacing;
                }
                if (color) {
                    this.lab_desc.textColor = color;
                }
            };
            /**
             * @param desc 描述文本
             * @param title 描述标题，默认：道具描述
             * @param lineSpacing 描述的间距，默认10
             */
            BaseDescItem.prototype.updateShow = function (desc, title, lineSpacing, color) {
                if (title === void 0) { title = game.getLanById("prop_desc_tips" /* prop_desc_tips */); }
                if (lineSpacing === void 0) { lineSpacing = 10; }
                if (color === void 0) { color = 4435385 /* DEFAULT */; }
                this.data = { desc: desc, title: title, lineSpacing: lineSpacing, color: color };
            };
            return BaseDescItem;
        }(mod.BaseRenderer));
        mod.BaseDescItem = BaseDescItem;
        __reflect(BaseDescItem.prototype, "game.mod.BaseDescItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 基础道具描述组件
         */
        var BaseDescList = /** @class */ (function (_super) {
            __extends(BaseDescList, _super);
            function BaseDescList() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseDescListSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                return _this;
            }
            BaseDescList.prototype.onAddToStage = function () {
                this.initAttrList();
            };
            BaseDescList.prototype.onRemove = function () {
            };
            BaseDescList.prototype.initAttrList = function () {
                if (!this._attrList) {
                    this._attrList = new ArrayCollection();
                }
                this.list_desc.itemRenderer = mod.BaseZhuangshiItem;
                this.list_desc.dataProvider = this._attrList;
            };
            /**
             * @param descList 文本描述
             * @param title 描述标题，默认：基础属性
             */
            BaseDescList.prototype.updateShow = function (descList, title) {
                if (title === void 0) { title = game.getLanById("ywl_baseAttr" /* ywl_baseAttr */); }
                this.baseNameItem.setTitle(title);
                this._attrList.replaceAll(descList);
            };
            return BaseDescList;
        }(eui.Component));
        mod.BaseDescList = BaseDescList;
        __reflect(BaseDescList.prototype, "game.mod.BaseDescList");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 基础道具描述组件
         */
        var BaseDescList2 = /** @class */ (function (_super) {
            __extends(BaseDescList2, _super);
            function BaseDescList2() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseDescListSkin2";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
                return _this;
            }
            BaseDescList2.prototype.onAddToStage = function () {
                if (!this._attrList) {
                    this._attrList = new ArrayCollection();
                }
                this.list_desc.itemRenderer = mod.BaseZhuangShiDescItem;
                this.list_desc.dataProvider = this._attrList;
            };
            BaseDescList2.prototype.onRemoveFromStage = function () {
                this._attrList.removeAll();
            };
            /**
             * @param descList 文本描述
             * @param title 描述标题，默认：基础属性
             */
            BaseDescList2.prototype.updateShow = function (descList, title) {
                if (title === void 0) { title = game.getLanById("ywl_baseAttr" /* ywl_baseAttr */); }
                this.baseNameItem.setTitle(title);
                this._attrList.replaceAll(descList);
            };
            return BaseDescList2;
        }(eui.Component));
        mod.BaseDescList2 = BaseDescList2;
        __reflect(BaseDescList2.prototype, "game.mod.BaseDescList2");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 通用的获取途径item
         * 跳转界面后监听 ViewEvent.ON_VIEW_HIDE 以关闭界面
         */
        var BaseGainItem = /** @class */ (function (_super) {
            __extends(BaseGainItem, _super);
            function BaseGainItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseGainItemSkin";
                _this.list.itemRenderer = BaseGainBtn;
                _this.list.dataProvider = _this._listData = new eui.ArrayCollection();
                return _this;
            }
            BaseGainItem.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickList, this);
            };
            BaseGainItem.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickList, this);
                this._listData.removeAll();
            };
            BaseGainItem.prototype.onClickList = function () {
                var data = this.list.selectedItem;
                if (!data) {
                    return;
                }
                mod.ViewMgr.getIns().showViewByID(data.index);
            };
            /**
             * 设置标题
             * @param titleName 标题文本
             */
            BaseGainItem.prototype.setTitle = function (titleName) {
                if (titleName === void 0) { titleName = game.getLanById("wupinlaiyuan" /* wupinlaiyuan */); }
                this.title_item.setTitle(game.TextUtil.addColor(titleName, 16773203 /* YELLOW */));
            };
            /**
             * 设置物品来源跳转路径（需监听 ViewEvent.ON_VIEW_HIDE 以关闭界面）
             * @param gain 获取途径跳转ID
             * @param titleName 默认：物品来源
             */
            BaseGainItem.prototype.updateShow = function (gain, titleName) {
                if (titleName === void 0) { titleName = game.getLanById("wupinlaiyuan" /* wupinlaiyuan */); }
                this.setTitle(titleName);
                if (!gain || !gain.length) {
                    return;
                }
                var jumps = [];
                for (var _i = 0, gain_1 = gain; _i < gain_1.length; _i++) {
                    var item = gain_1[_i];
                    var cfg = game.getConfigByNameId("jump.json" /* Jump */, item);
                    jumps.push(cfg);
                }
                this._listData.replaceAll(jumps);
            };
            return BaseGainItem;
        }(mod.BaseStageEventItem));
        mod.BaseGainItem = BaseGainItem;
        __reflect(BaseGainItem.prototype, "game.mod.BaseGainItem");
        var BaseGainBtn = /** @class */ (function (_super) {
            __extends(BaseGainBtn, _super);
            function BaseGainBtn() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BaseGainBtn.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
                this.redPoint.visible = false;
            };
            BaseGainBtn.prototype.dataChanged = function () {
                var data = this.data;
                if (!data) {
                    return;
                }
                this.iconDisplay.source = data.icon;
            };
            return BaseGainBtn;
        }(mod.BaseRenderer));
        mod.BaseGainBtn = BaseGainBtn;
        __reflect(BaseGainBtn.prototype, "game.mod.BaseGainBtn");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 极品属性组件
         */
        var BaseJipinAttrItem = /** @class */ (function (_super) {
            __extends(BaseJipinAttrItem, _super);
            function BaseJipinAttrItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseJipinAttrItemSkin";
                return _this;
            }
            /**
             * 更新极品属性
             * @param attr 属性
             * @param title 描述标题，默认：基础属性
             */
            BaseJipinAttrItem.prototype.updateShow = function (attr, title) {
                if (title === void 0) { title = game.getLanById("ywl_baseAttr" /* ywl_baseAttr */); }
                this.baseNameItem.setTitle(title);
                this.list_attr.updateAttr(this.getJiPinAttr(attr));
            };
            /**极品属性文本*/
            BaseJipinAttrItem.prototype.getJiPinAttr = function (attr) {
                if (!attr || !attr.length) {
                    return [];
                }
                attr.sort(function (a, b) { return b.quality - a.quality; });
                var result = [];
                for (var _i = 0, attr_1 = attr; _i < attr_1.length; _i++) {
                    var attrItem = attr_1[_i];
                    result.push.apply(result, this.getSingleJiPinAttr(attrItem));
                }
                return result;
            };
            /**单条极品属性数据，品质6才需要在属性文本前加图片标识*/
            BaseJipinAttrItem.prototype.getSingleJiPinAttr = function (attr) {
                if (!attr || !attr.jipin_attrs) {
                    return [];
                }
                var rst = [];
                var keys = game.TextUtil.getAttrOrderKeys(attr.jipin_attrs);
                var quality = attr.quality;
                for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
                    var key = keys_3[_i];
                    var name = game.TextUtil.getAttrsText(key);
                    var val = game.TextUtil.getAttrsPerCent(key, attr.jipin_attrs[key]);
                    rst.push({
                        attrStr: game.TextUtil.addColor(name + " +" + val, game.ColorUtil.getColorByQuality2(quality)),
                        img: quality >= 5 /* GOLD */ ? 'star_6' : ''
                    });
                }
                return rst;
            };
            /**
             * 更新装备极品文本
             * @param index 装备id
             * @param title 默认:极品属性
             */
            BaseJipinAttrItem.prototype.updateEquipJipinDesc = function (index, title) {
                if (title === void 0) { title = game.getLanById("jipinshuxing" /* jipinshuxing */); }
                var equipCfg = game.GameConfig.getEquipmentCfg(index);
                if (!equipCfg || !equipCfg.jiping) {
                    return;
                }
                var rst = [];
                for (var _i = 0, _a = equipCfg.jiping; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var num = item[1];
                    if (!num) {
                        continue;
                    }
                    for (var i = 0; i < num; i++) {
                        rst.push({
                            attrStr: game.TextUtil.addColor('随机一条极品属性', game.ColorUtil.getColorByQuality2(item[0])),
                            img: item[0] >= 5 /* GOLD */ ? 'star_6' : ''
                        });
                    }
                }
                this.baseNameItem.setTitle(title);
                this.list_attr.updateAttr(rst);
            };
            return BaseJipinAttrItem;
        }(eui.Component));
        mod.BaseJipinAttrItem = BaseJipinAttrItem;
        __reflect(BaseJipinAttrItem.prototype, "game.mod.BaseJipinAttrItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 可通过对象池获得，代码手动添加到容器中展示
         * 基础的title
         */
        var BaseNameItem = /** @class */ (function (_super) {
            __extends(BaseNameItem, _super);
            function BaseNameItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseNameItemSkin";
                return _this;
            }
            /**
             * 设置标题底图
             * @param bg 底图资源 ，默认 wenbenlansedi
             */
            BaseNameItem.prototype.setBg = function (bg) {
                if (bg === void 0) { bg = 'wenbenlansedi'; }
                this.img_bg.source = bg;
            };
            /**
             * 设置标题文本以及标题前面图片标识
             * @param name 标题文本
             * @param imgFlag 标题前面图片标识，默认 tipshuangsedian
             */
            BaseNameItem.prototype.setTitle = function (name, imgFlag) {
                if (imgFlag === void 0) { imgFlag = 'tipshuangsedian'; }
                this.lb_name.textFlow = game.TextUtil.parseHtml(name);
                this.img_flag.source = imgFlag;
            };
            return BaseNameItem;
        }(mod.BaseStageEventItem));
        mod.BaseNameItem = BaseNameItem;
        __reflect(BaseNameItem.prototype, "game.mod.BaseNameItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        /**
         * 基础道具来源跳转组件
         */
        var BasePropGainItem = /** @class */ (function (_super) {
            __extends(BasePropGainItem, _super);
            function BasePropGainItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BasePropGainItemSkin";
                return _this;
            }
            BasePropGainItem.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_gain, this.onClick, this);
            };
            BasePropGainItem.prototype.onClick = function () {
                if (!this.data) {
                    return;
                }
                mod.ViewMgr.getIns().showViewByID(this.data);
            };
            BasePropGainItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                var id = this.data;
                var cfg = game.getConfigByNameId("jump.json" /* Jump */, id);
                if (!cfg) {
                    console.error("\u8DF3\u8F6C\u8868\u6CA1\u6709\u5BF9\u5E94\u7684\u914D\u7F6E\uFF1A" + id);
                }
                var nameStr = cfg ? cfg.name : game.getLanById("huodong" /* huodong */); //默认会显示一个活动
                this.baseZhuangshiItem.updateShow(nameStr);
                var showJump = mod.ViewMgr.getIns().showJumpBtn(id); //是否显示跳转按钮
                this.btn_gain.visible = showJump;
            };
            return BasePropGainItem;
        }(mod.BaseListenerRenderer));
        mod.BasePropGainItem = BasePropGainItem;
        __reflect(BasePropGainItem.prototype, "game.mod.BasePropGainItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 基础道具来源列表组件
         */
        var BasePropGainList = /** @class */ (function (_super) {
            __extends(BasePropGainList, _super);
            function BasePropGainList() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BasePropGainListSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                return _this;
            }
            BasePropGainList.prototype.onAddToStage = function () {
                this.initAttrList();
            };
            BasePropGainList.prototype.onRemove = function () {
            };
            BasePropGainList.prototype.initAttrList = function () {
                if (!this._attrList) {
                    this._attrList = new ArrayCollection();
                }
                this.list_item.itemRenderer = mod.BasePropGainItem;
                this.list_item.dataProvider = this._attrList;
            };
            /**
             * @param gainList 获取途径跳转ID
             * @param title 描述标题，默认：获取途径
             */
            BasePropGainList.prototype.updateShow = function (gainList, title) {
                if (title === void 0) { title = game.getLanById("bag_cue21" /* bag_cue21 */); }
                if (!gainList || !gainList.length) {
                    this.visible = false; //只做隐藏，不做移除，需要的话再扩展接口
                    return;
                }
                this.visible = true;
                if (!this._attrList) {
                    this.initAttrList();
                }
                this.baseNameItem.setTitle(title);
                var itemList = gainList || [];
                this._attrList.source = itemList;
            };
            return BasePropGainList;
        }(eui.Component));
        mod.BasePropGainList = BasePropGainList;
        __reflect(BasePropGainList.prototype, "game.mod.BasePropGainList");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 基础道具提示组件
         */
        var BasePropTips = /** @class */ (function (_super) {
            __extends(BasePropTips, _super);
            function BasePropTips() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BasePropTipsSkin";
                return _this;
            }
            BasePropTips.prototype.updateShow = function (data, starCnt) {
                if (data instanceof game.PropData) {
                    this._propData = data;
                }
                else {
                    this._propData = game.PropData.create(data);
                }
                this.icon.setData(this._propData, 3 /* NotTips */);
                this.lab_name.textFlow = this.icon.getPropName(false);
                this.baseQualityTips.updateShow(this._propData.quality);
                if (starCnt != null) {
                    this.updateIconStar(starCnt);
                }
            };
            /**
             * @param quality
             * @param name
             * @param icon
             */
            BasePropTips.prototype.updateShowByArgs = function (quality, name, icon) {
                this.baseQualityTips.updateShow(quality);
                this.lab_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(name, game.ColorUtil.getColorByQuality2(quality)));
                this.icon.updateQualityImg(game.ResUtil.getPropQualityImg(quality));
                this.icon.updateIconImg(icon);
            };
            /**
             * 更新icon的星星
             * @param starCnt
             */
            BasePropTips.prototype.updateIconStar = function (starCnt) {
                this.icon.updateStar(starCnt);
            };
            return BasePropTips;
        }(eui.Component));
        mod.BasePropTips = BasePropTips;
        __reflect(BasePropTips.prototype, "game.mod.BasePropTips");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 基础带品质提示组件
         */
        var BaseQualityTips = /** @class */ (function (_super) {
            __extends(BaseQualityTips, _super);
            function BaseQualityTips() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseQualityTipsSkin";
                return _this;
            }
            BaseQualityTips.prototype.updateShow = function (quality) {
                this.img_quality.source = game.ResUtil.getBgQuality(quality);
            };
            return BaseQualityTips;
        }(eui.Component));
        mod.BaseQualityTips = BaseQualityTips;
        __reflect(BaseQualityTips.prototype, "game.mod.BaseQualityTips");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var ArrayCollection = eui.ArrayCollection;
        var facade = base.facade;
        /**
         * 道具奖励
         */
        var BaseRewardList = /** @class */ (function (_super) {
            __extends(BaseRewardList, _super);
            function BaseRewardList() {
                var _this = _super.call(this) || this;
                _this._selectShow = false; //长按奖励时候提示
                _this.skinName = "skins.common.BaseRewardListSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            BaseRewardList.prototype.onAddToStage = function () {
                this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
                this.list_icon.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                facade.onNt("on_bag_reward_select_show" /* ON_BAG_REWARD_SELECT_SHOW */, this.onSelectShow, this);
                this.initAttrList();
            };
            BaseRewardList.prototype.onRemove = function () {
                this.list_icon.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                facade.offNt("on_bag_reward_select_show" /* ON_BAG_REWARD_SELECT_SHOW */, this.onSelectShow, this);
            };
            BaseRewardList.prototype.initAttrList = function () {
                if (!this._listData) {
                    this._listData = new ArrayCollection();
                }
            };
            BaseRewardList.prototype.initSelIndex = function () {
                this._selIndex = -1;
                this.list_icon.selectedIndex = this._selIndex;
            };
            BaseRewardList.prototype.onClickList = function (e) {
                if (this._selectShow) {
                    //长按提示奖励时候不选中
                    this._selectShow = false;
                    this.list_icon.selectedIndex = this._selIndex;
                    return;
                }
                var index = e.itemIndex;
                if (index == this._selIndex) {
                    this.initSelIndex();
                }
                else {
                    this._selIndex = index;
                }
            };
            BaseRewardList.prototype.onSelectShow = function () {
                this._selectShow = true;
            };
            /**获取选中的道具index*/
            BaseRewardList.prototype.getSelIndex = function () {
                return this._selIndex;
            };
            /**
             * @param rewards 道具index和cnt数组
             * @param isSel 是否显示可选择道具
             */
            BaseRewardList.prototype.updateShow = function (rewards, isSel) {
                this.initAttrList();
                if (!isSel) {
                    this.list_icon.itemRendererSkinName = "skins.common.IconSkin";
                    this.list_icon.itemRenderer = mod.Icon;
                }
                else {
                    this.list_icon.itemRendererSkinName = "skins.common.IconSelSkin";
                    this.list_icon.itemRenderer = mod.BaseRewardSelItem;
                    this._selectShow = false;
                    this.initSelIndex();
                }
                this.list_icon.dataProvider = this._listData;
                this._listData.source = rewards;
            };
            return BaseRewardList;
        }(eui.Component));
        mod.BaseRewardList = BaseRewardList;
        __reflect(BaseRewardList.prototype, "game.mod.BaseRewardList");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var delayCall = base.delayCall;
        var clearDelay = base.clearDelay;
        var Handler = base.Handler;
        var BaseRewardSelItem = /** @class */ (function (_super) {
            __extends(BaseRewardSelItem, _super);
            function BaseRewardSelItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BaseRewardSelItem.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(TouchEvent.TOUCH_BEGIN, this, this.onClickBegin, this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_CANCEL, this, this.onClickEnd, this);
                this.addEventListenerEx(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this, this.onClickEnd, this);
                this.addEventListenerEx(TouchEvent.TOUCH_END, this, this.onClickEnd, this);
            };
            BaseRewardSelItem.prototype.onRemoveFromStage = function () {
                this.clearDelayProp();
                _super.prototype.onRemoveFromStage.call(this);
            };
            BaseRewardSelItem.prototype.onClickBegin = function () {
                this._delayProp = delayCall(Handler.alloc(this, this.showPropTips), 2000);
            };
            BaseRewardSelItem.prototype.onClickEnd = function () {
                this.clearDelayProp();
            };
            BaseRewardSelItem.prototype.clearDelayProp = function () {
                if (this._delayProp) {
                    clearDelay(this._delayProp);
                }
            };
            BaseRewardSelItem.prototype.showPropTips = function () {
                if (!this.data) {
                    return;
                }
                this._delayProp = 0;
                // facade.sendNt(BagEvent.ON_BAG_REWARD_SELECT_SHOW);
                //todo
                var propData = game.PropData.create(this.data[0], this.data[1]);
                mod.ViewMgr.getIns().showPropTips(propData);
            };
            BaseRewardSelItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                this.icon.setData(this.data, 3 /* NotTips */);
            };
            return BaseRewardSelItem;
        }(mod.IconSel));
        mod.BaseRewardSelItem = BaseRewardSelItem;
        __reflect(BaseRewardSelItem.prototype, "game.mod.BaseRewardSelItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 通用属性组件
         */
        var BaseSkillAttrItem = /** @class */ (function (_super) {
            __extends(BaseSkillAttrItem, _super);
            function BaseSkillAttrItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BaseSkillAttrItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                this.lb_name.textFlow = game.TextUtil.parseHtml(this.data[0]);
                var arr = this.data[1].split(",");
                this.currentState = "" + arr.length;
                if (arr.length > 1) {
                    var cfg = game.GameConfig.getPropConfigById(arr[0]);
                    this.icon.source = cfg.icon || "";
                }
                this.lb_val.textFlow = game.TextUtil.parseHtml(arr[arr.length - 1]);
            };
            return BaseSkillAttrItem;
        }(eui.ItemRenderer));
        mod.BaseSkillAttrItem = BaseSkillAttrItem;
        __reflect(BaseSkillAttrItem.prototype, "game.mod.BaseSkillAttrItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 基础外显组件
         */
        var BaseSurfaceItem = /** @class */ (function (_super) {
            __extends(BaseSurfaceItem, _super);
            function BaseSurfaceItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseSurfaceItemSkin";
                _this.touchEnabled = false;
                return _this;
            }
            /**
             * @param index 外显index
             * @param god 外显仙力
             * @param isWhite 是否白底，默认false
             * @param clickable 设置是否可点击，一般其他玩家不给查看，默认true
             * @param isShowGod 是否展示仙力按钮，默认true
             */
            BaseSurfaceItem.prototype.updateShow = function (index, god, isWhite, clickable, isShowGod) {
                if (clickable === void 0) { clickable = true; }
                if (isShowGod === void 0) { isShowGod = true; }
                var type = game.PropData.getPropParse(index);
                var data = game.PropData.create(index);
                if (type == 604 /* Ring */) {
                    this.isImage();
                    this.img_icon.source = game.ResUtil.getRingSrc(index);
                }
                else if (type == 606 /* Shouyin */) {
                    this.isImage();
                    this.img_icon.source = game.ResUtil.getShouyinSrc(index);
                }
                else if (type == 408 /* Xianjian */) {
                    this.gr_eft.y = 380;
                    this.isAnimate();
                    this.addAnimate(data.index, this.gr_eft);
                }
                else {
                    this.isAnimate();
                    this.addAnimate(data.index, this.gr_eft);
                }
                this.img_quality.source = game.ResUtil.getSrQuality(data.quality);
                this.lb_name.text = data.cfg.name;
                if (!isWhite) {
                    this.lb_name.textColor = game.ColorUtil.getColorByQuality2(data.quality);
                }
                else {
                    this.lb_name.textColor = game.ColorUtil.getColorByQuality1(data.quality);
                }
                if (type == 361 /* Lingchong */ || !isShowGod) {
                    //灵宠不展示仙力按钮
                    this.btn_god.visible = false;
                    return;
                }
                this.btn_god.visible = true;
                this.btn_god.updateGod(god, clickable);
            };
            //显示图片资源
            BaseSurfaceItem.prototype.isImage = function () {
                this.img_icon.visible = true;
                this.gr_eft.visible = false;
            };
            //显示动画模型
            BaseSurfaceItem.prototype.isAnimate = function () {
                this.img_icon.visible = false;
                this.gr_eft.visible = true;
            };
            return BaseSurfaceItem;
        }(mod.BaseRenderer));
        mod.BaseSurfaceItem = BaseSurfaceItem;
        __reflect(BaseSurfaceItem.prototype, "game.mod.BaseSurfaceItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var BaseTips = /** @class */ (function (_super) {
            __extends(BaseTips, _super);
            function BaseTips() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BaseTips;
        }(eui.Component));
        mod.BaseTips = BaseTips;
        __reflect(BaseTips.prototype, "game.mod.BaseTips");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 装饰描述标题以及文本
         */
        var BaseZhuangShiDescItem = /** @class */ (function (_super) {
            __extends(BaseZhuangShiDescItem, _super);
            function BaseZhuangShiDescItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BaseZhuangshiDescItemSkin";
                return _this;
            }
            BaseZhuangShiDescItem.prototype.dataChanged = function () {
                var list = this.data;
                if (!list || !list.length) {
                    this.updateShow('', null);
                    return;
                }
                this.updateShow(list[0], list[1]);
            };
            /**
             * 更新标题以及描述文本
             * @param title 标题文本
             * @param desc 传入null或者空字符串，则只展示只有标题的皮肤状态
             */
            BaseZhuangShiDescItem.prototype.updateShow = function (title, desc) {
                this.nameItem.data = title;
                if (desc) {
                    this.setDescState();
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(desc);
                }
                else {
                    this.setNoDescState();
                }
            };
            /**设置皮肤状态，只有标题，没有文本描述*/
            BaseZhuangShiDescItem.prototype.setDescState = function () {
                this.currentState = 'desc';
            };
            /**设置皮肤状态，有标题有文本描述*/
            BaseZhuangShiDescItem.prototype.setNoDescState = function () {
                this.currentState = 'nodesc';
            };
            return BaseZhuangShiDescItem;
        }(eui.ItemRenderer));
        mod.BaseZhuangShiDescItem = BaseZhuangShiDescItem;
        __reflect(BaseZhuangShiDescItem.prototype, "game.mod.BaseZhuangShiDescItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 基础装饰组件
         */
        var BaseZhuangshiItem = /** @class */ (function (_super) {
            __extends(BaseZhuangshiItem, _super);
            function BaseZhuangshiItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            //注释了，可以通用，自己设置不同皮肤
            // constructor() {
            //     super();
            //     this.skinName = "skins.common.BaseZhuangshiItemSkin";
            // }
            BaseZhuangshiItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                this.lab_desc.textFlow = game.TextUtil.parseHtml(this.data);
            };
            /**
             * @param desc 描述文本，不推荐使用
             */
            BaseZhuangshiItem.prototype.updateShow = function (desc) {
                this.lab_desc.textFlow = game.TextUtil.parseHtml(desc);
            };
            return BaseZhuangshiItem;
        }(eui.ItemRenderer));
        mod.BaseZhuangshiItem = BaseZhuangshiItem;
        __reflect(BaseZhuangshiItem.prototype, "game.mod.BaseZhuangshiItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var BossTipsView = /** @class */ (function (_super) {
            __extends(BossTipsView, _super);
            function BossTipsView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.boss.BossTipsSkin";
                return _this;
            }
            return BossTipsView;
        }(eui.Component));
        mod.BossTipsView = BossTipsView;
        __reflect(BossTipsView.prototype, "game.mod.BossTipsView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var TimeMgr = base.TimeMgr;
        var CloseTips = /** @class */ (function (_super) {
            __extends(CloseTips, _super);
            function CloseTips() {
                var _this = _super.call(this) || this;
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                return _this;
            }
            CloseTips.prototype.onAddToStage = function () {
                this.updateTips();
            };
            CloseTips.prototype.onRemove = function () {
                this._closeHandler = null;
                TimeMgr.removeUpdateItem(this);
            };
            CloseTips.prototype.updateTips = function (tips) {
                if (!tips) {
                    tips = game.getLanById("click_tips" /* click_tips */);
                }
                this.lab_tips.text = tips;
            };
            CloseTips.prototype.update = function (time) {
                this.updateTime();
            };
            CloseTips.prototype.updateTime = function () {
                this._time--;
                if (this._time < 0 && this._closeHandler) {
                    TimeMgr.removeUpdateItem(this);
                    if (this._closeHandler) {
                        this._closeHandler.exec();
                    }
                }
                var tips = game.getLanById("click_tips" /* click_tips */) + "(" + this._time + ")";
                this.updateTips(tips);
            };
            /**设置提示
             * @param time 倒计时
             * @param closeHandler 倒计时结束的回调
             */
            CloseTips.prototype.updateShow = function (time, closeHandler) {
                this._time = time;
                this.updateTime();
                TimeMgr.addUpdateItem(this, 1000);
                if (closeHandler) {
                    this._closeHandler = closeHandler;
                }
            };
            CloseTips.prototype.updateTxt = function (str) {
                this.lab_tips.textFlow = game.TextUtil.parseHtml(str);
            };
            return CloseTips;
        }(eui.Component));
        mod.CloseTips = CloseTips;
        __reflect(CloseTips.prototype, "game.mod.CloseTips", ["base.UpdateItem"]);
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var facade = base.facade;
        var ExchangeTips = /** @class */ (function (_super) {
            __extends(ExchangeTips, _super);
            function ExchangeTips() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ExchangeTips.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
            };
            ExchangeTips.prototype.onClick = function () {
                if (!this._propData) {
                    return;
                }
                if (!this._propData.count) {
                    game.PromptBox.getIns().show("剩余兑换数量不足");
                    return;
                }
                var proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                proxy.c2s_guild_ware_exchange(this._propData.prop_id);
                if (this._clickHandler) {
                    this._clickHandler.exec();
                }
            };
            ExchangeTips.prototype.updateExchangeTips = function (data, clickHandler) {
                var iconShowType = data.iconShowType;
                var showExchange = iconShowType == 6 /* UnionExchange */; //显示兑换，优先显示
                this.visible = showExchange;
                if (!this.visible) {
                    return;
                }
                this._propData = data;
                this._clickHandler = clickHandler;
                if (this._propData.type != 290 /* Equip */) {
                    var param1 = game.GameConfig.getParamConfigById("guild_jifen");
                    if (this._propData.index == param1.value[1]) {
                        var param2 = game.GameConfig.getParamConfigById("guild_jifen_goumai");
                        this.costItem.updateShow(param2.value);
                    }
                    else {
                        var cfg = game.getConfigByNameId("guild_ware.json" /* GuildWare */, this._propData.index);
                        if (!cfg) {
                            console.error("guild_ware.json\u7F3A\u5C11" + this._propData.index + "\u914D\u7F6E");
                        }
                        this.costItem.updateShow(cfg.cost);
                    }
                }
                else {
                    var cfg = this._propData.cfg;
                    this.costItem.updateShow(cfg.guild_donate);
                }
                this.lab_count.text = "\u5269\u4F59\u53EF\u5151\u6362" + this._propData.count + "\u6B21";
            };
            return ExchangeTips;
        }(mod.BaseListenerRenderer));
        mod.ExchangeTips = ExchangeTips;
        __reflect(ExchangeTips.prototype, "game.mod.ExchangeTips");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        // import TouchEvent = egret.TouchEvent;
        // import facade = base.facade;
        var SecondPop = /** @class */ (function (_super) {
            __extends(SecondPop, _super);
            //private _hasHide: boolean;//是否关闭SecondPop
            function SecondPop() {
                var _this = _super.call(this) || this;
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                return _this;
            }
            SecondPop.prototype.onAddToStage = function () {
                //this.btn_close.addEventListener(TouchEvent.TOUCH_TAP, this.onClickHide, this);
                //this._hasHide = false;
                this.updateTitleSrc();
                this.updateBgSrc();
            };
            SecondPop.prototype.onRemove = function () {
                //this.onClickHide();
                //this.btn_close.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickHide, this);
            };
            // private onClickHide() {
            //     if(this._hasHide){
            //         this._hasHide = false;//防止一直不能关闭
            //         return;
            //     }
            //     this._hasHide = true;
            //     let curSecondPop = ViewMgr.getIns().getSecondPopMod();
            //     if (curSecondPop && curSecondPop.length) {
            //         facade.hideView(curSecondPop[0], curSecondPop[1]);
            //     }
            // }
            SecondPop.prototype.updateTitleSrc = function () {
                if (this._titleStr) {
                    var strList = this._titleStr.split(",");
                    var allStr = "";
                    for (var _i = 0, strList_2 = strList; _i < strList_2.length; _i++) {
                        var str = strList_2[_i];
                        allStr += game.getLanById(str);
                    }
                    this.lab_title.text = allStr;
                }
            };
            SecondPop.prototype.updateBgSrc = function (str) {
                if (this._bgStr) {
                    this.img_bg.source = this._bgStr;
                }
                if (str != null) {
                    this.img_bg.source = str;
                }
            };
            Object.defineProperty(SecondPop.prototype, "titleStr", {
                /**皮肤设置标题用*/
                set: function (str) {
                    this._titleStr = str;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SecondPop.prototype, "bgStr", {
                /**皮肤设置背景用*/
                set: function (str) {
                    this._bgStr = str;
                },
                enumerable: true,
                configurable: true
            });
            /**代码设置标题用*/
            SecondPop.prototype.updateTitleStr = function (str) {
                this.lab_title.text = str;
            };
            return SecondPop;
        }(eui.Component));
        mod.SecondPop = SecondPop;
        __reflect(SecondPop.prototype, "game.mod.SecondPop");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Event = egret.Event;
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 通用属性列表组件
         */
        var SkillAttrList = /** @class */ (function (_super) {
            __extends(SkillAttrList, _super);
            function SkillAttrList() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.SkillAttrListSkin";
                _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                _this.addEventListener(Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
                return _this;
            }
            SkillAttrList.prototype.onAddToStage = function () {
                this.initAttrList();
            };
            SkillAttrList.prototype.onRemove = function () {
            };
            SkillAttrList.prototype.initAttrList = function () {
                if (!this._attrList) {
                    this._attrList = new ArrayCollection();
                }
                this.list_attr.itemRenderer = mod.BaseSkillAttrItem;
                this.list_attr.dataProvider = this._attrList;
            };
            /**属性赋值*/
            SkillAttrList.prototype.updateAttr = function (infos) {
                if (!this._attrList) {
                    this._attrList = new ArrayCollection();
                }
                if (this._attrList.source.length > 0) {
                    this._attrList.replaceAll(infos);
                }
                else {
                    this._attrList.source = infos;
                }
            };
            return SkillAttrList;
        }(eui.Component));
        mod.SkillAttrList = SkillAttrList;
        __reflect(SkillAttrList.prototype, "game.mod.SkillAttrList");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 突破界面
         */
        var BreakthroughTipsView = /** @class */ (function (_super) {
            __extends(BreakthroughTipsView, _super);
            function BreakthroughTipsView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BreakthroughTipsSkin";
                return _this;
            }
            return BreakthroughTipsView;
        }(eui.Component));
        mod.BreakthroughTipsView = BreakthroughTipsView;
        __reflect(BreakthroughTipsView.prototype, "game.mod.BreakthroughTipsView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var BreakthroughTipsView2 = /** @class */ (function (_super) {
            __extends(BreakthroughTipsView2, _super);
            function BreakthroughTipsView2() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.BreakthroughTipsSkin2";
                return _this;
            }
            return BreakthroughTipsView2;
        }(eui.Component));
        mod.BreakthroughTipsView2 = BreakthroughTipsView2;
        __reflect(BreakthroughTipsView2.prototype, "game.mod.BreakthroughTipsView2");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 升星界面
         */
        var UpStarTipsView = /** @class */ (function (_super) {
            __extends(UpStarTipsView, _super);
            function UpStarTipsView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.UpStarTipsSkin";
                return _this;
            }
            return UpStarTipsView;
        }(eui.Component));
        mod.UpStarTipsView = UpStarTipsView;
        __reflect(UpStarTipsView.prototype, "game.mod.UpStarTipsView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 升星界面
         */
        var UpStarTipsView2 = /** @class */ (function (_super) {
            __extends(UpStarTipsView2, _super);
            function UpStarTipsView2() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.UpStarTipsSkin2";
                return _this;
            }
            return UpStarTipsView2;
        }(eui.Component));
        mod.UpStarTipsView2 = UpStarTipsView2;
        __reflect(UpStarTipsView2.prototype, "game.mod.UpStarTipsView2");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 通用的属性展示面板，分【带有仙力属性，不带有仙力属性】两类
         */
        var BaseAttrMdr = /** @class */ (function (_super) {
            __extends(BaseAttrMdr, _super);
            function BaseAttrMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", mod.BaseAttrView);
                /**仙力属性*/
                _this._godKeys = ["god_atk" /* god_atk */, "god_def" /* god_def */, "god_hp" /* god_hp */];
                /**基础属性中需要过滤的属性*/
                _this._godFilterKeys = ["god_atk" /* god_atk */, "god_def" /* god_def */, "god_hp" /* god_hp */, "god" /* god */];
                _this.isEasyHide = true;
                return _this;
            }
            BaseAttrMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.listAttr1.itemRenderer = mod.AttrItemRender;
                this._view.listAttr1.dataProvider = this._listAttr1 = new eui.ArrayCollection();
                this._view.currentState = 'default';
                this._view.listAttr0.setListGap(18);
                this._view.name0.setTitle('仙力属性');
                this._view.name1.setTitle(game.getLanById("base_attr" /* base_attr */));
            };
            BaseAttrMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
            };
            BaseAttrMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this.updateView();
            };
            BaseAttrMdr.prototype.updateView = function () {
                this.updateTitleStr(this._showArgs.titleStr || '');
                if (!this._showArgs.attrs) {
                    return;
                }
                if (this._showArgs.attrItemStr) {
                    this._view.name0.setTitle(this._showArgs.attrItemStr);
                }
                if (this._showArgs.state && this._showArgs.state == 2) {
                    this._view.currentState = 'oneattr';
                    this.updateOneAttrView();
                }
                else {
                    this._view.currentState = 'default';
                    this.updateDefaultView();
                }
            };
            /**默认，带有仙力属性*/
            BaseAttrMdr.prototype.updateDefaultView = function () {
                this._view.listAttr0.visible = this._view.scroller.visible = true;
                this.updateXianLiAttr();
                this.updateBaseAttr();
            };
            /**没有仙力属性的，1: VerticalLayout, 2: TileLayout*/
            BaseAttrMdr.prototype.updateOneAttrView = function () {
                var layoutType = this._showArgs.layoutType || 1;
                this._view.listAttr0.visible = layoutType == 1;
                this._view.scroller.visible = !this._view.listAttr0.visible;
                if (layoutType == 2) {
                    this.updateBaseAttr();
                }
                else {
                    this._view.listAttr0.updateAttr(this._showArgs.attrs, 2330156 /* GREEN */, '\n', ': ');
                }
            };
            /**更新【标题】*/
            BaseAttrMdr.prototype.updateTitleStr = function (str) {
                this._view.secondPop.updateTitleStr(str);
            };
            /**更新【仙力属性】*/
            BaseAttrMdr.prototype.updateXianLiAttr = function () {
                var attrs = this._showArgs.attrs;
                this._view.power.setPowerValue(attrs.god || 0);
                var attr = new msg.attributes();
                for (var i = 0; i < this._godKeys.length; i++) {
                    attr[this._godKeys[i]] = attrs[this._godKeys[i]] || 0;
                }
                this._view.listAttr0.updateAttr(attr, 2330156 /* GREEN */, '\n', ': ');
            };
            /**更新【基础属性】*/
            BaseAttrMdr.prototype.updateBaseAttr = function () {
                var attrs = this._showArgs.attrs;
                var keys = game.TextUtil.getAttrOrderKeys(attrs);
                var rst = [];
                for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
                    var key = keys_4[_i];
                    if (this._godFilterKeys.indexOf(key) > -1) {
                        continue;
                    }
                    var name = game.TextUtil.getAttrsText(key);
                    var val = game.TextUtil.getAttrsPerCent(key, attrs[key]);
                    rst.push(name + ": " + game.TextUtil.addColor(val + '', 2330156 /* GREEN */));
                }
                this._listAttr1.replaceAll(rst);
            };
            BaseAttrMdr.prototype.onHide = function () {
                _super.prototype.onHide.call(this);
            };
            return BaseAttrMdr;
        }(game.MdrBase));
        mod.BaseAttrMdr = BaseAttrMdr;
        __reflect(BaseAttrMdr.prototype, "game.mod.BaseAttrMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        /**
         * 基础的奖励领取界面
         */
        var BaseRewardMdr = /** @class */ (function (_super) {
            __extends(BaseRewardMdr, _super);
            function BaseRewardMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", mod.BaseRewardView);
                _this.isEasyHide = true;
                return _this;
            }
            BaseRewardMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.list.itemRenderer = mod.Icon;
                this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            };
            BaseRewardMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick, this);
                this.onNt("update_base_reward_mdr_state" /* UPDATE_BASE_REWARD_MDR_STATE */, this.onUpdateState, this);
            };
            BaseRewardMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                var titleStr = this._showArgs.titleStr || game.getLanById("relic2" /* relic2 */); //奖励预览
                this._view.secondPop.updateTitleStr(titleStr);
                this._listData.replaceAll(this._showArgs.reward || []);
                var state = this._showArgs.state || 0;
                this.updateState(state);
            };
            BaseRewardMdr.prototype.updateState = function (state) {
                var tipsStr = this._showArgs.tipsStr;
                if (tipsStr) {
                    //存在提示文本时，不显示领取状态
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(tipsStr);
                    this._view.btn_get.visible = this._view.img_state.visible = false;
                }
                else {
                    if (state == 1) {
                        this._view.btn_get.visible = true;
                        this._view.img_state.visible = false;
                    }
                    else {
                        this._view.btn_get.visible = false;
                        this._view.img_state.visible = true;
                        this._view.img_state.source = state == 0 ? 'hongseweiwancheng' : 'lvseyiwancheng';
                    }
                }
            };
            /**
             * 点击领取按钮
             * @protected
             */
            BaseRewardMdr.prototype.onClick = function () {
                if (this._showArgs.state == 1) {
                    this._showArgs.handler && this._showArgs.handler.exec();
                }
            };
            /**
             * 监听 MainEvent.UPDATE_BASE_REWARD_MDR_STATE，带有参数state
             * @param n
             */
            BaseRewardMdr.prototype.onUpdateState = function (n) {
                var state = n.body;
                this.updateState(state || 0);
            };
            BaseRewardMdr.prototype.onHide = function () {
                _super.prototype.onHide.call(this);
            };
            return BaseRewardMdr;
        }(game.MdrBase));
        mod.BaseRewardMdr = BaseRewardMdr;
        __reflect(BaseRewardMdr.prototype, "game.mod.BaseRewardMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        /**
         * 规则说明
         */
        var BaseRuleDescMdr = /** @class */ (function (_super) {
            __extends(BaseRuleDescMdr, _super);
            function BaseRuleDescMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark('_view', mod.BaseRuleDescView);
                _this.isEasyHide = true;
                return _this;
            }
            BaseRuleDescMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
            };
            BaseRuleDescMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this._view.lb_desc.textFlow = game.TextUtil.parseHtml(this._showArgs[0]);
                this._view.secondPop.updateTitleStr(this._showArgs[1]);
            };
            return BaseRuleDescMdr;
        }(game.MdrBase));
        mod.BaseRuleDescMdr = BaseRuleDescMdr;
        __reflect(BaseRuleDescMdr.prototype, "game.mod.BaseRuleDescMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var Handler = base.Handler;
        var WndBaseMdr = /** @class */ (function (_super) {
            __extends(WndBaseMdr, _super);
            function WndBaseMdr() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._view = _this.mark("_view", mod.WndBaseView);
                return _this;
            }
            WndBaseMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
                this._view.list_menu.itemRenderer = mod.TabBaseItem;
                this._view.list_menu.dataProvider = this._btnList;
                this._tab.btnList = this._view.list_menu;
            };
            WndBaseMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.onClickClose);
                addEventListener(this._view.btn_back, TouchEvent.TOUCH_TAP, this.onClickBack);
                this.onNt("update_wnd_base_mdr_title" /* UPDATE_WND_BASE_MDR_TITLE */, this.onTitleUpdate, this);
                this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this); //属性刷新，有货币
                this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onUpdateByPropIndex, this); //道具刷新
                this.onNt("on_guide_trigger" /* ON_GUIDE_TRIGGER */, this.onGuideTrigger, this); //触发指定指引
            };
            WndBaseMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this.showBackGuide();
            };
            WndBaseMdr.prototype.onHide = function () {
                mod.GuideMgr.getIns().clear(4 /* Back */); //清除指引
                //GuideMgr.getIns().recordSpecialGuideMap(GuideKey.Back);//清除指引
                _super.prototype.onHide.call(this);
            };
            WndBaseMdr.prototype.onClickClose = function () {
                mod.ViewMgr.getIns().back();
            };
            /**分页选中变更时调用，比Mdr的onShow()方法晚执行*/
            WndBaseMdr.prototype.onTabChanged = function () {
                _super.prototype.onTabChanged.call(this);
                var data = this._btnList.source[this._tab.selectIndex];
                if (!data) {
                    console.error("取不到分页数据");
                    return;
                }
                this.updateTitle(data.title);
                this.updateCoin(data);
            };
            /**更新标题*/
            WndBaseMdr.prototype.updateTitle = function (title) {
                if (!title) {
                    return;
                }
                var str = game.getLanById(title) || title;
                this._view.lab_title.text = str;
            };
            /**更新背景，子类重写 */
            WndBaseMdr.prototype.updateBg = function (bg) {
                if (bg == undefined) {
                    /**支持背景设置空：""*/
                    return;
                }
                this._view.img_bg.source = game.ResUtil.getUiJpg(bg);
            };
            /** 通用标题监听 */
            WndBaseMdr.prototype.onTitleUpdate = function (n) {
                var title = n.body;
                this.updateTitle(title);
            };
            /** 通用移动层级监听，子类重写 */
            WndBaseMdr.prototype.setTop = function () {
                this._view.setChildIndex(this._view.grp_top, this._view.numChildren - 1);
            };
            /**更新货币*/
            WndBaseMdr.prototype.updateCoin = function (data) {
                var coinIndex1 = data.coinIndex1 ? data.coinIndex1 : 1450000002 /* Xianyu */;
                this._view.item1.setData(coinIndex1);
                var coinIndex2 = data.coinIndex2 ? data.coinIndex2 : 1450000001 /* Yuanbao */;
                this._view.item2.setData(coinIndex2);
                //其他货币或道具展示
                this._view.item0.visible = !!data.coinIndex0;
                if (data.coinIndex0) {
                    this._view.item0.setData(data.coinIndex0);
                }
            };
            WndBaseMdr.prototype.onRoleUpdate = function (n) {
                var keys = n.body;
                this.updateItemShow(keys, this._view.item1);
                this.updateItemShow(keys, this._view.item2);
                this.updateItemShow(keys, this._view.item0);
            };
            WndBaseMdr.prototype.updateItemShow = function (keys, item) {
                if (!item.visible) {
                    return;
                }
                var key = game.PropIndexToKey[item.index];
                if (key && keys.indexOf(key) >= 0) {
                    item.updateShow(true);
                }
            };
            WndBaseMdr.prototype.onUpdateByPropIndex = function (n) {
                var indexs = n.body;
                this.updateItemShowByIndex(indexs, this._view.item1);
                this.updateItemShowByIndex(indexs, this._view.item2);
                this.updateItemShowByIndex(indexs, this._view.item0);
            };
            WndBaseMdr.prototype.updateItemShowByIndex = function (indexs, item) {
                if (!item.visible) {
                    return;
                }
                if (indexs.indexOf(item.index) >= 0) {
                    item.updateShow();
                }
            };
            //触发指定指引
            WndBaseMdr.prototype.onGuideTrigger = function (n) {
                var key = n.body;
                if (key == 4 /* Back */) {
                    this.showBackGuide();
                }
            };
            //返回指引
            WndBaseMdr.prototype.showBackGuide = function () {
                mod.GuideMgr.getIns().show(4 /* Back */, this._view.btn_back, Handler.alloc(this, this.onClickBack)); //返回指引
            };
            return WndBaseMdr;
        }(mod.WndMdr));
        mod.WndBaseMdr = WndBaseMdr;
        __reflect(WndBaseMdr.prototype, "game.mod.WndBaseMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var WndBaseNewMdr = /** @class */ (function (_super) {
            __extends(WndBaseNewMdr, _super);
            function WndBaseNewMdr() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._view = _this.mark("_view", mod.WndBaseNewView);
                return _this;
            }
            WndBaseNewMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
                this._view.list_menu.itemRenderer = mod.TabBaseItem;
                this._view.list_menu.dataProvider = this._btnList;
                this._tab.btnList = this._view.list_menu;
            };
            WndBaseNewMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.btn_back, TouchEvent.TOUCH_TAP, this.onClickBack);
            };
            /**更新背景，子类重写 */
            WndBaseNewMdr.prototype.updateBg = function (bg) {
                if (bg == undefined) {
                    /**支持背景设置空：""*/
                    return;
                }
                this._view.img_bg.source = game.ResUtil.getUiJpg(bg);
            };
            /** 通用移动层级监听，子类重写 */
            WndBaseNewMdr.prototype.setTop = function () {
                this._view.setChildIndex(this._view.grp_top, this._view.numChildren - 1);
            };
            return WndBaseNewMdr;
        }(mod.WndMdr));
        mod.WndBaseNewMdr = WndBaseNewMdr;
        __reflect(WndBaseNewMdr.prototype, "game.mod.WndBaseNewMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ArrayCollection = eui.ArrayCollection;
        var Handler = base.Handler;
        var TouchEvent = egret.TouchEvent;
        var WndSecondMainMdr = /** @class */ (function (_super) {
            __extends(WndSecondMainMdr, _super);
            function WndSecondMainMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", mod.WndSecondMainView);
                _this._height = 1148; //secondPop默认高度
                _this.isEasyHide = true;
                return _this;
            }
            WndSecondMainMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
                this._btnList = new ArrayCollection();
                // this._view.list_menu.name = "list_menu";
                this._view.list_menu.itemRenderer = mod.TabSecondItem;
                this._view.list_menu.dataProvider = this._btnList;
                this._tab = this.genMdrTab(mod.TabMdr);
                this._tab.btnList = this._view.list_menu;
                this._tab.condCheck = Handler.alloc(this, this.onTabCheck);
                this._tab.changeHandler = Handler.alloc(this, this.onTabChanged);
                this._view.secondPop.height = this._height; //设置高度
            };
            WndSecondMainMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
            };
            WndSecondMainMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this.updateBtnList();
                this.updateViewShow();
                this.updateTabHint();
            };
            WndSecondMainMdr.prototype.onHide = function () {
                _super.prototype.onHide.call(this);
            };
            /**更新list数据*/
            WndSecondMainMdr.prototype.updateBtnList = function () {
                var list = [];
                var mdrs = [];
                for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                    var data = _a[_i];
                    if (data.openIdx && !mod.ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                        continue;
                    }
                    mdrs.push(data.mdr);
                    list.push(data);
                }
                this._btnList.source = list;
                this._tab.mdrClsList = mdrs;
            };
            /**刷新显示界面*/
            WndSecondMainMdr.prototype.updateViewShow = function () {
                var type = "";
                if (Array.isArray(this._showArgs)) {
                    type = this._showArgs.shift();
                    this._tab.params = this._showArgs;
                }
                else {
                    type = this._showArgs;
                }
                this._tab.selectIndex = Math.max(this.getMdrPosByType(type), 0);
                this._tab.show();
            };
            /**获取对应的mdr*/
            WndSecondMainMdr.prototype.getMdrPosByType = function (type) {
                var list = this._btnList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    if (list[i].btnType == type) {
                        return i;
                    }
                }
                return -1;
            };
            /**分页点击时检测*/
            WndSecondMainMdr.prototype.onTabCheck = function (index) {
                var data = this._btnList.source[index];
                if (gso.consoleIcon && data.icon) {
                    //打印图标资源
                    console.info("打印图标：", data.icon + 1);
                }
                if (!data.openIdx) {
                    return true;
                }
                return mod.ViewMgr.getIns().checkViewOpen(data.openIdx, true);
            };
            /**分页选中变更时调用，比Mdr的onShow()方法晚执行*/
            WndSecondMainMdr.prototype.onTabChanged = function () {
                var data = this._btnList.source[this._tab.selectIndex];
                this.updateTitle(data.title);
                this.updateBg(data.bg);
                this._btnList.replaceAll(this._btnList.source); //刷新分页选中状态
            };
            /**更新标题*/
            WndSecondMainMdr.prototype.updateTitle = function (title) {
                if (!title) {
                    return;
                }
                var str = game.getLanById(title) || title;
                this._view.secondPop.updateTitleStr(str);
            };
            /**更新背景*/
            WndSecondMainMdr.prototype.updateBg = function (bg) {
                if (bg == undefined) {
                    /**支持背景设置空：""*/
                    return;
                }
                this._view.secondPop.updateBgSrc(game.ResUtil.getUiJpg(bg));
            };
            /** 通用红点事件监听 */
            WndSecondMainMdr.prototype.onHintUpdate = function (n) {
                var data = n.body;
                var list = this._btnList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    var btnData = list[i];
                    if (!btnData.hintTypes) {
                        continue;
                    }
                    var type = mod.HintMgr.getType(btnData.hintTypes); /**转化为红点类型*/
                    if (type != data.node) {
                        continue;
                    }
                    if (!!btnData.showHint != data.value) { //过滤undefined!=false
                        btnData.showHint = data.value;
                        this._btnList.itemUpdated(btnData);
                    }
                    break; /**找到对应红点后则break，减少循环*/
                }
            };
            /** 刷新分页红点 */
            WndSecondMainMdr.prototype.updateTabHint = function () {
                var list = this._btnList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    var btnData = list[i];
                    if (!btnData.hintTypes) {
                        continue;
                    }
                    var hint = mod.HintMgr.getHint(btnData.hintTypes);
                    if (!!btnData.showHint != hint) { //过滤undefined!=false
                        btnData.showHint = hint;
                        this._btnList.itemUpdated(btnData);
                    }
                }
            };
            return WndSecondMainMdr;
        }(game.MdrBase));
        mod.WndSecondMainMdr = WndSecondMainMdr;
        __reflect(WndSecondMainMdr.prototype, "game.mod.WndSecondMainMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ArrayCollection = eui.ArrayCollection;
        var Handler = base.Handler;
        var WndSecondMdr = /** @class */ (function (_super) {
            __extends(WndSecondMdr, _super);
            function WndSecondMdr() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._view = _this.mark("_view", mod.WndSecondView);
                _this._firstEnter = false; /**是否首次进入，用于保存界面数据*/
                return _this;
            }
            WndSecondMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
                this._btnList = new ArrayCollection();
                this._view.list_type.itemRenderer = mod.TabSecondItem;
                this._view.list_type.dataProvider = this._btnList;
                this._tab = this.genMdrTab(mod.TabMdr);
                this._tab.btnList = this._view.list_type;
                this._tab.condCheck = Handler.alloc(this, this.onTabCheck);
                this._tab.changeHandler = Handler.alloc(this, this.onTabChanged);
                this._view.timeItem.visible = false;
            };
            WndSecondMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
                var addEventListener = this.onEgret.bind(this);
                this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                this.onNt("on_open_func_update" /* ON_OPEN_FUNC_UPDATE */, this.onOpenFuncUpdate, this); //功能开启
                this.onNt("update_wnd_second_mdr_top" /* UPDATE_WND_SECOND_MDR_TOP */, this.onTopUpdate, this);
            };
            WndSecondMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this._firstEnter = true;
                this.updateBtnList();
                this.updateViewShow();
                this.updateTabHint();
            };
            WndSecondMdr.prototype.onHide = function () {
                _super.prototype.onHide.call(this);
            };
            /**更新list数据*/
            WndSecondMdr.prototype.updateBtnList = function () {
                var list = [];
                var mdrs = [];
                var state = "1";
                for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                    var data = _a[_i];
                    if (data.openIdx && !mod.ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                        continue;
                    }
                    if (data.nameIcon) {
                        state = "2"; //副本分页
                    }
                    mdrs.push(data.mdr);
                    list.push(data);
                }
                this._btnList.source = list;
                this._tab.mdrClsList = mdrs;
                this._view.currentState = state;
            };
            /**刷新显示界面*/
            WndSecondMdr.prototype.updateViewShow = function () {
                var type = "";
                if (Array.isArray(this._showArgs)) {
                    type = this._showArgs.shift();
                    this._tab.params = this._showArgs;
                }
                else {
                    type = this._showArgs;
                }
                this._tab.selectIndex = Math.max(this.getMdrPosByType(type), 0);
                this._tab.show();
            };
            /**获取对应的mdr*/
            WndSecondMdr.prototype.getMdrPosByType = function (type) {
                var list = this._btnList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    if (list[i].btnType == type) {
                        return i;
                    }
                }
                return -1;
            };
            /**分页点击时检测*/
            WndSecondMdr.prototype.onTabCheck = function (index) {
                var data = this._btnList.source[index];
                if (!data.openIdx) {
                    return true;
                }
                return mod.ViewMgr.getIns().checkViewOpen(data.openIdx, true);
            };
            /**分页选中变更时调用，比Mdr的onShow()方法晚执行*/
            WndSecondMdr.prototype.onTabChanged = function () {
                var data = this._btnList.source[this._tab.selectIndex];
                if (data.title) {
                    this.sendNt("update_wnd_base_mdr_title" /* UPDATE_WND_BASE_MDR_TITLE */, data.title);
                }
                if (data.bg != undefined) {
                    /**支持背景设置空：""*/
                    this.sendNt("update_wnd_base_mdr_bg" /* UPDATE_WND_BASE_MDR_BG */, data.bg);
                }
                if (!this._firstEnter) {
                    /**非首次切换分页时，保存分页数据*/
                    var lastData = mod.ViewMgr.getIns().lastData;
                    var type = lastData && lastData.length ? lastData[0] : "00"; //没有记录WndBaseMdr分页的话，需要补上00
                    mod.ViewMgr.getIns().lastData = [type, data.btnType];
                }
                this._firstEnter = false;
            };
            /** 通用红点事件监听 */
            WndSecondMdr.prototype.onHintUpdate = function (n) {
                var data = n.body;
                var list = this._btnList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    var btnData = list[i];
                    if (!btnData.hintTypes) {
                        continue;
                    }
                    var type = mod.HintMgr.getType(btnData.hintTypes); /**转化为红点类型*/
                    if (type != data.node) {
                        continue;
                    }
                    if (!!btnData.showHint != data.value) { //过滤undefined!=false
                        btnData.showHint = data.value;
                        this._btnList.itemUpdated(btnData);
                    }
                    break; /**找到对应红点后则break，减少循环*/
                }
            };
            /** 刷新分页红点 */
            WndSecondMdr.prototype.updateTabHint = function () {
                var list = this._btnList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    var btnData = list[i];
                    if (!btnData.hintTypes) {
                        continue;
                    }
                    var hint = mod.HintMgr.getHint(btnData.hintTypes);
                    if (!!btnData.showHint != hint) { //过滤undefined!=false
                        btnData.showHint = hint;
                        this._btnList.itemUpdated(btnData);
                    }
                }
            };
            /**功能开启刷新按钮*/
            WndSecondMdr.prototype.onOpenFuncUpdate = function (n) {
                var addIdx = n.body;
                for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                    var data = _a[_i];
                    if (addIdx.indexOf(data.openIdx) > -1) {
                        this.updateBtnList();
                        break;
                    }
                }
            };
            /** 通用移动层级监听 */
            WndSecondMdr.prototype.onTopUpdate = function (n) {
                this._view.setChildIndex(this._view.grp_top, this._view.numChildren - 1);
            };
            return WndSecondMdr;
        }(game.MdrBase));
        mod.WndSecondMdr = WndSecondMdr;
        __reflect(WndSecondMdr.prototype, "game.mod.WndSecondMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ArrayCollection = eui.ArrayCollection;
        var ItemTapEvent = eui.ItemTapEvent;
        var TouchEvent = egret.TouchEvent;
        var PropertyEvent = eui.PropertyEvent;
        var TextEvent = egret.TextEvent;
        var facade = base.facade;
        var Tween = base.Tween;
        var AmassBaseMdr = /** @class */ (function (_super) {
            __extends(AmassBaseMdr, _super);
            function AmassBaseMdr() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._view = _this.mark("_view", mod.AmassView);
                return _this;
            }
            AmassBaseMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._proxy = facade.retMod("57" /* Consecrate */).retProxy(225 /* Consecrate */);
                this._itemList = new ArrayCollection();
                this._view.list_item.itemRenderer = mod.AmassItem;
                this._view.list_item.dataProvider = this._itemList;
                this._btnList = new ArrayCollection();
                this._view.list_type.itemRenderer = mod.TabSecondItem;
                this._view.list_type.dataProvider = this._btnList;
                this._suitList = new ArrayCollection();
                this._view.list_suit.itemRenderer = mod.BaseZhuangshiItem;
                this._view.list_suit.dataProvider = this._suitList;
                this._view.lab_goto.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(game.getLanById("go_collect" /* go_collect */), 2330156 /* GREEN */, ""));
            };
            AmassBaseMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
                addEventListener(this._view.lab_goto, TextEvent.LINK, this.onClickGoto);
                addEventListener(this._view.btn_last, TouchEvent.TOUCH_TAP, this.onScrollMove);
                addEventListener(this._view.btn_next, TouchEvent.TOUCH_TAP, this.onScrollMove);
                addEventListener(this._view.scr_type.viewport, PropertyEvent.PROPERTY_CHANGE, this.move);
                addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
                addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                this.onNt("on_update_amass_info" /* ON_UPDATE_AMASS_INFO */, this.onInfoUpdate, this);
                this.onNt("on_bag_update_by_prop_type" /* ON_BAG_UPDATE_BY_PROP_TYPE */, this.onBagUpdate, this);
            };
            AmassBaseMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this.initTypeList();
                this.updateSelIndex();
                this.typeUpdateInfo();
            };
            AmassBaseMdr.prototype.onHide = function () {
                Tween.remove(this._view.scr_type.viewport);
                _super.prototype.onHide.call(this);
            };
            AmassBaseMdr.prototype.onClickUp = function () {
                this._proxy.c2s_amass_advance(this.classId, 1 /* OneKey */, this._selType);
            };
            AmassBaseMdr.prototype.onClickGoto = function () {
                var cfg = game.getConfigByNameId("amass_suit.json" /* AmassSuit */, this._selType);
                mod.ViewMgr.getIns().showViewByID(cfg.jump_id);
            };
            AmassBaseMdr.prototype.onClickType = function (e) {
                var data = e.item;
                var cfg = data.param;
                var type = cfg.type;
                if (type == this._selType) {
                    return;
                }
                this._selType = type;
                this.typeUpdateInfo();
            };
            AmassBaseMdr.prototype.onClickItem = function (e) {
                var index = e.item;
                var cfg = this._proxy.getAmassCfg(index);
                facade.showView("57" /* Consecrate */, "21" /* AmassUp */, { classId: this.classId, cfg: cfg });
            };
            AmassBaseMdr.prototype.onInfoUpdate = function () {
                this.updateSelIndex(true);
                this.typeUpdateInfo();
                this.updateTypeHint();
            };
            /** 通用背包事件监听 */
            AmassBaseMdr.prototype.onBagUpdate = function (n) {
                var types = n.body;
                if (types.indexOf(this.getPropType()) < 0) {
                    return;
                }
                this.updateBar();
                this.updateItemList();
                this.updateTypeHint();
            };
            /**道具物品类型DE*/
            AmassBaseMdr.prototype.getPropType = function () {
                return 13 /* Amass */;
            };
            AmassBaseMdr.prototype.initTypeList = function () {
                var datas = [];
                var types = this._proxy.getAmassTypes(this.classId);
                this._types = types;
                for (var i = 0; i < types.length; ++i) {
                    var type = types[i];
                    var cfg = game.getConfigByNameId("amass_suit.json" /* AmassSuit */, type);
                    var typeStr = cfg.icon;
                    var icon = "tujian_icon_" + typeStr;
                    var nameIcon = "tujian_name_" + typeStr;
                    var hint = this._proxy.canAmassTypeUp(this.classId, type);
                    var data = { icon: icon, nameIcon: nameIcon, showHint: hint, param: cfg };
                    datas.push(data);
                }
                this._btnList.source = datas;
            };
            AmassBaseMdr.prototype.updateSelIndex = function (isUpdate) {
                var _this = this;
                var lastSelIndex = this._view.list_type.selectedIndex;
                var selIndex = lastSelIndex >= 0 ? lastSelIndex : 0;
                var canUp = false; //是否可以升级
                for (var i = 0; i < this._types.length; ++i) {
                    var type = this._types[i];
                    if (this._proxy.canAmassTypeUp(this.classId, type)) {
                        //选中可以升级的
                        selIndex = i;
                        canUp = true;
                        break;
                    }
                }
                if (!canUp && isUpdate) {
                    //当前classId的图鉴没有可升级图鉴时，判断另一个classId图鉴是否可升级，是的话跳转过去
                    var classId = this.classId == 1 /* Amass */ ? 2 /* Amass2 */ : 1 /* Amass */;
                    if (this._proxy.canAmassClassIdUp(classId)) {
                        var btnType = classId == 1 /* Amass */ ? "02" /* TabBtnType02 */ : "03" /* TabBtnType03 */;
                        this.sendNt("update_wnd_base_mdr_sel_tab" /* UPDATE_WND_BASE_MDR_SEL_TAB */, btnType);
                        return;
                    }
                }
                this._selType = this._types[selIndex];
                this._view.list_type.selectedIndex = selIndex;
                if (selIndex > 3) {
                    egret.callLater(function () {
                        mod.ScrollUtil.moveHToAssign(_this._view.scr_type, selIndex, 127);
                    }, this);
                }
            };
            AmassBaseMdr.prototype.updateTypeHint = function () {
                var list = this._btnList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    var btnData = list[i];
                    var cfg = btnData.param;
                    var hint = this._proxy.canAmassTypeUp(this.classId, cfg.type);
                    if (!!btnData.showHint != hint) { //过滤undefined!=false
                        btnData.showHint = hint;
                        this._btnList.itemUpdated(btnData);
                    }
                }
            };
            AmassBaseMdr.prototype.typeUpdateInfo = function () {
                this.updateBar();
                this.updateItemList();
                this.updateSuitList();
            };
            AmassBaseMdr.prototype.updateBar = function () {
                var cfg = game.getConfigByNameId("amass_suit.json" /* AmassSuit */, this._selType);
                var typeStr = cfg.icon;
                var nameIcon = "tujian_name_" + typeStr;
                this._view.img_type.source = nameIcon;
                var curVal = this._proxy.getAmassActNum(this.classId, this._selType);
                this._curCnt = curVal;
                var indexList = this._proxy.getAmassIndexList(this.classId, this._selType);
                var maxVal = indexList.length;
                this._view.bar.show(curVal, maxVal, false, 0, false);
                var canUp = this._proxy.canAmassTypeUp(this.classId, this._selType);
                this._view.btn_up.visible = canUp;
                this._view.btn_up.redPoint.visible = canUp;
                this._view.lab_goto.visible = !canUp;
            };
            AmassBaseMdr.prototype.updateItemList = function () {
                var indexList = this._proxy.getAmassIndexList(this.classId, this._selType).concat();
                if (this._itemList.source.length) {
                    this._itemList.replaceAll(indexList);
                }
                else {
                    this._itemList.source = indexList;
                }
            };
            AmassBaseMdr.prototype.updateSuitList = function () {
                var suitList = [];
                var cfg = game.getConfigByNameId("amass_suit.json" /* AmassSuit */, this._selType);
                for (var _i = 0, _a = cfg.suit; _i < _a.length; _i++) {
                    var info = _a[_i];
                    var needCnt = info[0];
                    var suitId = info[1];
                    var suitCfg = game.getConfigByNameId("suit_effect.json" /* SuitEffect */, suitId);
                    var desc = "";
                    if (this._curCnt >= needCnt) {
                        //激活
                        desc = game.TextUtil.addColor("◆ " + suitCfg.effect_show, 3496307 /* DEFAULT */) + game.TextUtil.addColor("（" + game.getLanById("actived" /* actived */)
                            + "）", 2330156 /* GREEN */);
                    }
                    else {
                        desc = "◆ " + suitCfg.effect_show + game.TextUtil.addColor("（" + game.getLanById("collected" /* collected */)
                            + this._curCnt + "/" + needCnt + "）", 16719376 /* RED */);
                    }
                    suitList.push(desc);
                }
                if (this._suitList.source.length) {
                    this._suitList.replaceAll(suitList);
                }
                else {
                    this._suitList.source = suitList;
                }
            };
            /** 滚动 */
            AmassBaseMdr.prototype.onScrollMove = function (e) {
                mod.ScrollUtil.moveH(this._view.scr_type, e.currentTarget == this._view.btn_last ? 1 : 2);
            };
            /** 滚动 */
            AmassBaseMdr.prototype.move = function (e) {
                if (e.property == "scrollH" || e.property == "contentWidth") {
                    egret.callLater(this.refreshPos, this);
                }
            };
            /** 显示左右按钮 */
            AmassBaseMdr.prototype.refreshPos = function () {
                mod.ScrollUtil.changeBtnShow(this._view.scr_type, this._view.btn_last, this._view.btn_next, 127);
            };
            return AmassBaseMdr;
        }(game.MdrBase));
        mod.AmassBaseMdr = AmassBaseMdr;
        __reflect(AmassBaseMdr.prototype, "game.mod.AmassBaseMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TimeMgr = base.TimeMgr;
        var Handler = base.Handler;
        var CommonMatchMdr = /** @class */ (function (_super) {
            __extends(CommonMatchMdr, _super);
            function CommonMatchMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", mod.CommonMatchView);
                _this._names = [];
                _this.isEasyHide = false;
                return _this;
            }
            CommonMatchMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
            };
            CommonMatchMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
                var addEventListener = this.onEgret.bind(this);
            };
            CommonMatchMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this._view.currentState = "" + this._showArgs.type;
                this.initNameList();
                this.updatePlayer();
                this.updateEnemy();
                TimeMgr.addUpdateItem(this, 600);
            };
            CommonMatchMdr.prototype.initNameList = function () {
                this._timeCnt = this._showArgs.times || 5;
                for (var i in this._showArgs.enemys) {
                    // let info = this._showArgs.enemys[i];
                    this._names[i] = [];
                    for (var j = 0; j < this._timeCnt; j++) {
                        this._names[i].push(game.TextUtil.getRandomName());
                    }
                }
            };
            CommonMatchMdr.prototype.onHide = function () {
                if (this._showArgs.handler) {
                    this._showArgs.handler.exec();
                }
                TimeMgr.removeUpdateItem(this);
                if (this._delay) {
                    base.clearDelay(this._delay);
                }
                _super.prototype.onHide.call(this);
            };
            /**更新自己*/
            CommonMatchMdr.prototype.updatePlayer = function () {
                for (var i in this._showArgs.players) {
                    var idx = +i * 2 + 1;
                    var item = this._view["item" + idx];
                    item.setData(this._showArgs.players[i]);
                }
            };
            /**更新敌人*/
            CommonMatchMdr.prototype.updateEnemy = function () {
                var _this = this;
                for (var i in this._showArgs.enemys) {
                    var idx = (+i + 1) * 2;
                    var item = this._view["item" + idx];
                    item.visible = false;
                }
                this._delay = base.delayCall(Handler.alloc(this, function () {
                    for (var i in _this._showArgs.enemys) {
                        var idx = (+i + 1) * 2;
                        var item = _this._view["item" + idx];
                        item.visible = true;
                    }
                    _this._delay = 0;
                }), 100);
                var len = this._showArgs.enemys.length;
                for (var i in this._showArgs.enemys) {
                    var info = this._showArgs.enemys[i];
                    var idx = (+i + 1) * 2;
                    var item = this._view["item" + idx];
                    var sex = len == 1 ? Math.floor(Math.random() * 2 + 1) : info.sex;
                    if (this._names[i].length) {
                        var name = this._names[i].pop();
                        item.setData({ name: name, sex: sex });
                    }
                    else {
                        item.setData(info);
                    }
                }
            };
            CommonMatchMdr.prototype.update = function (time) {
                this._timeCnt--;
                if (this._timeCnt < 0) {
                    this.hide();
                    return;
                }
                this.updateEnemy();
            };
            return CommonMatchMdr;
        }(game.MdrBase));
        mod.CommonMatchMdr = CommonMatchMdr;
        __reflect(CommonMatchMdr.prototype, "game.mod.CommonMatchMdr", ["base.UpdateItem"]);
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ArrayCollection = eui.ArrayCollection;
        /**
         * 通用的奖励预览弹窗
         */
        var BasePreviewRewardMdr = /** @class */ (function (_super) {
            __extends(BasePreviewRewardMdr, _super);
            function BasePreviewRewardMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", mod.BasePreviewRewardView);
                _this.isEasyHide = true;
                return _this;
            }
            BasePreviewRewardMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
                this._view.secondPop.titleStr = "relic2" /* relic2 */;
                this._itemList = new ArrayCollection();
                this._view.list_item.itemRenderer = mod.BasePreviewRewardItem;
                this._view.list_item.dataProvider = this._itemList;
                this._view.list_item.useVirtualLayout = false;
            };
            BasePreviewRewardMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                if (!this._showArgs || !Array.isArray(this._showArgs)) {
                    return;
                }
                this._view.scroller.stopAnimation();
                this._view.scroller.viewport.scrollV = 0;
                this.updateItemList();
            };
            BasePreviewRewardMdr.prototype.updateItemList = function () {
                this._itemList.replaceAll(this._showArgs);
            };
            return BasePreviewRewardMdr;
        }(game.MdrBase));
        mod.BasePreviewRewardMdr = BasePreviewRewardMdr;
        __reflect(BasePreviewRewardMdr.prototype, "game.mod.BasePreviewRewardMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ItemTapEvent = eui.ItemTapEvent;
        var TouchEvent = egret.TouchEvent;
        var ArrayCollection = eui.ArrayCollection;
        var facade = base.facade;
        var Handler = base.Handler;
        var TimeMgr = base.TimeMgr;
        var SurfaceMdr = /** @class */ (function (_super) {
            __extends(SurfaceMdr, _super);
            function SurfaceMdr() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._view = _this.mark("_view", mod.SurfaceView);
                _this._isFirst = true; //首次进入
                /**幻化按钮data */
                _this._huanData = {
                    icon: "huanhua_btn_icon",
                    showHint: false
                };
                _this.showLv = true; //默认显示技能等级，子类可重写
                _this.showZero = false; //默认不显示0级技能，子类可重写
                return _this;
                /**************************飞升榜********************************/
            }
            SurfaceMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
                this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                // this._proxy = this.retProxy(ProxyType.Surface);
                this._itemList = new ArrayCollection();
                this._view.list_item.itemRenderer = mod.SurfaceLvItemRender;
                this._view.list_item.dataProvider = this._itemList;
                this._skillList = new ArrayCollection();
                this._view.list_skill.itemRenderer = mod.SkillItemRender;
                this._view.list_skill.dataProvider = this._skillList;
            };
            SurfaceMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.power2.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
                addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
                addEventListener(this._view.btn_jiban, TouchEvent.TOUCH_TAP, this.onClickJiban);
                addEventListener(this._view.item_skill, TouchEvent.TOUCH_TAP, this.onClickItemSkill);
                addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
                addEventListener(this._view.btn_onekey, TouchEvent.TOUCH_TAP, this.onClickOnekey);
                addEventListener(this._view.list_skill, ItemTapEvent.ITEM_TAP, this.onClickSkill);
                addEventListener(this._view.btn_huan, TouchEvent.TOUCH_TAP, this.onClickStar);
                addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);
                addEventListener(this._view.btn_flyRank, TouchEvent.TOUCH_TAP, this.onClickFlyRank);
                this.onNt("surface_info_update" /* SURFACE_INFO_UPDATE */, this.onInfoUpdate, this);
                this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                this.onNt("on_update_punshlist_type" /* ON_UPDATE_PUNSHLIST_TYPE */, this.onUpdateAct, this);
                this.onNt("on_activity_update_by_type" /* ON_ACTIVITY_UPDATE_BY_TYPE */, this.onActivityUpdateByType, this);
            };
            SurfaceMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this._headType = this._proxy.headType;
                this.initView();
                this.updateModel();
                this.updateInfo();
                this.onUpdateAct();
                this.updateHint();
                this.updateFlyRank();
            };
            SurfaceMdr.prototype.onHide = function () {
                this._skillId = 0;
                this._isFirst = true;
                this._flyRankTime = 0;
                this._flyRankActInfo = null;
                TimeMgr.removeUpdateItem(this);
                _super.prototype.onHide.call(this);
            };
            SurfaceMdr.prototype.onClickAct = function () {
                mod.ViewMgr.getIns().showView("27" /* Activity */, "78" /* PunshList */);
            };
            SurfaceMdr.prototype.onClickDesc = function () {
                if (this._headType == 409 /* Huashen */) {
                    //化神属性为 0 不显示
                    var attr = game.PropData.filterAtr0(this._attr);
                    mod.ViewMgr.getIns().showAttrTips(game.getLanById(game.SurfaceConfigList[this._headType] + "_attr"), attr);
                }
                else {
                    mod.ViewMgr.getIns().showAttrTips(game.getLanById(game.SurfaceConfigList[this._headType] + "_attr"), this._attr);
                }
            };
            SurfaceMdr.prototype.onClickGift = function () {
                mod.ViewMgr.getIns().showView("46" /* Surface */, "05" /* SurfaceGiftMain */);
                // let skillId = this._proxy.getSurfaceSkillId(this._headType);
                // let data: BattleSkillItemRenderData = {skillId: skillId, lv: 1};
                // facade.showView(ModName.Surface, SurfaceViewType.SurfaceUpTips, data);//进阶成功
            };
            SurfaceMdr.prototype.onClickJiban = function () {
                var btnType = this._proxy.getBtnType(this._headType);
                mod.ViewMgr.getIns().showView("47" /* Jiban */, "01" /* JibanMain */, btnType);
            };
            SurfaceMdr.prototype.onClickItemSkill = function () {
                var data = this._view.item_skill.data;
                facade.showView("46" /* Surface */, "03" /* SurfaceSkillTips */, data);
            };
            SurfaceMdr.prototype.onClickSkill = function (e) {
                var _this = this;
                var data = e.item;
                var skillId = data.skillId;
                var isAct = data.isAct;
                this._skillId = skillId;
                mod.ViewMgr.getIns().showSkillTips(skillId, isAct, Handler.alloc(this, function () {
                    //激活技能
                    _this._proxy.c2s_ride_oper_skill_active(skillId, _this._headType);
                }));
            };
            SurfaceMdr.prototype.onClickStar = function () {
                this.sendNt("update_wnd_base_mdr_sel_tab" /* UPDATE_WND_BASE_MDR_SEL_TAB */, this._proxy.getStarRoadByHeadType(this._headType));
            };
            SurfaceMdr.prototype.onClickUp = function () {
                if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                    return;
                }
                this._proxy.c2s_ride_oper_up(1 /* Per */, this._headType);
            };
            SurfaceMdr.prototype.onClickOnekey = function () {
                if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                    return;
                }
                this._proxy.c2s_ride_oper_up(2 /* Onekey */, this._headType);
            };
            SurfaceMdr.prototype.onUpdateAct = function () {
                var openIdx = this._proxy.getOpenIdx(this._headType);
                var rankType = game.ActivityUtil.getRankTypeByOpenIdx(openIdx);
                var type = game.ActivityUtil.getType();
                if (type && rankType == type && mod.ViewMgr.getIns().checkViewOpen(1041670203 /* PunshList */)) {
                    this._actTime = game.ActivityUtil.getPunshListEndTime();
                    if (this._actTime > 0 && !TimeMgr.hasUpdateItem(this)) {
                        TimeMgr.addUpdateItem(this, 1000);
                        this.updateTime(TimeMgr.time);
                    }
                    this._view.grp_act.visible = true;
                }
                else {
                    this._actTime = 0;
                    this._view.grp_act.visible = false;
                }
            };
            SurfaceMdr.prototype.onInfoUpdate = function (n) {
                var headType = n.body;
                if (headType == this._headType) {
                    this.updateInfo();
                }
            };
            /** 通用红点事件监听 */
            SurfaceMdr.prototype.onHintUpdate = function (n) {
                var data = n.body;
                if (data.node == mod.HintMgr.getType(this._proxy.getGiftHint(this._headType))) {
                    this.updateGiftHint(data.value);
                }
                if (this._view.btn_jiban.visible && data.node == mod.HintMgr.getType(this._proxy.getJibanHint(this._headType))) {
                    this.updateJibanHint(data.value);
                }
                if (this._view.btn_huan.visible && data.node == mod.HintMgr.getType(this._proxy.getHeadTypeToStarHint(this._headType))) {
                    this.updateStarHint(data.value);
                }
                if (this._view.grp_act.visible) {
                    var openIdx = this._proxy.getOpenIdx(this._headType);
                    var rankType = game.ActivityUtil.getRankTypeByOpenIdx(openIdx);
                    if (data.node == mod.HintMgr.getType(game.ActivityUtil.getSurfaceHintNodes(rankType))) {
                        this._view.btn_act.setHint(data.value);
                    }
                }
            };
            SurfaceMdr.prototype.updateModel = function () {
                var index = this._proxy.getSurfaceId(this._headType) || this._proxy.getDefaultId(this._headType);
                if (!index) {
                    this._view.special_attr.visible = false;
                    this._view.name_item.visible = false;
                    return;
                }
                this.addAnimate(index, this._view.grp_eff);
                var cfg = game.getConfigById(index);
                this._view.special_attr.updateDesc(cfg, 360);
                this._view.name_item.updateShow(cfg.name, cfg.quality);
                this._view.name_item.visible = true;
            };
            SurfaceMdr.prototype.updateInfo = function () {
                this.updatePower();
                this.updateSkillList();
                this.updateLv();
            };
            SurfaceMdr.prototype.updatePower = function () {
                var attr = this._proxy.getSurfaceAllAttr(this._headType);
                this._attr = attr;
                var power = attr && attr.showpower ? attr.showpower : 0;
                this._view.power2.setPowerValue(power);
            };
            SurfaceMdr.prototype.updateSkillList = function () {
                var battleSkillId = this._proxy.getSurfaceSkillId(this._headType);
                var stage = this._proxy.getSurfaceStage(this._headType);
                this._view.item_skill.setData(battleSkillId, stage, this.showLv, this.showZero);
                var skillList = this._proxy.getSurfaceSkillList(this._headType);
                var infos = [];
                for (var _i = 0, skillList_1 = skillList; _i < skillList_1.length; _i++) {
                    var skillId = skillList_1[_i];
                    var info = {};
                    info.skillId = skillId;
                    info.isAct = this._proxy.isSurfaceSkillAct(this._headType, skillId);
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                    var cost = cfg.act_material[0];
                    info.showHint = !info.isAct && mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                    infos.push(info);
                    if (skillId == this._skillId && info.isAct) {
                        this.sendNt("surface_skill_update" /* SURFACE_SKILL_UPDATE */, info.isAct);
                    }
                }
                this._skillList.replaceAll(infos);
            };
            SurfaceMdr.prototype.updateLv = function () {
                var perLv = this._proxy.getSurfacePerLv(this._headType);
                var items = [];
                items.length = perLv;
                this._itemList.replaceAll(items);
                var lv = this._proxy.getSurfaceLv(this._headType);
                var exp = this._proxy.getSurfaceExp(this._headType);
                var upExp = this._proxy.getSurfaceUpExp(this._headType, lv);
                var stage = this._proxy.getSurfaceStage(this._headType);
                var stageStr = game.ResUtil.getChineseFontStr(stage) + "j";
                this.addBmpFont(stageStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv, false, 1, true);
                var cost = this._proxy.getSurfaceUpCost(this._headType, lv);
                var nextCost = this._proxy.getSurfaceUpCost(this._headType, lv + 1);
                var isMax = !nextCost && exp >= upExp;
                this._view.currentState = isMax ? "max" : "default";
                if (!isMax) {
                    this._cost = cost[0];
                    this._view.cost.updateShow(this._cost);
                    this._view.btn_onekey.redPoint.visible = mod.BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
                    this._view.bar.show(exp * this._cost[1], upExp * this._cost[1], !this._isFirst, lv);
                    this._isFirst = false;
                }
                else {
                    this._view.btn_onekey.redPoint.visible = false;
                    this._view.bar.showMax();
                }
            };
            SurfaceMdr.prototype.updateHint = function () {
                if (this._view.btn_gift.visible) {
                    this.updateGiftHint(mod.HintMgr.getHint(this._proxy.getGiftHint(this._headType)));
                }
                if (this._view.btn_jiban.visible) {
                    this.updateJibanHint(mod.HintMgr.getHint(this._proxy.getJibanHint(this._headType)));
                }
                if (this._view.btn_huan.visible) {
                    this.updateStarHint(mod.HintMgr.getHint(this._proxy.getHeadTypeToStarHint(this._headType)));
                }
                if (this._view.grp_act.visible) {
                    var openIdx = this._proxy.getOpenIdx(this._headType);
                    var rankType = game.ActivityUtil.getRankTypeByOpenIdx(openIdx);
                    this._view.btn_act.setHint(mod.HintMgr.getHint(game.ActivityUtil.getSurfaceHintNodes(rankType)));
                }
            };
            SurfaceMdr.prototype.updateJibanHint = function (hint) {
                this._view.btn_jiban.redPoint.visible = hint;
            };
            SurfaceMdr.prototype.updateGiftHint = function (hint) {
                this._view.btn_gift.redPoint.visible = hint;
            };
            SurfaceMdr.prototype.updateStarHint = function (hint) {
                this._huanData.showHint = hint;
                this._view.btn_huan.setData(this._huanData);
            };
            /**初始化显示不同的ui，子类可重写*/
            SurfaceMdr.prototype.initView = function () {
                this._view.btn_gift.iconDisplay.source = "jinjiehaoli_" + this._headType;
                this._view.btn_jiban.visible = this._proxy.isJiban();
                this._view.btn_huan.visible = this._proxy.isStar();
                this._view.btn_huan.setData(this._huanData);
                this.addEftByParent("jinjielibao" /* Gift */, this._view.btn_gift.group_eft);
                this._view.btn_god.visible = false;
                this._view.btn_zhanshendian.visible = false;
            };
            SurfaceMdr.prototype.update = function (time) {
                this.updateTime(time);
                this.updateFlyRankTime();
            };
            SurfaceMdr.prototype.updateTime = function (time) {
                var leftTime = this._actTime - time.serverTimeSecond;
                if (leftTime <= 0) {
                    return;
                }
                this._view.lab_time.text = game.TimeUtil.formatSecond(leftTime, 'd天H时', true);
            };
            /**************************飞升榜********************************/
            SurfaceMdr.prototype.onClickFlyRank = function () {
                mod.ViewMgr.getIns().showView("27" /* Activity */, "80" /* ActMain */, this._flyRankActInfo);
            };
            /** 通用中控活动事件监听 */
            SurfaceMdr.prototype.onActivityUpdateByType = function (n) {
                var typeList = n.body;
                if (typeList.indexOf(8 /* FlyRank */) > -1) {
                    this.updateFlyRank();
                }
            };
            SurfaceMdr.prototype.updateFlyRank = function () {
                var actInfo = this.getFlyRank();
                this._flyRankActInfo = actInfo;
                if (!actInfo) {
                    this._view.grp_flyRank.visible = false; //没有对应的飞升榜
                    return;
                }
                this._view.grp_flyRank.visible = true;
                this._flyRankTime = actInfo.c_end_time;
                this.updateFlyRankTime();
                TimeMgr.addUpdateItem(this, 1000);
            };
            SurfaceMdr.prototype.getFlyRank = function () {
                //获取对应的飞升榜
                var index = this._cost[0];
                var jumpIdx = game.FlyPropToJumpIdx[index];
                if (!jumpIdx) {
                    return null;
                }
                var activityProxy = facade.retMod("27" /* Activity */).retProxy(50 /* Activity */);
                var actList = activityProxy.getOperActList(8 /* FlyRank */);
                var flyRankProxy = facade.retMod("27" /* Activity */).retProxy(245 /* FlyRank */);
                for (var _i = 0, actList_1 = actList; _i < actList_1.length; _i++) {
                    var actInfo = actList_1[_i];
                    var propIndex = flyRankProxy.getRankProp(actInfo);
                    if (propIndex == index) {
                        return actInfo;
                    }
                }
                return null;
            };
            SurfaceMdr.prototype.updateFlyRankTime = function () {
                var leftTime = this._flyRankTime - TimeMgr.time.serverTimeSecond;
                if (leftTime <= 0) {
                    this._view.grp_flyRank.visible = false; //没有对应的飞升榜
                    return;
                }
                this._view.lab_flyRank.text = game.TimeUtil.formatSecond(leftTime, 'd天H时', true);
            };
            return SurfaceMdr;
        }(game.EffectMdrBase));
        mod.SurfaceMdr = SurfaceMdr;
        __reflect(SurfaceMdr.prototype, "game.mod.SurfaceMdr", ["base.UpdateItem"]);
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var ItemTapEvent = eui.ItemTapEvent;
        var TouchEvent = egret.TouchEvent;
        var ArrayCollection = eui.ArrayCollection;
        var facade = base.facade;
        var Handler = base.Handler;
        var SurfaceStarMdr = /** @class */ (function (_super) {
            __extends(SurfaceStarMdr, _super);
            function SurfaceStarMdr() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._view = _this.mark("_view", mod.SurfaceStarView);
                _this._pillList = [];
                return _this;
            }
            SurfaceStarMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
                this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                // this._proxy = this.retProxy(ProxyType.Surface);
                this._itemList = new ArrayCollection();
                this._view.list_item.itemRenderer = mod.AvatarItem;
                this._view.list_item.dataProvider = this._itemList;
                this._typeList = new ArrayCollection();
                this._view.list_type.itemRenderer = mod.TabSecondItem;
                this._view.list_type.dataProvider = this._typeList;
            };
            SurfaceStarMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.power2.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
                addEventListener(this._view.btn_battle, TouchEvent.TOUCH_TAP, this.onClickBattle);
                addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickStar);
                addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
                addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                this.onNt("surface_info_update" /* SURFACE_INFO_UPDATE */, this.onInfoUpdate, this);
                this.onNt("surface_ride_info_update" /* SURFACE_RIDE_INFO_UPDATE */, this.onRideInfoUpdate, this);
                this.onNt("lianshendan_info_update" /* LIANSHENDAN_INFO_UPDATE */, this.onPillUpdate, this);
                this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
            };
            SurfaceStarMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this._headType = this._proxy.headType;
                this._selIndex = 0;
                this._selCfg = null;
                this.initView();
                this.initPillList();
                this.initTypeList();
                this.typeUpdateInfo();
                this.updateTypeListHint();
                this.updateHint();
            };
            SurfaceStarMdr.prototype.onHide = function () {
                this._effIdx = 0;
                this._lastIndex = 0;
                mod.GuideMgr.getIns().clear(24 /* SurfaceAct */); //清除指引
                _super.prototype.onHide.call(this);
            };
            SurfaceStarMdr.prototype.onClickDesc = function () {
                if (this._headType == 409 /* Huashen */) {
                    //化神属性为 0 不显示
                    var attr = game.PropData.filterAtr0(this._attr);
                    mod.ViewMgr.getIns().showAttrTips(game.getLanById(game.SurfaceConfigList[this._headType] + "_attr"), attr);
                }
                else {
                    mod.ViewMgr.getIns().showAttrTips(game.getLanById(game.SurfaceConfigList[this._headType] + "_attr"), this._attr);
                }
            };
            SurfaceStarMdr.prototype.onClickStar = function () {
                if (!this._selCfg) {
                    return;
                }
                if (this._isMaxStar) {
                    game.PromptBox.getIns().show(game.getLanById("maxstar" /* maxstar */));
                    return;
                }
                if (!this._proxy.canUpStar(this._selCfg.index)) {
                    mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1]);
                    return;
                }
                this._proxy.c2s_ride_oper_up_star(1 /* Act */, this._selCfg.index, this._headType);
            };
            SurfaceStarMdr.prototype.onClickType = function (e) {
                var type = e.itemIndex + 1;
                if (type == this._selType) {
                    return;
                }
                this._selType = type;
                this._selIndex = 0;
                this._view.special_attr.visible = true;
                this.typeUpdateInfo();
            };
            SurfaceStarMdr.prototype.onClickItem = function (e) {
                var index = e.itemIndex;
                if (index == this._selIndex) {
                    return;
                }
                //清除选中特效
                var datas = this._itemList.source;
                var lastData = datas[this._selIndex];
                lastData.isSel = false;
                this._itemList.itemUpdated(lastData);
                this._selIndex = index;
                //选中特效
                var curData = datas[this._selIndex];
                curData.isSel = true;
                this._itemList.itemUpdated(curData);
                this._view.special_attr.visible = true;
                this.indexUpdateInfo();
            };
            SurfaceStarMdr.prototype.onInfoUpdate = function (n) {
                var headType = n.body;
                if (headType == this._headType) {
                    this.typeUpdateInfo();
                    this.updateTypeListHint();
                }
            };
            SurfaceStarMdr.prototype.onRideInfoUpdate = function (n) {
                var headType = n.body;
                if (headType == this._headType) {
                    this.updatePower();
                    this.updateStar();
                    this.updatePill();
                    this.updateTypeListHint();
                    this.updateItemList();
                }
            };
            SurfaceStarMdr.prototype.onPillUpdate = function (n) {
                var headTypes = n.body;
                if (headTypes.indexOf(this._headType) > -1) {
                    this.updatePill();
                    this.typeUpdateInfo();
                    this.updateTypeListHint();
                }
            };
            /** 通用红点事件监听 */
            SurfaceStarMdr.prototype.onHintUpdate = function (n) {
                var data = n.body;
                var hintType = this._proxy.getBattleHint(this._headType);
                if (hintType && data.node == mod.HintMgr.getType(hintType)) {
                    this.updateBattleHint(data.value);
                }
            };
            SurfaceStarMdr.prototype.initPillList = function () {
                this._pillList = [this._view.item_pill0, this._view.item_pill1, this._view.item_pill2];
            };
            SurfaceStarMdr.prototype.initTypeList = function () {
                var datas = this._proxy.getSurfaceTypes(this._headType);
                var typeDatas = [];
                for (var i = 1; i <= datas.length; ++i) {
                    var icon = "surface_type_" + this._headType + "_" + i;
                    typeDatas.push({ icon: icon });
                }
                this._typeList.source = typeDatas;
                this._selType = datas[0];
                this._view.list_type.selectedIndex = this._selType - 1;
                this._selIndex = 0;
            };
            SurfaceStarMdr.prototype.updateTypeListHint = function () {
                var list = this._typeList.source;
                var len = list ? list.length : 0;
                for (var i = 0; i < len; i++) {
                    var btnData = list[i];
                    var hint = this._proxy.getSurfaceTypeHint(this._headType, i + 1);
                    if (!!btnData.showHint != hint) { //过滤undefined!=false
                        btnData.showHint = hint;
                        this._typeList.itemUpdated(btnData);
                    }
                }
            };
            SurfaceStarMdr.prototype.typeUpdateInfo = function () {
                this.updateItemList();
                this.indexUpdateInfo();
            };
            SurfaceStarMdr.prototype.updateItemList = function () {
                var cfgList = this._proxy.getSurfaceCfgList(this._headType, this._selType);
                var datas = [];
                var canUpStar = false; //是否可激活可升星
                for (var i = 0; i < cfgList.length; ++i) {
                    var cfg = cfgList[i];
                    var star = this._proxy.getSurfacePerStar(cfg.index);
                    var isBattle = this._proxy.isBattle(this._headType, cfg.index);
                    var showHint = this._proxy.getSurfacePerHint(cfg);
                    var sort = 10000000; //从小到大排序
                    //幻化中＞可激活＞已激活＞未激活
                    //同一个状态根据品质排序，同一个品质根据配置表顺序排序
                    if (isBattle) {
                        sort = 0; //幻化中＞
                    }
                    else if (this._proxy.canUpStar(cfg.index)) {
                        sort -= 1000000; //可激活
                        //存在可激活可升星时候，自动选中对应外显
                        if (!canUpStar) {
                            canUpStar = true;
                            this._selCfg = cfg;
                        }
                    }
                    else {
                        //已激活＞未激活
                        sort -= star ? 100000 : 0;
                    }
                    var data = { cfg: cfg, star: star, isBattle: isBattle, showHint: showHint, sort: sort };
                    datas.push(data);
                }
                datas.sort(function (a, b) {
                    if (a.sort == b.sort) {
                        //同一个状态根据品质排序，同一个品质根据配置表顺序排序
                        if (a.cfg.quality == b.cfg.quality) {
                            return a.cfg.index - b.cfg.index; //index从小到大
                        }
                        else {
                            return a.cfg.quality - b.cfg.quality; //品质从小到大
                        }
                    }
                    return a.sort - b.sort;
                });
                if (this._selCfg) {
                    //存在选中目标时
                    for (var i = 0; i < datas.length; ++i) {
                        var info = datas[i];
                        var cfg = info.cfg;
                        if (this._selCfg.index == cfg.index) {
                            this._selIndex = i;
                            break;
                        }
                    }
                }
                //排序后下标会变化，需要更新选中
                for (var i = 0; i < datas.length; ++i) {
                    var isSel = this._selIndex == i;
                    datas[i].isSel = isSel; //修改选中状态
                }
                this._itemList.source = datas;
                this._view.list_item.selectedIndex = this._selIndex;
            };
            SurfaceStarMdr.prototype.updatePower = function () {
                var attr = this._proxy.getSurfacePerAttr(this._selCfg.index);
                this._attr = attr;
                if (!attr) {
                    attr = mod.RoleUtil.getAttr(this._selCfg.attr_id[0]);
                }
                var power = attr && attr.showpower ? attr.showpower : 0;
                this._view.power2.setPowerValue(power);
                var godVal = attr && attr.god ? attr.god : 0;
                this._view.god_item.updateGod(godVal);
            };
            SurfaceStarMdr.prototype.updateModel = function () {
                var index = this._selCfg.index;
                if (index == this._lastIndex) {
                    return;
                }
                this._lastIndex = index;
                if (this._effIdx) {
                    this.removeEffect(this._effIdx);
                }
                this._effIdx = this.addAnimate(index, this._view.grp_eff);
                this._view.name_item.updateShow(this._selCfg.name, this._selCfg.quality);
                this._view.special_attr.updateDesc(this._selCfg, 360);
            };
            SurfaceStarMdr.prototype.updateStar = function () {
                this._cost = this._selCfg.material[this._selData.star];
                var maxStar = this._proxy.getSurfaceMaxStar(this._headType);
                this._isMaxStar = this._selData.star >= maxStar;
                mod.GuideMgr.getIns().clear(24 /* SurfaceAct */);
                var isAct = !!this._selData.star;
                var tips = '';
                if (!this._isMaxStar) {
                    if (isAct) {
                        var starPower = this._selCfg.star_power[this._selData.star];
                        starPower = Math.floor(starPower / 100);
                        tips = game.getLanById("upstar" /* upstar */) + game.getLanById("showpower" /* showpower */) + "\n" + game.TextUtil.addColor("+" + starPower + "%", 2330156 /* GREEN */);
                    }
                    var idx = this._cost[0];
                    var costCnt = this._cost[1];
                    var curCnt = this._proxy.getStarPropCnt(this._headType, this._selCfg.quality, idx, this._selData.star);
                    this._view.btn_up.updateCost(this._cost, isAct, tips, true, curCnt);
                    var canUp = curCnt >= costCnt;
                    this._view.btn_up.redPoint.visible = canUp;
                    if (canUp) {
                        mod.GuideMgr.getIns().show(24 /* SurfaceAct */, this._view.btn_up, Handler.alloc(this, this.onClickStar), 4 /* Back */); //任务指引
                        mod.RoleUtil.getAttrList(this._selCfg.attr_id); //用于升星成功弹窗属性展示
                    }
                }
                else {
                    this._view.btn_up.updateMaxStar();
                    this._view.btn_up.redPoint.visible = false;
                }
                this._view.list_star.visible = isAct;
                this._view.power2.btn_desc.visible = isAct;
                if (this._view.list_star.visible) {
                    this._view.list_star.updateStar(this._selData.star, maxStar);
                }
            };
            SurfaceStarMdr.prototype.updatePill = function () {
                var infos = this._proxy.getSurfacePillCost(this._selCfg.quality, this._selData.star, this._headType);
                for (var i = 0; i < this._pillList.length; ++i) {
                    var item = this._pillList[i];
                    var info = infos[i];
                    item.data = info;
                }
            };
            SurfaceStarMdr.prototype.updateHint = function () {
                var hintType = this._proxy.getBattleHint(this._headType);
                if (this._view.btn_battle.visible && hintType) {
                    this.updateBattleHint(mod.HintMgr.getHint(hintType));
                }
            };
            SurfaceStarMdr.prototype.updateBattleHint = function (hint) {
                this._view.btn_battle.redPoint.visible = hint;
            };
            /**初始化显示不同的ui，子类可重写*/
            SurfaceStarMdr.prototype.initView = function () {
                this._view.btn_battle.iconDisplay.source = "huanhuatubiao";
                this._view.grp_skill.visible = false;
            };
            /**点击幻化或出战，子类可重写*/
            SurfaceStarMdr.prototype.onClickBattle = function () {
                if (!this._selCfg) {
                    return;
                }
                this._proxy.c2s_ride_oper_up_star(2 /* Battle */, this._selCfg.index, this._headType);
            };
            /**刷新幻化或出战，子类可重写*/
            SurfaceStarMdr.prototype.updateBattle = function () {
                this._view.btn_battle.visible = !this._selData.isBattle && !!this._selData.star;
            };
            /**刷新选中，子类可重写*/
            SurfaceStarMdr.prototype.indexUpdateInfo = function () {
                var datas = this._itemList.source;
                this._selData = datas[this._selIndex];
                this._selCfg = this._selData.cfg;
                this._proxy.selData = this._selData;
                this.updatePower();
                this.updateModel();
                this.updateStar();
                this.updatePill();
                this.updateBattle();
            };
            return SurfaceStarMdr;
        }(game.EffectMdrBase));
        mod.SurfaceStarMdr = SurfaceStarMdr;
        __reflect(SurfaceStarMdr.prototype, "game.mod.SurfaceStarMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Tween = base.Tween;
        var Handler = base.Handler;
        var Sine = base.Sine;
        /**
         * 突破成功
         * 参考 SurfaceUpTipsMdr
         */
        var BreakthroughTipsMdr = /** @class */ (function (_super) {
            __extends(BreakthroughTipsMdr, _super);
            function BreakthroughTipsMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", mod.BreakthroughTipsView);
                _this.isEasyHide = true;
                return _this;
            }
            BreakthroughTipsMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
            };
            BreakthroughTipsMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
            };
            BreakthroughTipsMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this.updateShow();
                this.showTitleTween();
                this.showBgTween();
                this.showGrpTween();
                this.showDescTween();
                this.showSkillTween();
                this.showTipsTween();
                this.showEffect();
            };
            BreakthroughTipsMdr.prototype.onHide = function () {
                this.removeTitleTween();
                this.removeBgTween();
                this.removeGrpTween();
                this.removeDescTween();
                this.removeSkillTween();
                this.removeTipsTween();
                _super.prototype.onHide.call(this);
                _super.prototype.onHide.call(this);
            };
            BreakthroughTipsMdr.prototype.updateShow = function () {
                var skillId = this._showArgs.skillId;
                var lv = this._showArgs.lv;
                var lastLv = lv - 1;
                var lvStr = game.ResUtil.getChineseFontStr(lv) + "j";
                var lastLvStr = game.ResUtil.getChineseFontStr(lastLv) + "j";
                this.addBmpFont(lvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv2);
                this.addBmpFont(lastLvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv1);
                this._view.skill.setData(skillId);
                var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                this._view.lab_name.text = cfg.name;
                this._view.lab_desc.textFlow = game.TextUtil.parseHtml(this._showArgs.attrDesc1);
            };
            BreakthroughTipsMdr.prototype.showTitleTween = function () {
                this._view.img_title.scaleX = this._view.img_title.scaleY = 7;
                Tween.get(this._view.img_title)
                    .to({ scaleX: 1, scaleY: 1 }, 200);
            };
            BreakthroughTipsMdr.prototype.removeTitleTween = function () {
                Tween.remove(this._view.img_title);
            };
            BreakthroughTipsMdr.prototype.showBgTween = function () {
                var _this = this;
                this._view.img_bg.visible = false;
                this._view.img_bg.height = 0;
                Tween.get(this._view.img_bg)
                    .delay(200)
                    .exec(Handler.alloc(this, function () {
                    _this._view.img_bg.visible = true;
                }))
                    .to({ height: 400 }, 200, null, Sine.easeIn);
            };
            BreakthroughTipsMdr.prototype.removeBgTween = function () {
                Tween.remove(this._view.img_bg);
            };
            BreakthroughTipsMdr.prototype.showGrpTween = function () {
                var _this = this;
                this._view.grp_show.visible = false;
                this._view.grp_show.x = 0;
                Tween.get(this._view.grp_show)
                    .delay(400)
                    .exec(Handler.alloc(this, function () {
                    _this._view.grp_show.visible = true;
                }))
                    .to({ x: 175 }, 200, null, Sine.easeIn);
            };
            BreakthroughTipsMdr.prototype.removeGrpTween = function () {
                Tween.remove(this._view.grp_show);
            };
            BreakthroughTipsMdr.prototype.showDescTween = function () {
                var _this = this;
                this._view.grp_desc.visible = false;
                this._view.grp_desc.x = 0;
                Tween.get(this._view.grp_desc)
                    .delay(600)
                    .exec(Handler.alloc(this, function () {
                    _this._view.grp_desc.visible = true;
                }))
                    .to({ x: 244 }, 200, null, Sine.easeIn);
            };
            BreakthroughTipsMdr.prototype.removeDescTween = function () {
                Tween.remove(this._view.grp_desc);
            };
            BreakthroughTipsMdr.prototype.showSkillTween = function () {
                var _this = this;
                this._view.skill.visible = false;
                this._view.skill.scaleX = this._view.skill.scaleY = 3;
                Tween.get(this._view.skill)
                    .delay(800)
                    .exec(Handler.alloc(this, function () {
                    _this._view.skill.visible = true;
                }))
                    .to({ scaleX: 1, scaleY: 1 }, 200, null, Sine.easeIn);
            };
            BreakthroughTipsMdr.prototype.removeSkillTween = function () {
                Tween.remove(this._view.skill);
            };
            BreakthroughTipsMdr.prototype.showTipsTween = function () {
                var _this = this;
                this._view.closeTips.visible = false;
                Tween.get(this._view.closeTips)
                    .delay(1000)
                    .exec(Handler.alloc(this, function () {
                    _this._view.closeTips.visible = true;
                }));
            };
            BreakthroughTipsMdr.prototype.removeTipsTween = function () {
                Tween.remove(this._view.closeTips);
            };
            BreakthroughTipsMdr.prototype.showEffect = function () {
                this.removeEft();
                this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                this.addEftByParent("tips_bg" /* TipsBg */, this._view.grp_eft2);
            };
            return BreakthroughTipsMdr;
        }(game.EffectMdrBase));
        mod.BreakthroughTipsMdr = BreakthroughTipsMdr;
        __reflect(BreakthroughTipsMdr.prototype, "game.mod.BreakthroughTipsMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Tween = base.Tween;
        var Handler = base.Handler;
        var Sine = base.Sine;
        var BreakthroughTipsMdr2 = /** @class */ (function (_super) {
            __extends(BreakthroughTipsMdr2, _super);
            function BreakthroughTipsMdr2() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", mod.BreakthroughTipsView2);
                _this.isEasyHide = true;
                return _this;
            }
            BreakthroughTipsMdr2.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
            };
            BreakthroughTipsMdr2.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
            };
            BreakthroughTipsMdr2.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this.updateShow();
                this.showTitleTween();
                this.showBgTween();
                this.showGrpTween();
                this.showDescTween(this._view.grp_desc1, 116);
                this.showDescTween(this._view.grp_desc2, 398);
                this.showSkillTween(this._view.skill1);
                this.showSkillTween(this._view.skill2);
                this.showTipsTween();
                this.showEffect();
            };
            BreakthroughTipsMdr2.prototype.onHide = function () {
                this.removeTitleTween();
                this.removeBgTween();
                this.removeGrpTween();
                this.removeDescTween();
                this.removeSkillTween();
                this.removeTipsTween();
                _super.prototype.onHide.call(this);
            };
            BreakthroughTipsMdr2.prototype.updateShow = function () {
                var skillId = this._showArgs.skillId;
                var lv = this._showArgs.lv;
                var lastLv = lv - 1;
                var lvStr = game.ResUtil.getChineseFontStr(lv) + "j";
                var lastLvStr = game.ResUtil.getChineseFontStr(lastLv) + "j";
                this.addBmpFont(lvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv2);
                this.addBmpFont(lastLvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv1);
                this._view.lab_lv1.text = lastLv + game.getLanById("tishi_43" /* tishi_43 */);
                this._view.lab_lv2.text = lv + game.getLanById("tishi_43" /* tishi_43 */);
                this._view.skill1.setData(skillId);
                this._view.skill2.setData(skillId);
                var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                this._view.lab_name1.text = this._view.lab_name2.text = cfg.name;
                this._view.lab_desc1.textFlow = game.TextUtil.parseHtml(this._showArgs.attrDesc0);
                this._view.lab_desc2.textFlow = game.TextUtil.parseHtml(this._showArgs.attrDesc1);
            };
            BreakthroughTipsMdr2.prototype.showTitleTween = function () {
                this._view.img_title.scaleX = this._view.img_title.scaleY = 7;
                Tween.get(this._view.img_title)
                    .to({ scaleX: 1, scaleY: 1 }, 200);
            };
            BreakthroughTipsMdr2.prototype.removeTitleTween = function () {
                Tween.remove(this._view.img_title);
            };
            BreakthroughTipsMdr2.prototype.showBgTween = function () {
                var _this = this;
                this._view.img_bg.visible = false;
                this._view.img_bg.height = 0;
                Tween.get(this._view.img_bg)
                    .delay(200)
                    .exec(Handler.alloc(this, function () {
                    _this._view.img_bg.visible = true;
                }))
                    .to({ height: 500 }, 200, null, Sine.easeIn);
            };
            BreakthroughTipsMdr2.prototype.removeBgTween = function () {
                Tween.remove(this._view.img_bg);
            };
            BreakthroughTipsMdr2.prototype.showGrpTween = function () {
                var _this = this;
                this._view.grp_show.visible = false;
                this._view.grp_show.x = 0;
                Tween.get(this._view.grp_show)
                    .delay(400)
                    .exec(Handler.alloc(this, function () {
                    _this._view.grp_show.visible = true;
                }))
                    .to({ x: 175 }, 200, null, Sine.easeIn);
            };
            BreakthroughTipsMdr2.prototype.removeGrpTween = function () {
                Tween.remove(this._view.grp_show);
            };
            BreakthroughTipsMdr2.prototype.showDescTween = function (grp, posX) {
                grp.visible = false;
                grp.x = 0;
                Tween.get(grp)
                    .delay(600)
                    .exec(Handler.alloc(this, function () {
                    grp.visible = true;
                }))
                    .to({ x: posX }, 200, null, Sine.easeIn);
            };
            BreakthroughTipsMdr2.prototype.removeDescTween = function () {
                Tween.remove(this._view.grp_desc1);
                Tween.remove(this._view.grp_desc2);
            };
            BreakthroughTipsMdr2.prototype.showSkillTween = function (skill) {
                skill.visible = false;
                skill.scaleX = skill.scaleY = 3;
                Tween.get(skill)
                    .delay(800)
                    .exec(Handler.alloc(this, function () {
                    skill.visible = true;
                }))
                    .to({ scaleX: 1, scaleY: 1 }, 200, null, Sine.easeIn);
            };
            BreakthroughTipsMdr2.prototype.removeSkillTween = function () {
                Tween.remove(this._view.skill1);
                Tween.remove(this._view.skill2);
            };
            BreakthroughTipsMdr2.prototype.showTipsTween = function () {
                var _this = this;
                this._view.closeTips.visible = false;
                Tween.get(this._view.closeTips)
                    .delay(1000)
                    .exec(Handler.alloc(this, function () {
                    _this._view.closeTips.visible = true;
                }));
            };
            BreakthroughTipsMdr2.prototype.removeTipsTween = function () {
                Tween.remove(this._view.closeTips);
            };
            BreakthroughTipsMdr2.prototype.showEffect = function () {
                this.removeEft();
                this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                this.addEftByParent("tips_bg" /* TipsBg */, this._view.grp_eft2);
            };
            return BreakthroughTipsMdr2;
        }(game.EffectMdrBase));
        mod.BreakthroughTipsMdr2 = BreakthroughTipsMdr2;
        __reflect(BreakthroughTipsMdr2.prototype, "game.mod.BreakthroughTipsMdr2");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Tween = base.Tween;
        var Handler = base.Handler;
        var Sine = base.Sine;
        /**
         * 升星成功
         * 参考 BreakthroughTipsMdr
         */
        var UpStarTipsMdr = /** @class */ (function (_super) {
            __extends(UpStarTipsMdr, _super);
            function UpStarTipsMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", mod.UpStarTipsView);
                _this.isEasyHide = true;
                return _this;
            }
            UpStarTipsMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
            };
            UpStarTipsMdr.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
            };
            UpStarTipsMdr.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this.updateShow();
                this.showTitleTween();
                this.showBgTween();
                this.showGrpStarlistTween();
                this.showDescTween(this._view.grp_desc1, 185);
                this.showDescTween(this._view.grp_desc2, 406);
                this.showSkillTween();
                this.showTipsTween();
                this.showEffect();
            };
            UpStarTipsMdr.prototype.onHide = function () {
                this.removeTitleTween();
                this.removeBgTween();
                this.removeGrpStarlistTween();
                this.removeDescTween();
                this.removeSkillTween();
                this.removeTipsTween();
                _super.prototype.onHide.call(this);
                _super.prototype.onHide.call(this);
            };
            UpStarTipsMdr.prototype.updateShow = function () {
                var lv = this._showArgs.star;
                var lastLv = lv - 1;
                //星级
                this._view.starListView1.updateStar(lastLv);
                this._view.starListView2.updateStar(lv);
                //属性文本
                if (this._showArgs.attrDesc0) {
                    this._view.lab_desc1.textFlow = game.TextUtil.parseHtml(this._showArgs.attrDesc0);
                    this._view.lab_desc2.textFlow = game.TextUtil.parseHtml(this._showArgs.attrDesc1);
                }
                //仙力，font字体
                if (this._showArgs.attrFont0) {
                    this._view.lab_desc1.text = '';
                    this._view.lab_desc2.text = '';
                    this.addBmpFont(this._showArgs.attrFont0, game.BmpTextCfg[201 /* CommonPower2 */], this._view.grp_lv1, true, 1.5, false, -3);
                    this.addBmpFont(this._showArgs.attrFont1, game.BmpTextCfg[201 /* CommonPower2 */], this._view.grp_lv2, true, 1.5, false, -3);
                }
            };
            UpStarTipsMdr.prototype.showTitleTween = function () {
                this._view.img_title.scaleX = this._view.img_title.scaleY = 7;
                Tween.get(this._view.img_title)
                    .to({ scaleX: 1, scaleY: 1 }, 200);
            };
            UpStarTipsMdr.prototype.removeTitleTween = function () {
                Tween.remove(this._view.img_title);
            };
            UpStarTipsMdr.prototype.showBgTween = function () {
                var _this = this;
                this._view.img_bg.visible = false;
                this._view.img_bg.height = 0;
                Tween.get(this._view.img_bg)
                    .delay(200)
                    .exec(Handler.alloc(this, function () {
                    _this._view.img_bg.visible = true;
                }))
                    .to({ height: 325 }, 200, null, Sine.easeIn);
            };
            UpStarTipsMdr.prototype.removeBgTween = function () {
                Tween.remove(this._view.img_bg);
            };
            UpStarTipsMdr.prototype.showGrpStarlistTween = function () {
                var _this = this;
                this._view.grp_starlist.visible = false;
                this._view.grp_starlist.x = 0;
                Tween.get(this._view.grp_starlist)
                    .delay(400)
                    .exec(Handler.alloc(this, function () {
                    _this._view.grp_starlist.visible = true;
                }))
                    .to({ x: 175 }, 200, null, Sine.easeIn);
            };
            UpStarTipsMdr.prototype.removeGrpStarlistTween = function () {
                Tween.remove(this._view.grp_starlist);
            };
            UpStarTipsMdr.prototype.showDescTween = function (grp, posX) {
                grp.visible = false;
                grp.x = 0;
                Tween.get(grp)
                    .delay(600)
                    .exec(Handler.alloc(this, function () {
                    grp.visible = true;
                }))
                    .to({ x: posX }, 200, null, Sine.easeIn);
            };
            UpStarTipsMdr.prototype.removeDescTween = function () {
                Tween.remove(this._view.grp_desc1);
                Tween.remove(this._view.grp_desc2);
            };
            UpStarTipsMdr.prototype.showSkillTween = function () {
            };
            UpStarTipsMdr.prototype.removeSkillTween = function () {
            };
            UpStarTipsMdr.prototype.showTipsTween = function () {
                var _this = this;
                this._view.closeTips.visible = false;
                Tween.get(this._view.closeTips)
                    .delay(1000)
                    .exec(Handler.alloc(this, function () {
                    _this._view.closeTips.visible = true;
                }));
            };
            UpStarTipsMdr.prototype.removeTipsTween = function () {
                Tween.remove(this._view.closeTips);
            };
            UpStarTipsMdr.prototype.showEffect = function () {
                this.removeEft();
                this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                this.addEftByParent("tips_bg" /* TipsBg */, this._view.grp_eft2);
            };
            return UpStarTipsMdr;
        }(game.EffectMdrBase));
        mod.UpStarTipsMdr = UpStarTipsMdr;
        __reflect(UpStarTipsMdr.prototype, "game.mod.UpStarTipsMdr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Tween = base.Tween;
        var Handler = base.Handler;
        var Sine = base.Sine;
        var UpStarTipsMdr2 = /** @class */ (function (_super) {
            __extends(UpStarTipsMdr2, _super);
            function UpStarTipsMdr2() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", mod.UpStarTipsView2);
                _this.isEasyHide = true;
                return _this;
            }
            UpStarTipsMdr2.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
                this._view.touchEnabled = false;
            };
            UpStarTipsMdr2.prototype.addListeners = function () {
                _super.prototype.addListeners.call(this);
            };
            UpStarTipsMdr2.prototype.onShow = function () {
                _super.prototype.onShow.call(this);
                this.updateShow();
                this.showTitleTween();
                this.showBgTween();
                this.showGrpStarlistTween();
                this.showGrpTween();
                this.showDescTween(this._view.grp_desc, 260);
                this.showSkillTween(this._view.skill);
                this.showTipsTween();
                this.showEffect();
            };
            UpStarTipsMdr2.prototype.onHide = function () {
                this.removeTitleTween();
                this.removeBgTween();
                this.removeGrpStarlistTween();
                this.removeGrpTween();
                this.removeDescTween();
                this.removeSkillTween();
                this.removeTipsTween();
                _super.prototype.onHide.call(this);
            };
            UpStarTipsMdr2.prototype.updateShow = function () {
                var lv = this._showArgs.star;
                var lastLv = lv - 1;
                //星级
                this._view.starListView1.updateStar(lastLv);
                this._view.starListView2.updateStar(lv);
                //技能
                var skillId = this._showArgs.skillId;
                this._view.skill.setData(skillId);
                var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                this._view.lab_name.text = cfg.name;
                this._view.lab_desc.textFlow = game.TextUtil.parseHtml(cfg.describe);
                //仙力
                if (this._showArgs.attrFont0) {
                    this._view.img_arrow.visible = true;
                    this.addBmpFont(this._showArgs.attrFont0, game.BmpTextCfg[201 /* CommonPower2 */], this._view.grp_lv1, true, 1.5, false, -3);
                    this.addBmpFont(this._showArgs.attrFont1, game.BmpTextCfg[201 /* CommonPower2 */], this._view.grp_lv2, true, 1.5, false, -3);
                }
                else {
                    this._view.img_arrow.visible = false;
                }
            };
            UpStarTipsMdr2.prototype.showTitleTween = function () {
                this._view.img_title.scaleX = this._view.img_title.scaleY = 7;
                Tween.get(this._view.img_title)
                    .to({ scaleX: 1, scaleY: 1 }, 200);
            };
            UpStarTipsMdr2.prototype.removeTitleTween = function () {
                Tween.remove(this._view.img_title);
            };
            UpStarTipsMdr2.prototype.showBgTween = function () {
                var _this = this;
                this._view.img_bg.visible = false;
                this._view.img_bg.height = 0;
                Tween.get(this._view.img_bg)
                    .delay(200)
                    .exec(Handler.alloc(this, function () {
                    _this._view.img_bg.visible = true;
                }))
                    .to({ height: 420 }, 200, null, Sine.easeIn);
            };
            UpStarTipsMdr2.prototype.removeBgTween = function () {
                Tween.remove(this._view.img_bg);
            };
            UpStarTipsMdr2.prototype.showGrpTween = function () {
                var _this = this;
                this._view.grp_show.visible = false;
                this._view.grp_show.x = 0;
                Tween.get(this._view.grp_show)
                    .delay(400)
                    .exec(Handler.alloc(this, function () {
                    _this._view.grp_show.visible = true;
                }))
                    .to({ x: 135 }, 200, null, Sine.easeIn);
            };
            UpStarTipsMdr2.prototype.removeGrpTween = function () {
                Tween.remove(this._view.grp_show);
            };
            UpStarTipsMdr2.prototype.showGrpStarlistTween = function () {
                var _this = this;
                this._view.grp_starlist.visible = false;
                this._view.grp_starlist.x = 0;
                Tween.get(this._view.grp_starlist)
                    .delay(400)
                    .exec(Handler.alloc(this, function () {
                    _this._view.grp_starlist.visible = true;
                }))
                    .to({ x: 163 }, 200, null, Sine.easeIn);
            };
            UpStarTipsMdr2.prototype.removeGrpStarlistTween = function () {
                Tween.remove(this._view.grp_starlist);
            };
            UpStarTipsMdr2.prototype.showDescTween = function (grp, posX) {
                grp.visible = false;
                grp.x = 0;
                Tween.get(grp)
                    .delay(600)
                    .exec(Handler.alloc(this, function () {
                    grp.visible = true;
                }))
                    .to({ x: posX }, 200, null, Sine.easeIn);
            };
            UpStarTipsMdr2.prototype.removeDescTween = function () {
                Tween.remove(this._view.grp_desc);
            };
            UpStarTipsMdr2.prototype.showSkillTween = function (skill) {
                skill.visible = false;
                skill.scaleX = skill.scaleY = 3;
                Tween.get(skill)
                    .delay(800)
                    .exec(Handler.alloc(this, function () {
                    skill.visible = true;
                }))
                    .to({ scaleX: 1, scaleY: 1 }, 200, null, Sine.easeIn);
            };
            UpStarTipsMdr2.prototype.removeSkillTween = function () {
                Tween.remove(this._view.skill);
            };
            UpStarTipsMdr2.prototype.showTipsTween = function () {
                var _this = this;
                this._view.closeTips.visible = false;
                Tween.get(this._view.closeTips)
                    .delay(1000)
                    .exec(Handler.alloc(this, function () {
                    _this._view.closeTips.visible = true;
                }));
            };
            UpStarTipsMdr2.prototype.removeTipsTween = function () {
                Tween.remove(this._view.closeTips);
            };
            UpStarTipsMdr2.prototype.showEffect = function () {
                this.removeEft();
                this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                this.addEftByParent("tips_bg" /* TipsBg */, this._view.grp_eft2);
            };
            return UpStarTipsMdr2;
        }(game.EffectMdrBase));
        mod.UpStarTipsMdr2 = UpStarTipsMdr2;
        __reflect(UpStarTipsMdr2.prototype, "game.mod.UpStarTipsMdr2");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Handler = base.Handler;
        var Tween = base.Tween;
        var ProgressBarComp = /** @class */ (function (_super) {
            __extends(ProgressBarComp, _super);
            function ProgressBarComp() {
                var _this = _super.call(this) || this;
                _this.isFirst = true; //首次进入
                _this._onceCallback = null; //一次完成的回调
                _this.touchChildren = false;
                _this.touchEnabled = false;
                return _this;
            }
            ProgressBarComp.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.initBar();
            };
            ProgressBarComp.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
                var self = this;
                if (self.progressBar) {
                    self.progressBar.hide();
                    this.progressBar = null;
                }
                this.isFirst = true;
                this.checkRemoveEff();
            };
            ProgressBarComp.prototype.initBar = function () {
                var self = this;
                if (!self.progressBar) {
                    self.thumb.width = self.width;
                    if (self.thumb_preview) {
                        self.thumb_preview.width = 0;
                    }
                    self.progressBar = new game.ProgressBarMdr(self.thumb, self.labelDisplay, 1 /* Value */, self.gr_eft);
                    self.progressBar.finallyCallBack = Handler.alloc(self, self.finallyCallBack);
                    self.progressBar.onceCallBack = Handler.alloc(self, self.onceCallBack);
                }
            };
            ProgressBarComp.prototype.checkRemoveEff = function () {
                var self = this;
                if (self.effIdx) {
                    self.removeEffect(self.effIdx);
                    self.effIdx = null;
                }
            };
            ProgressBarComp.prototype.finallyCallBack = function () {
                var self = this;
                self.thumb.width = 0;
                if (self.thumb_preview) {
                    self.thumb_preview.width = 0;
                }
                //self.gr_eft && (this.gr_eft.x = -30);
            };
            ProgressBarComp.prototype.onceCallBack = function () {
                if (this._onceCallback) {
                    this._onceCallback.exec();
                }
            };
            ProgressBarComp.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                this.show(this.data.value, this.data.max);
            };
            /**显示进度
             * type:文本类型，具体数值或者百分比
             * tweenTime: Tween时间
             * */
            ProgressBarComp.prototype.show = function (value, max, tween, lv, isEff, type, onceCallback, tweenTime) {
                if (tween === void 0) { tween = !this.isFirst; }
                if (lv === void 0) { lv = 0; }
                if (isEff === void 0) { isEff = true; }
                if (type === void 0) { type = 1 /* Value */; }
                /**显示特效*/
                this.initBar();
                if (onceCallback) {
                    this._onceCallback = onceCallback;
                }
                if (!this.effIdx && isEff) {
                    this.effIdx = this.addEftByParent("jindutiao" /* ProgressEft */, this.gr_eft);
                }
                if (!tween) {
                    this.progressBar.hide();
                }
                if (type != undefined) {
                    this.progressBar.type = type;
                }
                this.progressBar.show(value, max, tween, lv, tweenTime);
                this._max = max;
                this.isFirst = false;
            };
            /**显示进度预览*/
            ProgressBarComp.prototype.showPreview = function (value) {
                var self = this;
                var tweenWidth = Math.min(value / this._max * self.width, self.width);
                Tween.remove(this.thumb_preview);
                Tween.get(this.thumb_preview)
                    .to({ width: tweenWidth }, 300);
                self.labelDisplay.text = value + "/" + this._max;
            };
            /**显示已满级*/
            ProgressBarComp.prototype.showMax = function () {
                this.progressBar.showMax();
                this.checkRemoveEff();
            };
            ProgressBarComp.prototype.showLabel = function (str) {
                this.labelDisplay.textFlow = game.TextUtil.parseHtml(str);
            };
            return ProgressBarComp;
        }(mod.BaseRenderer));
        mod.ProgressBarComp = ProgressBarComp;
        __reflect(ProgressBarComp.prototype, "game.mod.ProgressBarComp");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Handler = base.Handler;
        var Tween = base.Tween;
        var BitmapFillMode = egret.BitmapFillMode;
        var CommonProgressBar = /** @class */ (function (_super) {
            __extends(CommonProgressBar, _super);
            function CommonProgressBar() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.tweenTime = 200;
                _this.maxTip = "";
                _this._lastValue = 0;
                _this._lastMax = 0;
                _this._lastLv = 0;
                return _this;
            }
            CommonProgressBar.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
                var self = this;
                if (!self.maxRate) {
                    self.maxRate = self.width;
                }
            };
            CommonProgressBar.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                var self = this;
                self.setThumbSrc();
                self.setThumbSrcType();
            };
            CommonProgressBar.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
                this.clearProData();
            };
            Object.defineProperty(CommonProgressBar.prototype, "thumbSrc", {
                //进度条UI
                get: function () {
                    return this._thumbSrc;
                },
                set: function (v) {
                    var self = this;
                    self._thumbSrc = v;
                    self.setThumbSrc();
                },
                enumerable: true,
                configurable: true
            });
            CommonProgressBar.prototype.setThumbSrc = function () {
                var self = this;
                if (self.thumb && self._thumbSrc) {
                    self.thumb.source = self._thumbSrc;
                }
            };
            Object.defineProperty(CommonProgressBar.prototype, "thumbSrcType", {
                //填充模式
                get: function () {
                    return this._thumbSrcType;
                },
                set: function (v) {
                    var self = this;
                    self._thumbSrcType = v;
                    self.setThumbSrcType();
                },
                enumerable: true,
                configurable: true
            });
            CommonProgressBar.prototype.setThumbSrcType = function () {
                var self = this;
                if (self.thumb && self._thumbSrcType == 1) {
                    self.thumb.fillMode = BitmapFillMode.REPEAT;
                }
            };
            /**
             * 绑定回调
             * @param {base.Handler} full 每次满回调
             * @param {base.Handler} over 结束回调
             */
            CommonProgressBar.prototype.setProHandler = function (full, over) {
                var self = this;
                self.fullHandler = full;
                self.overHandler = over;
            };
            /**
             * 赋值
             * @param {number} val
             * @param {number} max
             * @param {boolean} isTween
             * @param {number} lv，当前等级，当上下级的最大进度一致时需要用等级区分上下级
             */
            CommonProgressBar.prototype.setProValue = function (val, max, isTween, lv) {
                if (isTween === void 0) { isTween = true; }
                if (lv === void 0) { lv = 0; }
                var self = this;
                if (!self._lastMax || !isTween) {
                    self.setOverShow(val, max || self._lastValue, lv);
                }
                else {
                    if (!self._record) {
                        self._record = [[val, max || self._lastMax, lv]];
                    }
                    else {
                        self._record.push([val, max || self._lastMax, lv]);
                        if (self.maxTimes && self._record.length > self.maxTimes) {
                            self._record.shift();
                        }
                    }
                    if (!self._isTweening) {
                        self._isTweening = true;
                        self.showRecordInfo();
                    }
                }
            };
            /**
             * 清除数据
             */
            CommonProgressBar.prototype.clearProData = function () {
                var self = this;
                self._isTweening = false;
                self._lastValue = self._lastMax = self._lastLv = 0;
                self.fullHandler = self.overHandler = self._record = null;
                Tween.remove(self.thumb);
            };
            //进度条动画
            CommonProgressBar.prototype.showProTween = function (val, max, isNext, lv) {
                var self = this;
                var _w = self.maxRate * (max > 0 ? Math.min(1, val / max) : 1);
                Tween.get(self.thumb)
                    .to({ width: isNext ? self.maxRate : _w }, self.tweenTime)
                    .exec(Handler.alloc(self, isNext ? self.fullToShowNext : self.checkToShowNext, [val, max, lv]));
            };
            CommonProgressBar.prototype.fullToShowNext = function (val, max, lv) {
                var self = this;
                self.setOverShow(0, max, lv);
                self.showProTween(val, max, false, lv);
                // facade.sendNt(MainEvent.ON_COMMON_PROGRESS_BAR_FULL_TIPS);
            };
            CommonProgressBar.prototype.checkToShowNext = function (val, max, lv) {
                var self = this;
                self.setOverShow(val, max, lv);
                if (!self._record.length) {
                    self._isTweening = false;
                    if (self.overHandler) {
                        self.overHandler.exec();
                    }
                    return;
                }
                self.showRecordInfo();
            };
            CommonProgressBar.prototype.showRecordInfo = function () {
                var self = this;
                var _show = self._record.shift();
                var _isNext = _show[1] != self._lastMax || _show[0] < self._lastValue || _show[2] != self._lastLv;
                self.showProTween(_show[0], _show[1], _isNext, _show[2]);
            };
            CommonProgressBar.prototype.setOverShow = function (val, max, lv) {
                var self = this;
                self._lastMax = max;
                self._lastValue = val;
                self._lastLv = lv;
                self.labelDisplay.text = max > 0 ? val + "/" + max : self.maxTip;
                self.thumb.width = self.maxRate * (max > 0 ? Math.min(1, val / max) : 1);
                if (val == max && self.fullHandler) {
                    self.fullHandler.exec();
                }
            };
            return CommonProgressBar;
        }(mod.BaseRenderer));
        mod.CommonProgressBar = CommonProgressBar;
        __reflect(CommonProgressBar.prototype, "game.mod.CommonProgressBar");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TouchEvent = egret.TouchEvent;
        var Head = /** @class */ (function (_super) {
            __extends(Head, _super);
            function Head() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Head.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this.addEventListener(TouchEvent.TOUCH_TAP, this.onClickHead, this);
            };
            Head.prototype.onRemoveFromStage = function () {
                _super.prototype.onRemoveFromStage.call(this);
                this.clearHeadEft();
                this.clearFrameEft();
                this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickHead, this);
            };
            Head.prototype.onClickHead = function () {
                if (!this._roleId) {
                    return;
                }
                mod.ViewMgr.getIns().showRoleTips(this._roleId, this._serverId, this._isRobot);
            };
            /**
             * 通用头像组件显示
             * @param head  头像idx
             * @param frame 头像框idx
             * @param sex 性别
             * @param roleId，玩家角色id(传这个参数时候，表示该头像可点击查看玩家信息)
             * @param serverId，玩家服务器id
             * @param isRobot，是否机器人
             */
            Head.prototype.updateHeadShow = function (head, frame, sex, roleId, serverId, isRobot) {
                if (sex === void 0) { sex = 1; }
                if (head instanceof Long) {
                    head = head.toNumber();
                }
                if (frame instanceof Long) {
                    frame = frame.toNumber();
                }
                this.setDressShow(head, 1 /* Head */, sex);
                this.setDressShow(frame, 2 /* Frame */);
                this._roleId = roleId;
                this._serverId = serverId;
                this._isRobot = isRobot;
            };
            /**默认显示问号头像*/
            Head.prototype.defaultHeadShow = function () {
                this.updateHeadShow(0, 0, 0);
            };
            Head.prototype.updateBossHeadShow = function (head, frame) {
                if (head instanceof Long) {
                    head = head.toNumber();
                }
                if (frame instanceof Long) {
                    frame = frame.toNumber();
                }
                // this.setDressShow(head, DressUpType.Head);
                this.setDressShow(frame, 2 /* Frame */);
                var img = this.img_head;
                var cfg = game.getConfigByNameId("monster1.json" /* Monster */, head);
                img.source = cfg.res_id;
            };
            Head.prototype.updateImgHeadShow = function (img) {
                this.img_head.source = img;
            };
            Head.prototype.updateHeadMask = function (headmask) {
                this.img_headmask.source = headmask;
            };
            /**显示自己的头像*/
            Head.prototype.updateMyHead = function () {
                var vo = game.RoleVo.ins;
                this.updateHeadShow(vo.head, vo.head_frame, vo.sex);
            };
            Head.prototype.setDressShow = function (idx, type, sex) {
                this.setDressIconShow(idx, type, sex);
            };
            Head.prototype.setDressIconShow = function (idx, type, sex) {
                if (sex === void 0) { sex = null; }
                var img = type == 1 /* Head */ ? this.img_head : this.img_frame;
                if (idx == 0) {
                    var nullStr = type == 1 /* Head */ ? "lttx_shishui" : "ltxk_yuanshi";
                    img.source = game.ResUtil.getDressUpIcon(nullStr);
                    return;
                }
                img.source = game.ResUtil.getDressUpIcon(idx, sex);
            };
            Head.prototype.clearHeadEft = function () {
                if (this._headEftId) {
                    this.removeEffect(this._headEftId);
                    this._headEftId = null;
                }
            };
            Head.prototype.clearFrameEft = function () {
                if (this._frameEftId) {
                    this.removeEffect(this._frameEftId);
                    this._frameEftId = null;
                }
            };
            return Head;
        }(mod.BaseRenderer));
        mod.Head = Head;
        __reflect(Head.prototype, "game.mod.Head");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var HeadHP = /** @class */ (function (_super) {
            __extends(HeadHP, _super);
            function HeadHP() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.CommonHeadHPSkin";
                return _this;
            }
            HeadHP.prototype.updateMyHead = function () {
                this.head.updateMyHead();
                this.lab_name.text = game.RoleVo.ins.name;
            };
            HeadHP.prototype.updateShow = function (info) {
                this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
                this.lab_name.text = info.name;
            };
            HeadHP.prototype.updateHP = function (value) {
                this.progress.show(value, 10000, false, 0, false, 0 /* Percent */);
            };
            return HeadHP;
        }(mod.BaseRenderer));
        mod.HeadHP = HeadHP;
        __reflect(HeadHP.prototype, "game.mod.HeadHP");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var HeadKillView = /** @class */ (function (_super) {
            __extends(HeadKillView, _super);
            function HeadKillView() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.CommonHeadKillSkin";
                return _this;
            }
            /**
             * 更新击杀提示
             * @param msgInfo
             */
            HeadKillView.prototype.updateShow = function (msgInfo) {
                if (!msgInfo) {
                    this.visible = false;
                    return;
                }
                if (msgInfo.kill_info) {
                    var info = msgInfo.kill_info;
                    this.img_head0.source = game.ResUtil.getDressUpIcon(info.head.toNumber(), info.sex || 1);
                    this.lab_name0.text = info && info.name || '';
                    this.lab_name0.textColor = 0x35bfe6;
                }
                if (msgInfo.be_kill_info) {
                    var info = msgInfo.be_kill_info;
                    this.img_head1.source = game.ResUtil.getDressUpIcon(info.head.toNumber(), info.sex || 1);
                    this.lab_name1.text = info && info.name || '';
                    this.lab_name1.textColor = 0xff574c;
                }
                this.img_kill.source = "kuafu_doufa_kill_tips" + Math.min(msgInfo.kill_num, 5);
            };
            return HeadKillView;
        }(eui.Component));
        mod.HeadKillView = HeadKillView;
        __reflect(HeadKillView.prototype, "game.mod.HeadKillView");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var HeadMvp = /** @class */ (function (_super) {
            __extends(HeadMvp, _super);
            function HeadMvp() {
                var _this = _super.call(this) || this;
                _this._defaultStr = "积分：%s";
                _this._defaultMvp = "mvp2";
                _this.skinName = "skins.common.CommonHeadMvpSkin";
                return _this;
            }
            HeadMvp.prototype.updateMvp = function (data) {
                if (!data) {
                    this.currentState = "2";
                    this.head.defaultHeadShow();
                    return;
                }
                this.currentState = "1";
                var info = data.info;
                this.head.updateShow(info.head, info.head_frame, info.sex, info.vip, info.role_id);
                this.lab_name.text = info.name;
                var power = info.showpower && info.showpower.toNumber() || 0;
                this.lab_power.textFlow = game.TextUtil.parseHtml(game.StringUtil.getPowerNumStr(power));
                var value = game.TextUtil.addColor("" + info.value, "0xeca240");
                var str = game.StringUtil.substitute(data.countStr || this._defaultStr, [value]);
                this.lab_count.textFlow = game.TextUtil.parseHtml(str);
                if (this.img_title) {
                    this.img_title.source = data.title || this._defaultMvp;
                }
            };
            return HeadMvp;
        }(mod.BaseRenderer));
        mod.HeadMvp = HeadMvp;
        __reflect(HeadMvp.prototype, "game.mod.HeadMvp");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var HeadVip = /** @class */ (function (_super) {
            __extends(HeadVip, _super);
            function HeadVip() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.CommonHeadVipSkin";
                return _this;
            }
            /**
             * 更新显示
             * @param head  头像idx
             * @param frame 头像框idx
             * @param sex 性别
             * @param vipId vipId
             * @param roleId，玩家角色id(传这个参数时候，表示该头像可点击查看玩家信息)
             * @param serverId，玩家服务器id
             * @param isRobot，是否机器人
             */
            HeadVip.prototype.updateShow = function (head, frame, sex, vipId, roleId, serverId, isRobot) {
                if (sex === void 0) { sex = 1; }
                if (vipId === void 0) { vipId = 0; }
                this.head.updateHeadShow(head, frame, sex, roleId, serverId, isRobot);
                this.grp_name.visible = false;
                this.grp_vip.visible = true;
                this.addBmpFont(mod.VipUtil.getVipFont(vipId), game.BmpTextCfg[212 /* VipFont */], this.gr_vipLv, true, 1, true);
            };
            /**默认显示问号头像*/
            HeadVip.prototype.defaultHeadShow = function () {
                this.updateShow(0, 0, 0);
            };
            /**显示自己的头像*/
            HeadVip.prototype.updateMyHead = function () {
                var vo = game.RoleVo.ins;
                this.updateShow(vo.head, vo.head_frame, vo.sex, vo.vip_lv);
            };
            /**显示带名字的头像，不显示VIP*/
            HeadVip.prototype.updateName = function (head, frame, sex, nameStr) {
                this.head.updateHeadShow(head, frame, sex);
                this.grp_name.visible = true;
                this.grp_vip.visible = false;
                this.img_name.source = nameStr;
            };
            HeadVip.prototype.updateHeadMask = function (headmask) {
                this.head.updateHeadMask(headmask);
            };
            return HeadVip;
        }(mod.BaseRenderer));
        mod.HeadVip = HeadVip;
        __reflect(HeadVip.prototype, "game.mod.HeadVip");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TimeMgr = base.TimeMgr;
        var EventDispatcher = egret.EventDispatcher;
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var Group = eui.Group;
        var SceneInUI = /** @class */ (function (_super) {
            __extends(SceneInUI, _super);
            function SceneInUI() {
                var _this = _super.call(this) || this;
                _this.init();
                return _this;
            }
            Object.defineProperty(SceneInUI.prototype, "dispatcher", {
                get: function () {
                    return this._dispatcher;
                },
                enumerable: true,
                configurable: true
            });
            SceneInUI.prototype.init = function () {
                this._dispatcher = new EventDispatcher();
                this.initDsp();
            };
            SceneInUI.prototype.initDsp = function () {
                var self = this;
                self.touchEnabled = true;
                self._layerDown = self.addLayer(DisplayObjectContainer, "_layerDown");
                self._layerAvatar = self.addLayer(DisplayObjectContainer, "_layerAvatar");
                self._layerEffect = self.addLayer(DisplayObjectContainer, "_layerEffect");
                if (!self._ctrl) {
                    var ctrl = new mod.SceneInUICtrl();
                    this.initScene(ctrl);
                }
            };
            SceneInUI.prototype.addLayer = function (cls, name) {
                var s = new cls();
                s.name = name;
                s.touchEnabled = s.touchChildren = false;
                this.addChild(s);
                return s;
            };
            SceneInUI.prototype.initScene = function (ctrl) {
                var self = this;
                self._ctrl = ctrl;
                self._ctrl.init(self);
                self._layerAvatar.touchChildren = true;
                TimeMgr.addUpdateItem(self);
                self.onStageResize();
            };
            SceneInUI.prototype.clean = function () {
                TimeMgr.removeUpdateItem(this);
                this._ctrl.clean();
                this._ctrl = null;
            };
            SceneInUI.prototype.onStageResize = function () {
                //this._camera.onResize(gso.gameStage.stageWidth, gso.gameStage.stageHeight);
            };
            SceneInUI.prototype.addAvatar = function (obj) {
                this._layerAvatar.addChild(obj.dsp);
            };
            SceneInUI.prototype.removeAvatar = function (obj) {
                if (obj && obj.dsp && obj.dsp.parent) {
                    this._layerAvatar.removeChild(obj.dsp);
                }
            };
            SceneInUI.prototype.sortAvatar = function () {
                this._layerAvatar.$children.sort(function (a, b) {
                    return a.y - b.y;
                });
            };
            SceneInUI.prototype.addBottomChild = function (obj) {
                this._layerDown.addChild(obj);
            };
            SceneInUI.prototype.removeBottomChild = function (obj) {
                if (obj && obj.parent) {
                    this._layerDown.removeChild(obj);
                }
            };
            SceneInUI.prototype.addEftChild = function (obj) {
                this._layerEffect.addChild(obj);
            };
            SceneInUI.prototype.removeEftChild = function (obj) {
                if (obj && obj.parent) {
                    this._layerEffect.removeChild(obj);
                }
            };
            SceneInUI.prototype.update = function (time) {
                if (this._ctrl) {
                    this._ctrl.update(time);
                }
            };
            Object.defineProperty(SceneInUI.prototype, "layerDown", {
                get: function () {
                    return this._layerDown;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneInUI.prototype, "layerEffect", {
                get: function () {
                    return this._layerEffect;
                },
                enumerable: true,
                configurable: true
            });
            return SceneInUI;
        }(Group));
        mod.SceneInUI = SceneInUI;
        __reflect(SceneInUI.prototype, "game.mod.SceneInUI", ["base.UpdateItem"]);
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TimeMgr = base.TimeMgr;
        /** EDIT BY YULIANG */
        var SceneInUICtrl = /** @class */ (function () {
            function SceneInUICtrl() {
                this._avatarDict = Object.create(null);
            }
            SceneInUICtrl.prototype.init = function (scene) {
                this._scene = scene;
            };
            SceneInUICtrl.prototype.addAvatar = function (avatar, avatar_key) {
                if (this._avatarDict[avatar_key]) {
                    return;
                }
                this._avatarDict[avatar_key] = avatar;
                this._scene.addAvatar(avatar);
            };
            SceneInUICtrl.prototype.removeAvatar = function (avatar_key) {
                var tar_avatar = this._avatarDict[avatar_key];
                if (!tar_avatar) {
                    return;
                }
                this._scene.removeAvatar(tar_avatar);
                delete this._avatarDict[avatar_key];
            };
            SceneInUICtrl.prototype.clean = function () {
                for (var key in this._avatarDict) {
                    var tmp_avatar = this._avatarDict[key];
                    this._scene.removeAvatar(tmp_avatar);
                }
                this._avatarDict = Object.create(null);
                this._scene = null;
            };
            SceneInUICtrl.prototype.update = function (time) {
                for (var key in this._avatarDict) {
                    var tmp_avatar = this._avatarDict[key];
                    var advTime = TimeMgr.getElapseTime(this);
                    tmp_avatar.advanceTime(advTime);
                }
            };
            return SceneInUICtrl;
        }());
        mod.SceneInUICtrl = SceneInUICtrl;
        __reflect(SceneInUICtrl.prototype, "game.mod.SceneInUICtrl");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var Texture = egret.Texture;
        var Bitmap = egret.Bitmap;
        var Pool = base.Pool;
        var Handler = base.Handler;
        var BlurRatio = 20;
        var SceneInUIMap = /** @class */ (function (_super) {
            __extends(SceneInUIMap, _super);
            function SceneInUIMap() {
                var _this = _super.call(this) || this;
                _this._mapId = 0;
                _this._sliceW = 0;
                _this._sliceH = 0;
                _this._bmpMap = {};
                _this._curShow = [];
                return _this;
            }
            SceneInUIMap.prototype.init = function (mapId, map_params) {
                this._mapId = mapId;
                this._mapWidth = map_params[0];
                this._mapHeight = map_params[1];
                this._sliceW = map_params[2];
                this._sliceH = map_params[3];
                this._sliceCol = this._mapWidth / this._sliceW;
                this._sliceRow = this._mapHeight / this._sliceH;
            };
            SceneInUIMap.prototype.setBlur = function (texture) {
                texture.disposeBitmapData = false;
                var blur = Pool.alloc(Texture);
                blur.bitmapData = texture.bitmapData;
                this._blur = blur;
                for (var _i = 0, _a = this._curShow; _i < _a.length; _i++) {
                    var id = _a[_i];
                    this.updateBlur(id);
                }
            };
            SceneInUIMap.prototype.updateTiles = function (sc, sr, ec, er) {
                if (this._mapId == 0) {
                    return;
                }
                if (sc < 0) {
                    sc = 0;
                }
                if (sr < 0) {
                    sr = 0;
                }
                if (ec > this._sliceCol) {
                    ec = this._sliceCol;
                }
                if (er > this._sliceRow) {
                    er = this._sliceRow;
                }
                if (this._curSC == sc && this._curSR == sr && this._curEC == ec && this._curER == er) {
                    return;
                }
                this._curSC = sc;
                this._curSR = sr;
                this._curEC = ec;
                this._curER = er;
                this._curShow.length = 0;
                for (var c = sc; c < ec; c++) {
                    for (var r = sr; r < er; r++) {
                        this._curShow.push(SceneInUIMap.getSliceId(c, r));
                    }
                }
                SceneInUIMap.centerCol = sc - (ec - sc) / 2 - 1;
                SceneInUIMap.centerRow = sr - (er - sr) / 2 - 1;
                this._curShow = this._curShow.sort(SceneInUIMap.sortId).reverse();
                for (var key in this._bmpMap) {
                    if (this._curShow.indexOf(parseInt(key)) == -1) {
                        Pool.release(this._bmpMap[key]);
                        this._bmpMap[key] = null;
                    }
                }
                for (var i = 0, n = this._curShow.length; i < n; i++) {
                    this.loadOne(this._curShow[i]);
                }
            };
            SceneInUIMap.prototype.loadOne = function (id) {
                var bmp = this._bmpMap[id];
                if (!bmp) {
                    bmp = Pool.alloc(MapBmp);
                    var col = SceneInUIMap.getCol(id);
                    var row = SceneInUIMap.getRow(id);
                    bmp.x = col * this._sliceW;
                    bmp.y = row * this._sliceH;
                    bmp.setIdx(col, row, this._mapId);
                    this._bmpMap[id] = bmp;
                    this.addChild(bmp);
                    this.updateBlur(id);
                }
            };
            SceneInUIMap.prototype.updateBlur = function (id) {
                if (!this._blur) {
                    return;
                }
                var bmp = this._bmpMap[id];
                if (!bmp) {
                    return;
                }
                var col = SceneInUIMap.getCol(id);
                var row = SceneInUIMap.getRow(id);
                var blur = Pool.alloc(Texture);
                blur.disposeBitmapData = false;
                if (this._blur && this._blur.bitmapData) {
                    blur._setBitmapData(this._blur.bitmapData);
                }
                var ratio = BlurRatio;
                var tx = col * this._sliceW / ratio;
                var ty = row * this._sliceH / ratio;
                var tw = this._sliceW / ratio;
                var th = this._sliceH / ratio;
                blur.$initData(this._blur.$bitmapX + tx, this._blur.$bitmapY + ty, tw, th, 0, 0, tw, th, this._blur.$sourceWidth, this._blur.$sourceHeight);
                bmp.setBlur(blur);
            };
            SceneInUIMap.prototype.clean = function () {
                var self = this;
                self._mapId = self._sliceW = self._sliceH = 0;
                Pool.release(self._blur);
                self._blur = null;
                self._curSC = self._curSR = self._curEC = self._curER = 0;
                for (var key in self._bmpMap) {
                    Pool.release(self._bmpMap[key]);
                    self._bmpMap[key] = null;
                }
                self._curShow.length = 0;
            };
            SceneInUIMap.getSliceId = function (col, row) {
                return ((row + this.NRM) << this.ROW_SHIFT) + (col + this.NRM);
            };
            SceneInUIMap.getCol = function (sliceId) {
                return (sliceId & this.LOW_WORD) - this.NRM;
            };
            SceneInUIMap.getRow = function (sliceId) {
                return (sliceId >> this.ROW_SHIFT) - this.NRM;
            };
            SceneInUIMap.sortId = function (id1, id2) {
                var self = SceneInUIMap;
                var ca = self.getCol(id1) - self.centerCol;
                var ra = self.getRow(id1) - self.centerRow;
                var cb = self.getCol(id2) - self.centerCol;
                var rb = self.getRow(id2) - self.centerRow;
                var distA = ca * ca + ra * ra;
                var distB = cb * cb + rb * rb;
                if (distA < distB) {
                    return 1;
                }
                else if (distA > distB) {
                    return -1;
                }
                return 0;
            };
            SceneInUIMap.ROW_SHIFT = 16;
            SceneInUIMap.LOW_WORD = 0xFFFF;
            SceneInUIMap.NRM = 1; // 0移位后还是0所以加1
            return SceneInUIMap;
        }(DisplayObjectContainer));
        mod.SceneInUIMap = SceneInUIMap;
        __reflect(SceneInUIMap.prototype, "game.mod.SceneInUIMap");
        var MapBmp = /** @class */ (function (_super) {
            __extends(MapBmp, _super);
            function MapBmp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MapBmp.prototype.setIdx = function (c, r, mapId) {
                var url = game.ResUtil.getMapBmpUrl(mapId, c, r);
                if (this._url == url) {
                    return;
                }
                this.removeCur();
                this._url = url;
                game.LoadMgr.ins.addRef(url);
                game.LoadMgr.ins.load(this._url, Handler.alloc(this, this.onLoaded), game.LoadPri.Init);
            };
            MapBmp.prototype.setBlur = function (blur) {
                if (this.texture) {
                    return;
                }
                this._blur = blur;
                this.texture = blur;
                this.scaleX = this.scaleY = BlurRatio;
            };
            MapBmp.prototype.onLoaded = function (data, url) {
                if (this._url != url) {
                    return;
                }
                this.removeBlur();
                this.texture = data;
            };
            MapBmp.prototype.removeBlur = function () {
                this.scaleX = this.scaleY = 1;
                this.texture = null;
                Pool.release(this._blur);
                this._blur = null;
            };
            MapBmp.prototype.removeCur = function () {
                this.removeBlur();
                if (this._url) {
                    game.LoadMgr.ins.decRef(this._url);
                }
                this._url = undefined;
            };
            MapBmp.prototype.dispose = function () {
                this.onRelease();
            };
            MapBmp.prototype.onAlloc = function () {
            };
            MapBmp.prototype.onRelease = function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                this.removeCur();
            };
            return MapBmp;
        }(Bitmap));
        __reflect(MapBmp.prototype, "MapBmp", ["base.PoolObject", "base.DisposeObject"]);
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var UISceneObj = /** @class */ (function (_super) {
            __extends(UISceneObj, _super);
            function UISceneObj() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UISceneObj.prototype.update = function (time) {
                // 子类实现
            };
            return UISceneObj;
        }(mod.BaseRenderer));
        mod.UISceneObj = UISceneObj;
        __reflect(UISceneObj.prototype, "game.mod.UISceneObj");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var facade = base.facade;
    var ViewMgr = game.mod.ViewMgr;
    var ActivityUtil = /** @class */ (function () {
        function ActivityUtil() {
        }
        ActivityUtil.getType = function () {
            var proxy = facade.retMod("27" /* Activity */).retProxy(242 /* PunshList */);
            return proxy.type;
        };
        ActivityUtil.getOpenIdx = function (type) {
            var proxy = facade.retMod("27" /* Activity */).retProxy(242 /* PunshList */);
            return proxy.getOpenIdx(type);
        };
        ActivityUtil.checkOpen = function (type) {
            if (type === void 0) { type = this.getType(); }
            if (!type) {
                return false;
            }
            var openIdx = this.getOpenIdx(type);
            return ViewMgr.getIns().checkViewOpen(openIdx) && ViewMgr.getIns().checkViewOpen(1041670203 /* PunshList */);
        };
        ActivityUtil.getRoleType = function () {
            var proxy = facade.retMod("27" /* Activity */).retProxy(242 /* PunshList */);
            return proxy.roleType;
        };
        ActivityUtil.checkRoleType = function () {
            var type = this.getType();
            if (!type) {
                return false;
            }
            var types = this.getRoleType();
            return types.indexOf(type) > -1;
        };
        ActivityUtil.getSurfaceType = function () {
            var proxy = facade.retMod("27" /* Activity */).retProxy(242 /* PunshList */);
            return proxy.surfaceType;
        };
        ActivityUtil.checkSurfaceType = function () {
            var type = this.getType();
            if (!type) {
                return false;
            }
            var types = this.getSurfaceType();
            return types.indexOf(type) > -1;
        };
        ActivityUtil.getPunshListEndTime = function () {
            var proxy = facade.retMod("27" /* Activity */).retProxy(242 /* PunshList */);
            return proxy.getEndTime();
        };
        ActivityUtil.getRankTypeByOpenIdx = function (openIdx) {
            var proxy = facade.retMod("27" /* Activity */).retProxy(242 /* PunshList */);
            return proxy.getRankTypeByOpenIdx(openIdx);
        };
        ActivityUtil.getOpenIdxs = function () {
            var proxy = facade.retMod("27" /* Activity */).retProxy(242 /* PunshList */);
            return proxy.openIdxs;
        };
        ActivityUtil.getSurfaceHintNodes = function (type) {
            var proxy = facade.retMod("27" /* Activity */).retProxy(242 /* PunshList */);
            return proxy.getSurfaceHintNodes(type);
        };
        ActivityUtil.getRankFirst = function () {
            var proxy = facade.retMod("27" /* Activity */).retProxy(242 /* PunshList */);
            return proxy.getRankFirst();
        };
        ActivityUtil.getFirstChargeCacheTimes = function () {
            var proxy = facade.retMod("27" /* Activity */).retProxy(209 /* First */);
            return proxy.cache_times;
        };
        /**天帝激活 */
        ActivityUtil.getActivateByTiandi = function (type) {
            var proxy = game.getProxy("60" /* God */, 232 /* God */);
            return proxy.getActivate(type);
        };
        return ActivityUtil;
    }());
    game.ActivityUtil = ActivityUtil;
    __reflect(ActivityUtil.prototype, "game.ActivityUtil");
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var Handler = base.Handler;
        var BagUtil = /** @class */ (function () {
            function BagUtil() {
            }
            /**
             *  根据背包类型获取背包数据
             * @param type 背包类型
             * @param isSort 是否排序，默认不排序
             */
            BagUtil.getBagsByType = function (type, isSort) {
                if (isSort === void 0) { isSort = false; }
                var proxy = facade.retMod("12" /* Bag */).retProxy(12 /* Bag */);
                var bags = proxy.getBagByType(type);
                var tmpBags = bags.concat();
                if (isSort) {
                    tmpBags.sort(game.SortTools.sortProp);
                }
                return tmpBags; //防止背包数据被修改
            };
            /**
             *  根据背包类型，道具类型，获取背包数据
             * @param type 背包类型
             * @param propType 道具类型
             */
            BagUtil.getBagsByTypeAndPropType = function (type, propType) {
                var tmpBags = [];
                var bags = this.getBagsByType(type);
                for (var _i = 0, bags_1 = bags; _i < bags_1.length; _i++) {
                    var prop = bags_1[_i];
                    if (propType == prop.propType) {
                        tmpBags.push(prop);
                    }
                }
                return tmpBags;
            };
            /**
             *  根据背包类型，道具子类型，获取背包数据
             * @param type 背包类型
             * @param propSubType 道具子类型
             * @param isSort 是否排序，默认不排序
             */
            BagUtil.getBagsByTypeAndPropSubType = function (type, propSubType, isSort) {
                if (isSort === void 0) { isSort = false; }
                var tmpBags = [];
                var bags = this.getBagsByType(type, isSort);
                for (var _i = 0, bags_2 = bags; _i < bags_2.length; _i++) {
                    var prop = bags_2[_i];
                    if (propSubType == prop.propSubType) {
                        tmpBags.push(prop);
                    }
                }
                return tmpBags;
            };
            /**
             *  根据背包类型，品质，获取背包数据
             * @param type 背包类型
             * @param minQuality 道具品质，小于当前品质的不取
             * @param maxQuality 道具品质，大于当前品质的不取
             */
            BagUtil.getBagsByTypeAndQuality = function (type, minQuality, maxQuality) {
                if (maxQuality === void 0) { maxQuality = 9 /* COLOR */; }
                var tmpBags = [];
                var bags = this.getBagsByType(type);
                for (var _i = 0, bags_3 = bags; _i < bags_3.length; _i++) {
                    var prop = bags_3[_i];
                    if (prop.quality >= minQuality && prop.quality <= maxQuality) {
                        tmpBags.push(prop);
                    }
                }
                return tmpBags;
            };
            /**
             * 根据index获取背包内道具数量
             * @param index
             */
            BagUtil.getPropCntByIdx = function (index) {
                /**虚拟道具*/
                var key = game.PropIndexToKey[index];
                if (key) {
                    return Number(game.RoleVo.ins[key]) || 0;
                }
                var c = 0;
                var proxy = facade.retMod("12" /* Bag */).retProxy(12 /* Bag */);
                var list = proxy.getPropsByIndex(index);
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var p = list_1[_i];
                    c = c + p.count;
                }
                return c;
            };
            /**
             * 根据index获取背包内道具信息
             * @param index
             * @param isCalCount 是否统计数量，默认true
             */
            BagUtil.getPropDataByIdx = function (index, isCalCount) {
                if (isCalCount === void 0) { isCalCount = true; }
                var proxy = facade.retMod("12" /* Bag */).retProxy(12 /* Bag */);
                var list = proxy.getPropsByIndex(index);
                var propData = list.length ? list[0] : null;
                if (isCalCount) {
                    for (var i = 1; i < list.length; ++i) {
                        var p = list[i]; //从1开始
                        propData.count += p.count; //累加数量
                    }
                }
                return propData;
            };
            /**
             * 计算道具扣除消耗后数量
             * @param index 当前消耗道具index
             * @param pos 当前消耗道具下标
             * @param costInfoList 消耗信息列表
             * @param calcEquip 是否计算身上的装备
             */
            BagUtil.calcPropCnt = function (index, pos, costInfoList, calcEquip) {
                var cnt = this.getPropCntByIdx(index); //当前道具数量
                if (calcEquip) {
                    var prop = game.PropData.create(index);
                    var proxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                    var equip = proxy.getEquipByPos(prop.equipPos);
                    if (equip && equip.index == index) {
                        cnt++;
                    }
                }
                var sameCnt = 0; //相同道具的数量
                for (var i = 0; i < costInfoList.length; ++i) {
                    var costInfo = costInfoList[i];
                    if (costInfo[0] == index) {
                        sameCnt++;
                    }
                }
                var perCnt = Math.floor(cnt / sameCnt);
                var addCnt = cnt % sameCnt;
                if (addCnt > 0 && addCnt > pos) {
                    //余位补值
                    perCnt += 1;
                }
                return perCnt;
            };
            /**
             *检查道具数量是否足够，一般红点使用
             * @param {number} index  道具index
             * @param {number} cnt   满足道具数量，默认1
             * @param tipsType  道具不足提示类型，默认不提示
             */
            BagUtil.checkPropCnt = function (index, cnt, tipsType) {
                if (cnt === void 0) { cnt = 1; }
                if (tipsType === void 0) { tipsType = 0 /* None */; }
                var curCnt = this.getPropCntByIdx(index);
                if (curCnt >= cnt) {
                    return true;
                }
                if (tipsType == 0 /* None */) {
                    return false;
                }
                var cfg = game.getConfigById(index);
                if (cfg.gain_id && cfg.gain_id.length) {
                    //弹窗提示，来源获取
                    mod.ViewMgr.getIns().showGainWaysTips(index);
                }
                else {
                    //文本提示，例如：元宝不足
                    game.PromptBox.getIns().show(cfg.name + "数量不足");
                }
                return false;
            };
            /**
             *升级时候检查道具数量是否足够，会弹获取途径
             * @param {number} index  道具index
             * @param {number} cnt   满足道具数量
             */
            BagUtil.checkPropCntUp = function (index, cnt) {
                if (cnt === void 0) { cnt = 1; }
                return this.checkPropCnt(index, cnt, 1 /* Dialog */);
            };
            /**
             *检测背包是否已满，装备背包会弹熔炼提示
             * @param type 背包类型，默认装备背包
             * @param tipsCnt 提示的数量
             */
            BagUtil.checkBagFull = function (type, tipsCnt) {
                if (type === void 0) { type = 3 /* RoleEquip */; }
                if (tipsCnt === void 0) { tipsCnt = game.BagEquipTipsCnt; }
                var proxy = facade.retMod("12" /* Bag */).retProxy(12 /* Bag */);
                var bags = BagUtil.getBagsByType(type);
                var maxCnt = proxy.getBagMaxCnt(type);
                var leftCnt = maxCnt - bags.length;
                var isFull = leftCnt < tipsCnt; //小于提示的数量时，表示已满
                if (isFull && type == 3 /* RoleEquip */) {
                    //装备背包熔炼提示
                    leftCnt = Math.max(leftCnt, 1);
                    var tipsStr = game.StringUtil.substitute(game.getLanById("bag_ronglian_tips" /* bag_ronglian_tips */), [leftCnt]);
                    mod.ViewMgr.getIns().showConfirm(tipsStr, Handler.alloc(proxy, function () {
                        proxy.clickMelt();
                    }));
                }
                return isFull;
            };
            /**
             *合并相同奖励道具
             * @param {PropData[]} rewards  奖励列表
             */
            BagUtil.mergeRewards = function (rewards) {
                var tmpDatas = [];
                for (var i = 0; i < rewards.length; ++i) {
                    var prop = rewards[i];
                    if (prop.type == 290 /* Equip */) {
                        //装备不合并
                        tmpDatas.push(prop);
                        continue;
                    }
                    var pos = -1;
                    for (var j = 0; j < tmpDatas.length; ++j) {
                        var tmpData = tmpDatas[j];
                        if (prop.index == tmpData.index) {
                            pos = j;
                            break;
                        }
                    }
                    if (pos > -1) {
                        tmpDatas[pos].count += prop.count;
                    }
                    else {
                        tmpDatas.push(prop);
                    }
                }
                tmpDatas.sort(game.SortTools.sortProp);
                return tmpDatas;
            };
            /**
             *转化奖励为PropData，并排序奖励
             * @param {PropData[]} rewards  奖励列表
             * @param sort 默认排序
             */
            BagUtil.changeRewards = function (rewards, sort) {
                if (sort === void 0) { sort = true; }
                if (!rewards || !rewards.length) {
                    return [];
                }
                var tmpRewards = [];
                for (var _i = 0, rewards_2 = rewards; _i < rewards_2.length; _i++) {
                    var i = rewards_2[_i];
                    var prop = game.PropData.create(i.idx, i.cnt);
                    if (i.ex_params && i.ex_params.hunka_star) {
                        prop.update(i.ex_params); //魂卡数据
                    }
                    tmpRewards.push(prop);
                }
                if (sort) {
                    tmpRewards.sort(game.SortTools.sortProp);
                }
                return tmpRewards;
            };
            /** */
            BagUtil.getEasyUse = function () {
                var proxy = facade.retMod("12" /* Bag */).retProxy(12 /* Bag */);
                return proxy.easyUse;
            };
            return BagUtil;
        }());
        mod.BagUtil = BagUtil;
        __reflect(BagUtil.prototype, "game.mod.BagUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Pool = base.Pool;
        var TouchEvent = egret.TouchEvent;
        var Tween = base.Tween;
        var BtnTipsMgr = /** @class */ (function () {
            function BtnTipsMgr() {
                this._tipsMap = {};
                this._tips = {};
            }
            BtnTipsMgr.getIns = function () {
                if (!this._instance) {
                    this._instance = new BtnTipsMgr();
                }
                return this._instance;
            };
            BtnTipsMgr.prototype.showTips = function (data, parent) {
                if (parent === void 0) { parent = game.Layer.main; }
                this._tipsMap[data.idx] = data;
                if (!this._tips[data.idx]) {
                    this._tips[data.idx] = Pool.alloc(BtnTipsBase);
                }
                // this._tips[data.idx] = tips;
                this._tips[data.idx].show(data, parent);
            };
            /**移除弹窗调用 会走销毁流程 不要直接调用deletTips */
            BtnTipsMgr.prototype.hideTips = function (idx) {
                var tips = this._tips[idx];
                if (tips) {
                    tips.dispose();
                }
            };
            //移除全部，在MainLeftActMidMdr移除的时候调用就行了
            BtnTipsMgr.prototype.hideAllTips = function () {
                for (var k in this._tips) {
                    var tips = this._tips[k];
                    if (tips) {
                        tips.dispose();
                    }
                }
            };
            BtnTipsMgr.prototype.deletTips = function (idx) {
                if (this._tipsMap && this._tipsMap[idx]) {
                    delete this._tipsMap[idx];
                }
                if (this._tips && this._tips[idx]) {
                    delete this._tips[idx];
                }
            };
            BtnTipsMgr.prototype.updatePos = function (btnIcon) {
                var data = btnIcon.data;
                var tipsItem = this._tips[data.id];
                if (tipsItem && tipsItem.parent) {
                    var x = btnIcon.x + btnIcon.width + 20;
                    var y = btnIcon.y + btnIcon.height - 20;
                    tipsItem.x = x;
                    tipsItem.y = y;
                }
            };
            return BtnTipsMgr;
        }());
        mod.BtnTipsMgr = BtnTipsMgr;
        __reflect(BtnTipsMgr.prototype, "game.mod.BtnTipsMgr");
        var BtnTipsBase = /** @class */ (function (_super) {
            __extends(BtnTipsBase, _super);
            function BtnTipsBase() {
                var _this = _super.call(this) || this;
                _this.tween_scale = 0.9;
                _this.skinName = "skins.activity.BtnTipsBaseSkin";
                return _this;
            }
            BtnTipsBase.prototype.show = function (data, parent) {
                this.data = data;
                if (this.data.handler) {
                    this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                }
                this.lb_tips.textFlow = game.TextUtil.parseHtml(this.data.tips, true);
                this.lb_tips.maxWidth = 160;
                parent.addChild(this);
                this.x = this.data.x;
                this.y = this.data.y;
                // this.anchorOffsetX = 20;
                this.anchorOffsetY = this.height;
                // if (this.data.tween) {
                //     Tween.remove(this);
                //     Tween.get(this, {loop: true})
                //         .from({scaleX: this.tween_scale, scaleY: this.tween_scale}, 1000)
                //         .to({scaleX: this.tween_scale, scaleY: this.tween_scale}, 1000);
                // } else {
                //     Tween.remove(this);
                // }
                this.addTween(this.data.tween);
            };
            BtnTipsBase.prototype.addTween = function (tween) {
                Tween.remove(this);
                if (!tween) {
                    return;
                }
                var scaleX = this.tween_scale;
                var scaleY = this.tween_scale;
                Tween.get(this, { loop: true })
                    .from({ scaleX: scaleX, scaleY: scaleY }, 1000)
                    .to({ scaleX: scaleX, scaleY: scaleY }, 1000);
            };
            /**
             * 更新tips气泡提示
             * @param tips
             * @param handler 点击事件，默认无
             * @param tween 缓动，默认无
             */
            BtnTipsBase.prototype.updateShow = function (tips, handler, tween) {
                if (handler) {
                    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                }
                this.lb_tips.textFlow = game.TextUtil.parseHtml(tips, true);
                this.addTween(tween);
            };
            BtnTipsBase.prototype.onClick = function () {
                if (this.data.handler) {
                    this.data.handler.exec();
                }
                this.dispose();
            };
            BtnTipsBase.prototype.onAlloc = function () {
            };
            ;
            BtnTipsBase.prototype.onRelease = function () {
                Tween.remove(this);
                if (this.parent) {
                    this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.parent.removeChild(this);
                    BtnTipsMgr.getIns().deletTips(this.data.idx);
                }
            };
            ;
            BtnTipsBase.prototype.dispose = function () {
                this.onRelease();
            };
            return BtnTipsBase;
        }(eui.Component));
        mod.BtnTipsBase = BtnTipsBase;
        __reflect(BtnTipsBase.prototype, "game.mod.BtnTipsBase", ["base.PoolObject", "base.DisposeObject"]);
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var FilterUtil = /** @class */ (function () {
            function FilterUtil() {
            }
            /**
             * 返回一个灰色滤镜
             */
            FilterUtil.getGrapFilter = function () {
                //颜色矩阵滤镜，模型置灰用
                var colorMatrix = [
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                return colorFlilter;
            };
            return FilterUtil;
        }());
        mod.FilterUtil = FilterUtil;
        __reflect(FilterUtil.prototype, "game.mod.FilterUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var TimeMgr = base.TimeMgr;
        var Handler = base.Handler;
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var Tween = base.Tween;
        var Pool = base.Pool;
        var facade = base.facade;
        var delayCall = base.delayCall;
        var clearDelay = base.clearDelay;
        var TouchEvent = egret.TouchEvent;
        var GuideMgr = /** @class */ (function () {
            function GuideMgr() {
                this._startTime = 0; //指引开始的时间
                this._tipsTime = 0; //指引提示的时间
                this._timeAuto = 0; //自动指引时间，10秒
                this.GROUP_NAME = "guide_force"; //强指引阻挡层组件名
                this._timeTips = 0; //提示指引时间，10秒
                this.firstFailedPass = false; //第一次闯关失败
                this._isSpecialGuide = false; //记录是否特殊指引产生
            }
            GuideMgr.getIns = function () {
                if (!this._instance) {
                    this._instance = new GuideMgr();
                }
                return this._instance;
            };
            /**
             * @param guideKey，指引ID
             * @param target，需要指引的组件
             * @param onTimeOut，指引回调，策划配置了自动引导才会执行
             * @param pauseGuideKey，需要暂停执行的指引，指下一步指引
             * @param offset，指引位置偏移
             */
            GuideMgr.prototype.show = function (guideKey, target, onTimeOut, pauseGuideKey, offset) {
                var _this = this;
                //DEBUG ||
                if (gso.stopGuide) {
                    //停止指引时，不再触发指引
                    return;
                }
                this._isSpecialGuide = false;
                if (!this.isCurGuide(guideKey)) {
                    //非当前指引
                    if (this._guideKey == guideKey) {
                        this.clearGuide(); //清除旧指引
                    }
                    return;
                }
                if (this._guideKey == guideKey && this._target && this._target.hashCode == target.hashCode) {
                    //重复指引时，同一个guideKey可以绑定不同的target
                    //todo，如果策划需要每次都重新指引时，可以去掉
                    return;
                }
                this.clearGuide(); //新指引进来时，清除旧指引
                this._guideKey = guideKey;
                this._target = target;
                console.log("显示引导 guideKey = " + guideKey);
                var finger = Pool.alloc(GuideFinger);
                this._delayGuide = delayCall(Handler.alloc(this, function () {
                    _this._delayGuide = 0;
                    finger.show(target, offset);
                    _this._layer = finger.parent;
                    _this._finger = finger;
                }), 200); //手指，延迟执行，防止界面设置了约束后导致位置错误
                this._onTimeOut = onTimeOut;
                this.checkAutoGuide(); //自动指引
                this.checkGuideType(); //指引类型，弱指引还是强指引
                this._pauseGuideKey = pauseGuideKey;
                this._isPause = pauseGuideKey && this.hasGuideKey([pauseGuideKey]); //只有配置指引时才赋值
                this._hasShowBack = guideKey == 4 /* Back */; //已经执行返回指引
            };
            //对外清除指引接口
            //非任务完成步骤，点击对应组件时清除，传guideKey
            GuideMgr.prototype.clear = function (guideKey) {
                if (guideKey != this._guideKey) {
                    return;
                }
                console.log("清楚引导 guideKey = " + guideKey);
                this.clearGuide();
            };
            //任务更新调用
            GuideMgr.prototype.taskUpdate = function () {
                this._arrowType = this.getArrowType();
                if (this.isArrowTips()) {
                    //配置了2类型，等于没有指引，互斥状态
                    //10秒未操作时候提示
                    this.resetTipsTime();
                    TimeMgr.addUpdateItem(this, 1000);
                }
                else if (!this.hasGuideInfoList()) {
                    //没有指引时
                    TimeMgr.removeUpdateItem(this);
                }
                else {
                    //触发指引
                    this.triggerGuide();
                }
            };
            //返回主界面时触发
            GuideMgr.prototype.backMain = function () {
                if (!mod.SceneUtil.isShowMain()) {
                    return; //非挂机场景时，不触发
                }
                if (this.isCurGuide(22 /* Xianlu */)) {
                    //仙路指引特殊处理，返回主界面时不需要重复指引
                    return;
                }
                this.updateGuide();
            };
            //触发指引
            //任务触发：首次接到主线任务时，主线任务切换时，主线任务完成时
            //返回主界面时触发
            //暂停指引恢复后触发
            GuideMgr.prototype.triggerGuide = function () {
                //DEBUG ||
                if (gso.stopGuide) {
                    //停止指引时，不再触发指引
                    return;
                }
                if (this._isPause) {
                    //暂停指引时，清除当前指引，等待恢复指引
                    this.clearGuide();
                    this._isPause = false; //取消暂停指引
                    return;
                }
                if (this.isCurGuide(this._pauseGuideKey)) {
                    //存在暂停指引
                    facade.sendNt("on_guide_trigger" /* ON_GUIDE_TRIGGER */, this._pauseGuideKey); //继续引导
                    return;
                }
                if (this.isCurGuide(4 /* Back */)) {
                    //存在返回指引，且未执行时
                    facade.sendNt("on_guide_trigger" /* ON_GUIDE_TRIGGER */, 4 /* Back */); //引导返回
                    return;
                }
                this.updateGuide();
            };
            //是否有对应的指引类型
            GuideMgr.prototype.hasGuideKey = function (guideKeyList) {
                for (var _i = 0, guideKeyList_1 = guideKeyList; _i < guideKeyList_1.length; _i++) {
                    var guideKey = guideKeyList_1[_i];
                    var info = this.getGuideInfo(guideKey);
                    if (info) {
                        return true;
                    }
                }
                return false;
            };
            //2、10秒未操作时候提示，玩家操作的时候会调用这个接口
            GuideMgr.prototype.tips = function () {
                this.clear(10001 /* Tips */); //清除提示指引
                if (!this.isArrowTips()) {
                    return;
                }
                this.resetTipsTime();
            };
            //清除指引，主界面销毁时后调用下就行了
            GuideMgr.prototype.clearGuide = function () {
                if (this._finger) {
                    Pool.release(this._finger); //清除手指
                    if (this._finger && this._finger.parent) {
                        //这里做一下移除指引，防止对象池回收失败
                        this._finger.parent.removeChild(this._finger);
                    }
                    this._finger = null;
                }
                if (this._onTimeOut) {
                    Pool.release(this._onTimeOut); //清除回调
                    this._onTimeOut = null; //onTimeOut置空，防止回调重复执行
                }
                if (this._delayGuide) {
                    clearDelay(this._delayGuide);
                    this._delayGuide = 0;
                }
                this._guideKey = null;
                this.delTopGroup(); //清除指引时，需要把强指引阻挡去掉
            };
            GuideMgr.prototype.updateGuide = function () {
                facade.sendNt("on_guide_update" /* ON_GUIDE_UPDATE */); //发送事件更新指引
            };
            //检测是否当前指引
            GuideMgr.prototype.isCurGuide = function (guideKey) {
                if (!guideKey) {
                    return false;
                }
                if (this.firstFailedPass) {
                    //第一次闯关失败
                    if (this.isHasSpecialGuide(guideKey)) {
                        this._isSpecialGuide = true;
                        return true;
                    }
                    return false;
                }
                if (this.isTipsGuide(guideKey)) {
                    var _passProxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                    if (_passProxy.passIsAuto) {
                        return false; //自动闯关时候不提示
                    }
                    return true; //提示指引
                }
                if (!this.hasGuideKey([guideKey])) {
                    return false;
                }
                var task = mod.TaskUtil.getMainTask();
                if (!task) {
                    return false;
                }
                var guideList = [1 /* Task */, 4 /* Back */, 23 /* SecondBack */]; //任务完成状态才执行的指引
                if (guideList.indexOf(guideKey) > -1) {
                    //任务完成时候才指引
                    if (guideKey == 4 /* Back */ && this._hasShowBack) {
                        return false; //返回指引已执行时，不再执行
                    }
                    return task.status == 1 /* Finish */;
                }
                return task.status == 0 /* NotFinish */; //任务未完成状态才执行的指引
            };
            GuideMgr.prototype.isHasSpecialGuide = function (key) {
                var ret1 = this.isSpecialGuide(key, 1 /* Special1 */);
                var ret2 = this.isSpecialGuide(key, 2 /* Special2 */);
                return ret1 || ret2;
            };
            //是否是特殊引导
            GuideMgr.prototype.isSpecialGuide = function (key, index) {
                var cfg = game.getConfigByNameId("special_guide.json" /* SpecialGuide */, index);
                //道具
                var count = mod.BagUtil.getPropCntByIdx(cfg.condition1[0]);
                var ret1 = cfg.condition1[1] == 1 ? count > 0 : count <= 0;
                //神灵
                var tempRet = mod.SurfaceUtil.isAct(cfg.condition2[0]);
                var ret2 = cfg.condition2[1] == 1 ? tempRet : !tempRet;
                if (ret1 && ret2) {
                    for (var _i = 0, _a = cfg.arrow; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (this._specialGuideMap && this._specialGuideMap["special" + "_" + info[0]]) {
                            continue;
                        }
                        if (info[0] == key) {
                            //记录已经做了的小步骤
                            //this._specialGuideMap["special"+"_"+key] = 1;
                            if (!this._specialGuideMap) {
                                this._specialGuideMap = {};
                            }
                            return true;
                        }
                        break;
                    }
                }
                return false;
            };
            //记录已经做了的特殊引导
            GuideMgr.prototype.recordSpecialGuideMap = function (key) {
                if (this.firstFailedPass && this._specialGuideMap) {
                    this._specialGuideMap["special" + "_" + key] = 1;
                }
            };
            //是否是提示指引
            GuideMgr.prototype.isTipsGuide = function (guideKey) {
                return guideKey == 10001 /* Tips */ || guideKey == 10002 /* GongNengTips */;
            };
            //指引ID_指引类型
            GuideMgr.prototype.getGuideInfo = function (guideKey) {
                var infoList = this.getGuideInfoList();
                for (var _i = 0, infoList_1 = infoList; _i < infoList_1.length; _i++) {
                    var info = infoList_1[_i];
                    var key = info[0];
                    if (guideKey == key) {
                        return info;
                    }
                }
                return null;
            };
            //检测自动指引
            GuideMgr.prototype.checkAutoGuide = function () {
                if (this.isArrowTips()) {
                    return; //提示指引不在指引时候检测
                }
                this._arrowType = this.getArrowType();
                if (this._arrowType == 1 /* Auto */ && this._onTimeOut) {
                    //自动指引，且存在回调时执行
                    this.resetStartTime(); //重置时间
                    TimeMgr.addUpdateItem(this, 1000);
                }
                else {
                    TimeMgr.removeUpdateItem(this);
                }
            };
            GuideMgr.prototype.getArrowType = function () {
                var task = mod.TaskUtil.getMainTask();
                if (!task) {
                    return 0;
                }
                var cfg = mod.TaskUtil.getCfg(task.task_id);
                return cfg && cfg.arrow_type || 0;
            };
            //指引组合，策划配置
            GuideMgr.prototype.getGuideInfoList = function () {
                var task = mod.TaskUtil.getMainTask();
                if (!task) {
                    return [];
                }
                var cfg = mod.TaskUtil.getCfg(task.task_id);
                return cfg && cfg.arrow || [];
            };
            //是否配置了指引
            GuideMgr.prototype.hasGuideInfoList = function () {
                var infoList = this.getGuideInfoList();
                return infoList && !!infoList.length;
            };
            GuideMgr.prototype.isArrowTips = function () {
                return this._arrowType == 2 /* Tips */;
            };
            //检测指引类型，弱指引还是强指引
            GuideMgr.prototype.checkGuideType = function () {
                if (this._isSpecialGuide) {
                    //弱指引
                    this.delTopGroup();
                    return;
                }
                var info = this.getGuideInfo(this._guideKey);
                var guideType = info && info.length > 1 ? info[1] : 0; //指引类型
                this._guideType = guideType;
                if (guideType == 1 /* Force */) {
                    //强指引，所有点击视为触发
                    this.addTopGroup();
                }
                else if (guideType == 2 /* Force2 */) {
                    //强指引，不允许其他点击
                    this.addTopGroup();
                }
                else {
                    //弱指引
                    this.delTopGroup();
                }
            };
            //添加阻挡层
            GuideMgr.prototype.addTopGroup = function () {
                var layer = game.Layer.top;
                var grp = layer.getChildByName(this.GROUP_NAME);
                if (grp) {
                    grp.touchEnabled = true;
                    return;
                }
                grp = new eui.Group();
                grp.name = this.GROUP_NAME;
                // grp.width = layer.width;
                // grp.height = layer.height;
                //阻挡大小以舞台大小为准
                grp.width = gso.gameStage.stageWidth; //layer.width + layer.x * 2
                grp.height = gso.gameStage.stageHeight; //layer.height + layer.y * 2
                grp.x = -layer.x;
                grp.y = -layer.y;
                layer.addChild(grp);
                grp.addEventListener(TouchEvent.TOUCH_TAP, this.onClickTopGroup, this);
            };
            //删除阻挡层，实际上不删除，设置为不可点击
            GuideMgr.prototype.delTopGroup = function () {
                var layer = game.Layer.top;
                var grp = layer.getChildByName(this.GROUP_NAME);
                if (grp) {
                    grp.touchEnabled = false;
                }
            };
            //点击阻挡层
            GuideMgr.prototype.onClickTopGroup = function (e) {
                //强制指引点击时，优先判断上层界面是否存在UI，是的话关闭
                if (this._layer) {
                    if (this._layer.idx < 5 /* modal */) {
                        //当前层级小于压黑弹窗时，关闭所有压黑界面
                        if (game.Layer && game.Layer.onHideModalLayer) {
                            game.Layer.onHideModalLayer();
                        }
                    }
                    else if (this._layer.idx == 5 /* modal */) {
                        //当前层级等于压黑弹窗时，todo
                    }
                }
                if (this._guideType == 2 /* Force2 */) {
                    //强指引，不允许其他点击
                    //判断范围以全局坐标为准
                    var targetPoint = this._target.localToGlobal();
                    if (e.stageX < targetPoint.x || e.stageX > targetPoint.x + this._target.width || e.stageY < targetPoint.y ||
                        e.stageY > targetPoint.y + this._target.height) {
                        return;
                    }
                }
                //this.delTopGroup();//todo，防止回调执行失败时，去掉强指引阻挡
                this.execTimeOut(); //点击后执行
            };
            //执行回调
            GuideMgr.prototype.execTimeOut = function () {
                if (this._onTimeOut) {
                    if (this._arrowType == 1 /* Auto */) {
                        this.resetStartTime(); //重置时间
                    }
                    this._onTimeOut.exec(); //todo，执行完回调后不清除，直到任务完成
                }
            };
            GuideMgr.prototype.resetStartTime = function () {
                this._startTime = TimeMgr.time.serverTimeSecond; //重置时间
            };
            GuideMgr.prototype.resetTipsTime = function () {
                this._tipsTime = TimeMgr.time.serverTimeSecond;
            };
            GuideMgr.prototype.update = function (time) {
                if (!this._timeAuto || !this._timeTips) {
                    var cfg = game.GameConfig.getParamConfigById("task_guide_time");
                    var timeInfo = cfg.value;
                    this._timeAuto = timeInfo ? timeInfo[0] : 10;
                    this._timeTips = timeInfo ? timeInfo[1] : 10;
                }
                var passTime = TimeMgr.time.serverTimeSecond - this._startTime;
                if (this._startTime && passTime >= this._timeAuto) {
                    this._startTime = 0;
                    this.execTimeOut(); //5秒后执行
                }
                if (this.isArrowTips() && this._guideKey != 10001 /* Tips */) {
                    var tipsTime = TimeMgr.time.serverTimeSecond - this._tipsTime;
                    if (tipsTime >= this._timeTips) {
                        this.resetTipsTime();
                        facade.sendNt("on_guide_trigger" /* ON_GUIDE_TRIGGER */, 10001 /* Tips */); //10秒后执行
                    }
                }
            };
            return GuideMgr;
        }());
        mod.GuideMgr = GuideMgr;
        __reflect(GuideMgr.prototype, "game.mod.GuideMgr", ["base.UpdateItem"]);
        //指引手指
        var GuideFinger = /** @class */ (function (_super) {
            __extends(GuideFinger, _super);
            function GuideFinger() {
                var _this = _super.call(this) || this;
                _this.touchEnabled = false;
                _this.touchChildren = false;
                _this._finger = new eui.Image("shouzhi");
                _this.addChild(_this._finger);
                _this._eftHub = new game.UIEftHub(_this);
                _this.name = game.GuideFingerName;
                return _this;
            }
            GuideFinger.prototype.show = function (target, offset) {
                var layer;
                var targetParent = target.parent;
                while (targetParent && !layer) {
                    if (targetParent.name.indexOf("Layer_") == 0 && targetParent.parent instanceof game.Layer) {
                        //层级命名规则Layer_开头，且父节点是Layer
                        layer = targetParent; //寻找到对应的层级
                    }
                    targetParent = targetParent.parent; //向上寻找
                }
                if (!layer) {
                    layer = game.Layer.tip; //默认最上层
                }
                layer.addChild(this); //添加到对应的层级
                var targetPoint = target.localToGlobal(); //转化为全局坐标
                var offsetX = offset && offset.x || 0;
                var offsetY = offset && offset.y || 0;
                this.x = targetPoint.x + target.width / 2 - layer.x + offsetX; //需要减去对应layer的坐标
                this.y = targetPoint.y + target.height / 2 - layer.y + offsetY;
                //首次获取的显示区域可能异常
                // let rect: Rectangle = target.getTransformedBounds(layer, Pool.alloc(Rectangle));
                // this.x = rect.x + rect.width / 2;
                // this.y = rect.y + rect.height / 2;
                // Pool.release(rect);
                if (!this._eftId) {
                    this._eftId = this._eftHub.add("guide" /* Guide */, 0, 0, null, 0, null, 0, 1, true, 0.7);
                }
                var isDown = this.y > gso.gameStage.stageHeight - 250;
                this._finger.scaleY = isDown ? -1 : 1;
                this._finger.x = -20;
                this._finger.y = 0;
                Tween.remove(this._finger);
                Tween.get(this._finger, { loop: true })
                    .to({ y: this._finger.scaleY * 20 }, 600)
                    .to({ y: 0 }, 600);
            };
            GuideFinger.prototype.dispose = function () {
                this.onRelease();
            };
            GuideFinger.prototype.onAlloc = function () {
            };
            GuideFinger.prototype.onRelease = function () {
                Tween.remove(this._finger);
                this._eftId = null;
                this._eftHub.removeAllEffects();
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return GuideFinger;
        }(DisplayObjectContainer));
        mod.GuideFinger = GuideFinger;
        __reflect(GuideFinger.prototype, "game.mod.GuideFinger", ["base.PoolObject", "base.DisposeObject"]);
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var HintMgr = /** @class */ (function () {
            function HintMgr() {
            }
            /**
             * 设置红点 （注意子节点key的唯一）
             * @param value，红点值
             * @param node 第一层为ModName，后序需要自身模块Def文件定义，例如ModName.Role_RoleViewType.RoleMain_RoleMainBtnType.BtnRole
             * @param openIdx，功能id，可缺省
             */
            HintMgr.setHint = function (value, node, openIdx) {
                var proxy = facade.retMod("08" /* Hint */).retProxy(7 /* Hint */);
                proxy.setHint(value, node, openIdx);
            };
            /**
             * 获取红点
             * @param node
             */
            HintMgr.getHint = function (node) {
                var proxy = facade.retMod("08" /* Hint */).retProxy(7 /* Hint */);
                return proxy.getHint(node);
            };
            /**
             * 根据功能idx获取红点
             * @param openIdx
             */
            HintMgr.getHintByOpenIdx = function (openIdx) {
                var proxy = facade.retMod("08" /* Hint */).retProxy(7 /* Hint */);
                return proxy.getHintByOpenIdx(openIdx);
            };
            /**
             * 根据功能idx获取红点唯一key
             * @param openIdx
             */
            HintMgr.getTypeByOpenIdx = function (openIdx) {
                var proxy = facade.retMod("08" /* Hint */).retProxy(7 /* Hint */);
                return proxy.getTypeByOpenIdx(openIdx);
            };
            /**红点类型转换*/
            HintMgr.getType = function (node) {
                if (!node || !node.length) {
                    return ""; //防报错处理
                }
                return node.toString().replace(/\,/g, ''); /**转化为红点类型*/
            };
            /**
             * 添加定时器事件
             * @param type：TimeEventType，定时器类型
             * @param time：到点执行的时间戳
             * @param proxy：自己的proxy
             * @param method：执行的方法
             * @param args：方法携带的参数
             */
            HintMgr.addTimeEvent = function (type, time, proxy, method, args) {
                var hintProxy = facade.retMod("08" /* Hint */).retProxy(7 /* Hint */);
                hintProxy.addTimeEvent(type, time, proxy, method, args);
            };
            /**
             * 是否存在定时器事件
             * @param type：TimeEventType，定时器类型
             */
            HintMgr.hasTimeEvent = function (type) {
                var hintProxy = facade.retMod("08" /* Hint */).retProxy(7 /* Hint */);
                return hintProxy.hasTimeEvent(type);
            };
            /**
             * 移除定时器事件
             * @param type：TimeEventType，定时器类型
             */
            HintMgr.removeTimeEvent = function (type) {
                var hintProxy = facade.retMod("08" /* Hint */).retProxy(7 /* Hint */);
                hintProxy.removeTimeEvent(type);
            };
            return HintMgr;
        }());
        mod.HintMgr = HintMgr;
        __reflect(HintMgr.prototype, "game.mod.HintMgr");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var PayUtil = /** @class */ (function () {
            function PayUtil() {
            }
            /**获取礼包奖励*/
            PayUtil.getRewards = function (productId) {
                var cfg = game.getConfigByNameId("gift_bag.json" /* GiftBag */, productId);
                return cfg.awards;
            };
            /**获取礼包特权配置*/
            PayUtil.getPrivilegeCfgList = function (productId) {
                var rewards = PayUtil.getRewards(productId);
                var propIndex = rewards[0][0]; //取第一个奖励，灵宠碎片
                var propCfg = game.GameConfig.getPropConfigById(propIndex);
                var index = propCfg && propCfg.param1 && propCfg.param1.length ? propCfg.param1[0][0] : 0; //灵宠index
                var cfg = game.getConfigByNameId("xianchong.json" /* Lingchong */, index);
                if (!cfg.privilege_id) {
                    console.info("礼包ID：", productId, "灵宠特权配置不对，灵宠ID：", index);
                    return null;
                }
                var cfgList = [];
                for (var _i = 0, _a = cfg.privilege_id; _i < _a.length; _i++) {
                    var info = _a[_i];
                    var id = info[0];
                    var pCfg = game.getConfigByNameId("new_privilege.json" /* NewPrivilege */, id);
                    if (!pCfg) {
                        console.info("灵宠ID：", index, "灵宠特权配置不对，特权ID：", id);
                        continue;
                    }
                    cfgList.push(pCfg);
                }
                return cfgList;
            };
            /**礼包是否已购买*/
            PayUtil.hasBuy = function (productId) {
                return this.hasReceived(productId) || this.canReceived(productId);
            };
            /**礼包是否已领取*/
            PayUtil.hasReceived = function (productId) {
                var proxy = facade.retMod("50" /* Pay */).retProxy(196 /* Pay */);
                return proxy.hasReceived(productId);
            };
            /**礼包是否可领取*/
            PayUtil.canReceived = function (productId) {
                var proxy = facade.retMod("50" /* Pay */).retProxy(196 /* Pay */);
                return proxy.canReceived(productId);
            };
            /**礼包是否可领取*/
            PayUtil.getBuyTimes = function (productId) {
                var proxy = facade.retMod("50" /* Pay */).retProxy(196 /* Pay */);
                return proxy.getBuyTimes(productId);
            };
            /**领取奖励*/
            PayUtil.drawReward = function (productId) {
                var proxy = facade.retMod("50" /* Pay */).retProxy(196 /* Pay */);
                proxy.c2s_direct_buy_reward(productId);
            };
            /**获取商品价格*/
            PayUtil.getRmbValue = function (productId) {
                var cfg = game.getConfigByNameId("product_id.json" /* ProductId */, productId);
                //todo，不同渠道商品价格可能不一样
                return cfg.rmb;
            };
            /**todo 获取单位，默认元*/
            PayUtil.getRmbUnit = function () {
                return '元';
            };
            /**获取商品原价*/
            PayUtil.getFakeRmbValue = function (productId) {
                var cfg = game.getConfigByNameId("product_id.json" /* ProductId */, productId);
                //todo，不同渠道商品价格可能不一样
                return cfg.fake_rmb;
            };
            /**获取商品名称*/
            PayUtil.getPayName = function (productId) {
                var cfg = game.getConfigByNameId("product_id.json" /* ProductId */, productId);
                //todo，不同渠道商品名称可能不一样
                return cfg.name;
            };
            /**购买商品*/
            PayUtil.pay = function (productId) {
                var rmb = this.getRmbValue(productId);
                if (rmb <= 0) {
                    this.drawReward(productId);
                    return;
                }
                var proxy = facade.retMod("50" /* Pay */).retProxy(196 /* Pay */);
                proxy.c2s_check_product_id(productId);
            };
            /** 检查是否首充,todo*/
            PayUtil.checkFirstCharge = function () {
                var proxy = facade.retMod("27" /* Activity */).retProxy(209 /* First */);
                return proxy.one_first;
            };
            /** 判断是否能显示充值入口,todo*/
            PayUtil.checkShowPay = function () {
                return true;
            };
            /** 判断是否显示礼包，一般首充后开启,todo*/
            PayUtil.checkShowGift = function (productId) {
                if (!this.checkShowPay()) {
                    //充值入口未开启时
                    return false;
                }
                var cfg = game.getConfigByNameId("gift_bag.json" /* GiftBag */, productId);
                if (cfg.funcopen && !mod.ViewMgr.getIns().checkViewOpen(cfg.funcopen)) {
                    //功能未开启时
                    return false;
                }
                var serverDay = mod.RoleUtil.getServerDay();
                if (cfg.day_up > serverDay || cfg.day_out < serverDay) {
                    //开服天数未满足时
                    return false;
                }
                if (cfg.open_charge > game.RoleVo.ins.charge_rmb) {
                    //充值金额未满足时
                    return false;
                }
                return true;
            };
            /**
             * 特权令是否全部购买
             * true：表示全购买了
             */
            PayUtil.checkTequanling = function () {
                var proxy = facade.retMod("27" /* Activity */).retProxy(218 /* PrerogativeWrit */);
                return proxy.isAllBought();
            };
            return PayUtil;
        }());
        mod.PayUtil = PayUtil;
        __reflect(PayUtil.prototype, "game.mod.PayUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var TextField = egret.TextField;
        var Tween = base.Tween;
        var Pool = base.Pool;
        var HorizontalAlign = egret.HorizontalAlign;
        var VerticalAlign = egret.VerticalAlign;
        var TimeMgr = base.TimeMgr;
        var Sine = base.Sine;
        var Handler = base.Handler;
        var Rectangle = egret.Rectangle;
        var facade = base.facade;
        var delayCall = base.delayCall;
        var PropTipsMgr = /** @class */ (function () {
            function PropTipsMgr() {
                this._lastShowTime = 0;
                this.DURATION = 520;
                this.SHOW_PER = 10;
                this.props = [];
                this._prop_queue = []; //恭喜获得奖励队列
                this._isShowing = false; //是否正在表现
                this._surface_queue = []; //获得外显队列
                this._isShowSurface = false; //是否正在表现
                this._prop_queue_center = []; //居中恭喜获得奖励队列
                this._isShowingCenter = false; //是否正在表现
                this._boss_queue = []; //BOSS开启队列
                this._isShowBoss = false; //是否正在表现
            }
            PropTipsMgr.getIns = function () {
                if (!this._instance) {
                    this._instance = new PropTipsMgr();
                }
                return this._instance;
            };
            /**黑底掉落*/
            PropTipsMgr.prototype.show = function (drops) {
                if (drops.length >= this.SHOW_PER + 3) {
                    var list = [];
                    for (var i = 0, l = drops.length; i < l; ++i) {
                        list.push(drops[i]);
                        if (list.length >= this.SHOW_PER || i == l - 1) {
                            this.showProps(list);
                            list = [];
                        }
                    }
                }
                else {
                    this.showProps(drops);
                }
            };
            PropTipsMgr.prototype.showProps = function (props) {
                if (!this._tips) {
                    this._tips = [];
                }
                //正在显示，加入显示队列
                if (TimeMgr.time.serverTime - this._lastShowTime < this.DURATION) {
                    this._tips.push(props);
                    return;
                }
                if (this._tips.length == 0) {
                    this.showTips(props);
                }
            };
            PropTipsMgr.prototype.showTips = function (drop) {
                this._lastShowTime = TimeMgr.time.serverTime;
                for (var _i = 0, _a = this.props; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var h = drop.length * item.height;
                    Tween.get(item).to({ y: item.y - h }, 500, null, Sine.easeIn);
                }
                for (var i = 0, l = drop.length; i < l; i++) {
                    var tips = Pool.alloc(PropTips);
                    tips.show(drop[i], i);
                    PropTipsMgr.getIns().props.push(tips);
                }
                TimeMgr.addUpdateItem(this, 100);
            };
            PropTipsMgr.prototype.checkNext = function () {
                if (this._tips.length == 0) {
                    TimeMgr.removeUpdateItem(this);
                    return;
                }
                var drop = this._tips.shift();
                this.showTips(drop);
            };
            PropTipsMgr.prototype.update = function (time) {
                if (time.serverTime - this._lastShowTime >= this.DURATION) {
                    this.checkNext();
                }
            };
            /**清除黑底掉落*/
            PropTipsMgr.prototype.clear = function () {
                if (this._tips && this._tips.length) {
                    this._tips.length = 0;
                }
            };
            //清除队列数据
            PropTipsMgr.prototype.clearData = function () {
                if (this._prop_queue && this._prop_queue.length) {
                    this._prop_queue.length = 0;
                }
                if (this._surface_queue && this._surface_queue.length) {
                    this._surface_queue.length = 0;
                }
                if (this._prop_queue_center && this._prop_queue_center.length) {
                    this._prop_queue_center.length = 0;
                }
                if (this._boss_queue && this._boss_queue.length) {
                    this._boss_queue.length = 0;
                }
            };
            /**恭喜获得掉落*/
            PropTipsMgr.prototype.showBestProp = function (drops) {
                this._prop_queue.push(drops);
                if (!this._isShowing) {
                    this.showNextBestProp();
                }
            };
            /**恭喜获得掉落，客户端读取配置时用*/
            PropTipsMgr.prototype.showBestPropArray = function (datas) {
                var drops = [];
                for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
                    var info = datas_1[_i];
                    var index = info[0];
                    var cnt = info[1];
                    var dropInfo = new msg.prop_tips_data();
                    dropInfo.idx = Long.fromValue(index);
                    dropInfo.cnt = cnt;
                    drops.push(dropInfo);
                }
                this.showBestProp(drops);
            };
            PropTipsMgr.prototype.showNextBestProp = function () {
                var info = this.popBestProp();
                if (!info) {
                    return;
                }
                this._isShowing = true;
                facade.showView("12" /* Bag */, "04" /* BestPropTips */, info);
            };
            PropTipsMgr.prototype.popBestProp = function () {
                return this._prop_queue.shift();
            };
            //结束当前表现
            PropTipsMgr.prototype.closeBestProp = function () {
                this._isShowing = false;
                this.showNextBestProp();
            };
            /**获得外显*/
            PropTipsMgr.prototype.showSurface = function (index, triggerGuide) {
                if (triggerGuide === void 0) { triggerGuide = true; }
                this._surface_queue.push({ index: index, triggerGuide: triggerGuide });
                this.showNextSurface();
            };
            PropTipsMgr.prototype.showNextSurface = function () {
                var _this = this;
                if (this._isShowSurface) {
                    //正在表现时则返回
                    return;
                }
                if (this._pauseSurface) {
                    //暂停表现时则返回
                    return;
                }
                var info = this.popSurface();
                if (!info) {
                    return;
                }
                this._isShowSurface = true;
                this._delaySurface = delayCall(Handler.alloc(this, function () {
                    _this._delaySurface = 0;
                    facade.showView("46" /* Surface */, "15" /* SurfaceTips */, info);
                }), 200); //延迟执行，防止界面重复弹窗时，外显全部回收问题
            };
            PropTipsMgr.prototype.popSurface = function () {
                return this._surface_queue.shift();
            };
            //结束当前表现
            PropTipsMgr.prototype.closeSurface = function () {
                this._isShowSurface = false;
                this.showNextSurface();
            };
            //暂停当前表现
            PropTipsMgr.prototype.pauseSurface = function () {
                this._pauseSurface = true;
            };
            //继续当前表现
            PropTipsMgr.prototype.continueSurface = function () {
                this._pauseSurface = false;
                this.showNextSurface();
            };
            /**居中的恭喜获得掉落*/
            PropTipsMgr.prototype.showBestPropCenter = function (drops) {
                if (!drops || !drops.length) {
                    return;
                }
                //奖励数量超过100时，分批显示
                var cfg = game.GameConfig.getParamConfigById("prop_gain_max_count");
                var maxCnt = cfg && cfg.value || 100; //数量上限
                while (drops.length > maxCnt) {
                    var rewards = drops.splice(0, maxCnt);
                    this._prop_queue_center.push(rewards);
                    this.startNextBestPropCenter();
                }
                if (drops.length) {
                    this._prop_queue_center.push(drops);
                }
                this.startNextBestPropCenter();
            };
            PropTipsMgr.prototype.startNextBestPropCenter = function () {
                if (!this._isShowingCenter) {
                    this.showNextBestPropCenter();
                }
            };
            PropTipsMgr.prototype.showNextBestPropCenter = function () {
                var _this = this;
                var info = this.popBestPropCenter();
                if (!info) {
                    return;
                }
                this._isShowingCenter = true;
                this._delayCenter = delayCall(Handler.alloc(this, function () {
                    _this._delayCenter = 0;
                    facade.showView("12" /* Bag */, "03" /* PropGain */, info);
                }), 200); //延迟执行，防止界面重复弹窗时，特效回收问题
            };
            PropTipsMgr.prototype.popBestPropCenter = function () {
                return this._prop_queue_center.shift();
            };
            //结束当前表现
            PropTipsMgr.prototype.closeBestPropCenter = function () {
                this._isShowingCenter = false;
                this.showNextBestPropCenter();
            };
            /**BOSS开启*/
            PropTipsMgr.prototype.showBoss = function (type, endTime) {
                this._boss_queue.push({ type: type, endTime: endTime });
                this.showNextBoss();
            };
            PropTipsMgr.prototype.showNextBoss = function () {
                var _this = this;
                if (this._isShowBoss) {
                    //正在表现时则返回
                    return;
                }
                if (this._pauseBoss) {
                    //暂停表现时则返回
                    return;
                }
                if (!mod.SceneUtil.isShowMain() || !mod.ViewMgr.getIns().isMain()) {
                    //非挂机场景或者主界面时则返回
                    this._pauseBoss = true;
                    return;
                }
                var info = this.popBoss();
                if (!info) {
                    return;
                }
                if (info.endTime <= TimeMgr.time.serverTimeSecond) {
                    this.showNextBoss();
                    return;
                }
                this._isShowBoss = true;
                this._delayBoss = delayCall(Handler.alloc(this, function () {
                    _this._delayBoss = 0;
                    if (info.type == 2 /* Abyss */) {
                        facade.showView("22" /* Boss */, "15" /* AbyssTips */);
                    }
                    else if (info.type == 1 /* CrossBoss */) {
                        facade.showView("22" /* Boss */, "16" /* CrossBossTips */);
                    }
                    else if (info.type == 3 /* KuafuDoufa */) {
                        facade.showView("52" /* Compete */, "46" /* KuafuDoufaTips */);
                    }
                    else if (info.type == 4 /* XianjieLuandou */) {
                        facade.showView("61" /* More */, "179" /* XianjieLuandouBossTips */);
                    }
                }), 200); //延迟执行，防止界面重复弹窗时，外显全部回收问题
            };
            PropTipsMgr.prototype.popBoss = function () {
                return this._boss_queue.shift();
            };
            //结束当前表现
            PropTipsMgr.prototype.closeBoss = function () {
                this._isShowBoss = false;
                this.showNextBoss();
            };
            //继续当前表现
            PropTipsMgr.prototype.continueBoss = function () {
                this._pauseBoss = false;
                this.showNextBoss();
            };
            return PropTipsMgr;
        }());
        mod.PropTipsMgr = PropTipsMgr;
        __reflect(PropTipsMgr.prototype, "game.mod.PropTipsMgr", ["base.UpdateItem"]);
        var PropTips = /** @class */ (function (_super) {
            __extends(PropTips, _super);
            function PropTips() {
                var _this = _super.call(this) || this;
                _this.MIN_W = 299;
                _this.initUI();
                return _this;
            }
            PropTips.prototype.initUI = function () {
                this.touchEnabled = false;
                this.width = this.MIN_W;
                this.height = 64;
                this._imgBg = Pool.alloc(game.BitmapBase);
                this._imgBg.source = "tran_di3";
                this._imgBg.height = this.height;
                this._imgBg.scale9Grid = Pool.alloc(Rectangle).setTo(118, 16, 1, 1);
                this.addChild(this._imgBg);
                this._txt = new TextField();
                this._txt.textAlign = HorizontalAlign.CENTER;
                this._txt.verticalAlign = VerticalAlign.MIDDLE;
                this._txt.width = this.width;
                this._txt.height = this.height;
                this._txt.stroke = 1;
                this._txt.size = 20;
                this.addChild(this._txt);
                this.touchEnabled = false;
                this.touchChildren = false;
            };
            PropTips.prototype.show = function (item, index) {
                this.x = (game.Layer.main.width - this.width) * 0.5;
                this.y = 950;
                var prop = game.PropData.create(item.idx);
                var name = prop.cfg.name;
                this._txt.text = name + "×" + item.cnt;
                var color = game.ColorUtil.getColorByQuality2(prop.quality);
                this._txt.textColor = color;
                this.width = Math.max(this._txt.textWidth + 20, this.MIN_W);
                this._imgBg.width = this.width;
                this._txt.width = this.width;
                game.Layer.main.addChild(this);
                this.alpha = 0;
                /**16为掉落提示减少的间距*/
                Tween.get(this)
                    .to({ y: this.y - (index * (this.height - 16)) - 150, alpha: 1 }, 500, null, Sine.easeIn)
                    .delay(1100)
                    .to({ alpha: 0 }, 150)
                    .exec(Handler.alloc(this, this.onTweenDone));
            };
            PropTips.prototype.onTweenDone = function () {
                Pool.release(this);
            };
            PropTips.prototype.dispose = function () {
                this.onRelease();
            };
            PropTips.prototype.onAlloc = function () {
            };
            PropTips.prototype.onRelease = function () {
                Tween.remove(this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                var items = PropTipsMgr.getIns().props;
                var idx = items.indexOf(this);
                if (idx > -1) {
                    game.ArrayUtil.removeAt(items, idx);
                }
            };
            return PropTips;
        }(DisplayObjectContainer));
        mod.PropTips = PropTips;
        __reflect(PropTips.prototype, "game.mod.PropTips", ["base.PoolObject", "base.DisposeObject"]);
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var RankUtil = /** @class */ (function () {
            function RankUtil() {
            }
            /**请求排行榜信息*/
            RankUtil.c2s_new_rank_req_rank = function (rankType) {
                var proxy = facade.retMod("31" /* Rank */).retProxy(72 /* Rank */);
                return proxy.c2s_new_rank_req_rank(rankType);
            };
            /**请求领取大神榜 奖励*/
            RankUtil.c2s_first_rank_award = function (rankType, index) {
                var proxy = facade.retMod("31" /* Rank */).retProxy(72 /* Rank */);
                return proxy.c2s_first_rank_award(rankType, index);
            };
            /**获取排行榜信息*/
            RankUtil.getRankInfo = function (rankType) {
                var proxy = facade.retMod("31" /* Rank */).retProxy(72 /* Rank */);
                return proxy.getRankInfo(rankType);
            };
            /**获取大神榜信息*/
            RankUtil.getGodInfos = function (rankType) {
                var proxy = facade.retMod("31" /* Rank */).retProxy(72 /* Rank */);
                return proxy.getGodInfos(rankType);
            };
            /**获取红点类型*/
            RankUtil.getHintTypes = function (rankType) {
                var proxy = facade.retMod("31" /* Rank */).retProxy(72 /* Rank */);
                return proxy.getHintTypes(rankType);
            };
            /**新排行榜文本 */
            RankUtil.getMyRankTypeDesc = function (rankType, powerCN) {
                if (powerCN === void 0) { powerCN = false; }
                var proxy = facade.retMod("31" /* Rank */).retProxy(233 /* NewRank */);
                return proxy.getMyRankTypeDesc(rankType, powerCN);
            };
            /**新排行榜信息 */
            RankUtil.getNewRankInfo = function (rankType) {
                var proxy = facade.retMod("31" /* Rank */).retProxy(233 /* NewRank */);
                return proxy.getRankInfo(rankType);
            };
            RankUtil.c2s_rank_req_rank = function (rankType, event_type) {
                if (event_type === void 0) { event_type = 1; }
                var proxy = facade.retMod("31" /* Rank */).retProxy(233 /* NewRank */);
                return proxy.c2s_rank_req_rank(rankType, event_type);
            };
            return RankUtil;
        }());
        mod.RankUtil = RankUtil;
        __reflect(RankUtil.prototype, "game.mod.RankUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var TimeMgr = base.TimeMgr;
        var RoleUtil = /** @class */ (function () {
            function RoleUtil() {
            }
            /**开服天数*/
            RoleUtil.getServerDay = function () {
                var roleProxy = facade.retMod("06" /* Role */).retProxy(5 /* Role */);
                return roleProxy.serverDay;
            };
            /**登录天数*/
            RoleUtil.getLoginDay = function () {
                var roleProxy = facade.retMod("06" /* Role */).retProxy(5 /* Role */);
                return roleProxy.loginDay;
            };
            /**获取当前周几，周日返回：7*/
            RoleUtil.getCurWeekDay = function () {
                var date = new Date(TimeMgr.time.serverTime);
                var day = date.getDay();
                return day ? day : 7;
            };
            /**
             * 向服务端请求属性，监听 MainEvent.UPDATE_COMMON_ATTR 更新数据
             * @param {number} index，策划配置的属性index
             * @param type 传1表示请求军团属性，默认不传
             * @returns {attributes}
             */
            RoleUtil.getAttr = function (index, type) {
                var mainProxy = facade.retMod("05" /* Main */).retProxy(3 /* Main */);
                return mainProxy.getAttr(index, type);
            };
            /**
             * 向服务端请求属性列表，监听 MainEvent.UPDATE_COMMON_ATTR 更新数据
             * @param {number[]} indexList，策划配置的属性index
             * @param type 传1表示请求军团属性，默认不传
             * @returns {attributes[]}
             */
            RoleUtil.getAttrList = function (indexList, type) {
                var mainProxy = facade.retMod("05" /* Main */).retProxy(3 /* Main */);
                return mainProxy.getAttrList(indexList, type);
            };
            /**判断是否有某属性，只判断不请求*/
            RoleUtil.checkAttr = function (index) {
                var mainProxy = facade.retMod("05" /* Main */).retProxy(3 /* Main */);
                return mainProxy.checkAttr(index);
            };
            /**
             * 判断是否有某属性，只判断不请求
             * 全都有返回true，否则false
             */
            RoleUtil.checkAttrList = function (indexList) {
                var mainProxy = facade.retMod("05" /* Main */).retProxy(3 /* Main */);
                return mainProxy.checkAttrList(indexList);
            };
            /**
             * 向服务端请求外显系统属性
             * @param openIdx，功能开启index
             */
            RoleUtil.getSurfaceAttr = function (openIdx) {
                var mainProxy = facade.retMod("05" /* Main */).retProxy(3 /* Main */);
                return mainProxy.c2s_sys_attributes(openIdx);
            };
            /**
             * 取得限制开启的文本描述
             * @param {number[]} info，策划配置的数值，限制类型_数值
             * @param {boolean} isColor, 默认显示颜色
             * @param {boolean} isProgress, 默认显示进度
             * @returns {string}
             */
            RoleUtil.getLimitStr = function (info, isColor, isProgress) {
                if (isColor === void 0) { isColor = true; }
                if (isProgress === void 0) { isProgress = true; }
                var type = info[0]; //限制条件类型
                var limit = info[1]; //限制条件数值
                var curValue = this.getLimitValueByType(type); //当前进度
                var limitValue = limit; //所需进度，转换后显示的进度
                switch (type) {
                    case 1 /* Rebirth */:
                        curValue = this.getRebirthLv(curValue);
                        limitValue = this.getRebirthLv(limitValue);
                        break;
                    case 2 /* Pass */:
                        var passProxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                        curValue = passProxy.getStepByIdx(curValue);
                        limitValue = passProxy.getStepByIdx(limitValue);
                        break;
                }
                var limitStr = game.StringUtil.getHurtNumStr(limitValue);
                var str = game.StringUtil.substitute(game.getLanById("common_act_tips" + type), [limitStr]);
                if (isProgress) {
                    var curStr = game.StringUtil.getHurtNumStr(curValue);
                    str += "（" + curStr + "/" + limitStr + "）";
                }
                if (isColor) {
                    return game.TextUtil.addColor(str, curValue >= limitValue ? 2330156 /* GREEN */ : 16719376 /* RED */);
                }
                return str;
            };
            /**
             * 取得当前达成条件数值
             * @param {number} type，限制类型
             * @returns {number}
             */
            RoleUtil.getLimitValueByType = function (type) {
                var curValue = 0; //当前进度
                switch (type) {
                    case 1 /* Rebirth */:
                        //转生
                        curValue = game.RoleVo.ins.reincarnate;
                        break;
                    case 2 /* Pass */:
                        //闯关
                        var _passProxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                        curValue = _passProxy.curIndex; //返回的是关卡索引
                        break;
                    case 3 /* God */:
                        //仙力
                        curValue = game.RoleVo.ins.god || 0;
                        break;
                    case 4 /* Power */:
                        //战力
                        curValue = game.RoleVo.ins.showpower.toNumber() || 0;
                        break;
                }
                return curValue;
            };
            /**
             * 当前限制条件是否满足
             * @param {number[]} info，策划配置的数值，限制类型_数值
             * @returns {boolean}
             */
            RoleUtil.isLimitOpen = function (info) {
                var type = info[0]; //限制条件类型
                var limit = info[1]; //限制条件数值
                var curValue = this.getLimitValueByType(type); //当前进度
                return curValue >= limit;
            };
            /**X转X重，文本,比如：仙人1转1重
             * @param {number} index 转生index，不传的话取角色自己的
             * */
            RoleUtil.getRebirthStr = function (index) {
                if (!index) {
                    index = game.RoleVo.ins.reincarnate;
                }
                var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, index);
                var zhuanLv = cfg.relv;
                if (!zhuanLv) {
                    return cfg.name; //先天期
                }
                return this.getRebirthLvStr(index) + this.getRebirthSubLvStr(index);
            };
            /**转生名字，文本
             * @param {number} index 转生index，不传的话取角色自己的
             * */
            RoleUtil.getRebirthName = function (index) {
                if (!index) {
                    index = game.RoleVo.ins.reincarnate;
                }
                var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, index);
                return cfg ? cfg.name : "";
            };
            /**转生转数
             * @param {number} index 转生index，不传的话取角色自己的
             * */
            RoleUtil.getRebirthLv = function (index) {
                if (!index) {
                    index = game.RoleVo.ins.reincarnate;
                }
                var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, index);
                return cfg.relv;
            };
            /**转生转数文本，X转
             * @param {number} index 转生index，不传的话取角色自己的
             * */
            RoleUtil.getRebirthLvStr = function (index) {
                var lvStr = this.getRebirthLvStrNoZhuan(index);
                return lvStr + game.getLanById("zhuan" /* zhuan */);
            };
            /**转生转数文本，不带转，如：仙人1
             * >=10 就是仙人转数了，比如：10就是仙人1转   【ID1015683】BOSS转生显示
             * @param {number} index 转生index，不传的话取角色自己的
             * */
            RoleUtil.getRebirthLvStrNoZhuan = function (index) {
                var lv = this.getRebirthLv(index);
                if (lv >= game.RebirthMaxLv) {
                    lv = lv - game.RebirthMaxLv + 1; //仙人X转
                    return game.getLanById("xianren_tips1" /* xianren_tips1 */) + lv;
                }
                return lv + "";
            };
            /**转生重数
             * @param {number} index 转生index，不传的话取角色自己的
             * */
            RoleUtil.getRebirthSubLv = function (index) {
                if (!index) {
                    index = game.RoleVo.ins.reincarnate;
                }
                var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, index);
                return cfg.relv2;
            };
            /**转生重数文本，X重
             * @param {number} index 转生index，不传的话取角色自己的
             * */
            RoleUtil.getRebirthSubLvStr = function (index) {
                var lv = this.getRebirthSubLv(index);
                return lv + game.getLanById("chong" /* chong */);
            };
            /**是否有特权*/
            RoleUtil.hasPrivilege = function (key) {
                var roleProxy = facade.retMod("06" /* Role */).retProxy(5 /* Role */);
                return roleProxy.hasPrivilege(key);
            };
            /**特权值，万分比*/
            RoleUtil.getPrivilegeValue = function (key) {
                var roleProxy = facade.retMod("06" /* Role */).retProxy(5 /* Role */);
                return roleProxy.getPrivilegeValue(key);
            };
            /**主角光环是否激活*/
            RoleUtil.isRoleRingAct = function (type) {
                var proxy = facade.retMod("27" /* Activity */).retProxy(212 /* RoleRing */);
                return proxy.isRoleRingAct(type);
            };
            /**是否加入仙宗 */
            RoleUtil.isInUnion = function () {
                var proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                return proxy.isInUnion;
            };
            /**仙宗id */
            RoleUtil.getGuildId = function () {
                var proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                return proxy.guild_id;
            };
            /**仙宗名字 */
            RoleUtil.getGuildName = function () {
                var proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                return proxy.guild_name;
            };
            RoleUtil.getGuildJob = function () {
                var proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                return proxy.guild_job;
            };
            /**战队id */
            RoleUtil.getTeamId = function () {
                var zhanduiProxy = facade.retMod("61" /* More */).retProxy(251 /* Zhandui */);
                return zhanduiProxy.team_id;
            };
            /**仙侣信息*/
            RoleUtil.getBanlvInfo = function () {
                var xianlvProxy = facade.retMod("58" /* Xianyuan */).retProxy(226 /* Xianlv */);
                return xianlvProxy.getBanlvInfo();
            };
            /**
             * 克隆数据
             */
            RoleUtil.clone = function (obj) {
                if (!obj) {
                    return null;
                }
                var result = {};
                var keys = Object.keys(obj);
                for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
                    var k = keys_5[_i];
                    result[k] = obj[k];
                }
                return result;
            };
            //判断对象是否有值
            RoleUtil.hasObj = function (obj) {
                for (var k in obj) {
                    return true;
                }
                return false;
            };
            //计算闯关关卡
            RoleUtil.calcGuanqia = function (index) {
                return index % 10000;
            };
            /**添加修仙女仆的自动挑战副本*/
            RoleUtil.addAutoChallengeEvent = function (type, handler) {
                var proxy = game.getProxy("06" /* Role */, 258 /* XiuxianNvpu */);
                proxy.addAutoChallengeEvent(type, handler);
            };
            /**
             * 移除修仙女仆的自动挑战副本
             * @param type
             * @param isReset 当前正在处理类型==type且是特殊情况，马上重置处理下一轮，默认false。一般不需要传，退出副本或者关闭扫荡界面等，会重置处理下一轮。
             */
            RoleUtil.removeAutoChallengeEvent = function (type, isReset) {
                if (isReset === void 0) { isReset = false; }
                var proxy = game.getProxy("06" /* Role */, 258 /* XiuxianNvpu */);
                proxy.removeAutoChallengeEvent(type, isReset);
            };
            /**当前正在处理的修仙女仆自动挑战副本类型*/
            RoleUtil.getAutoChallengeEventType = function () {
                var proxy = game.getProxy("06" /* Role */, 258 /* XiuxianNvpu */);
                return proxy.autoChallengeEventType;
            };
            /**女仆是否激活，true为激活。isTips是否飘字，showConfirm是否展示确定弹窗*/
            RoleUtil.isNvpuAct = function (isTips, showConfirm) {
                if (isTips === void 0) { isTips = false; }
                if (showConfirm === void 0) { showConfirm = false; }
                var proxy = game.getProxy("06" /* Role */, 258 /* XiuxianNvpu */);
                return proxy.isActed(isTips, showConfirm);
            };
            /**女仆神灵幻化等级*/
            RoleUtil.getNvpuShowIndex = function () {
                var proxy = game.getProxy("06" /* Role */, 258 /* XiuxianNvpu */);
                if (!proxy.isActed()) {
                    return 0;
                }
                return proxy.show_index;
            };
            /**女仆神灵id*/
            RoleUtil.getNvpuShenlingId = function () {
                var proxy = game.getProxy("06" /* Role */, 258 /* XiuxianNvpu */);
                return proxy.shenlingId;
            };
            /**判断挂机类型勾选状态*/
            RoleUtil.isNvpuOnlineSelected = function (eventType) {
                var proxy = game.getProxy("06" /* Role */, 258 /* XiuxianNvpu */);
                return proxy.isNvpuOnlineSelected(eventType);
            };
            /**修改勾选状态 selected表示勾选状态*/
            RoleUtil.setNvpuOnlineSetting = function (eventType, selected) {
                var proxy = game.getProxy("06" /* Role */, 258 /* XiuxianNvpu */);
                return proxy.setNvpuOnlineSetting(eventType, selected);
            };
            /**
             * god 仙力
             * cfgShowpower 配置表战力  包括道具表和属性表 的 Showpower
             * */
            RoleUtil.getSurfacePower = function (god, cfgShowpower) {
                if (!god) {
                    god = 0;
                }
                if (!cfgShowpower) {
                    cfgShowpower = 0;
                }
                var god_rate = game.RoleVo.ins.getValueByKey("god_rate" /* god_rate */) || 0;
                var power = cfgShowpower + 2500 * god * (god_rate / 10000);
                return power;
            };
            return RoleUtil;
        }());
        mod.RoleUtil = RoleUtil;
        __reflect(RoleUtil.prototype, "game.mod.RoleUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var SceneUtil = /** @class */ (function () {
            function SceneUtil() {
            }
            /** 获取当前场景类型*/
            SceneUtil.getCurSceneType = function () {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                return s_proxy.curSceneType;
            };
            /** 获取当前场景idx*/
            SceneUtil.getCurSceneIdx = function () {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                return s_proxy.curSceneIdx;
            };
            /**
             * 根据id获取实体vo
             * @param id
             */
            SceneUtil.getVoByIdx = function (id) {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                return s_proxy.getVoById(id);
            };
            SceneUtil.getVoByRoleId = function (roleId, camp) {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                return s_proxy.getVoByRoleId(roleId, camp);
            };
            /** 主角Vo*/
            SceneUtil.getMainPlayerVo = function () {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                return s_proxy.mainPlayerVo;
            };
            /** 主角Obj*/
            SceneUtil.getMainPlayerObj = function () {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                return s_proxy.mainPlayerObj;
            };
            /** 场景Obj*/
            SceneUtil.getSceneObj = function () {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                return s_proxy.scene;
            };
            SceneUtil.getSceneObjById = function (id) {
                var scene = this.getSceneObj();
                return scene.ctrl && scene.ctrl.getObj(id);
            };
            /** 场景Obj*/
            SceneUtil.getCurSceneCfg = function () {
                var cfg = game.getConfigByNameId("scene.json" /* Scene */, this.getCurSceneIdx());
                return cfg;
            };
            /** 点击退出场景，实际上不退出场景，而是提前结算奖励*/
            SceneUtil.clickExit = function () {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                var type = s_proxy.curSceneType;
                switch (type) {
                    case 111 /* Yuanling */:
                        // 元灵试炼副本，组队退出不需要结算界面，个人挑战大于一层则需要
                        var proxy = game.getProxy("49" /* Shilian */, 197 /* YuanlingFuben */);
                        if (proxy.onTeam() || proxy.curLayer() == 1) {
                            s_proxy.exitScene();
                            return;
                        }
                        break;
                    case 113 /* ManyBoss */:
                    case 115 /* CrossBoss */:
                    case 109 /* Forbidden */:
                    case 120 /* Yijie */:
                    case 121 /* YonghengYijie */:
                    case 123 /* Friend */:
                    case 119 /* Yjjs */:
                    case 110 /* Xianta */:
                    case 124 /* Abyss */:
                    case 126 /* Sea */:
                    case 129 /* KuafuDoufa */:
                    case 130 /* XianjieLuandou */:
                        s_proxy.exitScene(); //特殊场景，直接退出场景
                        facade.sendNt("on_xiuxiannvpu_special_challenge_next" /* ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT */, true);
                        return;
                }
                s_proxy.clickExit(); //弹结算界面
                facade.sendNt("on_xiuxiannvpu_special_challenge_next" /* ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT */, true); //修仙女仆的自动挑战，手动退出，重新计算30秒
            };
            /** 退出场景*/
            SceneUtil.exitScene = function () {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                s_proxy.exitScene();
            };
            /** 显示主界面 UI */
            SceneUtil.isShowMain = function () {
                var type = this.getCurSceneType();
                var isShow = false;
                if (type == 106 /* HangUp2 */) {
                    //挂机场景，且不在挑战boss
                    var _passProxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                    isShow = !_passProxy.challengeBoss;
                }
                return isShow;
            };
            /** 清除奖励预览id */
            SceneUtil.resetReward = function () {
                this._rewardInfo = null;
            };
            SceneUtil.getReward = function () {
                return this._rewardInfo;
            };
            /** 设置奖励预览id
             * @param sceneType，场景类型
             * @param rewardId，奖励预览id
             * */
            SceneUtil.setReward = function (sceneType, rewardId) {
                this._rewardInfo = [sceneType, rewardId];
            };
            /** 归属者 */
            SceneUtil.getBelong = function () {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                return s_proxy.belong;
            };
            /** 最高伤害攻击者 */
            SceneUtil.getMaxHurt = function () {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                return s_proxy.maxHurt;
            };
            /** 副本通用结束时间戳 */
            SceneUtil.getEndTime = function () {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                return s_proxy.endTime;
            };
            SceneUtil.requestControlAI = function (ret) {
                var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                s_proxy.requestControlAI(ret);
            };
            /** 是否是Pvp场景 */
            SceneUtil.isPvpScene = function () {
                var cfg = this.getCurSceneCfg();
                return cfg && cfg.fight_type == 1 /* PVP */;
            };
            /** 是否是对应场景 */
            SceneUtil.isSceneType = function (sceneType) {
                var type = this.getCurSceneType();
                return type == sceneType;
            };
            /**
             * 场景震屏
             * @param times 震屏次数
             * @param times 震屏的时间
             */
            SceneUtil.shake = function (times, time) {
                if (times === void 0) { times = 3; }
                if (time === void 0) { time = 300; }
                facade.sendNt("on_scene_shake" /* ON_SCENE_SHAKE */, [times, time]); //震屏
            };
            /**
             * 场景表中 atk_delay
             * @param sceneId 场景id
             */
            SceneUtil.atkDelay = function () {
                var sceneId = this.getCurSceneIdx();
                var cfg = game.getConfigByNameId("scene.json" /* Scene */, sceneId);
                return (cfg.atk_delay || 0);
            };
            /**
             * 获取可攻击目标ID
             */
            SceneUtil.getAttackTargetId = function (showTips) {
                var targetId;
                var proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                if (this.isPvpScene()) {
                    targetId = proxy.foeTargetId; //PVP场景时候返回攻击目标
                }
                else {
                    var target = proxy.mainAi && proxy.mainAi.getAttackTarget();
                    targetId = target && target.entity_id; //寻怪
                }
                if (!targetId && showTips) {
                    game.PromptBox.getIns().show(game.getLanById("not_target_atk" /* not_target_atk */));
                }
                return targetId;
            };
            /**
             * 使用技能
             */
            SceneUtil.useSkill = function (skillIdx, focus, type, x, y, tx, ty) {
                var proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                proxy.useSkill(skillIdx, focus, type, x, y, tx, ty);
            };
            return SceneUtil;
        }());
        mod.SceneUtil = SceneUtil;
        __reflect(SceneUtil.prototype, "game.mod.SceneUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Tween = base.Tween;
        var ScrollUtil = /** @class */ (function () {
            function ScrollUtil() {
            }
            /**
             * 左右按钮显示与红点
             * @param {Scroller} scroller 滚动窗
             * @param {Button} btn_last 左按钮
             * @param {Button} btn_next 右按钮
             * childWidth：item宽度
             * @param {boolean} showHint 显示红点
             * */
            ScrollUtil.changeBtnShow = function (scroller, btn_last, btn_next, childWidth, showHint) {
                if (showHint === void 0) { showHint = true; }
                if (!scroller || !btn_last || !btn_next)
                    return;
                var viewport = scroller.viewport;
                var scrollH = viewport.scrollH;
                var contentWidth = viewport.contentWidth; //可能为0
                //let child_num = viewport.numChildren;
                //let child_width = (contentWidth - (child_num - 1) * gap) / child_num;
                btn_last.visible = scrollH > childWidth; //大于一个item时候显示
                var offsetX = 30; //红点宽度，大概遮挡30的时候显示
                btn_next.visible = scrollH <= contentWidth - scroller.width - offsetX; //最后一个item遮挡小于30时候不显示
                if (!showHint) {
                    return;
                }
                var gap = viewport.layout.gap;
                // 左红点
                if (btn_last.visible) {
                    var hint = false;
                    var leftPos = Math.floor((scrollH + gap) / (childWidth + gap)); //向下取整
                    for (var i = 0; i < leftPos; i++) {
                        var item = viewport.getVirtualElementAt(i);
                        if (this.checkHint(item)) {
                            hint = true;
                            break;
                        }
                    }
                    btn_last.redPoint.visible = hint;
                }
                // 右红点
                if (btn_next.visible) {
                    var hint = false;
                    var child_num = viewport.numElements;
                    var rightPos = Math.floor((scroller.width + gap + scrollH) / (childWidth + gap)); //列表显示到第几个item，向下取整
                    for (var i = rightPos; i < child_num; i++) {
                        var item = viewport.getVirtualElementAt(i);
                        if (this.checkHint(item)) {
                            hint = true;
                            break;
                        }
                    }
                    btn_next.redPoint.visible = hint;
                }
            };
            ScrollUtil.checkHint = function (item) {
                if (!item)
                    return false;
                if (item["redPoint"] && item["redPoint"].visible) {
                    return true;
                }
                // else {
                //     for (let child of item.$children) {
                //         if (!(child instanceof Btn) && !(child instanceof Icon)) continue;
                //         if (child["redPoint"] && child["redPoint"].visible) {
                //             return true;
                //         }
                //     }
                // }
                return false;
            };
            /**
             * 水平滚动
             * @param {Scroller} scroller 滚动窗
             * @param {number} dir 1左 2右
             * @param {number} time 动画时间
             * */
            ScrollUtil.moveH = function (scroller, dir, time) {
                if (time === void 0) { time = 100; }
                if (!scroller)
                    return;
                var viewport = scroller.viewport;
                var scrollH = viewport.scrollH;
                var tarScrollH = 0;
                if (dir == 1) {
                    tarScrollH = Math.max((viewport.scrollH - scroller.width), 0);
                }
                else {
                    if (viewport.contentWidth > scroller.width) {
                        tarScrollH = Math.min((scrollH + scroller.width), viewport.contentWidth - scroller.width);
                        if (tarScrollH - scroller.viewport.scrollH <= 0)
                            return;
                    }
                }
                var tick = Math.abs(tarScrollH - scroller.viewport.scrollH) / ScrollUtil.SCROLL_SPEED * 1000;
                if (time) {
                    tick = time;
                }
                Tween.remove(viewport);
                Tween.get(viewport).to({ scrollH: tarScrollH }, tick);
            };
            /**
             * 垂直滚动
             * @param {Scroller} scroller 滚动窗
             * @param {number} dir 1上 2下
             * @param {number} time 动画时间
             * */
            ScrollUtil.moveV = function (scroller, dir, time) {
                if (!scroller)
                    return;
                var viewport = scroller.viewport;
                var scrollV = viewport.scrollV;
                var tarScrollV = 0;
                if (dir == 1) {
                    tarScrollV = Math.max((viewport.scrollV - scroller.height), 0);
                }
                else {
                    if (viewport.contentHeight > scroller.height) {
                        tarScrollV = Math.min((scrollV + scroller.height), viewport.contentHeight - scroller.height);
                        if (tarScrollV - scroller.viewport.scrollV <= 0)
                            return;
                    }
                }
                var tick = Math.abs(tarScrollV - scroller.viewport.scrollV) / ScrollUtil.SCROLL_SPEED * 1000;
                if (time) {
                    tick = time;
                }
                Tween.remove(viewport);
                Tween.get(viewport).to({ scrollV: tarScrollV }, tick);
            };
            /** 水平移动到指定位置
             * scroller : 滚动条
             * pos ： 列表的index，0开始
             * childWidth：item宽度
             * time：滚动的时间
             * */
            ScrollUtil.moveHToAssign = function (scroller, pos, childWidth, time) {
                if (time === void 0) { time = 100; }
                if (!scroller)
                    return;
                var viewport = scroller.viewport;
                viewport.scrollH = 0;
                //let list_width: number = viewport.contentWidth;//contentWidth可能为0
                var child_num = Math.max(viewport.numChildren, pos + 1); //防止Children未加载
                var gap = viewport.layout.gap;
                //let child_width: number = (list_width - (child_num - 1) * gap) / child_num;
                var list_width = child_num * childWidth + (child_num - 1) * gap;
                var tarScrollH = pos * childWidth + (pos - 1) * gap;
                tarScrollH = Math.max(0, Math.min(tarScrollH, list_width - scroller.width));
                var tick = Math.abs(tarScrollH - scroller.viewport.scrollH) / ScrollUtil.SCROLL_SPEED * 1000;
                if (time) {
                    tick = time;
                }
                Tween.remove(viewport);
                Tween.get(viewport).to({ scrollH: tarScrollH }, tick);
            };
            /** 垂直移动到指定位置
             * notReset：默认重置scrollV
             * maxScrollV: 默认计算最大ScrollV*/
            ScrollUtil.moveVToAssign = function (scroller, pos, childHeight, time, child, notReset, maxScrollV) {
                if (!scroller)
                    return;
                var viewport = scroller.viewport;
                if (!notReset) {
                    viewport.scrollV = 0;
                }
                var child_num = Math.max(child || viewport.numChildren, pos + 1);
                var gap = viewport.layout.gap;
                if (gap == undefined) {
                    gap = viewport.layout.verticalGap;
                }
                var list_height = child_num * childHeight + (child_num - 1) * gap;
                if (viewport.contentHeight && list_height < viewport.contentHeight) {
                    //兼容处理，如果取得到contentHeight
                    list_height = viewport.contentHeight;
                }
                var tarScrollV = pos * childHeight + (pos - 1) * gap;
                if (!maxScrollV) {
                    tarScrollV = Math.max(0, Math.min(tarScrollV, list_height - scroller.height));
                }
                else {
                    tarScrollV = Math.max(0, tarScrollV);
                }
                var tick = Math.abs(tarScrollV - scroller.viewport.scrollV) / ScrollUtil.SCROLL_SPEED * 1000;
                if (time) {
                    tick = time;
                }
                Tween.remove(viewport);
                Tween.get(viewport).to({ scrollV: tarScrollV }, tick);
            };
            ScrollUtil.SCROLL_SPEED = 1500;
            ScrollUtil.SCROLL_DIR_LEFT = 1;
            ScrollUtil.SCROLL_DIR_RIGHT = 2;
            return ScrollUtil;
        }());
        mod.ScrollUtil = ScrollUtil;
        __reflect(ScrollUtil.prototype, "game.mod.ScrollUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var StoreUtil = /** @class */ (function () {
            function StoreUtil() {
            }
            /**
             * 根据类型获取对应的商店数据
             * @param type
             */
            StoreUtil.getStoreCfgListByType = function (type) {
                if (this._storeMap[type]) {
                    return this._storeMap[type];
                }
                this._storeMap = {};
                var cfgs = game.getConfigListByName("shop.json" /* Store */);
                for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                    var cfg = cfgs_1[_i];
                    if (!cfg) {
                        continue;
                    }
                    if (!this._storeMap[cfg.type]) {
                        this._storeMap[cfg.type] = [];
                    }
                    this._storeMap[cfg.type].push(cfg);
                }
                return this._storeMap[type];
            };
            /**
             * 商品是否展示
             * @param cfg
             */
            StoreUtil.checkStoreCfgShow = function (cfg) {
                if (!cfg) {
                    return false;
                }
                //转生
                if (cfg.unlock_type == 1 /* Rebirth */) {
                    var relv = mod.RoleUtil.getRebirthLv();
                    if (relv < cfg.unlock) {
                        return false;
                    }
                }
                //vip
                if (cfg.unlock_type == 2 /* Vip */) {
                    var vip = game.RoleVo.ins.vip_lv || 0;
                    if (cfg.unlock > vip) {
                        return false;
                    }
                }
                return true;
            };
            /**
             * 获取 direct_shop 配置
             * @param type DirectShopType
             */
            StoreUtil.getDirectShopCfgListByType = function (type) {
                if (this._directShopMap[type]) {
                    return this._directShopMap[type];
                }
                this._directShopMap = {};
                var obj = game.getConfigByName("direct_shop.json" /* DirectShop */);
                for (var key in obj) {
                    if (!this._directShopMap[+key]) {
                        this._directShopMap[+key] = [];
                    }
                    for (var id in obj[key]) {
                        this._directShopMap[+key].push(obj[key][id]);
                    }
                    this._directShopMap[+key].sort(function (a, b) {
                        return a.sort - b.sort;
                    });
                }
                return this._directShopMap[type];
            };
            /**兑换信息请求 */
            StoreUtil.c2s_exchange_shop_info = function (shop_type) {
                var proxy = game.getProxy("27" /* Activity */, 215 /* ExchangeShop */);
                proxy.c2s_exchange_shop_info(shop_type);
            };
            StoreUtil.c2s_exchange_shop_buy_prop = function (index, shop_type, buy_cnt) {
                var proxy = game.getProxy("27" /* Activity */, 215 /* ExchangeShop */);
                proxy.c2s_exchange_shop_buy_prop(index, buy_cnt, shop_type);
            };
            StoreUtil.getInfoByTypeIndex = function (index, shop_type) {
                var proxy = game.getProxy("27" /* Activity */, 215 /* ExchangeShop */);
                return proxy.getInfoByTypeIndex(index, shop_type);
            };
            StoreUtil._storeMap = {};
            StoreUtil._directShopMap = {};
            return StoreUtil;
        }());
        mod.StoreUtil = StoreUtil;
        __reflect(StoreUtil.prototype, "game.mod.StoreUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var SurfaceUtil = /** @class */ (function () {
            function SurfaceUtil() {
            }
            SurfaceUtil.initProxy = function () {
                this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                this._sProxy = facade.retMod("45" /* Shenling */).retProxy(189 /* Shenling */);
                this._lProxy = facade.retMod("46" /* Surface */).retProxy(192 /* Lingchong */);
            };
            /**
             *外显是否激活
             * @param index，外显index
             */
            SurfaceUtil.isAct = function (index) {
                if (!this._proxy) {
                    this.initProxy();
                }
                var star = this.getStar(index);
                return star > 0;
            };
            /**
             *获取外显星级
             * @param index，外显index
             */
            SurfaceUtil.getStar = function (index) {
                if (!this._proxy) {
                    this.initProxy();
                }
                var star = 0;
                var headType = game.PropData.getPropParse(index, 1 /* Type */);
                switch (headType) {
                    case 400 /* Shenling */:
                        var info = this._sProxy.getInfoByIndex(index);
                        star = info && info.star || 0;
                        break;
                    case 361 /* Lingchong */:
                        var lcInfo = this._lProxy.getInfo(index);
                        star = lcInfo && lcInfo.star || 0;
                        break;
                    default:
                        star = this._proxy.getSurfacePerStar(index);
                        break;
                }
                return star;
            };
            /**
             * 获取配置最大星级
             * @param index
             */
            SurfaceUtil.getMaxStar = function (index) {
                if (!this._proxy) {
                    this.initProxy();
                }
                var headType = game.PropData.getPropParse(index, 1 /* Type */);
                var maxStar;
                switch (headType) {
                    case 400 /* Shenling */:
                        maxStar = this._sProxy.getMaxStar(index);
                        break;
                    case 361 /* Lingchong */:
                        maxStar = this._lProxy.getMaxStar(index);
                        break;
                    default:
                        maxStar = this._proxy.getSurfaceMaxStar(headType);
                }
                return maxStar;
            };
            /**
             * 外显能否激活或升星
             * @param index 外显id
             * @param isShenlingAwaken 是否包含神灵觉醒阶段的升星，默认不包含
             */
            SurfaceUtil.canUpStar = function (index, isShenlingAwaken) {
                if (isShenlingAwaken === void 0) { isShenlingAwaken = false; }
                if (!this._proxy) {
                    this.initProxy();
                }
                var headType = game.PropData.getPropParse(index);
                if (headType == 400 /* Shenling */) {
                    var hint = this._sProxy.canUpStar(index);
                    if (isShenlingAwaken && hint == false) {
                        hint = this._sProxy.canAwaken(index);
                    }
                    return hint;
                }
                else if (headType == 361 /* Lingchong */) {
                    return this._lProxy.canUpStar(index);
                }
                return this._proxy.canUpStar(index);
            };
            /**主动技能*/
            SurfaceUtil.getSurfaceSkillId = function (headType) {
                if (!this._proxy) {
                    this.initProxy();
                }
                return this._proxy.getSurfaceSkillId(headType);
            };
            /**外显等级计算阶级*/
            SurfaceUtil.calcSurfaceStage = function (lv, headType) {
                if (!lv) {
                    return 0; //防报错
                }
                if (!this._proxy) {
                    this.initProxy();
                }
                var perLv = this._proxy.getSurfacePerLv(headType);
                return Math.ceil(lv / perLv);
            };
            /**
             * 获取当前玩家的神灵进化次数或女仆神灵幻化等级
             * @param index
             */
            SurfaceUtil.getShenlingEvolution = function (index) {
                if (index == mod.RoleUtil.getNvpuShenlingId()) {
                    return mod.RoleUtil.getNvpuShowIndex();
                }
                var info = this._sProxy.getInfoByIndex(index);
                return info && info.evolutions || 0;
            };
            /**
             * 获取神灵信息
             * @param index
             * @param evolutions 神灵进化次数或者女仆神灵幻化等级。不传则使用当前玩家的
             */
            SurfaceUtil.getShenlingModelData = function (index, evolutions) {
                var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, index);
                if (!cfg) {
                    return null;
                }
                if (evolutions == undefined) {
                    evolutions = this.getShenlingEvolution(index);
                }
                if (evolutions == 0) {
                    return {
                        index: index,
                        name: cfg.name,
                        icon: cfg.icon,
                        quality: cfg.quality
                    };
                }
                var idx = Math.max(0, evolutions - 1);
                var specialQuality = 0;
                if (cfg.character) {
                    var initQuality = cfg.character[0] || 0;
                    specialQuality = initQuality + Math.max(0, evolutions - 1);
                }
                return {
                    index: index,
                    quality: game.SpecialQuality[specialQuality] || cfg.quality,
                    specialQuality: specialQuality,
                    name: cfg.names && cfg.names.split(',')[idx] || cfg.name,
                    icon: cfg.icons && cfg.icons.split(',')[idx] || cfg.icon
                };
            };
            return SurfaceUtil;
        }());
        mod.SurfaceUtil = SurfaceUtil;
        __reflect(SurfaceUtil.prototype, "game.mod.SurfaceUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var TaskUtil = /** @class */ (function () {
            function TaskUtil() {
            }
            /**
             *获取任务
             * @param taskId
             */
            TaskUtil.getTask = function (taskId) {
                var proxy = facade.retMod("13" /* Task */).retProxy(10 /* Task */);
                return proxy.getTask(taskId);
            };
            /**
             * 获取任务列表
             * @param type, 任务类型
             * @param isSort, 是否排序，默认排好序
             * @param isMerge, 是否合并任务，默认不合并
             */
            TaskUtil.getTaskList = function (type, isSort, isMerge) {
                if (isSort === void 0) { isSort = true; }
                if (isMerge === void 0) { isMerge = false; }
                var proxy = facade.retMod("13" /* Task */).retProxy(10 /* Task */);
                var taskList = proxy.getTaskList(type).concat();
                if (isMerge) {
                    //合并同系列任务
                    game.SortTools.sortMap(taskList, "task_id"); //index从小到大排序
                    var typePos = 1;
                    var mergeList = {}; //合并任务总分类
                    var endMerge = 1; //结束标志
                    for (var _i = 0, taskList_1 = taskList; _i < taskList_1.length; _i++) {
                        var task = taskList_1[_i];
                        var cfg = this.getCfg(task.task_id);
                        if (!cfg.merge) {
                            continue;
                        }
                        var mergeType = this.getMergeType(task, mergeList); //当前任务所属的合并类型
                        if (mergeType < 0) {
                            //当前类型未分类
                            mergeType = typePos;
                            if (!mergeList[mergeType]) {
                                mergeList[mergeType] = [];
                            }
                            mergeList[mergeType].push(task);
                            typePos++;
                        }
                        var nextTaskId = cfg.merge;
                        if (nextTaskId == endMerge) {
                            continue; //结束标志
                        }
                        var nextTask = this.getTask(nextTaskId);
                        if (!nextTask) {
                            continue;
                        }
                        mergeList[mergeType].push(nextTask);
                    }
                    var curMergeList = []; //每个类型的合并任务取当前进行到的任务index
                    for (var k in mergeList) {
                        var taskMergeList = mergeList[k];
                        for (var _a = 0, taskMergeList_1 = taskMergeList; _a < taskMergeList_1.length; _a++) {
                            var task = taskMergeList_1[_a];
                            if (task.status != 2 /* Draw */) {
                                //任务不是已领取状态时
                                curMergeList.push(task.task_id);
                                break;
                            }
                            else {
                                //已领取状态时，如果是结束
                                var cfg = this.getCfg(task.task_id);
                                if (cfg.merge == endMerge) {
                                    curMergeList.push(task.task_id);
                                    break;
                                }
                            }
                        }
                    }
                    var tmpList = taskList.concat();
                    taskList = [];
                    for (var _b = 0, tmpList_2 = tmpList; _b < tmpList_2.length; _b++) {
                        var task = tmpList_2[_b];
                        var cfg = this.getCfg(task.task_id);
                        if (cfg.merge && curMergeList.indexOf(cfg.index) < 0) {
                            continue;
                        }
                        taskList.push(task);
                    }
                }
                if (isSort) {
                    taskList.sort(game.SortTools.sortTask);
                }
                return taskList;
            };
            //判断是否已经在合并列表里面
            TaskUtil.getMergeType = function (task, mergeList) {
                for (var k in mergeList) {
                    var taskList = mergeList[k];
                    for (var _i = 0, taskList_2 = taskList; _i < taskList_2.length; _i++) {
                        var i = taskList_2[_i];
                        if (i.task_id == task.task_id) {
                            return parseInt(k);
                        }
                    }
                }
                return -1;
            };
            /**
             * 获取任务列表红点
             * @param type, 任务类型
             */
            TaskUtil.getTaskHint = function (type) {
                var proxy = facade.retMod("13" /* Task */).retProxy(10 /* Task */);
                return proxy.getTaskHint(type);
            };
            /** 获取任务描述，包含进度（0/2）*/
            TaskUtil.getTaskDesc = function (task, blackColor) {
                return this.getTaskDescNotSchedule(task) + this.getTaskSchedule(task, blackColor);
            };
            /** 获取任务描述，不包含进度 */
            TaskUtil.getTaskDescNotSchedule = function (task) {
                var cfg = this.getCfg(task.task_id);
                return game.StringUtil.substitute(cfg.desc, [task.target]);
            };
            /** 获取任务进度显示，（0/2） */
            TaskUtil.getTaskSchedule = function (task, blackColor) {
                var redColor = blackColor ? 16731212 /* RED */ : 16719376 /* RED */;
                var greenColor = blackColor ? 8585074 /* GREEN */ : 2330156 /* GREEN */;
                var scheduleStr = game.TextUtil.addColor("(" + task.schedule + "/" + task.target + ")", task.schedule < task.target ? redColor : greenColor);
                return scheduleStr;
            };
            /**点击任务，eftBtn: 特效起始按钮*/
            TaskUtil.clickTask = function (task, eftBtn) {
                if (!task) {
                    return; //todo，没有任务时候直接返回，个别任务需要提示的另外处理
                }
                if (task.status == 2 /* Draw */) {
                }
                else if (task.status == 1 /* Finish */) {
                    var proxy = facade.retMod("13" /* Task */).retProxy(10 /* Task */);
                    proxy.task_recv_reward_c2s(task.task_id);
                    if (eftBtn) {
                        facade.sendNt("common_add_eft" /* COMMON_ADD_EFT */, eftBtn); //领取奖励特效
                    }
                }
                else if (task.status == 0 /* NotFinish */) {
                    var cfg = game.getConfigByNameId("main_task1.json" /* MainTask1 */, task.task_id);
                    var jumpId = cfg.jump; //跳转ID
                    var jumpProp = cfg.jump_prop; //跳转道具
                    var hasJump = !!jumpId || !!jumpProp;
                    if (!hasJump) {
                        game.PromptBox.getIns().show(game.getLanById("general3" /* general3 */));
                        return;
                    }
                    if (jumpProp) {
                        //优先跳转道具
                        mod.ViewMgr.getIns().showGainWaysTips(jumpProp);
                        return;
                    }
                    if (jumpId == 1003 /* Pass2 */) {
                        //配置了跳转闯关
                        var _proxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                        _proxy.c2s_mainline_enter();
                        return;
                    }
                    var info = game.JumpDataList[jumpId];
                    if (info && info.openIdx && !mod.ViewMgr.getIns().checkViewOpen(info.openIdx, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showViewByID(cfg.jump);
                }
            };
            /**快速完成任务*/
            TaskUtil.quickTask = function (task) {
                if (!task) {
                    return;
                }
                if (task.status == 0 /* NotFinish */) {
                    var proxy = facade.retMod("13" /* Task */).retProxy(10 /* Task */);
                    proxy.c2s_quick_task(task.task_id);
                }
            };
            /**任务奖励是否可领取*/
            TaskUtil.canRewardDraw = function (task) {
                if (!task) {
                    return false;
                }
                return task.status == 1 /* Finish */;
            };
            /**任务奖励是否已领取*/
            TaskUtil.hasRewardDraw = function (task) {
                if (!task) {
                    return false;
                }
                return task.status == 2 /* Draw */;
            };
            /**任务奖励是否已全部领取*/
            TaskUtil.hasRewardAllDraw = function (type) {
                var tasks = this.getTaskList(type, false);
                for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                    var task = tasks_1[_i];
                    if (task.status != 2 /* Draw */) {
                        return false;
                    }
                }
                return true;
            };
            /** 获取任务类型*/
            TaskUtil.getTaskType = function (taskId) {
                var cfg = this.getCfg(taskId);
                return cfg.task_type;
            };
            /** 获取任务配置*/
            TaskUtil.getCfg = function (taskId) {
                var cfg = game.getConfigByNameId("main_task1.json" /* MainTask1 */, taskId);
                return cfg;
            };
            /** 获取任务奖励 */
            TaskUtil.getTaskReward = function (taskId) {
                var cfg = TaskUtil.getCfg(taskId);
                return cfg && cfg.rewards || [];
            };
            /**
             *获取主线任务
             */
            TaskUtil.getMainTask = function () {
                var tasks = this.getTaskList(1 /* Main */);
                return tasks.length ? tasks[0] : null;
            };
            //一键领取任务奖励，type：任务类型
            TaskUtil.drawRewardByType = function (type) {
                var proxy = facade.retMod("13" /* Task */).retProxy(10 /* Task */);
                proxy.c2s_one_key_task_recv_reward(type);
            };
            return TaskUtil;
        }());
        mod.TaskUtil = TaskUtil;
        __reflect(TaskUtil.prototype, "game.mod.TaskUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var Handler = base.Handler;
        var VipUtil = /** @class */ (function () {
            function VipUtil() {
            }
            /**获取VIP、SVIP图标*/
            VipUtil.getShowVipMainBg = function (vipId) {
                //todo,SVIP
                //return vipId > VIP_MAX ? "main_btn_svip" : "main_btn_vip";
                return "main_btn_vip";
            };
            /**获取VIP等级，缺省表示自己的VIP等级*/
            VipUtil.getShowVipLv = function (vipId) {
                if (vipId == undefined) {
                    vipId = game.RoleVo.ins.vip_lv;
                }
                //todo,SVIP，有修改的话需要全局搜下，有些功能拿等级来判断的
                var lv = vipId % 100;
                return lv;
            };
            /**获取VIP、SVIP文本，例如：VIP1*/
            VipUtil.getVipStr = function (vipId) {
                var lv = this.getShowVipLv(vipId);
                //todo,SVIP
                return "VIP" + lv;
            };
            /**获取VIP、SVIP字体*/
            VipUtil.getVipFont = function (vipId) {
                var lv = this.getShowVipLv(vipId);
                //todo,SVIP，"S" + lv;
                return "V" + lv;
            };
            /**VIP提示弹窗，vip等级不足，是否前往提升？*/
            VipUtil.showTips = function () {
                mod.ViewMgr.getIns().showConfirm(game.getLanById("vip_up_tips" /* vip_up_tips */), Handler.alloc(this, function () {
                    mod.ViewMgr.getIns().openCommonRechargeView();
                }));
            };
            /**
             * 购买后可达vip等级
             * @param rmb 金额
             */
            VipUtil.getNextVipByPay = function (rmb) {
                var chargeRmb = game.RoleVo.ins.charge_rmb || 0;
                var nextRmb = chargeRmb + rmb;
                if (!this.vipRmbMap) {
                    this.vipRmbMap = {};
                    var cfgList = game.getConfigListByName("vip.json" /* Vip */);
                    var size = cfgList && cfgList.length || 0;
                    for (var i = 0; i < size; i++) {
                        if (i == size - 1) {
                            continue;
                        }
                        var cfg = cfgList[i];
                        this.vipRmbMap[cfg.level + 1] = cfg.levelup_exp / 100;
                    }
                }
                var vipKeys = Object.keys(this.vipRmbMap);
                for (var i = vipKeys.length - 1; i >= 0; i--) {
                    var vip = +vipKeys[i];
                    var vipRmb = this.vipRmbMap[vip];
                    if (nextRmb >= vipRmb) {
                        return vip;
                    }
                }
                return 0;
            };
            return VipUtil;
        }());
        mod.VipUtil = VipUtil;
        __reflect(VipUtil.prototype, "game.mod.VipUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var WebReqUtil = /** @class */ (function () {
            function WebReqUtil() {
            }
            /** 点击shouq意见反馈 */
            WebReqUtil.onClickFeedBack = function (qq, content, cb, type, images) {
                var feedbackMethod = "client/feedback"; //意见反馈后台接口地址
                var url = WebReqUtil.getFeekBackUrl();
                var data = {
                    pf_id: gso.agent_id,
                    channel: gso.channel,
                    server_id: game.RoleVo.ins.server_id.toString(),
                    role_id: game.RoleVo.ins.role_id.toNumber().toString(),
                    role_name: game.RoleVo.ins.name,
                    account: gso.account,
                    qq: qq,
                    content: content,
                    type: type,
                    images: images,
                };
                console.info("===手Q意见反馈===", JSON.stringify(data));
                ggo.webReqPost(url + feedbackMethod, this.encodeUriData(data), cb);
            };
            WebReqUtil.getFeekBackUrl = function () {
                var host = "https://login-ljtx.1y-game.com/"; // 后台地址
                if (gso.channel == "test") {
                    host = "http://192.168.1.20:6002/";
                }
                return host;
            };
            WebReqUtil.encodeUriData = function (data) {
                console.info("===意见反馈返回===", JSON.stringify(data));
                var list = [];
                for (var k in data) {
                    if (!data.hasOwnProperty(k)) {
                        continue;
                    }
                    var v = data[k];
                    if (typeof v === "undefined" || typeof v === "function") {
                        continue;
                    }
                    list.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
                }
                return list.length ? list.join("&") : "";
            };
            return WebReqUtil;
        }());
        mod.WebReqUtil = WebReqUtil;
        __reflect(WebReqUtil.prototype, "game.mod.WebReqUtil");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=mod_common.js.map