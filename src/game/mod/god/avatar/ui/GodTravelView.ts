namespace game.mod.god {

    export class GodTravelView extends eui.Component {
        public list: eui.List;
        public btn_get: Btn;
        public btn_travel: Btn;

        constructor() {
            super();
            this.skinName = "skins.god.GodTravelSkin";
        }
    }

}