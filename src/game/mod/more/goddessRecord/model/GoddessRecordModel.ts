namespace game.mod.more {

    import nv_shen_hun_ka_struct = msg.nv_shen_hun_ka_struct;
    import NvshenHunkaScoreConfig = game.config.NvshenHunkaScoreConfig;
    import s2c_chuang_shi_nv_shen_hun_ka_compose_viewer = msg.s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;

    export class GoddessRecordModel {
        public event_index: number = 1;///事件索引
        public event_stage: number = 0;///事件阶段
        public talk_level: number = 1;///对话等级
        public is_finish: boolean = false;///当前对话等级，对话是否完成
        public level: number = 0;///创世女神亲密度等级
        public maxChatLv: number;

        public prop_list: msg.zhandui_jitan_struct[] = [];
        /** 累计加速时间 */
        public total_speed_time: number = 0;

        public minVal: number;
        public rewards: BasePreviewRewardData[];

        public hint: string[] = [ModName.More, MoreViewType.GoddessRecordMain, GoddessRecordMainBtnType.GoddessRecord,
            MoreViewType.TimeGoddessMain, TimeGoddessMainBtnType.TimeGoddess, MdrTabBtnType.TabBtnType01];//加多一个MdrTabBtnType.TabBtnType01

        public hunkaType: number = PropSubType38.Yaohun1;
        public hunkaBagOpenType: number = HunkaBagOpenType.Wear;
        public hunkaSelPos: number = 1;
        public hunkaList: {[type: number] : nv_shen_hun_ka_struct} = {};
        public hunkaScoreCfgList: {[type: number] : NvshenHunkaScoreConfig[]} = {};
        public hunkaComposeList: {[pos: number] : PropData} = {};//合成选中
        public hunkaComposeSelPos: number = 0;
        public hunkaSelQuality: number;
        public hunkaPreview: s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;//预览魂卡数据
        public hunkaHint: string[] = [ModName.More, MoreViewType.GoddessRecordMain, GoddessRecordMainBtnType.GoddessRecord,
            MoreViewType.TimeGoddessMain, TimeGoddessMainBtnType.TimeGoddess, MoreViewType.HunkaMain, MdrTabBtnType.TabBtnType01];//魂卡入口
        public hunkaHintTypeList: {[type: number]: string[]} = {
            [PropSubType38.Yaohun1] : [ModName.More, MoreViewType.GoddessRecordMain, GoddessRecordMainBtnType.GoddessRecord,
                MoreViewType.TimeGoddessMain, TimeGoddessMainBtnType.TimeGoddess, MoreViewType.HunkaMain, MdrTabBtnType.TabBtnType01,
                MdrTabBtnType.TabBtnType01, MdrTabBtnType.TabBtnType01],//妖魂红点
            [PropSubType38.Xianhun2] : [ModName.More, MoreViewType.GoddessRecordMain, GoddessRecordMainBtnType.GoddessRecord,
                MoreViewType.TimeGoddessMain, TimeGoddessMainBtnType.TimeGoddess, MoreViewType.HunkaMain, MdrTabBtnType.TabBtnType01,
                MdrTabBtnType.TabBtnType01, MdrTabBtnType.TabBtnType02],//神魂红点
            [PropSubType38.Shenhun3] : [ModName.More, MoreViewType.GoddessRecordMain, GoddessRecordMainBtnType.GoddessRecord,
                MoreViewType.TimeGoddessMain, TimeGoddessMainBtnType.TimeGoddess, MoreViewType.HunkaMain, MdrTabBtnType.TabBtnType01,
                MdrTabBtnType.TabBtnType01, MdrTabBtnType.TabBtnType03],//仙魂红点
        };
        public hunkaComposeHintType: string[] = [ModName.More, MoreViewType.GoddessRecordMain, GoddessRecordMainBtnType.GoddessRecord,
            MoreViewType.TimeGoddessMain, TimeGoddessMainBtnType.TimeGoddess, MoreViewType.HunkaMain, MdrTabBtnType.TabBtnType01,
            MdrTabBtnType.TabBtnType02];//合成分页红点
    }
}