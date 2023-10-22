namespace game.mod.enhance {

    import TouchEvent = egret.TouchEvent;
    import gem_master_data = msg.gem_master_data;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class GemMasterMdr extends MdrBase {
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

            this._list = new ArrayCollection();
            this._view.list_attr.itemRenderer = StrengthMasterRender;

            this._proxy = this.retProxy(ProxyType.Enhance);
            this._model = this._proxy.getModel();
            this._view.secondPop.titleStr = getLanById(LanDef.strengthen5);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(EnhanceEvent.UPDATE_GEM_MASTER_INFO, this.updateGemMstAttr, this);
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_use, TouchEvent.TOUCH_TAP, this.onClickGemUse);
        }

        protected onShow(): void {
            super.onShow();
            this._view.img_icon.source = "btn_gem_master";
            this._view.secondPop.updateTitleStr(getLanById(LanDef.gem_master));
            this._view.list_attr.dataProvider = this._list;
            this.updateGemMstAttr();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickGemUse() {
            this._proxy.c2s_equip_gem_master();
        }

        //属性
        private updateGemMstAttr() {
            let master: gem_master_data = this._model.gemMaster;
            if (!master) {
                return;
            }
            this._view.power.setPowerValue(this._model.gemMasterPower);
            this._view.lab_title.text = StringUtil.substitute(getLanById(LanDef.gem_master_step), [master.level]);

            let curLv: number = master.level;
            this._view.btn_use.label = curLv > 0 ? getLanById(LanDef.rank_up) : getLanById(LanDef.active);

            let allLv: number = this._showArgs || 0;
            this._view.lab_tip.text = getLanById(LanDef.gem_tip1) + "：" + allLv;

            let data: IMasterData;
            let masterDatas: IMasterData[] = [];
            if (master.attrs && !!master.attrs.showpower) {
                let txt1 = master.gem_lv || 0;
                data = {
                    isCur: true,
                    masterLv: curLv,
                    attr: master.attrs,
                    reachTitle: getLanById(LanDef.gem_lv_request) + " " + TextUtil.addColor("+" + txt1, WhiteColor.GREEN),
                    curReachCnt: allLv,
                    needReachCnt: master.gem_lv || 0
                };
                masterDatas.push(data);
            }
            if (master.next_attrs && !!master.next_attrs.showpower) {
                let txt2 = master.next_gem_lv || 0;
                data = {
                    isCur: false,
                    masterLv: curLv + 1,
                    attr: master.next_attrs,
                    reachTitle: getLanById(LanDef.gem_lv_request) + " " + TextUtil.addColor("+" + txt2, WhiteColor.GREEN),
                    curReachCnt: allLv,
                    needReachCnt: master.next_gem_lv || 0
                };
                masterDatas.push(data);
            }
            this._list.replaceAll(masterDatas);

            let nextLev: number = (master.next_gem_lv || 0);
            this._view.btn_use.redPoint.visible = nextLev > 0 && allLv >= nextLev;
            let notMax: boolean = master.next_attrs && !!master.next_attrs.showpower;
            this._view.btn_use.visible = notMax;
            this._view.img_max.visible = !notMax;
        }

    }
}