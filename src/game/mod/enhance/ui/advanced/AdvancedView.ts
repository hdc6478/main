namespace game.mod.enhance {

    export class AdvancedView extends eui.Component {

        public list_equip:eui.List;
        public btn_master:game.mod.Btn;
        public lab_suit_name:eui.Label;
        public lab_attr:eui.Label;
        public lab_pos_name:eui.Label;
        public power:game.mod.Power;
        public img_max: eui.Image;
        public img_attrPreview:eui.Image;
        public gr_max: eui.Group;
        public gr_prop:eui.Group;
        public eqp_cur:StrengthEquipIcon;
        public eqp_next:StrengthEquipIcon;
        public lab_eqp_cur:eui.Label;
        public lab_eqp_next:eui.Label;
        public cost: game.mod.CostIcon;
        public btn_advanced:game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.enhance.AdvancedSkin";
        }
    }

}