namespace game.mod.more {


    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import HuangguShenqiConfig = game.config.HuangguShenqiConfig;
    import ItemTapEvent = eui.ItemTapEvent;
    import Handler = base.Handler;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;

    export class ArtifactMdr extends MdrBase {
        protected _view: ArtifactView = this.mark("_view", ArtifactView);

        private _listData: ArrayCollection = new ArrayCollection();
        private _listSkill: ArrayCollection = new ArrayCollection();

        private _proxy: SkyPalaceProxy;

        private isUp: boolean = false;
        private _lastIndex: number;

        private readonly len: number = 4;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.SkyPalace);

            this._view.list_item.itemRenderer = ArtifactTypeItem;
            this._view.list_item.dataProvider = this._listData;

            this._view.list_skill.itemRenderer = SkillItemRender;
            this._view.list_skill.dataProvider = this._listSkill;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_onekey, TouchEvent.TOUCH_TAP, this.onClickBtn);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickTypes);
            addEventListener(this._view.list_skill, ItemTapEvent.ITEM_TAP, this.onClickSkill);
            addEventListener(this._view.item_1, TouchEvent.TOUCH_TAP, this.onClickItem);
            addEventListener(this._view.item_2, TouchEvent.TOUCH_TAP, this.onClickItem);
            addEventListener(this._view.item_3, TouchEvent.TOUCH_TAP, this.onClickItem);
            addEventListener(this._view.item_4, TouchEvent.TOUCH_TAP, this.onClickItem);
            addEventListener(this._view.btn_suit, TouchEvent.TOUCH_TAP, this.onClickSuit);
            addEventListener(this._view.power2.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);

            this.onNt(MoreEvent.ON_UPDATE_ARTIFACT_INFO, this.onUpdateView, this);
            this.onNt(MoreEvent.ON_UPDATE_ARTIFACT_AUTO_INFO, this.onUpdateType, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onInitType();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onInitType(): void {
            let cfgArr: HuangguShenqiConfig[] = getConfigListByName(ConfigName.HuangguShenqi);
            this._listData.replaceAll(cfgArr);

            this._view.list_item.selectedIndex = this._proxy.getListSelect();
            this.onUpdateView();
        }

        private onUpdateType(n: GameNT): void {
            let index: number = n.body;
            if (!index || this._view.list_item.selectedIndex == index) {
                this.onUpdateView();
            } else {
                this._view.list_item.selectedIndex = this._proxy.getListSelect();
                this.onUpdateView();
            }
        }

        private onClickTypes(e: ItemTapEvent): void {
            this._view.list_item.selectedIndex = e.itemIndex;

            this.onUpdateView();
        }

        private onUpdateView(): void {
            let cfg: HuangguShenqiConfig = this._listData.source[this._view.list_item.selectedIndex];
            for (let i = 0; i < this.len; i++) {
                let pos: number = i + 1;
                let item: ArtifactBuweiItem = this._view[`item_${pos}`];
                item.setData({ index: cfg.index, pos, setHint: true });
            }

            let info = this._proxy.getInfo(cfg.index);
            let info_level: number = info && info.level || 0;
            this._view.btn_suit.setData(cfg.index, info_level);

            this.isUp = this._proxy.getActStatus(cfg.index);
            if (!this.isUp) {
                this._view.btn_suit.setData(cfg.index, info_level);
                this._view.btn_suit.setHint(false);
            } else {
                this._view.btn_suit.setUp(UIEftSrc.Shenqitupo);
                this._view.btn_suit.setHint(this.isUp);
            }

            let attr = info && info.attr;
            let power: number = attr && attr.showpower && attr.showpower.toNumber() || 0;
            this._view.power2.setPowerValue(power);

            this._view.name_item.updateShow(cfg.name, cfg.quality);
            this._view.img_name.source = `shenqi_name_${cfg.index}`;

            let list: SkillItemRenderData[] = [];
            let lockStr: string = "zhezhaosuo";
            for (let id of cfg.skill_id) {
                let level: number = this._proxy.getSkillLevel(cfg.index, id);
                let level_up: number = this._proxy.getSkillAct(cfg.index, id, level + 1);
                let showHint: boolean = level_up && info_level >= level_up;
                let skillId: number = id;
                let isAct: boolean = level > 0;
                let limit: number = this._proxy.getSkillAct(cfg.index, id);
                let limitStr: string = `${limit}阶解锁`;
                list.push({ showHint, skillId, isAct, level, lockStr, limitStr });
            }
            this._listSkill.replaceAll(list);

            this._view.btn_onekey.setHint(this._proxy.checkBuweiHint(cfg.index));

            this.onUpdateTypeData();
        }

        private onUpdateTypeData(): void {
            this._listData.itemUpdated(this._listData.source[this._lastIndex]);
            this._lastIndex = this._view.list_item.selectedIndex;
        }

        private onClickBtn(): void {
            let cfg = this._listData.source[this._view.list_item.selectedIndex];
            let bool: boolean = this._proxy.checkBuweiHint(cfg.index);
            if (!bool) {
                PromptBox.getIns().show("暂无可升级部位");
                return;
            }
            this._proxy.c2s_huanggu_shenqi_oper(1, cfg.index);
        }

        private onClickSkill(e: ItemTapEvent): void {
            let cfg: HuangguShenqiConfig = this._listData.source[this._view.list_item.selectedIndex];
            let skillId: number = cfg.skill_id[e.itemIndex];
            let isAct = this._proxy.getSkillLevel(cfg.index, skillId) > 0;
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.ArtifactBuff, {
                confirm: Handler.alloc(this, () => {
                    //激活技能
                    this._proxy.c2s_huanggu_shenqi_oper(4, cfg.index, e.itemIndex + 1);
                }),
                index: cfg.index,
                skillId,
                isAct,
            })
        }

        private onClickSuit(e: TouchEvent): void {
            let cfg: HuangguShenqiConfig = this._listData.source[this._view.list_item.selectedIndex];
            if (this.isUp) {
                this._proxy.c2s_huanggu_shenqi_oper(3, cfg.index);
            } else {
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.ArtifactTips, { index: cfg.index });
            }
        }

        private onClickItem(e: TouchEvent): void {
            let cfg: HuangguShenqiConfig = this._listData.source[this._view.list_item.selectedIndex];
            for (let pos = 1; pos <= this.len; pos++) {
                if (e.currentTarget == this._view[`item_${pos}`]) {
                    ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.ArtifactBuwei, { index: cfg.index, pos });
                    return;
                }
            }
        }

        private onClickDesc(): void {
            let cfg: HuangguShenqiConfig = this._listData.source[this._view.list_item.selectedIndex];
            let info = this._proxy.getInfo(cfg.index);
            let attr = info && info.attr;
            ViewMgr.getIns().showAttrTips(getLanById(LanDef.huuangushenqi_tips2), attr);
        }

        private onUpdateHint(n: GameNT): void {
            let data: IHintData = n.body;
            let root: string[] = [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.SkyPalace];
            if (data.node.indexOf(HintMgr.getType(root)) == -1) {
                return;
            }
            for (let cfg of this._listData.source) {
                if (data.node == HintMgr.getType([...root, `${cfg.index}`])) {
                    this._listData.itemUpdated(cfg);
                    break;
                }
            }
        }
    }
}