namespace game.mod.yijie {

    import YijieConfig = game.config.YijieConfig;
    import yijie_ui_info = msg.yijie_ui_info;
    import yijie_boss_data = msg.yijie_boss_data;
    import yongheng_ui_info = msg.yongheng_ui_info;
    import YonghengConfig = game.config.YonghengConfig;
    import yongheng_boss_data = msg.yongheng_boss_data;

    export class YijieModel {
        public bossCfgs: {[stage: number] : YijieConfig[]};
        public bossInfos: yijie_ui_info[] = [];/**boss信息*/
        public count: number = 0;//幸运次数
        public selState: boolean = false;//勾选三倍
        public memberNum: number = 0;//宗门人员数量
        public bossValue: number = 0;//击杀普通boss的进度个数
        public bossList: yijie_boss_data[] | yongheng_boss_data[]= [];
        public bossHint: string[] = [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Yijie];//异界红点
        public curType: number;//当前打开的界面类型
        /************************************永恒异界****************************************/
        public yonghengBossInfos: yongheng_ui_info[] = [];/**boss信息*/
        public yonghengBossCfgs: {[stage: number] : YonghengConfig[]};
        public yonghengCount: number = 0;//幸运次数
        public goodCount: number = 0;//天选爆率次数
        public selCfg: YonghengConfig;
        public yonghengBossHint: string[] = [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.YonghengYijie];//永恒异界红点
    }
}