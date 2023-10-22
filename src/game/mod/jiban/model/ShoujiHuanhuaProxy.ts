namespace game.mod.jiban {

    import c2s_huanhua_act = msg.c2s_huanhua_act;
    import GameNT = base.GameNT;
    import s2c_huanhua_get_list = msg.s2c_huanhua_get_list;
    import BodyJibanConfig = game.config.BodyJibanConfig;
    import huanhua_datas = msg.huanhua_datas;
    import c2s_equip_gather_act = msg.c2s_equip_gather_act;
    import s2c_equip_gather_get_list = msg.s2c_equip_gather_get_list;
    import GatherConfig = game.config.GatherConfig;
    import equip_gather_datas = msg.equip_gather_datas;

    /**
     * @description 角色面板的收集和幻化系统
     */
    export class ShoujiHuanhuaProxy extends ProxyBase implements IShoujiHuanhuaProxy {
        private _model: ShoujiHuanhuaModel;
        public headTypes: number[] = [ConfigHead.Body, ConfigHead.Weapon, ConfigHead.Wing];
        private _actJibanMap: { [index: number]: boolean } = {};//激活的外显
        private _actJibanEquipMap: { [index: number]: boolean } = {};

        public get model(): ShoujiHuanhuaModel {
            return this._model;
        }

        onStartReconnect() {
            super.onStartReconnect();
            this._actJibanMap = {};
            this._actJibanEquipMap = {};
        }

        initialize(): void {
            super.initialize();
            this._model = new ShoujiHuanhuaModel();
            this.onProto(s2c_huanhua_get_list, this.s2c_huanhua_get_list, this);
            this.onProto(s2c_equip_gather_get_list, this.s2c_equip_gather_get_list, this);
        }

        /**
         * 激活
         * @param oper 激活类型 0 激活单件 1 激活套装
         * @param index 套装index
         * @param waixian_id 外显id
         */
        public c2s_huanhua_act(oper: number, index: number, waixian_id: number): void {
            let msg = new c2s_huanhua_act();
            msg.oper = oper;
            msg.index = index;
            if (waixian_id != null) {
                msg.waixian_id = waixian_id;
                this._actJibanMap[waixian_id] = true;
            }
            this.sendProto(msg);
        }

        //幻化数据
        private s2c_huanhua_get_list(n: GameNT): void {
            let msg = n.body as s2c_huanhua_get_list;
            if (msg && msg.list != null) {
                for (let item of msg.list) {
                    this._model.huanhua_map[item.index] = item;

                    if (item.waixian_id && item.waixian_id.length) {
                        for (let waixianId of item.waixian_id) {
                            if (this._actJibanMap[waixianId]) {
                                ViewMgr.getIns().showSuccessTips(SuccessTipsType.Act);
                                this._actJibanMap[waixianId] = null;
                                delete this._actJibanMap[waixianId];
                            }
                        }
                    }
                }
            }
            this.updateHuanHuaHint();
            this.sendNt(JiBanEvent.ON_HUANHUA_INFO_UPDATE);
        }

        /**
         * 激活
         * oper 1 激活 2 领取大奖
         */
        public c2s_equip_gather_act(index: number, oper: number): void {
            let msg = new c2s_equip_gather_act();
            msg.index = index;
            msg.oper = oper;
            if (oper == 1) {
                this._actJibanEquipMap[index] = true;
            }
            this.sendProto(msg);
        }

        //收集数据
        private s2c_equip_gather_get_list(n: GameNT): void {
            let msg = n.body as s2c_equip_gather_get_list;
            if (msg && msg.list != null) {
                for (let item of msg.list) {
                    this._model.equip_map[item.index] = item;

                    let partAry = this.getPartAry(item.index);
                    if (this._actJibanEquipMap[item.index] && item && item.act_cnt
                        && partAry.indexOf(item.act_cnt) > -1) {
                        ViewMgr.getIns().showSuccessTips(SuccessTipsType.Act);
                        this._actJibanEquipMap[item.index] = null;
                        delete this._actJibanEquipMap[item.index];
                    }
                }
            }
            this.updateGatherHint();
            this.sendNt(JiBanEvent.ON_GATHER_INFO_UPDATE);
        }

        /**=============================== 协议end ===============================*/

        public getBodyJiBanCfgList(): BodyJibanConfig[] {
            let cfgs: BodyJibanConfig[] = getConfigListByName(ConfigName.BodyJiban);
            cfgs.sort((a, b) => a.order - b.order);
            return cfgs;
        }

        public getHuanHuaInfo(index: number): huanhua_datas {
            return this._model.huanhua_map[index];
        }

        // 套装是否激活
        public isActed(index: number): boolean {
            let info = this._model.huanhua_map[index];
            return info && info.is_act != null && info.is_act == 2;
        }

        //转生对应的index
        private _rebirthIdxMap: { [index: number]: number } = {};

        public getIdxByRebirthLv(rebirthLv: number): number {
            if (this._rebirthIdxMap && this._rebirthIdxMap[rebirthLv] != null) {
                return this._rebirthIdxMap[rebirthLv];
            }
            let cfgs: GatherConfig[] = getConfigListByName(ConfigName.Gather);
            this._rebirthIdxMap = {};
            for (let cfg of cfgs) {
                this._rebirthIdxMap[cfg.level] = cfg.index;
            }
            return this._rebirthIdxMap[rebirthLv];
        }

        public getGatherCfgList(): GatherConfig[] {
            let rebirthLv = RoleUtil.getRebirthLv();
            let showRebirthLv: number;
            if (rebirthLv <= 9) {
                //1-9转只显示1-9转的
                showRebirthLv = 9;
            } else {
                //>9后，就显示到当前转，后续的转不展示。假若当前转的收集完成后，可显示下一转的
                showRebirthLv = rebirthLv;
                let index = this.getIdxByRebirthLv(rebirthLv);
                if (this.isActedGather(index)) {
                    showRebirthLv += 1;
                }
            }
            let cfgs: GatherConfig[] = getConfigListByName(ConfigName.Gather);
            let list: GatherConfig[] = [];
            for (let cfg of cfgs) {
                if (cfg.level <= showRebirthLv) {
                    list.push(cfg);
                }
            }
            list.sort((a, b) => a.order - b.order);
            return list;
        }

        public getGatherInfo(index: number): equip_gather_datas {
            return this._model.equip_map[index];
        }

        //能否收集
        public canGather(index: number): boolean {
            let list = this.getGatherCfgList();
            //第一个默认可以收集
            if (list && list[0] && list[0].index == index) {
                return true;
            }
            let preIndex = 0;//前一套
            for (let i = 1; i < list.length; i++) {
                let cfg = list[i];
                if (cfg && cfg.index == index) {
                    preIndex = list[i - 1].index;
                    break;
                }
            }
            //前一套收集了
            if (this.isActedGather(preIndex)) {
                return true;
            }
            return false;
        }

        /**
         * 是否已收集
         * 领取大奖点了激活才有十件套属性
         * @param index
         */
        public isActedGather(index: number): boolean {
            let info = this.getGatherInfo(index);
            if (!info || !info.gather_id) {
                return false;
            }
            let cfg: GatherConfig = getConfigByNameId(ConfigName.Gather, index);
            if (!cfg) {
                return false;
            }
            let act_cnt = cfg.attribute[cfg.attribute.length - 1][0];
            return info.act_cnt == act_cnt && info.is_get == 2;
        }

        /**进度条收集阶段*/
        public partMap: { [index: number]: number[] } = {};

        public getPartAry(index: number): number[] {
            if (this.partMap[index]) {
                return this.partMap[index];
            }
            let cfg: GatherConfig = getConfigByNameId(ConfigName.Gather, index);
            if (!cfg) {
                return [];
            }
            let ary = [];
            for (let item of cfg.attribute) {
                ary.push(item[0]);
            }
            this.partMap[index] = ary;
            return ary;
        }

        //任务收集指引
        public canTaskActGather(): boolean {
            if (!GuideMgr.getIns().hasGuideKey([GuideKey.RoleCollectAct])) {
                return false;
            }
            let task = TaskUtil.getMainTask();
            let index = 1;//套数index
            let cnt = task.target;//套数数量
            //todo，可激活数量大于等于cnt
            return this.canActByCnt(index, cnt);
        }

        /**
         * 套装的x件套属性能否激活
         * @param index
         * @param cnt
         */
        public canActByCnt(index: number, cnt: number): boolean {
            let gatherCnt = this.getGatherCnt(index);
            return gatherCnt >= cnt;
        }

        //已收集的数量
        public getGatherCnt(index: number): number {
            let info = this.getGatherInfo(index);
            return info && info.gather_id ? info.gather_id.length : 0;
        }

        /**
         * 能否激活收集的套装
         * @param index
         * @param isTips
         */
        public canActGather(index: number, isTips = false): boolean {
            if (!this.canGather(index)) {
                return false;
            }
            let info: equip_gather_datas = this.getGatherInfo(index);
            if (this.isActedGather(index)) {
                return false;
            }
            if (!info || !info.gather_id) {
                if (isTips) {
                    PromptBox.getIns().show(`收集不足`);
                }
                return false;
            }
            let cfg: GatherConfig = getConfigByNameId(ConfigName.Gather, index);
            if (!cfg || !cfg.fashion_part) {
                return false;
            }
            let act_cnt = info.act_cnt || 0;//当前激活的x件套
            let gather_cnt = info.gather_id.length;//当前收集的数量
            let part_ary = this.getPartAry(index);//进度条阶段
            //存在阶段激活情况，不包含大奖阶段
            if (act_cnt < gather_cnt && act_cnt != part_ary[part_ary.length - 2]) {
                for (let i = act_cnt + 1; i <= gather_cnt; i++) {
                    if (part_ary.indexOf(i) > -1) {
                        return true;
                    }
                }
            }
            if (gather_cnt < cfg.fashion_part.length) {
                if (isTips) {
                    PromptBox.getIns().show(`收集不足`);
                }
                return false;
            }

            // 需求变更：先激活10件套属性，再领取奖励。原来是领取才能激活 2023.1.12
            // if (info && info.is_get != null && info.is_get != 2) {
            //     if (isTips) {
            //         PromptBox.getIns().show(`请领取大奖`);
            //     }
            //     return false;
            // }

            return true;
        }

        /**能否领取大奖*/
        public canGetBigReward(index: number): boolean {
            if (!this.canGather(index)) {
                return false;
            }
            if (this.isActedGather(index)) {
                return false;
            }
            let info = this.getGatherInfo(index);
            return info && info.is_get == 1;

            // 需求变更
            // let cfg: GatherConfig = getConfigByNameId(ConfigName.Gather, index);
            // if (!info || !cfg) {
            //     return false;
            // }
            // let part = this.getPartAry(index);
            // // gather_id长度等于部位长度，is_get=1，act_cnt等于倒数第二个阶段
            // if (info.gather_id && info.gather_id.length == cfg.fashion_part.length
            //     && info.is_get == 1 && info.act_cnt == part[part.length - 2]) {
            //     return true;
            // }
            // return false;
        }

        /**=============================== hint ===============================*/

        //单个外显激活，刷新红点
        protected onSurfaceInfoUpdate(n: GameNT): void {
            let type = n.body as number;
            if (this.headTypes.indexOf(type) > -1) {
                this.updateHuanHuaHint();
            }
        }

        //能否激活幻化icon
        public canActHuanHuaIcon(index: number, waixianId: number): boolean {
            let info = this.getHuanHuaInfo(index);
            if (info && info.waixian_id.indexOf(waixianId) > -1) {
                return false;
            }
            return SurfaceUtil.isAct(waixianId);
        }

        /**幻化套装红点*/
        public getHuanHuaHint(index: number): boolean {
            let cfg: BodyJibanConfig = getConfigByNameId(ConfigName.BodyJiban, index);
            if (!cfg) {
                return false;
            }
            for (let id of cfg.fashion_part) {
                if (this.canActHuanHuaIcon(index, id)) {
                    return true;
                }
            }
            let info = this.getHuanHuaInfo(index);
            return info && info.is_act && info.is_act == 1;
        }

        /**幻化红点*/
        public updateHuanHuaHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.RoleHuanhua)) {
                return;
            }
            let list = this.getBodyJiBanCfgList();
            let hint = false;
            for (let cfg of list) {
                if (cfg && this.getHuanHuaHint(cfg.index)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, [ModName.Role, NewRoleViewType.RoleMain + OpenIdx.RoleHuanhua]);
        }

        /**收集红点*/
        public updateGatherHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.RoleCollect)) {
                return;
            }
            let list = this.getGatherCfgList();
            let hint = false;
            for (let cfg of list) {
                if (this.canActGather(cfg.index) || this.canGetBigReward(cfg.index)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, [ModName.Role, NewRoleViewType.RoleMain + OpenIdx.RoleCollect]);
        }

        protected onOpenFuncUpdate(n: GameNT) {
            let idxs = n.body as number[];
            if (idxs.indexOf(OpenIdx.RoleHuanhua) > -1) {
                this.updateHuanHuaHint();
            }
            if (idxs.indexOf(OpenIdx.RoleCollect) > -1) {
                this.updateGatherHint();
            }
        }

    }
}