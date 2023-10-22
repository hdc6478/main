namespace game.mod.more {

    export class EventChatView extends eui.Component {
        public head: Head;
        public grp_desc: eui.Group;
        public lab_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.EventChatSkin";
        }
    }

}