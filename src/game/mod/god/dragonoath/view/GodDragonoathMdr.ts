namespace game.mod.god {


    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import TiandiTianlongJihuoConfig = game.config.TiandiTianlongJihuoConfig;
    import TouchEvent = egret.TouchEvent;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;
    import BuffConfig = game.config.BuffConfig;
    import TiandiTianlongConfig = game.config.TiandiTianlongConfig;
    import tiandi_level_data = msg.tiandi_level_data;

    export class GodDragonoathMdr extends EffectMdrBase {
        private _view: GodDragonoathView = this.mark("_view", GodDragonoathView);
        private _proxy: GodProxy;
        private _listData: ArrayCollection = new ArrayCollection();
        private _listLevel: ArrayCollection = new ArrayCollection();

        private _cfg: TiandiTianlongJihuoConfig;
        private _info: tiandi_level_data;
        private maxLevel: number;

        protected onInit(): void {
            super.onInit();

            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.God);

            this._view.list.itemRenderer = GodDragonoathItem;
            this._view.list.dataProvider = this._listData;

            this._view.list_item.itemRenderer = GodDragonoathLvItemRender;
            this._view.list_item.dataProvider = this._listLevel;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_activate, TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickSelect, this);
            addEventListener(this._view.icon_suit, TouchEvent.TOUCH_TAP, this.onClickTips);

            this.onNt(GodEvent.ON_UPDATE_TIANLONG_INFO, this.onUpdateTab, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onInitTab();
        }

        private onInitTab(): void {
            let cfgArr: TiandiTianlongJihuoConfig[] = getConfigListByName(ConfigName.TiandiTianlongJihuo);
            this._listData.source = cfgArr;

            //todo 初始化index
            let index: number = this._proxy.getInitType3Index();
            this.onUpdateIndex(index);
        }

        private onUpdateTab(): void {
            let cfgArr: TiandiTianlongJihuoConfig[] = getConfigListByName(ConfigName.TiandiTianlongJihuo);
            this._listData.replaceAll(cfgArr);

            this.onUpdateView();
        }

        private onSelectIndex(n: GameNT): void {
            let index: number = n.body;
            this.onUpdateIndex(index);
        }

        private onUpdateIndex(index: number): void {
            this._view.list.selectedIndex = index;
            this.onUpdateView()
        }

        private onUpdateView(): void {
            this._cfg = this._listData.source[this._view.list.selectedIndex];
            this._view.name_item.updateShow(this._cfg.name);

            this._info = this._proxy.getType3Info(this._cfg.itype);
            let level: number = this._info && this._info.level || 0;

            let activate: boolean = !!this._info;
            this._view.currentState = activate ? "activate" : "default";

            this._view.img_icon.source = ResUtil.getUiPng(`god_img_${this._cfg.itype}`);


            this.onUpdateLevel(level);

            let power = this._info && this._info.attrs && this._info.attrs.showpower || 0;
            this._view.power.setPowerValue(power);

            let god: number = this._info && this._info.attrs && this._info.attrs.god || 0;
            this._view.god_item.updateGod(god);

            let stage: number = Math.floor(level / 10) || 1;
            let stageStr = ResUtil.getChineseFontStr(stage) + "j";
            this.addBmpFont(stageStr, BmpTextCfg[BmpTextType.Stage], this._view.grp_lv, false, 1, true);

            let buff: number[] = this._proxy.getBuff(this._cfg.itype);
            let cfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buff[1]);
            this._view.lab_name.text = cfg.name;
            this._view.lab_desc.text = cfg.des;
            this._view.icon_suit.setData(buff);

            if (this._view.currentState == "default") {
                this._view.lab_limit.text = `激活条件：仙力${this._cfg.condtion}`;
                if (god >= this._cfg.condtion) {
                    this._view.bar.showMax();
                    this._view.bar.showLabel("已达标");
                } else {
                    this._view.bar.show(god, this._cfg.condtion, false);
                }
            } else {
                this.onUpdateUp();
            }
        }


        private onUpdateUp(): void {
            let level: number = this._info && this._info.level || 0;
            let exp: number = this._info && this._info.exp || 0;
            this.maxLevel = this._proxy.getMaxLevelType3(this._cfg.itype);
            if (level >= this.maxLevel) {
                this._view.bar.showMax();
            } else {
                let maxExp = this._proxy.getMaxExpType3(this._cfg.itype);
                this._view.bar.show(exp * DEFAULT_EXP, maxExp * DEFAULT_EXP, false);
            }

            if (this._info) {
                let cost: TiandiTianlongConfig = this._proxy.getCostType3(this._cfg.itype, level);
                this._view.cost.updateShow(cost.cost[0]);
                this._view.btn_up.setHint(BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1]));
            } else {
                this._view.btn_up.setHint(false);
            }
        }

        private onUpdateLevel(level: number) {
            let list: boolean[] = [];
            for (let i = 0; i < 10; i++) {
                let index: number = i + 1;
                let bool: boolean = level % 10 >= index || level % 10 == 0 && level > 0;
                list.push(bool);
            }
            this._listLevel.replaceAll(list);
        }

        private onClick(e: TouchEvent): void {
            let t: number;
            switch (e.currentTarget) {
                case this._view.btn_activate:
                    if (!RoleVo.ins.god || RoleVo.ins.god < this._cfg.condtion) {
                        PromptBox.getIns().show(getLanById(LanDef.dragon_tips4));
                        return;
                    }
                    t = GodActOper.Activate;
                    break;
                case this._view.btn_up:
                    let cost: TiandiTianlongConfig = this._proxy.getCostType3(this._cfg.itype, this._info && this._info.level);
                    if (!BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][0][1], PropLackType.Dialog)) {
                        return;
                    }
                    t = GodActOper.Up;
                    break;
                default:
                    return;
            }
            this._proxy.c2s_tiandi_tianlong_level_up(t, this._cfg.itype);
        }

        private onClickSelect(e: ItemTapEvent): void {
            this.onUpdateIndex(e.itemIndex);
        }

        private onClickTips(): void {
            ViewMgr.getIns().showSecondPop(ModName.God, GodViewType.GodDragonoathBuffTips, { index: this._cfg.itype });
        }

        protected onHide(): void {
            super.onHide();
        }

    }
}