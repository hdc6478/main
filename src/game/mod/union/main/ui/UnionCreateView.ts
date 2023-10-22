namespace game.mod.union {

    export class UnionCreateView extends eui.Component {

        public editable_value: eui.EditableText;
        public btn: Btn;
        public btn_random: Btn;
        public lab_tips: eui.Label;
        public lab_jump: eui.Label;

        public img_common: eui.Image;
        public img_common_sel: eui.Image;
        public img_vip: eui.Image;
        public img_vip_sel: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.union.UnionCreateSkin";
        }
    }

}