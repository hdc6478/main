namespace game.mod.boss {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;

    export class CrossBossHurtRewardItem extends BaseRenderer {
        private lab_desc: eui.Label;
        private list_reward: eui.List;
        private img_not: eui.Image;
        private img_draw: eui.Image;
        private btn_draw: game.mod.Btn;

        private _proxy: BossProxy;
        private _rewardList: ArrayCollection;

        public data: {index: number, hurt: number, rewardId: number, status: number};

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Boss).retProxy(ProxyType.Boss);
            this.btn_draw.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.btn_draw.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let index = this.data.index;
            let hurt = this.data.hurt;
            let rewardId = this.data.rewardId;
            let status = this.data.status;

            let myRank = this._proxy.getMyPersonalRank();
            let curHurt = myRank && myRank.value.toNumber() || 0;
            let hurtStr = StringUtil.getHurtNumStr(hurt);
            let curHurtStr = StringUtil.getHurtNumStr(curHurt);
            let desc = StringUtil.substitute(getLanById(LanDef.cross_boss_tips3), [hurtStr])
                +TextUtil.addColor("（" + curHurtStr + "/" + hurtStr + "）", curHurt >= hurt ? WhiteColor.GREEN : WhiteColor.RED);
            this.lab_desc.textFlow = TextUtil.parseHtml(desc);

            let cfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, rewardId);
            this._rewardList.source = cfg.content.slice(0, 3);

            let notFinish = status == RankRewardStatus.NotFinish;
            let canDraw = status == RankRewardStatus.Finish;
            let hasDraw = status == RankRewardStatus.Draw;
            this.img_not.visible = notFinish;
            this.btn_draw.visible = this.btn_draw.redPoint.visible = canDraw;
            this.img_draw.visible = hasDraw;
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            let index = this.data.index;
            this._proxy.c2s_new_cross_boss_hurt_reward(index);
        }
    }
}