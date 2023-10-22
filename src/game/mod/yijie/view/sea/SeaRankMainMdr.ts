namespace game.mod.yijie {

    import LanDef = game.localization.LanDef;

    export class SeaRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SeaMainBtnType.Sea1,
                icon: "sea_rank_tab1_",
                mdr: SeaRankMdr,
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                openIdx: OpenIdx.Sea1
            },
            {
                btnType: SeaMainBtnType.Sea2,
                icon: "sea_rank_tab2_",
                mdr: SeaRankMdr,
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                openIdx: OpenIdx.Sea2
            },
            {
                btnType: SeaMainBtnType.Sea3,
                icon: "sea_rank_tab3_",
                mdr: SeaRankMdr,
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                openIdx: OpenIdx.Sea3
            }
        ];
        private _proxy: SeaProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Sea);
        }

        /**更新list数据*/
        protected updateBtnList() {
            let list: WndBaseViewData[] = [];
            let mdrs: MdrClsList = [];
            //重写，未开启时候不显示
            for (let data of this._btnData) {
                let type = parseInt(data.btnType);
                if(!this._proxy.isEnter(type)){
                    continue;
                }
                let hintType = this._proxy.getRankHintType(type);
                data.hintTypes = hintType;
                mdrs.push(data.mdr);
                list.push(data);
            }

            this._btnList.source = list;
            this._tab.mdrClsList = mdrs;
        }

        /**分页点击时检测*/
        protected onTabCheck(index: number): boolean {
            let data: WndBaseViewData = this._btnList.source[index];
            this._proxy.rankType = parseInt(data.btnType);
            return true;
        }
    }
}