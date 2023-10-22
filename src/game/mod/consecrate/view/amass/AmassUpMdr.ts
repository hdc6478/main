namespace game.mod.consecrate {

    import AmassConfig = game.config.AmassConfig;
    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import AmassSuitConfig = game.config.AmassSuitConfig;
    import SuitEffectConfig = game.config.SuitEffectConfig;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;

    export class AmassUpMdr extends EffectMdrBase {
        private _view: AmassUpView = this.mark("_view", AmassUpView);
        private _proxy: ConsecrateProxy;
        protected _showArgs: {classId: number, cfg: AmassConfig};
        private _classId: number;
        private _cfg: AmassConfig;
        private _lv: number;
        private _cost: number[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Consecrate);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);

            this.onNt(ConsecrateEvent.ON_UPDATE_AMASS_INFO, this.onInfoUpdate, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE, this.onBagUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._classId = this._showArgs.classId;
            this._cfg = this._showArgs.cfg;
            this.initShow();
            this.updateShow();
            this.updatePower();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickUp(): void {
            if (!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            let index = this._cfg.index;
            this._proxy.c2s_amass_advance(this._classId, AmassOpType.Up, index);
        }

        private onInfoUpdate(): void {
            this.updateShow();
            this.updatePower();
        }

        /** 通用背包事件监听 */
        private onBagUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if(types.indexOf(PropType.Amass) < 0){
                return;
            }
            this.updateShow();
        }

        private initShow(): void {
            let index = this._cfg.index;
            let propCfg: PropConfig = GameConfig.getPropConfigById(index);
            let bgStr = ResUtil.getBigIcon(propCfg.icon);
            this._view.img_bg.source = ResUtil.getUiPng(bgStr);

            this._view.lab_name.text = this._cfg.name;
            this._view.lab_name.textColor = ColorUtil.getColorByQuality2(propCfg.quality);

            this._view.lab_desc.textFlow = TextUtil.parseHtml(this._cfg.desc);
        }

        private updateShow(): void {
            let index = this._cfg.index;
            let lv = this._proxy.getAmassLv(index);
            this._lv = lv;
            let stageStr = ResUtil.getChineseFontStr(lv) + "j";
            this.addBmpFont(stageStr, BmpTextCfg[BmpTextType.Stage], this._view.grp_lv, false, 1, true);

            let maxLv = this._cfg.cost_num.length;
            let isMax = lv >= maxLv;//已满级
            this._view.currentState = isMax ? "max" : "default";
            let costCnt = isMax ? 1 : this._cfg.cost_num[lv];//升级消耗
            this._cost = [index, costCnt];
            this._view.icon.setData(index);
            this._view.icon.updateCostLab(this._cost);

            let cnt = BagUtil.getPropCntByIdx(index);
            this._view.bar.show(cnt, costCnt, false, 0, false);
            this._view.btn_up.redPoint.visible = this._proxy.canAmassItemUp(index);
            this._view.btn_up.labelDisplay.text = lv > 0 ?  getLanById(LanDef.rank_up) : getLanById(LanDef.active);
        }

        private updatePower(): void {
            let pos = this._lv > 0 ? this._lv - 1 : 0;
            let attrId = this._cfg.attr_id[pos];//属性id
            let attr = RoleUtil.getAttr(attrId);
            let power = attr && attr.showpower ? attr.showpower.toNumber() : 0;//属性战力
            let addVal = 0;
            //套装加成
            let curVal = this._proxy.getAmassActNum(this._classId, this._cfg.type);//已激活数量
            let cfg: AmassSuitConfig = getConfigByNameId(ConfigName.AmassSuit, this._cfg.type);
            for(let info of cfg.suit) {
                let needCnt = info[0];
                let suitId = info[1];
                if(needCnt > curVal){
                    break;
                }
                let suitCfg: SuitEffectConfig = getConfigByNameId(ConfigName.SuitEffect, suitId);
                if(suitCfg.type == AmassSuitType.PowerAdd){
                    //战力加成
                    addVal += suitCfg.effect_value[0][0];//万分比
                }
            }
            if(addVal){
                power += Math.round(addVal / 10000 * power);
            }
            this._view.power.setPowerValue(power);
        }
    }
}