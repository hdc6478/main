namespace game.mod {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import HorseConfig = game.config.HorseConfig;
    import PropConfig = game.config.PropConfig;
    import Tween = base.Tween;

    export class SurfacePillItemRender extends BaseRenderer {
        private img_icon: eui.Image;
        private img_lock: eui.Image;
        private redPoint: eui.Image;
        private grp_cnt: eui.Group;
        private lab_cnt: eui.Label;
        private grp_eft: eui.Group;
        private grp_add: eui.Group;

        public data: number[];//炼神丹_max数量
        private _proxy: ISurfaceProxy;
        private _canUseCnt: number = 0;//可以使用的数量

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.removeTween();
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            if (!this._proxy) {
                this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            }
            let index = this.data[0];
            let maxCnt = this.data[1];
            let propCfg: PropConfig = GameConfig.getPropConfigById(index);
            let pos = propCfg.quality - 2;//品质3开始的
            this.img_icon.source = "hundan_" + this._proxy.headType + "_" + pos;

            let isAct = !!this._proxy.selData.star && !!maxCnt;
            this.img_lock.visible = !isAct;
            this.grp_cnt.visible = isAct;
            this.grp_add.removeChildren();
            this._canUseCnt = 0;
            if(isAct){
                let cfg: HorseConfig = this._proxy.selData.cfg;
                let useCnt = this._proxy.getPillUseCnt(cfg.index, index);
                this.lab_cnt.text = useCnt + "/" + maxCnt;
                let curCnt = BagUtil.getPropCntByIdx(index);
                this._canUseCnt = Math.min(curCnt, maxCnt - useCnt);
            }
            this.removeEft();
            this.removeTween();
            if(this._canUseCnt > 0){
                this.addBmpFont("+" + this._canUseCnt, BmpTextCfg[BmpTextType.PowerAdd2], this.grp_add, true, 0.5, true);
                this.grp_add.y = -5;
                Tween.get(this.grp_add, {loop: true})
                    .to({y: 5}, 500)
                    .to({y: -5}, 500);

                this.addEftByParent(UIEftSrc.SurfacePill, this.grp_eft);
            }
            this.redPoint.visible = this._canUseCnt > 0;
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            let index = this.data[0];
            if(!this._proxy.selData.star){
                //未解锁
                PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.lianshendan_tips), [1]));
            }
            else {
                if(this._canUseCnt){
                    //可以使用
                    let cfg: HorseConfig = this._proxy.selData.cfg;
                    this._proxy.c2s_lianshendan_swal(cfg.index, index);
                    return;
                }
            }
            facade.showView(ModName.Surface, SurfaceViewType.SurfacePillTips, {selData: this._proxy.selData, data: this.data})
        }

        private removeTween(): void {
            Tween.remove(this.grp_add)
        }
    }
}