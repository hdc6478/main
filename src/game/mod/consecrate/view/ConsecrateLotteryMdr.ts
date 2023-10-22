namespace game.mod.consecrate {


    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import Tween = base.Tween;
    import Linear = base.Linear;
    import Handler = base.Handler;
    import GongfengRewardConfig = game.config.GongfengRewardConfig;
    import ParamConfig = game.config.ParamConfig;

    export class ConsecrateLotteryMdr extends MdrBase {
        private _view: ConsecrateLotteryView = this.mark("_view", ConsecrateLotteryView);
        private _proxy: ConsecrateProxy;

        private indexs: number[];
        private index: number;
        private readonly round: number = 3;
        private readonly circle: number = 360;
        private readonly angle: number = 45;
        private readonly initAngle: number = 0;
        private isTween: boolean = false;
        private _cfg: ParamConfig;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Consecrate);
            this._view.secondPop.bgStr = 'gongfeng_bg2';
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onLottery, this);
            addEventListener(this._view.checkbox, TouchEvent.TOUCH_TAP, this.onCheckBox, this);

            this.onNt(ConsecrateEvent.ON_TWEEN_CONSECRATE_OPEN, this.onOpenTween, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();
            this._view.secondPop.updateBgSrc(ResUtil.getUiJpg("gongfeng_bg2"));
        }

        private onUpdateView(): void {
            this._view.img.rotation = this.initAngle;

            let cfgArr: GongfengRewardConfig[] = getConfigListByName(ConfigName.GongfengReward);
            for (let cfg of cfgArr) {
                let icon: Icon = this._view[`icon_${cfg.index}`];
                icon.setData(cfg.reward);
            }

            this._cfg = getConfigByNameId(ConfigName.Param, "gongfeng_lottery");
            let prop: PropData = PropData.create(this._cfg.value[0], this._cfg.value[1]);
            this._view.lab_tips.text = `累计${this._cfg.value[1]}${prop.cfg.name}可开启一次`;

            this.onUpdateCount();
        }

        private onUpdateCount(): void {
            let num: number = BagUtil.getPropCntByIdx(this._cfg.value[0]);
            let count: number = Math.floor(num / this._cfg.value[1]);
            this._view.lab_count.text = `剩余次数:${count}`;
        }

        private onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(PropIndexToKey[this._cfg.value[0]]) > -1) {
                this.onUpdateCount();
            }
        }

        private onLottery(): void {
            let isAct = RoleUtil.isRoleRingAct(RoleRingType.Type1);
            if (!isAct) {
                ViewMgr.getIns().showConfirm("激活主角光环后开启，是否前往激活", Handler.alloc(this, this.onJumpRoleRing));
                return;
            }
            if (!BagUtil.checkPropCnt(this._cfg.value[0], this._cfg.value[1], PropLackType.Dialog)) {
                return;
            }
            if (this.isTween) {
                return;
            }
            this.isTween = true;
            this._proxy.c2s_consecrate_draw();
        }

        private onJumpRoleRing(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.RoleRing);
        }

        private onCheckBox(): void {
            if (this._view.checkbox.selected) {
                if (this.isTween) {
                    this.onTweenOver();
                }
            }
        }

        private onOpenTween(n: GameNT): void {
            this.indexs = n.body;
            this.index = this.indexs[this.indexs.length - 1];

            if (this._view.checkbox.selected) {
                this.onTweenOver();
                return;
            }

            this.onTween();
        }

        private onTween(): void {
            let rotation: number = (this.index - 1) * this.angle + this.round * this.circle + this.initAngle;
            Tween.get(this._view.img).to({rotation}, 1000, null, Linear.easeInOut).exec(Handler.alloc(this, this.onTweenOver));
        }

        private onTweenOver(): void {
            Tween.remove(this._view.img);
            this.isTween = false;
            let rotation: number = (this.index - 1) * this.angle + this.round * this.circle + this.initAngle;
            this._view.img.rotation = rotation;

            this.onPopupReward();
        }

        private onPopupReward(): void {
            let list: number[][] = [];
            for (let idx of this.indexs) {
                let cfg: GongfengRewardConfig = getConfigByNameId(ConfigName.GongfengReward, idx);
                list.push(cfg.reward);
            }
            PropTipsMgr.getIns().showBestPropArray(list);
            this.indexs = [];
            this.index = 0;
        }

        protected onHide(): void {
            Tween.remove(this._view.img);
            this.isTween = false;
            super.onHide();
        }
    }
}