namespace game.mod.bag {
    export class BagEquipMdr extends BagBaseMdr {
        protected typeList: {bagType: number, hintTypes?: string[]}[] = [
            {bagType: BagType.RoleEquip},
            {bagType: BagType.ShenlingEquip},
            {bagType: BagType.YuanlinEquip}
        ];/**背包类型*/
        protected btnType: string = BagMainBtnType.Equip;//分页按钮类型
    }
}