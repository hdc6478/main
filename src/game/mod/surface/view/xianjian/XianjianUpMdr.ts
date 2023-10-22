namespace game.mod.surface {

    import XianjianConfig = game.config.XianjianConfig;
    import TouchEvent = egret.TouchEvent;
    import XianjianDengjiConfig = game.config.XianjianDengjiConfig;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;

    export class XianjianUpMdr extends EffectMdrBase {
        private _view: XianjianUpView = this.mark("_view", XianjianUpView);

        private _proxy: XianjianProxy;
        private _selCfg: XianjianConfig;
        private readonly _headType: number = ConfigHead.Xianjian;
        private _cost: number[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Xianjian);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
            addEventListener(this._view.skill_1, TouchEvent.TOUCH_TAP, this.onClickSkill);
            addEventListener(this._view.skill_2, TouchEvent.TOUCH_TAP, this.onClickSkill);
            addEventListener(this._view.skill_3, TouchEvent.TOUCH_TAP, this.onClickSkill);
            addEventListener(this._view.skill_4, TouchEvent.TOUCH_TAP, this.onClickSkill);

            this.onNt(SurfaceEvent.ON_UPDATE_XIANJIAN_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._selCfg = getConfigByNameId(ConfigName.Xianjian, this._showArgs);
            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            let info = this._proxy.getInfo(this._selCfg.index);
            let lv = info && info.level || 0;
            this._view.lab_level.text = `${lv}级`;
            let exp = info && info.exp || 0;

            let configStr = SurfaceConfigList[this._headType] + "_dengji.json";
            let index: number = lv + 1;
            let cfgs = getConfigByNameId(configStr, this._selCfg.quality);
            let cfg: XianjianDengjiConfig;
            for (let k in cfgs) {
                let c: XianjianDengjiConfig = cfgs[k];
                if (c.level == index) {
                    cfg = c;
                    break;
                }
            }
            let upExp = cfg && cfg.exp * SurfacePerExp;

            let cost = cfg && cfg.star_consume;
            let isMax = !cfg && exp >= upExp;
            if (!isMax) {
                this._cost = cost[0];
                this._view.bar.show(exp * this._cost[1], upExp * this._cost[1], false, lv);
                this._view.btn_up.setHint(!!info && BagUtil.checkPropCnt(this._cost[0], this._cost[1]))
            } else {
                this._view.bar.showMax();
                this._view.btn_up.setHint(false);
            }
            let cnt: number = BagUtil.getPropCntByIdx(this._cost[0]);
            this._view.icon.setData([this._cost[0], cnt]);

            this.onUpdateAttr();
            this.onUpdateSkill();
        }

        private onUpdateSkill(): void {
            for (let i = 0; i < 4; i++) {
                let skill: XianjianSkillItem = this._view[`skill_${i + 1}`];
                let pos: number = this._selCfg.skill_condition[i][0];
                let skillid: number = this._proxy.getCfgSkill(this._selCfg.index, pos);
                let lv: number = this._proxy.getSkillLv(this._selCfg.index, pos);
                skill.setData(skillid, this._selCfg.skill_condition[i][1], lv);
            }
        }

        private onUpdateAttr(): void {
            let info = this._proxy.getInfo(this._selCfg.index);
            let attr = info && info.all_attr;

            let power = attr && attr.showpower ? attr.showpower : 0;
            this._view.power.setPowerValue(power);
        }

        private onClickUp(): void {
            let info = this._proxy.getInfo(this._selCfg.index);
            if (!info) {
                PromptBox.getIns().show(getLanById(LanDef.not_active));
                return;
            }
            if (!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            this._proxy.c2s_fly_sword_operation(this._selCfg.index, 2, null);
        }

        private onClickSkill(e: TouchEvent): void {
            let pos: number = 0;
            switch (e.currentTarget) {
                case this._view.skill_1:
                    pos = 1;
                    break;
                case this._view.skill_2:
                    pos = 2;
                    break;
                case this._view.skill_3:
                    pos = 3;
                    break;
                case this._view.skill_4:
                    pos = 4;
                    break;
            }

            let index: number = this._selCfg.index;
            let confirm: Handler = Handler.alloc(this, () => {
                this._proxy.c2s_fly_sword_operation(this._selCfg.index, 6, pos);
            });
            ViewMgr.getIns().showSecondPop(ModName.Surface, SurfaceViewType.XianjianSkillTips, { confirm, index, pos })

        }
    }
}