namespace game.mod.pass {

    export class QiyuanDetail2View extends eui.Component {

        public lab_desc: eui.Label;
        public list_reward:eui.List;
        
        public cost: game.mod.CostIcon;
        public lab_tip: eui.Label;
        public btn_get: game.mod.Btn;
        public lab_task:eui.Label;

        constructor() {
            super();
            this.skinName = "skins.pass.QiyuanDetail2Skin";
        }

    }
}