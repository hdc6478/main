namespace game.mod.boss {

    import Monster1Config = game.config.Monster1Config;
    import facade = base.facade;
    import PersonalBossConfig = game.config.PersonalBossConfig;
    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import LanDef = game.localization.LanDef;
    import single_boss = msg.single_boss;
    import TimeMgr = base.TimeMgr;

    export class PersonalBossItem extends BaseRenderer {
        public img_icon: eui.Image;
        public lab_name: eui.Label;
        public list_reward: eui.List;
        public lab_limit: eui.Label;
        public img_has: eui.Image;
        public btn_challenge: Btn;
        public lab_cnt: eui.Label;
        public timeItem: game.mod.TimeItem;

        private _rewardList: ArrayCollection;
        private _proxy: BossProxy;
        public data: PersonalBossConfig;
        private _info: single_boss;/**当前boss*/

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Boss).retProxy(ProxyType.Boss);
            this.btn_challenge.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.btn_challenge.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let monsterIndex = cfg.monster_index[0];
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterIndex);
            this.img_icon.source = monsterCfg.res_id;

            let nameStr = "";
            let bossType = cfg.open[0];
            let lv = cfg.open[1];
            if(bossType == ManyBossType.Lv){
                nameStr = lv + getLanById(LanDef.lv);
            }
            else {
                nameStr = RoleUtil.getRebirthLvStr(lv);
            }
            this.lab_name.text = nameStr;

            let rewardCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, cfg.reward_big);
            this._rewardList.source = rewardCfg.content.slice(0, 3);

            let isOpen = this._proxy.isPersonalBossOpen(cfg);
            this.btn_challenge.visible = false;
            this.lab_limit.visible = false;
            this.img_has.visible = false;
            this.lab_cnt.visible = false;
            this.timeItem.visible = false;
            if(!isOpen){
                //未开启
                this.lab_limit.visible = true;
                this.lab_limit.text = nameStr + getLanById(LanDef.boss_cue5);
            }
            else {
                let maxCnt = this._proxy.getPersonalBossMaxCnt();
                let info = this._proxy.getPersonalBossInfo(cfg.index);
                this._info = info;
                let useCnt = info && info.used_cnt || 0;
                let leftCnt = maxCnt - useCnt;
                if(leftCnt > 0){
                    let bossTime = info && info.revive_time || 0;
                    let isDied = bossTime - TimeMgr.time.serverTimeSecond > 0;//已死亡
                    if(isDied){
                        //复活中
                        this.lab_cnt.visible = true;
                        this.timeItem.visible = true;
                        let cntStr = getLanById(LanDef.times) + "：" + TextUtil.addColor(leftCnt + "/" + maxCnt, WhiteColor.GREEN);
                        this.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
                        this.updateTime();
                    }
                    else {
                        //可挑战
                        this.btn_challenge.visible = true;
                        this.btn_challenge.redPoint.visible = true;
                    }
                }
                else {
                    //已挑战
                    this.img_has.visible = true;
                }
            }
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            if (BagUtil.checkBagFull()) {
                return;
            }
            let index = this.data.index;
            this._proxy.c2s_single_boss_enter(index);
        }

        public updateTime(): void {
            if(!this.data || !this._info){
                return;
            }
            if(!this.timeItem.visible){
                return;
            }
            let bossTime = this._info.revive_time || 0;
            let nextTime = bossTime - TimeMgr.time.serverTimeSecond;
            if(nextTime == 0){
                facade.sendNt(BossEvent.UPDATE_BOSS_lIST);
            }
            this.timeItem.updateLeftTime(nextTime);
        }
    }
}
