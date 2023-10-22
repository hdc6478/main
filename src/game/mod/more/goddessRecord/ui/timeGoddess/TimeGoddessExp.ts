namespace game.mod.more {

    export class TimeGoddessExp extends Btn {
        private upStarEft: UpStarEft;
        private coinItem: CoinItem;

        public updateShow(max: number, hint: boolean = false): void {
            let index = PropIndex.Chuangshinengliang;
            let val = BagUtil.getPropCntByIdx(index);
            this.upStarEft.updateCost(val, max, true);
            this.coinItem.setData(index, false);
            this.upStarEft.setHint(hint);
        }
    }
}