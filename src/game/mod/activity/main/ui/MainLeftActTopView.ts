namespace game.mod.activity {

    export class MainLeftActTopView extends eui.Component {

        public group_notice: eui.Group;
        public scr_notice: eui.Scroller;
        public lab_notice: eui.Label;

        public group_top1: eui.Group;
        public btn_hide: game.mod.Btn;
        public btn: MainPunshListBtn;
        public group_big: eui.Group;

        public group_chat: eui.Group;
        public img_chat: eui.Image;
        public list_chat: eui.List;
        public btn_chat: game.mod.Btn;

        constructor() {
            super();
            this.name = "MainLeftActTopView";
            this.skinName = "skins.activity.MainLeftActTopSkin";
        }
    }

}