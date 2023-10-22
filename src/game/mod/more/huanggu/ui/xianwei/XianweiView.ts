namespace game.mod.more {

    export class XianweiView extends eui.Component {

        timeItem: TimeItem;
        btn_tips: Btn;
        btn_rank: Btn;
        btn_explain: Btn;
        list: eui.List;
        infoItem: XianweiInfoItem;
        cdItem: XianweiCDItem;

        constructor() {
            super();
            this.skinName = "skins.more.XianweiSkin";
        }
    }
}