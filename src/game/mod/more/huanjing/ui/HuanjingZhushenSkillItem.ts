namespace game.mod.more {

    import facade = base.facade;

    export class HuanjingZhushenSkillItem extends BaseListenerRenderer {
        public skillItem: game.mod.SkillItemRender;
        public gr_lv: eui.Group;
        public lb_num: eui.Label;
        public redPoint: eui.Image;

        data: IHuanjingZhushenSkillItemData;
        private _proxy: HuanjingProxy;

        constructor() {
            super();
            this.skinName = `skins.more.HuanjingZhushenSkillItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Huanjing);
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
            let info = this._proxy.getZhushenInfo(data.systemId, data.pos);
            let isActed = !!info;
            this.gr_lv.visible = isActed;
            this.lb_num.text = (info && info.star || 0) + '';
            this.redPoint.visible = this._proxy.canActOrUpZhushen(data.systemId, data.pos);
            this.skillItem.data = {
                skillId: data.skillId,
                isAct: isActed
            };
        }

        private onClick(): void {
            facade.showView(ModName.More, MoreViewType.HuanjingZhushenSkillTips, {
                systemId: this.data.systemId,
                pos: this.data.pos,
                skillId: this.data.skillId
            });
        }
    }

    export interface IHuanjingZhushenSkillItemData {
        systemId: number;
        pos: number;//从1开始
        skillId: number;
    }
}