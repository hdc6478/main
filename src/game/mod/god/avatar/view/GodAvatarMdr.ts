namespace game.mod.god {


    import ArrayCollection = eui.ArrayCollection;
    import TiandiShifangConfig = game.config.TiandiShifangConfig;
    import TouchEvent = egret.TouchEvent;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;
    import TiandiShifnagLevelConfig = game.config.TiandiShifnagLevelConfig;
    import tiandi_level_data = msg.tiandi_level_data;
    import Handler = base.Handler;
    import RebirthConfig = game.config.RebirthConfig;

    export class GodAvatarMdr extends EffectMdrBase {
        private _view: GodAvatarView = this.mark("_view", GodAvatarView);
        private _proxy: GodProxy;
        private _listData: ArrayCollection = new ArrayCollection();
        private _listLevel: ArrayCollection = new ArrayCollection();
        private _listSkill: ArrayCollection = new ArrayCollection();

        private _cfg: TiandiShifangConfig;
        private maxLevel: number;
        private _info: tiandi_level_data;

        protected onInit(): void {
            super.onInit();

            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.God);

            this._view.list.itemRenderer = GodAvatarItem;
            this._view.list.dataProvider = this._listData;

            this._view.list_item.itemRenderer = GodDragonoathLvItemRender;
            this._view.list_item.dataProvider = this._listLevel;

            this._view.list_skill.itemRenderer = GodBuffItem;
            this._view.list_skill.dataProvider = this._listSkill;

            let text: string = this._view.lab_tips.text;
            this._view.lab_tips.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(text, WhiteColor.GREEN));
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_activate, TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.list_skill, ItemTapEvent.ITEM_TAP, this.onClickSkill);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickSelect, this);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.lab_tips, TouchEvent.TOUCH_TAP, this.onClickJump);

            this.onNt(GodEvent.ON_UPDATE_AVATAR_INFO, this.onUpdateTab, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onInitTab();
        }

        private onInitTab(): void {
            let cfgArr: TiandiShifangConfig[] = getConfigListByName(ConfigName.TiandiShifang);
            this._listData.source = cfgArr;

            //todo 初始化index
            let index: number = this._proxy.getInitType4Index();
            this.onUpdateIndex(index);
        }

        private onUpdateTab(): void {
            let cfgArr: TiandiShifangConfig[] = getConfigListByName(ConfigName.TiandiShifang);
            this._listData.replaceAll(cfgArr);

            this.onUpdateView();
        }

        private onUpdateIndex(index: number): void {
            this._view.list.selectedIndex = index;
            this.onUpdateView()
        }

        private onUpdateView(): void {
            this._cfg = this._listData.source[this._view.list.selectedIndex];
            this._view.name_item.updateShow(this._cfg.name);

            this._info = this._proxy.getType4Info(this._cfg.itype);
            let level: number = this._info && this._info.level || 0;

            let activate: boolean = !!this._info;
            this._view.currentState = activate ? "activate" : "default";

            this._view.img_icon.source = ResUtil.getUiPng(`god_big_icon_${this._cfg.itype}`);

            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, this._cfg.condtion);
            this._view.lab_limit.text = RoleUtil.getRebirthLvStr(cfg.index) + `激活`;//仙人${cfg.relv}转
            if (ViewMgr.getIns().checkRebirth(this._cfg.condtion)) {
                this._view.btn_activate.visible = true;
                this._view.grp_lab.visible = false;
            } else {
                this._view.btn_activate.visible = false;
                this._view.grp_lab.visible = true;
            }

            this.onUpdateLevel(level);
            this.onUpdateUp();

            let power: number | Long = 0;
            if (this._info && this._info.attrs) {
                power = this._info.attrs.showpower;
            }
            this._view.power.setPowerValue(power);

            let stage: number = Math.floor(level / 10) || 1;
            let stageStr = ResUtil.getChineseFontStr(stage) + "j";
            this.addBmpFont(stageStr, BmpTextCfg[BmpTextType.Stage], this._view.grp_lv, false, 1, true);

            this.onUpdateSkill();
        }

        private onUpdateUp(): void {
            let level: number = this._info && this._info.level || 0;
            let exp: number = this._info && this._info.exp || 0;
            this.maxLevel = this._proxy.getMaxLevelType4(this._cfg.itype);
            if (level >= this.maxLevel) {
                this._view.bar.showMax();
            } else {
                let maxExp = this._proxy.getMaxExpType4(this._cfg.itype);
                this._view.bar.show(exp * DEFAULT_EXP, maxExp * DEFAULT_EXP,false);
            }

            if (this._info) {
                let cost: TiandiShifnagLevelConfig = this._proxy.getCostType4(this._cfg.itype, level);
                this._view.cost.updateShow(cost.cost[0]);
                this._view.btn_up.setHint(BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1]));
            } else {
                this._view.btn_up.setHint(false);
            }
        }

        private onUpdateSkill(): void {
            let skills: number[][] = this._cfg.buffs;

            let datas: GodBuffData[] = [];
            for (let skill of skills) {
                let data: GodBuffData = {};
                data.skillId = skill[0];
                data.isAct = this._info && this._info.indexs && this._info.indexs.indexOf(skill[0]) > -1;
                data.showHint = !data.isAct && this._info && this._info.level > skill[1];
                data.cur = this._info && this._info.level || 0;
                data.limit = skill[1];
                datas.push(data);
            }
            this._listSkill.replaceAll(datas);
        }

        private onUpdateLevel(level: number) {
            let list: boolean[] = [];
            for (let i = 0; i < 10; i++) {
                let bool: boolean = level % 10 >= i + 1 || level % 10 == 0 && level > 0;
                list.push(bool);
            }
            this._listLevel.replaceAll(list);
        }

        private onClick(e: TouchEvent): void {
            let t: number;
            switch (e.currentTarget) {
                case this._view.btn_activate:
                    if (!ViewMgr.getIns().checkRebirth(this._cfg.condtion)) {
                        PromptBox.getIns().show(ViewMgr.getIns().checkRebirthStr(this._cfg.condtion));
                        return;
                    }
                    t = GodActOper.Activate;
                    break;
                case this._view.btn_up:
                    let cost: TiandiShifnagLevelConfig = this._proxy.getCostType4(this._cfg.itype, this._info && this._info.level);
                    if (!BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1], PropLackType.Dialog)) {
                        return;
                    }
                    t = GodActOper.Up;
                    break;
                default:
                    return;
            }
            this._proxy.c2s_tiandi_shifang_level_up(t, this._cfg.itype);
        }

        private onClickSelect(e: ItemTapEvent): void {
            this.onUpdateIndex(e.itemIndex);
        }

        private onClickAttr(): void {
            ViewMgr.getIns().showAttrTips(getLanById(LanDef.soul14),
                this._info ? this._info.attrs : null);
        }

        private onClickSkill(e: ItemTapEvent): void {
            let data: GodBuffData = e.item;
            let skillId = data.skillId;
            let isAct = data.isAct;
            let confirm = Handler.alloc(this, () => {
                this._proxy.c2s_tiandi_shifang_skill_active(this._cfg.itype, e.itemIndex + 1);
            });
            let cur: number = data.cur;
            let limit: number = data.limit;

            ViewMgr.getIns().showSecondPop(ModName.God, GodViewType.GodBuffTips, {
                skillId, isAct, confirm, cur, limit
            })
        }

        private onClickJump(): void {
            ViewMgr.getIns().showView(ModName.Xianlu, XianluViewType.XianluMain);
        }

        protected onHide(): void {
            super.onHide();
        }

    }
}