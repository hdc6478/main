namespace game.mod.god {

    export class GodDragonoathView extends eui.Component {
        public grp_eff: eui.Group;
        public list: eui.List;
        public grp_lv: eui.Group;
        public name_item: AvatarNameItem;
        public god_item: AttrGodItem;
        public power: Power;
        public icon_suit: GodDragonoathSuitItem;
        public lab_name: eui.Label;
        public lab_desc: eui.Label;
        public lab_limit: eui.Label;
        public list_item: eui.List;
        public bar: ProgressBarComp;
        // public bar2: ProgressBarComp;
        public btn_activate: Btn;
        public cost: CostIcon;
        public btn_up: Btn;
        public img_icon: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.god.GodDragonoathSkin";
        }
    }

}