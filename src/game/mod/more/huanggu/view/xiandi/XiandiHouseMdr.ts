namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import TiandiTypeConfig = game.config.TiandiTypeConfig;

    export class XiandiHouseMdr extends MdrBase {
        private _view: XiandiHouseView = this.mark("_view", XiandiHouseView);

        private _proxy: XiandiProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xiandi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_god1, TouchEvent.TOUCH_TAP, this.onClickGod);
            addEventListener(this._view.btn_god2, TouchEvent.TOUCH_TAP, this.onClickGod);
            addEventListener(this._view.btn_god3, TouchEvent.TOUCH_TAP, this.onClickGod);
            addEventListener(this._view.btn_god4, TouchEvent.TOUCH_TAP, this.onClickGod);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClickFight);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let cfgArr: TiandiTypeConfig[] = getConfigListByName(ConfigName.TiandiType);
            for (let i in cfgArr) {
                let cfg: game.config.NewPrivilegeConfig = getConfigByNameId(ConfigName.NewPrivilege, cfgArr[i].privilege_id);
                let itype: number = cfgArr[i].itype;
                let btn: Btn = this._view[`btn_god${itype}`];
                let item: XiandiHouseItem = btn["item"];
                item.setData(cfgArr[i].image_id, cfg.desc);
                item.setGray(ActivityUtil.getActivateByTiandi(itype));
            }

            let info = this._proxy.tiandi_info;
            if (info) {
                this._view.head.updateHeadShow(info.head, info.head_frame, info.sex, info.role_id);
                this._view.lab_name.text = info.name;
            } else {
                this._view.head.defaultHeadShow();
                this._view.lab_name.text = getLanById(LanDef.tishi_2);
            }

            this._view.btn.visible = !this._proxy.is_tiandi;
        }

        private onClickFight(): void {
            // this._proxy.c2s_xiandi_zhengba_oper(3);
            // let cost: number[] = this._proxy.tiandi_zhengba_tiaozhan_duowei;
            // if (!BagUtil.checkPropCnt(cost[0], cost[1])) {
            //     ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiGift, this._proxy.xiandi_libao);
            //     return;
            // }
            // let str: string = getLanById(LanDef.xiandi_tips13);
            // let content: string = StringUtil.substitute(str, []);
            // ViewMgr.getIns().showConfirm(content, base.Handler.alloc(this, () => {
            //     this._proxy.c2s_xiandi_zhengba_oper(3);
            // }))
            this._proxy.onCheckJockey();
        }

        private onClickGod(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Tiandilu, true)) {
                return;
            }
            if (!RoleUtil.isRoleRingAct()) {
                PromptBox.getIns().show("请前往激活主角光环");
                return;
            }
            ViewMgr.getIns().showView(ModName.God, GodViewType.GodMain);
        }

        protected onHide(): void {
            let cfgArr: TiandiTypeConfig[] = getConfigListByName(ConfigName.TiandiType);
            for (let i in cfgArr) {
                let btn: Btn = this._view[`btn_god${cfgArr[i].itype}`];
                let item: XiandiHouseItem = btn["item"];
                item.setGray(false);
            }
            super.onHide();
        }
    }
}