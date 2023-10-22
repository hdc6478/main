namespace game.mod.enhance {

    export class GemAttrInfoView extends eui.Component {

        public secondPop: game.mod.SecondPop;
        public power:game.mod.Power;
        public list_gemAttr:eui.List;

        constructor() {
            super();
            this.skinName = "skins.enhance.GemAttrInfoSkin";
        }
    }

}