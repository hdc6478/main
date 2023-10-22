namespace game.mod.surface {

    import ArrayCollection = eui.ArrayCollection;
    import XianjianConfig = game.config.XianjianConfig;
    import AvatarItemData = game.mod.AvatarItemData;
    import ItemTapEvent = eui.ItemTapEvent;
    import fly_sword_battle_pos_info = msg.fly_sword_battle_pos_info;
    import TouchEvent = egret.TouchEvent;

    export class XianjianChooseMdr extends EffectMdrBase {
        private _view: XianjianChooseView = this.mark("_view", XianjianChooseView);

        private _listData: ArrayCollection;
        private _proxy: XianjianProxy;
        private _selCfg: XianjianConfig;

        /**当前选中的外显下标*/
        private _selIndex: number;
        private _lastIndex: number;//上一次显示的外显
        private _effIdx: number;
        private readonly _headType: number = ConfigHead.Xianjian;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Xianjian);

            this._listData = new ArrayCollection();
            this._view.list.itemRenderer = AvatarItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickItem);
            addEventListener(this._view.btn_shangzhen, TouchEvent.TOUCH_TAP, this.onClickBtn);
        }

        protected onShow(): void {
            super.onShow();
            this._selIndex = 0;
            this._selCfg = null;
            this.typeUpdateInfo();
        }

        protected onHide(): void {
            this._effIdx = 0;
            this._lastIndex = 0;
            super.onHide();
        }

        private onClickBtn(): void {
            this._proxy.c2s_fly_sword_into_battle(this._showArgs, this._selCfg.index);
            this.hide();
        }

        private onClickItem(e: ItemTapEvent) {
            let index = e.itemIndex;
            if (index == this._selIndex) {
                return;
            }

            //清除选中特效
            let datas: AvatarItemData[] = this._listData.source;
            let lastData = datas[this._selIndex];
            lastData.isSel = false;
            this._listData.itemUpdated(lastData);

            this._selIndex = index;

            //选中特效
            let curData = datas[this._selIndex];
            curData.isSel = true;
            this._listData.itemUpdated(curData);

            this.indexUpdateInfo();
        }

        private indexUpdateInfo(): void {
            this._selCfg = this._listData.source[this._selIndex].cfg;
            let posInfo: fly_sword_battle_pos_info = this._proxy.getShangzhen(this._showArgs);
            this._view.btn_shangzhen.visible = !posInfo || posInfo.index !== this._selCfg.index;

            this.updatePower();
            this.updateModel();
            this.onUpdateSkill();
        }

        private onUpdateSkill(): void {
            let skill: number = this._selCfg.skill;
            this._view.suit_item.updateView(skill);
        }

        private updateModel(): void {
            let index = this._selCfg.index;
            if (index == this._lastIndex) {
                return;
            }
            this._lastIndex = index;
            if (this._effIdx) {
                this.removeEffect(this._effIdx);
            }

            this._effIdx = this.addAnimate(index, this._view.grp_eff);
            this._view.name_item.updateShow(this._selCfg.name, this._selCfg.quality);
        }

        private updatePower(): void {
            let info = this._proxy.getInfo(this._selCfg.index);
            let attr = info && info.all_attr;
            if (!attr) {
                attr = RoleUtil.getAttr(this._selCfg.attr_id[0]);
            }
            let power = attr && attr.showpower ? attr.showpower : 0;
            this._view.power.setPowerValue(power);
        }

        private typeUpdateInfo(): void {
            this.updateItemList();
            this.indexUpdateInfo();
        }

        private updateItemList(): void {
            let cfgArr: XianjianConfig[] = this._proxy.getCfgArr();
            let posInfo: fly_sword_battle_pos_info = this._proxy.getShangzhen(this._showArgs);
            let list: AvatarItemData[] = [];
            let i: number = 0;
            for (let cfg of cfgArr) {
                let info = this._proxy.getInfo(cfg.index);
                let star: number = info && info.star || 0;
                let showHint: boolean = false;
                let isSel: boolean = posInfo && posInfo.index == cfg.index || !posInfo && this._selIndex == i;
                if (isSel) {
                    this._selIndex = i;
                }
                list.push({ cfg, star, showHint, isSel });
                i++;
            }
            this._listData.replaceAll(list);
            this._view.list.selectedIndex = this._selIndex;
        }
    }
}