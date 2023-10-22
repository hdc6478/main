namespace game.mod.more {


    export class XiandiTreasureView extends eui.Component {

        list: eui.List;
        lab_name: eui.Label;
        btn_explain: Btn;
        btn_fight: Btn;
        grp_eft: eui.Group;
        prop: Icon;
        lab_rate: eui.Label;
        grp_font: eui.Group;

        coin1: CoinItem;
        coin2: CoinItem;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiTreasureSkin";
        }
    }

}