namespace game.mod.shenling {

    import Handler = base.Handler;
    import GameNT = base.GameNT;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import BuffConfig = game.config.BuffConfig;
    import LanDef = game.localization.LanDef;

    export class ShenlingLingliMdr extends MdrBase {
        private _view: ShenlingLingliView = this.mark("_view", ShenlingLingliView);
        private _proxy: ShenlingLingliProxy;

        private _scrollerH = 0;
        private _skillListCompH = 0;
        private _selType: ShenLingType = 0;
        private _selIdx = 0;//技能序号，默认主动技能 LingliMainSkillIdx

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.ShenlingLingli);
            this._scrollerH = this._view.scroller.height;
            this._skillListCompH = this._view.skillListComp.height;
            this._view.line0_0.setMax();
            this._view.line0_1.setMax();
            this._view.line1_0.setMax();
            this._view.line1_1.setMax();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.typeListComp.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickType, this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            addEventListener(this._view.btn_reset, egret.TouchEvent.TOUCH_TAP, this.onClickReset, this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickBtnDo, this);
            addEventListener(this._view.icon_main, egret.TouchEvent.TOUCH_TAP, this.onClickIconMain, this);
            this.onNt(ShenLingEvent.ON_LING_LI_ICON_SELECT, this.onUpdateIconMainSel, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_LING_LI_UPDATE, this.onUpdateView, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.resetScroller();
            this._view.typeListComp.updateListView(ShenLingMdrType.Lingli);
            let proxy: ShenLingProxy = this.retProxy(ProxyType.Shenling);
            let typeAry = proxy.getActedTypeList();
            this.onSwitchType(typeAry[0]);
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
        }

        private resetScroller(): void {
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = this._skillListCompH - this._scrollerH;
        }

        private onSwitchType(type: ShenLingType): void {
            this._selType = type;
            this._selIdx = LingliMainSkillIdx;

            this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_BG, `lingli_bg${type}`);
            this._view.typeListComp.updateSelType(type);

            this.updateView();
            this.onClickIconMain();
        }

        private onUpdateView(): void {
            this.updateView();
            this.updateSkillDesc();
        }

        private updateView(): void {
            this._view.typeListComp.updateListHint(ShenLingMdrType.Lingli);
            this._view.skillListComp.updateView(this._selType);

            let skill_data = this._proxy.getMainSkillData(this._selType);
            let skill_lv = skill_data ? skill_data.level : 1;
            let cfg = this._proxy.getConfig(this._selType, skill_lv);
            this._view.icon_main.data = {
                type: this._selType,
                index: cfg ? cfg.main_skill : 0,
                idx: LingliMainSkillIdx,
                lv: skill_data && skill_data.level || 0,
                isMaxLv: this._proxy.isMaxLevel(this._selType, LingliMainSkillIdx),
                hint: this._proxy.canActOrUp(this._selType, LingliMainSkillIdx),
                isMain: true
            };
            this.updateResetCost();
            this.updateCost();
            this.updateLine();
        }

        private updateLine(): void {
            let isActed1 = this._proxy.isSkillActed(this._selType, 1);
            let lineVal1 = isActed1 ? 1 : 0;
            this._view.line0_0.updateLine(lineVal1);
            this._view.line0_1.updateLine(lineVal1);

            let isActed2 = this._proxy.isSkillActed(this._selType, 2);
            let lineVal2 = isActed2 ? 1 : 0;
            this._view.line1_0.updateLine(lineVal2);
            this._view.line1_1.updateLine(lineVal2);
        }

        private updateSkillDesc(): void {
            this._view.skillDescComp.updateView(this._selType, this._selIdx);
        }

        private updateResetCost(): void {
            let cfg = this._proxy.getConfig(this._selType, 1);
            if (!cfg) {
                return;
            }
            let costIndex = cfg.main_cost[0];
            let propCfg = GameConfig.getPropConfigById(costIndex);
            if (propCfg) {
                let cnt = BagUtil.getPropCntByIdx(costIndex);
                let txt = TextUtil.addColor(cnt + '', cnt > 0 ? BlackColor.GREEN : 0xFEFDDB);
                this._view.lb_resetcost.textFlow = TextUtil.parseHtml(`${propCfg.name}:${txt}`);
            }
        }

        private updateCost(): void {
            let isMaxLv = this._proxy.isMaxLevel(this._selType, this._selIdx);
            this._view.img_max.visible = isMaxLv;
            this._view.gr_cost.visible = !isMaxLv;

            if (isMaxLv) {
                return;
            }

            let skill_data = this._proxy.getSkillData(this._selType, this._selIdx);
            let isMain = this._selIdx == LingliMainSkillIdx;
            let skill_lv = skill_data ? skill_data.level : 0;
            let nextCfg = this._proxy.getConfig(this._selType, skill_lv + 1);
            if (!nextCfg) {
                return;
            }
            let cost = isMain ? nextCfg.main_cost : nextCfg.buff_costs[this._selIdx - 1];
            let propCfg = GameConfig.getPropConfigById(cost[0]);
            if (!propCfg) {
                return;
            }

            //消耗处理
            let bagCnt = BagUtil.getPropCntByIdx(cost[0]);
            let costCnt = cost[1];
            let costTxt = TextUtil.addColor(`${bagCnt}/${costCnt}`, bagCnt >= costCnt ? BlackColor.GREEN : BlackColor.RED);
            this._view.lb_cost.textFlow = TextUtil.parseHtml(`${propCfg.name}:${costTxt}`);

            //前置条件处理
            let txt: string;
            if (isMain) {
                txt = '';
            } else {
                let cond = nextCfg.condition[this._selIdx - 1];
                let preIdx = cond[0];
                let preNeedLv = cond[1];
                let name: string;
                if (preIdx == LingliMainSkillIdx) {
                    let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, nextCfg.main_skill);
                    name = cfg ? cfg.name : '';
                } else {
                    let buffId = nextCfg.buff_skills[this._selIdx - 1];
                    let cfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
                    name = cfg ? cfg.name : '';
                }
                let preData = this._proxy.getSkillData(this._selType, preIdx);
                let preLv = preData ? preData.level : 0;
                txt = getLanById(LanDef.lingli_tips2) + `${name} ` + TextUtil.addColor(`(${preLv}/${preNeedLv})`, preLv >= preNeedLv ? WhiteColor.GREEN : WhiteColor.RED);
            }
            this._view.lb_precondition.textFlow = TextUtil.parseHtml(txt);

            this._view.btn_do.label = skill_lv == 0 ? getLanById(LanDef.active) : getLanById(LanDef.uplv);
            this._view.btn_do.setHint(this._proxy.canActOrUp(this._selType, this._selIdx));
        }

        private onClickType(e: eui.ItemTapEvent): void {
            if (!e) {
                return;
            }
            let type = (e.item as ISLTypeIconData).type;
            if (type == this._selType) {
                return;
            }
            this._view.icon_main.setSel(false);
            this.resetScroller();
            this.onSwitchType(type);
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.lingli_tips5));
        }

        private onClickReset(): void {
            if (!this._proxy.isActed(this._selType)) {
                PromptBox.getIns().show(getLanById(LanDef.lingli_tips3));
                return;
            }
            let paramCfg = GameConfig.getParamConfigById('lingli_reset');
            if (!paramCfg) {
                return;
            }
            let cost: number[] = paramCfg.value;
            let propCfg = GameConfig.getPropConfigById(cost[0]);
            let txt = StringUtil.substitute(getLanById(LanDef.lingli_tips4), [TextUtil.addColor(`${cost[1]}${propCfg.name}`, WhiteColor.GREEN)]);
            ViewMgr.getIns().showConfirm(txt, Handler.alloc(this, this.reset, [this._selType]));
        }

        private reset(type: ShenLingType): void {
            this._proxy.c2s_god_brother_lingli_reset_point(type);
        }

        private onClickBtnDo(): void {
            if (this._proxy.canActOrUp(this._selType, this._selIdx, true)) {
                this._proxy.c2s_god_brother_lingli_click(this._selType, this._selIdx);
            }
        }

        private onClickIconMain(): void {
            if (this._view.icon_main.isSeled()) {
                return;
            }
            this._view.icon_main.setSel(true);
            this._selIdx = LingliMainSkillIdx;
            this.updateSkillDesc();
            this.updateCost();
            this.sendNt(ShenLingEvent.ON_LING_LI_MAIN_ICON_SELECT);
        }

        private onUpdateIconMainSel(n: GameNT): void {
            let [type, idx] = n.body as number[];
            if (type != this._selType) {
                return;
            }
            this._view.icon_main.setSel(false);
            this._selIdx = idx;
            this.updateSkillDesc();
            this.updateCost();
        }

        private onRoleUpdate(n: GameNT): void {
            let keys = n.body as string[];
            for (let key of LingliPointAry) {
                if (keys.indexOf(PropIndexToKey[key]) > -1) {
                    this.updateView();
                }
            }
        }
    }
}