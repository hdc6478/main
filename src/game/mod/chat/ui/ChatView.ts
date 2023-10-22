namespace game.mod.chat {

    export class ChatView extends eui.Component {
        public scr: eui.Scroller;
        public list: eui.List;
        public grp_tips: eui.Group;
        public btn_more: game.mod.Btn;
        public input: eui.EditableText;
        public btn_txt: game.mod.Btn;
        public btn_send: game.mod.Btn;
        public btn_face: game.mod.Btn;

        public grp_txt: eui.Group;
        public lab_tip: eui.Label;
        public list_txt: eui.List;

        public grp_more: eui.Group;
        public list_more: eui.List;

        public grp_tips_private: eui.Group;
        public lab_goto: eui.Label;
        public scr_private: eui.Scroller;
        public list_private: eui.List;

        public scr_union: eui.Scroller;
        public list_union: eui.List;

        constructor() {
            super();
            this.skinName = "skins.chat.ChatSkin";
        }
    }

}