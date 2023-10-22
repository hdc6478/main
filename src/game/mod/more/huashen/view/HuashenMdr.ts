namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;

    export class HuashenMdr extends SurfaceMdr {
        protected showLv: boolean = false;//默认显示技能等级，子类可重写
        protected showZero: boolean = true;//默认不显示0级技能，子类可重写
        private _huashenProxy: HuashenProxy;

        protected onInit(): void {
            super.onInit();
            this._huashenProxy= this.retProxy(ProxyType.Huashen);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_god, TouchEvent.TOUCH_TAP, this.onClickGod);
            addEventListener(this._view.btn_zhanshendian, TouchEvent.TOUCH_TAP, this.onClickZhanshendian);
        }

        private onClickGod(): void {
            //化神之路
            if(!this._huashenProxy.checkRoadOpen(true)){
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.HuashenZhilu);
        }

        private onClickZhanshendian(): void {
            //战神殿
            if(!this._huashenProxy.checkOpen(true)){
                return;
            }
            ViewMgr.getIns().showView(ModName.More, MoreViewType.ZhanshendianMain);
        }

        /**初始化显示不同的ui，子类可重写*/
        protected initView(): void {
            this._view.btn_gift.visible = false;
            this._view.btn_jiban.visible = false;
            this._view.btn_huan.visible = false;
            this._view.btn_god.visible = true;
            this.updateZhanshendian();
            this.updateHuashenHint();
        }

        private updateZhanshendian(): void {
            let isShow = this._huashenProxy.checkShow();
            this._view.btn_zhanshendian.visible = isShow;
        }

        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void {
            super.onHintUpdate(n);
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._huashenProxy.getRoadHint())) {
                this.updateRoadHint(data.value);
            }
            if (data.node == HintMgr.getType(this._huashenProxy.getZhanshendianHint())) {
                this.updateZhanshendianHint(data.value);
            }
        }

        private updateHuashenHint(): void {
            if (this._view.btn_god.visible) {
                this.updateRoadHint(HintMgr.getHint(this._huashenProxy.getRoadHint()));
            }
            if (this._view.btn_zhanshendian.visible) {
                this.updateZhanshendianHint(HintMgr.getHint(this._huashenProxy.getZhanshendianHint()));
            }
        }

        private updateRoadHint(hint: boolean) {
            this._view.btn_god.redPoint.visible = hint;
        }

        private updateZhanshendianHint(hint: boolean) {
            this._view.btn_zhanshendian.redPoint.visible = hint;
        }
    }
}