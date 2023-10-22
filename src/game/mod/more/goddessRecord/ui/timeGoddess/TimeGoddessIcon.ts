namespace game.mod.more {

    import facade = base.facade;
    import zhandui_jitan_struct = msg.zhandui_jitan_struct;

    export class TimeGoddessIcon extends BaseRenderer {

        private btn_add: Btn;
        private btn_reward: Btn;
        private grp_tips: eui.Group;
        private lab_tips: eui.Label;
        private grp_name: eui.Group;
        private lab_name: eui.Label;
        private redPoint: eui.Image;
        private icon: Icon;

        public data: {info: zhandui_jitan_struct, pos: number};
        private _proxy: GoddessRecordProxy;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);
            this.lab_tips.text = "炼化中";
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_reward, this.onClickReward, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_add, this.onClickAdd, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.icon, this.onClickIcon, this);

        }

        protected dataChanged(): void {
            let data = this.data;
            if(!data){
                return;
            }
            let info = data.info;
            let hasInfo = !!info;//是否供奉
            this.btn_add.visible = !hasInfo;//没有供奉

            let canDraw = this._proxy.canIconDraw(info);//可领奖
            this.btn_reward.visible = canDraw;

            this.icon.visible = hasInfo && !canDraw;//供奉且不可领奖
            let propData = hasInfo ? PropData.create(info.idx) : null;
            if(this.icon.visible){
                this.icon.setData(propData, IconShowType.NotTips);
            }
            this.grp_name.visible = !!propData;
            if(this.grp_name.visible){
                this.lab_name.textFlow = propData.getPropName(false);
            }

            let gongfenging = this._proxy.gongfenging(info);
            this.grp_tips.visible = gongfenging;

            this.redPoint.visible = canDraw || this._proxy.canIconAdd(info);
        }

        private onClickReward(): void {
            let data = this.data;
            if(!data){
                return;
            }
            //不传pos，一键领取
            this._proxy.c2s_chuang_shi_nv_shen_system_click(TimeGoddessOpType.GongfengReward);
        }

        private onClickAdd(): void {
            let data = this.data;
            if(!data){
                return;
            }
            if (!this.redPoint.visible) {
                ViewMgr.getIns().showGainWaysTips(PropIndex.Jipin);
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.TimeGoddessShelf);
        }

        private onClickIcon(): void {
            let data = this.data;
            if(!data){
                return;
            }
            if (this.grp_tips.visible) {
                ViewMgr.getIns().showPropTips(data.info.idx.toNumber());
                return;
            }
            this._proxy.c2s_chuang_shi_nv_shen_system_click(TimeGoddessOpType.GongfengDel, data.pos);
        }
    }

}