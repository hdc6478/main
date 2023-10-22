namespace game.mod.more {

    import facade = base.facade;
    import DisplayObjectContainer = egret.DisplayObjectContainer;

    export class HuanjingStageSkillItem extends BaseStageEventItem {
        public skillItem: game.mod.SkillItemRender;
        public img_icon: eui.Image;
        public lb_lv: eui.Label;
        public img_title: eui.Image;
        public gr_font: eui.Group;
        protected _effHub: UIEftHub;

        constructor() {
            super();
            this._effHub = new UIEftHub(this);
            this.skinName = "skins.more.HuanjingStageSkillItemSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this.img_icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
            this.img_icon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        private onClick(): void {
            facade.showView(ModName.More, MoreViewType.HuanjingStageSkillTips, this._systemId);
        }

        protected addBmpFont(text: string, font: string, container: DisplayObjectContainer, horizontal: boolean = true, scale: number = 1, center: boolean = false, gap = 0, expandParent = false): void {
            this._effHub.addBmpFont(text, font, container, horizontal, scale, center, gap, expandParent);
        }

        private _systemId: number;
        private _proxy: HuanjingProxy;

        public updateShow(systemId: number): void {
            if (!this._proxy) {
                this._proxy = getProxy(ModName.More, ProxyType.Huanjing);
            }
            this._systemId = systemId;
            this.img_title.source = `huanjing_list_lb` + systemId;
            //判断第一个添加美术字体
            if (systemId == 1) {
                let strAttr = this._proxy.getAttr(this._systemId);
                this.addBmpFont(strAttr / 10000 + "" + "%", BmpTextCfg[BmpTextType.HuanJingFont], this.gr_font, true, 1, false, 0, true);
            } else {
                this.gr_font.removeChildren();
            }

            let skillId = this._proxy.getStageSkill(systemId);
            this.skillItem.setData(skillId);
            let stage = this._proxy.getStageNum(systemId);
            this.lb_lv.text = stage + '阶';
        }
    }
}