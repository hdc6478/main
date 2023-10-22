namespace game.mod.god {

    export class GodCommonView extends eui.Component {
        public grp_eff: eui.Group;
        public power: Power2;
        public list_item: eui.List;
        public btn_up: Btn;
        public btn_onekey: Btn;
        public btn_right: Btn;
        public btn_gift: Btn;
        public img_max: eui.Image;
        public name_item: AvatarNameItem;
        public cost: CostIcon;
        public bar:ProgressBarComp;
        public god_item:AttrGodItem;
        public grp_desc:eui.Group;
        public lab_desc:eui.Label;
        public img_text:eui.Image;

        constructor() {
            super();
            this.skinName = "skins.god.GodCommonSkin";
        }
    }

}