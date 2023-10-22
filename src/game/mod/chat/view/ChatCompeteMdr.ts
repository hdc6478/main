namespace game.mod.chat {

    import s2c_chat_showpower_check_info = msg.s2c_chat_showpower_check_info;
    import ArrayCollection = eui.ArrayCollection;

    export class ChatCompeteMdr extends MdrBase {
        private _view: ChatCompeteView= this.mark("_view", ChatCompeteView);
        private _proxy: ChatProxy;
        private _itemList: ArrayCollection;

        protected _showArgs: s2c_chat_showpower_check_info;//玩家信息

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Chat);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = ChatCompeteRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateSelf();
            this.updateEnemy();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateSelf(): void {
            let vo = RoleVo.ins;
            this._view.lab_name1.text = vo.name;
            this._view.powerLabel1.setPowerValue(vo.showpower);
            this._view.head1.updateShow(vo.head, vo.head_frame, vo.sex, vo.vip_lv);
        }

        private updateEnemy(): void {
            let info = this._showArgs.check_role;
            this._view.lab_name2.text = info.name;
            this._view.powerLabel2.setPowerValue(info.showpower);
            this._view.head2.updateShow(info.head, info.head_frame, info.sex, info.vip);
        }

        private updateItemList(): void {
            let info = this._showArgs.info;
            this._itemList.source = info;
        }
    }
}