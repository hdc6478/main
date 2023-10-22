namespace game.mod.surface {

    import c2s_lingchong_oper = msg.c2s_lingchong_oper;
    import s2c_lingchong_item = msg.s2c_lingchong_item;
    import GameNT = base.GameNT;
    import XianchongConfig = game.config.XianchongConfig;
    import lingchong_item = msg.lingchong_item;
    import c2s_lingchong_get_task_reward = msg.c2s_lingchong_get_task_reward;
    import s2c_lingchong_task_list = msg.s2c_lingchong_task_list;
    import RepetitionTaskConfig = game.config.RepetitionTaskConfig;
    import lingchong_task_item = msg.lingchong_task_item;

    /**
     * @description 灵宠系统
     */
    export class LingChongProxy extends ProxyBase implements ILingChongProxy {
        private _model: LingChongModel;
        private _actList: number[] = [];//请求激活的灵宠index

        public get model(): LingChongModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new LingChongModel();
            this.onProto(s2c_lingchong_item, this.s2c_lingchong_item, this);
            this.onProto(s2c_lingchong_task_list, this.s2c_lingchong_task_list, this);
        }

        /**
         * 幻化激活/升星、领取激活礼包
         * @param index
         * @param oper 1为激活升星，2为领取激活礼包
         */
        public c2s_lingchong_oper(index: number, oper: number): void {
            let msg = new c2s_lingchong_oper();
            msg.index = Long.fromNumber(index);
            msg.oper = oper;
            if (this._actList && this._actList.indexOf(index) < 0 && oper == 1) {
                this._actList.push(index);
            }
            this.sendProto(msg);
        }

        public s2c_lingchong_item(n: GameNT): void {
            let msg = n.body as s2c_lingchong_item;
            if (!msg) {
                return;
            }
            if (msg.lingchong_list != null) {

                let size = msg.lingchong_list.length;
                let oldInfo: lingchong_item;
                let item = msg.lingchong_list[0];//第一个
                if (size == 1) {
                    oldInfo = this._model.list[item.index.toNumber()];
                }

                for (let info of msg.lingchong_list) {
                    let index = info.index.toNumber();
                    if (this._actList && this._actList.length && this._actList.indexOf(index) > -1) {
                        let isShowSurfaceTips = false;
                        //外显激活弹窗
                        if (info.star == 1) {
                            isShowSurfaceTips = true;
                            ViewMgr.getIns().showSurfaceTips(index);
                        }
                        //升星成功弹窗
                        if (info.star != 0) {
                            let cfg = this.getConfig(index);
                            let curAttr = info.attr;//当前属性
                            let lastAttr = RoleUtil.getAttr(cfg.active_attr[info.star - 2]);//上一星的属性
                            let curAttrAry: string[] = [];
                            let lastAttrAry: string[] = [];
                            let attrKeys = TextUtil.getAttrOrderKeys(curAttr);
                            for (let key of attrKeys) {
                                let curVal = curAttr[key] || 0;
                                let lastVal = lastAttr && lastAttr[key] || 0;
                                let name = TextUtil.getAttrsText(key);
                                curAttrAry.push(TextUtil.addColor('+' + curVal, BlackColor.GREEN));
                                lastAttrAry.push(name + ' ' + TextUtil.addColor('+' + lastVal, BlackColor.GREEN));
                            }
                            let upStarData: UpStarData = {
                                star: info.star,
                                attrDesc0: lastAttrAry.join('\n'),
                                attrDesc1: curAttrAry.join('\n')
                            };
                            if (isShowSurfaceTips) {
                                this._upStarData = upStarData;
                            } else {
                                this._upStarData = null;
                                ViewMgr.getIns().showUpStarTips(upStarData);
                            }
                        }
                        this._actList.splice(this._actList.indexOf(index), 1);
                    }
                    this._model.list[info.index.toNumber()] = info;
                }

                let newInfo = this._model.list[item.index.toNumber()];
                if (oldInfo && newInfo && oldInfo.state != 2 && newInfo.state == 2) {
                    //更新激活礼包状态
                    this.sendNt(MainEvent.UPDATE_BASE_REWARD_MDR_STATE, newInfo.state);
                }
            }

            this.sendNt(SurfaceEvent.LING_CHONG_INFO_UPDATE);
            this.updateHint();
        }

        private _upStarData: UpStarData;

        protected onSurfaceTipsHide(): void {
            if (this._upStarData) {
                let data = RoleUtil.clone(this._upStarData);
                ViewMgr.getIns().showUpStarTips(data);
                this._upStarData = null;
            }
        }

        /**
         * 领取任务
         * @param index 灵宠index
         */
        public c2s_lingchong_get_task_reward(index: number): void {
            let msg = new c2s_lingchong_get_task_reward();
            msg.index = Long.fromNumber(index);
            this.sendProto(msg);
        }

        public s2c_lingchong_task_list(n: GameNT): void {
            let msg = n.body as s2c_lingchong_task_list;
            if (msg.task_item != null) {
                for (let item of msg.task_item) {
                    let index = item.lingchong_id.toNumber();
                    if (!this._model.task_list[index]) {
                        this._model.task_list[index] = {};
                    }
                    this._model.task_list[index][item.task_index] = item;
                }
            }
            this.updateHint();
            this.sendNt(SurfaceEvent.LING_CHONG_INFO_UPDATE);
        }

        /**==========================================================================*/

        public getInfo(index: number): lingchong_item {
            return this._model.list[index];
        }

        public isMaxStar(index: number): boolean {
            let cfg = this.getConfig(index);
            let info = this.getInfo(index);
            if (!cfg) {
                return false;
            }
            return info && info.star >= cfg.cost.length;
        }

        public canUpStar(index: number, isTips = false): boolean {
            if (this.isMaxStar(index)) {
                if (isTips) {
                    PromptBox.getIns().show(`已达最大星级`);
                }
                return false;
            }
            let cfg = this.getConfig(index);
            if (!cfg || !cfg.cost) {
                return false;
            }
            let info = this.getInfo(index);
            let curStar = info ? info.star + 1 : 1;//当前星级
            let cost = cfg.cost[curStar - 1];
            return BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        private isActed(index: number): boolean {
            let info = this.getInfo(index);
            return info && info.star > 0;
        }

        public getTaskInfo(index: number): { [task_index: number]: lingchong_task_item } {
            return this._model.task_list[index];
        }

        /**灵宠对应的所有任务可领取次数叠加*/
        public getTreasureReceiveCnt(index: number): number {
            let taskInfo = this.getTaskInfo(index);
            if (!taskInfo) {
                return 0;
            }
            let cnt = 0;
            for (let taskId in taskInfo) {
                let taskCfg = this.getTaskConfig(+taskId);
                if (!taskCfg) {
                    continue;
                }
                cnt += Math.floor(taskInfo[taskId].step / taskCfg.target);
            }
            return cnt;
        }

        /**================================= config =================================*/

        /**灵宠配置，根据类型分类*/
        private _cfgMap: { [type: number]: { [littleType: number]: XianchongConfig[] } } = {};

        public getConfigListByType(type: number, littleType: number): XianchongConfig[] {
            if (this._cfgMap[type] && this._cfgMap[type][littleType]) {
                return this._cfgMap[type][littleType];
            }
            this._cfgMap = {};
            let cfgs: XianchongConfig[] = getConfigListByName(ConfigName.Lingchong);
            for (let cfg of cfgs) {
                if (!cfg || !cfg.show) {
                    continue;
                }
                if (!this._cfgMap[cfg.type]) {
                    this._cfgMap[cfg.type] = {};
                }
                if (!this._cfgMap[cfg.type][cfg.type_little]) {
                    this._cfgMap[cfg.type][cfg.type_little] = [];
                }
                this._cfgMap[cfg.type][cfg.type_little].push(cfg);
            }
            return this._cfgMap[type][littleType] || [];
        }

        public getConfig(index: number): XianchongConfig {
            return getConfigByNameId(ConfigName.Lingchong, index);
        }

        public getTaskConfig(index: number): RepetitionTaskConfig {
            return getConfigByNameId(ConfigName.RepetitionTask, index);
        }

        private _maxStar: number;

        public getMaxStar(index?: number): number {
            if (this._maxStar) {
                return this._maxStar;
            }
            let cfg = this.getConfig(index);
            this._maxStar = cfg && cfg.cost ? cfg.cost.length : 5;
            return this._maxStar;
        }

        /**================================= hint =================================*/

        /**激活礼包*/
        public getRewardHint(index: number): boolean {
            let info = this.getInfo(index);
            return info && info.state == 1;
        }

        /**远古神兽的宝藏红点*/
        public getTreasureHint(index: number): boolean {
            let cfg = this.getConfig(index);
            if (!cfg || cfg.type != 2) {
                return false;
            }
            let info = this.getInfo(index);
            if (!info || !info.star) {
                return false;
            }
            let cnt = this.getTreasureReceiveCnt(index);
            return cnt > 0;
        }

        /**单个灵宠红点：激活和升星，激活礼包，宝藏*/
        public getSingleHint(index: number): boolean {
            return this.getRewardHint(index) || this.canUpStar(index)
                || this.getTreasureHint(index);
        }

        /**1:灵宠  2:远古神兽*/
        public getHintByType(type: number, littleType: number): boolean {
            let cfgs = this.getConfigListByType(type, littleType);
            if (!cfgs || !cfgs.length) {
                return false;
            }
            for (let cfg of cfgs) {
                if (this.getSingleHint(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        //激活，升星红点
        public getActOrUpHintByType(type: number, littleType: number): boolean {
            let cfgs = this.getConfigListByType(type, littleType);
            if (!cfgs || !cfgs.length) {
                return false;
            }
            for (let cfg of cfgs) {
                if (this.canUpStar(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Lingchong)) {
                return;
            }
            HintMgr.setHint(this.getHintByType(1, 1), this._model.mainHintPath);
            HintMgr.setHint(this.getHintByType(2, 1), this._model.ygshHintPath1);
            HintMgr.setHint(this.getHintByType(2, 2), this._model.ygshHintPath2);
        }

        /**碎片更新*/
        protected onBagUpdateByPropTypeAndSubType(n: GameNT): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Lingchong)) {
                return;
            }
            let list: { [type: number]: number[] } = n.body;
            for (let type in list) {
                if ((+type) == PropType.Surface) {
                    this.updateHint();
                    break;
                }
            }
        }

    }
}