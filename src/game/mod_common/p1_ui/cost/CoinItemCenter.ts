namespace game.mod {

    export class CoinItemCenter extends CostIcon {

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