namespace game.mod.more {

    export class HuashenTaskView extends eui.Component {
        public grp_eff: eui.Group;
        public grp_skill: eui.Group;
        public img_type: eui.Image;
        public img_name: eui.Image;
        public btn_play: game.mod.Btn;
        public btn_open: game.mod.Btn;
        public img_task: eui.Image;
        public scr: eui.Scroller;
        public list_task: eui.List;
        public btn_act: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.HuashenTaskSkin";
        }
    }

}