namespace game.mod.main {
    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;

    export class MainLeftMdr extends EffectMdrBase {
        private _view: MainLeftView = this.mark("_view", MainLeftView);
        private _proxy: MainProxy;

        private _btnPro: ArrayCollection;
        private _btnPro2: ArrayCollection;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            let self = this;
            self._view.left = 0;
            self._view.bottom = 175;
            self._view.touchEnabled = false;

            self._btnPro = new ArrayCollection();
            self._view.btn_list.dataProvider = self._btnPro;
            self._view.btn_list.itemRenderer = MainLeftBtnView;

            self._btnPro2 = new ArrayCollection();
            self._view.btn_list2.dataProvider = self._btnPro2;
            self._view.btn_list2.itemRenderer = MainLeftBtnView;

            self._proxy = self.retProxy(ProxyType.Main);
            self._view.gr_list2.mask = self._view.img_rect;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            facade.showView(ModName.Activity, MainActivityViewType.MainLeftAct);//todo，待删除
            facade.showView(ModName.Activity, MainActivityViewType.MainActivityList);//todo，待删除
            //facade.showView(ModName.Activity, MainActivityViewType.TestIcon);//todo，待删除
             //.in.addResidentBtn(BtnIconId.powerTurntable);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}
