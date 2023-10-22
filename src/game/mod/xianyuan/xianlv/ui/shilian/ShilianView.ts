namespace game.mod.xianyuan {

    export class ShilianView extends eui.Component {
        public propItem: game.mod.xianyuan.TaskPropItem;
        public btn_rule: game.mod.Btn;
        public btn_rank: game.mod.Btn;
        public list: eui.List;
        public timeItem: game.mod.TimeItem;
        public btn_add: game.mod.Btn;
        public img_banner: eui.Image;
        public img_cost: eui.Image;
        public lb_cost: eui.Label;
        public scroller: eui.Scroller;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.ShilianSkin";
        }
    }
}