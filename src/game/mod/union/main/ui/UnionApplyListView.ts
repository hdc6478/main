namespace game.mod.union {


    export class UnionApplyListView extends eui.Component {

        public secondPop: SecondPop;
        public list: eui.List;
        public checkbox1: eui.CheckBox;
        public checkbox2: eui.CheckBox;
        public editable_value: eui.EditableText;

        constructor() {
            super();
            this.skinName = "skins.union.UnionApplyListSkin";
        }
    }

}