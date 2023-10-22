namespace game.mod.yishou {

    import YishouShoulingConfig = game.config.YishouShoulingConfig;
    import facade = base.facade;

    export class YishouShoulingSkillComp extends eui.Component {
        public skillItem: game.mod.SkillItemRender;
        public lb_skillname: eui.Label;
        public lb_skilldesc: eui.Label;

        private _proxy: YishouProxy;
        private _index: number;
        private _specialindex: number;
        private _cfg: YishouShoulingConfig;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShoulingSkillCompSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this._proxy = getProxy(ModName.Yishou, ProxyType.Yishou);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.skillItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

            facade.onNt(SurfaceEvent.SURFACE_SPECIAL_ATTR_UPDATE, this.updateSpecialDesc, this);
        }

        private onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.skillItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

            facade.offNt(SurfaceEvent.SURFACE_SPECIAL_ATTR_UPDATE, this.updateSpecialDesc, this);
        }

        private onClick(): void {
            facade.showView(ModName.Yishou, YiShouViewType.ShoulingSkillTips, this._cfg);
        }

        public updateView(cfg: YishouShoulingConfig): void {
            if (!cfg) {
                return;
            }
            this._cfg = cfg;
            this.skillItem.img_bg.source = `jinengkuang`;
            this.skillItem.img_icon.source = cfg.icon;
            this.skillItem.img_icon.verticalCenter = -5.5;
            this.lb_skillname.text = cfg.skill_name;
            this.skillItem.redPoint.visible = this._proxy.canShoulingAct(cfg.index);

            this._index = cfg.index;
            this._specialindex = cfg.special_attr_id;

            this.updateSpecialDesc();
        }

        //特殊属性更新
        private updateSpecialDesc(): void {
            let descStr = this._proxy.getSpecialAttrDesc(this._index);
            this.lb_skilldesc.textFlow = TextUtil.parseHtml(descStr);
        }
    }
}