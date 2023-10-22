namespace game.mod.shenling {

    export class ShenLingShangZhenView extends eui.Component {
        public item0: game.mod.AvatarIconLongPress;
        public item1: game.mod.AvatarIconLongPress;
        public item2: game.mod.AvatarIconLongPress;
        public item3: game.mod.AvatarIconLongPress;
        public item4: game.mod.AvatarIconLongPress;
        public item5: game.mod.AvatarIconLongPress;
        public btn_oneKey: game.mod.Btn;
        public scroller: eui.Scroller;
        public list: eui.List;
        public list_menu: eui.List;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenLingShangZhenSkin";
        }
    }
}