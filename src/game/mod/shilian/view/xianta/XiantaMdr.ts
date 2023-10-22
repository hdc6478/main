namespace game.mod.shilian {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import Event = egret.Event;
    import XiantaFubenConfig = game.config.XiantaFubenConfig;
    import xiantower_info = msg.xiantower_info;
    import XiantaSceneConfig = game.config.XiantaSceneConfig;
    import LanDef = game.localization.LanDef;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import Handler = base.Handler

    export class XiantaMdr extends EffectMdrBase {
        private _view: XiantaView = this.mark("_view", XiantaView);
        private _proxy: ShilianProxy;

        private _itemList: ArrayCollection;
        private _btnList: ArrayCollection;
        private _selType: number;
        /**当前选中的副本类型*/
        private _selCfg: XiantaFubenConfig;
        /**当前选中的副本配置*/
        private _selInfo: xiantower_info;
        /**当前选中的副本信息*/
        private _canSweep: boolean;//是否可以扫荡
        private _isMax: boolean;//达到最大关卡
        private _canDraw: boolean;//是否可领取大奖
        private _rankList: number[] = [RankType.Type1, RankType.Type2, RankType.Type3];
        private _rankType: number;

        /**排行榜类型*/

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Shilian);

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;

            this._btnList = new ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._btnList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, Event.CHANGING, this.onClickType);
            addEventListener(this._view.btn_sweep, TouchEvent.TOUCH_TAP, this.onClickSweep);
            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
            addEventListener(this._view.icon, TouchEvent.TOUCH_TAP, this.onClickIcon);
            this.onNt(ShilianEvent.ON_XIANTA_INFO_UPDATE, this.onInfoUpdate, this);
            this.onNt(RankEvent.ON_RANK_INFO_UPDATE, this.onRankUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initTypeList();
            this.typeUpdateInfo();
            this.updateTypeListHint();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickType(e: Event) {
            let type = this._proxy.typeList[this._view.list_type.selectedIndex];
            if (type == this._selType) {
                return;
            }
            if (!this._proxy.isXiantaOpen(type, true)) {
                //策划配置同一个功能ID
                e.preventDefault();
                return;
            }
            this.setSelType(type);
            this.typeUpdateInfo();
        }

        public onClickSweep(): void {
            this._selInfo = this._proxy.getXiantaInfo(this._selType);
            let passLv = this._selInfo && this._selInfo.layer ? this._selInfo.layer : 0;
            let tips = `已通关${passLv}层,扫荡可得:`;
            let tips1 = `层数越高,奖励越高`;
            if (this._canSweep) {
                ViewMgr.getIns().showBoxReward(tips,this._itemList.source,tips1,
                    Handler.alloc(this,()=>{this._proxy.c2s_xiantower_sweep(this._selType)}));
                return;
            }
            PromptBox.getIns().show(getLanById(LanDef.fight_soul_altar_tips4));
        }

        private onClickChallenge(): void {
            if (this._isMax) {
                PromptBox.getIns().show(getLanById(LanDef.pass));
                return;
            }
            this._proxy.c2s_challenge_xiantower(this._selType);
        }

        private onClickIcon(): void {
            if (this._canDraw) {
                this._proxy.c2s_xiantower_get_rewards(this._selType);
                return;
            }
            let data = this._view.icon.data;
            ViewMgr.getIns().showPropTips(data[0]);
        }

        private onInfoUpdate(): void {
            this.updateTypeListHint();
            this.updateInfo();
        }

        private onRankUpdate(): void {
            this.updateRankInfo();
        }

        private initTypeList(): void {
            let datas: TabBaseItemData[] = [];
            for (let i = 0; i < this._proxy.typeList.length; ++i) {
                let type = this._proxy.typeList[i];
                let icon = "xianta_type_" + type;
                let nameIcon = "xianta_name_" + type;
                let gray = !this._proxy.isXiantaOpen(type);
                datas.push({icon: icon, nameIcon: nameIcon, gray: gray});
            }
            this._btnList.source = datas;
            let type = this._proxy.typeList[0];
            let selType = super.decodeShowArgs(true);
            if (selType != null) {
                type = selType;
            }
            this.setSelType(type);
            this._view.list_type.selectedIndex = this._selType - 1;
        }

        private setSelType(type: number): void {
            this._selType = type;
            this._proxy.selXiantaType = this._selType;
            let rankType = this._rankList[type - 1];
            this._rankType = rankType;
            RankUtil.c2s_new_rank_req_rank(rankType);
            ViewMgr.getIns().lastData = [ShilianMainBtnType.Xianta, this._selType + ""];
        }

        private updateTypeListHint(): void {
            let list: TabBaseItemData[] = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                let type = this._proxy.typeList[i];
                let hint = this._proxy.getXiantaHint(type);
                if (!!btnData.showHint != hint) {//过滤undefined!=false
                    btnData.showHint = hint;
                    this._btnList.itemUpdated(btnData);
                }
            }
        }

        private typeUpdateInfo(): void {
            this._selCfg = getConfigByNameId(ConfigName.XiantaFuben, this._selType);
            this.updateShow();
            this.updateInfo();
            this.updateRankInfo();
        }

        private updateShow(): void {
            let titleStr = this._selCfg.name;
            this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_TITLE, titleStr);

            let bgStr = "xianta_bg_" + this._selType;
            this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_BG, bgStr);
        }

        private updateInfo(): void {
            this._selInfo = this._proxy.getXiantaInfo(this._selType);

            let passLv = this._selInfo && this._selInfo.layer ? this._selInfo.layer : 0;
            let curLv = passLv + 1;
            let cfgList: object = getConfigByNameId(ConfigName.XiantaScene, this._selType);
            this._isMax = !cfgList[curLv];//取不到下级配置
            if (this._isMax) {
                curLv = passLv;//同全部关卡时显示当前关卡
            }

            // let lvStr = "d" + ResUtil.getChineseFontStr(curLv) + "c";
            let lvStr = "第" + StringUtil.getCNBynumber(+curLv) + "层";
            this.addBmpFont(lvStr, BmpTextCfg[BmpTextType.ChineseLayer], this._view.grp_lv, false, 1, true);

            let cfg: XiantaSceneConfig = cfgList[curLv];

            let cnt = this._selInfo && this._selInfo.count ? this._selInfo.count : 0;
            let showSeep = curLv > 1;
            this._view.currentState = showSeep ? "2" : "1";
            this._canSweep = showSeep && cnt > 0;//可扫荡
            this._view.btn_sweep.label = `扫荡(${cnt})`;
            this._view.btn_sweep.redPoint.visible = this._canSweep;

            // let maxFree = this._selCfg.free;
            // let sweepStr = getLanById(LanDef.saodang_times) + ":" + TextUtil.addColor(cnt + "/" + maxFree, cnt > 0 ? WhiteColor.GREEN : WhiteColor.RED);
            // this._view.lab_sweepCnt.textFlow = TextUtil.parseHtml(sweepStr);

            let power = cfg.show_power;
            let canChallenge = RoleVo.ins.showpower.toNumber() >= power && !this._isMax;
            this._view.btn_challenge.redPoint.visible = canChallenge;

            //奖励
            let rewardId = cfg.reward;
            let rewardCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, rewardId);
            this._itemList.source = rewardCfg.content;

            //显示推荐战力
            this.addBmpFont(power + '', BmpTextCfg[BmpTextType.CommonPower], this._view.grp_font, true, 1, false, 0, true);

            //大奖
            let bigCfg = this._proxy.getXiantaBigRewardCfg(this._selType);
            this._view.icon.visible = this._view.bar.visible = !!bigCfg;
            this._canDraw = false;
            if (this._view.icon.visible) {
                let reward = bigCfg.big_reward[0];
                this._view.icon.setData(reward, IconShowType.NotTips);
                let needLv = bigCfg.lvl;
                this._canDraw = passLv >= needLv;
                this._view.icon.setHint(this._canDraw);
                this._view.bar.show(passLv, needLv, false, 0, false);
            }
        }

        private updateRankInfo(): void {
            let rankInfo = RankUtil.getRankInfo(this._rankType);
            if (rankInfo && rankInfo.top_info) {
                let nameStr = rankInfo.top_info.name;
                let cntStr = getLanById(LanDef.tongtian24) + rankInfo.info_list[0].count;
                this._view.rankFirstItem.updateShow(this._rankType, nameStr, cntStr);
            } else {
                this._view.rankFirstItem.updateShow(this._rankType);
            }
        }
    }
}