namespace game.mod.more {

    import ZhanduiTansuoMapConfig = game.config.ZhanduiTansuoMapConfig;
    import c2s_zhandui_xujietansuo_quyu_info = msg.c2s_zhandui_xujietansuo_quyu_info;
    import GameNT = base.GameNT;
    import s2c_zhandui_xujietansuo_base_info = msg.s2c_zhandui_xujietansuo_base_info;
    import xujietansuo_challenge_records = msg.xujietansuo_challenge_records;
    import LanDef = game.localization.LanDef;
    import ZhanduiTansuoTypeConfig = game.config.ZhanduiTansuoTypeConfig;
    import c2s_zhandui_xujietansuo_role_click = msg.c2s_zhandui_xujietansuo_role_click;
    import xujietansuo_layer_row_struct = msg.xujietansuo_layer_row_struct;
    import xujietansuo_row_grid_struct = msg.xujietansuo_row_grid_struct;
    import TimeMgr = base.TimeMgr;
    import zhandui_legion_type_struct = msg.zhandui_legion_type_struct;
    import c2s_zhandui_legion_shangzheng = msg.c2s_zhandui_legion_shangzheng;
    import s2c_zhandui_legion_shangzheng_list = msg.s2c_zhandui_legion_shangzheng_list;
    import zhandui_legion_attribute = msg.zhandui_legion_attribute;
    import s2c_zhandui_legion_result_info = msg.s2c_zhandui_legion_result_info;
    import s2c_zhandui_legion_battle_info = msg.s2c_zhandui_legion_battle_info;
    import zhandui_battle_round_struct = msg.zhandui_battle_round_struct;
    import facade = base.facade;
    import xujietansuo_struct = msg.xujietansuo_struct;
    import s2c_zhandui_xujietansuo_records_info = msg.s2c_zhandui_xujietansuo_records_info;
    import s2c_zhandui_legion_rank_list = msg.s2c_zhandui_legion_rank_list;
    import s2c_zhandui_xujietansuo_single_grid = msg.s2c_zhandui_xujietansuo_single_grid;
    import zhandui_legion_rank_struct = msg.zhandui_legion_rank_struct;
    import s2c_zhandui_kuanmai_pvp_ret = msg.s2c_zhandui_kuanmai_pvp_ret;

    /**
     * @description 墟界探索系统
     */
    export class XujieTansuoProxy extends ProxyBase implements IXujieTansuoProxy {
        private _model: XujieTansuoModel;

        initialize(): void {
            super.initialize();
            this._model = new XujieTansuoModel();
            this.onProto(s2c_zhandui_xujietansuo_base_info, this.s2c_zhandui_xujietansuo_base_info, this);
            this.onProto(s2c_zhandui_xujietansuo_records_info, this.s2c_zhandui_xujietansuo_records_info, this);
            this.onProto(s2c_zhandui_legion_shangzheng_list, this.s2c_zhandui_legion_shangzheng_list, this);
            this.onProto(s2c_zhandui_legion_battle_info, this.s2c_zhandui_legion_battle_info, this);
            this.onProto(s2c_zhandui_legion_result_info, this.s2c_zhandui_legion_result_info, this);
            this.onProto(s2c_zhandui_legion_rank_list, this.s2c_zhandui_legion_rank_list, this);
            this.onProto(s2c_zhandui_xujietansuo_single_grid, this.s2c_zhandui_xujietansuo_single_grid, this);

            this.onProto(s2c_zhandui_kuanmai_pvp_ret, this.s2c_zhandui_kuanmai_pvp_ret, this);
        }

        //退出战队
        public onExitZhanduiTeam(): void {
            if (this._model) {
                this._model.exitTeam();
            }
        }

        /// 请求某个地图区域信息
        public c2s_zhandui_xujietansuo_quyu_info(type: number, layer: number): void {
            let msg = new c2s_zhandui_xujietansuo_quyu_info();
            msg.map_index = type;
            msg.layer = layer;
            this.sendProto(msg);
        }

        /// 推送当前所属战队探索信息（当前最新进度）
        private s2c_zhandui_xujietansuo_base_info(n: GameNT): void {
            let msg = n.body as s2c_zhandui_xujietansuo_base_info;
            if (msg.oper == 1) {
                this._model.team_count = msg.team_count || 0;
                this._model.now_map_index = msg.now_map_index != null ? msg.now_map_index : 0;
                this._model.now_layer = msg.now_layer != null ? msg.now_layer : 0;
                if (msg.map_datas != null) {
                    let type = msg.map_datas.map_index;
                    if (!this._model.map_layer_datas_map[type]) {
                        this._model.map_layer_datas_map[type] = {};
                    }
                    this._model.map_layer_datas_map[type][msg.map_datas.layer] = msg.map_datas;//区域layer缓存
                }
            } else {
                if (msg.team_count != null) {
                    this._model.team_count = msg.team_count;
                }
                if (msg.map_datas != null) {
                    let type = msg.map_datas.map_index;
                    if (!this._model.map_layer_datas_map[type]) {
                        this._model.map_layer_datas_map[type] = {};
                    }
                    this._model.map_layer_datas_map[type][msg.map_datas.layer] = msg.map_datas;
                }
                if (msg.now_map_index != null) {
                    this._model.now_map_index = msg.now_map_index;
                }
                if (msg.now_layer != null) {
                    this._model.now_layer = msg.now_layer;
                }
            }
            this.updateHint();
            this.sendNt(MoreEvent.ON_UPDATE_XUJIETANSUO_BASE_INFO);
        }

        private s2c_zhandui_xujietansuo_records_info(n: GameNT): void {
            let msg = n.body as s2c_zhandui_xujietansuo_records_info;
            if (msg.rewards_records != null) {
                this._model.rewards_records = msg.rewards_records;
            } else {
                this._model.rewards_records = [];
            }
            this.updateHint();
            this.sendNt(MoreEvent.ON_UPDATE_XUJIETANSUO_RECORDS_INFO);
        }

        /**
         * 玩家操作墟界探索
         * @param button_type 1为领取战利品  2商店格子购买  3上阵神灵 4领取远征奖励 5挑战怪物 6扫荡怪物 7请求排行榜
         * @param type
         * @param layer
         * @param row
         * @param pos
         * @param shenlingList
         * @param cnt 扫荡次数
         * @private
         */
        public c2s_zhandui_xujietansuo_role_click(button_type: XujieTansuoOperType, type?: number, layer?: number, row?: number, pos?: number, shenlingList?: Long[], cnt?: number): void {
            let msg = new c2s_zhandui_xujietansuo_role_click();
            msg.button_type = button_type;
            if (type != null) {
                msg.map_index = type;
            }
            if (layer != null) {
                msg.layer = layer;
            }
            if (row != null) {
                msg.row = row;
            }
            if (pos != null) {
                msg.pos = pos;
            }
            if (shenlingList != null) {
                msg.unitlist = shenlingList;
            }
            if (cnt != null) {
                msg.use_sweep_cnt = cnt;
            }
            this.sendProto(msg);
        }

        private s2c_zhandui_legion_rank_list(n: GameNT): void {
            let msg = n.body as s2c_zhandui_legion_rank_list;
            if (msg.tansuo_ranks != null) {
                this._model.tansuo_ranks = msg.tansuo_ranks;
            }
            if (msg.my_team_rank != null) {
                this._model.my_team_rank = msg.my_team_rank;
            }
            this.sendNt(MoreEvent.ON_UPDATE_XUJIETANSUO_RANK_INFO);
        }

        /// 更新单个格子数据
        private s2c_zhandui_xujietansuo_single_grid(n: GameNT): void {
            let msg = n.body as s2c_zhandui_xujietansuo_single_grid;
            if (msg.map_index == null) {
                return;
            }

            //当前操作区域更新
            let type = msg.map_index;
            let layer = msg.layer;
            let row = msg.row;
            let pos = msg.pos;

            let mapData = this.getMapLayerData(type, layer);
            if (mapData && mapData.row_list) {
                let rowList = mapData.row_list || [];
                for (let rowInfo of rowList) {
                    if (rowInfo && rowInfo.row == row) {
                        let gridList = rowInfo.grid_list || [];
                        for (let i = 0; i < gridList.length; i++) {
                            let posData = gridList[i];
                            if (posData && posData.grid_pos == pos) {
                                gridList[i] = msg.grid;
                                break;
                            }
                        }
                        break;
                    }
                }
            }

            //远征数据处理
            if (msg.update_type && msg.update_type == 1) {
                this._model.expedition_info = msg;
                // 判断远征是否已领取奖励，领取就置空
                if (msg.grid != null) {
                    let endTime = msg.grid.endtime;
                    if (endTime && endTime.eq(Long.ZERO)) {
                        this._model.expedition_info = null;
                    }
                }
            }

            this.updateHint();
            this.sendNt(MoreEvent.ON_UPDATE_XUJIETANSUO_BASE_INFO);
            // this.sendNt(MoreEvent.ON_UPDATE_XUJIETANSUO_SINGLE_GRID_INFO);
        }

        /**================================== 协议end ==================================*/

        //某区域类型的层数据
        public getMapLayerData(type: number, layer: number): xujietansuo_struct {
            let data = this._model.map_layer_datas_map[type];
            if (!data) {
                return null;
            }
            return data[layer] ? data[layer] : null;
        }

        //当前参与搜索的战队数量
        public get team_count(): number {
            return this._model.team_count || 0;
        }

        //战利品记录
        public get rewards_records(): xujietansuo_challenge_records[] {
            return this._model.rewards_records || [];
        }

        //当前区域类型
        public get now_type(): number {
            return this._model.now_map_index || 1;
        }

        //当前区域的当前层数
        public get now_layer(): number {
            return this._model.now_layer || 1;
        }

        //玩家所属战队数据
        public get my_team_rank(): zhandui_legion_rank_struct {
            return this._model.my_team_rank;
        }

        //正在远征格子的数据
        public get expedition_info() {
            let info = this._model.expedition_info;
            if (info && info.grid) {
                let endTime = info.grid.endtime;
                if (endTime && endTime.eq(Long.ZERO)) {
                    return null;//再做一步判断，领取了奖励返回null
                }
            }
            return info;
        }

        //排名
        public getRankInfo(rankNo: number): zhandui_legion_rank_struct {
            let list = this._model.tansuo_ranks || [];
            for (let item of list) {
                if (item && item.rank_num == rankNo) {
                    return item;
                }
            }
            return null;
        }

        private _typeList: number[];

        //区域类型数据
        public getTypeList(): number[] {
            if (this._typeList) {
                return this._typeList;
            }
            let list: number[] = [];
            let cfgs: ZhanduiTansuoTypeConfig[] = getConfigListByName(ConfigName.ZhanduiTansuoType);
            for (let cfg of cfgs) {
                list.push(cfg.type);
            }
            return this._typeList = list;
        }

        //区域类型配置
        public getTypeCfg(type: number): ZhanduiTansuoTypeConfig {
            return getConfigByNameId(ConfigName.ZhanduiTansuoType, type);
        }

        //排配置
        public getCfgByRow(type: number, layer: number, row: number): ZhanduiTansuoMapConfig {
            let obj = getConfigByNameId(ConfigName.ZhanduiTansuoMap, type);
            return obj && obj[layer * 100 + row];
        }

        //每个格子的配置数据 index = type * 1000000 + layer * 1000 + row * 10 + col
        private _gridColMap: { [index: number]: number[] } = {};

        //获取每个格子的配置数据
        public getGridByCol(type: number, layer: number, row: number, col: number): number[] {
            let buildId = type * 1000000 + layer * 1000 + row * 10 + col;
            if (this._gridColMap[buildId]) {
                return this._gridColMap[buildId];
            }
            let cfg = this.getCfgByRow(type, layer, row);
            if (!cfg || !cfg.grid) {
                return null;
            }
            let grid: number[];
            for (let i = 0; i < cfg.grid.length; i++) {
                if (i + 1 == col) {
                    grid = cfg.grid[i];
                    break;
                }
            }
            this._gridColMap[buildId] = grid;
            return grid;
        }

        //某排是否解锁
        public isActedByRow(type: number, layer: number, row: number): boolean {
            let nowType = this.now_type;//正在进行的区域
            if (type < nowType) {
                return true;//前面区域必定解锁了
            }
            if (type > nowType) {
                return false;//后面区域未解锁
            }

            let nowLayer = this.now_layer;//正在进行的区域的层
            if (layer < nowLayer) {
                return true;//当前区域的前层数必定解锁
            }
            if (layer > nowLayer) {
                return false;//后面层数未解锁
            }

            let lastRow = row - 1;
            if (lastRow == 0) {
                return true;//第一排默认解锁
            }

            //判断上一排是否挑战成功过
            let rowInfo = this.getRowInfo(type, layer, lastRow);
            let rowMap: { [pos: number]: msg.xujietansuo_row_grid_struct } = {};
            if (rowInfo) {
                for (let grid of rowInfo) {
                    rowMap[grid.grid_pos] = grid;
                }
            }
            let cfg = this.getCfgByRow(type, layer, lastRow);
            if (cfg && cfg.grid) {
                for (let pos = 0; pos < cfg.grid.length; pos++) {
                    let type = cfg.grid[pos][0];
                    if (type == XujieTansuoGridStatus.Monster && rowMap[pos + 1] && rowMap[pos + 1].grid_type == XujieTansuoGridStatus.Null) {
                        return true;
                    }
                }
            }
            return false;
        }

        //某层是否解锁
        public isActedByLayer(type: number, layer: number, isTips = false): boolean {
            let nowType = this.now_type;//正在进行的区域
            //前面区域的必定解锁了
            if (type < nowType) {
                return true;
            }
            //后面的区域都未开启
            if (type > nowType) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.xujietansuo_tips10));
                }
                return false;
            }
            //当前区域的判断
            let nowLayer = this.now_layer;//正在进行的区域的层
            let isActed = layer <= nowLayer;
            if (!isActed) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.xujietansuo_tips10));
                }
                return false;
            }
            return isActed;
        }

        //某区域是否解锁
        public isActedByType(type: number, isTips = false): boolean {
            let nowType = this.now_type;//正在进行的区域
            let isActed = type <= nowType;
            if (!isActed) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.xujietansuo_tips9));
                }
                return false;
            }
            return isActed;
        }

        //某区域是否可达最大层级
        public canGotoMaxLayer(type: number): boolean {
            let nowType = this.now_type;//正在进行的区域
            if (type < nowType) {
                return true;
            }
            if (type > nowType) {
                return false;
            }
            if (type == nowType) {
                let nowLayer = this.now_layer;
                let maxLayer = this.getMaxLayerByType(type);
                if (nowLayer >= maxLayer) {
                    return true;
                }
            }
            return false;
        }

        //区域-层-排 是否激活缓存 index = type * 100000 + layer * 100 + row
        public getProgressRowMap: { [index: number]: boolean } = {};

        /**
         * 排能否获取当前进度（击杀一个怪物即可）
         * @param type
         * @param layer
         * @param row
         */
        private canGetProgressByRow(type: number, layer: number, row: number): boolean {
            let buildId = type * 100000 + layer * 100 + row;
            if (this.getProgressRowMap[buildId]) {
                return this.getProgressRowMap[buildId];
            }

            if (!this.isActedByLayer(type, layer)) {
                return false;
            }
            let rowInfo = this.getRowInfo(type, layer, row);
            let rowMap: { [pos: number]: msg.xujietansuo_row_grid_struct } = {};
            if (rowInfo) {
                for (let grid of rowInfo) {
                    rowMap[grid.grid_pos] = grid;
                }
            }
            let cfg = this.getCfgByRow(type, layer, row);
            if (cfg && cfg.grid) {
                for (let pos = 0; pos < cfg.grid.length; pos++) {
                    let type = cfg.grid[pos][0];
                    if (type == XujieTansuoGridStatus.Monster && rowMap[pos + 1] && rowMap[pos + 1].grid_type == XujieTansuoGridStatus.Null) {
                        this.getProgressRowMap[buildId] = true;
                        return true;//有一个怪物挑战成功过
                    }
                }
            }
            return false;
        }

        /**
         * 某区域进度
         * 外部“区域总进度”显示：非boss排每排x%，第12排进度y%，x和y读配置，配在参数表内
         * @param type
         */
        public getProgressByType(type: number): number {
            let nowType = this.now_type;
            if (type < nowType) {
                return 100;//上个进度100%才能进入下个进度，故小于当前区域，即100%
            }
            if (type > nowType) {
                return 0;
            }
            let rst = 0;
            let cfgObj = getConfigByNameId(ConfigName.ZhanduiTansuoMap, type);
            for (let key in cfgObj) {
                let rowIdx = +key;
                let cfg = cfgObj[rowIdx] as ZhanduiTansuoMapConfig;
                let layer = Math.floor(rowIdx / 100) % 10;
                if (layer < this.now_layer) {
                    rst += (+cfg.jindu);
                    continue;
                }
                let row = rowIdx % 100;
                if (this.canGetProgressByRow(type, layer, row)) {
                    rst += (+cfg.jindu);
                }
            }
            // return +(rst.toFixed(2));
            return Math.floor(rst);
        }

        /**
         * 获取某区域某层进度
         * 每一排仅一个战斗格计算进度，只要本排战胜1个怪物即可获得本排进度，未完全击杀怪物不获得进度。
         * 如本排4个怪物，挑战1个并击杀后获得8%的层进度，击杀本排第二个后依然为8%
         * 每层内部的“排进度”显示：非boss排每排进度8%，第12排进度12%，11排+boss合计共100%
         * @param type
         * @param layer
         */
        public getProgressByLayer(type: number, layer: number): number {
            let mapData = this.getMapLayerData(type, layer);
            if (!mapData) {
                return 0;
            }
            let rst = 0;
            let rowList: xujietansuo_layer_row_struct[] = mapData.row_list || [];
            for (let rowInfo of rowList) {
                let gridList = rowInfo.grid_list || [];
                let gridMap: { [pos: number]: xujietansuo_row_grid_struct } = {};
                for (let grid of gridList) {
                    gridMap[grid.grid_pos] = grid;
                }
                for (let item of gridList) {
                    let isCalc = false;
                    if (rowInfo.row == XujieTansuoRowCnt && (item.grid_type == XujieTansuoGridStatus.Null || item.grid_type == XujieTansuoGridStatus.Transfer)) {
                        rst += 12;//boss进度
                        isCalc = true;
                    } else {
                        let cfgRow = this.getCfgByRow(type, layer, rowInfo.row);//配置上每排数据
                        if (!cfgRow || !cfgRow.grid) {
                            rst += 8;
                            continue;
                        }
                        let grids = cfgRow.grid;
                        for (let pos = 0; pos < grids.length; pos++) {
                            let posData = grids[pos];
                            if (posData[0] == XujieTansuoGridStatus.Monster && gridMap[pos + 1] && gridMap[pos + 1].grid_type == XujieTansuoGridStatus.Null) {
                                rst += 8;//格子怪物被击杀
                                isCalc = true;
                                break;//只要一个怪物被击杀即可
                            }
                        }
                    }
                    if (isCalc) {
                        break;
                    }
                }
            }
            return rst;
        }

        //获取进度，用于排行榜
        public getRankProgressByRow(type: number, layer: number, row: number): number {
            let cfgObj: { [idx: number]: ZhanduiTansuoMapConfig } = getConfigByNameId(ConfigName.ZhanduiTansuoMap, type);
            let layerRowId = layer * 100 + row;
            let cnt = 0;
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
                if (cfg && cfg.layer <= layerRowId) {
                    cnt += (+cfg.jindu);
                }
            }
            // return +(cnt.toFixed(2));
            return Math.floor(cnt);
        }

        //排数据
        public getRowInfo(type: number, layer: number, row: number): xujietansuo_row_grid_struct[] {
            let mapData = this.getMapLayerData(type, layer);
            if (!mapData) {
                return null;
            }
            let rowList = mapData.row_list || [];
            for (let rowInfo of rowList) {
                if (rowInfo.row == row) {
                    return rowInfo.grid_list;
                }
            }
            return null;
        }

        //格子数据
        public getGridInfo(type: number, layer: number, row: number, col: number): xujietansuo_row_grid_struct {
            let mapData = this.getMapLayerData(type, layer);
            if (!mapData) {
                return null;
            }
            let rowList = mapData.row_list || [];
            for (let rowInfo of rowList) {
                if (rowInfo.row != row) {
                    continue;
                }
                let gridList = rowInfo.grid_list || [];
                for (let grid of gridList) {
                    if (grid && grid.grid_pos == col) {
                        return grid;
                    }
                }
            }
            return null;
        }

        //正在远征格子信息
        public getExpeditionGridInfo(): xujietansuo_row_grid_struct {
            let info = this.expedition_info;
            if (info && info.grid) {
                return info.grid;
            }

            //全局遍历获取
            let typeList = this.getTypeList();
            for (let type of typeList) {
                let layerCnt = this.getMaxLayerByType(type);
                for (let layer = 1; layer <= layerCnt; layer++) {
                    let info = this.getExpeditionGridInfoByLayer(type, layer);
                    if (info) {
                        return info;
                    }
                }
            }
            return null;
        }

        //正在远征格子信息或者待领取远征奖励的格子
        public getExpeditionGridInfoByLayer(type: number, layer: number): xujietansuo_row_grid_struct {
            let info = this.expedition_info;
            if (info && info.grid && info.map_index == type && info.layer == layer) {
                return info.grid;
            }

            let mapData = this.getMapLayerData(type, layer);
            if (!mapData) {
                return null;
            }
            let rowList = mapData.row_list || [];
            for (let rowInfo of rowList) {
                let gridList = rowInfo.grid_list || [];
                for (let gridInfo of gridList) {
                    if (!gridInfo || gridInfo.grid_type != XujieTansuoGridStatus.Expedition) {
                        continue;
                    }
                    if (gridInfo && gridInfo.grid_type == XujieTansuoGridStatus.Expedition) {
                        let endTime = gridInfo.endtime ? gridInfo.endtime.toNumber() : 0;
                        if (endTime /*&& TimeMgr.time.serverTimeSecond <= endTime*/) {
                            return gridInfo;
                        }
                    }
                }
            }
            return null;
        }

        //正在远征的格子数据
        public getExpeditionGridItemData(): IXujieTansuoGridItemData {
            let info = this.expedition_info;
            if (info && info.grid) {
                let itemData = {
                    type: info.map_index,
                    layer: info.layer,
                    row: info.row,
                    col: info.pos,
                    status: XujieTansuoGridStatus.Expedition,
                    grid: []
                } as IXujieTansuoGridItemData;
                let cfgRow = this.getCfgByRow(info.map_index, info.layer, info.row);
                if (cfgRow && cfgRow.grid && cfgRow.grid[info.pos - 1]) {
                    itemData.grid = cfgRow.grid[info.pos - 1];
                }
                return itemData;
            }
            return null;
        }

        //正在远征的格子，非0表示有倒计时
        public getExpeditionGridEndTimeByLayer(type: number, layer: number): number {
            let gridInfo = this.getExpeditionGridInfoByLayer(type, layer);
            if (!gridInfo) {
                return 0;
            }
            let endTime = gridInfo.endtime && gridInfo.endtime.toNumber() || 0;
            if (endTime /*&& TimeMgr.time.serverTimeSecond < endTime*/) {
                return endTime;
            }
            return 0;
        }

        private _maxLayerMap: { [type: number]: number } = {};

        //区域总层数
        public getMaxLayerByType(type: number): number {
            if (this._maxLayerMap[type]) {
                return this._maxLayerMap[type];
            }
            let cfgObj: { [index: number]: ZhanduiTansuoMapConfig } = getConfigByNameId(ConfigName.ZhanduiTansuoMap, type);
            if (!cfgObj) {
                return 0;
            }
            let i = 1;
            let cnt = 0;
            while (cfgObj[i * 100 + 1]) {
                cnt++;
                i++;
            }
            return this._maxLayerMap[type] = cnt;
        }

        //获取战利品
        public canGetZhanlipin(isTips = false): boolean {
            let list = this.rewards_records;
            if (!list || !list.length) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.xujietansuo_tips31));
                }
                return false;
            }
            return list && list.length > 0;
        }

        /**============================= hint start =============================*/

        //战利品红点
        public getZhanlipinHint(): boolean {
            return this.canGetZhanlipin();
        }

        //远征红点
        public getExpeditionHint(): boolean {
            let info = this.getExpeditionGridInfo();
            if (!info) {
                return false;
            }
            let endTime = info && info.endtime ? info.endtime.toNumber() : 0;
            let curTime = TimeMgr.time.serverTimeSecond;
            return endTime && curTime >= endTime;
        }

        //能否探索
        public canTansuo(): boolean {
            let cnt = BagUtil.getPropCntByIdx(PropIndex.XujieTansuoling);
            return cnt > 0;
        }

        //探索按钮红点 todo
        public getTansuoHint(): boolean {
            return this.canTansuo() || this.getZhanlipinHint() || this.getExpeditionHint();
        }

        private _gameOrderHint = false;

        //战令红点
        protected onUpdateGivingList(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(GameOrderType.Tansuo) > -1) {
                let hintPath = [ModName.Activity, MainActivityViewType.Giving, MdrTabBtnType.TabBtnType05];
                this._gameOrderHint = HintMgr.getHint(hintPath);
                this.updateGameOrderHint();
            }
        }

        //战令红点
        private updateGameOrderHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XujieTansuo)) {
                return;
            }
            HintMgr.setHint(this._gameOrderHint, this._model.hintPath2);
        }

        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XujieTansuo)) {
                return;
            }

            let layerHint = this.getZhanlipinHint() || this.getExpeditionHint() || this.getZhenrongHint();
            HintMgr.setHint(layerHint, this._model.layerHintPath);

            HintMgr.setHint(layerHint || this.canTansuo(), this._model.hintPath1);

            this.updateGameOrderHint();
        }

        protected onBagUpdateByPropIndex(n: GameNT) {
            let indexs = n.body as number[];
            if (indexs.indexOf(PropIndex.XujieTansuoling) > -1) {
                this.updateHint();
            }
        }

        protected onSurfaceInfoUpdate(n: GameNT): void {
            let type: number = n.body;
            if (type == ConfigHead.Huashen) {
                this.updateHint();
            }
        }

        protected onShenlingInfoUpdate(n: GameNT) {
            this.updateHint();
        }

        protected onOpenFuncUpdate(n: GameNT) {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(OpenIdx.Huashen) > -1 || addIdx.indexOf(OpenIdx.Shenling) > -1) {
                this.updateHint();
            }
        }

        /**============================= hint end =============================*/

        /**============================= 阵容 =============================*/

        //一键上阵，上阵三个大类型
        public sendShangzhenOnekey(): void {
            this.c2s_zhandui_legion_shangzheng(1);
        }

        //一键上阵某类型，或者上阵list的数据
        public sendShangzhen(type: LegionType, operType: number, list?: number[]): void {
            let msg = new zhandui_legion_type_struct();
            msg.itype = type;
            if (list) {
                let longList: Long[] = [];
                for (let id of list) {
                    longList.push(Long.fromValue(id));
                }
                msg.unitlist = longList;
            }
            this.c2s_zhandui_legion_shangzheng(operType, msg);
        }

        //1全部一键上阵   2某类一键上阵  3某类手动上阵或者下载
        private c2s_zhandui_legion_shangzheng(type: number, list?: zhandui_legion_type_struct): void {
            let msg = new c2s_zhandui_legion_shangzheng();
            msg.button_type = type;
            if (list) {
                msg.list = list;
            }
            this.sendProto(msg);
        }

        private s2c_zhandui_legion_shangzheng_list(n: GameNT): void {
            let msg = n.body as s2c_zhandui_legion_shangzheng_list;
            if (msg.list != null) {
                for (let item of msg.list) {
                    this._model.legion_list[item.itype] = item;
                }
            }
            if (msg.attrs != null) {
                this._model.legion_attrs = msg.attrs;
            }
            this.updateHint();
            this.sendNt(MoreEvent.ON_UPDATE_ZHENRONG_INFO);
        }

        //获取上阵类型信息
        public getShangzhenInfo(type: LegionType): zhandui_legion_type_struct {
            return this._model.legion_list[type];
        }

        //某阵容类型上阵id列表
        public getShangzhenIdList(type: LegionType): number[] {
            let list: number[] = [];
            let info = this.getShangzhenInfo(type);
            if (info && info.unitlist) {
                for (let id of info.unitlist) {
                    list.push(id.toNumber());
                }
            }
            return list;
        }

        //军团属性
        public get legion_attr(): zhandui_legion_attribute {
            return this._model.legion_attrs;
        }

        //军团神灵列表
        public get shenling_list() {
            let info = this._model.legion_list[LegionType.Shenling];
            return info && info.unitlist || null;
        }

        //化神开启否
        public isHuashenOpen(isTips = false): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Huashen, isTips)) {
                return false;
            }
            let surfaceProxy: ISurfaceProxy = getProxy(ModName.Surface, ProxyType.Surface);
            let isAct = surfaceProxy.isDefaultAct(ConfigHead.Huashen);
            if (isTips && !isAct) {
                PromptBox.getIns().show(`化神暂未开启`);
                return false;
            }
            return isAct;
        }

        //女神是否开启 todo
        public isNvshenOpen(isTips = false): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.GoddessRecord, true)) {
                return false;
            }
            if (isTips) {
                PromptBox.getIns().show(`暂未开启`);
            }
            return false;

            // let proxy: GoddessRecordProxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);
            // let cfgList: NvshenIndexConfig[] = getConfigListByName(ConfigName.NvshenIndex);
            // let list: number[] = [];
            // for (let cfg of cfgList) {
            //     if (proxy.isAct(cfg.index)) {
            //         list.push(cfg.index);
            //     }
            // }
            // let isAct = list && list.length > 0;
            // if (isTips && !isAct) {
            //     PromptBox.getIns().show(`女神暂未开启`);
            // }
            // return isAct;
        }

        //阵容红点 todo
        public getZhenrongHint(): boolean {
            return this.getZhenrongShenlingHint() || this.getZhenrongHuashenHint();
        }

        //神灵上阵品质要求
        public getShenlingLimitQuality(): number {
            let cfg = GameConfig.getParamConfigById('zhandui_shangzhen');
            return cfg && cfg.value;
        }

        //阵容神灵红点
        public getZhenrongShenlingHint(): boolean {
            let shenlingProxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let shangzhenList: number[] = this.getShangzhenIdList(LegionType.Shenling);
            let maxCnt = LegionTypeCnt[LegionType.Shenling];//可以上阵的神灵个数

            //已上阵的最低阵容仙力
            let minPower: Long;
            shangzhenList.forEach((item) => {
                let info = shenlingProxy.getInfoByIndex(item);
                if (info && info.legion_attr && info.legion_attr.legion_god) {
                    if (minPower == undefined) {
                        minPower = info.legion_attr.legion_god;
                    } else {
                        minPower = minPower.lessThan(info.legion_attr.legion_god) ? minPower : info.legion_attr.legion_god;
                    }
                }
            });

            for (let type of ShenLingTypeAry) {
                let typeList = this.getShenlingList(type);
                if (shangzhenList.length < maxCnt && typeList && typeList.length > 0) {
                    return true;//有可以上阵位置，且有可以上阵的神灵
                }
                for (let id of typeList) {
                    let info = shenlingProxy.getInfoByIndex(id);
                    let legionGod = info && info.legion_attr && info.legion_attr.legion_god ? info.legion_attr.legion_god : null;
                    if (legionGod && minPower != null && legionGod.greaterThan(minPower)) {
                        return true;//阵容仙力比上阵的最低仙力高
                    }
                }
            }
            return false;
        }

        //某类型激活的神灵列表
        public getShenlingList(type: ShenLingType): number[] {
            let list: number[] = [];
            let shenlingProxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let limitQuality = this.getShenlingLimitQuality();
            let infoList = shenlingProxy.getActedListByType(type);
            let shangzhenList: number[] = this.getShangzhenIdList(LegionType.Shenling);
            for (let info of infoList) {
                if (!info) {
                    continue;
                }
                let cfg = shenlingProxy.getShenLingCfg(info.index.toNumber());
                //过滤品质不满足和已上阵军团的
                if (!cfg || cfg.quality < limitQuality || shangzhenList.indexOf(info.index.toNumber()) > -1) {
                    continue;
                }
                list.push(info.index.toNumber());
            }
            return list;
        }

        //阵容化神红点
        public getZhenrongHuashenHint(): boolean {
            let surfaceProxy: ISurfaceProxy = getProxy(ModName.Surface, ProxyType.Surface);
            let shangzhenList: number[] = this.getShangzhenIdList(LegionType.Huashen);
            let maxCnt = LegionTypeCnt[LegionType.Huashen];//可以上阵的个数

            let minPower: Long;
            shangzhenList.forEach((id) => {
                let info = surfaceProxy.getSurfacePerInfo(id);
                if (info && info.legion_attr && info.legion_attr.legion_god) {
                    if (minPower == undefined) {
                        minPower = info.legion_attr.legion_god;
                    } else {
                        minPower = minPower.lessThan(info.legion_attr.legion_god) ? minPower : info.legion_attr.legion_god;
                    }
                }
            });

            let huashenList = this.getZhenrongHuashenList();
            if (shangzhenList.length < maxCnt && huashenList && huashenList.length > 0) {
                return true;
            }
            for (let id of huashenList) {
                let info = surfaceProxy.getSurfacePerInfo(id);
                let legionGod = info && info.legion_attr && info.legion_attr.legion_god ? info.legion_attr.legion_god : null;
                if (legionGod && minPower != null && legionGod.greaterThan(minPower)) {
                    return true;
                }
            }
            return false;
        }

        //化神id列表
        public getZhenrongHuashenList(): number[] {
            let surfaceProxy: ISurfaceProxy = getProxy(ModName.Surface, ProxyType.Surface);
            let cfgList = surfaceProxy.getSurfaceCfgList(ConfigHead.Huashen, 1);
            let shangzhenList = this.getShangzhenIdList(LegionType.Huashen);
            let list: number[] = [];
            for (let cfg of cfgList) {
                let star = surfaceProxy.getSurfacePerStar(cfg.index);
                if (!star) {
                    continue;
                }
                if (shangzhenList.indexOf(cfg.index) > -1) {
                    continue;
                }
                list.push(cfg.index);
            }
            return list;
        }

        /**============================= 阵容end =============================*/

        /**============================= 回合制 =============================*/

        /// 各个回合战斗记录
        private s2c_zhandui_legion_battle_info(n: GameNT): void {
            let msg = n.body as s2c_zhandui_legion_battle_info;
            if (msg.round_records != null) {
                this._model.round_records = msg.round_records;
            }
            if (msg.myself_info != null) {
                this._model.myself_info = msg.myself_info;
            } else {
                this._model.myself_info = null;
            }
            if (msg.target_info != null) {
                this._model.target_info = msg.target_info;
            } else {
                this._model.target_info = null;
            }
            facade.showView(ModName.More, MoreViewType.TBSFight);
            // this.sendNt(MoreEvent.ON_UPDATE_TBS_INFO);
        }

        ///战斗结束，结算界面信息 todo 前端播放完全部动作，再处理结算界面
        private s2c_zhandui_legion_result_info(n: GameNT): void {
            let msg = n.body as s2c_zhandui_legion_result_info;
            if (msg != null) {
                this._model.result_info = msg;
            }
            // this.sendNt(MoreEvent.ON_UPDATE_TBS_RESULT_INFO);
        }

        //回合战斗记录
        public get round_records(): zhandui_battle_round_struct[] {
            return this._model.round_records || [];
        }

        //回合战队记录，清空处理
        public set round_records(records: zhandui_battle_round_struct[]) {
            this._model.round_records = records;
        }

        //结算信息
        public get result_info(): s2c_zhandui_legion_result_info {
            return this._model.result_info;
        }

        public set result_info(data: s2c_zhandui_legion_result_info | null) {
            this._model.result_info = data;
        }

        //我方role_id
        public get myself_id(): Long {
            return this._model.myself_info ? this._model.myself_info.role_id : null;
        }

        //我方信息
        public get myself_info() {
            return this._model.myself_info;
        }

        //是否是我方
        public isMyself(id: Long): boolean {
            let myId = this.myself_id;
            return myId && id && myId.equals(id)
        }

        //对手id（玩家role_id或者boss_id）
        public get target_id() {
            if (this._model.target_info.role_id) {
                return this._model.target_info.role_id;
            }
            return this._model.target_info.boss_id;
        }

        //对手是玩家
        public get target_info() {
            return this._model.target_info;
        }

        //两者速度相同
        public get is_legion_speed_equal() {
            let myInfo = this.myself_info;
            let targetInfo = this.target_info;
            let mySpeed = myInfo && myInfo.legion_data && myInfo.legion_data.legion_speed ? myInfo.legion_data.legion_speed : null;
            let targetSpeed = targetInfo && targetInfo.legion_data && targetInfo.legion_data.legion_speed ? targetInfo.legion_data.legion_speed : null;
            return mySpeed && targetSpeed && mySpeed.equals(targetSpeed);
        }

        //我方速度大
        public get is_legion_speed_greater() {
            let myInfo = this.myself_info;
            let targetInfo = this.target_info;
            let mySpeed = myInfo && myInfo.legion_data && myInfo.legion_data.legion_speed ? myInfo.legion_data.legion_speed : null;
            let targetSpeed = targetInfo && targetInfo.legion_data && targetInfo.legion_data.legion_speed ? targetInfo.legion_data.legion_speed : null;
            return mySpeed && targetSpeed && mySpeed.greaterThan(targetSpeed);
        }

        /**============================= 回合制end =============================*/

        //---------------------------矿脉协议-------------------------

        private s2c_zhandui_kuanmai_pvp_ret(n: GameNT): void {
            this._model.msg = n.body as s2c_zhandui_kuanmai_pvp_ret;
        }

        public get msg(): s2c_zhandui_kuanmai_pvp_ret {
            return this._model.msg;
        }

        public set msg(data: s2c_zhandui_kuanmai_pvp_ret) {
            this._model.msg = data;
        }

        //----------------------------------------------------

        //当前点击探索的区域
        public get seledArea(): number {
            return this._model.seledArea;
        }

        public set seledArea(area: number) {
            this._model.seledArea = area;
        }
    }
}