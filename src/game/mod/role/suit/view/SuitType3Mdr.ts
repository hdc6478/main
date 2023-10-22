namespace game.mod.role {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    //进阶
    export class SuitType3Mdr extends EffectMdrBase {
        protected _view: SuitView2 = this.mark("_view", SuitView2);
        protected _proxy: SuitProxy;
        /**套装类型*/
        protected _type = SuitType.HaoTian;
        /**操作类型*/
        protected _operType = SuitOperType.JinJie;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward, this);
            addEventListener(this._view.btn_do, TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
            addEventListener(this._view.power.btn_desc, TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            this.onNt(SuitEvent.ON_SUIT_EQUIP_INFO_UPDATE_TWO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.addEftByParent(`lilian_standby_${this._type}_1`, this._view.gr_eff);//todo
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected updateView(): void {
            let operType = this._operType;
            this._view.btn_reward.visible = operType == SuitOperType.JinJie;//进阶展示进阶返利
            this._view.btn_do.label = operType == SuitOperType.JinJie ? getLanById(LanDef.advent_god_cue7) : "一键精铸";

            this._view.iconList.updateView2(this._type, operType);
            this.updatePower();

            let hint: boolean;
            if (operType == SuitOperType.JinJie) {
                hint = this._proxy.canAdvanceOneKey(this._type);
            } else {
                hint = this._proxy.canCastOneKey(this._type);
            }
            this._view.btn_do.setHint(hint);
        }

        protected updatePower(): void {
            let power = this._proxy.getPower2(this._type, this._operType);
            this._view.power.setPowerValue(power);
        }

        protected onClickReward(): void {
            ViewMgr.getIns().showView(ModName.Role, NewRoleViewType.SuitGiftMain, [0, this._type + 1]);
        }

        protected onClickOneKey(): void {
            let operType = this._operType;
            if (operType == SuitOperType.JinJie) {
                if (this._proxy.canAdvanceOneKey(this._type, true)) {
                    this._proxy.c2s_suit_two_equip_lvup(1, operType, this._type, null);//一键进阶
                }
            } else {
                if (this._proxy.canCastOneKey(this._type, true)) {
                    this._proxy.c2s_suit_two_equip_lvup(1, operType, this._type, null);//一键精铸
                }
            }
        }

        protected onClickAttr(): void {
            let attr = this._proxy.getAttrByTypeAndOperType(this._type, this._operType);
            this.showView(NewRoleViewType.SuitAttrTips, {
                title: '属性总览',
                attrTitle: '激活属性',
                attr
            });
        }
    }

    //精铸
    export class SuitType3CastMdr extends SuitType3Mdr {
        /**套装类型*/
        protected _type = SuitType.HaoTian;
        /**操作类型*/
        protected _operType = SuitOperType.JingZhu;
    }
}