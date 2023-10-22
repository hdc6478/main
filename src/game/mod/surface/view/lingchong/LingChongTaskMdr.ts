namespace game.mod.surface {

    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class LingChongTaskMdr extends MdrBase {
        private _view: LingChongTaskView = this.mark("_view", LingChongTaskView);
        private _proxy: LingChongProxy;
        private _listTask: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Lingchong);
            this._view.list.itemRenderer = LingChongTaskItem;
            this._view.list.dataProvider = this._listTask = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow(): void {
            super.onShow();

            let index = this._showArgs as number;//灵宠index
            let cfg = this._proxy.getConfig(index);
            if (!cfg || !cfg.taskid) {
                return;
            }

            let list: string[][] = [];
            let info = this._proxy.getTaskInfo(index);
            for (let taskId of cfg.taskid) {
                let taskCfg = this._proxy.getTaskConfig(taskId);
                if (!taskCfg) {
                    continue;
                }
                let curTarget = info && info[taskId] ? info[taskId].step : 0;//当前次数
                let getCnt = Math.floor(curTarget / taskCfg.target);//可领取次数
                if (taskCfg.maxlimit) {
                    let gottenCnt = info && info[taskId] ? info[taskId].get_count : 0;
                    getCnt = Math.min(taskCfg.maxlimit - gottenCnt, getCnt);
                }
                let taskDesc = taskCfg.desc + ': ' + TextUtil.addColor(`${curTarget}/${taskCfg.target}`, WhiteColor.GREEN);
                let receiveDesc = StringUtil.substitute(getLanById(LanDef.lingchong_tips7), [TextUtil.addColor(getCnt + '', WhiteColor.GREEN)]);
                list.push([taskDesc, receiveDesc]);
            }
            this._listTask.replaceAll(list);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}