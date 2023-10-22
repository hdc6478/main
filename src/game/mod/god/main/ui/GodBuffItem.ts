namespace game.mod.god {

    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class GodBuffItem extends eui.ItemRenderer {
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public img_lock: eui.Image;
        public redPoint: eui.Image;

        public data: SkillItemRenderData;//技能数据

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            if (this.data.skillId != undefined) {
                let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Buff, this.data.skillId);
                this.img_icon.source = cfg && cfg.icon || "";
            }
            if (this.data.showHint != undefined) {
                this.redPoint.visible = this.data.showHint;
            }
            if (this.data.isAct != undefined) {
                this.img_lock.visible = !this.data.isAct;
                if(this.data.lockStr){
                    this.img_lock.source = this.data.lockStr;
                }
            }
            if (this.data.bgStr != undefined) {
                this.img_bg.source = this.data.bgStr;
            }
        }

        /**单个技能外部调用*/
        public setData(skillId: number): void {
            this.data = {skillId: skillId};
        }
    }
}