namespace game.mod.more {

    export class XujieTansuoBossGridView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public nameItem: game.mod.AvatarNameItem;
        public gr_power: eui.Group;
        public btn_zhanbao: game.mod.Btn;
        public btn_zhenrong: game.mod.Btn;
        public bar: game.mod.ProgressBarComp;
        public list_reward: eui.List;
        public btn_challenge: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoBossGridSkin";
        }
    }
}