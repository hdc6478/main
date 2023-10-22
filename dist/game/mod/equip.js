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
        var equip;
        (function (equip) {
            var EquipMod = /** @class */ (function (_super) {
                __extends(EquipMod, _super);
                function EquipMod() {
                    return _super.call(this, "11" /* Equip */) || this;
                }
                EquipMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                EquipMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(14 /* Equip */, equip.EquipProxy);
                };
                EquipMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                };
                return EquipMod;
            }(game.ModBase));
            equip.EquipMod = EquipMod;
            __reflect(EquipMod.prototype, "game.mod.equip.EquipMod");
            gso.modCls.push(EquipMod);
        })(equip = mod.equip || (mod.equip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var equip;
        (function (equip) {
            var EquipModel = /** @class */ (function () {
                function EquipModel() {
                    this.equips = [];
                    this.easyEquip = {};
                }
                return EquipModel;
            }());
            equip.EquipModel = EquipModel;
            __reflect(EquipModel.prototype, "game.mod.equip.EquipModel");
        })(equip = mod.equip || (mod.equip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var equip;
        (function (equip_1) {
            var s2c_equip_online_equip_request = msg.s2c_equip_online_equip_request;
            var c2s_equip_operate = msg.c2s_equip_operate;
            var s2c_equip_update = msg.s2c_equip_update;
            var c2s_equip_get_info = msg.c2s_equip_get_info;
            var c2s_equip_pos_detail = msg.c2s_equip_pos_detail;
            var c2s_new_equip_online_request = msg.c2s_new_equip_online_request;
            var EquipProxy = /** @class */ (function (_super) {
                __extends(EquipProxy, _super);
                function EquipProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                EquipProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new equip_1.EquipModel();
                    this.onProto(s2c_equip_online_equip_request, this.s2c_equip_online_equip_request, this);
                    this.onProto(s2c_equip_update, this.s2c_equip_update, this);
                };
                EquipProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this._model.equips = [];
                };
                /**============================= 新增代码部分 =============================*/
                EquipProxy.prototype.c2s_new_equip_online_request = function () {
                    this.sendProto(new c2s_new_equip_online_request());
                };
                //角色装备返回
                EquipProxy.prototype.s2c_equip_online_equip_request = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.equips) {
                        return;
                    }
                    for (var _i = 0, _a = msg.equips; _i < _a.length; _i++) {
                        var equip_2 = _a[_i];
                        this._model.equips.push(game.PropData.fromData(equip_2));
                    }
                    this.updateEquipIconHint();
                    this.sendNt("equip_update_back" /* EQUIP_UPDATE_BACK */);
                };
                /**
                 * @param oper 1：穿  2：脱  3：一键穿戴
                 * @param prop_id 装备的唯一id（一键穿戴可缺省）
                 */
                EquipProxy.prototype.c2s_equip_operate = function (oper, prop_id) {
                    var req = new c2s_equip_operate();
                    req.oper = oper;
                    if (prop_id) {
                        req.prop_id = prop_id;
                    }
                    this.sendProto(req);
                };
                /**
                 * 装备更新
                 */
                EquipProxy.prototype.s2c_equip_update = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.update_info) {
                        return;
                    }
                    for (var _i = 0, _a = msg.update_info; _i < _a.length; _i++) {
                        var equip_3 = _a[_i];
                        if (!equip_3) {
                            continue;
                        }
                        var pos = this.getEquipInfoPos(equip_3.index.toNumber());
                        var prop = game.PropData.fromData(equip_3);
                        if (pos >= 0) {
                            this.sendNt("on_update_easy_use_prop_count" /* ON_UPDATE_EASY_USE_PROP_COUNT */, prop);
                            this._model.equips[pos] = prop;
                        }
                        else {
                            this._model.equips.push(prop);
                        }
                    }
                    this.updateEquipIconHint();
                    this.sendNt("equip_update_back" /* EQUIP_UPDATE_BACK */);
                };
                EquipProxy.prototype.getEquipInfoPos = function (index) {
                    if (!this._model.equips || !this._model.equips.length) {
                        return -1;
                    }
                    var pos = index % 10;
                    var len = this._model.equips.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.equips[i];
                        //不应该用info.index==index判断，应该是装备部位pos
                        if (info.index % 10 == pos) {
                            return i;
                        }
                    }
                    return -1;
                };
                /**根据部位返回装备数据*/
                EquipProxy.prototype.getEquipByPos = function (pos) {
                    if (pos === void 0) { pos = 0; }
                    var equips = this._model.equips;
                    if (!equips) {
                        return null;
                    }
                    for (var _i = 0, equips_1 = equips; _i < equips_1.length; _i++) {
                        var equip_4 = equips_1[_i];
                        if (equip_4 && equip_4.equipPos == pos) {
                            return equip_4;
                        }
                    }
                    return null;
                };
                /**更新装备进阶等级*/
                EquipProxy.prototype.updateEquipAdvancedLv = function (pos, lv) {
                    var equip = this.getEquipByPos(pos);
                    equip.advanced_lv = lv;
                };
                //根据pos，获取角色装备列表 EquipPropType.RoleEquip
                EquipProxy.prototype.getEquipListByPos = function (pos) {
                    var propData = mod.BagUtil.getBagsByType(3 /* RoleEquip */) || [];
                    var list = [];
                    for (var _i = 0, propData_1 = propData; _i < propData_1.length; _i++) {
                        var prop = propData_1[_i];
                        if (prop && prop.equipPos == pos && prop.propType == 1 /* RoleEquip */) {
                            list.push(prop);
                        }
                    }
                    return list;
                };
                // public getCurEquipByPos(pos: number): PropData {
                //     let equips = this._model.equips;
                //     if (!equips) {
                //         return null;
                //     }
                //     for (let equip of equips) {
                //         if (equip.equipPos == pos) {
                //             return equip;
                //         }
                //     }
                //     return null;
                // }
                /**检查对应的pos是否有装备可穿戴*/
                EquipProxy.prototype.checkEquipByPos = function (pos) {
                    var roleVl = game.RoleVo.ins.reincarnate; //转生等级
                    var roleLevel = game.RoleVo.ins.level;
                    var curEquip = this.getEquipByPos(pos);
                    var equipList = this.getEquipListByPos(pos);
                    if (!equipList || !equipList.length) {
                        return false;
                    }
                    var curPower = curEquip && curEquip.regular_attrs && curEquip.regular_attrs.showpower.toNumber() || 0;
                    for (var _i = 0, equipList_1 = equipList; _i < equipList_1.length; _i++) {
                        var equip_5 = equipList_1[_i];
                        if (!equip_5 || !equip_5.cfg) {
                            continue;
                        }
                        var cfg = equip_5.cfg;
                        //等级条件不足
                        if (cfg.level_demand && cfg.level_demand > roleLevel) {
                            continue;
                        }
                        //转生条件不足
                        if (cfg.rebirth_limit && cfg.rebirth_limit > roleVl) {
                            continue;
                        }
                        // 比当前穿戴的战力高
                        if (equip_5.regular_attrs && equip_5.regular_attrs.showpower.toNumber() > curPower) {
                            return true;
                        }
                    }
                    return false;
                };
                /**能否一键装备*/
                EquipProxy.prototype.checkOneKey = function () {
                    for (var _i = 0, EquipPosAry_1 = game.EquipPosAry; _i < EquipPosAry_1.length; _i++) {
                        var pos = EquipPosAry_1[_i];
                        if (this.checkEquipByPos(pos)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**更新角色界面装备部位的红点*/
                EquipProxy.prototype.updateEquipIconHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670089 /* Role */)) {
                        return;
                    }
                    var hintPath = this.getRoleEquipIconHint();
                    for (var _i = 0, EquipPosAry_2 = game.EquipPosAry; _i < EquipPosAry_2.length; _i++) {
                        var pos = EquipPosAry_2[_i];
                        var isHint = this.checkEquipByPos(pos);
                        mod.HintMgr.setHint(isHint, hintPath.concat(["" + pos]));
                    }
                };
                EquipProxy.prototype.getRoleEquipIconHint = function () {
                    return ["06" /* Role */, "01" /* RoleMain */, "EquipIcon"];
                };
                EquipProxy.prototype.onBagUpdateByBagType = function (n) {
                    var types = n.body;
                    if (!types || !types.length || types.indexOf(3 /* RoleEquip */) < 0) {
                        return;
                    }
                    this.updateEquipIconHint();
                };
                EquipProxy.prototype.checkEquipLimit = function (prop) {
                    var roleVl = game.RoleVo.ins.reincarnate; //转生等级
                    var roleLevel = game.RoleVo.ins.level;
                    var cfg = prop.cfg;
                    //等级条件不足
                    if (cfg.level_demand && cfg.level_demand > roleLevel) {
                        return false;
                    }
                    //转生条件不足
                    if (cfg.rebirth_limit && cfg.rebirth_limit > roleVl) {
                        return false;
                    }
                    return true;
                };
                /**============================= 新增代码部分 end =============================*/
                /**
                 *
                 * @param index
                 * @param is_robot 1 是【只用于聊天展示装备信息的机器人】  /其他情况不发该字段  null / 0 不是
                 */
                EquipProxy.prototype.c2s_equip_get_info = function (index, is_robot) {
                    var req = new c2s_equip_get_info();
                    req.index = index;
                    req.is_robot = is_robot;
                    this.sendProto(req);
                };
                /**装备部位查看详情
                 * @param posId 装备部位
                 * @param roleId 点击查看他人装备时才使用该字段【选择目标的role_id】
                 * @param serverId 点击查看他人装备时才使用该字段【服务器ID】
                 */
                EquipProxy.prototype.c2s_equip_pos_detail = function (posId, roleId, serverId) {
                    var req = new c2s_equip_pos_detail();
                    req.pos = posId;
                    req.choose_id = roleId;
                    req.server_id = serverId;
                    this.sendProto(req);
                };
                Object.defineProperty(EquipProxy.prototype, "equips", {
                    /**
                     *获取角色战备列表
                     */
                    get: function () {
                        return this._model.equips;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EquipProxy.prototype, "equipInfo", {
                    /**
                     * 获取装备详情
                     */
                    get: function () {
                        return this._model.equipInfo;
                    },
                    set: function (detail) {
                        this._model.equipInfo = detail;
                    },
                    enumerable: true,
                    configurable: true
                });
                EquipProxy.prototype.onOpenFuncUpdate = function (n) {
                    var addIdx = n.body;
                    if (addIdx.indexOf(1041670089 /* Role */) > -1) {
                        this.updateEquipIconHint();
                    }
                };
                return EquipProxy;
            }(game.ProxyBase));
            equip_1.EquipProxy = EquipProxy;
            __reflect(EquipProxy.prototype, "game.mod.equip.EquipProxy", ["game.mod.IEquipProxy", "base.IProxy"]);
        })(equip = mod.equip || (mod.equip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=equip.js.map