namespace game.mod.yijie {

    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import yijie_boss_data = msg.yijie_boss_data;
    import Monster1Config = game.config.Monster1Config;
    import TimeMgr = base.TimeMgr;
    import yongheng_boss_data = msg.yongheng_boss_data;

    export class YijieBossItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public img_rate: eui.Image;
        public lab_name: eui.Label;
        public lab_belong: eui.Label;
        public bar: ProgressBarComp;
        public lab_tips: eui.Label;
        public btn_attack: game.mod.Btn;

        private _proxy: YijieProxy;
        private _sceneProxy: ISceneProxy;
        public data: yijie_boss_data | yongheng_boss_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Yijie).retProxy(ProxyType.Yijie);
            this._sceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_attack, this.onClick, this);
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            let info = this.data;
            //不能直接设置boss为攻击目标，有可能找不到boss
            //this._sceneProxy.foeTargetId = info.entity_id;//设置boss为攻击目标
            this._sceneProxy.requestMonster(info.entity_id);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let info = this.data;
            let stage = info.stage;
            let index = info.index;
            let cfg = this._proxy.getBossCfg(stage, index, this._proxy.curType);
            let monsterIndex = cfg.monster_index[0];
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterIndex);
            this.img_icon.source = monsterCfg.res_id;

            let isRate = index == YijieBossNum && this._proxy.curType == YijieBossType.Yijie;//是否稀有boss
            this.img_rate.visible = isRate;

            let bossTime = info && info.recover_time && info.recover_time.toNumber() || 0;
            let isShowRate = isRate && bossTime == -1;//展示稀有boss
            let nameStr = monsterCfg.name;
            if(isShowRate){
                //稀有boss为刷新
                nameStr = "？？？";
            }
            this.lab_name.text = nameStr;

            let belongInfo = info.owerinfo;
            let hasBelong = !!(belongInfo && belongInfo.role_id);//是否有归属
            let belongStr = "";
            if(!hasBelong){
                //归属者：无
                belongStr = getLanById(LanDef.yijie_tips14) + "：" + getLanById(LanDef.bag_cue20);
            }
            else {
                belongStr = getLanById(LanDef.yijie_tips14) + "：" + belongInfo.name + "\n" + getLanById(LanDef.yijie_tips15) + "：";
                belongStr += belongInfo.guild_name ? belongInfo.guild_name : getLanById(LanDef.bag_cue20);
            }
            this.lab_belong.text = belongStr;

            let hp = info && info.hp || 0;
            this.bar.show(hp, 100, false, 0, false, ProgressBarType.Percent);//血量

            let tipsStr = "";
            if(isShowRate){
                //展示稀有boss
                this.btn_attack.visible = false;
                let maxValue = this._proxy.getBossMaxValue();
                tipsStr = StringUtil.substitute(getLanById(LanDef.yijie_tips16), [maxValue]);//击败%s个#N妖怪刷新
            }
            else {
                let leftTime = bossTime - TimeMgr.time.serverTimeSecond;
                let isDied = leftTime > 0;//已死亡
                if(isDied){
                    //已死亡
                    this.btn_attack.visible = false;
                    tipsStr = TimeUtil.formatSecond(leftTime, "HH:mm:ss") + getLanById(LanDef.vip_boss13);//00:00:00复活
                }
                else {
                    let isAtack = this._sceneProxy.foeTargetId && this._sceneProxy.foeTargetId.eq(this.data.entity_id);//攻击中
                    this.btn_attack.visible = !isAtack;
                    if(isAtack){
                        tipsStr = getLanById(LanDef.attacking) + "...";//攻击中
                    }
                }
            }
            this.lab_tips.text = tipsStr;
        }
    }
}
