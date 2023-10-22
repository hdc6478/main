namespace game.mod.role {

    import AyahLevelConfig = game.config.AyahLevelConfig;
    import AyahEventFuncConfig = game.config.AyahEventFuncConfig;
    import OpenFunctionConfig = game.config.OpenFunctionConfig;
    import LanDef = game.localization.LanDef;

    export class XiuxianNvpuLikeMdr extends EffectMdrBase {
        private _view: XiuxianNvpuLikeView = this.mark("_view", XiuxianNvpuLikeView);
        private _proxy: XiuxianNvpuProxy;
        private _listBtn: eui.ArrayCollection;
        private _listArrow: eui.ArrayCollection;
        private _listTequan: eui.ArrayCollection;
        private _selIdx = 0;
        private _effId: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XiuxianNvpu);
            this._view.list_btn.itemRenderer = XiuxianNvpuIcon;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
            this._view.list_tequan.itemRenderer = BaseZhuangshiItem;
            this._view.list_tequan.dataProvider = this._listTequan = new eui.ArrayCollection();
            this._view.list_arrow.dataProvider = this._listArrow = new eui.ArrayCollection();

            this._view.secondPop.bgStr=ResUtil.getUiJpg('haogandu_bg');
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.btn_huanhua, egret.TouchEvent.TOUCH_TAP, this.onClickBtnHuanhua, this);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickListBtn, this);
            this.onNt(RoleEvent.ON_XIUXIANNVPU_INFO_UPDATE, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
            this.removeEffect(this._effId);
            this._effId = null;

        }

        private onUpdateView(): void {
            this.updateListBtn();
            this.updateView();
        }

        private updateView(): void {
            this._view.btn_huanhua.visible = this._selIdx + 1 <= this._proxy.level && this._selIdx + 1 != this._proxy.show_index;

            this._view.likeBtn.data = {showHint: false, level: this._selIdx + 1};

            this.updateModel();
            this.updateListTequan();
        }

        private updateModel(): void {
            let shenlingCfg = this._proxy.shenlingCfg;
            this._view.nameItem.updateShow(shenlingCfg.name, shenlingCfg.quality);
            let icon = shenlingCfg.icons.split(',')[this._selIdx];
            let modelUrl = ResUtil.getModelUrlByModelName(ConfigHead.Shenling, icon, Direction.DOWN, ActionName.STAND, true, false);
            let data = ResUtil.getSurfaceData(this._proxy.shenlingId, Direction.DOWN, ActionName.STAND, true, false);
            this.removeEffect(this._effId);
            this._effId = this._effHub.add(modelUrl, 0, 0, null, 0, this._view.gr_eft, -1, data && data.scale || 1);
        }

        private updateListBtn(): void {
            let list: number[] = [];
            let cfgList: AyahLevelConfig[] = getConfigListByName(ConfigName.XiuxianNvpuLevel);
            for (let cfg of cfgList) {
                list.push(cfg.level);
            }
            this._listBtn.replaceAll(list);
            this._view.list_btn.selectedIndex = this._selIdx;

            let arrowAry: any[] = [];
            arrowAry.length = list.length - 1;
            this._listArrow.replaceAll(arrowAry);
        }

        private updateListTequan(): void {
            let cfg: AyahLevelConfig = getConfigByNameId(ConfigName.XiuxianNvpuLevel, this._selIdx + 1);
            let list: string[] = [];
            if (cfg && cfg.event_list) {
                for (let id of cfg.event_list) {
                    let eventFuncCfg: AyahEventFuncConfig = getConfigByNameId(ConfigName.XiuxianNvpuEventFunc, id);
                    if (!eventFuncCfg || !eventFuncCfg.open_func) {
                        continue;
                    }
                    let funcCfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, eventFuncCfg.open_func);
                    if (funcCfg) {
                        list.push(getLanById(LanDef.advent_god_cue8) + getLanById(LanDef.xiuxiannvpu_tips7) + funcCfg.name);
                    }
                }
            }
            this._listTequan.replaceAll(list);
        }

        //todo
        private onClickBtnHuanhua(): void {
            this._proxy.c2s_ayah_apparent(this._selIdx + 1);
        }

        private onClickListBtn(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            this._selIdx = itemIdx;
            this.updateView();
            this._view.scroller.viewport.scrollV = 0;
        }
    }
}