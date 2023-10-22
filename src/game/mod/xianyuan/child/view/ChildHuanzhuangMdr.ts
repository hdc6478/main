namespace game.mod.xianyuan {

    import ChildConfig = game.config.ChildConfig;
    import ChildShenbingConfig = game.config.ChildShenbingConfig;
    import ChildLingyiConfig = game.config.ChildLingyiConfig;
    import LanDef = game.localization.LanDef;

    export class ChildHuanzhuangMdr extends EffectMdrBase {
        private _view: ChildHuanzhuangView = this.mark("_view", ChildHuanzhuangView);
        private _proxy: ChildProxy;
        private _listAvatar: eui.ArrayCollection;
        private _listItem: eui.ArrayCollection;
        private _listBtn: eui.ArrayCollection;
        private _selBtnIdx = 0;
        private _selItemIdx = 0;
        private _selAvatarIdx = 0;
        private _selChildCfg: ChildConfig;
        private _eftIdx: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.gr_eft.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Child);
            this._view.list_avatar.itemRenderer = AvatarItem;
            this._view.list_avatar.dataProvider = this._listAvatar = new eui.ArrayCollection();
            this._view.list_item.itemRenderer = ChildHuanzhuangIconSel;
            this._view.list_item.dataProvider = this._listItem = new eui.ArrayCollection();
            this._view.list_btn.itemRenderer = TabSecondItem;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
            addEventListener(this._view.list_avatar, eui.ItemTapEvent.ITEM_TAP, this.onClickListAvatar, this);
            addEventListener(this._view.list_item, eui.ItemTapEvent.ITEM_TAP, this.onClickListItem, this);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickListBtn, this);
            this.onNt(XianyuanEvent.ON_UPDATE_CHILD_INFO, this.updateModel, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateListBtn();
            this.updateListItem();
            this.updateInfo();
            this.updateModel();
        }

        protected onHide(): void {
            super.onHide();
            this._selBtnIdx = 0;
            this._selItemIdx = 0;
            this._selAvatarIdx = 0;
            this._selChildCfg = null;
            this.removeEffect(this._eftIdx);
            this._eftIdx = null;
        }

        private updateListBtn(): void {
            let list: TabBaseItemData[] = [];
            let iconAry = ['tubiao_shenbing', 'tubiao_lingyi'];
            for (let icon of iconAry) {
                list.push({
                    icon,
                    showHint: false//todo
                });
            }
            this._listBtn.replaceAll(list);
            this._view.list_btn.selectedIndex = this._selBtnIdx = 0;
        }

        private updateListItem(): void {
            let infoObj = this._proxy.getChildInfos();
            let list: ChildConfig[] = [];
            if (infoObj) {
                for (let key in infoObj) {
                    let info = infoObj[key];
                    if (!info) {
                        continue;
                    }
                    let cfg = this._proxy.getChildCfg(info.child_index);
                    if (cfg) {
                        list.push(cfg);
                    }
                }
            }
            this._listItem.replaceAll(list);
            this._view.list_item.selectedIndex = this._selItemIdx = 0;
            this._selChildCfg = list[this._selItemIdx];
        }

        private updateListAvatar(): void {
            let type = this._selBtnIdx + 1;
            let surfaceTypeObj = this._proxy.getSurfaceTypeInfo(type);
            let battleList = this._proxy.getBattleSurfaceList();
            let list: AvatarItemData[] = [];
            for (let key in surfaceTypeObj) {
                let info = surfaceTypeObj[key];
                if (!info) {
                    continue;
                }
                let cfg = this._proxy.getSurfaceCfg(type, info.shenbin_index);
                if (!cfg) {
                    continue;
                }
                list.push({
                    cfg,
                    showHint: false,
                    star: info.shenbin_lv,
                    isBattle: false// battleList.indexOf(info.shenbin_index) > -1
                });
            }
            this._listAvatar.replaceAll(list);
            this._view.list_avatar.selectedIndex = this._selAvatarIdx = 0;
        }

        private updateInfo(): void {
            let type = this._selBtnIdx + 1;//神兵，灵翼
            let typeName = XianlvSurfaceName[type];
            this._view.lb_select.text = StringUtil.substitute(getLanById(LanDef.xianlv_tips22), [typeName]);
            let surfaceTypeObj = this._proxy.getSurfaceTypeInfo(type);
            let haveAvatar = surfaceTypeObj && Object.keys(surfaceTypeObj).length > 0;
            this._view.scroller_avatar.visible = haveAvatar;
            this._view.lb_desc.visible = !haveAvatar;
            if (!haveAvatar) {
                this._view.lb_desc.text = StringUtil.substitute(getLanById(LanDef.xianlv_tips21), [typeName]);
            }
            if (haveAvatar) {
                this.updateListAvatar();
            }
        }

        private updateModel(): void {
            if (!this._selChildCfg) {
                return;
            }
            let cfg = this._selChildCfg;
            this._view.nameItem.updateShow(cfg.name, cfg.quality);
            this.removeEffect(this._eftIdx);
            this._eftIdx = this.addAnimate(cfg.index, this._view.gr_eft);

            let equipList = this._proxy.getEquipList(cfg.index);
            let equipCfg: ChildShenbingConfig | ChildLingyiConfig;
            if (equipList[0]) {
                equipCfg = this._proxy.getSurfaceCfg(XianlvSurfaceType.Shenbing, equipList[0]);
            }
            let icon = equipCfg ? equipCfg.icon : 'icon_jia';
            this._view.icon0.updateIconImg(icon);
            this._view.icon0.updateQualityImg(ResUtil.getPropQualityImg(equipCfg && equipCfg.quality || 0));

            if (equipList[1]) {
                equipCfg = this._proxy.getSurfaceCfg(XianlvSurfaceType.Lingyi, equipList[1]);
            } else {
                equipCfg = null;
            }
            icon = equipCfg ? equipCfg.icon : 'icon_jia';
            this._view.icon1.updateIconImg(icon);
            this._view.icon1.updateQualityImg(ResUtil.getPropQualityImg(equipCfg && equipCfg.quality || 0));
        }

        private onClickOneKey(): void {
            if (this._proxy.canOneKey(this._selChildCfg.index, true)) {
                this._proxy.c2s_child_equip(this._selChildCfg.index, 1);
            }
        }

        private onClickListAvatar(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selAvatarIdx) {
                return;
            }
            this._selAvatarIdx = itemIdx;
            this.updateModel();
        }

        private onClickListItem(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selItemIdx) {
                return;
            }
            this._selItemIdx = itemIdx;
            this._selChildCfg = e.item;
            this.updateModel();
        }

        private onClickListBtn(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selBtnIdx) {
                return;
            }
            this._selBtnIdx = itemIdx;
            this.updateListItem();
            this.updateInfo();
            this.updateModel();
        }
    }
}