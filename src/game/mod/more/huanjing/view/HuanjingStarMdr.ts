namespace game.mod.more {

    import BuffConfig = game.config.BuffConfig;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class HuanjingStarMdr extends MdrBase {
        private _view: HuanjingStarView = this.mark("_view", HuanjingStarView);
        private _proxy: HuanjingProxy;
        private _systemId: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.img_icon, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(MoreEvent.ON_UPDATE_HUANJING_INFO, this.updateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
        }

        protected onShow(): void {
            super.onShow();
            this._systemId = this._showArgs;
            if (!this._systemId) {
                return;
            }
            this._view.lb_desc.textFlow = TextUtil.parseHtml(getLanById(LanDef.huanjing_tips3));
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._systemId = null;
        }

        private updateView(): void {
            let starCfg = this._proxy.getStarCfg(this._systemId, 1, 1);
            let index = starCfg.cost[0][0];
            this._view.costIcon.updateIndex(index);
            let cnt = BagUtil.getPropCntByIdx(index);
            this._view.costIcon.setLabCost(cnt + '', cnt > 0 ? BlackColor.GREEN : BlackColor.RED);

            this._view.starComp.updateShow(this._systemId);
            this._view.lb_lv.text = this._proxy.getStarLv(this._systemId) + '阶';
            this._view.redPoint.visible = this._proxy.canActOrUpStar(this._systemId);

            this.updateSkillView();
            this.updatePower();
        }

        //todo
        private updateSkillView(): void {
            let lv = this._proxy.getStarLv(this._systemId);
            let isMax = this._proxy.isMaxStarLv(this._systemId);
            let cfg = this._proxy.getHuanjingParamCfg(this._systemId);
            let buffId = cfg.star_buff[lv == 0 ? lv : lv - 1];
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
            if (!buffCfg) {
                DEBUG && console.error(`没有 ${buffId} buff配置`);
                return;
            }

            this._view.img_icon.source = buffCfg.icon || 'linshijinengtu';//todo
            this._view.lb_skilldesc.textFlow = TextUtil.parseHtml(TextUtil.addColor(buffCfg.des, lv > 0 ? WhiteColor.DEFAULT : WhiteColor.GRAY));

            let actedNum = this._proxy.getStarActNum(this._systemId, lv + 1);
            let totalNum = cfg.star_max_pos;
            let actStr = TextUtil.addColor(`${actedNum}/${totalNum}`, actedNum >= totalNum ? WhiteColor.GREEN : WhiteColor.RED);
            let str = lv == 0
                ? buffCfg.name + StringUtil.substitute(getLanById(LanDef.huanjing_tips4), [actStr])
                : buffCfg.name + `${lv + 1}阶` + StringUtil.substitute(getLanById(LanDef.huanjing_tips5), [lv, actStr]);
            this._view.lb_name.textFlow = TextUtil.parseHtml(str);
        }

        private updatePower(): void {
            let attrList: number[] = [];
            let starList = this._proxy.getStarList(this._systemId);
            for (let item of starList) {
                if (item && item.star) {
                    let starCfg = this._proxy.getStarCfg(this._systemId, item.pos, item.star);
                    if (starCfg && starCfg.attr_id) {
                        attrList.push(starCfg.attr_id);
                    }
                }
            }
            let attrs = RoleUtil.getAttrList(attrList);
            let attr = TextUtil.calcAttrList(attrs);
            this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
        }

        private onClick(): void {
            facade.showView(ModName.More, MoreViewType.HuanjingStarStageTips, this._systemId);
        }
    }
}