namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import stage = egret.lifecycle.stage;
    import TimeMgr = base.TimeMgr;

    /**
     * 超值礼包
     * 不监听公共事件，只在打开时候更新处理，后期有需求自行调整
     */
    export class ChaozhiLibaoMdr extends MdrBase implements UpdateItem {
        private _view: ChaozhiLibaoView = this.mark('_view', ChaozhiLibaoView);
        /**展示在此面板上的所有按钮，放到initBtnData()处理*/
        private _btnData: IBtnIconData[];
        /**按钮管理器*/
        private _ins: BtnIconMgr;
        private _rectangle: egret.Rectangle;
        public static isShow = false;

        private _tehuiProxy: TehuiLibaoProxy;
        private _shenlingGiftProxy: ShenlingGiftProxy;

        private initBtnData(): void {
            this._btnData = [
                {
                    id: BtnIconId.MeiriTehui,
                    m: ModName.Activity,
                    v: MainActivityViewType.MeiriTehui,
                    hintMsg: [ModName.Activity, MainActivityViewType.ChaozhiLibao, MainActivityViewType.MeiriTehui]
                },
                {
                    id: BtnIconId.ShenlingGift,
                    m: ModName.Activity,
                    v: MainActivityViewType.ShenlingGift
                    // isHide: !this._shenlingGiftProxy.canOpen()
                },
                {
                    id: BtnIconId.TehuiLibao,
                    m: ModName.Activity,
                    v: MainActivityViewType.TehuiLibao,
                    param: TehuiType.TehuiLibao,
                    showTime: true,
                    endTime: this._tehuiProxy.getEndTime()
                },
                {
                    id: BtnIconId.JinjieTehui,
                    m: ModName.Activity,
                    v: MainActivityViewType.TehuiLibao,
                    param: TehuiType.JinjieTehui,
                    showTime: true,
                    endTime: this._tehuiProxy.getEndTime()
                },
                {
                    id: BtnIconId.SupremeGit,
                    m: ModName.Activity,
                    v: MainActivityViewType.SupremeGitMain,
                    hintMsg: [ModName.Activity, MainActivityViewType.ChaozhiLibao, MainActivityViewType.SupremeGitMain],
                    showBack: true
                },
                {
                    id: BtnIconId.FeishengWukong,
                    m: ModName.Activity,
                    v: MainActivityViewType.FeishengLibao,
                    param: OpenIdx.FeishengWukong
                },
                {
                    id: BtnIconId.JuebanXianjian,
                    m: ModName.Activity,
                    v: MainActivityViewType.FeishengLibao,
                    param: OpenIdx.JuebanXianjian
                },
                {
                    id: BtnIconId.ZhizunShouyin,
                    m: ModName.Activity,
                    v: MainActivityViewType.FeishengLibao,
                    param: OpenIdx.ZhizunShouyin
                },
                {
                    id: BtnIconId.XianlvGift,
                    m: ModName.Activity,
                    v: MainActivityViewType.XianlvGift,
                    hintMsg: [ModName.Activity, MainActivityViewType.ChaozhiLibao, MainActivityViewType.XianlvGift],
                }
            ];
        }

        constructor() {
            super(Layer.main);
        }

        protected onInit() {
            super.onInit();
            this._ins = new BtnIconMgr(this._view.gr_btns);
            BtnIconMgr._insChaozhilibao = this._ins;

            this._tehuiProxy = getProxy(ModName.Activity, ProxyType.TehuiLibao);
            this._shenlingGiftProxy = getProxy(ModName.Activity, ProxyType.ShenlingGift);
        }

        protected addListeners() {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(stage, egret.TouchEvent.TOUCH_TAP, this.onClickStage, this);
        }

        protected onShow() {
            super.onShow();
            ChaozhiLibaoMdr.isShow = true;
            this.initBtnData();
            this.dealBtnIconList();

            egret.callLater(() => {
                this.calPoint();
            }, this);
        }

        protected onHide() {
            super.onHide();
            ChaozhiLibaoMdr.isShow = false;
            this._ins.clear();
            this._view.gr_btns.removeChildren();
        }

        private dealBtnIconList(): void {
            this._ins.dealBtnIconList(this._btnData, true);

            //开启按钮定时器
            if (Object.keys(this._ins._btnTimeMap).length) {
                if (!TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                }
            } else {
                if (TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.removeUpdateItem(this);
                }
            }
        }

        //处理单个按钮
        private dealSingleBtnIcon(id: BtnIconId, ins: BtnIconMgr = this._ins): void {
            ins.dealSingleBtnIcon(id);

            //开启按钮定时器
            let timeMap = ins._btnTimeMap;
            let mapSize = Object.keys(timeMap).length;
            if (TimeMgr.hasUpdateItem(this) && !mapSize) {
                TimeMgr.removeUpdateItem(this);
            } else if (!TimeMgr.hasUpdateItem(this) && mapSize) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
        }

        //计算位置
        private calPoint(): void {
            let btnIcon = BtnIconMgr.insLeft()._showBtnMap[BtnIconId.ChaozhiLibao];
            if (!btnIcon) {
                return;
            }
            //计算位置
            let point: egret.Point = btnIcon.localToGlobal();
            this._view.x = point.x + 84;
            this._view.y = point.y;
            //计算布局
            let btnSize = Object.keys(this._ins._showBtnMap).length;
            let layout = new eui.TileLayout();
            layout.requestedColumnCount = btnSize >= 3 ? 3 : btnSize;
            layout.paddingLeft = layout.paddingRight = layout.paddingTop = 10;
            layout.paddingBottom = 20;
            layout.verticalGap= 12;
            this._view.gr_btns.layout = layout;

            this._rectangle = new egret.Rectangle(point.x + 84, point.y, this._view.width, this._view.height);
        }

        private onClickStage(e: egret.TouchEvent): void {
            if (this._rectangle && this._rectangle.contains(e.stageX, e.stageY)) {
                return;
            }
            let btnIcon = BtnIconMgr.insLeft()._showBtnMap[BtnIconId.ChaozhiLibao];
            if (btnIcon && btnIcon == e.target) {
                return;
            }
            this.hide();
        }

        update(time: base.Time) {
            let timeMap = this._ins._btnTimeMap;
            let keys2 = Object.keys(timeMap);
            for (let key of keys2) {
                let btnIcon: BtnIconBase = timeMap[key];
                if (!btnIcon || !this._ins._showBtnMap[key]) {
                    continue;
                }
                if (!this._ins.checkBtnTime(btnIcon.data)) {
                    this.dealSingleBtnIcon(btnIcon.id, this._ins);
                    continue;
                }
                btnIcon.updateTime();
            }
        }
    }

}