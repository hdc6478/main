namespace game.mod.surface {

    import TouchEvent = egret.TouchEvent;
    import XianchongConfig = game.config.XianchongConfig;
    import Handler = base.Handler;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import Tween = base.Tween;

    export class LingChongMdr extends EffectMdrBase {
        protected _view: LingChongView = this.mark("_view", LingChongView);
        protected _proxy: LingChongProxy;
        protected _listAvatar: eui.ArrayCollection;
        protected _curIndex: number;//当前灵宠index
        private _effIdx: number;
        private _curEftIndex: number;//当前特效灵宠index
        private _selIdx: number = 0;
        /**灵宠类型*/
        protected _type = 1;
        /**页签类型*/
        protected _littleType = 1;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Lingchong);
            this._view.list.itemRenderer = AvatarItem;
            this._view.list.dataProvider = this._listAvatar = new eui.ArrayCollection();
            this._view.touchEnabled = false;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power.btn_desc, TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_award, TouchEvent.TOUCH_TAP, this.onClickAward, this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(SurfaceEvent.LING_CHONG_INFO_UPDATE, this.onUpdateInfo, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE, this.onUpdateByBagPropType, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePowerView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.special_attr.visible = this._type == 1;
            this._view.gr_treasure.visible = this._type == 2;
            this._view.btn_treasure.visible = this._type == 2;
            this._view.btn_award.y = this._type == 1 ? 415 : 288;
            this.updateListData();
            this.updateView();
        }

        protected onUpdateInfo(): void {
            let list: AvatarItemData[] = this.getListData();
            this._listAvatar.replaceAll(list);
            let size = list.length;

            //下一个可以激活或升星的
            let selIdx: number;
            for (let i = 0; i < size; i++) {
                let data = list[i];
                if (!data || !data.cfg) {
                    continue;
                }
                let cfg = data.cfg as XianchongConfig;
                if (this._proxy.canUpStar(cfg.index)) {
                    selIdx = i;
                    break;
                }
            }
            if (selIdx != null) {
                let curData = list[selIdx];
                curData.isSel = true;
                this._listAvatar.itemUpdated(curData);
                this._curIndex = curData.cfg.index;
                this._view.list.selectedIndex = this._selIdx = selIdx;
            } else {
                let selIdx0 = 0;
                for (let i = 0; i < size; i++) {
                    let data = list[i];
                    if (data && data.cfg && data.cfg.index == this._curIndex) {
                        data.isSel = true;
                        this._listAvatar.itemUpdated(data);
                        selIdx0 = i;
                        break;
                    }
                }
                this._view.list.selectedIndex = this._selIdx = selIdx0;
                this.jumpSecondTab();
            }
            this.updateView();
        }

        //跳转到二级页签的其他页签
        protected jumpSecondTab(): void {

        }

        private getListData(): AvatarItemData[] {
            let type = this._type;
            let littleType = this._littleType;
            let cfgs = this._proxy.getConfigListByType(type, littleType);
            if (!cfgs || !cfgs.length) {
                DEBUG && console.error(`灵宠配置，没有对应类型配置，大类${type}, 小类${littleType}`);
                return [];
            }
            let list: AvatarItemData[] = [];
            let canActList: AvatarItemData[] = [];
            let notActedList: AvatarItemData[] = [];
            for (let cfg of cfgs) {
                if (cfg.type != type || cfg.type_little != littleType || !cfg.show) {
                    continue;
                }
                let info = this._proxy.getInfo(cfg.index);
                let item: AvatarItemData = {
                    cfg,
                    showHint: this._proxy.getSingleHint(cfg.index),
                    star: info ? info.star : 0,
                    isBattle: false,
                    isSel: false
                };
                if (this._proxy.canUpStar(cfg.index)) {
                    canActList.push(item);
                } else if (info && info.star) {
                    list.push(item);
                } else {
                    notActedList.push(item);
                }
            }
            canActList.sort(this.sortFunc);
            list.sort(this.sortFunc);
            notActedList.sort(this.sortFunc);
            list = canActList.concat(list, notActedList);
            return list;
        }

        protected updateListData(): void {
            let list = this.getListData();
            this._listAvatar.replaceAll(list);

            //默认第一个
            if (list[0] && list[0].cfg) {
                this._curIndex = list[0].cfg.index;
            }

            this._selIdx = 0;
            let size = list.length;
            for (let i = 0; i < size; i++) {
                list[i].isSel = i == this._selIdx;
            }
            this._view.list.selectedIndex = this._selIdx;
            this._view.scroller.viewport.scrollH = 0;
        }

        private sortFunc(a: AvatarItemData, b: AvatarItemData): number {
            if (a.cfg.quality == b.cfg.quality) {
                return a.cfg.index - b.cfg.index;
            }
            return a.cfg.quality - b.cfg.quality;
        }

        protected updatePowerView(): void {
            let info = this._proxy.getInfo(this._curIndex);
            let cfg = this._proxy.getConfig(this._curIndex);
            this._view.power.btn_desc.visible = info && info.star > 0;
            if (info && info.star) {
                this._view.power.setPowerValue(info.attr && info.attr.showpower ? info.attr.showpower : 0);
            } else {
                let attrId = cfg.active_attr[0];
                let attr = RoleUtil.getAttr(attrId);
                this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
            }
        }

        protected updateView(): void {
            if (!this._curIndex) {
                return;
            }
            this.updatePowerView();
            let info = this._proxy.getInfo(this._curIndex);
            this._view.starCom.updateStar(info && info.star || 0, this._proxy.getMaxStar());
            let cfg = this._proxy.getConfig(this._curIndex);
            this._view.nameItem.updateShow(cfg.name, cfg.quality);

            if (!this._curEftIndex || this._curEftIndex != cfg.index) {
                this.removeEffect(this._effIdx);
                this._effIdx = this.addAnimate(cfg.index, this._view.gr_eft);
                this._curEftIndex = cfg.index;
            }

            if (this._proxy.isMaxStar(this._curIndex)) {
                this._view.btn_up.updateMaxStar();
                this._view.btn_up.setHint(false);
            } else {
                let curStar = info ? info.star + 1 : 1;
                let tips = '';
                let isAct = info && info.star;
                if (isAct) {
                    let starPower = Math.floor((cfg.star_power[info.star - 1] || 0) / 100);
                    tips = getLanById(LanDef.upstar) + getLanById(LanDef.showpower) + "\n"
                        + TextUtil.addColor(`+${starPower}%`, WhiteColor.GREEN);
                }
                this._view.btn_up.updateCost(cfg.cost[curStar - 1], !!isAct, tips);
                let canUp = this._proxy.canUpStar(this._curIndex);
                this._view.btn_up.setHint(canUp);
                if (canUp) {
                    //请求所有升星的属性，为了升星弹窗属性展示
                    let cfg = this._proxy.getConfig(this._curIndex);
                    RoleUtil.getAttrList(cfg.active_attr);
                }
            }

            this._view.btn_award.visible = info && info.star > 0 && info.state == 1;
            this.updateAttrView();
            this.updateTaskView();
            this.updateBtnHint();
        }

        //属性
        protected updateAttrView(): void {
            let cfg = this._proxy.getConfig(this._curIndex);
            this._view.special_attr.updateDesc(cfg, 360);
        }

        //任务
        protected updateTaskView(): void {

        }

        protected onHide(): void {
            super.onHide();
            this.removeEffect(this._effIdx);
            this._curEftIndex = null;
            this._view.scroller.stopAnimation();
            Tween.remove(this._view.scroller);
            this._curIndex = null;
            this._selIdx = 0;
        }

        protected onClickAttr(): void {
            let info = this._proxy.getInfo(this._curIndex);
            ViewMgr.getIns().showAttrTipsWithoutGod(getLanById(LanDef.lingchong_tips5),
                info ? info.attr : null, getLanById(LanDef.xiandan_tips9), 1);
        }

        protected onClickAward(): void {
            let info = this._proxy.getInfo(this._curIndex);
            let cfg = this._proxy.getConfig(this._curIndex);
            ViewMgr.getIns().showRewardTips(getLanById(LanDef.lingchong_tips6),
                cfg ? cfg.reward : [],
                info ? info.state : 0,
                Handler.alloc(this, this.onGetReward, [this._curIndex]));
        }

        protected onClickUp(): void {
            if (!this._proxy.canUpStar(this._curIndex, true)) {
                return;
            }
            this._proxy.c2s_lingchong_oper(this._curIndex, 1);
        }

        protected onGetReward(...args: any[]): void {
            this._proxy.c2s_lingchong_oper(args[0], 2);
        }

        protected onClickList(e: eui.ItemTapEvent): void {
            if (!e || !e.item) {
                return;
            }
            let data = e.item as AvatarItemData;
            let list: AvatarItemData[] = this._listAvatar.source;
            let preData = list[this._selIdx];
            if (preData) {
                preData.isSel = false;
                this._listAvatar.itemUpdated(preData);
            }

            data.isSel = true;
            this._listAvatar.itemUpdated(data);

            this._selIdx = e.itemIndex;
            this._curIndex = (data.cfg as XianchongConfig).index;
            this.updateView();
        }

        //激活礼包，宝藏红点
        protected updateBtnHint(): void {
            if (this._view.btn_award.visible) {
                this._view.btn_award.setHint(this._proxy.getRewardHint(this._curIndex));
            }
            if (this._view.btn_treasure.visible) {
                this._view.btn_treasure.setHint(this._proxy.getTreasureHint(this._curIndex));
            }
        }

        private onUpdateByBagPropType(n: GameNT): void {
            let list: { [type: number]: number[] } = n.body;
            for (let type in list) {
                if ((+type) == PropType.Surface) {
                    this.updateView();//更新界面消耗道具以及按钮红点
                    this.onUpdateListHint();//更新列表红点
                    break;
                }
            }
        }

        private onUpdateListHint(): void {
            let size = this._listAvatar.source.length;
            for (let i = 0; i < size; i++) {
                let data: AvatarItemData = this._listAvatar.source[i];
                if (!data || !data.cfg) {
                    continue;
                }
                data.showHint = this._proxy.getSingleHint(data.cfg.index);
                this._listAvatar.itemUpdated(data);
            }
        }
    }
}