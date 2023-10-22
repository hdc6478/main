namespace game.mod.more {

    import XianweiBaseConfig = game.config.XianweiBaseConfig;
    import xianwei_place_data = msg.xianwei_place_data;
    import teammate = msg.teammate;

    export class XianweiInfoItem extends BaseRenderer {
        private lab_name: eui.Label;
        private list: eui.List;
        private timeItem: TimeItem;

        private _listData: eui.ArrayCollection = new eui.ArrayCollection();
        private _proxy: XianweiProxy;
        data: xianwei_place_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xianwei);

            this.list.itemRenderer = CoinItemCenter;
            this.list.dataProvider = this._listData;
        }

        protected dataChanged(): void {
            let info = this.data;
            let key: string = `${info.stage}_${info.index}`;
            let cfg: XianweiBaseConfig = this._proxy.cfgArr.get(key);
            this.lab_name.text = cfg.name;

            this._listData.replaceAll([[cfg.coin[0], info.coin || 0], [cfg.score[0], info.score || 0]]);
        }

        public setData(data: xianwei_place_data): void {
            this.data = data;
        }

        public updateTime(leftTime: number): void {
            this.timeItem.updateLeftTime(leftTime);
        }
    }
}