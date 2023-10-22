namespace game.mod.shenling {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import SkillLevelConfig = game.config.SkillLevelConfig;

    export class ShenlingEvolveSkillItem extends eui.Component {
        public lb_name: eui.Label;
        public lb_desc: eui.Label;
        public img_icon: eui.Image;
        public img_quality: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingEvolveSkillItemSkin";
        }

        //更新技能
        public updateView(skillId: number, quality: SpecialQualityType, isInit?: boolean): void {
            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            if (!skillCfg) {
                return;
            }
            this.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(skillCfg.name + '', ColorUtil.getColorByQuality1(skillCfg.quality)));
            this.img_icon.source = skillCfg.icon;
            this.img_quality.source = `specialquality${quality}`;

            if (isInit) {
                this.lb_desc.textFlow = TextUtil.parseHtml(skillCfg.describe);
            } else {
                let skillLvCfg: SkillLevelConfig = getConfigByNameId(ConfigName.SkillLv, skillId + quality);
                if (!skillLvCfg) {
                    DEBUG && console.error(ConfigName.SkillLv + '没有: ' + skillId + quality);
                    return;
                }
                this.lb_desc.textFlow = TextUtil.parseHtml(skillLvCfg.describe);
            }
        }
    }
}