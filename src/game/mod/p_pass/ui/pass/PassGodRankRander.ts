namespace game.mod.pass {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import mainline_rank_award_info = msg.mainline_rank_award_info;
    import ChapterawardConfig = game.config.ChapterawardConfig;
    import LanDef = game.localization.LanDef;

    export class PassGodRankRander extends BaseListenerRenderer {

        public lab_title: eui.Label;
        public role_head: game.mod.Head;
        public lab_role_name: eui.Label;
        public btn_see: game.mod.Btn;
        public list_reward:eui.List;
        public btn_get: game.mod.Btn;

        private _proxy: PassProxy;
        private _model: PassModel;
        
        private _awdDatas: eui.ArrayCollection;
        private _info: mainline_rank_award_info;
        private _cfg: ChapterawardConfig;

        protected createChildren(): void {
            super.createChildren();

            this._awdDatas = new eui.ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._awdDatas;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_see,this.onBtnSeeClick,this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_get,this.onBtnGetClick,this);
        }

        protected dataChanged(): void {
            super.dataChanged();

            this._proxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
            this._model = this._proxy.getModel();
            this._cfg = this.data;
            if(!this._cfg) {
                return;
            }
            this._info = this._model.godRankInfos[this._cfg.index];
            this.currentState = this._info ? "hasData" : "noData";

            this.lab_title.text = getLanById(LanDef.pass_max_step) + this._cfg.level;
            if(this._awdDatas.length) {
                this._awdDatas.replaceAll(this._cfg.award);
            } else {
                this._awdDatas.source = this._cfg.award;
            }
            if(this._info) {
                this.role_head.updateHeadShow(this._info.icon, this._info.icon_frame, this._info.sex);
                this.lab_role_name.text = this._info.name;
            }

            this.btn_get.visible = this._model.godRankAwdGotIds
                && this._model.godRankAwdGotIds.indexOf(this._cfg.index) != -1 ? false : true;
            this.btn_get.redPoint.visible = this._info && this.btn_get.visible;
        }

        private onBtnSeeClick() {
            if(this._info){
                //todo
            }
        }

        private onBtnGetClick() {
            if(this._info){
                this._proxy.c2s_mainline_rank_award(this._info.index);
            }
        }

    }
}