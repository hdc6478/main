namespace game.mod {

    /**
     * 通用的礼包界面，有倒计时、大奖
     */
    export class BaseGiftView extends eui.Component {
        public img_banner: eui.Image;
        public iconBigReward: game.mod.IconBigReward;
        public timeItem: game.mod.TimeItem;
        public scroller: eui.Scroller;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.common.BaseGiftViewSkin";
        }

        /**
         * 更新顶部的banner资源
         * @param imgStr 资源名称
         * @param isJpg 是否为jpg，默认false
         */
        public updateBanner(imgStr: string, isJpg = false): void {
            this.img_banner.source = isJpg ? ResUtil.getUiJpg(imgStr) : ResUtil.getUiPng(imgStr);
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