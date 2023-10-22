namespace game {


    import facade = base.facade;
    import GameNT = base.GameNT;

    export class ProxyBase extends base.Proxy {
        initialize(): void {
            super.initialize();
            //*****************************背包**********************************
            facade.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);//通过道具index监听背包数据变更
            facade.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE, this.onBagUpdateByPropType, this);//通过道具类型监听背包数据变更
            facade.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);//通过背包类型监听背包数据变更
            facade.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE, this.onBagUpdateByPropTypeAndSubType, this);//通过道具类型、子类型监听
            facade.onNt(BagEvent.ON_BAG_UPDATE_BY_HEAD_TYPE, this.onBagUpdateByHeadType, this);//通过表头 ConfigHead 监听背包数据变更

            //*****************************角色**********************************
            facade.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//角色属性更新，会携带属性字段数组
            facade.onNt(XianluEvent.REINCARNATE_INFO_UPDATE, this.reincarnateInfoUpdate, this);//转生信息更新，只有转数发生变化才更新
            facade.onNt(RoleEvent.ON_ROLE_PRIVILEGE_UPDATE, this.onRolePrivilegeUpdate, this);//特权更新，携带特权字段数组

            //*****************************任务**********************************
            facade.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);//任务数据变更，数据携带任务类型列表
            facade.onNt(TaskEvent.ON_TASK_HINT, this.onTaskHint, this);//任务红点，数据携带任务类型列表

            //*****************************功能开启**********************************
            facade.onNt(MainEvent.ON_OPEN_FUNC_INIT, this.onOpenFuncInit, this);//功能开启，数据携带功能idx列表
            facade.onNt(MainEvent.ON_OPEN_FUNC_UPDATE, this.onOpenFuncUpdate, this);//功能开启，数据携带功能idx列表

            //*****************************开服天数，登录天数**********************************
            facade.onNt(RoleEvent.ON_SERVER_DAY_UPDATE, this.onServerDayUpdate, this);

            //*****************************闯关**********************************
            facade.onNt(PassEvent.MAIN_PASS_GUANQIA_UPDATE, this.onMainPassGuanqiaUpdate, this);

            //*****************************外显数据更新**********************************
            facade.onNt(SurfaceEvent.SURFACE_INFO_UPDATE, this.onSurfaceInfoUpdate, this);//数据携带headType
            facade.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_INFO, this.onShenlingInfoUpdate, this);//神灵信息更新
            facade.onNt(SurfaceEvent.ON_SURFACE_TIPS_HIDE, this.onSurfaceTipsHide, this);//外显激活tips关闭抛出

            //*****************************中控活动**********************************
            facade.onNt(ActivityEvent.ON_ACTIVITY_INIT,  this.onActivityInit, this);
            facade.onNt(ActivityEvent.ON_ACTIVITY_UPDATE_BY_TYPE, this.onActivityUpdateByType, this);//数据携带actType列表

            //*****************************军团阵容更新**********************************
            facade.onNt(MoreEvent.ON_UPDATE_ZHENRONG_INFO, this.onUpdateZhenrongInfo, this);

            //*****************************战令更新**********************************
            facade.onNt(ActivityEvent.ON_UPDATE_GIVING_LIST, this.onUpdateGivingList, this);

            //*****************************场景变化**********************************
            facade.onNt(SceneEvent.ON_SCENE_ENTER, this.onUpdateSceneEnter, this);

            //*****************************仙侣伴侣信息变化**********************************
            facade.onNt(XianyuanEvent.ON_UPDATE_BANLV_INFO, this.onBanlvInfoUpdate, this);

            //*****************************幻境之海信息变化**********************************
            facade.onNt(SeaEvent.ON_SEA_INFO_UPDATE, this.onSeaInfoUpdate, this);//携带已开启的区域SeaType数组
        }

        /**需要监听的，子类重写下*/
        protected onBagUpdateByPropIndex(n: GameNT): void {}

        protected onBagUpdateByPropType(n: GameNT): void {}

        protected onBagUpdateByBagType(n: GameNT): void {}

        protected onBagUpdateByPropTypeAndSubType(n: GameNT): void {}

        protected onBagUpdateByHeadType(n: GameNT): void {}

        protected onRoleUpdate(n: GameNT): void {}

        protected reincarnateInfoUpdate(n: GameNT): void {}

        protected onRolePrivilegeUpdate(n: GameNT) {}

        protected onTaskUpdate(n: GameNT): void {}

        protected onTaskHint(n: GameNT): void {}

        protected onOpenFuncInit(n: GameNT): void {}

        protected onOpenFuncUpdate(n: GameNT): void {}

        protected onServerDayUpdate(n: GameNT): void {}

        protected onMainPassGuanqiaUpdate(n: GameNT): void {}

        protected onSurfaceInfoUpdate(n: GameNT): void {}

        protected onShenlingInfoUpdate(n: GameNT): void {}

        protected onSurfaceTipsHide(n: GameNT): void {}

        protected onActivityInit(n: GameNT): void {}

        protected onActivityUpdateByType(n: GameNT): void {}

        protected onUpdateZhenrongInfo(n: GameNT): void {}

        protected onUpdateGivingList(n: GameNT): void {}

        protected onUpdateSceneEnter(n: GameNT): void {}

        protected onBanlvInfoUpdate(n: GameNT): void {}

        protected onSeaInfoUpdate(n: GameNT): void {}
    }

}
