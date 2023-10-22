namespace game.mod.god {


    import LanDef = game.localization.LanDef;

    export class GodCommonMainMdr extends WndBaseMdr {
        private _proxy: GodProxy;
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: 'tiandilubiaoqiantubiao',
                mdr: GodCommonMdr,
                title: LanDef.tiandilu_tips,
                bg: "tiandilubeijingtu2",
                hintTypes: []
            }
        ];

        protected onInit(): void {
            super.onInit();
            this._proxy = getProxy(ModName.God, ProxyType.God);
        }

        protected updateBtnList() {
            let list: WndBaseViewData[] = [];
            let mdrs: MdrClsList = [];

            for (let data of this._btnData) {
                // if (data.openIdx && !ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                //     continue;
                // }
                //icon和hintTypes不一样
                // data.icon = SurfaceConfigList[this._proxy.iType] + "_tab";
                data.hintTypes = [ModName.God, GodViewType.GodMain, GodViewType.GodCommonMain, `0${this._proxy.iType}`];

                mdrs.push(data.mdr);
                list.push(data);
            }

            this._btnList.source = list;
            this._tab.mdrClsList = mdrs;
        }
    }
}