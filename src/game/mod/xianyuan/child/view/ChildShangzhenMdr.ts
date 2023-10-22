namespace game.mod.xianyuan {

    import xianlv_child_infos = msg.xianlv_child_infos;
    import ChildShenbingConfig = game.config.ChildShenbingConfig;
    import ChildLingyiConfig = game.config.ChildLingyiConfig;

    export class ChildShangzhenMdr extends EffectMdrBase {
        private _view: ChildShangzhenView = this.mark("_view", ChildShangzhenView);
        private _proxy: ChildProxy;
        private _listData: eui.ArrayCollection;
        private _eftIdx: number;
        private _selIdx = 0;
        private _childIndex = 0;
        protected _showArgs: number;//位置

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.gr_eft.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Child);
            this._view.list.itemRenderer = AvatarItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.btn_shangzhen, egret.TouchEvent.TOUCH_TAP, this.onClickShangzhen, this);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(XianyuanEvent.ON_UPDATE_CHILD_SHARE_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this.removeModelEft();
            this._childIndex = null;
            this._selIdx = 0;
        }

        private removeModelEft(): void {
            if (this._eftIdx) {
                this.removeEffect(this._eftIdx);
                this._eftIdx = null;
            }
        }

        private updateView(): void {
            this.updateListData();
            this.updateTopView();
        }

        private updateListData(): void {
            let childList: xianlv_child_infos[] = this._proxy.getChildList();
            let list: AvatarItemData[] = [];
            let battleList: AvatarItemData[] = [];
            for (let child of childList) {
                let info = this._proxy.getChildInfo(child.child_index);
                let star = info ? info.star_lv : 0;
                let cfg = this._proxy.getChildCfg(child.child_index);
                let isBattle = this._proxy.isBattle(child.child_index);
                let itemData: AvatarItemData = {
                    cfg, star, isBattle
                };
                if (isBattle) {
                    battleList.push(itemData);
                } else {
                    list.push(itemData);
                }
            }
            list = list.concat(battleList);
            this._listData.replaceAll(list);

            if (this._childIndex) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].cfg.index == this._childIndex) {
                        this._selIdx = i;
                        break;
                    }
                }
            } else {
                this._selIdx = 0;
                this._childIndex = list[this._selIdx].cfg.index;
            }
            this._view.list.selectedIndex = this._selIdx;
        }

        private updateTopView(): void {
            if (!this._childIndex) {
                return;
            }
            let cfg = this._proxy.getChildCfg(this._childIndex);
            if (!cfg) {
                return;
            }
            this.removeModelEft();
            this._eftIdx = this.addAnimate(this._childIndex, this._view.gr_eft);
            this._view.nameItem.updateShow(cfg.name, cfg.quality);

            let info = this._proxy.getChildInfo(this._childIndex);
            let power = info && info.star_attr && info.star_attr.showpower || 0;
            this._view.power.setPowerValue(power);

            let isShangzhen = this._proxy.isBattle(this._childIndex);
            this._view.btn_shangzhen.visible = !isShangzhen;

            //装备
            let equipList = this._proxy.getEquipList(this._childIndex);
            let shenbingCfg: ChildShenbingConfig;
            if (equipList[0]) {
                shenbingCfg = this._proxy.getSurfaceCfg(XianlvSurfaceType.Shenbing, equipList[0]);
            }
            let icon = shenbingCfg ? shenbingCfg.icon : 'icon_jia';
            this._view.icon0.updateIconImg(icon);
            this._view.icon0.updateQualityImg(ResUtil.getPropQualityImg(shenbingCfg && shenbingCfg.quality || 0));

            let lingyiCfg: ChildLingyiConfig;
            if (equipList[1]) {
                lingyiCfg = this._proxy.getSurfaceCfg(XianlvSurfaceType.Lingyi, equipList[1]);
            }
            let icon1 = lingyiCfg ? lingyiCfg.icon : 'icon_jia';
            this._view.icon1.updateIconImg(icon1);
            this._view.icon1.updateQualityImg(ResUtil.getPropQualityImg(lingyiCfg && lingyiCfg.quality || 0));
        }

        private onClickShangzhen(): void {
            if (this._childIndex) {
                this._proxy.c2s_child_into_battle(this._childIndex, this._showArgs);
            }
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            this._selIdx = itemIdx;
            this._childIndex = (e.item as AvatarItemData).cfg.index;
            this.updateView();
        }

        // todo
        private onClickAttr(): void {
            this.showView(XianyuanViewType.AttrView);
        }
    }
}