namespace game.mod.more {

    import ZhanduiTansuoMapConfig = game.config.ZhanduiTansuoMapConfig;
    import TimeMgr = base.TimeMgr;

    export class XujieTansuoGridView extends BaseStageEventItem {
        /**
         * 从上到下
         * 前两行分别是1+2结构
         *      命名规则：12_1
         *              11_1, 11_2
         * 后面10行，分布是3+4结构
         *      命名规则：10_1, 10_2, 10_3
         *              9_1, 9_2, 9_3, 9_4
         *              ......
         */
        public item12_1: game.mod.more.XujieTansuoGridItem;

        private _proxy: XujieTansuoProxy;
        private _expeditionItemList: XujieTansuoGridItem[] = [];//远征格子

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoGridSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XujieTansuo);
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
        }

        /**
         * 更新层的格子内容
         * @param type
         * @param layer
         */
        public updateView(type: number, layer: number): void {
            this._expeditionItemList = [];
            for (let row = 1; row <= XujieTansuoRowCnt; row++) {
                let grids = this.getGrids(type, layer, row);
                if (grids && grids.length) {
                    for (let col = 1; col <= grids.length; col++) {
                        if (!this[`item${row}_${col}`]) {
                            continue;//过滤
                        }

                        let status = this.getStatus(type, layer, row, col);
                        let itemData: IXujieTansuoGridItemData = {
                            type,
                            layer,
                            row,
                            col,
                            // isActed: this._proxy.isActedByRow(type, layer, row),
                            status: status,
                            grid: status == XujieTansuoGridStatus.Null ? null : grids[col - 1]
                        };

                        let gridInfo = this._proxy.getGridInfo(type, layer, row, col);
                        if (status == XujieTansuoGridStatus.Expedition && gridInfo && gridInfo.endtime) {
                            let endTime = gridInfo.endtime.toNumber();
                            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
                            if (leftTime > 0) {
                                this._expeditionItemList.push(this[`item${row}_${col}`]);
                            }
                        }

                        this[`item${row}_${col}`].data = itemData;
                    }
                }
            }
        }

        //某排的格子配置表数据
        private getGrids(type: number, layer: number, row: number): number[][] {
            let cfgObj = getConfigByNameId(ConfigName.ZhanduiTansuoMap, type);
            let layerId = layer * 100 + row;
            if (!cfgObj || !cfgObj[layerId]) {
                return null;
            }
            let cfg: ZhanduiTansuoMapConfig = cfgObj[layerId];
            return cfg.grid;
        }

        //某一格子的状态，处理服务端下发的。如果null了，就是空格子 todo
        private getStatus(type: number, layer: number, row: number, col: number): XujieTansuoGridStatus {
            let gridInfo = this._proxy.getGridInfo(type, layer, row, col);
            if (gridInfo) {
                if (row == XujieTansuoRowCnt && gridInfo.grid_type == XujieTansuoGridStatus.Null) {
                    return XujieTansuoGridStatus.Transfer;
                }
                return gridInfo.grid_type;
            }
            return XujieTansuoGridStatus.Null;

            // //若没有，表示已经变成空格子了
            // if (!gridInfo) {
            //     if (row == XujieTansuoRowCnt) {
            //         return XujieTansuoGridStatus.Transfer;//boss格子变成传送格子
            //     }
            //     return XujieTansuoGridStatus.Null;
            // }
            // return gridInfo.grid_type;

            // let grids = this.getGrids(type, layer, row);
            // if (grids && grids[col - 1]) {
            //     return grids[col - 1][0];//配置表状态
            // }
            // return XujieTansuoGridStatus.Null;
        }

        //远征格子倒计时，只存在一个远征
        public updateTime(): void {
            if (this._expeditionItemList && this._expeditionItemList.length) {
                let item = this._expeditionItemList[0];
                item.updateTime();
            }
        }
    }
}