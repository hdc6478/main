namespace game.mod.activity {

    export class FlyWarView extends eui.Component {
        public icon: game.mod.Icon;
        public lab_name: eui.Label;
        /**当前值 */
        public lab_cur: eui.Label;
        /**解锁按钮 */
        public btn_unlock: Btn;

        public scroller: eui.Scroller;
        /**奖励列表 */
        public list_item: eui.List;
        public item: FlyWarRender;

        constructor() {
            super();
            this.skinName = "skins.activity.FlyWarSkin";
        }
    }

}