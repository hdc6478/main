namespace game.mod.yijie {

    import huanjinzhihai_quyu_shuju = msg.huanjinzhihai_quyu_shuju;
    import s2c_huanjingzhihai_single_rank_info = msg.s2c_huanjingzhihai_single_rank_info;

    export class SeaModel {
        public type: number;
        public bigGate: number;
        public infoList: {[type: number] : huanjinzhihai_quyu_shuju} = {};
        public maxSmallGate: {[bigGate: number] : number} = {};

        public hintType: {[type: number]: string[]} = {
            [SeaType.Sea1] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea1],
            [SeaType.Sea2] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea2],
            [SeaType.Sea3] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea3]
        };
        public enterHintType: {[type: number]: string[]} = {
            [SeaType.Sea1] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea1,
                MdrTabBtnType.TabBtnType01],//加多一个TabBtnType01，//任务红点，进入红点
            [SeaType.Sea2] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea2,
                MdrTabBtnType.TabBtnType01],//加多一个TabBtnType01
            [SeaType.Sea3] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea3,
                MdrTabBtnType.TabBtnType01]//加多一个TabBtnType01
        };
        public rewardHintType: {[type: number]: string[]} = {
            [SeaType.Sea1] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea1,
                MdrTabBtnType.TabBtnType02],//加多一个TabBtnType02，//挂机收益红点
            [SeaType.Sea2] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea2,
                MdrTabBtnType.TabBtnType02],//加多一个TabBtnType02
            [SeaType.Sea3] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea3,
                MdrTabBtnType.TabBtnType02]//加多一个TabBtnType02
        };
        public fubenHintType: {[type: number]: string[]} = {
            [SeaType.Sea1] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea1,
                YijieViewType.SeaFubenMain, MdrTabBtnType.TabBtnType01],
            [SeaType.Sea2] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea2,
                YijieViewType.SeaFubenMain, MdrTabBtnType.TabBtnType02],
            [SeaType.Sea3] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea3,
                YijieViewType.SeaFubenMain, MdrTabBtnType.TabBtnType03]
        };
        public openIdxList: {[type: number]: number} = {
            [SeaType.Sea1] : OpenIdx.Sea1,
            [SeaType.Sea2] : OpenIdx.Sea2,
            [SeaType.Sea3] : OpenIdx.Sea3
        };
        public timeEventTypeList: {[type: number]: number} = {
            [SeaType.Sea1] : TimeEventType.Sea1,
            [SeaType.Sea2] : TimeEventType.Sea2,
            [SeaType.Sea3] : TimeEventType.Sea3
        };

        public rankType: number;
        public rankList: {[type: number] : s2c_huanjingzhihai_single_rank_info} = {};
        public bossHintType: {[type: number]: string[]} = {
            [SeaType.Sea1] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea1,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType01],
            [SeaType.Sea2] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea2,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType02],
            [SeaType.Sea3] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea3,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType03]
        };//分页按钮用
        public bossAttackHintType: {[type: number]: string[]} = {
            [SeaType.Sea1] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea1,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType01, MdrTabBtnType.TabBtnType01],//加多一个TabBtnType01，BOSS攻击红点
            [SeaType.Sea2] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea2,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType02, MdrTabBtnType.TabBtnType01],
            [SeaType.Sea3] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea3,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType03, MdrTabBtnType.TabBtnType01]
        };

        public rankHintType: {[type: number]: string[]} = {
            [SeaType.Sea1] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea1,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType01, YijieViewType.SeaRankMain, SeaMainBtnType.Sea1],
            [SeaType.Sea2] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea2,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType02, YijieViewType.SeaRankMain, SeaMainBtnType.Sea2],
            [SeaType.Sea3] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea3,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType03, YijieViewType.SeaRankMain, SeaMainBtnType.Sea3]
        };

        public orderHintType: {[type: number]: string[]} = {
            [SeaType.Sea1] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea1,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType01, MdrTabBtnType.TabBtnType02],//加多一个TabBtnType02，战令红点
            [SeaType.Sea2] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea2,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType02, MdrTabBtnType.TabBtnType02],
            [SeaType.Sea3] : [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea3,
                YijieViewType.SeaBossMain, MdrTabBtnType.TabBtnType03, MdrTabBtnType.TabBtnType02]
        };
    }
}