namespace game.mod {

    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class XianjianBattleSkillItem extends eui.ItemRenderer {
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public img_lock: eui.Image;
        public redPoint: eui.Image;
        public grp: eui.Group;
        public img_buff: eui.Image;


        public data: BattleSkillItemRenderData;//技能数据

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            if (this.data.skillId) {
                let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this.data.skillId);
                this.img_icon.source = cfg.icon;
            }
            if (this.data.showHint != undefined) {
                this.redPoint.visible = this.data.showHint;
            }
            this.grp.visible = this.data.skillType && this.data.skillType.length > 0;
            this.img_buff.source = this.data.skillType;
        }

        /**单个技能外部调用*/
        public setData(skillId: number, skillType: string): void {
            this.data = {skillId, skillType};
        }

        public setBg(img: string): void {
            this.img_bg.source = img;
        }
    }
}