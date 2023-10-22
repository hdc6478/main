namespace game.mod.god {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import callLater = egret.callLater;
    import TiandiFengduBaiguiluConfig = game.config.TiandiFengduBaiguiluConfig;
    import facade = base.facade;

    export class GodHauntedFightMdr extends MdrBase implements UpdateItem {
        private _view: GodHauntedFightView = this.mark("_view", GodHauntedFightView);

        private _proxy: GodProxy;

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

            this._proxy = this.retProxy(ProxyType.God);
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
            this.self = this.boss = this.ALL_HP;

            let vo = RoleVo.ins;
            this._view.lab_name1.text = vo.name;
            this._view.powerLabel1.setPowerValue(vo.showpower);
            this._view.head1.updateMyHead();

            let cfg: TiandiFengduBaiguiluConfig = getConfigByNameId(ConfigName.TiandiFengduBaiguilu, this._showArgs);
            this._view.lab_name2.text = cfg.name;
            this._view.powerLabel2.setPowerValue(cfg.limit_power);
            this._view.head2.updateBossHeadShow(cfg.monster_id, 0);

            TimeMgr.addUpdateItem(this, 500);
        }

        private onUpdateRandomHP(): void {
            this.self -= Math.random() * 500;
            this._view.img_hp1.width = this.self / this.ALL_HP * this.HP_WIDTH;

            this.boss -= Math.random() * 500 + 500;
            this._view.img_hp2.width = this.boss / this.ALL_HP * this.HP_WIDTH;
        }

        protected onOver(): void {
            this._proxy.c2s_tiandi_fengdu_baiguilu(this._showArgs);
            // facade.hideView(ModName.God, GodViewType.GodHauntedDetail);
        }

    }
}