namespace game.mod.more {

    export class CrossUnionTeamTitle extends BaseRenderer {

        private lab_team: eui.Label;
        private btn_check: Btn;
        public data: number;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_check, this.onClickBtn, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.lab_team.text = `${StringUtil.ChineseNum[this.data]}队`;
        }

        public setData(index: number): void {
            this.data = index;
        }

        private onClickBtn(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.CrossUnionFormat, this.data);
        }
    }
}