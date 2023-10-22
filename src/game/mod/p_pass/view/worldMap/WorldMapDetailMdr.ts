namespace game.mod.pass {

    import ArrayCollection = eui.ArrayCollection;
    import WorldmapConfig = game.config.WorldmapConfig;
    import TouchEvent = egret.TouchEvent;
    import Head = game.mod.Head;
    import CostIcon = game.mod.CostIcon;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;

    export class WorldMapDetailMdr extends MdrBase {
        private _view: WorldMapDetailView = this.mark("_view", WorldMapDetailView);

        private _proxy: PassProxy;
        private _model: PassModel;

        private _cfg: WorldmapConfig;
        private _isOpen: boolean;

        private _qiyuanDatas: ArrayCollection;
        private _rewardDatas0: ArrayCollection;
        private _rewardDatas: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();

            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;

            this._qiyuanDatas = new ArrayCollection();
            this._view.list_qiyuan.itemRenderer = WorldMapQiyuanIcon;
            this._view.list_qiyuan.dataProvider = this._qiyuanDatas;
            
            this._rewardDatas0 = new ArrayCollection();
            this._view.list_reward0.itemRenderer = WorldMapOfflineIcon;
            this._view.list_reward0.dataProvider = this._rewardDatas0;
            
            this._rewardDatas = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._rewardDatas;
            
            this._proxy = this.retProxy(ProxyType.Pass);
            this._model = this._proxy.getModel();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(PassEvent.UPDATE_PASS_WORLD_MAP_TOP_INFO, this.updateData, this);
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            for(let i: number = 0; i < 3; i++) {
                let head: Head = this._view["head" + (i + 1)];
                if(!head) {
                    continue;
                }
                addEventListener(head, TouchEvent.TOUCH_TAP, this.onHeadClick);
            }
            addEventListener(this._view.list_qiyuan, ItemTapEvent.ITEM_TAP, this.onQyClick);
        }

        protected onShow(): void {
            super.onShow();

            this._cfg = this._showArgs[0];
            this._isOpen = this._showArgs[1];
            if(!this._cfg) {
                return;
            }

            if(!this._model.worldMapTopInfos[this._cfg.index]) {
                this._proxy.c2s_mainline_topthree(this._cfg.index);
            }
            this.updateData();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected updateData() {
            this._view.secondPop.updateTitleStr(StringUtil.substitute(getLanById(LanDef.pass_chapter), [this._proxy.getChapterByIdx(this._cfg.index)]));
            this._view.lab_step.text = "(" + this._proxy.getStepByIdx(this._cfg.gate[0]) + "-" + this._proxy.getStepByIdx(this._cfg.gate[1]) + getLanById(LanDef.pass_step) + ")";
            this._view.lab_chapter_name.text = this._cfg.name;
            this._view.lab_desc.text = this._cfg.dec;

            this._view.lab_open_tip.visible = !this._isOpen;
            if(!this._isOpen) {
                let gate = this._proxy.getStepByIdx(this._cfg.gate[0]) - 1 || 1;
                this._view.lab_open_tip.text = `通关${gate}关开启`;
            }

            this._view.img_no_qy.visible = !this._cfg.task || this._cfg.task.length == 0;
            this._view.img_no_awd.visible = !this._cfg.add_award || this._cfg.add_award.length == 0;
            if(this._qiyuanDatas.length) {
                this._qiyuanDatas.replaceAll(this._cfg.task);
            } else {
                this._qiyuanDatas.source = this._cfg.task;
            }
            if(this._rewardDatas.length) {
                this._rewardDatas.replaceAll(this._cfg.add_award);
            } else {
                this._rewardDatas.source = this._cfg.add_award;
            }
            if(this._rewardDatas0.length) {
                this._rewardDatas0.replaceAll(this._cfg.show_award);
            } else {
                this._rewardDatas0.source = this._cfg.show_award;
            }

            let roleInfos = this._model.worldMapTopInfos[this._cfg.index];
            if(!roleInfos) {
                return;
            }
            for(let i: number = 0, len = roleInfos.length; i < len && i < 3; i++) {
                let roleG: eui.Group = this._view["grp_role" + (i + 1)];
                let head: Head = this._view["head" + (i + 1)];
                let nameLab: eui.Label = this._view["lab_role_name" + (i + 1)];
                let info = roleInfos[i];
                if(roleG && head && nameLab && info) {
                    roleG.visible = true;
                    head.data = info;
                    head.updateHeadShow(info.icon, info.icon_frame, info.sex);
                    nameLab.text = info.name;
                }
            }
        }

        private onHeadClick(e: TouchEvent): void {
            let head: Head = e.currentTarget as Head;
            if(head && head.data) {
                // let info = head.data as mainline_topthree_info;
                //todo
            }
        }
        
        private onQyClick(e: ItemTapEvent) {
            this._model.worldMapCurTaskId = e.item;
            
            this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_SEL_TAB, PassMainBtnType.Qiyuan);
            this.hide();
        }

    }
}