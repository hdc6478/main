namespace game.mod.pass {

    import TouchEvent = egret.TouchEvent;

    export class WorldMapContent extends BaseRenderer {

        public img_bg: eui.Image;

        private readonly _cityCnt: number = 10;

        constructor() {
            super();
            this.skinName = "skins.pass.WorldMapContentSkin";
        }
        
        protected onAddToStage(): void {
            super.onAddToStage();
            this.img_bg.source = ResUtil.getUiJpg("worldMap1");
            for(let i = 0; i < this._cityCnt; i++) {
                let btnItem = this[`btn_${i}`] as WorldMapBtn;
                if (!btnItem) {
                    continue;
                }
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, btnItem.btn_bg,this.onClickBtn,this);
                this.addEventListenerEx(TouchEvent.TOUCH_TAP, btnItem.btn_box,this.onBtnGetClick,this);
            }
        }

        protected dataChanged(): void {
            super.dataChanged();

            let mapData: IPassWorldMapData[] = this.data;
            if(!mapData) {
                return;
            }

            for (let i = 0, len = mapData.length; i < this._cityCnt; i++) {
                let btnItem = this[`btn_${i}`] as WorldMapBtn;
                if (!btnItem) {
                    continue;
                }
                if(i >= len) {
                    btnItem.visible = false;
                    continue;
                }
                let d: IPassWorldMapData = mapData[i];
                let cfgData = d.cfg;
                btnItem.visible = true;
                btnItem.setData(cfgData);
                btnItem.isCurMap = d.isCurMap;
                
                if(d.isPass) {                              // 已通关
                    btnItem.isSelect = true;
                    btnItem.setBox(d.hint, d.hint);
                } else if(btnItem.isCurMap) {               // 当前关卡
                    btnItem.isSelect = true;
                    btnItem.setBox(true, false);
                    //this.addEftByParent(ResUtil.getEffectUI('glove_gem_3'), btnItem.grp_eff);
                } else {                                    // 未通关
                    btnItem.isSelect = false;
                    btnItem.setBox(false, false);
                }
            }
        }

        private onClickBtn(e: TouchEvent): void {
            let btnItem: WorldMapBtn = e.currentTarget.parent as WorldMapBtn;
            if (btnItem.mapCfg) {
                ViewMgr.getIns().showSecondPop(ModName.Pass, PassViewType.WorldMapDetail, [btnItem.mapCfg, btnItem.isSelect]);
            }
        }

        private onBtnGetClick(e: TouchEvent) {
            let btnItem: WorldMapBtn = e.currentTarget.parent as WorldMapBtn;
            ViewMgr.getIns().showSecondPop(ModName.Pass, PassViewType.WorldMapBox, [btnItem.mapCfg, btnItem.hasAward]);
        }

    }
}