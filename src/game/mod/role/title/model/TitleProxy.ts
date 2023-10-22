namespace game.mod.role {
    import c2s_title_info = msg.c2s_title_info;
    import c2s_title_operate = msg.c2s_title_operate;
    import GameNT = base.GameNT;
    import s2c_title_info = msg.s2c_title_info;
    import title_info = msg.title_info;
    import s2c_title_update = msg.s2c_title_update;
    import TitleConfig = game.config.TitleConfig;

    export class TitleProxy extends ProxyBase {
        private _model: TitleModel;

        public get model(): TitleModel {
            return this._model;
        }

        get using(): number {
            return this._model.using.toNumber();
        }

        onStartReconnect() {
            super.onStartReconnect();
            this._reqType = [];
        }

        initialize(): void {
            this._model = new TitleModel();
            super.initialize();
            this.onProto(s2c_title_info, this.s2c_title_info, this);
            this.onProto(s2c_title_update, this.s2c_title_update, this);
        }

        /** 称号信息请求*/
        public c2s_title_info() {
            let req: c2s_title_info = new c2s_title_info();
            this.sendProto(req);
        }

        /**
         * 称号操作
         * @param index  称号index
         * @param operate 操作  1:升星，2:幻化，3:卸下，4：佩戴，5：取消幻化，6：激活
         */
        public c2s_title_operate(index: number, operate: number) {
            let req: c2s_title_operate = new c2s_title_operate();
            req.index = Long.fromNumber(index);
            req.operate = operate;
            this.sendProto(req);
        }

        /** 称号信息返回*/
        private s2c_title_info(n: GameNT) {
            let msg: s2c_title_info = n.body;
            if (!msg) {
                return;
            }
            if (msg.using != null) {
                this._model.using = msg.using;
            }
            if (!this._model.title_list) {
                this._model.title_list = {};
            }
            if (msg.title_list != null) {
                for (let title of msg.title_list) {
                    this._model.title_list[title.index.toNumber()] = title;
                }
            }
            this.updateHint();
            this.sendNt(TitleEvent.TITLE_INFO_UPDATE);
        }

        /** 称号信息更新*/
        private s2c_title_update(n: GameNT) {
            let msg: s2c_title_update = n.body;
            if (!msg) return;
            let preUsing: Long = null;
            if (msg.using != null) {
                let using = this._model.using;
                if (using && using.neq(msg.using)) {
                    preUsing = using;
                }
                this._model.using = msg.using;
            }
            if (msg.title_item != null) {
                let id = msg.title_item.index.toNumber();
                this._model.title_list[id] = msg.title_item;
                let cfg: TitleConfig = this.getTitleCfgByIdx(id);
                if (cfg) {
                    this.updateHint(cfg.type);
                }
            }
            this.sendNt(TitleEvent.TITLE_INFO_UPDATE, [preUsing, msg.using, msg.title_item]);
        }

        /**
         * 根据index获取称号信息
         * @param idx 称号index
         */
        public getTitleInfoByIdx(idx: number): title_info {
            return this._model.title_list[idx];
        }

        public getTitleCfgByIdx(idx: number): TitleConfig {
            return getConfigByNameId(ConfigName.Title, idx);
        }

        public canActivateOrUpStar(index: number): boolean {
            let info = this.getTitleInfoByIdx(index);
            let cfg = this.getTitleCfgByIdx(index);
            if (!cfg || !cfg.skin_material || (info && info.star && cfg.star_max <= info.star)) {
                return false;
            }
            //有时效的不能升星
            if (info && info.star && info.del_time) {
                return false;
            }
            let cost = cfg.skin_material[0];
            return BagUtil.checkPropCnt(cost[0], cost[1]);
        }

        protected onBagUpdateByHeadType(n: GameNT): void {
            let list: number[] = n.body;
            if (!list || !list.length || list.indexOf(ConfigHead.Title) < 0) {
                return;
            }
            this.updateHint();
        }

        /**三种称号类型*/
        public updateHint(type?: number): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Title)) {
                return;
            }
            for (let i = 1; i <= 3; i++) {
                if (type && i != type) {
                    continue;
                }
                let hint = false;
                let infoList = this.getTitleCfgListByType(i);
                for (let info of infoList) {
                    if (this.canActivateOrUpStar(info.index)) {
                        hint = true;
                        break;
                    }
                }
                HintMgr.setHint(hint, [ModName.Role, NewRoleViewType.TitleMain, '0' + i]);
            }
        }

        private _cfgMap: { [type: number]: TitleConfig[] } = {};

        /**根据类型获取对应的称号列表，未排序*/
        private getTitleCfgListByType(type = 1): TitleConfig[] {
            if (this._cfgMap[type]) {
                return this._cfgMap[type];
            }
            this._cfgMap = {};
            let cfgs: TitleConfig[] = getConfigListByName(ConfigName.Title);
            for (let cfg of cfgs) {
                if (!this._cfgMap[cfg.type]) {
                    this._cfgMap[cfg.type] = [];
                }
                this._cfgMap[cfg.type].push(cfg);
            }
            return this._cfgMap[type] || [];
        }

        /**
         * 根据类型获取排序的称号列表
         */
        public getSortedTitleListByType(type: number): TitleConfig[] {
            let list = this.getTitleCfgListByType(type) || [];
            let rst: TitleConfig[] = [];
            let actedList: TitleConfig[] = [];
            let notActedList: TitleConfig[] = [];
            for (let cfg of list) {
                let info = this.getTitleInfoByIdx(cfg.index);
                if (cfg.index == this.using) {
                    rst.unshift(cfg);
                } else if (info && info.star > 0) {
                    actedList.push(cfg);
                } else if (this.canActivateOrUpStar(cfg.index)) {
                    rst.push(cfg);
                } else {
                    notActedList.push(cfg);
                }
            }
            rst = rst.concat(actedList, notActedList);
            return rst;
        }

        //获取未激活的称号
        public getNotActedList(type: number): TitleConfig[] {
            let list = this.getTitleCfgListByType(type);
            let rst: TitleConfig[] = [];
            for (let cfg of list) {
                let info = this.getTitleInfoByIdx(cfg.index);
                if (!info) {
                    rst.push(cfg);
                }
            }
            return rst;
        }

        //全都请求过则设为1
        private _reqType: number[] = [];

        //未激活称号属性，还未请求
        public haveNotReqAttr(type: number): boolean {
            if (this._reqType[type] != null && this._reqType[type] == 1) {
                return false;
            }
            let list = this.getNotActedList(type);
            for (let cfg of list) {
                let attrs = RoleUtil.checkAttrList(cfg.attr_id);
                if (!attrs) {
                    return true;//某个称号的属性还没有请求
                }
            }
            this._reqType[type] = 1;//只有全部属性都请求过，才会赋值。一般第二次就会赋值了
            return false;
        }

        private _typeAtteList: { [type: number]: number[] } = {};

        //某类型称号的全部属性id
        public getAttrIdList(type: number): number[] {
            if (this._typeAtteList && this._typeAtteList[type]) {
                return this._typeAtteList[type];
            }
            let idList: number[] = [];
            let cfgList: TitleConfig[] = this.getTitleCfgListByType(type);
            for (let cfg of cfgList) {
                if (!cfg || !cfg.attr_id) {
                    continue;
                }
                let info = this.getTitleInfoByIdx(cfg.index);
                if (info && info.attrs) {
                    continue;
                }
                let attrIds = cfg.attr_id;
                for (let id of attrIds) {
                    if (idList.indexOf(id) < 0) {
                        idList.push(id);
                    }
                }
            }
            this._typeAtteList[type] = idList;
            return idList;
        }

        //有倒计时的称号，需开启定时器
        public haveDelTime(type: number): boolean {
            let cfgList: TitleConfig[] = this.getTitleCfgListByType(type);
            for (let cfg of cfgList) {
                if (!cfg) {
                    continue;
                }
                let info = this.getTitleInfoByIdx(cfg.index);
                if (info && info.del_time) {
                    return true;
                }
            }
            return false;
        }
    }
}