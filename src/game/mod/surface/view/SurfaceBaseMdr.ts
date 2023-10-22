namespace game.mod.surface {

    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;

    export class SurfaceBaseMdr extends EffectMdrBase {
        private _view: SurfaceBaseView = this.mark("_view", SurfaceBaseView);
        private _proxy: SurfaceProxy;
        private _headTypes: number[] = [ConfigHead.Horse, ConfigHead.Tianshen, ConfigHead.Lingchong, ConfigHead.Xianjian];//外显列表

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Surface);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_horse, TouchEvent.TOUCH_TAP, this.onClickHorse);
            addEventListener(this._view.btn_tianshen, TouchEvent.TOUCH_TAP, this.onClickTianshen);
            addEventListener(this._view.btn_lingchong, TouchEvent.TOUCH_TAP, this.onClickLingChong);
            addEventListener(this._view.btn_xianjian, TouchEvent.TOUCH_TAP, this.onClickXianjian);

            this.onNt(ActivityEvent.ON_UPDATE_PUNSHLIST_TYPE, this.onUpdateBtn, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateModel();
            this.updateHint();
            this.onUpdateBtn();
            this.showGuide();
        }

        protected onHide(): void {
            GuideMgr.getIns().clear(GuideKey.YulingHorse);//清除指引
            super.onHide();
        }

        private onUpdateBtn(): void {
            let type: number = ActivityUtil.getType();
            let open: boolean = ActivityUtil.checkOpen();
            this._view.img_tag1.visible = type == RankType.Zuoqi && open;
            this._view.img_tag3.visible = type == RankType.Yuanling && open;
        }

        private onClickHorse(): void {
            //点击坐骑
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Horse, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.Surface, SurfaceViewType.HorseMain);
        }

        private onClickTianshen(): void {
            //点击元灵
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Tianshen, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.Surface, SurfaceViewType.TianshenMain);
        }

        //灵宠
        private onClickLingChong(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Lingchong, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.Surface, SurfaceViewType.LingChongMain);
        }

        private onClickXianjian(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianjian, true)) {
                return
            }
            ViewMgr.getIns().showView(ModName.Surface, SurfaceViewType.Xianjian);
        }

        private updateModel(): void {
            //显示坐骑模型
            for (let i = 0; i < this._headTypes.length; ++i) {
                let type = this._headTypes[i];
                let index = this._proxy.getSurfaceId(type) || this._proxy.getDefaultId(type);
                if (!index) {
                    continue;
                }
                this.addAnimate(index, this._view["grp_eff" + (i + 1)]);
            }
        }

        private updateHint(): void {
            this._view.redPoint1.visible = HintMgr.getHint([ModName.Surface, SurfaceViewType.HorseMain]);
            this._view.redPoint2.visible = HintMgr.getHint([ModName.Surface, SurfaceViewType.TianshenMain]);
            this._view.redPoint3.visible = HintMgr.getHint([ModName.Surface, SurfaceViewType.LingChongMain]);
            this._view.redPoint4.visible = HintMgr.getHint([ModName.Surface, SurfaceViewType.Xianjian]);
        }

        //-------------------------------------指引相关------------------------------------------------
        private showGuide(): void {
            GuideMgr.getIns().show(GuideKey.YulingHorse, this._view.grp_horse, Handler.alloc(this, this.onClickHorse));//任务指引
        }
    }
}