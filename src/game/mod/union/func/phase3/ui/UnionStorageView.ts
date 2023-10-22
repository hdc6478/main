namespace game.mod.union {

    export class UnionStorageView extends eui.Component {
        list_item: eui.List;
        list_msg: eui.List;
        btn_recycle: Btn;
        btn_donate: Btn;
        coinItem: CostIcon;
        scr: eui.Scroller;
        checkbox:eui.CheckBox;

        constructor() {
            super();
            this.skinName = "skins.union.UnionStorageSkin";
        }
    }

}