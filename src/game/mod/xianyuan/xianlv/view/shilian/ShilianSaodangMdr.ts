namespace game.mod.xianyuan {

    import XianlvShilianFubenConfig = game.config.XianlvShilianFubenConfig;
    import Monster1Config = game.config.Monster1Config;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class ShilianSaodangMdr extends MdrBase {
        private _view: ShilianSaodangView = this.mark("_view", ShilianSaodangView);
        private _proxy: XianlvShilianProxy;
        private _listData: eui.ArrayCollection;
        protected _showArgs: XianlvShilianFubenConfig;
        private _cnt = 0;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianlvShilian);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.secondPop.updateBgSrc(ResUtil.getUiJpg('xianlv_beijingtu6'));
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickDo, this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateSweepView, this);
            this.onNt(ActivityEvent.ON_BTN_BUY_CNT_POST, this.onUpdateSweepCnt, this);
            this.onNt(XianyuanEvent.ON_UPDATE_SHILIAN_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.secondPop.updateTitleStr(this._showArgs.name);
            this.updateView();
            this.updateSweepView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            let info = this._proxy.getInfo(this._showArgs.type);
            if (info && info.status == 1) {
                this.hide();
                return;
            }
            this._cnt = 0;//重置次数
            this.updateView();
            this.updateSweepView();
        }

        private updateView(): void {
            let monsterId = this._showArgs.bossId[0][0];
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterId);
            if (!monsterCfg) {
                return;
            }
            this._view.img_icon.source = monsterCfg.res_id;
            let info = this._proxy.getInfo(this._showArgs.type);
            let layer = info && info.layer || 1;
            let leftHp = info && info.left_hp || 100;
            this._view.lb_layer.text = StringUtil.substitute(getLanById(LanDef.xianlv_tips30), [this._showArgs.name, layer]);
            this._view.bar.show(leftHp, 100, false, 0, false, ProgressBarType.Percent);
            let recordStr = TextUtil.addColor(StringUtil.getHurtNumStr(info && info.max_damage_record || 0), 0xf9de41);
            let str = StringUtil.substitute(getLanById(LanDef.xianlv_tips31), [recordStr]);
            this._view.lb_record.textFlow = TextUtil.parseHtml(str);

            let sceneCfg = this._proxy.getSceneConfig(this._showArgs.type);
            if (!sceneCfg) {
                return;
            }
            this._listData.replaceAll(sceneCfg.big_reward);
        }

        private updateSweepView(): void {
            let sweepCnt = this.getRealSweepCnt();
            this._view.btnListView.setMaxCnt(sweepCnt);
            let cnt = 0;
            if (sweepCnt) {
                cnt = 1;
            }
            this.updateSweetCost(cnt);
        }

        private updateSweetCost(cnt = 0): void {
            this._cnt = cnt;
            let cost = this._proxy.getChallengeCost();
            this._view.btnListView.setCostCnt(cost[0], cnt, null);
            let leftDamage = this.getMonsterLeftHp();
            let singleDamage = this.getSingleSweepDamage();
            let realDamage = Math.min(cnt * singleDamage, leftDamage);
            let str = StringUtil.substitute(getLanById(LanDef.xianlv_tips32), [TextUtil.addColor(realDamage + '', 0x238e2c)]);
            this._view.lb_hurt.textFlow = TextUtil.parseHtml(str);
        }

        private onUpdateSweepCnt(n: GameNT): void {
            let cnt = n.body as number;
            this.updateSweetCost(cnt);
        }

        //获取boss血量
        private getMonsterHp(): number {
            let cfg = this._proxy.getSceneConfig(this._showArgs.type);
            if (!cfg) {
                return 0;
            }
            let attr = RoleUtil.getAttr(cfg.attr_id);
            if (attr && attr.max_hp) {
                return attr.max_hp.toNumber();
            }
            return 0;
        }

        //boss剩余血量 todo
        private getMonsterLeftHp(): number {
            let info = this._proxy.getInfo(this._showArgs.type);
            let leftHp = info && info.left_hp || 1;
            let maxHp = this.getMonsterHp();
            return Math.floor(maxHp * leftHp);
        }

        //扫荡一次的伤害
        private getSingleSweepDamage(): number {
            let info = this._proxy.getInfo(this._showArgs.type);
            return info && info.max_damage_record || 1;
        }

        //杀死boss所需扫荡次数，Math.ceil(剩余血量/一次扫荡伤害)
        private getLeftSweepCnt(): number {
            let hp = this.getMonsterHp();
            let singleDamage = this.getSingleSweepDamage();
            return Math.ceil(hp / singleDamage);
        }

        private getRealSweepCnt(): number {
            let leftCnt = this.getLeftSweepCnt();
            let cost = this._proxy.getChallengeCost();
            let bagCnt = BagUtil.getPropCntByIdx(cost[0]);
            let needCnt = Math.floor(bagCnt / cost[1]);
            return Math.min(leftCnt, needCnt);
        }

        private onClickDo(): void {
            if (this._cnt > 0) {
                this._proxy.c2s_shilian_sweep(this._showArgs.type, this._cnt);
            } else {
                let cost = this._proxy.getChallengeCost();
                BagUtil.checkPropCntUp(cost[0], cost[1]);
            }
        }
    }
}