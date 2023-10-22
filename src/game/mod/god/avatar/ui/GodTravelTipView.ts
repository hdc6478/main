namespace game.mod.god {

    export class GodTravelTipView extends eui.Component {
        public list: eui.List;
        public btn_travel: Btn;

        constructor() {
            super();
            this.skinName = "skins.god.GodTravelTipSkin";
        }
    }

}