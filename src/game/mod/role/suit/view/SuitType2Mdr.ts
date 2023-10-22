namespace game.mod.role {

    /**炎天进阶*/
    export class SuitType2Mdr extends SuitType1Mdr {
        /**苍天，炎天*/
        protected _type = SuitType.YanTian;
        /**1进阶，2强化*/
        protected _skinType = 1;
    }

    /**炎天强化*/
    export class SuitType2StrengthenMdr extends SuitType1StrengthenMdr {
        /**苍天，炎天*/
        protected _type = SuitType.YanTian;
        /**1进阶，2强化*/
        protected _skinType = 2;
    }

}