namespace game.mod.mail {

    export class MailDescView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public lb_desc: eui.Label;
        public list: eui.List;
        public btn_get: Btn;
        public img_geted:eui.Image;

        constructor() {
            super();
            this.skinName = "skins.mail.MailDescSkin";
        }
    }
}