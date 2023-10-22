namespace game.mod.more {

    export class GoddessExp extends Btn {
        private upStarEft: UpStarEft;
        private lab_lv: eui.Label;

        public updateShow(val: number, max: number, lv: number): void {
            this.upStarEft.updateCost(val, max, true, "已满");
            this.lab_lv.text = lv + "";//供奉等级
        }

    }
}