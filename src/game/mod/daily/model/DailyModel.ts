namespace game.mod.daily {

    import attributes = msg.attributes;

    export class DailyModel {

        public curAttr: attributes;
        public nextAttr: attributes;
        public sumCup: number = 0;          // 当前奖杯数
        public nextCup: number = 0;         // 升级所需奖杯数

        public showPower: Long;             // 总战力

        public curLv: number = 0;           // 勋章等级
        public curIndex: number = 0;        // 当前勋章

        //进入活跃奖励
        public curExp: number = 0;          // 当前历练值（总活跃度）
        public awdState: number = 0;        // 当前已领取到哪个阶段（1-->n 表示第1-->n阶段已经领取   0：表示还没领取任何阶段)
        public awdList: number[] = [];      // 已领取的宝箱奖励id列表

        public livenessHint: string[] = [ModName.Daily, DailyViewType.DailyMain + DailyMainBtnType.BtnLiveness];  // 活跃度红点
    }

}