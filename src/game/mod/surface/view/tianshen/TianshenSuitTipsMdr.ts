namespace game.mod.surface {

    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import YuanlingTaozhuangConfig = game.config.YuanlingTaozhuangConfig;
    import GameNT = base.GameNT;
    import facade = base.facade;

    export class TianshenSuitTipsMdr extends MdrBase {

        private _view: TianshenSuitTipsView = this.mark("_view", TianshenSuitTipsView);

        private _proxy: SurfaceProxy;

        private _data: ITianshenSuit;

        private _isOperating: boolean;
        private _conditionStr: string;

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
            this.onNt(SurfaceEvent.YUANLIN_SUIT_INFO_UPDATE, this.updateInfo, this);
            //this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_operate, TouchEvent.TOUCH_TAP, this.onClickOperate);
        }

        protected onShow(): void {
            super.onShow();

            this._data = this._showArgs;
            this._view.icon_suit.needHint = false;
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
                let suitInfo = this._proxy.getYuanlinSuitInfo(this._data.type);
                let suitCfg: YuanlingTaozhuangConfig = this._proxy.getYuanlinSuitCfg(this._data.type, suitInfo.level);
                this._data.step = suitCfg ? this._proxy.getYuanlinSuitStep(suitCfg) : 0;
                this._data.cfg = suitCfg;
                this._data.suit = suitInfo;
                this._data.hint = this._proxy.getYuanlinSuitHint(this._data.type);
            }
            
            let isMax: boolean = this._data.suit && (!this._data.suit.nextattrs || !this._data.suit.nextattrs.showpower);
            this._view.icon_suit.setData(this._data);
            this._view.lab_name.text = `元灵套装.${this._data.cfg.name}`;
            
            // 套装信息
            let nextSuitCfg: YuanlingTaozhuangConfig;
            let isSuitActive: boolean = this._data.suit && !!this._data.suit.level;
            this._view.currentState = isMax ? "max" : (isSuitActive ? "actived" : "notActived");
            if(isSuitActive) {              // 已激活
                nextSuitCfg = this._proxy.getYuanlinSuitCfg(this._data.type, this._data.suit.nextlevel);
                let desc = TextUtil.addColor(`已激活${this._data.suit.level}阶效果`, BlackColor.GREEN);
                this._view.baseDescItem1.updateShow(desc, "当前效果");
            } else {
                nextSuitCfg = this._proxy.getDefaultSuitCfg(this._data.type);
            }
            let reachCnt = this._proxy.getEqpReachCnt(this._data.type);
            this._conditionStr = nextSuitCfg ? `装备均达${nextSuitCfg.reach_class}阶可进阶` : "";
            let conditionStr = nextSuitCfg ? this._conditionStr + `(${reachCnt}/${nextSuitCfg.wear_quantity})` : "";
            let canUp = nextSuitCfg && reachCnt >= nextSuitCfg.wear_quantity;
            let conditionStr2 = TextUtil.addColor(conditionStr,canUp ? BlackColor.GREEN : BlackColor.RED);
            if(canUp){
                this._conditionStr = "";//用来判断是否可以激活升阶
            }
            this._view.baseDescItem2.updateShow(conditionStr2, "下阶效果");
            
            if(!isMax) {
                this._view.btn_operate.label = isSuitActive ? "升阶" : "激活";
            }
            //修改，属性读取配置描述
            let infos1 = this._proxy.changeInfos(this._data.cfg.desc, BlackColor.DEFAULT, BlackColor.GREEN);
            this._view.attrListZhuangshiView1.updateAttrByDescList(infos1);

            let hasNext = !!nextSuitCfg;
            this._view.baseDescItem2.visible = this._view.attrListZhuangshiView2.visible = hasNext;
            if(hasNext){
                let infos2 = this._proxy.changeInfos(nextSuitCfg.desc, BlackColor.GRAY, BlackColor.GRAY);
                this._view.attrListZhuangshiView2.updateAttrByDescList(infos2);
            }
            //this.updateAttr();
            this.updateHint();
        }
        
        // private updateAttr() {
        //     let suitAttr = this._data.suit && this._data.suit.attrs;          // 未激活时不显示当前属性，无需额外请求属性
        //     let suitNextAttr = this._data.suit ? this._data.suit.nextattrs : RoleUtil.getAttr(this._data.cfg.property);
        //     // if(suitAttr && suitAttr.showpower) {
        //         this._view.attrListZhuangshiView1.updateAttrAdd(suitAttr, BlackColor.GREEN, "\n", " +", BlackColor.DEFAULT);
        //     // }
        //     // if(suitNextAttr && suitNextAttr.showpower) {
        //         this._view.attrListZhuangshiView2.updateAttrAdd(suitNextAttr, BlackColor.GRAY, "\n", " +", BlackColor.GRAY);
        //     // }
        //     this._view.baseDescItem2.visible = suitNextAttr && !!suitNextAttr.showpower;
        // }
        private onHintUpdate(n: GameNT) {
            let data: IHintData = n.body;
            if (data.node == HintType.TianshenSuitOpe) {
                let hint = this._proxy.getYuanlinSuitHint(this._data.type);
                this._view.btn_operate.setHint(hint);
            }
        }

        private updateHint(): void {
            this._view.btn_operate.setHint(this._data.hint);
        }

        private onClickOperate(e: TouchEvent) {
            if(!this._data) {
                return;
            }
            if(this._conditionStr){
                PromptBox.getIns().show(this._conditionStr);
                return;
            }
            this._isOperating = true;
            this._proxy.c2s_yuanling_equip_suit_levelup(this._data.type);
        }

    }
}