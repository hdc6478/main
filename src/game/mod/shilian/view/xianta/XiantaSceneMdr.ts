namespace game.mod.shilian {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class XiantaSceneMdr extends MdrBase{
        private _view: XiantaSceneView = this.mark("_view", XiantaSceneView);
        private _proxy: ShilianProxy;
        private _canDraw: boolean;//是否可领取大奖
        private _lastLv: number = 0;
        private _passLv: number;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Shilian);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.icon, TouchEvent.TOUCH_TAP, this.onClickIcon);

            this.onNt(ShilianEvent.ON_XIANTA_INFO_UPDATE, this.updateShow, this);
            this.onNt(SceneEvent.FUBEN_CONTINUE_BATTLE, this.updateTips, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateShow();
            this.updateTips();
        }

        protected onHide(): void {
            this._lastLv = 0;
            super.onHide();
        }

        private onClickIcon(): void {
            if(this._canDraw){
                this._proxy.c2s_xiantower_get_rewards(this._proxy.selXiantaType);
                return;
            }
            let data = this._view.icon.data;
            ViewMgr.getIns().showPropTips(data[0]);
        }

        private updateShow(): void {
            //大奖
            let selInfo = this._proxy.getXiantaInfo(this._proxy.selXiantaType);
            let passLv = selInfo && selInfo.layer ? selInfo.layer : 0;
            this._passLv = passLv;

            let bigCfg = this._proxy.getXiantaBigRewardCfg(this._proxy.selXiantaType);
            this._view.grp_reward.visible = !!bigCfg;
            this._canDraw = false;
            if(this._view.grp_reward.visible){
                let reward = bigCfg.big_reward[0];
                this._view.icon.setData(reward, IconShowType.NotTips);
                let needLv = bigCfg.lvl;
                this._canDraw = passLv >= needLv;
                this._view.icon.setHint(this._canDraw);
                this._view.bar.show(passLv, needLv, false, 0, false);
                this._view.lab_name.text = StringUtil.substitute(getLanById(LanDef.xianta_tips), [bigCfg.lvl]);
            }
        }

        private updateTips(): void {
            let curLv = this._passLv + 1;
            if(this._lastLv != curLv){
                ViewMgr.getIns().showChallengeTips(curLv);
                this._lastLv = this._passLv;
            }
        }

    }
}