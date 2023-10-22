namespace game.mod {
    /**
     * 战力组件，带详情按钮
     */
    export class Power2 extends eui.Component {
        private power: game.mod.Power;
        public btn_desc: game.mod.Btn;//外部调用
        private _powerR: number = 30;//战力group右对齐30
        private _powerW: number = 326;//战力组件默认大小

        constructor() {
            super();
            this.skinName = `skins.common.PowerSkin2`;
        }

        /** 战力赋值 */
        public setPowerValue(value: Long | string | number): void {
            this.power.setPowerValue(value, true);
            let width = Math.max(this.power.group_power.x + this.power.group_power.width + this._powerR, this._powerW);
            this.power.width = width;
        }
    }

}