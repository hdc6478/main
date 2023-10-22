namespace game.mod.yijie {

    import LanDef = game.localization.LanDef;

    export class SeaMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SeaMainBtnType.Sea1,
                icon: "sea_tab1_",
                mdr: SeaBaseMdr,
                title: LanDef.sea_type_tips1,
                openIdx: OpenIdx.Sea1,
                hintTypes: [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea1],
            },
            {
                btnType: SeaMainBtnType.Sea2,
                icon: "sea_tab2_",
                mdr: SeaBaseMdr,
                title: LanDef.sea_type_tips2,
                openIdx: OpenIdx.Sea2,
                hintTypes: [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea2],
            },
            {
                btnType: SeaMainBtnType.Sea3,
                icon: "sea_tab3_",
                mdr: SeaBaseMdr,
                title: LanDef.sea_type_tips3,
                openIdx: OpenIdx.Sea3,
                hintTypes: [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea, SeaMainBtnType.Sea3],
            }
        ];

        private _proxy: SeaProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Sea);
        }

        /**分页点击时检测*/
        protected onTabCheck(index: number): boolean {
            let data: WndBaseViewData = this._btnList.source[index];
            let isOpen = ViewMgr.getIns().checkViewOpen(data.openIdx,true);
            if(isOpen){
                this._proxy.type = parseInt(data.btnType);
            }
            return isOpen;
        }

    }
}