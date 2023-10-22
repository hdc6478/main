namespace game.mod.yishou {

    import LanDef = game.localization.LanDef;

    export class YishouShoulingEquipTipsMdr extends MdrBase {
        private _view: YishouShoulingEquipTipsView = this.mark("_view", YishouShoulingEquipTipsView);
        private _proxy: YishouProxy;

        _showArgs: IYishouShoulingEquipIconData;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yishou);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateBaseAttr, this);
            this.onNt(YishouEvent.ON_UPDATE_YISHOU_SHOULING_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            let data = this._showArgs;
            let info = this._proxy.getShoulingEquipInfo(data.index, data.equipId);
            data.star = info && info.star || 0;//修改星星等级

            this.updateView();
        }

        private updateView(): void {
            this.updateTopView();
            this.updateBaseAttr();
            this.updateSuitAttr();
            this.updateCost();
        }

        private updateTopView(): void {
            let data = this._showArgs;
            let equipId = data.equipId;
            let prop = PropData.create(equipId, 1, IconShowType.NotTips);
            this._view.propTips.updateShow(prop, data.star);
        }

        //基础属性
        private updateBaseAttr(): void {
            let data = this._showArgs;
            let star = data.star || 1;
            let cfg = this._proxy.getShoulingEquipCfg(data.index, star);
            let attrId = cfg ? cfg.attr : 0;
            let attr = RoleUtil.getAttr(attrId);
            this._view.power.setPowerValue(attr && attr.showpower || 0);

            let attrStr = TextUtil.getAttrTextAdd(attr, BlackColor.GREEN);
            this._view.descItem.updateShow(attrStr, getLanById(LanDef.base_attr));
        }

        //套装效果
        private updateSuitAttr(): void {
            let data = this._showArgs;

            let shoulingEquipcfg = this._proxy.getShoulingEquipCfg(data.index, 1);
            let info = this._proxy.getShoulingInfo(data.index);
            let totalCnt = shoulingEquipcfg.cost.length;
            let actedCnt = info && info.list ? info.list.length : 0;

            let equipMap: { [index: number]: msg.yishou_shouling_data } = {};
            if (actedCnt) {
                for (let item of info.list) {
                    let id = item.index.toNumber();
                    equipMap[id] = item;
                }
            }

            let descList: string[] = [];
            for (let item of shoulingEquipcfg.cost) {
                let equipInfo = equipMap[item[0]];
                let equipCfg = GameConfig.getEquipmentCfg(item[0]);
                if (!equipCfg) {
                    continue;
                }
                let color = BlackColor.GRAY;
                let desc = equipCfg.name + '(未激活)';
                if (equipInfo) {
                    color = BlackColor.GREEN;
                    desc = equipCfg.name + `(${equipInfo.star}星)`;
                }
                desc = TextUtil.addColor(desc, color);
                descList.push(desc);
            }
            this._view.descList.updateShow(descList, `套装效果(${actedCnt}/${totalCnt})`);

            this._view.lb_specialattr.textFlow = TextUtil.parseHtml(this._proxy.getSpecialAttrDesc(data.index));
        }

        private updateCost(): void {
            let data = this._showArgs;
            let info = this._proxy.getShoulingEquipInfo(data.index, data.equipId);
            let star = (info && info.star || 0) + 1;
            let cfg = this._proxy.getShoulingEquipCfg(data.index, star);
            if (!cfg) {
                this._view.img_max.visible = true;
                this._view.icon_cost.visible = this._view.btn_do.visible = false;
                return;
            }

            this._view.img_max.visible = false;
            this._view.icon_cost.visible = this._view.btn_do.visible = true;

            let cost = cfg.cost[data.idx];
            this._view.icon_cost.data = cost;
            this._view.icon_cost.updateCostLab(cost);

            this._view.btn_do.label = info ? getLanById(LanDef.uplv) : getLanById(LanDef.active);
            this._view.btn_do.setHint(this._proxy.canShoulingEquipActOrUp(data.index, data.equipId));
        }

        private onClick(): void {
            let data = this._showArgs;
            if (this._proxy.canShoulingEquipActOrUp(data.index, data.equipId, true)) {
                this._proxy.c2s_yishou_shouling_up_level(data.index, data.equipId);
            }
        }
    }
}