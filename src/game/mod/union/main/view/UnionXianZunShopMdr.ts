namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import member_data = msg.member_data;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class UnionXianZunShopMdr extends MdrBase implements UpdateItem {
        protected _view: UnionXianZunShopView = this.mark("_view", UnionXianZunShopView);
        protected _proxy: UnionProxy;

        protected _listData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionShopItem;
            this._view.list.dataProvider = this._listData;

            this._view.img_banner.source = ResUtil.getUiJpg("guanggaotu_xianzunmibao");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onExplain, this);

            this.onNt(UnionEvent.ON_UPDATE_HERO_SHOP_INFO, this.onUpdateList, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_mibao_ui();
            super.onShow();

            this.onUpdateHero();

            this.onUpdateTime();
            TimeMgr.addUpdateItem(this, 1000);
        }

        private onUpdateHero(): void {
            let hero: member_data = this._proxy.model.hero;
            this._view.head.updateHeadShow(hero.head, hero.head_frame, hero.sex);
            this._view.lab_name.text = `${hero.name}`;
        }

        private onUpdateList(): void {
            let list = this._proxy.getHeroList();
            this._listData.source = list;
        }

        private onExplain():void{
            //todo id要改
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.zhanlizhuanpantips1))
        }

        public update(time: base.Time): void {
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            let endTime = TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            let timeStr = TimeUtil.formatSecond(leftTime, "d天H时", true);
            this._view.lb_time.text = timeStr;
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }
    }
}