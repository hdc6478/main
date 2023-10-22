namespace game.mod.shilian {

    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import ForbiddenGateConfig = game.config.ForbiddenGateConfig;
    import ForbiddenFubenConfig = game.config.ForbiddenFubenConfig;
    import forbidden_item = msg.forbidden_item;
    import TouchEvent = egret.TouchEvent;
    import forbidden_reward_list = msg.forbidden_reward_list;

    export class ForbiddenSceneMdr extends MdrBase {

        private _view: XiantaSceneView = this.mark("_view", XiantaSceneView);
        private _proxy: ShilianProxy;

        private _curInfo: forbidden_item;
        private _awdData: forbidden_reward_list[];
        private _curLv: number = 0;
        private _lastLayer: number = 0;
        private _canGet: boolean;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Shilian);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ShilianEvent.ON_FORBIDDEN_INFO_UPDATE, this.updateShow, this);
            this.onNt(ShilianEvent.ON_FORBIDDEN_AWD_UPDATE, this.updateShow, this);
            this.onNt(SceneEvent.FUBEN_CONTINUE_BATTLE, this.updateTips, this);
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.icon, TouchEvent.TOUCH_TAP, this.onClickGateAwd);
        }

        protected onShow(): void {
            super.onShow();

            this.updateShow();
            this.updateTips();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateShow(): void {
            this._curInfo = this._proxy.getFbdInfo(this._proxy.curFbdType);
            let fbdFubenCfgs: { [bigGateId: string]: ForbiddenFubenConfig } = this._proxy.getFbdFubenCfgByType(this._proxy.curFbdType);
            let curBigGateCfg: ForbiddenFubenConfig = fbdFubenCfgs[this._proxy.curFbdBigGateId];
            if (!curBigGateCfg) {
                return;
            }

            let index = curBigGateCfg.index;
            let bigGateCfg: ForbiddenGateConfig = this._proxy.getNearBigAwdCfg(index);
            if (!bigGateCfg) {
                return;
            }

            let isEndSmall = this._proxy.isEndSmallGate2(this._curInfo.index, this._curInfo.id);
            let bigAwdPreCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, bigGateCfg.gate_show_reward);
            this._curLv = this._curInfo && !isEndSmall ? this._curInfo.id : 0;
            // let maxGate = this._proxy.getBigAwdCondition(curBigGateCfg.index, this._curLv);
            this._canGet = this._proxy.hasBigAwd(this._proxy.curFbdType, index);

            this._view.lab_name.text = "通关大奖";

            let maxGate = bigGateCfg.gate_id;
            let passGate = this._curInfo ? this._curInfo.id : 0;// 已通关的小关卡数
            if(this._curInfo && this._curInfo.index < index){
                //已通关大关卡小于当前选中的关卡时，进度取0
                passGate = 0;
            }

            this._view.bar.show(passGate, maxGate, false, 0, false);
            if (!bigAwdPreCfg) {
                return;
            }
            if (this._canGet) {
                this._view.icon.setData(bigAwdPreCfg.content[0], IconShowType.NotTips);
                this._view.icon.setHint(true);
            } else {
                this._view.icon.setData(bigAwdPreCfg.content[0], IconShowType.Reward);
                this._view.icon.setHint(false);
            }

            this._awdData = this._proxy.getFbdAwd2(this._proxy.curFbdType, curBigGateCfg.index);
        }

        private updateTips(): void {
            let curLayer = this._curLv + 1;
            if (this._lastLayer != curLayer) {
                ViewMgr.getIns().showChallengeTips(curLayer);
                this._lastLayer = curLayer;
            }
        }

        private onClickGateAwd(e: TouchEvent) {
            if (!this._awdData || !this._canGet || !this._awdData.length) {
                return;
            }
            let awd = this._awdData.pop();
            this._proxy.c2s_get_reward(awd.index, awd.id);
        }

    }
}