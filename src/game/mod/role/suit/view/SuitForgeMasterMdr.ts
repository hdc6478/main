namespace game.mod.role {


    //锻造界面的锻造大师，只有SuitType3有
    export class SuitForgeMasterMdr extends MdrBase {
        private _view: SuitForgeMasterView = this.mark("_view", SuitForgeMasterView);
        private _proxy: SuitProxy;
        _showArgs: SuitType;

        public constructor() {
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
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let minLv = this._proxy.getMasterLv();//最低锻造等级
            this._view.lb_name.text = `神装锻造 ${minLv}阶`;

            let val = this._proxy.getShenZhuangVal();//神装属性万分比
            let attr = this._proxy.getAttrByTypeAndOperType(SuitType.HaoTian, SuitOperType.DuanZao);
            attr = TextUtil.calcAttr(attr, 1 + val / 10000);

            this._view.descItem0.updateShow(TextUtil.getAttrTextAdd(attr), `当前阶段  ` + TextUtil.addColor('神装属性', BlackColor.WHITE)
                + TextUtil.addColor(`+${(val / 10000).toFixed(1)}%`, BlackColor.GREEN));
            this._view.power.setPowerValue(attr && attr.showpower && attr.showpower || 0);

            //满阶
            let paramCfg = GameConfig.getParamConfigById('suit_forge_master');
            if (minLv >= paramCfg.value.length) {
                this._view.descItem1.visible = false;
                return;
            }

            this._view.descItem1.visible = true;
            let nextLv = minLv + 1;
            let infos = this._proxy.getSuitOperInfo(SuitType.HaoTian, SuitOperType.DuanZao);
            let satisfyCnt = 0;
            if (infos && infos.attr_list) {
                for (let item of infos.attr_list) {
                    if (item && item.lv >= nextLv) {
                        satisfyCnt++;
                    }
                }
            }
            let nextVal = paramCfg.value[nextLv];
            let str = `下一阶段 ` + TextUtil.addColor(`全部装备锻造达到${nextLv}阶`, BlackColor.WHITE)
                + TextUtil.addColor(`(${satisfyCnt}/${SuitEquipPosAry1.length})`, BlackColor.RED);
            this._view.descItem1.updateShow(TextUtil.addColor(`神装属性+${(nextVal / 10000).toFixed(1)}%`, BlackColor.GRAY), str);
        }
    }
}