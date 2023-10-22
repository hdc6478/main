namespace game.mod.union {


    import guild_zhanyaotai_boss_struct = msg.guild_zhanyaotai_boss_struct;
    import ArrayCollection = eui.ArrayCollection;
    import GuildZhanyaotaiConfig = game.config.GuildZhanyaotaiConfig;
    import TouchEvent = egret.TouchEvent;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class UnionKillItem extends BaseRenderer implements UpdateItem {

        private img_name: eui.Image;
        private img_head: eui.Image;
        private lab_success: eui.Label;
        private lab_master: eui.Label;
        private list: eui.List;
        private btn: Btn;
        private timeItem: TimeItem;
        private coinItem: CoinItem;
        private progress: ProgressBarComp;

        public data: guild_zhanyaotai_boss_struct;
        private _proxy: UnionProxy;
        private _listData: ArrayCollection = new ArrayCollection();
        /**是否击杀 */
        private _status: boolean;
        private _endTime: number;
        private _cfg: GuildZhanyaotaiConfig;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Union, ProxyType.Union);

            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData;

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }

            this._status = !this.data.boss_hp;
            this._cfg = getConfigByNameId(ConfigName.GuildZhanyaotai, this.data.index);
            if (this._status) {
                this.progress.visible = false;
                this.lab_master.visible = false;
                this.timeItem.visible = false;
                this.coinItem.visible = false;
                this.lab_success.visible = true;
                this.list.visible = true;
                this._listData.replaceAll(this._cfg.rewards3);
                this.btn.label = "一键领取";
                this._endTime = 0;
                TimeMgr.removeUpdateItem(this);
            } else {
                this.list.visible = false;
                this.lab_success.visible = false;
                this.timeItem.visible = true;
                this.progress.visible = true;
                this.progress.show(this.data.boss_hp, this._cfg.boss_hp);
                this.lab_master.visible = true;
                this.lab_master.textFlow = TextUtil.parseHtml("召唤:" + TextUtil.addColor(this.data.name, WhiteColor.DEFAULT));
                this.coinItem.visible = true;
                this.coinItem.setData(this._cfg.atk_cost[0][0]);
                this.btn.label = "斩妖";
                this._endTime = this.data.endtime.toNumber();
                TimeMgr.addUpdateItem(this, 1000);
            }
            // this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(this._cfg.name, ColorUtil.getColorByQuality1(this._cfg.quality)));
            // this.head.updateBossHeadShow(this._cfg.BOSS, 0);
            this.img_head.source = `touxiang_boss_${this._cfg.index}`;
            this.img_name.source = `union_kill_boss_${this._cfg.index}`;

            this.btn.setHint(this._proxy.getBossHint(this.data));
        }

        update(time: base.Time): void {
            let serverTime = TimeMgr.time.serverTimeSecond;
            let leftTime = this._endTime - serverTime;
            this.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
            }
        }

        private onClick(): void {
            if (this._status) {
                this._proxy.c2s_guild_zhanyaotai_click(3, this.data.id);
            } else {
                if (!BagUtil.checkPropCnt(this._cfg.atk_cost[0][0], this._cfg.atk_cost[0][1], PropLackType.Dialog)) {
                    return;
                }
                this._proxy.c2s_guild_zhanyaotai_click(2, this.data.id);
            }
        }
    }

}