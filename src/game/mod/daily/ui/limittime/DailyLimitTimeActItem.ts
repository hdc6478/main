namespace game.mod.daily {

    export class DailyLimitTimeActItem extends BaseRenderer {
        public img_bg: eui.Image;
        public list_reward: eui.List;
        public lb_time: eui.Label;
        public lb_desc: eui.Label;
        public btn_desc: game.mod.Btn;
        public btn_go: game.mod.Btn;
        public img_end: eui.Image;
        public img_doing: eui.Image;

        public data: IDailyLimitActData;
        private _listData: eui.ArrayCollection;
        private _proxy: DailyLimitTimeActProxy;

        constructor() {
            super();
            this.skinName = `skins.daily.DailyLimitTimeActItemSkin`;
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Daily, ProxyType.DailyLimitTime);
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_desc, this.onClickDesc, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_go, this.onClickGo, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data || !data.cfg) {
                return;
            }
            let cfg = data.cfg;
            this._listData.replaceAll(cfg.reward);
            this.img_bg.source = ResUtil.getUiPng(cfg.banner);

            let isOpening = data.state == DailyLimitTimeState.Opening;
            this.img_doing.visible = isOpening;
            this.removeEft();
            if(isOpening){
                this.addEftByParent(UIEftSrc.Btn, this.btn_go.group_eft);
            }

            this.img_end.visible = data.state == DailyLimitTimeState.End;
            this.btn_go.visible = !this.img_end.visible;
            this.btn_go.setHint(data.showHint);

            let isOpen = ViewMgr.getIns().checkViewOpen(cfg.open_id);
            if (cfg.open_id && !isOpen) {
                let txt = ViewMgr.getIns().getOpenFuncShow(cfg.open_id);
                if (cfg.act_type == 1) {
                    txt += ` （已达${RoleVo.ins.level}级）`;
                } else if (cfg.act_type == 2) {
                    txt += ` （已达${RoleUtil.getRebirthStr()}）`;
                }
                this.lb_time.textFlow = TextUtil.parseHtml(TextUtil.addColor(txt, WhiteColor.RED));
                this.lb_desc.visible = false;
                return;
            }

            let timeStr = '';
            let act_time = cfg.act_time;
            for (let i = 0; i < act_time.length; i += 2) {
                let txt = `${this.getTimeStr(act_time[i][0])}:${this.getTimeStr(act_time[i][1])}-${this.getTimeStr(act_time[i + 1][0])}:${this.getTimeStr(act_time[i + 1][1])}`;
                timeStr += txt + '  ';
            }
            this.lb_time.visible = this.lb_desc.visible = true;
            this.lb_time.textFlow = TextUtil.parseHtml(TextUtil.addColor(`活动时间:${TextUtil.addColor(timeStr, WhiteColor.GREEN)}`, data.state == DailyLimitTimeState.Opening ? WhiteColor.GREEN : WhiteColor.DEFAULT));
            this.lb_desc.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.desc, data.state == DailyLimitTimeState.Opening ? WhiteColor.GREEN : WhiteColor.DEFAULT));
        }

        private getTimeStr(time: number): string {
            return time < 10 ? '0' + time : time + '';
        }

        private onClickDesc(): void {
            ViewMgr.getIns().showRuleTips(this.data.cfg.desc1);
        }

        private onClickGo(): void {
            let cfg = this.data.cfg;
            if (!cfg || !ViewMgr.getIns().checkViewOpen(cfg.open_id, true)) {
                return;
            }
            this._proxy.setClickHint(cfg.index);
            ViewMgr.getIns().showViewByID(cfg.jump_id);
        }
    }
}