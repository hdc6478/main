namespace game.mod.more {

    import HonourConfig = game.config.HonourConfig;
    import task_data = msg.task_data;
    import LanDef = game.localization.LanDef;
    import teammate = msg.teammate;
    import GameNT = base.GameNT;

    export class HonourMdr extends MdrBase {
        private _view: HonourView = this.mark("_view", HonourView);
        private _proxy: HonourProxy;
        private _listData: eui.ArrayCollection;
        private _selIdx: number;
        private _selCfg: HonourConfig;
        /**荣耀类型*/
        protected _type: HonourType = HonourType.Honour;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Honour);

            this._view.list.itemRenderer = HonourItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_go, egret.TouchEvent.TOUCH_TAP, this.onClickBtnGo, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(MoreEvent.ON_UPDATE_HONOUR_INFO, this.updateView, this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onUpdateTaskInfo, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_honour_get_info(this._type);

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = null;
            this._selCfg = null;
        }

        private onUpdateTaskInfo(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(TaskType.Honour) > -1) {
                this.updateView();
            }
        }

        private updateView(): void {
            this.updateListData();
            this.updateSelectInfo();
        }

        private updateListData(): void {
            let listData = this._proxy.getListData(this._type);
            this._listData.replaceAll(listData);
            let selIdx = this._selIdx || 0;
            this._view.list.selectedIndex = this._selIdx = selIdx;
            this._selCfg = listData[selIdx].cfg;
        }

        //更新下方选中的信息
        private updateSelectInfo(): void {
            if (!this._selCfg) {
                return;
            }
            let taskId = this._selCfg.target;
            let taskData: task_data = TaskUtil.getTask(taskId);

            //首个达成者信息
            let taskDesc = TaskUtil.getTaskDescNotSchedule(taskData);
            let info = this._proxy.getInfoByTypeIndex(this._type, this._selCfg.index);
            let satisfyCnt = info && info.count || 0;
            let valStr = TextUtil.addColor(`${satisfyCnt}/${this._selCfg.person_limit}`, WhiteColor.GREEN);
            let limitStr = StringUtil.substitute(getLanById(LanDef.honour_tips3), [valStr]);
            this._view.lb_limitcnt.textFlow = TextUtil.parseHtml(limitStr);

            let mate: teammate = info && info.owner_info || null;
            if (mate) {
                this._view.head.updateHeadShow(mate.head, mate.head_frame, mate.sex, mate.role_id, mate.server_id);
                let timeSec = mate.value && mate.value.toNumber() || 0;
                this._view.lb_date.text = TimeUtil.formatTime(timeSec * 1000, 'yyyy年MM月dd日');
                let str = TextUtil.addColor(mate.name, WhiteColor.DEFAULT) + TextUtil.addColor(getLanById(LanDef.honour_tips4), WhiteColor.GREEN) + taskDesc;
                this._view.lb_desc.textFlow = TextUtil.parseHtml(str);
            } else {
                this._view.head.defaultHeadShow();
                this._view.lb_date.text = getLanById(LanDef.tishi_2);
                this._view.lb_desc.textFlow = TextUtil.parseHtml(taskDesc);
            }

            //任务信息
            this._view.icon.data = this._selCfg.rewards[0];
            this._view.lb_taskdesc.textFlow = TextUtil.parseHtml(TaskUtil.getTaskDesc(taskData));
            let schedule = taskData && taskData.schedule || 0;
            let target = taskData && taskData.target || 0;
            this._view.bar.show(schedule, target, false, null, false, ProgressBarType.Value);

            let hasDraw = TaskUtil.hasRewardDraw(taskData);
            if (hasDraw) {
                //已领取
                this._view.img_status.visible = true;
                this._view.img_status.source = 'lvseyilingqu';
                this._view.btn_go.visible = false;
            } else {
                //未完成，已领完
                let isFinish = info && info.is_finish == 1;
                this._view.img_status.visible = isFinish;
                this._view.img_status.source = isFinish ? 'hongseyilingwan' : '';
                this._view.btn_go.visible = !isFinish;
                let canDraw = TaskUtil.canRewardDraw(taskData);
                this._view.btn_go.setHint(canDraw);
                if (canDraw) {
                    this._view.btn_go.label = getLanById(LanDef.lingqu);
                    this._view.btn_go.setYellow();
                } else {
                    this._view.btn_go.label = getLanById(LanDef.goto);
                    this._view.btn_go.setBlue();
                }
            }
        }

        private onClickBtnGo(): void {
            if (!this._selCfg) {
                return;
            }
            let taskId = this._selCfg.target;
            let taskData = TaskUtil.getTask(taskId);
            TaskUtil.clickTask(taskData);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            this._selIdx = itemIdx;
            this._selCfg = (e.item as IHonourItemData).cfg;
            this.updateSelectInfo();
        }
    }
}