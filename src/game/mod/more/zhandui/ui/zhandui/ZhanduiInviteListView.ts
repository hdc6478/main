namespace game.mod.more {

    export class ZhanduiInviteListView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public scroller: eui.Scroller;
        public list: eui.List;
        public checkbox1: eui.CheckBox;
        public checkbox2: eui.CheckBox;
        public lb_noteam: eui.Label;
        public gr_power: eui.Group;
        public editable_value: eui.EditableText;

        constructor() {
            super();
            this.skinName = "skins.more.ZhanduiInviteListSkin";
        }
    }
}