namespace game.mod.enhance {

    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;

    export class AdvancedMasterMdr extends MdrBase {
        private _view: GemMasterView = this.mark("_view", GemMasterView);
        private _proxy: EnhanceProxy;
        private _model: EnhanceModel;
        private _list: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.verticalCenter = 0;
            this._view.horizontalCenter = 0;
            this._proxy = this.retProxy(ProxyType.Enhance);
            this._model = this._proxy.getModel();

            this._list = new ArrayCollection();
            this._view.list_attr.itemRenderer = StrengthMasterRender;
            this._view.list_attr.dataProvider = this._list;
        }
        
        protected addListeners(): void {
            super.addListeners();
            this.onNt(EnhanceEvent.UPDATE_ADVANCED_MASTER_INFO, this.initMaster, this);
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_use, TouchEvent.TOUCH_TAP, this.onClickAdvancedUse);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow(): void {
            super.onShow();
            this._view.img_icon.source = "adv_master";
            this._view.secondPop.updateTitleStr(getLanById(LanDef.advance_suit));
            this._view.isAdvance = true;

            this.initMaster();
        }

        protected onHide(): void {
            super.onHide();
        }

        /** 初始化数据*/
        private initMaster() {
            this._view.power.setPowerValue(this._model.advancedMasterPower);
            this._view.img_icon2.source = this._model.advancedMaster.level ? "jinjie_" + this._model.advancedMaster.level : "";
            this._view.img_icon2.x = this._model.advancedMaster.level ? 159 : 80;
            this._view.lab_tip.text = "";
            this._view.btn_use.redPoint.visible = this._proxy.updateAdvanceMasterBtnHint();
            
            let master = this._model.advancedMaster;
            if (!master) {
                return;
            }
            let curLvCfg = this._model.getLvCfg(this._proxy.getAdvancedMasterLvId(master.level));
            let nextLvCfg = this._model.getLvCfg(this._proxy.getAdvancedMasterLvId(master.level + 1));
            let data: IMasterData;
            let masterDatas: IMasterData[] = [];
            if(master.attrs && !!master.attrs.showpower) {
                let txt1 = TextUtil.addColor((curLvCfg ? curLvCfg.levelup_exp : 0) + "", WhiteColor.GREEN);
                data = {
                    isCur: true,
                    masterLv: master.level,
                    attr: master.attrs,
                    reachTitle: StringUtil.substitute(getLanById(LanDef.advance_request), [txt1]),
                    curReachCnt: this._model.advancedMinLv,
                    needReachCnt: (curLvCfg ? curLvCfg.levelup_exp : 0),
                };
                masterDatas.push(data);
            }
            if(master.next_attrs && !!master.next_attrs.showpower) {
                let txt2 = TextUtil.addColor((nextLvCfg ? nextLvCfg.levelup_exp : 0) + "", WhiteColor.GREEN);
                data = {
                    isCur: false,
                    masterLv: master.level + 1,
                    attr: master.next_attrs,
                    reachTitle: StringUtil.substitute(getLanById(LanDef.advance_request), [txt2]),
                    curReachCnt: this._model.advancedMinLv,
                    needReachCnt: (nextLvCfg ? nextLvCfg.levelup_exp : 0),
                };
                masterDatas.push(data);
            }
            this._list.replaceAll(masterDatas);
            this._view.btn_use.label = getLanById(LanDef.enhance_3);
            let max:boolean = !!master.rench_level;
            this._view.btn_use.enabled = max;
            this._view.btn_use.visible = max;
            this._view.img_max.visible = !max;
        }

        /** 升阶*/
        private onClickAdvancedUse() {
            this._proxy.c2s_equip_advanced_master();
        }
    }
}