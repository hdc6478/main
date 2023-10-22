namespace game.mod.activity {

    export class MainLeftActMidView extends eui.Component {
        public group_top1: eui.Group;
        public group_tips: eui.Group;
        public btn_hide: game.mod.Btn;
        public icon_tips: eui.Image;

        constructor() {
            super();
            this.name = "MainLeftActMidView";
            this.skinName = "skins.activity.MainLeftActMidSkin";
        }
    }
}