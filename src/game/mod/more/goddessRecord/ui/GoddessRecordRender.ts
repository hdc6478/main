namespace game.mod.more {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import NvshenIndexConfig = game.config.NvshenIndexConfig;

    export class GoddessRecordRender extends BaseRenderer {
        public img_bg: eui.Image;
        public img_text: eui.Image;
        public group_eft: eui.Group;
        public img_mask: eui.Image;
        public redPoint: eui.Image;

        private _proxy: GoddessRecordProxy;

        public data: NvshenIndexConfig;
        private _isAct: boolean;

        protected onAddToStage(): void {
            super.onAddToStage();

            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            let index = data.index;
            this.img_bg.source = ResUtil.getUiPng(`goddessRecord_card${index}`);
            this.img_text.source=`goddessRecord_text${index}`;

            //todo
            if (data.index ==3 || data.index==4){
                this.img_text.visible=false;
            }

            let isAct = this._proxy.isAct(index);
            this._isAct = isAct;
            this.img_mask.visible = !isAct;

            this.redPoint.visible = this._proxy.getHint(index);

            this.removeEft();
            this.addEftByParent(UIEftSrc.Nvshenlu, this.group_eft);
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            //暂时屏蔽其他三个
            if(data.index != 1){
                PromptBox.getIns().show(`敬请期待！`);
                return ;
            }

            if(!this._isAct){
                //todo,可激活
                let costIndex = data.active_cost[0][0];
                ViewMgr.getIns().showGainWaysTips(costIndex);
                return;
            }
            let index = data.index;
            if(index == GoddessIndex.TimeGoddess){
                ViewMgr.getIns().showView(ModName.More, MoreViewType.TimeGoddessMain);
            }
            //todo
        }
    }
}