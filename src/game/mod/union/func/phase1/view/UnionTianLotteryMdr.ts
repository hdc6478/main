namespace game.mod.union {

    import TouchEvent = egret.TouchEvent;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import GuildDrawConfig = game.config.GuildDrawConfig;
    import ArrayCollection = eui.ArrayCollection;
    import ParamConfig = game.config.ParamConfig;

    export class UnionTianLotteryMdr extends MdrBase {
        private _view: UnionTianLotteryView = this.mark("_view", UnionTianLotteryView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        /**光圈可跳icon坐标和id */
        private posArr: UnionTianPos[] = [];

        /**缓动延迟 */
        private readonly _delay: number = 100;
        /**动画圈数 */
        private readonly round: number = 1;
        /**动画当前位置索引 */
        private current: number = 0;
        /**正在抽奖 */
        private isTween: boolean = false;
        /**最后一个抽中的index */
        private last_index: number;
        /**抽中的所有index 去重 用于抽奖动画结束展示特效的索引 */
        private idxs: number[];
        /**抽中的所有index 不去重 用于弹出奖励的 */
        private indexs: number[];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_one, TouchEvent.TOUCH_TAP, this.onOne, this);
            addEventListener(this._view.btn_ten, TouchEvent.TOUCH_TAP, this.onTen, this);
            addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onExplain, this);
            addEventListener(this._view.btn_next, TouchEvent.TOUCH_TAP, this.onNext, this);
            addEventListener(this._view.btn_tips, TouchEvent.TOUCH_TAP, this.onClickTips, this);

            //先播放动画再更新界面
            this.onNt(UnionEvent.ON_TWEEN_TIAN_LOTTERY_START, this.onOpenTween, this);
            this.onNt(UnionEvent.ON_UPDATE_TIAN_LOTTERY_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_draw_open();
            super.onShow();

            this.isTween = false;
        }

        private onInitView(): void {
            this._view.btn_ten.label = this._view.btn_one.label = "";
            this._view.btn_one.setImage("xuyuanyici");
            this._view.btn_ten.setImage("xuyuanshici");
            this._view.btn_ten.img_bg.source = "daanniu_lvse";
            this._view.btn_ten.img_bg.height = this._view.btn_ten.height;
            this._view.btn_ten.img_bg.width = this._view.btn_ten.width;
        }

        private onUpdateView(): void {
            let tian_cost: number[] = this._proxy.tian_cost;
            let num: number = BagUtil.getPropCntByIdx(tian_cost[0]);
            this._view.cost_one.initIcon(tian_cost[0]);
            this._view.cost_ten.initIcon(tian_cost[0]);

            let cost: number = tian_cost[1];
            this._view.cost_one.lab_cost.text = `${num}/${cost}`;
            this._view.cost_one.lab_cost.textColor = num >= cost ? 0x4dfd28 : BlackColor.RED;
            this._view.cost_one.lab_cost.stroke = 1;
            this._view.btn_one.setHint(num >= cost);

            let cost_ten: number = cost * 9;
            this._view.cost_ten.lab_cost.text = `${num}/${cost_ten}`;
            this._view.cost_ten.lab_cost.textColor = num >= cost_ten ? 0x4dfd28 : BlackColor.RED;
            this._view.cost_ten.lab_cost.stroke = 1;
            this._view.btn_ten.setHint(num >= cost_ten);

            if (this.posArr) {
                this.posArr.length = 0;
            }
            let round: number = this._proxy.model.info_tian.stage;
            let cfgMap = getConfigByNameId(ConfigName.GuildDraw, round);
            // let list: number[][] = [];
            for (let k in cfgMap) {
                let cfg: GuildDrawConfig = cfgMap[k];
                // if (cfg.max_reward == 1) {
                //     list.push(cfg.reward);
                // }
                let eff: boolean = this.idxs && this.idxs.indexOf(cfg.index) > -1;
                let count: number = this._proxy.getTianCount(cfg.index);
                let icon: UnionLotteryItem = this._view[`icon_${cfg.index}`];
                icon.setData({ cfg, eff, count });
                if (cfg.num !== count) {
                    this.posArr.push({ index: cfg.index, x: icon.x, y: icon.y });
                }
            }
            let param: ParamConfig = GameConfig.getParamConfigById("guild_dajiang_show");
            this._listData.source = param.value;
            if (this.idxs) {
                this.idxs.length = 0;
            }

            this._view.currentState = this._proxy.isReset ? "next" : "common";
        }

        private onOpenTween(n: GameNT): void {
            let indexs: number[] = n.body;
            this.indexs = indexs;

            //选中跳过动画
            if (this._view.checkbox.selected) {
                this.onTweenOver();
                return;
            }

            this.idxs = indexs.filter((item, index) => indexs.indexOf(item) === index);
            this.last_index = indexs[indexs.length - 1];

            this.current = 0;
            this.onTween();
        }

        private onTween(): void {
            let len: number = this.posArr.length;
            let pos = this.posArr[this.current % len];
            let img = this._view.img_sel;
            if (!img.visible) {
                img.visible = true;
            }
            img.x = pos.x - 8;
            img.y = pos.y - 8;
            if (this.current / len > this.round && pos.index == this.last_index) {//结束
                this.onTweenOver();
                return;
            }
            this.current++;
            Tween.get(this).delay(this._delay).exec(Handler.alloc(this, this.onTween));
        }

        private onTweenOver(): void {
            Tween.remove(this);
            this.isTween = false;

            this.onUpdateView();

            //弹出奖励
            this.onPopupReward();
        }

        private onPopupReward(): void {
            let round: number = this._proxy.model.info_tian.stage;
            let cfgMap = getConfigByNameId(ConfigName.GuildDraw, round);
            let map: { [key: number]: GuildDrawConfig } = {};
            let list: number[][] = [];
            for (let index of this.indexs) {
                if (!map[index]) {
                    map[index] = cfgMap[index];
                }
                list.push(map[index].reward);
            }
            if (!list) {
                console.error("检查协议或配置");
                return;
            }
            let props: msg.prop_tips_data[] = [];
            for (let prop of list) {
                props.push({ idx: Long.fromInt(prop[0]), cnt: prop[1], param1: null, param2: null, quality: null });
            }
            PropTipsMgr.getIns().showBestPropCenter(props);
            if (this.indexs) {
                this.indexs.length = 0;
            }
        }

        private onCheckTween(): boolean {
            if (this.isTween) {
                PromptBox.getIns().show(getLanById(LanDef.zhengzaichoujiang));
                return true;
            } else {
                this.isTween = true;
                return false;
            }
        }

        private onNext(): void {
            this._proxy.c2s_guild_draw_reset();
        }

        private onTen(): void {
            if (!BagUtil.checkPropCnt(this._proxy.tian_cost[0], this._proxy.tian_cost[1] * 9, PropLackType.Dialog)) {
                return
            }
            if (!this.onCheckTween()) {
                this._proxy.c2s_guild_draw(UnionLottery.TIAN, UnionLotteryCount.TEN);
            }
        }

        private onOne(): void {
            if (!BagUtil.checkPropCnt(this._proxy.tian_cost[0], this._proxy.tian_cost[1], PropLackType.Dialog)) {
                return
            }
            if (!this.onCheckTween()) {
                this._proxy.c2s_guild_draw(UnionLottery.TIAN, UnionLotteryCount.ONE);
            }
        }

        /**提示说明 */
        private onExplain(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.zhanlizhuanpantips1))
        }

        private onClickTips(): void {
            ViewMgr.getIns().showGainWaysTips(this._proxy.tian_cost[0]);
        }

        protected onHide(): void {
            Tween.remove(this);
            this.isTween = false;
            super.onHide();
        }
    }
}