namespace game.mod.compete {

    import pvp_battle_group_pk = msg.pvp_battle_group_pk;
    import Event = egret.Event;
    import MagicTopRankConfig = game.config.MagicTopRankConfig;
    import ParamConfig = game.config.ParamConfig;
    import pvp_battle_group_role_info = msg.pvp_battle_group_role_info;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;

    export class DoufaPlayerView extends eui.Component {
        public grp_title: eui.Group;
        public item0: DoufaPlayerItem;
        public item1: DoufaPlayerItem;
        public item2: DoufaPlayerItem;
        public item3: DoufaPlayerItem;
        public item4: DoufaPlayerItem;
        public item5: DoufaPlayerItem;
        public item6: DoufaPlayerItem;

        private _effHub: UIEftHub;
        private _eftId: number = 0;
        private _info: pvp_battle_group_pk;
        private _proxy: CompeteProxy;
        private _type: number;//选中的类型

        constructor() {
            super();
            this.skinName = "skins.compete.DoufaPlayerSkin";
            this._effHub = new UIEftHub(this);
            this._proxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            for(let i = 0; i <= 3; ++i){
                this["item" + i].addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            }
        }

        protected onRemoveFromStage() {
            this.removeTitle();
            for(let i = 0; i <= 3; ++i){
                this["item" + i].removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            }
        }

        protected onClick(e: TouchEvent): void {
            if (!this._proxy.canGuess()) {
                //不可押注
                return;
            }
            let imgHead = e.target;
            for(let i = 0; i <= 3; ++i){
                let item = this["item" + i] as DoufaPlayerItem;
                if(imgHead == item.img_head){
                    if(item.info && item.info.role_id){
                        ViewMgr.getIns().showSecondPop(ModName.Compete, CompeteViewType.DoufaGuess, item.info);
                    }
                    break;
                }
            }
        }

        private removeTitle(): void {
            if (this._eftId) {
                this._effHub.removeEffect(this._eftId);
            }
        }

        private updateTitle(): void {
            let type = this._info && this._info.group_type ? this._info.group_type : this._type;
            let index = 0;
            if(type == DoufaGroupType.Type5){
                // let pCfg: ParamConfig = GameConfig.getParamConfigById("doufa_runk_reward");
                // let reward: number[] = pCfg.value;
                // index = reward[0];
                let cfg: MagicTopRankConfig = getConfigByNameId(ConfigName.MagicTopRank, 1);//取第一名奖励
                index = cfg.reward[0][0];
            }
            else {
                let cfg: MagicTopRankConfig = getConfigByNameId(ConfigName.MagicTopRank, type);
                index = cfg.reward[0][0];
            }
            this.removeTitle();
            this._eftId = this._effHub.add(ResUtil.getTitleSrc(index), 0, 0, null, 0, this.grp_title, -1);
        }

        private updateMatch(num: number, item1: DoufaPlayerItem, item2: DoufaPlayerItem, isGuess?: boolean): void {
            let matchInfo = this.getMatchInfo(num);
            let roleInfo1 = matchInfo ? matchInfo.role_info1 : null;
            let roleInfo2 = matchInfo ? matchInfo.role_info2 : null;
            let winRoleId = matchInfo ? matchInfo.win_roleid : null;
            let isGuess1 = false;
            let isGuess2 = false;
            if(isGuess){
                if(roleInfo1){
                    isGuess1 = this._proxy.isGuess(roleInfo1.role_id);
                }
                if(roleInfo2){
                    isGuess2 = this._proxy.isGuess(roleInfo2.role_id);
                }
            }
            //只有小组赛，决赛才有轮空状态，轮空的前提是存在一方玩家
            let isEmpty1 = false;
            let isEmpty2 = false;
            if(this._proxy.groupStatus != DoufaGroupStatus.Score){
                isEmpty1 = !roleInfo1 && !!roleInfo2;//存在玩家2
                isEmpty2 = !roleInfo2 && !!roleInfo1;//存在玩家1
            }
            item1.updateShow(roleInfo1, winRoleId, false, isGuess1, isEmpty1);
            item2.updateShow(roleInfo2, winRoleId, false, isGuess2, isEmpty2);
        }

        private updateMatch1(): void {
            this.updateMatch(DoufaGroupMatch.Num1, this.item0, this.item1, true);
        }

        private updateMatch2(): void {
            this.updateMatch(DoufaGroupMatch.Num2, this.item2, this.item3, true);
        }

        private updateMatch3(): void {
            this.updateMatch(DoufaGroupMatch.Num3, this.item4, this.item5);
        }

        private updateMatchWin(): void {
            let matchInfo = this.getMatchInfo(DoufaGroupMatch.Num3);
            let roleInfo1 = matchInfo ? matchInfo.role_info1 : null;
            let roleInfo2 = matchInfo ? matchInfo.role_info2 : null;
            let winRoleId = matchInfo ? matchInfo.win_roleid : null;
            let winInfo = null;
            if(winRoleId && winRoleId.toNumber() != 0){
                if(roleInfo1 && winRoleId.eq(roleInfo1.role_id)){
                    winInfo = roleInfo1;
                }
                else if(roleInfo2 && winRoleId.eq(roleInfo2.role_id)){
                    winInfo = roleInfo2;
                }
            }

            this.item6.updateShow(winInfo, null, true);
        }

        private getMatchInfo(num: number): pvp_battle_group_role_info {
            if(!this._info || !this._info.info){
                return null;
            }
            for(let matchInfo of this._info.info){
                if(matchInfo.match_num == num){
                    return matchInfo;
                }
            }
            return null;
        }

        public updateShow(type: number): void {
            this._type = type;
            this._info = this._proxy.getGroupInfo(type);
            this.updateTitle();
            this.updateMatch1();
            this.updateMatch2();
            this.updateMatch3();
            this.updateMatchWin();
        }
    }
}
