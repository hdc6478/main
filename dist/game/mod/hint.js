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
        var hint;
        (function (hint) {
            var HintMod = /** @class */ (function (_super) {
                __extends(HintMod, _super);
                function HintMod() {
                    return _super.call(this, "08" /* Hint */) || this;
                }
                HintMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                HintMod.prototype.initModel = function () {
                    this.regProxy(7 /* Hint */, hint.HintProxy);
                    _super.prototype.initModel.call(this);
                };
                HintMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                };
                return HintMod;
            }(game.ModBase));
            hint.HintMod = HintMod;
            __reflect(HintMod.prototype, "game.mod.hint.HintMod");
            gso.modCls.push(HintMod);
        })(hint = mod.hint || (mod.hint = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var hint;
        (function (hint) {
            var HintModel = /** @class */ (function () {
                function HintModel() {
                    this.openIdxToNode = {}; //功能idx关联红点
                }
                return HintModel;
            }());
            hint.HintModel = HintModel;
            __reflect(HintModel.prototype, "game.mod.hint.HintModel");
        })(hint = mod.hint || (mod.hint = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var hint;
        (function (hint) {
            var Pool = base.Pool;
            var TimeMgr = base.TimeMgr;
            var Handler = base.Handler;
            var HintProxy = /** @class */ (function (_super) {
                __extends(HintProxy, _super);
                function HintProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._eventList = {}; //定时器数据
                    return _this;
                }
                HintProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new hint.HintModel();
                    this._model.tree = Pool.alloc(hint.HintTree);
                };
                HintProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    TimeMgr.removeUpdateItem(this);
                };
                HintProxy.prototype.update = function (time) {
                    var eventList = this._eventList;
                    if (!eventList) {
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    for (var k in eventList) {
                        var info = eventList[k];
                        var leftTime = info.time - TimeMgr.time.serverTimeSecond;
                        if (leftTime == 0) {
                            var handler = info.handler;
                            handler.exec();
                            Pool.release(handler);
                        }
                        if (leftTime <= 0) {
                            delete eventList[k];
                        }
                    }
                    if (!mod.RoleUtil.hasObj(eventList)) {
                        TimeMgr.removeUpdateItem(this);
                    }
                    // if (JSON.stringify(eventList) == "{}") {
                    //     TimeMgr.removeUpdateItem(this);
                    // }
                };
                /**
                 * 添加定时器事件
                 * @param type：TimeEventType，定时器类型
                 * @param time：到点执行的时间戳
                 * @param proxy：自己的proxy
                 * @param method：执行的方法
                 * @param args：方法携带的参数
                 */
                HintProxy.prototype.addTimeEvent = function (type, time, proxy, method, args) {
                    var eventList = this._eventList;
                    var oldInfo = eventList[type];
                    if (!oldInfo) {
                        eventList[type] = { time: time, handler: Handler.alloc(proxy, method, args) };
                    }
                    else {
                        if (oldInfo.time != time) {
                            eventList[type] = { time: time, handler: Handler.alloc(proxy, method, args) };
                        }
                    }
                    if (!TimeMgr.hasUpdateItem(this)) {
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                };
                /**
                 * 是否存在定时器事件
                 * @param type：TimeEventType，定时器类型
                 */
                HintProxy.prototype.hasTimeEvent = function (type) {
                    var eventList = this._eventList;
                    var oldInfo = eventList[type];
                    return !!oldInfo;
                };
                /**
                 * 移除定时器事件
                 * @param type：TimeEventType，定时器类型
                 */
                HintProxy.prototype.removeTimeEvent = function (type) {
                    var eventList = this._eventList;
                    delete eventList[type];
                };
                /**
                 * 获取红点
                 * @param node
                 */
                HintProxy.prototype.getHint = function (node) {
                    var tree = this._model.tree;
                    var key = "";
                    for (var i = 0; i < node.length; i++) {
                        key += node[i];
                        var children = tree.children[key];
                        if (!children) {
                            return false;
                        }
                        tree = children;
                    }
                    return tree.value;
                };
                /**
                 * 根据功能idx获取红点
                 * @param openIdx
                 */
                HintProxy.prototype.getHintByOpenIdx = function (openIdx) {
                    var node = this._model.openIdxToNode[openIdx];
                    if (!node) {
                        return false;
                    }
                    return this.getHint(node);
                };
                /**
                 * 根据功能idx获取红点唯一key
                 * @param openIdx
                 */
                HintProxy.prototype.getTypeByOpenIdx = function (openIdx) {
                    var node = this._model.openIdxToNode[openIdx];
                    if (!node) {
                        return null;
                    }
                    return mod.HintMgr.getType(node);
                };
                /**
                 * 设置红点 （注意子节点key的唯一）
                 * @param value，红点值
                 * @param node 第一层为ModName，后序需要自身模块Def文件定义，例如ModName.Role_RoleViewType.RoleMain_RoleMainBtnType.BtnRole
                 * @param openIdx，功能id，可缺省
                 */
                HintProxy.prototype.setHint = function (value, node, openIdx) {
                    var tree = this._model.tree;
                    var key = "";
                    for (var i = 0; i < node.length; i++) {
                        /**向下寻找节点*/
                        key += node[i];
                        var children = tree.children[key];
                        if (!children) {
                            /**节点不存在时，只有触发红点才创建新的节点*/
                            if (!value) {
                                return;
                            }
                            children = tree.children[key] = Pool.alloc(hint.HintTree);
                            children.node = key;
                            children.parent = tree;
                            children.setValue(false); /**创建节点时，默认赋值false*/
                        }
                        if (value && children.value != value) {
                            /**向下寻找节点的时候，触发节点红点时，则不再向上刷新节点树*/
                            children.setValue(value, true); /**发送事件*/
                        }
                        tree = children;
                        /**功能idx关联红点*/
                        if (i == node.length - 1 && openIdx) {
                            this._model.openIdxToNode[openIdx] = node;
                        }
                    }
                    /**判断子节点红点，红点由true转为false时，需要向上传递*/
                    if (tree.value != value) {
                        tree.setValue(value, true); /**发送事件*/
                        /**更新父节点*/
                        this.updateTreeHint(tree);
                    }
                };
                /**
                 * 更新父节点红点
                 * @param tree
                 */
                HintProxy.prototype.updateTreeHint = function (tree) {
                    var parentTree = tree.parent;
                    //做下限制，父节点存在node时才赋值
                    while (parentTree && parentTree.node) {
                        var value = false;
                        var keys = Object.keys(parentTree.children);
                        for (var j = 0; j < keys.length; j++) {
                            if (parentTree.children[keys[j]].value) {
                                value = true;
                                break; /**任意子节点红点为true时，设置父节点红点为true*/
                            }
                        }
                        if (parentTree.value != value) {
                            /**父节点红点变更*/
                            parentTree.setValue(value, true); /**发送事件*/
                            /**父节点向上传递*/
                            parentTree = parentTree.parent;
                        }
                        else {
                            /**父节点红点不变时，停止向上传递*/
                            parentTree = null;
                        }
                    }
                };
                return HintProxy;
            }(game.ProxyBase));
            hint.HintProxy = HintProxy;
            __reflect(HintProxy.prototype, "game.mod.hint.HintProxy", ["game.mod.IHintProxy", "base.IProxy", "base.UpdateItem"]);
        })(hint = mod.hint || (mod.hint = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var hint;
        (function (hint) {
            var Pool = base.Pool;
            var facade = base.facade;
            var delayCall = base.delayCall;
            var Handler = base.Handler;
            var clearDelay = base.clearDelay;
            var HintTree = /** @class */ (function () {
                function HintTree() {
                    this.children = {}; /**子节点*/
                    this._timeOut = 0; /**延迟0.3秒派发事件，防止多次触发事件*/
                }
                HintTree.prototype.onAlloc = function () {
                };
                HintTree.prototype.onRelease = function () {
                    var self = this;
                    self.node = null;
                    self._value = null;
                    if (self._timeOut) {
                        clearDelay(self._timeOut);
                        self._timeOut = 0;
                    }
                    for (var k in self.children) {
                        var tree = self.children[k];
                        Pool.release(tree);
                        delete self.children[k];
                    }
                };
                HintTree.prototype.dispose = function () {
                    this.onRelease();
                };
                HintTree.prototype.setValue = function (value, sendEvent) {
                    var _this = this;
                    this._value = value;
                    if (!sendEvent) {
                        return;
                    }
                    if (this._timeOut) {
                        return;
                    }
                    this._timeOut = delayCall(Handler.alloc(this, function () {
                        var data = { node: _this.node, value: _this._value };
                        facade.sendNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, data);
                        _this._timeOut = 0;
                    }), 300);
                };
                Object.defineProperty(HintTree.prototype, "value", {
                    get: function () {
                        return this._value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return HintTree;
            }());
            hint.HintTree = HintTree;
            __reflect(HintTree.prototype, "game.mod.hint.HintTree", ["base.PoolObject", "base.DisposeObject"]);
        })(hint = mod.hint || (mod.hint = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=hint.js.map