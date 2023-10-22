namespace game.mod {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import LanDef = game.localization.LanDef;

    export class BattleSkillItemRender extends eui.ItemRenderer {
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public img_lock: eui.Image;
        public img_tag: eui.Image;
        public redPoint: eui.Image;
        public grp_lv: eui.Group;
        public lab_lv: eui.Label;

        public data: BattleSkillItemRenderData;//技能数据

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            if(this.data.skillId){
                let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this.data.skillId);
                this.img_icon.source = cfg.icon;
            }
            if(this.data.showHint != undefined){
                this.redPoint.visible = this.data.showHint;
            }
            if(this.data.lv != undefined && this.data.showLv != false){
                this.img_lock.visible = !this.data.lv;
                this.grp_lv.visible = !!this.data.lv || !this.data.hideTips;//显示等级
                this.lab_lv.text = this.data.lv ? this.data.lv + getLanById(LanDef.tishi_43) : 1 + getLanById(LanDef.tishi_43) + getLanById(LanDef.boss_cue5);
            }
            if(this.data.imgTag != undefined){
                this.img_tag.visible = true;
                this.img_tag.source = this.data.imgTag;
            }
        }
        /**单个技能外部调用*/
        public setData(skillId: number, lv?: number, showLv?: boolean, showZero?: boolean): void {
            this.data = {skillId: skillId, lv: lv, showLv: showLv, showZero: showZero};
        }
    }
}