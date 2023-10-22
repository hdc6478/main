namespace game.mod {

    export class BaseRuleDescView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.BaseRuleDescSkin";
        }
    }
}