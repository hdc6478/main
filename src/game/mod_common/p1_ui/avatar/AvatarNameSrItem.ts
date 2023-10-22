namespace game.mod {
    /**
     * 基础外显名称组件,SR
     */
    export class AvatarNameSrItem extends eui.Component {
        public img_sr: eui.Image;
        public lab_name: eui.Label;
        public gr_eft: eui.Group;

        //特效
        private _eftHub: UIEftHub;
        private _eftId: number;

        constructor() {
            super();
            this.skinName = "skins.common.AvatarNameSrItemSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            if (!this._eftHub) {
                this._eftHub = new UIEftHub(this);
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this._eftHub.removeAllEffects();
        }

        /**
         * @param name 属性
         * @param quality 品质
         * @param specialQua 特殊品质（黄玄地天，SpecialQualityType）
         */
        public updateShow(name: string, quality: number, specialQua?: SpecialQualityType): void {
            this.lab_name.text = name;

            if (this._eftId) {
                this._eftHub.removeEffect(this._eftId);
            }

            if (specialQua != undefined) {
                this.img_sr.source = ``;
                let eftSrc = SpecialQualityEftSrc[specialQua];
                if (eftSrc) {
                    this._eftId = this._eftHub.add(eftSrc, 0, 0, null, 0, this.gr_eft, -1);
                }
                quality = SpecialQuality[specialQua];//品质转换
            } else {
                this.img_sr.source = ResUtil.getSrQuality(quality, specialQua);
            }
            this.lab_name.textColor = ColorUtil.getColorByQuality1(quality);
        }
    }
}