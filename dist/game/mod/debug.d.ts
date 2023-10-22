declare namespace game.mod.debug {
    class DebugMod extends ModBase {
        constructor();
        protected initView(): void;
    }
}
declare namespace game.mod.debug {
    class GmCmdMdr extends MdrBase {
        private _view;
        constructor();
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onTapBtn;
    }
}
declare namespace game.mod.debug {
    class GmListMdr extends MdrBase {
        private _view;
        private _docs;
        private _coll;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected addListeners(): void;
        private onClick;
        private onInputChange;
        private onClickSend;
    }
}
