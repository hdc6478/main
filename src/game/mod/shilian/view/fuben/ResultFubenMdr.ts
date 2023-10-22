namespace game.mod.shilian {

    import s2c_instance_fin = msg.s2c_instance_fin;
    import PropConfig = game.config.PropConfig;
    import Handler = base.Handler;

    export class ResultFubenMdr extends EffectMdrBase{

        private _view: ResultFubenView = this.mark("_view", ResultFubenView);
        protected _showArgs: s2c_instance_fin;

        private _proxy: ShilianProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();

            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Shilian);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();

            this.updateShow();
            this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
        }

        protected onHide(): void {
            if(SceneUtil.getCurSceneType() == SceneType.Fuben){
                SceneUtil.exitScene();
            }
            super.onHide();
            this.sendNt(RoleEvent.ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT);
        }

        private updateShow(): void {
            let rewardInfo = this._showArgs;
            // 1:区分扫荡或者挑战(0扫荡，1挑战)
            // 2:总的货币数量
            // 3:特权加成数量
            // 4:历史最高层
            let maxLv = rewardInfo.params && rewardInfo.params.length && rewardInfo.params.length > 3 ? rewardInfo.params[3] : 0;

            let lvStr = maxLv + "";
            this.addBmpFont(lvStr, BmpTextCfg[BmpTextType.Layer], this._view.grp_lv, true, 0.7);
            this.addBmpFont(lvStr, BmpTextCfg[BmpTextType.Layer], this._view.grp_maxLv, true, 0.7);

            let cnt = rewardInfo.params && rewardInfo.params.length && rewardInfo.params.length > 1 ? rewardInfo.params[1] : 0;
            let addCnt = rewardInfo.params && rewardInfo.params.length && rewardInfo.params.length > 2 ? rewardInfo.params[2] : 0;
            let index = this._proxy.getPropIndex(this._proxy.selType);
            let cfg: PropConfig = GameConfig.getPropConfigById(index);
            let cntStr = "基础" + cfg.name + "  " + TextUtil.addColor("+" + StringUtil.getHurtNumStr(cnt), BlackColor.GREEN);
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
            let addStr = "特权加成  " + TextUtil.addColor("+" + StringUtil.getHurtNumStr(addCnt), BlackColor.GREEN);
            this._view.lab_add.textFlow = TextUtil.parseHtml(addStr);
        }
    }
}

