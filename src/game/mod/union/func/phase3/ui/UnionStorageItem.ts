namespace game.mod.union {


    export class UnionStorageItem extends Icon {

        protected dataChanged(): void {
            super.dataChanged();
            this.iconShowType = IconShowType.UnionExchange;
            if (this.propData) {
                this.updateCnt(`${this.propData.count}`);
            }
        }

    }
}