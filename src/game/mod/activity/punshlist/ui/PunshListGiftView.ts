namespace game.mod.activity {

    export class PunshListGiftView extends eui.Component {
        public img_bg: eui.Image;
        public big_reward: game.mod.Icon;
        public scroller: eui.Scroller;
        public list: eui.List;
        public timeItem: TimeItem;

        constructor() {
            super();
            this.skinName = "skins.activity.PunshListGiftViewSkin";
        }

    }

}