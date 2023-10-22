namespace game.mod.god {

    export class GodAvatarView extends eui.Component {
        public img_bg: eui.Image;
        public grp_eff: eui.Group;
        public list: eui.List;
        public list_skill: eui.List;
        public grp_lv: eui.Group;
        public name_item: AvatarNameItem;
        public god_item: AttrGodItem;
        public power: Power2;
        public icon_suit: GodDragonoathSuitItem;
        public lab_name: eui.Label;
        public lab_desc: eui.Label;
        public lab_limit: eui.Label;
        public lab_tips: eui.Label;
        public grp_lab:eui.Group;
        public list_item: eui.List;
        public bar: ProgressBarComp;
        public btn_activate: Btn;
        public cost: CostIcon;
        public btn_up: Btn;
        public img_icon: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.god.GodAvatarSkin";
        }
    }

}