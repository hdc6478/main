namespace game.mod.surface {

    export class TianshenEquipView extends eui.Component {

        public grp_eff: eui.Group;
        public power: game.mod.Power2;
        public list_equip: eui.List;
        public icon_suit: TianshenSuitItem;
        public lab_suit_name: eui.Label;
        public lab_suit_desc: eui.Label;
        public list_type: eui.List;

        constructor() {
            super();
            this.skinName = "skins.surface.TianshenEquipSkin";
        }
    }

}