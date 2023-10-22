namespace game.mod.union {

    export class UnionMemberView extends eui.Component {

        public btn_exit: Btn;
        public btn_rename: Btn;
        public btn_explain: Btn;
        /**招募（频道发送消息） */
        public btn_recruit: Btn;
        /**查看申请 */
        public btn_check: Btn;

        public lab_level: eui.Label;
        public lab_name: eui.Label;
        public lab_leader: eui.Label;
        public lab_count: eui.Label;

        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.union.UnionMemberSkin";
        }
    }

}