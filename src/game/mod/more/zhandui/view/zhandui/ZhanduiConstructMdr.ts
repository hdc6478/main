namespace game.mod.more {

    import ZhanduiDengjiConfig = game.config.ZhanduiDengjiConfig;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;

    export class ZhanduiConstructMdr extends MdrBase implements UpdateItem {
        private _view: ZhanduiConstructView = this.mark("_view", ZhanduiConstructView);
        private _proxy: ZhanduiProxy;
        private _listReward: eui.ArrayCollection;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhandui);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listReward = new eui.ArrayCollection();
            this._view.list.itemRenderer = ZhanduiConstructItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.scroller['hasScissor'] = true;
            this._view.img_got1.visible=false;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, egret.TouchEvent.TOUCH_TAP, this.onClickGet, this);
            addEventListener(this._view.btn_go, egret.TouchEvent.TOUCH_TAP, this.onClickGo, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_BASE_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        //开始收益时间处理
        private updateExpTime(): void {
            let createTime = this._proxy.join_time;
            if (!createTime) {
                TimeMgr.removeUpdateItem(this);
                this._view.btn_go.visible = true;
                this._view.lb_desc.visible = false;
                return;
            }
            let nextDayTime = TimeUtil.getNextDayTime(createTime, false, 1);
            let curTime = TimeMgr.time.serverTimeSecond;
            if (curTime < nextDayTime) {
                let leftTime = nextDayTime - curTime;
                let hours = Math.floor(leftTime / Second.Hour);
                let mins = Math.floor((leftTime - hours * Second.Hour) / Second.Minute);
                let timeStr = hours + getLanById(LanDef.shijian_2) + mins + getLanById(LanDef.shijian_3);//x时x分
                if (hours == 0 && mins == 0) {
                    timeStr = leftTime + getLanById(LanDef.shijian_4);//xx秒
                }
                let str = StringUtil.substitute(getLanById(LanDef.zhandui_tips32), [TextUtil.addColor(timeStr, BlackColor.GREEN)]);
                this._view.lb_desc.textFlow = TextUtil.parseHtml(str);
                this._view.lb_desc.visible = true;
                TimeMgr.addUpdateItem(this, 1000);
            } else {
                this._view.lb_desc.visible = false;
                TimeMgr.removeUpdateItem(this);
            }

            this._view.btn_go.visible = !this._view.lb_desc.visible;
        }

        update(time: base.Time) {
            this.updateExpTime();
        }

        private updateView(): void {
            this.updateExpTime();

            this._view.img_flag.source = ResUtil.getZhanduiFlag(this._proxy.flag_index);
            this._view.lb_lv.text = this._proxy.team_level + getLanById(LanDef.lv);

            let lv = this._proxy.team_level;
            let cfg = this._proxy.getLevelCfg(!this._proxy.isMaxLv() ? lv + 1 : lv);
            let maxExp = cfg && cfg.point || 0;
            let curExp = this._proxy.team_point;
            this._view.bar.show(curExp, maxExp, false, 0, true, ProgressBarType.Value);

            //判断显示已满级
            if (this._proxy.isMaxLv()){
                //显示已满级标签
                this._view.img_got1.visible=true;
                //按钮和文本都不显示
                this._view.lb_desc.visible=false;
                this._view.btn_go.visible=false;
            }

            let list: IZhanduiConstructItemData[] = [];
            let cfgs: ZhanduiDengjiConfig[] = getConfigListByName(ConfigName.ZhanduiDengji);
            for (let i = 0; i < cfgs.length; i++) {
                let cfg = cfgs[i];
                let cfgBefore = cfgs[i - 1];
                let cfgNext = cfgs[i + 1];
                let val = curExp == 0 && i == 0 ? cfg.point + 1 : curExp;//当前值 (1级时候进度条需要满，这里直接设置+1)
                //上个配置的值
                let start = cfgBefore && Math.floor((cfg.point - cfgBefore.point) / 2) + (cfgBefore && cfgBefore.point) || 0;
                //下一个目标值
                let target = cfg.point;
                //进度条结束值(下个目标值的一半）
                let next = cfgNext && Math.floor((cfgNext.point - cfg.point) / 2) + cfg.point || 0;
                let barData: VProgressData = {
                    val: val,
                    start: start,
                    target: target,
                    next: next
                };
                list.push({cfg: cfgs[i], vBarData: barData});
            }
            this._listData.replaceAll(list);

            this.updateReward();
        }

        private updateReward(): void {
            let lv = this._proxy.team_level;
            let cfg = this._proxy.getLevelCfg(lv);
            this._listReward.replaceAll(cfg && cfg.day_rewards || []);
            let isGot = this._proxy.isGotReward();
            this._view.img_got.visible = isGot;
            this._view.btn_get.visible = !isGot;
            if (!isGot) {
                this._view.btn_get.setHint(this._proxy.canGetReward());
            }
        }

        private onClickGet(): void {
            if (this._proxy.canGetReward()) {
                this._proxy.c2s_zhandui_get_day_rewards();
            } else {
                PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.lingqi_tips10), ['']));
            }
        }

        private onClickGo(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.Daily);
        }
    }
}