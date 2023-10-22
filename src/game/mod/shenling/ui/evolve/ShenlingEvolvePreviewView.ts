namespace game.mod.shenling {

    export class ShenlingEvolvePreviewView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public modelItem: game.mod.shenling.ShenLingModelItem;
        public btn_god: game.mod.AttrGodItem;
        public lb_desc: eui.Label;
        public list_arrow: eui.List;
        public list_type: eui.List;
        public skillItem: game.mod.shenling.ShenlingEvolveSkillItem;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingEvolvePreviewSkin";
        }
    }
}