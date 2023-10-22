namespace game.mod.jiban {

    export class JibanBaseView extends eui.Component {
        public list_item: eui.List;
        public power: game.mod.Power;
        public name_item: AvatarNameSrItem;
        public god_item: game.mod.AttrGodItem;
        public img_icon: eui.Image;
        public item0: JibanBaseItemRender;
        public item1: JibanBaseItemRender;
        public item2: JibanBaseItemRender;
        public item3: JibanBaseItemRender;
        public item4: JibanBaseItemRender;
        public item5: JibanBaseItemRender;
        public img_name: eui.Image;
        public img_eff: eui.Image;
        public lab_tips: eui.Label;
        public btn_act: game.mod.Btn;
        public img_act: eui.Image;
        public img_item: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.jiban.JibanBaseSkin";
        }
    }

}