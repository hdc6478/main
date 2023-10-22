namespace game.mod.more {

    import Monster1Config = game.config.Monster1Config;

    export class XujieTansuoMapItemBoss extends BaseListenerRenderer {
        public img_boss: eui.Image;

        data: number;
        private _proxy: XujieTansuoProxy;

        constructor() {
            super();
            this.skinName = `skins.more.XujieTansuoMapItemBossSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XujieTansuo);
        }

        protected dataChanged(): void {
            this.img_boss.source = '';
            let type = this.data;
            if (!type) {
                return;
            }
            let maxLayer = this._proxy.getMaxLayerByType(type);
            let rowCfg = this._proxy.getCfgByRow(type, maxLayer, XujieTansuoRowCnt);
            if (rowCfg && rowCfg.grid && rowCfg.grid[0]) {
                let grid = rowCfg.grid[0];
                if (grid[0] == XujieTansuoGridStatus.Monster) {
                    let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, grid[1]);
                    this.img_boss.source = monsterCfg && monsterCfg.res_id || '';
                }
            }
        }
    }
}