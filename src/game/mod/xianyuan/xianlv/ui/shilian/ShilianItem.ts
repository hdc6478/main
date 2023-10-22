namespace game.mod.xianyuan {

    import XianlvShilianFubenConfig = game.config.XianlvShilianFubenConfig;
    import shilian_info = msg.shilian_info;
    import Monster1Config = game.config.Monster1Config;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class ShilianItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public img_typebg: eui.Image;
        public lb_lvname: eui.Label;
        public gr_challenge: eui.Group;
        public lb_bossname: eui.Label;
        public img_type: eui.Image;
        public bar: game.mod.ProgressBarComp;
        public btn_reward: game.mod.Btn;
        public btn_saodang: game.mod.Btn;
        public btn_challenge: game.mod.Btn;
        public scroller: eui.Scroller;
        public list_reward: eui.List;

        data: XianlvShilianFubenConfig;
        private _proxy: XianlvShilianProxy;
        private _listData: eui.ArrayCollection;

        private _isReward = false;

        constructor() {
            super();
            this.skinName = `skins.xianyuan.ShilianItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Xianyuan, ProxyType.XianlvShilian);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_challenge, this.onClickChallenge, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_saodang, this.onClickSaodang, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_reward, this.onClickReward, this);
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this._isReward = false;
        }

        protected dataChanged(): void {
            let cfg = this.data;
            if (!cfg) {
                return;
            }
            let monsterId = cfg.bossId[0][0];
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterId);
            if (!monsterCfg) {
                return;
            }

            this.img_icon.source = monsterCfg.res_id;
            this.lb_bossname.text = monsterCfg.name;
            this.img_type.source = `boss_buff_${cfg.type}`;
            this.img_typebg.source = ResUtil.getUiPng(`xianlv_shilian_type${cfg.type}`);
            let info: shilian_info = this._proxy.getInfo(cfg.type);
            let showHint: boolean;
            if (info && info.status == 1) {
                this._isReward = true;
                this.rewardView();
                showHint = true;
            } else {
                this._isReward = false;
                if (info && info.max_damage_record) {
                    this.sweepView();
                } else {
                    this.challengeView();
                }
                showHint = this._proxy.canChallenge(cfg.type);
            }
            this.btn_challenge.redPoint.visible = showHint;

            let layer = info && info.layer || 1;
            let chineseNum = StringUtil.getCNBynumber(layer);
            this.lb_lvname.text = StringUtil.substitute(getLanById(LanDef.xianlv_tips30), [cfg.name, chineseNum]);
            this.bar.show(info && info.left_hp || 100, 100, false, 0, false, ProgressBarType.Percent);

            let layerCfg = this._proxy.getSceneConfig(cfg.type, layer);
            this._listData.replaceAll(layerCfg.big_reward);
        }

        private onClickChallenge(): void {
            let type = this.data.type;
            if (this._isReward) {
                this._proxy.c2s_shilian_get_reward(type);
                return;
            }
            if (this._proxy.canChallenge(type, true)) {
                this._proxy.c2s_challenge_shilian(type);
            }
        }

        private onClickSaodang(): void {
            facade.showView(ModName.Xianyuan, XianyuanViewType.ShilianSaodang, this.data);
        }

        private onClickReward(): void {
            let cfg = this._proxy.getSceneConfig(this.data.type);
            ViewMgr.getIns().showBoxReward('', cfg.big_reward);
        }

        //奖励界面
        private rewardView(): void {
            this.scroller.visible = true;
            this.btn_saodang.visible = false;
            this.gr_challenge.visible = false;

            this.btn_challenge.label = '领取';
            this.btn_challenge.y = 82;
        }

        //挑战界面
        private challengeView(): void {
            this.scroller.visible = false;
            this.btn_saodang.visible = false;
            this.gr_challenge.visible = true;

            this.btn_challenge.label = '挑战';
            this.btn_challenge.y = 82;
        }

        //扫荡界面
        private sweepView(): void {
            this.scroller.visible = false;
            this.gr_challenge.visible = true;

            this.btn_challenge.label = '挑战';
            this.btn_challenge.y = 111;
            this.btn_saodang.visible = true;
            this.btn_saodang.y = 45;
        }
    }
}