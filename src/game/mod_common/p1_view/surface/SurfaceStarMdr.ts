namespace game.mod {

    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import HorseConfig = game.config.HorseConfig;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;
    import attributes = msg.attributes;
    import facade = base.facade;
    import Handler = base.Handler;

    export class SurfaceStarMdr extends EffectMdrBase {
        protected _view: SurfaceStarView = this.mark("_view", SurfaceStarView);

        private _itemList: ArrayCollection;
        private _typeList: ArrayCollection;

        private _proxy: ISurfaceProxy;
        private _headType: number;
        /**当前选中的外显类型*/
        private _selType: number;
        /**当前选中的外显下标*/
        private _selIndex: number;
        /**当前选中的外显信息*/
        private _selData: AvatarItemData;
        protected _selCfg: HorseConfig | any;//子类可访问
        /**当前选中的外显属性*/
        private _attr: attributes;
        private _isMaxStar: boolean;//是否满星
        private _lastIndex: number;//上一次显示的外显
        private _effIdx: number;
        private _cost: number[];//升星消耗
        private _pillList: SurfacePillItemRender[] = [];

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            // this._proxy = this.retProxy(ProxyType.Surface);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = AvatarItem;
            this._view.list_item.dataProvider = this._itemList;

            this._typeList = new ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._typeList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power2.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
            addEventListener(this._view.btn_battle, TouchEvent.TOUCH_TAP, this.onClickBattle);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickStar);

            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);

            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
            this.onNt(SurfaceEvent.SURFACE_INFO_UPDATE, this.onInfoUpdate, this);
            this.onNt(SurfaceEvent.SURFACE_RIDE_INFO_UPDATE, this.onRideInfoUpdate, this);
            this.onNt(SurfaceEvent.LIANSHENDAN_INFO_UPDATE, this.onPillUpdate, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._headType = this._proxy.headType;
            this._selIndex = 0;
            this._selCfg = null;
            this.initView();
            this.initPillList();
            this.initTypeList();
            this.typeUpdateInfo();
            this.updateTypeListHint();
            this.updateHint();
        }

        protected onHide(): void {
            this._effIdx = 0;
            this._lastIndex = 0;
            GuideMgr.getIns().clear(GuideKey.SurfaceAct);//清除指引
            super.onHide();
        }

        private onClickDesc(): void {

            if(this._headType == ConfigHead.Huashen) {
                //化神属性为 0 不显示
                let attr = PropData.filterAtr0(this._attr);
                ViewMgr.getIns().showAttrTips(getLanById(SurfaceConfigList[this._headType] + "_attr"), attr);
            }else{
                ViewMgr.getIns().showAttrTips(getLanById(SurfaceConfigList[this._headType] + "_attr"), this._attr);
            }
        }

        private onClickStar(): void {
            if (!this._selCfg) {
                return;
            }
            if (this._isMaxStar) {
                PromptBox.getIns().show(getLanById(LanDef.maxstar));
                return;
            }
            if (!this._proxy.canUpStar(this._selCfg.index)) {
                BagUtil.checkPropCntUp(this._cost[0], this._cost[1]);
                return;
            }
            this._proxy.c2s_ride_oper_up_star(SurfaceStarOpType.Act, this._selCfg.index, this._headType);
        }

        private onClickType(e: ItemTapEvent) {
            let type = e.itemIndex + 1;
            if (type == this._selType) {
                return;
            }
            this._selType = type;
            this._selIndex = 0;
            this._view.special_attr.visible = true;
            this.typeUpdateInfo();
        }

        private onClickItem(e: ItemTapEvent) {
            let index = e.itemIndex;
            if (index == this._selIndex) {
                return;
            }

            //清除选中特效
            let datas: AvatarItemData[] = this._itemList.source;
            let lastData = datas[this._selIndex];
            lastData.isSel = false;
            this._itemList.itemUpdated(lastData);

            this._selIndex = index;

            //选中特效
            let curData = datas[this._selIndex];
            curData.isSel = true;
            this._itemList.itemUpdated(curData);

            this._view.special_attr.visible = true;
            this.indexUpdateInfo();
        }

        private onInfoUpdate(n: GameNT): void {
            let headType: number = n.body;
            if (headType == this._headType) {
                this.typeUpdateInfo();
                this.updateTypeListHint();
            }
        }

        private onRideInfoUpdate(n: GameNT): void {
            let headType: number = n.body;
            if (headType == this._headType) {
                this.updatePower();
                this.updateStar();
                this.updatePill();
                this.updateTypeListHint();
                this.updateItemList();
            }
        }

        private onPillUpdate(n: GameNT): void {
            let headTypes: number[] = n.body;
            if (headTypes.indexOf(this._headType) > -1) {
                this.updatePill();
                this.typeUpdateInfo();
                this.updateTypeListHint();
            }
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let hintType = this._proxy.getBattleHint(this._headType);
            if (hintType && data.node == HintMgr.getType(hintType)) {
                this.updateBattleHint(data.value);
            }
        }

        private initPillList(): void {
            this._pillList = [this._view.item_pill0, this._view.item_pill1, this._view.item_pill2];
        }

        private initTypeList(): void {
            let datas = this._proxy.getSurfaceTypes(this._headType);
            let typeDatas: TabBaseItemData[] = [];
            for (let i = 1; i <= datas.length; ++i) {
                let icon = "surface_type_" + this._headType + "_" + i;
                typeDatas.push({icon: icon});
            }
            this._typeList.source = typeDatas;

            this._selType = datas[0];
            this._view.list_type.selectedIndex = this._selType - 1;
            this._selIndex = 0;
        }

        private updateTypeListHint(): void {
            let list: TabBaseItemData[] = this._typeList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                let hint = this._proxy.getSurfaceTypeHint(this._headType, i + 1);
                if (!!btnData.showHint != hint) {//过滤undefined!=false
                    btnData.showHint = hint;
                    this._typeList.itemUpdated(btnData);
                }
            }
        }

        private typeUpdateInfo(): void {
            this.updateItemList();
            this.indexUpdateInfo();
        }

        private updateItemList(): void {
            let cfgList = this._proxy.getSurfaceCfgList(this._headType, this._selType);
            let datas: AvatarItemData[] = [];
            let canUpStar = false;//是否可激活可升星
            for(let i = 0; i < cfgList.length; ++i){
                let cfg = cfgList[i];
                let star = this._proxy.getSurfacePerStar(cfg.index);
                let isBattle = this._proxy.isBattle(this._headType, cfg.index);
                let showHint = this._proxy.getSurfacePerHint(cfg);

                let sort = 10000000;//从小到大排序
                //幻化中＞可激活＞已激活＞未激活
                //同一个状态根据品质排序，同一个品质根据配置表顺序排序
                if(isBattle){
                    sort = 0;//幻化中＞
                }
                else if(this._proxy.canUpStar(cfg.index)){
                    sort -= 1000000;//可激活
                    //存在可激活可升星时候，自动选中对应外显
                    if(!canUpStar){
                        canUpStar = true;
                        this._selCfg = cfg;
                    }
                }
                else {
                    //已激活＞未激活
                    sort -= star ? 100000 : 0;
                }
                let data: AvatarItemData = {cfg: cfg, star: star, isBattle: isBattle, showHint: showHint, sort: sort};
                datas.push(data);
            }
            datas.sort((a, b) => {
                if(a.sort == b.sort){
                    //同一个状态根据品质排序，同一个品质根据配置表顺序排序
                    if(a.cfg.quality == b.cfg.quality){
                        return a.cfg.index - b.cfg.index;//index从小到大
                    }
                    else {
                        return a.cfg.quality - b.cfg.quality;//品质从小到大
                    }
                }
                return a.sort - b.sort;
            });

            if (this._selCfg) {
                //存在选中目标时
                for (let i = 0; i < datas.length; ++i) {
                    let info = datas[i];
                    let cfg = info.cfg;
                    if (this._selCfg.index == cfg.index) {
                        this._selIndex = i;
                        break
                    }
                }
            }
            //排序后下标会变化，需要更新选中
            for (let i = 0; i < datas.length; ++i) {
                let isSel = this._selIndex == i;
                datas[i].isSel = isSel;//修改选中状态
            }
            this._itemList.source = datas;
            this._view.list_item.selectedIndex = this._selIndex;
        }

        private updatePower(): void {
            let attr = this._proxy.getSurfacePerAttr(this._selCfg.index);
            this._attr = attr;
            if (!attr) {
                attr = RoleUtil.getAttr(this._selCfg.attr_id[0]);
            }
            let power = attr && attr.showpower ? attr.showpower : 0;
            this._view.power2.setPowerValue(power);

            let godVal = attr && attr.god ? attr.god : 0;


            this._view.god_item.updateGod(godVal);
        }

        private updateModel(): void {
            let index = this._selCfg.index;
            if (index == this._lastIndex) {
                return;
            }
            this._lastIndex = index;
            if (this._effIdx) {
                this.removeEffect(this._effIdx);
            }

            this._effIdx = this.addAnimate(index, this._view.grp_eff);
            this._view.name_item.updateShow(this._selCfg.name, this._selCfg.quality);
            this._view.special_attr.updateDesc(this._selCfg, 360);
        }

        private updateStar(): void {
            this._cost = this._selCfg.material[this._selData.star];

            let maxStar = this._proxy.getSurfaceMaxStar(this._headType);
            this._isMaxStar = this._selData.star >= maxStar;

            GuideMgr.getIns().clear(GuideKey.SurfaceAct);
            let isAct = !!this._selData.star;
            let tips = '';
            if (!this._isMaxStar) {
                if(isAct){
                    let starPower = this._selCfg.star_power[this._selData.star];
                    starPower = Math.floor(starPower / 100);
                    tips= getLanById(LanDef.upstar) + getLanById(LanDef.showpower) + "\n" + TextUtil.addColor("+" + starPower + "%", WhiteColor.GREEN);
                }
                let idx = this._cost[0];
                let costCnt = this._cost[1];
                let curCnt = this._proxy.getStarPropCnt(this._headType, this._selCfg.quality, idx, this._selData.star);

                this._view.btn_up.updateCost(this._cost, isAct, tips, true, curCnt);

                let canUp = curCnt >= costCnt;
                this._view.btn_up.redPoint.visible = canUp;
                if(canUp){
                    GuideMgr.getIns().show(GuideKey.SurfaceAct, this._view.btn_up, Handler.alloc(this, this.onClickStar), GuideKey.Back);//任务指引
                    RoleUtil.getAttrList(this._selCfg.attr_id);//用于升星成功弹窗属性展示
                }
            } else {
                this._view.btn_up.updateMaxStar();
                this._view.btn_up.redPoint.visible = false;
            }

            this._view.list_star.visible = isAct;
            this._view.power2.btn_desc.visible = isAct;

            if (this._view.list_star.visible) {
                this._view.list_star.updateStar(this._selData.star, maxStar);
            }
        }

        private updatePill(): void {
            let infos = this._proxy.getSurfacePillCost(this._selCfg.quality, this._selData.star, this._headType);
            for (let i = 0; i < this._pillList.length; ++i) {
                let item = this._pillList[i];
                let info: number[] = infos[i];
                item.data = info;
            }
        }

        private updateHint(): void {
            let hintType = this._proxy.getBattleHint(this._headType);
            if(this._view.btn_battle.visible && hintType){
                this.updateBattleHint(HintMgr.getHint(hintType));
            }
        }
        private updateBattleHint(hint: boolean) {
            this._view.btn_battle.redPoint.visible = hint;
        }

        /**初始化显示不同的ui，子类可重写*/
        protected initView(): void {
            this._view.btn_battle.iconDisplay.source = "huanhuatubiao";
            this._view.grp_skill.visible = false;
        }

        /**点击幻化或出战，子类可重写*/
        protected onClickBattle(): void {
            if (!this._selCfg) {
                return;
            }
            this._proxy.c2s_ride_oper_up_star(SurfaceStarOpType.Battle, this._selCfg.index, this._headType);
        }

        /**刷新幻化或出战，子类可重写*/
        protected updateBattle(): void {
            this._view.btn_battle.visible = !this._selData.isBattle && !!this._selData.star;
        }

        /**刷新选中，子类可重写*/
        protected indexUpdateInfo(): void {
            let datas: AvatarItemData[] = this._itemList.source;
            this._selData = datas[this._selIndex];
            this._selCfg = this._selData.cfg;
            this._proxy.selData = this._selData;

            this.updatePower();
            this.updateModel();
            this.updateStar();
            this.updatePill();
            this.updateBattle();
        }
    }
}