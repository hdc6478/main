namespace game {

    //装备类型
    import LanDef = game.localization.LanDef;

    export const enum EquipEvent {
        EQUIP_UPDATE_BACK = "equip_update_back",/**装备更新*/
    }

    /**角色界面装备位置（从左到右从上到下）[0, 5, 1, 6, 2, 7, 3, 8, 4, 9]*/
    export const EquipPosAry: number[] = [
        EquipPos.SWORD, EquipPos.JADE, EquipPos.CLOTHES,
        EquipPos.SHOULDER, EquipPos.BELT, EquipPos.HELMET,
        EquipPos.PANTS, EquipPos.BOOT, EquipPos.NECKLACE, EquipPos.RING];

    /**新的装备类型*/
    export const enum EquipPos {
        SWORD = 0,      //玉剑
        CLOTHES = 1,    //衣服
        BELT = 2,       //腰带
        PANTS = 3,      //裤子
        NECKLACE = 4,   //项链
        JADE = 5,       //玉佩
        SHOULDER = 6,   //护肩
        HELMET = 7,     //头盔
        BOOT = 8,       //靴子
        RING = 9,       //戒指
    }

    /**装备部位名称*/
    export const EquipPosName: { [key: number]: string } = {
        [EquipPos.SWORD]: LanDef.equip_type_0,
        [EquipPos.CLOTHES]: LanDef.equip_type_1,
        [EquipPos.BELT]: LanDef.equip_type_2,
        [EquipPos.PANTS]: LanDef.equip_type_3,
        [EquipPos.NECKLACE]: LanDef.equip_type_4,
        [EquipPos.JADE]: LanDef.equip_type_5,
        [EquipPos.SHOULDER]: LanDef.equip_type_6,
        [EquipPos.HELMET]: LanDef.equip_type_7,
        [EquipPos.BOOT]: LanDef.equip_type_8,
        [EquipPos.RING]: LanDef.equip_type_9
    };

}