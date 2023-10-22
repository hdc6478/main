namespace game.mod.more {


    import ArrayCollection = eui.ArrayCollection;
    import HelotCallRewardConfig = game.config.HelotCallRewardConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class MiningLingbaoMdr extends MdrBase {
        private _view: MiningLingbaoView = this.mark("_view", MiningLingbaoView);
        private _proxy: MiningProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Mining);

            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClickBtn);
            this.onNt(MoreEvent.ON_UPDATE_MINING_LINGBAO_CNT_INFO, this.onUpdateCnt, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let cfgArr: HelotCallRewardConfig[] = getConfigListByName(ConfigName.HelotCallReward);
            let list: number[][] = [];
            for (let cfg of cfgArr) {
                list.push(cfg.reward);
            }
            this._listData.replaceAll(list);

            this.onUpdateCnt();
        }

        private onUpdateCnt(): void {
            let str: string = TextUtil.addColor(`${this._proxy.lingbao_cnt}/${this._proxy.team_lingbao_cishuxianzhi}`, WhiteColor.GREEN);
            let str2: string = StringUtil.substitute(getLanById(LanDef.zhanduishengxu_tips12), [str]);
            this._view.lab_count.textFlow = TextUtil.parseHtml(str2);

            this._view.costItem.updateShow(this._proxy.team_lingbao_cost);
        }

        private onClickBtn(): void {
            if (this._proxy.lingbao_cnt >= this._proxy.team_lingbao_cishuxianzhi) {
                PromptBox.getIns().show("召唤次数不足");
                return;
            }
            if (!BagUtil.checkPropCnt(this._proxy.team_lingbao_cost[0], this._proxy.team_lingbao_cost[1], PropLackType.Dialog)) {
                return;
            }
            this._proxy.c2s_zhandui_lingbao();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}