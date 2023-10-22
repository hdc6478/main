namespace game.mod.more {


    import LanDef = game.localization.LanDef;

    export class HuanjingStageMdr extends EffectMdrBase {
        private _view: HuanjingStageView = this.mark("_view", HuanjingStageView);
        private _proxy: HuanjingProxy;
        private _listAttr: eui.ArrayCollection;

        private _systemId: number;//功能编号

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);

            this._view.list_nextattr.itemRenderer = AttrItemRender;
            this._view.list_nextattr.dataProvider = this._listAttr = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power2.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickBtnDo, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
            this.onNt(MoreEvent.ON_UPDATE_HUANJING_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._systemId = this._showArgs;
            if (!this._systemId) {
                return;
            }

            this._view.img_name.source = `huanjing_name` + this._systemId;
            this._view.img_bg.source = ResUtil.getUiPng(`huanjing_stage_bg` + this._systemId);

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._systemId = null;
        }

        private updateView(): void {
            let cfg = this._proxy.getHuanjingParamCfg(this._systemId);
            this._view.nameItem.updateShow(cfg.name);

            let lv = this._proxy.getStageLv(this._systemId);
            let stage = this._proxy.getStageNum(this._systemId);
            let stageStr = ResUtil.getChineseFontStr(stage) + "j";
            this.addBmpFont(stageStr, BmpTextCfg[BmpTextType.Stage], this._view.grp_lv, false, 1, true);

            this._view.stageSkillItem.updateShow(this._systemId);
            this._view.stageBar.updateShow(this._systemId);

            let isMaxStageLv = this._proxy.isMaxStageLv(this._systemId);
            if (isMaxStageLv) {
                this._view.currentState = 'max';
            } else {
                this._view.currentState = 'default';

                let maxStageLv = this._proxy.getMaxStageLv(this._systemId);
                let maxStageNum = Math.floor(Math.max(maxStageLv - 1, 0) / 10) % 10;

                this._view.lb_nextstage.text = (maxStageNum == stage ? stage : stage + 1) + '阶激活：';

                let stageCfg = this._proxy.getStageCfg(this._systemId, lv + 1);
                this._view.costIcon.updateShow(stageCfg ? stageCfg.cost : []);

                if (lv != 0 && lv % 10 == 0) {
                    this._view.btn_do.label = getLanById(LanDef.weapon_tips34);
                } else {
                    this._view.btn_do.label = '升级';
                }
                this._view.btn_do.setHint(this._proxy.canUpStage(this._systemId));
            }
            this.updateAttr();
        }

        private updateAttr(): void {
            let lv = this._proxy.getStageLv(this._systemId);
            let stage = this._proxy.getStageNum(this._systemId);
            let nextStageCfg = this._proxy.getStageCfg(this._systemId, (stage + 1) * 10 + 1);//下一阶
            if (!nextStageCfg) {
                nextStageCfg = this._proxy.getStageCfg(this._systemId, stage * 10 + 1);//没有下一阶了，则获取当前阶
            }
            let attr = RoleUtil.getAttr(nextStageCfg ? nextStageCfg.attr_id : 0);
            this._listAttr.replaceAll(attr ? TextUtil.getAttrTextInfos(attr, 0x55ff63, '\n', ' +', 0xfcf6d1) : []);

            //未激活不显示1级战力，策划需求
            let curCfg = this._proxy.getStageCfg(this._systemId, lv);
            let curAttr = RoleUtil.getAttr(curCfg && curCfg.attr_id || 0);
            let power = curAttr && curAttr.showpower ? curAttr.showpower.toNumber() : 0;
            this._view.power2.setPowerValue(power);

            this._view.power2.btn_desc.visible = lv > 0;
        }

        private onClickAttr(): void {
            let curCfg = this._proxy.getStageCfg(this._systemId);
            let attr = RoleUtil.getAttr(curCfg ? curCfg.attr_id : 0);
            ViewMgr.getIns().showAttrTipsWithoutGod('属性', attr);
        }

        private onClickBtnDo(): void {
            if (this._proxy.canUpStage(this._systemId, true)) {
                this._proxy.c2s_huanjin_oper(this._systemId, 1);
            }
        }

    }
}