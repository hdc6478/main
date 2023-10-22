namespace game.mod.more {

    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class XiandiBuffItem extends SkillItemRender {
      
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
    }
}