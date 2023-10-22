namespace game.mod.role {

    export class SuitType4Mdr extends SuitType3Mdr {
        /**套装类型*/
        protected _type = SuitType.XuanTian;
        /**操作类型*/
        protected _operType = SuitOperType.JinJie;
    }

    export class SuitType4CastMdr extends SuitType3CastMdr {
        /**套装类型*/
        protected _type = SuitType.XuanTian;
        /**操作类型*/
        protected _operType = SuitOperType.JingZhu;
    }
}