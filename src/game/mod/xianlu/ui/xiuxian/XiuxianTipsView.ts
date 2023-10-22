namespace game.mod.xianlu {

    export class XiuxianTipsView extends eui.Component {
        public lab_name: eui.Label;
        public baseDescItem1: BaseDescItem;
        public baseDescItem2: BaseDescItem;
        public lab_act: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.xianlu.XiuxianTipsSkin";
        }
    }

}