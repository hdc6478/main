namespace game.mod.boss {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import ArrayCollection = eui.ArrayCollection;
    import s2c_zhuimo_boss_roll_point = msg.s2c_zhuimo_boss_roll_point;
    import ZhuimoBossConfig = game.config.ZhuimoBossConfig;

    export class AbyssLuckyMdr extends MdrBase implements UpdateItem {
        private _view: AbyssLuckyView = this.mark("_view", AbyssLuckyView);
        private _proxy: BossProxy;
        private _showPoint: boolean = false;//是否显示点数
        private _time: number;//倒计时
        private readonly TIME_TICK: number = 10;//10秒
        private _itemList: ArrayCollection;
        public _showArgs: s2c_zhuimo_boss_roll_point;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = AbyssLuckyItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
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

        private onClickReward(): void {
            this.changeShowPoint();
        }

        private changeShowPoint(): void {
            this._showPoint = true;
            this.updateViewState();
            TimeMgr.removeUpdateItem(this);
        }

        private updateReward(): void {
            let info = this._showArgs;
            let index = info.index;
            let cfg: ZhuimoBossConfig = getConfigByNameId(ConfigName.ZhuimoBoss, index);
            let rewardIndex = cfg.rare_reward_show;
            this._view.icon.setData(rewardIndex);
            this._view.lab_name.textFlow = this._view.icon.getPropName();
        }

        private updateViewState(): void {
            this._view.currentState = this._showPoint ? "2" : "1";
            if (this._showPoint) {
                this.updateInfo();
            } else {
                this._view.lab_point.text = getLanById(LanDef.yijie_tips6) + "：" + getLanById(LanDef.yijie_tips7);
                this._time = this.TIME_TICK;
                this.updateTime();
                TimeMgr.addUpdateItem(this, 1000);
            }
        }

        /**显示点数*/
        private updateInfo(): void {
            let info = this._showArgs;
            let myPoint = info.my_roll_point;
            let pointStr = getLanById(LanDef.yijie_tips6) + "：" + TextUtil.addColor(myPoint + "", WhiteColor.GREEN) + getLanById(LanDef.yijie_tips9);
            this._view.lab_point.textFlow = TextUtil.parseHtml(pointStr);

            SortTools.sortMap(info.point_list, "value", ArraySort.LOWER);//排序
            let ranks = info.point_list;
            let firstInfo = ranks[0];
            let firstStr = getLanById(LanDef.yijie_tips8) + "：" + TextUtil.addColor(firstInfo.value + "", WhiteColor.GREEN) + getLanById(LanDef.yijie_tips9);
            this._view.lab_first.textFlow = TextUtil.parseHtml(firstStr);

            this._itemList.source = ranks;
        }

        private updateTime(): void {
            let tipsStr = getLanById(LanDef.yijie_tips10) + "\n" + TextUtil.addColor(this._time + getLanById(LanDef.yijie_tips11), WhiteColor.GREEN);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);
        }

        update(time: base.Time): void {
            this._time--;
            if (this._time <= 0) {
                this.changeShowPoint();
            }
            this.updateTime();
        }
    }
}