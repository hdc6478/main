namespace game.mod.more {

    export class XujieTansuoExpeditionShenLingView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public item0: game.mod.AvatarIconLongPress;
        public item1: game.mod.AvatarIconLongPress;
        public item2: game.mod.AvatarIconLongPress;
        public item3: game.mod.AvatarIconLongPress;
        public item4: game.mod.AvatarIconLongPress;
        public item5: game.mod.AvatarIconLongPress;
        public item6: game.mod.AvatarIconLongPress;
        public item7: game.mod.AvatarIconLongPress;
        public scroller: eui.Scroller;
        public list: eui.List;
        public list_menu: eui.List;
        public btn_oneKey: game.mod.Btn;
        public btn_sure: game.mod.Btn;
        public checkBox: eui.CheckBox;
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoExpeditionShenLingSkin";
        }
    }
}