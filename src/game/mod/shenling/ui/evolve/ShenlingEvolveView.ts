namespace game.mod.shenling {

    export class ShenlingEvolveView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public modelItem: game.mod.shenling.ShenLingModelItem;
        public power: game.mod.Power;
        public list: eui.List;
        public btn_god: game.mod.AttrGodItem;
        public skillItem: game.mod.shenling.ShenlingEvolveSkillItem;
        public evolveItem: game.mod.shenling.ShenlingEvolveItem;
        public btn_jinjie: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingEvolveSkin";
        }
    }
}