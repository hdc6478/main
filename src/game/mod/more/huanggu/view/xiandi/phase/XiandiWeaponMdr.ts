namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import TiandiXianqiFubenConfig = game.config.TiandiXianqiFubenConfig;
    import XiandiXianqiConfig = game.config.XiandiXianqiConfig;
    import BuffConfig = game.config.BuffConfig;

    export class XiandiWeaponMdr extends EffectMdrBase {
        private _view: XiandiWeaponView = this.mark("_view", XiandiWeaponView);

        private _proxy: XiandiProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xiandi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_battle, TouchEvent.TOUCH_TAP, this.onClickBattle);
            addEventListener(this._view.btn_preview, TouchEvent.TOUCH_TAP, this.onClickPreview);
            addEventListener(this._view.power.btn_desc, TouchEvent.TOUCH_TAP, this.onClickAttr);

            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttr, this);
            this.onNt(RoleEvent.ON_SERVER_DAY_UPDATE, this.onUpdateAttr, this);
            this.onNt(HuangguEvent.ON_UPDATE_XIANDI_TREASURE, this.onUpdateView, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//属性刷新，有货币
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            this._view.btn_battle.visible = this._proxy.is_tiandi && !this._proxy.is_huanhua && this._proxy.is_activa;
            this.addAnimate(this._proxy.xianqi_waixian, this._view.grp_eft);
            this._view.jockeyItem.initData();

            this._view.btn_preview.setHint(this._proxy.reward_status == 1);

            this.onUpdateSkill();
            this.onUpdateAttr();
            this.onUpdateCoin();
        }

        private onUpdateCoin(): void {
            this._view.coin1.setData(PropIndex.Xianyu);
            this._view.coin2.setData(PropIndex.Yuanbao);
        }

        private onUpdateSkill(): void {
            let cfg: XiandiXianqiConfig = getConfigByNameId(ConfigName.TiandiXianqi, this._proxy.xianqi_stage)
            this._view.lab_desc1.textFlow = TextUtil.parseHtml(cfg.attr_desc);
            let buff: BuffConfig = getConfigByNameId(ConfigName.Buff, cfg.buff_id);
            this._view.lab_desc2.textFlow = TextUtil.parseHtml(buff && buff.des);
        }

        private onUpdateAttr(): void {
            let cfg: TiandiXianqiFubenConfig = getConfigByNameId(ConfigName.TiandiXianqiFuben, this._proxy.xianqi_stage);
            let attr = RoleUtil.getAttr(cfg.attr_id);
            this._view.power.setPowerValue(attr && attr.showpower || 0);
        }

        private onClickBattle(): void {
            this._proxy.c2s_tiandi_box_oper(1);
        }

        private onClickPreview(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiStage);
        }

        private onClickAttr(): void {
            let cfg: TiandiXianqiFubenConfig = getConfigByNameId(ConfigName.TiandiXianqiFuben, this._proxy.xianqi_stage);
            let attr = RoleUtil.getAttr(cfg.attr_id);
            ViewMgr.getIns().showAttrTipsWithoutGod(`属性`, attr);
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(PropIndexToKey[PropIndex.Xianyu]) > -1 || keys.indexOf(PropIndexToKey[PropIndex.Yuanbao]) > -1) {
                this.onUpdateCoin();
            }
        }

        protected onHide(): void {
            super.onHide();
            this.removeAllEffects();
        }
    }
}