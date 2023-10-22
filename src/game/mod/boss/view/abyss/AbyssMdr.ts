namespace game.mod.boss {

    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class AbyssMdr extends EffectMdrBase implements UpdateItem {
        private _view: AbyssView = this.mark("_view", AbyssView);
        private _proxy: BossProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        private _endTime: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);

            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickFight);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickPreview);

            this.onNt(BossEvent.ON_ABYSS_MAIN_UPDATE, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_zhuimo_open_ui();
            super.onShow();
            this.endTime = this._proxy.openTime;
            this.update(TimeMgr.time);
            TimeMgr.addUpdateItem(this, 1000);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(getLanById(LanDef.zhuimoshenyuan_tips4));
        }

        private onUpdateView(): void {
            let strs: string[] = this._proxy.reward_name_list;
            this._view.lab_name.text = strs && strs.length ? strs.join("\n") : getLanById(LanDef.tishi_2);

            let list = this._proxy.zhuimo_jiangli.filter((v, i) => {
                return i < 10;
            });
            this._listData.replaceAll(list);

            this._view.icon.setData(this._proxy.zhuimo_dajiang);
            this._view.costIcon.updateShow(this._proxy.zhuimo_cost);
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }

        private onClickFight(): void {
            this._proxy.c2s_zhuimo_boss_challenge();
        }

        private onClickAdd(): void {
            ViewMgr.getIns().showGainWaysTips(this._proxy.zhuimo_cost[0]);
        }

        private onClickPreview(): void {
            ViewMgr.getIns().bossReward(this._proxy.preview_id, ["组队模式共享尾刀奖励", "击败BOSS有几率触发roll点获取坠魔宝匣"]);
        }

        update(time: base.Time): void {
            if (!this._endTime) {
                this.endTime = this._proxy.openTime;
                if (!this._endTime) {
                    return;
                }
            }
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this.endTime = this._proxy.openTime;
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }

        private set endTime(v: number) {
            if (this._endTime == v) {
                return;
            }
            let bool: boolean = !v;
            this._view.btn_challenge.visible = bool;
            if (bool) {
                this._view.btn_challenge.setHint(HintMgr.getHint([ModName.Boss, BossViewType.BossMain + BossMainBtnType.Abyss]));
            }
            this._view.timeItem.visible = !bool;
            this._endTime = v;
        }

    }
}