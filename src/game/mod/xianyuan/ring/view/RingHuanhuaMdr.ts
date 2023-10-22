namespace game.mod.xianyuan {

    import RingConfig = game.config.RingConfig;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class RingHuanhuaMdr extends EffectMdrBase {
        private _view: RingHuanhuaView = this.mark("_view", RingHuanhuaView);
        private _proxy: RingProxy;
        /**二级页签分类*/
        private _type = 1;
        private _listAvatar: eui.ArrayCollection;
        private _eftIdx: number;
        private _selIdx = 0;
        private _selCfg: RingConfig;
        private _openReward = false;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.gr_eft.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Ring);
            this._view.list.itemRenderer = AvatarItem;
            this._view.list.dataProvider = this._listAvatar = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickUp, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_reward, egret.TouchEvent.TOUCH_TAP, this.onClickReward, this);
            addEventListener(this._view.btn_huanhua, egret.TouchEvent.TOUCH_TAP, this.onClickHuanhua, this);

            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
            this.onNt(XianyuanEvent.ON_UPDATE_RING_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selCfg = null;
            this._selIdx = 0;
            this._eftIdx = 0;
            this._openReward = false;
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollH = 0;
        }

        private updateView(): void {
            this.updateListAvatar();
            this.updateInfo();
        }

        private updateInfo(): void {
            this.updateModel();
            this.updatePower();
            this.updateCost();

            let index = this._selCfg.index;
            this._view.btn_huanhua.visible = this._proxy.canShowHuanhua(index);
            this._view.btn_reward.visible = this._proxy.canGetReward(index);
            if (this._view.btn_reward.visible) {
                this._view.btn_reward.setHint(true);
            }
            if (this._openReward && this._proxy.isGetReward(index)) {
                this.sendNt(MainEvent.UPDATE_BASE_REWARD_MDR_STATE, 2);
                this._openReward = false;
            }
        }

        private updateModel(): void {
            if (!this._selCfg) {
                return;
            }
            let cfg = this._selCfg;
            this._view.nameItem.updateShow(cfg.name, cfg.quality);
            // this.removeEffect(this._eftIdx);
            // this._eftIdx = this.addAnimate(cfg.index, this._view.gr_eft);
            this._view.img_icon.source = ResUtil.getRingSrc(cfg.index);
            this._view.specialAttr.updateDesc(cfg);
        }

        private updateCost(): void {
            let index = this._selCfg.index;
            let isMax = this._proxy.isMaxStar(index);
            if (isMax) {
                this._view.btn_up.updateMaxStar();
                return;
            }
            let cost = this._proxy.getUpstarCost(index);
            let star = this._proxy.getStar(index);
            let power = this._selCfg.star_power[star] || 0;
            let str = StringUtil.substitute(getLanById(LanDef.xianlv_tips26), [TextUtil.addColor(Math.floor(power / 100) + '%', WhiteColor.GREEN)]);
            this._view.btn_up.updateCost(cost, !!star, str);
            this._view.btn_up.setHint(this._proxy.canUpstar(index));
        }

        private updatePower(): void {
            let info = this._proxy.getInfo(this._selCfg.index);
            let attr = info && info.attr ? info.attr : null;
            if (!attr) {
                let attrId = this._selCfg.attr_id[0];
                attr = RoleUtil.getAttr(attrId);
            }
            this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
            this._view.power.btn_desc.visible = info && info.star > 0;
        }

        private updateListAvatar(): void {
            let cfgList = this._proxy.getCfgListByType(this._type);
            let list: AvatarItemData[] = [];
            for (let cfg of cfgList) {
                list.push({
                    cfg,
                    star: this._proxy.getStar(cfg.index),
                    isBattle: this._proxy.isHuanhua(cfg.index),
                    showHint: this._proxy.getUpstarHintByIndex(cfg.index) || false,
                    isSel: false
                });
            }
            list.sort((a, b) => {
                if (a.isBattle) {
                    return -1;
                }
                if (b.isBattle) {
                    return 1;
                }
                if (a.showHint != b.showHint) {
                    return a.showHint ? -1 : 1;
                }
                if (a.star != b.star) {
                    return b.star - a.star;
                }
                if (a.cfg.quality != b.cfg.quality) {
                    return a.cfg.quality - b.cfg.quality;
                }
                return b.cfg.index - a.cfg.index;
            });

            if (this._selCfg) {
                for (let i = 0; i < list.length; i++) {
                    if (this._selCfg.index == list[i].cfg.index) {
                        this._selIdx = i;
                        break;
                    }
                }
            } else {
                // this._selIdx = 0;
                this._selCfg = list[this._selIdx].cfg;
            }

            let size = list.length;
            for (let i = 0; i < size; i++) {
                list[i].isSel = i == this._selIdx;
            }
            this._listAvatar.source = list;
            this._view.list.selectedIndex = this._selIdx;
        }

        private onClickUp(): void {
            if (this._selCfg && this._proxy.canUpstar(this._selCfg.index, true)) {
                this._proxy.c2s_ring_upstar(this._selCfg.index);
            }
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            let list: AvatarItemData[] = this._listAvatar.source;
            let preData = list[this._selIdx];
            if (preData) {
                preData.isSel = false;
                this._listAvatar.itemUpdated(preData);
            }
            let data = e.item as AvatarItemData;
            data.isSel = true;
            this._listAvatar.itemUpdated(data);

            this._selCfg = data.cfg;
            this._selIdx = itemIdx;
            this.updateInfo();
            this._openReward = false;
        }

        private onClickAttr(): void {
            let info = this._proxy.getInfo(this._selCfg.index);
            ViewMgr.getIns().showAttrTips(getLanById(LanDef.ring_tips2), info && info.attr ? info.attr : null);
        }

        private onClickReward(): void {
            this._openReward = true;
            ViewMgr.getIns().showRewardTips(getLanById(LanDef.lingchong_tips6),
                this._selCfg.reward,
                1,
                Handler.alloc(this, this.onGetReward, [this._selCfg.index]));
        }

        private onGetReward(index: number): void {
            this._proxy.c2s_ring_act_libao(index);
        }

        private onClickHuanhua(): void {
            this._proxy.c2s_ring_huanhua(this._selCfg.index);
        }
    }
}