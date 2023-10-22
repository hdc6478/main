namespace game.mod.compete {

    import MagicWinConfig = game.config.MagicWinConfig;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class DoufaWinRewardItem extends BaseRenderer {

        public btn_box: game.mod.Btn;
        public lab_value: eui.Label;
        public redPoint: eui.Image;
        public img_got: eui.Image;

        private _proxy: CompeteProxy;
        public data: MagicWinConfig;
        private _canDraw: boolean;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_box, this.onClick, this);
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            if(this._canDraw){
                this._proxy.c2s_pvp_battle_keep_win_rewards(cfg.index);
                return;
            }
            let tips = StringUtil.substitute(getLanById(LanDef.doufa_tips6), [cfg.count]);
            ViewMgr.getIns().showBoxReward(tips, cfg.reward);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.currentState = (this.itemIndex + 1).toString();
            let cfg = this.data;
            this.lab_value.text = cfg.count + "";
            let status = this._proxy.getWinRewardStatus(cfg.index);
            let canDraw = status == RewardStatus.Finish;
            this._canDraw = canDraw;
            let hasDraw = status == RewardStatus.Draw;
            this.redPoint.visible = canDraw;
            this.img_got.visible = hasDraw;
            this.removeEft();
            if(canDraw){
                this.addEftByParent(UIEftSrc.CommonBox, this.btn_box.group_eft);
            }
        }

    }
}