namespace game.mod.more {

    import TimeMgr = base.TimeMgr;

    export class XujiejitanSacrificeItem extends BaseStageEventItem {
        public grp_tips: eui.Group;
        public lab_name: eui.Label;
        public lab_time: eui.Label;
        public btn_speedup: game.mod.Btn;

        private _proxy: XujieJitanProxy;
        private _endTime: number = 0;

        constructor() {
            super();
            this.skinName = "skins.more.XujiejitanSacrificeItemSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XujieJitan);
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
            this._endTime = 0;
        }

        public updateShow(): void {
            let info = this._proxy.getSacrificeInfo();
            if (!info) {
                return;
            }
            let cfg = GameConfig.getPropConfigById(info.idx.toNumber());
            if (!cfg) {
                return;
            }
            this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality1(cfg.quality)));
            this._endTime = info.endtime.toNumber();
            this.updateTime();
        }

        public updateTime(): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime < 1) {
                this._proxy.sendJitanButtonClick(ZhanduiOperType.Oper207);//正在献祭的完成了，请求数据
                return;
            }
            this.lab_time.text = TimeUtil.formatSecond(leftTime, "d天H时", true);
        }
    }
}