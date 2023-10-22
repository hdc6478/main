namespace game.mod.store {

    import VipConfig = game.config.VipConfig;
    import facade = base.facade;

    export class StoreBarView extends eui.Component {
        public bar: game.mod.ProgressBarComp;
        public btn_charge: game.mod.Btn;
        public img_bg: eui.Image;
        public gr_vip: eui.Group;
        public img_desc: eui.Image;
        public gr_vipNum: eui.Group;
        public img_desc0: eui.Image;
        public gr_vipFont: eui.Group;

        private _proxy: IVipProxy;
        private _hub: UIEftHub;

        constructor() {
            super();
            this.skinName = "skins.store.StoreBarSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this._hub = new UIEftHub(this);
        }

        protected onAddToStage() {
            this._proxy = getProxy(ModName.Vip, ProxyType.Vip);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btn_charge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            facade.onNt(VipEvent.UPDATE_VIP_INFO, this.updateView, this);
            this.updateView();
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btn_charge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            facade.offNt(VipEvent.UPDATE_VIP_INFO, this.updateView, this);
        }

        private onClick(): void {
            ViewMgr.getIns().openVipView();
        }

        private updateView(): void {
            let idx = this._proxy.getIdx();
            let exp = this._proxy.getExp();

            let vipLv = VipUtil.getShowVipLv(idx);
            this._hub.addBmpFont(vipLv + '', BmpTextCfg[BmpTextType.Vip1], this.gr_vip, true, 1, true);

            //满级vip
            if (this._proxy.isMaxVip()) {
                this.bar.show(exp, exp, false);
                this._hub.clearFont(this.gr_vipNum, true);
                this._hub.clearFont(this.gr_vipFont, true);
                this.img_desc.source = 'ninyidadaozuigaoVIPdengji';
                this.img_desc0.visible = false;
                return;
            }

            let cfg: VipConfig = getConfigByNameId(ConfigName.Vip, idx);
            this.bar.show(exp, cfg.levelup_exp, false);
            let left = Math.floor((cfg.levelup_exp - exp) / 100); //钱:经验=1:100
            //需要充值多少钱到下一级
            this._hub.addBmpFont(left + '', BmpTextCfg[BmpTextType.Vip], this.gr_vipNum, true, 1, false, 0, true);
            //下一级
            this._hub.addBmpFont((vipLv + 1) + '', BmpTextCfg[BmpTextType.Vip], this.gr_vipFont);
            this.img_desc.source = 'zaichongzhi';
            this.img_desc0.visible = true;
        }
    }
}