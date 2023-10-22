namespace game.mod.more {

    import c2s_achievement_get_big_rewards = msg.c2s_achievement_get_big_rewards;
    import s2c_achievement_info = msg.s2c_achievement_info;
    import GameNT = base.GameNT;
    import AchievementConfig = game.config.AchievementConfig;

    export class AchieveProxy extends ProxyBase {
        private _model: AchieveModel;

        initialize(): void {
            super.initialize();
            this._model = new AchieveModel();

            this.onProto(s2c_achievement_info, this.s2c_achievement_info, this);
        }

        public c2s_achievement_get_big_rewards() {
            let msg = new c2s_achievement_get_big_rewards();
            this.sendProto(msg);
        }

        private s2c_achievement_info(n: GameNT) {
            let msg: s2c_achievement_info = n.body;
            if(!msg){
                return;
            }
            if(msg.level != undefined){
                this._model.lv = msg.level;
            }
            if(msg.status != undefined){
                this._model.status = msg.status;
            }
            this.updateHint();
            this.sendNt(MoreEvent.ON_ACHIEVE_INFO_UPDATE);
        }

        public get lv(): number {
            return this._model.lv;
        }

        public get status(): number {
            return this._model.status;
        }

        private updateHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Achieve)){
                return;//功能未开启
            }
            let hint = this.checkHint();
            let hintType = this._model.hintType;
            HintMgr.setHint(hint, hintType);
        }

        private checkHint(): boolean {
            if(TaskUtil.getTaskHint(TaskType.Achieve)){
                return true;
            }
            let hasDraw = this.status == TaskStatus.Draw;
            if(hasDraw){
                return false;
            }
            let curVal = RoleVo.ins.getValueByKey(RolePropertyKey.chengjiu_jifen);//成就积分
            let cfg: AchievementConfig = getConfigByNameId(ConfigName.Achievement, this.lv);
            let maxVal = cfg && cfg.value || 0;
            return curVal >= maxVal;
        }

        protected onTaskHint(n: base.GameNT): void {
            let types: number[] = n.body;
            let type = TaskType.Achieve;
            if(types.indexOf(type) < 0){
                return;
            }
            this.updateHint();
        }

        protected onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.chengjiu_jifen) >= 0) {
                this.updateHint();
            }
        }
    }
}