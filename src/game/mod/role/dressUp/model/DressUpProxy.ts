namespace game.mod.role {
    import base_surface_suit = msg.base_surface_suit;
    import base_surface_item = msg.base_surface_item;
    import DressConfig = game.config.DressConfig;
    import s2c_base_surface_open_ui = msg.s2c_base_surface_open_ui;
    import GameNT = base.GameNT;
    import c2s_base_surface_change = msg.c2s_base_surface_change;
    import c2s_base_surface_lvup = msg.c2s_base_surface_lvup;
    import attributes = msg.attributes;
    import c2s_base_surface_open_ui = msg.c2s_base_surface_open_ui;

    /**
     * 装扮proxy
     */
    export class DressUpProxy extends ProxyBase {
        private _model: DressUpModel;
        /**根据数据计算选中的*/
        public selectedIndex: number;

        initialize(): void {
            super.initialize();
            this._model = new DressUpModel();
            this.onProto(s2c_base_surface_open_ui, this.s2c_base_surface_open_ui, this);
        }

        /**
         * 发送装扮信息
         */
        public c2s_base_surface_open_ui() {
            let req: c2s_base_surface_open_ui = new c2s_base_surface_open_ui();
            this.sendProto(req);
        }

        /**
         * 发送装扮穿戴/卸下
         * @param index
         */
        public c2s_base_surface_change(index: Long) {
            let req: c2s_base_surface_change = new c2s_base_surface_change();
            req.index = index;
            this.sendProto(req);
        }

        /**
         * 发送装扮升星/激活
         * @param index
         * @param cost_idx
         */
        public c2s_base_surface_lvup(index: Long, cost_idx: Long) {
            let req: c2s_base_surface_lvup = new c2s_base_surface_lvup();
            req.index = index;
            req.cost_idx = cost_idx;
            this.sendProto(req);
        }

        /**装扮信息*/
        private s2c_base_surface_open_ui(n: GameNT) {
            let msg: s2c_base_surface_open_ui = n.body;
            if (!msg) return;
            if (msg.chat_frame != undefined) {
                this._model.chat_frame = msg.chat_frame;
            }
            if (msg.head_frame != undefined) {
                this._model.head_frame = msg.head_frame;
            }
            if (msg.head != undefined) {
                this._model.head = msg.head;
            }
            if (msg.chat_frame != undefined) {
                this._model.chat_frame = msg.chat_frame;
            }
            if (msg.surface_list != undefined) {
                if (!this._model.surface_map) {
                    this._model.surface_map = {};
                }
                for (let f of msg.surface_list) {
                    this._model.surface_map[f.index.toNumber()] = f;
                }
            }
            if (msg.surface_suit_list != undefined) {
                for (let f of msg.surface_suit_list) {
                    let old = this.getDressSuitByIdx(f.index.toNumber());
                    if (old) {
                        this._model.surface_suit_list[this._model.surface_suit_list.indexOf(old)] = f;
                    } else {
                        this._model.surface_suit_list.push(f);
                    }
                }
            }
            this.updateHint();
            this.sendNt(DressUpEvent.DRESS_UP_INFO_UPDATE);
        }

        private dressCfgList: DressConfig[][] = null;

        /**
         * 获取装扮配置
         */
        // public getDressData(): DressConfig[][] {
        //     if (this.dressCfgList) {
        //         return this.dressCfgList;
        //     }
        //     let map: { [type: number]: DressConfig[] } = {};
        //     let configs: DressConfig[] = getConfigListByName(ConfigName.DressUp);
        //     for (let cfg of configs) {
        //         let sort = cfg.sort;
        //         if (!sort) {
        //             continue;
        //         }
        //         if (map[sort] == null) {
        //             map[sort] = [];
        //         }
        //         map[sort].push(cfg);
        //     }
        //
        //     let list: DressConfig[][] = [];
        //     for (let key in map) {
        //         list.push(map[key]);
        //     }
        //
        //     this.dressCfgList = list;
        //     return list;
        // }

        public getDressList(type1: DressUpType, type2: number): DressConfig[] {
            let cfgArr: DressConfig[] = getConfigListByName(ConfigName.DressUp);
            let list = cfgArr.filter(v => {
                return this.getDressTypeByIdx(v.index) == type1 && v.type == type2;
            });
            let _proxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let defIcon = [this.head, this.head_frame, this.chat_frame];
            let dress: number = defIcon[type1 - 1];
            let dressList: DressConfig[] = [];
            let upList: DressConfig[] = [];
            let actList: DressConfig[] = [];
            let actedList: DressConfig[] = [];
            let notAct: DressConfig[] = [];
            for (let cfg of list) {
                if (cfg.index == dress) {
                    dressList.push(cfg);
                    continue;
                }
                let info = this.getDressByIdx(cfg.index);
                if (cfg.activation_param) {
                    let shenling = _proxy.getInfoByIndex(cfg.show_param[0]);
                    let isActed: boolean = shenling && shenling.star >= cfg.show_param[1];
                    if (!isActed) {
                        continue;
                    }
                } else {
                    if (!cfg.show && !info) {
                        continue;
                    }
                }
                if (this.canActOrUpStar(cfg.index)) {
                    if (info && info.lv) {
                        upList.push(cfg)
                    } else {
                        actList.push(cfg);
                    }
                    continue;
                }
                if (info && info.lv) {
                    actedList.push(cfg);
                    continue;
                }
                notAct.push(cfg);
            }
            upList.sort(this.defaultSort);
            actList.sort(this.defaultSort);
            actedList.sort(this.defaultSort);
            notAct.sort(this.defaultSort);
            return dressList.concat(upList, actList, actedList, notAct);
        }

        private defaultSort(a: DressConfig, b: DressConfig): number {
            if (a.quality == b.quality) {
                return a.index - b.index;
            }
            return a.quality - b.quality;
        }

        public getDressLen(type1: DressUpType, type2: number): number {
            let list = this.getDressList(type1, type2);
            return list && list.length || 0;
        }

        public getDressActLen(type1: DressUpType, type2: number): number {
            let list = this.getDressList(type1, type2);
            let count: number = 0;
            for (let cfg of list) {
                let _info: base_surface_item = this.getDressByIdx(cfg.index);
                if (_info && _info.lv) {
                    count++;
                }
            }
            return count;
        }

        public getDressListByType(type1: DressUpType): DressConfig[] {
            let cfgArr: DressConfig[] = getConfigListByName(ConfigName.DressUp);
            return cfgArr.filter(v => {
                return this.getDressTypeByIdx(v.index) == type1;
            });
        }

        public getTypes(type1: DressUpType): number[] {
            let cfgArr: DressConfig[] = getConfigListByName(ConfigName.DressUp);
            let list: DressConfig[] = cfgArr.filter(v => {
                return this.getDressTypeByIdx(v.index) == type1;
            });
            let _proxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let types: number[] = [];
            for (let cfg of list) {
                if (type1 == DressUpType.Head && cfg.type == 4) {
                    let info = _proxy.getInfoByIndex(cfg.show_param[0]);
                    let isActed = info && info.star >= cfg.show_param[1];
                    if (!isActed) {
                        continue;
                    }
                }
                if (types.indexOf(cfg.type) == -1) {
                    if (!!cfg.show || !!this.getDressByIdx(cfg.index)) {
                        types.push(cfg.type);
                    }
                }
            }
            return types.sort((a, b) => { return a - b });
        }

        /**获取分类，DE两位  1:头像 2:相框 3:气泡*/
        public getDressTypeByIdx(idx: number): DressUpType {
            return PropData.getPropParse(idx, PropParseType.PropType);
        }

        /**
         * 根据index获取装扮信息
         * @param idx 时装index
         */
        public getDressByIdx(idx: number): base_surface_item {
            return this._model.surface_map[idx];
        }

        /**
         * 根据index获装扮套装信息
         * @param idx 时装index
         */
        public getDressSuitByIdx(idx: number): base_surface_suit {
            let suit_list: base_surface_suit[] = this._model.surface_suit_list;
            if (!suit_list || !suit_list.length) {
                return null;
            }
            for (let f of suit_list) {
                if (f && f.index.toNumber() == idx) {
                    return f;
                }
            }
            return null;
        }

        /** 获取装扮总属性*/
        public getDressAttrs(index: number): attributes {
            let map = this._model.surface_map;
            if (index) {
                let _info: base_surface_item = map[index];
                if (!_info) {
                    return null;
                }
                return _info.attr;
            }
            let _attrs: attributes = new msg.attributes;
            _attrs.showpower = Long.fromValue(0);
            for (let key in map) {
                let f = map[key] as base_surface_item;
                if (!f) {
                    continue;
                }
                let _baseAttr: attributes = f.attr;
                if (!_baseAttr) {
                    continue;
                }
                if (f.attr && f.attr.showpower) {
                    _attrs.showpower = _attrs.showpower.add(f.attr.showpower);
                }
                let keys: string[] = TextUtil.getAttrOrderKeys(_baseAttr);
                for (let i = 0, len = keys.length; i < len; i++) {
                    let attrType: string = keys[i];
                    let val: number = f.attr ? Number(f.attr[attrType]) : 0;
                    if (!_attrs[attrType]) {
                        _attrs[attrType] = val;
                    } else {
                        _attrs[attrType] += val;
                    }
                }
            }
            return _attrs;
        }

        get curIdxList(): number[] {
            return this._model.curIdxList;
        }

        get head(): number {
            return this._model.head.toNumber();
        }

        get head_frame(): number {
            return this._model.head_frame.toNumber();
        }

        get chat_frame(): number {
            return this._model.chat_frame.toNumber();
        }

        //---------------------------------------红点------------------------

        protected onBagUpdateByHeadType(n: GameNT): void {
            let list = n.body as number[];
            if (!list || !list.length || list.indexOf(ConfigHead.DressUp) < 0) {
                return;
            }
            this.updateHint();
        }

        public getTypeHint(type1: number, type2: number): boolean {
            let cfgArr: DressConfig[] = this.getDressList(type1, type2);
            for (let cfg of cfgArr) {
                let bool: boolean = this.canActOrUpStar(cfg.index);
                if (bool) {
                    return bool;
                }
            }
            return false;
        }

        public updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.DressUp)) {
                return;
            }
            for (let key in this._model.roots) {
                let root: string[] = this._model.roots[key];
                let cfgArr: DressConfig[] = this.getDressListByType(+key);
                HintMgr.setHint(false, root);
                for (let cfg of cfgArr) {
                    let bool: boolean = this.canActOrUpStar(cfg.index);
                    if (bool) {
                        HintMgr.setHint(bool, root);
                    }
                }
            }
            // let isHint = false;
            // let _data: DressConfig[][] = this.getDressData();
            // if (!_data || !_data.length) {
            //     return;
            // }
            // for (let _d of _data) {
            //     if (!_d || !_d.length) {
            //         continue;
            //     }
            //     for (let cfg of _d) {
            //         isHint = this.canActOrUpStar(cfg.index);
            //         if (isHint) {
            //             break;
            //         }
            //     }
            //     if (isHint) {
            //         break;
            //     }
            // }
            // HintMgr.setHint(isHint, [ModName.Role, NewRoleViewType.DressUpMain]);
        }

        /**能否激活或升星*/
        public canActOrUpStar(idx: number): boolean {
            let cfg: DressConfig = getConfigByNameId(ConfigName.DressUp, idx);
            let info = this.getDressByIdx(idx);
            if (!cfg || !info) {
                return false;
            }
            let len: number = cfg.material.length;
            if (!len) {
                return false;
            }
            // let cost = cfg.material[0];
            let cost: number[];
            if (len == 1) {
                cost = cfg.material[0];
            } else if (len == 2) {
                cost = cfg.material[Number(info)];
            } else {
                cost = cfg.material[Number(info && info.lv)];
            }
            if (!cost) {
                return false;
            }
            return BagUtil.checkPropCnt(cost[0], cost[1]);
        }
    }
}