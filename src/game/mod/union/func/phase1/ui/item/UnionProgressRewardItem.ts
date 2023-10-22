namespace game.mod {

    import ShengtanScoreConfig = game.config.ShengtanScoreConfig;
    import UnionProxy = game.mod.union.UnionProxy;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class UnionProgressRewardItem extends BaseRenderer {

        public btn_box: Btn;
        public lab_value: eui.Label;
        public redPoint: eui.Image;
        public img_got: eui.Image;

        private _proxy: UnionProxy;
        public data: ShengtanScoreConfig;

        constructor() {
            super();
            this.skinName = "skins.common.ComProgressRewardItemSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();

            this._proxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);

            this.btn_box.addEventListener(TouchEvent.TOUCH_TAP, this.onClickBtn, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            // this.currentState = `${this.itemIndex + 1}`;
            this.btn_box.icon = "box_close";
            let cfg: ShengtanScoreConfig = this.data;
            this.lab_value.text = `${cfg.score}`;

            let info = this._proxy.getShengStatus(cfg.index);
            if (!info) {
                this.img_got.visible = false;
            } else {
                let count: number = this._proxy.getShengCount();
                this.redPoint.visible = count >= cfg.score && info.state != 2 || info.state == 1;

                this.img_got.visible = info.state == 2;
                if (info.state == 2) {
                    this.btn_box.icon = "box_open";
                }
            }
        }

        private onClickBtn(): void {
            let info = this._proxy.getShengStatus(this.data.index);
            if (!info) {
                let str: string = TextUtil.addColor(`(${this._proxy.getShengCount()}/${this.data.score})`, Color.RED);
                let tips = StringUtil.substitute(getLanById(LanDef.union_tips_2), [this.data.score, str]);
                ViewMgr.getIns().showBoxReward(tips, this.data.reward);
                return;
            }
            if (info && info.state == 2) {
                return;
            }
            this._proxy.c2s_guild_shengtan_score_reward(this.data.index);

        }
    }
}