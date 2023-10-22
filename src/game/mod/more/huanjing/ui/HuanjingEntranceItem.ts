namespace game.mod.more {

    import HuanjinParamConfig = game.config.HuanjinParamConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import OpenFunctionConfig = game.config.OpenFunctionConfig;

    export class HuanjingEntranceItem extends BaseRenderer {
        public img_bg: eui.Image;
        public img_name: eui.Image;
        public lb_lv: eui.Label;
        public btn0: game.mod.Btn;
        public skillItem: game.mod.SkillItemRender;
        public img_text: eui.Image;
        public gr_font: eui.Group;
        public redPoint: eui.Image;
        public img_gray: eui.Image;

        data: HuanjinParamConfig;
        private _proxy: HuanjingProxy;
        private _clickBtn = false;

        constructor() {
            super();
            this.skinName = `skins.more.HuanjingEntranceItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Huanjing);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn0, this.onClick, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClickThis, this);
            this.btn0.setHintStyle(5, 5);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this._clickBtn = false;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            this.img_bg.source = ResUtil.getUiPng(`huanjing_img_bg${data.system_id}`);
            this.btn0.icon = `huanjing_btn${data.system_id}`;
            this.img_name.source = `huanjing_img_name${data.system_id}`;
            this.img_text.source = `huanjing_list_lb${data.system_id}`;
            this.lb_lv.text = this._proxy.getSurfaceActedNum(data.system_id) + '';
            this.btn0.setHint(this._proxy.getGrowHint(data.system_id));
            this.redPoint.visible = this._proxy.getCollectHint(data.system_id);
            this.skillItem.visible = data.system_id == 1;
            if (this.skillItem.visible) {
                let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, data.stage_skill);
                this.skillItem.setIcon(skillCfg && skillCfg.icon || '');
                let strAttr = this._proxy.getAttr(data.system_id);
                this.addBmpFont(strAttr / 10000 + "" + "%", BmpTextCfg[BmpTextType.HuanJingFont], this.gr_font);
            }

            if (this._proxy.checkSystemOpen(data.system_id)) {
                this.img_gray.visible = false;
            } else {
                let openCfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, data.open_id);
                this.img_gray.visible = openCfg && openCfg.attendre && openCfg.attendre == 1;
            }
        }

        private onClick(): void {
            this._clickBtn = true;
            this._proxy.canOpenGrow(this.data.system_id, true);
        }

        private onClickThis(): void {
            if (this._clickBtn) {
                this._clickBtn = false;
                return;
            }
            if (!this._proxy.checkSystemOpen(this.data.system_id, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.More, MoreViewType.HuanjingCollectMain, [MdrTabBtnType.TabBtnType01, this.data.system_id]);
        }
    }
}