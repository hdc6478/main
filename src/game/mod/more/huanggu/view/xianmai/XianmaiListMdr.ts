namespace game.mod.more {


    export class XianmaiListMdr extends MdrBase {
        private _view: XianmaiListView = this.mark("_view", XianmaiListView);
        private _proxy: XianmaiProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianmai);
            this._view.list.itemRenderer = XianmaiListItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_invite, egret.TouchEvent.TOUCH_TAP, this.onClickInvite, this);
            this.onNt(MoreEvent.ON_UPDATE_XIANMAI_LIST_SHOW, this.updateView, this);
            this.onNt(MoreEvent.ON_XIANMAI_LIST_VIEW_CLOSE, this.hide, this);
            this.onNt(MoreEvent.ON_XIANMAI_VIEW_CLOSE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();

            this._proxy.c2s_xianmai_list_show();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let maxStage = this._proxy.getMaxStage();
            let stageList = this._proxy.stage_list;
            let map = new Map();
            for (let item of stageList) {
                map.set(item.stage, item);
            }

            let list: msg.xianmai_stage_data[] = [];
            for (let i = 1; i <= maxStage; i++) {
                if (map.has(i)) {
                    list.push(map.get(i));
                } else {
                    let data = new msg.xianmai_stage_data();
                    data.stage = i;
                    data.guild_num = 0;
                    list.push(data);
                }
            }
            this._listData.replaceAll(list);
        }

        private onClickInvite(): void {
            this._proxy.c2s_xianmai_guild_invite();
        }
    }
}