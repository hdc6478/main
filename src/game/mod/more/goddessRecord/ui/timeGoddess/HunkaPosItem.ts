namespace game.mod.more {

    import facade = base.facade;
    import PropConfig = game.config.PropConfig;
    import Tween = base.Tween;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;
    import prop_attributes = msg.prop_attributes;

    export class HunkaPosItem extends BaseRenderer {

        private img_icon: eui.Image;
        private redPoint: eui.Image;

        public data: number;//部位
        private _proxy: GoddessRecordProxy;
        private _isLock: boolean;
        private _isAdd: boolean;
        private _posY: number = 0;
        private _prop: prop_attributes;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);

            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let pos = this.data;
            let type = this._proxy.hunkaType;
            let posInfo = this._proxy.getHunkaPosInfo(type, pos);
            this._isLock = !posInfo;//取不到表示未解锁
            if(this._isLock){
                this.currentState = "lock";
            }
            else {
                let prop = posInfo && posInfo.hunka;
                this._prop = prop;
                this._isAdd = !prop || !prop.index;//没有穿戴
                if(this._isAdd){
                    this.currentState = "add";
                    this.removeTween();
                }
                else {
                    this.currentState = "icon";
                    let propData = PropData.fromData(prop);
                    let cfg = propData.cfg as PropConfig;
                    this.img_icon.source = ResUtil.getBigIcon(cfg.icon);
                    this.playTween();
                }
            }
            this.redPoint.visible = this._proxy.getHunkaPosHint(type, pos);
        }

        private onClick(): void {
            if(!this.data){
                return;
            }

            let type = this._proxy.hunkaType;
            if(this._isLock){
                let minPos = this._proxy.getMinPos(type);
                //未解锁
                if(!this._proxy.isPosLimitOpen(type, minPos, true)){
                    return;
                }
                let cost = this._proxy.getPosOpenCost(type, minPos);
                if(!cost){
                    this._proxy.c2s_chuang_shi_nv_shen_hun_ka_click(HunkaOpType.Open, type, minPos);//没有配置消耗的，直接解锁
                    return;
                }
                let costIndex = cost[0];
                let costCnt = cost[1];
                let costCfg: PropConfig = GameConfig.getPropConfigById(costIndex);
                let costStr = TextUtil.addColor(costCnt + costCfg.name, WhiteColor.GREEN);
                let tips = StringUtil.substitute(getLanById(LanDef.hunka_tips9), [costStr]);
                //解锁提示
                ViewMgr.getIns().showConfirm(tips, Handler.alloc(this, () => {
                    this._proxy.c2s_chuang_shi_nv_shen_hun_ka_click(HunkaOpType.Open, type, minPos);
                }));
            }
            else {
                let pos = this.data;
                this._proxy.hunkaSelPos = pos;
                if(this._isAdd){
                    this._proxy.hunkaBagOpenType = HunkaBagOpenType.Wear;
                    ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.HunkaBag, type);
                }
                else {
                    facade.showView(ModName.More, MoreViewType.HunkaTips, this._prop);
                }
            }
        }

        private playTween(): void {
            this.removeTween();
            this.img_icon.y = this._posY;
            Tween.get(this.img_icon, {loop: true})
                .to({y: this._posY - 15}, 1000)
                .to({y: this._posY}, 1000);
        }

        public removeTween(): void {
            Tween.remove(this.img_icon);
        }

        public setData(pos: number): void {
            this.data = pos;
        }
    }

}