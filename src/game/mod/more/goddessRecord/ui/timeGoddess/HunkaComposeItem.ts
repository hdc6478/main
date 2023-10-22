namespace game.mod.more {

    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import PropConfig = game.config.PropConfig;

    export class HunkaComposeItem extends BaseRenderer {
        private redPoint: eui.Image;
        private lab_name: eui.Label;

        private img_icon: eui.Image;
        private hunkaScore: HunkaScore;
        private starListView: StarListView;
        private hunkaAttrListView: HunkaAttrListView;

        public data: number;//部位
        private _proxy: GoddessRecordProxy;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);

            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected dataChanged(): void {
            if(this.data == null){
                return;
            }
            let pos = this.data;
            let prop = this._proxy.getComposeSelByPos(pos);
            let hasProp = !!prop;
            this.currentState = hasProp ? "select" : "add";

            if(hasProp){
                //显示选中的魂卡
                let cfg = prop.cfg as PropConfig;
                this.lab_name.text = cfg.name;
                this.img_icon.source = ResUtil.getBigIcon(cfg.icon);
                this.hunkaScore.setData(prop.pingfen);

                let star = prop.hunka_star;
                this.starListView.updateNewStar(star, star);

                this.hunkaAttrListView.updateShow(prop.shuiji);
            }
            else {
                this.lab_name.text = getLanById(LanDef.hunka_tips12);
                this.redPoint.visible = this._proxy.canSelCompose();
            }
        }

        private onClick(): void {
            if(this.data == null){
                return;
            }
            let pos = this.data;
            this._proxy.hunkaComposeSelPos = pos;//魂卡合成选中部位
            this._proxy.hunkaBagOpenType = HunkaBagOpenType.Compose;
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.HunkaBag);
        }

        public setData(pos: number): void {
            this.data = pos;
        }
    }

}