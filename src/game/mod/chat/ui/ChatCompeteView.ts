namespace game.mod.chat {

    export class ChatCompeteView extends eui.Component {
        public lab_name1:eui.Label;
        public powerLabel1: game.mod.PowerLabel;
        public head1:game.mod.HeadVip;

        public lab_name2:eui.Label;
        public powerLabel2: game.mod.PowerLabel;
        public head2:game.mod.HeadVip;

        public grp_vs: eui.Group;

        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.chat.ChatCompeteSkin";
        }
    }

}