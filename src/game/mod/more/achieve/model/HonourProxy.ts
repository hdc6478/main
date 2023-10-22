namespace game.mod.more {

    import HonourConfig = game.config.HonourConfig;
    import GameNT = base.GameNT;
    import s2c_honour_get_reward = msg.s2c_honour_get_reward;
    import honour_info = msg.honour_info;
    import c2s_honour_get_info = msg.c2s_honour_get_info;

    /**
     * @description 荣耀系统
     */
    export class HonourProxy extends ProxyBase {
        private _model: HonourModel;

        initialize(): void {
            super.initialize();
            this._model = new HonourModel();
            this.onProto(s2c_honour_get_reward, this.s2c_honour_get_reward, this);
        }

        //请求类型信息
        public c2s_honour_get_info(type: HonourType): void {
            let msg = new c2s_honour_get_info();
            msg.type = type;
            this.sendProto(msg);
        }

        private s2c_honour_get_reward(n: GameNT): void {
            let msg = n.body as s2c_honour_get_reward;
            if (msg.info != null) {
                for (let item of msg.info) {
                    //一级map
                    let type = item.type;
                    let obj = this._model.typeInfo[type];
                    if (!obj) {
                        this._model.typeInfo[type] = obj = {};
                    }
                    //二级map存储
                    if (item.info != null) {
                        for (let subItem of item.info) {
                            obj[subItem.index] = subItem;
                        }
                    }
                }
            }
            this.updateHint();
            this.sendNt(MoreEvent.ON_UPDATE_HONOUR_INFO);
        }

        /**=========================协议end=========================*/

        /**大类信息*/
        public getInfoByType(type: HonourType): { [index: number]: honour_info } {
            return this._model.typeInfo[type];
        }

        /**大类下某index的信息*/
        public getInfoByTypeIndex(type: HonourType, index: number): honour_info {
            let typeInfo = this.getInfoByType(type);
            return typeInfo && typeInfo[index] || null;
        }

        //配置列表
        public getCfgList(type: HonourType): HonourConfig[] {
            if (this._model.typeCfgMap[type]) {
                return this._model.typeCfgMap[type];
            }
            let list: HonourConfig[] = [];
            let cfgObj: { [index: number]: HonourConfig } = getConfigByNameId(ConfigName.Honour, type);
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
                list.push(cfg);
            }
            this._model.typeCfgMap[type] = list;
            return list;
        }

        //配置
        public getCfg(type: HonourType, index: number): HonourConfig {
            let cfgObj: { [index: number]: HonourConfig } = getConfigByNameId(ConfigName.Honour, type);
            return cfgObj && cfgObj[index] || null;
        }

        //list数据源
        public getListData(type: HonourType): IHonourItemData[] {
            let list: IHonourItemData[] = [];
            let cfgList = this.getCfgList(type) || [];
            for (let cfg of cfgList) {
                list.push({
                    type,
                    cfg,
                    info: this.getInfoByTypeIndex(type, cfg.index)
                });
            }
            return list;
        }

        /**大类下某index的红点*/
        public getHintByTypeIndex(type: HonourType, index: number): boolean {
            let info = this.getInfoByTypeIndex(type, index);
            if (info && info.is_finish == 1) {
                return false; //已领完，无剩余名额
            }
            let cfg = this.getCfg(type, index);
            if (cfg && cfg.target) {
                return TaskUtil.canRewardDraw(TaskUtil.getTask(cfg.target));
            }
            return false;
        }

        /**大类红点*/
        public getHintByType(type: HonourType): boolean {
            let cfgList = this.getCfgList(type);
            for (let cfg of cfgList) {
                if (this.getHintByTypeIndex(type, cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        //更新红点，如果后期加了其他HonourType，再自行修改红点使之适配 todo
        private updateHint(): void {
            let hint = this.getHintByType(HonourType.Honour);
            HintMgr.setHint(hint, this._model.hintPathObj[HonourType.Honour]);
        }

        protected onTaskHint(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Honour) >= 0) {
                this.updateHint();
            }
        }
    }
}