namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class XiandiMdr extends EffectMdrBase implements base.UpdateItem {
        private _view: XiandiView = this.mark("_view", XiandiView);

        private _proxy: XiandiProxy;
        private _endTime: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xiandi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_add, egret.TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.btn, egret.TouchEvent.TOUCH_TAP, this.onClickFight);
            addEventListener(this._view.btn_rank, egret.TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_explain, egret.TouchEvent.TOUCH_TAP, this.onClickExplain);

            this.onNt(HuangguEvent.ON_UPDATE_XIANDI_RANK, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_xiandi_zhengba_oper(2, XiandiRankType.Person);
            super.onShow();
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            this._endTime = TimeUtil.getNextDayTime(base.TimeMgr.time.serverTimeSecond, false, 1);
            base.TimeMgr.addUpdateItem(this, 1000);
            this.update(base.TimeMgr.time);
        }

        private onUpdateView(): void {
            for (let i = 0; i < 3; i++) {
                let info = this._proxy.geren_ranks && this._proxy.geren_ranks[i];
                let item: XiandiItem = this._view[`item${i + 1}`];
                item.setData(info, i + 1);
            }

            let free_times: number = this._proxy.free_times;
            let tiandi_zhengba_tiaozhan_mianfei: number = this._proxy.tiandi_zhengba_tiaozhan_mianfei;
            let color = !free_times ? BlackColor.RED : BlackColor.GREEN;
            this._view.lab_count.textFlow = TextUtil.parseHtml(`次数:${TextUtil.addColor(`${free_times}/${tiandi_zhengba_tiaozhan_mianfei}`, color)}`);

            let info = this._proxy.getRankInfo(XiandiRankType.Person);
            this._view.lab_rank.text = `${info && info.rank_num || getLanById(LanDef.compete_mars_16)}`;

            this._view.lab_score.text = `${info.value}`;
        }

        update(time: base.Time): void {
            let leftTime: number = this._endTime - time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

        protected onHide(): void {
            base.TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickAdd(): void {
            let cost: number[] = this._proxy.tiandi_zhengba_tiaozhan_xiaohao;
            let tiandi_zhengba_tiaozhan_mianfei: number = this._proxy.tiandi_zhengba_tiaozhan_mianfei;
            let free_times: number = this._proxy.free_times;
            if (free_times < tiandi_zhengba_tiaozhan_mianfei) {
                ViewMgr.getIns().showGainWaysTips(cost[0]);
            }
        }

        private onClickFight(): void {
            let free_times: number = this._proxy.free_times;
            if (!free_times) {
                let cost: number[] = this._proxy.tiandi_zhengba_tiaozhan_xiaohao;
                if (!BagUtil.checkPropCnt(cost[0], cost[1], PropLackType.Dialog)) {
                    return;
                }
                let prop: PropData = PropData.create(cost[0]);
                let content: string = StringUtil.substitute(getLanById(LanDef.xiandi_tips19), [`${prop.cfg.name}X${cost[1]}`]);
                // let content: string = "";
                ViewMgr.getIns().showConfirm(content, base.Handler.alloc(this, () => {
                    this._proxy.c2s_xiandi_zhengba_oper(6);
                }))
                return;
            }
            this._proxy.c2s_xiandi_zhengba_oper(6);
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XiandiRank);
        }

        private onClickExplain(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xiandi_tips10));
        }

    }
}