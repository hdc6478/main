namespace game.mod {

    export class ProgressBarCntComp extends eui.Component {
        public img_bg: eui.Image;
        public lb_cnt: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.ComProgressBarCntSkin";
        }

        /**
         * @param cnt
         * @param light 是否点亮，默认灰色
         */
        public updateShow(cnt: number, light = false): void {
            this.lb_cnt.text = cnt + '';
            this.setLight(light);
        }

        private setLight(light = false): void {
            this.img_bg.source = light ? `xiaokuang_huangse` : `xiaokuang_huise`;
        }
    }
}