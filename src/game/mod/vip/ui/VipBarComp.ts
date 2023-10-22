namespace game.mod.vip {

    import TouchEvent = egret.TouchEvent;
    import VipConfig = game.config.VipConfig;

    export class VipBarComp extends eui.Component {
        public bar: game.mod.ProgressBarComp;
        public btn_charge: game.mod.Btn;
        public img_bg: eui.Image;
        public gr_vip: eui.Group;
        public img_desc: eui.Image;
        public gr_vipNum: eui.Group;
        public img_desc1: eui.Image;
        public gr_vipFont: eui.Group;

        private _proxy: VipProxy;
        private _hub: UIEftHub;

        constructor() {
            super();
            this.skinName = "skins.vip.VipBarCompSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this._hub = new UIEftHub(this);
        }

        protected onAddToStage() {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btn_charge.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            this._proxy = getProxy(ModName.Vip, ProxyType.Vip);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btn_charge.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            this._hub.removeAllEffects();
            this._hub.clearAllFont();
        }


        private onClick(): void {
            ViewMgr.getIns().openCommonRechargeView();
        }

        public updateView(cfg: VipConfig): void {
            let model = this._proxy.model;
            //当前vip等级
            this._hub.addBmpFont((VipUtil.getShowVipLv(model.idx)) + '', BmpTextCfg[BmpTextType.Vip1], this.gr_vip, true, 1, true);

            //已达最大vip等级
            if (this._proxy.isMaxVip()) {
                this.bar.show(model.exp, model.exp, false);
                this._hub.clearFont(this.gr_vipNum, true);
                this._hub.clearFont(this.gr_vipFont, true);
                this.img_desc1.visible = false;
                this.img_desc.source = 'ninyidadaozuigaoVIPdengji';
                return;
            }

            if (cfg.index <= model.idx) {
                cfg = this._proxy.getVipCfg(model.idx + 1);
            }

            let disExp = this.getDisExp(cfg.index);
            this.bar.show(model.exp, disExp, false);
            //需要充值多少钱到下一级 钱:经验=1:100
            let need = Math.floor((disExp - model.exp) / 100);
            this._hub.addBmpFont(need + '', BmpTextCfg[BmpTextType.Vip], this.gr_vipNum, true, 1, false, 0, true);
            //下一级
            this._hub.addBmpFont((VipUtil.getShowVipLv(cfg.index)) + '', BmpTextCfg[BmpTextType.Vip], this.gr_vipFont);
            this.img_desc.source = 'zaichongzhi';
            this.img_desc1.visible = true;
        }

        /**两个vip等级exp差距*/
        public getDisExp(targetIdx: number): number {
            let idx = this._proxy.model.idx;
            let exp = 0;
            while (idx < targetIdx) {
                let cfg = this._proxy.getVipCfg(idx);
                exp += (cfg && cfg.levelup_exp || 0);
                idx++;
            }
            return exp;
        }
    }
}