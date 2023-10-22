namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class HundunMdr extends EffectMdrBase implements UpdateItem {
        private _view: HundunView = this.mark("_view", HundunView);
        private _fengmo: FengmoProxy;
        private _crossunion: CrossUnionProxy;
        private _xianmaiProxy: XianmaiProxy;
        private _xianjieProxy: XianjieLuandouProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._fengmo = this.retProxy(ProxyType.Fengmo);
            this._crossunion = this.retProxy(ProxyType.CrossUnion);
            this._xianmaiProxy = this.retProxy(ProxyType.Xianmai);
            this._xianjieProxy = this.retProxy(ProxyType.XianjieLuandou);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_fengmo, TouchEvent.TOUCH_TAP, this.onClickFengmo);
            addEventListener(this._view.btn_crossunion, TouchEvent.TOUCH_TAP, this.onClickCrossUnion);
            addEventListener(this._view.btn_xianmai, TouchEvent.TOUCH_TAP, this.onClickXianmai);
            addEventListener(this._view.btn_xuanyuanmen, TouchEvent.TOUCH_TAP, this.onClickXuanyuanmen);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
            this.updateHint();
            TimeMgr.addUpdateItem(this, 1000);
            this.updateTime();
        }

        protected onHide(): void {
            this._view.btn_crossunion.clearEffect();
            this._view.btn_fengmo.clearEffect();
            this._view.btn_xianmai.clearEffect();
            super.onHide();
        }

        private onClickCrossUnion(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.CrossUnion, true)) {
                return;
            }
            // let openView: string = this._crossunion.openView;
            // ViewMgr.getIns().showView(ModName.More, openView);
            PromptBox.getIns().show(`敬请期待！`);
        }

        private onClickFengmo(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.Fengmo);
        }

        private onClickXianmai(): void {
            if (!this._xianmaiProxy.isActTime()) {
                PromptBox.getIns().show(getLanById(LanDef.huodongzanweikaiqi));
                return;
            }
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XianmaiMain);
        }

        private onClickXuanyuanmen(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianjieLuandou, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XianjieLuandouMain);
        }

        private updateView(): void {
            //封魔台
            this._view.btn_fengmo["lab_count"].text = `次数：${this._fengmo.times}/${this._fengmo.guild_fengmo_meiricishu}`;
            this._view.btn_fengmo.setEffect(UIEftSrc.LeiZe);

            //跨服仙宗战
            let grp = this._view.btn_crossunion["grp_tips"];
            let state: number = this._crossunion.openState;
            let is_join: boolean = this._crossunion.is_join;
            let is_guild_join: boolean = this._crossunion.is_guild_join;
            grp.visible = !is_join && (state == CrossUnionOpenState.Match && is_guild_join || state == CrossUnionOpenState.Ready);
            this._view.btn_crossunion.setEffect(UIEftSrc.KunLunJing);

            //仙脉争夺（不周山）
            this._view.btn_xianmai.updateShow('buzhoushan_btn_icon', '不周山', false);
            this._view.btn_xianmai.setEffect(UIEftSrc.BuZhouShan);

            //仙界乱斗（轩辕门）
            this.updateBtnXuanyuanmen();
        }

        //仙界乱斗（轩辕门）
        private updateBtnXuanyuanmen(): void {
            let timeItem: TimeItem = this._view.btn_xuanyuanmen['timeItem'];
            let labCount: eui.Label = this._view.btn_xuanyuanmen['lab_count'];
            let isOpen = this._xianjieProxy.isOpen;
            if (isOpen) {
                timeItem.visible = false;
                labCount.visible = true;
                labCount.text = getLanById(LanDef.xianjieluandou_tips18);
            } else {
                timeItem.visible = true;
                labCount.visible = false;
                timeItem.updateTime(this._xianjieProxy.show_time_sec);
            }
        }

        //红点
        private updateHint(): void {
            this._view.btn_fengmo.setHint(HintMgr.getHint([ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.Fengmo]));
            this._view.btn_crossunion.setHint(HintMgr.getHint([ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.CrossUnion]));
            //仙脉红点
            this._view.btn_xianmai.setHint(HintMgr.getHint([ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.XianmaiMain]));
            //轩辕门
            this._view.btn_xuanyuanmen.setHint(HintMgr.getHint([ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.XianjieLuandouMain, XianjieLuandouMainBtnType.Btn1]));
        }

        update(time: base.Time) {
            this.updateTime();
        }

        private updateTime(): void {
            if (this._xianmaiProxy.isActTime()) {
                this._view.btn_xianmai.timeItem.visible = false;
            } else {
                this._view.btn_xianmai.updateTime(this._xianmaiProxy.getShowStartTime(), getLanById(LanDef.material3));
            }

            this.updateBtnXuanyuanmen();
        }

    }
}