namespace game.mod.more {


    import TouchEvent = egret.TouchEvent;
    import teammate = msg.teammate;
    import zhandui_kuanzhu_data = msg.zhandui_kuanzhu_data;

    export class MiningSaveMdr extends EffectMdrBase {
        private _view: MiningSaveView = this.mark("_view", MiningSaveView);
        private _proxy: MiningProxy;
        public _showArgs: zhandui_kuanzhu_data;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Mining);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClickBtn);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let team_rescue_num: number = this._proxy.team_rescue_num;
            let cnt: number = this._proxy.rescue_num;
            let color = !cnt ? WhiteColor.RED : WhiteColor.GREEN;
            this._view.lab_count.textFlow = TextUtil.parseHtml(`解救：${TextUtil.addColor(`${cnt}/${team_rescue_num}`, color)}`);

            let info: teammate = this._showArgs.kuanzhu;
            this._view.head1.updateShow(info.head, info.head_frame, info.sex, info.vip);
            this._view.lab_name1.text = info.name;
            this._view.power1.setPowerValue(info.god);

            let my_info = this._proxy.my_info;
            let my_teammate: teammate = my_info && my_info.memeber;
            this._view.head2.updateShow(my_teammate.head, my_teammate.head_frame, info.sex, info.vip);
            this._view.lab_name2.text = my_teammate.name;
            this._view.power2.setPowerValue(my_teammate.god);
        }

        private onClickBtn(): void {
            let proxy: IFriendProxy = getProxy(ModName.Friend, ProxyType.Friend);
            proxy.c2s_friend_pvp_challenge(this._showArgs.kuanzhu.role_id, {
                type: 1,
                target_id: this._showArgs.memeber.role_id
            });
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}