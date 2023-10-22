namespace game.mod.shilian {

    export class ForbiddenSaodangView extends eui.Component {

        public secondPop: game.mod.SecondPop;
        public list_item: eui.List;
        public btn_saodang: game.mod.Btn;
        public lab_tip: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.shilian.ForbiddenSaodangSkin";
        }

    }

}