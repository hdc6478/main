namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import oper_act_item = msg.oper_act_item;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;

    export class FlyWarMainMdr extends WndSecondMdr implements UpdateItem{
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: 'feishengling_icon',
                mdr: FlyWarMdr,
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: 'renwu_icon',
                mdr: FlyTaskMdr,
            }
        ];

        private _proxy: ActivityProxy;
        private _flyRankProxy: FlyRankProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Activity);
            this._flyRankProxy = this.retProxy(ProxyType.FlyRank);
            this._view.timeItem.visible = true;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(ActivityEvent.ON_FLY_RANK_UPDATE_WAR, this.updateWarHint, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//属性刷新，有货币
            this.onNt(TaskEvent.ON_TASK_HINT, this.onTaskHint, this);//任务红点，数据携带任务类型列表
        }

        protected onShow(): void {
            super.onShow();

            this.updateTime();
            this.updateWarHint();
            this.updateTaskHint();

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            this._view.timeItem.updateActTime(this._proxy.curOpenAct);
        }

        private updateWarHint(): void {
            let actInfo = this._proxy.curOpenAct;
            let hint = this._flyRankProxy.getWarRewardHint(actInfo);
            this.updateHint(MdrTabBtnType.TabBtnType01, hint);
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if(keys.indexOf(RolePropertyKey.feisheng_exp) > -1){
                this.updateWarHint()
            }
        }

        protected onTaskHint(n: base.GameNT): void {
            let types: number[] = n.body;
            let type = TaskType.Fly;
            if(types.indexOf(type) < 0){
                return;
            }
            this.updateTaskHint();
        }

        private updateTaskHint(): void {
            let hint = TaskUtil.getTaskHint(TaskType.Fly);
            this.updateHint(MdrTabBtnType.TabBtnType02, hint);
        }

        private updateHint(btnType: string, hint: boolean): void {
            let list: WndBaseViewData[]  = this._btnList.source;
            let len: number = list ? list.length : 0;
            if(!len){
                return;
            }
            let pos = super.getMdrPosByType(btnType);
            let btnData = list[pos];
            if(!!btnData.showHint != hint){//过滤undefined!=false
                btnData.showHint = hint;
                this._btnList.itemUpdated(btnData);
            }
        }

    }
}