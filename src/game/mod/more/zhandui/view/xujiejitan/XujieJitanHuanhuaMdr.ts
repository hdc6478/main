namespace game.mod.more {

    import ZhanduiJitanHuanhuaConfig = game.config.ZhanduiJitanHuanhuaConfig;
    import UpdateItem = base.UpdateItem;
    import BuffConfig = game.config.BuffConfig;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;
    import NewPrivilegeConfig = game.config.NewPrivilegeConfig;

    export class XujieJitanHuanhuaMdr extends EffectMdrBase implements UpdateItem {
        private _view: XujieJitanHuanhuaView = this.mark("_view", XujieJitanHuanhuaView);
        private _proxy: XujieJitanProxy;
        private _listData: eui.ArrayCollection;
        private _selIdx = 0;
        private _selCfg: ZhanduiJitanHuanhuaConfig;
        private _effId: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieJitan);
            this._view.list.itemRenderer = XujieJitanHuanhuaItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_huanhua, egret.TouchEvent.TOUCH_TAP, this.onClickHuanhua, this);
            addEventListener(this._view.btn_upstar, egret.TouchEvent.TOUCH_TAP, this.onClickUpstar, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_JITAN_BASE_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
            this._selCfg = null;
        }

        private onUpdateView(): void {
            this.updateListData();
            this.updateView();
        }

        private updateListData(): void {
            let cfgs: ZhanduiJitanHuanhuaConfig[] = getConfigListByName(ConfigName.ZhanduiJitanHuanhua);
            let list: AvatarItemData[] = [];
            for (let cfg of cfgs) {
                let info = this._proxy.getHuanhuaInfo(cfg.index);
                let itemData: AvatarItemData = {
                    cfg,
                    showHint: this._proxy.canActOrUpstar(cfg.index),
                    star: info && info.star || 0,
                    isBattle: false,
                    isSel: false
                };
                list.push(itemData);
            }

            list.sort((a, b) => {
                if (a.cfg.index == this._proxy.now_use_id) {
                    return -1;
                }
                if (b.cfg.index == this._proxy.now_use_id) {
                    return 1;
                }
                if (a.showHint != b.showHint) {
                    return a.showHint ? -1 : 1;
                }
                if (a.cfg.quality != b.cfg.quality) {
                    return a.cfg.quality - b.cfg.quality;
                }
                return a.cfg.index - b.cfg.index;
            });

            if (this._selCfg) {
                let size = list.length;
                for (let i = 0; i < size; i++) {
                    let item = list[i];
                    if (item && item.cfg.index == this._selCfg.index) {
                        this._selIdx = i;
                        break;
                    }
                }
            } else {
                this._selCfg = list[this._selIdx].cfg;
            }

            for (let i = 0; i < list.length; i++) {
                list[i].isSel = i == this._selIdx;
            }

            this._listData.replaceAll(list);
            this._view.list.selectedIndex = this._selIdx;
        }

        private updateView(): void {
            if (!this._selCfg) {
                return;
            }
            this._view.nameItem.updateShow(this._selCfg.name, this._selCfg.quality);
            this.removeEffect(this._effId);
            this._effId = this.addAnimate(this._selCfg.index, this._view.gr_eft);

            this._view.lb_desc.textFlow = TextUtil.parseHtml(this._selCfg.desc);
            this._view.img_name.source = `zhanduijitan_huanhua_${this._selCfg.index}`;

            let info = this._proxy.getHuanhuaInfo(this._selCfg.index);
            let star = info && info.star || 0;
            if (star >= this._selCfg.costs.length) {
                star = this._selCfg.costs.length - 1;//满星，则取最后一个
            }

            let strList: string[] = [];
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, this._selCfg.buff_ids[star]);
            if (buffCfg) {
                strList.push(buffCfg.des);
            }
            if (this._selCfg.special_ids) {
                for (let i = 0; i < this._selCfg.special_ids.length; i++) {
                    let cfg: NewPrivilegeConfig = getConfigByNameId(ConfigName.NewPrivilege, this._selCfg.special_ids[i]);
                    if (cfg) {
                        strList.push(cfg.desc);//todo
                    }
                }
            }
            this._view.lb_buff.textFlow = TextUtil.parseHtml(strList.join('\n'));

            let isActed = this._proxy.isHuanhuaActed(this._selCfg.index);
            this._view.btn_huanhua.visible = isActed;
            if (isActed) {
                let nowUseId = this._proxy.now_use_id;
                this._view.btn_huanhua.icon = this._selCfg.index == nowUseId ? 'xiexiatubiao' : 'huanhuatubiao';
            }

            this.updateStar();
            this.updateCost();
        }

        private updateStar(): void {
            let info = this._proxy.getHuanhuaInfo(this._selCfg.index);
            let star = info && info.star || 0;
            this._view.starListView.updateBigStar(star);
        }

        private updateCost(): void {
            let info = this._proxy.getHuanhuaInfo(this._selCfg.index);
            let star = info && info.star || 0;
            let isMaxStar = star >= this._selCfg.costs.length;
            if (isMaxStar) {
                star = this._selCfg.costs.length - 1;
            }
            let cost = this._selCfg.costs[star];

            let cnt = this._proxy.shuijin_value;
            this._view.coin.initIcon(cost[0]);
            this._view.coin.lab_cost.text = `${cnt}/${cost[1]}`;

            if (isMaxStar) {
                this._view.btn_upstar.updateMaxStar();
                return;
            }

            this._view.btn_upstar.updateCost(cost, star > 0, '', false, this._proxy.shuijin_value);
            this._view.btn_upstar.img_cost.visible = false;
            this._view.btn_upstar.setHint(this._proxy.canActOrUpstar(this._selCfg.index));
        }

        private onClickHuanhua(): void {
            let nowUseId = this._proxy.now_use_id;
            let isUsing = this._selCfg.index == nowUseId;
            if (isUsing) {
                this._proxy.sendJitanButtonClick(ZhanduiOperType.Oper205, null, 0);
                return;
            }
            this._proxy.sendJitanButtonClick(ZhanduiOperType.Oper205, null, this._selCfg.index);
        }

        private onClickUpstar(): void {
            if (!this._proxy.canActOrUpstar(this._selCfg.index, true)) {
                return;
            }
            let info = this._proxy.getHuanhuaInfo(this._selCfg.index);
            let star = info && info.star || 0;
            let cost = this._selCfg.costs[star];
            if (!cost) {
                return;
            }
            let propCfg = GameConfig.getPropConfigById(cost[0]);
            let str = `是否花费` + TextUtil.addColor(cost[1] + (propCfg && propCfg.name || ''), WhiteColor.GREEN)
                + (star == 0 ? getLanById(LanDef.active) : getLanById(LanDef.upstar)) + this._selCfg.name;
            ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.upstarHandler, [this._selCfg.index]));
        }

        private upstarHandler(index: number): void {
            this._proxy.sendJitanButtonClick(ZhanduiOperType.Oper204, null, index);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            let list: AvatarItemData[] = this._listData.source;
            let preData = list[this._selIdx];
            if (preData) {
                preData.isSel = false;
                this._listData.itemUpdated(preData);
            }
            let data: AvatarItemData = e.item;
            data.isSel = true;
            this._listData.itemUpdated(data);

            this._selIdx = itemIdx;
            this._selCfg = data.cfg;
            this.updateView();
        }

        //todo 赛季期限，处理 XujieJitanHuanhuaItem 的倒计时
        update(time: base.Time) {
        }
    }
}