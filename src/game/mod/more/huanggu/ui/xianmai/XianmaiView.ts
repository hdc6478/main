namespace game.mod.more {

    export class XianmaiView extends eui.Component {
        public btn_rank: game.mod.Btn;
        public timeItem: game.mod.TimeItem;
        public list_btn: eui.List;
        public btn_zhanbao: game.mod.Btn;
        public btn_yijianxunkuang: game.mod.Btn;
        public btn_wodexianmai: game.mod.Btn;
        public btn_xianmailiebiao: game.mod.Btn;
        public btn_xianmaiduihuan: game.mod.Btn;
        public btn_rule: game.mod.Btn;
        public scroller: eui.Scroller;
        public list: eui.List;
        public lb_time: eui.Label;
        // public lb_cooltime: eui.Label;
        // public btn_lengque: game.mod.Btn;
        public lb_teamcnt: eui.Label;
        public lb_teamearn: eui.Label;
        public mvpItem: game.mod.more.XianmaiMvpItem;
        public coolTimeItem: game.mod.more.XianmaiCoolTimeItem;

        constructor() {
            super();
            this.skinName = "skins.more.XianmaiSkin";
        }
    }
}