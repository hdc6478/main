namespace game.mod.xianyuan {

    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;
    import friend_info = msg.friend_info;

    export class XianlvInviteAddView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public lb_desc: eui.Label;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.XianlvInviteAddSkin";
        }
    }

    export class XianlvInviteAddItem extends BaseListenerRenderer {
        public headVip: game.mod.HeadVip;
        public lb_name: eui.Label;
        public powerLabel: game.mod.PowerLabel;
        public lb_zongmen: eui.Label;
        public lb_goodmanval: eui.Label;
        public lb_online: eui.Label;
        public btn_force: game.mod.Btn;
        public btn_invite: game.mod.Btn;
        public img_online: eui.Image;

        data: friend_info;
        private _proxy: XianlvProxy;

        constructor() {
            super();
            this.skinName = `skins.xianyuan.XianlvInviteAddItemSkin`;
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Xianyuan, ProxyType.Xianlv);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_force, this.onClickForce, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_invite, this.onClickInvite, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lb_name.text = data.name;
            this.lb_zongmen.text = data.guild_name;
            this.powerLabel.setPowerValue(data.showpower, WhiteColor.DEFAULT2);
            this.lb_goodmanval.text = (data.friendship || 0) + '';
            this.headVip.updateShow(data.head, data.head_frame, data.sex, data.vip_lv, data.role_id);

            let online = data.is_online;
            this.img_online.source = online ? 'zaixian_lv' : 'zaixian_hui';
            this.lb_online.text = online ? getLanById(LanDef.guild_online) : getLanById(LanDef.guild_offline);
        }

        private onClickForce(): void {
            let cost: number[] = this._proxy.getForceMarryCost();
            let propCfg = GameConfig.getPropConfigById(cost[0]);
            if (!propCfg) {
                return;
            }
            let costStr = TextUtil.addColor(propCfg.name + 'x' + cost[1], BlackColor.YELLOW);
            let bagCnt = BagUtil.getPropCntByIdx(cost[0]);
            let leftCnt = TextUtil.addColor(bagCnt + '', bagCnt > 0 ? BlackColor.GREEN : BlackColor.RED);
            let txt = StringUtil.substitute(getLanById(LanDef.xianlv_tips8), [costStr, leftCnt]);
            ViewMgr.getIns().showConfirm(txt, Handler.alloc(this, () => {
                if (!BagUtil.checkPropCntUp(cost[0], cost[1])) {
                    return;
                }
                this._proxy.c2s_xianlv_propose(this.data.role_id, 1, this.data.server_id);
            }));
        }

        private onClickInvite(): void {
            ViewMgr.getIns().showConfirm(getLanById(LanDef.xianlv_tips9), Handler.alloc(this, () => {
                this._proxy.c2s_xianlv_propose(this.data.role_id, 2, this.data.server_id);
            }));
        }
    }
}