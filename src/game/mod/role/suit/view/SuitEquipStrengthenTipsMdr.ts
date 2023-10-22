namespace game.mod.role {

    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class SuitEquipStrengthenTipsMdr extends MdrBase {
        private _view: SuitEquipTipsView = this.mark("_view", SuitEquipTipsView);
        private _proxy: SuitProxy;
        _showArgs: ISuitIconData;

        private _descItem0: BaseDescItem;
        private _attrItem3: BaseAttrItemAdd;
        private _descItem1: BaseDescItem;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
            this._view.gr_up.visible = this._view.img_line.visible = true;
            this._view.gr_act.visible = false;
            if (!this._descItem0) {
                this._descItem0 = new BaseDescItem();
                this._view.gr_attr.addChild(this._descItem0);
            }
            if (!this._attrItem3) {
                this._attrItem3 = new BaseAttrItemAdd();
                this._view.gr_attr.addChild(this._attrItem3);
            }
            if (!this._descItem1) {
                this._descItem1 = new BaseDescItem();
                this._view.gr_attr.addChild(this._descItem1);
            }
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(SuitEvent.ON_SUIT_EQUIP_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            let data = this._showArgs;
            if (!data) {
                return;
            }
            this.updateView();
        }

        private updateView(): void {
            let data = this._showArgs;
            let equip = this._proxy.getPosEquipInfo(data.type, data.pos);
            if (!equip) {
                return;
            }
            this._view.tips.updateShow(data.index);
            this._view.power.setPowerValue(equip.attr && equip.attr.showpower ? equip.attr.showpower : 0);
            this._descItem0.updateShow(TextUtil.getAttrTextAdd(equip.attr), getLanById(LanDef.base_attr));

            this._attrItem3.updateShow(equip.lv_attr, equip.next_lv_attr, '强化属性');

            let cost: number[] = this._proxy.getCost(data.type, null, equip ? equip.level : 0);
            //没有下一级消耗表示满级，读取上一级消耗展示
            if (!cost) {
                cost = this._proxy.getCost(data.type, null, equip ? equip.level - 1 : 0);
            }
            this._view.costItem.updateShow(cost);
            this._view.btn_up.setHint(this._proxy.canStrengthen(data.type, data.pos));

            this.updateSuitAttr();
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
            this._descItem1.updateShow(str, `${minLv}阶${SuitTypeName[this._showArgs.type]}套装(${satisfyCnt}/${SuitEquipPosAry.length})`);
        }

        private onClick(): void {
            if (!this._proxy.canStrengthen(this._showArgs.type, this._showArgs.pos, true)) {
                return;
            }
            this._proxy.c2s_suit_equip_lvup(0, this._showArgs.type, this._showArgs.pos);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}