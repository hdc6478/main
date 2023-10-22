namespace game.mod.surface {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import YuanlingZhuangbeiConfig = game.config.YuanlingZhuangbeiConfig;
    import YuanlingTaozhuangConfig = game.config.YuanlingTaozhuangConfig;
    import SpecialAttrConfig = game.config.SpecialAttrConfig;
    import ItemTapEvent = eui.ItemTapEvent;
    import GameNT = base.GameNT;

    export class TianshenEquipMdr extends EffectMdrBase {

        private _view: TianshenEquipView = this.mark("_view", TianshenEquipView);
        
        private _proxy: SurfaceProxy;
        
        private _listEquipData: ArrayCollection;
        private _listTypeData: ArrayCollection;

        private _equipPos: number[] = [];       // 已有装备的位置

        private _curType: number;               // 当前选中的分类（1~4）
        private _effId: number;
        private _suitData: ITianshenSuit;

        private readonly _posCnt: number = 8;

        protected onInit(): void {
            super.onInit();
            
            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;
            
            this._proxy = this.retProxy(ProxyType.Surface);

            this._listEquipData = new ArrayCollection();
            this._view.list_equip.dataProvider = this._listEquipData;
            this._view.list_equip.itemRenderer = TianshenIconEquip;

            this._listTypeData = new ArrayCollection();
            this._view.list_type.dataProvider = this._listTypeData;
            this._view.list_type.itemRenderer = TianshenTypeRender;
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(SurfaceEvent.YUANLIN_EQUIP_INFO_UPDATE, this.updateInfo, this);
            this.onNt(SurfaceEvent.YUANLIN_SUIT_INFO_UPDATE, this.updateInfo, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_equip, ItemTapEvent.ITEM_TAP, this.onClickEquipList);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickTypeList);
            addEventListener(this._view.icon_suit, TouchEvent.TOUCH_TAP, this.onClickSuitIcon);
        }

        protected onShow(): void {
            super.onShow();
            this.updateInfo();
        }
        
        protected onHide(): void {
            this._effId = 0;
            super.onHide();
        }

        private updateInfo() {
            if(!this._curType) {
                this._curType = 1;
            }

            let typeDatas = [];
            let typeAry = this._proxy.getYuanlingSuitTypeAry();
            for(let type of typeAry) {
                let suitInfo = this._proxy.getYuanlinSuitInfo(type);
                let isSuitActive: boolean = suitInfo && !!suitInfo.level;

                let tData: {type: number, suitActive: boolean, reachCnt: number, hint: boolean, isSel?: boolean} = {
                    type: type,
                    suitActive: isSuitActive,
                    reachCnt: this._proxy.getEqpReachCnt(type),
                    hint: this._proxy.getYuanlinEqpTypeHint(type),
                    isSel: type == this._curType
                };
                typeDatas.push(tData);
            }
            this._listTypeData.replaceAll(typeDatas);

            this._view.list_type.selectedIndex = this._curType - 1;
            this.updateCurrentInfo();
        }
        
        //当前选中
        private updateCurrentInfo() {
            this._view.power.setPowerValue(this._proxy.getYuanlinPower(this._curType));

            // 模型
            // if(this._effId){
            //     this.removeEffect(this._effId);
            // }

            if(!this._effId) {
                let cfg: {[index: number]: YuanlingTaozhuangConfig} = getConfigByNameId(ConfigName.TianshenTaoZhuang, this._curType);
                if (cfg && cfg[1] && cfg[1].icon) {
                    let modelName = ResUtil.getModelUrlByModelName(ConfigHead.Tianshen, cfg[1].icon, Direction.DOWN, ActionName.STAND, true, false);
                    let scale: number = cfg[1]['scale'] ? cfg[1]['scale'] / 10000 : 1;//缩放
                    this._effId = this.addEftByParent(modelName, this._view.grp_eff, 0, 0, -1, null, -1, scale);
                } else {
                    this._effId = this.addAnimate(640025009, this._view.grp_eff);
                }
            }

            // 装备
            let list: ITianshenEquip[] = [];
            this._equipPos = [];
            for (let pos = 1; pos <= this._posCnt; pos++) {
                let eqpInfo = this._proxy.getYuanlinEqpInfo(this._curType, pos);
                let eqpCfg: YuanlingZhuangbeiConfig;
                let isEqpActive: boolean = eqpInfo && !eqpInfo.index.isZero();
                if(isEqpActive) {              // 已激活
                    eqpCfg = this._proxy.getYuanlinEqpCfg(eqpInfo.index.toNumber());
                    this._equipPos.push(pos);
                } else {
                    eqpCfg = this._proxy.getDefaultEqpCfg(this._curType, pos);
                }
                let eqpData: ITianshenEquip = {
                    type: this._curType,
                    pos: pos,
                    step: isEqpActive && eqpCfg ? this._proxy.getYuanlinEqpStep(eqpCfg.index) : 0,
                    cfg: eqpCfg,
                    eqp: eqpInfo,
                    hint: this._proxy.getYuanlinEqpHint(this._curType, pos)
                };
                list.push(eqpData);
            }
            this._listEquipData.replaceAll(list);

            // 套装
            let suitInfo = this._proxy.getYuanlinSuitInfo(this._curType);
            let isSuitActive: boolean = suitInfo && !!suitInfo.level;
            let suitCfg: YuanlingTaozhuangConfig;
            if(isSuitActive) {              // 已激活
                suitCfg = this._proxy.getYuanlinSuitCfg(this._curType, suitInfo.level);
            } else {
                suitCfg = this._proxy.getDefaultSuitCfg(this._curType);
            }
            this._suitData = {
                type: this._curType,
                step: isSuitActive && suitCfg ? this._proxy.getYuanlinSuitStep(suitCfg) : 0,
                cfg: suitCfg,
                suit: suitInfo,
                hint: this._proxy.getYuanlinSuitHint(this._curType)
            };

            let sAttrCfg: SpecialAttrConfig = getConfigByNameId(ConfigName.SpecialAttr, suitCfg.special_property);
            this._view.icon_suit.setData(this._suitData);
            this._view.lab_suit_name.text = `元灵套装：${suitCfg.name}`;
            let desc = suitCfg.desc + "\n" + sAttrCfg.desc.replace(/#N/g, "\n");
            this._view.lab_suit_desc.text = StringUtil.substitute(desc, [sAttrCfg.maxlimit]);
        }

        private onHintUpdate(n: GameNT) {
            let data: IHintData = n.body;
            if (data.node == HintType.TianshenEqpOpe) {                 // 装备
                let list: ITianshenEquip[] = [];
                for(let i = 0, len = this._listEquipData.length; i < len; i ++) {
                    let eqpData: ITianshenEquip = this._listEquipData.getItemAt(i);
                    eqpData.hint = this._proxy.getYuanlinEqpHint(this._curType, eqpData.pos);
                    list.push(eqpData);
                }
                this._listEquipData.replaceAll(list);
                this.updateTypeHint();
            } else if (data.node == HintType.TianshenSuitOpe) {         // 套装
                this._view.icon_suit.redPoint.visible = data.value;
                this.updateTypeHint();
            }
        }

        private updateTypeHint(): void {
            let typeDatas = [];
            for(let i = 0, len = this._listTypeData.length; i <= len; i++) {
                let tData: {type: number, suitActive: boolean, reachCnt: number, hint: boolean} = this._listTypeData.getItemAt(i);
                if(!tData) {
                    continue;
                }
                tData.hint = this._proxy.getYuanlinEqpTypeHint(tData.type);
                typeDatas.push(tData);
            }
            this._listTypeData.replaceAll(typeDatas);
        }
        
        private onClickEquipList(e: ItemTapEvent) {
            ViewMgr.getIns().showSecondPop(ModName.Surface, SurfaceViewType.TianshenEquipTips, e.item);
        }
        
        private onClickTypeList(e: ItemTapEvent) {
            let typeData: {type: number, reachCnt: number, hint: boolean} = e.item;
            if(typeData.type == this._curType){
                return;
            }

            //清除选中特效
            let datas: {isSel?: boolean}[] = this._listTypeData.source;
            let lastData = datas[this._curType - 1];
            lastData.isSel = false;
            this._listTypeData.itemUpdated(lastData);

            this._curType = typeData.type;

            //选中特效
            let curData = datas[this._curType - 1];
            curData.isSel = true;
            this._listTypeData.itemUpdated(curData);

            //切换移除模型，重新加载
            if(this._effId){
                this.removeEffect(this._effId);
                this._effId = null;
            }

            this.updateCurrentInfo();
        }

        private onClickSuitIcon(e: TouchEvent) {
            if(!this._suitData) {
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Surface, SurfaceViewType.TianshenSuitTips, this._suitData);
        }

    }
}