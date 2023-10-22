namespace game.mod.jiban {

    import EquipmentConfig = game.config.EquipmentConfig;
    import JumpConfig = game.config.JumpConfig;
    import Handler = base.Handler;

    export class RoleGatherIconItem extends BaseListenerRenderer {
        public icon: game.mod.Icon;
        public img_gray: eui.Image;
        public lb_cond: eui.Label;

        data: IRoleGatherIconItemData;
        private _gainId: number;

        constructor() {
            super();
            this.skinName = `skins.jiban.RoleGatherIconItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.lb_cond, this.onClickGo, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_gray, this.onClickGo, this);
            this.icon.setClickHandler(Handler.alloc(this, this.onClickIcon));
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfg: EquipmentConfig = getConfigByNameId(ConfigName.Equip, data.index);
            this.icon.data = PropData.create(data.index);
            this.img_gray.visible = !data.isActed;
            this.lb_cond.visible = !data.isActed;

            let gain_id = cfg.gain_id && cfg.gain_id[0] || 0;
            if (gain_id) {
                this._gainId = gain_id;
                let jumpCfg: JumpConfig = getConfigByNameId(ConfigName.Jump, gain_id);
                this.lb_cond.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(jumpCfg && jumpCfg.name || '',BlackColor.YELLOW));
            }
        }

        private onClickGo(): void {
            let type = this.data.type;
            let bossProxy: IBossProxy = getProxy(ModName.Boss, ProxyType.Boss);
            if (!bossProxy.isBossOpen(type, true)) {
                return;
            }
            if (this._gainId) {
                ViewMgr.getIns().showViewByID(this._gainId, type);
            }
        }

        private onClickIcon(): void {
            ViewMgr.getIns().showPropTips(this.data.index);
        }
    }

    export interface IRoleGatherIconItemData {
        type: number;//0表示50级，非0表示转数
        index: number;
        isActed: boolean;
    }
}