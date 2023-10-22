namespace game.mod.union {

    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;
    import GuildCreateDataConfig = game.config.GuildCreateDataConfig;
    import facade = base.facade;

    /**创建宗门 */
    export class UnionCreateMdr extends MdrBase {
        private _view: UnionCreateView = this.mark("_view", UnionCreateView);
        private _proxy: UnionProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            TextUtil.addLinkHtmlTxt2(this._view.lab_jump, "前往提升vip", Color.YELLOW);

            this._view.img_common.source = ResUtil.getUiPng("create_union_common_1");
            this._view.img_common_sel.source = ResUtil.getUiPng("create_union_common_2");
            this._view.img_vip.source = ResUtil.getUiPng("create_union_vip_1");
            this._view.img_vip_sel.source = ResUtil.getUiPng("create_union_vip_2");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.lab_jump, TouchEvent.TOUCH_TAP, this.onJumpVip, this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.btn_random, TouchEvent.TOUCH_TAP, this.onRandom, this);
            addEventListener(this._view.img_common, TouchEvent.TOUCH_TAP, this.onSelectCommon, this);
            addEventListener(this._view.img_vip, TouchEvent.TOUCH_TAP, this.onSelectVip, this);

            this.onNt(UnionEvent.ON_UPDATE_UNION_NAME, this.onUpdateName, this);
        }

        protected onShow(): void {
            let random_name = this._proxy.model.random_name;
            if (!random_name || random_name == "") {
                this._proxy.c2s_random_guild_name();
            }
            super.onShow();
            this.onSelectCommon();
            this.onUpdateName();
        }

        private onUpdateName(): void {
            this._view.editable_value.text = this._proxy.model.random_name || "";
        }

        private onSelectCommon(): void {
            this._view.currentState = UnionCreateViewStatus.COMMON;
            let type: number = this._proxy.getCreateType(this._view.currentState);

            let cfg: GuildCreateDataConfig = getConfigByNameId(ConfigName.GuildCreateData, type);
            this._view.btn.label = "";
            this._view.btn.setCost(cfg.cost);
        }

        private onSelectVip(): void {
            this._view.currentState = UnionCreateViewStatus.VIP;
            let type: number = this._proxy.getCreateType(this._view.currentState);

            let cfg: GuildCreateDataConfig = getConfigByNameId(ConfigName.GuildCreateData, type);
            this._view.lab_tips.text = `VIP${cfg.vip_lv}可创建`;
            this._view.btn.label = "创建";
            this._view.btn.resetCost();
        }

        private onClick(): void {
            if (this._proxy.isInCd) {
                PromptBox.getIns().show("退出仙宗后2小时方可加入");
                return;
            }
            if (this._view.currentState == UnionCreateViewStatus.COMMON) {
                let cfg: GuildCreateDataConfig = getConfigByNameId(ConfigName.GuildCreateData, UnionCreateType.COMMON);
                if (!BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1], PropLackType.Text)) {
                    return
                }
            } else {
                let cfg: GuildCreateDataConfig = getConfigByNameId(ConfigName.GuildCreateData, UnionCreateType.VIP);
                if (VipUtil.getShowVipLv() < cfg.vip_lv) {
                    PromptBox.getIns().show(`VIP${cfg.vip_lv}可创建`);
                    return;
                }
                if (this._proxy.isCreateVip) {
                    PromptBox.getIns().show("您已创建过，无法再创建");
                    return;
                }
            }
            let name: string = this._view.editable_value.text;
            let type: number = this._proxy.getCreateType(this._view.currentState);
            this._proxy.c2s_create_guild(type, name);
        }

        private onJumpVip(): void {
            ViewMgr.getIns().openCommonRechargeView();
        }

        private onRandom(): void {
            this._proxy.c2s_random_guild_name();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}