namespace game.mod.xianyuan {

    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;
    import facade = base.facade;

    export class ChildMdr extends MdrBase {
        private _view: ChildView = this.mark("_view", ChildView);
        private _proxy: ChildProxy;
        private _xianlvProxy: XianlvProxy;
        private _listSkill: eui.ArrayCollection;
        private _listChild: eui.ArrayCollection;
        private _skillTipsId: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Child);
            this._xianlvProxy = this.retProxy(ProxyType.Xianlv);
            this._view.list_skill.itemRenderer = SkillItemRender;
            this._view.list_skill.dataProvider = this._listSkill = new eui.ArrayCollection();
            this._view.list.itemRenderer = ChildItem;
            this._view.list.dataProvider = this._listChild = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_check, egret.TouchEvent.TOUCH_TAP, this.onClickCheck, this);
            addEventListener(this._view.skillItem, egret.TouchEvent.TOUCH_TAP, this.onClickSkill, this);
            addEventListener(this._view.list_skill, eui.ItemTapEvent.ITEM_TAP, this.onClickListSkill, this);
            this.onNt(XianyuanEvent.ON_UPDATE_CHILD_SHARE_INFO, this.updateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._skillTipsId = null;
        }

        private updateView(): void {
            this._view.power.setPowerValue(this._proxy.getChildPower());
            this.updateChildView();
            this.updateSkillView();
        }

        private updateChildView(): void {
            let list: IChildItemData[] = [];
            let vipList: number[] = this._proxy.getVipList();
            let vipLv = VipUtil.getShowVipLv();
            let battleList = this._proxy.getBattleChildList();
            for (let i = 0; i < vipList.length; i++) {
                let vip = vipList[i];
                list.push({
                    vip,
                    isActed: vipLv >= vip,
                    childIndex: battleList[i],
                    pos: i + 1
                });
            }
            this._listChild.replaceAll(list);
        }

        private updateSkillView(): void {
            let skillList = this._proxy.getActedSkillList();
            let shareSkillList = this._proxy.getShareSkillList();
            let mainSkillId = shareSkillList[0];
            this._view.skillItem.data = {
                skillId: mainSkillId,
                isAct: skillList.indexOf(mainSkillId) > -1
            };

            let list: SkillItemRenderData[] = [];
            for (let i = 1; i < shareSkillList.length; i++) {
                let skillId = shareSkillList[i];
                let isActed = skillList.indexOf(skillId) > -1;
                list.push({
                    skillId: skillId,
                    isAct: isActed,
                    showHint: this._proxy.getSkillHint(skillId)
                });
                if (this._skillTipsId && this._skillTipsId == skillId && isActed) {
                    this.sendNt(SurfaceEvent.SURFACE_SKILL_UPDATE, true);
                }
            }
            this._listSkill.replaceAll(list);
        }

        private onClickAttr(): void {
            ViewMgr.getIns().showSecondPop(ModName.Xianyuan, XianyuanViewType.AttrView);
        }

        private onClickCheck(): void {
            let banlvInfo = this._xianlvProxy.getBanlvInfo();
            if (!banlvInfo) {
                PromptBox.getIns().show(getLanById(LanDef.xianlv_tips25));
                return;
            }
            ViewMgr.getIns().showRoleTips(banlvInfo.role_id, banlvInfo.server_id);
        }

        //主动技能
        private onClickSkill(): void {
            facade.showView(ModName.Xianyuan, XianyuanViewType.ChildSkillTips);
        }

        //被动技能
        private onClickListSkill(e: eui.ItemTapEvent): void {
            let data = e.item as SkillItemRenderData;
            if (!data) {
                return;
            }
            this._skillTipsId = data.skillId;
            ViewMgr.getIns().showSkillTips(data.skillId, data.isAct, Handler.alloc(this, this.confirmAct, [data]));
        }

        private confirmAct(data: SkillItemRenderData): void {
            if (data) {
                this._proxy.c2s_child_share_skill_act(data.skillId);
            }
        }

        private updateSkillListHint(): void {
            let size = this._listSkill.source.length;
            for (let i = 0; i < size; i++) {
                let data = this._listSkill.source[i] as SkillItemRenderData;
                if (!data) {
                    continue;
                }
                data.showHint = this._proxy.getSkillHint(data.skillId);
                this._listSkill.itemUpdated(data);
            }
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            let skillCost = this._proxy.getSkillActCost();
            for (let id of skillCost) {
                if (indexs.indexOf(id) > -1) {
                    this.updateSkillListHint();
                    break;
                }
            }
        }
    }
}