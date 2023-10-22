namespace game.mod.jiban {

    export class ShenLingJiBanView extends eui.Component {
        public scroller: eui.Scroller;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.jiban.ShenLingJiBanSkin";
        }
    }
}