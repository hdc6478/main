namespace game.mod.shilian {

    import Handler = base.Handler;
    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class YuanLingMdr extends MdrBase implements UpdateItem {
        private _view: YuanLingView = this.mark("_view", YuanLingView);
        private _proxy: YuanLingProxy;
        private _listReward: eui.ArrayCollection;
        private _listTeam: eui.ArrayCollection;
        private _listBtn: eui.ArrayCollection;

        private _stateType = 1;//皮肤类型，1：主界面，2：组队界面
        private _type = 1;//困难度
        private _enterCd = 30;//组队进入场景倒计时
        private _enterTime = 0;//进入时间戳

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.YuanlingFuben);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listReward = new eui.ArrayCollection();
            this._view.list_team.itemRenderer = YuanLingTeammateItem;
            this._view.list_team.dataProvider = this._listTeam = new eui.ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._listBtn = new eui.ArrayCollection();
            this._view.btn_go.setBlue();
            this._view.btn_quit.setBlue();
            this._view.addComp.setYellow();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_achievement, egret.TouchEvent.TOUCH_TAP, this.onClickAchieve, this);
            addEventListener(this._view.btn_team, egret.TouchEvent.TOUCH_TAP, this.onClickTeam, this);
            addEventListener(this._view.btn_go, egret.TouchEvent.TOUCH_TAP, this.onClickBattle, this);
            addEventListener(this._view.btn_room, egret.TouchEvent.TOUCH_TAP, this.onClickCreateTeam, this);
            addEventListener(this._view.playerComp, egret.TouchEvent.TOUCH_TAP, this.onClickTopPlayer, this);
            addEventListener(this._view.addComp.btn_add, egret.TouchEvent.TOUCH_TAP, this.onClickAddCnt, this);
            addEventListener(this._view.btn_quit, egret.TouchEvent.TOUCH_TAP, this.onClickEquip, this);
            addEventListener(this._view.btn_start, egret.TouchEvent.TOUCH_TAP, this.onClickTeamBattle, this);
            addEventListener(this._view.btn_chat, egret.TouchEvent.TOUCH_TAP, this.onClickChat, this);
            addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickType, this);

            this.onNt(ShilianEvent.ON_YUANLING_JUMP_TO_VIEW, this.onJumpToView, this);
            this.onNt(ShilianEvent.ON_YUANLING_TEAM_INFO_UPDATE, this.onTeamInfoUpdate, this);
            this.onNt(ShilianEvent.ON_YUANLING_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this._type = this._proxy.getCurDiff();//从副本结算返回到对应的难度
            this.switchState(this._proxy.getCurState());
            this._proxy.inviteParam = [];//从被邀请界面进来后，需要清除参数
            this.updateBtnHint();
        }

        private updateTypeList(): void {
            let diff = this._proxy.model.diff + 1;//下一难度
            let list: TabBaseItemData[] = [];
            for (let i = 1; i <= 4; i++) {
                list.push({
                    icon: 'yuanling_second_tab' + i,
                    nameIcon: 'yuanling_tabname' + i,
                    gray: i > diff,
                    showHint: this._proxy.getAllHint() && i <= diff
                });
            }
            this._listBtn.replaceAll(list);
            this._view.list_type.selectedIndex = this._type - 1;
        }

        protected onHide(): void {
            super.onHide();
            this.sendExitTeam();
            TimeMgr.removeUpdateItem(this);
        }

        // 创建队伍返回，打开创建队伍界面
        private onTeamInfoUpdate(n: GameNT): void {
            let state = n.body as number[];
            this.switchState(state[1]);
        }

        private onJumpToView(n: GameNT): void {
            let state: number = n.body;
            this.switchState(state);
        }

        private switchState(state = 1): void {
            this._stateType = state;
            this.updateView();
        }

        private updateView(): void {
            this.updateTopPlayer();
            this.updateTypeList();
            this.updateAddComp();

            if (this._stateType == 1) {
                this.updateMainView();
            } else {
                this.updateTeamView();
            }
        }

        private updateMainView(): void {
            this._view.currentState = 'main';
            let cfg = this._proxy.getConfig(this._type);
            if (!cfg) {
                return;
            }
            this._listReward.replaceAll(cfg.show_reward.concat());
        }

        private updateTeamView(): void {
            this._view.currentState = 'team';
            let model = this._proxy.model;
            let teamCnt = this._proxy.getTeamCount();
            let list: any[] = [];
            for (let item of model.own_team_infos) {
                if (item && item.leader) {
                    list.unshift(item);
                } else {
                    list.push(item);
                }
            }
            for (let i = list.length; i < teamCnt; i++) {
                list.push(null);
            }
            this._listTeam.replaceAll(list);

            if (model.own_team_infos.length == teamCnt) {
                TimeMgr.addUpdateItem(this, 1000);
                this._view.lb_enterTime.text = StringUtil.substitute(getLanById(LanDef.yuanling_tips6), [this._enterCd]);
                this._view.lb_enterTime.visible = true;
                this._enterTime = TimeMgr.time.serverTimeSecond + this._enterCd;
            } else {
                TimeMgr.removeUpdateItem(this);
                this._view.lb_enterTime.visible = false;
            }
        }

        private getEarnCnt(): number {
            let model = this._proxy.model;
            let cfgCnt = this._proxy.getCount();//每日收益次数
            let usedCnt = model.count;//已使用收益次数
            let boughtCnt = model.buy;//已经购买次数
            return cfgCnt + boughtCnt - usedCnt;
        }

        private updateAddComp(): void {
            let cnt = this.getEarnCnt();
            if (this._stateType == 2) {
                this._view.checkbox.visible = cnt > 0;
                this._view.checkbox.selected = cnt > 0;
            }
            this._view.addComp.updateShow(TextUtil.addColor(`${cnt}/${this._proxy.getCount()}`, cnt > 0 ? BlackColor.GREEN : BlackColor.RED));
        }

        //首杀玩家信息
        private updateTopPlayer(): void {
            let info = this._proxy.model.info[this._type];
            let topPlayer = info && info.info ? info.info[0] : null;
            this._view.playerComp.updatePlayerInfo(topPlayer);
        }

        private onClickAchieve(): void {
            ViewMgr.getIns().openGiftView(GiftType.Yuanling);
        }

        private onClickTeam(): void {
            if (this._proxy.model.own_team_id) {
                PromptBox.getIns().show(getLanById(LanDef.yuanling_tips7));
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Shilian, ShilianViewType.YuanLingTeam, this._type);
        }

        // 单人挑战
        private onClickBattle(): void {
            this._proxy.c2s_yuanling_enter(this._type);
        }

        // 组队挑战
        private onClickCreateTeam(): void {
            this._proxy.c2s_yuanling_create_team(this._type);
        }

        private onClickAddCnt(): void {
            let cfgBuyCnt = this._proxy.getMaxBuy();//购买次数上限
            let boughtCnt = this._proxy.model.buy;//已经购买次数
            if (boughtCnt >= cfgBuyCnt) {
                PromptBox.getIns().show(getLanById(LanDef.yuanling_tips8));
                return;
            }

            let cost = this._proxy.getCost();
            let txt = '';
            for (let i = 0; i < cost.length; i++) {
                let cfg = GameConfig.getPropConfigById(cost[i][0]);
                if (!cfg) {
                    continue;
                }
                txt += (cost[i][1] + cfg.name) + (i == cost.length - 1 ? '' : '、');
            }
            txt = StringUtil.substitute(getLanById(LanDef.yuanling_tips9), [txt]);
            ViewMgr.getIns().showConfirm(txt, Handler.alloc(this, this.onBuyCount));
        }

        // 购买收益次数
        private onBuyCount(): void {
            let cost = this._proxy.getCost() || [];
            for (let item of cost) {
                if (!BagUtil.checkPropCnt(item[0], item[1], PropLackType.Dialog)) {
                    return;
                }
            }
            this._proxy.c2s_yuanling_buyCount();
        }

        //退出队伍
        private onClickEquip(): void {
            this._proxy.c2s_yuanling_exit_team();
        }

        // 组队挑战 确定是否勾选收益次数，判断人数足够，然后再挑战
        private onClickTeamBattle(): void {
            if (!this._proxy.isMineLeader()) {
                PromptBox.getIns().show(getLanById(LanDef.yuanling_tips10));
                return;
            }
            let team_infos = this._proxy.model.own_team_infos || [];
            if (team_infos.length >= this._proxy.getTeamCount()) {
                this.gotoBattle();
            } else {
                ViewMgr.getIns().showConfirm(getLanById(LanDef.yuanling_tips11), Handler.alloc(this, this.gotoBattle));
            }
        }

        private gotoBattle(): void {
            let isCheck = this._view.checkbox.selected;
            this._proxy.c2s_yuanling_check(isCheck ? 1 : 2);

            this.onClickBattle();
        }

        private onClickType(e: eui.ItemTapEvent): void {
            let index = e.itemIndex + 1;
            if (index == this._type) {
                return;
            }
            if (index > this._proxy.model.diff + 1) {
                PromptBox.getIns().show(getLanById(LanDef.yuanling_tips12));
                this._view.list_type.selectedIndex = this._type - 1;
                return;
            }
            this.sendExitTeam();
            this._proxy.curDiffType = this._type = index;
            this.switchState();
        }

        // 进入副本情况下关闭界面，不能退出队伍。非队长玩家，被动进入场景时不退出
        private sendExitTeam(): void {
            if (this._stateType == 2 && SceneUtil.getCurSceneType() != SceneType.Yuanling) {
                this._proxy.c2s_yuanling_exit_team();
            }
        }

        update(time: base.Time) {
            let leftTime = this._enterTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                this._proxy.c2s_yuanling_enter(this._type);
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.lb_enterTime.text = StringUtil.substitute(getLanById(LanDef.yuanling_tips6), [leftTime]);
        }

        // todo
        private onClickChat(): void {
            if (RoleUtil.getGuildId()) {
                ViewMgr.getIns().showView(ModName.Chat, ChatViewType.ChatMain, ChatMainBtnType.Union);
            } else {
                ViewMgr.getIns().showView(ModName.Chat, ChatViewType.ChatMain);
            }
        }

        // todo
        private onClickTopPlayer(): void {
            let info = this._proxy.model.info[this._type];
            let topPlayer = info && info.info ? info.info[0] : null;
            if (!topPlayer) {
                return;
            }
            ViewMgr.getIns().showRoleTips(topPlayer.role_id, topPlayer.server_id);
        }

        private updateBtnHint(): void {
            this._view.btn_achievement.setHint(this._proxy.getGiftHint());
        }
    }
}