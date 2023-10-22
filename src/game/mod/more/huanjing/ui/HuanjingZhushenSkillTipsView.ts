namespace game.mod.more {

    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class HuanjingZhushenSkillTipsView extends eui.Component {
        public baseQualityTips: game.mod.BaseQualityTips;
        public skillItem: game.mod.SkillItemRender;
        public lb_name: eui.Label;
        public img_skilltype: eui.Image;
        public baseDescItem0: game.mod.BaseDescItem;
        public baseDescItem1: game.mod.BaseDescItem;
        public icon: game.mod.Icon;
        public btn_do: game.mod.Btn;
        public lb_condition: eui.Label;
        public list_cost: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingZhushenSkillTipsSkin";
        }

        //更新基础视图
        updateBaseView(skillId: number): void {
            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            if (!cfg) {
                return;
            }
            this.baseQualityTips.updateShow(cfg.quality);
            this.img_skilltype.source = ResUtil.getSkillShowType(skillId);
            this.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name || '', ColorUtil.getColorByQuality2(cfg.quality)));
        }
    }
}