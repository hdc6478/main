namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import HuashenZhiluConfig = game.config.HuashenZhiluConfig;

    export class HuashenZhiluMdr extends MdrBase {
        private _view: HuashenZhiluView = this.mark("_view", HuashenZhiluView);

        private _proxy: HuashenProxy;
        private _taskList: ArrayCollection;
        private _rewardList: ArrayCollection;
        private _itemList: HuashenZhiluItem[];
        private _lineList: eui.Image[];
        private _selIndex: number = 0;/**当前选中的奖励下标，从0开始*/
        private _selItem: HuashenZhiluItem;
        private _lastIndex: number = 0;//上一端开始的节点

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Huashen);

            this._taskList = new ArrayCollection();
            this._view.list_task.itemRenderer = TaskRender;
            this._view.list_task.dataProvider = this._taskList;

            this._rewardList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._rewardList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);

            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
            this.onNt(HuashenEvent.ON_UPDATE_HUASHEN_ROAD_INFO, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initItemList();
            this.updateItemList();
            this.indexUpdateInfo();
            this.updateTaskList();
        }

        protected onHide(): void {
            this._selIndex = 0;
            this._lastIndex = 0;
            super.onHide();
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.HuashenZhilu) > -1) {
                this.updateTaskList();
            }
        }

        private onInfoUpdate(n: GameNT): void {
            this.updateItemList();
        }

        private initItemList(): void {
            this._itemList = [
                this._view.item1,
                this._view.item2,
                this._view.item3,
                this._view.item4,
                this._view.item5,
                this._view.item6,
                this._view.item7,
                this._view.item8,
                this._view.item9,
                this._view.item10
            ];
            let addEventListener = this.onEgret.bind(this);
            for(let item of this._itemList){
                addEventListener(item.btn_draw, TouchEvent.TOUCH_TAP, this.onClickItem);
            }
            this._view.item0.setDefault();//设置起点

            this._lineList = [
                this._view.img_line1,
                this._view.img_line2,
                this._view.img_line3,
                this._view.img_line4,
                this._view.img_line5,
                this._view.img_line6,
                this._view.img_line7,
                this._view.img_line8,
                this._view.img_line9,
                this._view.img_line10
            ];
        }

        private onClickItem(e: TouchEvent): void {
            let clickBtn = e.target;
            for (let i = 0; i < this._itemList.length; ++i) {
                let item = this._itemList[i];
                if (item.btn_draw != clickBtn) {
                    continue;
                }
                //点击宝箱
                let data = item.data;
                if(data.canDraw){
                    //领取奖励，领取奖励时候就不选中，返回数据后会自动选中
                    this._proxy.c2s_huashen_road_get_rewards();
                    break;
                }
                if(this._selIndex != i){
                    this.setSelIndex(i);
                }
                break;
            }
        }

        private updateItemList(): void {
            let startIndex = this._proxy.getRoadStartIndex();
            let hasChange = this._lastIndex && this._lastIndex != startIndex;//是否切层
            this._lastIndex = startIndex;
            let roadIndex = this._proxy.roadIndex;
            for(let i = 0; i < this._itemList.length && i < this._lineList.length; ++i) {
                let item = this._itemList[i];
                let line = this._lineList[i];
                let index = startIndex + i;
                let cfg: HuashenZhiluConfig = getConfigByNameId(ConfigName.HuashenZhilu, index);
                let hasDraw = this._proxy.hasDraw(index);
                let isCur = roadIndex == index;
                let isEnd = this._proxy.isRoadEnd(index);
                let canDraw = this._proxy.canDraw(index);
                item.setData(cfg, isEnd, hasDraw, isCur, canDraw);
                if(roadIndex + 1 == index && (this._selIndex < i || hasChange)){
                    //自动选中的时候，当前选中的已开启，才更新选中，全部领完奖励时候不会进这里
                    //切换层级时，重新选中
                    this.setSelIndex(i);
                }
                line.source = hasDraw ? "huashenzhilu_xian2" : "huashenzhilu_xian1";
            }
            let isCur = this._proxy.isCur();
            this._view.item0.setIsCur(isCur);//设置起点

            //全部领取完奖励的时候，设置不选中
            let hasAllDraw = this._proxy.hasAllDraw();
            if(hasAllDraw){
                this.setSelIndex(-1);
            }
        }

        private indexUpdateInfo(): void {
            this.updateItemSel();
            this.updateReward();
        }

        private setSelIndex(index: number): void {
            this._selIndex = index;
            this.indexUpdateInfo();
        }

        private updateItemSel(): void {
            for(let i = 0; i < this._itemList.length; ++i) {
                let item = this._itemList[i];
                let sel = this._selIndex == i;
                item.setSel(sel);
                if(sel){
                    this._selItem = item;
                }
            }
        }

        private updateReward(): void {
            if(this._selIndex < 0){
                //没选中奖励的情况，已领完
                this._view.currentState = "max";
                return;
            }
            this._view.currentState = "default";
            let data = this._selItem.data;
            let cfg = data.cfg;
            this._view.item_sel.setData(cfg, data.isEnd);
            this._rewardList.source = cfg.reward;
            let canDraw = this._proxy.canDraw(cfg.index);
            //this._view.lab_tips.visible = canDraw;
            this._view.grp_cnt.visible = !canDraw;
            if(!canDraw){
                let curCnt = BagUtil.getPropCntByIdx(PropIndex.Huashenzhilujifen);
                let leftCnt = Math.max(cfg.point - curCnt, 0);
                let cntStr = "再收集" + leftCnt;
                this._view.lab_cnt.text = cntStr;
            }
        }

        private updateTaskList(): void {
            let tasks = TaskUtil.getTaskList(TaskType.HuashenZhilu, true, true);
            if (this._taskList.source.length > 0) {
                this._taskList.replaceAll(tasks);
            } else {
                this._taskList.source = tasks;
            }
        }
    }
}