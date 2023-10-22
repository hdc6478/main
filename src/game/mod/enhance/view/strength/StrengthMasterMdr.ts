namespace game.mod.enhance {

    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;

    export class StrengthMasterMdr extends MdrBase {
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
            let addEventListener = this.onEgret.bind(this);
            this.onNt(EnhanceEvent.UPDATE_STRENGTH_MASTER_INFO, this.initMaster, this);
            addEventListener(this._view.btn_use, TouchEvent.TOUCH_TAP, this.onClickStrengthUse);
        }
        
        protected onShow(): void {
            super.onShow();
            this._view.img_icon.source = "strength_master";
            this.initMaster();
            this.updateBtnHint();
        }

        protected onHide(): void {
            super.onHide();
        }

        /** 初始化数据*/
        private initMaster() {
            this._view.power.setPowerValue(this._model.strengthMasterPower);
            this._view.lab_title.text = StringUtil.substitute(getLanById(LanDef.strength_master_step), [this._model.strengthMaster.level]);
            
            let master = this._model.strengthMaster;
            if(!master) {
                return;
            }
            let reachCnt = this._model.strengthMasterReachCnt;
            let curLvCfg = this._model.getLvCfg(this._proxy.getStrengthMasterLvId(master.level));
            let nextLvCfg = this._model.getLvCfg(this._proxy.getStrengthMasterLvId(master.level + 1));
            let data: IMasterData;
            let masterDatas: IMasterData[] = [];
            if(master.attrs && !!master.attrs.showpower) {
                let txt1 = (curLvCfg ? curLvCfg.levelup_exp : "");
                data = {
                    isCur: true,
                    masterLv: master.level,
                    attr: master.attrs,
                    reachTitle: getLanById(LanDef.all_strength) + " " + TextUtil.addColor("+" + txt1, WhiteColor.GREEN),
                    curReachCnt: this._model.strengthMinLv,
                    needReachCnt: (curLvCfg ? curLvCfg.levelup_exp : 0),
                };
                masterDatas.push(data);
            }
            if(master.next_attrs && !!master.next_attrs.showpower) {
                let txt2 = (nextLvCfg ? nextLvCfg.levelup_exp : "");
                data = {
                    isCur: false,
                    masterLv: master.level + 1,
                    attr: master.next_attrs,
                    reachTitle: getLanById(LanDef.all_strength) + " " + TextUtil.addColor("+" + txt2, WhiteColor.GREEN),
                    curReachCnt: this._model.strengthMinLv,
                    needReachCnt: (nextLvCfg ? nextLvCfg.levelup_exp : 0),
                };
                masterDatas.push(data);
            }
            this._list.replaceAll(masterDatas);

            this._view.btn_use.label = getLanById(LanDef.rank_up);
            let str = !!master.reach_level ? getLanById(LanDef.strengthen6) : getLanById(LanDef.strength_total_lv);
            let max:boolean= !!master.reach_level;
            this._view.btn_use.visible = max;
            this._view.img_max.visible = !max;

            this._view.lab_tip.text = str + reachCnt;
            this.updateBtnHint();
        }

        /**
         * 升阶按钮红点
         * @returns 
         */
         public updateBtnHint(): void {
            let hint = this._proxy.updateStrengthMasterBtnHint();
            this._view.btn_use.setHint(hint);
        }

        /** 升阶*/
        private onClickStrengthUse() {
            let isMax = this._model.isStrengthMasterMaxLv();
            if(isMax) {
                PromptBox.getIns().show(getLanById(LanDef.max_step));
                return;
            }
            this._proxy.c2s_equip_strength_master();
        }
    }
}