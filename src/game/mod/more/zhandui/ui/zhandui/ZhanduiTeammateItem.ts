namespace game.mod.more {

    import teammate = msg.teammate;
    import facade = base.facade;
    import LanDef = game.localization.LanDef

    export class ZhanduiTeammateItem extends BaseListenerRenderer {
        public headVip: game.mod.HeadVip;
        public group_head: eui.Group;
        public img_captain: eui.Image;
        public img_add: eui.Image;
        public img_online: eui.Image;
        public lb_name: eui.Label;
        private _proxy: ZhanduiProxy;

        data: teammate;

        constructor() {
            super();
            this.skinName = `skins.more.ZhanduiTeammateItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Zhandui);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.group_head, this.onClick, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_add, this.onClickAdd, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                this.defaultView();
                return;
            }
            this.currentState = 'head';
            let itemIdx = this.itemIndex;
            this.img_captain.visible = itemIdx == 0;
            let name = data.name;
            let index = name.indexOf(".");
            let result = name.slice(index + 1);
            this.lb_name.text = result;
            this.img_online.source = data.is_online == 1 ? 'zaixian_lv' : 'zaixian_hui';
            this.headVip.updateShow(data.head, data.head_frame, data.sex, data.vip);
        }

        private defaultView(): void {
            this.currentState = 'add';
        }

        private onClick(): void {
            if (!this.data) {
                return;
            }
            let pt = this.localToGlobal();
            let point = new egret.Point(pt.x, pt.y + 80);
            egret.callLater(() => {
                facade.showView(ModName.More, MoreViewType.ZhanduiTeammateCheck, {
                    data: this.data,
                    point
                });
            }, this);
        }

        private onClickAdd(): void {
            if (!this._proxy.isCaption()) {
                PromptBox.getIns().show(getLanById(LanDef.zhandui_tips10));
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.ZhanduiInviteList);
        }
    }
}