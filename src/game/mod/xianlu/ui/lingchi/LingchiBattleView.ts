namespace game.mod.xianlu {

    export class LingchiBattleView extends eui.Component {
        public grp_add: eui.Group;
        public lab_desc1: eui.Label;
        public list_item1: eui.List;
        public lab_desc2: eui.Label;
        public list_item2: eui.List;
        public btn_battle: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianlu.LingchiBattleSkin";
        }
    }

}