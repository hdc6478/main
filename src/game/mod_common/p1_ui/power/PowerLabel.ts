namespace game.mod {
    /**
     * 战力文本组件
     */
    export class PowerLabel extends eui.Component {
        public lab_power: eui.Label;
        public img_icon: eui.Image;

        /**
         * @param power 战力
         * @param color 文本颜色
         * @param size 文本大小
         */
        public setPowerValue(power: Long | number, color?: number, size?: number): void {
            if (power instanceof Long) {
                power = power.toNumber();
            }
            this.lab_power.text = StringUtil.getHurtNumStr(power);
            if (color) {
                this.lab_power.textColor = color;
            }
            if (size) {
                this.lab_power.size = size;
            }
        }

        public setIcon(src: string): void {
            this.img_icon.source = src;
        }
    }

}