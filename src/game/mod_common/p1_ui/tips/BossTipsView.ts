namespace game.mod {

    export class BossTipsView extends eui.Component {

        public lab_desc: eui.Label;
        public list_reward: eui.List;
        public btn_get: Btn;
        public timeItem: TimeItem;

        constructor() {
            super();
            this.skinName = "skins.boss.BossTipsSkin";
        }
    }

}