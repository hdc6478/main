namespace game.mod.more {

    export class XianmaiItemTipsView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public nameItem: game.mod.AttrNameItem;
        public lb_title: eui.Label;
        public infoItem: game.mod.more.XianmaiInfoItem;
        public btn_do: game.mod.Btn;
        public coolTimeItem: game.mod.more.XianmaiCoolTimeItem;

        public lb_mydesc0: eui.Label;
        public lb_mydesc1: eui.Label;
        public lb_mynum0: eui.Label;
        public lb_mynum1: eui.Label;

        public headVip: game.mod.HeadVip;
        public lb_name: eui.Label;
        public powerLabel: game.mod.PowerLabel;
        public lb_guild: eui.Label;
        public img_defender: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.XianmaiItemTipsSkin";
        }
    }
}