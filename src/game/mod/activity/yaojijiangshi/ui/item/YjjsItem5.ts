namespace game.mod.activity {

    import TotalCumulativeConfig = game.config.TotalCumulativeConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class YjjsItem5 extends BaseListenerRenderer {
        public lb_desc: eui.Label;
        public list: eui.List;
        public img_done: eui.Image;
        public btn_do: game.mod.Btn;

        data: TotalCumulativeConfig;
        private _proxy: YjjsProxy;
        private _listData: eui.ArrayCollection;

        constructor() {
            super();
            this.skinName = `skins.activity.YjjsItemSkin5`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Yjjs);
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let cfg = this.data;
            if (!cfg) {
                return;
            }

            this._listData.replaceAll(cfg.cumulative_reward.concat());
            let charge_cnt = RoleVo.ins.charge_rmb || 0;
            let finish = charge_cnt >= cfg.main_index;//是否达成
            let desc = StringUtil.substitute(getLanById(LanDef.vip_welfare_tips1),[cfg.main_index]) +
                TextUtil.addColor(`(${charge_cnt}/${cfg.main_index})`, finish ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_desc.textFlow = TextUtil.parseHtml(desc);

            let info = this._proxy.getChargeInfo(cfg.index);
            let state = info ? info.state : 0;
            if (state == 2) {
                this.btn_do.visible = false;
                this.img_done.visible = true;
            } else {
                this.btn_do.label = state == 1 ? getLanById(LanDef.lingqu) : getLanById(LanDef.exp_pool15);
                if (state == 1) {
                    this.btn_do.setYellow();
                } else {
                    this.btn_do.setBlue();
                }
                this.btn_do.visible = true;
                this.img_done.visible = false;
                this.btn_do.setHint(state == 1);
            }
        }

        private onClick(): void {
            let info = this._proxy.getChargeInfo(this.data.index);
            if (info && info.state == 1) {
                this._proxy.c2s_yaoji_receive_reward(4, this.data.index);
                return;
            }
            ViewMgr.getIns().openCommonRechargeView();
        }
    }
}