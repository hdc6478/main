namespace game.mod.xianlu {

    export class XiuxianFireRender extends BaseRenderer {
        public group_eft: eui.Group;
        public data: number;//当前重数

        protected dataChanged(): void {
            let isAct = this.data && this.data > this.itemIndex;
            let eftSrc = isAct ? UIEftSrc.Xianlu_3 : UIEftSrc.Xianlu_4;

            this.removeEft();
            this.addEftByParent(eftSrc, this.group_eft);
        }
    }
}