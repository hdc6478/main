namespace game.mod.surface {

    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class XianjianSkillItem extends eui.ItemRenderer {
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public img_lock: eui.Image;
        public img_tag: eui.Image;
        public redPoint: eui.Image;
        public grp_lv: eui.Group;
        public lab_lv: eui.Label;

        public data: XianjianSkillData;//技能数据

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
            if (this.data.imgTag != undefined) {
                this.img_tag.visible = true;
                this.img_tag.source = this.data.imgTag;
            }
            this.img_lock.visible = !this.data.lv;
            this.grp_lv.visible = !!this.data.lv || !this.data.hideTips;//显示等级
            this.lab_lv.text = this.data.lv ? `${this.data.lv}阶` : `${this.data.limit}级解锁`;
        }

        /**单个技能外部调用*/
        public setData(skillId: number, limit: number, lv?: number): void {
            this.data = {skillId, lv, limit};
        }
    }

    export interface XianjianSkillData extends BattleSkillItemRenderData {
        limit?: number;
        /**飞剑index */
        index?: number;
    }
}