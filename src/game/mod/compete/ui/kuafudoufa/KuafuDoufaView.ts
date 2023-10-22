namespace game.mod.compete {

    export class KuafuDoufaView extends eui.Component {
        public btn_rule: Btn;
        public btn_rank: Btn;
        public timeItem: game.mod.TimeItem;
        public btn_achieve: Btn;
        public timeItem2: game.mod.TimeItem;
        public list_reward: eui.List;
        public img_tips: eui.Image;
        public lab_cnt: eui.Label;
        public img_state: eui.Image;
        public btn_enter: Btn;


        constructor() {
            super();
            this.skinName = "skins.compete.KuafuDoufaSkin";
        }
    }
}
