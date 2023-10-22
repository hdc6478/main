namespace game.mod.union {


    export class UnionDonateEquipItem extends IconSel {

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.icon.setData(this.data, IconShowType.NotTips);
        }
    }
}