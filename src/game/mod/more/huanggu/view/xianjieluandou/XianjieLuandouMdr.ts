namespace game.mod.more {

    import UpdateItem = base.UpdateItem;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;

    export class XianjieLuandouMdr extends MdrBase implements UpdateItem {
        private _view: XianjieLuandouView = this.mark("_view", XianjieLuandouView);
        private _proxy: XianjieLuandouProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianjieLuandou);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            addEventListener(this._view.btn_rank, egret.TouchEvent.TOUCH_TAP, this.onClickRank, this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickDo, this);
            this.onNt(MoreEvent.ON_XIANJIE_PVP_BASE_INFO_UPDATE, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.onUpdateView();
            this._listData.replaceAll(this._proxy.show_rewards);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {

            this.updateView();
            this._view.btn_do.setHint(this._proxy.isOpen);
        }

        private updateView(): void {
            let isOpen = this._proxy.isOpen;
            let isFirst = this._proxy.is_first_open;
            this._view.btn_rank.visible = !isFirst;//服务器首次活动开启前不显示此按钮
            if (isOpen) {
                this._view.btn_do.visible = true;
                this._view.img_end.visible = this._view.lb_desc.visible = false;
            } else {
                this._view.btn_do.visible = false;
                this._view.lb_desc.visible = isFirst;
                this._view.img_end.visible = !isFirst;
            }
        }

        update(time: base.Time) {
            let endTime = this._proxy.show_time_sec;
            let sufStr = '后开启';
            if (this._proxy.isOpen) {
                sufStr = '后结束';
            }
            this._view.timeItem.updateTime(endTime, sufStr);
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xianjieluandou_tips2));
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XianjieLuandouRankMain);
        }

        private onClickDo(): void {
            if (!RoleUtil.getGuildId()) {
                PromptBox.getIns().show(getLanById(LanDef.xianjieluandou_tips8));
                return;
            }
            this._proxy.c2s_xianjie_pvp_oper(XianjieLuandouOperType.Oper1);
        }
    }
}