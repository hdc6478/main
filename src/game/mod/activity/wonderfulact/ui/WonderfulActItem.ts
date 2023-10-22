namespace game.mod.activity {

    import act_reward = msg.act_reward;
    import LanDef = game.localization.LanDef;

    export class WonderfulActItem4 extends BaseListenerRenderer {
        public lb_desc: eui.Label;
        public list: eui.List;
        public img_bought: eui.Image;
        public btn_do: game.mod.Btn;

        data: IWonderfulActItemData;
        protected _listData: eui.ArrayCollection;
        protected _proxy: WonderfulActProxy;

        constructor() {
            super();
            this.skinName = `skins.activity.WonderfulActItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.WonderfulAct);
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this._listData.removeAll();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this._listData.replaceAll(data.info.rewards.concat());

            this.img_bought.visible = data.status == 2;
            this.btn_do.visible = !this.img_bought.visible;

            if (data.status == 1) {
                this.btn_do.setYellow();
            } else {
                this.btn_do.setBlue();
            }
            this.btn_do.visible && this.btn_do.setHint(data.status == 1);

            this.updateItemView();
        }

        protected updateItemView(): void {
            let data = this.data;
            this.btn_do.label = data.status == 1 ? getLanById(LanDef.tishi_29) : getLanById(LanDef.exp_pool15);
            let desc = data.info.desc || '';
            let cnt = 0;
            if (this.data.type == ActivityType.Leijicharge) {
                cnt = data.info.cond_1[0];
            } else if (this.data.type == ActivityType.Lianxucharge) {
                cnt = data.info.cond_2[0];
            }
            desc += TextUtil.addColor(`(${Math.min(data.val, cnt)}/${cnt})`, data.val >= cnt ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_desc.textFlow = TextUtil.parseHtml(desc);
        }

        protected onClick(): void {
            if (this.data.status == 1) {
                if (this.data.type == ActivityType.Leijicharge) {
                    this._proxy.c2s_jingcai_addcharge_get_rewards(this.data.info.index);
                } else if (this.data.type == ActivityType.Lianxucharge) {
                    this._proxy.c2s_jingcai_keepcharge_get_rewards(this.data.info.index);
                }
            } else {
                ViewMgr.getIns().openCommonRechargeView();
            }
        }
    }

    export class WonderfulActItem5 extends WonderfulActItem4 {
        protected dataChanged() {
            super.dataChanged();
        }

        protected updateItemView() {
            let data = this.data;
            let btnLab = getLanById(LanDef.tishi_29);
            let index = data.info.index;
            if (data.status != 1) {
                btnLab = index == 2 ? getLanById(LanDef.equip_Rresolve_tips4) : getLanById(LanDef.exp_pool15);
            }
            this.btn_do.label = btnLab;

            let cnt = data.val;
            let val = data.info.cond_1[0];
            let desc = data.info.desc;
            //index为1是每日登陆
            if (index != 1) {
                desc += TextUtil.addColor(`(${Math.min(cnt, val)}/${val})`, cnt >= val ? WhiteColor.GREEN : WhiteColor.RED);
            }
            this.lb_desc.textFlow = TextUtil.parseHtml(desc);
        }

        protected onClick() {
            if (this.data.status == 1) {
                this._proxy.c2s_jingcai_login_get_rewards(this.data.info.index);
                return;
            }
            let subType = this.data.info.index;
            if (subType == 2) {
                ViewMgr.getIns().openVipView();
            } else {
                ViewMgr.getIns().openCommonRechargeView();
            }
        }
    }

    export interface IWonderfulActItemData {
        type: ActivityType;//2连续充值，3累计豪礼，4登陆奖励
        info: act_reward;//item信息
        val: number;//当前值
        status: number;//1可领取，0不可领取，2已领取
    }
}