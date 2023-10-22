namespace game.mod.main {

    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import GameNT = base.GameNT;
    import facade = base.facade;
    import Handler = base.Handler;
    import PropertyEvent = eui.PropertyEvent;

    export class MainRightMdr extends EffectMdrBase {

        private _view: MainRightView = this.mark("_view", MainRightView);
        private _btnList: ArrayCollection;
        private _dailyProxy: IDailyProxy;
        private _bossProxy: IBossProxy;
        private _isShow: boolean;//是否显示view

        /**入口手动赋值就行了，其他的不用管*/
        private _btnData: MainRightActivityRenderData[] = [
            {icon: "main_right_btn_rc", openIdx: OpenIdx.Daily, viewDatas: [ModName.Daily, DailyViewType.DailyMain]},
            {
                icon: "main_right_btn_jjc",
                openIdx: OpenIdx.Shilian,
                viewDatas: [ModName.Shilian, ShilianViewType.ShilianMain],
                guideKey: GuideKey.Shilian
            },
            {
                icon: "main_right_btn_boss",
                openIdx: OpenIdx.Boss,
                viewDatas: [ModName.Boss, BossViewType.BossMain],
                guideKey: GuideKey.Boss
            },
            {
                icon: "main_right_btn_compete",
                openIdx: OpenIdx.Compete,
                viewDatas: [ModName.Compete, CompeteViewType.CompeteMain],
                guideKey: GuideKey.Compete
            },
            {icon: "main_right_btn_kf", openIdx: OpenIdx.Yijie, viewDatas: [ModName.Yijie, YijieViewType.YijieMain]}
        ];

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            this._view.percentWidth = this._view.percentHeight = 100;
            this._view.touchEnabled = false;

            this._btnList = new ArrayCollection();
            this._view.list_btn.itemRenderer = MainRightActivityRender;
            this._view.list_btn.dataProvider = this._btnList;

            this._dailyProxy = facade.retMod(ModName.Daily).retProxy(ProxyType.Daily);
            this._bossProxy = getProxy(ModName.Boss,ProxyType.Boss);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_btn, ItemTapEvent.ITEM_TAP, this.onTapBtn);
            addEventListener(this._view.list_btn, PropertyEvent.PROPERTY_CHANGE, this.onListChange);

            this.onNt(MainEvent.ON_OPEN_FUNC_UPDATE, this.onOpenFuncUpdate, this);//功能开启
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);//红点更新
            this.onNt(SceneEvent.SCENE_CHANGE, this.onSceneChange, this);//场景切换
            this.onNt(PassEvent.CHALLENGE_HANGUP_BOSS, this.updateShow, this);//挑战boss

            this.onNt(GuideEvent.ON_GUIDE_UPDATE, this.showGuide, this);//指引
        }

        protected onShow(): void {
            super.onShow();
            this.updateBtnList();
            this.updateHint();
            this.updateShow();
            this.onUpdatePreview();
            this.showGuide();
            this._bossProxy.updateCrossBossTips();
            this.onUpdateBossTips();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateBossTips():void{
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Abyss)){
                return;
            }
            this._bossProxy.onUpdateTips();
        }

        /**功能开启刷新按钮*/
        private onOpenFuncUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            for (let data of this._btnData) {
                if (addIdx.indexOf(data.openIdx) > -1) {
                    this.updateBtnList();
                    this.showGuide();//功能开启时候，执行下指引，防止任务指引执行的时候功能还未开启
                    break;
                }
            }
        }

        /** 打开界面*/
        private onTapBtn(e: eui.ItemTapEvent) {
            let btnData: MainRightActivityRenderData = e.item;
            this.onClickBtn(btnData);
        }

        private onClickBtn(btnData: MainRightActivityRenderData): void {
            if (btnData.guideKey) {
                GuideMgr.getIns().clear(btnData.guideKey);//清除指引
            }
            if (btnData.openIdx && !ViewMgr.getIns().checkViewOpen(btnData.openIdx, true)) {
                return;
            }
            if (!btnData.viewDatas) {
                return;
            }
            let modName = btnData.viewDatas[0];
            let viewType = btnData.viewDatas[1];
            ViewMgr.getIns().showView(modName, viewType);
        }

        private updateBtnList() {
            let list: MainRightActivityRenderData[] = [];
            for (let data of this._btnData) {
                if (data.openIdx && !ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                    continue;
                }
                list.push(data);
            }
            this._btnList.source = list;
        }

        private onUpdatePreview(): void {
            let proxy: IPassProxy = getProxy(ModName.Pass, ProxyType.Pass);
            if (proxy.onCheckMainShow()) {
                if (this._isShow) {
                    facade.showView(ModName.Main, MainViewType.Preview);
                } else {
                    facade.hideView(ModName.Main, MainViewType.Preview);
                }
            }
        }

        //----------------------------------------更新红点----------------------------------------
        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let list: MainRightActivityRenderData[] = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                if (!btnData.viewDatas) {
                    continue;
                }
                let type = btnData.viewDatas[0];
                /**转化为红点类型*/
                let hint = data.value;

                if (type == ModName.Daily) {
                    if (type != data.node && !this._dailyProxy.isOtherHint(data.node)) {
                        //当前刷新的红点不是日常模块红点，且不是日常模块额外的子红点
                        continue;
                    }
                    let dailyHint = HintMgr.getHint([type]);//日常模块红点
                    if (!dailyHint) {
                        //日常模块红点未激活，获取日常模块额外的子红点
                        dailyHint = this._dailyProxy.getOtherHint();
                    }
                    hint = dailyHint;//重新赋值红点
                } else if (type != data.node) {
                    continue;
                }
                if (!!btnData.showHint != hint) {//过滤undefined!=false
                    btnData.showHint = hint;
                    this._btnList.itemUpdated(btnData);
                }
                break;/**找到对应红点后则break，减少循环*/
            }
        }

        private updateHint() {
            let list: MainRightActivityRenderData[] = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                if (!btnData.viewDatas) {
                    continue;
                }
                let type = btnData.viewDatas[0];
                /**转化为红点类型*/
                let hint = HintMgr.getHint([type]);

                if (!hint && type == ModName.Daily) {
                    hint = this._dailyProxy.getOtherHint();
                }

                if (!!btnData.showHint != hint) {//过滤undefined!=false
                    btnData.showHint = hint;
                    this._btnList.itemUpdated(btnData);
                }
            }
        }

        //----------------------------------------更新红点----------------------------------------
        //----------------------------------------切换场景 start----------------------------------------
        /** 切换场景 */
        private onSceneChange() {
            this.updateShow();
        }

        //----------------------------------------切换场景 end----------------------------------------
        //--------------------显示主界面-----------------------
        private updateShow(): void {
            let isShow = SceneUtil.isShowMain();
            this._isShow = isShow;
            this._view.visible = isShow;
            this.onUpdatePreview();
            if (!isShow) {
                this.clearGuide();
            }
        }

        //-------------------------------------指引相关------------------------------------------------
        private showGuide(): void {
            if (!this._isShow) {
                return;
            }
            let num = this._view.list_btn.numChildren;
            if (!num) {
                return;
            }
            let list: MainRightActivityRenderData[] = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len && i < num; i++) {
                let btnData = list[i];
                let btn = this._view.list_btn.getChildAt(i);
                if (btnData.guideKey) {
                    GuideMgr.getIns().show(btnData.guideKey, btn, Handler.alloc(this, this.onClickBtn, [btnData]));//指引
                }
            }
        }

        private onListChange(e: PropertyEvent): void {
            if (e.property == "contentHeight") {
                this.showGuide();
            }
        }

        private clearGuide(): void {
            let list: MainRightActivityRenderData[] = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                if (btnData.guideKey) {
                    GuideMgr.getIns().clear(btnData.guideKey);//清除指引
                }
            }
        }
    }
}
