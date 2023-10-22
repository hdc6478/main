namespace game.mod.daily {

    import AdventureMedalConfig = game.config.AdventureMedalConfig;
    import LanDef = game.localization.LanDef;

    export class LivenessItem extends BaseRenderer {

        public gr_model: eui.Group;
        public gr_lock: eui.Group;
        public lab_lock: eui.Label;
        public redPoint: eui.Image;

        public data: {medalId: number, curLv: number};            // 勋章id、当前等级

        private _effId: number;
        private _effStr: string;

        protected onAddToStage(): void {
            this.touchEnabled = false
        }

        protected onRemoveFromStage(): void {
            if (this._effId) {
                this.removeEffect(this._effId);
            }
            this._effStr = null;
        }

        protected dataChanged(): void {
            if(!this.data) {
                return;
            }
            let medalCfg: AdventureMedalConfig = getConfigByNameId(ConfigName.AdventureMedal, this.data.medalId);
            if (!medalCfg){
                return;
            }
            
            if (this._effStr != medalCfg.model) {
                this._effStr = medalCfg.model;
                this.removeEffect(this._effId);
                this._effId = this.addEftByParent(this._effStr + "_" + RoleVo.ins.sex, this.gr_model, this.width / 2, this.width / 2);
            }
            this.lab_lock.text = StringUtil.substitute(getLanById(LanDef.medal_cond1), [medalCfg.activation_level]);
            let isAct: boolean = this.data.curLv >= medalCfg.activation_level;
            this.gr_lock.visible = !isAct;
            // this.redPoint.visible = HintMgr.getHint(
            //     ModName.Daily, DailyTabHintKey.Medal, DailyMainHintKey.Medal, MedalHint[this.itemIndex + 1]);
        }

    }
}