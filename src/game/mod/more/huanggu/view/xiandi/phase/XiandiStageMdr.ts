namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import TiandiXianqiFubenConfig = game.config.TiandiXianqiFubenConfig;
    import XiandiXianqiConfig = game.config.XiandiXianqiConfig;
    import BuffConfig = game.config.BuffConfig;

    export class XiandiStageMdr extends EffectMdrBase {
        private _view: XiandiStageView = this.mark("_view", XiandiStageView);

        private _proxy: XiandiProxy;
        private _index: number = 0;
        private _cfgs: XiandiXianqiConfig[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xiandi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_right, TouchEvent.TOUCH_TAP, this.onClickRight);
            addEventListener(this._view.btn_left, TouchEvent.TOUCH_TAP, this.onClickLeft);
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickActive);
            addEventListener(this._view.power.btn_desc, TouchEvent.TOUCH_TAP, this.onClickAttr);
            addEventListener(this._view.btn_shilian, TouchEvent.TOUCH_TAP, this.onClickShilian)

            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttr, this);
            this.onNt(HuangguEvent.ON_UPDATE_XIANDI_TREASURE, this.onUpdateView, this);
            this.onNt(HuangguEvent.ON_CLOSE_XIANDI_POPUP, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this._index = 0;
            this.onUpdateView();
        }

        private onUpdateView(): void {
            // let stage: number[] = this._proxy.xianqi_stage_list.find(v => { return this._proxy.xianqi_stage == v[0] });

            let cfgArr: XiandiXianqiConfig[] = getConfigListByName(ConfigName.TiandiXianqi);
            this._cfgs = cfgArr.filter(v => { return v.index >= this._proxy.xianqi_stage });
            if (!this._cfgs || !this._cfgs.length) {
                return;
            }

            this.addAnimate(this._proxy.xianqi_waixian, this._view.grp_eft);

            this._view.btn_shilian.setHint(this._proxy.reward_status == 1);

            this.onnUpdateSelect();
        }

        private onnUpdateSelect(): void {
            let len: number = this._cfgs.length;
            if (this._index == len) {
                this._index = len - 1;
            }
            if (this._index < 0) {
                this._index = 0;
            }
            this._view.btn_right.visible = len > 1 && this._index != len - 1;
            this._view.btn_left.visible = !!this._index;


            if (this._index) {
                let limit: number = this._cfgs[this._index].open_day;
                //     this._view.lab_limit.text = `开服${limit}天后可进阶`;
                this.addBmpFont(`${limit}`, BmpTextCfg[BmpTextType.CommonPower], this._view.grp_day, true, 1, true);
            }
            this._view.grp_limit.visible = !!this._index;

            let bool: boolean = BagUtil.checkPropCnt(this._proxy.xianqi_fuben_reward[0], this._proxy.xianqi_fuben_reward[1]);
            let bool_limit: boolean = !this._index && !this._proxy.is_activa && this._proxy.is_tiandi;
            this._view.btn_act.visible = bool && bool_limit;

            this._view.btn_shilian.visible = !bool && bool_limit;


            let cfg: XiandiXianqiConfig = getConfigByNameId(ConfigName.TiandiXianqi, this.stage);
            this._view.lab_desc1.textFlow = TextUtil.parseHtml(cfg.attr_desc);
            let buff: BuffConfig = getConfigByNameId(ConfigName.Buff, cfg.buff_id);
            this._view.lab_desc2.textFlow = TextUtil.parseHtml(buff && buff.des);

            let stageStr: string = StringUtil.getCNBynumber(cfg.index);
            this.addBmpFont(`${stageStr}`, BmpTextCfg[BmpTextType.ChineseLayer], this._view.grp_font);

            this.onUpdateAttr();
        }

        private onUpdateAttr(): void {
            let cfg: TiandiXianqiFubenConfig = getConfigByNameId(ConfigName.TiandiXianqiFuben, this.stage);
            let attr = RoleUtil.getAttr(cfg.attr_id);
            this._view.power.setPowerValue(attr && attr.showpower || 0);
        }

        private onClickRight(): void {
            this._index++;
            this.onnUpdateSelect();
        }

        private onClickLeft(): void {
            this._index--;
            this.onnUpdateSelect();
        }

        private onClickActive(): void {
            this._proxy.c2s_tiandi_box_oper(2);
        }

        private onClickAttr(): void {
            let cfg: TiandiXianqiFubenConfig = getConfigByNameId(ConfigName.TiandiXianqiFuben, this.stage);
            let attr = RoleUtil.getAttr(cfg.attr_id);
            ViewMgr.getIns().showAttrTipsWithoutGod(`属性`, attr);
        }

        private onClickShilian(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiShilian);
        }

        protected onHide(): void {
            super.onHide();
            this.removeAllEffects();
        }

        private get stage(): number {
            return this._cfgs[this._index] && this._cfgs[this._index].index || 1;
        }
    }
}