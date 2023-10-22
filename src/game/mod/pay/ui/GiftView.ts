namespace game.mod.pay {

    export class GiftView extends eui.Component {
        public grp_eff: eui.Group;
        public name_item: AvatarNameSrItem;
        public special_attr: game.mod.SpecialAttrView;
        public list_reward: eui.List;
        public btn_close: game.mod.Btn;
        public img_buy: eui.Image;
        public btn_buy: game.mod.Btn;
        public lab_cut: eui.Label;
        public img_text: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.pay.GiftSkin";
        }
    }

}