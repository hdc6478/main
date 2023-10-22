namespace game.mod.surface {

    import LanDef = game.localization.LanDef;

    export class SurfaceGiftMainMdr extends WndBaseMdr {
        private _proxy: SurfaceProxy;
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SurfaceGiftMainBtnType.Gift,
                icon: "horse_tab",
                mdr: SurfaceGiftMdr,
                title: LanDef.jinjielibao_tips,
                bg: "p1_del_bg",
                hintTypes: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.Horse, HintType.HorseGift],
            }
        ];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Surface);
        }

        protected onShow(): void {
            if(this._showArgs){
                let type: string;
                if (Array.isArray(this._showArgs)) {
                    type = this._showArgs.shift();
                } else {
                    type = this._showArgs;
                }
                this._proxy.headType = parseInt(type);
            }
            super.onShow();
        }

        /**更新list数据*/
        protected updateBtnList() {
            let list: WndBaseViewData[] = [];
            let mdrs: MdrClsList = [];

            for (let data of this._btnData) {
                if (data.openIdx && !ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                    continue;
                }
                //icon和hintTypes不一样
                data.icon = SurfaceConfigList[this._proxy.headType] + "_tab";
                data.hintTypes = this._proxy.getGiftHint(this._proxy.headType);

                mdrs.push(data.mdr);
                list.push(data);
            }

            this._btnList.source = list;
            this._tab.mdrClsList = mdrs;
        }
    }
}