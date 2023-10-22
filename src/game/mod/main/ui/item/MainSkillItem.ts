namespace game.mod.main {


    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class MainSkillItem extends BaseRenderer implements UpdateItem {

        private img_bg: eui.Image;
        private img_icon: eui.Image;
        private scr: eui.Group;
        private img_mark: eui.Image;
        private lab_time: eui.Label;
        private img_lock: eui.Image;

        private readonly _markHeight: number = 84;

        //data �Ǽ���id
        public data: number;

        protected onRemoveFromStage() {
            TimeMgr.removeUpdateItem(this);
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let skillId: number = this.data;
            if (!skillId) {
                this.img_lock.visible = true;
                this.lab_time.visible = false;
                this.scr.visible = true;
                this.scr.height = this._markHeight;
                this.img_icon.source = "";
                TimeMgr.removeUpdateItem(this);
                return;
            }
            TimeMgr.addUpdateItem(this, 1000);
            this.img_lock.visible = false;

            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this.data);
            if (cfg) {
                this.img_icon.source = cfg.icon || "common_skill";
                // this.img_icon.source = "common_skill";
            }
            this.onUpdateCd();
        }

        public update(time: base.Time): void {
            this.onUpdateCd();
        }

        private onUpdateCd(): void {
            let skillData = SkillData.getSkillInfo(this.data);
            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this.data);
            let ms: number = SkillData.getLeftCd(skillData);
            this.scr.height = ms / cfg.cd * this._markHeight;
            let remainCd = Math.ceil(ms / 1000);
            if (remainCd <= 0) {
                this.lab_time.text = "";
                // console.log("skillData.skill_idx = "+skillData.skill_idx);
                // console.log("skillData.use_time = "+skillData.use_time);
                // console.log("skillData.next_use_time = "+skillData.next_use_time);
            } else {
                this.lab_time.text = remainCd + "";
            }
        }
    }
}