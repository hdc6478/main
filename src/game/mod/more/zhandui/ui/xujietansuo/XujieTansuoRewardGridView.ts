namespace game.mod.more {

    export class XujieTansuoRewardGridView extends eui.Component {
        public list: eui.List;
        public lb_cond: eui.Label;
        public btn_do: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoRewardGridSkin";
        }
    }
}