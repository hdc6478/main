namespace game.mod.more {

    export class XujieTansuoSceneResultKillView extends eui.Component {
        public lb_desc: eui.Label;
        public lb_damage: eui.Label;
        public resultReward0: game.mod.ResultReward;
        public resultReward1: game.mod.ResultReward;
        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoSceneResultKillSkin";
        }
    }
}