namespace game.mod.boss {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import NewVipBossConfig = game.config.NewVipBossConfig;
    import Monster1Config = game.config.Monster1Config;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import LanDef = game.localization.LanDef;
    import ItemTapEvent = eui.ItemTapEvent;
    import new_vip_boss = msg.new_vip_boss;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Tween = base.Tween;

    export class VipBossMdr extends EffectMdrBase implements UpdateItem {

        private _view: VipBossView = this.mark("_view", VipBossView);

        private _proxy: BossProxy;

        private _listTypeData: ArrayCollection;
        private _listGateData: ArrayCollection;
        private _listAwdData: ArrayCollection;

        private _curTypeSelIdx: number = -1;         // 当前选中的分类索引
        private _curGateSelIdx: number = 0;          // 当前选中的关卡索引
        private _curGateData: IVipBossGateData;
        private _curState: VipBossState;
        private _effId: number;

        private _time: number;

        protected onInit(): void {
            super.onInit();

            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.Boss);

            this._listTypeData = new ArrayCollection();
            this._view.list_type.dataProvider = this._listTypeData;
            this._view.list_type.itemRenderer = TabSecondItem;

            this._listGateData = new ArrayCollection();
            this._view.list_gate.dataProvider = this._listGateData;
            this._view.list_gate.itemRenderer = VipBossItemRender;

            this._listAwdData = new ArrayCollection();
            this._view.list_awd.dataProvider = this._listAwdData;
            this._view.list_awd.itemRenderer = Icon;
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(BossEvent.ON_VIP_BOSS_INFO_UPDATE, this.updateInfo, this);
            // this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickTypeList);
            addEventListener(this._view.list_gate, ItemTapEvent.ITEM_TAP, this.onClickGateList);
            addEventListener(this._view.btn_awd_preview, TouchEvent.TOUCH_TAP, this.onClickAwdPreview);
            addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onClickFight);
        }

        protected onShow(): void {
            super.onShow();
            this.updateInfo();
            if (this._curTypeSelIdx > 3) {
                egret.callLater(() => {
                    ScrollUtil.moveHToAssign(this._view.scroller, this._curTypeSelIdx, 127);
                }, this)
            }
        }

        protected onHide(): void {
            this._effId = 0;
            this._curGateSelIdx = 0;
            this._curGateData = null;
            Tween.remove(this._view.scroller.viewport);
            super.onHide();
        }

        //倒计时
        update(time: base.Time): void {
            this._time--;
            this._view.timeItem.updateLeftTime(this._time);
            if (this._time <= 0) {
                TimeMgr.removeUpdateItem(this);
                this.updateCurTypeInfo();
            }
        }

        private updateInfo() {
            let typeDatas: TabBaseItemData[] = [];
            let reIds: number[] = this._proxy.vipBossRebirthIds;
            let flag;
            let i = 0;
            for (let reid of reIds) {
                let isOpen = this._proxy.isVipBossOpen(reid);
                let nameGrpStr = ResUtil.getRebirthFontStr(reid, true);
                let nameGrpFont = BmpTextCfg[BmpTextType.RebirthLv];
                let zs = RoleUtil.getRebirthLv(reid);         // 转生数
                let tData: TabBaseItemData = {
                    icon: "many_boss_" + (zs % 5),            // 缺图标，暂时这样处理 todo
                    showHint: false,
                    gray: !isOpen,
                    nameGrpStr: nameGrpStr,
                    nameGrpFont: nameGrpFont
                };
                typeDatas.push(tData);

                if (flag) {                      // 当前所处转生后，再取一个就停止了
                    if (reid >= BossShowRebirthLimit) {
                        break;//9转后只显示一个未开启的boss
                    }
                }
                if (isOpen) {
                    this._curTypeSelIdx = i;
                    flag = true;
                }
                i++;
            }
            this._listTypeData.replaceAll(typeDatas);

            this._view.list_type.selectedIndex = this._curTypeSelIdx;
            this.updateCurTypeInfo();

            this._view.img_title.visible = !VipUtil.getShowVipLv();
        }

        /**
         * 更新当前选中类型数据
         */
        private updateCurTypeInfo() {
            let cfgs: { [index: string]: NewVipBossConfig } = this._proxy.getRebVipBossCfg();

            let gateDatas: IVipBossGateData[] = [];
            let flag = false;//表示自动选中
            let firstGateData: IVipBossGateData;
            let i = 0;
            for (let idx in cfgs) {
                let cfg = cfgs[idx];
                let info1: new_vip_boss = this._proxy.getVipBossInfo(cfg.index);
                if (!info1) {
                    break;
                }

                let state: VipBossState = this._proxy.getState(cfg.index);
                let isSel: boolean = (state == VipBossState.CanFight || state == VipBossState.CanSaoDan);
                let gateData: IVipBossGateData = {
                    info: info1,
                    cfg: cfg,
                    state: state
                };
                if (!firstGateData) {
                    firstGateData = gateData;
                }
                if (this._curGateData && this._curGateData.cfg.index == gateData.cfg.index) {
                    this._curGateData = gateData;
                }
                if (isSel && !flag) {
                    this._curGateData = gateData;
                    this._curGateSelIdx = i;
                    flag = true;
                }
                gateDatas.push(gateData);
                i++;
                if (state == VipBossState.NonActivited && i == 3) {
                    break;//未开启的只显示一个
                }
            }

            this._listGateData.replaceAll(gateDatas);
            //if(flag) {
            this._view.list_gate.selectedIndex = this._curGateSelIdx;
            //}
            //没有自动选中的时候，默认选中第一个
            if (!this._curGateData) {
                this._curGateData = firstGateData;
            }

            this.updateCurGateInfo();
        }

        /**
         * 更新当前关卡数据
         */
        private updateCurGateInfo(): void {
            if (!this._curGateData) {
                return;
            }
            // let info = this._proxy.getVipBossInfo(this._curGateData.cfg.index);
            let info = this._curGateData.info;
            // 可挑战状态
            TimeMgr.removeUpdateItem(this);
            // this._curState = this._proxy.getState(this._curGateData.cfg.index);
            this._curState = this._curGateData.state;
            switch (this._curState) {
                case VipBossState.NonActivited:
                case VipBossState.CanFight:
                    this._view.currentState = "fight";
                    break;
                case VipBossState.CanSaoDan:
                    this._view.currentState = "saodan";
                    break;
                case VipBossState.CD:
                    this._view.currentState = "saodancd";
                    this._time = info.next_boss_time - TimeMgr.time.serverTimeSecond;
                    if (this._time > 0) {                // cd 时间
                        this.update(null);
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                    break;
                default:
                    break;
            }
            this._view.btn_fight.redPoint.visible = (this._curState == VipBossState.CanFight || this._curState == VipBossState.CanSaoDan);

            // boss
            let gateCfg = this._proxy.getVipBossFubenCfg(this._curGateData.cfg.index % 10);
            let mcfg: Monster1Config = getConfigByNameId(ConfigName.Monster, gateCfg.bossId[0]);
            this._view.lab_boss_name.text = mcfg ? mcfg.name : "";
            if (this._effId) {
                this.removeEffect(this._effId);
            }
            this._effId = this.addMonster(gateCfg.bossId[0], this._view.grp_eff);

            // 列表奖励数据
            let listAwdPreCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, this._curGateData.cfg.reward_big);
            let awd = listAwdPreCfg.content.slice(0, 4);
            listAwdPreCfg && this._listAwdData.replaceAll(awd);


            let data: IVipBossGateData = this._listGateData.getItemAt(this._view.list_gate.selectedIndex)
            let cfg_next: game.config.NewVipBossFubenConfig = this._proxy.getVipBossFubenCfg(data.cfg.index % 10 + 1);
            if (cfg_next && VipUtil.getShowVipLv() < cfg_next.VIP_lv) {
                this._view.lab_tips.text = `VIP${cfg_next.VIP_lv}可碾压`;
            } else {
                this._view.lab_tips.text = "";
            }
        }

        // private onHintUpdate(n: GameNT) {
        //     let data: IHintData = n.body;
        // }

        private onClickTypeList(e: ItemTapEvent) {
            let itemIdx: number = e.itemIndex;
            let reIds: number[] = this._proxy.vipBossRebirthIds;
            let reId = itemIdx < reIds.length ? reIds[itemIdx] : 0;
            if (itemIdx != this._curTypeSelIdx && reId) {
                // let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, reId);
                // PromptBox.getIns().show(`转生至${cfg.relv}转${cfg.relv2}重开启`);
                this._view.list_type.selectedIndex = this._curTypeSelIdx;
            }
        }

        private onClickGateList(e: ItemTapEvent) {
            let itemData: IVipBossGateData = e.item;
            if (itemData.cfg.index == this._curGateData.cfg.index) {
                return;
            }

            // if(!itemData.isOpen) {
            //     PromptBox.getIns().show("暂未开启");
            //     this._view.list_big_gate.selectedIndex = this._curBigGateSelIdx;
            //     return;
            // }
            this._curGateData = itemData;
            this.updateCurGateInfo();
        }

        private onClickAwdPreview(e: TouchEvent) {
            ViewMgr.getIns().bossReward(this._curGateData.cfg.reward_big);
        }

        private onClickFight(e: TouchEvent) {
            if (!this._curGateData) {
                return;
            }
            if (this._curState == VipBossState.CanFight) {               // 挑战
                if (BagUtil.checkBagFull()) {
                    return;
                }
                this._proxy.c2s_new_vip_boss_enter(this._curGateData.cfg.index);
            } else if (this._curState == VipBossState.CanSaoDan) {       // 扫荡
                if (BagUtil.checkBagFull()) {
                    return;
                }
                this._proxy.c2s_new_vip_boss_sweep(this._curGateData.cfg.index);
            } else if (this._curState == VipBossState.NonActivited) {       //未激活
                VipUtil.showTips();
            }
        }

    }

    export interface IVipBossGateData {
        info: new_vip_boss;
        cfg: NewVipBossConfig;
        state: VipBossState;
    }
}