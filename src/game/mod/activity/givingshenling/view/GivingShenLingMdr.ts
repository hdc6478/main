namespace game.mod.activity {


    import UpdateItem = base.UpdateItem;
    import ParamConfig = game.config.ParamConfig;
    import TouchEvent = egret.TouchEvent;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;
    import Handler = base.Handler;

    export class GivingShenLingMdr extends EffectMdrBase implements UpdateItem {
        private _view: GivingShenLingView = this.mark("_view", GivingShenLingView);
        private _proxy: GivingShenLingProxy;

        private _endTime: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.GivingShenLing);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick, this);

            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
            this.onNt(ActivityEvent.ON_UPDATE_GIVING_SHENLING_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            GuideMgr.getIns().recordSpecialGuideMap(GuideKey.GivingShenLing);

            this._endTime = this._proxy.getEndTime();

            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "give_yaoji");
            this.addAnimate(cfg.value, this._view.gr_eff);

            this.onUpdateView();

            TimeMgr.addUpdateItem(this, 1000);
            this.onUpdateTime();

        }

        private onUpdateView(): void {
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "give_shenling");
            this._view.icon.setData(cfg.value);

            this._view.img_got.visible = this._proxy.model.receive == 2;
            this._view.btn.visible = !this._view.img_got.visible;
            let bool: boolean = HintMgr.getHint([ModName.Activity, MainActivityViewType.GivingShenLing]);
            this._view.btn.redPoint.visible = bool;
        }

        private onUpdateHint(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType([ModName.Activity, MainActivityViewType.GivingShenLing])) {
                this._view.btn.redPoint.visible = data.value;
            }
        }

        public update(time: base.Time): void {
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime < 0) {
                TimeMgr.removeUpdateItem(this);
            }
            let timeStr = leftTime < 0 ? getLanById(LanDef.battle_cue45) : TimeUtil.formatSecond(leftTime, "d天H时", true);
            this._view.lab_time.text = timeStr + "\n\n后可领取";

            //判断显示
            if (leftTime > 0) {
                this._view.gr_time.visible = true;
                this._view.btn.visible = false;
                GuideMgr.getIns().recordSpecialGuideMap(GuideKey.GivingShenLingRewardBtn);
            } else {
                this._view.btn.visible = true;
                this._view.gr_time.visible = false;
                GuideMgr.getIns().show(GuideKey.GivingShenLingRewardBtn, this._view.btn, Handler.alloc(this, this.onGivingShenLingRewardBtn));//任务指引
            }

        }

        private onGivingShenLingRewardBtn():void{
            GuideMgr.getIns().recordSpecialGuideMap(GuideKey.GivingShenLingRewardBtn);
            GuideMgr.getIns().clear(GuideKey.GivingShenLingRewardBtn);//清除任务指引
            this.onClick();
        }


        private onClick(): void {
            if (this._endTime - TimeMgr.time.serverTimeSecond > 0) {
                PromptBox.getIns().showLanTips(LanDef.reward_tips);
                return;
            }
            this._proxy.c2s_yaoji_get_reward()
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }
    }
}