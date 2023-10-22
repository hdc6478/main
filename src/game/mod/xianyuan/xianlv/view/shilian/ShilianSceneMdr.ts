namespace game.mod.xianyuan {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import XianlvShilianSceneConfig = game.config.XianlvShilianSceneConfig;
    import GameNT = base.GameNT;

    export class ShilianSceneMdr extends MdrBase implements UpdateItem {
        private _view: ShilianSceneView = this.mark("_view", ShilianSceneView);
        private _proxy: XianlvShilianProxy;
        private _endTime = 0;
        private _cfg: XianlvShilianSceneConfig;

        public constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianlvShilian);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(XianyuanEvent.ON_UPDATE_SHILIAN_DAMAGE, this.onUpdateDamage, this);
        }

        protected onShow(): void {
            super.onShow();
            this._cfg = this._proxy.getSceneConfig(this._proxy.curType);
            if (!this._cfg) {
                return;
            }
            this._endTime = TimeMgr.time.serverTimeSecond + this._cfg.challenge_time;
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._view.lb_damage0.text = '0';
        }

        private onUpdateDamage(n: GameNT): void {
            let num: number = n.body || 0;
            this._view.lb_damage0.text = StringUtil.getPowerNumStr(num);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.lb_time.text = TimeUtil.formatSecond(leftTime, 'HH:mm:ss');
        }
    }
}