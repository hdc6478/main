namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import GameNT = base.GameNT;

    export class HuashenMainMdr extends WndBaseMdr {
        private _proxy: HuashenProxy;
        private _surfaceProxy: ISurfaceProxy;
        private _index: number;
        private _isAct: boolean;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huashen);
            this._surfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(SurfaceEvent.SURFACE_ACT_UPDATE, this.surfaceActUpdate, this);
            this.onNt(HuashenEvent.ON_UPDATE_HUASHEN_TIANFU_OPEN, this.onTianfuOpen, this);
        }

        protected onShow(): void {
            this.initBtnList();
            this._surfaceProxy.headType = ConfigHead.Huashen;
            let index = this._surfaceProxy.getDefaultId(ConfigHead.Huashen);
            this._index = index;
            super.onShow();
        }

        private initBtnList(): void {
            let isAct = this._surfaceProxy.isDefaultAct(ConfigHead.Huashen);
            this._isAct = isAct;
            if(!isAct){
                this._btnData = [
                    {
                        btnType: HuashenMainBtnType.HuashenTask,
                        icon: "huashen_task_tab",
                        mdr: HuashenTaskMdr,
                        title: LanDef.huashen_task_tips,
                        bg: "horse_bg",
                        hintTypes: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.HuashenTask],
                    }
                ];
            }
            else {
                this.updateSelfBtnList();
            }
        }

        private updateSelfBtnList(): void {
            if(!this._isAct){
                return
            }
            this._btnData = [
                {
                    btnType: HuashenMainBtnType.Huashen,
                    icon: "huashen_tab",
                    mdr: HuashenMdr,
                    title: LanDef.huashen_tips,
                    bg: "horse_bg",
                    hintTypes: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.Huashen],
                },
                {
                    btnType: HuashenMainBtnType.HuashenStar,
                    icon: "huanhua_tab",
                    mdr: HuashenStarMdr,
                    title: LanDef.huashen_tips,
                    bg: "horse_bg",
                    hintTypes: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.HuashenStar],
                }
            ];
            let tianfuOpen = this._proxy.tianfuOpen;
            if(tianfuOpen){
                this._btnData.push(
                    {
                        btnType: HuashenMainBtnType.HuashenTianfu,
                        icon: "huashen_tianfu_tab",
                        mdr: HuashenTianfuMdr,
                        title: LanDef.huashen_tips,
                        bg: "tianfubeijingtu",
                        hintTypes: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.HuashenTianfu],
                    }
                );
            }
        }

        private surfaceActUpdate(n: GameNT): void {
            let index: number = n.body;
            if(index == this._index){
                this.hide();
                ViewMgr.getIns().showView(ModName.More, MoreViewType.HuashenMain);//激活后重新打开界面
            }
        }

        private onTianfuOpen(): void {
            this.updateSelfBtnList();
            this.updateBtnList();
        }

        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string {
            if(this._surfaceProxy.getActHint(this._surfaceProxy.headType)){
                return HuashenMainBtnType.HuashenStar;
            }
            return "";
        }

    }
}