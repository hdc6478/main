namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import GuildYibaoTaskConfig = game.config.GuildYibaoTaskConfig;
    import ParamConfig = game.config.ParamConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class UnionTreasureRewardMdr extends MdrBase implements UpdateItem {
        private _view: UnionTreasureRewardView = this.mark("_view", UnionTreasureRewardView);
        private _proxy: UnionProxy;
        private _endTime: number;
        private _status: boolean = false;

        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionTreasureRewardItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.icon, TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(UnionEvent.ON_UPDATE_TREASURE_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();

            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            this._endTime = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        private onUpdateView(): void {
            let cfgArr: GuildYibaoTaskConfig[] = getConfigListByName(ConfigName.GuildYibaoTask);
            let list: UnionTreasureRewardData[] = [];
            for (let cfg of cfgArr) {
                let task = this._proxy.getTask(cfg.index);
                list.push({ str: cfg.task, value: task && task.step || 0, target: cfg.target_num });
            }
            this._listData.replaceAll(list);

            this._status = this._proxy.getTaskReward();

            let param: ParamConfig = getConfigByNameId(ConfigName.Param, "guild_yibao_task_rewards");
            this._view.icon.setData(param.value[0], this._status ? IconShowType.NotTips : IconShowType.Reward);
            this._view.icon.setHint(this._status);
        }

        private onClick(): void {
            if (!this._status) {
                return;
            }
            this._proxy.c2s_guild_yibao_click(8);
        }

        update(time: base.Time): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._endTime = TimeUtil.getNextWeekTime();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }
    }
}