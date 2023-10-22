namespace game.mod.shenling {

    import ShenlingConfig = game.config.ShenlingConfig;
    import GameNT = base.GameNT;
    import task_data = msg.task_data;

    export class ShenlingEvolveMdr extends MdrBase {
        private _view: ShenlingEvolveView = this.mark("_view", ShenlingEvolveView);
        private _proxy: ShenLingProxy;
        private _listData: eui.ArrayCollection;
        _showArgs: ShenlingConfig;
        private _evolvedIdx: number = 0;//已进化次数

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.list.itemRenderer = ShenlingEvolveTaskItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._proxy = this.retProxy(ProxyType.Shenling);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.evolveItem, egret.TouchEvent.TOUCH_TAP, this.onClickEvolveItem, this);
            addEventListener(this._view.btn_jinjie, egret.TouchEvent.TOUCH_TAP, this.onClickJinjie, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onUpdateTask, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_INFO, this.onUpdateView, this);
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.secondPop.updateTitleStr('进化');
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            if (this._proxy.isMaxEvolve(this._showArgs.index)) {
                this.hide();
            }
        }

        private updateView(): void {
            let index = this._showArgs.index;
            this._evolvedIdx = this._proxy.getEvolvedCnt(index);

            //展示下一阶的
            let nextQua = this._proxy.getNextEvolvedQuality(index);
            this._view.modelItem.updateEvolveModel(index, nextQua);
            //展示最高阶的
            let maxQua = this._showArgs.character[1];
            this._view.evolveItem.updateView(this._showArgs, 2, maxQua);

            this.updateTaskData();
            this.updateSkillItem();
            this.updatePower();

            let isTaskDone = this._proxy.isEvolveTaskAllDone(index);
            if (isTaskDone) {
                this._view.list.visible = false;
                this._view.btn_jinjie.visible = true;
                this._view.btn_jinjie.redPoint.visible = true;
            } else {
                this._view.list.visible = true;
                this._view.btn_jinjie.visible = false;
            }
        }

        private onClickEvolveItem(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenlingEvolvePreview, this._showArgs);
        }

        //任务更新
        private onUpdateTask(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(TaskType.ShenlingEvolve) > -1) {
                this.updateView();
            }
        }

        //更新任务
        private updateTaskData(): void {
            let cfg = this._showArgs;
            let taskIds = this._proxy.getEvolveTaskIds(cfg.index);
            let list: task_data[] = [];
            for (let id of taskIds) {
                list.push(TaskUtil.getTask(id));
            }
            list.sort(SortTools.sortTask);
            this._listData.replaceAll(list);
        }

        //技能
        private updateSkillItem(): void {
            let cfg = this._showArgs;
            let character = cfg.character;
            let initQuality = character[0];//初始进化品质
            let nextQua = this._proxy.getNextEvolvedQuality(cfg.index);//展示的品质
            this._view.skillItem.updateView(this._showArgs.common, nextQua, initQuality == nextQua);
        }

        //展示下一阶的
        private updatePower(): void {
            let cfg = this._showArgs;
            let attrId = cfg.attr[this._evolvedIdx - 1];
            let attr = RoleUtil.getAttr(attrId);
            this._view.power.setPowerValue(attr && attr.showpower || 0);
            this._view.btn_god.updateGod(attr && attr.god || 0);
        }

        private onClickJinjie(): void {
            let index = this._showArgs.index;
            if (this._proxy.canEvolve(index)) {
                this._proxy.c2s_god_brother_evolve(index);
            }
        }
    }
}