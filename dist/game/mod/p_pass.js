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
        var pass;
        (function (pass) {
            var WorldMapBtnItem = /** @class */ (function (_super) {
                __extends(WorldMapBtnItem, _super);
                function WorldMapBtnItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.WorldMapBtnItemSkin";
                    return _this;
                }
                Object.defineProperty(WorldMapBtnItem.prototype, "isSelect", {
                    set: function (value) {
                        this.img_bg.source = value ? "rank_title_bg2" : "rank_title_bg1";
                    },
                    enumerable: true,
                    configurable: true
                });
                return WorldMapBtnItem;
            }(mod.Btn));
            pass.WorldMapBtnItem = WorldMapBtnItem;
            __reflect(WorldMapBtnItem.prototype, "game.mod.pass.WorldMapBtnItem");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var PassMod = /** @class */ (function (_super) {
                __extends(PassMod, _super);
                function PassMod() {
                    return _super.call(this, "42" /* Pass */) || this;
                }
                PassMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                PassMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    var self = this;
                    self.regProxy(9 /* Pass */, pass.PassProxy);
                };
                PassMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    var self = this;
                    self.regMdr("01" /* PassMain */, pass.PassMainMdr);
                    self.regMdr("02" /* PassRank */, pass.PassRankMainMdr);
                    self.regMdr("11" /* PassGodRank */, pass.PassGodRankMdr);
                    self.regMdr("10" /* WorldMapDetail */, pass.WorldMapDetailMdr);
                    self.regMdr("15" /* WorldMapBox */, pass.WorldMapBoxAwdMdr);
                    self.regMdr("12" /* QiyuanDetail1 */, pass.QiyuanDetail1Mdr);
                    self.regMdr("13" /* QiyuanDetail2 */, pass.QiyuanDetail2Mdr);
                    self.regMdr("16" /* QiyuanFigth */, pass.QiyuanFightMdr);
                    self.regMdr("14" /* PassBossTip */, pass.PassBossTipMdr);
                    self.regMdr("17" /* Preview */, pass.PreviewMainMdr);
                };
                return PassMod;
            }(game.ModBase));
            pass.PassMod = PassMod;
            __reflect(PassMod.prototype, "game.mod.pass.PassMod");
            gso.modCls.push(PassMod);
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var c2s_mainline_open_ui = msg.c2s_mainline_open_ui;
            var s2c_mainline_open_ui = msg.s2c_mainline_open_ui;
            var c2s_mainline_rank = msg.c2s_mainline_rank;
            var s2c_mainline_rank = msg.s2c_mainline_rank;
            var c2s_mainline_rank_server_award = msg.c2s_mainline_rank_server_award;
            var s2c_mainline_rank_server_award = msg.s2c_mainline_rank_server_award;
            var c2s_mainline_rank_award = msg.c2s_mainline_rank_award;
            var s2c_mainline_rank_award = msg.s2c_mainline_rank_award;
            var c2s_mainline_enter = msg.c2s_mainline_enter;
            var c2s_mainline_task_auto = msg.c2s_mainline_task_auto;
            var s2c_mainline_challenge_stage = msg.s2c_mainline_challenge_stage;
            var c2s_mainline_wroldmap = msg.c2s_mainline_wroldmap;
            var s2c_mainline_wroldmap = msg.s2c_mainline_wroldmap;
            var c2s_mainline_topthree = msg.c2s_mainline_topthree;
            var s2c_mainline_topthree = msg.s2c_mainline_topthree;
            var c2s_qiyuan_enter = msg.c2s_qiyuan_enter;
            var s2c_qiyuan_award = msg.s2c_qiyuan_award;
            var s2c_preview_online_request = msg.s2c_preview_online_request;
            var s2c_preview_ret = msg.s2c_preview_ret;
            var c2s_preview = msg.c2s_preview;
            var s2c_mainline_first_lose = msg.s2c_mainline_first_lose;
            var PassProxy = /** @class */ (function (_super) {
                __extends(PassProxy, _super);
                function PassProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._tmpIdx = 0;
                    return _this;
                    //-------------------------功能预览-----------------------------
                    // //检测功能预告气泡
                    // private checkFunctionNotice(): void {
                    //     let index = this._model.curIndex;
                    //     FunctionNoticeMgr.getIns().updateNotice(index);
                    // }
                }
                PassProxy.prototype.getModel = function () {
                    return this._model;
                };
                PassProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new pass.PassModel();
                    this.onProto(s2c_mainline_open_ui, this.s2c_mainline_open_ui, this);
                    this.onProto(s2c_mainline_rank, this.s2c_mainline_rank, this);
                    this.onProto(s2c_mainline_rank_server_award, this.s2c_mainline_rank_server_award, this);
                    this.onProto(s2c_mainline_rank_award, this.s2c_mainline_rank_award, this);
                    this.onProto(s2c_mainline_challenge_stage, this.s2c_mainline_challenge_stage, this);
                    this.onProto(s2c_mainline_wroldmap, this.s2c_mainline_wroldmap, this);
                    this.onProto(s2c_mainline_topthree, this.s2c_mainline_topthree, this);
                    this.onProto(s2c_qiyuan_award, this.s2c_qiyuan_award, this);
                    this.onProto(s2c_preview_online_request, this.s2c_preview_online_request, this);
                    this.onProto(s2c_preview_ret, this.s2c_preview_ret, this);
                    this.onProto(s2c_mainline_first_lose, this.s2c_mainline_first_lose, this);
                };
                PassProxy.prototype.s2c_mainline_first_lose = function (n) {
                    console.info("s2c_mainline_first_lose 第一次闯关失败");
                    mod.GuideMgr.getIns().firstFailedPass = true;
                    this.sendNt("on_guide_update" /* ON_GUIDE_UPDATE */);
                };
                /**打开闯关界面*/
                PassProxy.prototype.c2s_mainline_open_ui = function () {
                    this.sendProto(new c2s_mainline_open_ui());
                };
                PassProxy.prototype.s2c_mainline_open_ui = function (n) {
                    var msg = n.body;
                    if (msg.cur_index != undefined) {
                        this._model.curIndex = msg.cur_index;
                        this.updateWorldMapHint();
                        //this.checkFunctionNotice();
                        this.sendNt("main_pass_guanqia_update" /* MAIN_PASS_GUANQIA_UPDATE */); //其他系统需要监听
                    }
                    if (msg.target_wave_cnt != undefined) {
                        this._model.targetWaveCnt = msg.target_wave_cnt;
                    }
                    if (msg.now_wave_cnt != undefined) {
                        this._model.nowWaveCnt = msg.now_wave_cnt;
                    }
                    if (msg.is_auto_fin != undefined) {
                        this._model.passIsAuto = msg.is_auto_fin;
                    }
                    if (msg.max_mainline_idx != undefined) {
                        this._model.maxMainlineIdx = msg.max_mainline_idx;
                    }
                    this.onUpdateHintOfPreview();
                    this.sendNt("update_main_pass_info" /* UPDATE_MAIN_PASS_INFO */);
                };
                /**排行榜*/
                PassProxy.prototype.c2s_mainline_rank = function () {
                    var msg = new c2s_mainline_rank();
                    this.sendProto(msg);
                };
                PassProxy.prototype.s2c_mainline_rank = function (n) {
                    var msg = n.body;
                    this.sendNt("update_pass_rank_info" /* UPDATE_PASS_RANK_INFO */, msg);
                };
                /**大神榜*/
                PassProxy.prototype.c2s_mainline_rank_server_award = function () {
                    var msg = new c2s_mainline_rank_server_award();
                    this.sendProto(msg);
                };
                PassProxy.prototype.s2c_mainline_rank_server_award = function (n) {
                    var msg = n.body;
                    if (msg.infos) {
                        for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.godRankInfos[info.index] = info;
                        }
                        this.sendNt("update_pass_god_rank_info" /* UPDATE_PASS_GOD_RANK_INFO */);
                    }
                };
                /**大神榜领奖*/
                PassProxy.prototype.c2s_mainline_rank_award = function (idx) {
                    var msg = new c2s_mainline_rank_award();
                    msg.index = idx;
                    this.sendProto(msg);
                };
                PassProxy.prototype.s2c_mainline_rank_award = function (n) {
                    var msg = n.body;
                    if (msg.server_award) {
                        this._model.godRankAwdGotIds = msg.server_award;
                        this.sendNt("update_pass_god_rank_awd_got_info" /* UPDATE_PASS_GOD_RANK_AWD_GOT_INFO */);
                    }
                };
                /**开始战斗*/
                PassProxy.prototype.c2s_mainline_enter = function () {
                    var msg = new c2s_mainline_enter();
                    msg.index = this._model.curIndex;
                    this.sendProto(msg);
                };
                /** 场景信息 */
                PassProxy.prototype.s2c_mainline_challenge_stage = function (n) {
                    var msg = n.body;
                    if (msg.challenge_stage != undefined) {
                        this._model.curChallengeIdx = msg.challenge_stage;
                        //挑战挂机boss
                        this.challengeBoss = true;
                    }
                };
                Object.defineProperty(PassProxy.prototype, "challengeBoss", {
                    get: function () {
                        return this._model.challengeBoss;
                    },
                    //重置挑战挂机boss
                    set: function (val) {
                        if (this._model.challengeBoss != val) {
                            this._model.challengeBoss = val;
                            this.sendNt("challenge_hangup_boss" /* CHALLENGE_HANGUP_BOSS */);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                /** 自动闯关 */
                PassProxy.prototype.c2s_mainline_task_auto = function (bool) {
                    var msg = new c2s_mainline_task_auto();
                    msg.is_auto_fin = bool;
                    this.sendProto(msg);
                };
                /**
                 * 世界地图请求
                 * @param idx
                 */
                PassProxy.prototype.c2s_mainline_wroldmap = function (idx) {
                    var msg = new c2s_mainline_wroldmap();
                    msg.index = idx;
                    this.sendProto(msg);
                };
                PassProxy.prototype.s2c_mainline_wroldmap = function (n) {
                    var msg = n.body;
                    this._model.worldMapAwardGotIds = msg.award;
                    this.updateWorldMapHint();
                    this.sendNt("update_pass_map_awd_got_info" /* UPDATE_PASS_MAP_AWD_GOT_INFO */);
                };
                /**
                 * 世界地图详情请求
                 * @param idx
                 */
                PassProxy.prototype.c2s_mainline_topthree = function (idx) {
                    var msg = new c2s_mainline_topthree();
                    msg.index = idx;
                    this._tmpIdx = idx;
                    this.sendProto(msg);
                };
                PassProxy.prototype.s2c_mainline_topthree = function (n) {
                    var msg = n.body;
                    if (msg.infos) {
                        this._model.worldMapTopInfos[this._tmpIdx] = msg.infos;
                        this.sendNt("update_pass_world_map_top_info" /* UPDATE_PASS_WORLD_MAP_TOP_INFO */);
                    }
                };
                /**
                 * 副本奇缘挑战请求
                 * @param idx
                 */
                PassProxy.prototype.c2s_qiyuan_enter = function (idx) {
                    var msg = new c2s_qiyuan_enter();
                    msg.index = idx;
                    this._tmpIdx = idx;
                    this.sendProto(msg);
                };
                PassProxy.prototype.s2c_qiyuan_award = function (n) {
                    var msg = n.body;
                    if (msg.award) {
                        this._model.qyFbFinishIds = msg.award;
                    }
                    this._model.list = msg.list || [];
                    this.sendNt("update_pass_fb_qi_yuan_info" /* UPDATE_PASS_FB_QI_YUAN_INFO */);
                    this.onUpdateHint();
                };
                ////////////////////////////other/////////////////////////////////
                PassProxy.prototype.updateWorldMapHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1040660001 /* WorldMap */)) {
                        return;
                    }
                    var cfgs = game.getConfigListByName("worldmap.json" /* WorldMap */);
                    var hint = false;
                    for (var i = 0, len = cfgs.length; i < len; i++) {
                        hint = this.getWorldMapHint(cfgs[i]);
                        if (hint) {
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.WMBoxRewardHint);
                };
                /**
                 * 地图红点
                 * @param idx 地图id
                 * @returns
                 */
                PassProxy.prototype.getWorldMapHint = function (cfg) {
                    if (!this.isPass(cfg)) { // 未通关
                        return false;
                    }
                    var hint = !(this._model.worldMapAwardGotIds && this._model.worldMapAwardGotIds.length > 0
                        && this._model.worldMapAwardGotIds.indexOf(cfg.index) != -1);
                    return hint;
                };
                Object.defineProperty(PassProxy.prototype, "passNextIdx", {
                    get: function () {
                        return this._model.curIndex;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PassProxy.prototype, "passSceneChan", {
                    get: function () {
                        return this._model.curChallengeIdx;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PassProxy.prototype, "passMaxIdx", {
                    get: function () {
                        return this._model.maxMainlineIdx;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PassProxy.prototype, "passIsAuto", {
                    get: function () {
                        return this._model.passIsAuto;
                    },
                    set: function (v) {
                        this._model.passIsAuto = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PassProxy.prototype, "target_wave_cnt", {
                    get: function () {
                        return this._model.targetWaveCnt;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PassProxy.prototype, "now_wave_cnt", {
                    get: function () {
                        return this._model.nowWaveCnt;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PassProxy.prototype, "curIndex", {
                    get: function () {
                        return this._model.curIndex;
                    },
                    set: function (value) {
                        this._model.curIndex = value;
                        this.sendNt("update_main_pass_info" /* UPDATE_MAIN_PASS_INFO */);
                    },
                    enumerable: true,
                    configurable: true
                });
                PassProxy.prototype.changeIdxToNum = function (idx) {
                    var sNum = idx % 100;
                    var bNum = this.getStepByIdx(idx);
                    sNum = sNum > 20 ? 20 : sNum;
                    return (bNum - 1) * 20 + sNum;
                };
                PassProxy.prototype.getChapterByIdx = function (chapterIdx) {
                    return chapterIdx % 10000;
                };
                PassProxy.prototype.isCurChapter = function (mapCfg) {
                    var curStep = this._model.curStep;
                    return curStep >= this.getStepByIdx(mapCfg.gate[0]) && curStep <= this.getStepByIdx(mapCfg.gate[1]);
                };
                /**
                 * 是否已通关指定章节
                 * @param mapCfg
                 * @returns
                 */
                PassProxy.prototype.isPass = function (mapCfg) {
                    var curStep = this._model.curStep;
                    return curStep > this.getStepByIdx(mapCfg.gate[1]);
                };
                PassProxy.prototype.getStepByIdx = function (stepIdx) {
                    return stepIdx % 10000;
                };
                Object.defineProperty(PassProxy.prototype, "curStep", {
                    /**闯关关卡数*/
                    get: function () {
                        return this._model.curStep;
                    },
                    enumerable: true,
                    configurable: true
                });
                PassProxy.prototype.getIndexByCfgIndex = function (index) {
                    for (var _i = 0, _a = this._model.list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.index == index) {
                            return info.raid_count;
                        }
                    }
                    return 0;
                };
                PassProxy.prototype.onUpdateHint = function () {
                    var cfgs = game.getConfigListByName("qiyuan.json" /* Qiyuan */);
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        var task = mod.TaskUtil.getTask(cfg.param1[0]);
                        var isInStep = (cfg.limit <= this._model.curStep);
                        if (task && task.status == 1 && task.schedule >= task.target && isInStep) {
                            mod.HintMgr.setHint(true, ["42" /* Pass */, "01" /* PassMain */ + "02" /* Qiyuan */]);
                            return;
                        }
                    }
                    mod.HintMgr.setHint(false, ["42" /* Pass */, "01" /* PassMain */ + "02" /* Qiyuan */]);
                };
                PassProxy.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    var type = 34 /* Qiyuan */;
                    if (types.indexOf(type) < 0) {
                        return;
                    }
                    this.onUpdateHint();
                };
                //-------------------------功能预览-----------------------------
                PassProxy.prototype.c2s_preview = function (index) {
                    var msg = new c2s_preview();
                    msg.index = index;
                    this.sendProto(msg);
                };
                PassProxy.prototype.s2c_preview_online_request = function (n) {
                    var msg = n.body;
                    if (msg.unreward) {
                        this._model.indexs = msg.unreward;
                    }
                    this.sendNt("on_update_preview_info" /* ON_UPDATE_PREVIEW_INFO */);
                };
                PassProxy.prototype.s2c_preview_ret = function (n) {
                    var msg = n.body;
                    if (msg.index && msg.state) {
                        this._model.indexs.push(msg.index);
                    }
                    this.onUpdateHintOfPreview();
                    if (this._model.index) {
                        this.sendNt("on_update_preview_select" /* ON_UPDATE_PREVIEW_SELECT */, this._model.index);
                    }
                    else {
                        this.sendNt("on_update_preview_info" /* ON_UPDATE_PREVIEW_INFO */);
                    }
                };
                PassProxy.prototype.getShowIndex = function () {
                    var cfgArr = game.getConfigListByName("preview.json" /* Preview */);
                    var index;
                    for (var _i = 0, cfgArr_1 = cfgArr; _i < cfgArr_1.length; _i++) {
                        var cfg = cfgArr_1[_i];
                        index = cfg.index;
                        if (!mod.ViewMgr.getIns().checkMainLine(cfg.scence_limit)) {
                            return cfg.index;
                        }
                    }
                    return index;
                };
                PassProxy.prototype.getIcon = function (index) {
                    var cfg = game.getConfigByNameId("preview.json" /* Preview */, index);
                    if (cfg) {
                        return cfg.icon;
                    }
                    return "";
                };
                PassProxy.prototype.getOpenTxt = function (index) {
                    var cfg = game.getConfigByNameId("preview.json" /* Preview */, index);
                    // let open_cfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, cfg.type);
                    // let line_cfg: Gate1Config = getConfigByNameId(ConfigName.Gate, open_cfg.mainline);
                    var gate = game.getConfigByNameId("gate1.json" /* Gate */, cfg.scence_limit + 1);
                    if (!mod.ViewMgr.getIns().checkMainLine(cfg.scence_limit)) {
                        return game.StringUtil.substitute("%s开启", [gate.gate_name]);
                    }
                    return "";
                };
                PassProxy.prototype.checkBought = function (index) {
                    if (!this._model.indexs) {
                        return false;
                    }
                    return this._model.indexs.indexOf(index) > -1;
                };
                PassProxy.prototype.onUpdateHintOfPreview = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1040190001 /* Pass */)) {
                        return;
                    }
                    var cfgArr = game.getConfigListByName("preview.json" /* Preview */);
                    this._model.index = 0;
                    var i = 0;
                    for (var _i = 0, cfgArr_2 = cfgArr; _i < cfgArr_2.length; _i++) {
                        var cfg = cfgArr_2[_i];
                        var open = mod.ViewMgr.getIns().checkMainLine(cfg.scence_limit);
                        var bought = this.checkBought(cfg.index);
                        var enough = mod.BagUtil.checkPropCnt(cfg.cost[0][0], cfg.cost[0][1]);
                        if (open && !bought && enough) {
                            this._model.index = i;
                            mod.HintMgr.setHint(true, ["42" /* Pass */, "01" /* PassMain */ + "00" /* Main */, "17" /* Preview */]);
                            return;
                        }
                        i++;
                    }
                    mod.HintMgr.setHint(false, ["42" /* Pass */, "01" /* PassMain */ + "00" /* Main */, "17" /* Preview */]);
                };
                /**主页展示功能预览 */
                PassProxy.prototype.onCheckMainShow = function () {
                    var param = game.GameConfig.getParamConfigById("gnkq_tiaojian");
                    var cfg = game.getConfigByNameId("preview.json" /* Preview */, param.value);
                    return !mod.ViewMgr.getIns().checkMainLine(cfg.scence_limit);
                };
                return PassProxy;
            }(game.ProxyBase));
            pass.PassProxy = PassProxy;
            __reflect(PassProxy.prototype, "game.mod.pass.PassProxy", ["game.mod.IPassProxy", "base.IProxy"]);
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var PassBossTipView = /** @class */ (function (_super) {
                __extends(PassBossTipView, _super);
                function PassBossTipView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.PassBossTipSkin";
                    return _this;
                }
                return PassBossTipView;
            }(eui.Component));
            pass.PassBossTipView = PassBossTipView;
            __reflect(PassBossTipView.prototype, "game.mod.pass.PassBossTipView");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var PassGodRankRander = /** @class */ (function (_super) {
                __extends(PassGodRankRander, _super);
                function PassGodRankRander() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                PassGodRankRander.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this._awdDatas = new eui.ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._awdDatas;
                };
                PassGodRankRander.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_see, this.onBtnSeeClick, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_get, this.onBtnGetClick, this);
                };
                PassGodRankRander.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    this._proxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                    this._model = this._proxy.getModel();
                    this._cfg = this.data;
                    if (!this._cfg) {
                        return;
                    }
                    this._info = this._model.godRankInfos[this._cfg.index];
                    this.currentState = this._info ? "hasData" : "noData";
                    this.lab_title.text = game.getLanById("pass_max_step" /* pass_max_step */) + this._cfg.level;
                    if (this._awdDatas.length) {
                        this._awdDatas.replaceAll(this._cfg.award);
                    }
                    else {
                        this._awdDatas.source = this._cfg.award;
                    }
                    if (this._info) {
                        this.role_head.updateHeadShow(this._info.icon, this._info.icon_frame, this._info.sex);
                        this.lab_role_name.text = this._info.name;
                    }
                    this.btn_get.visible = this._model.godRankAwdGotIds
                        && this._model.godRankAwdGotIds.indexOf(this._cfg.index) != -1 ? false : true;
                    this.btn_get.redPoint.visible = this._info && this.btn_get.visible;
                };
                PassGodRankRander.prototype.onBtnSeeClick = function () {
                    if (this._info) {
                        //todo
                    }
                };
                PassGodRankRander.prototype.onBtnGetClick = function () {
                    if (this._info) {
                        this._proxy.c2s_mainline_rank_award(this._info.index);
                    }
                };
                return PassGodRankRander;
            }(mod.BaseListenerRenderer));
            pass.PassGodRankRander = PassGodRankRander;
            __reflect(PassGodRankRander.prototype, "game.mod.pass.PassGodRankRander");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var PassGodRankView = /** @class */ (function (_super) {
                __extends(PassGodRankView, _super);
                function PassGodRankView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.PassGodRankSkin";
                    return _this;
                }
                return PassGodRankView;
            }(eui.Component));
            pass.PassGodRankView = PassGodRankView;
            __reflect(PassGodRankView.prototype, "game.mod.pass.PassGodRankView");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var PassNode = /** @class */ (function (_super) {
                __extends(PassNode, _super);
                function PassNode() {
                    var _this = _super.call(this) || this;
                    _this._isSnode = false;
                    return _this;
                }
                Object.defineProperty(PassNode.prototype, "isSnode", {
                    get: function () {
                        return this._isSnode;
                    },
                    set: function (value) {
                        this.grp_1.visible = !value;
                        this.grp_2.visible = !value;
                        this._isSnode = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PassNode.prototype, "state", {
                    get: function () {
                        return this._state;
                    },
                    /**
                     * 状态
                     * @param 0-未完成，1-进行中，2-已通关
                     * @return
                     */
                    set: function (value) {
                        this._state = value;
                        switch (value) {
                            case 0:
                                this.img_state.source = "";
                                this.img_sel.visible = false;
                                break;
                            case 1:
                                // this.img_state.source = "pass_fighting";
                                this.img_sel.visible = true;
                                this.addEftByParent("chuangguanfight" /* CurPass */, this.grp_eff);
                                break;
                            case 2:
                                this.img_state.source = "pass_flag";
                                this.img_sel.visible = true;
                                break;
                            default:
                                break;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return PassNode;
            }(mod.BaseRenderer));
            pass.PassNode = PassNode;
            __reflect(PassNode.prototype, "game.mod.pass.PassNode");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var facade = base.facade;
            var PassRankRander = /** @class */ (function (_super) {
                __extends(PassRankRander, _super);
                function PassRankRander() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                PassRankRander.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    this.removeAllEffects();
                    this._proxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                    this.lab_role_name.text = this.data.name;
                    this.lab_power.text = this.data.power + "";
                    this.lab_step.text = this._proxy.getStepByIdx(this.data.count) + '';
                    this.lab_rank.text = this.data.rank_no > 3 ? "" + this.data.rank_no : '';
                    this.img_icon.source = this.data.rank_no > 3 ? "" : 'rank' + this.data.rank_no;
                    this.img_bg.source = this.data.rank_no == 1 ? "rank_bg2" : "rank_bg1";
                    if (this.data.rank_no == 1) {
                        this.addEftByParent("paihangbangtouming" /* Paihangbangtouming */, this.grp_eff);
                    }
                };
                return PassRankRander;
            }(mod.BaseRenderer));
            pass.PassRankRander = PassRankRander;
            __reflect(PassRankRander.prototype, "game.mod.pass.PassRankRander");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var PassRankView = /** @class */ (function (_super) {
                __extends(PassRankView, _super);
                function PassRankView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.PassRankSkin";
                    _this.touchEnabled = false;
                    _this.gr_gz_eff.touchEnabled = false;
                    return _this;
                }
                return PassRankView;
            }(eui.Component));
            pass.PassRankView = PassRankView;
            __reflect(PassRankView.prototype, "game.mod.pass.PassRankView");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var Component = eui.Component;
            var PassView = /** @class */ (function (_super) {
                __extends(PassView, _super);
                function PassView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.PassSkin";
                    return _this;
                }
                return PassView;
            }(Component));
            pass.PassView = PassView;
            __reflect(PassView.prototype, "game.mod.pass.PassView");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var facade = base.facade;
            var PreviewItem = /** @class */ (function (_super) {
                __extends(PreviewItem, _super);
                function PreviewItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                PreviewItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                };
                PreviewItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    this.icon.source = cfg.icon;
                    this.redPoint.visible = false;
                    var bool = mod.ViewMgr.getIns().checkMainLine(cfg.scence_limit);
                    var bought = this._proxy.checkBought(cfg.index);
                    if (!bool) {
                        var gate = game.getConfigByNameId("gate1.json" /* Gate */, cfg.scence_limit + 1);
                        this.lab.text = gate.gate_name + "\u5F00\u542F";
                    }
                    else {
                        this.lab.text = bought ? game.getLanById("tongtian4" /* tongtian4 */) : "已开启";
                    }
                    var enough = mod.BagUtil.checkPropCnt(cfg.cost[0][0], cfg.cost[0][1]);
                    this.redPoint.visible = bool && !bought && enough;
                    this.img_gray.visible = !bool;
                };
                return PreviewItem;
            }(mod.BaseRenderer));
            pass.PreviewItem = PreviewItem;
            __reflect(PreviewItem.prototype, "game.mod.pass.PreviewItem");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var PreviewView = /** @class */ (function (_super) {
                __extends(PreviewView, _super);
                function PreviewView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.PreviewSkin";
                    return _this;
                }
                return PreviewView;
            }(eui.Component));
            pass.PreviewView = PreviewView;
            __reflect(PreviewView.prototype, "game.mod.pass.PreviewView");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var QiyuanDetail1View = /** @class */ (function (_super) {
                __extends(QiyuanDetail1View, _super);
                function QiyuanDetail1View() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.QiyuanDetail1Skin";
                    return _this;
                }
                return QiyuanDetail1View;
            }(eui.Component));
            pass.QiyuanDetail1View = QiyuanDetail1View;
            __reflect(QiyuanDetail1View.prototype, "game.mod.pass.QiyuanDetail1View");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var QiyuanDetail2View = /** @class */ (function (_super) {
                __extends(QiyuanDetail2View, _super);
                function QiyuanDetail2View() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.QiyuanDetail2Skin";
                    return _this;
                }
                return QiyuanDetail2View;
            }(eui.Component));
            pass.QiyuanDetail2View = QiyuanDetail2View;
            __reflect(QiyuanDetail2View.prototype, "game.mod.pass.QiyuanDetail2View");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var QiyuanFightView = /** @class */ (function (_super) {
                __extends(QiyuanFightView, _super);
                function QiyuanFightView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.QiyuanFightSkin";
                    return _this;
                }
                return QiyuanFightView;
            }(eui.Component));
            pass.QiyuanFightView = QiyuanFightView;
            __reflect(QiyuanFightView.prototype, "game.mod.pass.QiyuanFightView");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var QiyuanItem = /** @class */ (function (_super) {
                __extends(QiyuanItem, _super);
                function QiyuanItem() {
                    var _this = _super.call(this) || this;
                    _this._isFinish = false;
                    _this._isInStep = false; // 已达到闯关条件
                    _this.skinName = "skins.pass.QiyuanItemSkin";
                    return _this;
                }
                Object.defineProperty(QiyuanItem.prototype, "isFinish", {
                    get: function () {
                        return this._isFinish;
                    },
                    set: function (value) {
                        this._isFinish = value;
                        this.btn.isFinish = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QiyuanItem.prototype, "isInStep", {
                    get: function () {
                        return this._isInStep;
                    },
                    enumerable: true,
                    configurable: true
                });
                QiyuanItem.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    var qyData = this.data;
                    if (!qyData) {
                        return;
                    }
                    this.lab_step.text = qyData.cfg.limit + "";
                    this.currentState = "state" + qyData.state;
                    this.isFinish = qyData.isFinish;
                    this._isInStep = qyData.isInStep;
                    this.progressbar.visible = qyData.isInStep;
                    this.btn.setData(qyData);
                };
                return QiyuanItem;
            }(eui.ItemRenderer));
            pass.QiyuanItem = QiyuanItem;
            __reflect(QiyuanItem.prototype, "game.mod.pass.QiyuanItem");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var QiyuanItemBtn = /** @class */ (function (_super) {
                __extends(QiyuanItemBtn, _super);
                function QiyuanItemBtn() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.QiyuanItemBtnSkin";
                    return _this;
                }
                Object.defineProperty(QiyuanItemBtn.prototype, "isFinish", {
                    set: function (value) {
                        this.img_finish.visible = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                QiyuanItemBtn.prototype.setData = function (value) {
                    this.img_icon.source = value.cfg.picture;
                    this.currentState = "state" + value.state;
                    this.isFinish = value.isFinish;
                    this.img_black.visible = !value.isInStep;
                    this.lab_desc.text = value.desc;
                    var proxy = game.getProxy("42" /* Pass */, 9 /* Pass */);
                    var index = 0;
                    if (value.cfg.event_type == 1) {
                        index = proxy.getIndexByCfgIndex(value.cfg.index) || 0;
                    }
                    var fuben = game.getConfigByNameId("qiyuan_fuben.json" /* QiyuanFuben */, value.cfg.param1[index]) || 0;
                    if (!value.isInStep || value.isFinish) {
                        this.redPoint.visible = false;
                    }
                    else {
                        //玩家战力
                        var power = game.RoleVo.ins.showpower.toNumber();
                        var power2 = fuben.power;
                        this.redPoint.visible = value.task && value.task.status == 1 && value.task.schedule >= value.task.target || power >= power2;
                    }
                };
                return QiyuanItemBtn;
            }(mod.Btn));
            pass.QiyuanItemBtn = QiyuanItemBtn;
            __reflect(QiyuanItemBtn.prototype, "game.mod.pass.QiyuanItemBtn");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var QiyuanView = /** @class */ (function (_super) {
                __extends(QiyuanView, _super);
                function QiyuanView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.QiyuanSkin";
                    return _this;
                }
                return QiyuanView;
            }(eui.Component));
            pass.QiyuanView = QiyuanView;
            __reflect(QiyuanView.prototype, "game.mod.pass.QiyuanView");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var WorldMapBoxAwdView = /** @class */ (function (_super) {
                __extends(WorldMapBoxAwdView, _super);
                function WorldMapBoxAwdView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.WorldMapBoxAwdSkin";
                    return _this;
                }
                return WorldMapBoxAwdView;
            }(eui.Component));
            pass.WorldMapBoxAwdView = WorldMapBoxAwdView;
            __reflect(WorldMapBoxAwdView.prototype, "game.mod.pass.WorldMapBoxAwdView");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var facade = base.facade;
            var WorldMapBtn = /** @class */ (function (_super) {
                __extends(WorldMapBtn, _super);
                function WorldMapBtn() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.WorldMapBtnSkin";
                    return _this;
                }
                Object.defineProperty(WorldMapBtn.prototype, "mapCfg", {
                    get: function () {
                        return this._mapCfg;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorldMapBtn.prototype, "hasAward", {
                    get: function () {
                        return this._hasAward;
                    },
                    enumerable: true,
                    configurable: true
                });
                WorldMapBtn.prototype.setData = function (mapCfg) {
                    this._mapCfg = mapCfg;
                    var proxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                    this.btn_bg.lab_idx.text = proxy.getChapterByIdx(mapCfg.index) + "";
                    this.btn_bg.lab_title.text = mapCfg.name;
                    this.btn_bg.lab_title.touchEnabled = false;
                };
                WorldMapBtn.prototype.setBox = function (show, hint) {
                    this.btn_box.visible = show;
                    this.btn_box.redPoint.visible = hint;
                    this._hasAward = hint;
                    this.removeEft();
                    if (this.btn_box.redPoint.visible) {
                        this.addEftByParent("baoxiang" /* Baoxiang */, this.btn_box.group_eft);
                    }
                };
                Object.defineProperty(WorldMapBtn.prototype, "isSelect", {
                    get: function () {
                        return this._isSelect;
                    },
                    set: function (value) {
                        this.btn_bg.isSelect = value;
                        this._isSelect = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WorldMapBtn;
            }(mod.BaseRenderer));
            pass.WorldMapBtn = WorldMapBtn;
            __reflect(WorldMapBtn.prototype, "game.mod.pass.WorldMapBtn");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var PassModel = /** @class */ (function () {
                function PassModel() {
                    this.passIsAuto = false; // 是否自动闯关
                    this.worldMapAwardGotIds = []; // 已领取过奖励的世界地图 index 列表
                    this.worldMapTopInfos = {}; // 世界地图详情
                    this.worldMapCurTaskId = 0; // 当前点击的奇缘任务
                    this.curTotalStep = 0; // 当前章节的总关卡数
                    this.startIdx = 0; // 当前章节开始关卡id
                    this.endIdx = 0; // 当前章节结束关卡id
                    this.godRankInfos = {}; // 大神榜数据
                    this.godRankAwdGotIds = []; // 已领取过奖励的大神榜 index 列表
                    this.qyFbFinishIds = []; // 已完成的副本类型的奇缘 index 列表
                    this.qyFbTotalAwdCnt = 0; // 奇缘副本奖励总数
                    this.qyFbGotsAwdCnt = 0; // 奇缘副本已获得的奖励总数
                    this.WMBoxRewardHint = ["42" /* Pass */, "01" /* PassMain */ + "01" /* WorldMap */, "11" /* PassWorldMapBox */]; //世界地图宝箱奖励红点
                    this.challengeBoss = false; //挑战boss标志
                    this.indexs = [];
                    this.index = 0;
                }
                Object.defineProperty(PassModel.prototype, "curStep", {
                    get: function () {
                        return mod.RoleUtil.calcGuanqia(this.curIndex);
                    },
                    enumerable: true,
                    configurable: true
                });
                return PassModel;
            }());
            pass.PassModel = PassModel;
            __reflect(PassModel.prototype, "game.mod.pass.PassModel");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var TouchEvent = egret.TouchEvent;
            var WorldMapContent = /** @class */ (function (_super) {
                __extends(WorldMapContent, _super);
                function WorldMapContent() {
                    var _this = _super.call(this) || this;
                    _this._cityCnt = 10;
                    _this.skinName = "skins.pass.WorldMapContentSkin";
                    return _this;
                }
                WorldMapContent.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.img_bg.source = game.ResUtil.getUiJpg("worldMap1");
                    for (var i = 0; i < this._cityCnt; i++) {
                        var btnItem = this["btn_" + i];
                        if (!btnItem) {
                            continue;
                        }
                        this.addEventListenerEx(TouchEvent.TOUCH_TAP, btnItem.btn_bg, this.onClickBtn, this);
                        this.addEventListenerEx(TouchEvent.TOUCH_TAP, btnItem.btn_box, this.onBtnGetClick, this);
                    }
                };
                WorldMapContent.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    var mapData = this.data;
                    if (!mapData) {
                        return;
                    }
                    for (var i = 0, len = mapData.length; i < this._cityCnt; i++) {
                        var btnItem = this["btn_" + i];
                        if (!btnItem) {
                            continue;
                        }
                        if (i >= len) {
                            btnItem.visible = false;
                            continue;
                        }
                        var d = mapData[i];
                        var cfgData = d.cfg;
                        btnItem.visible = true;
                        btnItem.setData(cfgData);
                        btnItem.isCurMap = d.isCurMap;
                        if (d.isPass) { // 已通关
                            btnItem.isSelect = true;
                            btnItem.setBox(d.hint, d.hint);
                        }
                        else if (btnItem.isCurMap) { // 当前关卡
                            btnItem.isSelect = true;
                            btnItem.setBox(true, false);
                            //this.addEftByParent(ResUtil.getEffectUI('glove_gem_3'), btnItem.grp_eff);
                        }
                        else { // 未通关
                            btnItem.isSelect = false;
                            btnItem.setBox(false, false);
                        }
                    }
                };
                WorldMapContent.prototype.onClickBtn = function (e) {
                    var btnItem = e.currentTarget.parent;
                    if (btnItem.mapCfg) {
                        mod.ViewMgr.getIns().showSecondPop("42" /* Pass */, "10" /* WorldMapDetail */, [btnItem.mapCfg, btnItem.isSelect]);
                    }
                };
                WorldMapContent.prototype.onBtnGetClick = function (e) {
                    var btnItem = e.currentTarget.parent;
                    mod.ViewMgr.getIns().showSecondPop("42" /* Pass */, "15" /* WorldMapBox */, [btnItem.mapCfg, btnItem.hasAward]);
                };
                return WorldMapContent;
            }(mod.BaseRenderer));
            pass.WorldMapContent = WorldMapContent;
            __reflect(WorldMapContent.prototype, "game.mod.pass.WorldMapContent");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var WorldMapDetailView = /** @class */ (function (_super) {
                __extends(WorldMapDetailView, _super);
                function WorldMapDetailView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.WorldMapDetailSkin";
                    return _this;
                }
                return WorldMapDetailView;
            }(eui.Component));
            pass.WorldMapDetailView = WorldMapDetailView;
            __reflect(WorldMapDetailView.prototype, "game.mod.pass.WorldMapDetailView");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var WorldMapOfflineIcon = /** @class */ (function (_super) {
                __extends(WorldMapOfflineIcon, _super);
                function WorldMapOfflineIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.common.CostItemSkin";
                    return _this;
                }
                WorldMapOfflineIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_cost, this.onClick, this);
                };
                /**点击弹出道具tips*/
                WorldMapOfflineIcon.prototype.onClick = function () {
                    if (this._cost) {
                        mod.ViewMgr.getIns().showPropTips(this._cost[0]);
                    }
                };
                WorldMapOfflineIcon.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.updateShow(data);
                };
                Object.defineProperty(WorldMapOfflineIcon.prototype, "imgCost", {
                    /**设置图标*/
                    set: function (img) {
                        this.img_cost.source = img;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**设置数值*/
                WorldMapOfflineIcon.prototype.setLabCost = function (str, color) {
                    if (color === void 0) { color = 8585074 /* GREEN */; }
                    this.lab_cost.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(str, color));
                };
                /**设置消耗显示，一般会配置一个数组【index，count】*/
                WorldMapOfflineIcon.prototype.updateShow = function (cost) {
                    this._cost = cost;
                    var index = cost[0];
                    var costCnt = cost[1];
                    var cfg = game.GameConfig.getPropConfigById(index);
                    this.imgCost = cfg.icon;
                    var str = game.StringUtil.getHurtNumStr(costCnt) + "/时";
                    this.setLabCost(str);
                };
                return WorldMapOfflineIcon;
            }(mod.BaseListenerRenderer));
            pass.WorldMapOfflineIcon = WorldMapOfflineIcon;
            __reflect(WorldMapOfflineIcon.prototype, "game.mod.pass.WorldMapOfflineIcon");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var WorldMapQiyuanIcon = /** @class */ (function (_super) {
                __extends(WorldMapQiyuanIcon, _super);
                function WorldMapQiyuanIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.WorldMapQiyuanIconSkin";
                    return _this;
                }
                WorldMapQiyuanIcon.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    if (!this.data) {
                        return;
                    }
                    var cfg = game.getConfigByNameId("qiyuan.json" /* Qiyuan */, this.data);
                    if (cfg) {
                        this.img_icon.source = cfg.picture;
                    }
                };
                return WorldMapQiyuanIcon;
            }(eui.ItemRenderer));
            pass.WorldMapQiyuanIcon = WorldMapQiyuanIcon;
            __reflect(WorldMapQiyuanIcon.prototype, "game.mod.pass.WorldMapQiyuanIcon");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var WorldMapView = /** @class */ (function (_super) {
                __extends(WorldMapView, _super);
                function WorldMapView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pass.WorldMapSkin";
                    return _this;
                }
                return WorldMapView;
            }(eui.Component));
            pass.WorldMapView = WorldMapView;
            __reflect(WorldMapView.prototype, "game.mod.pass.WorldMapView");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var Tween = base.Tween;
            var Handler = base.Handler;
            var PassBossTipMdr = /** @class */ (function (_super) {
                __extends(PassBossTipMdr, _super);
                function PassBossTipMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", pass.PassBossTipView);
                    _this.isEasyHide = true;
                    return _this;
                }
                PassBossTipMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                };
                PassBossTipMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                PassBossTipMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var self = this;
                    this.addEftByParent("boss_coming" /* BossComing */, this._view.group_eft, 0, 0, 0, Handler.alloc(this, function () {
                        self.closeUI();
                    }), 1);
                    this._view.group_eft.scaleX = 1.33;
                    this._view.group_eft.scaleY = 1.33;
                    this.updateData();
                };
                PassBossTipMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                PassBossTipMdr.prototype.updateData = function () {
                    //this._view.group_eft.x = 360;
                    this._view.group_eft.x = 720;
                    Tween.remove(this._view.group_eft);
                    Tween.get(this._view.group_eft)
                        //.delay(200)
                        .to({ x: 360 }, 500)
                        //.delay(500)
                        .exec(Handler.alloc(this, this.over));
                };
                PassBossTipMdr.prototype.over = function () {
                    Tween.remove(this._view.group_eft);
                };
                PassBossTipMdr.prototype.closeUI = function () {
                    var handler = this._showArgs && this._showArgs.handler;
                    if (handler) {
                        handler.exec();
                    }
                    this.hide();
                };
                return PassBossTipMdr;
            }(game.EffectMdrBase));
            pass.PassBossTipMdr = PassBossTipMdr;
            __reflect(PassBossTipMdr.prototype, "game.mod.pass.PassBossTipMdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var TouchEvent = egret.TouchEvent;
            var PassGodRankMdr = /** @class */ (function (_super) {
                __extends(PassGodRankMdr, _super);
                function PassGodRankMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", pass.PassGodRankView);
                    _this.isEasyHide = true;
                    return _this;
                }
                PassGodRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    var self = this;
                    self._view.horizontalCenter = 0;
                    self._view.verticalCenter = 0;
                    self._coll = new eui.ArrayCollection();
                    self._view.list.itemRenderer = pass.PassGodRankRander;
                    this._view.list.dataProvider = this._coll;
                };
                PassGodRankMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                PassGodRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    this.onNt("update_pass_god_rank_info" /* UPDATE_PASS_GOD_RANK_INFO */, this.updateData, this);
                    this.onNt("update_pass_god_rank_awd_got_info" /* UPDATE_PASS_GOD_RANK_AWD_GOT_INFO */, this.updateData, this);
                };
                PassGodRankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateData();
                };
                PassGodRankMdr.prototype.updateData = function () {
                    var cfgs = game.getConfigListByName("chapteraward.json" /* Chapteraward */);
                    this._coll.replaceAll(cfgs);
                };
                return PassGodRankMdr;
            }(game.MdrBase));
            pass.PassGodRankMdr = PassGodRankMdr;
            __reflect(PassGodRankMdr.prototype, "game.mod.pass.PassGodRankMdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var PassMainMdr = /** @class */ (function (_super) {
                __extends(PassMainMdr, _super);
                function PassMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "00" /* Main */,
                            openIdx: 1040190001 /* Pass */,
                            icon: "ui_tab_pass_",
                            title: "pass_tips1" /* pass_tips1 */,
                            bg: "pass_bg",
                            mdr: pass.PassMdr,
                            hintTypes: ["42" /* Pass */, "01" /* PassMain */ + "00" /* Main */],
                        },
                        {
                            btnType: "01" /* WorldMap */,
                            openIdx: 1040660001 /* WorldMap */,
                            icon: "ui_tab_worldmap_",
                            title: "pass_tips2" /* pass_tips2 */,
                            bg: "worldMap1",
                            mdr: pass.WorldMapMdr,
                            hintTypes: ["42" /* Pass */, "01" /* PassMain */ + "01" /* WorldMap */],
                        },
                        {
                            btnType: "02" /* Qiyuan */,
                            openIdx: 1041670087 /* Qiyuan */,
                            icon: "ui_tab_qiyuan_",
                            title: "pass_tips3" /* pass_tips3 */,
                            bg: "pass_map_bg2",
                            mdr: pass.QiyuanMdr,
                            hintTypes: ["42" /* Pass */, "01" /* PassMain */ + "02" /* Qiyuan */],
                        }
                    ];
                    return _this;
                }
                return PassMainMdr;
            }(mod.WndBaseMdr));
            pass.PassMainMdr = PassMainMdr;
            __reflect(PassMainMdr.prototype, "game.mod.pass.PassMainMdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var Handler = base.Handler;
            var Tween = base.Tween;
            var TimeMgr = base.TimeMgr;
            var PassMdr = /** @class */ (function (_super) {
                __extends(PassMdr, _super);
                function PassMdr(parent) {
                    var _this = _super.call(this, parent) || this;
                    _this._view = _this.mark("_view", pass.PassView);
                    _this.passNum = 11;
                    return _this;
                }
                PassMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._rewardDatas = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._rewardDatas;
                    this._proxy = this.retProxy(9 /* Pass */);
                    this._model = this._proxy.getModel();
                    this._proxy.c2s_mainline_open_ui();
                };
                PassMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_main_pass_info" /* UPDATE_MAIN_PASS_INFO */, this.updateData, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onBtnFight);
                    addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onBtnRank);
                    addEventListener(this._view.btn_preview, TouchEvent.TOUCH_TAP, this.onBtnPreview);
                    addEventListener(this._view.btn_ling, TouchEvent.TOUCH_TAP, this.onBtnLing);
                };
                PassMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._cfgs) {
                        this._cfgs = game.getConfigByName("worldmap.json" /* WorldMap */);
                    }
                    for (var k in this._cfgs) {
                        var cfg = this._cfgs[k];
                        if (cfg.gate.length < 2) {
                            continue;
                        }
                        var startStep = this._proxy.getStepByIdx(cfg.gate[0]);
                        var endStep = this._proxy.getStepByIdx(cfg.gate[1]);
                        var curStep = this._proxy.getStepByIdx(this._model.curIndex);
                        if (curStep >= startStep && curStep <= endStep) {
                            this._model.curWorldMapCfg = cfg;
                            this._model.curTotalStep = endStep - startStep + 1;
                            break;
                        }
                    }
                    this._model.startIdx = this._model.curWorldMapCfg.gate[0];
                    this._model.endIdx = this._model.curWorldMapCfg.gate[1];
                    this.addEftByParent(game.ResUtil.getEffectUI("chuangguanbeijing" /* Chuangguanbeijing */), this._view.grp_bg);
                    this._view.btn_ling.setEffect("chuangguanling" /* Chuangguanling */);
                    this._view.grp_bg.x = this._view.width;
                    Tween.get(this._view.grp_bg, { loop: true }).to({ x: -100 }, 8000);
                    this._view.btn_fight.setEffect("tiaozhan" /* Tiaozhan */);
                    this.updateData();
                    this.addEftByParent(game.ResUtil.getEffectUI("chuangguanboss" /* Chuangguanboss */), this._view.grp_boss, 0, 0, -1, null, 1);
                    TimeMgr.addUpdateItem(this, 2000);
                };
                PassMdr.prototype.update = function (time) {
                    this.addEftByParent(game.ResUtil.getEffectUI("chuangguanboss" /* Chuangguanboss */), this._view.grp_boss, 0, 0, -1, null, 1);
                };
                PassMdr.prototype.onHide = function () {
                    for (var i = 0; i < this.passNum; i++) {
                        var btn = this._view["node" + i];
                        this.clearFont(btn.grp_font);
                    }
                    this._curNode = null;
                    mod.GuideMgr.getIns().clear(16 /* PassChallege */); //清除指引
                    Tween.remove(this._view.grp_bg);
                    this.removeAllEffects();
                    this._view.btn_fight.clearEffect();
                    _super.prototype.onHide.call(this);
                };
                PassMdr.prototype.updateData = function () {
                    var offStep = this._model.curTotalStep / (this.passNum - 1); // 关卡间隔
                    var startStep = this._proxy.getStepByIdx(this._model.startIdx);
                    var endStep = this._proxy.getStepByIdx(this._model.endIdx);
                    var tipStr = game.getLanById("trial_tips9" /* trial_tips9 */);
                    var startNum = (this._model.curTotalStep == 10) ? 1 : 0; // 只有10关时，第1个节点隐藏
                    for (var i = 0; i < this.passNum; i++) {
                        if (i < this.passNum - 1) {
                            var snode = this._view["snode" + i]; // 小关卡节点
                            snode.visible = false;
                            snode.isSnode = true;
                        }
                        var btn = this._view["node" + i];
                        if (startNum == 1 && i == 0) {
                            btn.visible = false;
                            continue;
                        }
                        btn.visible = true;
                        btn.step = (i == 0) ? startStep : startStep - 1 + i * offStep;
                        if (btn.step < this._model.curStep) {
                            btn.state = 2;
                        }
                        else if (btn.step == this._model.curStep) {
                            btn.state = 1;
                        }
                        else {
                            btn.state = 0;
                        }
                        if (btn.state == 0 || btn.state == 1) {
                            var addEventListener = this.onEgret.bind(this);
                            addEventListener(btn, TouchEvent.TOUCH_TAP, this.onNode);
                        }
                        if (i == this.passNum - 1) {
                            btn.grp_1.visible = false;
                            btn.grp_2.visible = true;
                            this.addBmpFont(btn.step + "", game.BmpTextCfg[100 /* CommonPower */], btn.grp_font, true, 1, true);
                        }
                        else {
                            btn.grp_1.visible = true;
                            btn.grp_2.visible = false;
                            btn.lab_name.text = (i != this.passNum - 1) ? game.StringUtil.substitute(tipStr, [btn.step])
                                : game.StringUtil.substitute(tipStr, [endStep]);
                        }
                    }
                    this.updateCurStep();
                    this.updateOther();
                    var index = this._proxy.getShowIndex();
                    this._view.btn_preview.icon = this._proxy.getIcon(index);
                    this._view.btn_preview.setHint(mod.HintMgr.getHint(["42" /* Pass */, "01" /* PassMain */ + "00" /* Main */, "17" /* Preview */]));
                    this._view.lab_open.textFlow = game.TextUtil.parseHtml(this._proxy.getOpenTxt(index));
                };
                PassMdr.prototype.updateCurStep = function () {
                    var curStep = this._proxy.getStepByIdx(this._model.curIndex);
                    if (this._curNode && this._curNode.step == curStep) {
                        return;
                    }
                    if (this._curNode && this._curNode.isSnode) {
                        this._curNode.state = 0;
                    }
                    var b = false;
                    var node;
                    var sNode;
                    for (var i = 0; i < this.passNum; i++) {
                        node = this._view["node" + i];
                        if (node.step == curStep) {
                            b = true;
                            break;
                        }
                        if (i == this.passNum - 1 || node.step > curStep) {
                            break;
                        }
                        if (node.step < curStep) {
                            sNode = this._view["snode" + i];
                        }
                    }
                    if (b && node) {
                        node.state = 1;
                        this._curNode = node;
                    }
                    else if (sNode) {
                        sNode.visible = true;
                        sNode.state = 1;
                        this._curNode = sNode;
                        var addEventListener = this.onEgret.bind(this);
                        addEventListener(sNode, TouchEvent.TOUCH_TAP, this.onNode);
                    }
                };
                PassMdr.prototype.updateOther = function () {
                    var passCfg = game.getConfigByNameId("gate1.json" /* Gate */, this._model.curIndex);
                    this._view.lab_step_name.text = passCfg.gate_name;
                    var cfg = passCfg && passCfg.preview_id ?
                        game.getConfigByNameId("reward_preview.json" /* RewardPreview */, passCfg.preview_id) : null;
                    var awds = cfg && cfg.content ? cfg.content : null;
                    if (this._rewardDatas.length) {
                        this._rewardDatas.replaceAll(awds);
                    }
                    else {
                        this._rewardDatas.source = awds;
                    }
                    var tjPower = passCfg ? passCfg.fighting_capacitv : 0;
                    var flag = game.RoleVo.ins.showpower.gte(tjPower);
                    var isPass = this._model.nowWaveCnt >= this._model.targetWaveCnt;
                    this._view.btn_fight.visible = isPass;
                    this._view.btn_fight.redPoint.visible = isPass && flag;
                    this._view.lab_condition.text = isPass ? "" : game.StringUtil.substitute(game.getLanById("pass_tip3" /* pass_tip3 */), [this._model.targetWaveCnt - this._model.nowWaveCnt]);
                    if (isPass) {
                        mod.GuideMgr.getIns().show(16 /* PassChallege */, this._view.btn_fight, Handler.alloc(this, this.onBtnFight)); //指引
                    }
                };
                PassMdr.prototype.onNode = function (e) {
                    var node = e.currentTarget;
                    if (node.state == 0) { // 未完成
                        game.PromptBox.getIns().show("请通关前置关卡");
                    }
                    else if (node.state == 1) { // 进行中
                        this._proxy.c2s_mainline_enter();
                        facade.hideView("42" /* Pass */, "01" /* PassMain */);
                    }
                };
                PassMdr.prototype.onBtnRank = function () {
                    mod.ViewMgr.getIns().showView("42" /* Pass */, "02" /* PassRank */);
                };
                PassMdr.prototype.onBtnFight = function () {
                    if (mod.BagUtil.checkBagFull()) {
                        return;
                    }
                    this._proxy.c2s_mainline_enter();
                    //facade.hideView(ModName.Pass, PassViewType.PassMain);
                    mod.ViewMgr.getIns().showMain(); //直接返回主界面，并清除界面数据
                };
                PassMdr.prototype.onBtnPreview = function () {
                    mod.ViewMgr.getIns().showView("42" /* Pass */, "17" /* Preview */);
                };
                PassMdr.prototype.onBtnLing = function () {
                    mod.ViewMgr.getIns().showView("27" /* Activity */, "38" /* Giving */);
                };
                return PassMdr;
            }(game.EffectMdrBase));
            pass.PassMdr = PassMdr;
            __reflect(PassMdr.prototype, "game.mod.pass.PassMdr", ["base.UpdateItem"]);
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var PassRankMainMdr = /** @class */ (function (_super) {
                __extends(PassRankMainMdr, _super);
                function PassRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "00" /* Rank */,
                            icon: "ui_tab_rank_",
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            mdr: pass.PassRankMdr,
                        }
                    ];
                    return _this;
                }
                return PassRankMainMdr;
            }(mod.WndBaseMdr));
            pass.PassRankMainMdr = PassRankMainMdr;
            __reflect(PassRankMainMdr.prototype, "game.mod.pass.PassRankMainMdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var TouchEvent = egret.TouchEvent;
            var PassRankMdr = /** @class */ (function (_super) {
                __extends(PassRankMdr, _super);
                function PassRankMdr(parent) {
                    var _this = _super.call(this, parent) || this;
                    _this._view = _this.mark("_view", pass.PassRankView);
                    return _this;
                }
                PassRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._coll = new eui.ArrayCollection();
                    this._proxy = this.retProxy(9 /* Pass */);
                    this._view.list.itemRenderer = pass.PassRankRander;
                };
                PassRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_pass_rank_info" /* UPDATE_PASS_RANK_INFO */, this.updateRankInfo, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_record, TouchEvent.TOUCH_TAP, this.openGodRank);
                };
                PassRankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.list.dataProvider = this._coll;
                    this._proxy.c2s_mainline_rank();
                    this._proxy.c2s_mainline_rank_server_award();
                    this._view.btn_record.setImage("title_jilu");
                    this._view.btn_record.setEffect("baoxiang" /* Baoxiang */);
                };
                PassRankMdr.prototype.onHide = function () {
                    this._view.btn_record.clearEffect();
                    _super.prototype.onHide.call(this);
                };
                PassRankMdr.prototype.updateRankInfo = function (n) {
                    var pass_date = n.body;
                    // 模型
                    var info = pass_date.top_info;
                    if (info) {
                        this.updateRankUIRole(this._view.gr_gz_eff, info);
                    }
                    // 排名
                    if (pass_date.my_rank) {
                        this._view.lab_my_rank.text = game.getLanById("tishi_12" /* tishi_12 */) + "：" + (pass_date.my_rank <= game.MAX_RANK_NUM ? pass_date.my_rank : "20+");
                    }
                    else {
                        this._view.lab_my_rank.text = game.getLanById("tishi_12" /* tishi_12 */) + "：" + game.MAX_RANK_NUM + "+";
                    }
                    if (pass_date.my_count) {
                        this._view.lab_my_step.text = game.getLanById("tishi_11" /* tishi_11 */) + '：';
                        this.addBmpFont(this._proxy.getStepByIdx(pass_date.my_count) + "", game.BmpTextCfg[100 /* CommonPower */], this._view.grp_font, true, 1, true);
                    }
                    else {
                        this._view.lab_my_step.text = game.getLanById("tishi_11" /* tishi_11 */) + '：';
                        this.addBmpFont("1", game.BmpTextCfg[100 /* CommonPower */], this._view.grp_font, true, 1, true);
                    }
                    var temp = [];
                    if (pass_date.infos && pass_date.infos.length) {
                        temp = pass_date.infos;
                    }
                    if (this._coll.length) {
                        this._coll.replaceAll(temp);
                    }
                    else {
                        this._coll.source = temp;
                    }
                };
                PassRankMdr.prototype.openGodRank = function () {
                    mod.ViewMgr.getIns().showSecondPop("42" /* Pass */, "11" /* PassGodRank */);
                };
                return PassRankMdr;
            }(game.EffectMdrBase));
            pass.PassRankMdr = PassRankMdr;
            __reflect(PassRankMdr.prototype, "game.mod.pass.PassRankMdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var PreviewMainMdr = /** @class */ (function (_super) {
                __extends(PreviewMainMdr, _super);
                function PreviewMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            // openIdx: OpenIdx.Pass,
                            icon: "gongnengyulan",
                            title: "func_open" /* func_open */,
                            bg: "pass_bg",
                            mdr: pass.PreviewMdr,
                            hintTypes: ["42" /* Pass */, "01" /* PassMain */ + "00" /* Main */, "17" /* Preview */],
                        },
                    ];
                    return _this;
                }
                return PreviewMainMdr;
            }(mod.WndBaseMdr));
            pass.PreviewMainMdr = PreviewMainMdr;
            __reflect(PreviewMainMdr.prototype, "game.mod.pass.PreviewMainMdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var PreviewMdr = /** @class */ (function (_super) {
                __extends(PreviewMdr, _super);
                function PreviewMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", pass.PreviewView);
                    _this._listData = new ArrayCollection();
                    _this._listRewards = new ArrayCollection();
                    return _this;
                }
                PreviewMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(9 /* Pass */);
                    this._view.list.itemRenderer = pass.PreviewItem;
                    this._view.list.dataProvider = this._listData;
                    this._view.list_rewards.itemRenderer = mod.Icon;
                    this._view.list_rewards.dataProvider = this._listRewards;
                };
                PreviewMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.btn_jump, TouchEvent.TOUCH_TAP, this.onJump);
                    addEventListener(this._view.btn_lock, TouchEvent.TOUCH_TAP, this.onClickFight);
                    addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickSelect);
                    this.onNt("on_update_preview_info" /* ON_UPDATE_PREVIEW_INFO */, this.onUpdateTab, this);
                    this.onNt("on_update_preview_select" /* ON_UPDATE_PREVIEW_SELECT */, this.onUpdateSelect, this);
                };
                PreviewMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onInitTab();
                };
                PreviewMdr.prototype.onInitTab = function () {
                    this.onUpdateList();
                    var index = this._selectIndex || this._proxy.getModel().index || 0;
                    this.onUpdateIndex(index);
                };
                PreviewMdr.prototype.onUpdateTab = function () {
                    this.onUpdateList();
                    this.onUpdateView();
                };
                PreviewMdr.prototype.onUpdateList = function () {
                    var cfgArr = game.getConfigListByName("preview.json" /* Preview */);
                    this._listData.replaceAll(cfgArr);
                };
                PreviewMdr.prototype.onUpdateSelect = function (n) {
                    var index = n.body;
                    this.onUpdateList();
                    this.onUpdateIndex(index);
                };
                PreviewMdr.prototype.onUpdateIndex = function (index) {
                    this._view.list.selectedIndex = index;
                    this._selectIndex = index;
                    this.onUpdateView();
                };
                PreviewMdr.prototype.onClickSelect = function (e) {
                    this.onUpdateIndex(e.itemIndex);
                };
                PreviewMdr.prototype.onUpdateView = function () {
                    this._cfg = this._listData.source[this._view.list.selectedIndex];
                    this._listRewards.replaceAll(this._cfg.reward);
                    var bool = mod.ViewMgr.getIns().checkMainLine(this._cfg.scence_limit);
                    var bought = this._proxy.checkBought(this._cfg.index);
                    var enough = mod.BagUtil.checkPropCnt(this._cfg.cost[0][0], this._cfg.cost[0][1]);
                    this._view.img_state.visible = bool && bought;
                    this._view.btn_get.visible = bool && !bought;
                    this.removeEft();
                    if (this._view.btn_get.visible) {
                        this._view.btn_get.setCost(this._cfg.cost[0]);
                        this._view.btn_get.setHint(enough);
                        this.addEftByParent("tiaozhan" /* Tiaozhan */, this._view.btn_get.group_eft);
                    }
                    this._view.btn_lock.visible = !bool;
                    this._view.btn_jump.icon = this._cfg.icon;
                };
                PreviewMdr.prototype.onClick = function () {
                    var model = this._proxy.getModel();
                    var bought = model.indexs.indexOf(this._cfg.index) > -1;
                    if (bought) {
                        return;
                    }
                    if (!mod.BagUtil.checkPropCnt(this._cfg.cost[0][0], this._cfg.cost[0][1], 1 /* Dialog */)) {
                        return;
                    }
                    this._proxy.c2s_preview(this._cfg.index);
                };
                PreviewMdr.prototype.onJump = function () {
                    mod.ViewMgr.getIns().showViewByID(this._cfg.jumpid);
                };
                PreviewMdr.prototype.onClickFight = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1040190001 /* Pass */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("42" /* Pass */, "01" /* PassMain */);
                };
                return PreviewMdr;
            }(game.EffectMdrBase));
            pass.PreviewMdr = PreviewMdr;
            __reflect(PreviewMdr.prototype, "game.mod.pass.PreviewMdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var QiyuanDetail1Mdr = /** @class */ (function (_super) {
                __extends(QiyuanDetail1Mdr, _super);
                function QiyuanDetail1Mdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", pass.QiyuanDetail1View);
                    _this.isEasyHide = true;
                    return _this;
                }
                QiyuanDetail1Mdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._rewardDatas = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._rewardDatas;
                    this._proxy = this.retProxy(9 /* Pass */);
                    this._model = this._proxy.getModel();
                };
                QiyuanDetail1Mdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onFightBtnClick);
                };
                QiyuanDetail1Mdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._cfg = this._showArgs;
                    if (!this._cfg) {
                        return;
                    }
                    if (this._cfg.event_type == 1) {
                        var index = this._proxy.getIndexByCfgIndex(this._cfg.index);
                        this._fbCfg = game.getConfigByNameId("qiyuan_fuben.json" /* QiyuanFuben */, this._cfg.param1[index]);
                    }
                    else {
                        this._fbCfg = game.getConfigByNameId("qiyuan_fuben.json" /* QiyuanFuben */, this._cfg.param1[0]);
                    }
                    this._view.recommendPower.visible = !!this._fbCfg.power;
                    this._view.recommendPower.setPowerValue(this._fbCfg.power);
                    this.updateData();
                };
                QiyuanDetail1Mdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                QiyuanDetail1Mdr.prototype.updateData = function () {
                    if (this._fbCfg.show_rewards.length > 0) {
                        this._view.awd_icon.setData(this._fbCfg.show_rewards[0]);
                    }
                    // this._view.pro_awd.value = this._model.qyFbGotsAwdCnt;
                    // this._view.pro_awd.maximum = this._model.qyFbTotalAwdCnt;
                    var index = this._proxy.getIndexByCfgIndex(this._cfg.index);
                    this._view.pro_awd.show(index, this._cfg.param1.length, false, 0, false);
                    this._view.lab_desc.text = this._fbCfg.dec;
                    if (this._cfg.event_type == 1) {
                        //读取数组的值，转换成索引值
                        var index2 = this._cfg.param1.indexOf(this._fbCfg.index);
                        this._view.lab_awd_title.text = game.StringUtil.substitute(game.getLanById("pass_qiyuan_3" /* pass_qiyuan_3 */), [index2 + 1]);
                    }
                    else {
                        this._view.lab_awd_title.text = game.StringUtil.substitute(game.getLanById("pass_qiyuan_3" /* pass_qiyuan_3 */), [this._cfg.limit]);
                    }
                    // if (this._rewardDatas.length) {
                    //     this._rewardDatas.replaceAll(this._fbCfg.show_rewards);
                    // } else {
                    //     this._rewardDatas.source = this._fbCfg.show_rewards;
                    // }
                    this._rewardDatas.source = this._fbCfg.show_rewards;
                    // let isFinish = this._model.qyFbFinishIds.indexOf(this._cfg.index) != -1;
                    var isFinish = this._showArgs.isFinish;
                    this._view.btn_fight.visible = !isFinish;
                    //玩家战力
                    var power = game.RoleVo.ins.showpower.toNumber();
                    //玩家战力大于推荐战力显示红点
                    if (power >= this._fbCfg.power) {
                        this._view.btn_fight.redPoint.visible = true;
                    }
                    else {
                        this._view.btn_fight.redPoint.visible = false;
                    }
                };
                QiyuanDetail1Mdr.prototype.onFightBtnClick = function (e) {
                    if (this._cfg.event_type == 1) {
                        this._proxy.c2s_qiyuan_enter(this._cfg.index);
                        facade.hideView("42" /* Pass */, "01" /* PassMain */);
                        this.hide();
                    }
                    else {
                        var power = game.RoleVo.ins.showpower.toNumber();
                        if (power < this._fbCfg.power) {
                            game.PromptBox.getIns().show("对方实力深不可测，暂且避其锋芒");
                            return;
                        }
                        this.showView("16" /* QiyuanFigth */, this._cfg.index);
                    }
                };
                return QiyuanDetail1Mdr;
            }(game.MdrBase));
            pass.QiyuanDetail1Mdr = QiyuanDetail1Mdr;
            __reflect(QiyuanDetail1Mdr.prototype, "game.mod.pass.QiyuanDetail1Mdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var QiyuanDetail2Mdr = /** @class */ (function (_super) {
                __extends(QiyuanDetail2Mdr, _super);
                function QiyuanDetail2Mdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", pass.QiyuanDetail2View);
                    _this.isEasyHide = true;
                    return _this;
                }
                QiyuanDetail2Mdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._rewardDatas = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._rewardDatas;
                    this._proxy = this.retProxy(9 /* Pass */);
                };
                QiyuanDetail2Mdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_task_update" /* ON_TASK_UPDATE */, this.updateTask, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onGetBtnClick);
                };
                QiyuanDetail2Mdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._data = this._showArgs;
                    if (!this._data || !this._data.cfg) {
                        return;
                    }
                    this._tasCfg = mod.TaskUtil.getCfg(this._data.cfg.param1[0]);
                    this.updateData();
                };
                QiyuanDetail2Mdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                QiyuanDetail2Mdr.prototype.updateData = function () {
                    this._view.lab_task.visible = false;
                    this._view.lab_task.text = "";
                    this._view.lab_desc.text = this._tasCfg.desc2;
                    // if (this._rewardDatas.length) {
                    //     this._rewardDatas.replaceAll(this._tasCfg.rewards);
                    // } else {
                    //     this._rewardDatas.source = this._tasCfg.rewards;
                    // }
                    this._rewardDatas.source = this._tasCfg.rewards;
                    this._view.btn_get.redPoint.visible = this._data.task && (this._data.task.schedule >= this._data.task.target);
                    if (this._data.cfg.event_type != 3) { // 非炼丹任务
                        this._view.currentState = "canGet";
                        this._view.btn_get.labelDisplay.text = game.getLanById("tishi_29" /* tishi_29 */);
                        var bool = this._data.task.target <= this._data.task.schedule;
                        this._view.lab_task.visible = true;
                        this._view.lab_task.textFlow = game.TextUtil.parseHtml("" + this._tasCfg.title + game.TextUtil.addColor("(" + this._data.task.schedule + "/" + this._data.task.target + ")", bool ? 8585074 /* GREEN */ : 16731212 /* RED */));
                        return;
                    }
                    if (!this._data.task) { // 未接受
                        this._view.currentState = "notAccept";
                        this._view.cost.updateShow([1450000001 /* Yuanbao */, Number(this._tasCfg.param3)]);
                        this._view.btn_get.labelDisplay.text = game.getLanById("pass_buy_awd" /* pass_buy_awd */);
                        return;
                    }
                    switch (this._data.task.status) {
                        case 0 /* NotFinish */: // 炼制中
                            this._view.currentState = "refining";
                            var time = this._data.task.target - this._data.task.schedule;
                            var timeStr = game.TimeUtil.formatSecond(time * 60, "dd" + game.getLanById("shijian_1" /* shijian_1 */) + "HH" + game.getLanById("shijian_2" /* shijian_2 */) + "mm" + game.getLanById("shijian_3" /* shijian_3 */));
                            this._view.lab_tip.textFlow = game.TextUtil.parseHtml(game.getLanById("pass_refining" /* pass_refining */) + "   " + game.TextUtil.addColor(timeStr + game.getLanById("pass_refine_tip1" /* pass_refine_tip1 */), 65280 /* GREEN */));
                            var idx = this._tasCfg.quick_cost && this._tasCfg.quick_cost.length ? this._tasCfg.quick_cost[0] : 1450000002 /* Xianyu */;
                            var cnt = this._tasCfg.quick_cost && this._tasCfg.quick_cost.length ? this._tasCfg.quick_cost[1] : 0;
                            // let cnt: number = +this._tasCfg.param3;
                            this._view.cost.updateShow([idx, cnt]);
                            this._view.btn_get.labelDisplay.text = game.getLanById("get_award_quick" /* get_award_quick */);
                            break;
                        case 1 /* Finish */: // 可领取
                            this._view.currentState = "canGet";
                            this._view.btn_get.labelDisplay.text = game.getLanById("tishi_29" /* tishi_29 */);
                            break;
                        case 2 /* Draw */: // 已领取
                            this._view.currentState = "got";
                            break;
                        default:
                            break;
                    }
                };
                QiyuanDetail2Mdr.prototype.updateTask = function (n) {
                    var types = n.body;
                    if (types.indexOf(34 /* Qiyuan */) == -1) {
                        return;
                    }
                    var task = mod.TaskUtil.getTask(this._data.cfg.param1[0]);
                    if (task) {
                        this._data.task = task;
                    }
                    this.updateData();
                };
                QiyuanDetail2Mdr.prototype.onGetBtnClick = function (e) {
                    if (!this._data.task) { // 未接受
                        this._proxy.c2s_qiyuan_enter(this._data.cfg.index);
                        return;
                    }
                    if (this._data.cfg.event_type != 3) { // 非炼丹任务
                        mod.TaskUtil.clickTask(this._data.task);
                        this.hide();
                        return;
                    }
                    switch (this._data.task.status) {
                        case 0 /* NotFinish */: // 炼制中
                            var idx = this._tasCfg.quick_cost && this._tasCfg.quick_cost.length ? this._tasCfg.quick_cost[0] : 1450000002 /* Xianyu */;
                            var cnt = this._tasCfg.quick_cost && this._tasCfg.quick_cost.length ? this._tasCfg.quick_cost[1] : 0;
                            // let cnt: number = +this._tasCfg.param3;
                            var isEnough = mod.BagUtil.checkPropCnt(idx, cnt, 2 /* Text */);
                            if (isEnough) {
                                mod.TaskUtil.quickTask(this._data.task);
                            }
                            break;
                        case 1 /* Finish */: // 可领取
                            mod.TaskUtil.clickTask(this._data.task);
                            this.hide();
                            break;
                        default:
                            break;
                    }
                };
                return QiyuanDetail2Mdr;
            }(game.MdrBase));
            pass.QiyuanDetail2Mdr = QiyuanDetail2Mdr;
            __reflect(QiyuanDetail2Mdr.prototype, "game.mod.pass.QiyuanDetail2Mdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var TimeMgr = base.TimeMgr;
            var callLater = egret.callLater;
            var facade = base.facade;
            var QiyuanFightMdr = /** @class */ (function (_super) {
                __extends(QiyuanFightMdr, _super);
                function QiyuanFightMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", pass.QiyuanFightView);
                    _this.HP_WIDTH = 350; //血条宽度
                    _this.ALL_HP = 10000;
                    _this.self = 10000;
                    _this.boss = 10000;
                    return _this;
                }
                QiyuanFightMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(9 /* Pass */);
                };
                QiyuanFightMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                QiyuanFightMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateInfo();
                };
                QiyuanFightMdr.prototype.update = function (time) {
                    if (this.boss <= 0) {
                        TimeMgr.removeUpdateItem(this);
                        this.onOver();
                        callLater(this.hide, this);
                        return;
                    }
                    this.onUpdateRandomHP();
                };
                QiyuanFightMdr.prototype.onUpdateInfo = function () {
                    var vo = game.RoleVo.ins;
                    this._view.lab_name1.text = vo.name;
                    this._view.powerLabel1.setPowerValue(vo.showpower);
                    this._view.head1.updateMyHead();
                    var cfg = game.getConfigByNameId("qiyuan.json" /* Qiyuan */, this._showArgs);
                    var fuben = game.getConfigByNameId("qiyuan_fuben.json" /* QiyuanFuben */, cfg.param1[0]);
                    this._view.lab_name2.text = fuben.name;
                    this._view.powerLabel2.setPowerValue(fuben.power);
                    this._view.head2.updateBossHeadShow(fuben.monster, 0);
                    TimeMgr.addUpdateItem(this, 500);
                };
                QiyuanFightMdr.prototype.onUpdateRandomHP = function () {
                    this.self -= Math.random() * 500;
                    this._view.img_hp1.width = this.self / this.ALL_HP * this.HP_WIDTH;
                    this.boss -= Math.random() * 500 + 500;
                    this._view.img_hp2.width = this.boss / this.ALL_HP * this.HP_WIDTH;
                };
                QiyuanFightMdr.prototype.onOver = function () {
                    var proxy = game.getProxy("42" /* Pass */, 9 /* Pass */);
                    var cfg = game.getConfigByNameId("qiyuan.json" /* Qiyuan */, this._showArgs);
                    proxy.c2s_qiyuan_enter(cfg.index);
                    facade.hideView("42" /* Pass */, "12" /* QiyuanDetail1 */);
                };
                return QiyuanFightMdr;
            }(game.MdrBase));
            pass.QiyuanFightMdr = QiyuanFightMdr;
            __reflect(QiyuanFightMdr.prototype, "game.mod.pass.QiyuanFightMdr", ["base.UpdateItem"]);
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var Event = egret.Event;
            var QiyuanMdr = /** @class */ (function (_super) {
                __extends(QiyuanMdr, _super);
                function QiyuanMdr(parent) {
                    var _this = _super.call(this, parent) || this;
                    _this._view = _this.mark("_view", pass.QiyuanView);
                    _this._offHight = 140;
                    _this._isChecked = false;
                    return _this;
                }
                QiyuanMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(9 /* Pass */);
                    this._model = this._proxy.getModel();
                    this._itemDatas = new ArrayCollection();
                    this._view.list_item.itemRenderer = pass.QiyuanItem;
                    this._view.list_item.dataProvider = this._itemDatas;
                };
                QiyuanMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_pass_fb_qi_yuan_info" /* UPDATE_PASS_FB_QI_YUAN_INFO */, this.updateData, this);
                    this.onNt("on_task_update" /* ON_TASK_UPDATE */, this.onTaskUpdate, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    addEventListener(this._view.check, Event.CHANGE, this.onCheckChange);
                };
                QiyuanMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateData();
                };
                QiyuanMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                QiyuanMdr.prototype.updateData = function () {
                    if (!this._cfgs) {
                        this._cfgs = game.getConfigListByName("qiyuan.json" /* Qiyuan */);
                        this._cfgs.sort(function (a, b) {
                            if (a.limit == b.limit) {
                                if (a.rank == b.rank) {
                                    return a.index - b.index;
                                }
                                else {
                                    return a.rank - b.rank;
                                }
                            }
                            else {
                                return a.limit - b.limit;
                            }
                        });
                    }
                    var qyFbGotsAwdCnt = 0;
                    var qyFbTotalAwdCnt = 0;
                    var scrollCtn = 0;
                    var flag = false;
                    var qyDatas = [];
                    var j = 0;
                    var len = this._cfgs.length;
                    for (var i = 0; i < len; i++) {
                        var cfg = this._cfgs[i];
                        if (!cfg) {
                            continue;
                        }
                        var isFinish = false;
                        var task = void 0;
                        var desc = "";
                        if (cfg.event_type == 1 || cfg.event_type == 4) {
                            var index = 0;
                            if (cfg.event_type == 1) {
                                index = this._proxy.getIndexByCfgIndex(cfg.index);
                                index = Math.min(index, 4);
                            }
                            var qyfbCfg = game.getConfigByNameId("qiyuan_fuben.json" /* QiyuanFuben */, cfg.param1[index]);
                            if (!qyfbCfg) {
                                DEBUG && console.error("\u5947\u7F18\u526F\u672C\u7F3A\u5C11" + cfg.param1[index] + "\u914D\u7F6E");
                                break;
                            }
                            desc = qyfbCfg.name;
                            var show_rewards = qyfbCfg.show_rewards;
                            if (show_rewards && show_rewards.length > 0) {
                                qyFbTotalAwdCnt += show_rewards[0][1];
                            }
                            isFinish = this._model.qyFbFinishIds.indexOf(cfg.index) != -1;
                            if (isFinish) {
                                qyFbGotsAwdCnt += show_rewards.length;
                            }
                        }
                        else {
                            var taskCfg = mod.TaskUtil.getCfg(cfg.param1[0]);
                            desc = taskCfg.title;
                            task = mod.TaskUtil.getTask(cfg.param1[0]);
                            if (task) {
                                isFinish = task.status == 2 /* Draw */;
                            }
                        }
                        if (!this._isChecked && isFinish) {
                            continue;
                        }
                        j++;
                        if (this._model.worldMapCurTaskId > 0 && !flag) {
                            scrollCtn++;
                            if (task && task.task_id == this._model.worldMapCurTaskId) {
                                flag = true;
                            }
                        }
                        var isInStep = (cfg.limit <= this._model.curStep);
                        var qyData = {
                            cfg: cfg,
                            task: task,
                            state: (j % 2 == 1) ? 2 : 1,
                            isFinish: isFinish,
                            isInStep: isInStep,
                            desc: desc
                        };
                        qyDatas.push(qyData);
                    }
                    if (this._itemDatas) {
                        this._itemDatas.replaceAll(qyDatas);
                    }
                    else {
                        this._itemDatas.source = qyDatas;
                    }
                    this._model.qyFbGotsAwdCnt = qyFbGotsAwdCnt;
                    this._model.qyFbTotalAwdCnt = qyFbTotalAwdCnt;
                    if (this._model.worldMapCurTaskId > 0) {
                        this._view.scr.viewport.scrollV = scrollCtn * this._offHight + 40;
                        this._model.worldMapCurTaskId = 0;
                    }
                };
                QiyuanMdr.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(34 /* Qiyuan */) > -1) {
                        this.updateData();
                    }
                };
                QiyuanMdr.prototype.onClickItem = function (e) {
                    var itemData = e.item;
                    if (!itemData.cfg) {
                        return;
                    }
                    var event_type = itemData.cfg.event_type;
                    if (!itemData.isInStep) {
                        game.PromptBox.getIns().show(game.getLanById("pass_qiyuan_1" /* pass_qiyuan_1 */));
                        return;
                    }
                    else if (itemData.isFinish) {
                        game.PromptBox.getIns().show(game.getLanById("pass_qiyuan_2" /* pass_qiyuan_2 */));
                        return;
                    }
                    if (event_type == 1 || event_type == 4) {
                        mod.ViewMgr.getIns().showSecondPop("42" /* Pass */, "12" /* QiyuanDetail1 */, itemData.cfg);
                    }
                    else {
                        mod.ViewMgr.getIns().showSecondPop("42" /* Pass */, "13" /* QiyuanDetail2 */, itemData);
                    }
                };
                QiyuanMdr.prototype.onCheckChange = function (e) {
                    this._isChecked = this._view.check.selected;
                    this.updateData();
                };
                return QiyuanMdr;
            }(game.MdrBase));
            pass.QiyuanMdr = QiyuanMdr;
            __reflect(QiyuanMdr.prototype, "game.mod.pass.QiyuanMdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var WorldMapBoxAwdMdr = /** @class */ (function (_super) {
                __extends(WorldMapBoxAwdMdr, _super);
                function WorldMapBoxAwdMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", pass.WorldMapBoxAwdView);
                    _this.isEasyHide = true;
                    return _this;
                }
                WorldMapBoxAwdMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._rewardDatas = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._rewardDatas;
                    this._proxy = this.retProxy(9 /* Pass */);
                    this._model = this._proxy.getModel();
                };
                WorldMapBoxAwdMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onBtnClick);
                };
                WorldMapBoxAwdMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._cfg = this._showArgs[0];
                    var hasAwd = this._showArgs[1];
                    if (!this._cfg) {
                        return;
                    }
                    this._rewardDatas.source = this._cfg.award;
                    this._view.btn_get.visible = hasAwd;
                    this._view.btn_get.redPoint.visible = hasAwd;
                    this._view.lab_tip.visible = !hasAwd;
                    var curChapter = this._proxy.getChapterByIdx(this._model.curWorldMapCfg.index) - 1;
                    this._view.lab_tip.textFlow = game.TextUtil.parseHtml(game.StringUtil.substitute(game.getLanById("pass_condition_1" /* pass_condition_1 */), [this._cfg.name])
                        + game.TextUtil.addColor("(" + curChapter + "/" + this._proxy.getChapterByIdx(this._cfg.index) + ")", 16719376 /* RED */));
                };
                WorldMapBoxAwdMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                WorldMapBoxAwdMdr.prototype.onBtnClick = function (e) {
                    this._proxy.c2s_mainline_wroldmap(this._cfg.index);
                    this.hide();
                };
                return WorldMapBoxAwdMdr;
            }(game.MdrBase));
            pass.WorldMapBoxAwdMdr = WorldMapBoxAwdMdr;
            __reflect(WorldMapBoxAwdMdr.prototype, "game.mod.pass.WorldMapBoxAwdMdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            var WorldMapDetailMdr = /** @class */ (function (_super) {
                __extends(WorldMapDetailMdr, _super);
                function WorldMapDetailMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", pass.WorldMapDetailView);
                    _this.isEasyHide = true;
                    return _this;
                }
                WorldMapDetailMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._qiyuanDatas = new ArrayCollection();
                    this._view.list_qiyuan.itemRenderer = pass.WorldMapQiyuanIcon;
                    this._view.list_qiyuan.dataProvider = this._qiyuanDatas;
                    this._rewardDatas0 = new ArrayCollection();
                    this._view.list_reward0.itemRenderer = pass.WorldMapOfflineIcon;
                    this._view.list_reward0.dataProvider = this._rewardDatas0;
                    this._rewardDatas = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._rewardDatas;
                    this._proxy = this.retProxy(9 /* Pass */);
                    this._model = this._proxy.getModel();
                };
                WorldMapDetailMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_pass_world_map_top_info" /* UPDATE_PASS_WORLD_MAP_TOP_INFO */, this.updateData, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    for (var i = 0; i < 3; i++) {
                        var head = this._view["head" + (i + 1)];
                        if (!head) {
                            continue;
                        }
                        addEventListener(head, TouchEvent.TOUCH_TAP, this.onHeadClick);
                    }
                    addEventListener(this._view.list_qiyuan, ItemTapEvent.ITEM_TAP, this.onQyClick);
                };
                WorldMapDetailMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._cfg = this._showArgs[0];
                    this._isOpen = this._showArgs[1];
                    if (!this._cfg) {
                        return;
                    }
                    if (!this._model.worldMapTopInfos[this._cfg.index]) {
                        this._proxy.c2s_mainline_topthree(this._cfg.index);
                    }
                    this.updateData();
                };
                WorldMapDetailMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                WorldMapDetailMdr.prototype.updateData = function () {
                    this._view.secondPop.updateTitleStr(game.StringUtil.substitute(game.getLanById("pass_chapter" /* pass_chapter */), [this._proxy.getChapterByIdx(this._cfg.index)]));
                    this._view.lab_step.text = "(" + this._proxy.getStepByIdx(this._cfg.gate[0]) + "-" + this._proxy.getStepByIdx(this._cfg.gate[1]) + game.getLanById("pass_step" /* pass_step */) + ")";
                    this._view.lab_chapter_name.text = this._cfg.name;
                    this._view.lab_desc.text = this._cfg.dec;
                    this._view.lab_open_tip.visible = !this._isOpen;
                    if (!this._isOpen) {
                        var gate = this._proxy.getStepByIdx(this._cfg.gate[0]) - 1 || 1;
                        this._view.lab_open_tip.text = "\u901A\u5173" + gate + "\u5173\u5F00\u542F";
                    }
                    this._view.img_no_qy.visible = !this._cfg.task || this._cfg.task.length == 0;
                    this._view.img_no_awd.visible = !this._cfg.add_award || this._cfg.add_award.length == 0;
                    if (this._qiyuanDatas.length) {
                        this._qiyuanDatas.replaceAll(this._cfg.task);
                    }
                    else {
                        this._qiyuanDatas.source = this._cfg.task;
                    }
                    if (this._rewardDatas.length) {
                        this._rewardDatas.replaceAll(this._cfg.add_award);
                    }
                    else {
                        this._rewardDatas.source = this._cfg.add_award;
                    }
                    if (this._rewardDatas0.length) {
                        this._rewardDatas0.replaceAll(this._cfg.show_award);
                    }
                    else {
                        this._rewardDatas0.source = this._cfg.show_award;
                    }
                    var roleInfos = this._model.worldMapTopInfos[this._cfg.index];
                    if (!roleInfos) {
                        return;
                    }
                    for (var i = 0, len = roleInfos.length; i < len && i < 3; i++) {
                        var roleG = this._view["grp_role" + (i + 1)];
                        var head = this._view["head" + (i + 1)];
                        var nameLab = this._view["lab_role_name" + (i + 1)];
                        var info = roleInfos[i];
                        if (roleG && head && nameLab && info) {
                            roleG.visible = true;
                            head.data = info;
                            head.updateHeadShow(info.icon, info.icon_frame, info.sex);
                            nameLab.text = info.name;
                        }
                    }
                };
                WorldMapDetailMdr.prototype.onHeadClick = function (e) {
                    var head = e.currentTarget;
                    if (head && head.data) {
                        // let info = head.data as mainline_topthree_info;
                        //todo
                    }
                };
                WorldMapDetailMdr.prototype.onQyClick = function (e) {
                    this._model.worldMapCurTaskId = e.item;
                    this.sendNt("update_wnd_base_mdr_sel_tab" /* UPDATE_WND_BASE_MDR_SEL_TAB */, "02" /* Qiyuan */);
                    this.hide();
                };
                return WorldMapDetailMdr;
            }(game.MdrBase));
            pass.WorldMapDetailMdr = WorldMapDetailMdr;
            __reflect(WorldMapDetailMdr.prototype, "game.mod.pass.WorldMapDetailMdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pass;
        (function (pass) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var Tween = base.Tween;
            var Linear = base.Linear;
            var WorldMapMdr = /** @class */ (function (_super) {
                __extends(WorldMapMdr, _super);
                function WorldMapMdr(p) {
                    var _this = _super.call(this, p) || this;
                    _this._view = _this.mark("_view", pass.WorldMapView);
                    _this._showIdx = 0;
                    return _this;
                }
                WorldMapMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(9 /* Pass */);
                    this._listData = new ArrayCollection();
                    this._view.list.dataProvider = this._listData;
                    this._view.list.itemRenderer = pass.WorldMapContent;
                };
                WorldMapMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_pass_map_awd_got_info" /* UPDATE_PASS_MAP_AWD_GOT_INFO */, this.updateData, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_left, TouchEvent.TOUCH_TAP, this.onLast);
                    addEventListener(this._view.btn_right, TouchEvent.TOUCH_TAP, this.onNext);
                    addEventListener(this._view.scroller, TouchEvent.TOUCH_MOVE, this.onScroll);
                };
                WorldMapMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._cfgs) {
                        this._cfgs = game.getConfigListByName("worldmap.json" /* WorldMap */);
                    }
                    this._showIdx = 0;
                    this.updateData();
                };
                WorldMapMdr.prototype.updateData = function () {
                    var list = [];
                    var list0 = [];
                    for (var i = 0, len = this._cfgs.length; i < len; i++) {
                        var cfgData = this._cfgs[i];
                        var isCurMap = this._proxy.isCurChapter(cfgData);
                        var isPass = this._proxy.isPass(cfgData);
                        var hint = this._proxy.getWorldMapHint(cfgData);
                        var mapItemData = {
                            cfg: cfgData,
                            isCurMap: isCurMap,
                            isPass: isPass,
                            hint: hint
                        };
                        list0.push(mapItemData);
                        if (i % 10 == 9 || i == len - 1) {
                            list.push(list0);
                            list0 = [];
                        }
                    }
                    this._listData.replaceAll(list);
                    this._len = this._listData.length;
                    this.scrollMap();
                };
                WorldMapMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                WorldMapMdr.prototype.scrollMap = function () {
                    this.onLimitIdx();
                    this._view.btn_left.visible = this._showIdx > 0;
                    this._view.btn_right.visible = this._showIdx < this._len - 1;
                    var viewPort = this._view.scroller.viewport;
                    var pos = this._showIdx * this._view.scroller.width;
                    // viewPort.scrollH = pos;
                    Tween.get(viewPort).to({ scrollH: pos }, 400, null, Linear.easeIn);
                };
                WorldMapMdr.prototype.onLast = function () {
                    this._showIdx--;
                    this.scrollMap();
                };
                WorldMapMdr.prototype.onNext = function () {
                    this._showIdx++;
                    this.scrollMap();
                };
                WorldMapMdr.prototype.onScroll = function (e) {
                    this._showIdx = Math.floor(this._view.scroller.viewport.scrollH / this._view.scroller.width);
                    this.onLimitIdx();
                    this._view.btn_left.visible = this._view.scroller.viewport.scrollH > 0;
                    this._view.btn_right.visible = this._showIdx < this._len - 1;
                };
                WorldMapMdr.prototype.onLimitIdx = function () {
                    if (this._showIdx < 0) {
                        this._showIdx = 0;
                    }
                    if (this._showIdx > this._len - 1) {
                        this._showIdx = this._len - 1;
                    }
                };
                return WorldMapMdr;
            }(game.MdrBase));
            pass.WorldMapMdr = WorldMapMdr;
            __reflect(WorldMapMdr.prototype, "game.mod.pass.WorldMapMdr");
        })(pass = mod.pass || (mod.pass = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=p_pass.js.map