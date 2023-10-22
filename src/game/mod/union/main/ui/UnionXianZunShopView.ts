namespace game.mod.union {

    export class UnionXianZunShopView extends eui.Component {

        /**列表 */
        public list: eui.List;
        /**倒计时 */
        public lb_time: eui.Label;
        /**可不用 用tab的bg */
        public img_bg: eui.Image;
        /**大奖banner图 */
        public img_banner: eui.Image;
        /**时间容器 */
        public gr_time: eui.Group;
        public head: Head;
        public lab_name: eui.Label;
        public btn_explain: Btn;

        constructor() {
            super();
            this.skinName = "skins.union.UnionXianZunShopSkin";
        }
    }

}