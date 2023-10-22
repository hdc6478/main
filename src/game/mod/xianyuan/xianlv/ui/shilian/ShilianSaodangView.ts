namespace game.mod.xianyuan {

    export class ShilianSaodangView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public img_icon: eui.Image;
        public lb_layer: eui.Label;
        public bar: game.mod.ProgressBarComp;
        public lb_record: eui.Label;
        public list: eui.List;
        public lb_hurt: eui.Label;
        public btn_do: game.mod.Btn;
        public btnListView: game.mod.BuyBtnListView;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.ShilianSaodangSkin";
        }
    }
}