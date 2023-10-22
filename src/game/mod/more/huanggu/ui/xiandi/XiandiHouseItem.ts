namespace game.mod.more {

    export class XiandiHouseItem extends BaseRenderer {

        private grp_eft: eui.Group;
        private lab_desc: eui.Label;

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        public setData(index: number, str: string): void {
            this.addAnimate(index, this.grp_eft);
            this.grp_eft.scaleX = this.grp_eft.scaleY = 0.8;
            this.lab_desc.text = str;
        }

        public setGray(bool: boolean): void {
            if (bool) {
                //亮开启
                this.grp_eft.filters = null;
            } else {
                this.grp_eft.filters = [FilterUtil.getGrapFilter()];
            }
        }
    }
}
