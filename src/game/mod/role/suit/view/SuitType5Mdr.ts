namespace game.mod.role {

    export class SuitType5Mdr extends SuitType3Mdr {
        /**套装类型*/
        protected _type = SuitType.JunTian;
        /**操作类型*/
        protected _operType = SuitOperType.JinJie;
    }

    export class SuitType5CastMdr extends SuitType3CastMdr {
        /**套装类型*/
        protected _type = SuitType.JunTian;
        /**操作类型*/
        protected _operType = SuitOperType.JingZhu;
    }
}