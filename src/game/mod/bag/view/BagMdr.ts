namespace game.mod.bag {
    export class BagMdr extends BagBaseMdr {
        protected typeList: {bagType: number, hintTypes?: string[]}[] = [
            {bagType: BagType.Goods, hintTypes: [ModName.Bag, BagViewType.BagMain + BagMainBtnType.Bag, HintType.BagProp]},
            {bagType: BagType.Material},
            {bagType: BagType.Gem}
        ];/**背包类型*/
        protected btnType: string = BagMainBtnType.Bag;//分页按钮类型
    }
}