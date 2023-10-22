namespace game.mod {
    import ArrayCollection = eui.ArrayCollection;
    import Handler = base.Handler;
    import GameNT = base.GameNT;

    export class WndSecondMdr extends MdrBase {
        protected _view: WndSecondView = this.mark("_view", WndSecondView);

        protected _btnList: ArrayCollection;
        protected _btnData: WndBaseViewData[];/**子类重写，赋值*/
        private _firstEnter: boolean = false;/**是否首次进入，用于保存界面数据*/

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._btnList = new ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._btnList;

            this._tab = this.genMdrTab(TabMdr);
            this._tab.btnList = this._view.list_type;
            this._tab.condCheck = Handler.alloc(this, this.onTabCheck);
            this._tab.changeHandler = Handler.alloc(this, this.onTabChanged);

            this._view.timeItem.visible = false;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
            this.onNt(MainEvent.ON_OPEN_FUNC_UPDATE, this.onOpenFuncUpdate, this);//功能开启
            this.onNt(MainEvent.UPDATE_WND_SECOND_MDR_TOP, this.onTopUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this._firstEnter = true;
            this.updateBtnList();
            this.updateViewShow();
            this.updateTabHint();
        }

        protected onHide(): void {
            super.onHide();
        }

        /**更新list数据*/
        protected updateBtnList() {
            let list: WndBaseViewData[] = [];
            let mdrs: MdrClsList = [];

            let state = "1";
            for (let data of this._btnData) {
                if (data.openIdx && !ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                    continue;
                }
                if(data.nameIcon){
                    state = "2";//副本分页
                }
                mdrs.push(data.mdr);
                list.push(data);
            }

            this._btnList.source = list;
            this._tab.mdrClsList = mdrs;
            this._view.currentState = state;
        }

        /**刷新显示界面*/
        protected updateViewShow(): void {
            let type: string = "";
            if (Array.isArray(this._showArgs)) {
                type = this._showArgs.shift();
                this._tab.params = this._showArgs;
            } else {
                type = this._showArgs;
            }
            this._tab.selectIndex = Math.max(this.getMdrPosByType(type), 0);
            this._tab.show();
        }

        /**获取对应的mdr*/
        protected getMdrPosByType(type: string): number {
            let list: WndBaseViewData[]  = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                if (list[i].btnType == type) {
                    return i;
                }
            }
            return -1;
        }

        /**分页点击时检测*/
        protected onTabCheck(index: number): boolean {
            let data: WndBaseViewData = this._btnList.source[index];
            if(!data.openIdx){
                return true;
            }
            return ViewMgr.getIns().checkViewOpen(data.openIdx,true);
        }

        /**分页选中变更时调用，比Mdr的onShow()方法晚执行*/
        protected onTabChanged() {
            let data: WndBaseViewData = this._btnList.source[this._tab.selectIndex];
            if(data.title){
                this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_TITLE, data.title)
            }
            if(data.bg != undefined){
                /**支持背景设置空：""*/
                this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_BG, data.bg)
            }

            if(!this._firstEnter){
                /**非首次切换分页时，保存分页数据*/
                let lastData = ViewMgr.getIns().lastData;
                let type = lastData && lastData.length ? lastData[0] : "00";//没有记录WndBaseMdr分页的话，需要补上00
                ViewMgr.getIns().lastData = [type, data.btnType];
            }
            this._firstEnter = false;
        }

        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let list: WndBaseViewData[]  = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                if(!btnData.hintTypes){
                    continue;
                }
                let type = HintMgr.getType(btnData.hintTypes);/**转化为红点类型*/
                if (type != data.node) {
                    continue;
                }
                if(!!btnData.showHint != data.value){//过滤undefined!=false
                    btnData.showHint = data.value;
                    this._btnList.itemUpdated(btnData);
                }
                break;/**找到对应红点后则break，减少循环*/
            }
        }

        /** 刷新分页红点 */
        protected updateTabHint(): void {
            let list: WndBaseViewData[]  = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                if(!btnData.hintTypes){
                    continue;
                }
                let hint = HintMgr.getHint(btnData.hintTypes);
                if(!!btnData.showHint != hint){//过滤undefined!=false
                    btnData.showHint = hint;
                    this._btnList.itemUpdated(btnData);
                }
            }
        }
        /**功能开启刷新按钮*/
        private onOpenFuncUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            for (let data of this._btnData) {
                if (addIdx.indexOf(data.openIdx) > -1) {
                    this.updateBtnList();
                    break;
                }
            }
        }

        /** 通用移动层级监听 */
        private onTopUpdate(n: GameNT): void {
            this._view.setChildIndex(this._view.grp_top, this._view.numChildren - 1);
        }
    }
}