namespace game.mod.main {

    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Handler = base.Handler;
    import facade = base.facade;
    import Pool = base.Pool;
    import s2c_open_func_info = msg.s2c_open_func_info;
    import c2s_hangup_get_rwd = msg.c2s_hangup_get_rwd;
    import c2s_hangup_rate_rwd = msg.c2s_hangup_rate_rwd;
    import s2c_hangup_day_is_max_get = msg.s2c_hangup_day_is_max_get;
    import s2c_hangup_info = msg.s2c_hangup_info;
    import s2c_hangup_rwd = msg.s2c_hangup_rwd;
    import c2s_disconnect = msg.c2s_disconnect;
    import c2s_open_system_info = msg.c2s_open_system_info;
    import c2s_common_attr_getinfo = msg.c2s_common_attr_getinfo;
    import s2c_common_attr_sendinfo = msg.s2c_common_attr_sendinfo;
    import attributes = msg.attributes;
    import s2c_sys_attributes = msg.s2c_sys_attributes;
    import c2s_sys_attributes = msg.c2s_sys_attributes;
    import c2s_material_get_info = msg.c2s_material_get_info;
    import c2s_forbidden_get_info = msg.c2s_forbidden_get_info;
    import c2s_single_boss_get_info = msg.c2s_single_boss_get_info;
    import c2s_pvp_battle_get_base_info = msg.c2s_pvp_battle_get_base_info;
    import prop_tips_data = msg.prop_tips_data;
    import c2s_consecrate_info = msg.c2s_consecrate_info;
    import s2c_reward_find_info = msg.s2c_reward_find_info;
    import c2s_reward_find_draw = msg.c2s_reward_find_draw;
    import reward_find_data = msg.reward_find_data;
    import sys_attrs = msg.sys_attrs;
    import c2s_guild_study_show = msg.c2s_guild_study_show;
    import c2s_guild_xianshou_show = msg.c2s_guild_xianshou_show;

    export class MainProxy extends ProxyBase implements UpdateItem, IMainProxy {

        private _model: MainModel;
        private _reqList: Handler[] = [];

        /**登录时候需要向服务端请求数据的系统*/
        private _openIdxs: number[] = [OpenIdx.BagMelt, OpenIdx.Xiuxian, OpenIdx.Xiandan, OpenIdx.Lingchi, OpenIdx.Lingmai, OpenIdx.Linggen,
            OpenIdx.Role, OpenIdx.Title, OpenIdx.DressUp, OpenIdx.Strength, OpenIdx.Gem, OpenIdx.Advanced, OpenIdx.Xianfa,
            OpenIdx.Shenling, OpenIdx.Horse, OpenIdx.Tianshen, OpenIdx.Lingchong, OpenIdx.Forbidden, OpenIdx.Xianta, OpenIdx.Yuanling,
            OpenIdx.VipBoss, OpenIdx.SuitType1, OpenIdx.SuitType2, OpenIdx.SuitType3, OpenIdx.SuitType4, OpenIdx.SuitType5,
            OpenIdx.Wing, OpenIdx.Weapon, OpenIdx.Body, OpenIdx.RoleHuanhua, OpenIdx.RoleCollect, OpenIdx.SignGift, OpenIdx.Store,
            OpenIdx.Zhaocaixian, OpenIdx.KillBoss, OpenIdx.Yaojijiangshi, OpenIdx.WonderfulAct, OpenIdx.WonderfulAct1,
            OpenIdx.Xianlv, OpenIdx.XianlvChild, OpenIdx.XianlvRing, OpenIdx.XianlvRenwu, OpenIdx.XianlvShilian, OpenIdx.XianlvZhanchang,
            OpenIdx.Rank, OpenIdx.Tongtiange, OpenIdx.Huashen, OpenIdx.Yishou, OpenIdx.SkyPalace, OpenIdx.ShenlingGift, OpenIdx.FeishengWukong,
            OpenIdx.JuebanXianjian, OpenIdx.ZhizunShouyin, OpenIdx.Zhandui, OpenIdx.XujieJitan, OpenIdx.XujieTansuo, OpenIdx.XiuxianNvpu, OpenIdx.GoddessRecord,
            OpenIdx.XianmaiZhengduo, OpenIdx.Sea, OpenIdx.Fengmo, OpenIdx.Huanjing, OpenIdx.Chaojilicai, OpenIdx.Zhizunlicai, OpenIdx.Fulijijin, OpenIdx.Chaojijijin,
            OpenIdx.Fuchenlinghu, OpenIdx.Huanjingzengli, OpenIdx.Huanjingbaozang, OpenIdx.Huanjingleichong, OpenIdx.Huanjinglibao, OpenIdx.XianjieLuandou, OpenIdx.Honour];
        /**登录时候需要向服务端请求数据的任务*/
        private _taskTypes: { [type: number]: number } = {
            [TaskType.Xiuxian]: OpenIdx.Xiuxian,
            [TaskType.Qiyuan]: OpenIdx.Qiyuan,
            [TaskType.Liveness]: OpenIdx.Daily,
            [TaskType.Yaojijiangshi]: OpenIdx.Yaojijiangshi,
            [TaskType.Xianlv]: OpenIdx.XianlvRenwu,
            [TaskType.Chengshen]: OpenIdx.Chengshen,
            [TaskType.Achieve]: OpenIdx.Achieve,
            [TaskType.Huashen]: OpenIdx.Huashen,
            [TaskType.ShenlingEvolve]: OpenIdx.Shenling,//神灵进化
            [TaskType.PunshList]: OpenIdx.PunshList,
            [TaskType.HuashenZhilu]: OpenIdx.Huashen,
            [TaskType.HuashenZhanshendian]: OpenIdx.Huashen,
            [TaskType.UnionBeast]: OpenIdx.Union,
            [TaskType.Mining]: OpenIdx.Zhandui,
            [TaskType.XujieTansuo]: OpenIdx.XujieTansuo,
            [TaskType.Sea1]: OpenIdx.Sea1,
            [TaskType.Sea2]: OpenIdx.Sea2,
            [TaskType.Sea3]: OpenIdx.Sea3,
            [TaskType.KuafuDoufa]: OpenIdx.KuafuDoufa,
            [TaskType.Honour]: OpenIdx.Honour
        };

        update(time: base.Time) {
            if (this._reqList.length == 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            if (this._reqList.length) {
                let handler = this._reqList.shift();
                handler.exec();
                Pool.release(handler);
            }
        }

        public onStartReconnect(): void {
            super.onStartReconnect();
            ViewMgr.getIns().clearView();//清除界面缓存
            PropTipsMgr.getIns().clearData();//清除队列数据
            TimeMgr.removeUpdateItem(this);
            for (let handler of this._reqList) {
                Pool.release(handler);
            }
            this._reqList.length = 0;

            this._model.openFuncIdx = null;
        }

        public initialize(): void {
            let self = this;
            self._model = new MainModel();
            self.onProto(s2c_open_func_info, self.get_open_view_idx_s2c, self);

            self.onProto(s2c_hangup_day_is_max_get, self.s2c_hangup_day_is_max_get, self);
            self.onProto(s2c_hangup_info, self.s2c_hangup_info, self);
            self.onProto(s2c_hangup_rwd, self.s2c_hangup_get_rwd, self);

            self.onProto(s2c_common_attr_sendinfo, self.s2c_common_attr_sendinfo, self);
            self.onProto(s2c_sys_attributes, self.s2c_sys_attributes, self);

            self.onProto(s2c_reward_find_info, self.s2c_reward_find_info, self);
        }

        public getmodel() {
            return this._model;
        }

        public init() {
            let reqList = this._reqList;

            let bagProxy: IBagProxy = facade.retMod(ModName.Bag).retProxy(ProxyType.Bag);
            reqList[reqList.length] = Handler.alloc(bagProxy, bagProxy.c2s_bag_props);

            /**todo，后续看下是否需要划分数据*/
            let idList: number[] = [];
            for (let idx of this._openIdxs) {
                if (!ViewMgr.getIns().checkViewOpen(idx)) {
                    continue;
                }
                idList.push(idx);
            }
            if (idList.length) {
                reqList[reqList.length] = Handler.alloc(this, this.c2s_open_system_info, [idList]);
            }
            /**todo，后续看下是否需要划分数据*/
            let types: number[] = [];
            for (let k in this._taskTypes) {
                let idx = this._taskTypes[k];
                if (!ViewMgr.getIns().checkViewOpen(idx)) {
                    continue;
                }
                types.push(parseInt(k));
            }
            if (types.length) {
                let taskProxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
                reqList[reqList.length] = Handler.alloc(taskProxy, taskProxy.all_task_info_c2s, [types]);
            }
            /**请求副本信息*/
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Shilian)) {
                reqList[reqList.length] = Handler.alloc(this, this.c2s_material_get_info);
            }
            /**请求禁地副本信息*/
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Forbidden)) {
                reqList[reqList.length] = Handler.alloc(this, this.c2s_forbidden_get_info);
            }
            /**请求多人boss信息*/
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Boss)) {
                let bossProxy: IBossProxy = facade.retMod(ModName.Boss).retProxy(ProxyType.Boss);
                reqList[reqList.length] = Handler.alloc(bossProxy, bossProxy.c2s_new_multiple_boss_info);
            }
            /**请求个人boss信息*/
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.PersonalBoss)) {
                reqList[reqList.length] = Handler.alloc(this, this.c2s_single_boss_get_info);
            }
            /**请求斗法信息*/
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Doufa)) {
                reqList[reqList.length] = Handler.alloc(this, this.c2s_pvp_battle_get_base_info);
            }
            /**请求邮件信息 */
            let mailProxy: IMailProxy = facade.retMod(ModName.Mail).retProxy(ProxyType.Mail);
            reqList[reqList.length] = Handler.alloc(mailProxy, mailProxy.mail_online_request_c2s);

            /**请求好友信息 */
            let friendProxy: IFriendProxy = facade.retMod(ModName.Friend).retProxy(ProxyType.Friend);
            reqList[reqList.length] = Handler.alloc(friendProxy, friendProxy.c2s_friend_list, [FriendOpType.Friend]);

            /**请求供奉信息 */
            if(ViewMgr.getIns().checkViewOpen(OpenIdx.Consecrate)){
                reqList[reqList.length] = Handler.alloc(this, this.c2s_consecrate_info);
            }

            let union:IUnionProxy = getProxy(ModName.Union,ProxyType.Union);
            if(ViewMgr.getIns().checkViewOpen(OpenIdx.Union) && union.isInUnion){
                reqList[reqList.length] = Handler.alloc(this, this.c2s_guild_study_show);
                reqList[reqList.length] = Handler.alloc(this, this.c2s_guild_xianshou_show);
            }

            if (!TimeMgr.hasUpdateItem(this)) {
                TimeMgr.addUpdateItem(this);
            }
        }

        public addReqList(proxy: any, method: Function, args?: any[]): void {
            let reqList = this._reqList;
            reqList[reqList.length] = Handler.alloc(proxy, method, args);
            if (!TimeMgr.hasUpdateItem(this)) {
                TimeMgr.addUpdateItem(this);
            }
        }

        private isOpenLine: boolean = true;

        private s2c_hangup_day_is_max_get(n: GameNT) {
            let msg: s2c_hangup_day_is_max_get = n.body;
            if(msg.day_is_pop && msg.day_is_pop == 0){
                ViewMgr.getIns().showViewByID(JumpIdx.OfflineGain);
            }
        }

        //挂机收益信息
        private s2c_hangup_info(n: GameNT) {
            let msg: s2c_hangup_info = n.body;
            this._model.hangupTimes = msg.hangup_times;
            this._model.awards = msg.items;
            this._model.canGet = msg.is_can_get == 1;
            this._model.speedUpCnt = msg.jia_shu_cn;
            this._model.speedUpAwards = msg.speed_list;
            this._model.speedUpCost = msg.jia_shu_cost;
            this._model.item_count = msg.item_count;

            //挂机时间大于配置的时间时，打开挂机界面
            // todo 策划需求不主动弹窗 ID1010857
            // if (this.isOpenLine && this._model.offlineTotalTime > this._model.offlineMaxtime) {
            //     this.isOpenLine = false;
            //     ViewMgr.getIns().showViewByID(JumpIdx.OfflineGain);
            // }

            this.updateOfflineHint();
            this.sendNt(MainEvent.UPDATE_OFFLINE);
        }


        //结算挂机收益
        private s2c_hangup_get_rwd(n: GameNT) {
            // let msg: s2c_hangup_rwd = n.body;
            // this._model.gotAwards = msg.items;
            // this._model.gotType = msg.rtype;
            // this._model.gotTime = msg.hangup_times;
        }

        //请求领取挂机奖励
        public c2s_hangup_get_rwd(type: number = 2) {
            let c: c2s_hangup_get_rwd = new c2s_hangup_get_rwd();
            c.op = type;
            this.sendProto(c);
        }

        //请求加速挂机
        public c2s_hangup_rate_rwd() {
            let c: c2s_hangup_rate_rwd = new c2s_hangup_rate_rwd();
            this.sendProto(c);
        }

        /**
         * 记录已经开放的界面idx
         * @param {base.GameNT} n
         */
        private get_open_view_idx_s2c(n: GameNT) {
            let msg: s2c_open_func_info = n.body;
            if (msg.open) {
                let openIdx = this._model.openFuncIdx;
                if (!openIdx) {
                    this._model.openFuncIdx = msg.open;
                    this.sendNt(MainEvent.ON_OPEN_FUNC_INIT, msg.open);
                    return;
                }

                //关闭的功能idx
                let delIdx: number[] = [];
                for (let idx of openIdx) {
                    if (msg.open.indexOf(idx) < 0) {
                        delIdx.push(idx);
                    }
                }
                if (delIdx.length) {
                    this.sendNt(MainEvent.ON_OPEN_FUNC_DELETE, delIdx);
                }

                //新开的功能idx
                let addIdx: number[] = [];
                for (let idx of msg.open) {
                    if (openIdx.indexOf(idx) > -1) {
                        continue;
                    }
                    openIdx.push(idx);
                    addIdx.push(idx);
                }
                if (addIdx.length) {
                    this.sendNt(MainEvent.ON_OPEN_FUNC_UPDATE, addIdx);
                }
            }
        }

        public get rewards(): prop_tips_data[] {
            let rewards: prop_tips_data[] = this._model.awards.concat();
            if (this._model.item_count > 0) {
                let reward = new prop_tips_data();
                reward.idx = Long.fromValue(PropIndex.CommonEquip);
                reward.cnt = this._model.item_count;
                rewards.push(reward);
            }
            return rewards;
        }

        public get offlineCanGet(): boolean {
            return this._model.canGet;
        }

        public get offlineTotalTime(): number {
            return this._model.offlineTotalTime;
        }

        public get offlineMaxtime(): number {
            return this._model.offlineMaxtime;
        }

        public get offlineHint(): string[] {
            return this._model.offlineHint;
        }

        /**
         * 挂机红点
         * @returns
         */
        public updateOfflineHint(): void {
            let hint = this.getOfflineHint();
            if (!hint) {
                let targetTime = this._model.hangupTimes + this._model.offlineMaxtime / 2;
                if (targetTime > 0) {
                    HintMgr.addTimeEvent(TimeEventType.Offline, targetTime, this, this.updateOfflineHint);
                }
            }
            HintMgr.setHint(hint, this._model.offlineHint);
        }

        public getOfflineHint(): boolean {
            let hint: boolean = this._model.offlineTotalTime >= this._model.offlineMaxtime / 2;
            return hint;
        }

        // //--------------------------系统改名------------------------
        // public changeName(name: string, sex: number): void {
        //     let c: c2s_change_name_sex = new c2s_change_name_sex();
        //     c.new_name = name;
        //     c.new_sex = sex;
        //     this.sendProto(c);
        // }

        public saveSettingInfo() {
            // let arr = [
            //     gso.isCloseBgSound ? 1 : 0,
            //     gso.isCloseSoundEft ? 1 : 0,
            //     gso.isHideOtherPlayer ? 1 : 0,
            //     gso.isHideOtherPartner ? 1 : 0,
            //     gso.isHideOtherEft ? 1 : 0,
            //     gso.isHideSelfEft ? 1 : 0,
            //     gso.isHideSceneShake ? 1 : 0,
            //     gso.isAutoUseGodSkill ? 1 : 0
            // ];
            // let json = JSON.stringify(arr);
            // let misc: IMiscProxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);
            // misc.setSetting(SettingKey.SetInfo, json);
        }

        //请求返回登录界面
        public sendReLogin() {
            gso.isBack = true;
            let c: c2s_disconnect = new c2s_disconnect();
            this.sendProto(c);
        }

        public get openFuncIdx(): number[] {
            return this._model.openFuncIdx || [];
        }

        /*************************新加的协议**********************/
        /**通用系统数据请求协议*/
        private c2s_open_system_info(openIdxs: number[]): void {
            let msg: c2s_open_system_info = new c2s_open_system_info();
            msg.openIdx = openIdxs;
            this.sendProto(msg);
        }

        /**
         * 属性请求协议
         * @param indexList 属性索引列表
         * @param type 不传该字段 表示请求默认的属性     传1表示请求军团属性
         * @private
         */
        private c2s_common_attr_getinfo(indexList: number[], type?: number): void {
            let msg: c2s_common_attr_getinfo = new c2s_common_attr_getinfo();
            msg.attrindex = indexList;
            if (type) {
                msg.type = type;
            }
            this.sendProto(msg);
        }

        private s2c_common_attr_sendinfo(n: GameNT) {
            let msg: s2c_common_attr_sendinfo = n.body;
            if (msg.list) {
                let indexList: number[] = [];
                for (let i of msg.list) {

                    //应服务器和策划 外显战力计算统一修改
                    //原始的值保留一下
                    // i.attr["showpower_source"] = i.attr.showpower;
                    // //改掉原来原始值的意义
                    // let god = i && i.attr && i.attr.god ? i.attr.god : 0;
                    // let showPower = i && i.attr && i.attr.showpower ? i.attr.showpower.toNumber() : 0;
                    // let power = RoleUtil.getSurfacePower(god, showPower);
                    // i.attr.showpower = Long.fromNumber(power);

                    this._model.attrList[i.attrindex] = i.attr;
                    indexList.push(i.attrindex);
                }
                this.sendNt(MainEvent.UPDATE_COMMON_ATTR, indexList);//监听时候一般不区分index
            }
        }

        /**
         * 通用获取属性接口，不要放在update里面频繁请求，统一通过RoleUtil访问
         * type 传1表示请求军团属性，默认不传
         */
        public getAttr(index: number, type?: number): attributes {
            if (!index) {
                return null;
            }
            let attr = this._model.attrList[index];
            if (!attr) {
                this.c2s_common_attr_getinfo([index], type);
            }
            return attr;
        }

        /**
         * 通用获取属性列表接口，不要放在update里面频繁请求，统一通过RoleUtil访问
         * type 传1表示请求军团属性，默认不传
         */
        public getAttrList(indexList: number[], type?: number): attributes[] {
            if (!indexList || !indexList.length) {
                return null;
            }
            let attrList: attributes[] = [];
            let tmpList: number[] = [];
            for (let index of indexList) {
                let attr = this._model.attrList[index];
                if (!attr) {
                    tmpList.push(index);
                    continue;
                }
                attrList.push(attr);
            }
            if (tmpList.length) {
                this.c2s_common_attr_getinfo(tmpList, type);
            }
            return attrList;
        }

        /**判断是否有某属性，只判断不请求，统一通过RoleUtil访问*/
        public checkAttr(index: number): boolean {
            let attr = this._model.attrList[index];
            return !!attr;
        }

        /**判断是否有某属性，只判断不请求，统一通过RoleUtil访问*/
        public checkAttrList(indexList: number[]): boolean {
            if (!indexList || !indexList.length) {
                return true;
            }
            for (let index of indexList) {
                if (!this.checkAttr(index)) {
                    return false;
                }
            }
            return true;
        }

        /**外显系统属性请求协议，统一通过RoleUtil访问*/
        public c2s_sys_attributes(openIdx: number): void {
            let msg: c2s_sys_attributes = new c2s_sys_attributes();
            msg.sys_id = openIdx;
            this.sendProto(msg);
        }

        //外显系统公用属性
        private s2c_sys_attributes(n: GameNT) {
            let msg: s2c_sys_attributes = n.body;
            if (!msg.attrs) {
                return;
            }
            for(let i of msg.attrs){
                if(i.sys_id == OpenIdx.Huashen){
                    //化神属性需要额外存储下
                    this._model.huashenAttr = i;
                    break;
                }
            }
            this.sendNt(MainEvent.UPDATE_COMMON_SURFACE_ATTR, msg.attrs);
        }
        //化神系统属性
        public get huashenAttr(): sys_attrs {
            return this._model.huashenAttr;
        }

        /*************************登录时候额外请求的协议**********************/
        //请求副本信息
        private c2s_material_get_info() {
            let msg = new c2s_material_get_info();
            this.sendProto(msg);
        }

        //请求禁地副本信息
        private c2s_forbidden_get_info() {
            let msg = new c2s_forbidden_get_info();
            this.sendProto(msg);
        }

        //请求个人boss信息
        private c2s_single_boss_get_info() {
            let msg = new c2s_single_boss_get_info();
            this.sendProto(msg);
        }

        //请求斗法信息
        public c2s_pvp_battle_get_base_info() {
            let msg = new c2s_pvp_battle_get_base_info();
            this.sendProto(msg);

            // let msg2 = new c2s_pvp_battle_group_pk_info();
            // this.sendProto(msg2);
        }

        public c2s_consecrate_info(): void {
            let msg: c2s_consecrate_info = new c2s_consecrate_info();
            this.sendProto(msg);
        }

        public c2s_guild_study_show(): void {
            let msg: c2s_guild_study_show = new c2s_guild_study_show();
            this.sendProto(msg);
        }

        public c2s_guild_xianshou_show():void{
            let msg:c2s_guild_xianshou_show = new c2s_guild_xianshou_show();
            this.sendProto(msg);
        }

        /*************************资源找回**********************/
        public c2s_reward_find_draw(): void {
            let msg: c2s_reward_find_draw = new c2s_reward_find_draw();
            this.sendProto(msg);
        }

        private s2c_reward_find_info(n: GameNT) {
            let msg: s2c_reward_find_info = n.body;
            this._model.findInfos = msg.list || [];
            this.updateFindHint();
            this.sendNt(MainEvent.ON_REWARD_FIND_UPDATE);
        }

        public get findInfos(): reward_find_data[] {
            return this._model.findInfos || [];
        }

        public isFindShow(): boolean {
            return this._model.findInfos && this._model.findInfos.length > 0;
        }

        private updateFindHint(): void {
            let hint = this.isFindShow();
            let hintType = this._model.findHint;
            HintMgr.setHint(hint, hintType);
        }

        //不再提示类型
        public setNotTipsType(type: number, isSel: boolean) {
            this._model.notTipsInfos[type] = isSel;
        }
        public getNotTipsType(type: number): boolean {
            return this._model.notTipsInfos[type] || false;
        }
    }
}
