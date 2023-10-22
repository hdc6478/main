namespace game.mod.enhance {

    export class GemView extends eui.Component {

        public equip_list: game.mod.EquipListView;
        public power:game.mod.Power;
        public btn_gem2:game.mod.enhance.GemBtnItem;
        public btn_gem3:game.mod.enhance.GemBtnItem;
        public btn_gem0:game.mod.enhance.GemBtnItem;
        public btn_gem1:game.mod.enhance.GemBtnItem;
        public icon_gem:game.mod.Icon;
        public btn_attr:game.mod.Btn;
        public btn_master:game.mod.Btn;
        public btn_merge:game.mod.Btn;
        public btn_inlay:game.mod.Btn;
        public btn_get:game.mod.Btn;
        public pro_rate:ProgressBarComp;
        public lab_pro:eui.Label;
        public lab_step:eui.Label;

        constructor() {
            super();
            this.skinName = "skins.enhance.GemSkin";
        }
    }

}