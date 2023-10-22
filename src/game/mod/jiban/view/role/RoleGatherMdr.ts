namespace game.mod.jiban {

    import GatherConfig = game.config.GatherConfig;
    import attributes = msg.attributes;
    import Handler = base.Handler;

    export class RoleGatherMdr extends EffectMdrBase {
        private _view: RoleGatherView = this.mark("_view", RoleGatherView);
        private _proxy: ShoujiHuanhuaProxy;
        private _listItem: eui.ArrayCollection;
        private _listEquip: eui.ArrayCollection;
        private _curIdx: number = 0;//当前点击的套装
        private _curDealIdx: number = 0;//当前待收集的套装
        private _curCfg: GatherConfig;
        private _attrAry: number[];//件套_属性id
        private _effId: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.ShoujiHuanhua);
            this._view.list_equip.itemRenderer = RoleGatherIconItem;
            this._view.list_equip.dataProvider = this._listEquip = new eui.ArrayCollection();
            this._view.list_item.itemRenderer = RoleGatherBtnItem;
            this._view.list_item.dataProvider = this._listItem = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_item, eui.ItemTapEvent.ITEM_TAP, this.onClickListItem, this);
            addEventListener(this._view.btn_act, egret.TouchEvent.TOUCH_TAP, this.onClickAct, this);
            addEventListener(this._view.icon_reward, egret.TouchEvent.TOUCH_TAP, this.onClickReward, this);
            addEventListener(this._view.img_got, egret.TouchEvent.TOUCH_TAP, this.onClickReward, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttr, this);
            this.onNt(JiBanEvent.ON_GATHER_INFO_UPDATE, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateItemList();
            this.showGuide();
        }

        protected onHide(): void {
            GuideMgr.getIns().clear(GuideKey.RoleCollectAct);//清除指引
            GuideMgr.getIns().clear(GuideKey.RoleCollectIcon);//清除指引
            super.onHide();
        }

        private onUpdateAttr(): void {
            if (!this._attrAry) {
                return;
            }
            let attr = RoleUtil.getAttr(this._attrAry[1]);
            this.updateAttr(this._attrAry[0], attr);
            this._attrAry = null;
        }

        private updateAttr(cnt: number, attr: attributes): void {
            if (!attr) {
                return;
            }
            let attrStr = TextUtil.getAttrTextAdd(attr, WhiteColor.GREEN, '    ');
            this._view.lb_attr.textFlow = TextUtil.parseHtml(`${cnt}件属性  ` + TextUtil.addColor(attrStr, WhiteColor.GREEN));
        }

        private onUpdateView(): void {
            this.updateItemList();
        }

        private updateRewardView(): void {
            let info = this._proxy.getGatherInfo(this._curCfg.index);
            let prop = PropData.create(this._curCfg.award[0], this._curCfg.award[1]);
            this._view.icon_reward.setData(prop, IconShowType.NotTips);
            this._view.img_got.visible = info && info.is_get == 2;//大奖是否领取
            let rewardHint = this._proxy.canGetBigReward(this._curCfg.index);
            this._view.icon_reward.setHint(rewardHint);
            if (rewardHint) {
                GuideMgr.getIns().show(GuideKey.RoleCollectIcon, this._view.icon_reward, Handler.alloc(this, this.onClickReward));//任务指引
            }

            let propCfg = GameConfig.getPropConfigById(this._curCfg.award[0]);
            this._view.lb_awardname.text = propCfg && propCfg.name || '';

            this._effId && this.removeEffect(this._effId);
            if (propCfg && propCfg.param1) {
                this._effId = this.addAnimate(propCfg.param1[0][0], this._view.gr_eff);
            }
        }

        private updateView(): void {
            if (this._curIdx != null && this._listItem.source[this._curIdx]) {
                this._curCfg = (this._listItem.source[this._curIdx] as IRoleGatherBtnItemData).cfg;
            }
            if (!this._curCfg) {
                return;
            }
            this._view.img_name.source = `role_shouji_title${this._curCfg.index}`;
            this.updateRewardView();

            let info = this._proxy.getGatherInfo(this._curCfg.index);
            let act_cnt = info && info.act_cnt || 0;//当前激活x件套

            let attribute = this._curCfg.attribute;
            for (let i = 0; i < attribute.length; i++) {
                if (!this._view[`barItem${i}`]) {
                    continue;
                }
                let cnt = attribute[i][0];//x件套
                this._view[`barItem${i}`].data = {
                    cnt: cnt,
                    isActed: cnt <= act_cnt
                };
            }

            let part_ary = this._proxy.getPartAry(this._curCfg.index);
            let nextIdx = part_ary.indexOf(act_cnt) + 1;//下个进度条阶段
            let isActed = nextIdx >= attribute.length; //激活否，没有下一阶
            this._attrAry = attribute[nextIdx];

            let barMax = attribute[attribute.length - 1][0];//进度条最大值
            // if (info && info.is_get == 2) {//领取了大奖
            //     act_cnt = barMax;
            // }
            this._view.bar.show(act_cnt, barMax, false, 0, false, ProgressBarType.Percent);
            if (this._attrAry) {
                let attr = RoleUtil.getAttr(this._attrAry[1]);
                this.updateAttr(this._attrAry[0], attr);
            }

            let fashion_part = this._curCfg.fashion_part;
            let totalCnt = fashion_part.length;
            let doneCnt = info && info.gather_id ? info.gather_id.length : 0;
            let str = TextUtil.addColor(`(${doneCnt}/${totalCnt})`, doneCnt >= totalCnt ? WhiteColor.GREEN : WhiteColor.RED);
            this._view.lb_suitcnt.textFlow = TextUtil.parseHtml(`收集${this._curCfg.name} ` + str);

            let list: IRoleGatherIconItemData[] = [];
            let gather_id = info ? info.gather_id : [];
            for (let i = 0; i < fashion_part.length; i++) {
                list.push({
                    type: this._curCfg.level,
                    index: fashion_part[i],
                    isActed: gather_id.indexOf(i) > -1
                });
            }
            this._listEquip.replaceAll(list);

            //激活整套成功
            this._view.lb_attr.visible = this._view.btn_act.visible = !isActed;

            if (this._view.btn_act.visible) {
                this._view.btn_act.setHint(this._proxy.canActGather(this._curCfg.index));
            }
        }

        private updateItemList(): void {
            let cfgList = this._proxy.getGatherCfgList();
            let list: IRoleGatherBtnItemData[] = [];
            let curIdx: number;
            for (let i = 0; i < cfgList.length; i++) {
                let cfg = cfgList[i];
                let isActed = this._proxy.isActedGather(cfg.index);//收集激活了
                let hint = false;
                if (!isActed && curIdx == null) {
                    curIdx = i;//当前在收集中的
                    hint = this._proxy.canActGather(cfg.index) || this._proxy.canGetBigReward(cfg.index);
                }
                let isOpen = true;
                if (curIdx != null && i > curIdx) {
                    isOpen = false;
                }
                list.push({
                    cfg,
                    hint: hint,
                    isActed: isActed,
                    isOpen: isOpen
                });
            }
            if (curIdx == null) {
                curIdx = list.length - 1;//选择最后一个
            }
            this._listItem.replaceAll(list);
            this._view.list_item.selectedIndex = this._curIdx = curIdx;
            this._curDealIdx = curIdx;
            this.updateView();
        }

        private onClickListItem(e: eui.ItemTapEvent): void {
            if (e.itemIndex == this._curIdx) {
                return;
            }
            if (e.itemIndex > this._curDealIdx) {
                PromptBox.getIns().show(`请先激活前一套`);
                this._view.list_item.selectedIndex = this._curIdx;
                return;
            }
            this.switchView(e.itemIndex);
        }

        private switchView(idx: number): void {
            this._curIdx = idx;
            this.updateView();
        }

        private onClickAct(): void {
            if (!this._curCfg || !this._proxy.canActGather(this._curCfg.index, true)) {
                return;
            }
            this._proxy.c2s_equip_gather_act(this._curCfg.index, 1);//激活套装

            // 激活后，切换到下一个套装，如果没有下一个，就保留当前
            // let nextIdx = this._curIdx + 1;
            // if (!this._listItem.source[nextIdx]) {
            //     return;
            // }
            // this._view.list_item.selectedIndex = nextIdx;
            // this.switchView(nextIdx);
            this.updateItemList();
        }

        private onClickReward(): void {
            if (!this._curCfg) {
                return;
            }
            let info = this._proxy.getGatherInfo(this._curCfg.index);
            if (info && info.is_get == 1) {
                this._proxy.c2s_equip_gather_act(this._curCfg.index, 2);//领取大奖
                return;
            }
            let data = this._view.icon_reward.data as PropData;
            ViewMgr.getIns().showPropTips(data);
        }

        private showGuide(): void {
            if (this._proxy.canTaskActGather()) {
                GuideMgr.getIns().show(GuideKey.RoleCollectAct, this._view.btn_act, Handler.alloc(this, this.onClickAct));//任务指引
            }
        }
    }
}