namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import task_data = msg.task_data;
    import GameNT = base.GameNT;
    import TouchEvent = egret.TouchEvent;
    import GuildXianshouConfig = game.config.GuildXianshouConfig;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import GuildXianshouTaskConfig = game.config.GuildXianshouTaskConfig;

    /**仙兽 */
    export class UnionBeastMdr extends EffectMdrBase {
        private _view: UnionBeastView = this.mark("_view", UnionBeastView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list_task.itemRenderer = UnionBeastTaskItem;
            this._view.list_task.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_ring, TouchEvent.TOUCH_TAP, this.onClickRing);

            this.onNt(UnionEvent.ON_UPDATE_BEAST_INFO, this.onUpdateView, this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_xianshou_show();
            super.onShow();
        }

        private onUpdateView(): void {
            let cfg: GuildXianshouConfig = getConfigByNameId(ConfigName.GuildXianshou, this._proxy.beast_stage + 1);
            let total_exp: number = this._proxy.total_exp;
            if (!cfg) {
                this._view.btn_up.updateMaxStar();
            } else {
                this._view.btn_up.updateCost([PropIndex.GuildXianshouExp, cfg.score], false, "", false, total_exp);
                this._view.btn_up.img_cost.visible = false;
                let bool: boolean = total_exp >= cfg.score;
                if (bool) {
                    this._view.btn_up.updateLab(getLanById(LanDef.rank_up));
                }
                this._view.btn_up.setHint(bool);
            }

            this._view.nameItem.updateShow(`${StringUtil.getCNBynumber(this._proxy.beast_stage)}阶`);
            // this.addBmpFont(`${this._proxy.beast_stage||1}j`, BmpTextCfg[BmpTextType.Stage], this._view.grp_lv, false, 1, true);

            let attr = this._proxy.base_attrs;
            this._view.power.setPowerValue(attr && attr.showpower || 0);

            this._view.coinItem.setData(PropIndex.GuildXianshouExp);
            // this._view.coinItem.lab_cost.textFlow = TextUtil.parseHtml(TextUtil.addEnoughColor(this._proxy.total_exp, cfg.score, false));
            let color: number = 0xffffff;
            if (total_exp > cfg.score) {
                color = BlackColor.GREEN;
            }
            this._view.coinItem.lab_cost.textFlow = TextUtil.parseHtml(TextUtil.addColor(`${total_exp}/${cfg.score}`, color));

            this.removeAllEffects();
            let param: ParamConfig = GameConfig.getParamConfigById("guild_xianshou_model");
            this.addAnimate(param.value, this._view.grp_eft);

            let hint: boolean = HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast, HintType.UnionBeastReward]);
            this._view.btn_reward.setHint(hint);

            this._view.btn_rank.setHint(HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast, HintType.UnionRank]));

            this.onUpdateTask();
        }

        private onClickUp(): void {
            let cfg: GuildXianshouConfig = getConfigByNameId(ConfigName.GuildXianshou, this._proxy.beast_stage || 1);
            if (this._proxy.total_exp < cfg.score) {
                ViewMgr.getIns().showGainWaysTips(PropIndex.GuildXianshouExp);
                return;
            }
            if (!this._proxy.beast_oper) {
                PromptBox.getIns().show("宗主和副宗主才有权限升阶");
                return;
            }
            this._proxy.c2s_guild_xianshou_up_level();
        }

        private onClickReward(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionBeastReward);
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.Union, UnionMainType.UnionBeastRank);
        }

        private onClickRing(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionBeastRing);
        }

        private onUpdateTask(): void {
            let tasks: task_data[] = TaskUtil.getTaskList(TaskType.UnionBeast);
            // let cfgArr: GuildXianshouTaskConfig[] = getConfigListByName(ConfigName.GuildXianshouTask);
            // let list: task_data[] = [];
            // for (let task of tasks) {
            //     for (let cfg of cfgArr) {
            //         if (cfg.task_list.indexOf(task.task_id) > -1) {
            //             list[cfg.index] = task;
            //         }
            //     }
            // }
            // this._listData.replaceAll(list.filter(v => {
            //     return !!v;
            // }));
            this._listData.replaceAll(tasks);
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.UnionBeast) > -1) {
                this.onUpdateTask();
            }
        }

        private onUpdateHint(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node.indexOf(HintMgr.getType([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast])) > -1) {
                this.onUpdateView();
            }
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}