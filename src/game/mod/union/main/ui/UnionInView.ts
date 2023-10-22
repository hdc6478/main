namespace game.mod.union {

    export class UnionInView extends eui.Component {

        /**仙尊秘宝 */
        public btn_hero: Btn;
        /**每日俸禄 */
        public btn_wage: Btn;
        /**宗门图标弹出捐赠界面 */
        public btn_donate: Btn;
        /**宗名 */
        public lab_name: eui.Label;
        /**等级 */
        // public lab_level: eui.Label;
        /**公告 */
        public lab_notice: eui.Label;
        /**宗主头像 */
        public head: Head;
        /**宗主名字 */
        public lab_header: eui.Label;

        /**福利大厅 */
        public btn_welfare: Btn;
        /**天坛/圣坛 */
        public btn_lottery: Btn;
        /**仙宗遗宝 */
        public btn_treasure: Btn;
        /**斩妖台 */
        public btn_kill: Btn;
        /**书斋 */
        public btn_book: Btn;
        /**仙兽 */
        public btn_beast: BtnIconBase;
        /**仓库 */
        public btn_storage: Btn;

        constructor() {
            super();
            this.skinName = "skins.union.UnionInSkin";
        }
    }

}