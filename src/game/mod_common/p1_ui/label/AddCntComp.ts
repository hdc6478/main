namespace game.mod {

    import LanDef = game.localization.LanDef;

    /**带有文本以及加号的组件，比如副本收益次数*/
    export class AddCntComp extends eui.Component {
        public lb_cnt: eui.Label;
        public btn_add: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.common.AddCntCompSkin";
        }

        /**
         * 更新文本
         * @param str
         * @param prefixStr str的前缀，默认 次数：
         */
        updateShow(str: string, prefixStr = getLanById(LanDef.blacksmith_cue5)): void {
            this.lb_cnt.textFlow = TextUtil.parseHtml(prefixStr + str);
        }

        /**蓝色按钮*/
        public setBlue(): void {
            this.currentState = 'blue';
        }

        /**黄色按钮*/
        public setYellow(): void {
            this.currentState = 'yellow';
        }
    }
}