namespace game.mod.boss {

    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import Event = egret.Event;
    import NewMultipleBossConfig = game.config.NewMultipleBossConfig;
    import new_multiple_boss_data = msg.new_multiple_boss_data;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import Monster1Config = game.config.Monster1Config;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import Tween = base.Tween;
    import Handler = base.Handler;

    export class ManyBossMdr extends EffectMdrBase implements UpdateItem {
        private _view: ManyBossView = this.mark("_view", ManyBossView);
        private _proxy: BossProxy;

        private _itemList: ArrayCollection;
        private _btnList: ArrayCollection;
        private _bossList: ArrayCollection;

        private _selType: number;/**当前选中的类型*/
        private _selIndex: number;/**当前选中的boss*/
        private _selCfg: NewMultipleBossConfig;/**当前选中的配置*/
        private _selInfo: new_multiple_boss_data;/**当前选中的boss*/
        private _effId: number;
        private _lastIndex: number;//上一次显示的外显
        private _isMaxCnt: boolean;
        private _time: number;//定时请求boss信息
        private readonly TIME_TICK: number = 3;//定时请求boss信息
        private _firstEnter: boolean = true;//首次进入界面时，选中存活的BOSS

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;

            this._btnList = new ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._btnList;

            this._bossList = new ArrayCollection();
            this._view.list_boss.itemRenderer = ManyBossItem;
            this._view.list_boss.dataProvider = this._bossList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, Event.CHANGING, this.onClickType);
            addEventListener(this._view.list_boss, ItemTapEvent.ITEM_TAP, this.onClickBoss);

            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);

            this.onNt(BossEvent.ON_MANY_BOSS_UPDATE, this.onInfoUpdate, this);
            this.onNt(BossEvent.UPDATE_BOSS_lIST, this.reqBossInfo, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initTypeList();
            this.reqBossInfo();
            this.showGuide();
            TimeMgr.addUpdateItem(this, 1000);
            this._view.btn_gift.updateGift(ProductId.Id100013);
            this._view.checkBoxNvpu.updateShow(XiuxianNvpuEventType.ManyBoss);
        }

        protected onHide(): void {
            this._effId = 0;
            this._lastIndex = 0;
            this._firstEnter = true;
            Tween.remove(this._view.scroller.viewport);
            TimeMgr.removeUpdateItem(this);
            GuideMgr.getIns().clear(GuideKey.BossChallenge);//清除指引
            super.onHide();
        }

        private onClickType(e: Event) {
            let type = this._view.list_type.selectedIndex;
            if (type == this._selType) {
                return;
            }
            if (!this._proxy.isBossOpen(type, true)) {
                e.preventDefault();
                return;
            }
            let selIndex = this.getSelIndex(type);
            this.setSelType(type, selIndex);
            this.typeUpdateInfo();
        }

        private onClickBoss(e: ItemTapEvent): void {
            let index = e.itemIndex;
            if (index == this._selIndex) {
                return;
            }
            this._selIndex = index;
            this.indexUpdateInfo();
        }

        private onClickReward(): void {
            if (!this._selCfg) {
                return;
            }
            ViewMgr.getIns().bossReward(this._selCfg.reward_big);
        }

        private onClickAdd(): void {
            let index = this._proxy.bossCostIndex;
            if (!BagUtil.checkPropCntUp(index)) {
                return;
            }
            ViewMgr.getIns().showPropTips(index, IconShowType.Bag);
        }

        private onClickChallenge(): void {
            if (!this._selCfg) {
                return;
            }
            let cnt = this._proxy.bossCount;
            if (!cnt) {
                this.onClickAdd();
                return;
            }
            if (BagUtil.checkBagFull()) {
                return;
            }
            SceneUtil.setReward(SceneType.ManyBoss, this._selCfg.reward_big);
            this._proxy.c2s_new_multiple_boss_challenge(this._selCfg.index);
        }

        private onInfoUpdate(): void {
            if (this._firstEnter) {
                //首次进去界面时，自动选中存活boss
                this._firstEnter = false;
                let selIndex = this.getSelIndex(this._selType);
                this.setSelType(this._selType, selIndex);
            }
            this.typeUpdateInfo();
            this.updateCount();
            this.updateTime();
            //this.updateTypeListHint();
        }

        private initTypeList(): void {
            let datas: TabBaseItemData[] = [];
            let cfgs = this._proxy.getBossCfgs();
            let selType = 0;
            let selIndex = 0;
            for (let k in cfgs) {
                let type = parseInt(k);
                let cfgList = cfgs[k];
                let cfg = cfgList[0];
                let icon = "many_boss_" + (type % 5);//图标循环使用
                let bossType = cfg.open[0];
                let lv = cfg.open[1];
                let nameIcon = "";
                let nameGrpStr = "";
                let nameGrpFont = "";
                if (bossType == ManyBossType.Lv) {
                    nameIcon = "many_boss_lv_" + lv;
                }
                else {
                    //nameIcon = "zhuan_" + RoleUtil.getRebirthLv(lv);
                    nameGrpStr = ResUtil.getRebirthFontStr(lv, true);
                    nameGrpFont = BmpTextCfg[BmpTextType.RebirthLv];
                }
                let isOpen = this._proxy.isBossOpen(type);
                datas.push({icon: icon, nameIcon: nameIcon, gray: !isOpen, nameGrpStr: nameGrpStr, nameGrpFont: nameGrpFont});
                if (!isOpen) {
                    if (lv >= BossShowRebirthLimit) {
                        break;//9转后只显示一个未开启的boss
                    }
                }
                else {
                    selType = type;//默认选中最高的
                }
            }
            this._btnList.source = datas;
            if (this._showArgs && Array.isArray(this._showArgs) && this._showArgs.length) {
                selType = +this._showArgs.shift();//选中上一次的类型
                if (this._showArgs.length) {
                    selIndex = +this._showArgs.shift();//跳转选中boss
                    this._firstEnter = false;//跳转boss时候，不自动选择存活boss
                }
            }

            this.setSelType(selType, selIndex);
            this._view.list_type.selectedIndex = this._selType;
            if (this._selType > 3) {
                egret.callLater(() => {
                    ScrollUtil.moveHToAssign(this._view.scroller, this._selType, 127);
                }, this)
            }
        }

        private setSelType(type: number, index: number = 0): void {
            this._selType = type;
            this._selIndex = index;
            ViewMgr.getIns().lastData = [BossMainBtnType.Many, this._selType + ""];
        }

        //返回活着的第一只BOSS
        private getSelIndex(type: number): number {
            let cfgs = this._proxy.getBossCfgs();
            let bossList = cfgs[type].concat();//防止修改配置数据
            for (let i = 0; i < bossList.length; ++i) {
                let cfg = bossList[i];
                let info = this._proxy.getBossInfo(cfg.index);
                let isDied = !info || info.hp <= 0;//boss已死亡
                if (!isDied) {
                    return i;
                }
            }
            return 0;
        }

        private typeUpdateInfo(): void {
            this.updateItemList();
            this.indexUpdateInfo();
        }

        private updateItemList(): void {
            let cfgs = this._proxy.getBossCfgs();
            let bossList = cfgs[this._selType].concat();//防止修改配置数据
            if (this._bossList.source.length) {
                this._bossList.replaceAll(bossList);
            }
            else {
                this._bossList.source = bossList;
            }
            this._view.list_boss.selectedIndex = this._selIndex;
        }

        private indexUpdateInfo(): void {
            let cfgs = this._proxy.getBossCfgs();
            let bossList = cfgs[this._selType].concat();//防止修改配置数据
            this._selCfg = bossList[this._selIndex];
            this._selInfo = this._proxy.getBossInfo(this._selCfg.index);
            if (!this._selCfg) {
                return;
            }
            this.updateBoss();
            this.updateReward();
            this.updateBelong();
            this.updateReviveTime();
        }

        private updateBoss(): void {
            let index = this._selCfg.index;
            if (index == this._lastIndex) {
                return;
            }
            this._lastIndex = index;
            if (this._effId) {
                this.removeEffect(this._effId);
            }
            let monsterIndex = this._selCfg.monster_index[0];
            this._effId = this.addMonster(monsterIndex, this._view.grp_eff);
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterIndex);
            this._view.avatarNameItem.updateShow(monsterCfg.name);
        }

        private updateReward(): void {
            let index = this._selCfg.reward_big;
            let cfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, index);
            this._itemList.source = cfg.content.slice(0, 4);//取前面奖励
        }

        private updateBelong(): void {
            let info = this._selInfo && this._selInfo.owerinfo ? this._selInfo.owerinfo : null;
            if (info && info.name) {
                this._view.lab_name.text = info.name;
                this._view.head.updateHeadShow(info.head, info.head_frame, info.sex, info.role_id, info.server_id, info.is_robot);
            }
            else {
                this._view.lab_name.text = "";
                this._view.head.defaultHeadShow();
            }
        }

        private updateCount(): void {
            let cnt = this._proxy.bossCount;
            let maxCnt = this._proxy.bossMaxCount;
            let cntStr = getLanById(LanDef.times) + "：" + TextUtil.addColor(cnt + "/" + maxCnt, BlackColor.GREEN);
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
            this._isMaxCnt = cnt >= maxCnt;

            //幸运爆率
            let hasPrivilege = RoleUtil.hasPrivilege(RolePrivilegeKey.multiple_boss_count);
            this._view.grp_luckyCnt0.visible = hasPrivilege;//有特权的时候才显示
            if (hasPrivilege) {
                let luckyCount = this._proxy.luckyCount;
                let fontStr = luckyCount + "";
                this.addBmpFont(fontStr, BmpTextCfg[BmpTextType.XianYu1], this._view.grp_luckyCnt, true, 0.8, true);
            }
            // let index = this._proxy.bossCostIndex;
            // let propCnt = BagUtil.getPropCntByIdx(index);
            // let showProp = !cnt && propCnt > 0;//挑战次数为0时，且有道具时显示道具
            // this._view.grp_cnt.visible = !showProp;
            // this._view.cost.visible = showProp;
            // if(showProp){
            //     this._view.cost.updateShow([index, 1]);
            // }
            //this._view.btn_challenge.redPoint.visible = cnt > 0 || propCnt > 0;
        }

        private updateTime(): void {
            let timeStr = "";
            let bossTime = this._proxy.bossTime;
            if (bossTime && !this._isMaxCnt) {
                let nextTime = bossTime - TimeMgr.time.serverTimeSecond;
                if (nextTime == 0) {
                    this.reqBossInfo();
                }
                if (nextTime >= 0) {
                    timeStr = TimeUtil.formatSecond(nextTime, "mm:ss") + getLanById(LanDef.compete_mars_xmzb);
                }
            }
            this._view.lab_time.text = timeStr;
        }

        private updateReviveTime(): void {
            let bossTime = this._selInfo ? this._selInfo.recover_time.toNumber() : 0;
            let nextTime = bossTime - TimeMgr.time.serverTimeSecond;
            let showTime = bossTime && nextTime >= 0;
            if (showTime) {
                this._view.timeItem.updateLeftTime(nextTime);
            }
            this._view.timeItem.visible = showTime;
            this._view.btn_challenge.visible = !showTime;
        }

        update(time: base.Time): void {
            this.updateTime();
            this.updateReviveTime();

            let len = this._view.list_boss.numChildren;
            for (let i = 0; i < len; ++i) {
                let item = this._view.list_boss.getChildAt(i) as ManyBossItem;
                item.updateTime();
            }
            if (!this._selType) {
                //单个boss不做数据定时请求，优化处理
                return;
            }
            this._time--;
            if (this._time <= 0) {
                this.reqBossInfo();
            }
        }

        private reqBossInfo(): void {
            this._proxy.c2s_new_multiple_boss_info();
            this._time = this.TIME_TICK;
        }

        // private updateTypeListHint(): void {
        //     let list: TabBaseItemData[]  = this._btnList.source;
        //     let len: number = list ? list.length : 0;
        //     for (let i = 0; i < len; i++) {
        //         let btnData = list[i];
        //         let type = i;
        //         let hint = this._proxy.getBossHintByType(type);
        //         if(!!btnData.showHint != hint){//过滤undefined!=false
        //             btnData.showHint = hint;
        //             this._btnList.itemUpdated(btnData);
        //         }
        //     }
        // }

        private showGuide(): void {
            GuideMgr.getIns().show(GuideKey.BossChallenge, this._view.btn_challenge, Handler.alloc(this, this.onClickChallenge));//任务指引
        }
    }
}