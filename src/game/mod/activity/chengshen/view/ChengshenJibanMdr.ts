namespace game.mod.activity {

    import ParamConfig = game.config.ParamConfig;
    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;

    export class ChengshenJibanMdr extends MdrBase {
        private _view: ChengshenJibanView = this.mark("_view", ChengshenJibanView);
        private _proxy: ChengshenProxy;
        private _indexList: number[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Chengshen);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.item0, TouchEvent.TOUCH_TAP, this.onClickItem0, this);
            addEventListener(this._view.item1, TouchEvent.TOUCH_TAP, this.onClickItem1, this);

            this.onNt(ActivityEvent.ON_ACTIVITY_ICON_HIDE, this.onActivityIconHide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onActivityIconHide(n: GameNT): void {
            let id: number = n.body;
            if (id == BtnIconId.Chengshen) {
                this.hide();
            }
        }

        private onClickItem0(): void {
            ViewMgr.getIns().showPropTips(this._indexList[0]);
        }

        private onClickItem1(): void {
            ViewMgr.getIns().showPropTips(this._indexList[1]);
        }

        private initShow(): void {
            this._indexList = [];
            let paramCfg: ParamConfig = GameConfig.getParamConfigById("chengshen_rewards");
            let infos: number[][] = paramCfg.value;
            for(let i = 0; i < infos.length && i < 2; ++i){
                let reward = infos[i];
                let propIndex = reward[0];
                this._indexList.push(propIndex);

                let cfg: PropConfig = GameConfig.getPropConfigById(propIndex);
                let index = cfg.param1 ? cfg.param1[0][0] : 0;
                let surfaceCfg: PropConfig = GameConfig.getPropConfigById(index);
                let item = this._view["item" + i] as AvatarBaseItem;
                item.setData(surfaceCfg);

            }
        }
    }
}