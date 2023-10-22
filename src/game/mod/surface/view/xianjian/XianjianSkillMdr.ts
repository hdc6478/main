namespace game.mod.surface {

    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import XianjianConfig = game.config.XianjianConfig;
    import JianfaConfig = game.config.JianfaConfig;
    import facade = base.facade;
    import GameNT = base.GameNT;

    export class XianjianSkillMdr extends EffectMdrBase {
        private _view: XianjianSkillView = this.mark("_view", XianjianSkillView);

        private _itemList: ArrayCollection;
        private _typeList: ArrayCollection;

        private _proxy: XianjianProxy;
        private readonly _headType: number = ConfigHead.Xianjian;
        /**当前选中的外显类型*/
        private _selType: number;
        /**当前选中的外显下标*/
        private _selIndex: number;
        private _selCfg: XianjianConfig;
        private _effIdx: number;

        private readonly _buweis: number = 4;

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
            addEventListener(this._view.item_skill, TouchEvent.TOUCH_TAP, this.onClickItemSkill);
            addEventListener(this._view.icon_1, TouchEvent.TOUCH_TAP, this.onClickTips);
            addEventListener(this._view.icon_2, TouchEvent.TOUCH_TAP, this.onClickTips);
            addEventListener(this._view.icon_3, TouchEvent.TOUCH_TAP, this.onClickTips);
            addEventListener(this._view.icon_4, TouchEvent.TOUCH_TAP, this.onClickTips);

            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);

            this.onNt(SurfaceEvent.ON_UPDATE_XIANJIAN_INFO, this.typeUpdateInfo, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._selIndex = 0;
            this._selCfg = null;
            this.initTypeList();
            this.typeUpdateInfo();
            this.updateTypeListHint();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickDesc(): void {
            let info = this._proxy.getInfo(this._selCfg.index);
            let attr = info && info.all_attr;
            ViewMgr.getIns().showAttrTips(getLanById(SurfaceConfigList[this._headType] + "_attr"), attr);
        }

        private onClickItemSkill(): void {
            let data: BattleSkillItemRenderData = this._view.item_skill.data;
            facade.showView(ModName.Surface, SurfaceViewType.XianjianBattleSkillTips, {
                ...data,
                index: this._selCfg.index
            });
        }

        private onClickType(e: ItemTapEvent) {
            let type = this._proxy.buwei_types[e.itemIndex];
            if (type == this._selType) {
                return;
            }
            this._selType = type;
            this._selIndex = 0;
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

            this.indexUpdateInfo();
        }

        private onClickTips(e: TouchEvent): void {
            let curData: AvatarItemData = this._itemList.source[this._selIndex];
            if (!curData) {
                return;
            }
            if (!curData.star) {
                PromptBox.getIns().show("请先激活仙剑");
                return;
            }
            let pos: number = 0;
            switch (e.currentTarget) {
                case this._view.icon_1:
                    pos = 1;
                    break;
                case this._view.icon_2:
                    pos = 2;
                    break;
                case this._view.icon_3:
                    pos = 3;
                    break;
                case this._view.icon_4:
                    pos = 4;
                    break;
            }
            ViewMgr.getIns().showSecondPop(ModName.Surface, SurfaceViewType.XianjianBuwei, {
                index: this._selCfg.index,
                pos
            })
        }

        private initTypeList(): void {
            let datas = this._proxy.buwei_types;
            let typeDatas: TabBaseItemData[] = [];
            for (let i = 0; i < datas.length; ++i) {
                let type = datas[i];
                let icon = "surface_type_" + this._headType + "_" + type;
                typeDatas.push({ icon: icon, param: type });
            }
            this._typeList.source = typeDatas;

            this._view.list_type.selectedIndex = this._selIndex = 0;
            this._selType = datas[this._view.list_type.selectedIndex];
        }

        private updateTypeListHint(): void {
            let list: TabBaseItemData[] = this._typeList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                let type = this._proxy.buwei_types[i];
                let hint = this._proxy.getTypeHintBySkill(type);
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
            // let cfgArr: XianjianConfig[] = this._proxy.getXianjianCfgList(this._selType, true);
            // let list: AvatarItemData[] = [];
            // let i: number = 0;
            // for (let cfg of cfgArr) {
            //     let info = this._proxy.getInfo(cfg.index);
            //     let star: number = info && info.star || 0;
            //     let showHint: boolean = false;
            //     let isSel: boolean = this._selIndex == i;
            //     list.push({cfg, star, showHint, isSel});
            //     i++;
            // }
            // this._itemList.replaceAll(list);

            let list = this._proxy.getListData(this._selType, true);
            for (let info of list) {
                info.showHint = this._proxy.getItemHintBySkill(info.cfg.index);
            }
            this._itemList.replaceAll(list);

            let curData = this._itemList.source[this._selIndex];
            curData.isSel = true;
            this._itemList.itemUpdated(curData);
        }

        private indexUpdateInfo(): void {
            this._selCfg = this._itemList.source[this._selIndex].cfg;

            this._view.lab_name.text = this._selCfg.name;
            this._view.img_sr.source = `avatarquality${this._selCfg.quality}`;

            let cfgs = getConfigByNameId(ConfigName.Jianfa, this._selCfg.index);
            for (let k in cfgs) {
                let cfg: JianfaConfig = cfgs[k];
                let icon: XianjianBuweiItem = this._view[`icon_${cfg.pos}`];
                let buwei = this._proxy.getBuwei({ index: this._selCfg.index, pos: cfg.pos });
                let lv: number = buwei && buwei.level || 0;
                let porp: number = cfg.cost[0][0];
                icon.setData(porp, lv);
                icon.redPoint.visible = this._proxy.getBuweiUp(this._selCfg.index, cfg);
            }

            let info = this._proxy.getInfo(this._selCfg.index);
            let star: number = info && info.star || 0;
            if (!star) {
                let countStr: string = TextUtil.addEnoughColor(0, 1);
                this._view.lab.textFlow = TextUtil.parseHtml(`激活${this._selCfg.name}开启${countStr}`);
            } else {
                let next: number = this._proxy.getNextStage(this._selCfg.index);
                let count: number = this._proxy.getCountByStage(this._selCfg.index, next);
                let countStr: string = TextUtil.addEnoughColor(count, this._buweis);
                this._view.lab.textFlow = TextUtil.parseHtml(`所有部位${next}阶可升阶${countStr}`);
            }

            this.updatePower();
            this.updateModel();
            this.updateSkill();
        }

        private updateSkill(): void {
            this._view.item_skill.setData(this._selCfg.skill, "");
            this._view.item_skill.setBg("xianjian_tubiaokuang2");
            this._view.item_skill.redPoint.visible = this._proxy.getSkillUp(this._selCfg.index);
        }

        private updatePower(): void {
            let info = this._proxy.getInfo(this._selCfg.index);
            let attr = info && info.all_attr;
            let power = attr && attr.showpower ? attr.showpower : 0;
            this._view.power2.setPowerValue(power);
        }

        private updateModel(): void {
            let index = this._selCfg.index;

            if (this._effIdx) {
                this.removeEffect(this._effIdx);
            }

            this._effIdx = this.addAnimate(index, this._view.grp_eff);
        }

        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let roots: string[] = [ModName.Surface, SurfaceViewType.Xianjian, MdrTabBtnType.TabBtnType02];
            if (data.node.indexOf(HintMgr.getType(roots)) > -1) {
                this.updateTypeListHint();
            }
        }
    }
}