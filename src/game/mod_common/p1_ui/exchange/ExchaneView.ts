namespace game.mod {

    export class ExchangeView extends eui.Component {

        /**列表 */
        public list: eui.List;
        /**可不用 用tab的bg */
        public img_bg: eui.Image;
        /**大奖banner图 */
        public img_banner: eui.Image;
        /**刷新按钮 */
        public btn_refresh: Btn;
        public timeItem: game.mod.TimeItem;
        public iconBigReward: game.mod.IconBigReward;

        constructor() {
            super();
            this.skinName = "skins.common.ExchangeSkin";
        }

        /**更新顶部大奖数据*/
        public updateBigReward(data: number[] | msg.prop_tips_data): void {
            if (!data) {
                this.iconBigReward.visible = false;
                return;
            }
            this.iconBigReward.visible = true;
            this.iconBigReward.data = data;
        }
    }

}