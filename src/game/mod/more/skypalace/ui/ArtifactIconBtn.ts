namespace game.mod.more {


    export class ArtifactIconBtn extends Btn {
        public img_icon: eui.Image;
        public gr_lv: eui.Group;
        public lb_num: eui.Label;
        public redPoint: eui.Image;

        public setData(index: number, level: number): void {
            this.clearEffect();
            this.img_icon.source = `shenqi_${index}`;
            this.lb_num.text = `${level}`;
        }

        public setUp(eft: string = UIEftSrc.Shenqitupo): void {
            this.img_icon.source = "";
            if (eft) {
                this.setEffect(eft)
            }
        }
    }
}