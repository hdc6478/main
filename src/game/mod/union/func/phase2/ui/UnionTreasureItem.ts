namespace game.mod.union {

    import facade = base.facade;
    import guild_yibao_box_struct = msg.guild_yibao_box_struct;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import GuildYibaoBoxConfig = game.config.GuildYibaoBoxConfig;

    export class UnionTreasureItem extends BaseRenderer implements UpdateItem {

        private img_bg: eui.Image;
        private lab_name: eui.Label;
        private box: Btn;
        private timeItem: TimeItem;
        private btn: Btn;
        private lab: eui.Label;
        private bar: ProgressBarComp;

        private _proxy: UnionProxy;
        private endTime: number;
        private status: number = 0;
        public data: guild_yibao_box_struct;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.box, this.onClickBox, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClickBtn, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                this.onNull();
                return;
            }

            let cfg: GuildYibaoBoxConfig = getConfigByNameId(ConfigName.GuildYibaoBox, this.data.boss_index);
            this.box.icon = `yibao_baoxiang_${this.data.boss_index}`;
            this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.box_name, ColorUtil.getColorByQuality1(cfg.box_quality)));
            this.box.visible = true;
            this.box.setHint(false);
            this.btn.setHint(true);

            this.endTime = this.data.time.toNumber();
            // if (TimeMgr.time.serverTimeSecond < this.endTime || !this.endTime) {
            //     this.onStart();
            //     if (!this.endTime) {
            //         this.timeItem.updateLeftTime(cfg.time, "", getLanById(LanDef.battle_cue29));
            //         this.btn.label = "解锁宝箱";
            //         this.status = 1;
            //     } else {
            //         this.update(TimeMgr.time);
            //         this.btn.label = "邀请加速";
            //         this.status = 2;
            //         TimeMgr.addUpdateItem(this, 1000);
            //     }
            // } else {
            //     this.onEnd();
            // }
            // this.btn.setHint(this.status == 3);

            let xianzong_yibao_jiasu_shangxian = this._proxy.xianzong_yibao_jiasu_shangxian;
            let count: number = this.data.count;
            let timeEnd: boolean = this.endTime <= TimeMgr.time.serverTimeSecond;
            let helpEnd: boolean = count && count >= xianzong_yibao_jiasu_shangxian;
            if (this.endTime && (timeEnd || helpEnd)) {
                this.onEnd();
                return;
            }
            this.onStart();

            if (!this.endTime) {
                this.timeItem.updateLeftTime(cfg.time, "", getLanById(LanDef.battle_cue29));
                this.btn.label = "解锁宝箱";
                this.status = 1;
                return;
            }

            this.update(TimeMgr.time);
            TimeMgr.addUpdateItem(this, 1000);

            if (!this.data.hasOwnProperty("count")) {
                this.btn.label = "邀请加速";
                this.status = 2;
                return;
            }
            this.onInvite();
            this.bar.show(count, xianzong_yibao_jiasu_shangxian, false);
        }

        private onNull(): void {
            this.bar.visible = this.btn.visible = this.timeItem.visible = this.lab.visible = this.box.visible = false;
            this.lab_name.text = "宝箱位";
            this.status = 0;
            TimeMgr.removeUpdateItem(this);
        }

        private onStart(): void {
            this.bar.visible = this.lab.visible = false;
            this.btn.visible = this.timeItem.visible = true;
        }

        private onEnd(): void {
            this.bar.visible = this.timeItem.visible = this.btn.visible = false;
            this.lab.visible = true;
            this.box.setHint(true);
            this.status = 3;
            TimeMgr.removeUpdateItem(this);
        }

        private onInvite(): void {
            this.btn.visible = false;
            this.bar.visible = true;
        }

        update(time: base.Time): void {
            let leftTime = this.endTime - TimeMgr.time.serverTimeSecond;
            this.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
            if (leftTime <= 0) {
                this.onEnd();
                return
            }
        }

        private onClickBox(): void {
            if (this.status !== 3) {
                let cfg: GuildYibaoBoxConfig = getConfigByNameId(ConfigName.GuildYibaoBox, this.data.boss_index);
                ViewMgr.getIns().showBoxReward("", cfg.rewards2);
                return;
            }
            let pos: number = this.itemIndex + 1;
            this._proxy.c2s_guild_yibao_click(4, pos);
        }

        private onClickBtn(): void {
            let pos: number = this.itemIndex + 1;
            if (this.status == 1) {
                this._proxy.c2s_guild_yibao_click(3, pos);
            } else if (this.status == 2) {
                this._proxy.c2s_guild_yibao_click(5, pos);
            }
        }
    }

}