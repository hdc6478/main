namespace game.mod.more {

    import Pool = base.Pool;
    import BaseBmpNum = game.scene.BaseBmpNum;
    import BattleFigureConfig = game.config.BattleFigureConfig;

    export class TBSTxtMgr {
        private static _instance: TBSTxtMgr;

        public static getIns(): TBSTxtMgr {
            if (!this._instance) {
                this._instance = new TBSTxtMgr();
            }
            return this._instance;
        }

        /**
         * @param {string} dmgStr 伤害文本
         * @param {egret.DisplayObjectContainer} display 添加到对象
         * @param {number} x
         * @param {number} y
         * @param {number} dir 1右飘2左飘
         * */
        public show(dmgStr: string, display: egret.DisplayObjectContainer, x: number = 0, y: number = 0, dir: number = 1): void {
            let type: number = 1;
            let cfg: BattleFigureConfig = getConfigByNameId(ConfigName.BattleFigure, type);
            let bmp: BaseBmpNum = Pool.alloc(BaseBmpNum);
            display.addChild(bmp.dsp);

            let atcObj = JSON.parse(cfg.act_json);
            bmp.setText(dmgStr, x, y, dir, type, cfg.font_name, atcObj.total, cfg.has_word, false);
            bmp.showTween();
        }
    }

}