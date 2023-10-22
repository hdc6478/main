namespace game.mod.pass {

    import UpdateItem = base.UpdateItem;
    import Monster1Config = game.config.Monster1Config;
    import QiyuanConfig = game.config.QiyuanConfig;
    import TimeMgr = base.TimeMgr;
    import QiyuanFubenConfig = game.config.QiyuanFubenConfig;
    import callLater = egret.callLater;
    import facade = base.facade;

    export class QiyuanFightMdr extends MdrBase implements UpdateItem {
        private _view: QiyuanFightView = this.mark("_view", QiyuanFightView);

        private _proxy: PassProxy;

        private readonly HP_WIDTH: number = 350;//血条宽度
        private readonly ALL_HP: number = 10000;
        private self: number = 10000;
        private boss: number = 10000;

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Pass);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateInfo();
        }

        update(time: base.Time): void {
            if (this.boss <= 0) {
                TimeMgr.removeUpdateItem(this);
                this.onOver();
                callLater(this.hide, this);
                return;
            }
            this.onUpdateRandomHP();
        }

        private onUpdateInfo(): void {
            let vo = RoleVo.ins;
            this._view.lab_name1.text = vo.name;
            this._view.powerLabel1.setPowerValue(vo.showpower);
            this._view.head1.updateMyHead();

            let cfg: QiyuanConfig = getConfigByNameId(ConfigName.Qiyuan, this._showArgs);
            let fuben: QiyuanFubenConfig = getConfigByNameId(ConfigName.QiyuanFuben, cfg.param1[0]);
            this._view.lab_name2.text = fuben.name;
            this._view.powerLabel2.setPowerValue(fuben.power);
            this._view.head2.updateBossHeadShow(fuben.monster, 0);

            TimeMgr.addUpdateItem(this, 500);
        }

        private onUpdateRandomHP(): void {
            this.self -= Math.random() * 500;
            this._view.img_hp1.width = this.self / this.ALL_HP * this.HP_WIDTH;

            this.boss -= Math.random() * 500 + 500;
            this._view.img_hp2.width = this.boss / this.ALL_HP * this.HP_WIDTH;
        }

        protected onOver(): void {
            let proxy: PassProxy = getProxy(ModName.Pass, ProxyType.Pass);
            let cfg: QiyuanConfig = getConfigByNameId(ConfigName.Qiyuan, this._showArgs);
            proxy.c2s_qiyuan_enter(cfg.index);
            facade.hideView(ModName.Pass, PassViewType.QiyuanDetail1);
        }

    }
}