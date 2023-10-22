namespace game.mod.activity {
    import s2c_oper_act_info = msg.s2c_oper_act_info;
    import s2c_oper_act_update = msg.s2c_oper_act_update;
    import s2c_oper_act_close = msg.s2c_oper_act_close;
    import GameNT = base.GameNT;
    import oper_act_item = msg.oper_act_item;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;
    import Handler = base.Handler;
    import c2s_oper_act_get_info = msg.c2s_oper_act_get_info;
    import act_reward = msg.act_reward;

    /***
     * 活动数据（新活动请自行创建新的Proxy和Model）
     */
    export class ActivityProxy extends ProxyBase implements IActivityProxy {
        private _model: ActivityModel;

        public getModel() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new ActivityModel();

            this.onProto(s2c_oper_act_info, this.s2c_oper_act_info, this);
            this.onProto(s2c_oper_act_update, this.s2c_oper_act_update, this);
            this.onProto(s2c_oper_act_close, this.s2c_oper_act_close, this);
        }

        onStartReconnect(): void {
            super.onStartReconnect();
            this._model.activityList = {};
            this._model.actTypeList = {};
            this._model.entranceBtnMap = {};
        }

        //初始化活动数据，登录时候下发，服务端会过滤未达到开启时间的活动
        private s2c_oper_act_info(n: GameNT) {
            let msg: s2c_oper_act_info = n.body;
            if(!msg || !msg.act_list){
                return;
            }
            let actList = msg.act_list;
            for (let i = 0, l = actList.length; i < l; i++) {
                let actInfo = actList[i];
                this._model.activityList[actInfo.act_id] = actInfo;
                this.setActData(actInfo);
                let typeAry = this._model.actTypeList[actInfo.type];
                if (!typeAry) {
                    this._model.actTypeList[actInfo.type] = typeAry = [];
                }
                if (typeAry.indexOf(actInfo.act_id) < 0) {
                    typeAry.push(actInfo.act_id);
                }

                this.setEntranceBtnMap(actInfo);//设置入口数据
            }
            this.sendNt(ActivityEvent.ON_ACTIVITY_INIT);
        }

        //更新中控活动，开启活动以及更新活动会下发，开启活动指的是达到活动开启时间
        private s2c_oper_act_update(n: GameNT) {
            let msg: s2c_oper_act_update = n.body;
            if(!msg || !msg.act_list){
                return;
            }
            let actList = msg.act_list;
            let actIdList: number[] = [];//活动ID列表
            let typeList: number[] = [];//ActivityType列表
            let posTypeList: number[] = [];//ActivityPosType列表
            for (let i = 0, l = actList.length; i < l; i++) {
                let actInfo = actList[i];
                this.setActData(actInfo);
                actIdList.push(actInfo.act_id);
                let typeAry = this._model.actTypeList[actInfo.type];
                if (!typeAry) {
                    this._model.actTypeList[actInfo.type] = typeAry = [];
                    typeList.push(actInfo.type);
                }
                if (typeAry.indexOf(actInfo.act_id) < 0) {
                    typeAry.push(actInfo.act_id);
                }

                let posTypes = this.setEntranceBtnMap(actInfo, true);//设置入口数据
                if(posTypes.length){
                    for(let posType of posTypes){
                        if(posTypeList.indexOf(posType) < 0){
                            posTypeList.push(posType);
                        }
                    }
                }
            }

            this.sendNt(ActivityEvent.ON_ACTIVITY_UPDATE, actIdList);
            this.sendNt(ActivityEvent.ON_ACTIVITY_UPDATE_BY_TYPE, typeList);
            if(posTypeList.length){
                //新增入口的时候，刷新对应类型的入口
                this.sendNt(ActivityEvent.ON_ACTIVITY_ENTRANCE_UPDATE, posTypeList);
            }
        }

        //删除活动，活动结束后服务端会下发
        private s2c_oper_act_close(n: GameNT) {
            let msg: s2c_oper_act_close = n.body;
            if(!msg || !msg.act_id){
                return;
            }
            let actId = msg.act_id;
            let actInfo = this._model.activityList[actId];

            if (!actInfo) {
                return;
            }
            //删除活动时候，关闭对应的活动入口
            this.checkDeleteEntrance(actInfo);

            let type = actInfo.type;

            let pos = this.getActPos(actId, type);
            if(pos >= 0){
                this._model.actTypeList[type].splice(pos,1);
            }

            if(!this._model.actTypeList[type].length){
                delete this._model.actTypeList[type];
            }
            delete this._model.activityList[actId];

            this.sendNt(ActivityEvent.ON_ACTIVITY_CLOSE, actId);
            this.sendNt(ActivityEvent.ON_ACTIVITY_UPDATE_BY_TYPE, [type]);
        }

        //设置活动编号相关的入口数据*/
        private setEntranceBtnMap(actInfo: oper_act_item, isUpdate?: boolean): number[] {
            let posTypeList: number[] = [];//更新的活动入口类型
            let posType = this.updateEntranceBtnMap(actInfo.entrance, actInfo, isUpdate);//更新更新活动入口数据
            if(posType){
                posTypeList.push(posType);
            }
            if(this.isSingleIcon(actInfo)){
                //独立图标入口也存储数据
                posType = this.updateEntranceBtnMap(actInfo.icon, actInfo, isUpdate);
                if(posType && posTypeList.indexOf(posType) < 0){
                    posTypeList.push(posType);
                }
            }
            return posTypeList;
        }

        //更新活动编号相关的入口数据
        private updateEntranceBtnMap(entrance: string, actInfo: oper_act_item, isUpdate?: boolean): number {
            let posType = 0;
            if(!entrance){
                //没有配置入口的不注册
                return posType;
            }
            let list = this._model.entranceBtnMap[entrance];
            if (!list) {
                //活动入口不存在时
                list = this._model.entranceBtnMap[entrance] = [];
                if(isUpdate){
                    //中控活动更新时候，需要判断对应的活动入口类型刷新
                    if(this.isLeftBtn(entrance)){
                        posType = ActivityPosType.Left;
                    }
                    else if(this.isBigBtn(entrance)){
                        posType = ActivityPosType.Big;
                    }
                    else {
                        posType = ActivityPosType.Top;
                    }
                }
            }
            let pos = this.getEntranceBtnPos(entrance, actInfo);
            if(pos >= 0){
                //活动已存在，则更新
                list[pos] = actInfo;
            }
            else {
                list.push(actInfo);
            }
            return posType;
        }

        private getEntranceBtnPos(entrance: string, actInfo: oper_act_item): number {
            let list = this._model.entranceBtnMap[entrance];
            if(!list || !list.length){
                return -1;
            }
            for(let i = 0; i < list.length; ++i){
                let info = list[i];
                if(info.act_id == actInfo.act_id){
                    return i;//活动ID已存在
                }
            }
            return -1;
        }

        //检测删除对应的入口
        private checkDeleteEntrance(actInfo: oper_act_item): void {
            let entrance = actInfo.entrance;
            if(entrance){
                //存在入口编号时,判断对应的入口编号是否还存在其他活动
                let showActList = this.getActListByEntrance(entrance, true);//当前入口编号开启的活动
                if(!showActList.length){
                    //对应入口编号没有活动时，则删除
                    let actList = this._model.entranceBtnMap[entrance] || [];//总的入口活动
                    for(let act of actList){
                        if(this.deleteEntrance(entrance, act.act_id)){
                            break;
                        }
                    }
                }
            }
            if(this.isSingleIcon(actInfo)){
                //独立图标时
                this.deleteEntrance(actInfo.icon, actInfo.act_id);
            }
        }
        //删除对应的入口
        private deleteEntrance(entrance: string, actId: number): boolean {
            let isDelete = false;
            if(this.isLeftBtn(entrance)){
                isDelete = BtnIconMgr.insLeft().updateOpen(actId, false, true);
            }
            else if(this.isBigBtn(entrance)){
                isDelete = BtnIconMgr.insBig().updateOpen(actId, false, true);
            }
            else {
                isDelete = BtnIconMgr.insTop().updateOpen(actId, false, true);
            }
            if(isDelete){
                delete this._model.entranceBtnMap[entrance];//删除对应的入口数据
            }
            return isDelete;
        }

        //是否是独立入口
        private isSingleIcon(actInfo: oper_act_item): boolean {
            return actInfo.is_single_icon && !!actInfo.icon;
        }
        //独立图标或者入口编号
        private getActIcon(actInfo: oper_act_item): string {
            return this.isSingleIcon(actInfo) ? actInfo.icon : actInfo.entrance;
        }

        private getActPos(actId: number, type: number): number {
            for(let i = 0; i < this._model.actTypeList[type].length; ++i){
                let id = this._model.actTypeList[type][i];
                if(id == actId){
                    return i;
                }
            }
            return -1;
        }

        private getEntranceBtnList(type: ActivityPosType): IBtnIconData[] {
            let list: IBtnIconData[] = [];
            for(let k in this._model.entranceBtnMap){
                let entrance = k;//独立图标或者入口编号
                if((type == ActivityPosType.Left && this.isLeftBtn(entrance))
                    || (type == ActivityPosType.Big && this.isBigBtn(entrance))
                    || (type == ActivityPosType.Top && this.isTopBtn(entrance))){
                    let actList = this._model.entranceBtnMap[entrance];//总的入口活动
                    actList.sort(this.sortOperActList);//排序
                    let btnData = this.getBtnData(actList, entrance);//活动转换成IBtnIconData
                    list.push(btnData);
                }
            }
            return list;
        }

        //是否左侧按钮
        private isLeftBtn(entrance: string): boolean {
            return entrance.indexOf("l_") == 0;
        }

        //是否大按钮
        private isBigBtn(entrance: string): boolean {
            return entrance.indexOf("b_") == 0;
        }

        //是否顶部按钮
        private isTopBtn(entrance: string): boolean {
            return !this.isLeftBtn(entrance) && !this.isBigBtn(entrance);
        }

        //排序活动
        private sortOperActList(a: oper_act_item, b: oper_act_item): number {
            if(a.sort_num != b.sort_num){
                return a.sort_num - b.sort_num;
            }
            return a.act_id - b.act_id;
        }

        //活动是否开启
        private isActShow(actInfo: oper_act_item): boolean {
            let openIdx = this.getOpenIdx(actInfo);
            if(openIdx && !ViewMgr.getIns().checkViewOpen(openIdx)){
                return false;//功能未开启
            }
            //判断活动时间是否已开启
            let curTime = TimeMgr.time.serverTimeSecond;
            return actInfo.c_begin_time <= curTime && curTime < actInfo.c_end_time;
        }

        //获取顶部中控活动入口按钮
        public getTopEntranceBtnList(): IBtnIconData[] {
            return this.getEntranceBtnList(ActivityPosType.Top);
        }

        //获取左侧中控活动入口按钮
        public getLeftEntranceBtnList(): IBtnIconData[] {
            return this.getEntranceBtnList(ActivityPosType.Left);
        }

        //获取大按钮中控活动入口按钮
        public getBigEntranceBtnList(): IBtnIconData[] {
            return this.getEntranceBtnList(ActivityPosType.Big);
        }

        /**通过活动入口获取已开启的活动数据，notEntrance：默认会额外计算未配置入口编号的其他活动*/
        public getActListByEntrance(entrance: string, notEntrance?: boolean): oper_act_item[] {
            let actList = this._model.entranceBtnMap[entrance];//总的入口活动
            if (!actList || !actList.length) {
                return [];
            }

            if(!notEntrance && this.isBigBtn(entrance)){
                //飞升榜飞升特惠不需要配置入口，存在活动时候，客户端显示出来
                let act = this.getOperActByType(ActivityType.FlyWar);
                if(act){
                    actList = actList.concat([act]);
                    //actList.sort(this.sortOperActList);//塞入活动后需要重新排序下，统一由下面排序
                }
            }

            //排序，proxy刷红点所需
            actList.sort(this.sortOperActList);

            let list: oper_act_item[] = [];//已开启的活动
            for (let actInfo of actList) {
                if (!this.getActData(actInfo.act_id)) {
                    //活动已关闭
                    continue;
                }
                if (this.isActShow(actInfo)) {
                    list.push(actInfo);//活动已开启
                }
            }
            //return list.sort(this.sortOperActList);
            return list;//总的入口编号那里已经排序过了
        }

        /**根据活动id获取活动数据*/
        public getActData(actId: number) {
            return this._model.activityList[actId];
        }

        /** 根据活动类型获取单个活动数据*/
        public getOperActByType(actType: number, entrance?: string): oper_act_item {
            let typeIds: number[] = this._model.actTypeList[actType];
            if (typeIds && typeIds.length) {
                if(!entrance){
                    return this.getActData(typeIds[0]);//不传入口编号，默认取第一个
                }
                for(let actId of typeIds){
                    let actInfo = this.getActData(actId);
                    if(actInfo.entrance == entrance){
                        return actInfo;
                    }
                }
            }
            return null;
        }

        /** 根据活动类型获取已开启的活动列表数据*/
        public getOperActList(actType: number): oper_act_item[] {
            let typeIds: number[] = this._model.actTypeList[actType];
            if (typeIds && typeIds.length) {
                let actList: oper_act_item[] = [];
                for(let actId of typeIds){
                    let actInfo = this.getActData(actId);
                    if(!this.isActShow(actInfo)){
                        continue;
                    }
                    actList.push(actInfo);
                }
                return actList;
            }
            return [];
        }

        /**功能开启ID，固定通用活动参数1*/
        //todo：需要注意的
        public getOpenIdx(actInfo: oper_act_item): number {
            return actInfo.param && actInfo.param.length > 0 ? actInfo.param[0] : 0;
        }

        /**界面选中分页时候保存的活动*/
        public get curOpenAct(): oper_act_item {
            return this._model.curOpenAct;
        }
        public set curOpenAct(v: oper_act_item) {
            this._model.curOpenAct = v;
        }

        /**获取活动入口编号，部分活动未配置时可用*/
        public getEntrance(actInfo: oper_act_item): string {
            if(actInfo.entrance){
                return actInfo.entrance;
            }
            if(actInfo.type == ActivityType.FlyWar){
                //飞升榜飞升特惠不需要配置入口，存在活动时候，客户端显示出来
                let act = this.getOperActByType(ActivityType.FlyRank);
                if(act){
                    return act.entrance;
                }
            }
            return "";
        }

        /**获取红点类型*/
        public getHintTypes(actInfo: oper_act_item): string[][] {
            let hintTypes: string[][] = [];
            //入口编号需要设置红点
            let entrance = this.getEntrance(actInfo);

            let btnType = this.getBtnType(actInfo, entrance);
            hintTypes.push([ModName.Activity, MainActivityViewType.ActMain, entrance, btnType]);//中控活动红点组合
            let icon = this.getActIcon(actInfo);
            if(icon != entrance){
                //独立图片也要设置红点
                hintTypes.push([ModName.Activity, MainActivityViewType.ActMain, icon])
            }
            return hintTypes;
        }
        /**根据活动类型获取红点类型*/
        public getEntranceHintByActType(actType: number): boolean {
            let actInfo = this.getOperActByType(actType);
            let entrance = this.getEntrance(actInfo);
            let hintType = [ModName.Activity, MainActivityViewType.ActMain, entrance];
            return HintMgr.getHint(hintType);
        }
        //计算所在BtnType
        private getBtnType(actInfo: oper_act_item, entrance: string): string {
            let actList = this.getActListByEntrance(entrance);
            for(let i = 0; i < actList.length; ++i) {
                let act = actList[i];
                if(act.act_id != actInfo.act_id){
                    continue;
                }
                let mdr = ActTypeToMdr[actInfo.type];
                if (!mdr) {
                    continue;
                }
                return (i + parseInt(MdrTabBtnType.TabBtnType01)).toString();
            }
            return "";
        }

        /**设置中控活动红点*/
        public setActHint(type: number, handler: Handler): void {
            let actList = this.getOperActList(type);
            for(let actInfo of actList){
                let hint = handler.exec(actInfo);
                let hintTypes = this.getHintTypes(actInfo);//获取红点类型列表
                for(let type of hintTypes){
                    HintMgr.setHint(hint, type);
                }
            }
        }

        /**收到中控活动时，保存数据*/
        private setActData(actInfo: oper_act_item) {
            this._model.activityList[actInfo.act_id] = actInfo;
            //未开启的活动不请求数据
            if(!this.isActShow(actInfo)){
                return;
            }
            switch (actInfo.type) {
                case ActivityType.FlyRank:
                case ActivityType.CarnivalRank:
                case ActivityType.CarnivalCrossRank:
                    this.c2s_oper_act_get_info(actInfo.act_id, RankOpType.Rank);//特殊参数，自己请求
                    return;
                case ActivityType.FlyWar:
                    //备用2是任务类型
                    let taskType = actInfo && actInfo.param ? actInfo.param[1] : TaskType.Fly;//任务类型
                    let taskProxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
                    taskProxy.all_task_info_c2s([taskType]);
                    break;
            }
            //公共请求数据
            this.c2s_oper_act_get_info(actInfo.act_id);
        }

        /**通用中控活动数据请求*/
        public c2s_oper_act_get_info(actId: number, param1?: number): void {
            let msg: c2s_oper_act_get_info = new c2s_oper_act_get_info();
            msg.act_id = actId;
            msg.params_1 = param1;
            this.sendProto(msg);
        }

        /**通用排行榜，配置51的话，取50，显示成50+*/
        public getMaxRank(actInfo: oper_act_item): number {
            let maxRank = 0;
            let rewardList = actInfo.reward_list;
            for(let reward of rewardList){
                let rank = this.getRank(reward);
                if(rank > maxRank){
                    maxRank = rank;
                }
            }
            return maxRank - 1;
        }

        /**传4进来,配置了4、11的话，返回10*/
        public getNextRank(actInfo: oper_act_item, curRank: number): number {
            let rewardList = actInfo.reward_list;
            for(let reward of rewardList){
                let rank = this.getRank(reward);
                if(rank > curRank){
                    return rank - 1;
                }
            }
            return curRank;
        }

        /**条件1：名次*/
        private getRank(reward: act_reward): number {
            return reward.cond_1 && reward.cond_1[0];
        }

        /**活动最后一天提示*/
        public checkActTips(type: NotTipsType): void {
            let actInfo = this.curOpenAct;
            let endTime = actInfo.c_end_time;
            ViewMgr.getIns().showActTips(endTime, type);
        }

        /**获取活动入口数据，entrance可以是入口编号或者独立图标*/
        private getBtnData(actList: oper_act_item[], entrance: string): IBtnIconData{
            let actInfo = actList[0];//默认取排序后第一个活动
            let openIdx = this.getOpenIdx(actInfo);
            let btnData: IBtnIconData;//活动入口转换成IBtnIconData

            let isSingleIcon = false;
            if(this.isSingleIcon(actInfo)){
                let icon = this.getActIcon(actInfo);//独立图标或者入口编号
                isSingleIcon = icon == entrance;//当前入口是独立图标
            }
            let isShowTime: boolean = !!NeedShowTimeAct[actInfo.type];
            let endTime = isShowTime ? actInfo.c_end_time : 0;
            //let effType = this.isBigBtn(entrance) ? BtnIconEffType.Forever : BtnIconEffType.Once;//冲榜按钮常驻特效，特效资源不一样
            let param: OperActivityData = {actInfo: actInfo, isSingleIcon: isSingleIcon};//中控数据
            switch (actInfo.type) {
                //todo：需要注意的
                //todo，二级界面的自己特殊处理下
                default:
                    btnData = {
                        id: actInfo.act_id,
                        m: ModName.Activity,
                        v: MainActivityViewType.ActMain,
                        showBack: true,
                        openIdx: openIdx,
                        param: param,//传入中控活动,是否独立入口
                        showTime: isShowTime,
                        endTime: endTime,
                        //effType: effType,
                        icon: entrance,
                        hintMsg: [ModName.Activity, MainActivityViewType.ActMain, entrance]//红点不由m,v决定
                    };
                    break;
            }
            return btnData;
        }

    }
}