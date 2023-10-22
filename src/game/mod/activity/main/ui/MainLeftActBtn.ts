namespace game.mod.activity {

    export class MainLeftActBtn extends BaseRenderer {
        public btn_act: game.mod.Btn;
        public redPoint: eui.Image;
        public gr_time: eui.Group;
        public lab_time: eui.Label;
        public group_eff: eui.Group;

        public data: MainLeftActBtnData;

        protected onAddToStage(): void {

        }

        protected onRemoveFromStage(): void {
        }

        protected dataChanged(): void {
            let self = this;
            self.btn_act.icon = self.data.icon;
            self.redPoint.visible = self.data.showHint;
            if (self.data.isShowEff && !this._eftIdx) {
                this.addBtnEft();
            } else if (!self.data.isShowEff && this._eftIdx) {
                this.clearBtnEft();
            }
        }

        private _eftIdx: number;

        private addBtnEft() {
            this.clearBtnEft();
            this._eftIdx = this.addEftByParent("limit_buy_effect", this.group_eff);
        }

        private clearBtnEft() {
            if (this._eftIdx) {
                this.removeEffect(this._eftIdx);
            }
            this._eftIdx = null;
        }
    }
}