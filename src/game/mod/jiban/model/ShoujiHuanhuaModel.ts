namespace game.mod.jiban {

    import huanhua_datas = msg.huanhua_datas;
    import equip_gather_datas = msg.equip_gather_datas;

    export class ShoujiHuanhuaModel {

        //幻化
        public huanhua_map: { [index: number]: huanhua_datas } = {};

        //收集
        public equip_map: { [index: number]: equip_gather_datas } = {};
    }

}