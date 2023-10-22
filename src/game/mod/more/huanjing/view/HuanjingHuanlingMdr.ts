namespace game.mod.more {

    import facade = base.facade;

    export class HuanjingHuanlingMdr extends EffectMdrBase {
        private _view: HuanjingHuanlingView = this.mark("_view", HuanjingHuanlingView);
        private _proxy: HuanjingProxy;
        private _systemId: number;
        private _listBtn: eui.ArrayCollection;
        private _selIdx: number = 0;
        private _skillItems: SkillItemRender[] = [];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);

            this._view.list_btn.itemRenderer = ShenlingTypeIconBase;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this._skillItems = [];
            let i = 0;
            while (this._view['skillItem' + i]) {
                this._skillItems.push(this._view['skillItem' + i]);
                addEventListener(this._view['skillItem' + i], egret.TouchEvent.TOUCH_TAP, this.onClickSkill, this);
                i++;
            }
            this.onNt(MoreEvent.ON_UPDATE_HUANJING_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._systemId = this._showArgs;
            if (!this._systemId) {
                return;
            }
            this.updateView();
            this._view.list_btn.selectedIndex = this._selIdx;
        }

        protected onHide(): void {
            super.onHide();
            this._systemId = null;
            this._selIdx = 0;
            this._skillItems = [];
        }

        private updateView(): void {
            let list: ShenlingTypeIconData[] = [];
            let ary = ShenLingTypeAry;
            for (let i = 0; i < ary.length; i++) {
                let type = ary[i];
                list.push({
                    type,
                    showHint: this._proxy.getHuanlingHintByType(this._systemId, i + 1)//todo
                });
            }
            this._listBtn.replaceAll(list);

            let info = this._proxy.getHuanlingInfo(this._systemId, this._selIdx + 1);
            let stage = info && info.stage || 0;
            if (stage > 0) {
                this._view.btn_do.label = "进阶";
            } else {
                this._view.btn_do.label = "激活";
            }
            let stageStr = ResUtil.getChineseFontStr(stage) + "j";
            this.addBmpFont(stageStr, BmpTextCfg[BmpTextType.Stage], this._view.grp_lv, false, 1, true);
            this._view.lb_lv.text = stage + '阶';//todo

            this.updateSkill();

            let isMaxStage = this._proxy.isHuanlingMaxStage(this._systemId, this._selIdx + 1);
            if (isMaxStage) {
                this._view.currentState = 'max';
                return;
            }

            this._view.currentState = 'default';
            let cfg = this._proxy.getHuanlingCfg(this._systemId, this._selIdx + 1, stage + 1);
            if (cfg) {
                this._view.icon.data = cfg.cost;
                this._view.icon.updateCostLab(cfg.cost);
            }
            this._view.btn_do.setHint(this._proxy.canHuanling(this._systemId, this._selIdx + 1));

            this._view.img_bg.source = ResUtil.getUiPng(`huanjing_huanling_bg${this._systemId}_${this._selIdx + 1}`);
            this._view.img_huanlingname.source = `huanjing_huanling_name${this._systemId}_${this._selIdx + 1}`;
        }

        private updateSkill(): void {
            for (let i = 0; i < 4; i++) {
                let skillItem = this._view[`skillItem${i}`];
                if (!skillItem) {
                    continue;
                }
                let skillList = this._proxy.getHuanlingSkillData(this._systemId, this._selIdx + 1, i + 1);
                let skillInfo = this._proxy.getHuanlingSkillInfo(this._systemId, this._selIdx + 1, i + 1);
                let skillData: SkillItemRenderData = {
                    skillId: skillList[3],
                    isAct: !!skillInfo,
                    showHint: this._proxy.canHuanlingSkillAct(this._systemId, this._selIdx + 1, i + 1)//todo
                };
                skillItem.data = skillData;//todo
            }
        }

        private onClick(): void {
            if (this._proxy.canHuanling(this._systemId, this._selIdx + 1, true)) {
                this._proxy.c2s_huanjin_oper(this._systemId, 4, this._selIdx + 1);
            }
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            this._selIdx = itemIdx;
            this.updateView();
        }

        private onClickSkill(e: egret.TouchEvent): void {
            let target = e.currentTarget;
            let idx = this._skillItems.indexOf(target);
            facade.showView(ModName.More, MoreViewType.HuanjingHuanlingSkillTips, {
                systemId: this._systemId,
                pos: idx + 1,
                type: this._selIdx + 1
            });
        }
    }
}