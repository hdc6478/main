namespace game.mod.xianyuan {

    export class RingItem extends BaseListenerRenderer {
        public img_icon: eui.Image;

        private _proxy: RingProxy;

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Xianyuan, ProxyType.Ring);
        }

        protected dataChanged() {
            let lv = this.itemIndex + 1;

            let curLv = this._proxy.getStage();
            let perLv = this._proxy.getStagePerLv();
            if (curLv != 0) {
                curLv = curLv % perLv ? curLv % perLv : perLv;
            }
            this.img_icon.source = curLv >= lv ? 'lv_icon_404' : 'lv_icon_gray_404';//todo
        }
    }

}