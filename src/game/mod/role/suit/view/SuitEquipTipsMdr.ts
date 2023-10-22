namespace game.mod.role {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import attributes = msg.attributes;
    import suit_equip = msg.suit_equip;

    export class SuitEquipTipsMdr extends MdrBase {
        private _view: SuitEquipTipsView = this.mark("_view", SuitEquipTipsView);
        private _proxy: SuitProxy;
        private _suitEquip: suit_equip;

        private _descItem: BaseDescItem;//基础属性组件
        private _suitItem: BaseDescItem;//套装
        private _descItem2: BaseDescItem;//最高阶的套装属性

        _showArgs: ISuitIconData;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(SuitEvent.ON_SUIT_EQUIP_INFO_UPDATE, this.updateDressView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateStageDescItem, this);
        }

        protected onShow(): void {
            super.onShow();
            let data = this._showArgs;
            if (!data) {
                return;
            }
            if (!this._descItem) {
                this._descItem = new BaseDescItem();
                this._view.gr_attr.addChildAt(this._descItem, 0);
            }
            if (!this._suitItem) {
                this._suitItem = new BaseDescItem();
                this._view.gr_attr.addChild(this._suitItem);
            }
            if (!this._descItem2) {
                this._descItem2 = new BaseDescItem();
                this._view.gr_attr.addChild(this._descItem2);
            }
            this._suitEquip = this._proxy.getPosEquipInfo(data.type, data.pos);
            this.updateView();
        }

        private updateView(): void {
            let index = this._showArgs.index;
            let prop = PropData.create(index);
            this._view.icon_act.data = prop;
            this._view.tips.updateShow(prop);

            let attr: attributes;
            let power: number;
            if (this._suitEquip) {
                attr = this._suitEquip.attr;
                power = attr && attr.showpower && attr.showpower.toNumber() || 0;
            } else {
                attr = prop.regular_attrs;
                power = 0;
            }
            this._view.power.setPowerValue(power);
            this._descItem.updateShow(TextUtil.getAttrTextAdd(attr), getLanById(LanDef.ywl_baseAttr));

            this.switchState();

            this.updateSuitAttr();
            this.updateStageDescItem();
        }

        //更新套装装备激活
        private updateSuitAttr(): void {
            let info = this._proxy.getSuitTypeInfo(this._showArgs.type);//类型数据
            let minLv: number;
            let satisfyCnt = 0;
            let map = {};//每个部位阶数map
            let actCnt = 0;
            if (info && info.equips) {
                for (let item of info.equips) {
                    if (!minLv) {
                        minLv = item.stage;
                    }
                    minLv = Math.min(minLv, item.stage);
                    map[item.pos] = item.stage;
                    actCnt++;
                }
            }
            if (!minLv || actCnt != SuitEquipPosAry.length) {
                minLv = 1;
            }
            let str = '';
            for (let i = 0; i < SuitEquipPosAry.length; i++) {
                let pos = SuitEquipPosAry[i];
                if (map[pos] >= minLv) {
                    satisfyCnt++;
                }
                let equipCfg = this._proxy.getEquipCfg(this._showArgs.type, 1, pos);//1阶装备
                str += TextUtil.addColor(`[${minLv}阶]${equipCfg.name}`, map[pos] >= minLv ? BlackColor.GREEN : BlackColor.GRAY);
                if (i != SuitEquipPosAry.length - 1) {
                    str += '\n';
                }
            }
            this._suitItem.updateShow(str, `${minLv}阶${SuitTypeName[this._showArgs.type]}套装(${satisfyCnt}/${SuitEquipPosAry.length})`);
        }

        //最高阶的套装效果
        private updateStageDescItem(): void {
            if (!this._descItem2 || !this._descItem2.parent) {
                return;
            }
            let type = this._showArgs.type;
            let maxStage = this._proxy.getMaxStageByType(type);
            let maxStageCfg = this._proxy.getSuitStageCfg(type, maxStage);
            this._descItem2.updateShow(this._proxy.getBuffDesc(maxStageCfg.buff_id), `${SuitTypeName[type]}套装 ${maxStage}阶效果`);
        }

        private updateDressView(): void {
            let data = this._showArgs;
            this._suitEquip = this._proxy.getPosEquipInfo(data.type, data.pos);
            // 穿戴成功后，关闭此界面
            if (this._suitEquip && this._suitEquip.stage == 1) {
                this.hide();
                return;
            }
            this.switchState();
        }

        private switchState(): void {
            if (this._suitEquip) {
                this._view.gr_act.visible = this._view.gr_up.visible = this._view.img_line.visible = false;
            } else {
                this._view.gr_act.visible = this._view.img_line.visible = true;
                this._view.gr_up.visible = false;
                this._view.btn_act.setHint(this._proxy.canDress(this._showArgs.index));
            }
        }

        protected onHide(): void {
            super.onHide();
            this._suitEquip = null;
        }

        private onClick(): void {
            if (this._suitEquip && this._suitEquip.equipment_id) {
                return;
            }
            let args = this._showArgs;
            if (!this._proxy.canDress(args.index, true)) {
                return;
            }
            this._proxy.c2s_suit_equip_takeon(args.index, args.type, args.pos);
        }
    }
}