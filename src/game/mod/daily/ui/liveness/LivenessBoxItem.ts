namespace game.mod.daily {

    import ActiveAwardConfig = game.config.ActiveAwardConfig;

    export class LivenessBoxItem extends eui.Component {

        public btn_box: game.mod.Btn;
        public lab_value: eui.Label;
        public redPoint: eui.Image;
        public img_got: eui.Image;

        private _awdCfg: ActiveAwardConfig;
        private _isGot: boolean = false;
        private _isCanGet: boolean = false;

        constructor() {
            super();
            this.skinName = "skins.daily.LivenessBoxItemSkin";
        }

        public setRewardBox(cfg: ActiveAwardConfig, curExp: number, isGot0: boolean) {
            this._awdCfg = cfg;
            this.btn_box.icon = "baoxiang" + cfg.index;
            this.lab_value.text = cfg.activation + "";
            
            this._isGot = isGot0;
            this._isCanGet = isGot0 ? false : curExp >= this._awdCfg.activation;
            this.img_got.visible = isGot0;
            this.redPoint.visible = this._isCanGet;
        }

        public get isGot() {
            return this._isGot;
        }

        public get isCanGet() {
            return this._isCanGet;
        }

        public get cfg() {
            return this._awdCfg;
        }
        
    }
}