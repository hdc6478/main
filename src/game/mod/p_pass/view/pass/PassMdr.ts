namespace game.mod.pass {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import GateConfig = game.config.Gate1Config;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import WorldmapConfig = game.config.WorldmapConfig;
    import Handler = base.Handler;
    import Tween = base.Tween;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;

    export class PassMdr extends EffectMdrBase implements UpdateItem{

        private _view: PassView = this.mark("_view", PassView);
        private _proxy: PassProxy;
        private _model: PassModel;

        private _curNode: PassNode;         // 当前节点

        private _cfgs: any;
        private _rewardDatas: ArrayCollection;

        private readonly passNum: number = 11;

        constructor(parent: DisplayObjectContainer) {
            super(parent);
        }

        protected onInit(): void {
            super.onInit();

            this._view.horizontalCenter = 0;

            this._rewardDatas = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._rewardDatas;

            this._proxy = this.retProxy(ProxyType.Pass);
            this._model = this._proxy.getModel();

            this._proxy.c2s_mainline_open_ui();
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(PassEvent.UPDATE_MAIN_PASS_INFO, this.updateData, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onBtnFight);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onBtnRank);
            addEventListener(this._view.btn_preview, TouchEvent.TOUCH_TAP, this.onBtnPreview);
            addEventListener(this._view.btn_ling, TouchEvent.TOUCH_TAP, this.onBtnLing);
        }

        protected onShow(): void {
            super.onShow();

            if (!this._cfgs) {
                this._cfgs = getConfigByName(ConfigName.WorldMap);
            }
            for (let k in this._cfgs) {
                let cfg: WorldmapConfig = this._cfgs[k];
                if (cfg.gate.length < 2) {
                    continue;
                }
                let startStep = this._proxy.getStepByIdx(cfg.gate[0]);
                let endStep = this._proxy.getStepByIdx(cfg.gate[1]);
                let curStep = this._proxy.getStepByIdx(this._model.curIndex);
                if (curStep >= startStep && curStep <= endStep) {
                    this._model.curWorldMapCfg = cfg;
                    this._model.curTotalStep = endStep - startStep + 1;
                    break;
                }
            }
            this._model.startIdx = this._model.curWorldMapCfg.gate[0];
            this._model.endIdx = this._model.curWorldMapCfg.gate[1];


            this.addEftByParent(ResUtil.getEffectUI(UIEftSrc.Chuangguanbeijing), this._view.grp_bg);

            this._view.btn_ling.setEffect(UIEftSrc.Chuangguanling);

            this._view.grp_bg.x = this._view.width;
            Tween.get(this._view.grp_bg, {loop: true}).to({x: -100}, 8000);
            this._view.btn_fight.setEffect(UIEftSrc.Tiaozhan);

            this.updateData();

            this.addEftByParent(ResUtil.getEffectUI(UIEftSrc.Chuangguanboss), this._view.grp_boss,0,0,-1,null,1);
            TimeMgr.addUpdateItem(this, 2000);
        }

        update(time: base.Time) {
            this.addEftByParent(ResUtil.getEffectUI(UIEftSrc.Chuangguanboss), this._view.grp_boss,0,0,-1,null,1);
        }

        protected onHide(): void {
            for (let i: number = 0; i < this.passNum; i++) {
                let btn: PassNode = this._view["node" + i];
                this.clearFont(btn.grp_font);
            }
            this._curNode = null;
            GuideMgr.getIns().clear(GuideKey.PassChallege);//清除指引
            Tween.remove(this._view.grp_bg);
            this.removeAllEffects();
            this._view.btn_fight.clearEffect();
            super.onHide();
        }

        private updateData() {
            let offStep = this._model.curTotalStep / (this.passNum - 1);    // 关卡间隔
            let startStep = this._proxy.getStepByIdx(this._model.startIdx);
            let endStep = this._proxy.getStepByIdx(this._model.endIdx);
            let tipStr = getLanById(LanDef.trial_tips9);

            let startNum = (this._model.curTotalStep == 10) ? 1 : 0;    // 只有10关时，第1个节点隐藏
            for (let i: number = 0; i < this.passNum; i++) {
                if (i < this.passNum - 1) {
                    let snode: PassNode = this._view["snode" + i];      // 小关卡节点
                    snode.visible = false;
                    snode.isSnode = true;
                }
                let btn: PassNode = this._view["node" + i];
                if (startNum == 1 && i == 0) {
                    btn.visible = false;
                    continue;
                }
                btn.visible = true;
                btn.step = (i == 0) ? startStep : startStep - 1 + i * offStep;
                if (btn.step < this._model.curStep) {
                    btn.state = 2;
                } else if (btn.step == this._model.curStep) {
                    btn.state = 1;
                } else {
                    btn.state = 0;
                }
                if (btn.state == 0 || btn.state == 1) {
                    let addEventListener = this.onEgret.bind(this);
                    addEventListener(btn, TouchEvent.TOUCH_TAP, this.onNode);
                }
                if (i == this.passNum - 1) {
                    btn.grp_1.visible = false;
                    btn.grp_2.visible = true;
                    this.addBmpFont(btn.step + "", BmpTextCfg[BmpTextType.CommonPower], btn.grp_font, true, 1, true);
                } else {
                    btn.grp_1.visible = true;
                    btn.grp_2.visible = false;
                    btn.lab_name.text = (i != this.passNum - 1) ? StringUtil.substitute(tipStr, [btn.step])
                        : StringUtil.substitute(tipStr, [endStep]);
                }
            }
            this.updateCurStep();
            this.updateOther();

            let index: number = this._proxy.getShowIndex();
            this._view.btn_preview.icon = this._proxy.getIcon(index);
            this._view.btn_preview.setHint(HintMgr.getHint([ModName.Pass, PassViewType.PassMain + PassMainBtnType.Main, PassViewType.Preview]));
            this._view.lab_open.textFlow = TextUtil.parseHtml(this._proxy.getOpenTxt(index));
        }

        private updateCurStep() {
            let curStep = this._proxy.getStepByIdx(this._model.curIndex);
            if (this._curNode && this._curNode.step == curStep) {
                return;
            }
            if (this._curNode && this._curNode.isSnode) {
                this._curNode.state = 0;
            }

            let b = false;
            let node: PassNode;
            let sNode: PassNode;
            for (let i: number = 0; i < this.passNum; i++) {
                node = this._view["node" + i];
                if (node.step == curStep) {
                    b = true;
                    break;
                }

                if (i == this.passNum - 1 || node.step > curStep) {
                    break;
                }
                if (node.step < curStep) {
                    sNode = this._view["snode" + i];
                }
            }

            if (b && node) {
                node.state = 1;
                this._curNode = node;
            } else if (sNode) {
                sNode.visible = true;
                sNode.state = 1;
                this._curNode = sNode;
                let addEventListener = this.onEgret.bind(this);
                addEventListener(sNode, TouchEvent.TOUCH_TAP, this.onNode);
            }
        }

        private updateOther(): void {
            let passCfg: GateConfig = getConfigByNameId(ConfigName.Gate, this._model.curIndex);
            this._view.lab_step_name.text = passCfg.gate_name;

            let cfg: RewardPreviewConfig = passCfg && passCfg.preview_id ?
                getConfigByNameId(ConfigName.RewardPreview, passCfg.preview_id) : null;
            let awds = cfg && cfg.content ? cfg.content : null;
            if (this._rewardDatas.length) {
                this._rewardDatas.replaceAll(awds);
            } else {
                this._rewardDatas.source = awds;
            }

            let tjPower: number = passCfg ? passCfg.fighting_capacitv : 0;
            let flag: boolean = RoleVo.ins.showpower.gte(tjPower);
            let isPass: boolean = this._model.nowWaveCnt >= this._model.targetWaveCnt;
            this._view.btn_fight.visible = isPass;
            this._view.btn_fight.redPoint.visible = isPass && flag;
            this._view.lab_condition.text = isPass ? "" : StringUtil.substitute(getLanById(LanDef.pass_tip3),
                [this._model.targetWaveCnt - this._model.nowWaveCnt]);
            if (isPass) {
                GuideMgr.getIns().show(GuideKey.PassChallege, this._view.btn_fight, Handler.alloc(this, this.onBtnFight));//指引
            }
        }

        private onNode(e: TouchEvent) {
            let node: PassNode = e.currentTarget;
            if (node.state == 0) {           // 未完成
                PromptBox.getIns().show("请通关前置关卡");
            } else if (node.state == 1) {    // 进行中
                this._proxy.c2s_mainline_enter();
                facade.hideView(ModName.Pass, PassViewType.PassMain);
            }
        }

        private onBtnRank() {
            ViewMgr.getIns().showView(ModName.Pass, PassViewType.PassRank);
        }

        private onBtnFight() {
            if (BagUtil.checkBagFull()) {
                return;
            }
            this._proxy.c2s_mainline_enter();
            //facade.hideView(ModName.Pass, PassViewType.PassMain);
            ViewMgr.getIns().showMain();//直接返回主界面，并清除界面数据
        }

        private onBtnPreview(): void {
            ViewMgr.getIns().showView(ModName.Pass, PassViewType.Preview);
        }

        private onBtnLing(): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.Giving);
        }
    }
}