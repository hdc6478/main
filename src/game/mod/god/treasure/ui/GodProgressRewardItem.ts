namespace game.mod.god {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import TiandiYuhuangQiandaoConfig = game.config.TiandiYuhuangQiandaoConfig;

    export class GodProgressRewardItem extends BaseRenderer {

        public icon: Icon;
        public barCnt: ProgressBarCntComp;
        public redPoint: eui.Image;
        public img_got: eui.Image;

        private _proxy: GodProxy;
        public data: TiandiYuhuangQiandaoConfig;

        constructor() {
            super();
            // this.skinName = "skins.common.ComProgressRewardItem2Skin";
        }

        protected onAddToStage() {
            super.onAddToStage();

            this._proxy = facade.retMod(ModName.God).retProxy(ProxyType.God);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.icon, this.onClickBtn, this);
        }


        protected dataChanged(): void {
            if (!this.data) {
                return;
            }

            let cfg: TiandiYuhuangQiandaoConfig = this.data;

            let info = this._proxy.getVipSignStatus(cfg.index);
            let count: number = this._proxy.signDay;
            if (!info) {
                this.img_got.visible = false;
            } else {
                let bool: boolean = count >= cfg.index && info.status != 2 || info.status == 1;
                this.redPoint.visible = bool;

                this.img_got.visible = info.status == 2;
            }
            this.barCnt.updateShow(cfg.index, count >= cfg.index);
            this.icon.setData(cfg.other_rewards[0], info && info.status == 1 ? IconShowType.NotTips : IconShowType.Reward);
        }

        private onClickBtn(): void {
            let info = this._proxy.getVipSignStatus(this.data.index);
            if (info && info.status == 2) {
                return;
            }
            this._proxy.c2s_tiandi_yuhuang_qiandao(this.data.index);

        }
    }
}