namespace game.mod.more {

    export class HuashenBattleView extends eui.Component {
        public list_item1: eui.List;
        public list_item2: eui.List;
        public btn_onekey: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.HuashenBattleSkin";
        }
    }

}