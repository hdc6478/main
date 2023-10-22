namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import ArrayCollection = eui.ArrayCollection;

    export class SeaFubenMdr extends EffectMdrBase {
        private _view: SeaFubenView = this.mark("_view", SeaFubenView);

        private _itemList: ArrayCollection;
        private _proxy: SeaProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Sea);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
        }

        protected onShow(): void {
            super.onShow();

            this.updateShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickChallenge(): void {
            let type = this._proxy.type;
            this._proxy.c2s_huanjingzhihai_click(SeaOpType.Challenge, type);
        }

        private updateShow(): void {
            let type = this._proxy.type;
            let bigGate = this._proxy.bigGate;

            let bigGateCfg = this._proxy.getBigGateCfg(type, bigGate);
            this._view.avatarNameItem.updateShow(bigGateCfg.name);

            let maxSmallGate = this._proxy.getMaxSmallGate(bigGate);
            let maxSmallGateCfg = this._proxy.getSmallGateCfg(bigGate, maxSmallGate);
            this._view.icon.setData(maxSmallGateCfg.show_reward[0]);

            let smallGate = this._proxy.getSmallGate(type, bigGate);
            this._view.bar.show(smallGate, maxSmallGate, false, 0, false);

            let curSmallGate = smallGate + 1;//当前挑战的关卡
            let smallGateCfg = this._proxy.getSmallGateCfg(bigGate, curSmallGate);
            if(!smallGateCfg){
                return;
            }
            this._view.seaRewardItem.setData(smallGateCfg.pass_reward);

            let gateStr = StringUtil.substitute(getLanById(LanDef.sea_tips7), [curSmallGate, maxSmallGate]);
            this._view.lab_gate.text = gateStr;

            //回到主界面标识 目前用于 挑战幻境之海最后一关，圣界副本 胜利
            gso.isBackMain = curSmallGate == maxSmallGate;


            this._itemList.source = smallGateCfg.show_reward;

            //显示推荐战力
            let power = smallGateCfg.show_power;
            this.addBmpFont(power + '', BmpTextCfg[BmpTextType.CommonPower], this._view.grp_font, true, 1, false, 0, true);

            let curPower = RoleVo.ins.showpower.toNumber();
            this._view.btn_challenge.redPoint.visible = curPower >= smallGateCfg.show_power;
        }
    }
}