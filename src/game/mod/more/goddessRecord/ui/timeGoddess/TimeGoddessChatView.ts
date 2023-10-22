namespace game.mod.more {

    export class TimeGoddessChatView extends eui.Component {
        public avatarNameItem: AvatarNameItem;
        public btn_close: Btn;
        public scr: eui.Scroller;
        public list: eui.List;
        public lab_tips: eui.Label;
        public grp_act: eui.Group;
        public lab_go: eui.Label;
        public list_sel: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.TimeGoddessChatSkin";
        }
    }

}