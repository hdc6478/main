namespace game.mod.more {

    export class ZhanshendianView extends eui.Component {
        public grp_eff: eui.Group;
        public name_item: AvatarNameItem;
        public img_task: eui.Image;
        public scr: eui.Scroller;
        public list_task: eui.List;
        public btn_act: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.ZhanshendianSkin";
        }
    }

}