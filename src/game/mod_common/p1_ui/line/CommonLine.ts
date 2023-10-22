namespace game.mod {

    /**
     * 线条
     * 两种状态：蓝色，黄色
     */
    export class CommonLine extends eui.Component {

        constructor() {
            super();
            this.skinName = "skins.common.CommonLineSkin";
        }

        /**设置蓝色*/
        public setBlue(): void {
            this.currentState = 'blue';
        }

        /**设置黄色*/
        public setYellow(): void {
            this.currentState = 'yellow';
        }
    }
}