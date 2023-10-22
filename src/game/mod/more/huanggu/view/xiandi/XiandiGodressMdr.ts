namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import BuffConfig = game.config.BuffConfig;

    export class XiandiGodressMdr extends EffectMdrBase {
        private _view: XiandiGodressView = this.mark("_view", XiandiGodressView);

        private _proxy: XiandiProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xiandi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onClickFight);
            addEventListener(this._view.grp_skill, TouchEvent.TOUCH_TAP, this.onClickSkill);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            if (this._proxy.tiandi_info) {
                let info = this._proxy.tiandi_info;
                this._view.head.updateHeadShow(info.head, info.head_frame, info.sex);
                this._view.lab_name.text = info.name;
            }
            this._view.btn_fight.visible = !this._proxy.is_tiandi;

            let buffId = this._proxy.getBuff();
            let buff: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
            this._view.img_icon.source = buff.icon;

            this._view.nameItem.updateShow(getLanById(LanDef.xiandi_tips6));

            // this._view.lab_desc.textFlow = TextUtil.parseHtml(getLanById(LanDef.xiandi_tips4));
        }

        private onClickFight(): void {
            // let cost: number[] = this._proxy.tiandi_zhengba_tiaozhan_duowei;
            // if (!BagUtil.checkPropCnt(cost[0], cost[1])) {
            //     ViewMgr.getIns().showGift(this._proxy.xiandi_libao);
            //     return;
            // }
            // let str: string = getLanById(LanDef.xiandi_tips13);
            // let content: string = StringUtil.substitute(str, []);
            // ViewMgr.getIns().showConfirm(content, base.Handler.alloc(this, () => {
            //     this._proxy.c2s_xiandi_zhengba_oper(3);
            // }))
            this._proxy.onCheckJockey();
        }

        private onClickSkill(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiSkill);
        }

        protected onHide(): void {
            super.onHide();
        }

    }
}