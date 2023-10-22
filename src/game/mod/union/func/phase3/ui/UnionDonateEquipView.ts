namespace game.mod.union {

    export class UnionDonateEquipView extends eui.Component {
        secondPop: SecondPop;
        list_item: eui.List;
        btn_donate: Btn;
        lab_tips: eui.Label;
        lab_explain: eui.Label;
        coinItem: CoinItem;
        scr: eui.Scroller;

        constructor() {
            super();
            this.skinName = "skins.union.UnionDonateEquipSkin";
        }
    }

}