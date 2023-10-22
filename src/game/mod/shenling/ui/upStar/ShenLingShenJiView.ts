namespace game.mod.shenling {

    export class ShenLingShenJiView extends eui.Component {
        public scroller: eui.Scroller;
        public list: eui.List;
        public list_awaken: eui.List;
        public avatarItem: game.mod.AvatarItem;
        public lb_name: eui.Label;
        public lb_skillName: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenLingShenJiSkin";
        }
    }
}