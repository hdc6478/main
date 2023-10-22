namespace game.mod {

    import Handler = base.Handler;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;

    //一级界面公共类，不绑定view
    export class WndMdr extends MdrBase {

        protected _btnList: ArrayCollection;
        protected _btnData: WndBaseViewData[];/**子类重写，赋值*/
        protected _firstEnter: boolean = false;/**是否首次进入，用于保存界面数据*/

        constructor() {
            super(Layer.window);
        }

        protected onInit(): void {
            super.onInit();

            this._btnList = new ArrayCollection();

            this._tab = this.genMdrTab(TabMdr);
            this._tab.condCheck = Handler.alloc(this, this.onTabCheck);
            this._tab.changeHandler = Handler.alloc(this, this.onTabChanged);
        }

        protected addListeners(): void {
            let addEventListener = this.onEgret.bind(this);
            this.onNt(ViewEvent.ON_COMMON_BACK, this.onClickBack, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
            this.onNt(MainEvent.UPDATE_WND_BASE_MDR_BG, this.onBgUpdate, this);
            this.onNt(MainEvent.UPDATE_WND_BASE_MDR_SEL_TAB, this.onTabUpdate, this);
            this.onNt(MainEvent.ON_OPEN_FUNC_UPDATE, this.onOpenFuncUpdate, this);//功能开启
        }

        protected onShow(): void {
            super.onShow();
            egret["entityLayer"] = [
                "_layerDown","_layerAvatar","_layerDropItem","_layerEffect","_layerEffect2", //场景
                "MainLeftView","MainRightView","MainBottomView","MainLeftActTopView","MainLeftActMidView" //部分主界面
            ];
            this._firstEnter = true;
            this.updateBtnList();
            this.updateViewShow();
            this.updateTabHint();
        }

        protected onHide() {
            egret["entityLayer"] = null;
            super.onHide();
        }

        protected onClickBack() {
            ViewMgr.getIns().back();
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
            let type: string = this.getDefaultBtnType();
            if(this._showArgs){
                if (Array.isArray(this._showArgs)) {
                    type = this._showArgs.shift();
                    this._tab.params = this._showArgs;
                } else {
                    type = this._showArgs;
                }
            }
            this._tab.selectIndex = Math.max(this.getMdrPosByType(type), 0);
            this._tab.show();
        }

        /**获取对应的mdr*/
        protected getMdrPosByType(type: string): number {
            if(!type){
                return -1;
            }
            let list: WndBaseViewData[]  = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                if (list[i].btnType == type) {
                    return i;
                }
            }
            return -1;
        }

        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string {
            return "";
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
            if(!data){
                console.error("取不到分页数据");
                return;
            }
            this.updateBg(data.bg);
            this.setTop();
            this.setViewData();
            this._btnList.replaceAll(this._btnList.source);//刷新分页选中状态
        }

        /** 通用背景监听 */
        private onBgUpdate(n: GameNT): void {
            let bg: string = n.body;
            this.updateBg(bg);
        }

        /**更新背景，子类重写 */
        protected updateBg(bg: string): void {
        }

        /** 通用移动层级监听，子类重写 */
        protected setTop(): void {
        }

        /**保存分页数据，子类可重写*/
        protected setViewData(): void {
            let data: WndBaseViewData = this._btnList.source[this._tab.selectIndex];
            if(!this._firstEnter){
                /**非首次切换分页时，保存分页数据*/
                ViewMgr.getIns().lastData = [data.btnType];
            }
            this._firstEnter = false;
        }

        private onTabUpdate(n: GameNT): void {
            let type: string = n.body;
            let index = this.getMdrPosByType(type);
            if(index < 0){
                return;
            }
            if(!this.onTabCheck(index)){
                return;
            }
            this._tab.selectIndex = index;
            this._tab.show();
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
    }
}