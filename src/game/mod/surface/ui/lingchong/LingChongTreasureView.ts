namespace game.mod.surface {

    export class LingChongTreasureView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list: eui.List;
        public lb_desc: eui.Label;
        public lb_actDesc: eui.Label;
        public btn_get: game.mod.Btn;
        public img_state: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.surface.LingChongTreasureSkin";
        }
    }
}