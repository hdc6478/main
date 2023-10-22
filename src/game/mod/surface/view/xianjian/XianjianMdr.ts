namespace game.mod.surface {

    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import XianjianConfig = game.config.XianjianConfig;
    import facade = base.facade;
    import oper_act_item = msg.oper_act_item;
    import TimeMgr = base.TimeMgr
    import UpdateItem = base.UpdateItem


    export class XianjianMdr extends EffectMdrBase implements UpdateItem {
        private _view: XianjianView = this.mark("_view", XianjianView);

        private _itemList: ArrayCollection;
        //private _itemListData:AvatarItemData[];
        private _typeList: ArrayCollection;
        private _typeDatas: number[];

        private _headType: number = ConfigHead.Xianjian;
        private _proxy: XianjianProxy;
        /**当前选中的外显类型*/
        private _selType: number;
        /**当前选中的外显下标*/
        private _selIndex: number;
        private _selCfg: XianjianConfig;
        private _lastIndex: number;//上一次显示的外显
        private _effIdx: number;

        private _flyRankTime: number;
        private _flyRankActInfo: oper_act_item;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Xianjian);

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
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickStar);
            addEventListener(this._view.btn_duanlian, TouchEvent.TOUCH_TAP, this.onClickDuanlian);
            addEventListener(this._view.btn_jiban, TouchEvent.TOUCH_TAP, this.onClickJiban);
            addEventListener(this._view.item_skill, TouchEvent.TOUCH_TAP, this.onClickItemSkill);

            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);

            addEventListener(this._view.btn_flyRank, TouchEvent.TOUCH_TAP, this.onClickFlyRank);

            this.onNt(SurfaceEvent.ON_UPDATE_XIANJIAN_INFO, this.typeUpdateInfo, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
        }

        protected onShow(): void {
            super.onShow();
            this._selIndex = 0;
            this._selCfg = null;
            this.initTypeList();
            this.typeUpdateInfo();
            this.updateFlyRank();
        }

        protected onHide(): void {
            this._effIdx = 0;
            this._lastIndex = 0;
            this._flyRankTime = 0;
            this._flyRankActInfo = null;
            super.onHide();
        }

        update(time: base.Time): void {
            this.updateFlyRankTime();
        }

        private updateFlyRank(): void {
            let actInfo = this.getFlyRank();
            this._flyRankActInfo = actInfo;
            if (!actInfo) {
                this._view.grp_flyRank.visible = false;//没有对应的飞升榜
                return;
            }
            this._view.grp_flyRank.visible = true;
            this._flyRankTime = actInfo.c_end_time;
            this.updateFlyRankTime();
            TimeMgr.addUpdateItem(this, 1000);
        }

        //飞升榜
        private getFlyRank(): oper_act_item {
            //获取对应的飞升榜
            let index = 1450100140;//通过唯一道具id判断显示飞升榜按钮入口
            let jumpIdx = FlyPropToJumpIdx[index];
            if (!jumpIdx) {
                return null;
            }
            let activityProxy: IActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            let actList = activityProxy.getOperActList(ActivityType.FlyRank);
            let flyRankProxy: IFlyRankProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.FlyRank);
            for (let actInfo of actList) {
                let propIndex = flyRankProxy.getRankProp(actInfo);
                if (propIndex == index) {
                    return actInfo;
                }
            }
            return null;
        }

        private updateFlyRankTime(): void {
            let leftTime = this._flyRankTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._view.grp_flyRank.visible = false;//没有对应的飞升榜
                return;
            }
            this._view.lab_flyRank.text = TimeUtil.formatSecond(leftTime, 'd天H时', true);
        }

        private onClickFlyRank(): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.ActMain, this._flyRankActInfo);
        }

        private onClickDesc(): void {
            let info = this._proxy.getInfo(this._selCfg.index);
            let attr = info && info.all_attr;
            ViewMgr.getIns().showAttrTips(getLanById(SurfaceConfigList[this._headType] + "_attr"), attr);
        }

        private onClickJiban(): void {
            ViewMgr.getIns().showView(ModName.Jiban, JibanViewType.JibanMain, JibanMainBtnType.Xianjian, true);
        }

        private onClickDuanlian(): void {
            ViewMgr.getIns().showSecondPop(ModName.Surface, SurfaceViewType.XianjianUp, this._selCfg.index);
        }

        private onClickStar(): void {
            if (!this._selCfg) {
                return;
            }
            let param = GameConfig.getParamConfigById("xianjian_max_star");
            let info = this._proxy.getInfo(this._selCfg.index);
            let star: number = info && info.star || 0;
            let cost = this._selCfg.material[star];
            if (star >= param.value) {
                PromptBox.getIns().show(getLanById(LanDef.maxstar));
                return;
            }
            if (!this._proxy.canUpStar(this._selCfg.index)) {
                BagUtil.checkPropCntUp(cost[0], cost[1]);
                return;
            }
            this._proxy.c2s_fly_sword_operation(this._selCfg.index, 1, null);
        }

        private onClickType(e: ItemTapEvent) {

            let type = this._typeDatas[e.itemIndex];


            if (type == this._selType) {
                return;
            }
            this._selType = type;
            this._selIndex = 0;
            this.typeUpdateInfo();
        }

        private onClickItemSkill(): void {
            let data: BattleSkillItemRenderData = this._view.item_skill.data;
            facade.showView(ModName.Surface, SurfaceViewType.XianjianBattleSkillTips, {
                ...data,
                index: this._selCfg.index
            });
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

            this.indexUpdateInfo();
        }

        private initTypeList(): void {
            this._typeDatas = this._proxy.getTypes();
            let typeDatas = this._typeDatas.map(v => { return { icon: `surface_type_${this._headType}_${v}` } });

            this._typeList.source = typeDatas;


            this._selType = this._typeDatas[0];
            this._selIndex = 0;
            this._view.list_type.selectedIndex = this._selIndex;
        }

        private typeUpdateInfo(): void {
            this.updateItemList();
            this.indexUpdateInfo();
            this.updateTypeListHint();
        }

        private updateItemList(): void {
            let list = this._proxy.getListData(this._selType);
            this._itemList.replaceAll(list);

            let curData = this._itemList.source[this._selIndex];
            curData.isSel = true;
            this._itemList.itemUpdated(curData);
        }

        private indexUpdateInfo(): void {
            this._selCfg = this._itemList.source[this._selIndex].cfg;

            this.updatePower();
            this.updateModel();
            this.updateStar();
            this.onUpdateSkill();
            this.onUpdateLevel();
        }

        private onUpdateLevel(): void {
            let info = this._proxy.getInfo(this._selCfg.index);
            let level = info && info.level || 0;
            this._view.grp_duanlian.visible = this._view.btn_jiban.visible = !!level;
            this._view.lab_count.text = `${level}级`;

            this._view.btn_duanlian.setHint(this._proxy.canUpLevel(this._selCfg.index));
            this._view.btn_jiban.setHint(this._proxy.canUpJiban(this._selCfg.index))
        }

        private onUpdateSkill(): void {
            this._view.item_skill.setData(this._selCfg.skill, "jianyi");
        }

        private updatePower(): void {
            let info = this._proxy.getInfo(this._selCfg.index);
            let attr = info && info.all_attr;
            if (!attr || !Object.keys(attr).length) {
                let attrId = this._selCfg.attr_id[0];
                attr = RoleUtil.getAttr(attrId);
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
        }

        private updateStar(): void {
            let param = GameConfig.getParamConfigById("xianjian_max_star");
            let info = this._proxy.getInfo(this._selCfg.index);
            let star: number = info && info.star || 0;
            if (star >= param.value) {
                this._view.btn_up.updateMaxStar();
                this._view.btn_up.setHint(false);
                return;
            }
            let tips = '';
            if (star) {
                let starPower = Math.floor(this._selCfg.star_power[star] / 100);
                tips = StringUtil.substitute(getLanById(LanDef.xianlv_tips26), [TextUtil.addColor("+" + starPower + "%", WhiteColor.GREEN)]);
            }
            let prop = this._selCfg.material[star];
            let cnt: number = this._proxy.getStarPropCnt(this._headType, this._selCfg.quality, prop[0], star);
            // let curCnt: number = BagUtil.getPropCntByIdx(prop[0]);
            this._view.btn_up.updateCost(prop, !!star, tips, true, cnt);

            let bool: boolean = cnt >= prop[1];
            this._view.btn_up.setHint(bool);
            if (bool) {
                RoleUtil.getAttrList(this._selCfg.attr_id);//用于升星成功弹窗属性展示
            }
        }

        private updateTypeListHint(): void {
            let list: TabBaseItemData[] = this._typeList.source;
            let len: number = list ? list.length : 0;
            let ret = false;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                let type = this._typeDatas[i];
                let hint = this._proxy.getTypeHint(type);
                if (hint) {
                    ret = true;
                }
                if (!!btnData.showHint != hint) {//过滤undefined!=false
                    btnData.showHint = hint;
                    this._typeList.itemUpdated(btnData);
                }
            }
            HintMgr.setHint(ret, [ModName.Surface, SurfaceViewType.Xianjian, MdrTabBtnType.TabBtnType01]);
        }
    }
}