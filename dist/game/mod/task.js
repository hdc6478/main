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
        var task;
        (function (task) {
            var TaskMod = /** @class */ (function (_super) {
                __extends(TaskMod, _super);
                function TaskMod() {
                    return _super.call(this, "13" /* Task */) || this;
                }
                TaskMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                    var self = this;
                };
                TaskMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    var self = this;
                    self.regProxy(10 /* Task */, task.TaskProxy);
                };
                TaskMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    var self = this;
                };
                return TaskMod;
            }(game.ModBase));
            task.TaskMod = TaskMod;
            __reflect(TaskMod.prototype, "game.mod.task.TaskMod");
            gso.modCls.push(TaskMod);
        })(task = mod.task || (mod.task = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var task;
        (function (task) {
            var TaskModel = /** @class */ (function () {
                function TaskModel() {
                    /**暂停玩家战斗*/
                    this.pauseFight = false;
                    /**是否正在强制对话*/
                    this.inNpcTaskFlag = false;
                    /**自动执行任务倒计时开始标志*/
                    this.autoFlag = false;
                    /**去除主线任务暂停一分钟战斗标志*/
                    this.continueMainTaskFlag = false;
                    this.playEffectFlag = false; //播放特效
                    /**暂停主线任务*/
                    this.stopMainTaskFlag = false;
                }
                return TaskModel;
            }());
            task.TaskModel = TaskModel;
            __reflect(TaskModel.prototype, "game.mod.task.TaskModel");
        })(task = mod.task || (mod.task = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var task;
        (function (task_1) {
            var c2s_all_task_info = msg.c2s_all_task_info;
            var s2c_all_task_info = msg.s2c_all_task_info;
            var c2s_quick_task = msg.c2s_quick_task;
            var c2s_task_recv_reward = msg.c2s_task_recv_reward;
            var c2s_one_key_task_recv_reward = msg.c2s_one_key_task_recv_reward;
            var TaskProxy = /** @class */ (function (_super) {
                __extends(TaskProxy, _super);
                function TaskProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                TaskProxy.prototype.getModel = function () {
                    return this._model;
                };
                TaskProxy.prototype.onStartReconnect = function () {
                    var self = this;
                    self.cleanDataDict();
                    _super.prototype.onStartReconnect.call(this);
                };
                TaskProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    var self = this;
                    self._model = new task_1.TaskModel();
                    self.cleanDataDict();
                    self.onProto(s2c_all_task_info, self.all_task_info_s2c, self);
                };
                TaskProxy.prototype.cleanDataDict = function () {
                    this._model.task_dic = {};
                    this._model.typeTasks = {};
                    this._model.typeHints = {};
                };
                /**
                 * 请求任务信息
                 * @param types，任务类型列表
                 */
                TaskProxy.prototype.all_task_info_c2s = function (types) {
                    var msg = new c2s_all_task_info();
                    msg.task_types = types;
                    this.sendProto(msg);
                };
                /**
                 * 快速完成任务
                 * @param taskId
                 */
                TaskProxy.prototype.c2s_quick_task = function (taskId) {
                    var msg = new c2s_quick_task();
                    msg.task_idx = taskId;
                    this.sendProto(msg);
                };
                /**
                 * 领取奖励
                 * @param taskId 任务完成后领取奖励
                 */
                TaskProxy.prototype.task_recv_reward_c2s = function (taskId) {
                    var msg = new c2s_task_recv_reward();
                    msg.task_id = taskId;
                    this.sendProto(msg);
                };
                /**
                 * 一键领取任务奖励
                 * @param type 任务类型
                 */
                TaskProxy.prototype.c2s_one_key_task_recv_reward = function (type) {
                    var msg = new c2s_one_key_task_recv_reward();
                    msg.task_type = type;
                    this.sendProto(msg);
                };
                /** 任务信息返回 */
                TaskProxy.prototype.all_task_info_s2c = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.tasks || !msg.tasks.length) {
                        console.error("任务数据下发异常，没有数据！");
                        return;
                    }
                    var task_list = msg.tasks;
                    var types = [];
                    if (msg.oper == 1 /* All */) {
                        /**接收所有任务*/
                        for (var _i = 0, task_list_1 = task_list; _i < task_list_1.length; _i++) {
                            var task_2 = task_list_1[_i];
                            this._model.task_dic[task_2.task_id] = task_2;
                            this.addTask(task_2);
                            var type = mod.TaskUtil.getTaskType(task_2.task_id);
                            if (types.indexOf(type) < 0) {
                                types.push(type);
                            }
                        }
                        this.updateHint(types);
                        this.sendNt("on_task_update" /* ON_TASK_UPDATE */, types);
                        return;
                    }
                    /**更新删除任务时，统一刷新事件*/
                    if (msg.oper == 2 /* Update */) {
                        for (var _a = 0, task_list_2 = task_list; _a < task_list_2.length; _a++) {
                            var task_3 = task_list_2[_a];
                            var old_task = this._model.task_dic[task_3.task_id];
                            if (!old_task) {
                                this._model.task_dic[task_3.task_id] = old_task = task_3;
                                this.addTask(task_3);
                            }
                            else {
                                var type_1 = mod.TaskUtil.getTaskType(old_task.task_id);
                                if (type_1 == 1 /* Main */ && old_task.status == 1 /* Finish */ && task_3.status == 2 /* Draw */) {
                                    //主线任务从已完成状态切换到已领取状态时候，弹窗任务完成特效
                                    mod.ViewMgr.getIns().showSuccessTips(10 /* Task */);
                                }
                                for (var key in task_3) {
                                    old_task[key] = task_3[key];
                                }
                                var pos = this.getTaskPos(old_task);
                                if (pos >= 0) {
                                    this._model.typeTasks[type_1][pos] = old_task;
                                }
                            }
                            var type = mod.TaskUtil.getTaskType(old_task.task_id);
                            if (types.indexOf(type) < 0) {
                                types.push(type);
                            }
                        }
                    }
                    else if (msg.oper == 3 /* Del */) {
                        for (var _b = 0, task_list_3 = task_list; _b < task_list_3.length; _b++) {
                            var task_4 = task_list_3[_b];
                            var old_task = this._model.task_dic[task_4.task_id];
                            if (!old_task) {
                                console.error("服务端删除了不存在的任务，任务ID：", task_4.task_id);
                                continue;
                            }
                            var type = mod.TaskUtil.getTaskType(old_task.task_id);
                            if (types.indexOf(type) < 0) {
                                types.push(type);
                            }
                            var pos = this.getTaskPos(old_task);
                            if (pos >= 0) {
                                this._model.typeTasks[type].splice(pos, 1);
                            }
                            if (!this._model.typeTasks[type].length) {
                                delete this._model.typeTasks[type];
                            }
                            delete this._model.task_dic[task_4.task_id];
                        }
                    }
                    this.updateHint(types);
                    this.sendNt("on_task_update" /* ON_TASK_UPDATE */, types);
                };
                TaskProxy.prototype.addTask = function (task) {
                    var type = mod.TaskUtil.getTaskType(task.task_id);
                    if (!this._model.typeTasks[type]) {
                        this._model.typeTasks[type] = [];
                    }
                    this._model.typeTasks[type].push(task);
                };
                TaskProxy.prototype.getTaskPos = function (task) {
                    var type = mod.TaskUtil.getTaskType(task.task_id);
                    var typeTasks = this._model.typeTasks[type];
                    for (var i = 0; i < typeTasks.length; ++i) {
                        var t = typeTasks[i];
                        if (t.task_id == task.task_id) {
                            return i;
                        }
                    }
                    return -1;
                };
                TaskProxy.prototype.updateHint = function (types) {
                    var tmpTypes = [];
                    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                        var type = types_1[_i];
                        var tasks = this.getTaskList(type);
                        var oldHint = this._model.typeHints[type] || false;
                        var hint = false;
                        for (var _a = 0, tasks_1 = tasks; _a < tasks_1.length; _a++) {
                            var task_5 = tasks_1[_a];
                            if (task_5.status == 1 /* Finish */) {
                                hint = true;
                                break;
                            }
                        }
                        if (oldHint != hint) {
                            this._model.typeHints[type] = hint;
                            tmpTypes.push(type);
                        }
                    }
                    this.sendNt("on_task_hint" /* ON_TASK_HINT */, tmpTypes);
                };
                /**
                 * 获取任务列表
                 * @param type
                 */
                TaskProxy.prototype.getTaskList = function (type) {
                    return this._model.typeTasks[type] || [];
                };
                /**
                 * 获取任务
                 * @param taskId
                 */
                TaskProxy.prototype.getTask = function (taskId) {
                    var task = this._model.task_dic[taskId];
                    return task;
                };
                /**
                 * 获取任务红点
                 * @param type
                 */
                TaskProxy.prototype.getTaskHint = function (type) {
                    return this._model.typeHints[type] || false;
                    ;
                };
                return TaskProxy;
            }(game.ProxyBase));
            task_1.TaskProxy = TaskProxy;
            __reflect(TaskProxy.prototype, "game.mod.task.TaskProxy", ["game.mod.ITaskProxy", "base.IProxy"]);
        })(task = mod.task || (mod.task = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=task.js.map