namespace game.mod {

    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class SkillItemRender extends eui.ItemRenderer {
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public img_lock: eui.Image;
        public redPoint: eui.Image;
        public grp_level: eui.Group;
        public lab_level: eui.Label;

        public data: SkillItemRenderData;//技能数据

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.grp_level.visible = false;
            if (this.data.skillId != undefined) {
                let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this.data.skillId);
                this.img_icon.source = cfg && cfg.icon || "";
                // this.img_icon.source = cfg.icon;
            }
            if (this.data.showHint != undefined) {
                this.redPoint.visible = this.data.showHint;
            }
            if (this.data.isAct != undefined) {
                this.img_lock.visible = !this.data.isAct;
                if (this.data.lockStr) {
                    this.img_lock.source = this.data.lockStr;
                }
                if (!this.data.isAct && this.data.limitStr) {
                    this.grp_level.visible = true;
                    this.lab_level.text = this.data.limitStr;
                }
            }
            if (this.data.bgStr != undefined) {
                this.img_bg.source = this.data.bgStr;
            }
            if (this.data.level) {
                this.grp_level.visible = true;
                this.lab_level.text = `${this.data.level}阶`;
            }
        }

        /**单个技能外部调用*/
        public setData(skillId: number): void {
            this.data = {skillId: skillId};
        }

        public setIcon(icon: string): void {
            this.img_icon.source = icon;
        }
    }
}