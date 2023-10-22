namespace game.mod.activity {

    export class GameOrderView extends eui.Component {

        /**大奖列表 */
        public list: eui.List;
        /**当前值 */
        public lab_cur: eui.Label;
        /**解锁按钮 */
        public btn_unlock: Btn;
        /**奖励列表 */
        public list_item: eui.List;
        /** */
        public scroller: eui.Scroller;
        /**领取按钮 */
        public btn: Btn;

        public img_type: eui.Image;
        public img_type2: eui.Image;
        public img_type1: eui.Image;

        public img_icon: eui.Image;
        public img_tips: eui.Image;
        public img_banner: eui.Image;

        public gr_icon: eui.Group;
        public gr_time: eui.Group;
        public lab_time: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.activity.GivingSkin";
        }
    }

}