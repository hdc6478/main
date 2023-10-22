namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import TextEvent = egret.TextEvent;
    import HuangguHaoganConfig = game.config.HuangguHaoganConfig;
    import HuangguGongfengConfig = game.config.HuangguGongfengConfig;
    import facade = base.facade;
    import ParamConfig = game.config.ParamConfig;
    import Handler = base.Handler;
    import SpecialAttrConfig = game.config.SpecialAttrConfig;

    export class GoddessMdr extends EffectMdrBase {
        private _view: GoddessView = this.mark("_view", GoddessView);
        private _proxy: HuangguProxy;
        private _cost: number[];

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Huanggu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power2.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
            addEventListener(this._view.btn_exp, TouchEvent.TOUCH_TAP, this.onClickDesc);
            addEventListener(this._view.btn_chat, TouchEvent.TOUCH_TAP, this.onClickChat);
            addEventListener(this._view.btn_event, TouchEvent.TOUCH_TAP, this.onClickEvent);
            addEventListener(this._view.btn_target, TouchEvent.TOUCH_TAP, this.onClickTarget);
            addEventListener(this._view.btn_summon, TouchEvent.TOUCH_TAP, this.onClickSummon);
            addEventListener(this._view.btn_consecrate, TouchEvent.TOUCH_TAP, this.onClickConsecrate);
            addEventListener(this._view.lab_reward, TextEvent.LINK, this.onClickReward);

            this.onNt(HuangguEvent.ON_UPDATE_GODDESS_CONSECRATE_INFO, this.onInfoUpdate, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
            this.onNt(HuangguEvent.ON_UPDATE_GODDESS_CHAT_INFO, this.updateChatHint, this);
            this.onNt(HuangguEvent.ON_UPDATE_GODDESS_EVENT_INFO, this.updateEventHint, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHENRONG_INFO, this.updateEventHint, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onUpdateIndex2, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateInfo();
            this.updateAttr();
            this.updateHint();

            this._proxy.c2s_nvshen_get_chat(CommonChatType.Goddess);//请求对话信息
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickDesc(): void {
            facade.showView(ModName.More, MoreViewType.GoddessAttr);
        }

        private onClickChat(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.GoddessChat);
        }

        private onClickEvent(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.GoddessEvent);
        }

        private onClickTarget(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.GoddessTargetMain);
        }

        private onClickGodItem(): void {
            facade.showView(ModName.More, MoreViewType.GoddessGod);
        }

        private onClickSummon(): void {
            facade.showView(ModName.More, MoreViewType.GoddessSummon);
        }

        private onClickConsecrate(): void {
            if (!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            this._proxy.c2s_huanggu_nvshen_op(GoddessOpType.Consecrate);
        }

        private onClickReward(): void {
            let rewards = this._proxy.getRewards();
            let tips = getLanById(LanDef.huanggu_nvshen_tips22);
            ViewMgr.getIns().rewardShow(rewards, tips);
        }

        private onInfoUpdate(): void {
            this.updateInfo();
            this.updateAttr();
            this.updateChatHint();
            this.updateActHint();
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            let index = this._cost && this._cost[0];
            if (index && indexs.indexOf(index) > -1) {
                this.updateCost();
            }
        }

        private onUpdateIndex2(n: GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.huanggu_shuijing) > -1) {
                this.updateSummonHint();
                this._view.item_summon.updateShow();
            }
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._proxy.targetHint)) {
                this.updateTargetHint(data.value);
            }
        }

        private initShow(): void {
            let tipsStr = getLanById(LanDef.huanggu_nvshen_tips2);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);

            let rewardStr = this._view.lab_reward.text;
            this._view.lab_reward.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(rewardStr, WhiteColor.GREEN, ""));

            this._view.btn_gift.updateGift(ProductId.Id201302);

            this._view.item_summon.setData(this._proxy.summonIndex);
        }

        private updateInfo(): void {
            let haoganLv = this._proxy.haoganLv;
            let fontStr = haoganLv + "";
            this.addBmpFont(fontStr, BmpTextCfg[BmpTextType.GoddessFont], this._view.grp_haoganLv, true, 1, true);
            let haoganCfg: HuangguHaoganConfig = getConfigByNameId(ConfigName.HuangguHaogan, haoganLv);
            this._view.bar.show(this._proxy.haoganExp, haoganCfg.exp, false, 0, false);

            let lv = this._proxy.lv;
            let exp = this._proxy.exp;
            let cfg: HuangguGongfengConfig = getConfigByNameId(ConfigName.HuangguGongfeng, lv);
            this._view.btn_exp.updateShow(exp, cfg.exp, lv);//供奉经验

            this.updateCost();
        }

        private updateCost(): void {
            let cfg: ParamConfig = GameConfig.getParamConfigById("huanggu_gongfeng_xiaohao");
            this._cost = cfg.value;
            let costIndex = this._cost[0];
            let costCnt = this._cost[1];
            let curCnt = BagUtil.getPropCntByIdx(costIndex);
            this._view.btn_consecrate.labelDisplay.text = curCnt + "/" + costCnt;//供奉消耗
            this._view.btn_consecrate.redPoint.visible = curCnt >= costCnt;
        }

        private updateAttr(): void {
            //更新属性
            //let attr = this._proxy.attr;
            //供奉等级
            let lv = this._proxy.lv;
            let cfg: HuangguGongfengConfig = getConfigByNameId(ConfigName.HuangguGongfeng, lv);
            this._view.power2.setPowerValue(cfg.ability_index);

            //荒古仙力
            let specialAttrId = this._proxy.getSpecialAttrId();
            let cfg2: SpecialAttrConfig = getConfigByNameId(ConfigName.SpecialAttr, specialAttrId);
            let god = cfg2.god * lv;

            this._view.god_item.updateGod(god, true, Handler.alloc(this, this.onClickGodItem))
            if (this._proxy.isAct) {
                //亮开启
                this._view.god_item.filters = null;
            } else {
                this._view.god_item.filters = [FilterUtil.getGrapFilter()];
            }
        }

        private updateHint(): void {
            this.updateChatHint();
            this.updateEventHint();
            this.updateTargetHint(HintMgr.getHint(this._proxy.targetHint));
            this.updateActHint();
            this.updateSummonHint();
        }

        private updateChatHint() {
            this._view.btn_chat.redPoint.visible = this._proxy.checkChatHint();
        }

        private updateEventHint() {
            this._view.btn_event.redPoint.visible = this._proxy.checkEventHint();
        }

        private updateTargetHint(hint: boolean) {
            this._view.btn_target.redPoint.visible = hint;
        }

        private updateActHint() {
            this._view.god_item.redPoint.visible = this._proxy.checkActHint();
        }

        private updateSummonHint() {
            this._view.btn_summon.redPoint.visible = this._proxy.checkSummonHint();
        }
    }
}