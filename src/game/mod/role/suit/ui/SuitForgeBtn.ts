namespace game.mod.role {

    import LanDef = game.localization.LanDef;

    export class SuitForgeBtn extends Btn {
        public lb_lv: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.role.SuitForgeBtnSkin";
        }

        /**
         * 更新等级
         * @param lv
         */
        public updateLv(lv: number): void {
            this.lb_lv.text = lv + getLanById(LanDef.lv);
        }
    }
}