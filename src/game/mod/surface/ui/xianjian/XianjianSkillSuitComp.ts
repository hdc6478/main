namespace game.mod.surface {

    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class XianjianSkillSuitComp extends eui.Component {
        public lb_name: eui.Label;
        public lb_desc: eui.Label;
        public img_icon: eui.Image;
        public img_icongray: eui.Image;

        public updateView(index: number): void {
            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, index);
            if (!cfg) {
                this.lb_desc.text = this.lb_name.text = '';
                this.img_icon.source = '';
                return;
            }
            this.img_icon.source = cfg.icon;
            this.lb_name.textFlow = TextUtil.parseHtml(cfg.name);

            this.img_icongray.visible = false;
            this.lb_desc.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.describe, WhiteColor.DEFAULT));
        }
    }
}