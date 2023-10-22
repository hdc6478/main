namespace game.mod {
    /**
     * 基础带品质提示组件
     */
    export class BaseQualityTips extends eui.Component {
        public img_quality: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.common.BaseQualityTipsSkin";
        }

        public updateShow(quality: number): void {
            this.img_quality.source = ResUtil.getBgQuality(quality);
        }
    }
}