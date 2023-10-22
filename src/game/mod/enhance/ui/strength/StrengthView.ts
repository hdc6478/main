namespace game.mod.enhance {

    export class StrengthView extends eui.Component {

        public equip_list: game.mod.EquipListView;
        public btn_master: game.mod.Btn;
        public lab_rate: eui.Label;
        public power: game.mod.Power;
        public img_max: eui.Image;
        public img_attrPreview: eui.Image;
        public lab_attr1: eui.Label;
        public lab_attr2: eui.Label;
        public lab_tip: eui.Label;
        public gr_prop: eui.Group;
        public cost: game.mod.CostIcon;
        public btn_strength: game.mod.Btn;
        public btn_one_key: game.mod.Btn;
        public group_eft: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.enhance.StrengthSkin";
        }
    }

}