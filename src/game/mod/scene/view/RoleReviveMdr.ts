namespace game.mod.scene {

    import TimeMgr = base.TimeMgr;
    import PropConfig = game.config.PropConfig;
    import s2c_battle_role_die = msg.s2c_battle_role_die;

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;
    import facade = base.facade;

    export class RoleReviveMdr extends EffectMdrBase {

        private _view: RoleReviveView = this.mark("_view", RoleReviveView);

        protected _showArgs: s2c_battle_role_die;

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;

            this._view.lab_btn.text = getLanById(LanDef.revive_now);
            this._view.lab_tips.text = getLanById(LanDef.revive_tips2);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btnRelife, TouchEvent.TOUCH_TAP, this.onBtnRelive);
            this.onNt(SceneEvent.ON_ROLE_RELIVE, this.hide, this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
        }


        private updateKillName(name: string) {
            if (name && name.trim() != "") {
                this._view.lab_killBy.text = StringUtil.substitute(getLanById(LanDef.kill_by), [name]);
            } else {
                this._view.lab_killBy.text = "";
            }
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this.updateKillName(this._showArgs.from_entity_name);
            this._reliveEndTime = +this._showArgs.relife_time | 0;
            this._view.gr_btn.visible = this._showArgs.items.idx != undefined;
            if (this._showArgs.items) {
                let propCfg: PropConfig = getConfigByNameId(ConfigName.Prop, this._showArgs.items.idx.toNumber());
                if (propCfg) {
                    this._view.img_icon.source = ResUtil.getUiProp(propCfg.icon);
                }
                this._view.lab_cnt.text = this._showArgs.items.cnt + "";
            }
            TimeMgr.addUpdateItem(this, 1000);
            this.setTimeDown(TimeMgr.time.serverTimeSecond);
        }

        private onBtnRelive() {
            if (!this._showArgs || !this._showArgs.items.idx) {
                return;
            }
            let msg: s2c_battle_role_die = this._showArgs;
            let propCfg: PropConfig = getConfigByNameId(ConfigName.Prop, msg.items.idx.toNumber());
            let content: string = StringUtil.substitute(getLanById(LanDef.revive_tips) + "\n\n", [msg.items.cnt, propCfg.name]);
            ViewMgr.getIns().showConfirm(content, Handler.alloc(this, this.reliveRole));
        }

        private reliveRole() {
            if (!this._showArgs || !this._showArgs.items.idx) {
                return;
            }
            if (BagUtil.checkPropCntUp(this._showArgs.items.idx.toNumber(), this._showArgs.items.cnt)) {
                let p: SceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                p.battle_role_relife_c2s();
            }
        }

        private _reliveEndTime: number = 0;

        protected onHide(): void {
            this._reliveEndTime = 0;
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        public update(time: base.Time) {
            this.setTimeDown(time.serverTimeSecond);
        }

        private setTimeDown(time: number) {
            let t = this._reliveEndTime - time;
            // let sec = TimeUtil.formatSecond(Math.max(t, 0), "ss");
            this.addBmpFont(t.toString(), BmpTextCfg[BmpTextType.ReviveNum], this._view.gr_time, true, 1, true);
            if (t <= 0) {
                // TimeMgr.removeUpdateItem(this);
                this.hide();
            }
        }
    }
}
