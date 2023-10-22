namespace game.mod.boss {

    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import Monster1Config = game.config.Monster1Config;
    import TimeMgr = base.TimeMgr;
    import BossProxy = game.mod.boss.BossProxy;
    import zhuimo_boss_data = msg.zhuimo_boss_data;
    import ZhuimoBossConfig = game.config.ZhuimoBossConfig;

    export class AbyssBossItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        // public img_rate: eui.Image;
        public lab_name: eui.Label;
        public bar: ProgressBarComp;
        public lab_tips: eui.Label;
        public btn_attack: game.mod.Btn;

        private _proxy: BossProxy;
        private _sceneProxy: ISceneProxy;
        public data: zhuimo_boss_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Boss, ProxyType.Boss);
            this._sceneProxy = getProxy(ModName.Scene, ProxyType.Scene);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_attack, this.onClick, this);
        }

        private onClick(): void {
            if (!this.data) {
                return;
            }
            let info = this.data;

            this._sceneProxy.requestMonster(info.entity_id);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let info = this.data;
            let index = info.index;
            let cfg: ZhuimoBossConfig = getConfigByNameId(ConfigName.ZhuimoBoss, index);
            let monsterIndex = cfg.monster_index[0];
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterIndex);
            this.img_icon.source = monsterCfg.res_id;


            let bossTime = info && info.recover_time && info.recover_time.toNumber() || 0;
            let nameStr = monsterCfg.name;
            this.lab_name.text = nameStr;

            let hp = info && info.hp || 0;
            this.bar.show(hp, 100, false, 0, false, ProgressBarType.Percent);//血量

            let tipsStr = "";
            let leftTime = bossTime - TimeMgr.time.serverTimeSecond;
            let isDied = leftTime > 0;//已死亡
            if (isDied) {
                //已死亡
                this.btn_attack.visible = false;
                tipsStr = TimeUtil.formatSecond(leftTime, "HH:mm:ss") + getLanById(LanDef.vip_boss13);//00:00:00复活
            } else {
                let isAtack = this._sceneProxy.foeTargetId && this._sceneProxy.foeTargetId.eq(this.data.entity_id);//攻击中
                this.btn_attack.visible = !isAtack;
                if (isAtack) {
                    tipsStr = getLanById(LanDef.attacking) + "...";//攻击中
                }
            }
            this.lab_tips.text = tipsStr;
        }
    }
}
