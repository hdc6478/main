namespace game.mod.mail {


    export class MailView extends eui.Component {
        public btn_get: Btn;
        public btn_del: Btn;
        public scroller:eui.Scroller;
        public list: eui.List;


        constructor() {
            super();
            this.skinName = "skins.mail.MailViewSkin";
        }
    }

}
