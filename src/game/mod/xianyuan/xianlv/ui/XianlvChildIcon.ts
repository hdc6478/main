namespace game.mod.xianyuan {

    import ChildConfig = game.config.ChildConfig;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class XianlvChildIcon extends BaseListenerRenderer {
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public img_add: eui.Image;
        public img_lock: eui.Image;

        data: IXianlvChildIconData;

        constructor() {
            super();
            this.skinName = `skins.xianyuan.XianlvChildIconSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if (data.childIndex) {
                let childCfg: ChildConfig = getConfigByNameId(ConfigName.Child, data.childIndex);
                this.img_icon.source = childCfg ? childCfg.icon : '';
                this.img_lock.visible = this.img_add.visible = false;
                this.img_bg.source = 'zinvtouxiangkuang';
            } else {
                this.img_icon.source = '';
                this.img_bg.source = 'zinvtouxiangkongkuang';
                this.img_add.visible = data.isActed;
                this.img_lock.visible = !data.isActed;
            }

            // todo
        }

        private onClick(): void {
            let data = this.data;
            if (!data.isActed) {
                let txt = StringUtil.substitute(getLanById(LanDef.xianlv_tips19), [data.vip]);
                PromptBox.getIns().show(txt);
                return;
            }
            if (data.isActed && !data.childIndex) {
                // PromptBox.getIns().show(getLanById(LanDef.xianlv_tips18));
                facade.showView(ModName.Xianyuan, XianyuanViewType.Zhaohuan);
                return;
            }

            // todo
        }
    }

    export interface IXianlvChildIconData {
        vip: number;//激活vip
        isActed: boolean;
        childIndex: number;//上阵的子女index
    }
}