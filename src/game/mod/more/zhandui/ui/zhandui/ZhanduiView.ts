namespace game.mod.more {

    export class ZhanduiView extends eui.Component {
        public btn_rule: game.mod.Btn;
        public btn_jixing: game.mod.Btn;
        public lb_name: eui.Label;
        public btn_rename: game.mod.Btn;
        public btn_apply: game.mod.Btn;
        public btn_channel: game.mod.Btn;
        public lb_lv: eui.Label;
        public teammateItem0: game.mod.more.ZhanduiTeammateItem;
        public teammateItem1: game.mod.more.ZhanduiTeammateItem;
        public teammateItem2: game.mod.more.ZhanduiTeammateItem;
        public teammateItem3: game.mod.more.ZhanduiTeammateItem;
        public img_flag: eui.Image;
        public redPoint: eui.Image;
        public btn_jitan: game.mod.more.ZhanduiItem;
        public lb_text: eui.Label;
        public btn_tansuo: game.mod.more.ZhanduiItem;
        public btn_kuangmai: game.mod.more.ZhanduiItem;

        public group_eft1:eui.Group;
        public group_eft2:eui.Group;
        public group_eft3:eui.Group;
        public group_eft4:eui.Group;
        public group_eft5:eui.Group;

        constructor() {
            super();
            this.skinName = "skins.more.ZhanduiSkin";
        }
    }
}