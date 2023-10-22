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
        var pay;
        (function (pay) {
            var PayMod = /** @class */ (function (_super) {
                __extends(PayMod, _super);
                function PayMod() {
                    return _super.call(this, "50" /* Pay */) || this;
                }
                PayMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                PayMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(196 /* Pay */, pay.PayProxy);
                };
                PayMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* Gift */, pay.GiftMdr);
                };
                return PayMod;
            }(game.ModBase));
            pay.PayMod = PayMod;
            __reflect(PayMod.prototype, "game.mod.pay.PayMod");
            gso.modCls.push(PayMod);
        })(pay = mod.pay || (mod.pay = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pay;
        (function (pay) {
            var PayModel = /** @class */ (function () {
                function PayModel() {
                }
                return PayModel;
            }());
            pay.PayModel = PayModel;
            __reflect(PayModel.prototype, "game.mod.pay.PayModel");
        })(pay = mod.pay || (mod.pay = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pay;
        (function (pay) {
            var s2c_direct_buy_info = msg.s2c_direct_buy_info;
            var c2s_check_product_id = msg.c2s_check_product_id;
            var s2c_check_product_id = msg.s2c_check_product_id;
            var c2s_direct_buy_reward = msg.c2s_direct_buy_reward;
            var Handler = base.Handler;
            var facade = base.facade;
            var PayProxy = /** @class */ (function (_super) {
                __extends(PayProxy, _super);
                function PayProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                PayProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new pay.PayModel();
                    this.onProto(s2c_direct_buy_info, this.s2c_direct_buy_info, this);
                    this.onProto(s2c_check_product_id, this.s2c_check_product_id, this);
                };
                //领取奖励
                PayProxy.prototype.c2s_direct_buy_reward = function (productId) {
                    var msg = new c2s_direct_buy_reward();
                    msg.product_id = productId;
                    this.sendProto(msg);
                };
                //更新直购数据
                PayProxy.prototype.s2c_direct_buy_info = function (n) {
                    /**这个协议服务端会定时下发*/
                    var msg = n.body;
                    if (!msg.infos) {
                        return;
                    }
                    var isUpdate = !!this._model.infos;
                    if (!this._model.infos) {
                        this._model.infos = {};
                    }
                    var addIdx = [];
                    for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                        var i = _a[_i];
                        this._model.infos[i.product_id] = i;
                        if (isUpdate) {
                            addIdx.push(i.product_id);
                        }
                    }
                    if (addIdx.length) {
                        this.sendNt("on_direct_buy_update" /* ON_DIRECT_BUY_UPDATE */, addIdx);
                    }
                };
                //验证购买
                PayProxy.prototype.c2s_check_product_id = function (productId) {
                    var msg = new c2s_check_product_id();
                    msg.product_id = productId;
                    this.sendProto(msg);
                };
                PayProxy.prototype.s2c_check_product_id = function (n) {
                    var msg = n.body;
                    if (!msg.can_buy)
                        return;
                    var productId = msg.product_id;
                    var name = mod.PayUtil.getPayName(productId);
                    var rmb = mod.PayUtil.getRmbValue(productId);
                    if (rmb <= 0) {
                        this.c2s_direct_buy_reward(productId); //配置金额为0的，直接领取奖励
                        return;
                    }
                    var roleVo = game.RoleVo.ins;
                    var extra = [roleVo.role_id.toString(), gso.serverId.toString(), productId.toString()];
                    var desc = name;
                    if (gzyyou.sdk.sdkPay(productId, rmb, extra, roleVo.name, roleVo.role_id.toString(), desc)) {
                        return;
                    }
                    //todo
                    // 测试充值代码
                    mod.ViewMgr.getIns().show("测试充值\nRMB:" + rmb + "，购买:" + name, Handler.alloc(this, function () {
                        var miscProxy = facade.retMod("04" /* Misc */).retProxy(4 /* Misc */);
                        miscProxy.sendGM("$charge " + productId);
                    }));
                };
                /**礼包信息*/
                PayProxy.prototype.getInfo = function (productId) {
                    if (!this._model.infos) {
                        return null;
                    }
                    var info = this._model.infos[productId];
                    return info;
                };
                /**可购买次数*/
                PayProxy.prototype.getBuyTimes = function (productId) {
                    var info = this.getInfo(productId);
                    return info && info.buy_times || 0;
                };
                /**礼包是否已领取*/
                PayProxy.prototype.hasReceived = function (productId) {
                    var info = this.getInfo(productId);
                    if (!info) {
                        return true; //取不到数据时，表示已购买
                    }
                    return info.received;
                };
                /**礼包是否可领取*/
                PayProxy.prototype.canReceived = function (productId) {
                    var info = this.getInfo(productId);
                    if (!info) {
                        return false; //取不到数据时，表示已购买
                    }
                    return info.can_received;
                };
                return PayProxy;
            }(game.ProxyBase));
            pay.PayProxy = PayProxy;
            __reflect(PayProxy.prototype, "game.mod.pay.PayProxy", ["game.mod.IPayProxy", "base.IProxy"]);
        })(pay = mod.pay || (mod.pay = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pay;
        (function (pay) {
            var GiftView = /** @class */ (function (_super) {
                __extends(GiftView, _super);
                function GiftView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.pay.GiftSkin";
                    return _this;
                }
                return GiftView;
            }(eui.Component));
            pay.GiftView = GiftView;
            __reflect(GiftView.prototype, "game.mod.pay.GiftView");
        })(pay = mod.pay || (mod.pay = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var pay;
        (function (pay) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var GiftMdr = /** @class */ (function (_super) {
                __extends(GiftMdr, _super);
                function GiftMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", pay.GiftView);
                    _this.isEasyHide = true;
                    return _this;
                }
                GiftMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                };
                GiftMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_buy, TouchEvent.TOUCH_TAP, this.onClickBuy);
                    this.onNt("on_direct_buy_update" /* ON_DIRECT_BUY_UPDATE */, this.onBuyUpdate, this);
                };
                GiftMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._productId = _super.prototype.decodeShowArgs.call(this);
                    this.updateShow();
                    this.updateBuyState();
                    this.labTimes();
                };
                GiftMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                GiftMdr.prototype.labTimes = function () {
                    var cut = mod.PayUtil.getBuyTimes(this._productId);
                    if (cut <= 1) {
                        this._view.lab_cut.text = "";
                        return;
                    }
                    this._view.lab_cut.text = "\u53EF\u8D2D\u4E70\u6B21\u6570:" + cut;
                };
                GiftMdr.prototype.onBuyUpdate = function (n) {
                    var addIdx = n.body;
                    if (addIdx.indexOf(this._productId) >= 0) {
                        //this.updateBuyState();
                        this.hide();
                    }
                };
                GiftMdr.prototype.onClickBuy = function () {
                    if (this._canReceived) {
                        mod.PayUtil.drawReward(this._productId);
                        return;
                    }
                    mod.PayUtil.pay(this._productId);
                };
                GiftMdr.prototype.updateShow = function () {
                    var rewards = mod.PayUtil.getRewards(this._productId);
                    this._view.img_text.source = game.ResUtil.getUiPng("libaozhufu_" + this._productId);
                    if (!rewards) {
                        return;
                    }
                    this._itemList.source = rewards;
                    var reward = rewards[0];
                    var propIndex = reward[0];
                    var propCfg = game.GameConfig.getPropConfigById(propIndex);
                    var index = propCfg && propCfg.param1 && propCfg.param1.length ? propCfg.param1[0][0] : 0;
                    if (!index) {
                        return;
                    }
                    var cfg = game.getConfigById(index);
                    this.addAnimate(index, this._view.grp_eff);
                    this._view.name_item.updateShow(cfg.name, cfg.quality);
                    this._view.special_attr.updateDesc(cfg);
                };
                GiftMdr.prototype.updateBuyState = function () {
                    this._canReceived = mod.PayUtil.canReceived(this._productId);
                    var hasReceived = mod.PayUtil.hasReceived(this._productId);
                    this._view.img_buy.visible = hasReceived;
                    this._view.btn_buy.visible = !hasReceived;
                    if (this._view.btn_buy.visible) {
                        if (this._canReceived) {
                            this._view.btn_buy.group_eft.removeChildren();
                            this._view.btn_buy.labelDisplay.text = game.getLanById("battle_cue38" /* battle_cue38 */);
                        }
                        else {
                            this._view.btn_buy.labelDisplay.text = "";
                            var rmb = mod.PayUtil.getRmbValue(this._productId);
                            var rmbStr = rmb + "y";
                            this.addBmpFont(rmbStr, game.BmpTextCfg[207 /* Price */], this._view.btn_buy.group_eft, true, 1, true);
                        }
                    }
                };
                return GiftMdr;
            }(game.EffectMdrBase));
            pay.GiftMdr = GiftMdr;
            __reflect(GiftMdr.prototype, "game.mod.pay.GiftMdr");
        })(pay = mod.pay || (mod.pay = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=pay.js.map