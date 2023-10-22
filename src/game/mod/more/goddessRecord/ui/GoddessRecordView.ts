namespace game.mod.more {

    export class GoddessRecordView extends eui.Component {
        public list_item: eui.List;
        public lab_tips: eui.Label;
        public btn_goddess: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.GoddessRecordSkin";
        }
    }

}