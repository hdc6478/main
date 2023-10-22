namespace game.mod.union {

    import TouchEvent = egret.TouchEvent;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;
    import shengtai_data = msg.shengtai_data;
    import ShengtanItemConfig = game.config.ShengtanItemConfig;
    import GuiidRandomConfig = game.config.GuiidRandomConfig;

    export class UnionShengLotteryMdr extends MdrBase {
        private _view: UnionShengLotteryView = this.mark("_view", UnionShengLotteryView);
        private _proxy: UnionProxy;

        /**奖励数量 */
        private readonly count: number = 8;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.img_bg.source = ResUtil.getUiJpg("bg_xianmenshengtan");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_one, TouchEvent.TOUCH_TAP, this.onOne, this);
            addEventListener(this._view.btn_ten, TouchEvent.TOUCH_TAP, this.onTen, this);
            addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onExplain, this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClickTips, this);
            addEventListener(this._view.cost_one, TouchEvent.TOUCH_TAP, this.onClickTips, this);
            addEventListener(this._view.cost_ten, TouchEvent.TOUCH_TAP, this.onClickTips, this);
            addEventListener(this._view.btn_look, TouchEvent.TOUCH_TAP, this.onMoreReward, this);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onPreviewReward, this);

            this.onNt(UnionEvent.ON_UPDATE_RUN_MESSAGE_INFO, this.onOpenTween, this);
            this.onNt(UnionEvent.ON_UPDATE_SHENG_LOTTERY_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_shengtan_ui();
            super.onShow();

        }

        // private onInitView(): void {
        //     this._view.btn_ten.label = this._view.btn_one.label = "";
        //     this._view.btn_one.setImage("xuyuanyici");
        //     this._view.btn_ten.setImage("xuyuanshici");
        //     this._view.btn_ten.img_bg.source = "daanniu_lvse";
        //     this._view.btn_ten.img_bg.height = this._view.btn_ten.height;
        //     this._view.btn_ten.img_bg.width = this._view.btn_ten.width;
        // }

        private onUpdateView(): void {
            let sheng_cost: number[] = this._proxy.sheng_cost;
            let costIndex: number = sheng_cost[0];
            let num: number = BagUtil.getPropCntByIdx(costIndex);
            this._view.cost_one.initIcon(costIndex, false);
            this._view.cost_ten.initIcon(costIndex, false);

            let cost: number = sheng_cost[1];
            this._view.cost_one.lab_cost.text = `${num}/${cost}`;
            this._view.cost_one.lab_cost.textColor = num >= cost ? BlackColor.GREEN : BlackColor.RED;
            this._view.btn_one.setHint(num >= cost);

            let cost_ten: number = cost * 9;
            this._view.cost_ten.lab_cost.text = `${num}/${cost_ten}`;
            this._view.cost_ten.lab_cost.textColor = num >= cost_ten ? BlackColor.GREEN : BlackColor.RED;
            this._view.btn_ten.setHint(num >= cost_ten);

            let cfgArr: ShengtanItemConfig[] = this._proxy.getShengFixReward();
            let index: number = 0;
            for (let i = 0; i < this.count; i++) {
                let pos: number = i + 1;
                let icon: UnionShengLotteryItem = this._view[`icon_${pos}`];
                let cfg = cfgArr[i];
                if (cfg) {
                    icon.visible = true;
                    icon.setData(cfg);
                    continue;
                }
                let info = this._proxy.getShengInfo(index++);
                if (info) {
                    icon.visible = true;
                    icon.setData(info);
                    continue;
                }
                icon.visible = false;
            }

            let param: ParamConfig = getConfigByNameId(ConfigName.Param, "guild_shengtan_max");
            let val: number = this._proxy.model.shengtan_info && this._proxy.model.shengtan_info.value || 0;
            this._view.progress.show(val, param.value);

            let count: number = this._proxy.getShengCount();
            this._view.reward.setData(count);

            if (this._proxy.model.list_sheng_run) {
                this.onTween(this._proxy.model.list_sheng_run);
            }
        }

        /**走马灯 */
        private onOpenTween(n: GameNT): void {
            let list: shengtai_data[] = n.body;
            this.onTween(list);
        }

        private onTween(list: shengtai_data[]): void {
            if (!list || !list.length) {
                return;
            }
            let info = list.shift();
            let item = new UnionHorseLampItem();
            let cfg: ShengtanItemConfig = getConfigByNameId(ConfigName.ShengtanItem, info.index);
            let prop = getConfigById(cfg.reward[0]);
            let tips: string = getLanById(LanDef.xianzong_tips6);
            let str = StringUtil.substitute(tips, [
                TextUtil.addColor(info.name, "0xb14725"),
                TextUtil.addColor(prop.name, "0x238e2c")
            ]);
            item.setData(str);
            item.x = this._view.grp.width;
            let y = Math.floor(Math.random() * this._view.grp.height - 40);
            item.y = y < 0 ? 0 : y;
            this._view.grp.addChild(item);
            let delay: number = Math.floor(Math.random() * 1000 + 500);
            let speed: number = Math.floor(Math.random() * 2000 + 3000);
            Tween.get(item).delay(delay)
                .exec(Handler.alloc(this, this.onTween, [list]))
                .to({ x: -1 * item.width }, speed)
                .exec(Handler.alloc(this, this.onClearItem, [item]));
        }

        private onClearItem(item: UnionHorseLampItem): void {
            Tween.remove(item);
            this._view.grp.removeChild(item);
            item = null;
        }

        private onTen(): void {
            if (!BagUtil.checkPropCnt(this._proxy.sheng_cost[0], this._proxy.sheng_cost[1] * 9, PropLackType.Dialog)) {
                return
            }
            this._proxy.c2s_guild_draw(UnionLottery.SHENG, UnionLotteryCount.TEN);
        }

        private onOne(): void {
            if (!BagUtil.checkPropCnt(this._proxy.sheng_cost[0], this._proxy.sheng_cost[1], PropLackType.Dialog)) {
                return
            }
            this._proxy.c2s_guild_draw(UnionLottery.SHENG, UnionLotteryCount.ONE);
        }


        private onClickTips(): void {
            ViewMgr.getIns().showGainWaysTips(this._proxy.sheng_cost[0]);
        }

        /**提示说明 */
        private onExplain(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.zhanlizhuanpantips2))
        }

        private onMoreReward(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionLotteryReward);
        }

        private onPreviewReward(): void {
            // ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionPreview);
            let cfgArr: GuiidRandomConfig[] = getConfigListByName(ConfigName.GuiidRandom);
            let list: BasePreviewRewardData[] = [];
            for (let cfg of cfgArr) {
                list.push({
                    weight: cfg.weight,
                    award: cfg.award,
                    nameStr: "rolering_reward_type" + cfg.index
                });
            }
            ViewMgr.getIns().openPreviewReward(list);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}