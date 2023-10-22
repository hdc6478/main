namespace game.mod.god {

    export class GodTravelChooseView extends eui.Component {
        public list: eui.List;
        public btn_travel: Btn;

        constructor() {
            super();
            this.skinName = "skins.god.GodTravelChooseSkin";
        }
    }

}