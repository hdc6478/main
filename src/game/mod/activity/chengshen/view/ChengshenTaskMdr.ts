namespace game.mod.activity {

    import ParamConfig = game.config.ParamConfig;
    import PropConfig = game.config.PropConfig;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import ShenlingConfig = game.config.ShenlingConfig;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;

    export class ChengshenTaskMdr extends MdrBase {
        private _view: ChengshenTaskView = this.mark("_view", ChengshenTaskView);
        private _proxy: ChengshenProxy;
        protected _showArgs: number;//ChengshenType
        private _index: number;//外显index
        private _canDraw: boolean;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Chengshen);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_draw, TouchEvent.TOUCH_TAP, this.onClickDraw, this);

            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
            this.onNt(ActivityEvent.ON_UPDATE_CHENGSHEN_REWARD, this.onInfoUpdate, this);
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
            this.onNt(ActivityEvent.ON_ACTIVITY_ICON_HIDE, this.onActivityIconHide, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.type = this._showArgs;
            this.initShow();
            this.updateTaskList();
            this.updateState();
            this.updateCnt();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onActivityIconHide(n: GameNT): void {
            let id: number = n.body;
            if (id == BtnIconId.Chengshen) {
                this.hide();
            }
        }

        private onClickDraw(): void {
            if(!this._canDraw){
                PromptBox.getIns().show(getLanById(LanDef.fight_soul_altar_tips1));
                return;
            }
            let type = this._proxy.type;
            this._proxy.c2s_chengshen_get_reward(type);
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Chengshen) > -1) {
                this.updateTaskList();
                this.updateState();
            }
        }

        private onInfoUpdate(): void {
            this.updateState();
        }

        private initShow(): void {
            let paramCfg: ParamConfig = GameConfig.getParamConfigById("chengshen_rewards");
            let type = this._proxy.type;
            let pos = type - 1;
            let reward: number[] = paramCfg.value[pos];
            let propIndex = reward[0];
            let cfg: PropConfig = GameConfig.getPropConfigById(propIndex);
            let index = cfg.param1 ? cfg.param1[0][0] : 0;
            this._index = index;
            this._view.baseSurfaceItem.updateShow(index, cfg.god, true);

            this._view.img_reward.source = "chengshen_reward" + type;
        }

        private updateTaskList(): void {
            let cfg: ShenlingConfig = getConfigById(this._index);
            if(!cfg){
                console.error("取不到神灵配置：", this._index);
                return;
            }
            let tipsStr = getLanById(LanDef.tishi_29) + cfg.name;//领取XXX

            let type = this._proxy.type;
            let taskList = this._proxy.getTaskList(type);

            let curVal = 0;//当前进度
            let maxVal = taskList.length;//任务条件

            for(let i = 0; i < taskList.length; ++i){
                let index = taskList[i];
                let task = TaskUtil.getTask(index);
                this._view["task" + i].data = task;//设置任务
                if(task && task.status != TaskStatus.NotFinish){
                    curVal++;
                }
            }
            tipsStr += TextUtil.addColor("（" + curVal + "/" + maxVal + "）", curVal >= maxVal ? BlackColor.GREEN : BlackColor.RED);
            //更新任务进度文本
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);
        }

        private updateState(): void {
            let type = this._proxy.type;
            let hasDraw = this._proxy.hasDraw(type);
            this._view.img_draw.visible = hasDraw;
            this._view.btn_draw.visible = !hasDraw;
            if(!hasDraw){
                let canDraw = this._proxy.canDraw(type);
                this._canDraw = canDraw;
                this._view.btn_draw.redPoint.visible = canDraw;
            }
        }

        private updateCnt(): void {
            //根据实际系统来取值，也可以根据任务进度处理
            let type = this._proxy.type;
            let cntStr = "";
            if(type == ChengshenType.Summon){
                let _proxy: SummonProxy = this.retProxy(ProxyType.Summon);
                cntStr = StringUtil.substitute(getLanById(LanDef.chengshen_tips1), [_proxy.count]);
            }
            else {
                let _proxy: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
                cntStr = StringUtil.substitute(getLanById(LanDef.chengshen_tips2), [_proxy.curStep - 1]);
            }
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
        }
    }
}