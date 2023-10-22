namespace game.mod.main {
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import Tween = base.Tween;
    import facade = base.facade;
    import Handler = base.Handler;
    import Pool = base.Pool;
    import Point = egret.Point;
    import LanDef = game.localization.LanDef;
    import delayCall = base.delayCall;

    export class MainMenuMdr extends EffectMdrBase {
        private _view: MainMenuView = this.mark("_view", MainMenuView);
        private _proxy: MainProxy;
        private _bagProxy: IBagProxy;
        private _shenlingProxy: IShenLingProxy;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.bottom = 5;
            this._view.horizontalCenter = 0;
            this._proxy = this.retProxy(ProxyType.Main);
            this._bagProxy = facade.retMod(ModName.Bag).retProxy(ProxyType.Bag);
            this._shenlingProxy = facade.retMod(ModName.Shenling).retProxy(ProxyType.Shenling);
            this._view.img_bg.source = ResUtil.getUiPng("ui_png_BottomBg");

            // 宗门红点位置修改
            this._view.btn_shenling.redPoint.right = 8;
            this._view.btn_shenling.redPoint.top = 7;
            this._view.btn_shenling.img_bg.source = `btn_shenling_bg`;
            this._view.btn_shenling.img_bg.verticalCenter = 8;
            this._view.btn_xianlu.img_bg.source = `xianludikuang`;
            this._view.btn_xianlu.img_bg.verticalCenter = 10;
        }

        protected addListeners(): void {
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_xianlu, TouchEvent.TOUCH_TAP, this.onClickXianlu);
            addEventListener(this._view.btn_role, TouchEvent.TOUCH_TAP, this.onClickRole);
            addEventListener(this._view.btn_enhance, TouchEvent.TOUCH_TAP, this.onClickEnhance);
            addEventListener(this._view.btn_bag, TouchEvent.TOUCH_TAP, this.onClickBag);
            addEventListener(this._view.btn_surface, TouchEvent.TOUCH_TAP, this.onClickSurface);
            addEventListener(this._view.btn_shenling, TouchEvent.TOUCH_TAP, this.onClickShenLing);
            addEventListener(this._view.gr_shenlingtips, TouchEvent.TOUCH_TAP, this.onClickShenLing);
            addEventListener(this._view.btn_xianfa, TouchEvent.TOUCH_TAP, this.onClickXianfa);

            addEventListener(this._view.grp_tip, TouchEvent.TOUCH_TAP, this.onClickTip);

            /********************新的监听事件*******************/
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
            this.onNt(BagEvent.ON_BAG_MELT_TIP, this.updateMeltTip, this);
            this.onNt(RoleEvent.ON_ROLE_PRIVILEGE_UPDATE, this.onRolePrivilegeUpdate, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE, this.onBagUpdateByPropType, this);

            this.onNt(GuideEvent.ON_GUIDE_UPDATE, this.showGuide, this);//指引
            this.onNt(MainEvent.ON_ICON_IMAGE_FLY, this.onIconImageFly, this);//按钮飞动

            this.onNt(ActivityEvent.ON_UPDATE_PUNSHLIST_TYPE, this.onUpdateBtn, this);
            this.onNt(MainEvent.ON_OPEN_FUNC_UPDATE, this.onOpenFuncUpdate, this);//功能开启

            this.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_INFO, this.updateShenlingTips, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE, this.onBagUpdateByPropTypeAndSubType, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateBtn();
            this.updateHint();
            this.updateMeltTip();
            this.autoUseBox();
            this.showGuide();
            this.updateShenlingTips();
        }

        protected onHide(): void {
            this.removeMeltTipTween();
            GuideMgr.getIns().clearGuide();
            super.onHide();
        }

        private onBagUpdateByPropTypeAndSubType(n: GameNT): void {
            let list: { [type: number]: number[] } = n.body;
            for (let type in list) {
                if ((+type) == PropType.Surface) {
                    if (ViewMgr.getIns().checkViewOpen(OpenIdx.Shenling)) {
                        this.updateShenlingTips();
                    }
                    break;
                }
            }
        }

        private updateShenlingTips(): void {
            let canAct = this._shenlingProxy.haveActType(false);
            let canUp = this._shenlingProxy.haveUpStarType();
            this._view.gr_shenlingtips.visible = canAct || canUp;
            this._view.lb_shenlingtips.text = canAct ? getLanById(LanDef.body_art1) : (canUp ? '可升星' : '');
        }

        private onClickXianlu(): void {
            GuideMgr.getIns().clear(GuideKey.Xianlu);//清除指引
            ViewMgr.getIns().showViewByID(JumpIdx.Xianlu);
        }

        private onClickSurface(): void {
            GuideMgr.getIns().clear(GuideKey.Yuling);//清除指引
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Yuling, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.Surface, SurfaceViewType.SurfaceMain);
        }

        private onClickRole(): void {
            GuideMgr.getIns().clear(GuideKey.Role);//清除指引
            ViewMgr.getIns().showViewByID(JumpIdx.Role);
        }

        private onClickEnhance(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.Strength);
        }

        private onClickBag(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Bag, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.Bag, BagViewType.BagMain);
        }

        private onClickXianfa(): void {
            GuideMgr.getIns().clear(GuideKey.Xianfa);//清除指引
            ViewMgr.getIns().showViewByID(JumpIdx.Xianfa);
        }

        private onClickShenLing(): void {
            GuideMgr.getIns().clear(GuideKey.Shenling);//清除指引
            ViewMgr.getIns().showViewByID(JumpIdx.Shenling);
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            switch (data.node) {
                case ModName.Xianlu:
                    this.updateXianluHint(data.value);
                    break;
                case ModName.Role:
                    this.updateRoleHint(data.value);
                    break;
                case ModName.Enhance:
                    this.updateEnhanceHint(data.value);
                    break;
                case ModName.Bag:
                    this.updateBagHint(data.value);
                    break;
                case ModName.Xianfa:
                    this.updateXianfaHint(data.value);
                    break;
                case ModName.Shenling:
                    this.updateShenLingHint(data.value);
                    break;
                case ModName.Surface:
                    this.updateSurfaceHint(data.value);
                    break;
            }
        }

        /** 更新红点 */
        private updateHint() {
            this.updateXianluHint(HintMgr.getHint([ModName.Xianlu]));
            this.updateRoleHint(HintMgr.getHint([ModName.Role]));
            this.updateEnhanceHint(HintMgr.getHint([ModName.Enhance]));
            this.updateBagHint(HintMgr.getHint([ModName.Bag]));
            this.updateXianfaHint(HintMgr.getHint([ModName.Xianfa]));
            this.updateShenLingHint(HintMgr.getHint([ModName.Shenling]));
            this.updateSurfaceHint(HintMgr.getHint([ModName.Surface]));
        }

        /**功能开启刷新按钮*/
        private onOpenFuncUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            let openIdxs: number[] = ActivityUtil.getOpenIdxs();
            for (let openIdx of openIdxs) {
                if (addIdx.indexOf(openIdx) > -1) {
                    this.onUpdateBtn();
                    break;
                }
            }
        }

        private onUpdateBtn(): void {
            let open: boolean = ActivityUtil.checkOpen();
            this._view.btn_surface.setTag(ActivityUtil.checkSurfaceType() && open);
            this._view.btn_role.setTag(ActivityUtil.checkRoleType() && open);
            this._view.btn_shenling.setTag(ActivityUtil.getType() == RankType.Shenling && open);
        }

        /** 更新仙路红点 */
        private updateXianluHint(hint: boolean) {
            this._view.btn_xianlu.redPoint.visible = hint;
        }

        /** 更新角色红点 */
        private updateRoleHint(hint = false) {
            this._view.btn_role.setHint(hint);
        }

        /** 更新强化红点 */
        private updateEnhanceHint(hint = false) {
            this._view.btn_enhance.setHint(hint);
        }

        /** 更新背包红点 */
        private updateBagHint(hint: boolean) {
            this._view.btn_bag.redPoint.visible = hint;
        }

        /** 更新仙法红点 */
        private updateXianfaHint(hint = false) {
            this._view.btn_xianfa.setHint(hint);
        }

        /**神灵红点*/
        private updateShenLingHint(hint = false) {
            this._view.btn_shenling.setHint(hint);
        }

        /** 更新御灵红点 */
        private updateSurfaceHint(hint: boolean) {
            this._view.btn_surface.redPoint.visible = hint;
        }

        //-------------------------------------背包特权相关------------------------------------------------
        /** 更新角色特权信息 */
        private onRolePrivilegeUpdate(n: GameNT) {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePrivilegeKey.item_auto) >= 0) {
                this.updateMeltTip();
            }
            if (keys.indexOf(RolePrivilegeKey.bag_box) >= 0) {
                this.autoUseBox();
            }
        }

        private onBagUpdateByPropType(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(PropType.Box) < 0) {
                return;
            }
            this.autoUseBox();
        }

        /** 熔炼提示 */
        private updateMeltTip(): void {
            let meltTip = this._bagProxy.meltTip;
            let hasPrivilege = RoleUtil.hasPrivilege(RolePrivilegeKey.item_auto);//自动熔炼特权
            if (meltTip && hasPrivilege) {
                this._bagProxy.clickMelt();//自动熔炼
            }
            let isShow = meltTip && !hasPrivilege;
            this._view.grp_tip.visible = isShow;
            if (isShow) {
                this._view.grp_tip.y = -21;
                Tween.get(this._view.grp_tip, {loop: true})
                    .to({y: 0}, 500)
                    .to({y: -21}, 500);
            } else {
                this.removeMeltTipTween();
            }
        }

        private removeMeltTipTween(): void {
            Tween.remove(this._view.grp_tip);
        }

        //点击熔炼提示，直接熔炼
        private onClickTip(): void {
            this._bagProxy.clickMelt();//熔炼
        }

        /**自动使用背包宝箱*/
        private autoUseBox(): void {
            let hasPrivilege = RoleUtil.hasPrivilege(RolePrivilegeKey.bag_box);//自动使用宝箱特权
            if (hasPrivilege) {
                delayCall(Handler.alloc(this, ()=>{
                    this._bagProxy.autoUseBox();//自动使用宝箱
                }), 200);
            }
        }

        //-------------------------------------背包特权相关------------------------------------------------

        //-------------------------------------指引相关------------------------------------------------
        private showGuide(): void {
            GuideMgr.getIns().show(GuideKey.Shenling, this._view.btn_shenling, Handler.alloc(this, this.onClickShenLing));//神灵指引
            GuideMgr.getIns().show(GuideKey.Role, this._view.btn_role, Handler.alloc(this, this.onClickRole));//角色指引
            GuideMgr.getIns().show(GuideKey.Xianfa, this._view.btn_xianfa, Handler.alloc(this, this.onClickXianfa));//仙法指引
            GuideMgr.getIns().show(GuideKey.Xianlu, this._view.btn_xianlu, Handler.alloc(this, this.onClickXianlu));//仙路指引
            GuideMgr.getIns().show(GuideKey.Yuling, this._view.btn_surface, Handler.alloc(this, this.onClickSurface));//御灵指引
        }

        //-------------------------------------按钮飞动------------------------------------------------
        private onIconImageFly(n: GameNT) {
            let info: IconImageFlyData = n.body;
            if (!info) {
                return;
            }
            let type = info.type;
            let btn = this.getMainBtn(type);
            if (!btn) {
                return;
            }
            let icon: BitmapBase = Pool.alloc(BitmapBase);
            icon.source = info.imgSource;
            icon.width = info.imgWidth;
            icon.height = info.imgHeight;
            icon.anchorOffsetX = info.imgWidth / 2;
            icon.anchorOffsetY = info.imgHeight / 2;
            icon.x = info.startPosX + icon.anchorOffsetX;
            icon.y = info.startPosY + icon.anchorOffsetY;

            let layer = info.layer || Layer.tip;
            layer.addChild(icon);

            let targetPoint: Point = btn.localToGlobal();//转化全局坐标
            let endPosX = targetPoint.x - layer.x + btn.width / 2;//需要减去对应layer的坐标
            let endPosY = targetPoint.y - layer.y + btn.height / 2;//描点为中心
            let time = info.time || 1000;
            let handler = info.handler;
            Tween.get(icon)
                .to({x: endPosX, y: endPosY}, time)
                .to({scaleX: 0, scaleY: 0}, 200)
                .exec(Handler.alloc(this, this.onIconImageFlyEnd, [icon, handler]));
        }

        private onIconImageFlyEnd(icon: BitmapBase, handler: Handler): void {
            if (icon.parent) {
                icon.parent.removeChild(icon);
            }
            Pool.release(icon);
            if (handler) {
                handler.exec();
            }
        }

        private getMainBtn(type: number): Btn {
            switch (type) {
                case MainBtnType.Xianfa:
                    return this._view.btn_xianfa;
            }
            return null;
        }

        //-------------------------------------按钮飞动------------------------------------------------
    }
}
