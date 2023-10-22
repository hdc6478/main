namespace game.mod.surface {

    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import YuanlingZhuangbeiConfig = game.config.YuanlingZhuangbeiConfig;
    import YuanlingTaozhuangConfig = game.config.YuanlingTaozhuangConfig;
    import PropConfig = game.config.PropConfig;
    import attributes = msg.attributes;
    import yuanling_equip_suit = msg.yuanling_equip_suit;
    import GameNT = base.GameNT;
    import facade = base.facade;

    export class TianshenEquipTipsMdr extends MdrBase {

        private _view: TianshenEquipTipsView = this.mark("_view", TianshenEquipTipsView);

        private _proxy: SurfaceProxy;

        private _data: ITianshenEquip;

        private _isOperating: boolean;

        private _suitInfo: yuanling_equip_suit;
        private _suitCfg: YuanlingTaozhuangConfig;
        private _cost: number[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Surface);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(SurfaceEvent.YUANLIN_EQUIP_INFO_UPDATE, this.updateInfo, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_operate, TouchEvent.TOUCH_TAP, this.onClickOperate);
        }

        protected onShow(): void {
            super.onShow();

            this._data = this._showArgs;
            this._view.currentState = "default";
            this._view.icon_equip.needHint = false;
            this._view.attrListZhuangshiView1.setListX();
            this._view.attrListZhuangshiView2.setListX();
            this.updateInfo();
        }

        protected onHide(): void {
            this._isOperating = false;
            super.onHide();
        }

        private updateInfo(): void {
            if(!this._data) {
                return;
            }

            if(this._isOperating) {            // 激活、升阶后，id会改变
                this._isOperating = false;
                let eqpInfo = this._proxy.getYuanlinEqpInfo(this._data.type, this._data.pos);
                let eqpCfg: YuanlingZhuangbeiConfig = this._proxy.getYuanlinEqpCfg(eqpInfo.index.toNumber());
                this._data.step = eqpCfg ? this._proxy.getYuanlinEqpStep(eqpCfg.index) : 0;
                this._data.cfg = eqpCfg;
                this._data.eqp = eqpInfo;
                this._data.hint = this._proxy.getYuanlinEqpHint(this._data.type, this._data.pos);
            }

            let isMax: boolean = this._data.eqp && (!this._data.eqp.nextattrs || !this._data.eqp.nextattrs.showpower);
            if(isMax) {
                this._view.currentState = "max";
            }

            // 当前装备信息
            let prop: PropConfig = getConfigByNameId(ConfigName.Prop, this._data.cfg.consume[0][0]);
            let isEqpActive: boolean = this._data.eqp && !this._data.eqp.index.isZero();
            this._view.icon_equip.data = this._data;
            this._view.lab_name.text = prop.name;

            // 套装信息
            this._suitInfo = this._proxy.getYuanlinSuitInfo(this._data.type);
            let isSuitActive: boolean = this._suitInfo && !!this._suitInfo.level;
            let nextSuitCfg: YuanlingTaozhuangConfig;
            if(isSuitActive) {              // 已激活
                this._suitCfg = this._proxy.getYuanlinSuitCfg(this._data.type, this._suitInfo.level);
                nextSuitCfg = this._proxy.getYuanlinSuitCfg(this._data.type, this._suitInfo.nextlevel);
                let desc = TextUtil.addColor(`已激活${this._suitInfo.level}阶效果`, BlackColor.GREEN);
                this._view.baseDescItem.updateShow(desc, `元灵套装.${this._suitCfg.name}`);
            } else {
                this._suitCfg = this._proxy.getDefaultSuitCfg(this._data.type);
                nextSuitCfg = this._suitCfg;
                this._view.baseDescItem.updateShow("", `元灵套装.${this._suitCfg.name}`);
            }

            let reachCnt = this._proxy.getEqpReachCnt(this._data.type);
            let conditionStr = nextSuitCfg ? `装备均达${nextSuitCfg.reach_class}阶可进阶(${reachCnt}/${nextSuitCfg.wear_quantity})` : "";
            this._view.lab_condition.lb_desc.textFlow = TextUtil.parseHtml(TextUtil.addColor(conditionStr,
                nextSuitCfg && reachCnt >= nextSuitCfg.wear_quantity ? BlackColor.GREEN : BlackColor.RED));
            
            if(!isMax) {
                this._cost = this._data.cfg.consume[0];
                this._view.icon_cost.setData(this._cost);
                this._view.btn_operate.label = isEqpActive ? "升阶" : "激活";
            }

            //修改，属性读取配置描述
            this._view.attrListZhuangshiView1.visible = isSuitActive;
            if(isSuitActive) {
                let infos1 = this._proxy.changeInfos(this._suitCfg.desc, BlackColor.DEFAULT, BlackColor.GREEN);
                this._view.attrListZhuangshiView1.updateAttrByDescList(infos1);
            }
            else {
                this._view.attrListZhuangshiView1.updateAttrByDescList([]);
            }

            let hasNext = !!nextSuitCfg && !isMax;
            this._view.attrListZhuangshiView2.visible = hasNext;
            if(hasNext){
                let infos2 = this._proxy.changeInfos(nextSuitCfg.desc, BlackColor.GRAY, BlackColor.GRAY);
                this._view.attrListZhuangshiView2.updateAttrByDescList(infos2);
            }


            this.updateAttr();
            this.updateHint();
        }

        private updateAttr() {
            // 装备属性
            let attr: attributes;
            if(this._data.eqp) {
                attr = this._data.eqp.attrs.showpower ? this._data.eqp.attrs : this._data.eqp.nextattrs;
            }
            if(!attr) {         // 未激活
                attr = RoleUtil.getAttr(this._data.cfg.wear_property);
            }
            attr && this._view.baseAttrItem.updateShow(attr, true, getLanById(LanDef.base_attr));

            // 套装属性
            // let suitAttr = this._suitInfo && this._suitInfo.attrs;          // 未激活时不显示当前属性，无需额外请求属性
            // let suitNextAttr = this._suitInfo ? this._suitInfo.nextattrs : RoleUtil.getAttr(this._suitCfg.property);
            // // if(suitAttr && suitAttr.showpower) {
            //     this._view.attrListZhuangshiView1.updateAttrAdd(suitAttr, BlackColor.GREEN, "\n", " +", BlackColor.DEFAULT);
            // // }
            // // if(suitNextAttr && suitNextAttr.showpower) {
            //     this._view.attrListZhuangshiView2.updateAttrAdd(suitNextAttr, BlackColor.GRAY, "\n", " +", BlackColor.GRAY);
            // // }
        }

        private onHintUpdate(n: GameNT) {
            let data: IHintData = n.body;
            if (data.node == HintType.TianshenEqpOpe) {
                let hint = this._proxy.getYuanlinEqpHint(this._data.type, this._data.pos);
                this._view.btn_operate.setHint(hint);           // data.value 不能区分不同的 pos
            }
        }

        private updateHint(): void {
            this._view.btn_operate.setHint(this._data.hint);
        }

        private onClickOperate(e: TouchEvent) {
            if(!this._data) {
                return;
            }
            if(!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])){
                return;
            }
            this._isOperating = true;
            this._proxy.c2s_yuanling_equip_levelup(this._data.type, this._data.pos);
        }

    }
}