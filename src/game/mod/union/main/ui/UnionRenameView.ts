namespace game.mod.union {


    export class UnionRenameView extends eui.Component {

        public secondPop: SecondPop;
        public editable_value: eui.EditableText;
        public btn: Btn;

        constructor() {
            super();
            this.skinName = "skins.union.UnionRenameSkin";
        }
    }

}