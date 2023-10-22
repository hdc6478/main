namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import ParamConfig = game.config.ParamConfig;
    import ride_item = msg.ride_item;
    import HuashenConfig = game.config.HuashenConfig;
    import Event = egret.Event;
    import GameNT = base.GameNT;

    export class HuashenBattleMdr extends MdrBase {
        private _view: HuashenBattleView = this.mark("_view", HuashenBattleView);

        private _itemList1: ArrayCollection;
        private _itemList2: ArrayCollection;
        private _surfaceProxy: ISurfaceProxy;
        private _proxy: HuashenProxy;
        private _headType: number = ConfigHead.Huashen;

        protected onInit(): void {
            super.onInit();

            this._itemList1 = new ArrayCollection();
            this._view.list_item1.itemRenderer = HuashenBattleItem1;
            this._view.list_item1.dataProvider = this._itemList1;

            this._itemList2 = new ArrayCollection();
            this._view.list_item2.itemRenderer = HuashenBattleItem2;
            this._view.list_item2.dataProvider = this._itemList2;

            this._surfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            this._proxy = this.retProxy(ProxyType.Huashen);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_onekey, TouchEvent.TOUCH_TAP, this.onClickOnekey);
            addEventListener(this._view.list_item1, Event.CHANGING, this.onClickItem1);

            this.onNt(SurfaceEvent.SURFACE_INFO_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this._proxy.selIndex = 0;
            this.updateItemList1();
            this.updateItemList2();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickOnekey(): void {
            //一键上阵
            if(!this._itemList2.source || !this._itemList2.source.length){
                PromptBox.getIns().show(getLanById(LanDef.huashen_battle_tips3));
                return;
            }
            this._surfaceProxy.c2s_ride_oper_up_star(SurfaceStarOpType.Battle, undefined, this._headType, 0);//0表示一键上阵
        }

        private onClickItem1(e: Event) {
            let index = this._view.list_item1.selectedIndex;
            if (index == this._proxy.selIndex) {
                return;
            }
            let limit: number = this._view.list_item1.selectedItem;//仙力
            if (!RoleUtil.isLimitOpen([CommonLimitType.God, limit])) {
                PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.huashen_battle_tips4), [limit]));
                e.preventDefault();
                return;
            }

            this._proxy.selIndex = index;
            this.updateItemList2();
        }

        private onInfoUpdate(n: GameNT): void {
            let headType: number = n.body;
            if (headType == this._headType) {
                this.updateItemList1();
                this.updateItemList2();
            }
        }

        private updateItemList1(): void {
            let cfg: ParamConfig = GameConfig.getParamConfigById("huashen_battle_open");
            let datas = cfg.value;//仙力开启条件
            if(this._itemList1.source.length > 0){
                this._itemList1.replaceAll(datas);
            }
            else{
                this._itemList1.source = datas;
            }
            this._view.list_item1.selectedIndex = this._proxy.selIndex;
        }

        private updateItemList2(): void {
            let pos = this._proxy.selIndex + 1;
            let index = this._surfaceProxy.getPosIndex(ConfigHead.Huashen, pos);

            let datas: ride_item[] = [];
            if(index){
                let battleInfo = this._surfaceProxy.getSurfacePerInfo(index);
                datas.push(battleInfo);
            }

            let infos = this._surfaceProxy.getCanBattleInfos(this._headType);//未上阵的外显
            let tmps: {info: ride_item, sort: number}[] = [];
            for(let info of infos){
                let cfg: HuashenConfig = getConfigByNameId(ConfigName.Huashen, info.index);
                let sort = 10000000;//从小到大排序
                //品质＞星级
                sort -= 100000 * cfg.quality;
                sort -= 100 * info.star;
                tmps.push({info: info, sort: sort});
            }
            tmps.sort((a, b) => {
                return a.sort - b.sort;
            });
            for(let i of tmps){
                datas.push(i.info);
            }

            if(this._itemList2.source.length > 0){
                this._itemList2.replaceAll(datas);
            }
            else{
                this._itemList2.source = datas;
            }
        }
    }
}