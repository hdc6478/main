namespace game.mod.more {

    import HuashenConfig = game.config.HuashenConfig;
    import LanDef = game.localization.LanDef;

    export class ZhenrongHuashenMdr extends MdrBase {
        private _view: ZhenrongHuashenView = this.mark("_view", ZhenrongHuashenView);
        private _proxy: XujieTansuoProxy;
        private _listAvatar: eui.ArrayCollection;
        private _listModel: eui.ArrayCollection;
        /**类型*/
        protected _legionType = LegionType.Huashen;
        /**上阵个数*/
        private _maxCnt = 0;
        /**上阵的id列表*/
        private _seledList: number[];
        /**激活的id列表*/
        private _actedList: number[];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);

            this._view.list.itemRenderer = AvatarIconLongPress;
            this._view.list.dataProvider = this._listAvatar = new eui.ArrayCollection();

            this._view.list_model.itemRenderer = ZhenrongItem;
            this._view.list_model.dataProvider = this._listModel = new eui.ArrayCollection();

            this._maxCnt = LegionTypeCnt[this._legionType];
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_oneKey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            addEventListener(this._view.list_model, eui.ItemTapEvent.ITEM_TAP, this.onClickListModel, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHENRONG_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initList();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this.finallyShangzhen();
            this._seledList = null;
            this._actedList = null;
        }

        private initList(): void {
            this._seledList = [];
            let info = this._proxy.getShangzhenInfo(this._legionType);
            if (info && info.unitlist) {
                let list: number[] = [];
                for (let id of info.unitlist) {
                    list.push(id.toNumber());
                }
                this._seledList = list;
            }
        }

        private onUpdateView(): void {
            this.initList();
            this.updateView();
        }

        private updateView(): void {
            this.updateListAvatar();
            this.updateListModel();
        }

        private updateListAvatar(): void {
            let list = this.getList();
            let listData: AvatarItemData[] = [];
            for (let item of list) {
                let surfacePorxy: ISurfaceProxy = getProxy(ModName.Surface, ProxyType.Surface);
                let info = surfacePorxy.getSurfacePerInfo(item.index);
                listData.push({
                    cfg: getConfigByNameId(ConfigName.Huashen, item.index),
                    showHint: false,
                    isBattle: item.isBattle,
                    star: info && info.star || 0
                });
            }
            this._listAvatar.replaceAll(listData);
        }

        private getList(): AvatarItemBattleData[] {
            if (!this._actedList) {
                //获取已激活的化神数据
                let cfgs: HuashenConfig[] = getConfigListByName(ConfigName.Huashen);
                let actedList: number[] = [];
                let surfacePorxy: ISurfaceProxy = getProxy(ModName.Surface, ProxyType.Surface);
                for (let cfg of cfgs) {
                    let info = surfacePorxy.getSurfacePerInfo(cfg.index);
                    if (info && info.star) {
                        actedList.push(cfg.index);
                    }
                }
                this._actedList = actedList;
            }

            let list: AvatarItemBattleData[] = [];
            let battleList: AvatarItemBattleData[] = [];
            for (let id of this._actedList) {
                let data: AvatarItemBattleData = {
                    index: id,
                    isBattle: false
                };
                if (this.isBattle(id)) {
                    data.isBattle = true;
                    battleList.push(data);
                } else {
                    list.push(data);
                }
            }
            return battleList.concat(list);
        }

        //是否上阵
        private isBattle(index: number): boolean {
            return this._seledList.indexOf(index) > -1;
        }

        private updateListModel(): void {
            let list = this._seledList.concat();
            list.length = this._maxCnt;
            this._listModel.replaceAll(list);
        }

        //一键
        private onClickOneKey(): void {
            this._proxy.sendShangzhen(this._legionType, 2);
        }

        //点击上阵
        private onClickList(e: eui.ItemTapEvent): void {
            //上阵个数限制
            if (this._seledList.length >= this._maxCnt) {
                PromptBox.getIns().show(getLanById(LanDef.xujietansuo_tips12));
                return;
            }
            let data = e.item as AvatarItemData;
            if (this._seledList.indexOf(data.cfg.index) > -1) {
                PromptBox.getIns().show(getLanById(LanDef.xujietansuo_tips24));
                return;
            }
            data.isBattle = true;
            this._listAvatar.itemUpdated(data);
            this._seledList.push(data.cfg.index);
            PromptBox.getIns().show(getLanById(LanDef.shenling_tips14));

            this.updateView();
        }

        //点击下阵
        private onClickListModel(e: eui.ItemTapEvent): void {
            let index: number = e.item;
            if (!index) {
                return;
            }
            let idx = this._seledList.indexOf(index);
            if (idx > -1) {
                this._seledList.splice(idx, 1);//下阵
            }
            this.updateView();
        }

        //关闭界面最终上阵处理 todo
        private finallyShangzhen(): void {
            let map = new Map();
            let info = this._proxy.getShangzhenInfo(this._legionType);
            if (info && info.unitlist) {
                //后端真上阵数据
                info.unitlist.forEach((item) => {
                    map.set(item.toNumber(), true);
                });
            }

            let seledSize = this._seledList.length;
            let sameCnt = 0;
            if (map.size == seledSize) {
                //前端假上阵数据
                this._seledList.forEach((item) => {
                    if (map.get(item)) {
                        sameCnt++;
                    }
                });
            }

            if (map.size != seledSize || sameCnt != seledSize) {
                this._proxy.sendShangzhen(this._legionType, 3, this._seledList);
            }
        }
    }
}