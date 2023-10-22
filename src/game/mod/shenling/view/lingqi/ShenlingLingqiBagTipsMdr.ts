namespace game.mod.shenling {


    import EquipmentConfig = game.config.EquipmentConfig;

    export class ShenlingLingqiBagTipsMdr extends ShenLingLingQiTipsMdr {

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.ShenlingLingqi);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            this._view.currentState = 'bag';
        }

        protected onHide(): void {
            super.onHide();
        }

        protected updateView() {
            //灵器index，_showArgs是PropData
            let index = this._showArgs.index;
            let equipCfg: EquipmentConfig = GameConfig.getEquipmentCfg(index);
            if (!equipCfg) {
                return;
            }
            let slIndex = equipCfg.parm1 && equipCfg.parm1[0] || 0;
            if (!slIndex) {
                DEBUG && console.error(`灵器 ${index} 没有配置对应的神灵ID`);
                return;
            }
            let lingqiCfg = this._proxy.getLingQiCfg(slIndex, 1);
            if (!lingqiCfg) {
                return;
            }
            this._showArgs = {
                slIndex,
                index,
                idx: this._proxy.getLingqiIdx(index),
                hint: false,
                isAct: true,
                star: 0
            };
            this.updateTopView();
            this.updateMiddleView();

            this._view.descItem.updateShow(equipCfg.desc || '');

            if (this._view.basePropGainList) {
                this._view.basePropGainList.updateShow(equipCfg.gain_id);
            }
        }
    }
}