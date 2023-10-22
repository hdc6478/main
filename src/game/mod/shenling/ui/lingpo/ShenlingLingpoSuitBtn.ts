namespace game.mod.shenling {

    import facade = base.facade;
    import GameNT = base.GameNT;

    export class ShenlingLingpoSuitBtn extends eui.Component {
        public img_icon: eui.Image;
        public gr_lv: eui.Group;
        public lb_num: eui.Label;
        public img_mask: eui.Image;

        private _proxy: ShenlingLingpoProxy;
        private _shape: egret.Shape;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingLingpoSuitBtnSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this._proxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingpo);

            this._shape = new egret.Shape();
            this._shape.x = this.width * 0.5;
            this._shape.y = this.height * 0.5;
            this.addChild(this._shape);

            this.img_mask.mask = this._shape;

            // facade.onNt('update_lingpo_cnt', this.onChange, this);
        }

        /**
         * @param type 神灵类型
         * @param id 灵魄id
         */
        public updateView(type: ShenLingType, id: number): void {
            this.lb_num.text = this._proxy.getSuitLevel(id) + '';
            let cfg = this._proxy.getTypeCfg(id);
            this.img_icon.source = cfg && cfg.icon ? `yuan_big_${cfg.icon}` : '';

            let nextLv = this._proxy.getSuitLevel(id) + 1;
            let cnt = this._proxy.getSuitLevelProgressCnt(id, nextLv);
            this.changeGraphics(cnt);
        }

        // private onChange(n: GameNT): void {
        //     let cnt = n.body as number;
        //     this.changeGraphics(cnt);
        // }

        private changeGraphics(cnt: number): void {
            let angle = cnt / LingPoMaxCnt * 360;

            let radius = this.height * 0.5;
            let shape = this._shape;
            shape.graphics.clear();
            shape.graphics.beginFill(0xffffff, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(0, this.height * 0.5);
            shape.graphics.drawArc(0, 0, radius, 90 * Math.PI / 180, (angle + 90) * Math.PI / 180, false);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
    }
}