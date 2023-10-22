namespace game.mod {

    export class ProgressBarCntComp2 extends eui.Component {
        public bar: game.mod.ProgressBarComp;
        public barCnt: game.mod.ProgressBarCntComp;

        constructor() {
            super();
            this.skinName = "skins.common.ComProgressBarCntSkin2";
        }

        /**
         * @param cnt 当前进度值，与maxCnt判断展示次数点亮状态
         * @param minCnt 进度条最小值
         * @param maxCnt 进度条最大值
         */
        public updateShow(cnt: number, minCnt: number, maxCnt: number): void {
            this.barCnt.updateShow(maxCnt, cnt >= maxCnt);
            if (cnt < minCnt) {
                cnt = 0;
            } else if (cnt >= maxCnt) {
                cnt = maxCnt;
            }
            this.bar.show(cnt, maxCnt, false, 0, false, ProgressBarType.NoValue);
        }
    }
}