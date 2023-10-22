namespace game.mod.main {

    import prop_tips_data = msg.prop_tips_data;
    import TimeMgr = base.TimeMgr;
    import attributes = msg.attributes;
    import reward_find_data = msg.reward_find_data;
    import sys_attrs = msg.sys_attrs;

    export class MainModel {

        //上次领取挂机奖励的时间戳
        public hangupTimes: number = 0;
        //挂机奖励
        public awards: prop_tips_data[] = [];
        //奖励是否领取
        public canGet: boolean = false;
        //可用加速次数
        public speedUpCnt: number = 0;
        //加速奖励
        public speedUpAwards: prop_tips_data[] = [];
        //加速消耗元宝数
        public speedUpCost: number;
        /**挂机获得的装备数量 */
        public item_count: number;

        //返回奖励列表
        public gotAwards: prop_tips_data[] = [];
        public gotType: number = 0;
        public gotTime: number = 0;

        /**
         * 已经开放的界面模块
         */
        public openFuncIdx: number[];

        /** 当前已挂机时间（秒）*/
        public get offlineTotalTime(): number {
            return TimeMgr.time.serverTimeSecond - this.hangupTimes;
        }

        /** 最大挂机时间（秒）*/
        public get offlineMaxtime(): number {
            let num = getConfigByNameId(ConfigName.Param, "guaji_shouyi_time02");
            return (num.value * 60) || 86400;
        }

        /**服务端返回的属性*/
        public attrList: { [index: number]: attributes } = {};

        public offlineHint: string[] = [ModName.Main, MainViewType.OffLineGain];

        public findInfos: reward_find_data[];//资源找回
        public findHint: string[] = [ModName.Main, MainViewType.RewardFindMain, MdrTabBtnType.TabBtnType01];

        public huashenAttr: sys_attrs;//化神系统属性

        public notTipsInfos: { [type: number]: boolean } = {};//不再提示类型
    }
}
