namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import Handler = base.Handler;

    export class XianweiPropMdr extends MdrBase {
        private _view: XianweiPropView = this.mark("_view", XianweiPropView);

        private _proxy: XianweiProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianwei);
            this._view.verticalCenter = 0;
            this._view.touchEnabled = false;

            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData;
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let reward_data = this._proxy.reward_data;

            let time: number = reward_data.time;
            let timeStr: string = TimeUtil.formatSecond(time, "H小时m分", true);
            this._view.lab.textFlow = TextUtil.parseHtml(`恭喜道友成功占领了${timeStr}`);

            this._listData.replaceAll(reward_data.items);

            this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));

            this._proxy.reward_data = null;
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}