namespace game.mod.xianyuan {

    export class XianlvZhaohuanView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.XianlvZhaohuanSkin";
        }
    }

    export class XianlvZhaohuanItem extends BaseRenderer {
        public img_bg: eui.Image;
        public btn: game.mod.Btn;

        data: IXianlvZhaohuanData;
        private _proxy: XianlvProxy;

        constructor() {
            super();
            this.skinName = `skins.xianyuan.XianlvZhaohuanItemSkin`;
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Xianyuan, ProxyType.Xianlv);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_bg.source = ResUtil.getUiPng(`zhaohuan_bg${data.oper}`);
            this.btn.setPriceCost(data.cost);
            this.btn.setHint(BagUtil.checkPropCnt(data.cost[0], data.cost[1]));

            this.removeAllEffects();
            this.addEftByParentScale(this.btn.group_eft);
        }

        private onClick(): void {
            if (this._proxy.canZhaohuanByOper(this.data.oper, true)) {
                this._proxy.c2s_xianlv_choujiang(this.data.oper);
            }
        }
    }

    export interface IXianlvZhaohuanData {
        cost: number[];
        hint: boolean;
        oper: number;//低级1，高级2
    }
}