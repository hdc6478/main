namespace game.mod.boss {

    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;

    export class CrossBossSceneMdr extends MdrBase {
        private _view: CrossBossSceneView = this.mark("_view", CrossBossSceneView);
        private _proxy: BossProxy;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);

            this.onNt(SceneEvent.ON_SCENE_RANK_UPDATE, this.onRankUpdate, this);
            this.onNt(BossEvent.ON_CROSS_BOSS_REWARD_UPDATE, this.updateRewardHint, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateMvp();
            this.updateRewatd();
            this.updateRewardHint();
        }

        protected onHide(): void {
            this._proxy.clearCrossBossSceneRankInfo();//清除场景排行榜信息
            super.onHide();
        }

        private onClickRank(): void {
            this._proxy.crossBossSceneRank = true;
            ViewMgr.getIns().showView(ModName.Boss, BossViewType.CrossBossRankMain);
        }

        private onClickReward(): void {
            this._proxy.crossBossSceneRank = true;
            ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.CrossBossHurtReward);
        }

        private onRankUpdate(n: GameNT) {
            let msg: SceneRankData = n.body;
            this.updateMvp(msg);
        }

        private updateMvp(info?: SceneRankData): void {
            if(info && info.hurtList && info.hurtList.length){
                let firstInfo = info.hurtList[0];
                this._view.head.updateHeadShow(firstInfo.head, firstInfo.head_frame, firstInfo.sex);
            }
            else {
                this._view.head.defaultHeadShow();
            }
        }

        private updateRewatd(): void {
            let rewards = this._proxy.selCrossBossCfg.lucky_reward;
            this._view.icon.setData(rewards[0]);
        }

        private updateRewardHint(): void {
            let hint = false;
            let rewards = this._proxy.selCrossBossCfg.hurt_reward_show;
            for(let i = 0; i < rewards.length; ++i){
                let index = i + 1;
                let status = this._proxy.getCrossBossRewardStatus(index);
                let canDraw = status == RankRewardStatus.Finish;
                if(canDraw){
                    hint = true;
                    break;
                }
            }
            this._view.btn_reward.redPoint.visible = hint;
        }
    }
}