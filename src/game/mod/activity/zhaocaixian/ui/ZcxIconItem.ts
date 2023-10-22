namespace game.mod.activity {

    export class ZcxIconItem extends Icon {

        protected dataChanged(): void {
            super.dataChanged();

            let data = this.data as number[];
            let isSatisfy = BagUtil.checkPropCnt(data[0], data[1]);
            if (isSatisfy) {
                this.setImgGray('');
            } else {
                this.setImgGray();
            }

            let cntStr = TextUtil.addColor(StringUtil.getHurtNumStr(data[1]) + '',
                isSatisfy ? BlackColor.GREEN : BlackColor.RED);
            this.updateCnt(cntStr);
        }
    }
}