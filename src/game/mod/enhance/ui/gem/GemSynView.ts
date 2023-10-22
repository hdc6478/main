namespace game.mod.enhance {

    export class GemSynView extends eui.Component {

        public secondPop: game.mod.SecondPop;
        public icon_tar: game.mod.Icon;
        public lab_des: eui.Label;
        public btn_off: game.mod.Btn;
        public btn_merge: game.mod.Btn;
        public btn_one_key_merge: game.mod.Btn;
        public lab_tip: eui.Label;
        public list_bag: eui.List;
        public lab_name: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.enhance.GemSynSkin";
        }
    }

}