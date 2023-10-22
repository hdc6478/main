namespace game.mod.yishou {

    import LanDef = game.localization.LanDef;
    import EquipmentConfig = game.config.EquipmentConfig;
    import attributes = msg.attributes;

    export class YishouShoulingEquipTipsBagMdr extends MdrBase {
        private _view: YishouShoulingEquipTipsBagView = this.mark("_view", YishouShoulingEquipTipsBagView);
        private _proxy: YishouProxy;
        _showArgs: PropData;

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
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
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

        private updateView(): void {
            let data = this._showArgs;
            let equipCfg: EquipmentConfig = data.cfg;
            if (!equipCfg) {
                return;
            }

            this.updateTopView();
            this.updateBaseAttr();
            this.updateSuitAttr();

            //道具描述
            this._view.descItem1.updateShow(equipCfg.desc);
            //获取途径
            this._view.gainItem.updateShow(equipCfg.gain_id);
        }

        private getAttr(): attributes {
            let data = this._showArgs;
            let attr = data && data.regular_attrs ? data.regular_attrs : null;
            if (!attr) {
                //没有就获取一星的属性展示
                let shoulingIndex = data.cfg.parm1[0];
                let cfg = this._proxy.getShoulingEquipCfg(shoulingIndex, 1);
                let attrId = cfg ? cfg.attr : 0;
                attr = RoleUtil.getAttr(attrId);
            }
            return attr;
        }

        private updateTopView(): void {
            let data = this._showArgs;
            this._view.propTips.updateShow(data.index);

            let bagCnt = BagUtil.getPropCntByIdx(data.index);
            this._view.lb_cnt.text = StringUtil.substitute(getLanById(LanDef.yysl1), [bagCnt]);
        }

        //基础属性
        private updateBaseAttr(): void {
            let attr = this.getAttr();

            let power = attr && attr.showpower ? attr.showpower : 0;
            this._view.power.setPowerValue(power);

            let attrStr = TextUtil.getAttrTextAdd(attr, BlackColor.GREEN);
            this._view.descItem.updateShow(attrStr, getLanById(LanDef.base_attr));
        }

        //套装效果
        private updateSuitAttr(): void {
            let data = this._showArgs;
            let equipCfg: EquipmentConfig = data.cfg;
            let shoulingIndex = equipCfg.parm1[0];
            if (!shoulingIndex) {
                return;
            }
            let shoulingEquipcfg = this._proxy.getShoulingEquipCfg(shoulingIndex, 1);
            let info = this._proxy.getShoulingInfo(shoulingIndex);
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
                let desc = equipCfg.name + '(' + getLanById(LanDef.not_active) + ')';
                if (equipInfo) {
                    color = BlackColor.GREEN;
                    desc = equipCfg.name + `(${equipInfo.star + getLanById(LanDef.soul2)})`;
                }
                desc = TextUtil.addColor(desc, color);
                descList.push(desc);
            }
            this._view.descList.updateShow(descList, getLanById(LanDef.bagua_txt3) + `(${actedCnt}/${totalCnt})`);

            let specialDesc = this._proxy.getSpecialAttrDesc(shoulingIndex);
            this._view.lb_specialattr.textFlow = TextUtil.parseHtml(specialDesc);
        }

        //前往兽灵界面
        private onClick(): void {
            ViewMgr.getIns().showView(ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouling);
            this.hide();
        }
    }
}