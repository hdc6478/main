namespace game.mod.compete {
    import tour_role_info = msg.tour_role_info;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import TourpvpKillerConfig = game.config.TourpvpKillerConfig;
    import TourpvpChallengeConfig = game.config.TourpvpChallengeConfig;

    export class YouliItem extends BaseRenderer {

        public grp_role_eff: eui.Group;
        public lab_name: eui.Label;
        public lab_power: eui.Label;
        public lab_score: eui.Label;
        
        private _proxy: CompeteProxy;
        public data: tour_role_info;

        private _isNormal: boolean;

        constructor() {
            super();
            this.skinName = "skins.compete.YouliItemSkin";
            this.touchEnabled = false;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this, this.onClick, this);
            this._proxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
        }

        protected dataChanged(): void {
            super.dataChanged();
            if (!this.data) {
                return;
            }

            this._isNormal = (this.data.pos != 1 || this._proxy.type == YouliType.Normal);
            this.currentState = this._isNormal ? "normal" : "wanfa";
            this.removeAllEffects();
            if(this._isNormal) {
                this.lab_power.text = this.data.showpower.toString();
                this.addRoleModel();
            } else {
                let index = this._proxy.type + 4;//取配置时需要加上4个宝箱占位id
                let cfg: TourpvpChallengeConfig = getConfigByNameId(ConfigName.TourpvpChallenge, index);
                let nameStr = cfg.name;
                switch(this._proxy.type) {
                    case YouliType.WishBox:
                    case YouliType.Treasure:
                    case YouliType.Dati://todo，答题
                        this.addBoxModel();
                        break;
                    case YouliType.SpecialKiller:
                        //异形杀手
                        this.addMonsterModel();
                        break;
                    case YouliType.ScoreKiller:
                        let killerIndex = this.data.param1[0];
                        let killerCfg: TourpvpKillerConfig = getConfigByNameId(ConfigName.TourpvpKiller, killerIndex);
                        nameStr = killerCfg ? killerCfg.name : "积分杀手";
                        this.addRoleModel();
                        break;
                }
                this.lab_power.text = nameStr;
            }

            this.lab_name.text = this.data.name;

            this.lab_score.text = `积分+${this.data.score || 0}`;
        }

        private addRoleModel(): void {
            let data = this.data;
            let rankInfo: RankUIRoleData = {fashion: data.fashion, weapon: data.weapon, sex: data.sex, wing: data.wing};
            this.updateRankUIRole(this.grp_role_eff, rankInfo, 0.6);
        }

        private addBoxModel(): void {
            this.addEftByParent(ResUtil.getEffectUI(UIEftSrc.Box), this.grp_role_eff, 0, -100);
        }

        private addMonsterModel(): void {
            this.addMonster(140100004, this.grp_role_eff);
        }

        public onClick(e: TouchEvent): void {
            if (this._proxy.curFightTimes >= this._proxy.maxFightTimes) {
                facade.sendNt(CompeteEvent.COMMON_CLICK_ADD);
                return;
            }
            if(this._isNormal) {
                this._proxy.c2s_tour_challenge(this.data.pos);
            } else {
                switch(this._proxy.type) {
                    case YouliType.WishBox:
                        facade.showView(ModName.Compete, CompeteViewType.YouliWishBox, this.data);
                        break;
                    case YouliType.Treasure:
                        facade.showView(ModName.Compete, CompeteViewType.YouliTreasure, this.data.index);
                        break;
                    case YouliType.SpecialKiller:
                        facade.showView(ModName.Compete, CompeteViewType.YouliSpecialKiller, this.data);
                        break;
                    case YouliType.ScoreKiller:
                        facade.showView(ModName.Compete, CompeteViewType.YouliScoreKiller, this.data);
                        break;
                    case YouliType.Dati:
                        facade.showView(ModName.Compete, CompeteViewType.YouliDati, this.data);
                        break;
                }
            }
        }

    }
}