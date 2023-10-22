namespace game.mod {
    /**
     * 基础道具提示组件
     */
    export class BasePropTips extends eui.Component {
        private baseQualityTips: BaseQualityTips;
        private icon: game.mod.Icon;
        private lab_name: eui.Label;
        private _propData: PropData;

        constructor() {
            super();
            this.skinName = "skins.common.BasePropTipsSkin";
        }

        public updateShow(data: PropData | number | Long, starCnt?: number): void {
            if (data instanceof PropData) {
                this._propData = data;
            } else {
                this._propData = PropData.create(data);
            }

            this.icon.setData(this._propData, IconShowType.NotTips);
            this.lab_name.textFlow = this.icon.getPropName(false);
            this.baseQualityTips.updateShow(this._propData.quality);

            if (starCnt != null) {
                this.updateIconStar(starCnt);
            }
        }

        /**
         * @param quality
         * @param name
         * @param icon
         */
        public updateShowByArgs(quality: number, name: string, icon: string): void {
            this.baseQualityTips.updateShow(quality);
            this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(name, ColorUtil.getColorByQuality2(quality)));
            this.icon.updateQualityImg(ResUtil.getPropQualityImg(quality));
            this.icon.updateIconImg(icon);
        }

        /**
         * 更新icon的星星
         * @param starCnt
         */
        public updateIconStar(starCnt: number): void {
            this.icon.updateStar(starCnt);
        }
    }
}