namespace game.mod.more {

    import GuildPkSkillConfig = game.config.GuildPkSkillConfig;
    import TouchEvent = egret.TouchEvent;

    export class CrossUnionSkillTipsMdr extends EffectMdrBase {
        private _view: CrossUnionSkillTipsView = this.mark("_view", CrossUnionSkillTipsView);
        // private _proxy: CrossUnionProxy;

        private _listData: eui.ArrayCollection = new eui.ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.list.itemRenderer = CrossUnionSkillItem;
            this._view.list.dataProvider = this._listData;

            this._view.horizontalCenter = this._view.verticalCenter = 0;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.clsoeTips, TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let cfgArr: GuildPkSkillConfig[] = getConfigListByName(ConfigName.GuildPkSkill);
            this._listData.replaceAll(cfgArr);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}