namespace game.mod {

    import ArrayCollection = eui.ArrayCollection;
    import Handler = base.Handler;
    import GameNT = base.GameNT;
    import TouchEvent = egret.TouchEvent;

    export class WndSecondMainMdr extends MdrBase {
        protected _view: WndSecondMainView = this.mark("_view", WndSecondMainView);
        protected _btnList: ArrayCollection;

        protected _btnData: WndBaseViewData[];/**子类重写，赋值*/
        protected _height: number = 1148;//secondPop默认高度

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._btnList = new ArrayCollection();
            // this._view.list_menu.name = "list_menu";
            this._view.list_menu.itemRenderer = TabSecondItem;
            this._view.list_menu.dataProvider = this._btnList;

            this._tab = this.genMdrTab(TabMdr);
            this._tab.btnList = this._view.list_menu;
            this._tab.condCheck = Handler.alloc(this, this.onTabCheck);
            this._tab.changeHandler = Handler.alloc(this, this.onTabChanged);

            this._view.secondPop.height = this._height;//设置高度
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateBtnList();
            this.updateViewShow();
            this.updateTabHint();
        }

        protected onHide() {
            super.onHide();
        }

        /**更新list数据*/
        protected updateBtnList() {
            let list: WndBaseViewData[] = [];
            let mdrs: MdrClsList = [];

            for (let data of this._btnData) {
                if (data.openIdx && !ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                    continue;
                }
                mdrs.push(data.mdr);
                list.push(data);
            }

            this._btnList.source = list;
            this._tab.mdrClsList = mdrs;
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
            if(gso.consoleIcon && data.icon){
                //打印图标资源
                console.info("打印图标：", data.icon + 1);
            }
            if(!data.openIdx){
                return true;
            }
            return ViewMgr.getIns().checkViewOpen(data.openIdx,true);
        }

        /**分页选中变更时调用，比Mdr的onShow()方法晚执行*/
        protected onTabChanged() {
            let data: WndBaseViewData = this._btnList.source[this._tab.selectIndex];
            this.updateTitle(data.title);
            this.updateBg(data.bg);
            this._btnList.replaceAll(this._btnList.source);//刷新分页选中状态
        }

        /**更新标题*/
        private updateTitle(title: string): void {
            if(!title){
                return;
            }
            let str = getLanById(title) || title;
            this._view.secondPop.updateTitleStr(str);
        }

        /**更新背景*/
        private updateBg(bg: string): void {
            if(bg == undefined){
                /**支持背景设置空：""*/
                return;
            }
            this._view.secondPop.updateBgSrc(ResUtil.getUiJpg(bg));
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
            let len: number = list ? list.length : 0

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
    }
}