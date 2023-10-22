namespace game.mod.xianfa {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class XianfaSkillItem extends BaseListenerRenderer {

        public img_quality_bg: eui.Image;
        public img_is_wear: eui.Image;
        public img_buff: eui.Image;
        public img_skill: eui.Image;
        public lab_lv: eui.Label;
        public lab_name: eui.Label;
        public star: game.mod.StarListView;
        public lab_jump: eui.Label;
        public redPoint: eui.Image;

        public data: IXianfaSkillData;

        private _proxy: XianfaProxy;
        private _model: XianfaModel;

        constructor() {
            super();
            this.skinName = "skins.xianfa.XianfaSkillItemSkin";
            this.redPoint.visible = false;

            this._proxy = facade.retMod(ModName.Xianfa).retProxy(ProxyType.Xianfa);
            this._model = this._proxy.getModel();
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this,this.onClick,this);
        }

        public setData(d: IXianfaSkillData): void {
            this.data = d;
        }

        protected dataChanged(): void {
            let isActived = !!this.data.info;
            this.currentState = isActived ? "unlock" : "lock";
            this.img_quality_bg.source = "xf_quality_rect_" + this.data.cfg.skill_quality;
            this.img_buff.source = (this.data.cfg.skill_heading > 0) ? "xf_buff_" + this.data.cfg.skill_heading : null;
            let skillId = this.data.cfg.index;
            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            this.img_skill.source = ResUtil.getBigIcon(skillCfg.icon);
            this.lab_name.text = this._model.getXianfaShortName(this.data.cfg);
            
            if(isActived) {
                this.img_is_wear.visible = this._model.isWear(this.data.cfg.index);
                this.lab_lv.text = this.data.info.lv + "";
                this.star.updateStar(this.data.star, 5);
            } else {
                this.lab_lv.text = "0";
                this.lab_jump.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(this.data.cfg.skip_txt, BlackColor.YELLOW, ""));
            }
            let hint = this._proxy.updateListItemHint(this.data.cfg.index);
            this.redPoint.visible = hint;
            this.cacheAsBitmap = true;
        }

        public get isActive(): boolean {
            return !!this.data.info;
        }

        private onClick(e: TouchEvent) {
            if(e.target == this.lab_jump) {             // 功能跳转
                ViewMgr.getIns().showViewByID(this.data.cfg.skip_ui);
            } else {                                    // 打开仙法技能
                ViewMgr.getIns().showSecondPop(ModName.Xianfa, XianfaViewType.XianfaSkillTip, this.data.cfg.index);
            }
        }

    }
}