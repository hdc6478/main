namespace game.mod.more {

    export class XujieTansuoSceneResultView extends eui.Component {
        public resultReward: game.mod.ResultReward;
        public lb_desc: eui.Label;
        public lb_damage: eui.Label;
        public lb_hp: eui.Label;
        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoSceneResultSkin";
        }
    }
}