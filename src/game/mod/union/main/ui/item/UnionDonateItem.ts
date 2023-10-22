namespace game.mod.union {

    export class UnionDonateItem extends CostIcon {

        constructor() {
            super();
            this.skinName = "skins.common.CoinItemCenterSkin";
        }

        protected dataChanged() {
            super.dataChanged();
            this.setLabCost(this.data[1], Color.WHITE);
        }

    }
}