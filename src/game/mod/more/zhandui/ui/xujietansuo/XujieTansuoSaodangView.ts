namespace game.mod.more {

    export class XujieTansuoSaodangView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public img_icon: eui.Image;
        public lb_name: eui.Label;
        public bar: game.mod.ProgressBarComp;
        public lb_record: eui.Label;
        public list: eui.List;
        public lb_hurt: eui.Label;
        public btnListView: game.mod.BuyBtnListView;
        public btn_saodang: game.mod.Btn;
        public btn_challenge: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoSaodangSkin";
        }
    }
}