namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import HuashenConfig = game.config.HuashenConfig;

    export class HuashenStarMdr extends SurfaceStarMdr {

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.item_skill, TouchEvent.TOUCH_TAP, this.onClickItemSkill);
        }

        private onClickItemSkill(): void {
            let data: BattleSkillItemRenderData = this._view.item_skill.data;
            if(!data){
                return;
            }
            ViewMgr.getIns().showSkillNormalTips(data.skillId);
        }

        /**初始化显示不同的ui，子类可重写*/
        protected initView(): void {
            this._view.btn_battle.iconDisplay.source = "chuzhananniu";
            this._view.grp_skill.visible = true;
            this._view.btn_battle.visible = true;
        }

        /**点击幻化或出战，子类可重写*/
        protected onClickBattle(): void {
            //出战界面
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.HuashenBattleMain);
        }

        /**刷新幻化或出战，子类可重写*/
        protected updateBattle(): void {
        }

        /**刷新选中，子类可重写*/
        protected indexUpdateInfo(): void {
            super.indexUpdateInfo();
            this.updateSkill();
        }

        private updateSkill(): void {
            let cfg = this._selCfg as HuashenConfig;
            let skillId = cfg.skill;
            this._view.item_skill.setData(skillId);
        }
    }
}