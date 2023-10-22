namespace game.mod.surface {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import YijieConfig = game.config.YijieConfig;

    export class LingChongTreasureMdr extends MdrBase {
        private _view: LingChongTreasureView = this.mark("_view", LingChongTreasureView);
        private _proxy: LingChongProxy;
        private _listReward: eui.ArrayCollection;
        private _canReceiveCnt = 0;//可领取次数

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Lingchong);
            this._view.img_state.visible = false;
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listReward = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(SurfaceEvent.LING_CHONG_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            if (!this._showArgs) {
                return;
            }
            this.updateView();
        }

        private updateView(): void {
            let index = this._showArgs as number;
            let info = this._proxy.getInfo(index);
            this._view.btn_get.visible = info && info.star > 0;
            this._view.lb_actDesc.visible = !this._view.btn_get.visible;
            let cfg = this._proxy.getConfig(index);
            if (!cfg || !cfg.taskid) {
                return;
            }
            let rewardMap: { [index: number]: number } = {};
            let task_info = this._proxy.getTaskInfo(index);
            this._canReceiveCnt = 0;
            let rewardList: number[][] = [];//奖励

            if (cfg.type_little == 2) {
                //特殊处理类型
                for (let i = cfg.taskid.length - 1; i >= 0; i--) {
                    let id = cfg.taskid[i];
                    let taskCfg = this._proxy.getTaskConfig(id);
                    if (!taskCfg) {
                        continue;
                    }
                    let time = task_info && task_info[id] ? Math.floor(task_info[id].step / taskCfg.target) : 0;
                    this._canReceiveCnt += time;
                    if (taskCfg.eventtype == SceneType.ManyBoss) {
                        let params = taskCfg.params;
                        if (params && params[0] == 2) { //2为转生条件
                            let rein = RoleVo.ins.reincarnate;
                            if (params[1] <= rein) {
                                rewardList = taskCfg.reward.concat();
                                break;
                            }
                        }
                    } else if (taskCfg.eventtype == SceneType.Yijie) {
                        let layer = taskCfg.params[0];
                        let yijieObj: { [index: number]: YijieConfig } = getConfigByNameId(ConfigName.Yijie, layer);
                        if (yijieObj && yijieObj[1]) {
                            let openIdx = yijieObj[1].open;
                            if (ViewMgr.getIns().checkViewOpen(openIdx)) {
                                rewardList = taskCfg.reward.concat();
                                break;
                            }
                        }
                    }
                    //没有满足的，默认第一条
                    if (i == 0 && !rewardList.length) {
                        rewardList = taskCfg.reward.concat();
                    }
                }
            } else {
                for (let id of cfg.taskid) {
                    let taskCfg = this._proxy.getTaskConfig(id);
                    if (!taskCfg) {
                        continue;
                    }
                    let time = task_info && task_info[id] ? Math.floor(task_info[id].step / taskCfg.target) : 0;
                    this._canReceiveCnt += time;
                    if (taskCfg && taskCfg.reward) {
                        for (let reward of taskCfg.reward) {
                            if (!rewardMap[reward[0]]) {
                                rewardMap[reward[0]] = 0;
                            }
                            rewardMap[reward[0]] = rewardMap[reward[0]] + reward[1] * Math.max(time, 1);
                        }
                    }
                }
                for (let key in rewardMap) {
                    rewardList.push([+key, rewardMap[key]]);
                }
            }
            this._listReward.replaceAll(rewardList);
            this._view.lb_desc.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.lingchong_tips8),
                [TextUtil.addColor(this._canReceiveCnt + '', WhiteColor.GREEN)]));
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClick(): void {
            if (this._showArgs && this._canReceiveCnt) {
                this._proxy.c2s_lingchong_get_task_reward(this._showArgs);
            }
        }
    }
}