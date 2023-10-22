namespace game.mod.union {

    import BitmapFillMode = egret.BitmapFillMode;
    import Monster1Config = game.config.Monster1Config;

    export class UnionBossHpItem extends BaseRenderer {

        private img_hp1: eui.Image;
        private img_mask: eui.Image;
        private img_bai: eui.Image;
        private img_hp0: eui.Image;
        private img_icon: eui.Image;
        private lab_name: eui.Label;
        private lab_hp: eui.Label;
        public btn_reward: Btn;

        public data: { index: number, hp: number, boss_hp: number };
        private _proxy: UnionProxy;

        protected onAddToStage(): void {
            // this.touchEnabled = false;
            this._proxy = getProxy(ModName.Union, ProxyType.Union);
            this.img_hp0.fillMode = this.img_mask.fillMode = this.img_bai.fillMode = BitmapFillMode.REPEAT;

            this.touchEnabled = true;
            this.btn_reward.visible = true;
            // this.lab_hp.text = "";
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg: Monster1Config = getConfigByNameId(ConfigName.Monster, this.data.index);
            this.lab_name.text = cfg.name;
            this.img_icon.source = cfg.res_id;

            let _per: number = this.data.hp / this.data.boss_hp;
            let _cur: number = 1;

            this.img_hp0.width = this.img_mask.width = this.img_bai.width = _per * 321;
            this.img_bai.alpha = 1;
            // self._lastNum = _cur;

            this.lab_hp.text = `${Math.ceil(_per * 100)}%`;

            let _line: number = _cur % 10;//Math.max(0, self._maxLine - _cur);
            this.img_hp0.source = this.img_mask.source = "boss_hp" + (_line > 0 ? 10 - _line : 0);
            _line = _line > 0 ? _line - 1 : 9;
            this.img_hp1.source = _cur == 1 ? "" : "boss_hp" + (_line > 0 ? 10 - _line : 0);
        }

        public setData(data: { index: number, hp: number, boss_hp: number }): void {
            this.data = data;
        }
    }
}
