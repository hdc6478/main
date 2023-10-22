namespace game.mod.boss {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import s2c_new_cross_boss_roll_point = msg.s2c_new_cross_boss_roll_point;
    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class CrossBossLuckyRewardMdr extends EffectMdrBase implements UpdateItem{
        private _view: CrossBossLuckyRewardView = this.mark("_view", CrossBossLuckyRewardView);

        private _itemList: ArrayCollection;
        private _proxy: BossProxy;

        private _showPoint: boolean = false;//是否显示点数
        private _time: number;//倒计时
        private readonly TIME_TICK: number = 10;//10秒

        protected _showArgs: s2c_new_cross_boss_roll_point;

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = CrossBossLuckyRewardItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.onClickClose);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);

            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateReward();
            this.updateViewState();
        }

        protected onHide(): void {
            this._showPoint = false;
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickClose(): void {
            if(!this._showPoint){
                this.checkMyFirst();
            }
            this.hide();
        }

        private onClickReward(): void {
            this.changeShowPoint();
        }

        private updateReward(): void {
            let info = this._showArgs;
            let percent = info.percent / 100;
            let percentStr = TextUtil.addColor(percent + "%", WhiteColor.GREEN);
            let tipsStr = StringUtil.substitute(getLanById(LanDef.cross_boss_tips5), [percentStr]);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);

            let rewards = this._proxy.selCrossBossCfg.lucky_reward;
            this._view.icon.setData(rewards[0]);
        }

        private changeShowPoint(): void {
            this._showPoint = true;
            this.updateViewState();
            TimeMgr.removeUpdateItem(this);
        }

        private updateViewState(): void {
            this._view.currentState = this._showPoint ? "2" : "1";
            if(this._showPoint){
                this.updateInfo();
            }
            else {
                this._time = this.TIME_TICK;
                this.updateTime();
                TimeMgr.addUpdateItem(this, 1000);
                this.addEftByParent(UIEftSrc.CrossBoss1, this._view.btn_reward.group_eft);
            }
        }
        /**显示点数*/
        private updateInfo(): void {
            let info = this._showArgs;
            let myPoint = info.my_roll_point;
            this._view.lab_value.text = myPoint + "";
            SortTools.sortMap(info.point_list, "value", ArraySort.LOWER);//排序
            let ranks = info.point_list;
            let firstInfo = ranks[0];
            let firstStr = getLanById(LanDef.cross_boss_tips11) + "：" + firstInfo.name;
            this._view.lab_first.text = firstStr;
            this._itemList.source = ranks;

            let isFirst = firstInfo.role_id.eq(RoleVo.ins.role_id);
            this.checkMyFirst(isFirst);
        }

        private updateTime(): void {
            this._view.lab_time.text = "(" + this._time + getLanById(LanDef.shijian_4) + ")";
        }

        update(time: base.Time): void {
            this._time--;
            if(this._time <= 0){
                this.changeShowPoint();
            }
            this.updateTime();
        }

        private checkMyFirst(isFirst?: boolean): void {
            if(isFirst == undefined){
                let info = this._showArgs;
                let ranks = info.point_list;
                SortTools.sortMap(ranks, "value", ArraySort.LOWER);//排序
                let firstInfo = ranks[0];
                isFirst = firstInfo.role_id.eq(RoleVo.ins.role_id);
            }
            if(isFirst){
                let rewards = this._proxy.selCrossBossCfg.lucky_reward;
                PropTipsMgr.getIns().showBestPropArray(rewards);
            }
        }
    }
}