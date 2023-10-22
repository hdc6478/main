namespace game.mod.shenling {

    export class ShenLingAwakenView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public item0: game.mod.AvatarItem;
        public item1: game.mod.AvatarItem;
        public power: game.mod.Power;
        public list_reward: eui.List;
        public btn_awaken: game.mod.Btn;
        public list_cost: eui.List;
        public img_max: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenLingAwakenSkin";
        }
    }
}