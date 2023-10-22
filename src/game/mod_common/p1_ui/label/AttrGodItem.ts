namespace game.mod {
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import Event = egret.Event;
    import Handler = base.Handler;

    /**
     * 通用仙力组件
     */
    export class AttrGodItem extends Btn {
        private grp_god: eui.Group;
        private grp_eft: eui.Group;
        public redPoint: eui.Image;
        private _clickable: boolean = true;//可点击
        private _clickHandler: Handler;

        constructor() {
            super();
            //不设置皮肤，支持复用
            //this.skinName = "skins.common.AttrGodSkin";
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            if(this.grp_eft){
                this.setEffect(UIEftSrc.Xianli, this.grp_eft);
            }
        }

        protected onRemoveFromStage() {
            this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        private onClick(): void {
            if(this._clickHandler){
                this._clickHandler.exec();
                return;
            }
            if(!this._clickable){
                return;
            }
            facade.showView(ModName.Role, NewRoleViewType.RoleGod);
        }

        /**仙力值，clickable：设置是否可点击，一般其他玩家不给查看*/
        public updateGod(god: number, clickable: boolean = true, clickHandler?: Handler): void {
            this._clickable = clickable;
            this._clickHandler = clickHandler;
            this.addBmpFont(god + "", BmpTextCfg[BmpTextType.CommonPower2], this.grp_god, true, 1, true);
        }
    }
}