namespace game.mod.more {


    export class XiandiWeaponView extends eui.Component {

        coin1: CoinItem;
        coin2: CoinItem;

        grp_eft: eui.Group;
        jockeyItem: XiandiJockeyItem;
        btn_battle: Btn;
        btn_preview: Btn;
        power: Power2;

        lab_desc1: eui.Label;
        lab_desc2: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiWeaponSkin";
        }
    }

}