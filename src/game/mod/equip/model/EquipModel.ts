namespace game.mod.equip {
    import pos_detail = msg.pos_detail;

    export class EquipModel {
        public equips: PropData[] = [];
        public equipInfo: pos_detail;

        public easyEquip: { [pos: number]: PropData } = {};
    }
}
