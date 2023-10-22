namespace game.mod.xianyuan {

    import s2c_instance_fin = msg.s2c_instance_fin;
    import s2c_xianlv_pvp_nianya_win = msg.s2c_xianlv_pvp_nianya_win;

    export class XianlvDoufaWinMdr extends MdrBase {
        protected _view: XianlvDoufaWinView = this.mark("_view", XianlvDoufaWinView);

        private _proxy: XianlvDoufaProxy;
        protected _type: ResultType = ResultType.Win;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianlvDoufa);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            // if (this._showArgs instanceof s2c_xianlv_pvp_nianya_win) {
            //     // this.onUpdateCrush();
            //     let info: s2c_xianlv_pvp_nianya_win = this._showArgs;
            //     this._view.resultReward.updateRewardList(info.reward, base.Handler.alloc(this, this.onRewardTweenEnd));
            // } else {
            //     let info: s2c_instance_fin = this._showArgs;
            //     this._view.resultReward.updateRewardList(info.reward, base.Handler.alloc(this, this.onRewardTweenEnd));
            // }
            let info = this._showArgs;
            this._view.resultReward.updateRewardList(info.reward, base.Handler.alloc(this, this.onRewardTweenEnd));
            this.onUpdateView();
        }

        private onUpdateView(): void {
            this.isEasyHide = false;
            this._view.closeTips.visible = false;

            let info = this._showArgs;

            this._view.head1.updateMyHead();
            let bool1: boolean = false;
            if (this._type == ResultType.Win) {
                if (info && info.long_params) {
                    bool1 = !this.onCheckParams(RoleVo.ins.role_id);
                }
            } else {
                bool1 = true;
            }
            this.onSetHeadDead(this._view.head1, bool1);

            let xianlv: msg.teammate = RoleUtil.getBanlvInfo();
            this._view.head2.updateShow(xianlv.head, xianlv.head_frame, xianlv.sex, xianlv.vip);
            let bool2: boolean = false;
            if (this._type == ResultType.Win) {
                if (info && info.long_params) {
                    bool2 = !this.onCheckParams(xianlv.role_id);
                }
            } else {
                bool2 = true;
            }
            this.onSetHeadDead(this._view.head2, bool2);

            let enemy1: msg.teammate = this._proxy.player_info[0];
            if (enemy1) {
                this._view.head3.updateShow(enemy1.head, enemy1.head_frame, enemy1.sex, enemy1.vip);
                let bool3: boolean = false;
                if (this._type == ResultType.Win) {
                    bool3 = true;
                } else {
                    if (info && info.long_params) {
                        bool3 = !this.onCheckParams(enemy1.role_id);
                    }
                }
                this.onSetHeadDead(this._view.head3, bool3);
            }

            let enemy2: msg.teammate = this._proxy.player_info[1];
            if (enemy2) {
                this._view.head4.updateShow(enemy2.head, enemy2.head_frame, enemy2.sex, enemy2.vip);
                let bool4: boolean = false;
                if (this._type == ResultType.Win) {
                    bool4 = true;
                } else {
                    if (info && info.long_params) {
                        bool4 = !this.onCheckParams(enemy2.role_id);
                    }
                }
                this.onSetHeadDead(this._view.head4, bool4);
            }
        }

        private onCheckParams(id: Long): boolean {
            let info = this._showArgs;
            return info.long_params.some((v: Long) => { return v.eq(id) });
        }

        private onSetHeadDead(item: HeadVip, bool: boolean): void {
            item.updateHeadMask(bool ? "yizhenwang" : "");
        }

        private onRewardTweenEnd(): void {
            this._view.closeTips.visible = true;
            this._view.closeTips.updateShow(10, base.Handler.alloc(this, this.hide));
            base.delayCall(base.Handler.alloc(this, () => {
                this.isEasyHide = true;
            }), 200);
        }

        protected onHide(): void {
            SceneUtil.exitScene();
            super.onHide();
            this.sendNt(XianyuanEvent.ON_UPDATE_XIANLV_DOUFA_AUTO, false);
            this.sendNt(RoleEvent.ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT);
        }
    }

    export const enum ResultType {
        Win = 1,
        Fail = 2
    }
}