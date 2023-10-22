namespace game.mod.more {
    export class HuanjingGrowBtnItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public lb_lv: eui.Label;
        public redPoint: eui.Image;
        public img_type: eui.Image;

        public data: IHuanjingGrowBtnItemData;

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }

            this.redPoint.visible = !!data.showHint;
            this.lb_lv.text = data.lv + '阶';
            this.img_icon.source = `huanjing_icon` + data.type;
            this.img_type.source = `huanjing_img_type` + data.type;
        }
    }

    export interface IHuanjingGrowBtnItemData {
        systemId: number;
        type: number;   //从左到右
        showHint: boolean;
        lv: number;
    }
}