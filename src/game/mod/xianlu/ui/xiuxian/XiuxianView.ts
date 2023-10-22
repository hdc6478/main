namespace game.mod.xianlu {

    export class XiuxianView extends eui.Component {
        public group_eft1: eui.Group;
        public group_eft2: eui.Group;
        public lab_name: eui.Label;
        public list_item: eui.List;
        public grp_lv: eui.Group;
        public list_task: eui.List;
        public btn_preview: game.mod.Btn;
        public btn_gift: game.mod.Btn;
        public btn_gift1: game.mod.Btn;
        public btn_gift2: game.mod.BtnIconBase;
        public btn_war: game.mod.Btn;
        public btn_xianpo: game.mod.Btn;
        public btn_break: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianlu.XiuxianSkin";
        }
    }

}