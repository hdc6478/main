namespace game.mod.consecrate {


    import consecrate_infos = msg.consecrate_infos;
    import facade = base.facade;

    export class ConsecrateIconItem extends BaseRenderer {

        private btn_add: Btn;
        private btn_reward: Btn;
        private grp_tips: eui.Group;
        private grp_name: eui.Group;
        private group_eft: eui.Group;
        private lab_name: eui.Label;
        private redPoint: eui.Image;
        private icon: Icon;

        public data: consecrate_infos;
        private _proxy: ConsecrateProxy;

        constructor() {
            super();
            this.skinName = "skins.consecrate.ConsecrateIconSkin";
        }

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.Consecrate).retProxy(ProxyType.Consecrate);

            //已遗弃，这种方式销毁时需要自己去移除侦听
            // this.btn_reward.addEventListener(TouchEvent.TOUCH_TAP, this.onClickReward, this);
            // this.btn_add.addEventListener(TouchEvent.TOUCH_TAP, this.onClickAdd, this);
            // this.icon.addEventListener(TouchEvent.TOUCH_TAP, this.onClickIcon, this);

            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_reward, this.onClickReward, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_add, this.onClickAdd, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.icon, this.onClickIcon, this);

        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                this.icon.defaultIcon();
                this.removeEft();
                this.setStatus(ConsecrateState.Null);
                this.redPoint.visible = this._proxy.checkIsUse();
                return;
            }
            this.setStatus(data.state);
            this.redPoint.visible = data.state == ConsecrateState.Reward;
            // if (!data.state || data.state == ConsecrateState.Reward) {
            //     return;
            // }

            if (!data.state) {
                return;
            }
            if (data.prop_id) {
                let iconShowType = data.state != ConsecrateState.Fengyin ? IconShowType.NotTips : IconShowType.Reward;
                this.icon.setData(data.prop_id, iconShowType);
                this.icon.updateQualityImg("");
                if (data.state == ConsecrateState.Reward) {
                    this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addColor("可领取", "#4DFD28"));
                    this.group_eft.removeChildren();
                    this.addEftByParent(UIEftSrc.WanChengGongFeng, this.group_eft);
                } else {
                    this.lab_name.textFlow = this.icon.getPropName(false);
                }
            }
        }

        /**设置数据data，单个icon时候调用*/
        public setData(data: consecrate_infos): void {
            this.data = data;
        }

        private onClickReward(): void {
            this._proxy.c2s_consecrate_get(1, this.data.pos);
        }

        private onClickAdd(): void {
            let list = this._proxy.getPropList();
            if (!list || !list.length) {
                ViewMgr.getIns().showGainWaysTips(PropIndex.MoHun);
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Consecrate, ConsecrateViewType.ConsecrateShelf);
        }

        //外部指引调用
        public onClick(): void {
            if (!this.data) {
                this.onClickAdd();
                return;
            }
            if (this.data.state == ConsecrateState.Reward) {
                this.onClickReward();
                return;
            }
        }

        private onClickIcon(): void {
            if (this.data.state == ConsecrateState.WaitingFengyin) {
                this._proxy.c2s_consecrate_get_back(this.data.pos);
                return;
            }
        }

        private setStatus(status: number): void {
            switch (status) {
                case ConsecrateState.Fengyin:
                    this.btn_add.visible = false;
                    this.btn_reward.visible = false;
                    this.icon.visible = true;
                    this.grp_tips.visible = true;
                    this.grp_name.visible = true;
                    this.redPoint.visible = false;
                    break;
                case ConsecrateState.WaitingFengyin:
                    this.btn_add.visible = false;
                    this.btn_reward.visible = false;
                    this.icon.visible = true;
                    this.grp_tips.visible = false;
                    this.grp_name.visible = true;
                    this.redPoint.visible = false;
                    break;
                case ConsecrateState.Reward:
                    this.btn_add.visible = false;
                    this.btn_reward.visible = true;
                    this.icon.visible = false;
                    this.grp_tips.visible = false;
                    this.grp_name.visible = true;
                    this.redPoint.visible = false;
                    break;
                default:
                    this.btn_add.visible = true;
                    this.btn_reward.visible = false;
                    this.icon.visible = false;
                    this.grp_tips.visible = false;
                    this.grp_name.visible = false;
                    this.redPoint.visible = false;
                    break
            }
        }
    }

}