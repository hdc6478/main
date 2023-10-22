namespace game.mod.xianyuan {

    export class RingView extends eui.Component {
        public gr_eft: eui.Group;
        public power: game.mod.Power2;
        public gr_lv: eui.Group;
        public nameItem: game.mod.AvatarNameItem;
        public btn_gift: game.mod.Btn;
        public list_item: eui.List;
        public bar: game.mod.ProgressBarComp;
        public costIcon: game.mod.CostIcon;
        public btn_up: game.mod.Btn;
        public btn_onekey: game.mod.Btn;
        public img_max: eui.Image;
        public specialAttr: game.mod.SpecialAttrView;
        public btn_huan: game.mod.TabSecondItem;
        public img_icon: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.RingSkin";
        }
    }
}