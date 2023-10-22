namespace game.mod.more {

    import GuildPkSkillConfig = game.config.GuildPkSkillConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class CrossUnionSkillItem extends BaseRenderer {

        private item: SkillItemRender;
        private attrList: SkillAttrList;
        private lab_name: eui.Label;
        private lab_desc: eui.Label;

        public data: GuildPkSkillConfig;

        protected dataChanged(): void {
            let skill: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this.data.skill_id);
            this.lab_name.text = skill.name;
            this.lab_desc.textFlow = TextUtil.parseHtml(skill.describe);
            this.item.setIcon(skill.icon);

            let strs: string[][] = [["冷却", `${this.data.cd}秒`], ["消耗", `${this.data.cost[0]}`]];
            this.attrList.updateAttr(strs);
        }

    }

}