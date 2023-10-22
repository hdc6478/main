namespace game.mod.pass {

    import ArrayCollection = eui.ArrayCollection;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import WorldmapConfig = game.config.WorldmapConfig;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;
    import Tween = base.Tween;
    import Linear = base.Linear;

    export class WorldMapMdr extends MdrBase {
        private _view: WorldMapView = this.mark("_view", WorldMapView);

        private _listData: ArrayCollection;
        private _proxy: PassProxy;

        private _cfgs: WorldmapConfig[];
        private _showIdx: number = 0;
        private _len: number;

        constructor(p: DisplayObjectContainer) {
            super(p);
        }

        protected onInit(): void {
            super.onInit();
            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.Pass);

            this._listData = new ArrayCollection();
            this._view.list.dataProvider = this._listData;
            this._view.list.itemRenderer = WorldMapContent;
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(PassEvent.UPDATE_PASS_MAP_AWD_GOT_INFO, this.updateData, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_left, TouchEvent.TOUCH_TAP, this.onLast);
            addEventListener(this._view.btn_right, TouchEvent.TOUCH_TAP, this.onNext);
            addEventListener(this._view.scroller, TouchEvent.TOUCH_MOVE, this.onScroll);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._cfgs) {
                this._cfgs = getConfigListByName(ConfigName.WorldMap);
            }
            this._showIdx = 0;
            this.updateData();
        }

        private updateData(): void {
            let list: IPassWorldMapData[][] = [];
            let list0: IPassWorldMapData[] = [];
            for (let i = 0, len = this._cfgs.length; i < len; i++) {
                let cfgData = this._cfgs[i];
                let isCurMap = this._proxy.isCurChapter(cfgData);

                let isPass = this._proxy.isPass(cfgData);
                let hint: boolean = this._proxy.getWorldMapHint(cfgData);
                let mapItemData: IPassWorldMapData = {
                    cfg: cfgData,
                    isCurMap: isCurMap,
                    isPass: isPass,
                    hint: hint
                };
                list0.push(mapItemData);
                if (i % 10 == 9 || i == len - 1) {
                    list.push(list0);
                    list0 = [];
                }
            }

            this._listData.replaceAll(list);
            this._len = this._listData.length;
            this.scrollMap();
        }

        protected onHide(): void {
            super.onHide();
        }

        private scrollMap(): void {
            this.onLimitIdx();
            this._view.btn_left.visible = this._showIdx > 0;
            this._view.btn_right.visible = this._showIdx < this._len - 1;

            let viewPort = this._view.scroller.viewport;
            let pos = this._showIdx * this._view.scroller.width;
            // viewPort.scrollH = pos;
            Tween.get(viewPort).to({scrollH: pos}, 400, null, Linear.easeIn);
        }

        private onLast() {
            this._showIdx--;
            this.scrollMap();
        }

        private onNext() {
            this._showIdx++;
            this.scrollMap();
        }

        private onScroll(e: Event) {
            this._showIdx = Math.floor(this._view.scroller.viewport.scrollH / this._view.scroller.width);
            this.onLimitIdx();
            this._view.btn_left.visible = this._view.scroller.viewport.scrollH > 0;
            this._view.btn_right.visible = this._showIdx < this._len - 1;
        }

        private onLimitIdx(): void {
            if (this._showIdx < 0) {
                this._showIdx = 0;
            }
            if (this._showIdx > this._len - 1) {
                this._showIdx = this._len - 1;
            }
        }

    }
}