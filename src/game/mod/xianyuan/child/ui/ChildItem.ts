namespace game.mod.xianyuan {

    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class ChildItem extends BaseRenderer {
        public img_sketch: eui.Image;
        public img_add: eui.Image;
        public lb_cond: eui.Label;
        public gr_eft: eui.Group;

        data: IChildItemData;
        private _proxy: ChildProxy;

        constructor() {
            super();
            this.skinName = `skins.xianyuan.ChildItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Xianyuan, ProxyType.Child);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_add.visible = data.isActed && !data.childIndex;
            this.lb_cond.visible = !data.isActed;
            this.img_sketch.visible = !data.childIndex;
            this.lb_cond.text = StringUtil.substitute(getLanById(LanDef.xianlv_tips19), [this.data.vip]);

            if (data.childIndex) {
                let cfg = this._proxy.getChildCfg(data.childIndex);
                this.removeEft();
                this.addAnimate(data.childIndex, this.gr_eft);
            }
        }

        private onClick(): void {
            if (!this.data.isActed) {
                let txt = StringUtil.substitute(getLanById(LanDef.xianlv_tips19), [this.data.vip]);
                PromptBox.getIns().show(txt);
                return;
            }
            if (!this._proxy.haveChildForShangzhen()) {
                // PromptBox.getIns().show(getLanById(LanDef.xianlv_tips18));
                facade.showView(ModName.Xianyuan, XianyuanViewType.Zhaohuan);
                return;
            }
            facade.showView(ModName.Xianyuan, XianyuanViewType.ChildShangzhen, this.data.pos);
        }
    }

    export interface IChildItemData {
        childIndex: number;
        isActed: boolean;
        vip: number;
        pos?: number;
    }
}