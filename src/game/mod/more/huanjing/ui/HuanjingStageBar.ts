namespace game.mod.more {

    export class HuanjingStageBar extends eui.Component {
        public img_xian: eui.Image;
        public img0: eui.Image;
        public img1: eui.Image;
        public img2: eui.Image;
        public img3: eui.Image;
        public img4: eui.Image;
        public img5: eui.Image;
        public img6: eui.Image;
        public img7: eui.Image;
        public img8: eui.Image;
        public img9: eui.Image;

        private _singleBar = 40;// 40 * 9

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingStageBarSkin";
        }

        private _proxy: HuanjingProxy;

        updateShow(systemId: number): void {
            if (!this._proxy) {
                this._proxy = getProxy(ModName.More, ProxyType.Huanjing);
            }
            let stageLv = this._proxy.getStageLv(systemId);
            let lv = Math.max(stageLv - 1, 0) % 10;
            for (let i = 0; i <= 9; i++) {
                this[`img` + i].visible = stageLv != 0 && i <= lv;
            }
            if (stageLv != 0) {
                this.img_xian.width = lv * this._singleBar;
            } else {
                this.img_xian.width = 0;
            }
        }
    }
}