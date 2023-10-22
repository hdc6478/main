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
    var scene;
    (function (scene) {
        var ObjBase = base.ObjBase;
        var BaseItem = /** @class */ (function (_super) {
            __extends(BaseItem, _super);
            function BaseItem() {
                var _this = _super.call(this) || this;
                _this._isInit = false;
                _this._updateEnabled = false;
                return _this;
            }
            Object.defineProperty(BaseItem.prototype, "parent", {
                get: function () {
                    return this._parent;
                },
                set: function (value) {
                    if (this._parent == value) {
                        return;
                    }
                    this._parent = value;
                    if (this._parent) {
                        this.onAdded();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseItem.prototype, "updateEnabled", {
                get: function () {
                    return this._updateEnabled;
                },
                set: function (value) {
                    this._updateEnabled = value;
                },
                enumerable: true,
                configurable: true
            });
            BaseItem.prototype.init = function () {
                this._isInit = true;
                this._updateEnabled = true;
            };
            BaseItem.prototype.dispose = function () {
                // this.onRelease();
                if (this.parent) {
                    this.parent.remove(this);
                }
            };
            BaseItem.prototype.onAlloc = function () {
                if (!this._isInit) {
                    this.init();
                }
            };
            BaseItem.prototype.onRelease = function () {
                if (this._parent) {
                    this._parent.remove(this);
                    return;
                }
            };
            BaseItem.prototype.advanceTime = function (elapseTime) {
            };
            BaseItem.prototype.onAdded = function () {
            };
            return BaseItem;
        }(ObjBase));
        scene.BaseItem = BaseItem;
        __reflect(BaseItem.prototype, "game.scene.BaseItem", ["base.PoolObject", "base.DisposeObject"]);
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var BaseCont = /** @class */ (function (_super) {
            __extends(BaseCont, _super);
            function BaseCont() {
                return _super.call(this) || this;
            }
            BaseCont.prototype.init = function () {
                _super.prototype.init.call(this);
                this._children = [];
            };
            Object.defineProperty(BaseCont.prototype, "numChildren", {
                get: function () {
                    return this._children.length;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseCont.prototype, "children", {
                get: function () {
                    return this._children;
                },
                enumerable: true,
                configurable: true
            });
            BaseCont.prototype.add = function (child) {
                child.parent = this;
                if (this._children.indexOf(child) < 0) {
                    this._children.push(child);
                }
            };
            BaseCont.prototype.remove = function (child) {
                if (child.parent == this) {
                    var idx = this._children.indexOf(child);
                    if (idx > -1) {
                        game.ArrayUtil.removeAt(this._children, idx);
                    }
                    child.parent = null;
                    Pool.release(child);
                }
            };
            BaseCont.prototype.removeAll = function () {
                var n = this._children.length;
                while (n) {
                    this.remove(this._children[n - 1]);
                    n--;
                }
            };
            BaseCont.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                for (var i = 0, n = this._children.length; i < n; i++) {
                    var child = this._children[i];
                    if (child && child.updateEnabled) {
                        try {
                            child.advanceTime(elapseTime);
                        }
                        catch (e) {
                            console.error(egret.getQualifiedClassName(child), e);
                        }
                    }
                }
            };
            BaseCont.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                this._children.length = 0;
            };
            BaseCont.prototype.onRelease = function () {
                this.removeAll();
                _super.prototype.onRelease.call(this);
            };
            return BaseCont;
        }(scene.BaseItem));
        scene.BaseCont = BaseCont;
        __reflect(BaseCont.prototype, "game.scene.BaseCont");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var BaseDraw = /** @class */ (function (_super) {
            __extends(BaseDraw, _super);
            function BaseDraw() {
                return _super.call(this) || this;
            }
            BaseDraw.prototype.init = function () {
                _super.prototype.init.call(this);
                this.initDsp();
            };
            BaseDraw.prototype.initDsp = function () {
                this._dsp = new DisplayObjectContainer();
                this._dsp.name = "BaseDraw";
            };
            Object.defineProperty(BaseDraw.prototype, "dsp", {
                get: function () {
                    return this._dsp;
                },
                set: function (value) {
                    this._dsp = value;
                },
                enumerable: true,
                configurable: true
            });
            BaseDraw.prototype.add = function (child) {
                _super.prototype.add.call(this, child);
                if (child instanceof BaseDraw) {
                    child.dsp.visible = true;
                    this.addDsp(child);
                }
            };
            BaseDraw.prototype.addDsp = function (child) {
                this._dsp.addChild(child.dsp);
            };
            BaseDraw.prototype.remove = function (child) {
                if (child.parent != this) {
                    return;
                }
                if (child instanceof BaseDraw) {
                    this.removeDsp(child);
                }
                _super.prototype.remove.call(this, child);
            };
            BaseDraw.prototype.removeDsp = function (child) {
                if (child.dsp.parent) {
                    child.dsp.parent.removeChild(child.dsp);
                }
            };
            Object.defineProperty(BaseDraw.prototype, "x", {
                get: function () {
                    return this._dsp.x;
                },
                set: function (value) {
                    this._dsp.x = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseDraw.prototype, "y", {
                get: function () {
                    return this._dsp.y;
                },
                set: function (value) {
                    if (this._dsp.y == value) {
                        return;
                    }
                    this._dsp.y = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseDraw.prototype, "alpha", {
                get: function () {
                    return this._dsp.alpha;
                },
                set: function (value) {
                    this._dsp.alpha = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseDraw.prototype, "scale", {
                get: function () {
                    return this.scaleX;
                },
                set: function (value) {
                    this.scaleX = this.scaleY = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseDraw.prototype, "scaleX", {
                get: function () {
                    return this._dsp.scaleX;
                },
                set: function (value) {
                    this._dsp.scaleX = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseDraw.prototype, "scaleY", {
                get: function () {
                    return this._dsp.scaleY;
                },
                set: function (value) {
                    this._dsp.scaleY = value;
                },
                enumerable: true,
                configurable: true
            });
            BaseDraw.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                this.alpha = 1;
                this.scale = 1;
            };
            BaseDraw.prototype.onRelease = function () {
                this._dsp.visible = true;
                _super.prototype.onRelease.call(this);
            };
            return BaseDraw;
        }(scene.BaseCont));
        scene.BaseDraw = BaseDraw;
        __reflect(BaseDraw.prototype, "game.scene.BaseDraw");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var Handler = base.Handler;
        var BaseSceneObj = /** @class */ (function (_super) {
            __extends(BaseSceneObj, _super);
            function BaseSceneObj() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                //�Ƿ���ʾ��Ӱ
                _this._isShowShadow = false;
                _this._updateCb = {};
                return _this;
            }
            Object.defineProperty(BaseSceneObj.prototype, "vo", {
                get: function () {
                    return this._vo;
                },
                set: function (value) {
                    this._vo = value;
                },
                enumerable: true,
                configurable: true
            });
            BaseSceneObj.prototype.initUpdateCb = function () {
            };
            BaseSceneObj.prototype.regUpdateCb = function (key, cb) {
                this._updateCb[key] = Handler.alloc(this, cb);
            };
            BaseSceneObj.prototype.applyUpdate = function (keys) {
                if (!this._updateCb) {
                    return;
                }
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var k = keys_1[_i];
                    var cb = this._updateCb[k];
                    if (cb && cb instanceof Handler) {
                        cb.exec();
                    }
                }
            };
            BaseSceneObj.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                this.dsp.addTime = game.TimeUtil.getSyncTimer();
                this.dsp.visible = true;
                this.initUpdateCb();
            };
            BaseSceneObj.prototype.onRelease = function () {
                var self = this;
                this._vo = null;
                var keys = Object.keys(self._updateCb);
                for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                    var k = keys_2[_i];
                    Pool.release(self._updateCb[k]);
                    self._updateCb[k] = null;
                    delete self._updateCb[k];
                }
                this.dsp.visible = true;
                _super.prototype.onRelease.call(this);
            };
            BaseSceneObj.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                this.updateVo();
            };
            BaseSceneObj.prototype.updateVo = function () {
                var self = this;
                self.dsp.addTime = game.TimeUtil.getSyncTimer();
                if (self.vo) {
                    var pt = self.vo.worldPt;
                    self.setWorldPos(pt.x, pt.y);
                }
            };
            BaseSceneObj.prototype.setWorldPos = function (wx, wy) {
                this.x = wx;
                this.y = wy;
            };
            BaseSceneObj.prototype.setTilePos = function (tx, ty, updateWorld) {
                if (updateWorld === void 0) { updateWorld = true; }
                this.vo.x = tx;
                this.vo.y = ty;
                if (updateWorld) {
                    var pt = scene.MapData.ins.getWorldPt(tx, ty);
                    this.setWorldPos(pt.x, pt.y);
                    Pool.release(pt);
                }
            };
            return BaseSceneObj;
        }(scene.BaseDraw));
        scene.BaseSceneObj = BaseSceneObj;
        __reflect(BaseSceneObj.prototype, "game.scene.BaseSceneObj");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var ObjBase = base.ObjBase;
        var SceneObjVo = /** @class */ (function (_super) {
            __extends(SceneObjVo, _super);
            function SceneObjVo(type) {
                var _this = _super.call(this) || this;
                _this._res = [];
                _this.type = type;
                return _this;
            }
            Object.defineProperty(SceneObjVo.prototype, "worldPt", {
                get: function () {
                    return this._worldPt = scene.MapData.ins.getWorldPt(this.x, this.y, this._worldPt);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneObjVo.prototype, "cfg", {
                get: function () {
                    return this._cfg;
                },
                enumerable: true,
                configurable: true
            });
            SceneObjVo.prototype.applyUpdate = function (data) {
                var res = this._res;
                res.length = 0;
                var s2c = data;
                var keys = ["entity_id", "name", "x", "y"];
                for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
                    var k = keys_3[_i];
                    if (!data.hasOwnProperty(k)) {
                        continue;
                    }
                    if (k === "entity_id" && this.entity_id && this.entity_id.eq(s2c.entity_id)) {
                        continue;
                    }
                    res.push(k);
                    this[k] = s2c[k];
                }
                return res;
            };
            return SceneObjVo;
        }(ObjBase));
        scene.SceneObjVo = SceneObjVo;
        __reflect(SceneObjVo.prototype, "game.scene.SceneObjVo");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_1) {
        var Pool = base.Pool;
        var Handler = base.Handler;
        var delayCall = base.delayCall;
        var BaseActor = /** @class */ (function (_super) {
            __extends(BaseActor, _super);
            function BaseActor() {
                var _this = _super.call(this) || this;
                _this.dieDel = false;
                _this._enType = 0 /* NONE */;
                return _this;
            }
            Object.defineProperty(BaseActor.prototype, "enType", {
                get: function () {
                    return this._enType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseActor.prototype, "vo", {
                get: function () {
                    return this._vo;
                },
                set: function (value) {
                    this._vo = value;
                },
                enumerable: true,
                configurable: true
            });
            BaseActor.prototype.initUpdateCb = function () {
                _super.prototype.initUpdateCb.call(this);
                this.regUpdateCb("direction", this.onDirChange);
                this.regUpdateCb("percent", this.onHpChanged);
                this.regUpdateCb("ex_hp_percent", this.onHpChanged);
                this.regUpdateCb("speed", this.onSpeedUpdate);
                this.regUpdateCb("name", this.onNameChanged);
                //this.regUpdateCb("buffs", this.onBuffsUpdate);
                // this.regUpdateCb("say_index", this.onChatTxtChanged);
                this.regUpdateCb("camp", this.onCampChanged);
            };
            //body 是否显示出来
            BaseActor.prototype.bodyIsShow = function () {
                return this.avatar && this.avatar.bodyIsShow;
            };
            BaseActor.prototype.setBodyIsShow = function (ret) {
                this.avatar && (this.avatar.bodyIsShow = ret);
            };
            // protected onBuffsUpdate(): void {
            //     if (!this.vo.buffs || this.vo.buffs.length == 0) {
            //         this.clearBuffEft();
            //         return;
            //     }
            //     let showBuff = this.vo.getBuffByType(BuffType.Invincible);
            //     if (showBuff) {
            //         this.showBuffEft(showBuff.buff_index);
            //         return;
            //     }
            //     showBuff = this.vo.getBuffByType(BuffType.Crit);
            //     if (showBuff) {
            //         this.showBuffEft(showBuff.buff_index);
            //         return;
            //     }
            //     this.showBuffEft(null);
            // }
            // private showBuffEft(buffIndex: number) {
            //     if (!buffIndex) {
            //         this.clearBuffEft();
            //         return;
            //     }
            //     if (this._curBuffIdx == buffIndex) {
            //         return;
            //     }
            //     // let src = ResUtil.getBuffEftSrc(buffIndex);
            //     // if (!src) {
            //     //     return;
            //     // }
            //     // this._curBuffIdx = buffIndex;
            //     // this.setBuff(src);
            // }
            // private clearBuffEft() {
            //     this.setBuff(null);
            //     this._curBuffIdx = null;
            // }
            // protected setBuff(src: string) {
            //     this.avatar.setPart(SurfaceType.Buff, src);
            // }
            BaseActor.prototype.onChatTxtChanged = function () {
                // let self = this;
                // let index = this.vo.say_index;
                // let params = this.vo.say_params;
                // let str: string = getConfigByNameId(ConfigName.ServerTips, index);
                // str = StringUtil.substitute(str, params);
                // if (!str || str.trim() == "") {
                //     self.removeChatTxt();
                // } else {
                //     self.setChatTxt(str);
                // }
            };
            BaseActor.prototype.setChatTxt = function (content) {
                var self = this;
                if (!self._chatTxt) {
                    self._chatTxt = Pool.alloc(scene_1.ChatText);
                    self._chatTxt.x = 0;
                    self.add(self._chatTxt);
                }
                if (!self._chatTxt.parent) {
                    self.add(self._chatTxt);
                }
                self._chatTxt.setChatTxt(content);
                self._chatTxt.y = -(self.getBodyHeight() + self._chatTxt.height + 35);
                delayCall(Handler.alloc(self, self.removeChatTxt), 3000);
            };
            BaseActor.prototype.removeChatTxt = function () {
                if (this._chatTxt && this._chatTxt.parent) {
                    this.remove(this._chatTxt);
                }
            };
            BaseActor.prototype.setTaskChatTxt = function (content) {
                var self = this;
                if (!self._taskChatTxt || !this._taskChatTxt.parent) {
                    self._taskChatTxt = Pool.alloc(scene_1.ChatText);
                    self._taskChatTxt.x = 0;
                    self.add(self._taskChatTxt);
                }
                self._taskChatTxt.setChatTxt(content);
                self._taskChatTxt.y = -(self.getBodyHeight() + self._taskChatTxt.height - 10);
            };
            BaseActor.prototype.removeTaskChatTxt = function () {
                if (this._taskChatTxt && this._taskChatTxt.parent) {
                    this.remove(this._taskChatTxt);
                }
            };
            BaseActor.prototype.onSpeedUpdate = function () {
                var cur = this._actMgr.curAct;
                if (cur instanceof scene_1.MoveAct && !cur.isDone && !cur.isAbort) {
                    cur.onSpeedUpdate();
                }
            };
            BaseActor.prototype.setShowShadow = function (isShow) {
                this._isShowShadow = isShow;
            };
            BaseActor.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                var self = this;
                //if (self instanceof SoulWare) return;
                if (self instanceof scene_1.Monster && self.vo.monsterType == 2 /* Boss */)
                    return;
                if (self instanceof scene_1.Trigger)
                    return;
                if (self instanceof scene_1.Ride)
                    return;
                //if (self instanceof Gory) return;
                //暂时屏蔽影影子
                if (this._isShowShadow) {
                    if (self._shadow) {
                        return;
                    }
                    var shadow = Pool.alloc(scene_1.ActorShadow);
                    shadow.setActor(self);
                    self.parent.addDsp(shadow);
                }
            };
            BaseActor.prototype.updateVo = function () {
                _super.prototype.updateVo.call(this);
                var vo = this.vo;
                if (!vo) {
                    return;
                }
                var list = vo.coordinate_list;
                if (list && list.length > 1 && (list[list.length - 1].x != vo.x && list[list.length - 1].y != vo.y)) {
                    this.movePath(vo.coordinate_list);
                }
                if (vo.direction != undefined) {
                    this.dir = vo.direction;
                }
                this.onHpChanged();
                //this.onBuffsUpdate();
                this.onNameChanged();
            };
            Object.defineProperty(BaseActor.prototype, "headMgr", {
                get: function () {
                    return this._headMgr;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseActor.prototype, "actMgr", {
                get: function () {
                    return this._actMgr;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseActor.prototype, "act", {
                get: function () {
                    return this._act;
                },
                set: function (value) {
                    if (!value) {
                        return;
                    }
                    this._act = value;
                    this.avatar.setAct(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseActor.prototype, "dir", {
                get: function () {
                    return this._dir;
                },
                set: function (value) {
                    if (!value) {
                        return;
                    }
                    this._dir = value;
                    this.avatar.setDir(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseActor.prototype, "isDying", {
                get: function () {
                    return this._dying;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseActor.prototype, "isDead", {
                get: function () {
                    if (this._actMgr) {
                        return this._actMgr.has(scene_1.DieAct);
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseActor.prototype, "isMoving", {
                get: function () {
                    if (this._actMgr) {
                        return this._actMgr.has(scene_1.MoveAct);
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            // public set isAdventGodAtk(val: boolean) {
            //     let self = this;
            //     self.avatar.isAdventGodAtk = val;
            // }
            BaseActor.prototype.setBody = function (id, func) {
                this.avatar.setPart(405 /* Body */, id, func);
            };
            BaseActor.prototype.onDirChange = function () {
                this.dir = this.vo.direction;
            };
            BaseActor.prototype.getBodyHeight = function () {
                return 140 * gso.avatarScale;
            };
            BaseActor.prototype.onHpChanged = function () {
                this.changeHpShow();
                var vo = this.vo;
                if (vo.percent <= 0) {
                    if (!this.isDead && !this._dying) {
                        var act = Pool.alloc(scene_1.DieAct);
                        this.actMgr.add(act);
                    }
                }
                else if (this.isDead || this.isDying || this.act.indexOf("die" /* DIE */) > -1) {
                    var dieAct = this._actMgr.curAct;
                    if (dieAct instanceof scene_1.DieAct) {
                        dieAct.done();
                        this._actMgr.remove(dieAct);
                    }
                    // if(ViewMgr.getIns().isShow(ModName.Scene, SceneViewType.RoleRevive) && vo.percent < 10000){
                    //     //死亡等待复活状态，不给改变死亡状态
                    //     return;
                    // }
                    if (vo.percent < 10000) {
                        return;
                    }
                    this.onReborn();
                }
            };
            BaseActor.prototype.changeHpShow = function () {
            };
            BaseActor.prototype.onReborn = function () {
                this._dying = false;
                this.dieDel = false;
                this.act = "std" /* STAND */;
                this.avatar.loop = true;
            };
            BaseActor.prototype.onCampChanged = function () {
                this.onNameChanged();
                this.changeCampShow();
            };
            BaseActor.prototype.changeCampShow = function () {
            };
            BaseActor.prototype.onNameChanged = function () {
                var self = this;
                if (self._headMgr && self.vo.name) {
                    // let color = SceneTools.getNameColor(self.vo, (<Scene>self.parent).sceneType);
                    self._headMgr.setName();
                }
                var scene = self.parent;
                // if (scene.sceneType == SceneType.FairyMagic && self.vo.type == ObjectType.PLAYER) {
                //     self._headMgr.setCampName(getLanById(SceneCampName[self.vo.camp]), SceneTools.getNameColor(self.vo, scene.sceneType));
                // } else {
                self._headMgr.setCampName("");
                // }
            };
            /**添加角色表面特效*/
            BaseActor.prototype.addEft = function (eftId, x, y, dir, scale, cb, loop, isRotation, isScene) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (!this._eftTopMgr) {
                    return 0;
                }
                var times = !!loop ? -1 : 1;
                return this._eftTopMgr.addEft(eftId, x, y, dir, scale, cb, times, isRotation, isScene);
            };
            /**添加角色底下特效*/
            BaseActor.prototype.addBottomEft = function (eftId, x, y, dir, scale, cb) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (!this._eftBottomMgr) {
                    return 0;
                }
                return this._eftBottomMgr.addEft(eftId, x, y, dir, scale, cb);
            };
            BaseActor.prototype.hit = function (dir) {
                var hit = Pool.alloc(scene_1.HitAct);
                hit.eftDir = dir;
                this._actMgr.add(hit);
            };
            BaseActor.prototype.onHitStart = function (isChangedAct) {
                if (isChangedAct === void 0) { isChangedAct = true; }
                if (isChangedAct) {
                    this.act = "hit" /* HIT */ + 1;
                }
            };
            BaseActor.prototype.onHitEnd = function () {
                this.checkAct();
            };
            BaseActor.prototype.addBlood = function (battleValue) {
                var act = Pool.alloc(scene_1.AddBloodAct);
                act.setData(battleValue);
                this._actMgr.add(act);
            };
            BaseActor.prototype.addImmune = function (battleValue) {
                var act = Pool.alloc(scene_1.AddImmuneAct);
                act.setData(battleValue);
                this._actMgr.add(act);
            };
            BaseActor.prototype.attack = function (idx, actIdx, dir, list, focusPt) {
                if (actIdx === void 0) { actIdx = [1]; }
                if (this.isDead) {
                    scene_1.SkillEffectVo.releaseList(list);
                    Pool.release(focusPt);
                    return;
                }
                if (!actIdx || actIdx.length <= 0) {
                    //忽略动作的
                    return;
                }
                var cfg = game.SkillData.getCfg(idx);
                var atk;
                atk = Pool.alloc(scene_1.AttackAct);
                atk.setData(idx, actIdx, dir, list, focusPt);
                this._actMgr.add(atk);
            };
            BaseActor.prototype.onAttackStart = function (type, dir, eftId) {
                this._atkList = type;
                var atkType = this._atkList.shift();
                this.attackStart(atkType, dir, eftId);
            };
            BaseActor.prototype.attackStart = function (type, dir, eftId) {
                var self = this;
                // if (!eftId) {
                self.avatar.loop = false;
                self.avatar.onComplete = Handler.alloc(self, self.onAnimComp);
                // }
                //self.avatar.resetActDir();
                self.act = "atk" /* ATTACK */ + type;
                self.dir = dir;
            };
            BaseActor.prototype.onAttackEnd = function () {
                if (this.avatar) {
                    this.avatar.loop = true;
                }
                this.checkAct();
            };
            BaseActor.prototype.checkAct = function () {
                if (this.isDead || this._dying) {
                    return;
                }
                if (this._actMgr.isEmpty) {
                    this.act = "std" /* STAND */;
                    return;
                }
                var enableAct = 0;
                for (var i = 0; i < this._actMgr.children.length; i++) {
                    var act = this._actMgr.children[i];
                    if (act.isDone || act.isAbort) {
                        continue;
                    }
                    enableAct++;
                }
                if (enableAct == 0) {
                    this.act = "std" /* STAND */;
                }
            };
            BaseActor.prototype.setActStand = function () {
                if (this.vo && this.vo.percent > 0 && this.actMgr && !this.actMgr.curAct) {
                    this.act = "std" /* STAND */;
                }
            };
            BaseActor.prototype.onAnimComp = function () {
                if (this.act.indexOf("atk" /* ATTACK */) != -1 && this._atkList && this._atkList.length != 0) {
                    var atkType = this._atkList.shift();
                    this.act = "atk" /* ATTACK */ + atkType;
                    return;
                }
                if (this.avatar && this.avatar.isComplete) {
                    this.avatar.loop = true;
                    this.avatar.onComplete = null;
                }
                if (this._actMgr) {
                    var curAct = this._actMgr.curAct;
                    if (curAct instanceof scene_1.DieAct) {
                        curAct.onAnimComp();
                    }
                    if (curAct instanceof scene_1.AttackAct) {
                        curAct.onEffCom();
                        if (curAct.parent) {
                            this._actMgr.remove(curAct);
                            this._actMgr.doNext();
                        }
                    }
                }
            };
            BaseActor.prototype.onDie = function () {
                this.avatar.loop = false;
                this.avatar.onComplete = Handler.alloc(this, this.onAnimComp);
                this.avatar.bodyIsShow = false;
                if (this.vo.type == 3 /* MONSTER */ && this.vo.monsterType == 2 /* Boss */) {
                    // this.addEft(BossDieEftSrc, 0, -100, null, 3);
                    return;
                }
                this.act = "die" /* DIE */;
            };
            BaseActor.prototype.onDieEnd = function () {
                this._dying = false;
                if (this.dieDel && this.parent) {
                    this.dispose();
                }
            };
            /** 最后一击 */
            BaseActor.prototype.onFatalAtk = function () {
            };
            /** 击杀 */
            BaseActor.prototype.killBy = function (attacker) {
            };
            BaseActor.prototype.movePath = function (path, onMoveEnd, moveType, moveTime) {
                if (!path || (path.length < 2 && moveType != 6 /* Jump */ && moveType != 7 /* Push_Back */) || this.isDead || this.act.indexOf("die" /* DIE */) > -1) {
                    Pool.releaseList(path);
                    Pool.release(onMoveEnd);
                    return;
                }
                // if(moveType && moveType == MoveType.Jump){
                //     let jumpAct:JumpMoveAct = Pool.alloc(JumpMoveAct);
                //     jumpAct.setPath(path, moveType, onMoveEnd);
                //     this._actMgr.add(jumpAct);
                //     console.log("跳跃路径,",path);
                //     return;
                // }
                var act = Pool.alloc(scene_1.MoveAct);
                act.setPath(path, onMoveEnd, moveType, moveTime);
                this._actMgr.add(act);
            };
            BaseActor.prototype.onBackStart = function () {
            };
            BaseActor.prototype.onMoveStart = function () {
                this.act = "jmp" /* JUMP */ + 1;
            };
            BaseActor.prototype.onMoveEnd = function (keepRun) {
                if (keepRun === void 0) { keepRun = false; }
                if (!keepRun) {
                    this.act = "std" /* STAND */;
                }
            };
            BaseActor.prototype.setTilePos = function (tx, ty, updateWorld) {
                if (updateWorld === void 0) { updateWorld = true; }
                if (isNaN(tx) || isNaN(ty)) {
                    console.error("test setTilePos 坐标错误！", tx, ty, updateWorld, this.vo.type, this.vo.entity_id.toString());
                }
                _super.prototype.setTilePos.call(this, tx, ty, updateWorld);
                this.refreshTileChange();
            };
            /**
             * 遮挡效果
             */
            BaseActor.prototype.refreshTileChange = function () {
                var isShelter = scene_1.MapData.ins.isShelter(this.vo.x, this.vo.y);
                this.dsp.alpha = isShelter ? 0.4 : 1;
            };
            BaseActor.prototype.getMoveSpeed = function (mType) {
                var w = scene_1.MapData.ins.cellWidth;
                var sp = this.vo.speed || game.DefaultSpeed; //防止服务端没有发移动速度导致报错
                switch (mType) {
                    case 0 /* Normal */:
                    case 3 /* Find */:
                        return w / sp;
                    case 1 /* Sprint */:
                    case 6 /* Jump */:
                    case 2 /* Back */:
                        return w / sp * 2;
                }
                return w / sp;
            };
            BaseActor.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                var self = this;
                self._actMgr = Pool.alloc(scene_1.ActMgr);
                self.add(self._actMgr);
                self._eftBottomMgr = Pool.alloc(scene_1.ActorEftMgr);
                self.add(this._eftBottomMgr);
                self.avatar = Pool.alloc(scene_1.Avatar);
                self.avatar.ower = this;
                self.add(self.avatar);
                // self.clickArea = Pool.alloc(BaseClickArea);
                // self.add(self.clickArea);
                self._headMgr = Pool.alloc(scene_1.HeadMgr);
                self.add(self._headMgr);
                self._eftTopMgr = Pool.alloc(scene_1.ActorEftMgr);
                self.add(this._eftTopMgr);
                self.act = "std" /* STAND */;
                self.dir = 4 /* RIGHT_DOWN */;
            };
            BaseActor.prototype.updateHeadMgrY = function () {
                if (!this._headMgr) {
                    return;
                }
                this._headMgr.y = -(this.getBodyHeight() + this._headMgr.height);
                //this.updateClickArea();
            };
            BaseActor.prototype.setShadow = function (shadow) {
                this._shadow = shadow;
            };
            BaseActor.prototype.setWorldPos = function (wx, wy) {
                if (gso.dbg_scene == 4 && (this._enType == 3 /* MONSTER */ || this._enType == 1 /* PLAYER */)) {
                    var x = Math.floor(wx / 32);
                    var y = Math.floor(wy / 32);
                    //console.log("怪物格子 " + x +","+y);
                    var curPt = game.StringUtil.substitute("(%s,%s):%s", [x, y, (this.vo.entity_id != null ? this.vo.entity_id.toNumber() : NaN)]);
                    this._headMgr.setTeamName(curPt, 16777215 /* WHITE */);
                }
                _super.prototype.setWorldPos.call(this, wx, wy);
                if (this._shadow) {
                    this._shadow.updatePos(wx, wy);
                }
                if ((gso.dbg_scene & 1) != 0 || (gso.dbg_scene & 2) != 0) {
                    var tilePt = scene_1.MapData.ins.getCellPt(wx, wy);
                    if (!this.vo.entity_id)
                        return;
                    var curPt = game.StringUtil.substitute("(%s,%s):%s", [Math.floor(tilePt.x), Math.floor(tilePt.y), (this.vo.entity_id != null ? this.vo.entity_id.toNumber() : NaN)]);
                    this._headMgr.setTeamName(curPt, 16777215 /* WHITE */);
                    Pool.release(tilePt);
                }
            };
            BaseActor.prototype.onRelease = function () {
                var self = this;
                self._curBuffIdx = undefined;
                self._actMgr = undefined;
                self._headMgr = undefined;
                self._eftTopMgr = undefined;
                self._eftBottomMgr = undefined;
                self.avatar = undefined;
                //self.clickArea = undefined;
                self._dying = undefined;
                self.dieDel = undefined;
                self._act = undefined;
                self._dir = undefined;
                self._chatTxt = undefined;
                self._taskChatTxt = undefined;
                self._fixFrame = undefined;
                if (self._shadow) {
                    Pool.release(self._shadow);
                    self._shadow = undefined;
                }
                _super.prototype.onRelease.call(this);
            };
            BaseActor.prototype.setFixFrame = function (frame) {
                this._fixFrame = frame;
                this.avatar.setFixFrame(frame);
            };
            Object.defineProperty(BaseActor.prototype, "fixFrame", {
                get: function () {
                    return this._fixFrame;
                },
                enumerable: true,
                configurable: true
            });
            return BaseActor;
        }(scene_1.BaseSceneObj));
        scene_1.BaseActor = BaseActor;
        __reflect(BaseActor.prototype, "game.scene.BaseActor");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Point = egret.Point;
        var Pool = base.Pool;
        var TimeMgr = base.TimeMgr;
        var ActorVo = /** @class */ (function (_super) {
            __extends(ActorVo, _super);
            function ActorVo() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                //public owner_name: string;
                // public talents: number[];
                // public say_params: string[];
                // public say_index: number;
                _this.isTarget = false;
                return _this;
            }
            ActorVo.prototype.getBuffByType = function (type) {
                if (!this.buffs) {
                    return null;
                }
                for (var _i = 0, _a = this.buffs; _i < _a.length; _i++) {
                    var b = _a[_i];
                    var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, b.buff_index);
                    if (!buffCfg) {
                        continue;
                    }
                    // if (buffCfg.group == type) {
                    //     return b;
                    // }
                }
                return null;
            };
            ActorVo.prototype.getBuffByIndex = function (index) {
                if (!this.buffs) {
                    return null;
                }
                for (var _i = 0, _a = this.buffs; _i < _a.length; _i++) {
                    var b = _a[_i];
                    var leftTime = b.end_time - TimeMgr.time.serverTimeSecond;
                    if (b.buff_index == index && (leftTime > 0 || b.beg_time == b.end_time)) {
                        return b;
                    }
                }
                return null;
            };
            ActorVo.prototype.applyUpdate = function (data) {
                var s2c = data;
                var keys = [
                    "move_type",
                    "speed",
                    "direction",
                    "hp",
                    "max_hp",
                    "entity_info",
                    "buffs",
                    // "talents",
                    "coordinate_list",
                    "camp",
                    "percent",
                    "is_buff_empty",
                    // "say_index",
                    // "say_params",
                    "showpower",
                    //"owner_name",
                    "ex_hp_percent"
                ];
                var res = _super.prototype.applyUpdate.call(this, s2c.entity_info);
                for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
                    var k = keys_4[_i];
                    if (!data.hasOwnProperty(k)) {
                        continue;
                    }
                    if (k === "coordinate_list") {
                        var list = this.coordinate_list || [];
                        this.coordinate_list = list;
                        list.length = 0;
                        for (var _a = 0, _b = s2c.coordinate_list; _a < _b.length; _a++) {
                            var p = _b[_a];
                            list.push(Pool.alloc(Point).setTo(p.x, p.y));
                        }
                        res.push(k);
                        continue;
                    }
                    if (k === "entity_info") {
                        continue;
                    }
                    if (this[k] instanceof Long) {
                        if (!this[k]) {
                            this[k] = new Long(s2c[k].low, s2c[k].high);
                        }
                        else {
                            this[k].low = s2c[k].low;
                            this[k].high = s2c[k].high;
                        }
                    }
                    else {
                        this[k] = s2c[k];
                    }
                    res.push(k);
                }
                if (this.buffs && this.is_buff_empty && res.indexOf("is_buff_empty") > -1) {
                    this.buffs.length = 0;
                    if (res.indexOf("buffs") < 0) {
                        res.push("buffs");
                    }
                }
                return res;
            };
            return ActorVo;
        }(scene.SceneObjVo));
        scene.ActorVo = ActorVo;
        __reflect(ActorVo.prototype, "game.scene.ActorVo");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var utils;
    (function (utils) {
        var Point = egret.Point;
        var Pool = base.Pool;
        var GDirUtil = /** @class */ (function () {
            function GDirUtil() {
            }
            GDirUtil.getMir = function (dir) {
                if (game.MirDir[dir]) {
                    return game.MirDir[dir];
                }
                return dir;
            };
            GDirUtil.reversalDir = function (dir) {
                return game.ReversalDir[dir];
            };
            GDirUtil.rad2Dir = function (rad) {
                var angle2 = game.MathUtil.rad2deg(rad);
                return this.angle2Dir(angle2);
            };
            GDirUtil.angle2Dir = function (angle) {
                var dirIdx = game.MathUtil.round((360 - angle) / 45) % 8;
                return this.dir2idx[dirIdx];
            };
            GDirUtil.dir2Rad = function (dir) {
                var indexOf = this.dir2idx.indexOf(dir);
                return -game.MathUtil.deg2rad(45) * indexOf;
            };
            GDirUtil.randDir = function () {
                return Math.floor(Math.random() * 8 + 1);
            };
            GDirUtil.calcTan = function (x0, y0, x1, y1) {
                return (y1 - y0) / (x1 - x0);
            };
            GDirUtil.getRadian2 = function (p1X, p1Y, p2X, p2Y) {
                var x_dis = p2X - p1X;
                var y_dis = p2Y - p1Y;
                return Math.atan2(y_dis, x_dis);
            };
            GDirUtil.calcDirection = function (pt0, pt1) {
                if (pt0.equals(pt1)) {
                    return 0 /* NONE */;
                }
                return this.directionByTan2(pt0.x, pt0.y, pt1.x, pt1.y);
            };
            GDirUtil.directionByTan2 = function (x0, y0, x1, y1) {
                var self = this;
                var radian = self.getRadian2(x0, y0, x1, y1);
                var angle = 180 * radian / Math.PI;
                var dir;
                if (angle <= 20 && angle >= -20) {
                    dir = 3 /* RIGHT */;
                }
                else if (angle > 20 && angle <= 90) {
                    dir = 4 /* RIGHT_DOWN */;
                }
                else if (angle > 90 && angle < 160) {
                    dir = 6 /* LEFT_DOWN */;
                }
                else if (angle > -160 && angle <= -90) {
                    dir = 8 /* LEFT_UP */;
                }
                else if (angle > -90 && angle < -20) {
                    dir = 2 /* RIGHT_UP */;
                }
                else {
                    dir = 7 /* LEFT */;
                }
                return dir;
            };
            GDirUtil.moveDirectionByTan2 = function (x0, y0, x1, y1) {
                var self = this;
                var radian = self.getRadian2(x0, y0, x1, y1);
                var angle = 180 * radian / Math.PI;
                return this.getDirByAngle(angle);
            };
            GDirUtil.getDirByAngle = function (angle) {
                if (angle >= -22.5 && angle < 22.5) {
                    return 3 /* RIGHT */;
                }
                else if (angle >= 22.5 && angle < 67.5) {
                    return 4 /* RIGHT_DOWN */;
                }
                else if (angle >= 67.5 && angle < 112.5) {
                    return 5 /* DOWN */;
                }
                else if (angle >= 112.5 && angle < 157.5) {
                    return 6 /* LEFT_DOWN */;
                }
                else if (angle >= -67.5 && angle < -22.5) {
                    return 2 /* RIGHT_UP */;
                }
                else if (angle >= -157.5 && angle < -112.5) {
                    return 8 /* LEFT_UP */;
                }
                else if (angle >= -112.5 && angle < -67.5) {
                    return 1 /* UP */;
                }
                else {
                    return 7 /* LEFT */;
                }
            };
            /** 新方向资源处理 **/
            GDirUtil.getBmpScaleXFor2 = function (dir) {
                var idx = game.AlterXDirs2[dir];
                return idx ? idx : 1;
            };
            GDirUtil.getBmpScaleXFor3 = function (dir) {
                var idx = game.AlterXDirs3[dir];
                return idx ? idx : 1;
            };
            GDirUtil.getMir2 = function (dir) {
                if (game.MirDirFor2[dir]) {
                    return game.MirDirFor2[dir];
                }
                return dir;
            };
            GDirUtil.getMir3 = function (dir) {
                if (game.MirDirFor3[dir]) {
                    return game.MirDirFor3[dir];
                }
                return dir;
            };
            GDirUtil.directionByTanMir2 = function (x0, y0, x1, y1) {
                var dirs = GDirUtil.MIR2_DIRECTIONS;
                var idx = (x0 <= x1 ? 0 : 1) * 2 + (y0 <= y1 ? 1 : 0);
                var ret_dir = dirs[idx] || this.randDir();
                return ret_dir;
            };
            /**
             * 一个x,y坐标的一个dir方向dis距离的点（
             * @param x
             * @param y
             * @param dir 方向
             * @param dis 距离
             */
            GDirUtil.getDirPoint = function (x, y, dir, dis) {
                var self = this;
                var cur_dir = dir;
                var cur_dis = dis;
                var r = (cur_dir - 3 /* RIGHT */) * self.PI8 * 2;
                var target_x = Math.round(x + cur_dis * Math.cos(r));
                var target_y = Math.round(y + cur_dis * Math.sin(r));
                var point = Pool.alloc(Point);
                point.setTo(target_x, target_y);
                return point;
            };
            GDirUtil.PI8 = Math.PI / 8;
            GDirUtil.tan22_5 = Math.tan(GDirUtil.PI8);
            GDirUtil.tan67_5 = Math.tan(GDirUtil.PI8 * 3);
            GDirUtil.Dir_Res_Num = 3;
            GDirUtil.dir2idx = [
                3 /* RIGHT */,
                2 /* RIGHT_UP */,
                1 /* UP */,
                8 /* LEFT_UP */,
                7 /* LEFT */,
                6 /* LEFT_DOWN */,
                5 /* DOWN */,
                4 /* RIGHT_DOWN */,
            ];
            //资源2方向下获取方向
            GDirUtil.MIR2_DIRECTIONS = [2 /* RIGHT_UP */, 4 /* RIGHT_DOWN */, 8 /* LEFT_UP */, 6 /* LEFT_DOWN */];
            return GDirUtil;
        }());
        utils.GDirUtil = GDirUtil;
        __reflect(GDirUtil.prototype, "game.utils.GDirUtil");
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Partner = /** @class */ (function (_super) {
            __extends(Partner, _super);
            function Partner() {
                return _super.call(this) || this;
            }
            Object.defineProperty(Partner.prototype, "vo", {
                get: function () {
                    return this._vo;
                },
                set: function (value) {
                    this._vo = value;
                },
                enumerable: true,
                configurable: true
            });
            Partner.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
            };
            Partner.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                this.avatar.loadPri = this.vo.isMainPet ? game.LoadPri.SceneMainPet : game.LoadPri.Scene;
                this.updateIndex();
            };
            Partner.prototype.initUpdateCb = function () {
                _super.prototype.initUpdateCb.call(this);
                this.regUpdateCb("index", this.updateIndex);
            };
            Partner.prototype.onNameChanged = function () {
                if (!this._headMgr)
                    return;
                if (this.vo.name) {
                    this._headMgr.setName();
                }
                // let _isEnemy: boolean = SceneTools.isEnemy(this.vo, (<Scene>this.parent).sceneType);
                // let color1 = _isEnemy ? UIColor.RED : UIColor.WHITE;
                // let color2 = this.vo.isMainPet ? UIColor.GREEN : _isEnemy ? UIColor.RED : UIColor.ORANGE;
                // if (this.vo.name) {
                //     this._headMgr.setName();
                // }
                // if (this.vo.master_name) {
                //     let txt = StringUtil.substitute(getLanById(LanDef.partner), [PetObjectName[this.avatar.resType]]);
                //     this._headMgr.setTeamName(txt, color2);
                // }
            };
            Partner.prototype.changeHpShow = function () {
                // if (this._headMgr && this.vo.percent != undefined) {
                //     this._headMgr.setHp(this.vo.percent);
                // }
            };
            Partner.prototype.getBodyHeight = function () {
                return 110 * gso.scaleTexture;
            };
            Partner.prototype.updateIndex = function () {
                if (!this.vo.index) {
                    this.setBody(null);
                    return;
                }
                var surfIdx = this.vo.index;
                // this.vo.percent = 100;
                // this.vo.hp.add(10000);
                // this.vo.max_hp.add(10000);
                var cfg = game.getConfigById(surfIdx);
                if (!cfg) {
                    return;
                }
                var head = game.PropData.getPropParse(surfIdx, 1 /* Type */);
                this.avatar.resType = head; //10;//head;//config.outlook;//[0];
                this.act = this._act;
                var body;
                if (head == 400 /* Shenling */) {
                    //神灵模型
                    body = game.ResUtil.getModelName(surfIdx, 1 /* Male */, false, this.vo.evolve);
                }
                else {
                    body = game.ResUtil.getModelName(surfIdx);
                }
                this.setBody(body);
            };
            Partner.prototype.onMoveStart = function () {
                this.act = "run" /* RUN */;
                // console.log(">>>>>>>model.loop", this.vo.name + "开始移动", this.avatar.loop);
            };
            Partner.prototype.getMoveSpeed = function (mType) {
                return scene.MapData.ins.cellWidth / this.vo.speed;
            };
            Partner.prototype.onDie = function () {
                //侍从没有死亡动作 (Y5添加死亡动作)
                _super.prototype.onDie.call(this);
            };
            Partner.prototype.onDieEnd = function () {
                //己方伙伴死后不移除
                // if (this.vo && !SceneTools.isMainObj(this.vo.entity_id)) {
                //     super.onDieEnd();
                //     (<SceneDisplay><any>this.dsp).deadZorder = -1;
                // }
            };
            /*** 切换主视角 */
            Partner.prototype.setWorldPos = function (wx, wy) {
                _super.prototype.setWorldPos.call(this, wx, wy);
                // if (SceneTools.isFocusEntity(this.vo.entity_id)) {
                //     let scene: Scene = <Scene>this.parent;
                //     scene.updateFocus(wx, wy);
                //     scene.updateShakeFocusPt();
                // }
            };
            Object.defineProperty(Partner.prototype, "act", {
                get: function () {
                    return this._act;
                },
                set: function (value) {
                    if (!value) {
                        return;
                    }
                    // if ((value == ActionName.RUN || value == ActionName.RUN + 1)
                    //     && this.avatar.resType == SurfaceType.LingChong) {
                    //     value = ActionName.STAND + 1;
                    // } else if ((value == ActionName.ATTACK || value == ActionName.ATTACK + 1)
                    //     && this.avatar.resType == SurfaceType.WildPet) {
                    //     return;
                    // }
                    //
                    this._act = value;
                    // // 特殊处理职业模型
                    // // this.avatar.weaponType = this.getWeaponType();
                    this.avatar.setAct(value);
                },
                enumerable: true,
                configurable: true
            });
            return Partner;
        }(scene.BaseActor));
        scene.Partner = Partner;
        __reflect(Partner.prototype, "game.scene.Partner");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var MonsterVo = /** @class */ (function (_super) {
            __extends(MonsterVo, _super);
            function MonsterVo() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.isReady = false;
                _this.lv = 0;
                _this.isDead = false;
                return _this;
            }
            Object.defineProperty(MonsterVo.prototype, "monsterType", {
                get: function () {
                    if (this._monsterType != undefined) {
                        return this._monsterType;
                    }
                    if (this.cfg) {
                        var idx = this.cfg.index + "";
                        this._monsterType = parseInt(idx.slice(2, 4)); /**index第三、四位为怪物类型，BOSS类型是2*/
                        return this._monsterType;
                    }
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MonsterVo.prototype, "cfg", {
                get: function () {
                    var cfg = this._cfg;
                    if (cfg == null || cfg.index != this.index) {
                        cfg = null;
                    }
                    if (cfg == null && this.index) {
                        cfg = game.getConfigByNameId("monster1.json" /* Monster */, this.index);
                    }
                    this._cfg = cfg;
                    // this.lv = cfg ? cfg.level : 0;
                    return cfg;
                },
                enumerable: true,
                configurable: true
            });
            MonsterVo.prototype.applyUpdate = function (s2c) {
                if (s2c.index) {
                    if (typeof s2c.index == "number") {
                        this.index = s2c.index;
                    }
                    else {
                        this.index = s2c.index.toNumber();
                    }
                }
                return _super.prototype.applyUpdate.call(this, s2c.walk_entity_info);
            };
            return MonsterVo;
        }(scene.ActorVo));
        scene.MonsterVo = MonsterVo;
        __reflect(MonsterVo.prototype, "game.scene.MonsterVo");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        //import NpcConfig = game.config.NpcConfig;
        var NPCVo = /** @class */ (function (_super) {
            __extends(NPCVo, _super);
            function NPCVo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // public get cfg(): NpcConfig {
            //     let cfg: NpcConfig = this._cfg;
            //     if (cfg && cfg.index != this.index) {
            //         cfg = null;
            //     }
            //     if (cfg == null && this.index) {
            //         cfg = getConfigByNameId(ConfigName.Npc, this.index);
            //         //if (cfg == null) cfg = getConfigByNameId(ConfigName.TempNpc, this.index);
            //         if (cfg == null) cfg = getConfigByNameId(ConfigName.Monster, this.index);
            //     }
            //     this._cfg = cfg;
            //     return cfg;
            // }
            NPCVo.prototype.applyUpdate = function (data) {
                var s2c = data;
                this.index = s2c.index;
                var res = s2c.walk_entity_info ? _super.prototype.applyUpdate.call(this, s2c.walk_entity_info) : [];
                return res;
            };
            return NPCVo;
        }(scene.ActorVo));
        scene.NPCVo = NPCVo;
        __reflect(NPCVo.prototype, "game.scene.NPCVo");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var GDirUtil = game.utils.GDirUtil;
        var Point = egret.Point;
        var Pool = base.Pool;
        var SceneUtil = game.mod.SceneUtil;
        var Handler = base.Handler;
        //����,������������
        var Ride = /** @class */ (function (_super) {
            __extends(Ride, _super);
            function Ride() {
                var _this = _super.call(this) || this;
                _this._enType = 4 /* PET */;
                return _this;
            }
            Object.defineProperty(Ride.prototype, "vo", {
                get: function () {
                    return this._vo;
                },
                set: function (value) {
                    this._vo = value;
                },
                enumerable: true,
                configurable: true
            });
            Ride.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                this.avatar.resType = 360 /* Horse */;
                this.isPlayGhost = false;
            };
            Ride.prototype.onDie = function () {
                _super.prototype.onDie.call(this);
            };
            Ride.prototype.updateIndex = function () {
                var isHorse2 = false;
                var rideSrc;
                if (this.vo.index) {
                    var config = game.getConfigById(this.vo.index);
                    isHorse2 = config.is_double == 1;
                    rideSrc = game.ResUtil.getModelName(this.vo.index);
                }
                this.avatar.setPart(360 /* Horse */, rideSrc);
                if (isHorse2) {
                    this.avatar.setPart(9900 /* Horse2 */, rideSrc);
                }
                else {
                    this.avatar.setPart(9900 /* Horse2 */, null);
                }
            };
            Ride.prototype.isShowAvatar = function (show) {
                var self = this;
                if (!self.avatar)
                    return;
                if (self.avatar.dsp.parent && !show) {
                    self.dsp.removeChild(self.avatar.dsp);
                    self.headMgr.dsp.visible = false;
                }
                else if (self.avatar.dsp.parent == null && show) {
                    var idx = self.dsp.getChildIndex(self.headMgr.dsp);
                    self.dsp.addChildAt(self.avatar.dsp, idx - 1);
                    self.headMgr.dsp.visible = true;
                }
            };
            Object.defineProperty(Ride.prototype, "act", {
                get: function () {
                    return this._act;
                },
                set: function (value) {
                    if (!value) {
                        return;
                    }
                    this._act = value;
                    this.avatar.setAct(value);
                },
                enumerable: true,
                configurable: true
            });
            Ride.prototype.onStar = function (id, handler, _scene) {
                var self = this;
                var gPlayer = SceneUtil.getSceneObjById(id);
                var playerVo = gPlayer.vo;
                if (!playerVo)
                    return;
                var _dir = GDirUtil.reversalDir(gPlayer.dir);
                var endPoint = Pool.alloc(Point).setTo(playerVo.x, playerVo.y);
                var starPoint = GDirUtil.getDirPoint(playerVo.x, playerVo.y, _dir, 10);
                if (!self.vo) {
                    self.vo = new scene.PetVo(4 /* PET */);
                    self.vo.index = playerVo.ride;
                    self.vo.master_id = playerVo.entity_id;
                    self.vo.speed = playerVo.speed / 4;
                    _scene.ctrl.addRide(self);
                    self.setTilePos(starPoint.x, starPoint.y, true);
                }
                var move = Pool.alloc(scene.MoveAct);
                var path = [starPoint, endPoint];
                if (!path)
                    return;
                this.isPlayGhost = true;
                var had = Handler.alloc(handler.context, handler.method, [self, true]);
                move.setPath(path, had);
                Pool.release(handler);
                self.actMgr.add(move);
                // Tween.get(this.dsp).to({alpha: 1}, 1000)
            };
            Ride.prototype.onOff = function (id, handler, _scene) {
                var self = this;
                var gPlayer = SceneUtil.getSceneObjById(id);
                var playerVo = gPlayer.vo;
                if (!playerVo)
                    return;
                var _starPoint = Pool.alloc(Point).setTo(playerVo.x, playerVo.y);
                var _endPoint = GDirUtil.getDirPoint(playerVo.x, playerVo.y, gPlayer.dir, 10);
                if (!self.vo) {
                    self.vo = new scene.PetVo(4 /* PET */);
                    self.vo.index = playerVo.ride;
                    self.vo.master_id = playerVo.entity_id;
                    _scene.ctrl.addRide(self);
                    self.vo.speed = playerVo.speed / 4;
                    self.setTilePos(_starPoint.x, _starPoint.y, true);
                }
                var move = Pool.alloc(scene.MoveAct);
                var path = [_starPoint, _endPoint];
                if (!path)
                    return;
                this.isPlayGhost = true;
                var had = Handler.alloc(handler.context, handler.method, [self, false]);
                move.setPath(path, had);
                self.actMgr.add(move);
                Pool.release(handler);
                // Tween.get(this.dsp).to({alpha: 0}, 500)
            };
            Ride.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                this.alpha = this.isPlayGhost ? 0.6 : 1;
            };
            Ride.prototype.onRelease = function () {
                _super.prototype.onRelease.call(this);
                this.isPlayGhost = undefined;
            };
            return Ride;
        }(scene.Partner));
        scene.Ride = Ride;
        __reflect(Ride.prototype, "game.scene.Ride");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var BaseAct = /** @class */ (function (_super) {
            __extends(BaseAct, _super);
            function BaseAct() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(BaseAct.prototype, "isAbort", {
                get: function () {
                    return this._isAbort;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseAct.prototype, "isDone", {
                get: function () {
                    return this._isDone;
                },
                enumerable: true,
                configurable: true
            });
            BaseAct.prototype.start = function () {
                this._isDone = false;
                this._isAbort = false;
                this.onStart();
            };
            BaseAct.prototype.done = function () {
                this._isDone = true;
                this.onDone();
            };
            BaseAct.prototype.abort = function () {
                this._isAbort = true;
                this.onAbort();
            };
            BaseAct.prototype.onStart = function () {
                this.updateEnabled = true;
            };
            BaseAct.prototype.onDone = function () {
            };
            BaseAct.prototype.onAbort = function () {
            };
            BaseAct.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                this._actor = this.parent.parent;
            };
            BaseAct.prototype.onRelease = function () {
                this._actor = null;
                _super.prototype.onRelease.call(this);
            };
            return BaseAct;
        }(scene.BaseItem));
        scene.BaseAct = BaseAct;
        __reflect(BaseAct.prototype, "game.scene.BaseAct");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_2) {
        var Handler = base.Handler;
        var Pool = base.Pool;
        var SceneUtil = game.mod.SceneUtil;
        //玩家
        var GPlayer = /** @class */ (function (_super) {
            __extends(GPlayer, _super);
            function GPlayer() {
                var _this = _super.call(this) || this;
                _this._huaShengOffY = 30;
                _this.jumpAction = 2;
                _this._enType = 1 /* PLAYER */;
                return _this;
            }
            Object.defineProperty(GPlayer.prototype, "vo", {
                get: function () {
                    return this._vo;
                },
                set: function (value) {
                    this._vo = value;
                },
                enumerable: true,
                configurable: true
            });
            GPlayer.prototype.closeAvatar = function () {
                this.avatar.close = false;
            };
            GPlayer.prototype.updateAvatarClose = function () {
                this.avatar.close = gso.maskOthers;
            };
            GPlayer.prototype.updateVo = function () {
                _super.prototype.updateVo.call(this);
                var vo = this.vo;
                if (!vo) {
                    return;
                }
                if (vo.percent != undefined) {
                    this._headMgr.setHp(vo.percent);
                }
                this.avatar.objType = 1 /* PLAYER */;
                this.updateAvatarClose();
                this.onTitleUpdate();
                this.onPlayerUpdate();
                this.onTeamNameUpdate();
                this.onCampUpdate();
                this.onUpdateMaxHp();
            };
            GPlayer.prototype.initUpdateCb = function () {
                _super.prototype.initUpdateCb.call(this);
                // this.regUpdateCb("ride", this.onRideUpdate);
                this.regUpdateCb("wing", this.onWingUpdate);
                this.regUpdateCb("weapon", this.onWeaponUpdate);
                this.regUpdateCb("fashion", this.onBodyUpdate);
                this.regUpdateCb("sex", this.onBodyUpdate);
                this.regUpdateCb("title_index", this.onTitleUpdate);
                this.regUpdateCb("title_star", this.onTitleUpdate);
                this.regUpdateCb("camp", this.onCampUpdate);
                // this.regUpdateCb("guild_team_name", this.onTeamNameUpdate);
                //this.regUpdateCb("guild_team_id", this.onTeamNameUpdate);
                this.regUpdateCb("max_hp", this.onUpdateMaxHp);
                this.regUpdateCb("ride_state", this.onRideUpdate);
                this.regUpdateCb("ride", this.onHorseUpdate);
                this.regUpdateCb("mate_id", this.onMarryNameUpdate);
                this.regUpdateCb("level", this.onUpdateLevel);
                //化神
                this.regUpdateCb("the_god", this.onHuashenUpdate);
            };
            GPlayer.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
            };
            GPlayer.prototype.attackStart = function (type, dir, eftId) {
                var self = this;
                if (!eftId) {
                    self.avatar.loop = false;
                    self.avatar.onComplete = Handler.alloc(self, self.onAnimComp);
                }
                self.avatar.resetActDir();
                if (type == 8) { //8类型只有一个方向
                    dir = game.MirDir[dir] != null ? 7 /* LEFT */ : 3 /* RIGHT */;
                }
                self.act = "atk" /* ATTACK */ + type;
                self.dir = dir;
            };
            GPlayer.prototype.attack = function (idx, actIdx, dir, list, focusPt) {
                //let cfg: BattleSkillConfig = SkillData.getCfg(idx);
                // let _isAdventGodAtk: boolean = false;
                // if (cfg) {
                //     _isAdventGodAtk = cfg && cfg.type1 === 32;
                // }
                this.dir = dir;
                // if (cfg.type1 == SkillType.YuLing) {
                //     let scene = this.parent as Scene;
                //     let gory = scene.ctrl.getGory(this.vo.entity_id);
                //     if (gory) {
                //         gory.attack();
                //     }
                // }
                _super.prototype.attack.call(this, idx, actIdx, dir, list, focusPt);
            };
            GPlayer.prototype.onPlayerUpdate = function () {
                var self = this;
                self.onBodyUpdate();
                self.onWingUpdate();
                self.onRideInit();
                self.onWeaponUpdate();
                self.updateHeadMgrY();
                self.onHuashenUpdate();
                //self.onUpdateSoulWare();
                //self.onUpdateGory();
                //self.onYsUpdate()
            };
            GPlayer.prototype.onCampUpdate = function () {
                // this.onCreditLvUpdate();
                this.onNameChanged();
            };
            GPlayer.prototype.onMarryNameUpdate = function () {
                if (this.vo.mate_id.neq(Long.fromValue(0))) {
                    var color = scene_2.SceneTools.isEnemy(this.vo) ? 16711680 /* RED */ : 16777215 /* WHITE */;
                    this._headMgr.setPartnerName(this.vo.mate_name + "的伴侣", color);
                }
                else {
                    this._headMgr.removeParnerName();
                }
                if (this._headMgr) {
                    this._headMgr.setPartnerNameColor(16742400 /* ORANGE */);
                }
            };
            GPlayer.prototype.onMoveStart = function () {
                var self = this;
                var moveAct = self._actMgr.curAct;
                var mType = moveAct.moveType;
                // if (self.vo.ride && self.vo.ride_state == 1) {
                //     self.act = ActionName.RIDE;
                //     return;
                // }
                if (self.act != "run" /* RUN */ && (mType == 0 /* Normal */ || mType == 3 /* Find */)) {
                    self.act = "run" /* RUN */;
                    return;
                }
                if (mType == 1 /* Sprint */) {
                    self.act = "jmp" /* JUMP */ + 3;
                }
                else if (mType == 6 /* Jump */) {
                    self.jumpAction = self.jumpAction == 1 ? 2 : 1;
                    self.act = "jmp" /* JUMP */ + self.jumpAction;
                }
            };
            GPlayer.prototype.onReborn = function () {
                _super.prototype.onReborn.call(this);
                this.onPlayerUpdate();
                // this.onWeaponUpdate();
                // this.onWingUpdate();
                //this.onUpdateSoulWare();
                //this.onUpdateGory();
                //this.onYsUpdate()
            };
            GPlayer.prototype.onBodyUpdate = function () {
                var vo = this.vo;
                if (vo.fashion) {
                    var bodySrc = game.ResUtil.getModelName(vo.fashion, vo.sex);
                    this.setBody(bodySrc);
                }
            };
            GPlayer.prototype.onTitleUpdate = function () {
                var vo = this.vo;
                var cfg = game.getConfigById(vo.title_index);
                if (vo.title_index > 0 && cfg) {
                    var title = game.ResUtil.getTitleSrc(vo.title_index, vo.title_star);
                    this._headMgr.setTitle(title);
                }
                else {
                    this._headMgr.removeTitle();
                }
            };
            /**战盟信息/队伍*/
            GPlayer.prototype.onTeamNameUpdate = function () {
                var scene = this.parent;
                // if (this.vo.guild_team_id && this.vo.guild_team_name && this.vo.guild_team_name.trim() != "")
                // if (this.vo.guild_team_id && this.vo.guild_team_id.gt(0)) {
                //     // let color = SceneTools.isEnemy(this.vo, scene.sceneType) ? UIColor.RED : UIColor.WHITE;
                //     // this._headMgr.setRepuName(this.vo.guild_team_name, color);
                //     this._headMgr.setTeamName(this.vo.guild_team_name);
                // } else {
                //     this._headMgr.setTeamName("");
                // }
            };
            /** 设置巅峰对决棋子显示*/
            GPlayer.prototype.setFlagShow = function (src) {
                if (!this._headMgr)
                    return;
                this._headMgr.setFlagShow(src);
            };
            GPlayer.prototype.onRemoveFlag = function () {
                if (!this._headMgr)
                    return;
                this._headMgr.removeFlag();
            };
            GPlayer.prototype.onWeaponUpdate = function () {
                var vo = this.vo;
                var weaponIdx = vo.weapon;
                if (weaponIdx) {
                    var weaponSrc = game.ResUtil.getModelName(weaponIdx);
                    this.setWeapon(weaponSrc);
                }
                else {
                    this.setWeapon(null);
                }
            };
            /** 灵器*/
            // public onUpdateSoulWare() {
            //     let vo: GPlayerVo = <GPlayerVo>this.vo;
            //     let soulWare: number = vo.faqi;
            //     if (soulWare) {
            //         let scene = this.parent as Scene;
            //         let sw: SoulWare = scene.ctrl.getSoulWare(vo.entity_id);
            //         if (sw) {
            //             sw.vo.index = soulWare;
            //             sw.onIndexUpdate();
            //         } else {
            //             let sw = Pool.alloc(SoulWare);
            //             let swVo = new SoulWareVo(ObjectType.SoulWare);
            //             swVo.mainId = vo.entity_id;
            //             swVo.index = soulWare;
            //             swVo.x = vo.x;
            //             swVo.y = vo.y + 1;
            //             sw.vo = swVo;
            //             scene.addObj(sw);
            //         }
            //     }
            // }
            /** 御灵 */
            // public onUpdateGory() {
            //     let vo: GPlayerVo = <GPlayerVo>this.vo;
            //     let gory: number = vo.yuling;
            //     if (gory) {
            //         // 设置模型
            //         // let gorySrc: string = ResUtil.getSurfaceSrc(gory);
            //         // this.setGory(gorySrc);
            //
            //         // 设置实体
            //         let scene = this.parent as Scene;
            //         let g: Gory = scene.ctrl.getGory(vo.entity_id);
            //         if (g) {
            //             g.vo.index = gory;
            //         } else {
            //             let g = Pool.alloc(Gory);
            //             let gVo = new GoryVo(ObjectType.Gory);
            //             gVo.mainId = vo.entity_id;
            //             gVo.index = gory;
            //             gVo.x = vo.x;
            //             gVo.y = vo.y;
            //             g.vo = gVo;
            //             scene.addObj(g);
            //         }
            //     }
            // }
            GPlayer.prototype.onWingUpdate = function () {
                var vo = this.vo;
                if (vo.wing) {
                    var wingSrc = game.ResUtil.getModelName(vo.wing);
                    this.setWing(wingSrc);
                }
            };
            GPlayer.prototype.onRideInit = function () {
                if (this.vo.ride_state == 1 && this.vo.ride) {
                    var cfg = game.getConfigById(this.vo.ride);
                    var rideSrc = cfg.icon;
                    this.setHorse(rideSrc, cfg && cfg.is_double == 1);
                    this.setWeapon(null);
                }
                else {
                    this.setHorse(null);
                    this.onWeaponUpdate();
                }
            };
            GPlayer.prototype.onRideUpdate = function () {
                var self = this;
                var sceneCfg = SceneUtil.getCurSceneCfg();
                if (sceneCfg.riding_warfare) {
                    if (self.vo.ride_state == 1) {
                        self.rideStart();
                    }
                    else {
                        self.rideOff();
                        self.setHorse(null);
                    }
                }
                else {
                    self.setHorse(null);
                }
            };
            GPlayer.prototype.onHorseUpdate = function () {
                if (!this.vo || this.vo.ride_state != 1) {
                    return;
                }
                var cfg = game.getConfigById(this.vo.ride);
                var rideSrc = cfg.icon;
                this.setHorse(rideSrc, cfg && cfg.is_double == 1);
            };
            GPlayer.prototype.rideStart = function () {
                var self = this;
                var _scene = self.parent;
                var _ride = _scene.ctrl.getRide(this.vo.entity_id) == null ? Pool.alloc(scene_2.Ride) : _scene.ctrl.getRide(this.vo.entity_id);
                _ride.onStar(self.vo.entity_id, Handler.alloc(this, this.onRide), _scene);
            };
            GPlayer.prototype.rideOff = function () {
                var self = this;
                var _scene = self.parent;
                var _ride = _scene.ctrl.getRide(this.vo.entity_id) == null ? Pool.alloc(scene_2.Ride) : _scene.ctrl.getRide(this.vo.entity_id);
                _ride.onOff(self.vo.entity_id, Handler.alloc(this, this.onRide), _scene);
            };
            GPlayer.prototype.getRideObj = function () {
                var self = this;
                var scene = self.parent;
                var map = scene.ctrl.getObjMap();
                var list = Object.keys(map);
                for (var i = 0, len = list.length; i < len; i++) {
                    var obj = map[list[i]];
                    if (obj instanceof scene_2.Ride && obj.vo.buddy_type == 3 /* Ride */ && obj.vo.master_id.eq(self.vo.entity_id)) {
                        return obj;
                    }
                }
                return null;
            };
            GPlayer.prototype.onRide = function (ride, isStar) {
                var _scene = this.parent;
                if (_scene && _scene.ctrl) {
                    _scene.ctrl.removeRide(ride);
                }
                // if (isStar && this.avatar) {
                //     this._act = ActionName.STAND;
                //     this.avatar.setAct(ActionName.STAND);
                // }
                if (ride) {
                    ride.isPlayGhost = null;
                }
                this.onHorseUpdate();
                // ride.isShowAvatar(isStar)
            };
            GPlayer.prototype.changeHpShow = function () {
                if (this._headMgr && this.vo.percent != undefined) {
                    this._headMgr.setHp(this.vo.percent);
                }
            };
            GPlayer.prototype.onUpdateMaxHp = function () {
                if (this._headMgr && this.vo.max_hp != undefined) {
                    this._headMgr.setGridHp(this.vo.max_hp);
                }
            };
            GPlayer.prototype.onUpdateLevel = function () {
                // this.addBottomEft(UIEftSrc.LvBottomUp, 0, -120);
                // this.addEft(UIEftSrc.LvUp, 0, -150,2);//特效强制向右边展示
            };
            GPlayer.prototype.setHorse = function (id, isHorse2) {
                this.avatar.setPart(360 /* Horse */, id);
                if (isHorse2) {
                    this.avatar.setPart(9900 /* Horse2 */, id);
                }
                else {
                    this.avatar.setPart(9900 /* Horse2 */, null);
                }
            };
            GPlayer.prototype.setWeapon = function (id) {
                if (this.act.indexOf("die" /* DIE */) > -1 && id != null) {
                    return;
                }
                this.avatar.setPart(403 /* Weapon */, id);
            };
            GPlayer.prototype.setWing = function (id) {
                if (this.act.indexOf("die" /* DIE */) > -1 && id != null) {
                    return;
                }
                this.avatar.setPart(404 /* Wing */, id);
            };
            // public setGory(id: string): void {
            //     if (this.act.indexOf(ActionName.DIE) > -1 && id != null) {
            //         return;
            //     }
            //     this.avatar.setPart(SurfaceType.Gory, id);
            // }
            // public onYsUpdate(): void {
            //     let self = this;
            //     let vo: GPlayerVo = <GPlayerVo>this.vo;
            //     if (vo.yuanshen_idx) {
            //         //let src: string = ResUtil.getSurfaceSrc(vo.yuanshen_idx);
            //         //self.setAdventGod(src);
            //     } else {
            //         self.setAdventGod(null);
            //     }
            // }
            // public setAdventGod(id: string): void {
            //     if (this.act.indexOf(ActionName.DIE) > -1 && id != null) {
            //         return;
            //     }
            //     this.avatar.setPart(SurfaceType.AdventGod, id);
            // }
            // public movePath(path: Point[], onMoveEnd?: Handler, moveType?: number,moveTime?:number): void {
            //     // let swPath: Point[] = [];
            //     // for (let item of path) {
            //     //     let p = Pool.alloc(Point);
            //     //     swPath.push(p.setTo(item.x, item.y + 1));
            //     // }
            //     super.movePath(path, onMoveEnd, moveType);
            //     // let scene = this.parent as Scene;
            //     // if (!scene.ctrl) return;
            //     // let sw = scene.ctrl.getSoulWare(this.vo.entity_id);
            //     // if (!sw) return;
            //     // sw.vo.speed = this.vo.speed;
            //     // let handler: Handler;
            //     // if (moveType == MoveType.Sprint && this.vo && this.vo.ride_state == 1) {
            //     //     handler = Handler.alloc(this, () => {
            //     //         let _proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            //     //         _proxy.scene_ride_oper_c2s(0, this.vo.x, this.vo.y);
            //     //     })
            //     // }
            //     // sw.movePath(swPath, handler, moveType);
            // }
            GPlayer.prototype.onDie = function () {
                this._dying = true;
                this.setWeapon(null);
                this.setWing(null);
                //this.setGory(null);
                _super.prototype.onDie.call(this);
            };
            GPlayer.prototype.onRelease = function () {
                _super.prototype.onRelease.call(this);
            };
            GPlayer.prototype.dispose = function () {
                var _scene = this.parent;
                if (_scene && _scene.ctrl) {
                    _scene.ctrl.removeRide(this.vo.role_id.toString());
                }
                _super.prototype.dispose.call(this);
            };
            /***********************化神相关的***************************/
            GPlayer.prototype.onHuashenUpdate = function () {
                if (!this._avatarOrigScale) {
                    this._avatarOrigScale = this.avatar.dsp.scaleX;
                }
                if (this.vo.the_god) {
                    this.setBody(null);
                    this.setWing(null);
                    this.setWeapon(null);
                    this.setHorse(null);
                    var cfg = game.getConfigByNameId("huashen.json" /* Huashen */, this.vo.the_god);
                    var scale = (cfg.scene_scale || 10000) / 10000;
                    this.avatar.dsp.scaleX = scale;
                    this.avatar.dsp.scaleY = scale;
                    var src = cfg.icon;
                    this.setHuashen(src, !!cfg.is_double);
                }
                else {
                    this.avatar.dsp.scaleX = this._avatarOrigScale;
                    this.avatar.dsp.scaleY = this._avatarOrigScale;
                    this.setHuashen(null);
                    this.onBodyUpdate();
                    this.onWingUpdate();
                    this.onWeaponUpdate();
                    this.onHorseUpdate();
                }
            };
            //isHuashen2：化神武器
            GPlayer.prototype.setHuashen = function (id, isHuashen2) {
                this.avatar.setPart(409 /* Huashen */, id);
                if (isHuashen2) {
                    this.avatar.setPart(9902 /* Huashen2 */, id);
                }
                else {
                    this.avatar.setPart(9902 /* Huashen2 */, null);
                }
            };
            return GPlayer;
        }(scene_2.BaseActor));
        scene_2.GPlayer = GPlayer;
        __reflect(GPlayer.prototype, "game.scene.GPlayer");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_3) {
        //NPC
        var NPC = /** @class */ (function (_super) {
            __extends(NPC, _super);
            function NPC() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._tmpHp = {};
                return _this;
            }
            NPC.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                this.showModel();
            };
            NPC.prototype.showModel = function () {
                var vo = this.vo;
                var self = this;
                if (!vo.cfg)
                    return;
                if (vo.cfg.res_id) {
                    self.avatar.resType = 9901 /* Creature */;
                    self.setBody(vo.cfg.res_id);
                }
                else if (vo.cfg.outlook) { //todo
                    var type = vo.cfg.outlook[0][0];
                    self.avatar.resType = type == 405 /* Body */ ? null : type;
                    for (var i = 0, len = vo.cfg.outlook.length; i < len; i++) {
                        var info = vo.cfg.outlook[i];
                        //let src: string = ResUtil.getSrcByOutlook(info);
                        //self.avatar.setPart(i == 0 ? SurfaceType.Body : info[0], src);
                    }
                    if (DEBUG) {
                        if (vo.cfg.outlook[0][0] == 405 /* Body */ && vo.cfg.outlook[0][3] == null) {
                            console.error("NPC index\uFF1A" + vo.cfg.index + " \u6CA1\u6709\u914D\u6027\u522B");
                        }
                    }
                }
                // let title = vo.cfg.title ? ResUtil.getTitleSrcByRes(vo.cfg.title) : null;
                // self.headMgr.setTitle(title);
            };
            NPC.prototype.changeCampShow = function () {
                var self = this;
                var t = self._tmpHp;
                t.name = self.vo.name;
                //t.owner_name = self.vo.owner_name;
                t.camp = self.vo.camp;
                self.parent.dispatcher.dispatchEventWith("on_npc_camp" /* ON_NPC_CAMP */, false, t);
                //delete t.owner_name;
                delete t.camp;
                delete t.name;
            };
            NPC.prototype.updateVo = function () {
                _super.prototype.updateVo.call(this);
                var self = this;
                //self.clickArea.clickEnabled = self.vo && self.vo.type == ObjectType.COLLECT;
            };
            NPC.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
            };
            NPC.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                var self = this;
                self.showByDis();
            };
            NPC.prototype.showByDis = function () {
                var self = this;
                var scene = this.parent;
                if (scene == null)
                    return;
                var focusPt = scene.getFocusPt();
                var dis = game.PointUtil.distance(focusPt.x, focusPt.y, self.x, self.y);
                var isShowBody = self.avatar.dsp.parent != null;
                var range = 700;
                if (dis >= range && isShowBody) {
                    self.avatar.dsp.parent.removeChild(self.avatar.dsp);
                }
                else if (dis < range && !isShowBody) {
                    self.dsp.addChildAt(self.avatar.dsp, 1);
                }
            };
            Object.defineProperty(NPC.prototype, "dir", {
                get: function () {
                    return this._dir;
                },
                set: function (value) {
                    if (!value) {
                        return;
                    }
                    if (this.vo && this.vo.cfg.index) {
                    }
                    this._dir = value;
                    this.avatar.setDir(value);
                },
                enumerable: true,
                configurable: true
            });
            return NPC;
        }(scene_3.BaseActor));
        scene_3.NPC = NPC;
        __reflect(NPC.prototype, "game.scene.NPC");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_4) {
        var Point = egret.Point;
        var GDirUtil = game.utils.GDirUtil;
        var Pool = base.Pool;
        var MoveBaseAct = /** @class */ (function (_super) {
            __extends(MoveBaseAct, _super);
            function MoveBaseAct() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._lastMoveTimeLeft = 0;
                _this._keepRun = false;
                _this._isGhostShow = false;
                return _this;
            }
            Object.defineProperty(MoveBaseAct.prototype, "endTile", {
                get: function () {
                    return this._endTile;
                },
                enumerable: true,
                configurable: true
            });
            MoveBaseAct.prototype.setPath = function (path, onMoveEnd, moveType, _moveTime) {
                if (moveType === void 0) { moveType = 0 /* Normal */; }
                if (this._onMoveEnd) {
                    Pool.release(this._onMoveEnd);
                }
                this._onMoveEnd = onMoveEnd;
                this._path = path;
                this._moveType = moveType;
                this._endTile = path[path.length - 1];
                this._moveTime = _moveTime;
            };
            Object.defineProperty(MoveBaseAct.prototype, "path", {
                get: function () {
                    return this._path;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MoveBaseAct.prototype, "moveType", {
                get: function () {
                    return this._moveType;
                },
                set: function (value) {
                    this._moveType = value;
                },
                enumerable: true,
                configurable: true
            });
            MoveBaseAct.prototype.onStart = function () {
                var self = this;
                if (this._moveType == 2 /* Back */) {
                    self._actor.onBackStart();
                }
                // else if (this._moveType == MoveType.Push_Back) {
                //     super.onStart();
                //     let dst:Point = this._path[0];
                //     if(dst && this._moveTime){
                //
                //         let target = self._actor.dsp;
                //         let x = dst.x * MapData.ins.cellWidth;
                //         let y = dst.y * MapData.ins.cellHeight;
                //         self._actor.vo.x = dst.x;
                //         self._actor.vo.y = dst.y;
                //         Tween.get(target).to({x:x,y:y},this._moveTime).exec(Handler.alloc(this,function () {
                //             self.done();
                //             if(self._actor){
                //                 self._actor.setWorldPos(x,y);
                //             }
                //             Tween.remove(target);
                //         }));
                //     }
                //     else{
                //         console.error("dst = "+dst+","+"this._moveTime = "+this._moveTime);
                //     }
                //     return;
                // }
                else {
                    self._actor.onMoveStart();
                }
                if (!self._path) {
                    this.done();
                    return;
                }
                var pt = self._path.shift();
                if (DEBUG) {
                    if (gso.test_mask == "1") {
                        if (Math.abs(self._actor.vo.x - pt.x) > 2 || Math.abs(self._actor.vo.y - pt.y) > 2) {
                            console.error("移动坐标不一致！C Point：", self._actor.vo.x, self._actor.vo.y, "S Point" + pt, "id:" + self._actor.vo.entity_id, "type:" + self._actor.vo.type);
                        }
                    }
                }
                self._actor.setTilePos(pt.x, pt.y, false);
                Pool.release(pt);
                self._startPt = Pool.alloc(Point).setTo(self._actor.x, self._actor.y);
                self.shiftNext();
                _super.prototype.onStart.call(this);
            };
            MoveBaseAct.prototype.onDone = function () {
                _super.prototype.onDone.call(this);
                if (this._actor) {
                    this._actor.onMoveEnd();
                }
                if (this._onMoveEnd) {
                    this._onMoveEnd.exec();
                }
            };
            MoveBaseAct.prototype.abort = function (keepRun) {
                if (keepRun === void 0) { keepRun = false; }
                this._keepRun = keepRun;
                _super.prototype.abort.call(this);
            };
            MoveBaseAct.prototype.onAbort = function () {
                this._actor.onMoveEnd(this._keepRun);
                this._keepRun = false;
            };
            MoveBaseAct.prototype.advanceTime = function (elapseTime) {
                var self = this;
                if (self.isDone) {
                    return;
                }
                if (self.isAbort) {
                    return;
                }
                if (!self._startPt) {
                    return;
                }
                if (this._lastMoveTimeLeft > 0) {
                    this._curTime += this._lastMoveTimeLeft;
                    this._lastMoveTimeLeft = 0;
                }
                self._curTime += elapseTime;
                var p = self._curTime / self._totalTime;
                if (isNaN(p) || p >= 1) {
                    p = 1;
                    this._lastMoveTimeLeft = Math.max(0, self._curTime - self._totalTime);
                }
                self._curX = self._startPt.x + (self._stepPt.x - self._startPt.x) * p;
                self._curY = self._startPt.y + (self._stepPt.y - self._startPt.y) * p;
                if (isNaN(self._curX) || isNaN(self._curY)) {
                    this.abort();
                    return;
                }
                self._actor.setWorldPos(self._curX, self._curY);
                self._tmpTile = scene_4.MapData.ins.getCellPt(self._curX, self._curY, self._tmpTile);
                self.setTilePos();
                if (!self.isNextPt())
                    return;
                //检查互相为目标的情况
                if (self._actor instanceof scene_4.MainGPlayer && self._target) {
                    var dis = game.PointUtil.distance(self._actor.vo.x, self._actor.vo.y, self._target.x, self._target.y);
                    if (dis <= scene_4.MOVE_AMEND_DIS) {
                        var path = scene_4.Scene.findPath(self._actor.vo.x, self._actor.vo.y, self._target.x, self._target.y);
                        self._actor.onChangeMoveByPath(path, 0 /* Normal */);
                        this.done();
                        Pool.releaseList(path);
                    }
                }
                if (this._actor.vo.type == 1 /* PLAYER */ && this.moveType == 1 /* Sprint */) {
                    self._isGhostShow = !self._isGhostShow;
                    if (this._isGhostShow) {
                        var scene_5 = this._actor.parent;
                        scene_5.addGhost(this._actor);
                    }
                }
                // if (self._actor instanceof Ride && self._actor.isPlayGhost) {
                //     let scene: any = this._actor.parent;
                //     scene.addGhost(this._actor);
                // }
                if (p == 1) {
                    self.shiftNext();
                }
            };
            /** 设置世界坐标 */
            MoveBaseAct.prototype.setTilePos = function () {
                var self = this;
                var isTileChange = self._tmpTile.x >> 0 !== self._actor.vo.x >> 0 || self._tmpTile.y >> 0 !== self._actor.vo.y >> 0;
                if (isTileChange) {
                    self._actor.setTilePos(self._tmpTile.x, self._tmpTile.y, false);
                }
            };
            MoveBaseAct.prototype.isNextPt = function () {
                return true;
            };
            MoveBaseAct.prototype.shiftNext = function () {
                var self = this;
                if (self._nextPt) {
                    Pool.release(self._nextPt);
                    self._nextPt = null;
                }
                if (self._path && self._path.length > 0) {
                    if (self._stepPt) {
                        self._startPt.setTo(self._stepPt.x, self._stepPt.y);
                    }
                    self._nextPt = self._path.shift();
                    self._stepPt = scene_4.MapData.ins.getWorldPt(self._nextPt.x, self._nextPt.y, self._stepPt);
                    if (this._moveType == 2 /* Back */) {
                        // self._actor.dir = GDirUtil.calcDirection(self._stepPt, self._startPt);
                    }
                    else {
                        self._actor.dir = GDirUtil.calcDirection(self._startPt, self._stepPt);
                    }
                    this.updateDur(self._startPt, self._stepPt);
                }
                else {
                    self.done();
                }
            };
            MoveBaseAct.prototype.onSpeedUpdate = function () {
                if (!this._startPt) {
                    return;
                }
                this._startPt.setTo(this._actor.x, this._actor.y);
                this.updateDur(this._startPt, this._stepPt);
            };
            MoveBaseAct.prototype.updateDur = function (startPt, endPt) {
                var self = this;
                if (startPt.equals(endPt)) {
                    self.shiftNext();
                    return;
                }
                self._curTime = 0;
                var dis = game.PointUtil.distancePt(startPt, endPt);
                var speed = self._actor.getMoveSpeed(self._moveType);
                self._totalTime = dis / speed;
                if (!self._totalTime) {
                    console.debug("计算移动总时间错误！", startPt.toString(), endPt.toString(), this._moveType, this._actor.vo.speed);
                }
            };
            MoveBaseAct.prototype.onRelease = function () {
                var self = this;
                Pool.release(self._nextPt);
                self._nextPt = null;
                self._moveType = null;
                Pool.release(self._onMoveEnd);
                self._onMoveEnd = null;
                Pool.release(self._startPt);
                self._startPt = null;
                Pool.release(self._stepPt);
                self._stepPt = null;
                Pool.release(self._tmpTile);
                self._tmpTile = null;
                Pool.releaseList(self._path);
                self._path = null;
                self._endTile = null;
                self._keepRun = false;
                self._isGhostShow = null;
                _super.prototype.onRelease.call(this);
            };
            return MoveBaseAct;
        }(scene_4.BaseAct));
        scene_4.MoveBaseAct = MoveBaseAct;
        __reflect(MoveBaseAct.prototype, "game.scene.MoveBaseAct");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene_6) {
            var Tween = base.Tween;
            var Handler = base.Handler;
            var GPlayer = game.scene.GPlayer;
            var RoleGhostShadow = /** @class */ (function (_super) {
                __extends(RoleGhostShadow, _super);
                function RoleGhostShadow() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RoleGhostShadow.prototype.onRelease = function () {
                    Tween.remove(this);
                    this.idx = null;
                    this.realObj = null;
                    _super.prototype.onRelease.call(this);
                };
                RoleGhostShadow.prototype.initUpdateCb = function () {
                };
                RoleGhostShadow.prototype.onAdded = function () {
                    _super.prototype.onAdded.call(this);
                    this.alpha = 1;
                    this.dir = this.realObj.dir;
                    this.act = this.realObj.act;
                    this.realObj.setFixFrame(this.realObj.fixFrame);
                    Tween.get(this).to({ alpha: 0 }, 500).exec(Handler.alloc(this, this.tweenFinish));
                    if (this.headMgr) {
                        this.headMgr.dispose();
                    }
                    this.actMgr.dispose();
                };
                RoleGhostShadow.prototype.tweenFinish = function () {
                    var scene = this.parent;
                    if (scene) {
                        scene.ctrl.removeGhost(this);
                    }
                };
                RoleGhostShadow.prototype.movePath = function (path, onMoveEnd, moveType, moveTime) {
                    //残影不移动
                };
                RoleGhostShadow.prototype.onNameChanged = function () {
                };
                return RoleGhostShadow;
            }(GPlayer));
            scene_6.RoleGhostShadow = RoleGhostShadow;
            __reflect(RoleGhostShadow.prototype, "game.mod.scene.RoleGhostShadow");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene_7) {
            var Tween = base.Tween;
            var Handler = base.Handler;
            var BaseActor = game.scene.BaseActor;
            var GhostShadow = /** @class */ (function (_super) {
                __extends(GhostShadow, _super);
                function GhostShadow() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GhostShadow.prototype.onRelease = function () {
                    Tween.remove(this);
                    this.idx = null;
                    this.realObj = null;
                    _super.prototype.onRelease.call(this);
                };
                GhostShadow.prototype.initUpdateCb = function () {
                };
                GhostShadow.prototype.onAdded = function () {
                    _super.prototype.onAdded.call(this);
                    this.alpha = 1;
                    this.dir = this.realObj.dir;
                    this.act = this.realObj.act;
                    this.realObj.setFixFrame(this.realObj.fixFrame);
                    Tween.get(this).to({ alpha: 0 }, 300).exec(Handler.alloc(this, this.tweenFinish));
                    if (this.headMgr) {
                        this.headMgr.dispose();
                    }
                    this.actMgr.dispose();
                };
                GhostShadow.prototype.tweenFinish = function () {
                    var scene = this.parent;
                    if (scene) {
                        scene.ctrl.removeGhost(this);
                    }
                };
                GhostShadow.prototype.movePath = function (path, onMoveEnd, moveType, moveTime) {
                    //残影不移动
                };
                GhostShadow.prototype.onNameChanged = function () {
                };
                return GhostShadow;
            }(BaseActor));
            scene_7.GhostShadow = GhostShadow;
            __reflect(GhostShadow.prototype, "game.mod.scene.GhostShadow");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var PetVo = /** @class */ (function (_super) {
            __extends(PetVo, _super);
            function PetVo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            PetVo.prototype.applyUpdate = function (data) {
                var s2c = data;
                var keys = [
                    "index",
                    "buddy_type",
                    "weapon",
                    "ride",
                    "circle",
                    "title",
                    "master_id",
                    "walk_entity_info",
                    "master_name",
                    "evolve"
                ];
                var res = _super.prototype.applyUpdate.call(this, s2c.walk_entity_info);
                for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
                    var k = keys_5[_i];
                    if (!data.hasOwnProperty(k)) {
                        continue;
                    }
                    if (k === "walk_entity_info") {
                        continue;
                    }
                    res.push(k);
                    this[k] = s2c[k];
                }
                return res;
            };
            return PetVo;
        }(scene.ActorVo));
        scene.PetVo = PetVo;
        __reflect(PetVo.prototype, "game.scene.PetVo");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var TeamPlayer = /** @class */ (function (_super) {
            __extends(TeamPlayer, _super);
            function TeamPlayer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TeamPlayer.prototype.onStartSprint = function (sx, sy, ex, ey) {
                this.act = "jmp" /* JUMP */ + 3;
            };
            TeamPlayer.prototype.onHpChanged = function () {
                //机器人不显示血条
            };
            TeamPlayer.prototype.updateAvatarClose = function () {
            };
            TeamPlayer.prototype.onCreditLvUpdate = function () {
            };
            return TeamPlayer;
        }(scene.GPlayer));
        scene.TeamPlayer = TeamPlayer;
        __reflect(TeamPlayer.prototype, "game.scene.TeamPlayer");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var TriggerVo = /** @class */ (function (_super) {
            __extends(TriggerVo, _super);
            function TriggerVo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TriggerVo.prototype.applyUpdate = function (data) {
                var msg = data;
                if (msg.trigger_type) {
                    this.triggerType = msg.trigger_type;
                }
                return _super.prototype.applyUpdate.call(this, data);
            };
            return TriggerVo;
        }(scene.NPCVo));
        scene.TriggerVo = TriggerVo;
        __reflect(TriggerVo.prototype, "game.scene.TriggerVo");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_8) {
        var Trigger = /** @class */ (function (_super) {
            __extends(Trigger, _super);
            function Trigger() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._lastTriggerTime = 0;
                _this._triggerState = false;
                return _this;
            }
            Trigger.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                this.avatar.resType = 9901 /* Creature */; // 触发点外形 todo
            };
            Trigger.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                var self = this;
                self._lastTriggerTime += elapseTime;
                if (self._lastTriggerTime > 100) {
                    self._lastTriggerTime = 0;
                    self.updateTrigger();
                }
            };
            /**
             *设置判断对象
             * @param obj
             */
            Trigger.prototype.setJudgeObj = function (obj) {
                this._triggerObj = obj;
            };
            Trigger.prototype.onRelease = function () {
                this._triggerObj = null;
                _super.prototype.onRelease.call(this);
            };
            Trigger.prototype.updateTrigger = function () {
                var self = this;
                if (!self._triggerObj) {
                    return;
                }
                var dic = game.PointUtil.distance(self.x, self.y, self._triggerObj.x, self._triggerObj.y);
                // console.log("距离传送点" + dic);
                //let isShowWalkTo:boolean = ViewMgr.getIns().isShow(ModName.Result, ResultViewType.BeWalkingToTarget);
                var isShowWalkTo = false;
                // console.info("......updateTrigger......" + self._triggerState + " ...isShowWalkTo "+isShowWalkTo + "...dic... " + dic);
                // if ((dic <= 128 && !self._triggerState && isShowWalkTo) || (dic == 0 && self._triggerState && isShowWalkTo)) {
                //     self._triggerState = true;
                //     facade.sendNt(SceneEvent.ON_TRIGGER_IN, self.vo);
                // } else if (dic > 128 && self._triggerState) {
                //     self._triggerState = false;
                //     facade.sendNt(SceneEvent.ON_TRIGGER_OUR, self.vo);
                // }
            };
            Trigger.prototype.showByDis = function () {
                var self = this;
                var scene = this.parent;
                if (scene == null)
                    return;
                var focusPt = scene.getFocusPt();
                var dis = game.PointUtil.distance(focusPt.x, focusPt.y, self.x, self.y);
                var isShowBody = self.avatar.dsp.parent != null && self.avatar.dsp.visible;
                // let isOpen = false;
                // let range = 700;
                // //let isShowWalkTo:boolean = ViewMgr.getIns().isShow(ModName.Result, ResultViewType.BeWalkingToTarget);
                // let isShowWalkTo:boolean = false;
                // if ((dis >= range || !isOpen) && isShowBody) {
                //     // console.debug("触发点清除")
                //     self.avatar.dsp.parent.removeChild(self.avatar.dsp);
                // } else if (dis < range && !isShowBody && isOpen && isShowWalkTo) {
                //     // console.debug("触发点显示")
                //     if (!self.avatar.dsp.parent) {
                //         console.debug("触发点应该显示没显示")
                //     }
                //     // self.dsp.addChildAt(self.avatar.dsp, 1);
                //     self.avatar.dsp.visible = true;
                // }
            };
            return Trigger;
        }(scene_8.NPC));
        scene_8.Trigger = Trigger;
        __reflect(Trigger.prototype, "game.scene.Trigger");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var CollectVo = /** @class */ (function (_super) {
            __extends(CollectVo, _super);
            function CollectVo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CollectVo;
        }(scene.MonsterVo));
        scene.CollectVo = CollectVo;
        __reflect(CollectVo.prototype, "game.scene.CollectVo");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var CollectItem = /** @class */ (function (_super) {
            __extends(CollectItem, _super);
            function CollectItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CollectItem.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                this.updateIndex();
            };
            CollectItem.prototype.updateIndex = function () {
                var self = this;
                var vo = self.vo;
                if (vo.cfg && vo.cfg.res_id) {
                    self.dir = 4 /* RIGHT_DOWN */;
                    self.act = "std" /* STAND */;
                    self.setBody(vo.cfg.res_id);
                }
                self.updateClickArea();
                //self.clickArea.clickEnabled = true;
                self._addEft();
            };
            CollectItem.prototype.onNameChanged = function () {
                // super.onNameChanged();
            };
            CollectItem.prototype.updateClickArea = function () {
                var self = this;
                // if (!self.clickArea) {
                //     return;
                // }
                var vo = self.vo;
                if (!vo || !vo.cfg) {
                    //super.updateClickArea();
                    return;
                }
                var res_id = vo.cfg.res_id;
                if (!res_id) {
                    return;
                }
                // let big_click_srcs: string[] = ["cjw_11", "cjw_12", "cjw_16", "cjw_17", "cjw_18", "cjw_19", "cjw_20", "cjw_21", "cjw_22", "cjw_23", "cjw_24"];
                // let isSpClick: boolean = big_click_srcs.indexOf(res_id) > -1;
                // let clickHeight: number = self.clickArea.height = (isSpClick ? 160 : 100)*gso.avatarScale; // self.getBodyHeight();
                //let clickWidth: number = isSpClick ? 160 : self.clickArea.width;
                // let offsetY: number = -clickHeight * 0.5;
                // self.clickArea.y = offsetY;
                // self.clickArea.width = clickWidth;
                // self.clickArea.x = -clickWidth * 0.5;
            };
            CollectItem.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                this.avatar.resType = 9901 /* Creature */;
            };
            CollectItem.prototype._addEft = function () {
                var vo = this.vo;
                var cfg = vo.cfg;
                if (!cfg) {
                    return;
                }
                // let eftId: string = cfg.effect;
                // if (eftId && eftId.trim() !== "") {
                //     this.addEft(eftId, 0, 0, Direction.RIGHT_DOWN, 1, null, true);
                // }
            };
            return CollectItem;
        }(scene.BaseActor));
        scene.CollectItem = CollectItem;
        __reflect(CollectItem.prototype, "game.scene.CollectItem");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var TextField = egret.TextField;
        var Point = egret.Point;
        var Pool = base.Pool;
        var Event = egret.Event;
        var Handler = base.Handler;
        var Sprite = egret.Sprite;
        var facade = base.facade;
        var Image = eui.Image;
        var Rectangle = egret.Rectangle;
        //掉落
        var DropItem = /** @class */ (function (_super) {
            __extends(DropItem, _super);
            function DropItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DropItem.prototype, "vo", {
                get: function () {
                    return this._vo;
                },
                set: function (v) {
                    this._vo = v;
                },
                enumerable: true,
                configurable: true
            });
            DropItem.prototype.initDsp = function () {
                _super.prototype.initDsp.call(this);
                var self = this;
                self.nameTf = new TextField();
                self.nameTf.size = 20;
                self.nameTf.textColor = 0x00ff00;
                self.nameTf.stroke = 1;
                self.iconBmp = Pool.alloc(game.BitmapBase);
                self.iconBmp.scaleX = self.iconBmp.scaleY = 0.8;
                // self.iconBmp.addEventListener(Event.COMPLETE, self.onIconLoaded, self);
                self.dsp.addChild(self.iconBmp);
                self.iconBmpBg = Pool.alloc(Image);
                self._eftBmp = Pool.alloc(game.BitmapBase);
                var sp = new Sprite();
                sp.addChild(self._eftBmp);
                sp.y = -90;
                sp.x = 0;
                self.dsp.addChild(sp);
                self.dsp.addChild(self.iconBmpBg);
                self.dsp.addChild(self.nameTf);
            };
            DropItem.prototype.onAdded = function () {
                var self = this;
                this.updateIndex();
                self._curTime = 0;
                self._waitTime = 0;
                self._yIdx = 0;
                self._isDrawing = false;
                if (!self.vo.src_coord) {
                    console.error("添加掉落物坐标错误!", self.vo.entity_id.toString());
                    return;
                }
                if (!self.vo.dest_coord) {
                    self.vo.dest_coord = Pool.alloc(Point);
                    self.vo.dest_coord.x = self.vo.src_coord.x + (Math.floor(Math.random() * 5 * (Math.random() > 0.5 ? -1 : 1)));
                    self.vo.dest_coord.y = self.vo.src_coord.y + (Math.floor(Math.random() * 5 * (Math.random() > 0.5 ? -1 : 1)));
                }
                self.vo.x = self.vo.src_coord.x;
                self.vo.y = self.vo.src_coord.y;
                var pt = scene.MapData.ins.getWorldPt(self.vo.x, self.vo.y);
                self.x = pt.x;
                self.y = pt.y;
                self._startPt = Pool.alloc(Point).setTo(self.x, self.y);
                self._endPt = scene.MapData.ins.getWorldPt(self.vo.dest_coord.x, self.vo.dest_coord.y, self._endPt);
                Pool.release(pt);
                var dis = game.PointUtil.distancePt(self._startPt, self._endPt);
                self._totalTime = (dis / self.getShowSpeed()) * 3;
            };
            DropItem.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                this._ctrl.advanceTime(elapseTime);
                var self = this;
                if (!self._startPt) {
                    return;
                }
                if (!self.vo.readyDraw) {
                    self.playDrop(elapseTime);
                    return;
                }
                if (self._isDrawing) {
                    this.playDraw(elapseTime);
                }
            };
            DropItem.prototype.drawTo = function (x, y) {
                var self = this;
                self._curTime = 0;
                self.x = self._endPt.x;
                self.y = self._endPt.y;
                self._startPt.setTo(self.x, self.y);
                self._endPt.setTo(x, y);
                var dis = game.PointUtil.distancePt(self._startPt, self._endPt);
                self._totalTime = dis / self.getShowSpeed();
                self._isDrawing = true;
            };
            DropItem.prototype.playDraw = function (elapseTime) {
                var self = this;
                self._curTime += elapseTime;
                var p = self._totalTime == 0 ? 1 : self._curTime / self._totalTime;
                if (p >= 1) {
                    this._isDrawing = false;
                    this.checkDel();
                    return;
                }
                self.x = self._startPt.x + (self._endPt.x - self._startPt.x) * p;
                self.y = self._startPt.y + (self._endPt.y - self._startPt.y) * p;
            };
            DropItem.prototype.playDrop = function (elapseTime) {
                var self = this;
                self._curTime += elapseTime;
                var p = self._totalTime == 0 ? 1 : self._curTime / self._totalTime;
                if (p >= 1) {
                    self._tmpTile = scene.MapData.ins.getCellPt(self._endPt.x, self._endPt.y, self._tmpTile);
                    self.setTilePos(self._tmpTile.x, self._tmpTile.y, false);
                    self._waitTime += elapseTime;
                    if (self._waitTime >= 1800) {
                        // 挂机场景
                        var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                        // if (s_proxy.curSceneType == SceneType.HangUp && ViewMgr.getIns().isMain()) {
                        //     self.showMonsterSoul();
                        //     facade.sendNt(MainEvent.UPDATE_MAIN_LAYER);
                        //     return;
                        // }
                        self.vo.readyDraw = true;
                        var main = self.parent.ctrl.getObj(self.vo.owner_entity_id);
                        if (main)
                            self.drawTo(main.x, main.y - 50);
                    }
                    // self.iconBmp.rotation = 0;
                }
                else {
                    self.x = self._startPt.x + (self._endPt.x - self._startPt.x) * p;
                    var value = -1000 * p * (1 - p); //最高是0.25
                    self.y = self._startPt.y + (self._endPt.y - self._startPt.y) * p + value;
                    // self.iconBmp.rotation = 360 * p;
                }
            };
            DropItem.prototype.checkDel = function () {
                if (!this._isDrawing && this.parent) {
                    var s_proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                    s_proxy.delVo(this.vo.entity_id);
                    this.dispose();
                }
            };
            DropItem.prototype.updateIndex = function () {
                var vo = this.vo;
                if (vo.cfg) {
                    var propData = game.PropData.create(vo.index);
                    var name = propData.cfg.name;
                    this.nameTf.text = name;
                    var quality = propData.quality;
                    this.nameTf.textColor = game.ColorUtil.getColorByQuality2(quality);
                    this.nameTf.x = -this.nameTf.textWidth / 2;
                    this.iconBmp.addEventListener(Event.COMPLETE, this.onIconLoaded, this);
                    this.iconBmpBg.addEventListener(Event.COMPLETE, this.onIconLoaded, this);
                    this.iconBmp.source = game.ResUtil.getUiProp(vo.cfg);
                    this.iconBmpBg.source = "drop_di" + quality;
                    this.iconBmpBg.scale9Grid = new Rectangle(28, 12, 27, 1);
                    this.iconBmpBg.width = this.nameTf.textWidth + 20;
                    this.iconBmpBg.height = 30;
                    //掉落物特效
                    // if (vo.cfg.quality >= QualityType.ORANGE) {
                    //     let q = Math.min(quality, QualityType.RED);
                    //     let src = ResUtil.getEffectUI("drop_" + q);
                    //     this.setEft(src);
                    // }
                }
            };
            DropItem.prototype.getShowSpeed = function () {
                return scene.MapData.ins.cellWidth / 30;
            };
            DropItem.prototype.onIconLoaded = function (e) {
                var self = this;
                if (e.currentTarget == self.iconBmpBg) {
                    self.iconBmpBg.removeEventListener(Event.COMPLETE, self.onIconLoaded, self);
                }
                else {
                    self.iconBmp.removeEventListener(Event.COMPLETE, self.onIconLoaded, self);
                }
                self.iconBmp.anchorOffsetX = self.iconBmp.width / 2;
                self.iconBmp.anchorOffsetY = self.iconBmp.height / 2;
                // self.iconBmp.rotation = 0;
                // self.iconBmp.x = -(self.iconBmp.width * self.iconBmp.scaleX) / 2;
                // self.iconBmp.y = -(self.iconBmp.height * self.iconBmp.scaleY) / 2;
                self.nameTf.y = -(self.iconBmp.height * self.iconBmp.scaleY / 2 + self.nameTf.height);
                self.iconBmpBg.x = -self.iconBmpBg.width / 2;
                self.iconBmpBg.y = self.nameTf.y - (self.iconBmpBg.height - self.nameTf.height) / 2;
            };
            // public setEft(src: string): void {
            //     let self = this;
            //     if (self._src == src) {
            //         return;
            //     }
            //     self.removeCurrent();
            //     self._src = src;
            //     LoadMgr.ins.addRef(src);
            //     LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onEftLoaded), LoadPri.Scene, 6);
            // }
            DropItem.prototype.onEftLoaded = function (data, url) {
                if (this._src != url) {
                    return;
                }
                var self = this;
                self._data = data;
                var durList = [];
                for (var i = 0, n = data.numFrames; i < n; i++) {
                    durList.push(data.getVal(i, "dur"));
                }
                self._ctrl.init(durList, url);
                self._ctrl.loop = true;
                this._ctrl.play();
                this._eftBmp.y = -168;
                self.onFrameChange(0);
            };
            DropItem.prototype.removeCurrent = function () {
                var self = this;
                self._data = undefined;
                game.LoadMgr.ins.decRef(self._src);
                self._src = undefined;
                if (self._ctrl) {
                    self._ctrl.stop();
                }
                self._eftBmp.texture = null;
            };
            DropItem.prototype.onFrameChange = function (frame) {
                this._data.drawTo(this._eftBmp, frame);
            };
            DropItem.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                var self = this;
                self._ctrl = Pool.alloc(game.AnimCtrl);
                self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChange);
            };
            DropItem.prototype.onRelease = function () {
                var self = this;
                self.removeCurrent();
                Pool.release(self._ctrl);
                self._ctrl = undefined;
                self.iconBmp.source = null;
                Pool.release(self._startPt);
                self.nameTf.text = null;
                self._startPt = null;
                Pool.release(self._endPt);
                self._endPt = null;
                Pool.release(self._tmpTile);
                self._tmpTile = null;
                self._isDrawing = false;
                if (self.vo) {
                    facade.sendNt("on_display_del" /* ON_OBJ_DEL */, self.vo);
                }
                _super.prototype.onRelease.call(this);
            };
            /** 经验飘往经验池 */
            DropItem.prototype.showMonsterSoul = function () {
                var self = this;
                self._isDrawing = false;
                self.checkDel();
            };
            return DropItem;
        }(scene.BaseSceneObj));
        scene.DropItem = DropItem;
        __reflect(DropItem.prototype, "game.scene.DropItem");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var DropItemVo = /** @class */ (function (_super) {
            __extends(DropItemVo, _super);
            function DropItemVo() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.readyDraw = false;
                return _this;
            }
            Object.defineProperty(DropItemVo.prototype, "cfg", {
                get: function () {
                    if (!this._cfg || (this.index && this._cfg && this.index.toNumber() != this._cfg.index)) {
                        this._cfg = game.getConfigById(this.index.toNumber());
                    }
                    return this._cfg;
                },
                enumerable: true,
                configurable: true
            });
            DropItemVo.prototype.applyUpdate = function (data) {
                var s2c = data;
                var keys = [
                    "index",
                    "entity_id",
                    "prop_cnt",
                    "src_coord",
                    "dest_coord",
                    "owner_entity_id",
                ];
                var res = [];
                for (var _i = 0, keys_6 = keys; _i < keys_6.length; _i++) {
                    var k = keys_6[_i];
                    if (!data.hasOwnProperty(k)) {
                        continue;
                    }
                    if (k === "entity_id" && this.entity_id && this.entity_id.eq(s2c.entity_id)) {
                        continue;
                    }
                    res.push(k);
                    this[k] = s2c[k];
                }
                return res;
            };
            return DropItemVo;
        }(scene.SceneObjVo));
        scene.DropItemVo = DropItemVo;
        __reflect(DropItemVo.prototype, "game.scene.DropItemVo");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var General = /** @class */ (function (_super) {
            __extends(General, _super);
            function General() {
                var _this = _super.call(this) || this;
                _this._enType = 4 /* PET */;
                return _this;
            }
            Object.defineProperty(General.prototype, "vo", {
                get: function () {
                    return this._vo;
                },
                set: function (value) {
                    this._vo = value;
                },
                enumerable: true,
                configurable: true
            });
            General.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                this.avatar.resType = 400 /* Shenling */;
            };
            General.prototype.onDie = function () {
                _super.prototype.onDie.call(this);
            };
            Object.defineProperty(General.prototype, "act", {
                get: function () {
                    return this._act;
                },
                set: function (value) {
                    var self = this;
                    if (!value) {
                        return;
                    }
                    self._act = value;
                    self.avatar.setAct(value);
                },
                enumerable: true,
                configurable: true
            });
            General.prototype.getBodyHeight = function () {
                return 150 * gso.avatarScale;
            };
            General.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                this.updateEvolve();
            };
            General.prototype.initUpdateCb = function () {
                _super.prototype.initUpdateCb.call(this);
                this.regUpdateCb('evolve', this.updateEvolve);
            };
            General.prototype.onNameChanged = function () {
                // let self = this;
                // if (!self._headMgr) return;
                // if (self.vo.name) {
                //     let color = ColorUtil.getColorByQuality(this.getQuality());
                //     self._headMgr.setName(self.vo.name, color);
                // }
            };
            //神灵进化次数更新
            General.prototype.updateEvolve = function () {
                var self = this;
                var index = self.vo.index;
                var cfg = game.getConfigById(index);
                var head = game.PropData.getPropParse(index, 1 /* Type */);
                var evolve = self.vo.evolve; //进化次数 或者 女仆中的幻化等级
                if (head == 400 /* Shenling */ && evolve) {
                    var name = cfg.name;
                    if (cfg.names) {
                        var names = cfg.names.split(',');
                        var evolveIdx = Math.max(0, evolve - 1);
                        name = names[evolveIdx];
                    }
                    self.vo.name = name;
                    this.onNameChanged();
                    this.updateIndex();
                }
            };
            //获取品质
            General.prototype.getQuality = function () {
                var index = this.vo.index;
                var cfg = game.getConfigById(index);
                var head = game.PropData.getPropParse(index, 1 /* Type */);
                var evolve = this.vo.evolve || 0; //进化次数 或者 女仆中的幻化等级
                if (head == 400 /* Shenling */ && evolve) {
                    //可进化神灵的品质
                    if (cfg.character) {
                        var initQuality = cfg.character[0];
                        var speQuality = initQuality + Math.max(0, evolve - 1); //特殊品质，黄玄地天
                        return game.SpecialQuality[speQuality];
                    }
                }
                return cfg && cfg.quality || 0;
            };
            return General;
        }(scene.Partner));
        scene.General = General;
        __reflect(General.prototype, "game.scene.General");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var GPlayerVo = /** @class */ (function (_super) {
            __extends(GPlayerVo, _super);
            function GPlayerVo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(GPlayerVo.prototype, "isDizzy", {
                //眩晕
                get: function () {
                    return this.isBuffExist(13008002 /* Dizzy */);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GPlayerVo.prototype, "isTie", {
                get: function () {
                    return this.isBuffExist(13001002 /* Tie */);
                },
                enumerable: true,
                configurable: true
            });
            GPlayerVo.prototype.isBuffExist = function (idx) {
                if (!this.buffs) {
                    return false;
                }
                for (var _i = 0, _a = this.buffs; _i < _a.length; _i++) {
                    var b = _a[_i];
                    if (b.buff_index == idx) {
                        return true;
                    }
                }
                return false;
            };
            GPlayerVo.prototype.applyUpdate = function (data) {
                var s2c = data;
                var keys = [
                    "role_id",
                    "sex",
                    "level",
                    "guild_id",
                    "guild_name",
                    "weapon",
                    "wing",
                    "ride",
                    "speed",
                    "fashion",
                    "title_index",
                    "title_star",
                    "head",
                    "head_frame",
                    "mate_id",
                    "mate_name",
                    "walk_entity_info",
                    "server_id",
                    "skills",
                    "ride_state",
                    "vip_lv",
                    "the_god",
                    "team_id"
                ];
                var res = s2c.walk_entity_info ? _super.prototype.applyUpdate.call(this, s2c.walk_entity_info) : [];
                var longKeys = ["title_index" /* title_index */, "head" /* head */, "head_frame" /* head_frame */]; //属性类型变成Long
                for (var _i = 0, keys_7 = keys; _i < keys_7.length; _i++) {
                    var k = keys_7[_i];
                    if (!data.hasOwnProperty(k)) {
                        continue;
                    }
                    if (k === "role_id" && this.role_id && this.role_id.eq(s2c.role_id)) {
                        continue;
                    }
                    if (k === "walk_entity_info") {
                        continue;
                    }
                    var v = s2c[k];
                    if (k == "skills") {
                        this.skillsMap = {};
                        var skills = s2c[k];
                        if (skills instanceof Array) {
                            for (var i = 0; i < skills.length; i++) {
                                var d = skills[i];
                                this.skillsMap[d.skill_idx] = d;
                            }
                        }
                        //按照技能优先顺序排序
                        if (v instanceof Array && v) {
                            var len = v.length;
                            for (var i = 0; i < len - 1; i++) /* 外循环为排序趟数，len个数进行len-1趟 */
                                for (var j = 0; j < len - 1 - i; j++) { /* 内循环为每趟比较的次数，第i趟比较len-i次 */
                                    var skill1 = v[j];
                                    var skill2 = v[j + 1];
                                    var priority1 = game.SkillData.getSkillPriority(skill1.skill_idx);
                                    var priority2 = game.SkillData.getSkillPriority(skill2.skill_idx);
                                    if (priority1 > priority2) { /* 相邻元素比较，若逆序则交换（升序为左大于右，降序反之） */
                                        var temp = v[j];
                                        v[j] = v[j + 1];
                                        v[j + 1] = temp;
                                    }
                                }
                        }
                    }
                    res.push(k);
                    if (game.RoleLongKeys.indexOf(k) > -1) {
                        v = v.toNumber();
                    }
                    this[k] = v;
                }
                return res;
            };
            return GPlayerVo;
        }(scene.ActorVo));
        scene.GPlayerVo = GPlayerVo;
        __reflect(GPlayerVo.prototype, "game.scene.GPlayerVo");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_9) {
        var Pool = base.Pool;
        var TimeMgr = base.TimeMgr;
        var Tween = base.Tween;
        var Handler = base.Handler;
        //怪物
        var Monster = /** @class */ (function (_super) {
            __extends(Monster, _super);
            function Monster() {
                var _this = _super.call(this) || this;
                _this._dyingTime = 0;
                _this._enType = 3 /* MONSTER */;
                return _this;
            }
            Object.defineProperty(Monster.prototype, "vo", {
                get: function () {
                    return this._vo;
                },
                set: function (value) {
                    this._vo = value;
                },
                enumerable: true,
                configurable: true
            });
            Monster.prototype.updateVo = function () {
                _super.prototype.updateVo.call(this);
                var self = this;
                self.showModel();
                if (self.vo && self.vo.monsterType == 2 /* Boss */) {
                    self.changeHpShow();
                    self.setBossLz();
                }
                self.dsp.alpha = 0;
                this.vo.isReady = true;
                Tween.get(self).to({ alpha: 1 }, 300);
            };
            Monster.prototype.showModel = function () {
                var vo = this.vo;
                var self = this;
                if (!vo.cfg)
                    return;
                if (vo.cfg.res_id) {
                    self.avatar.resType = 9901 /* Creature */;
                    self.setBody(vo.cfg.res_id);
                }
            };
            Monster.prototype.onNameChanged = function () {
                //Monster需要打了才显示名字
                var scene = this.parent;
                if (this.vo.monsterType == 2 /* Boss */)
                    return;
            };
            Monster.prototype.isBoss = function () {
                return this.vo.monsterType == 2 /* Boss */;
            };
            Monster.prototype.setBossLz = function () {
            };
            Monster.prototype.onBackStart = function () {
                _super.prototype.onBackStart.call(this);
                //怪物没有受击动作
            };
            Monster.prototype.onBuffsUpdate = function () {
                // super.onBuffsUpdate();
            };
            Monster.prototype.attack = function (idx, actIdx, dir, list, focusPt) {
                if (actIdx === void 0) { actIdx = [1]; }
                _super.prototype.attack.call(this, idx, actIdx, dir, list, focusPt);
            };
            Monster.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                this.avatar.resType = 9901 /* Creature */;
            };
            Monster.prototype.onHitStart = function () {
                if (this.vo.monsterType == 2 /* Boss */) {
                    return;
                }
                _super.prototype.onHitStart.call(this, false); //怪物暂时没有受击动作 todo
            };
            Monster.prototype.hit = function (dir) {
                _super.prototype.hit.call(this, dir);
            };
            Monster.prototype.onMoveStart = function () {
                this.act = "run" /* RUN */;
            };
            Monster.prototype.updateIndex = function () {
                var vo = this.vo;
                if (vo.cfg && vo.cfg.res_id) {
                    this.setBody(vo.cfg.res_id);
                }
            };
            Monster.prototype.getBodyHeight = function () {
                return this.vo && this.vo.monsterType == 2 /* Boss */ ? 270 : _super.prototype.getBodyHeight.call(this);
            };
            Monster.prototype.onDie = function () {
                var self = this;
                self._headMgr.removeHp();
                if (self._shadow) {
                    Pool.release(self._shadow);
                    self._shadow = undefined;
                }
                _super.prototype.onDie.call(this);
            };
            Monster.prototype.decreaseHp = function (v) {
                if (this.vo.hp == undefined || this.vo.max_hp == undefined) {
                    return;
                }
                if (this.vo.hp.lte(v)) {
                    this.vo.isDead = true;
                    this.vo.hp.high = 0;
                    this.vo.hp.low = 0;
                    this._headMgr.removeHp();
                }
                else {
                    this.vo.hp = this.vo.hp.sub(v);
                    this.vo.isDead = false;
                    var p = this.vo.hp.mul(10000).div(this.vo.max_hp).toNumber();
                    this._headMgr.setHp(Math.max(p, 0));
                }
            };
            Monster.prototype.changeHpShow = function () {
                var self = this;
                if (!self.parent) {
                    return;
                }
                var vo = self.vo;
                if (!vo.isTarget) {
                    return;
                }
                if (vo.monsterType == 2 /* Boss */) {
                    var t = {
                        entity_id: vo.entity_id,
                        cfg: vo.cfg,
                        max_hp: vo.max_hp,
                        percent: vo.percent
                    };
                    self.parent.dispatcher.dispatchEventWith("on_boss_hp" /* ON_BOSS_HP */, false, t);
                }
                else {
                    self._headMgr.setHp(vo.percent);
                    _super.prototype.onNameChanged.call(this);
                    if (vo.percent <= 0) {
                        self._headMgr.removeHp();
                    }
                }
            };
            Monster.prototype.onFatalAtk = function () {
                if (this.isDead) {
                    return;
                }
                if (!this.vo) {
                    return;
                }
                this._dying = true;
                this.vo.isDead = true;
                this._dyingTime = TimeMgr.time.serverTime;
            };
            Monster.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                if (this.dieDel && this._dyingTime && TimeMgr.time.serverTime - this._dyingTime >= 3000) {
                    this.onDieEnd();
                }
            };
            Monster.prototype.killBy = function (attacker) {
                if (!this.isDead) {
                    var die = Pool.alloc(scene_9.DieAct);
                    die.attacker = attacker;
                    this._actMgr.add(die);
                }
            };
            Object.defineProperty(Monster.prototype, "act", {
                get: function () {
                    return this._act;
                },
                set: function (value) {
                    if (!value) {
                        return;
                    }
                    this._act = value;
                    this.avatar.setAct(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Monster.prototype, "dir", {
                get: function () {
                    return this._dir;
                },
                set: function (value) {
                    if (!value) {
                        return;
                    }
                    this._dir = value;
                    this.avatar.setDir(value);
                },
                enumerable: true,
                configurable: true
            });
            //击退
            Monster.prototype.pushBack = function (dst, time) {
                if (dst && time) {
                    var target_1 = this.dsp;
                    var x = dst.x * scene_9.MapData.ins.cellWidth;
                    var y = dst.y * scene_9.MapData.ins.cellHeight;
                    this.vo.x = dst.x;
                    this.vo.y = dst.y;
                    Tween.get(target_1).to({ x: x, y: y }, time).exec(Handler.alloc(this, function () {
                        Tween.remove(target_1);
                    }));
                }
                else {
                    console.error("dst = " + dst + "," + "this._moveTime = " + time);
                }
            };
            return Monster;
        }(scene_9.BaseActor));
        scene_9.Monster = Monster;
        __reflect(Monster.prototype, "game.scene.Monster");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_10) {
        var Point = egret.Point;
        var TimeMgr = base.TimeMgr;
        var Pool = base.Pool;
        var Tween = base.Tween;
        var facade = base.facade;
        var SceneUtil = game.mod.SceneUtil;
        //主角
        var MainGPlayer = /** @class */ (function (_super) {
            __extends(MainGPlayer, _super);
            function MainGPlayer() {
                var _this = _super.call(this) || this;
                /** 闲置时间 */
                _this.standTime = 0;
                /** 是否遥感移动 */
                _this.isControlMove = false;
                _this._requestCnt = 0;
                _this._lastRequestTime = 0;
                MainGPlayer._ins = _this;
                return _this;
            }
            Object.defineProperty(MainGPlayer, "ins", {
                get: function () {
                    return MainGPlayer._ins;
                },
                enumerable: true,
                configurable: true
            });
            MainGPlayer.delIns = function () {
                MainGPlayer._ins = null;
            };
            Object.defineProperty(MainGPlayer.prototype, "vo", {
                get: function () {
                    return this._vo;
                },
                set: function (value) {
                    this._vo = value;
                },
                enumerable: true,
                configurable: true
            });
            MainGPlayer.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                var self = this;
                if (!self.vo.isAutoHangUp) {
                    self.standTime += elapseTime;
                    if (self.standTime >= 15000) {
                        self.standTime = 0;
                        facade.sendNt("set_hang_up" /* SET_HANG_UP */, true);
                    }
                }
            };
            Object.defineProperty(MainGPlayer.prototype, "act", {
                get: function () {
                    return this._act;
                },
                set: function (value) {
                    if (!value) {
                        return;
                    }
                    if (this._act == "run" /* RUN */ && this.isControlMove && value == "std" /* STAND */) {
                        return;
                    }
                    this._act = value;
                    this.avatar.setAct(value);
                },
                enumerable: true,
                configurable: true
            });
            // public setAdTitle(type: s2c_ad_limit_gift_info) {
            //     if (this._headMgr) {
            //         this._headMgr.setAdTitle(type);
            //     }
            // }
            MainGPlayer.prototype.updateAvatarClose = function () {
            };
            MainGPlayer.prototype.updateVo = function () {
                _super.prototype.updateVo.call(this);
                //console.log("MainGPlayer updateVo");
                var self = this;
                var startX = self.x;
                var offX = self.dir < 5 /* DOWN */ ? -110 : 110;
                // SkillEftMgr.ins.showGroupEft(EnterPortal, self.x + offX, self.y, self.dir); //传送门效果
                self.scale = 0.2;
                self.x = self.x + offX;
                Tween.get(self).delay(300).to({ scale: 1, x: startX }, 500);
                game.RoleVo.ins.entity_id = this.vo.entity_id;
                // this.setFlag(null);
            };
            Object.defineProperty(MainGPlayer.prototype, "x", {
                get: function () {
                    return this._dsp.x;
                },
                set: function (value) {
                    this._dsp.x = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MainGPlayer.prototype, "y", {
                get: function () {
                    return this._dsp.y;
                },
                set: function (value) {
                    if (this._dsp.y == value) {
                        return;
                    }
                    this._dsp.y = value;
                },
                enumerable: true,
                configurable: true
            });
            // protected onCreditLvUpdate(): void {
            //     super.onCreditLvUpdate();
            //     if (this.vo.credit_lv) {
            //         // this.headMgr.setRepuNameColor(UIColor.ORANGE);
            //     }
            // }
            MainGPlayer.prototype.onTeamNameUpdate = function () {
                _super.prototype.onTeamNameUpdate.call(this);
                // if (this.vo.guild_team_id && this.vo.guild_team_name && this.vo.guild_team_name.trim() != "") {
                //     // this.headMgr.setRepuNameColor(UIColor.ORANGE);
                // }
            };
            MainGPlayer.prototype.onNameChanged = function () {
                _super.prototype.onNameChanged.call(this);
                if (this._headMgr && this.vo.name) {
                    this.headMgr.setNameColor(65280 /* GREEN */);
                }
            };
            MainGPlayer.prototype.setAdTitle = function (lv) {
                if (this._headMgr) {
                    this._headMgr.setAdTitle(lv);
                }
            };
            // protected onMarryNameUpdate(): void {
            //     super.onMarryNameUpdate();
            //     if (this._headMgr) {
            //         this._headMgr.setPartnerNameColor(UIColor.ORANGE);
            //     }
            // }
            MainGPlayer.prototype.requestMonster = function () {
                if (!this.vo.isAutoHangUp) {
                    return;
                }
                if (!scene_10.SceneTools.isSelfReady(this.vo)) {
                    return;
                }
                var t = TimeMgr.time.serverTimeSecond;
                var s = this.parent;
                if (t - this._lastRequestTime < 5 || this._requestCnt >= 5) {
                    return;
                }
                this._requestCnt++;
                this._lastRequestTime = t;
                s.dispatcher.dispatchEventWith("on_request_monster" /* ON_REQUEST_MONSTER */, false);
            };
            MainGPlayer.prototype.clearRequestStatus = function () {
                this._requestCnt = 0;
                this._lastRequestTime = 0;
            };
            MainGPlayer.prototype.onStartSprint = function (sx, sy, ex, ey) {
                if (!this._sprintPath) {
                    this._sprintPath = [this._sprintPt1 = Pool.alloc(Point), this._sprintPt2 = Pool.alloc(Point)];
                }
                this._sprintPt1.setTo(sx, sy);
                this._sprintPt2.setTo(ex, ey);
                this.act = "jmp" /* JUMP */ + 3;
                this.doMove(this._sprintPath, 1 /* Sprint */);
            };
            MainGPlayer.prototype.onChangeMoveByPath = function (path, moveType) {
                if (moveType === void 0) { moveType = 3 /* Find */; }
                this.doMove(path, moveType);
            };
            MainGPlayer.prototype.attack = function (idx, actIdx, dir, list, focusPt) {
                var self = this;
                self.standTime = 0;
                //console.log("前端主角 MainGPlayer attack ");
                _super.prototype.attack.call(this, idx, actIdx, dir, list, focusPt);
            };
            MainGPlayer.prototype.showCommonAtkEfect = function () {
                var param = {};
                //let rotation = 0;
                // let rotation = -45;
                // let isRotate = false;
                // switch (this.dir) {
                //     case  Direction.LEFT_UP:
                //         rotation = -115;
                //         isRotate = true;
                //         break;
                //     case  Direction.LEFT_DOWN:
                //         rotation = 115;
                //         break;
                //     case  Direction.RIGHT_UP:
                //         rotation = -65;
                //         isRotate = false;
                //         break;
                //     case  Direction.RIGHT_DOWN:
                //         rotation = 65;
                //         break;
                // }
                //SkillEftMgr.ins.showSkillEft("210101000",this.x,this.y-100,rotation,param);
                //showGroupEft(eftId: string, x: number, y: number, dir: number, shakeCfg?: number[], actor?: BaseActor, cb?: Handler, isRotate?: b
                scene_10.SkillEftMgr.ins.showGroupEft("pg_1", this.x, this.y - 100, this.dir, null, null, null);
                // SkillEftMgr.ins.showSkillEft("210101000",this.x,this.y-50,-45,test);
                // SkillEftMgr.ins.showSkillEft("210101000",this.x,this.y-50,-135,test);
                // SkillEftMgr.ins.showSkillEft("210101000",this.x,this.y-50,45,test);
                // SkillEftMgr.ins.showSkillEft("210101000",this.x,this.y-50,135,test);
            };
            MainGPlayer.prototype.setWorldPos = function (wx, wy) {
                _super.prototype.setWorldPos.call(this, wx, wy);
                if (wx <= 0 || wy <= 0) {
                    console.error("人物移到场景外！", wx, wy, this.vo.x, this.vo.y);
                }
                //console.log("MainGPlayer setWorldPos wx = "+wx);
                //console.log("MainGPlayer setWorldPos wy = "+wy);
                var scene = this.parent;
                // let sw: SoulWare = scene.ctrl.getSoulWare(this.vo.entity_id);
                // if (sw) {
                //     sw.setWorldPos(wx, wy);
                // }
                // 是否为主视角
                // if (SceneTools.isFocusEntity(this.vo.entity_id)) {
                if (!SceneUtil.isPvpScene()) {
                    scene.updateFocus(wx, wy);
                    scene.updateShakeFocusPt();
                }
            };
            MainGPlayer.prototype.onMoveStart = function () {
                _super.prototype.onMoveStart.call(this);
                this.standTime = 0;
                var self = this;
                var moveAct = self._actMgr.curAct;
                var mType = moveAct.moveType;
                if (mType == 3 /* Find */) {
                    mType = 0 /* Normal */;
                }
                if (moveAct.path.length < 2) {
                    console.error("自己移动路径错误！");
                }
                this.doMove(moveAct.path, mType);
            };
            MainGPlayer.prototype.doMove = function (p, mType) {
                var t = MainGPlayer._moveTmp;
                t.path = p;
                t.mType = mType;
                this.parent.dispatcher.dispatchEventWith("on_main_move" /* ON_MAIN_MOVE */, false, t);
                delete t.path;
                delete t.mType;
            };
            MainGPlayer.prototype.setTilePos = function (tx, ty, updateWorld) {
                if (updateWorld === void 0) { updateWorld = true; }
                _super.prototype.setTilePos.call(this, tx, ty, updateWorld);
                if (DEBUG) {
                    if (gso.test_mask == "1") {
                        this._headMgr.setName(tx + "," + ty);
                    }
                }
            };
            MainGPlayer.prototype.onDie = function () {
                this.parent.removeShake();
                //(<Scene>this.parent).ctrl.removeSoulWare(this.vo.entity_id);
                _super.prototype.onDie.call(this);
            };
            MainGPlayer.prototype.onDieEnd = function () {
                //主角死后不移除
            };
            MainGPlayer.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                this.avatar.loadPri = game.LoadPri.SceneMain;
            };
            MainGPlayer.prototype.onRelease = function () {
                var s = this;
                Tween.remove(s);
                s._sprintPath = undefined;
                Pool.release(s._sprintPt1);
                s._sprintPt1 = null;
                Pool.release(s._sprintPt2);
                s._sprintPt2 = null;
                _super.prototype.onRelease.call(this);
            };
            /***********************化神相关的***************************/
            MainGPlayer.prototype.onHuashenUpdate = function () {
                _super.prototype.onHuashenUpdate.call(this);
                var curId = this.vo && this.vo.the_god;
                facade.sendNt("on_scene_huashen_id" /* ON_SCENE_HUASHEN_ID */, curId);
            };
            MainGPlayer._moveTmp = {};
            return MainGPlayer;
        }(scene_10.GPlayer));
        scene_10.MainGPlayer = MainGPlayer;
        __reflect(MainGPlayer.prototype, "game.scene.MainGPlayer");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var TimeMgr = base.TimeMgr;
        var EventDispatcher = egret.EventDispatcher;
        var Point = egret.Point;
        var Pool = base.Pool;
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var GhostShadow = game.mod.scene.GhostShadow;
        var RoleGhostShadow = game.mod.scene.RoleGhostShadow;
        var Scene = /** @class */ (function (_super) {
            __extends(Scene, _super);
            function Scene() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._depthCnt = 0;
                _this._depthItem = [];
                _this.isAddedMain = false;
                _this.preTime = 0;
                return _this;
            }
            Object.defineProperty(Scene.prototype, "isInitMap", {
                get: function () {
                    return this._isInitMap;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scene.prototype, "dispatcher", {
                get: function () {
                    return this._dispatcher;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scene.prototype, "ctrl", {
                get: function () {
                    return this._ctrl;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scene.prototype, "isShow", {
                get: function () {
                    return !!this.dsp.stage;
                },
                enumerable: true,
                configurable: true
            });
            Scene.prototype.init = function () {
                _super.prototype.init.call(this);
                this._dispatcher = new EventDispatcher();
            };
            Scene.prototype.initDsp = function () {
                var self = this;
                self.dsp = game.Layer.scene;
                self.dsp.touchEnabled = true;
                self._camera = new scene.SceneCamera(self);
                self._shake = new scene.SceneShake(self);
                self._map = self.addLayer(scene.SceneMap, "_map");
                self._layerDown = self.addLayer(DisplayObjectContainer, "_layerDown");
                self._layerAvatar = self.addLayer(DisplayObjectContainer, "_layerAvatar");
                self._layerDropItem = self.addLayer(DisplayObjectContainer, "_layerDropItem");
                self._layerEffect = self.addLayer(DisplayObjectContainer, "_layerEffect");
                self._layerEffect2 = self.addLayer(DisplayObjectContainer, "_layerEffect2");
                scene.STxtMgr.ins.init(self);
                scene.SkillEftMgr.ins.init(self);
                var param = game.getConfigByNameId("param.json" /* Param */, "default_speed");
                gso.defaultSpeed = param.value;
            };
            Scene.prototype.addLayer = function (cls, name) {
                var s = new cls();
                s.name = name;
                s.touchEnabled = false; //s.touchChildren =
                this.dsp.addChild(s);
                return s;
            };
            //清空掉落层
            Scene.prototype.clearDropItems = function () {
                this._layerDropItem.removeChildren();
            };
            Scene.prototype.addDsp = function (child) {
                var self = this;
                if (child instanceof scene.DropItem) {
                    self._layerDropItem.addChild(child.dsp);
                    return;
                }
                if (child instanceof scene.BaseBmpNum) {
                    child.dsp.zIdx = 0;
                    self._layerEffect.addChild(child.dsp);
                    return;
                }
                if (child instanceof scene.SkillEffect || child instanceof scene.EftGroup) {
                    child.dsp.zIdx = 1;
                    var layer = child.layer == 1 /* Down */ ? self._layerDown : self._layerEffect;
                    if (layer.numChildren === 0 || layer.getChildAt(layer.numChildren - 1) instanceof scene.SkillEffect) {
                        layer.addChild(child.dsp);
                    }
                    else {
                        var i = layer.numChildren - 1;
                        for (; i >= 0; i--) {
                            if (layer.getChildAt(i).zIdx >= child.dsp.zIdx) {
                                break;
                            }
                        }
                        layer.addChildAt(child.dsp, i + 1);
                    }
                    return;
                }
                if (child instanceof scene.ActorShadow) {
                    self._layerDown.addChild(child.dsp);
                    return;
                }
                self._layerAvatar.addChild(child.dsp);
            };
            Scene.prototype.initScene = function (mapId, handler, sceneType, sceneIndex) {
                var self = this;
                var data = scene.MapData.ins;
                self.sceneIndex = sceneIndex;
                self.sceneType = sceneType;
                self.mapId = mapId;
                self._isInitMap = true;
                self._ctrl = handler;
                self._ctrl.init(mapId, self);
                scene.MapData.ins.isHangUp = (sceneType == 106 /* HangUp2 */);
                self._map.init(mapId);
                self._camera.init();
                scene.AStar.initialize(data.numCol, data.numRow);
                scene.AStar.ckIsBlock = data.ckBlock;
                TimeMgr.addUpdateItem(self);
                self.onStageResize();
            };
            Scene.prototype.setBlur = function (texture) {
                this._map.setBlur(texture);
            };
            Object.defineProperty(Scene.prototype, "isSceneReady", {
                get: function () {
                    return this._isInitMap;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scene.prototype, "layerDown", {
                get: function () {
                    return this._layerDown;
                },
                enumerable: true,
                configurable: true
            });
            Scene.prototype.clean = function (clearAll) {
                var self = this;
                if (!self._isInitMap) {
                    return;
                }
                self._isInitMap = false;
                TimeMgr.removeUpdateItem(self);
                self._map.clean(clearAll);
                scene.STxtMgr.ins.clean();
                for (var i = self.numChildren - 1; i >= 0; i--) {
                    var child = self.children[i];
                    if (child instanceof GhostShadow || child instanceof RoleGhostShadow) {
                        this._ctrl.removeGhost(child);
                    }
                    else {
                        this._ctrl.removeObj(child);
                        this.removeActor(child);
                    }
                }
                self._ctrl.dispose();
                self._ctrl = null;
                self._shake.remove();
            };
            Scene.prototype.addActor = function (actor) {
                if (actor instanceof scene.MainGPlayer && this.isAddedMain) {
                    return;
                }
                if (actor instanceof scene.MainGPlayer) {
                    this.isAddedMain = true;
                }
                this.add(actor);
            };
            Scene.prototype.removeActor = function (actor) {
                if (actor instanceof scene.MainGPlayer) {
                    actor.actMgr.removeAll();
                    return;
                }
                this.remove(actor);
            };
            Scene.prototype.onStageResize = function () {
                this._camera.onResize(gso.gameStage.stageWidth, gso.gameStage.stageHeight);
            };
            Scene.prototype.updateViewPort = function (viewPort) {
                this.dsp.x = -viewPort.x;
                this.dsp.y = -viewPort.y;
            };
            Scene.prototype.addObj = function (obj) {
                this._ctrl.addObj(obj);
            };
            Scene.prototype.removeObj = function (id) {
                this._ctrl.removeById(id);
            };
            Scene.prototype.updateTiles = function (sc, sr, ec, er) {
                this._map.updateTiles(sc, sr, ec, er);
            };
            /**
             *更新摄像头对焦位置
             * @param wx
             * @param wy
             * @param smooth 是否平滑
             */
            Scene.prototype.updateFocus = function (wx, wy, smooth) {
                if (smooth === void 0) { smooth = true; }
                this._camera.setFocus(wx, wy, smooth);
            };
            /** 对焦地图中心点*/
            Scene.prototype.setMapCenterFocus = function () {
                this._camera.setMapCenterFocus();
            };
            /** 添加残影 */
            Scene.prototype.addGhost = function (obj) {
                var ghost;
                if (obj instanceof scene.Ride) {
                    ghost = Pool.alloc(GhostShadow);
                }
                else {
                    ghost = Pool.alloc(RoleGhostShadow);
                }
                ghost.vo = obj.vo;
                ghost.x = obj.x;
                ghost.y = obj.y;
                ghost.realObj = obj;
                this.ctrl.addGhost(ghost);
            };
            Scene.prototype.updateShakeFocusPt = function () {
                if (this._shake.isShake) {
                    this._shake.updateShakeFocusPt();
                }
            };
            Scene.prototype.getFocusPt = function () {
                return this._camera.getFocusPt();
            };
            Scene.prototype.getWorldPt = function (stageX, stageY, pt) {
                pt = pt || Pool.alloc(Point);
                pt.x = stageX - this.dsp.x;
                pt.y = stageY - this.dsp.y;
                return pt;
            };
            Scene.prototype.getStagePt = function (sceneX, sceneY, pt) {
                pt = pt || Pool.alloc(Point);
                pt.x = sceneX + this.dsp.x;
                pt.y = sceneY + this.dsp.y;
                return pt;
            };
            Scene.getFindPathDis = function (sx, sy, ex, ey) {
                var path = this.findPath(sx, sy, ex, ey);
                if (!path) {
                    return null;
                }
                var dis = 0;
                for (var k = 0; k < path.length - 1; ++k) {
                    dis += game.PointUtil.distancePt(path[k], path[k + 1]);
                }
                return dis;
            };
            Scene.findPath = function (sx, sy, ex, ey) {
                if (!scene.MapData.ins.isPointLegal(sx, sy) || !scene.MapData.ins.isPointLegal(ex, ey)) {
                    return null;
                }
                var path = scene.AStar.findPath(sx, sy, ex, ey);
                path = scene.AStar.floyd(path);
                return path;
            };
            Scene.findAtkPath = function (sx, sy, ex, ey, dis) {
                if (!scene.MapData.ins.isPointLegal(sx, sy) || !scene.MapData.ins.isPointLegal(ex, ey)) {
                    return null;
                }
                var path = scene.AStar.findPath(sx, sy, ex, ey);
                if (!path) {
                    return null;
                }
                var pop_list = [];
                while (path.length > 1) {
                    var ePt = path[path.length - 2];
                    var ptDis = game.PointUtil.distance(ePt.x, ePt.y, ex, ey);
                    if (ptDis > dis) {
                        break;
                    }
                    pop_list.push(path.pop());
                }
                if (pop_list.length)
                    path.push(pop_list.pop()); //加回一个在范围的点;
                Pool.releaseList(pop_list);
                if (path.length > 0) {
                    path = scene.AStar.floyd(path);
                }
                return path;
            };
            Scene.prototype.shake = function (cfg) {
                if (gso.isHideSceneShake) {
                    return;
                }
                this._shake.start(cfg);
            };
            Scene.prototype.removeShake = function () {
                this._shake.remove();
            };
            Scene.prototype.update = function (time) {
                var self = this;
                var advTime = TimeMgr.getElapseTime(self);
                self.advanceTime(advTime);
                self.updateDepth();
                if (self._shake.isShake) {
                    self._shake.doShake();
                }
                if (self._camera) {
                    self._camera.update(advTime);
                }
                advTime = time.serverTimeSecond;
                self._map.check(advTime);
            };
            //重载父类函数
            Scene.prototype.advanceTime = function (elapseTime) {
                //super.advanceTime(elapseTime);
                this.preTime = Date.now();
                var isAllDone = true;
                var hald = Math.floor(this._children.length / 2) + 1;
                for (var i = 0, n = this._children.length; i < n; i++) {
                    var child = this._children[i];
                    if (child instanceof scene.BaseActor) {
                        //屏蔽其他玩家
                        if (gso.isHideOtherPlayer && child.enType == 1 /* PLAYER */) {
                            if (!(child instanceof scene.MainGPlayer)) {
                                child.dsp.visible = false;
                                continue;
                            }
                            else {
                                child.dsp.visible = true;
                            }
                        }
                        //屏蔽其他玩家跟随
                        if (gso.isHideOtherPlayerPet && child.enType == 4 /* PET */) {
                            var vo = child.vo;
                            if (!vo.master_id.eq(game.RoleVo.ins.entity_id)) {
                                child.dsp.visible = false;
                                continue;
                            }
                            else {
                                child.dsp.visible = true;
                            }
                        }
                    }
                    if (child && child.updateEnabled) {
                        if (!(child instanceof scene.MainGPlayer) && Date.now() - this.preTime > 12 && i > hald) {
                            isAllDone = false;
                        }
                        else {
                            try {
                                child.advanceTime(elapseTime);
                            }
                            catch (e) {
                                console.error(egret.getQualifiedClassName(child), e);
                            }
                        }
                    }
                }
                if (!isAllDone) {
                    this._children = this._children.reverse();
                }
            };
            Scene.prototype.updateDepth = function () {
                var self = this;
                var layerAvatar = self._layerAvatar;
                var sortList = self._depthItem;
                self._depthCnt++;
                if (self._depthCnt < 5) {
                    return;
                }
                var child;
                var i, n = layerAvatar.numChildren;
                for (i = 0; i < n; i++) {
                    sortList[i] = layerAvatar.getChildAt(i);
                }
                sortList.sort(Scene.sortFun);
                for (i = 0; i < n; i++) {
                    child = sortList[i];
                    if (child != layerAvatar.$children[i]) {
                        layerAvatar.setChildIndex(child, i);
                    }
                }
                sortList.length = 0;
            };
            Scene.sortFun = function (a, b) {
                if (!a || !b) {
                    return 0;
                }
                if (a.y !== b.y) {
                    return a.y - b.y;
                }
                return b.addTime - a.addTime;
                // return (<SceneDisplay><any>a).addTime - (<SceneDisplay><any>b).addTime;
            };
            Scene.prototype.getNearByObjType = function (objectType, index) {
                var enemies = this.ctrl.getObjMap();
                var list = Object.keys(enemies);
                if (!enemies || 0 == list.length) {
                    return null;
                }
                var minIdx;
                var minDis = 0;
                var mainVo = scene.SceneTools.mainPlayerVo;
                for (var i = 0, l = list.length; i < l; i++) {
                    var obj = enemies[list[i]];
                    if (!obj.vo || obj.vo.type != objectType || obj.vo.cfg.index != index)
                        continue;
                    if (!scene.SceneTools.isTargetReady(obj.vo)) {
                        continue;
                    }
                    var path = Scene.findPath(mainVo.x, mainVo.y, obj.vo.x, obj.vo.y);
                    if (!path || path.length > 2) {
                        continue;
                    }
                    var dis = game.PointUtil.distance(mainVo.x, mainVo.y, obj.vo.x, obj.vo.y);
                    if (!minDis || dis < minDis) {
                        minDis = dis;
                        minIdx = list[i];
                    }
                }
                if (!minIdx || !scene.SceneTools.isTargetReady(enemies[minIdx].vo)) {
                    return null;
                }
                return enemies[minIdx];
            };
            return Scene;
        }(scene.BaseDraw));
        scene.Scene = Scene;
        __reflect(Scene.prototype, "game.scene.Scene", ["base.UpdateItem"]);
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var BitmapFillMode = egret.BitmapFillMode;
        var BaseHp = /** @class */ (function (_super) {
            __extends(BaseHp, _super);
            function BaseHp() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.bmpGrid = [];
                return _this;
            }
            Object.defineProperty(BaseHp.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    this.bmpBg.width = value;
                    this.bmpHp.width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseHp.prototype, "hpWidth", {
                set: function (value) {
                    this._hpWidth = value;
                    this.bmpHp.x = (this._width - this._hpWidth) * 0.5;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseHp.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this.bmpBg.y = (value - 14) * 0.5;
                },
                enumerable: true,
                configurable: true
            });
            BaseHp.prototype.initDsp = function () {
                _super.prototype.initDsp.call(this);
                var self = this;
                self.bmpBg = self.dsp.addChild(Pool.alloc(game.BitmapBase));
                self.bmpHp = self.dsp.addChild(Pool.alloc(game.BitmapBase));
                self.bmpHp.fillMode = BitmapFillMode.REPEAT;
            };
            // protected onGetBmpBg(tex: Texture) {
            //     this.bmpBg.texture = tex;
            // }
            //
            // protected onGetBmpHp(tex: Texture) {
            //     this.bmpHp.texture = tex;
            // }
            BaseHp.prototype.onGetBmpGrid = function (tex) {
                this.gridTexture = tex;
                var y = (this.height - 12) * 0.5;
                if (this.bmpGrid && this.bmpGrid.length) {
                    for (var i = 0, len = this.bmpGrid.length; i < len; i++) {
                        var bmp = this.bmpGrid[i];
                        bmp.texture = this.gridTexture;
                        bmp.y = y;
                    }
                }
            };
            BaseHp.prototype.setHp = function (hp) {
                this.bmpHp.width = Math.floor(hp * this._hpWidth / 10000);
            };
            BaseHp.prototype.setGridHp = function (maxHp) {
                var self = this;
                self.clearBmpGrid();
                var cnf = game.getConfigByNameId("param.json" /* Param */, "role_hp");
                var hpArr = cnf.value; //[500000,2000000,5000000,10000000,30000000,60000000,100000000];
                var len = 0;
                var maxNum = maxHp.toNumber();
                if (maxNum <= hpArr[0]) {
                    len = 3;
                }
                else if (maxNum > hpArr[0] && maxNum <= hpArr[1]) {
                    len = 4;
                }
                else if (maxNum > hpArr[1] && maxNum <= hpArr[2]) {
                    len = 5;
                }
                else if (maxNum > hpArr[2] && maxNum <= hpArr[3]) {
                    len = 6;
                }
                else if (maxNum > hpArr[3] && maxNum <= hpArr[4]) {
                    len = 7;
                }
                else if (maxNum > hpArr[4] && maxNum <= hpArr[5]) {
                    len = 8;
                }
                else if (maxNum > hpArr[5] && maxNum <= hpArr[6]) {
                    len = 9;
                }
                else {
                    len = 10;
                }
                // let oneGrid: number = cnf.value;
                // let num: number = maxHp.div((oneGrid / 10)).toNumber();//获取有多少格子*10
                // let len = Math.round(num / 10);//获取有多少格子
                var oneWidth = Math.max(Math.round(self._hpWidth / len), 3); //最少3px
                var y = (self.height - (self.bmpHp.height || 12)) * 0.5;
                for (var i = 1; i < len; i++) {
                    var width = i * oneWidth;
                    if (width > self._hpWidth)
                        continue;
                    var bmp = Pool.alloc(game.BitmapBase);
                    bmp.x = width;
                    bmp.y = y;
                    if (self.gridTexture)
                        bmp.texture = self.gridTexture;
                    self.bmpGrid.push(bmp);
                    self.dsp.addChild(bmp);
                }
            };
            BaseHp.prototype.clearBmpGrid = function () {
                var self = this;
                if (self.bmpGrid && self.bmpGrid.length) {
                    for (var i = 0, len = self.bmpGrid.length; i < len; i++) {
                        var bmp = self.bmpGrid[i];
                        bmp.texture = null;
                        Pool.release(bmp);
                    }
                    self.bmpGrid.length = 0;
                }
            };
            BaseHp.prototype.onRelease = function () {
                _super.prototype.onRelease.call(this);
                var self = this;
                self.bmpBg.source = null;
                self.bmpHp.source = null;
                self.gridTexture = null;
                self.scale = 1;
                self.clearBmpGrid();
            };
            return BaseHp;
        }(scene.BaseDraw));
        scene.BaseHp = BaseHp;
        __reflect(BaseHp.prototype, "game.scene.BaseHp");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_11) {
        var Handler = base.Handler;
        var delayCall = base.delayCall;
        var clearDelay = base.clearDelay;
        var Pool = base.Pool;
        var GDirUtil = game.utils.GDirUtil;
        var AttackAct = /** @class */ (function (_super) {
            __extends(AttackAct, _super);
            function AttackAct() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._timeoutKey = 0;
                _this._eftListTimeOut = 0;
                return _this;
            }
            Object.defineProperty(AttackAct.prototype, "idx", {
                //private _isAdventGodAtk: boolean;
                get: function () {
                    return this._idx;
                },
                enumerable: true,
                configurable: true
            });
            AttackAct.prototype.setData = function (idx, actIdx, dir, list, focusPt) {
                if (this._list) {
                    this.clearList();
                }
                var cfg = game.SkillData.getCfg(idx);
                var showCfg = game.SkillData.getEffCfg(cfg.skillshow);
                this._idx = idx;
                this._list = list;
                // this._isAdventGodAtk = _isAdventGodAtk;
                // if (this._actor) {
                //     this._actor.isAdventGodAtk = _isAdventGodAtk;
                // }
                if (showCfg) {
                    if (showCfg.res && showCfg.isrotate == 1) {
                        var urlDir = game.MirDir[dir] ? game.MirDir[dir] : dir;
                        this._skillEft = showCfg.res + "_" + urlDir;
                    }
                    else {
                        this._skillEft = showCfg.res;
                    }
                    this._atkEft = showCfg.act_effect; //[actIdx[0]]
                }
                this.actType = actIdx;
                if (this.actType == undefined) {
                    console.debug("攻击动作错误,技能index=" + idx, "actIdx=" + actIdx);
                    this.actType = [1];
                }
                this._dir = dir;
                this._focusPt = focusPt;
            };
            AttackAct.prototype.onStart = function () {
                _super.prototype.onStart.call(this);
                var self = this;
                self._actor.onAttackStart(self.actType, self._dir, self._atkEft);
                if (self._actor == null)
                    return;
                var x = self._actor.x;
                var y = self._actor.y;
                var dir = self._actor.dir;
                var isMainPlayer = self._actor instanceof scene_11.MainGPlayer;
                if (self._atkEft && scene_11.SceneTools.isShowEft(isMainPlayer)) {
                    this.playCastEft();
                }
                var cfg = game.SkillData.getCfg(this._idx);
                var atkCfg = game.SkillData.getEffCfg(cfg.skillshow);
                self._timeoutKey = delayCall(Handler.alloc(self, self.onAtkTimeOut), Math.max(cfg.next_cd, 3000));
                if (self._list) {
                    // self._eftListTimeOut = delayCall(Handler.alloc(self, self.eftList), 300);
                    self.eftList();
                }
                if (scene_11.SceneTools.isShieldingSkillEft(self._actor)) {
                    return;
                }
                if (self._skillEft && scene_11.SceneTools.isShowEft(isMainPlayer)) {
                    // if (atkCfg.focus == 1 && this._focusPt) {
                    //     x = this._focusPt.x;
                    //     y = this._focusPt.y;
                    // }
                    if (this._focusPt) {
                        if (atkCfg.focus == 1) {
                            x = this._focusPt.x;
                            y = this._focusPt.y;
                        }
                        else if (atkCfg.focus == 3 && isMainPlayer) {
                            //在屏幕中间释放
                            y = y - game.CameraOffsetY;
                            dir = 0;
                        }
                        else if (atkCfg.focus == 4 && isMainPlayer) {
                            //脚底下
                        }
                        else {
                            y = y - 80;
                        }
                    }
                    // if (OffYEft.indexOf(self._skillEft) > -1) {
                    //     y -= 30;
                    // }
                    var scale = 1;
                    // if (NoScaleSurface.indexOf(self._actor.avatar.resType) == -1) {
                    //     scale *= gso.avatarScale;
                    // }
                    // console.log("x = " + x);
                    // console.log("y = " + y);
                    // console.log("CameraOffsetY = " + CameraOffsetY);
                    // console.log("MainGPlayer.ins.x = " + MainGPlayer.ins.x);
                    // console.log("MainGPlayer.ins.y = " + MainGPlayer.ins.y);
                    if (self._skillEft != "0") {
                        scene_11.SkillEftMgr.ins.showGroupEft(self._skillEft, x, y, dir, atkCfg, self._actor, null, scale);
                    }
                }
                if (atkCfg && atkCfg.sound && atkCfg.sound.trim() != "") {
                    var soundSrc = game.ResUtil.getSoundUrl(atkCfg.sound);
                    game.SoundMgr.ins.playEffect(soundSrc);
                }
            };
            AttackAct.prototype.onEffCom = function () {
                clearDelay(this._timeoutKey);
                this._timeoutKey = 0;
                this.done();
            };
            AttackAct.prototype.onAtkTimeOut = function () {
                if (this.isDone) {
                    return;
                }
                this.onEffCom();
            };
            AttackAct.prototype.eftList = function () {
                if (!this._list) {
                    return;
                }
                if (this._actor && this._actor.vo) {
                    var scene_12 = this._actor.parent;
                    if (!scene_12)
                        return;
                    // if (this._actor.vo.type == ObjectType.MONSTER && scene && scene.sceneType == SceneType.HangUp) { //挂机场景不显示怪物攻击飘字
                    //     this.clearList();
                    //     return;
                    // }
                    var dir = game.MathUtil.randomDir(0 /* NONE */);
                    for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                        var e = _a[_i];
                        e = e;
                        if (!e.target || !e.target.vo) {
                            continue;
                        }
                        if (e.is_dead) {
                            e.target.killBy(this._actor);
                        }
                        if (!e.is_dead && e.push_x) {
                            if (scene_11.MapData.ins.isPointLegal(e.push_x, e.push_y)) {
                                var p = scene_11.Scene.findPath(e.target.vo.x, e.target.vo.y, e.push_x, e.push_y);
                                e.target.movePath(p, null, 2 /* Back */);
                            }
                        }
                        if (!e.is_dead && this._actor instanceof scene_11.MainGPlayer && e.target.vo.type == 3 /* MONSTER */) {
                            var dir_1 = void 0;
                            if (e.target.vo.monsterType == 2 /* Boss */) {
                                dir_1 = GDirUtil.reversalDir(e.target.dir);
                            }
                            else {
                                dir_1 = this._actor.dir;
                            }
                            e.target.hit(dir_1);
                        }
                        if (!e.b_value || e.b_value.length == 0) {
                            continue;
                        }
                        //let dir = MathUtil.randomDir(e.target.dir);
                        var delay = e.skillCfg.delay || 250; // 2000;
                        for (var i = 0, l = e.b_value.length; i < l; ++i) {
                            var v = e.b_value[i];
                            var type = v.value_type;
                            if (e.target instanceof scene_11.MainGPlayer) { //角色搜到伤害飘字
                                this.roleBeAttack(v.value.toString(), e.target.x, e.target.y, dir, type, delay * i, e.target);
                                continue;
                            }
                            if (this.isShowDmgTxt(e.target_id)) {
                                //属性伤害飘字
                                scene_11.STxtMgr.ins.show(v.value.toString(), e.target.x, e.target.y, dir, type, delay * i, e.target);
                            }
                            if (e.target instanceof scene_11.Monster && e.target.vo.monsterType == 1 /* Common */) {
                                e.target.decreaseHp(v.value);
                            }
                        }
                        //查找问题代码，估计比较常用，暂时不删除
                        // let ret = false;
                        //
                        //  for(let i = 0; i < e.b_value.length; i++){
                        //      let v = e.b_value[i];
                        //      let type = v.value_type;
                        //      if(type.indexOf(9) > -1){
                        //          ret = true;
                        //          break;
                        //      }
                        //}
                        // if(ret) {
                        //     console.error("e.b_value.length = " + e.b_value.length);
                        //     for (let i = 0; i < e.b_value.length; i++) {
                        //         let v = e.b_value[i];
                        //         let type = v.value_type;
                        //         console.error("type  = " + type.toString());
                        //         console.error("value  = " + v.value.toNumber());
                        //     }
                        //     let pp = 90;
                        // }
                    }
                }
                this.clearList();
            };
            AttackAct.prototype.roleBeAttack = function (v, x, y, dir, types, delay, target) {
                for (var i = 0; i < types.length; i++) {
                    if (types[i] == 1 /* ATK */) {
                        types[i] = 17 /* ROLE_ATK */;
                    }
                }
                scene_11.STxtMgr.ins.show(v, x, y, dir, types, delay, target);
            };
            AttackAct.prototype.isShowDmgTxt = function (targetId) {
                if (!this._actor) {
                    return false;
                }
                //怪物打玩家
                if (this._actor instanceof scene_11.Monster && !scene_11.SceneTools.isMainPlayer(targetId)) {
                    return false;
                }
                //伙伴输出
                if (this._actor instanceof scene_11.Partner && this._actor.vo.isMainPet) {
                    return true;
                }
                //
                if (!(this._actor instanceof scene_11.Monster) && !scene_11.SceneTools.isMainPlayer(this._actor.vo.entity_id) && !scene_11.SceneTools.isMainPlayer(targetId)) {
                    return false;
                }
                return true;
            };
            AttackAct.prototype.clearList = function () {
                scene_11.SkillEffectVo.releaseList(this._list);
                this._list = null;
            };
            AttackAct.prototype.onDone = function () {
                _super.prototype.onDone.call(this);
                if (this._actor) {
                    this._actor.onAttackEnd();
                }
            };
            AttackAct.prototype.onAbort = function () {
                _super.prototype.onAbort.call(this);
                if (this._actor) {
                    this._actor.onAttackEnd();
                }
            };
            AttackAct.prototype.onRelease = function () {
                var self = this;
                clearDelay(self._eftListTimeOut);
                self._eftListTimeOut = 0;
                if (this._list) {
                    this.eftList();
                }
                clearDelay(self._timeoutKey);
                self._timeoutKey = 0;
                self._atkEft = null;
                self._skillEft = null;
                self._dir = null;
                Pool.release(self._focusPt);
                self._focusPt = null;
                _super.prototype.onRelease.call(this);
            };
            AttackAct.prototype.playCastEft = function () {
                var showCfg = game.SkillData.getEffCfg(this._idx);
                if (!showCfg) {
                    return;
                }
                var self = this;
                var x = self._actor.x;
                var y = self._actor.y;
                var dir = self._actor.dir;
                var scale = 1;
                if (game.NoScaleSurface.indexOf(self._actor.avatar.resType) == -1) {
                    scale = gso.avatarScale;
                }
                scene_11.SkillEftMgr.ins.showAtkEft(self._atkEft, x, y, dir, Handler.alloc(self, self.onEffCom), scale, showCfg.layer);
                // SkillEftMgr.ins.showCastEft(self._castEft, x, y, dir, self._actor, null, isRotate, eft_group_key);
            };
            return AttackAct;
        }(scene_11.BaseAct));
        scene_11.AttackAct = AttackAct;
        __reflect(AttackAct.prototype, "game.scene.AttackAct");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_13) {
        var Pool = base.Pool;
        var GDirUtil = game.utils.GDirUtil;
        var MoveAct = /** @class */ (function (_super) {
            __extends(MoveAct, _super);
            function MoveAct() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MoveAct.prototype.setTilePos = function () {
                var self = this;
                var isTileChange = self._tmpTile.x >> 0 !== self._actor.vo.x >> 0 || self._tmpTile.y >> 0 !== self._actor.vo.y >> 0;
                if (isTileChange && scene_13.MapData.ins.isPointLegal(self._tmpTile.x, self._tmpTile.y)) {
                    self._actor.setTilePos(self._tmpTile.x, self._tmpTile.y, false);
                }
            };
            MoveAct.prototype.isNextPt = function () {
                var self = this;
                if (self._moveType != 3 /* Find */)
                    return true;
                if (self._actor == null || self._actor.vo == null)
                    return true;
                if (!(self._actor instanceof scene_13.MainGPlayer))
                    return true;
                // if (self._actor.vo.yuanshen_idx) return true;
                var isLast = self._endTile.equals(self._nextPt);
                if (self.findTarget())
                    return true;
                if (!isLast)
                    return true;
                var isPlayer = self._target && self._target instanceof scene_13.GPlayerVo;
                if (!self._endTile.equals(self._tmpTile) && !isPlayer) {
                    self.sprintMove();
                }
                return true;
            };
            /**冲刺*/
            MoveAct.prototype.sprintMove = function () {
                var self = this;
                var dis = game.PointUtil.distancePt(self._tmpTile, self._endTile);
                var isSprint = dis <= scene_13.SPRINT_DIS_MAX && dis >= scene_13.SPRINT_DIS_MIN;
                var actor = self._actor;
                var scene = actor.parent;
                if (!scene)
                    return;
                if (isSprint) {
                    actor.onStartSprint(self._tmpTile.x, self._tmpTile.y, self._endTile.x, self._endTile.y);
                    self._moveType = 1 /* Sprint */;
                    self._startPt.setTo(self._curX, self._curY);
                    self.updateDur(self._startPt, self._stepPt);
                    self.checkDir();
                    // let soulWare: SoulWare = scene.ctrl.getSoulWare(self._actor.vo.entity_id);
                    // if (soulWare) {
                    //     let move = Pool.alloc(MoveAct);
                    //     // let handler: Handler;
                    //     // if (actor.vo && actor.vo.ride_state == 1) {
                    //     //     handler = Handler.alloc(this, () => {
                    //     //         let _proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                    //     //         _proxy.scene_ride_oper_c2s(0, self._actor.vo.x, self._actor.vo.y);
                    //     //     })
                    //     // }
                    //     move.setPath([Pool.alloc(Point).setTo(self._tmpTile.x, self._tmpTile.y), Pool.alloc(Point).setTo(self._endTile.x, self._endTile.y)], null, MoveType.Sprint);
                    //     soulWare.actMgr.add(move);
                    // }
                    // if (actor.vo.ride_state == 1) {
                    //
                    //     // _proxy.scene_ride_oper_c2s(0);
                    // }
                }
            };
            MoveAct.prototype.findTarget = function () {
                var self = this;
                var actor = self._actor;
                var scene = this._actor.parent;
                if (actor.vo.target_id) {
                    var obj = scene.ctrl.getObj(actor.vo.target_id);
                    if (!obj)
                        return true;
                    self._target = obj.vo;
                }
                else if (actor.vo.target_idx) {
                    var obj = scene.getNearByObjType(3 /* MONSTER */, actor.vo.target_idx);
                    if (!obj)
                        return true;
                    self._target = obj.vo;
                }
                var atk_x, atk_y;
                if (self._target && (actor.vo.target_id || actor.vo.target_idx)) {
                    actor.vo.target_id = null;
                    actor.vo.target_idx = null;
                    var dis = scene_13.MOVE_AMEND_DIS;
                    if (self._target instanceof scene_13.MonsterVo && self._target.index) {
                        var cfg = game.getConfigByNameId("monster1.json" /* Monster */, self._target.index);
                        if (cfg && cfg.hit_scope)
                            dis += cfg.hit_scope;
                    }
                    var curDis = game.PointUtil.distance(self._actor.vo.x, self._actor.vo.y, self._target.x, self._target.y);
                    if (curDis <= dis) {
                        self.done();
                        return true;
                    }
                    var path = scene_13.Scene.findPath(actor.vo.x, actor.vo.y, self._target.x, self._target.y);
                    if (!path)
                        return true;
                    if (path.length > 2) {
                        var lastPt2 = path[path.length - 2];
                        var curDis_1 = game.PointUtil.distancePt(lastPt2, self._endTile);
                        if (curDis_1 <= dis) { //最后第二个点能攻击的情况
                            var time = 1;
                            for (var i = 3; i < path.length; i++) {
                                lastPt2 = path[path.length - i];
                                if (!lastPt2)
                                    break;
                                curDis_1 = game.PointUtil.distancePt(lastPt2, self._endTile);
                                if (curDis_1 > dis) {
                                    time = i - 2;
                                    lastPt2 = path[path.length - (i - 1)];
                                    break;
                                }
                            }
                            for (var i = 0; i < time; i++) {
                                var pt = path.pop();
                                Pool.release(pt);
                            }
                            atk_x = lastPt2.x;
                            atk_y = lastPt2.y;
                        }
                        else {
                            var r = GDirUtil.getRadian2(lastPt2.x, lastPt2.y, self._target.x, self._target.y);
                            atk_x = Math.round(self._target.x - dis * Math.cos(r));
                            atk_y = Math.round(self._target.y - dis * Math.sin(r));
                        }
                    }
                    else { //最后2点之间
                        var r = GDirUtil.getRadian2(actor.vo.x, actor.vo.y, self._target.x, self._target.y);
                        atk_x = Math.round(self._target.x - dis * Math.cos(r));
                        atk_y = Math.round(self._target.y - dis * Math.sin(r));
                    }
                    if (!scene_13.MapData.ins.isBlock(atk_x, atk_y) && (atk_x != actor.vo.x && atk_y != actor.vo.y)) {
                        if (atk_x != null) {
                            Pool.releaseList(path);
                            path = scene_13.Scene.findPath(actor.vo.x, actor.vo.y, atk_x, atk_y);
                        }
                        actor.onChangeMoveByPath(path, self._moveType);
                        self._startPt.setTo(self._curX, self._curY);
                        var last = path[path.length - 1];
                        self._endTile.setTo(last.x, last.y);
                        var p = path[1] ? path[1] : path[0];
                        self._nextPt.setTo(p.x, p.y);
                        self._stepPt = scene_13.MapData.ins.getWorldPt(p.x, p.y, self._stepPt);
                        self.updateDur(self._startPt, self._stepPt);
                        self.checkDir();
                        // console.log(`路径x:${atk_x} y:${atk_y}  dis${PointUtil.distance(atk_x, atk_y, target.vo.x, target.vo.y)}`);
                    }
                    Pool.releaseList(path);
                    path.length = 0;
                }
                return false;
            };
            MoveAct.prototype.checkDir = function () {
                var self = this;
                self._actor.dir = GDirUtil.calcDirection(self._startPt, self._stepPt);
            };
            MoveAct.prototype.onRelease = function () {
                var self = this;
                self._target = null;
                _super.prototype.onRelease.call(this);
            };
            return MoveAct;
        }(scene_13.MoveBaseAct));
        scene_13.MoveAct = MoveAct;
        __reflect(MoveAct.prototype, "game.scene.MoveAct");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var _a, _b, _c;
        scene.AllObjectType = [
            1 /* PLAYER */,
            2 /* NPC */,
            3 /* MONSTER */,
            4 /* PET */,
            5 /* DROP_ITEM */,
            6 /* TEAM_PLAYER */,
            7 /* COLLECT */,
            8 /* TRIGGER */
        ];
        scene.ObjectVo = (_a = {},
            _a[1 /* PLAYER */] = scene.GPlayerVo,
            _a[2 /* NPC */] = scene.NPCVo,
            _a[3 /* MONSTER */] = scene.MonsterVo,
            _a[4 /* PET */] = scene.PetVo,
            _a[5 /* DROP_ITEM */] = scene.DropItemVo,
            _a[6 /* TEAM_PLAYER */] = scene.GPlayerVo,
            _a[7 /* COLLECT */] = scene.CollectVo,
            _a[8 /* TRIGGER */] = scene.TriggerVo,
            _a);
        scene.ObjectCls = (_b = {},
            _b[1 /* PLAYER */] = scene.GPlayer,
            _b[2 /* NPC */] = scene.NPC,
            _b[3 /* MONSTER */] = scene.Monster,
            _b[5 /* DROP_ITEM */] = scene.DropItem,
            _b[6 /* TEAM_PLAYER */] = scene.TeamPlayer,
            _b[7 /* COLLECT */] = scene.CollectItem,
            _b[8 /* TRIGGER */] = scene.Trigger,
            _b);
        scene.PetObjectCls = (_c = {},
            _c[1 /* General */] = scene.General,
            _c[3 /* Ride */] = scene.Ride,
            _c);
        scene.SPRINT_DIS_MAX = 15;
        scene.SPRINT_DIS_MIN = 6;
        scene.MOVE_AMEND_DIS = 3;
        //export const FullScreenEft: string [] = ["eft_wanjian"];
        //export const OffYEft: string[] = ["eft_lingjian", "eft_pomo", "eft_yshuang1"];
        //export const DownLayerEft: string[] = ["jianzhen_xia2", "jianzhen_xia1", "eft_portal", "deemo_door", "deemo_fazhen","skill_hyzd"];
        //export const PreDownLayerEft: string = "sole_skill";
        scene.BossHitEftSrc = "baodian_3";
        scene.EnterSceneEft = "chuansong";
        scene.BossDieEftSrc = "boss_die";
        scene.TalentEftSrc = "talent_eft";
        scene.TalentEftSrc2 = "buff_eft";
        scene.EnterPortal = "eft_portal"; //传送门
        scene.ATK_EFT_3 = "1003";
        scene.GuideLuoJian = "xinshou_luojian";
        scene.LuoJianXie = "luojian_xie";
        scene.BossEnterEft = "boss_enter";
        scene.RoleLvUp = "role_lvup";
        scene.MonsterEnterPortal = "deemo_door";
        scene.XianShiFaZhen = "deemo_fazhen";
        scene.DropItemY = [
            -1.1,
            -8.5,
            -14.8,
            -18.9,
            -23.1,
            -24.3,
            -22.2,
            -18.62,
            -13.7,
            -3.84,
            -2.04,
            -5.56,
            -6.24,
            -5.48,
            -1.73,
            -0.88,
            -1.35,
            0
        ];
        scene.HuashenPt = { x: 50, y: 150 }; //化神模型偏移
        scene.FaBaoRightPt = { x: 70, y: -170 };
        scene.DiBingRightPt = [
            { x: 60, y: 10 },
            { x: 20, y: -30 },
            { x: 20, y: 50 },
            { x: -20, y: -70 },
            { x: -20, y: 90 },
        ];
        scene.SoulWareAddX = 400;
        scene.FaBaoMoveCfg = [
            [0.15, 0.15, 0],
            [0.35, 0.30, 148],
            [0.55, 0.45, 164],
            [0.80, 0.65, 169],
            [1.10, 0.90, 187],
            [1.45, 1.20, 203],
            [1.85, 1.55, 221],
            [2.35, 2.00, 237],
            [2.95, 2.45, 253],
            [3.65, 3.05, 270],
            [4.50, 3.70, 287],
            [5.50, 4.45, 303],
            [6.65, 5.35, 321],
            [8.10, 6.40, 337],
            [9.80, 7.65, 353],
            [11.90, 9.05, 369],
            [14.50, 10.75, 387],
            [17.90, 12.85, 403],
            [22.45, 15.35, 419],
            [27.55, 17.90, 437],
            [33.05, 20.35, 453],
            [38.95, 22.60, 469],
            [45.25, 24.70, 487],
            [51.90, 26.50, 503],
            [58.90, 28.00, 519],
            [66.10, 29.10, 538],
            [73.40, 29.75, 554],
            [80.75, 30.00, 570],
            [87.95, 29.80, 587],
            [94.85, 29.25, 603],
            [101.45, 28.40, 621],
            [107.65, 27.25, 637],
            [113.35, 25.90, 653],
            [118.55, 24.40, 671],
            [123.30, 22.85, 687],
            [127.60, 21.30, 703],
            [131.40, 19.70, 719],
            [134.85, 18.15, 737],
            [137.90, 16.70, 753],
            [140.65, 15.25, 769],
            [143.05, 13.95, 787],
            [145.25, 12.70, 803],
            [147.10, 11.55, 819],
            [148.70, 10.55, 837],
            [150.10, 9.60, 853],
            [151.35, 8.80, 869],
            [152.45, 8.00, 887],
            [153.50, 7.25, 903],
            [154.45, 6.60, 919],
            [155.30, 5.95, 938],
            [156.10, 5.35, 954],
            [156.80, 4.80, 970],
            [157.45, 4.30, 988],
            [158.05, 3.85, 1003],
            [158.60, 3.45, 1021],
            [159.05, 3.05, 1037],
            [159.45, 2.75, 1053],
            [160.00, 0.00, 1071],
        ];
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_14) {
        var Point = egret.Point;
        var Pool = base.Pool;
        var facade = base.facade;
        var SceneTools = /** @class */ (function () {
            function SceneTools() {
            }
            Object.defineProperty(SceneTools, "mainPlayerVo", {
                get: function () {
                    var scene = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                    return scene.mainPlayerVo;
                },
                enumerable: true,
                configurable: true
            });
            SceneTools.isSelfReady = function (playerVo) {
                return playerVo && playerVo.percent > 0 && !playerVo.isDizzy;
            };
            SceneTools.isTargetReady = function (target) {
                if (!target) {
                    return false;
                }
                // if (target instanceof MonsterVo && target.monsterType == MonsterType.Common) {
                //     return !target.isDead && target.hp.gt(0) && target.isReady;
                // }
                if (target.percent <= 0) {
                    return false;
                }
                // if (this.mainPlayerVo && !isNaN(this.mainPlayerVo.team_id)) {
                //     let tflag:boolean = this.mainPlayerVo.team_id != target.team_id;
                //     if(!tflag){
                //         console.info(".......未找到目标...222222222222");
                //     }
                //     return tflag;
                // }
                /**归属抢夺不需要从场景实体来获取信息，伤害排行榜有归属者信息*/
                // let scProxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                // let ownId: Long = scProxy.getOwner() ? scProxy.getOwner().entity_id : null;
                // let robberList: Long[] = scProxy.getRobberList();
                // let _len: number = robberList ? robberList.length : 0;
                // if (ownId) {
                //     if (target.entity_id && target.entity_id.eq(ownId)) {
                //         for (let i = 0; i < _len; i++) {
                //             if (this.mainPlayerVo.entity_id.eq(robberList[i])) {
                //                 return true;
                //             }
                //         }
                //     } else if (this.mainPlayerVo.entity_id.eq(ownId)) {
                //         for (let i = 0; i < _len; i++) {
                //             if (target.entity_id && target.entity_id.eq(robberList[i])) {
                //                 return true;
                //             }
                //         }
                //     }
                // }
                // let flag:boolean = this.mainPlayerVo && this.mainPlayerVo.camp != target.camp;
                // if(!flag){
                //     console.log(".......未找到目标...111111111111");
                // }
                return true;
            };
            SceneTools.isEnemy = function (target) {
                if (target.type == 6 /* TEAM_PLAYER */) {
                    return false;
                }
                var _mainPlayer = this.mainPlayerVo;
                return !(_mainPlayer && _mainPlayer.camp == target.camp);
            };
            SceneTools.getNameColor = function (target) {
                //if (target.type == ObjectType.TEAM_PLAYER) {
                //    return UIColor.WHITE;
                //} else
                if (target.type == 3 /* MONSTER */) {
                    return 16711680 /* RED */;
                }
                else if (target.type == 2 /* NPC */) {
                    return 16742400 /* ORANGE */;
                }
                else if (target.type == 7 /* COLLECT */) {
                    return 16742400 /* ORANGE */;
                }
                var _mainPlayer = this.mainPlayerVo;
                return !(_mainPlayer && _mainPlayer.camp == target.camp) ? 16711680 /* RED */ : 16777215 /* WHITE */;
            };
            SceneTools.getMapIdByScene = function (index) {
                var cfg = game.getConfigByNameId("scene.json" /* Scene */, index);
                if (!cfg) {
                    return 0;
                }
                return cfg.map_id;
            };
            SceneTools.isMainPlayer = function (targetId) {
                if (!targetId) {
                    return false;
                }
                return this.mainPlayerVo && this.mainPlayerVo.entity_id.eq(targetId);
            };
            SceneTools.getRandomNum = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
            SceneTools.getRandomPt = function (focusX, focusY, min, max, pt) {
                pt = pt || Pool.alloc(Point);
                var rx0 = SceneTools.getRandomNum(min, max);
                var ry0 = SceneTools.getRandomNum(min, max);
                var rx = SceneTools.tmpRandom[Math.floor(Math.random() * 2)] * rx0;
                var ry = SceneTools.tmpRandom[Math.floor(Math.random() * 2)] * ry0;
                var cnt = 0;
                while (!scene_14.MapData.ins.isPointLegal(focusX + rx, focusY + ry)) {
                    rx0 = SceneTools.getRandomNum(min, max);
                    ry0 = SceneTools.getRandomNum(min, max);
                    rx = SceneTools.tmpRandom[Math.floor(Math.random() * 2)] * rx0;
                    ry = SceneTools.tmpRandom[Math.floor(Math.random() * 2)] * ry0;
                    cnt++;
                    if (cnt >= 50) {
                        return pt.setTo(focusX, focusY);
                    }
                }
                pt.setTo(focusX + rx, focusY + ry);
                return pt;
            };
            SceneTools.getRandomTeamPt = function (focusX, focusY, idx, pt) {
                var min = (idx - 1) * 2 + 2;
                var max = (idx - 1) * 2 + 5;
                return this.getRandomPt(focusX, focusY, min, max, pt);
            };
            /** 镜头跟随id */
            SceneTools.setFocusEntityId = function (focus_id) {
                this.focusEntityId = focus_id;
            };
            /** 是否为主视角*/
            SceneTools.isFocusEntity = function (tarId) {
                if (!this.focusEntityId)
                    return false;
                return this.focusEntityId.equals(tarId);
            };
            /**
             * 是否震屏
             * @param sceneType
             */
            SceneTools.isOptimizeScene = function (sceneType) {
                return true;
            };
            SceneTools.isShieldingSkillEft = function (target) {
                if (!target) {
                    return true;
                }
                if (this.isMainPlayer(target.vo.entity_id)) {
                    return false;
                }
                if (!(target instanceof scene_14.GPlayer)) {
                    return false;
                }
                // let scene = target.parent as Scene;
                // let sceneType = scene && scene.sceneType;
                // if (!this.isOptimizeScene(sceneType)) {
                //     return false;
                // }
                return gso.jzsj_channel == "jzxy" /* JZXY_SHOUQ */
                    || gso.jzsj_channel == "wanjian" /* WANJIAN_SHOUQ */
                    || gso.jzsj_channel == "yuewanios" /* YUEWANIOS */
                    || gso.jzsj_channel == "youxiios" /* YOUXIIOS */
                    || gso.maskSkillEft;
            };
            /**
             * 是否显示特效
             * @param {boolean} _isSelf
             * @returns {boolean}
             */
            SceneTools.isShowEft = function (_isSelf) {
                return _isSelf ? !gso.isHideSeflEft : (!gso.isHideOtherPlayerEft && !gso.isHideOtherPlayer);
            };
            SceneTools.tmpRandom = [-1, 1];
            return SceneTools;
        }());
        scene_14.SceneTools = SceneTools;
        __reflect(SceneTools.prototype, "game.scene.SceneTools");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var BaseEnterEffect = /** @class */ (function () {
            function BaseEnterEffect(onComplete) {
                this._stepStatus = {};
                this._onComplete = onComplete;
            }
            BaseEnterEffect.prototype.start = function () {
            };
            BaseEnterEffect.prototype.step = function (step) {
                this._stepStatus[step] = true;
                for (var _i = 0, EnterEffectAllStep_1 = game.EnterEffectAllStep; _i < EnterEffectAllStep_1.length; _i++) {
                    var k = EnterEffectAllStep_1[_i];
                    if (!this._stepStatus[k]) {
                        return;
                    }
                }
                this.stop(true);
            };
            BaseEnterEffect.prototype.stop = function (callComplete) {
                if (callComplete === void 0) { callComplete = false; }
                var h = this._onComplete;
                // this._onComplete = null;
                if (callComplete && h) {
                    h.exec();
                }
                this._stepStatus = {};
                // Pool.release(h);
            };
            BaseEnterEffect.prototype.update = function (time) {
            };
            return BaseEnterEffect;
        }());
        scene.BaseEnterEffect = BaseEnterEffect;
        __reflect(BaseEnterEffect.prototype, "game.scene.BaseEnterEffect", ["base.UpdateItem"]);
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Handler = base.Handler;
        var Event = egret.Event;
        var PlayerHp = /** @class */ (function (_super) {
            __extends(PlayerHp, _super);
            function PlayerHp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            PlayerHp.prototype.initDsp = function () {
                _super.prototype.initDsp.call(this);
                this.height = 14;
                this.width = 134;
                this.hpWidth = 132;
            };
            PlayerHp.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                this.getBgRes();
                this.getHpRes();
                this.getGridRes();
            };
            PlayerHp.prototype.getHpRes = function () {
                this.bmpHp.addEventListener(Event.COMPLETE, this.onGetBmpHp, this);
                this.bmpHp.source = "scene_hp_lv";
            };
            PlayerHp.prototype.getBgRes = function () {
                this.bmpBg.addEventListener(Event.COMPLETE, this.onGetBmpBg, this);
                this.bmpBg.source = "scene_hp_di";
            };
            PlayerHp.prototype.getGridRes = function () {
                this.switchGridType();
            };
            PlayerHp.prototype.onGetBmpHp = function () {
                this.bmpHp.y = (this.height - 12) * 0.5;
            };
            PlayerHp.prototype.onGetBmpBg = function () {
                this.bmpBg.y = (this.height - 14) * 0.5;
            };
            PlayerHp.prototype.switchGridType = function (type) {
                var color = "scene_hp_lv_line";
                if (type == 1 /* Red */) {
                    color = "scene_hp_hong_line";
                }
                game.AssetsMgr.ins.getResAsync(color, Handler.alloc(this, this.onGetBmpGrid));
            };
            PlayerHp.prototype.onRelease = function () {
                _super.prototype.onRelease.call(this);
            };
            return PlayerHp;
        }(scene.BaseHp));
        scene.PlayerHp = PlayerHp;
        __reflect(PlayerHp.prototype, "game.scene.PlayerHp");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var TimeMgr = base.TimeMgr;
        var MonsterVo = game.scene.MonsterVo;
        var Handler = base.Handler;
        var Point = egret.Point;
        var Scene = game.scene.Scene;
        var AttackAct = game.scene.AttackAct;
        var MoveAct = game.scene.MoveAct;
        var SceneTools = game.scene.SceneTools;
        var Pool = base.Pool;
        var BaseItem = game.scene.BaseItem;
        var facade = base.facade;
        var GDirUtil = game.utils.GDirUtil;
        var SceneUtil = game.mod.SceneUtil;
        /** 通用Ai */
        var CommonAi = /** @class */ (function (_super) {
            __extends(CommonAi, _super);
            function CommonAi() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._tickerCnt = 0;
                //private useSkillInfo: { index?: number, type?: number[], focus?: Long, x?: number, y?: number, tx?: number, ty?: number } = {};
                /** 技能队列 */
                _this._queueSkills = [];
                _this._enableSkills = [];
                //普工技能列表
                _this._commonSkils = [];
                //化神普工
                _this._commonHuashengSkils = [];
                _this._isSprintAI = false;
                //protected _intervalTime = 0;
                //protected _preAtkTime = 0;
                _this._startAtk = true;
                _this._tolerance = 1;
                //其他技能的时间戳
                _this._otherSkillTime = 0;
                _this.isAtked = false;
                _this.isDoneSprint = true;
                return _this;
            }
            CommonAi.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                var self = this;
                self._proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                self.resetData();
                this._cellWidth = scene.MapData.ins.cellWidth;
                this._open = true;
            };
            CommonAi.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                var self = this;
                self.player = self.parent;
                //self.player = MainGPlayer.ins;
                self.scene = self.player.parent;
                self._proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                // self._proxyXianfa = facade.retMod(ModName.Xianfa).retProxy(ProxyType.Xianfa);
                // self._proxyXianjian = facade.retMod(ModName.Surface).retProxy(ProxyType.Xianjian);
                var param = game.getConfigByNameId("param.json" /* Param */, "normal_skill");
                this._commonSkils = param.value[0];
                var paramHuashen = game.getConfigByNameId("param.json" /* Param */, "huashen_attack");
                this._commonHuashengSkils[0] = paramHuashen.value;
                var cfg = game.getConfigByNameId("scene.json" /* Scene */, this._proxy.curSceneIdx);
                if (!cfg) {
                    console.error("场景id:" + this._proxy.curSceneIdx + " cfg 配置空了");
                    return;
                }
                this._isSprintAI = (cfg.sprint_ai == 1);
            };
            Object.defineProperty(CommonAi.prototype, "curTarget", {
                /** 当前选中目标 */
                get: function () {
                    return this._curTarget;
                },
                set: function (v) {
                    this._curTarget = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CommonAi.prototype, "open", {
                get: function () {
                    return this._open;
                },
                set: function (value) {
                    var self = this;
                    self._open = value;
                    if (!value) {
                        self.curTarget = null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            CommonAi.prototype.startAtk = function () {
                this._startAtk = true;
            };
            CommonAi.prototype.stopAtk = function () {
                this._startAtk = false;
            };
            CommonAi.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                this.ticker();
            };
            CommonAi.prototype.ticker = function () {
                var self = this;
                if (!self._open || !self.player || !self.scene || gso.dbg_stop_ai) {
                    return;
                }
                if (!this.preTime) {
                    this.preTime = TimeMgr.time.time;
                }
                // if(TimeMgr.time.time - this.preTime > 2000 && this.isAtked){
                //     this.preTime = TimeMgr.time.time;
                //     self.player.showCommonAtkEfect();
                // }
                if (self._isUsingSkill && self._lastUsingTime != undefined && TimeMgr.time.serverTime - self._lastUsingTime >= 2000) {
                    console.log("使用技能后，超过2秒没有返回正确结果！", self.player.vo.x, self.player.vo.y, self.curTarget && self.curTarget.x, self.curTarget && self.curTarget.y);
                    self._isUsingSkill = false;
                }
                if (self._isUsingSkill) {
                    return;
                }
                //判定对象是否活着的，是否眩晕
                if (!SceneTools.isSelfReady(self.player.vo)) {
                    return;
                }
                var curAct = self.player.actMgr.curAct;
                if (curAct && (curAct instanceof MoveAct || curAct instanceof AttackAct) && !curAct.isAbort && !curAct.isDone) {
                    return;
                }
                //判读是否处于CD 时间内
                var speed = game.RoleVo.ins.atkspeed || gso.defaultSpeed;
                var CDTime = speed / 10; //speed/10000*1000;
                var lastUsingTime = self._lastUsingTime || 0;
                var delay = TimeMgr.time.serverTime - lastUsingTime;
                if (delay <= CDTime) {
                    //console.log("主角处于公共CD时间内");
                    return;
                }
                if (!self.findTarget()) {
                    return;
                }
                var skillIdx = self.getEnableSkillIdx();
                if (!skillIdx) {
                    return;
                }
                self.attackTarget(skillIdx);
            };
            CommonAi.prototype.findTarget = function () {
                var self = this;
                if (!SceneTools.isTargetReady(self._curTarget)) {
                    self._curTarget = self.commonFindTarget();
                }
                return self._curTarget != null;
            };
            // public setIntervalTime(time:number):void{
            //     //this._intervalTime = time;
            //     //this._preAtkTime = Date.now();
            // }
            /** 攻击目标 */
            CommonAi.prototype.attackTarget = function (skillIdx) {
                var self = this;
                var skillCfg = game.SkillData.getCfg(skillIdx);
                if (!skillCfg) {
                    console.error("缺少技能 id = " + skillIdx + " 配置");
                    return;
                }
                var targetVo = self.curTarget;
                if (!targetVo) {
                    return;
                }
                var target = this.scene.ctrl.getObj(targetVo.entity_id);
                if (!target) {
                    this.curTarget = null;
                    return;
                }
                // if(target instanceof  Monster && target.isBoss()){
                //     // if(!target.bodyIsShow()){
                //     //     return;
                //     // }
                // }
                // if(Date.now() - this._preAtkTime <= this._intervalTime){
                //     return;
                // }
                //
                // this._intervalTime = 0;
                //target.vo.x = target.x / 32;
                //target.vo.y = target.y / 32;
                //防止vo 数据跟 实际 坐标不一致
                // self._tmpTile = MapData.ins.getCellPt(target.x, target.x,self._tmpTile);
                // target.vo.x = self._tmpTile.x;
                // target.vo.y = self._tmpTile.y;
                var curDis = game.PointUtil.distance(self.player.vo.x, self.player.vo.y, target.vo.x, target.vo.y);
                var dis = skillCfg.max_distance;
                if (targetVo instanceof MonsterVo && targetVo.index) {
                    var cfg = game.getConfigByNameId("monster1.json" /* Monster */, targetVo.index);
                    if (cfg && cfg.hit_scope) {
                        dis += cfg.hit_scope; // * this._cellWidth;
                    }
                }
                //像素比较
                if (this._startAtk && (curDis <= (dis + this._tolerance) || skillCfg.max_distance == 0)) {
                    var dir = GDirUtil.directionByTan2(self.player.vo.x, self.player.vo.y, targetVo.x, targetVo.y);
                    self.player.dir = dir;
                    this.turnPetDir(dir);
                    this.isAtked = true;
                    //记录最近一次仙法释放的时间戳
                    var ssData = game.SpecialSkillList[skillCfg.type1];
                    if (ssData) {
                        ssData.preTime = TimeMgr.time.time;
                    }
                    self.useSkill(skillIdx); //攻击范围内直接攻击
                    //普工特效
                    if (TimeMgr.time.time - this.preTime > 2000 && this.isAtked && !game.SkillData.isHuashenXing()) {
                        this.preTime = TimeMgr.time.time;
                        self.player.showCommonAtkEfect();
                    }
                    return;
                }
                else {
                    if (!this._isSprintAI) {
                        this.curTarget = null;
                        return;
                    }
                    if (targetVo.hashCode != self.player.hashCode && self.isDoneSprint) {
                        var dir = GDirUtil.directionByTan2(targetVo.x, targetVo.y, self.player.vo.x, self.player.vo.y);
                        var cellXY = Pool.alloc(Point);
                        cellXY.setTo(targetVo.x, targetVo.y);
                        for (var i = dis; i > 1; i--) {
                            cellXY = this.getCellXY(targetVo.x, targetVo.y, self.player.vo.x, self.player.vo.y, dir, dis);
                            if (scene.MapData.ins.isPointLegal(cellXY.x, cellXY.y)) {
                                break;
                            }
                        }
                        var path = Scene.findPath(self.player.vo.x, self.player.vo.y, cellXY.x, cellXY.y);
                        this.isDoneSprint = false;
                        self.player.movePath(path, Handler.alloc(this, function () {
                            self.isDoneSprint = true;
                        }), 1 /* Sprint */);
                    }
                }
            };
            //被攻击者为中心
            // x1 y1 为被攻击者格子坐标 x2,y2 为攻击者格子坐标
            CommonAi.prototype.getCellXY = function (x1, y1, x2, y2, dir, atkDis) {
                var x = x1;
                var y = y1;
                var dis = Math.min(4, atkDis - 1);
                if (dir == 2 /* RIGHT_UP */) {
                    x += dis;
                    y -= dis;
                }
                else if (dir == 3 /* RIGHT */) {
                    x += dis;
                }
                else if (dir == 4 /* RIGHT_DOWN */) {
                    x += dis;
                    y += dis;
                }
                else if (dir == 8 /* LEFT_UP */) {
                    x -= dis;
                    y -= dis;
                }
                else if (dir == 7 /* LEFT */) {
                    x -= dis;
                }
                else if (dir == 6 /* LEFT_DOWN */) {
                    x -= dis;
                    y += dis;
                }
                return Pool.alloc(Point).setTo(x, y);
            };
            CommonAi.prototype.turnPetDir = function (dir) {
                var sceneProxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                var petList = sceneProxy.getVosByType(4 /* PET */) || [];
                var roleId = this.player.vo.entity_id.toNumber();
                for (var i = 0; i < petList.length; i++) {
                    var data = petList[i];
                    var master_id = data.master_id.toNumber();
                    if (master_id == roleId) {
                        var obj = this.scene.ctrl.getObj(data.entity_id);
                        if (obj.dir != dir) {
                            obj.dir = dir;
                        }
                    }
                }
            };
            CommonAi.prototype.useSkill = function (skillIdx) {
                if (!game.SkillData.isCommonAtk(skillIdx)) {
                    console.log("前端主角 通知后端 释放 useSkill = " + skillIdx);
                }
                //console.log("前端主角 通知后端 释放 useSkill = " + skillIdx);
                var self = this;
                self._isUsingSkill = true;
                self._lastUsingTime = TimeMgr.time.serverTime;
                self._lastUsingIdx = skillIdx;
                var entityId = self.curTarget.entity_id;
                self.curTarget.isTarget = true;
                var type = game.SkillData.getActIdx(skillIdx);
                SceneUtil.useSkill(skillIdx, entityId, type, self.player.vo.x, self.player.vo.y, self.curTarget.x, self.curTarget.y);
            };
            /** 获取能使用的技能 */
            CommonAi.prototype.getEnableSkillIdx = function () {
                var self = this;
                var skillId = 0;
                var skill;
                skill = self.getQueueSkill();
                if (skill) {
                    return skill.skill_idx;
                }
                //if (TimeMgr.time.serverTime - SkillData.USE_SKILL_TIME >= SkillData.NEXT_SKILL_CD) {
                skill = self.getReadySkill();
                skillId = skill && skill.skill_idx;
                //}
                if (!skill) {
                    if (game.SkillData.isHuashenXing()) {
                        //化神变身后，走的是化神普工
                        skillId = self.getCommonAtk(this._commonHuashengSkils || []);
                    }
                    else {
                        //化神变身前，走的是正常的普工
                        skillId = self.getCommonAtk(this._commonSkils);
                    }
                    if (self.player && self.player.vo) {
                        var skill2 = self.player.vo.skillsMap[skillId];
                        if (!game.SkillData.isEnable(skill2)) {
                            //处于普工CD 时间内
                            return 0;
                        }
                    }
                }
                return skillId;
            };
            /** 获取普通攻击 包括化神普工*/
            CommonAi.prototype.getCommonAtk = function (commonSkils) {
                var commonSkillId = 0;
                var len = commonSkils.length;
                if (len == 1) {
                    commonSkillId = commonSkils[0];
                }
                else {
                    var idx = Math.ceil(Math.random() * len);
                    commonSkillId = commonSkils[idx - 1] || commonSkils[0];
                }
                return commonSkillId;
            };
            /** 获取队列中技能 */
            CommonAi.prototype.getQueueSkill = function () {
                var self = this;
                var len = self._queueSkills.length;
                if (len == 0) {
                    return null;
                }
                for (var i = 0; i < len; ++i) {
                    var skill = self._queueSkills[i];
                    if (game.SkillData.isEnable(skill)) {
                        return game.ArrayUtil.removeAt(self._queueSkills, i);
                    }
                }
                return null;
            };
            /** 随机获取冷却好的技能 */
            CommonAi.prototype.getReadySkill = function () {
                var self = this;
                var skills = self.player.vo.skills;
                if (!skills || !skills.length) {
                    return null;
                }
                self._enableSkills.length = 0;
                var roleOtherSpecialList = [];
                var roleSpecialListMap = {};
                for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
                    var s = skills_1[_i];
                    if (game.SkillData.isEnable(s)) {
                        if (this._commonSkils.indexOf(s.skill_idx) > -1) {
                            //把普工过滤掉
                            continue;
                        }
                        if (game.SkillData.isHuashenCommonSkill(s.skill_idx)) {
                            //化神普工
                            //this._commonHuashengSkils.push(s.skill_idx);
                            continue;
                        }
                        // if(SkillData.isHuashenSkill(s.skill_idx)){
                        //     //过滤化神技能，化神技能需要手动释放
                        //     continue;
                        // }
                        if (game.SkillData.isSpecialSkill(s.skill_idx)) {
                            var skillCfg = game.SkillData.getCfg(s.skill_idx);
                            var ssData = game.SpecialSkillList[skillCfg.type1];
                            if (TimeMgr.time.time - ssData.preTime < ssData.delay) {
                                //上一次释放技能间隔时间少于 ssData.delay 秒，过滤掉
                                continue;
                            }
                            if (!roleSpecialListMap[skillCfg.type1]) {
                                roleSpecialListMap[skillCfg.type1] = [];
                            }
                            roleSpecialListMap[skillCfg.type1].push(s);
                            continue;
                        }
                        if (game.SkillData.isSpecialSkill2(s.skill_idx)) {
                            if (TimeMgr.time.time - game.SpecialSkillList2.preTime < game.SpecialSkillList2.delay) {
                                //上一次释放技能间隔时间少于 20000 秒，过滤掉
                                continue;
                            }
                            roleOtherSpecialList.push(s);
                            continue;
                        }
                        self._enableSkills.push(s);
                    }
                }
                //处理仙法技能释放顺序和间隔
                //let xianfaList:number[] = self._proxyXianfa.skills;
                // if(roleSpecialListMap[SkillType1.Immortal]){
                //     let ssData:SpecialSkillData = SpecialSkillList[SkillType1.Immortal];
                //     this.processSpecialSkill(roleSpecialListMap[SkillType1.Immortal],ssData.preSkillId);
                // }
                //
                // //处理仙剑技能释放顺序和间隔
                // //let xianjianList:number[] = self._proxyXianjian.skills;
                // if(roleSpecialListMap[SkillType1.Xianjian]){
                //     let ssData:SpecialSkillData = SpecialSkillList[SkillType1.Xianjian];
                //     this.processSpecialSkill(roleSpecialListMap[SkillType1.Xianjian],ssData.preSkillId);
                // }
                //处理仙法 仙剑
                for (var skillType1 in roleSpecialListMap) {
                    var ssData = game.SpecialSkillList[skillType1];
                    this.processSpecialSkill(roleSpecialListMap[skillType1], ssData.preSkillId);
                }
                //处理 神兵 坐骑 元灵
                this.processSpecialSkill2(roleOtherSpecialList);
                if (self._enableSkills.length == 0) {
                    return null;
                }
                var len = self._enableSkills.length;
                var idx = Math.ceil(Math.random() * len);
                return self._enableSkills[idx - 1] || self._enableSkills[0];
            };
            CommonAi.prototype.processSpecialSkill2 = function (roleSpecialList) {
                if (roleSpecialList && roleSpecialList.length > 0) {
                    //放优先级最高的技能进队列
                    var index = 0;
                    for (var i = 0; i < roleSpecialList.length; i++) {
                        var s = roleSpecialList[i];
                        if (s.skill_idx == game.SpecialSkillList2.preSkillId) {
                            index = i + 1;
                            break;
                        }
                    }
                    index = index >= roleSpecialList.length ? 0 : index;
                    this._enableSkills.push(roleSpecialList[index]);
                }
            };
            /** 注意 skills 不是玩家已经挂上的技能，这里只是为了他的顺序 */
            CommonAi.prototype.processSpecialSkill = function (roleSpecialList, preSkillId) {
                if (roleSpecialList && roleSpecialList.length > 0) {
                    //放优先级最高的技能进队列
                    var result = null;
                    if (preSkillId == 0) {
                        // for(let i = 0; i < skills.length;i++) {
                        //     let skillID = skills[i];
                        //     let s = roleSpecialList[skillID];
                        //     if (s) {
                        //         result = s;
                        //         break;
                        //     }
                        // }
                        result = roleSpecialList[0];
                    }
                    else {
                        var index = 0;
                        for (var i = 0; i < roleSpecialList.length; i++) {
                            var s = roleSpecialList[i];
                            if (s.skill_idx == preSkillId) {
                                index = i + 1;
                                break;
                            }
                        }
                        index = index >= roleSpecialList.length ? 0 : index;
                        result = roleSpecialList[index];
                    }
                    this._enableSkills.push(result);
                }
            };
            // /** 添加下一个技能 服务器控制 */
            // public addNextSkill(skill: scene_skill) {
            //     let self = this;
            //     if (self.player.vo.isTie) {
            //         PromptBox.getIns().show(getLanById(LanDef.tie_tips));
            //         return;
            //     }
            //     if (!SkillData.isEnable(skill)) {
            //         return;
            //     }
            //
            //     if (!this.hasAttackTarget()) {//没有目标，屏蔽支持空技能
            //         return;
            //     }
            //
            //     if (self._queueSkills.length > 0) {
            //         let last = self._queueSkills[self._queueSkills.length - 1];
            //         if (last.skill_idx == skill.skill_idx) {
            //             if(skill.skill_idx == 123801000) {
            //                 if(!gso.isAutoUseGodSkill){
            //                     PromptBox.getIns().show(getLanById(LanDef.zhujineng_tips));
            //                 }
            //             }
            //             return;
            //         }
            //     }
            //     self._queueSkills.push(skill);
            // }
            //
            // /** 服务端控制的情况下，主动释放技能  服务器控制*/
            // private activelyUseSkill(skill: scene_skill) {
            //     let self = this;
            //     if (!SceneTools.isTargetReady(self.curTarget)) {
            //         self.curTarget = self.commonFindTarget();
            //     }
            //
            //     if (!this.hasAttackTarget()) {//没有目标，屏蔽支持空技能
            //         return;
            //     }
            //
            //     self.attackTarget(skill.skill_idx);
            // }
            /** 清除能使用技能状态 */
            CommonAi.prototype.clearUsingSkillStatus = function () {
                this._isUsingSkill = false;
            };
            /** 寻找目标 */
            CommonAi.prototype.commonFindTarget = function () {
                if (this._proxy.foeTargetId) {
                    //优先攻击目标
                    var vo = this._proxy.getVoById(this._proxy.foeTargetId);
                    if (vo) {
                        return vo;
                    }
                }
                return this.findMinDisTarget(3 /* MONSTER */); //获取怪物，区分ObjectType，敌人攻击走上面
            };
            CommonAi.prototype.findMinDisTarget = function (type) {
                var enemies = this._proxy.getEnemyVos(type);
                if (!enemies || 0 == enemies.length) {
                    return null;
                }
                var minIdx = 0;
                var minDis = 0;
                for (var i = 0, l = enemies.length; i < l; ++i) {
                    var vo = enemies[i];
                    if (!SceneTools.isTargetReady(vo)) {
                        continue;
                    }
                    var dis = game.PointUtil.distanceSquare(this.player.vo.x, this.player.vo.y, vo.x, vo.y);
                    if (!minDis || dis < minDis) {
                        minDis = dis;
                        minIdx = i;
                    }
                }
                var targetVo = enemies[minIdx];
                if (!SceneTools.isTargetReady(targetVo)) {
                    return null;
                }
                return targetVo;
            };
            /** 开始挂机 */
            CommonAi.prototype.startHangUp = function () {
                var self = this;
                self._tickerCnt = 99;
                self.open = true;
                this.isAtked = false;
            };
            /** 停止挂机 */
            CommonAi.prototype.stopHandUp = function () {
                var self = this;
                self.resetData();
                var curAct = self.player.actMgr.curAct;
                if (curAct instanceof MoveAct) {
                    curAct.abort();
                }
                self.player.actMgr.removeAllActByCls(MoveAct);
                self.player.checkAct();
            };
            CommonAi.prototype.resetData = function () {
                var self = this;
                self.open = false;
                self._isUsingSkill = false;
                self._lastUsingTime = undefined;
                self._lastUsingIdx = undefined;
                self.curTarget = null;
                self._queueSkills.length = 0;
                this.isAtked = false;
                for (var k in game.SpecialSkillList) {
                    game.SpecialSkillList[k].preTime = 0;
                    game.SpecialSkillList[k].preSkillId = 0;
                }
                game.SpecialSkillList2.preSkillId = 0;
                game.SpecialSkillList2.preTime = 0;
            };
            CommonAi.prototype.onRelease = function () {
                _super.prototype.onRelease.call(this);
                var self = this;
                self._queueSkills.length = 0;
                self.player = null;
                self.scene = null;
                self._tickerCnt = 0;
                this.isAtked = false;
            };
            //获取可攻击目标
            CommonAi.prototype.getAttackTarget = function () {
                var curTarget = this.commonFindTarget(); //用寻怪来判断
                if (!curTarget) {
                    return null;
                }
                return curTarget;
            };
            return CommonAi;
        }(BaseItem));
        scene.CommonAi = CommonAi;
        __reflect(CommonAi.prototype, "game.scene.CommonAi");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var TextField = egret.TextField;
        var VerticalAlign = egret.VerticalAlign;
        var BaseName = /** @class */ (function (_super) {
            __extends(BaseName, _super);
            function BaseName() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(BaseName.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    // let s: ISceneProxy
                },
                enumerable: true,
                configurable: true
            });
            BaseName.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                var self = this;
                self._headMdr = self.parent;
                self._actor = self._headMdr.parent;
            };
            Object.defineProperty(BaseName.prototype, "text", {
                set: function (value) {
                    this._textField.text = value;
                    this.width = this._textField.textWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseName.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this._textField.height = value;
                },
                enumerable: true,
                configurable: true
            });
            BaseName.prototype.initDsp = function () {
                _super.prototype.initDsp.call(this);
                this._textField = new TextField();
                this._textField.verticalAlign = VerticalAlign.MIDDLE;
                // this._textField.stroke = 1;
                this._textField.size = 20;
                this._textField.textColor = 0xffffff;
                this.height = 22;
                this.dsp.addChild(this._textField);
            };
            Object.defineProperty(BaseName.prototype, "color", {
                set: function (color) {
                    this._textField.textColor = color;
                },
                enumerable: true,
                configurable: true
            });
            BaseName.prototype.onRelease = function () {
                this._actor = this._headMdr = null;
                this._textField.text = undefined;
                this._textField.textColor = 0xffffff;
                _super.prototype.onRelease.call(this);
            };
            return BaseName;
        }(scene.BaseDraw));
        scene.BaseName = BaseName;
        __reflect(BaseName.prototype, "game.scene.BaseName");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var Tween = base.Tween;
        var Handler = base.Handler;
        var CloudEffect = /** @class */ (function (_super) {
            __extends(CloudEffect, _super);
            function CloudEffect() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._imgs = [];
                return _this;
            }
            CloudEffect.getIns = function (onComplete) {
                var self = this;
                if (!self._ins) {
                    self._ins = new CloudEffect(onComplete);
                }
                return self._ins;
            };
            CloudEffect.prototype.start = function () {
                _super.prototype.start.call(this);
                var parent = game.Layer.tip;
                var sw = gso.gameStage.stageWidth;
                var sh = gso.gameStage.stageHeight;
                var isFullScene = sw >= 1700;
                var imgW = isFullScene ? 1206 * sw / gso.contentWidth : 680 * 2.5 * sw / gso.contentWidth;
                var imgH = isFullScene ? gso.contentHeight : 864 * 2.5 * sh / gso.contentHeight;
                var imgSrc = isFullScene ? "scene_cloud2" : "scene_cloud";
                var leftX = -(imgW + parent.x);
                var rightX = sw - parent.x;
                var img = Pool.alloc(game.BitmapBase);
                img.source = game.ResUtil.getUiPng(imgSrc);
                img.width = imgW;
                img.height = imgH;
                img.y = (sh - img.height) * 0.5;
                img.x = leftX;
                parent.addChild(img);
                this._imgs.push(img);
                var hideTime = isFullScene ? 1000 : 1500;
                var moveDis = sw + 100;
                var showTime = isFullScene ? 700 : 200;
                Tween.get(img).to({ x: leftX + moveDis }, showTime).to({ x: rightX }, hideTime).exec(Handler.alloc(this, this.step, ["anim" /* ANIM */]));
                img = Pool.alloc(game.BitmapBase);
                img.source = game.ResUtil.getUiPng(imgSrc);
                img.width = imgW;
                img.height = imgH;
                img.y = (sh - img.height) * 0.5;
                img.x = rightX;
                parent.addChild(img);
                this._imgs.push(img);
                Tween.get(img).to({ x: rightX - moveDis }, showTime).to({ x: leftX }, hideTime);
            };
            CloudEffect.prototype.stop = function (callComplete) {
                if (callComplete === void 0) { callComplete = false; }
                while (this._imgs.length) {
                    var img = this._imgs[0];
                    if (img) {
                        Tween.remove(img);
                        if (img.parent) {
                            img.parent.removeChild(img);
                        }
                    }
                    game.ArrayUtil.removeAt(this._imgs, 0);
                    Pool.release(img);
                }
                _super.prototype.stop.call(this, callComplete);
            };
            return CloudEffect;
        }(scene.BaseEnterEffect));
        scene.CloudEffect = CloudEffect;
        __reflect(CloudEffect.prototype, "game.scene.CloudEffect");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_15) {
        var Pool = base.Pool;
        var TimeMgr = base.TimeMgr;
        //瓢字类管理
        var STxtMgr = /** @class */ (function () {
            function STxtMgr() {
                this._queueNum = [];
            }
            Object.defineProperty(STxtMgr, "ins", {
                get: function () {
                    var i = this._ins;
                    if (i == null) {
                        this._ins = i = new STxtMgr();
                    }
                    return i;
                },
                enumerable: true,
                configurable: true
            });
            STxtMgr.prototype.init = function (scene) {
                this._scene = scene;
                TimeMgr.addUpdateItem(this);
            };
            //private time
            STxtMgr.prototype.show = function (dmgStr, x, y, dir, types, delay, target) {
                var self = this;
                if (!self._scene.isShow) {
                    return;
                }
                // if(Date.now()-this.time < 10000){
                //     return ;
                // }
                // this.time = Date.now();
                //玩家
                var isMain = false;
                var mainPlayer = scene_15.MainGPlayer.ins;
                if (target && target.enType == 1 /* PLAYER */) {
                    y -= 80;
                    if (target instanceof scene_15.MainGPlayer) {
                        isMain = true;
                    }
                }
                else if (target && target.enType == 3 /* MONSTER */) {
                    if (target.vo.monsterType == 2 /* Boss */) {
                        y -= 100;
                    }
                    else {
                        y -= 50;
                    }
                }
                else {
                    y -= 50;
                }
                // if(isMain){
                //     dir = MathUtil.randomDir(Direction.NONE);
                // }else{
                if (mainPlayer && target.x > mainPlayer.x) {
                    dir = 1;
                }
                else {
                    dir = 2;
                }
                // }
                // if(dmgStr != "0"){
                //     dmgStr += "00"+target.vo.entity_id;
                // }
                var type = 1;
                var maxN = -1;
                var config;
                for (var i = 0; i < types.length; i++) {
                    var t = types[i];
                    var cfg = game.getConfigByNameId("battle_figure.json" /* BattleFigure */, t);
                    //主角收到暴击
                    if (isMain && t == 11 /* CRITICAL */) {
                        type = 17 /* ROLE_ATK */;
                        config = game.getConfigByNameId("battle_figure.json" /* BattleFigure */, 17 /* ROLE_ATK */);
                        break;
                    }
                    if (cfg.layer > maxN) {
                        maxN = cfg.layer;
                        type = t;
                        config = cfg;
                    }
                }
                var actArray = STxtMgr._actArrayMap[type];
                if (!actArray && !config.actAtr) {
                    //例子
                    try {
                        //let act_json = "{\"total\":[{\"to\":{\"scale\":11,\"alpha\":1},\"time\":100},{\"delay\":100},{\"parabolic\":{\"scale\":2,\"alpha\":1,\"move\":{\"x\":200,\"y\":200,\"dir\":3}},\"time\":500}]}";
                        //let act_json = "{\"total\":[{\"to\":{\"scale\":0.2,\"alpha\":1},\"time\":100},{\"delay\":1000000}]}";
                        //let act_json = "{\"total\":[{\"to\":{\"scale\":1,\"alpha\":0},\"time\":10000}]}";
                        var atcObj = JSON.parse(config.act_json);
                        actArray = atcObj.total;
                        STxtMgr._actArrayMap[type] = actArray;
                    }
                    catch (e) {
                        console.error("战斗瓢字表 伤害类型 " + type + " act_json 字段填写错了");
                    }
                }
                var v = dmgStr;
                var bmp = Pool.alloc(scene_15.BaseBmpNum);
                bmp.setText(v, x, y, dir, type, config.font_name, actArray, config.has_word, isMain, config.actAtr);
                //if (delay > 0) {
                bmp.showTime = TimeMgr.time.serverTime + (delay || 0);
                self._queueNum.push(bmp);
                TimeMgr.addUpdateItem(self);
                // } else {
                //     self.addNum(bmp);
                // }
            };
            STxtMgr.prototype.update = function (time) {
                if (this._queueNum.length == 0) {
                    //TimeMgr.removeUpdateItem(this);
                    return;
                }
                var one = 0;
                for (var i = 0; i < this._queueNum.length; ++i) {
                    var num = this._queueNum[i];
                    if (time.serverTime < num.showTime) {
                        continue;
                    }
                    this.addNum(num);
                    game.ArrayUtil.removeAt(this._queueNum, i);
                    --i;
                    one++;
                    if (one > 5) {
                        break;
                        break;
                    }
                }
            };
            STxtMgr.prototype.addNum = function (bmp) {
                this._scene.add(bmp);
            };
            STxtMgr.prototype.clean = function () {
                TimeMgr.removeUpdateItem(this);
                this._queueNum.length = 0;
            };
            STxtMgr._actArrayMap = {};
            return STxtMgr;
        }());
        scene_15.STxtMgr = STxtMgr;
        __reflect(STxtMgr.prototype, "game.scene.STxtMgr", ["base.UpdateItem"]);
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_16) {
        var Pool = base.Pool;
        var BaseSceneCtrl = /** @class */ (function () {
            function BaseSceneCtrl() {
            }
            BaseSceneCtrl.prototype.getObj = function (id) {
                if (!id)
                    return null;
                return this._objMap[id.toString()];
            };
            // public getSoulWare(id: Long): SoulWare {
            //     if (!id) return null;
            //     return this._soulWareMap[id.toString()];
            // }
            // public getGory(id: Long): Gory {
            //     if (!id) return null;
            //     return this._goryMap[id.toString()];
            // }
            BaseSceneCtrl.prototype.getObjMap = function () {
                return this._objMap;
            };
            BaseSceneCtrl.prototype.init = function (mapId, scene) {
                if (mapId == this._mapId) {
                    return;
                }
                this._scene = scene;
                this._mapId = mapId;
                this._objMap = {};
                this._rideMap = {};
                //this._soulWareMap = {};
                //this._goryMap = {};
                this._ghostIdx = 0;
                this._ghost = {};
                if (DEBUG) {
                    this.objDebugMap = {};
                }
                this.onInit();
            };
            BaseSceneCtrl.prototype.getRide = function (id) {
                return this._rideMap[id.toString()];
            };
            BaseSceneCtrl.prototype.addRide = function (obj) {
                var self = this;
                var idx = obj.vo["master_id"].toString();
                self._rideMap[idx] = obj;
                self._scene.addActor(obj);
                this.onObjAdded(obj);
            };
            BaseSceneCtrl.prototype.removeRide = function (obj) {
                var _obj;
                if (obj instanceof scene_16.Ride) {
                    _obj = obj;
                }
                else {
                    _obj = this._rideMap[obj];
                }
                if (!_obj || !_obj.vo || !_obj.vo.master_id)
                    return;
                delete this._rideMap[_obj.vo.master_id.toString()];
                this._scene.removeActor(_obj);
                this.onRemoved(_obj);
            };
            BaseSceneCtrl.prototype.addObj = function (obj) {
                if (!obj || !obj.vo) {
                    return;
                }
                // if (obj.vo.type == ObjectType.SoulWare) {
                //     let id: Long = (<SoulWareVo>obj.vo).mainId;
                //     this._soulWareMap[id.toString()] = <SoulWare>obj;
                // }
                // else if (obj.vo.type == ObjectType.Gory) {
                //     let id: Long = (<GoryVo>obj.vo).mainId;
                //     this._goryMap[id.toString()] = <Gory>obj;
                // }
                else {
                    var id = obj.vo.type == 6 /* TEAM_PLAYER */ ? obj.vo.role_id : obj.vo.entity_id;
                    this._objMap[id.toString()] = obj;
                }
                this._scene.addActor(obj);
                this.onObjAdded(obj);
            };
            BaseSceneCtrl.prototype.removeById = function (id) {
                //this.removeSoulWare(id);
                return this.removeObj(this.getObj(id));
            };
            // /** 移除灵器*/
            // public removeSoulWare(id: Long) {
            //     this.removeObj(this.getSoulWare(id));
            // }
            BaseSceneCtrl.prototype.removeObj = function (obj) {
                if (obj && obj.vo) {
                    var id = void 0;
                    // if (obj.vo.type == ObjectType.SoulWare) {
                    //     id = (<SoulWareVo>obj.vo).mainId;
                    //     if (id) {
                    //         delete this._soulWareMap[id.toString()];
                    //     }
                    // }
                    // else if (obj.vo.type == ObjectType.Gory) {
                    //     id = (<GoryVo>obj.vo).mainId;
                    //     if (id) {
                    //         delete this._goryMap[id.toString()];
                    //     }
                    // }
                    // else {
                    id = obj.vo.entity_id;
                    if (id) {
                        delete this._objMap[id.toString()];
                    }
                    //}
                    if (!id) {
                        // console.error("移除没有实体id objType:", obj.vo.type);
                        return false;
                    }
                    if (obj.vo.type == 3 /* MONSTER */) {
                        var actor = obj;
                        if (actor.isDying // 技能表现玩就死亡
                            || actor.isDead //当前动作是死亡，而且还没有完成
                        ) {
                            actor.dieDel = true;
                            return true;
                        }
                    }
                    if (obj instanceof scene_16.BaseActor && obj._shadow && !(obj instanceof scene_16.MainGPlayer)) {
                        Pool.release(obj._shadow);
                        if (obj._shadow.dsp && obj._shadow.dsp.parent) {
                            obj._shadow.dsp.parent.removeChild(obj._shadow.dsp);
                        }
                        obj._shadow = null;
                    }
                    this._scene.removeActor(obj);
                    this.onRemoved(obj);
                    return true;
                }
                return false;
            };
            BaseSceneCtrl.prototype.addGhost = function (obj) {
                var self = this;
                self._ghostIdx += 1;
                var idx = obj["_idx"] = self._ghostIdx.toString();
                self._ghost[idx] = obj;
                self._scene.addActor(obj);
                this.onObjAdded(obj);
            };
            BaseSceneCtrl.prototype.removeGhost = function (obj) {
                var idx = obj["_idx"];
                delete this._ghost[idx];
                this._scene.removeActor(obj);
                this.onRemoved(obj);
            };
            /** SceneDebug */
            BaseSceneCtrl.prototype.addDebugObj = function (obj) {
                if (DEBUG) {
                    if (!obj || !obj.vo) {
                        return;
                    }
                    var id = obj.vo.type == 6 /* TEAM_PLAYER */ ? obj.vo.role_id : obj.vo.entity_id;
                    this.objDebugMap[id.toString()] = obj;
                    this._scene.addActor(obj);
                }
            };
            /** SceneDebug */
            BaseSceneCtrl.prototype.removeDebugById = function (id) {
                if (DEBUG) {
                    var obj = this.objDebugMap[id.toString()];
                    delete this.objDebugMap[id.toString()];
                    this._scene.remove(obj);
                }
                return false;
            };
            /** SceneDebug */
            BaseSceneCtrl.prototype.removeDebugAll = function () {
                if (DEBUG) {
                    var list = Object.keys(this.objDebugMap);
                    for (var i = 0, len = list.length; i < len; i++) {
                        this.removeDebugById(list[i]);
                    }
                }
            };
            BaseSceneCtrl.prototype.dispose = function () {
                this._scene = null;
                this._objMap = null;
                this._rideMap = null;
                if (DEBUG) {
                    this.objDebugMap = null;
                }
                this.onDispose();
            };
            BaseSceneCtrl.prototype.onInit = function () {
            };
            BaseSceneCtrl.prototype.onObjAdded = function (obj) {
            };
            BaseSceneCtrl.prototype.onRemoved = function (obj) {
            };
            BaseSceneCtrl.prototype.onDispose = function () {
            };
            return BaseSceneCtrl;
        }());
        scene_16.BaseSceneCtrl = BaseSceneCtrl;
        __reflect(BaseSceneCtrl.prototype, "game.scene.BaseSceneCtrl");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Sprite = egret.Sprite;
        var Pool = base.Pool;
        var Handler = base.Handler;
        var facade = base.facade;
        var AdTitle = /** @class */ (function (_super) {
            __extends(AdTitle, _super);
            function AdTitle() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(AdTitle.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    var self = this;
                    self._width = value;
                    self.dsp.width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AdTitle.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    var self = this;
                    self._height = value;
                    self.dsp.height = value;
                },
                enumerable: true,
                configurable: true
            });
            AdTitle.prototype.initDsp = function () {
                _super.prototype.initDsp.call(this);
                var self = this;
                self.height = 56;
                self._width = 209;
                self._imgDi = self.dsp.addChild(Pool.alloc(game.BitmapBase));
                self._imgDi.source = "ad_vip_di";
                self._imgDi.y = 0;
                self._imgDi.x = 20;
                self._imgTxtVip = self.dsp.addChild(Pool.alloc(game.BitmapBase));
                self._imgTxtVip.source = "vip_txt_vip";
                self._imgTxtVip.y = 20;
                self._imgTxtDao = self.dsp.addChild(Pool.alloc(game.BitmapBase));
                self._imgTxtDao.source = "vip_txt_dao";
                self._imgTxtDao.y = 26;
                self._imgTxtDao.x = 20;
                self._imgTxtSong = self.dsp.addChild(Pool.alloc(game.BitmapBase));
                self._imgTxtSong.source = "vip_txt_song";
                self._imgTxtSong.y = 19;
                self._imgTxtGuan = self.dsp.addChild(Pool.alloc(game.BitmapBase));
                self._imgTxtGuan.source = "vip_txt_guan";
                self._imgTxtGuan.y = 25;
                self._vipFont = new Sprite();
                self.dsp.addChild(self._vipFont);
                self._vipFont.y = 20;
                self._conditionFont = new Sprite();
                self.dsp.addChild(self._conditionFont);
                self._conditionFont.y = 27;
            };
            /**
             * @param {number} lv vip等级
             * */
            AdTitle.getShowVipAdLimit = function (lv) {
                var cfg = game.getConfigByNameId("param.json" /* Param */, "VIP_guankazengsong");
                if (!cfg || !cfg.value) {
                    return null;
                }
                var _limit = null;
                for (var _i = 0, _a = cfg.value; _i < _a.length; _i++) {
                    var _temp = _a[_i];
                    if (_temp[2] > lv) {
                        _limit = _temp;
                        break;
                    }
                }
                return _limit;
            };
            AdTitle.prototype.setTitle = function (_limit) {
                var self = this;
                if (!_limit || self._nextPass == _limit[0]) {
                    return;
                }
                self._nextInfo = _limit;
                self._nextPass = _limit[0];
                var proxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                var len = (proxy.changeIdxToNum(_limit[0])).toString().length;
                var _x = len * 18 - (len - 1) * 5;
                self._conditionFont.x = 47;
                self._imgTxtGuan.x = self._conditionFont.x + _x;
                self._imgTxtSong.x = self._imgTxtGuan.x + 25;
                self._imgTxtVip.x = self._imgTxtSong.x + 29;
                self._vipFont.x = self._imgTxtVip.x + 55;
                self.loadFont("ad_title_num");
                self.loadFont("ad_vip");
                self.x = -self._width * 0.5;
            };
            AdTitle.prototype.loadFont = function (name) {
                var self = this;
                var url = game.ResUtil.getFontUiUrl(name);
                game.LoadMgr.ins.addRef(url);
                game.LoadMgr.ins.loadMerge(url, Handler.alloc(self, self.setVipBmpFont), game.LoadPri.UIScene);
            };
            AdTitle.prototype.setVipBmpFont = function (data, url) {
                var self = this;
                if (!self._nextInfo) {
                    return;
                }
                var vipUrl = game.ResUtil.getFontUiUrl("ad_vip");
                var condiUrl = game.ResUtil.getFontUiUrl("ad_title_num");
                if (url != vipUrl && url != condiUrl) {
                    return;
                }
                var parent = url == vipUrl ? self._vipFont : self._conditionFont;
                for (var i = parent.numChildren - 1; i >= 0; i--) {
                    var c = parent.removeChildAt(i);
                    Pool.release(c);
                }
                var gap = -5;
                var proxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                var text = url == vipUrl ? self._nextInfo[2] + "" : (proxy.changeIdxToNum(self._nextInfo[0])) + "";
                var bmpX = 0;
                for (var i = 0, l = text.length; i < l; ++i) {
                    var bmp = Pool.alloc(game.BitmapBase);
                    bmp.texture = data.getTexture(text[i]);
                    bmp.x = bmpX;
                    bmpX += bmp.texture.textureWidth + gap;
                    parent.addChild(bmp);
                }
            };
            AdTitle.prototype.onRelease = function () {
                var self = this;
                for (var i = self._vipFont.numChildren - 1; i >= 0; i--) {
                    var c = self._vipFont.removeChildAt(i);
                    Pool.release(c);
                }
                for (var i = self._conditionFont.numChildren - 1; i >= 0; i--) {
                    var c = self._conditionFont.removeChildAt(i);
                    Pool.release(c);
                }
                self.releaseByEle(["_nextPass", "_nextInfo", "_imgTxtVip", "_imgDi", "_imgTxtDao", "_imgTxtSong",
                    "_imgTxtGuan", "_vipFont", "_conditionFont"]);
                var vipUrl = game.ResUtil.getFontUiUrl("ad_vip");
                var condiUrl = game.ResUtil.getFontUiUrl("ad_title_num");
                game.LoadMgr.ins.decRef(vipUrl);
                game.LoadMgr.ins.decRef(condiUrl);
                _super.prototype.onRelease.call(this);
                self._isInit = false;
            };
            AdTitle.prototype.releaseByEle = function (ele) {
                var self = this;
                for (var _i = 0, ele_1 = ele; _i < ele_1.length; _i++) {
                    var i = ele_1[_i];
                    if (self[i]) {
                        if (self[i].parent) {
                            self[i].parent.removeChild(self[i]);
                            Pool.release(self[i]);
                        }
                    }
                    self[i] = null;
                }
            };
            return AdTitle;
        }(scene.BaseDraw));
        scene.AdTitle = AdTitle;
        __reflect(AdTitle.prototype, "game.scene.AdTitle");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var TouchEvent = egret.TouchEvent;
        var BaseClickArea = /** @class */ (function (_super) {
            __extends(BaseClickArea, _super);
            function BaseClickArea() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BaseClickArea.prototype.initDsp = function () {
                _super.prototype.initDsp.call(this);
                var self = this;
                self._bmp = Pool.alloc(game.BitmapBase);
                self.dsp.addChild(self._bmp);
                self.width = 100;
                self.height = 100;
                self._bmp.name = "ClickArea";
                self._bmp.addEventListener(TouchEvent.TOUCH_TAP, self.onClickSelf, self);
            };
            BaseClickArea.prototype.onClickSelf = function (e) {
                //facade.sendNt(SceneEvent.ON_SCENE_CLICK, this.parent);
            };
            Object.defineProperty(BaseClickArea.prototype, "clickEnabled", {
                get: function () {
                    return this._bmp.touchEnabled;
                },
                set: function (value) {
                    this._bmp.touchEnabled = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseClickArea.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    var self = this;
                    self._width = value;
                    self._bmp.width = value;
                    self.x = -self._width * 0.5;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseClickArea.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    var self = this;
                    self._height = value;
                    self._bmp.height = value;
                },
                enumerable: true,
                configurable: true
            });
            BaseClickArea.prototype.onRelease = function () {
                _super.prototype.onRelease.call(this);
                this.clickEnabled = false;
            };
            return BaseClickArea;
        }(scene.BaseDraw));
        scene.BaseClickArea = BaseClickArea;
        __reflect(BaseClickArea.prototype, "game.scene.BaseClickArea");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var Texture = egret.Texture;
        var Bitmap = egret.Bitmap;
        var Pool = base.Pool;
        var Handler = base.Handler;
        var TimeMgr = base.TimeMgr;
        var BlurRatio = 20;
        var SceneMap = /** @class */ (function (_super) {
            __extends(SceneMap, _super);
            function SceneMap() {
                var _this = _super.call(this) || this;
                _this._mapId = 0;
                _this._sliceW = 0;
                _this._sliceH = 0;
                _this._initX = 0; //地图初始化位置，水平坐标
                _this._initY = 0; //地图初始化位置，水平坐标
                _this._moveSpeed = 2; //地图移动速度,todo，可以支持配置
                // private _moveLeft: boolean = false;//是否向左移动
                // private _moveUp: boolean = false;//是否向上移动
                _this._initMoveData = false; //是否初始化数据
                _this._isHangUp = false; //是否是挂机移动地图
                _this._waitTime = 120; //秒
                _this._waitCnt = 200;
                _this._lastWaitTime = 0;
                var self = _this;
                self._bmpMap = {};
                self._releaseMap = {};
                self._curShow = [];
                self._waitCnt = egret.Capabilities.os == "iOS" ? 100 : 200; //todo,旧代码
                return _this;
            }
            SceneMap.prototype.init = function (mapId) {
                var self = this;
                self._mapId = mapId;
                self._sliceW = scene.MapData.ins.sliceWidth;
                self._sliceH = scene.MapData.ins.sliceHeight;
                self._moveType = scene.MapData.ins.mapMoveType;
                if (gso.mapMoveType != undefined) {
                    self._moveType = parseInt(gso.mapMoveType);
                }
                self._isHangUp = scene.MapData.ins.isHangUp;
                self._initMoveData = false;
            };
            /**视图变化时重置地图移动数据*/
            SceneMap.prototype.initMoveData = function () {
                var self = this;
                self._initX = self.x = 0;
                self._initY = self.y = 0;
                if (!self._isHangUp) {
                    return;
                }
                if (self._moveType == game.MapMoveType.Null) {
                    return;
                }
                switch (self._moveType) {
                    case game.MapMoveType.Left:
                        self._numC = self._curSC; //向左从第一块地图开始
                        break;
                    case game.MapMoveType.Right:
                        self._numC = self._curEC - 1; //向右从最后一块地图开始
                        break;
                    case game.MapMoveType.Up:
                        self._numR = self._curSR;
                        break;
                    case game.MapMoveType.Down:
                        self._numR = self._curER - 1;
                        break;
                    case game.MapMoveType.LeftUp:
                        self._numC = self._curSC;
                        self._numR = self._curSR;
                        break;
                    case game.MapMoveType.LeftDown:
                        self._numC = self._curSC;
                        self._numR = self._curER - 1;
                        break;
                    case game.MapMoveType.RightUp:
                        self._numC = self._curEC - 1;
                        self._numR = self._curSR;
                        break;
                    case game.MapMoveType.RightDown:
                        self._numC = self._curEC - 1;
                        self._numR = self._curER - 1;
                        break;
                }
                // for (let key in self._bmpMap) {
                //     let bmp = self._bmpMap[key];
                //     let col: number = SceneMap.getCol(key);
                //     let row: number = SceneMap.getRow(key);
                //     bmp.x = col * self._sliceW;
                //     bmp.y = row * self._sliceH;
                //     bmp.setIdx(col, row, self._mapId);
                // }
                self._initMoveData = true;
            };
            SceneMap.prototype.setBlur = function (texture) {
                var self = this;
                texture.disposeBitmapData = false;
                var blur = Pool.alloc(Texture);
                blur.bitmapData = texture.bitmapData;
                self._blur = blur;
                var bmp = null;
                for (var _i = 0, _a = self._curShow; _i < _a.length; _i++) {
                    var id = _a[_i];
                    bmp = self.getBmp(id);
                    if (bmp && !bmp.texture) {
                        self.updateBlur(id);
                    }
                }
            };
            /**刷新地图，左上方第一块地图坐标（sc,sr），右下方最后一块地图坐标（ec,er）*/
            SceneMap.prototype.updateTiles = function (sc, sr, ec, er) {
                var self = this;
                if (self._mapId == 0) {
                    return;
                }
                if (sc < 0) {
                    sc = 0;
                }
                if (sr < 0) {
                    sr = 0;
                }
                var sliceCol = scene.MapData.ins.sliceCol;
                var sliceRow = scene.MapData.ins.sliceRow;
                if (self._isHangUp) {
                    /**挂机场景循环多加载一块地图，用于循环*/
                    switch (self._moveType) {
                        case game.MapMoveType.Left:
                            ec++;
                            break;
                        case game.MapMoveType.Right:
                            sc--;
                            break;
                        case game.MapMoveType.Up:
                            er++;
                            break;
                        case game.MapMoveType.Down:
                            sr--;
                            break;
                        case game.MapMoveType.LeftUp:
                            ec++;
                            er++;
                            break;
                        case game.MapMoveType.LeftDown:
                            ec++;
                            sr--;
                            break;
                        case game.MapMoveType.RightUp:
                            er++;
                            sc--;
                            break;
                        case game.MapMoveType.RightDown:
                            sc--;
                            sr--;
                            break;
                    }
                }
                else {
                    /**非挂机场景限制地图范围，挂机场景不限制，兼容旧地图规则*/
                    if (ec > sliceCol) {
                        ec = sliceCol;
                    }
                    if (er > sliceRow) {
                        er = sliceRow;
                    }
                }
                if (self._curSC == sc && self._curSR == sr && self._curEC == ec && self._curER == er) {
                    return;
                }
                self._curSC = sc;
                self._curSR = sr;
                self._curEC = ec;
                self._curER = er;
                self._curShow.length = 0;
                self.initMoveData();
                /**加载顺序从上往下，从左往右*/
                for (var c = sc; c < ec; c++) {
                    for (var r = sr; r < er; r++) {
                        self._curShow.push(self._mapId + "_" + c + "_" + r); //SceneMap.getSliceId(c, r)
                    }
                }
                //地图缓存处理
                var _time = TimeMgr.time.serverTimeSecond;
                for (var key in self._bmpMap) {
                    if (self._curShow.indexOf(key) == -1) {
                        self.releaseMapBmp(key, self._bmpMap[key], _time);
                        delete self._bmpMap[key];
                    }
                }
                for (var i = 0, n = self._curShow.length; i < n; i++) {
                    self.loadOne(self._curShow[i]);
                }
            };
            SceneMap.prototype.loadOne = function (id) {
                var self = this;
                var bmp = self.getBmp(id);
                if (!bmp) {
                    /**新加载的地图，且不在缓存地图里面*/
                    var col = SceneMap.getCol(id);
                    var row = SceneMap.getRow(id);
                    bmp = Pool.alloc(MapBmp);
                    bmp.x = col * self._sliceW;
                    bmp.y = row * self._sliceH;
                    bmp.setIdx(col, row, self._mapId);
                    self._bmpMap[id] = bmp;
                    self.addChild(bmp);
                    self.updateBlur(id);
                }
                else {
                    //如果存在地图块，且是挂机移动地图，需要重置下数据和位置
                    if (this._isHangUp) {
                        var col = SceneMap.getCol(id);
                        var row = SceneMap.getRow(id);
                        bmp.x = col * self._sliceW;
                        bmp.y = row * self._sliceH;
                        bmp.setIdx(col, row, self._mapId, true);
                    }
                }
            };
            SceneMap.prototype.updateBlur = function (id) {
                var self = this;
                if (!self._blur) {
                    return;
                }
                var col = SceneMap.getCol(id);
                var row = SceneMap.getRow(id);
                var blur = Pool.alloc(Texture);
                blur.disposeBitmapData = false;
                if (self._blur && self._blur.bitmapData) {
                    blur._setBitmapData(self._blur.bitmapData);
                }
                var ratio = BlurRatio;
                var tx = col * self._sliceW / ratio;
                var ty = row * self._sliceH / ratio;
                var tw = self._sliceW / ratio;
                var th = self._sliceH / ratio;
                blur.$initData(self._blur.$bitmapX + tx, self._blur.$bitmapY + ty, tw, th, 0, 0, tw, th, self._blur.$sourceWidth, self._blur.$sourceHeight);
                self._bmpMap[id].setBlur(blur);
            };
            SceneMap.prototype.clean = function (clearAll) {
                var self = this;
                self._mapId = self._sliceW = self._sliceH = 0;
                Pool.release(self._blur);
                self._blur = null;
                self._curSC = self._curSR = self._curEC = self._curER = 0;
                self._curShow.length = 0;
                if (clearAll) {
                    self.clearAllMapBmp();
                }
            };
            SceneMap.prototype.getBmp = function (id) {
                var self = this;
                var bmp = self._bmpMap[id];
                if (self._releaseMap[id]) {
                    if (!bmp) {
                        bmp = self._releaseMap[id][0];
                        self._bmpMap[id] = bmp;
                        self.addChild(bmp);
                    }
                    delete self._releaseMap[id];
                }
                return bmp;
            };
            SceneMap.prototype.check = function (time) {
                this.checkMapBmpClear(time);
                this.checkMapBmpMove();
            };
            SceneMap.prototype.checkMapBmpClear = function (time) {
                var self = this;
                if (self._lastWaitTime && time - self._lastWaitTime < 3) {
                    return;
                }
                self._lastWaitTime = time;
                var _time = 0;
                var _list = self._releaseMap;
                var _keys = Object.keys(self._releaseMap);
                var _isFull = _keys.length > self._waitCnt;
                for (var _i = 0, _keys_1 = _keys; _i < _keys_1.length; _i++) {
                    var key = _keys_1[_i];
                    _time = time - _list[key][1];
                    if (_time > self._waitTime || (_isFull && _time > 30)) {
                        _list[key][0].onRelease();
                        Pool.release(_list[key]);
                        _list[key][0] = null;
                        delete _list[key];
                    }
                }
            };
            SceneMap.prototype.releaseMapBmp = function (id, bmp, _time) {
                var self = this;
                if (!bmp || !bmp.texture) {
                    return;
                }
                bmp.removeDisplay();
                if (!self._releaseMap[id]) {
                    self._releaseMap[id] = [bmp, _time];
                }
            };
            SceneMap.prototype.clearAllMapBmp = function () {
                var self = this;
                for (var key in self._bmpMap) {
                    self._bmpMap[key] && self._bmpMap[key].onRelease();
                    Pool.release(self._bmpMap[key]);
                    delete self._bmpMap[key];
                }
                for (var key in self._releaseMap) {
                    self._releaseMap[key][0] && self._releaseMap[key][0].onRelease();
                    Pool.release(self._releaseMap[key]);
                    self._releaseMap[key][0] = null;
                    delete self._releaseMap[key];
                }
            };
            SceneMap.getCol = function (sliceId) {
                return Number(sliceId.split("_")[1]); //(sliceId & this.LOW_WORD) - this.NRM;
            };
            SceneMap.getRow = function (sliceId) {
                return Number(sliceId.split("_")[2]); //(sliceId >> this.ROW_SHIFT) - this.NRM;
            };
            SceneMap.sortId = function (id1, id2) {
                var self = SceneMap;
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
            /**移动地图块*/
            SceneMap.prototype.checkMapBmpMove = function () {
                var self = this;
                if (!self._isHangUp) {
                    return;
                }
                if (!self._initMoveData) {
                    return;
                }
                if (self._moveType == game.MapMoveType.Null) {
                    return;
                }
                if (self._moveType == game.MapMoveType.Left || self._moveType == game.MapMoveType.Right || self._moveType == game.MapMoveType.LeftUp ||
                    self._moveType == game.MapMoveType.LeftDown || self._moveType == game.MapMoveType.RightUp || self._moveType == game.MapMoveType.RightDown) {
                    this.checkMapBmpMoveX();
                }
                if (self._moveType == game.MapMoveType.Up || self._moveType == game.MapMoveType.Down || self._moveType == game.MapMoveType.LeftUp ||
                    self._moveType == game.MapMoveType.LeftDown || self._moveType == game.MapMoveType.RightUp || self._moveType == game.MapMoveType.RightDown) {
                    this.checkMapBmpMoveY();
                }
            };
            /**移动地图块*/
            SceneMap.prototype.checkMapBmpMoveX = function () {
                var self = this;
                var moveLeft = self._moveType == game.MapMoveType.Left || self._moveType == game.MapMoveType.LeftDown || self._moveType == game.MapMoveType.LeftUp; //是否向左移动
                var calcX = moveLeft ? -1 : 1; //位移变量，正负
                self.x += self._moveSpeed * calcX; /**左右移动*/
                var moveX = Math.abs(self.x - self._initX); /**地图移动的距离*/
                var numX = Math.floor(moveX / self._sliceW); /**移动的地图块数量，256为一块*/
                if (!numX) {
                    return;
                }
                self._initX = self.x; /**重置地图初始坐标x*/
                //let maxCol = self._curEC - self._curSC;/**当前水平方向地图块数量*/
                //r应该从当前sr算起，因为向下移动时sr从-1开始
                for (var r = self._curSR; r < self._curER; r++) {
                    /**移动一整列地图*/
                    var id = self._mapId + "_" + self._numC + "_" + r; /**移动的地图块id*/
                    var bmp = self.getBmp(id); /**移动的地图块*/
                    if (!bmp) {
                        console.error("MoveX找不到地图块bmp");
                        continue;
                    }
                    var lastC = 0; /**计算最后一块地图的位置*/
                    if (moveLeft) {
                        //向左移动时，最后一块地图的位置
                        lastC = self._numC == self._curSC ? self._curEC - 1 : self._numC - 1; /**计算最后一块地图的位置*/
                    }
                    else {
                        lastC = self._numC == self._curEC - 1 ? self._curSC : self._numC + 1; /**计算最后一块地图的位置*/
                    }
                    var lastId = self._mapId + "_" + lastC + "_" + r; /**最后一块地图的id*/
                    var lastBmp = self.getBmp(lastId); /**最后一块地图*/
                    if (!lastBmp) {
                        console.error("MoveX找不到地图块lastBmp");
                        continue;
                    }
                    bmp.x = lastBmp.x - self._sliceW * calcX; /**移动地图块*/
                    bmp.setIdx(lastBmp.curC - calcX, lastBmp.curR, self._mapId); /**设置地图块纹理，根据最后一块地图来设置id*/
                }
                self._numC -= calcX; //累加计算
                if (moveLeft) {
                    self._numC = self._numC > self._curEC - 1 ? self._curSC : self._numC; /**循环累加，例如0~3*/
                }
                else {
                    self._numC = self._numC < self._curSC ? self._curEC - 1 : self._numC; /**循环累减，例如-1~2*/
                }
            };
            /**移动地图块*/
            SceneMap.prototype.checkMapBmpMoveY = function () {
                var self = this;
                var moveUp = self._moveType == game.MapMoveType.Up || self._moveType == game.MapMoveType.LeftUp || self._moveType == game.MapMoveType.RightUp;
                var calcY = moveUp ? -1 : 1;
                self.y += self._moveSpeed * calcY; /**上下移动*/
                var moveY = Math.abs(self.y - self._initY); /**地图移动的距离*/
                var numY = Math.floor(moveY / self._sliceH); /**移动的地图块数量*/
                if (!numY) {
                    return;
                }
                self._initY = self.y; /**重置地图初始坐标y*/
                //let maxRol = self._curER - self._curSR;/**当前垂直方向地图块数量*/
                //c应该从当前sc算起，因为向右移动时sc从-1开始
                for (var c = self._curSC; c < self._curEC; c++) {
                    /**移动一整行地图*/
                    var id = self._mapId + "_" + c + "_" + self._numR; /**移动的地图块id*/
                    var bmp = self.getBmp(id); /**移动的地图块*/
                    if (!bmp) {
                        console.error("MoveY找不到地图块bmp");
                        continue;
                    }
                    var lastR = 0; /**计算最后一块地图的位置*/
                    if (moveUp) {
                        lastR = self._numR == self._curSR ? self._curER - 1 : self._numR - 1; /**计算最后一块地图的位置*/
                    }
                    else {
                        lastR = self._numR == self._curER - 1 ? self._curSR : self._numR + 1; /**计算最后一块地图的位置*/
                    }
                    var lastId = self._mapId + "_" + c + "_" + lastR; /**最后一块地图的id*/
                    var lastBmp = self.getBmp(lastId); /**最后一块地图*/
                    if (!lastBmp) {
                        console.error("MoveY找不到地图块lastBmp");
                        continue;
                    }
                    bmp.y = lastBmp.y - self._sliceH * calcY; /**移动地图块*/
                    bmp.setIdx(lastBmp.curC, lastBmp.curR - calcY, self._mapId); /**设置地图块纹理*/
                }
                self._numR -= calcY;
                if (moveUp) {
                    self._numR = self._numR > self._curER - 1 ? self._curSR : self._numR; /**循环累加，例如0~3*/
                }
                else {
                    self._numR = self._numR < self._curSR ? self._curER - 1 : self._numR; /**循环累减，例如-1~2*/
                }
            };
            return SceneMap;
        }(DisplayObjectContainer));
        scene.SceneMap = SceneMap;
        __reflect(SceneMap.prototype, "game.scene.SceneMap");
        var MapBmp = /** @class */ (function (_super) {
            __extends(MapBmp, _super);
            function MapBmp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MapBmp.prototype.setIdx = function (c, r, mapId, notRemove) {
                var self = this;
                var sliceCol = scene.MapData.ins.sliceCol;
                if (c >= sliceCol) {
                    c = c % sliceCol;
                }
                else if (c < 0) {
                    c = sliceCol - 1; //todo
                }
                var sliceRow = scene.MapData.ins.sliceRow;
                if (r >= sliceRow) {
                    r = r % sliceRow;
                }
                else if (r < 0) {
                    r = sliceRow - 1; //todo
                }
                var url = game.ResUtil.getMapBmpUrl(mapId, c, r);
                if (self._url == url) {
                    return;
                }
                if (!notRemove) {
                    //不移除当前
                    self.removeCur();
                }
                self._url = url;
                self._curC = c;
                self._curR = r;
                game.LoadMgr.ins.addRef(url);
                var data = game.LoadMgr.ins.getRes(url);
                if (data) {
                    self.onLoaded(data, url);
                }
                else {
                    game.LoadMgr.ins.load(self._url, Handler.alloc(self, self.onLoaded), game.LoadPri.Map);
                }
            };
            /**先设置了这里的texture，缩放后的，256/20=12.8*/
            MapBmp.prototype.setBlur = function (blur) {
                var self = this;
                if (self.texture) {
                    return;
                }
                // self._blur = blur;
                self.texture = blur;
                self.scaleX = self.scaleY = BlurRatio;
            };
            /**加载完成后再设置完整的texture，256*/
            MapBmp.prototype.onLoaded = function (data, url) {
                var self = this;
                if (self._url != url || !data) {
                    return;
                }
                self.scaleX = self.scaleY = 1;
                self.texture = data;
            };
            MapBmp.prototype.removeCur = function () {
                var self = this;
                self.scaleX = self.scaleY = 1;
                self.texture = null;
                if (self._url) {
                    game.LoadMgr.ins.decRef(self._url);
                }
                self._url = undefined;
            };
            MapBmp.prototype.removeDisplay = function () {
                var self = this;
                if (self.parent) {
                    self.parent.removeChild(self);
                }
            };
            MapBmp.prototype.dispose = function () {
                var self = this;
                self.onRelease();
            };
            MapBmp.prototype.onAlloc = function () {
            };
            MapBmp.prototype.onRelease = function () {
                var self = this;
                self.removeDisplay();
                self.removeCur();
            };
            Object.defineProperty(MapBmp.prototype, "curC", {
                get: function () {
                    return this._curC;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapBmp.prototype, "curR", {
                get: function () {
                    return this._curR;
                },
                enumerable: true,
                configurable: true
            });
            return MapBmp;
        }(Bitmap));
        __reflect(MapBmp.prototype, "MapBmp", ["base.PoolObject", "base.DisposeObject"]);
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var Handler = base.Handler;
        var Tween = base.Tween;
        var BaseBmpNum = /** @class */ (function (_super) {
            __extends(BaseBmpNum, _super);
            function BaseBmpNum() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._startAttr = { x: 0, y: 0 };
                _this._tweenX = 0;
                _this._tweenY = 0;
                _this._curFrame = 0;
                _this._finalFrame = 0;
                _this._isMainPlayer = false;
                return _this;
            }
            Object.defineProperty(BaseBmpNum.prototype, "type", {
                get: function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });
            BaseBmpNum.prototype.loadCfg = function (key) {
                if (!key) {
                    return;
                }
                var self = this;
                self._fontName = key;
                var url = game.ResUtil.getFontUrl(self._fontName);
                self._url = url;
                game.LoadMgr.ins.addRef(url);
                game.LoadMgr.ins.loadMerge(url, Handler.alloc(this, this.setBmp), game.LoadPri.UIScene);
            };
            BaseBmpNum.prototype.setText = function (text, x, y, dir, type, fontName, actArray, hasword, isMainPlayer, actAtr) {
                if (hasword === void 0) { hasword = 0; }
                if (isMainPlayer === void 0) { isMainPlayer = false; }
                if (actAtr === void 0) { actAtr = null; }
                var self = this;
                self._type = type;
                self._dir = dir;
                this._isHasWord = hasword;
                this._isMainPlayer = isMainPlayer;
                this.dsp.scaleX = 1;
                this.dsp.scaleY = 1;
                this.dsp.alpha = 1;
                this._actArray = actArray;
                var rand = Math.random() * 10;
                if (rand % 2) {
                    x += rand;
                    y -= rand;
                }
                else {
                    x -= rand;
                    y -= rand;
                }
                if (text == "0") {
                    text = "";
                }
                // x = MainGPlayer.ins.x;
                // y = MainGPlayer.ins.y;
                self._startAttr.x = this._tweenX = x;
                self._startAttr.y = this._tweenY = y;
                self._text = text;
                //初始化
                self.x = self._tweenX;
                self.y = self._tweenY;
                //fontName = "stxt_1";
                self.loadCfg(fontName);
                if (actAtr) {
                    self.isNeedShowTween = false;
                    self._showAttr = game[actAtr];
                    self._curTime = 0;
                    self._curFrame = 0;
                    self._finalFrame = self._showAttr.length;
                    self._randomX = -40 * Math.random();
                    self._randomY = 40 * Math.random(); // + 100;
                }
                else {
                    self.isNeedShowTween = true;
                }
            };
            //计算目标总属性
            BaseBmpNum.prototype.computerTotalAtr = function (d, time) {
                var atr = {};
                if (d.scale != undefined) {
                    atr.scaleX = d.scale;
                    atr.scaleY = d.scale;
                }
                if (d.move) {
                    //计算位移
                    // let dir = d.move.dir;
                    //
                    // if(dir == 3){
                    //     //随机
                    //     dir = Math.random() > 0.5 ? 1 : 2;
                    // }
                    var dir = this._dir;
                    if (this._isMainPlayer && d.move.dir) {
                        dir = d.move.dir;
                    }
                    if (d.move.dir == 3) {
                        dir = Math.random() > 0.5 ? 1 : 2;
                    }
                    var dstx = this._tweenX;
                    var dsty = this._tweenY;
                    if (dir == 1) {
                        //  1 加策划的偏移量 X
                        dstx += d.move.x;
                        dsty += d.move.y;
                    }
                    else {
                        //  2 减策划的偏移量 X
                        dstx -= d.move.x;
                        dsty += d.move.y;
                    }
                    atr.x = dstx;
                    atr.y = dsty;
                }
                if (d.alpha != undefined) {
                    atr.alpha = d.alpha;
                }
                return atr;
            };
            // //抛物线
            BaseBmpNum.prototype.parabolic = function (tween, d, time) {
                if (d.move) {
                    //计算抛物线方向
                    // let dir = d.move.dir;
                    // if (dir == 3) {
                    //     //随机
                    //     dir = Math.random() > 0.5 ? 1 : 2;
                    // }
                    var dir = this._dir;
                    if (this._isMainPlayer && d.move.dir) {
                        dir = d.move.dir;
                    }
                    if (d.move.dir == 3) {
                        dir = Math.random() > 0.5 ? 1 : 2;
                    }
                    var dstx = this._tweenX;
                    var dsty = this._tweenY;
                    if (dir == 1) {
                        //  1 加策划的偏移量 X
                        dstx += d.move.x;
                        dsty += d.move.y;
                    }
                    else {
                        //  2 减策划的偏移量 X
                        dstx -= d.move.x;
                        dsty += d.move.y;
                    }
                    game.MathUtil.parabolic2(this.dsp, time, { x: dstx, y: dsty }, Handler.alloc(this, function () {
                    }), tween, { alpha: d.alpha, scale: d.scale });
                }
                return tween;
            };
            BaseBmpNum.prototype.showTween = function () {
                var tween = Tween.get(this.dsp);
                for (var i = 0; i < this._actArray.length; i++) {
                    var groupAct = this._actArray[i];
                    for (var k in groupAct) {
                        var d = groupAct[k];
                        var time = groupAct.time;
                        if (k == "to") {
                            var atr = this.computerTotalAtr(d, time);
                            tween = tween.to(atr, time);
                        }
                        else if (k == "delay") {
                            tween = tween.delay(d);
                        }
                        else if (k == "parabolic") {
                            tween = this.parabolic(tween, d, time);
                        }
                        else if (k == "bir") {
                            if (this._dir == 1) {
                                this.dsp.x = this.dsp.x + d.x;
                            }
                            else {
                                this.dsp.x = this.dsp.x - d.x;
                            }
                            this.dsp.y = this.dsp.y + d.y;
                            this.dsp.scaleX = d.scale;
                            this.dsp.scaleY = d.scale;
                        }
                    }
                }
                tween.exec(Handler.alloc(this, this.onComplete));
            };
            BaseBmpNum.prototype.setBmp = function (data, url) {
                var self = this;
                if (self._url != url) {
                    return;
                }
                self._data = data;
                var display = self.dsp;
                var text = self._text;
                //self._type = 2;
                //let mergeText = self.type == BmpTextType.ATK || self.type == BmpTextType.HIT ? "" : "F";
                var mergeText = this._isHasWord == 0 ? "" : "F";
                var numChildren = display.numChildren;
                var textLen = text.length;
                if (mergeText) {
                    text = text.replace(mergeText, "");
                    textLen = text.length + 1;
                }
                while (numChildren > textLen) {
                    Pool.release(display.removeChildAt(numChildren - 1));
                    numChildren--;
                }
                while (numChildren < textLen) {
                    display.addChild(Pool.alloc(game.BitmapBase));
                    numChildren++;
                }
                var bmpX = 0;
                var idx = 0;
                if (mergeText) {
                    bmpX = self.addFontBmp(mergeText, bmpX, display.getChildAt(idx++));
                }
                // switch (self._type) {
                //     case BmpTextType.CRITICAL:
                //         bmpX -= 5;
                //         break;
                // }
                for (var i = 0, l = text.length; i < l; ++i) {
                    bmpX = self.addFontBmp(text[i], bmpX, display.getChildAt(idx++));
                }
                for (var i = 0, l = numChildren; i < l; ++i) {
                    self.dsp.getChildAt(i).verCenter();
                }
                this.setAnchorOff();
            };
            BaseBmpNum.prototype.setAnchorOff = function () {
                var self = this;
                self.dsp.anchorOffsetX = self.dsp.width * 0.5;
                self.dsp.anchorOffsetY = self.dsp.height * 0.5;
            };
            BaseBmpNum.prototype.addFontBmp = function (t, bmpX, bmp) {
                var self = this;
                var h = self._data.getVal(t, "h");
                bmp.texture = self._data.getTexture(t);
                bmp.x = bmpX;
                bmpX += bmp.texture.textureWidth;
                self.dsp.height = Math.max(h, self.dsp.height);
                return bmpX;
            };
            BaseBmpNum.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                var self = this;
                if (self.isNeedShowTween) {
                    self.isNeedShowTween = false;
                    this.showTween();
                }
                if (!self._showAttr) {
                    return;
                }
                if (!self.parent) {
                    return;
                }
                if (self._curFrame >= self._finalFrame) {
                    this.onComplete();
                    return;
                }
                var attr = self._showAttr[self._curFrame];
                if (attr.t == undefined) {
                    this.updateAttr();
                    self._curFrame++;
                }
                else {
                    var preFrame = self._curFrame;
                    var isComplete = false;
                    this._curTime += elapseTime;
                    while (self._curTime > attr.t) {
                        self._curFrame++;
                        if (self._curFrame == self._finalFrame) {
                            isComplete = true;
                            break;
                        }
                        attr = self._showAttr[self._curFrame];
                    }
                    if (isComplete) {
                        self.onComplete();
                        return;
                    }
                    if (preFrame != self._curFrame) {
                        self.updateAttr();
                    }
                }
            };
            BaseBmpNum.prototype.onComplete = function () {
                this.dispose();
            };
            BaseBmpNum.prototype.updateAttr = function () {
                var self = this;
                var attr = self._showAttr[self._curFrame];
                var offX = attr.x + this._randomX;
                // self.x = this._tweenX;//self._startAttr.x + (this._dir == BmpTextDir.Left ? -offX : +offX);
                // self.y = this._tweenY;//self._startAttr.y + attr.y - this._randomY;
                if (this.isNeedShowTween) {
                    self.x = this._tweenX; //self._startAttr.x + (this._dir == BmpTextDir.Left ? -offX : +offX);
                    self.y = this._tweenY; //self._startAttr.y + attr.y - this._randomY;
                }
                else {
                    self.x = self._startAttr.x + (this._dir == 1 /* Left */ ? -offX : +offX);
                    self.y = self._startAttr.y + attr.y - this._randomY;
                }
                self.alpha = attr.a;
                self.scaleX = attr.sx;
                self.scaleY = attr.sy;
            };
            BaseBmpNum.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
            };
            BaseBmpNum.prototype.clearDisplay = function (isDispose) {
                if (isDispose === void 0) { isDispose = false; }
                var display = this.dsp;
                if (isDispose) {
                    for (var i = display.numChildren - 1; i >= 0; i--) {
                        Pool.release(display.removeChildAt(i));
                    }
                    return;
                }
                for (var i = 0, len = display.numChildren; i < len; i++) {
                    display.getChildAt(i).source = null;
                }
            };
            BaseBmpNum.prototype.onRelease = function () {
                var self = this;
                self._data = null;
                game.LoadMgr.ins.decRef(self._url);
                self._url = null;
                self._text = null;
                self._curFrame = 0;
                self.showTime = 0;
                self.isNeedShowTween = false;
                this._actArray = null;
                self.x = 0;
                self.y = 0;
                self.alpha = self.scale = 1;
                for (var k in self._startAttr) {
                    delete self._startAttr[k];
                }
                self._showAttr = null;
                self.clearDisplay();
                _super.prototype.onRelease.call(this);
            };
            BaseBmpNum.prototype.dispose = function () {
                this.clearDisplay(true);
                _super.prototype.dispose.call(this);
            };
            return BaseBmpNum;
        }(scene.BaseDraw));
        scene.BaseBmpNum = BaseBmpNum;
        __reflect(BaseBmpNum.prototype, "game.scene.BaseBmpNum");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var Handler = base.Handler;
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var BaseTitle = /** @class */ (function (_super) {
            __extends(BaseTitle, _super);
            function BaseTitle() {
                return _super.call(this) || this;
            }
            Object.defineProperty(BaseTitle.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseTitle.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    var self = this;
                    self._height = value;
                    self.dsp.height = value;
                },
                enumerable: true,
                configurable: true
            });
            BaseTitle.prototype.initDsp = function () {
                _super.prototype.initDsp.call(this);
                var self = this;
                var g = new DisplayObjectContainer();
                self.group = self.dsp.addChild(g);
                self._titleBmp = self.group.addChild(Pool.alloc(game.BitmapBase));
                // this.height = 27;
            };
            BaseTitle.prototype.setTitle = function (src) {
                var self = this;
                src = src.replace(".png", "");
                if (self._src == src) {
                    return;
                }
                self.removeCurrent();
                self._src = src;
                game.LoadMgr.ins.addRef(src);
                game.LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoaded), game.LoadPri.Scene);
            };
            BaseTitle.prototype.onLoaded = function (data, url) {
                var self = this;
                if (self._src != url || self.parent == null) {
                    return;
                }
                self._data = data;
                var durList = [];
                for (var i = 0, n = data.numFrames; i < n; i++) {
                    durList.push(data.getVal(i, "dur"));
                }
                if (self._ctrl) {
                    self._ctrl.init(durList, url);
                    self._ctrl.loop = true;
                    self._ctrl.play();
                    self.onFrameChange(0);
                    self.width = 0;
                    self.height = 70;
                    self.group.y = self.height / 2;
                    self.parent.sort = true;
                }
            };
            BaseTitle.prototype.removeCurrent = function () {
                var self = this;
                self._data = undefined;
                game.LoadMgr.ins.decRef(self._src);
                self._src = undefined;
                if (self._ctrl) {
                    self._ctrl.stop();
                }
                self._titleBmp.texture = null;
            };
            BaseTitle.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                var self = this;
                if (self._ctrl) {
                    self._ctrl.advanceTime(elapseTime);
                }
            };
            BaseTitle.prototype.onFrameChange = function (frame) {
                this._data.drawTo(this._titleBmp, frame);
            };
            BaseTitle.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                var self = this;
                self._ctrl = Pool.alloc(game.AnimCtrl);
                self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChange);
            };
            BaseTitle.prototype.onRelease = function () {
                _super.prototype.onRelease.call(this);
                var self = this;
                self.removeCurrent();
                Pool.release(self._ctrl);
                self._ctrl = undefined;
                self._titleBmp.source = null;
            };
            return BaseTitle;
        }(scene.BaseDraw));
        scene.BaseTitle = BaseTitle;
        __reflect(BaseTitle.prototype, "game.scene.BaseTitle");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var TextField = egret.TextField;
        var Rectangle = egret.Rectangle;
        var ChatText = /** @class */ (function (_super) {
            __extends(ChatText, _super);
            function ChatText() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ChatText.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    var self = this;
                    self._width = value;
                    self.dsp.width = value;
                    if (self._imgChatBg) {
                        self._imgChatBg.width = value;
                    }
                    if (self._labChatTxt) {
                        self._labChatTxt.width = value - self._labChatTxt.x * 2 + 30;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChatText.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    var self = this;
                    self._height = value;
                    self.dsp.height = value;
                    if (self._imgChatBg) {
                        self._imgChatBg.height = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            ChatText.prototype.initDsp = function () {
                _super.prototype.initDsp.call(this);
                var s = this;
                s.width = 337;
                s._imgChatBg = s.dsp.addChild(Pool.alloc(game.BitmapBase));
                s._imgChatBg.source = game.ResUtil.getUiPng("main_chat_bubble");
                s._imgChatBg.scale9Grid = Pool.alloc(Rectangle).setTo(231, 66, 6, 3);
                s._imgChatBg.x = -(this._width / 2);
                var lab = s._labChatTxt = new TextField();
                lab.stroke = 1;
                lab.strokeColor = 0x036562;
                lab.size = 20;
                lab.lineSpacing = 4;
                lab.x = -(this._width / 2) + 50;
                lab.y = 50;
                s.dsp.addChild(lab);
            };
            ChatText.prototype.setChatTxt = function (content) {
                if (!content) {
                    return;
                }
                var s = this;
                s._labChatTxt.textFlow = game.TextUtil.parseHtml(content);
                var labHeight = s._labChatTxt.textHeight < 45 ? 45 : s._labChatTxt.textHeight;
                s.height = labHeight + s._labChatTxt.y * 2 + 10;
            };
            ChatText.prototype.onRelease = function () {
                this._labChatTxt.textFlow = null;
                this._labChatTxt.text = "";
                _super.prototype.onRelease.call(this);
            };
            return ChatText;
        }(scene.BaseDraw));
        scene.ChatText = ChatText;
        __reflect(ChatText.prototype, "game.scene.ChatText");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var HeadMgr = /** @class */ (function (_super) {
            __extends(HeadMgr, _super);
            function HeadMgr() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(HeadMgr.prototype, "adTitle", {
                get: function () {
                    return this._adTitle;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HeadMgr.prototype, "sort", {
                set: function (value) {
                    this._sort = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HeadMgr.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    if (value == this._height) {
                        return;
                    }
                    this._height = +value | 0;
                    this.parent.updateHeadMgrY();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HeadMgr.prototype, "updateEnabled", {
                get: function () {
                    return this._updateEnabled && ((this._widthChanged || this._sort) || this._title != null);
                },
                set: function (value) {
                    this._updateEnabled = value;
                },
                enumerable: true,
                configurable: true
            });
            HeadMgr.prototype.setName = function (name, color) {
                var self = this;
                if (!self._itemName) {
                    self._itemName = Pool.alloc(scene.ComName);
                    self.add(self._itemName);
                }
                self._itemName.setName(name);
                if (color) {
                    self._itemName.color = color;
                }
                self._widthChanged = true;
            };
            HeadMgr.prototype.setNameColor = function (color) {
                var self = this;
                if (!self._itemName)
                    return;
                self._itemName.color = color;
            };
            HeadMgr.prototype.setTeamName = function (name, color) {
                var self = this;
                if (!name) {
                    if (self._teamName) {
                        self.remove(self._teamName);
                        self._teamName = null;
                    }
                }
                else {
                    if (!self._teamName) {
                        self._teamName = Pool.alloc(scene.TeamName);
                        self.add(self._teamName);
                    }
                    self._teamName.setName(name);
                    if (color) {
                        self._teamName.color = color;
                    }
                }
                self._widthChanged = true;
            };
            HeadMgr.prototype.setPartnerName = function (name, color) {
                if (color === void 0) { color = 16777215 /* WHITE */; }
                if (!this._partnerName) {
                    this._partnerName = Pool.alloc(scene.BaseName);
                    this.add(this._partnerName);
                }
                this._partnerName.color = color;
                this._partnerName.text = name;
                this._widthChanged = true;
            };
            HeadMgr.prototype.setPartnerNameColor = function (color) {
                if (!this._partnerName) {
                    return;
                }
                this._partnerName.color = color;
            };
            HeadMgr.prototype.removeParnerName = function () {
                if (this._partnerName && this._partnerName.parent) {
                    this._partnerName.parent.remove(this._partnerName);
                    this._partnerName = null;
                }
            };
            /** 巅峰对决旗显示*/
            HeadMgr.prototype.setFlagShow = function (src) {
                if (!src) {
                    this.removeFlag();
                    return;
                }
                if (!this._flag) {
                    this._flag = Pool.alloc(scene.TopDuelFlag);
                    this.add(this._flag);
                }
                this._flag.setTitle(src);
            };
            HeadMgr.prototype.removeFlag = function () {
                if (this._flag && this._flag.parent) {
                    this.remove(this._flag);
                    this._flag = null;
                }
            };
            HeadMgr.prototype.setCampName = function (name, color) {
                var self = this;
                if (!name) {
                    if (self._campName) {
                        self.remove(self._campName);
                        self._campName = null;
                    }
                }
                else {
                    if (!self._campName) {
                        self._campName = Pool.alloc(scene.CampName);
                        self.add(self._campName);
                    }
                    self._campName.setName(name);
                    if (color) {
                        self._campName.color = color;
                    }
                }
                self._widthChanged = true;
            };
            HeadMgr.prototype.add = function (child) {
                _super.prototype.add.call(this, child);
                this._sort = true;
            };
            HeadMgr.prototype.remove = function (child) {
                _super.prototype.remove.call(this, child);
                this._sort = true;
            };
            HeadMgr.prototype.setHp = function (hpPercent) {
                if (!this._hpItem) {
                    this.initHp();
                }
                this._hpItem.setHp(hpPercent);
            };
            HeadMgr.prototype.setGridHp = function (maxHp) {
                this._hpItem.setGridHp(maxHp);
            };
            HeadMgr.prototype.setAdTitle = function (lv) {
                var _limit = scene.AdTitle.getShowVipAdLimit(lv);
                if (lv == null || _limit == null) {
                    if (this._adTitle && this._adTitle.parent) {
                        this._adTitle.parent.remove(this._adTitle);
                    }
                    this._adTitle = null;
                    this.sort = true;
                    return;
                }
                if (!this._adTitle) {
                    this._adTitle = Pool.alloc(scene.AdTitle);
                }
                this.add(this._adTitle);
                this._adTitle.setTitle(_limit);
            };
            HeadMgr.prototype.removeHp = function () {
                if (this._hpItem && this._hpItem.parent) {
                    this._hpItem.dispose();
                    this._hpItem = null;
                }
            };
            HeadMgr.prototype.setTitle = function (src) {
                if (!src) {
                    this.removeTitle();
                    return;
                }
                if (!this._title) {
                    this._title = Pool.alloc(scene.BaseTitle);
                    this.add(this._title);
                }
                this._title.setTitle(src);
            };
            HeadMgr.prototype.removeTitle = function () {
                if (this._title && this._title.parent) {
                    this._title.dispose();
                    this._title = null;
                }
            };
            HeadMgr.prototype.initHp = function () {
                var actor = this.parent;
                var vo = actor.vo;
                this._hpItem = Pool.alloc(scene.SceneTools.isEnemy(vo) ? scene.MonsterHp : scene.PlayerHp);
                this.add(this._hpItem);
                this._hpItem.x = -this._hpItem.width * this._hpItem.scale / 2;
            };
            HeadMgr.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                var self = this;
                if (self._widthChanged) {
                    self.updateWidth();
                    self._widthChanged = false;
                }
                if (self._sort) {
                    self.sortChild();
                    self._sort = false;
                }
            };
            HeadMgr.prototype.updateWidth = function () {
                for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    var c = child;
                    if (c.width) {
                        c.x = -c.width / 2;
                    }
                }
            };
            HeadMgr.prototype.sortChild = function () {
                var sortList = [this._adTitle, this._title, this._flag, this._campName, this._teamName, this._partnerName, this._itemName, this._hpItem];
                var h = 0;
                for (var i = 0, l = sortList.length; i < l; ++i) {
                    var c = sortList[i];
                    if (c) {
                        c.y = h;
                        h += +c.height | 0;
                    }
                }
                this.height = h;
            };
            HeadMgr.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                this.sortChild();
            };
            HeadMgr.prototype.onRelease = function () {
                _super.prototype.onRelease.call(this);
                this._itemName = undefined;
                this._partnerName = undefined;
                this._teamName = undefined;
                this._hpItem = undefined;
                this._height = undefined;
                this._campName = undefined;
                this._flag = undefined;
            };
            return HeadMgr;
        }(scene.BaseDraw));
        scene.HeadMgr = HeadMgr;
        __reflect(HeadMgr.prototype, "game.scene.HeadMgr");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Event = egret.Event;
        /**
         * 小怪血条
         */
        var MonsterHp = /** @class */ (function (_super) {
            __extends(MonsterHp, _super);
            function MonsterHp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MonsterHp.prototype.getHpRes = function () {
                this.bmpHp.addEventListener(Event.COMPLETE, this.onGetBmpHp, this);
                this.bmpHp.source = "scene_hp_hong";
            };
            MonsterHp.prototype.onGetBmpHp = function () {
                _super.prototype.onGetBmpHp.call(this);
                this.scale = 0.8;
            };
            MonsterHp.prototype.onGetBmpBg = function () {
                _super.prototype.onGetBmpBg.call(this);
                this.scale = 0.8;
            };
            return MonsterHp;
        }(scene.PlayerHp));
        scene.MonsterHp = MonsterHp;
        __reflect(MonsterHp.prototype, "game.scene.MonsterHp");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_17) {
        var TimeMgr = base.TimeMgr;
        var Pool = base.Pool;
        var SceneShake = /** @class */ (function () {
            function SceneShake(scene) {
                this.isShake = false;
                this._duration = [];
                this.MAX_FRAME = game.ShakeCfg.length;
                this._scene = scene;
            }
            SceneShake.prototype.start = function (cfg) {
                if (this.isShake) {
                    console.log("正在抖动场景，不叠加");
                    return;
                }
                this._shakeStartTime = TimeMgr.time.time;
                this._frameTime = 0;
                this._curFrame = 0;
                this._curTimes = 0;
                this._times = cfg[0];
                this._duration.length = 0;
                for (var i = 1, l = cfg.length; i < l; ++i) {
                    this._duration.push(cfg[i]);
                }
                this.isShake = true;
                console.log("SceneShake start");
            };
            SceneShake.prototype.remove = function () {
                console.log("SceneShake remove");
                this.isShake = false;
                this._duration.length = 0;
                this._frameTime = 0;
                this._shakeStartTime = 0;
                this._curFrame = 0;
                this._curTimes = 0;
                this._times = 1;
                if (this._shakeFocusPt) {
                    var wx = this._shakeFocusPt.x + 0;
                    var wy = this._shakeFocusPt.y + game.CameraOffsetY + 0;
                    this._scene.updateFocus(wx, wy);
                }
                Pool.release(this._shakeFocusPt);
                this._shakeFocusPt = null;
            };
            SceneShake.prototype.updateShakeFocusPt = function () {
                this._shakeFocusPt = this._scene.getFocusPt();
            };
            SceneShake.prototype.doShake = function () {
                if (this._curTimes <= this._times) {
                    var time = TimeMgr.time.time;
                    var passTime = time - this._shakeStartTime;
                    if (passTime >= this._duration[this._curTimes]) {
                        if (this._curFrame == 0) {
                            this._frameTime = time;
                            this.updateShakeFocusPt();
                        }
                        var frameTime = time - this._frameTime;
                        var cfg = game.ShakeCfg[this._curFrame];
                        if (frameTime >= cfg.t) {
                            var wx = this._shakeFocusPt.x + cfg.x;
                            var wy = this._shakeFocusPt.y + game.CameraOffsetY + cfg.y;
                            this._scene.updateFocus(wx, wy);
                            this._curFrame++;
                            if (this._curFrame >= this.MAX_FRAME) {
                                this._curTimes++;
                                this._curFrame = 0;
                            }
                        }
                    }
                }
                else {
                    this.remove();
                }
            };
            return SceneShake;
        }());
        scene_17.SceneShake = SceneShake;
        __reflect(SceneShake.prototype, "game.scene.SceneShake");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var Event = egret.Event;
        var TopDuelFlag = /** @class */ (function (_super) {
            __extends(TopDuelFlag, _super);
            function TopDuelFlag() {
                var _this = _super.call(this) || this;
                _this.type = 1;
                return _this;
            }
            Object.defineProperty(TopDuelFlag.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TopDuelFlag.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                },
                enumerable: true,
                configurable: true
            });
            TopDuelFlag.prototype.initDsp = function () {
                _super.prototype.initDsp.call(this);
                this._titleBmp = this.dsp.addChild(Pool.alloc(game.BitmapBase));
                this._height = 27;
            };
            TopDuelFlag.prototype.setTitle = function (src) {
                this._titleBmp.addEventListener(Event.COMPLETE, this.onGetTitle, this);
                this._titleBmp.source = src;
            };
            TopDuelFlag.prototype.onGetTitle = function () {
                this._titleBmp.removeEventListener(Event.COMPLETE, this.onGetTitle, this);
                this._width = this._titleBmp.texture.textureWidth;
                this._height = this._titleBmp.texture.textureHeight;
                this.x = -this._width * 0.5;
                if (this.parent) {
                    this.parent.sort = true;
                }
            };
            TopDuelFlag.prototype.onRelease = function () {
                this._titleBmp.source = null;
                _super.prototype.onRelease.call(this);
            };
            return TopDuelFlag;
        }(scene.BaseDraw));
        scene.TopDuelFlag = TopDuelFlag;
        __reflect(TopDuelFlag.prototype, "game.scene.TopDuelFlag");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var CampName = /** @class */ (function (_super) {
            __extends(CampName, _super);
            function CampName() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CampName.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                var self = this;
                self.setName();
            };
            /** 设置阵营名*/
            CampName.prototype.setName = function (name) {
                // let scene = this.parent as Scene;
                // let _vo: GPlayerVo = this._actor.vo as GPlayerVo;
                if (name) {
                    this.text = name;
                }
                // else if (_vo.camp) {
                //     let _color = SceneTools.getNameColor(_vo, scene.sceneType);
                //     this.text = getLanById(SceneCampName[_vo.camp]);
                //     this.color = _color;
                // }
            };
            Object.defineProperty(CampName.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this._textField.height = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CampName.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    // let s: ISceneProxy
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CampName.prototype, "color", {
                set: function (color) {
                    this._textField.textColor = color;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CampName.prototype, "text", {
                set: function (value) {
                    this._textField.text = value;
                    this.width = this._textField.textWidth;
                },
                enumerable: true,
                configurable: true
            });
            return CampName;
        }(scene.BaseName));
        scene.CampName = CampName;
        __reflect(CampName.prototype, "game.scene.CampName");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var ComName = /** @class */ (function (_super) {
            __extends(ComName, _super);
            function ComName() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ComName.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                var self = this;
                self.setName();
            };
            /**
             * 实体名字赋值
             * @param eName 用于调试
             */
            ComName.prototype.setName = function (eName) {
                var _name = "";
                var _color = 0xffffff;
                if (!eName) {
                    var _vo = this._actor.vo;
                    if (!_vo)
                        return;
                    //旧代码，注释
                    // let _sceneProxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                    // if (_vo instanceof PetVo) {
                    //     let _isEnemy: boolean = SceneTools.isEnemy(_vo);
                    //     if (_vo.master_name) {
                    //         let _config: any = getConfigById(_vo.index);
                    //         if (!_config) return;
                    //         let _resType: number = _config.outlook[0];
                    //         _name = StringUtil.substitute(getLanById(LanDef.partner), [_vo.master_name, getLanById(PetObjectName[_resType])]);
                    //         _color = _vo.isMainPet ? UIColor.GREEN : _isEnemy ? UIColor.RED : UIColor.ORANGE;
                    //     } else {
                    //         _name = _vo.name;
                    //     }
                    // } else {
                    _name = this._actor.vo.name;
                    _color = scene.SceneTools.getNameColor(this._actor.vo);
                    // }
                }
                else {
                    _name = eName;
                }
                this.text = _name;
                this.color = _color;
            };
            Object.defineProperty(ComName.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this._textField.height = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComName.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    // let s: ISceneProxy
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComName.prototype, "color", {
                set: function (color) {
                    this._textField.textColor = color;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComName.prototype, "text", {
                set: function (value) {
                    this._textField.text = value;
                    this.width = this._textField.textWidth;
                },
                enumerable: true,
                configurable: true
            });
            ComName.prototype.onRelease = function () {
                _super.prototype.onRelease.call(this);
            };
            return ComName;
        }(scene.BaseName));
        scene.ComName = ComName;
        __reflect(ComName.prototype, "game.scene.ComName");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_18) {
        var Pool = base.Pool;
        var TextField = egret.TextField;
        var TeamName = /** @class */ (function (_super) {
            __extends(TeamName, _super);
            function TeamName() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.imgSize = 37;
                return _this;
            }
            TeamName.prototype.initDsp = function () {
                _super.prototype.initDsp.call(this);
                var self = this;
                self._textField = new TextField();
                // self._textField.verticalAlign = VerticalAlign.MIDDLE;
                self._textField.size = 20;
                self._textField.textColor = 16773203 /* YELLOW */;
                self._textField.x = self.imgSize;
                self._textField.y = (self.imgSize - self._textField.size) / 2;
                self.height = self.imgSize + 2;
                self.dsp.addChild(self._textField);
            };
            TeamName.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                var self = this;
                self._headMdr = self.parent;
                self._actor = self._headMdr.parent;
                self.setName();
            };
            /**
             * 队伍/战盟名
             */
            TeamName.prototype.setName = function (name) {
                var scene = this.parent;
                var _vo = this._actor.vo;
                if (DEBUG) {
                    this.text = name;
                    return;
                }
                // if (_vo.guild_team_id && !_vo.guild_team_id.isZero()) {
                //     // let _color = SceneTools.isEnemy(_vo, scene.sceneType) ? UIColor.RED : UIColor.WHITE;
                //     this.text = `<S${_vo.server_id}.${_vo.guild_team_name}>`;
                //     // this.color = _color;
                //     this.setGuildIcon("guildIcon_" + _vo.guild_team_badge_no);
                // }
            };
            TeamName.prototype.setGuildIcon = function (src) {
                var self = this;
                if (!self._iconBmp) {
                    self._iconBmp = self.dsp.addChild(Pool.alloc(game.BitmapBase));
                    self._iconBmp.y = 0;
                    self._iconBmp.x = 0;
                    self._iconBmp.width = self._iconBmp.height = self.imgSize;
                }
                self._iconBmp.source = src;
                // LoadMgr.ins.addRef(src);
                // LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoaded), LoadPri.Scene);
            };
            Object.defineProperty(TeamName.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TeamName.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TeamName.prototype, "color", {
                set: function (color) {
                    this._textField.textColor = color;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TeamName.prototype, "text", {
                set: function (value) {
                    this._textField.text = value;
                    this.width = 74 + this._textField.textWidth;
                },
                enumerable: true,
                configurable: true
            });
            TeamName.prototype.onRelease = function () {
                if (this._iconBmp) {
                    this._iconBmp.parent.removeChild(this._iconBmp);
                    Pool.release(this._iconBmp);
                    this._iconBmp = null;
                }
                this._actor = this._headMdr = null;
                this._textField.text = undefined;
                _super.prototype.onRelease.call(this);
            };
            return TeamName;
        }(scene_18.BaseDraw));
        scene_18.TeamName = TeamName;
        __reflect(TeamName.prototype, "game.scene.TeamName");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        /***
         * 阴影
         */
        var ActorShadow = /** @class */ (function (_super) {
            __extends(ActorShadow, _super);
            function ActorShadow() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActorShadow.prototype.setActor = function (actor) {
                this._actor = actor;
                this._actor.setShadow(this);
                this.resetPos();
            };
            ActorShadow.prototype.updatePos = function (wx, wy) {
                var self = this;
                if (isNaN(wx) || isNaN(wy)) {
                    self.resetPos();
                    return;
                }
                self.x = wx;
                self.y = wy;
            };
            ActorShadow.prototype.resetPos = function () {
                var self = this;
                var worldPt = self._actor.vo.worldPt;
                self.x = worldPt.x;
                self.y = worldPt.y;
            };
            ActorShadow.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                var self = this;
                this._bmp = this.dsp.addChild(Pool.alloc(game.BitmapBase));
                self._bmp.source = "moxing_di";
                self._bmp.anchorOffsetX = 42;
                self._bmp.anchorOffsetY = 25;
                self._bmp.touchEnabled = false;
            };
            ActorShadow.prototype.onRelease = function () {
                var self = this;
                if (self._bmp) {
                    self._bmp.anchorOffsetX = 0;
                    self._bmp.anchorOffsetY = 0;
                    if (self._bmp.parent) {
                        self._bmp.parent.removeChild(this._bmp);
                        self.removeDsp(this);
                    }
                }
                Pool.release(self._bmp);
                self._bmp = undefined;
                self._actor = undefined;
                self.dsp.visible = true;
                _super.prototype.onRelease.call(this);
            };
            return ActorShadow;
        }(scene.BaseDraw));
        scene.ActorShadow = ActorShadow;
        __reflect(ActorShadow.prototype, "game.scene.ActorShadow");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Point = egret.Point;
        var Pool = base.Pool;
        var Handler = base.Handler;
        var MapData = /** @class */ (function () {
            function MapData() {
                this._mapMoveType = game.MapMoveType.LeftDown; //地图移动类型
                this._cfg = [];
            }
            Object.defineProperty(MapData, "ins", {
                get: function () {
                    if (this._ins == null) {
                        this._ins = new MapData();
                    }
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "path", {
                get: function () {
                    return this._path;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "mapWidth", {
                get: function () {
                    return this._mapWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "mapHeight", {
                get: function () {
                    return this._mapHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "sliceWidth", {
                get: function () {
                    return this._sliceWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "sliceHeight", {
                get: function () {
                    return this._sliceHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "sliceCol", {
                get: function () {
                    return this._sliceCol;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "sliceRow", {
                get: function () {
                    return this._sliceRow;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "cellWidth", {
                get: function () {
                    return this._cellWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "cellHeight", {
                get: function () {
                    return this._cellHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "numCol", {
                get: function () {
                    return this._numCol;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "numRow", {
                get: function () {
                    return this._numRow;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "isHangUp", {
                get: function () {
                    return this._isHangUp;
                },
                set: function (val) {
                    this._isHangUp = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapData.prototype, "mapMoveType", {
                get: function () {
                    return this._mapMoveType;
                },
                set: function (val) {
                    this._mapMoveType = val;
                },
                enumerable: true,
                configurable: true
            });
            MapData.prototype.getMask = function (x, y) {
                return this._cfg[y * this._numCol + x];
            };
            Object.defineProperty(MapData.prototype, "ckBlock", {
                get: function () {
                    if (this._ckBlock == null) {
                        this._ckBlock = Handler.alloc(this, this.isBlock);
                    }
                    return this._ckBlock;
                },
                enumerable: true,
                configurable: true
            });
            MapData.prototype.isBlock = function (x, y) {
                return scene.MapCellUtil.isBlock(this.getMask(x, y));
            };
            MapData.prototype.isShelter = function (x, y) {
                return scene.MapCellUtil.isShelter(this.getMask(x, y));
            };
            /**
             * 范围内
             * @param x
             * @param y
             */
            MapData.prototype.isInRange = function (x, y) {
                return x >= 0 && y >= 0 && x < this._numCol && y < this._numRow;
            };
            MapData.prototype.isPointLegal = function (x, y) {
                return this.isInRange(x, y) && !this.isBlock(x, y);
            };
            MapData.prototype.setSource = function (data) {
                var self = this;
                self._mapWidth = data.mW;
                self._mapHeight = data.mH;
                self._sliceWidth = data.sW;
                self._sliceHeight = data.sH;
                self._cellWidth = data.cW;
                self._cellHeight = data.cH;
                self._path = data.p;
                self._cfg.length = (data.mW / data.cW) * (data.mH / data.cH);
                for (var i = 0, len1 = data.d.length; i < len1; i++) {
                    self._cfg[i] = data.d[i];
                }
                self._numCol = self._mapWidth / self._cellWidth;
                self._numRow = self._mapHeight / self._cellHeight;
                self._sliceCol = self._mapWidth / self._sliceWidth;
                self._sliceRow = self._mapHeight / self._sliceHeight;
            };
            MapData.prototype.getCellPt = function (wx, wy, pt) {
                if (pt === void 0) { pt = null; }
                var tx = Math.floor(wx / this._cellWidth);
                var ty = Math.floor(wy / this._cellHeight);
                if (pt == null) {
                    pt = Pool.alloc(Point).setTo(tx, ty);
                }
                else {
                    pt.x = tx;
                    pt.y = ty;
                }
                return pt;
            };
            /**计算世界坐标，会乘以网格宽度32*/
            MapData.prototype.getWorldPt = function (tx, ty, pt) {
                if (pt === void 0) { pt = null; }
                var wx = Math.floor((tx + 0.5) * this._cellWidth);
                var wy = Math.floor((ty + 0.5) * this._cellHeight);
                if (pt == null) {
                    pt = Pool.alloc(Point).setTo(wx, wy);
                }
                else {
                    pt.x = wx;
                    pt.y = wy;
                }
                return pt;
            };
            MapData.prototype.getCellPtByIdx = function (idx, pt) {
                var x = idx % this._numCol;
                var y = Math.floor(idx / this._numCol);
                if (pt == null) {
                    pt = Pool.alloc(Point).setTo(x, y);
                }
                else {
                    pt.x = x;
                    pt.y = y;
                }
                return pt;
            };
            return MapData;
        }());
        scene.MapData = MapData;
        __reflect(MapData.prototype, "game.scene.MapData");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var SceneTools = game.scene.SceneTools;
        var facade = base.facade;
        /** 跨服斗法Ai */
        var KuafuDoufaAi = /** @class */ (function (_super) {
            __extends(KuafuDoufaAi, _super);
            function KuafuDoufaAi() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /** 寻找目标 */
            KuafuDoufaAi.prototype.commonFindTarget = function () {
                if (this._proxy.foeTargetId) {
                    //优先攻击目标
                    var vo = this._proxy.getVoById(this._proxy.foeTargetId);
                    if (vo && vo.percent > 0) {
                        return vo;
                    }
                }
                var competeProxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                if (competeProxy.attackStatus == 1 /* Attack */) {
                    //获取敌方玩家
                    var min = void 0;
                    var retVo = void 0;
                    var players = this._proxy.getEnemyVos(1 /* PLAYER */);
                    if (players.length > 0) {
                        for (var i = 0; i < players.length; i++) {
                            var vo = players[i];
                            var curDis = game.PointUtil.distance(this.player.vo.x, this.player.vo.y, vo.x, vo.y);
                            if (!min) {
                                min = curDis;
                                retVo = vo;
                            }
                            else if (curDis > min) {
                                min = curDis;
                                retVo = vo;
                            }
                        }
                    }
                    //
                    if (retVo && retVo.percent > 0) {
                        //最近的地方玩家
                        return retVo;
                    }
                    //攻击状态，则打boss
                    var enemies = this._proxy.getEnemyVos(3 /* MONSTER */); //获取怪物，区分ObjectType，敌人攻击走上面
                    if (!enemies || 0 == enemies.length) {
                        return null;
                    }
                    var myCamp = this.player.vo.camp; //自己的阵营
                    var monsterCamp = myCamp == 1 /* RED */ ? 2 /* BLUE */ : 1 /* RED */; //怪物的阵营
                    var curIndex = competeProxy.findCurMonsterIndex(monsterCamp); //当前可攻击的怪物
                    for (var i = 0, l = enemies.length; i < l; ++i) {
                        var vo = enemies[i];
                        if (!SceneTools.isTargetReady(vo)) {
                            continue;
                        }
                        if (vo.index == curIndex) {
                            this._proxy.foeTargetId = vo.entity_id; //直接设置BOSS为攻击目标
                            return vo;
                        }
                    }
                    return null;
                }
                //驻守状态，则攻击敌方玩家
                return this.findMinDisTarget(1 /* PLAYER */);
            };
            return KuafuDoufaAi;
        }(scene.CommonAi));
        scene.KuafuDoufaAi = KuafuDoufaAi;
        __reflect(KuafuDoufaAi.prototype, "game.scene.KuafuDoufaAi");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Handler = base.Handler;
        var Pool = base.Pool;
        var Avatar = /** @class */ (function (_super) {
            __extends(Avatar, _super);
            function Avatar() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                //身体其他部位
                _this._partMap = {};
                _this._bodyIsShow = false;
                _this._durationN = 50;
                return _this;
                // public set isAdventGodAtk(val: boolean) {
                //     this._isAdventGodAtk = val;
                // }
            }
            Object.defineProperty(Avatar.prototype, "ower", {
                get: function () {
                    return this._ower;
                },
                set: function (ower) {
                    this._ower = ower;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Avatar.prototype, "close", {
                get: function () {
                    return this._close;
                },
                set: function (v) {
                    this._close = v;
                    if (v)
                        return;
                    for (var k in this._partMap) {
                        var part = this._partMap[k];
                        Pool.release(part);
                        this._partMap[k] = null;
                        delete this._partMap[k];
                    }
                    this._bodyIsShow = false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Avatar.prototype, "bodyIsShow", {
                get: function () {
                    return this._bodyIsShow;
                },
                set: function (ret) {
                    this._bodyIsShow = ret;
                },
                enumerable: true,
                configurable: true
            });
            // public getSoulWareDsp(): DisplayObject {
            //     let sw = this._partMap[ConfigHead.Body];
            //     if (!sw) return null;
            //     return sw.display;
            // }
            Avatar.prototype.getAvatarPart = function (type) {
                return this._partMap[type];
            };
            Object.defineProperty(Avatar.prototype, "onComplete", {
                set: function (value) {
                    this._ctrl.compHandler = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Avatar.prototype, "isComplete", {
                get: function () {
                    return this._ctrl.isComplete;
                },
                enumerable: true,
                configurable: true
            });
            // public set onHorseComplete(value: Handler) {
            //     this._ctrlHorse.compHandler = value;
            // }
            //
            // public get isHorseComplete() {
            //     return this._ctrlHorse.isComplete;
            // }
            Avatar.prototype.advanceTime = function (elapseTime) {
                if (this.close) {
                    return;
                }
                for (var k in this._partMap) {
                    var part = this._partMap[k];
                    if (part.srcUpdate) {
                        part.loadCfg();
                    }
                }
                if (this._ctrl) {
                    this._ctrl.advanceTime(elapseTime);
                }
                if (this._ctrlHorse) {
                    this._ctrlHorse.advanceTime(elapseTime);
                }
                // if (this._buffCtrl) {
                //     this._buffCtrl.advanceTime(elapseTime);
                // }
                if (this._soulWareCtrl) {
                    this._soulWareCtrl.advanceTime(elapseTime);
                }
                // if (this._adventGodCtrl) {
                //     this._adventGodCtrl.advanceTime(elapseTime);
                // }
            };
            Avatar.prototype.updatePart = function (part, id, act, dir) {
                part.setSrc(id, act, dir);
            };
            Avatar.prototype.setPart = function (partIdx, id, func) {
                var self = this;
                if (self.close) {
                    return;
                }
                var part = self._partMap[partIdx];
                if (id == null) {
                    Pool.release(part);
                    self._partMap[partIdx] = null;
                    delete self._partMap[partIdx];
                    if (partIdx == 360 /* Horse */) {
                        this.updatePartMap();
                    }
                    return;
                }
                if (!part) {
                    self._partMap[partIdx] = part = Pool.alloc(scene.AvatarPart);
                    if (partIdx == 405 /* Body */ || partIdx == 404 /* Wing */ || partIdx == 403 /* Weapon */
                        || partIdx == 409 /* Huashen */ || partIdx == 9902 /* Huashen2 */) {
                        part.setLoadCb(Handler.alloc(self, self.onPartLoadCfg));
                        if (partIdx == 409 /* Huashen */ || partIdx == 9902 /* Huashen2 */) {
                            this.dsp.x = -100;
                            // if(this._dir == Direction.LEFT_DOWN ){ //6
                            //     this.dsp.x = -100;
                            // } else if(this._dir == Direction.LEFT ){ //7
                            //     this.dsp.x = -100;
                            // }else if(this._dir == Direction.LEFT_UP){ //8
                            //     this.dsp.x = -100;
                            // }else if(this._dir == Direction.RIGHT){ //3
                            //     this.dsp.x = -100;
                            // } else if(this._dir == Direction.RIGHT_UP){ //2
                            //     this.dsp.x = -100;
                            // }else if(this._dir == Direction.RIGHT_DOWN){ //4
                            //     this.dsp.x = -100;
                            // }
                        }
                        else {
                            this.dsp.x = 0;
                        }
                        //self.updatePartMap();
                    }
                    if (partIdx == 360 /* Horse */ || partIdx == 9900 /* Horse2 */) {
                        part.setLoadCb(Handler.alloc(self, self.onPartHorseLoadCfg));
                        //self.updatePartMap();
                    }
                    // if (partIdx == ConfigHead.Gory) {
                    //     part.setLoadCb(Handler.alloc(self, self.onBuffLoadCfg));
                    // }
                    // if (partIdx == ConfigHead.AdventGod) {
                    //     part.setLoadCb(Handler.alloc(self, self.onAdventGodLoadCfg));
                    // }
                    part.loadPri = self.loadPri;
                    part.init(partIdx, self.resType);
                    // if(partIdx == ConfigHead.Body){
                    //     this._bodyIsShow = false;
                    //     part.setSrc(id, self._act, self._dir,Handler.alloc(this,function(data:any){
                    //         delayCall(Handler.alloc(self,function () {
                    //             self._bodyIsShow = true;
                    //         }),1000);
                    //     }));
                    // }else{
                    part.setSrc(id, self._act, self._dir);
                    //}
                }
                var act_name = self._act;
                /**更新坐骑部位2时，动作需要+1*/
                if (partIdx == 9900 /* Horse2 */) {
                    act_name = act_name + 2;
                }
                self.updatePart(part, id, act_name, self._dir);
            };
            Avatar.prototype.resetActDir = function () {
                this._act = "std" /* STAND */;
                this._dir = 2 /* RIGHT_UP */;
                this._fixFrame = null;
            };
            Avatar.prototype.setAct = function (act) {
                // if(this._ower.enType == ObjectType.PLAYER){
                //     console.log("act = " + act);
                // }
                var self = this;
                if (act == self._act) {
                    self.updatePartMap();
                    return;
                }
                self._act = act;
                self.updatePartMap();
            };
            Avatar.prototype.setDir = function (dir) {
                var self = this;
                // if (dir == self._dir) {
                //     return;
                // }
                self._dir = dir;
                self.updatePartMap();
            };
            Avatar.prototype.updatePartMap = function () {
                var self = this;
                if (self._ctrl) {
                    self._ctrl.stop();
                }
                self.resetDurationN();
                if (self._ctrlHorse) {
                    self._ctrlHorse.stop();
                }
                // if (this._adventGodCtrl) {
                //     this._adventGodCtrl.stop();
                // }
                //let isPlayer = self.objType == ObjectType.PLAYER;
                //let isRide = isPlayer && self._partMap[ConfigHead.Horse] != null;
                for (var k in self._partMap) {
                    var type = Number(k);
                    var part = self._partMap[k];
                    var act_name = self._act;
                    // if (false && isRide && (RideNoRun.indexOf(type) > -1) && self._act != ActionName.JUMP + 3) {
                    //     //act_name = type == ConfigHead.Body ? ActionName.RIDE : ActionName.STAND;
                    //    //act_name = ActionName.STAND;
                    //     //part.display.y = type == ConfigHead.Body ? 0 : 60;
                    // } else
                    // if (self.resType == ConfigHead.SoulWare) {
                    //     // part.display.y = FaBaoRightPt.y;  // 不需要重置display的y
                    // }
                    // else{
                    part.display.y = 0;
                    // }
                    if (type == 9900 /* Horse2 */) {
                        act_name = self._act + 2;
                    }
                    self.updatePart(part, part.getId(), act_name, self._dir);
                }
            };
            /** 设置固定帧 */
            Avatar.prototype.setFixFrame = function (frame) {
                this._fixFrame = frame;
            };
            Avatar.prototype.onFrameChanged = function (frame) {
                for (var k in this._partMap) {
                    if (k == 360 /* Horse */.toString() || k == 9900 /* Horse2 */.toString()) {
                        continue;
                    }
                    var part = this._partMap[k];
                    if (this._fixFrame) {
                        if (this._fixFrame < (part.data && part.data.numFrames)) {
                            part.onFrame(this._fixFrame);
                        }
                    }
                    else {
                        if (frame < (part.data && part.data.numFrames)) {
                            part.onFrame(frame);
                        }
                        else {
                            //做一下优化
                            //part.setSrc(part.getId(),ActionName.STAND,part.dir);
                        }
                    }
                }
            };
            Avatar.prototype.onFrameHorseChanged = function (frame) {
                for (var k in this._partMap) {
                    // if (k == ConfigHead.Gory.toString()) {
                    //     continue;
                    //}
                    if (k != 360 /* Horse */.toString() && k != 9900 /* Horse2 */.toString()) {
                        continue;
                    }
                    var part = this._partMap[k];
                    if (this._fixFrame) {
                        if (this._fixFrame < (part.data && part.data.numFrames)) {
                            part.onFrame(this._fixFrame);
                        }
                    }
                    else {
                        if (frame < (part.data && part.data.numFrames)) {
                            part.onFrame(frame);
                        }
                        else {
                            //做一下优化
                            //part.setSrc(part.getId(),ActionName.STAND,part.dir);
                        }
                    }
                }
            };
            // private onBuffFrameChanged(frame: number): void {
            //     let part = this._partMap[ConfigHead.Gory];
            //     if (part) {
            //         part.onFrame(frame);
            //     }
            // }
            Avatar.prototype.onPartLoadCfg = function (duration, url) {
                this._durationN = Math.min(this._durationN, duration.length);
                duration.length = this._durationN;
                this.sortPart();
                this._ctrl.init(duration, url);
                this._ctrl.loop = this.loop;
            };
            Avatar.prototype.onPartHorseLoadCfg = function (duration, url) {
                this.sortPart();
                this._ctrlHorse.init(duration, url);
                this._ctrlHorse.loop = true;
            };
            // private onBuffLoadCfg(duration: number[], url: string): void {
            //     let self = this;
            //     self.sortPart();
            //     if (!self._buffCtrl) {
            //         self._buffCtrl = Pool.alloc(AnimCtrl);
            //         self._buffCtrl.changeHandler = Handler.alloc(self, self.onBuffFrameChanged);
            //         // let player = this.parent as GPlayer;
            //         // let scene = player.parent as Scene;
            //         // let goly = scene.ctrl.getGory(player.vo.entity_id)
            //         // goly.initGory();
            //     }
            //     self._buffCtrl.init(duration, url);
            //     self._buffCtrl.loop = true;
            // }
            // private onAdventGodLoadCfg(duration: number[], url: string): void {
            //     let self = this;
            //     self.sortPart();
            //     if (!self._adventGodCtrl) {
            //         self._adventGodCtrl = Pool.alloc(AnimCtrl);
            //         self._adventGodCtrl.changeHandler = Handler.alloc(self, self.onAdventGodFrameChanged);
            //     }
            //     self._adventGodCtrl.init(duration, url);
            //     self._adventGodCtrl.loop = true;
            // }
            // private onAdventGodFrameChanged(frame: number) {
            //     let part = this._partMap[ConfigHead.AdventGod];
            //     if (part) {
            //         part.onFrame(frame);
            //     }
            // }
            Avatar.prototype.sortPart = function () {
                var self = this;
                var order;
                var isPlayer = self.objType == 1 /* PLAYER */;
                var isRide = isPlayer && self._partMap[360 /* Horse */] != null;
                //let act = isRide ? ActionName.RIDE : self._act;
                var act = isRide ? "std" /* STAND */ : self._act;
                order = game.getSortOrder(self._dir, act);
                // order = getSortOrder(self._dir, self._act);
                for (var i = 0, len = order.length; i < len; i++) {
                    var idx = order[i];
                    var part = self._partMap[idx];
                    if (part == null) {
                        continue;
                    }
                    if (idx == 409 /* Huashen */ || idx == 9902 /* Huashen2 */) {
                        part.display.x = scene.HuashenPt.x;
                        part.display.y = scene.HuashenPt.y;
                    }
                    self.dsp.addChildAt(part.display, i);
                }
            };
            Avatar.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                var self = this;
                self.loadPri = game.LoadPri.Scene;
                self._ctrl = Pool.alloc(game.AnimCtrl);
                self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChanged);
                self.loop = true;
                this.resetDurationN();
                //坐骑分开
                self._ctrlHorse = Pool.alloc(game.AnimCtrl);
                self._ctrlHorse.changeHandler = Handler.alloc(self, self.onFrameHorseChanged);
            };
            Object.defineProperty(Avatar.prototype, "scale", {
                set: function (v) {
                    this.scaleX = this.scaleY = v;
                },
                enumerable: true,
                configurable: true
            });
            Avatar.prototype.onRelease = function () {
                var self = this;
                self._act = null;
                self._dir = null;
                self.resType = null;
                self._close = false;
                self.objType = null;
                self._fixFrame = null;
                //复原
                this.dsp.x = 0;
                for (var k in self._partMap) {
                    var part = self._partMap[k];
                    Pool.release(part);
                    delete self._partMap[k];
                }
                Pool.release(self._ctrl);
                self._ctrl = null;
                Pool.release(self._ctrlHorse);
                self._ctrlHorse = null;
                this.resetDurationN();
                // Pool.release(self._buffCtrl);
                // self._buffCtrl = null;
                self.scaleY = self.scaleX = 1;
                // Pool.release(self._adventGodCtrl);
                // self._adventGodCtrl = null;
                this._bodyIsShow = false;
            };
            Avatar.prototype.resetDurationN = function () {
                this._durationN = 50;
            };
            return Avatar;
        }(scene.BaseDraw));
        scene.Avatar = Avatar;
        __reflect(Avatar.prototype, "game.scene.Avatar");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Handler = base.Handler;
        var Pool = base.Pool;
        var GDirUtil = game.utils.GDirUtil;
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var Tween = base.Tween;
        var AvatarPart = /** @class */ (function () {
            //private preFrame:number;
            function AvatarPart() {
                this.y = 0;
                this._bmp = Pool.alloc(game.BitmapBase);
                this._sp = new DisplayObjectContainer();
                this._sp.addChild(this._bmp);
            }
            Object.defineProperty(AvatarPart.prototype, "display", {
                get: function () {
                    return this._sp;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarPart.prototype, "idx", {
                get: function () {
                    return this._idx;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarPart.prototype, "dir", {
                get: function () {
                    return this._dir;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarPart.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            AvatarPart.prototype.init = function (idx, resType) {
                var self = this;
                self._resType = resType;
                self._idx = idx;
                self.scale = 1;
                self.y = 0;
            };
            AvatarPart.prototype.setLoadCb = function (cb) {
                this._loadCb = cb;
            };
            AvatarPart.prototype.checkAct = function (act) {
                var self = this;
                // if (self._idx == SurfaceType.Buff || self._resType == SurfaceType.SoulWare) {
                //     return ActionName.STAND;
                // }
                // if (self._idx == SurfaceType.Buff) {
                //     return ActionName.STAND;
                // }
                // if (self._idx == ConfigHead.Wing) {
                //     if (act.indexOf(ActionName.JUMP) > -1) {
                //         return ActionName.JUMP + 1;
                //     }
                // }
                if (self._idx == 360 /* Horse */ || self._idx == 9900 /* Horse2 */) {
                    if (act.indexOf("std" /* STAND */) == -1) {
                        //return self._idx == SurfaceType.Horse ? ActionName.STAND : ActionName.RUN + 2;
                        return self._idx == 360 /* Horse */ ? "std" /* STAND */ : "std" /* STAND */ + 2;
                    }
                }
                // if (self._idx == SurfaceType.AdventGod) {
                //     if (act.indexOf(ActionName.ATTACK) > -1) {
                //         // if (act != ActionName.ATTACK + 1) {
                //         //     act = ActionName.ATTACK + 1;
                //         // }
                //         act = ActionName.ATTACK + 1;
                //     } else {
                //         return ActionName.STAND;
                //     }
                // }
                return act;
            };
            AvatarPart.prototype.checkDir = function (dir) {
                var self = this;
                // if (self._resType == SurfaceType.SoulWare) {
                //     return Direction.DOWN;
                // }
                // if (self._idx == SurfaceType.Gory || self._act == ActionName.ATTACK + 8) {
                //     return Direction.RIGHT;
                // }
                if (self._act == "atk" /* ATTACK */ + 8) {
                    return 3 /* RIGHT */;
                }
                return dir;
            };
            AvatarPart.prototype.setSrc = function (id, act, dir, func) {
                var self = this;
                self._loadedFunc = func;
                self._id = id;
                self._act = self.checkAct(act);
                self._dir = self.checkDir(dir);
                self.loadCfg();
            };
            AvatarPart.prototype.getId = function () {
                return this._id;
            };
            AvatarPart.prototype.loadCfg = function () {
                var self = this;
                self.srcUpdate = false;
                var src = self.getSrc();
                if (src == null) {
                    return;
                }
                if (self._src == src && self._data && self._data.isLoaded) {
                    self._cbCall = false;
                    self.onLoadComplete(self._data, src);
                    return;
                }
                self.removeCurrent();
                game.LoadMgr.ins.addRef(src);
                self._src = src;
                var res = game.LoadMgr.ins.getRes(src);
                if (res) {
                    self._cbCall = false;
                    self.onLoadComplete(res, src);
                    return;
                }
                if (self._cbCall) {
                    var durList = game.LoadMgr.ins.getAnimDur(src);
                    if (durList) {
                        self.callCb(durList);
                    }
                }
                game.LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoadComplete), self.loadPri);
            };
            AvatarPart.prototype.onLoadComplete = function (data, url) {
                var self = this;
                if (url != self._src) {
                    return;
                }
                self._data = data;
                self._bmp.scaleX = data.scale * self._bmpScaleX;
                self._bmp.scaleY = data.scale;
                if (game.NoScaleSurface.indexOf(self._resType) == -1) {
                    self._bmp.scaleX *= gso.avatarScale;
                    self._bmp.scaleY *= gso.avatarScale;
                }
                self.scaleX = self._bmp.scaleX;
                self.scaleY = self._bmp.scaleY;
                if (self._loadCb && !self._cbCall) {
                    var durList = [];
                    for (var i = 0, n = data.numFrames; i < n; i++) {
                        durList.push(data.getVal(i, "dur"));
                    }
                    self.callCb(durList);
                }
                self.onFrame(0);
                if (self._loadedFunc) {
                    self._loadedFunc.exec(url);
                    self._loadedFunc = null;
                }
            };
            AvatarPart.prototype.callCb = function (durList) {
                this._cbCall = true;
                var tmp = AvatarPart.Tmp;
                tmp.length = 0;
                tmp[0] = durList;
                tmp[1] = this._src;
                this._loadCb.exec(tmp);
                tmp.length = 0;
            };
            AvatarPart.prototype.onFrame = function (frame) {
                var self = this;
                if (!self._data || !self._data.isLoaded) {
                    return;
                }
                // if (self._idx == SurfaceType.Gory) {
                //     if (gso["scale"]) self.scale = gso["scale"];
                //     self._bmp.scaleX = self.scaleX * self.scale;
                //     self._bmp.scaleY = self.scaleY * self.scale;
                // }
                //if(this.preFrame != frame){
                //     if (self._idx == SurfaceType.Body && this._src.indexOf("assets/anim/body/female_01/atk1") > -1){
                //
                //         console.log("_src = "+ this._src);
                //         console.log("frame = "+frame);
                //     }
                self._data.drawTo(self._bmp, frame, self._bmp.scaleX);
                //this.preFrame = frame;
                // }
                // if (self._idx == SurfaceType.Gory) {
                //     self.display.y = self.y;
                // }
            };
            AvatarPart.prototype.getSrc = function () {
                var self = this;
                if (!self._id || !self._act || !self._dir) {
                    return null;
                }
                var dir = this.getFinalDir(self._dir);
                self._bmpScaleX = this.getBmpScaleX(self._dir);
                var type = self._resType != undefined ? self._resType : self._idx;
                // if (self._idx == SurfaceType.Buff) {
                //     type = self._idx;
                // }
                //死亡 羽翼没有动画  妖魔入侵水晶没有动画
                if (self._act == "die" /* DIE */ && type == 404 /* Wing */) { // || type == SurfaceType.Weapon || type == SurfaceType.Blade
                    return null;
                }
                //重剑攻击不显示轻剑
                if (type == 403 /* Weapon */) {
                    if (game.AtkNoWeapon.indexOf(self._act) != -1) {
                        if (this._bmp.parent)
                            self._bmp.parent.removeChild(self._bmp);
                        return null;
                    }
                    else {
                        if (!this._bmp.parent)
                            this._sp.addChild(this._bmp);
                    }
                }
                // 御灵
                // if (type == SurfaceType.Gory) {
                //     if (self._act == ActionName.DIE) {
                //         return null;
                //     } else {
                //         self._act = ActionName.STAND;
                //     }
                // }
                return game.ResUtil.getModelUrlByModelName(type, self._id, dir, self._act);
            };
            /**删除当前*/
            AvatarPart.prototype.removeCurrent = function () {
                var self = this;
                game.LoadMgr.ins.decRef(self._src);
                self._data = undefined;
                self._src = undefined;
                self._bmp.texture = null;
                self._bmp.scaleX = self._bmp.scaleY = 1;
                self._cbCall = false;
            };
            AvatarPart.prototype.dispose = function () {
                this.onRelease();
            };
            AvatarPart.prototype.onAlloc = function () {
                this._bmpScaleX = 1;
                this._sp.addChild(this._bmp);
            };
            AvatarPart.prototype.onRelease = function () {
                var self = this;
                Tween.remove(self);
                self._idx = undefined;
                self._id = undefined;
                self._act = undefined;
                self._dir = undefined;
                self._resType = undefined;
                self.scale = 1;
                self.y = 0;
                self.display.x = 0;
                self.display.y = 0;
                if (self.display && self.display.parent) {
                    self.display.parent.removeChild(self.display);
                }
                self.removeCurrent();
                if (self._bmp && self._bmp.parent) {
                    self._bmp.parent.removeChild(self._bmp);
                }
                Pool.release(self._loadCb);
                self._loadCb = undefined;
                //this.preFrame = -1;
            };
            AvatarPart.prototype.getFinalDir = function (dir) {
                var alter_dir = dir;
                if (GDirUtil.Dir_Res_Num == 5) {
                    return GDirUtil.getMir(dir);
                }
                if (GDirUtil.Dir_Res_Num == 2) {
                    return GDirUtil.getMir2(dir);
                }
                if (GDirUtil.Dir_Res_Num == 3) {
                    return GDirUtil.getMir3(dir);
                }
                return alter_dir;
            };
            AvatarPart.prototype.getBmpScaleX = function (dir) {
                var scaleX = 1;
                if (GDirUtil.Dir_Res_Num == 5) {
                    return GDirUtil.getMir(dir) != dir ? -1 : 1;
                }
                if (GDirUtil.Dir_Res_Num == 2) {
                    return GDirUtil.getBmpScaleXFor2(dir);
                }
                if (GDirUtil.Dir_Res_Num == 3) {
                    return GDirUtil.getBmpScaleXFor3(dir);
                }
                return scaleX;
            };
            AvatarPart.Tmp = [];
            return AvatarPart;
        }());
        scene.AvatarPart = AvatarPart;
        __reflect(AvatarPart.prototype, "game.scene.AvatarPart", ["base.PoolObject", "base.DisposeObject"]);
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var ActMgr = /** @class */ (function (_super) {
            __extends(ActMgr, _super);
            function ActMgr() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ActMgr.prototype, "isEmpty", {
                get: function () {
                    return !this.numChildren;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActMgr.prototype, "curAct", {
                get: function () {
                    if (this.numChildren == 0) {
                        return null;
                    }
                    return this.children[0];
                },
                enumerable: true,
                configurable: true
            });
            ActMgr.prototype.has = function (act) {
                for (var i = 0, n = this.numChildren; i < n; i++) {
                    var child = this.children[i];
                    if (child instanceof act) {
                        return true;
                    }
                }
                return false;
            };
            ActMgr.prototype.add = function (child) {
                var act = child;
                if (act instanceof scene.MoveAct) {
                    this.onAddMove();
                }
                if (act instanceof scene.JumpMoveAct) {
                    this.onAddJumpMove();
                }
                if (act instanceof scene.DieAct) {
                    this.removeAll();
                }
                if (act instanceof scene.AttackAct) {
                    this.onAddAtk();
                }
                var isEmpty = this.isEmpty;
                if (act instanceof scene.HitAct) {
                    act.isChangeAct = isEmpty;
                }
                _super.prototype.add.call(this, child);
                if (isEmpty || act instanceof scene.HitAct) {
                    act.start();
                }
            };
            ActMgr.prototype.onAddAtk = function () {
                var cur = this.curAct;
                var actor = this.parent;
                if (cur instanceof scene.MoveAct && (actor.vo.type == 1 /* PLAYER */ || actor.vo.type == 4 /* PET */)) {
                    cur.abort();
                    this.remove(cur);
                    return;
                }
                this.removeAllActByCls(scene.HitAct);
            };
            ActMgr.prototype.onAddJumpMove = function () {
                var cur = this.curAct;
                var actor = this.parent;
                if (actor.vo.type == 1 /* PLAYER */ || actor.vo.type == 4 /* PET */) {
                    if (cur instanceof scene.AttackAct) {
                        cur.abort();
                        this.remove(cur);
                        return;
                    }
                    else if (cur instanceof scene.MoveAct) {
                        cur.abort(true);
                    }
                }
                this.removeAllActByCls(scene.JumpMoveAct);
            };
            ActMgr.prototype.onAddMove = function () {
                var cur = this.curAct;
                var actor = this.parent;
                if (actor.vo.type == 1 /* PLAYER */ || actor.vo.type == 4 /* PET */) {
                    if (cur instanceof scene.AttackAct) {
                        cur.abort();
                        this.remove(cur);
                        return;
                    }
                    else if (cur instanceof scene.MoveAct) {
                        cur.abort(true);
                    }
                }
                this.removeAllActByCls(scene.MoveAct);
            };
            ActMgr.prototype.removeAllActByCls = function (cls) {
                for (var i = 0; i < this.children.length; i++) {
                    var act = this.children[i];
                    if (act instanceof cls) {
                        this.remove(act);
                        i--;
                    }
                }
            };
            ActMgr.prototype.advanceTime = function (elapseTime) {
                var cur = this.curAct;
                if (cur != null && (cur.isDone || cur.isAbort)) {
                    this.remove(cur);
                    this.doNext();
                }
                _super.prototype.advanceTime.call(this, elapseTime);
            };
            ActMgr.prototype.doNext = function () {
                if (0 == this.numChildren) {
                    return;
                }
                this.curAct.start();
            };
            return ActMgr;
        }(scene.BaseCont));
        scene.ActMgr = ActMgr;
        __reflect(ActMgr.prototype, "game.scene.ActMgr");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var MainGPlayerVo = /** @class */ (function (_super) {
            __extends(MainGPlayerVo, _super);
            function MainGPlayerVo() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.isAutoHangUp = true;
                return _this;
            }
            return MainGPlayerVo;
        }(scene.GPlayerVo));
        scene.MainGPlayerVo = MainGPlayerVo;
        __reflect(MainGPlayerVo.prototype, "game.scene.MainGPlayerVo");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var Point = egret.Point;
        var delayCall = base.delayCall;
        var Handler = base.Handler;
        var clearDelay = base.clearDelay;
        var DieAct = /** @class */ (function (_super) {
            __extends(DieAct, _super);
            function DieAct() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._timeOutKey = 0;
                return _this;
            }
            DieAct.prototype.onStart = function () {
                _super.prototype.onStart.call(this);
                this._actor.onDie();
                this._timeOutKey = delayCall(Handler.alloc(this, this.onDieTimeOut), 150);
            };
            DieAct.prototype.onAbort = function () {
                _super.prototype.onAbort.call(this);
                this._actor.onDieEnd();
            };
            DieAct.prototype.onDone = function () {
                _super.prototype.onDone.call(this);
                this._actor.onDieEnd();
            };
            DieAct.prototype.onDieTimeOut = function () {
                this.onAnimComp();
            };
            DieAct.prototype.onAnimComp = function () {
                var self = this;
                clearDelay(this._timeOutKey);
                this._timeOutKey = 0;
                if (!self.attacker) {
                    this.done();
                    return;
                }
                var angle = game.PointUtil.angle(self.attacker.x, self.attacker.y, self._actor.x, self._actor.y);
                self._start = Pool.alloc(Point).setTo(self._actor.x, self._actor.y);
                var dis = 230 * 0.6;
                self._flyEnd = game.PointUtil.getDistPt(self._start, angle, dis);
                self._curTime = 0;
                self._moveTime = dis / 0.5;
                self._totalTime = self._moveTime + 1000;
            };
            DieAct.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                var self = this;
                if (!self._flyEnd) {
                    return;
                }
                self._curTime += elapseTime;
                if (self._curTime >= self._totalTime) {
                    self.done();
                    return;
                }
                var p = self._curTime / self._moveTime;
                if (p <= 1) {
                    self._actor.x = self._start.x + (self._flyEnd.x - self._start.x) * p;
                    self._actor.y = self._start.y + (self._flyEnd.y - self._start.y) * p;
                }
                if (self._curTime > self._moveTime) {
                    self._actor.alpha = 1 - (self._curTime - self._moveTime) / 1000;
                }
            };
            DieAct.prototype.onRelease = function () {
                clearDelay(this._timeOutKey);
                this._timeOutKey = 0;
                this.attacker = null;
                Pool.release(this._start);
                this._start = null;
                Pool.release(this._flyEnd);
                this._flyEnd = null;
                _super.prototype.onRelease.call(this);
            };
            return DieAct;
        }(scene.BaseAct));
        scene.DieAct = DieAct;
        __reflect(DieAct.prototype, "game.scene.DieAct");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Handler = base.Handler;
        var delayCall = base.delayCall;
        var clearDelay = base.clearDelay;
        var HitAct = /** @class */ (function (_super) {
            __extends(HitAct, _super);
            function HitAct() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._timeoutKey = 0;
                _this.isChangeAct = true;
                return _this;
            }
            HitAct.prototype.onStart = function () {
                _super.prototype.onStart.call(this);
                var self = this;
                self._actor.onHitStart(self.isChangeAct);
                var dir = this.eftDir == undefined ? self._actor.dir : this.eftDir;
                this._actor.addEft(scene.BossHitEftSrc, 0, -50, dir);
                var isBoss = self._actor.vo.monsterType == 2 /* Boss */;
                var delay = isBoss ? 100 : 500;
                self._timeoutKey = delayCall(Handler.alloc(self, self.onTimeOut), delay);
            };
            HitAct.prototype.onTimeOut = function () {
                if (this.isDone) {
                    return;
                }
                this.done();
            };
            HitAct.prototype.onEffCom = function () {
                if (this.isDone) {
                    return;
                }
                this.done();
            };
            HitAct.prototype.onDone = function () {
                _super.prototype.onDone.call(this);
                if (this._actor) {
                    this._actor.onHitEnd();
                }
            };
            HitAct.prototype.onAbort = function () {
                _super.prototype.onAbort.call(this);
                if (this._actor) {
                    this._actor.onHitEnd();
                }
            };
            HitAct.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
            };
            HitAct.prototype.onRelease = function () {
                var self = this;
                self.isChangeAct = true;
                clearDelay(self._timeoutKey);
                self._timeoutKey = 0;
                _super.prototype.onRelease.call(this);
            };
            return HitAct;
        }(scene.BaseAct));
        scene.HitAct = HitAct;
        __reflect(HitAct.prototype, "game.scene.HitAct");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_19) {
        var Handler = base.Handler;
        var Tween = base.Tween;
        var JumpMoveAct = /** @class */ (function (_super) {
            __extends(JumpMoveAct, _super);
            function JumpMoveAct() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._bezierPosArr = [];
                /**
                 * 每段贝塞尔曲线运动花费的时间
                 */
                _this._timePerDis = 0;
                /**
                 * 贝塞尔曲线的段数
                 */
                _this._disCnt = 10;
                /**
                 * 是否已经计算过速度
                 */
                _this._isCountSpeed = false;
                return _this;
            }
            JumpMoveAct.prototype.onStart = function () {
                var self = this;
                if (!self._starP || !self._midP || !self._endP) {
                    self.done();
                    return;
                }
                console.log("......start do bezerMove......");
                self.moveBezierPoint();
                _super.prototype.onStart.call(this);
            };
            JumpMoveAct.prototype.setPath = function (path, moveType, onMoveEnd) {
                var self = this;
                if (path.length != 3) {
                    self._starP = null;
                    self._midP = null;
                    self._endP = null;
                    console.log("路点信息是不对的，只能是3个");
                    return;
                }
                self._moveType = moveType;
                self._onMoveEnd = onMoveEnd;
                self._starP = scene_19.MapData.ins.getWorldPt(path[0].x, path[0].y, self._starP);
                self._midP = scene_19.MapData.ins.getWorldPt(path[1].x, path[1].y, self._midP);
                self._endP = scene_19.MapData.ins.getWorldPt(path[2].x, path[2].y, self._endP);
                var arr = [];
                arr.push(self._starP, self._midP, self._endP);
                self._bezierPosArr = game.BezierUtil.getBezierPos(arr, self._disCnt);
                self._isCountSpeed = false;
            };
            JumpMoveAct.prototype.moveBezierPoint = function () {
                var self = this;
                if (!self._bezierPosArr || self._bezierPosArr.length == 0) {
                    if (self._onMoveEnd) {
                        self._onMoveEnd.exec();
                    }
                    console.log("......end do bezerMove......");
                    self.done();
                    Tween.remove(self);
                    return;
                }
                if (!self._isCountSpeed) {
                    self._isCountSpeed = true;
                    var dis = game.PointUtil.distancePt(self._starP, self._endP);
                    var speed = self._actor.getMoveSpeed(self._moveType);
                    self._timePerDis = dis / speed / self._disCnt;
                    if (!self._timePerDis) {
                        console.debug("计算移动时间错误！", self._starP.toString(), self._endP.toString(), this._moveType, this._actor.vo.speed);
                    }
                }
                var s = self._bezierPosArr.shift();
                Tween.get(self._actor).to({ x: s.x, y: s.y }, self._timePerDis, Handler.alloc(self, self.flusCameraPos, [{ x: self._actor.x, y: self._actor.y }])).exec(Handler.alloc(self, self.moveBezierPoint));
            };
            JumpMoveAct.prototype.flusCameraPos = function (obj) {
                var self = this;
                console.log("...镜头位置...，", obj.x, obj.y);
                var scene = this._actor.parent;
                var p = scene_19.MapData.ins.getCellPt(obj.x, obj.y, self._starP);
                scene.updateFocus(obj.x, obj.y);
            };
            return JumpMoveAct;
        }(scene_19.BaseAct));
        scene_19.JumpMoveAct = JumpMoveAct;
        __reflect(JumpMoveAct.prototype, "game.scene.JumpMoveAct");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var Handler = base.Handler;
        var SceneItem = /** @class */ (function (_super) {
            __extends(SceneItem, _super);
            function SceneItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SceneItem.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                var self = this;
                self._ctrl = Pool.alloc(game.AnimCtrl);
                self._ctrl.changeHandler = Handler.alloc(self, self.onFrame);
                self._bmp = Pool.alloc(game.BitmapBase);
                self.dsp.addChild(self._bmp);
            };
            Object.defineProperty(SceneItem.prototype, "src", {
                get: function () {
                    return this._src;
                },
                set: function (value) {
                    var self = this;
                    if (value == null) {
                        return;
                    }
                    if (self._src == value && self._data && self._data.isLoaded) {
                        self.onLoadComplete(self._data, value);
                    }
                    else {
                        self.removeCurrent();
                        game.LoadMgr.ins.addRef(value);
                        self._src = value;
                        game.LoadMgr.ins.loadMerge(self.src, Handler.alloc(self, self.onLoadComplete), game.LoadPri.Scene);
                    }
                },
                enumerable: true,
                configurable: true
            });
            SceneItem.prototype.onLoadComplete = function (data, url) {
                var self = this;
                if (url != self._src) {
                    return;
                }
                self._data = data;
                self._bmp.scaleX = data.scale;
                self._bmp.scaleY = data.scale;
                var durList = [];
                for (var i = 0, n = data.numFrames; i < n; i++) {
                    durList.push(data.getVal(i, "dur"));
                }
                self.onPartLoadCfg(durList, url);
                self.onFrame(0);
            };
            SceneItem.prototype.onFrame = function (frame) {
                var self = this;
                if (!self._data || !self._data.isLoaded) {
                    return;
                }
                self._data.drawTo(self._bmp, frame);
            };
            SceneItem.prototype.removeCurrent = function () {
                var self = this;
                game.LoadMgr.ins.decRef(self._src);
                self._data = undefined;
                self._src = undefined;
                if (self._bmp) {
                    self._bmp.texture = null;
                    self._bmp.scaleX = self._bmp.scaleY = 1;
                }
            };
            SceneItem.prototype.onPartLoadCfg = function (duration, url) {
                this._ctrl.init(duration, url);
                this._ctrl.loop = true;
            };
            SceneItem.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                var self = this;
                if (self._ctrl) {
                    self._ctrl.advanceTime(elapseTime);
                }
            };
            SceneItem.prototype.onRelease = function () {
                _super.prototype.onRelease.call(this);
                var self = this;
                Pool.release(self._ctrl);
                self._ctrl = null;
                self.removeCurrent();
                if (self._bmp && self._bmp.parent) {
                    self._bmp.parent.removeChild(self._bmp);
                }
                Pool.release(self._bmp);
                self._bmp = null;
            };
            return SceneItem;
        }(scene.BaseDraw));
        scene.SceneItem = SceneItem;
        __reflect(SceneItem.prototype, "game.scene.SceneItem");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var AddBloodAct = /** @class */ (function (_super) {
            __extends(AddBloodAct, _super);
            function AddBloodAct() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AddBloodAct.prototype.setData = function (list) {
                this._value = list;
            };
            AddBloodAct.prototype.onStart = function () {
                _super.prototype.onStart.call(this);
                this.eftList();
                // delayCall(Handler.alloc(this, this.done), 1); // 暂时只有飘字，飘完就结束吧
                this.done();
            };
            AddBloodAct.prototype.eftList = function () {
                var self = this;
                if (!self._value) {
                    return;
                }
                if (self._actor && self._actor.vo) {
                    var e = self._actor;
                    var v = self._value;
                    var dir = game.MathUtil.randomDir(e.dir);
                    scene.STxtMgr.ins.show(v.value.toString(), e.x, e.y, dir, v.value_type, 0, e);
                }
            };
            AddBloodAct.prototype.onRelease = function () {
                this._value = undefined;
                _super.prototype.onRelease.call(this);
            };
            return AddBloodAct;
        }(scene.BaseAct));
        scene.AddBloodAct = AddBloodAct;
        __reflect(AddBloodAct.prototype, "game.scene.AddBloodAct");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var SkillEffectVo = /** @class */ (function () {
            function SkillEffectVo() {
            }
            SkillEffectVo.allocList = function () {
                if (this._pool.length) {
                    return this._pool.pop();
                }
                return [];
            };
            SkillEffectVo.releaseList = function (list) {
                if (!list) {
                    return;
                }
                Pool.releaseList(list);
                this._pool.push(list);
            };
            SkillEffectVo.prototype.dispose = function () {
                this.onRelease();
            };
            SkillEffectVo.prototype.onAlloc = function () {
            };
            SkillEffectVo.prototype.onRelease = function () {
                var self = this;
                self.target = null;
                self.target_id = null;
                self.b_value = null;
                self.is_dead = null;
                self.push_x = null;
                self.push_y = null;
            };
            SkillEffectVo._pool = [];
            return SkillEffectVo;
        }());
        scene.SkillEffectVo = SkillEffectVo;
        __reflect(SkillEffectVo.prototype, "game.scene.SkillEffectVo", ["base.PoolObject", "base.DisposeObject"]);
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var SoulWareVo = /** @class */ (function (_super) {
            __extends(SoulWareVo, _super);
            function SoulWareVo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SoulWareVo;
        }(scene.ActorVo));
        scene.SoulWareVo = SoulWareVo;
        __reflect(SoulWareVo.prototype, "game.scene.SoulWareVo");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var AddImmuneAct = /** @class */ (function (_super) {
            __extends(AddImmuneAct, _super);
            function AddImmuneAct() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AddImmuneAct.prototype.setData = function (list) {
                this._value = list;
            };
            AddImmuneAct.prototype.onStart = function () {
                _super.prototype.onStart.call(this);
                this.eftList();
                this.done();
            };
            AddImmuneAct.prototype.eftList = function () {
                var self = this;
                if (!self._value) {
                    return;
                }
                if (self._actor && self._actor.vo) {
                    var e = self._actor;
                    var v = self._value;
                    var dir = game.MathUtil.randomDir(e.dir);
                    scene.STxtMgr.ins.show(v.value.toString(), e.x, e.y, dir, v.value_type, 0);
                }
            };
            AddImmuneAct.prototype.onRelease = function () {
                this._value = undefined;
                _super.prototype.onRelease.call(this);
            };
            return AddImmuneAct;
        }(scene.BaseAct));
        scene.AddImmuneAct = AddImmuneAct;
        __reflect(AddImmuneAct.prototype, "game.scene.AddImmuneAct");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Handler = base.Handler;
        var Pool = base.Pool;
        var ActorEftMgr = /** @class */ (function (_super) {
            __extends(ActorEftMgr, _super);
            function ActorEftMgr() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._id = 0;
                _this._effect = {};
                return _this;
            }
            ActorEftMgr.prototype.addEft = function (eftId, x, y, dir, scale, cb, times, isRotation, isScene) {
                if (scale === void 0) { scale = 1; }
                if (cb === void 0) { cb = null; }
                if (times === void 0) { times = 1; }
                var self = this;
                var id = ++self._id;
                var animate = Pool.alloc(scene.SkillEffect);
                animate.x = x;
                animate.y = y;
                animate.scale = scale || 1;
                animate.times = times || 1;
                var source = game.ResUtil.getSkillEftUrl(eftId);
                if (isScene) {
                    this.parent.add(animate);
                }
                else {
                    this.add(animate);
                }
                animate.playEft(eftId, source, dir != undefined ? dir : this._actor.dir, Handler.alloc(this, this.onPlayComp, [id]));
                self._effect[id] = { animate: animate, cb: cb };
                return id;
            };
            ActorEftMgr.prototype.onPlayComp = function (id) {
                var effect = this._effect[id];
                if (!effect) {
                    return;
                }
                var cb = effect.cb;
                effect.cb = null;
                if (cb) {
                    cb.exec();
                    Pool.release(cb);
                }
                this.removeEffect(id);
            };
            ActorEftMgr.prototype.removeEffect = function (id) {
                var effect = this._effect[id];
                this._effect[id] = null;
                delete this._effect[id];
                if (effect) {
                    this.remove(effect.animate);
                    if (effect.cb) {
                        Pool.release(effect.cb);
                        effect.cb = null;
                    }
                    Pool.release(effect.animate);
                }
            };
            ActorEftMgr.prototype.removeAllEffects = function () {
                var self = this;
                for (var k in self._effect) {
                    self.removeEffect(k);
                }
            };
            ActorEftMgr.prototype.onAdded = function () {
                _super.prototype.onAdded.call(this);
                this._actor = this.parent;
            };
            ActorEftMgr.prototype.onRelease = function () {
                this.removeAllEffects();
                this._id = 0;
                this._actor = null;
                _super.prototype.onRelease.call(this);
            };
            return ActorEftMgr;
        }(scene.BaseDraw));
        scene.ActorEftMgr = ActorEftMgr;
        __reflect(ActorEftMgr.prototype, "game.scene.ActorEftMgr");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Handler = base.Handler;
        var Pool = base.Pool;
        var EftGroup = /** @class */ (function (_super) {
            __extends(EftGroup, _super);
            function EftGroup() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._timeOut = 0;
                _this._addEdEft = [];
                _this.layer = 3 /* Effect */;
                return _this;
            }
            EftGroup.prototype.setData = function (eftId, src, actor, cb) {
                var self = this;
                self.updateEnabled = false;
                self._onDone = cb;
                self._eftId = eftId;
                self._src = src;
                self._actor = actor;
                game.LoadMgr.ins.addRef(src);
                game.LoadMgr.ins.load(src, Handler.alloc(self, self.onLoadSucc), game.LoadPri.Scene, Handler.alloc(self, this.onLoadFail));
            };
            EftGroup.prototype.onLoadFail = function () {
                this.onComp();
            };
            EftGroup.prototype.onLoadSucc = function (data) {
                if (data.id != this._eftId) {
                    return;
                }
                this._addEdEft = [];
                this._eftList = data.children;
                this._len = this._eftList.length;
                this._elapseTime = 0;
                this._startTime = 0;
                this.updateEnabled = true;
            };
            EftGroup.prototype.resetActor = function () {
                if (this._actor && this._actor.dsp && !this._actor.dsp.visible) {
                    this._actor.dsp.visible = true;
                }
            };
            EftGroup.prototype.onComp = function () {
                this.resetActor();
                if (this._onDone) {
                    this._onDone.exec();
                }
                this.dispose();
            };
            EftGroup.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                this._elapseTime += elapseTime;
                var scaleX = this.scaleX;
                var scaleY = this.scaleY;
                for (var i = 0; i < this._len; ++i) {
                    var eftCfg = this._eftList[i];
                    var isAdded = this._addEdEft.indexOf(eftCfg) > -1;
                    if (this._elapseTime - this._startTime >= eftCfg.delay && !isAdded) {
                        this._addEdEft.push(eftCfg);
                        var r = this.dsp.rotation * Math.PI / 180;
                        var x = this.x + (r != 0 ? eftCfg.x * Math.cos(r) - eftCfg.y * Math.sin(r) : eftCfg.x) * scaleX;
                        var y = this.y + (r != 0 ? eftCfg.x * Math.sin(r) + eftCfg.y * Math.cos(r) : eftCfg.y) * scaleY;
                        var dir = (scaleX > 0 ? 1 : -1);
                        var rotation = (eftCfg.r + this.dsp.rotation) * dir;
                        scene.SkillEftMgr.ins.showSkillEft(eftCfg.id, x, y, rotation, eftCfg, r, dir, this.scaleY, this.layer);
                        if (this._addEdEft.length == this._len) {
                            this.onComp();
                        }
                    }
                }
            };
            EftGroup.prototype.onRelease = function () {
                var self = this;
                self.x = 0;
                self.y = 0;
                self.dsp.rotation = 0;
                self.resetActor();
                self._actor = null;
                self._elapseTime = undefined;
                self._startTime = undefined;
                self._len = undefined;
                self._addEdEft.length = 0;
                self._eftList = undefined;
                base.clearDelay(self._timeOut);
                Pool.release(self._onDone);
                self._onDone = null;
                self.layer = 3 /* Effect */;
                game.LoadMgr.ins.decRef(self._src);
                self._src = null;
                _super.prototype.onRelease.call(this);
            };
            return EftGroup;
        }(scene.BaseDraw));
        scene.EftGroup = EftGroup;
        __reflect(EftGroup.prototype, "game.scene.EftGroup");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Handler = base.Handler;
        var Pool = base.Pool;
        var EftUIGroup = /** @class */ (function (_super) {
            __extends(EftUIGroup, _super);
            function EftUIGroup() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._timeOut = 0;
                _this._addEdEft = [];
                _this.layer = 3 /* Effect */;
                return _this;
            }
            //public _skillEffects:SkillEffect[] = [];
            EftUIGroup.prototype.setData = function (eftId, src, actor, cb, container, eftDone, eftChildDone) {
                var self = this;
                self.updateEnabled = false;
                self._onDone = cb;
                self._onEftDone = eftDone;
                self._onEftChildDone = eftChildDone;
                self._eftId = eftId;
                self._src = src;
                self._actor = actor;
                this._container = container;
                //this._skillEffects = [];
                game.LoadMgr.ins.addRef(src);
                game.LoadMgr.ins.load(src, Handler.alloc(self, self.onLoadSucc), game.LoadPri.Scene, Handler.alloc(self, this.onLoadFail));
            };
            EftUIGroup.prototype.onLoadFail = function () {
                this.onComp();
            };
            EftUIGroup.prototype.onLoadSucc = function (data) {
                if (data.id != this._eftId) {
                    return;
                }
                this._addEdEft = [];
                this._eftList = data.children;
                this._len = this._eftList.length;
                this._elapseTime = 0;
                this._startTime = 0;
                this.updateEnabled = true;
            };
            EftUIGroup.prototype.resetActor = function () {
                if (this._actor && this._actor.dsp && !this._actor.dsp.visible) {
                    this._actor.dsp.visible = true;
                }
            };
            EftUIGroup.prototype.onComp = function () {
                this.resetActor();
                if (this._onDone) {
                    this._onDone.exec();
                }
                this._eftList = null;
                this.dispose();
            };
            EftUIGroup.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                this._elapseTime += elapseTime;
                var scaleX = this.scaleX;
                var scaleY = this.scaleY;
                for (var i = 0; i < this._len; ++i) {
                    var eftCfg = this._eftList[i];
                    var isAdded = this._addEdEft.indexOf(eftCfg) > -1;
                    if (this._elapseTime - this._startTime >= eftCfg.delay && !isAdded) {
                        this._addEdEft.push(eftCfg);
                        var r = this.dsp.rotation * Math.PI / 180;
                        var x = this.x + (r != 0 ? eftCfg.x * Math.cos(r) - eftCfg.y * Math.sin(r) : eftCfg.x) * scaleX;
                        var y = this.y + (r != 0 ? eftCfg.x * Math.sin(r) + eftCfg.y * Math.cos(r) : eftCfg.y) * scaleY;
                        var dir = (scaleX > 0 ? 1 : -1);
                        var rotation = (eftCfg.r + this.dsp.rotation) * dir;
                        var eft = scene.SkillEftMgr.ins.showSkillEftUI(eftCfg.id, x, y, rotation, eftCfg, r, dir, this.scaleY, this.layer, this._container, this._onEftDone);
                        //this._skillEffects.push(eft);
                        this._onEftChildDone.exec(eft);
                        if (this._addEdEft.length == this._len) {
                            this.onComp();
                        }
                    }
                }
            };
            EftUIGroup.prototype.onRelease = function () {
                var self = this;
                self.x = 0;
                self.y = 0;
                self.dsp.rotation = 0;
                self.resetActor();
                self._actor = null;
                self._elapseTime = undefined;
                self._startTime = undefined;
                self._len = undefined;
                self._addEdEft.length = 0;
                self._eftList = undefined;
                base.clearDelay(self._timeOut);
                Pool.release(self._onDone);
                self._onDone = null;
                self.layer = 3 /* Effect */;
                game.LoadMgr.ins.decRef(self._src);
                self._src = null;
                _super.prototype.onRelease.call(this);
            };
            EftUIGroup.prototype.isFinished = function () {
                return this._eftList == null;
            };
            return EftUIGroup;
        }(scene.BaseDraw));
        scene.EftUIGroup = EftUIGroup;
        __reflect(EftUIGroup.prototype, "game.scene.EftUIGroup");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Handler = base.Handler;
        var GDirUtil = game.utils.GDirUtil;
        var Pool = base.Pool;
        var delayCall = base.delayCall;
        var clearDelay = base.clearDelay;
        var TimeMgr = base.TimeMgr;
        var SkillEffect = /** @class */ (function (_super) {
            __extends(SkillEffect, _super);
            function SkillEffect() {
                var _this = _super.call(this) || this;
                _this._curTimes = 0;
                _this.times = 1;
                _this.duration = 0;
                _this.speed = 1;
                _this._replayTimeOut = 0;
                _this._timeoutTick = 0;
                _this._removeTimeOut = 0;
                _this._removeDelay = 0;
                _this._twCnt = 0;
                _this.layer = 3 /* Effect */;
                _this._isRemove = false;
                _this._data = {};
                _this._source = [];
                _this._dataBit = {};
                _this._sourceFrames = {};
                return _this;
            }
            SkillEffect.prototype.playEft = function (eftId, src, dir, cb) {
                var self = this;
                self._onDone = cb;
                var mirDir = GDirUtil.getMir(dir);
                self._bmpScaleX = dir != mirDir ? -1 : 1;
                if (eftId == scene.GuideLuoJian) {
                    self._bmpScaleX = 1;
                }
                self.loadEft(eftId, src);
            };
            SkillEffect.prototype.playSkillEft = function (eftId, src, rotation, eftCfg, scaleX, cb) {
                var self = this;
                self._bmpScaleX = scaleX || 1;
                self.times = eftCfg.times != null ? eftCfg.times : 1;
                self.duration = eftCfg.duration != null ? eftCfg.duration : 0;
                self._setRotation = rotation;
                self._removeDelay = +eftCfg.rDelay | 0;
                self.dsp.rotation = +rotation | 0;
                self._onDone = cb;
                self.scaleX = eftCfg.sx != null ? eftCfg.sx : 1;
                self.scaleY = eftCfg.sy != null ? eftCfg.sy : 1;
                if (eftCfg.tw) {
                    self._twCnt = 0;
                    self._twLen = eftCfg.tw.length;
                    self._twList = eftCfg.tw;
                    self._sx = self.x;
                    self._sy = self.y;
                    self._twCurTime = 0;
                }
                self.loadEft(eftId, src);
            };
            SkillEffect.prototype.loadEft = function (eftId, src) {
                var self = this;
                self.removeCurrent();
                self._isRemove = false;
                self._curTimes = 0;
                self._source = [];
                self._dataBit = {};
                var cfg = game.getConfigByNameId("effect_sub.json" /* EfectSub */, eftId);
                if (cfg && cfg.subNumber > 1) {
                    for (var i = 1; i <= cfg.subNumber; i++) {
                        var d = game.ResUtil.getSkillEftSubUrl(eftId, i);
                        self._source.push(d);
                        this._dataBit[d] = 0;
                    }
                }
                else {
                    self._source.push(src);
                    this._dataBit[src] = 0;
                }
                var preFrames = 0;
                for (var i = 0; i < self._source.length; i++) {
                    var srcSub = self._source[i];
                    this._sourceFrames[srcSub] = preFrames;
                    game.LoadMgr.ins.addRef(srcSub);
                    var durList = game.LoadMgr.ins.getAnimDur(srcSub);
                    if (durList) {
                        var t = 0;
                        for (var i_1 = 0, n = durList.length; i_1 < n; i_1++) {
                            t += durList[i_1];
                        }
                        if (i == 0) {
                            self._timeoutTick = TimeMgr.time.time + t * self.times + 100;
                        }
                        else {
                            self._timeoutTick += t * self.times + 100;
                        }
                        preFrames += durList.length;
                    }
                    //LoadMgr.ins.loadMerge(srcSub, Handler.alloc(self, self.initCtrl), LoadPri.Scene);
                    game.LoadMgr.ins.loadMerge(srcSub, Handler.alloc(self, self.oneLoaded), game.LoadPri.Scene);
                }
            };
            SkillEffect.prototype.removeCurrent = function () {
                var self = this;
                if (self._ctrl) {
                    self._ctrl.stop();
                }
                self._data = {};
                for (var i = 0; i < self._source.length; i++) {
                    game.LoadMgr.ins.decRef(self._source[i]);
                }
                self._source = [];
                if (self._bmp) {
                    self._bmp.texture = null;
                    self._bmp.scaleX = self._bmp.scaleY = 1;
                }
            };
            SkillEffect.prototype.oneLoaded = function (data, url) {
                this._dataBit[url] = data.numFrames;
                this._data[url] = data;
                var ret = true;
                for (var k in this._dataBit) {
                    var d = this._dataBit[k];
                    if (!d) {
                        ret = false;
                        break;
                    }
                }
                if (ret) {
                    for (var i = 0; i < this._source.length; i++) {
                        var u = this._source[i];
                        this.initCtrl(this._data[u], u);
                    }
                }
            };
            SkillEffect.prototype.initCtrl = function (data, url) {
                var self = this;
                if (self._source.indexOf(url) < 0) {
                    return;
                }
                self._data[url] = data;
                var durList = [];
                for (var i = 0, n = data.numFrames; i < n; i++) {
                    durList.push(data.getVal(i, "dur"));
                }
                var isStart = self._source[0] == url;
                self._ctrl.init(durList, url, self.speed, true, isStart);
                if (isStart) {
                    self._ctrl.loop = false;
                    self._bmp.scaleY = data.scale;
                    self._bmp.scaleX = data.scale * self._bmpScaleX;
                }
                var index = self._source.length - 1;
                if (self._source[index] == url) {
                    self.onFrameChange(0, self._source[0]);
                }
            };
            SkillEffect.prototype.onComplete = function () {
                var self = this;
                self._curTimes++;
                if (self.times <= 0 || self._curTimes < self.times) {
                    if (self.duration > 0) {
                        self._bmp.texture = null;
                        self._replayTimeOut = delayCall(Handler.alloc(self, self.replay), self.duration);
                    }
                    else {
                        self.replay();
                    }
                }
                else {
                    self.removeSelf();
                }
            };
            SkillEffect.prototype.replay = function () {
                this._ctrl.curFrame = 0;
                this._ctrl.play();
            };
            SkillEffect.prototype.removeSelf = function () {
                var self = this;
                if (self._isRemove) {
                    return;
                }
                self._isRemove = true;
                if (self._removeDelay > 0) {
                    self._removeTimeOut = base.delayCall(Handler.alloc(self, self.onRemoveTimeOut), self._removeDelay);
                }
                else {
                    self.onRemoveTimeOut();
                }
            };
            SkillEffect.prototype.onRemoveTimeOut = function () {
                var self = this;
                if (self._onDone) {
                    self._onDone.exec(this);
                }
                this.dispose();
            };
            SkillEffect.prototype.advanceTime = function (elapseTime) {
                _super.prototype.advanceTime.call(this, elapseTime);
                var self = this;
                if (self.times > 0 && TimeMgr.time.time >= self._timeoutTick) {
                    self.removeSelf();
                    return;
                }
                self._ctrl.advanceTime(elapseTime);
                if (self._twCurTime != null) {
                    self._twCurTime += elapseTime;
                }
                if (self._twList && self._twCnt < self._twLen) {
                    var preFrame = self._twCnt;
                    var tw = self._twList[self._twCnt]; //[time,x,y,scaleX,scaleY,rotation,alpha]
                    while (self._twCurTime > tw[0]) {
                        self._twCnt++;
                        if (self._twCnt == self._twLen) {
                            return;
                        }
                        tw = self._twList[self._twCnt];
                    }
                    if (preFrame != self._twCnt) {
                        var r = self.groupR;
                        var needR = r != 0 && r != null;
                        var x = (needR ? tw[1] * Math.cos(r) - tw[2] * Math.sin(r) : tw[1]) * self._bmpScaleX;
                        var y = needR ? tw[1] * Math.sin(r) + tw[2] * Math.cos(r) : tw[2];
                        // x = tw[1];
                        // y = tw[2];
                        self.x = self._sx + x;
                        self.y = self._sy + y;
                        self.scaleX = tw[3];
                        self.scaleY = tw[4];
                        if (self._setRotation == 0) {
                            self.dsp.rotation = tw[5];
                        }
                        //self.dsp.rotation = tw[5] + self._setRotation;
                        self.alpha = tw[6];
                    }
                }
            };
            SkillEffect.prototype.onFrameChange = function (frame, url) {
                if (frame == null) {
                    console.error("SkillEffect onFrameChange error!");
                    return;
                }
                var self = this;
                if (self._data) {
                    var tframe = frame - this._sourceFrames[url];
                    self._data[url].drawTo(self._bmp, tframe, self._bmpScaleX);
                }
            };
            SkillEffect.prototype.initDsp = function () {
                _super.prototype.initDsp.call(this);
                this._bmp = this.dsp.addChild(Pool.alloc(game.BitmapBase));
            };
            SkillEffect.prototype.onAlloc = function () {
                _super.prototype.onAlloc.call(this);
                var self = this;
                self._ctrl = Pool.alloc(game.AnimCtrl);
                self._ctrl.compHandler = Handler.alloc(self, self.onComplete);
                self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChange);
                self._bmpScaleX = 1;
            };
            SkillEffect.prototype.onRelease = function () {
                var self = this;
                self._isRemove = false;
                self.removeCurrent();
                clearDelay(self._replayTimeOut);
                self._replayTimeOut = 0;
                self._timeoutTick = 0;
                clearDelay(self._removeTimeOut);
                self._removeTimeOut = 0;
                self._twCnt = 0;
                self._twLen = null;
                self._twList = null;
                self._twCurTime = null;
                self.groupR = null;
                self._removeDelay = 0;
                self.x = 0;
                self.y = 0;
                self.scaleX = 1;
                self.scaleY = 1;
                self.alpha = 1;
                self.dsp.rotation = 0;
                self._setRotation = 0;
                Pool.release(self._ctrl);
                self._ctrl = null;
                Pool.release(self._onDone);
                self._onDone = null;
                self._curTimes = 0;
                self.times = 1;
                self.duration = 0;
                self.speed = 1;
                self._dataBit = {};
                this._sourceFrames = {};
                self.layer = 3 /* Effect */;
            };
            return SkillEffect;
        }(scene.BaseDraw));
        scene.SkillEffect = SkillEffect;
        __reflect(SkillEffect.prototype, "game.scene.SkillEffect");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_20) {
        var Pool = base.Pool;
        var Handler = base.Handler;
        var TimeMgr = base.TimeMgr;
        var SkillEftMgr = /** @class */ (function () {
            function SkillEftMgr() {
                this._eftGroup = null;
                this._skillEffects = [];
            }
            Object.defineProperty(SkillEftMgr, "ins", {
                get: function () {
                    if (!this._ins) {
                        this._ins = new SkillEftMgr();
                    }
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            SkillEftMgr.prototype.init = function (scene) {
                this._scene = scene;
            };
            SkillEftMgr.prototype.showAtkEft = function (eftId, x, y, dir, cb, scale, times, layer) {
                if (times === void 0) { times = 1; }
                var eft = Pool.alloc(scene_20.SkillEffect);
                eft.x = x;
                eft.y = y;
                eft.scale = scale || 1;
                eft.times = times;
                //eft.layer = eftId.indexOf(PreDownLayerEft) > -1 ? SceneLayerType.Down : SceneLayerType.Effect;
                eft.layer = layer || 3 /* Effect */;
                var source = game.ResUtil.getSkillEftUrl(eftId);
                this._scene.add(eft);
                eft.playEft(eftId, source, dir, cb);
            };
            SkillEftMgr.prototype.showSkillEft = function (eftId, x, y, rotation, eftCfg, groupR, scaleX, scale, layer) {
                var eft = Pool.alloc(scene_20.SkillEffect);
                eft.x = x;
                eft.y = y;
                eft.scale = scale || 1;
                scaleX = scaleX || 1;
                eft.groupR = groupR;
                //eft.layer = eftId.indexOf(PreDownLayerEft) > -1 ? SceneLayerType.Down : SceneLayerType.Effect;
                eft.layer = layer || 3 /* Effect */;
                var source = game.ResUtil.getSkillEftUrl(eftId);
                this._scene.add(eft);
                eft.playSkillEft(eftId, source, rotation, eftCfg, scaleX);
            };
            SkillEftMgr.prototype.showSkillEftUI = function (eftId, x, y, rotation, eftCfg, groupR, scaleX, scale, layer, container, cb) {
                var eft = Pool.alloc(scene_20.SkillEffect);
                eft.x = x;
                eft.y = y;
                eft.scale = scale || 1;
                scaleX = scaleX || 1;
                eft.groupR = groupR;
                eft.layer = layer || 3 /* Effect */;
                var source = game.ResUtil.getSkillEftUrl(eftId);
                container && container.addChild(eft.dsp);
                eft.playSkillEft(eftId, source, rotation, eftCfg, scaleX, cb);
                return eft;
            };
            //private time = 0;
            SkillEftMgr.prototype.showGroupEft = function (eftId, x, y, dir, atkCfg, actor, cb, scale) {
                //eftId = "cs_2";
                // console.log("eftId = "+eftId);
                // if(Date.now()-this.time < 3000){
                //     return ;
                // }
                // this.time = Date.now();
                // eftId = "skill_hyzd";
                // x = MainGPlayer.ins.x;
                // y = MainGPlayer.ins.y;
                var isRotate = false;
                var shakeCfg = null;
                var layer = 3 /* Effect */;
                if (atkCfg) {
                    isRotate = atkCfg.isrotate == 2;
                    shakeCfg = atkCfg.shake;
                    layer = atkCfg.layer;
                }
                var eft = Pool.alloc(scene_20.EftGroup);
                eft.x = x;
                eft.y = y;
                eft.scale = scale || 1;
                eft.scaleX *= game.MirDir[dir] ? -1 : 1;
                var d = game.MirDir[dir] ? game.MirDir[dir] : dir;
                eft.dsp.rotation = !!isRotate ? (d - 3 /* RIGHT */) * 45 : 0;
                var src = game.ResUtil.getGroupEftUrl(eftId);
                eft.setData(eftId, src, actor, cb);
                eft.layer = layer;
                this._scene.add(eft);
                if (shakeCfg && shakeCfg.length > 1 && shakeCfg[0] >= 1) {
                    var isMain = actor && actor instanceof scene_20.GPlayer && actor.vo.role_id && actor.vo.role_id.eq(game.RoleVo.ins.role_id);
                    if (isMain && scene_20.SceneTools.isOptimizeScene(this._scene.sceneType)) { //只有主角释放技能才震屏
                        this._scene.shake(shakeCfg);
                    }
                }
            };
            SkillEftMgr.prototype.showGroupUIEft = function (eftId, x, y, dir, atkCfg, actor, scale, container) {
                // if(this._skillEffects.length > 0 || this._eftGroup){
                //     return null;
                // }
                container && container.removeChildren();
                var self = this;
                var isRotate = false;
                var layer = 3 /* Effect */;
                var eft = Pool.alloc(scene_20.EftUIGroup);
                eft.x = x;
                eft.y = y;
                eft.scale = scale || 1;
                eft.scaleX *= game.MirDir[dir] ? -1 : 1;
                var d = game.MirDir[dir] ? game.MirDir[dir] : dir;
                eft.dsp.rotation = !!isRotate ? (d - 3 /* RIGHT */) * 45 : 0;
                var src = game.ResUtil.getGroupEftUrl(eftId);
                eft.setData(eftId, src, actor, Handler.alloc(this, function (data) {
                    self._eftGroup = null;
                }), container, Handler.alloc(this, function (data) {
                    var index = self._skillEffects.indexOf(data);
                    if (index > -1) {
                        self._skillEffects.splice(index, 1);
                        if (data.dsp.parent) {
                            data.dsp.parent.removeChild(data.dsp);
                        }
                    }
                }), Handler.alloc(this, function (eft) {
                    if (self._skillEffects.indexOf(eft) < 0) {
                        self._skillEffects.push(eft);
                    }
                }));
                eft.layer = layer;
                container && container.addChild(eft.dsp);
                this._eftGroup = eft;
                TimeMgr.addUpdateItem(this);
                return eft;
            };
            SkillEftMgr.prototype.update = function (time) {
                var elapseTime = TimeMgr.getElapseTime(this);
                if (this._eftGroup) {
                    this._eftGroup.advanceTime(elapseTime);
                }
                if (this._skillEffects.length > 0) {
                    for (var i = 0; i < this._skillEffects.length; i++) {
                        var d = this._skillEffects[i];
                        d.advanceTime(elapseTime);
                    }
                }
                if (!this._eftGroup && this._skillEffects.length <= 0) {
                    this.resetUIEf();
                }
            };
            //重置一下
            SkillEftMgr.prototype.resetUIEf = function () {
                this._eftGroup = null;
                this._skillEffects = [];
                TimeMgr.removeUpdateItem(this);
            };
            return SkillEftMgr;
        }());
        scene_20.SkillEftMgr = SkillEftMgr;
        __reflect(SkillEftMgr.prototype, "game.scene.SkillEftMgr", ["base.UpdateItem"]);
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Point = egret.Point;
        var Pool = base.Pool;
        var AStar = /** @class */ (function () {
            function AStar() {
            }
            AStar.initialize = function (numCols, numRows) {
                var self = this;
                self._numCols = numCols;
                self._numRows = numRows;
                self._isInit = false;
                if (self._nodes) {
                    for (var col = 0, cNum = self._nodes.length; col < cNum; col++) {
                        var oneCol = self._nodes[col];
                        for (var row = 0, rNum = oneCol.length; row < rNum; row++) {
                            Pool.release(oneCol[row]);
                            oneCol[row] = undefined;
                        }
                    }
                }
            };
            AStar.excInit = function () {
                var self = this;
                self._isInit = true;
                self._nodes = self._nodes || [];
                self._nodes.length = self._numCols;
                for (var i = 0; i < self._numCols; i++) {
                    if (!self._nodes[i]) {
                        self._nodes[i] = new Array(self._numRows);
                    }
                    else {
                        self._nodes[i].length = self._numRows;
                    }
                }
            };
            AStar.getNode = function (x, y) {
                try {
                    var node = this._nodes[x][y];
                    if (node) {
                        return node;
                    }
                    node = Pool.alloc(AStarNode).setTo(x, y, !this.ckIsBlock.exec([x, y]));
                    this._nodes[x][y] = node;
                    return node;
                }
                catch (e) {
                    console.error("AStar getNode nodes:", this._nodes ? this._nodes.length : 0, x, y);
                    return null;
                }
            };
            AStar.findPath = function (sx, sy, ex, ey) {
                var self = this;
                sx = +sx | 0;
                sy = +sy | 0;
                ex = +ex | 0;
                ey = +ey | 0;
                if (!self._isInit) {
                    self.excInit();
                }
                var start = self.getNode(sx, sy);
                var end = self.getNode(ex, ey);
                if (!start.walkable || !end.walkable) {
                    return null;
                }
                self._nowversion++;
                var open = new AStarBinaryHeap();
                start.g = 0;
                var node = start;
                node.version = self._nowversion;
                while (node != end) {
                    if (!node.linkInited) {
                        self.initNodeLink8(node);
                        node.linkInited = true;
                    }
                    var len = node.linkNodes.length;
                    for (var i = 0; i < len; i++) {
                        var test = node.linkNodes[i];
                        var cost = node.linkCost[i];
                        var g = node.g + cost;
                        var h = self.euclidian2(test, end);
                        var f = g + h;
                        if (test.version == self._nowversion) {
                            if (test.f > f) {
                                test.f = f;
                                test.g = g;
                                test.h = h;
                                test.parent = node;
                            }
                        }
                        else {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                            open.ins(test);
                            test.version = self._nowversion;
                        }
                    }
                    if (open.a.length == 1) {
                        return null;
                    }
                    node = open.pop();
                    if (node == null) {
                        return null;
                    }
                }
                return self.buildPath(start, end);
            };
            /** 此方法会修改传入的path */
            AStar.floyd = function (path) {
                if (path == null) {
                    return null;
                }
                var len = path.length;
                var i;
                if (len > 2) {
                    var vector = Pool.alloc(Point);
                    var tempVector = Pool.alloc(Point);
                    this.floydVector(vector, path[len - 1], path[len - 2]);
                    for (i = path.length - 3; i >= 0; i--) {
                        var point = path[i + 1];
                        this.floydVector(tempVector, point, path[i]);
                        if (vector.x == tempVector.x && vector.y == tempVector.y) {
                            Pool.release(game.ArrayUtil.removeAt(path, i + 1));
                        }
                        else {
                            vector.x = tempVector.x;
                            vector.y = tempVector.y;
                        }
                    }
                    Pool.release(vector);
                    Pool.release(tempVector);
                }
                len = path.length;
                for (i = len - 1; i >= 0; i--) {
                    for (var j = 0; j <= i - 2; j++) {
                        if (this.isPassable(path[i], path[j])) {
                            for (var k = i - 1; k > j; k--) {
                                Pool.release(game.ArrayUtil.removeAt(path, k));
                            }
                            i = j;
                            len = path.length;
                            break;
                        }
                    }
                }
                return path;
            };
            AStar.floydVector = function (target, n1, n2) {
                target.x = n1.x - n2.x;
                target.y = n1.y - n2.y;
            };
            AStar.isPassable = function (p1, p2) {
                return this.isLinePassable(p1.x, p1.y, p2.x, p2.y);
            };
            // private static initNodeLink4(node: AStarNode): void {
            //     node.linkNodes = [];
            //     node.linkCost = [];
            //     if (node.x > 0) {
            //         this.pushNodeLink(node, this.getNode(node.x - 1, node.y));
            //     }
            //     if (node.x < this._numCols - 1) {
            //         this.pushNodeLink(node, this.getNode(node.x + 1, node.y));
            //     }
            //     if (node.y > 0) {
            //         this.pushNodeLink(node, this.getNode(node.x, node.y - 1));
            //     }
            //     if (node.y < this._numRows - 1) {
            //         this.pushNodeLink(node, this.getNode(node.x, node.y + 1));
            //     }
            // }
            AStar.initNodeLink8 = function (node) {
                var startX = Math.max(0, node.x - 1);
                var endX = Math.min(this._numCols - 1, node.x + 1);
                var startY = Math.max(0, node.y - 1);
                var endY = Math.min(this._numRows - 1, node.y + 1);
                if (!node.linkNodes) {
                    node.linkNodes = [];
                }
                if (!node.linkCost) {
                    node.linkCost = [];
                }
                for (var i = startX; i <= endX; i++) {
                    for (var j = startY; j <= endY; j++) {
                        var test = this.getNode(i, j);
                        if (test == node || !test.walkable) {
                            continue;
                        }
                        node.linkNodes[node.linkNodes.length] = test;
                        node.linkCost[node.linkCost.length] = 1;
                    }
                }
            };
            AStar.isLinePassable = function (x0, y0, x1, y1) {
                x0 = +x0 | 0;
                y0 = +y0 | 0;
                x1 = +x1 | 0;
                y1 = +y1 | 0;
                var x = x0;
                var y = y0;
                if (this.ckIsBlock.exec([x0, y0]) || this.ckIsBlock.exec([x1, y1])) {
                    return false;
                }
                var dx = x1 - x0;
                var dy = y1 - y0;
                var MaxStep = Math.max(Math.abs(dx), Math.abs(dy));
                var stepX = dx / MaxStep;
                var stepY = dy / MaxStep;
                for (var i = 1; i < MaxStep; ++i) {
                    x += stepX;
                    y += stepY;
                    if (this.ckIsBlock.exec([Math.floor(x), Math.floor(y)])) {
                        return false;
                    }
                }
                return true;
            };
            AStar.buildPath = function (start, end) {
                var list = [];
                var node = end;
                list.push(node.toPoint());
                while (node != start) {
                    node = node.parent;
                    list.unshift(node.toPoint());
                }
                return list;
            };
            AStar.euclidian2 = function (node, end) {
                var dx = node.x - end.x;
                var dy = node.y - end.y;
                return dx * dx + dy * dy;
            };
            AStar._numCols = 0;
            AStar._numRows = 0;
            AStar._nowversion = 1;
            return AStar;
        }());
        scene.AStar = AStar;
        __reflect(AStar.prototype, "game.scene.AStar");
        var AStarBinaryHeap = /** @class */ (function () {
            function AStarBinaryHeap() {
                this.a = [];
                this.a.push(null);
            }
            AStarBinaryHeap.prototype.ins = function (value) {
                var self = this;
                var p = self.a.length;
                self.a[p] = value;
                var pp = p >> 1;
                while (p > 1 && AStarBinaryHeap.justMinFun(self.a[p], self.a[pp])) {
                    var temp = self.a[p];
                    self.a[p] = self.a[pp];
                    self.a[pp] = temp;
                    p = pp;
                    pp = p >> 1;
                }
            };
            AStarBinaryHeap.prototype.pop = function () {
                var self = this;
                var min = self.a[1];
                self.a[1] = self.a[self.a.length - 1];
                self.a.pop();
                var p = 1;
                var l = self.a.length;
                var sp1 = p << 1;
                var sp2 = sp1 + 1;
                var minp;
                while (sp1 < l) {
                    if (sp2 < l) {
                        minp = AStarBinaryHeap.justMinFun(self.a[sp2], self.a[sp1]) ? sp2 : sp1;
                    }
                    else {
                        minp = sp1;
                    }
                    if (AStarBinaryHeap.justMinFun(self.a[minp], self.a[p])) {
                        var temp = self.a[p];
                        self.a[p] = self.a[minp];
                        self.a[minp] = temp;
                        p = minp;
                        sp1 = p << 1;
                        sp2 = sp1 + 1;
                    }
                    else {
                        break;
                    }
                }
                return min;
            };
            AStarBinaryHeap.justMinFun = function (x, y) {
                return x.f < y.f;
            };
            return AStarBinaryHeap;
        }());
        __reflect(AStarBinaryHeap.prototype, "AStarBinaryHeap");
        var AStarNode = /** @class */ (function () {
            function AStarNode() {
                this.x = 0;
                this.y = 0;
                this.f = 0;
                this.g = 0;
                this.h = 0;
                this.version = 1;
                this.linkInited = false;
            }
            AStarNode.prototype.setTo = function (x, y, s) {
                this.x = x;
                this.y = y;
                this.walkable = s;
                return this;
            };
            AStarNode.prototype.toString = function () {
                return "AStarNode:{x:" + this.x + " y:" + this.y + " walkable:" + this.walkable + "}";
            };
            AStarNode.prototype.toPoint = function () {
                return Pool.alloc(Point).setTo(this.x, this.y);
            };
            AStarNode.prototype.dispose = function () {
                this.onRelease();
            };
            AStarNode.prototype.onAlloc = function () {
            };
            AStarNode.prototype.onRelease = function () {
                var self = this;
                self.x = 0;
                self.y = 0;
                self.f = 0;
                self.g = 0;
                self.h = 0;
                self.parent = null;
                self.version = 0;
                self.linkInited = false;
                if (self.linkNodes) {
                    self.linkNodes.length = 0;
                }
                if (self.linkCost) {
                    self.linkCost.length = 0;
                }
                self.walkable = false;
            };
            return AStarNode;
        }());
        __reflect(AStarNode.prototype, "AStarNode", ["base.PoolObject", "base.DisposeObject"]);
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene_21) {
        var Rectangle = egret.Rectangle;
        var Point = egret.Point;
        var Pool = base.Pool;
        var GDirUtil = game.utils.GDirUtil;
        var SceneCamera = /** @class */ (function () {
            function SceneCamera(scene) {
                this._mw = 0; // map width
                this._mh = 0; // map height
                this._viewPort = new Rectangle();
                this._isStartMove = false;
                this.isUpdate = false;
                this._update_average_time_queue = [];
                this._scene = scene;
            }
            SceneCamera.prototype.init = function () {
                var self = this;
                self._mw = scene_21.MapData.ins.mapWidth;
                self._mh = scene_21.MapData.ins.mapHeight;
                self._sliceW = scene_21.MapData.ins.sliceWidth;
                self._sliceH = scene_21.MapData.ins.sliceHeight;
                self._fx = NaN;
                self._fy = NaN;
                self._curMovePosX = null;
                self._curMovePosY = null;
                self._startPosX = null;
                self._startPosY = null;
                self._endPosX = null;
                self._endPosY = null;
                self._speedMove = scene_21.MapData.ins.cellWidth / game.DefaultSpeed;
                self._update_average_time_queue.length = 0;
            };
            SceneCamera.prototype.onResize = function (sw, sh) {
                var self = this;
                self._sw = sw;
                self._sh = sh;
                if (self._mw == 0 || self._mh == 0) {
                    return;
                }
                if (!isNaN(self._fx) && !isNaN(self._fy)) {
                    /**聚焦时候需要计算上偏移量*/
                    self.setFocus(self._fx, self._fy + game.CameraOffsetY, false, self._scale);
                }
            };
            SceneCamera.prototype.equal = function (fx, fy) {
                var Fix = SceneCamera.Fix;
                var cx = Math.floor(this._fx * Fix);
                var cy = Math.floor(this._fy * Fix);
                var tx = Math.floor(fx * Fix);
                var ty = Math.floor(fy * Fix);
                return cx == tx && cy == ty;
            };
            /**PVP里面的场景才会用到，设置镜头居中*/
            SceneCamera.prototype.setMapCenterFocus = function () {
                // if (SceneUtil.getCurSceneType() == SceneType.CompeteMars) {  // 竞技场地图策划弄不好
                //     posY = 0.4;
                // }
                this.setFocus(this._mw * 0.47, this._mh * 0.47, false);
            };
            SceneCamera.prototype.setFocus = function (focusX, focusY, smooth, scale) {
                if (smooth === void 0) { smooth = true; }
                if (scale === void 0) { scale = 1; }
                var self = this;
                if (self.equal(focusX, focusY)) {
                    return;
                }
                // console.log(`X:${focusX} Y:${focusY}`)
                if (self._startPosX == null) {
                    self._startPosX = focusX;
                    self._startPosY = focusY - game.CameraOffsetY;
                    smooth = false;
                }
                self._fx = focusX;
                self._fy = focusY - game.CameraOffsetY;
                self._scale = scale;
                if (smooth) {
                    self._startPosX = self._curMovePosX ? self._curMovePosX : self._startPosX;
                    self._startPosY = self._curMovePosY ? self._curMovePosY : self._startPosY;
                    self._endPosX = focusX;
                    self._endPosY = focusY - game.CameraOffsetY;
                    self._curTime = 0;
                    self.isUpdate = true;
                }
                else {
                    self._isStartMove = false;
                    self._totalDist = 0;
                    self.checkToStopUpdate();
                    self.updateViewPort(focusX, focusY - game.CameraOffsetY);
                }
            };
            SceneCamera.prototype.update = function (elapseTime) {
                var self = this;
                if (self.isUpdate) {
                    var r = GDirUtil.getRadian2(self._curMovePosX, self._curMovePosY, self._endPosX, self._endPosY);
                    self._totalDist = Math.sqrt(game.PointUtil.distanceSquare(self._curMovePosX, self._curMovePosY, self._endPosX, self._endPosY));
                    // this.addAverageTime(self._totalDist);//平均值
                    var dist = self._totalDist;
                    var isStop = false;
                    if (dist < 1) {
                        self._totalDist = 0;
                        isStop = true;
                    }
                    if (isStop) {
                        self.checkToStopUpdate();
                        self.updateViewPort(self._endPosX, self._endPosY);
                    }
                    else {
                        var value = dist / 5;
                        // this.addAverageTime(value);//平均值
                        // value = this.getAverageTime();
                        var x = Math.cos(r) * value;
                        var y = Math.sin(r) * value;
                        self._curMovePosX += x;
                        self._curMovePosY += y;
                        self.updateViewPort(self._curMovePosX, self._curMovePosY);
                    }
                }
            };
            SceneCamera.prototype.checkToStopUpdate = function () {
                if (this._totalDist == 0) {
                    this._curMovePosY = this._fy;
                    this._curMovePosX = this._fx;
                    this.isUpdate = false;
                }
            };
            SceneCamera.prototype.getFocusPt = function () {
                return Pool.alloc(Point).setTo(this._fx, this._fy);
            };
            SceneCamera.prototype.updateViewPort = function (fX, fY) {
                var self = this;
                var sw = self._sw / self._scale;
                var mw = self._mw;
                var sh = self._sh / self._scale;
                var mh = self._mh;
                var hW = Math.min(sw, mw) / 2;
                var hH = Math.min(sh, mh) / 2;
                var cX = game.MathUtil.clamp(fX, hW, Math.max(sw, mw) - hW);
                var cY = game.MathUtil.clamp(fY, hH, Math.max(sh, mh) - hH);
                var w2 = cX - hW;
                var h2 = cY - hH;
                self._viewPort.setTo(w2, h2, sw, sh);
                if (gso.dbg_scene == 4) {
                    console.info("主角坐标（", fX, ",", fY, ")");
                    console.info("屏幕左上角坐标（", w2, ",", h2, ")");
                    console.info("屏幕右上角坐标（", w2 + sw, ",", h2, ")");
                    var cellWidth = scene_21.MapData.ins.cellWidth;
                    console.info("主角网格坐标（", fX / cellWidth, ",", fY / cellWidth, ")");
                    console.info("屏幕左上角网格坐标（", w2 / cellWidth, ",", h2 / cellWidth, ")");
                    console.info("屏幕右上角网格坐标（", (w2 + sw) / cellWidth, ",", h2 / cellWidth, ")");
                }
                self._scene.updateViewPort(self._viewPort);
                this.updateMapTiles(this._viewPort);
            };
            SceneCamera.prototype.updateMapTiles = function (viewRect) {
                var self = this;
                var viewSX = viewRect.x;
                var viewSY = viewRect.y;
                var viewW = viewRect.width;
                var viewH = viewRect.height;
                var viewEX = viewSX + viewW;
                var viewEY = viewSY + viewH;
                var sc = Math.floor(viewSX / self._sliceW); //左上方第一块地图坐标（sc,sr）
                var sr = Math.floor(viewSY / self._sliceH);
                var ec = Math.floor(viewEX / self._sliceW) + ((viewEX % self._sliceW == 0) ? 0 : 1); //右下方最后一块地图坐标（ec,er）
                var er = Math.floor(viewEY / self._sliceH) + ((viewEY % self._sliceH == 0) ? 0 : 1);
                self._scene.updateTiles(sc, sr, ec, er);
            };
            Object.defineProperty(SceneCamera.prototype, "viewPort", {
                get: function () {
                    return this._viewPort;
                },
                enumerable: true,
                configurable: true
            });
            SceneCamera.Fix = 100;
            return SceneCamera;
        }());
        scene_21.SceneCamera = SceneCamera;
        __reflect(SceneCamera.prototype, "game.scene.SceneCamera");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var MapCellUtil = /** @class */ (function () {
            function MapCellUtil() {
            }
            MapCellUtil.isMask = function (value, mask) {
                return (value & mask) != 0;
            };
            MapCellUtil.isPass = function (value) {
                return MapCellUtil.isMask(value, MapCellUtil.PASS);
            };
            MapCellUtil.isBlock = function (value) {
                return !MapCellUtil.isPass(value);
            };
            MapCellUtil.isShelter = function (value) {
                return MapCellUtil.isMask(value, MapCellUtil.SHELTER);
            };
            MapCellUtil.BLOCK = 0; // 障碍0
            MapCellUtil.PASS = 1 << 0; // 可通过1
            MapCellUtil.SHELTER = 1 << 1; // 遮挡区域2
            MapCellUtil.JUMP = 1 << 2; // 跳跃区域4
            MapCellUtil.SAFETY = 1 << 3; // 安全区域8
            return MapCellUtil;
        }());
        scene.MapCellUtil = MapCellUtil;
        __reflect(MapCellUtil.prototype, "game.scene.MapCellUtil");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Pool = base.Pool;
        var Point = egret.Point;
        var MAX = 999999;
        var Dis = /** @class */ (function () {
            function Dis() {
                this.path = [];
            }
            Dis.prototype.dispose = function () {
                this.onRelease();
            };
            Dis.prototype.onAlloc = function () {
                this.path.length = 0;
                this.value = MAX;
            };
            Dis.prototype.onRelease = function () {
                this.path.length = 0;
                this.value = MAX;
                this.visit = false;
            };
            return Dis;
        }());
        __reflect(Dis.prototype, "Dis", ["base.PoolObject", "base.DisposeObject"]);
        var OptimalPath = /** @class */ (function () {
            function OptimalPath() {
            }
            OptimalPath.clearDis = function () {
                for (var _i = 0, _a = this._disList; _i < _a.length; _i++) {
                    var d = _a[_i];
                    Pool.release(d);
                }
                this._disList.length = 0;
            };
            OptimalPath.initData = function (mapId) {
                var path = scene.MapData.ins.path;
                // if (gso["test"]) {
                //     path = [[2903, 1963], [1963, 2929], [4994, 6511], [6511, 6109], [6511, 7048], [7048, 8012], [8012, 9221], [11936, 13311], [10542, 12022], [11446, 10897], [10897, 10095], [10095, 9270], [6285, 5321], [4785, 5321], [6285, 7093]];
                // }
                var self = this;
                if (!path || path.length == 0) {
                    return;
                }
                var data = self._matrixMap[mapId];
                if (!data) {
                    data = self._matrixMap[mapId] = { matrix: [], points: [] };
                }
                for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
                    var pts = path_1[_i];
                    for (var _a = 0, pts_1 = pts; _a < pts_1.length; _a++) {
                        var p = pts_1[_a];
                        if (data.points.indexOf(p) < 0) {
                            data.points.push(p);
                        }
                    }
                }
                var pointCnt = data.points.length;
                if (self._disList.length) {
                    self.clearDis();
                }
                for (var i = 0; i < pointCnt; ++i) {
                    data.matrix[i] = [];
                    for (var k = 0; k < pointCnt; ++k) {
                        data.matrix[i][k] = MAX;
                    }
                }
                for (var _b = 0, path_2 = path; _b < path_2.length; _b++) {
                    var pts = path_2[_b];
                    var pt0 = pts[0];
                    var pt1 = pts[1];
                    var pt0Idx = data.points.indexOf(pt0);
                    var pt1Idx = data.points.indexOf(pt1);
                    self._tmpPt1 = scene.MapData.ins.getCellPtByIdx(pt0, self._tmpPt1);
                    self._tmpPt2 = scene.MapData.ins.getCellPtByIdx(pt1, self._tmpPt2);
                    var dis = Math.round(game.PointUtil.distancePt(self._tmpPt1, self._tmpPt2));
                    data.matrix[pt0Idx][pt1Idx] = data.matrix[pt1Idx][pt0Idx] = dis;
                }
            };
            OptimalPath.Dijkstra = function (begin, matrix, disList) {
                disList = disList || [];
                var i;
                var pointCnt = matrix.length;
                if (disList.length) {
                    this.clearDis();
                }
                for (i = 0; i < pointCnt; i++) {
                    //设置当前的路径
                    var d = Pool.alloc(Dis);
                    disList.push(d);
                    d.path.length = 0;
                    d.path.push(begin);
                    d.path.push(i);
                    d.value = matrix[begin][i];
                }
                //设置起点的到起点的路径为0
                disList[begin].value = 0;
                disList[begin].visit = true;
                //计算剩余的顶点的最短路径（剩余pointCnt-1个顶点）
                for (var count = 1; count <= pointCnt; ++i) {
                    var temp = 0; //temp用于保存当前dis数组中最小的那个下标
                    var min = MAX; //min记录的当前的最小值
                    for (i = 0; i < pointCnt; i++) {
                        if (!disList[i].visit && disList[i].value < min) {
                            min = disList[i].value;
                            temp = i;
                        }
                    }
                    disList[temp].visit = true; //把temp对应的顶点加入到已经找到的最短路径的集合中
                    ++count;
                    for (i = 0; i < pointCnt; i++) {
                        if (!disList[i].visit && matrix[temp][i] != MAX && (disList[temp].value + matrix[temp][i]) < disList[i].value) {
                            disList[i].value = disList[temp].value + matrix[temp][i]; //如果新得到的边可以影响其他为访问的顶点，那就就更新它的最短路径和长度
                            disList[i].path.length = 0;
                            for (var _i = 0, _a = disList[temp].path; _i < _a.length; _i++) {
                                var p = _a[_i];
                                disList[i].path.push(p);
                            }
                            disList[i].path.push(i);
                        }
                    }
                }
                return disList;
            };
            OptimalPath.getPath = function (beginPt, endPt, mapId) {
                this.initData(mapId);
                var data = this._matrixMap[mapId];
                if (!data || data.matrix.length == 0) {
                    return null;
                }
                var begin = this.findPointIdx(beginPt, data.points);
                if (begin == -1) { //找到起点
                    return null;
                }
                var end = this.findPointIdx(endPt, data.points);
                if (end == -1) { //找到终点
                    return null;
                }
                if (begin == end) { //起点和终点是相同点
                    return null;
                }
                this._disList = this.Dijkstra(begin, data.matrix, this._disList);
                var ptPath = [];
                for (var _i = 0, _a = this._disList; _i < _a.length; _i++) {
                    var dis = _a[_i];
                    if (dis.value == MAX) {
                        continue;
                    }
                    if (dis.path[0] == begin && dis.path[dis.path.length - 1] == end) {
                        var res = this.findPathIdx(beginPt, data.points[dis.path[0]], data.points[dis.path[1]]);
                        var beginIdx = res == data.points[dis.path[0]] ? 0 : 1;
                        var tmpPt1 = scene.MapData.ins.getCellPtByIdx(data.points[dis.path[beginIdx]]);
                        var path = scene.Scene.findPath(beginPt.x, beginPt.y, tmpPt1.x, tmpPt1.y);
                        if (!path) {
                            break;
                        }
                        for (var _b = 0, path_3 = path; _b < path_3.length; _b++) {
                            var p = path_3[_b];
                            ptPath.push(p);
                        }
                        var pathLen = dis.path.length;
                        res = this.findPathIdx(endPt, data.points[dis.path[pathLen - 1]], data.points[dis.path[pathLen - 2]]);
                        var endIdx = res == data.points[dis.path[pathLen - 1]] ? pathLen - 1 : pathLen - 2;
                        if (beginIdx == endIdx) {
                            ptPath.pop();
                        }
                        for (var i = beginIdx + 1; i < endIdx; ++i) { //中间的点
                            ptPath.push(scene.MapData.ins.getCellPtByIdx(data.points[dis.path[i]]));
                        }
                        var tmpPt2 = scene.MapData.ins.getCellPtByIdx(data.points[dis.path[endIdx]]);
                        path = scene.Scene.findPath(tmpPt2.x, tmpPt2.y, endPt.x, endPt.y);
                        if (!path) {
                            break;
                        }
                        for (var _c = 0, path_4 = path; _c < path_4.length; _c++) {
                            var p = path_4[_c];
                            ptPath.push(p);
                        }
                        break;
                    }
                }
                this.clearDis();
                return ptPath;
            };
            OptimalPath.findPointIdx = function (pt, points) {
                var min = -1;
                var dis = MAX;
                var endPt = Pool.alloc(Point);
                for (var i = 0; i < points.length; ++i) {
                    var ptIdx = points[i];
                    endPt = scene.MapData.ins.getCellPtByIdx(ptIdx, endPt);
                    if (endPt.x == pt.x && endPt.y == pt.y) {
                        min = i;
                        break;
                    }
                    var d = scene.Scene.getFindPathDis(pt.x, pt.y, endPt.x, endPt.y);
                    if (d != null && d < dis) {
                        dis = d;
                        min = i;
                    }
                }
                Pool.release(endPt);
                return min;
            };
            OptimalPath.findPathIdx = function (pA, b, c) {
                var pB = scene.MapData.ins.getCellPtByIdx(b);
                var pC = scene.MapData.ins.getCellPtByIdx(c);
                var a_2_b = game.PointUtil.distancePt(pA, pB);
                var a_2_c = game.PointUtil.distancePt(pA, pC);
                var b_2_c = game.PointUtil.distancePt(pB, pC);
                Pool.release(pB);
                Pool.release(pC);
                return a_2_c > a_2_b && a_2_c > b_2_c ? b : c; //当起点到路径第二个是钝角边时，去路径第一个点，其他情况需要去第二点
            };
            OptimalPath._matrixMap = {};
            OptimalPath._disList = [];
            OptimalPath._tmpPt1 = Pool.alloc(Point);
            OptimalPath._tmpPt2 = Pool.alloc(Point);
            return OptimalPath;
        }());
        scene.OptimalPath = OptimalPath;
        __reflect(OptimalPath.prototype, "game.scene.OptimalPath");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Shape = egret.Shape;
        var TimeMgr = base.TimeMgr;
        var RhombusEffect = /** @class */ (function (_super) {
            __extends(RhombusEffect, _super);
            function RhombusEffect() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._sps = [];
                return _this;
            }
            RhombusEffect.prototype.start = function () {
                _super.prototype.start.call(this);
                this._pos = 1;
                var parent = game.Layer.tip;
                var w = 16;
                var h = w;
                var sx = gso.gameStage.stageWidth / w;
                var sy = gso.gameStage.stageHeight / h;
                var sp;
                sp = new Shape();
                sp.scaleX = sx;
                sp.scaleY = sy;
                sp.graphics.beginFill(0);
                sp.graphics.moveTo(0, 0);
                sp.graphics.lineTo(w, 0);
                sp.graphics.lineTo(0, h);
                sp.graphics.lineTo(0, 0);
                sp.graphics.endFill();
                parent.addChild(sp);
                this._sps.push(sp);
                sp = new Shape();
                sp.scaleX = sx;
                sp.scaleY = sy;
                sp.graphics.beginFill(0);
                sp.graphics.moveTo(w, 0);
                sp.graphics.lineTo(w, h);
                sp.graphics.lineTo(0, h);
                sp.graphics.lineTo(w, 0);
                sp.graphics.endFill();
                parent.addChild(sp);
                this._sps.push(sp);
                sp = new Shape();
                sp.scaleX = sx;
                sp.scaleY = sy;
                sp.graphics.beginFill(0);
                sp.graphics.moveTo(0, 0);
                sp.graphics.lineTo(w, 0);
                sp.graphics.lineTo(w, h);
                sp.graphics.lineTo(0, 0);
                sp.graphics.endFill();
                parent.addChild(sp);
                this._sps.push(sp);
                sp = new Shape();
                sp.scaleX = sx;
                sp.scaleY = sy;
                sp.graphics.beginFill(0);
                sp.graphics.moveTo(0, 0);
                sp.graphics.lineTo(0, h);
                sp.graphics.lineTo(w, h);
                sp.graphics.lineTo(0, 0);
                sp.graphics.endFill();
                parent.addChild(sp);
                this._sps.push(sp);
                this.draw();
                TimeMgr.addUpdateItem(this);
            };
            RhombusEffect.prototype.stop = function (callComplete) {
                if (callComplete === void 0) { callComplete = false; }
                for (var _i = 0, _a = this._sps; _i < _a.length; _i++) {
                    var sp = _a[_i];
                    if (sp) {
                        sp.graphics.clear();
                        if (sp.parent) {
                            sp.parent.removeChild(sp);
                        }
                    }
                }
                this._sps.length = 0;
                TimeMgr.removeUpdateItem(this);
                _super.prototype.stop.call(this, callComplete);
            };
            RhombusEffect.prototype.update = function (time) {
                _super.prototype.update.call(this, time);
                this._pos -= 0.03;
                this.draw();
                if (this._pos <= 0) {
                    this.step("anim" /* ANIM */);
                }
            };
            RhombusEffect.prototype.draw = function () {
                var self = this;
                var iX = game.Layer.tip.x;
                var iY = game.Layer.tip.y;
                var sw = game.Layer.tip.stage.stageWidth;
                var sh = game.Layer.tip.stage.stageHeight;
                var p = self._pos;
                var sp;
                sp = self._sps[0];
                sp.x = -(1 - p) * sw - iX;
                sp.y = -(1 - p) * sh - iY;
                sp = self._sps[1];
                sp.x = (1 - p) * sw - iX;
                sp.y = (1 - p) * sh - iY;
                sp = self._sps[2];
                sp.x = (1 - p) * sw - iX;
                sp.y = -(1 - p) * sh - iY;
                sp = self._sps[3];
                sp.x = -(1 - p) * sw - iX;
                sp.y = (1 - p) * sh - iY;
            };
            return RhombusEffect;
        }(scene.BaseEnterEffect));
        scene.RhombusEffect = RhombusEffect;
        __reflect(RhombusEffect.prototype, "game.scene.RhombusEffect");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=scene.js.map