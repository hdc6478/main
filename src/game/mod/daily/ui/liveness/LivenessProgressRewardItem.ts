namespace game.mod.daily {

    import TouchEvent = egret.TouchEvent;
    import ActiveAwardConfig = game.config.ActiveAwardConfig;

    export class LivenessProgressRewardItem extends BaseRenderer {

        public btn_box: Btn;
        public lab_value: eui.Label;
        public redPoint: eui.Image;
        public img_got: eui.Image;

        public data: ActiveAwardConfig;
        private _proxy: DailyProxy;
        private is_got: boolean = false;
        private is_lingqu:boolean = false;

        constructor() {
            super();
            this.skinName = "skins.common.ComProgressRewardItemSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Daily, ProxyType.Daily);
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onClickBtn, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.currentState = `${this.itemIndex + 1}`;
            // this.btn_box.icon = "box_close";
            let cfg: ActiveAwardConfig = this.data;
            this.lab_value.text = `${cfg.activation}`;


            this.is_got=  this._proxy.checkActRewardIsGot(cfg.index);
            let exp:number =  this._proxy.getModel().curExp;
            this.is_lingqu = !this.is_got &&  exp >= cfg.activation;

            this.img_got.visible =  this.is_got;
            this.redPoint.visible =  this.is_lingqu;
        }

        private onClickBtn(): void {
            let cfg = this.data;
            if (!cfg ||  this.is_got) {
                return;
            }
            if (this.is_lingqu) {
                this._proxy.c2s_medal_daily_reward(cfg.index);
            } else {
                let tips = `活跃度达到${cfg.activation}可领取奖励`;
                ViewMgr.getIns().showBoxReward(tips, cfg.award);
            }
            // let info = this._proxy.getShengStatus(this.data.index);
            // if (!info) {
            //     let str: string = TextUtil.addColor(`(${this._proxy.getShengCount()}/${this.data.score})`, Color.RED);
            //     let tips = StringUtil.substitute(getLanById(LanDef.union_tips_2), [this.data.score, str]);
            //     ViewMgr.getIns().showBoxReward(tips, this.data.reward);
            //     return;
            // }
            // if (info && info.state == 2) {
            //     return;
            // }
            // this._proxy.c2s_guild_shengtan_score_reward(this.data.index);

        }
    }
}