namespace game.mod.more {

    import UpdateItem = base.UpdateItem;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import Handler = base.Handler;

    export class XianmaiItemTipsMdr extends MdrBase implements UpdateItem {
        protected _view: XianmaiItemTipsView = this.mark("_view", XianmaiItemTipsView);
        protected _proxy: XianmaiProxy;

        private _stage: number;
        private _index: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianmai);
            this._view.secondPop.updateBgSrc(ResUtil.getUiJpg("wodexianmai_bg"));
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickBtndo, this);

            this.onNt(MoreEvent.ON_UPDATE_XIANMAI_MY_SHOW, this.onUpdateMyShow, this);
            this.onNt(MoreEvent.ON_UPDATE_XIANMAI_STAGE_SHOW, this.onUpdateStageShow, this);
            this.onNt(MoreEvent.ON_XIANMAI_VIEW_CLOSE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._stage = null;
            this._index = null;
        }

        //占领某个位置后，马上弹出我的仙脉弹窗 todo 整合两个tips
        protected onUpdateMyShow(): void {
            // if (this._stage && this._index) {
            //     let myData = this._proxy.my_data;
            //     if (myData && myData.stage == this._stage && myData.index == this._index) {
            //         ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianmaiItemTipsMine);
            //         this.hide();
            //     }
            // }
        }

        protected onUpdateStageShow(): void {
            this.updateCoolTime();
        }

        protected updateView(): void {
            if (this._showArgs && Array.isArray(this._showArgs)) {
                this._stage = this._showArgs[0];
                this._index = this._showArgs[1];
            }

            let title = this._proxy.getSecondPopTitle(this._stage);
            this._view.secondPop.updateTitleStr(title);
            this._view.lb_title.text = getLanById(LanDef.xianmaizhengduo_tips13);

            let info = this._proxy.getStageInfo(this._index);
            if (!info) {
                this.updateNotoneView();
            } else {
                this.updateDefendView();
            }

            this.updateTime();
        }

        protected onClickBtndo(): void {
            let info = this._proxy.getStageInfo(this._index);
            if (info && info.data) {
                let guildId = RoleUtil.getGuildId();
                let roleGuildId = info.data.guild_id;
                //该位置已被占领，还去争夺同宗门的，就需要弹出确定弹窗
                if (info.data.role_id.notEquals(Long.ZERO) && guildId && guildId == roleGuildId) {
                    ViewMgr.getIns().showConfirm(getLanById(LanDef.xianmaizhengduo_tips5), Handler.alloc(this, this.dealFunc));
                    return;
                }
            }
            this.dealFunc();
        }

        private dealFunc(): void {
            //我还没有占领，直接占领即可
            let info = this._proxy.getStageInfo(this._index);
            if (!this._proxy.my_data) {
                let oper = info ? XianmaiOperType.Oper3 : XianmaiOperType.Oper4;
                this._proxy.c2s_xianmai_pvp_oper(oper, this._stage, this._index);
                this.hide();//todo
                return;
            }

            //打开选择界面
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianmaiSelect, [this._stage, this._index]);
            this.hide();//todo
        }

        //有守护者
        private updateDefendView(): void {
            this._view.currentState = 'defender';
            let info = this._proxy.getStageInfo(this._index);
            this._view.infoItem.updateRoleView(info);

            let isRobot = info && info.data && info.data.role_id.eq(Long.ZERO);//role_id为0就是机器人
            if (isRobot) {
                this._view.img_defender.source = this._proxy.getBossIcon();
                this._view.headVip.visible = false;
                this._view.img_defender.visible = true;
                let bossNames = this._proxy.getBossNames();
                this._view.lb_name.text = bossNames[0];
                this._view.lb_guild.text = bossNames[1];
                let layerIdx = this._proxy.getLayerIdx(this._stage);
                this._view.powerLabel.setPowerValue(this._proxy.getBossPower(layerIdx));
            } else {
                this._view.headVip.visible = true;
                this._view.img_defender.visible = false;
                let role = info.data;
                this._view.headVip.updateShow(role.head, role.head_frame, role.sex, role.vip);
                this._view.lb_name.text = role.name;
                this._view.lb_guild.text = role.guild_name ? (getLanById(LanDef.zongmen) + '：' + role.guild_name) : '';
                this._view.powerLabel.setPowerValue(info && info.data ? info.data.showpower : 0);
            }

            let defendTime = info.defend_time || 0;
            let defendLeftTime = defendTime - TimeMgr.time.serverTimeSecond;
            this._view.btn_do.visible = defendLeftTime <= 0;
        }

        //无人占领
        private updateNotoneView(): void {
            this._view.currentState = 'notone';
            this._view.btn_do.visible = true;
            this._view.infoItem.updateDefaultView(this._stage, this._index);
        }

        //冷却时间处理，冷却时间组件和占领按钮
        protected updateCoolTime(): void {
            let isLarge = this._proxy.isCoolTimeLarge();
            this._view.btn_do.visible = !isLarge;
            if (isLarge) {
                this._view.coolTimeItem.y = 840;
            } else {
                this._view.coolTimeItem.y = 870;
            }
            this._view.coolTimeItem.updateShow();
        }

        protected updateTime(): void {
            this.updateCoolTime();

            let info = this._proxy.getStageInfo(this._index);
            if (info) {
                this._view.infoItem.updateRoleView(info);
            }

            let leftCoolTime = this._proxy.getLeftCoolTime();
            let addTime = leftCoolTime > 0 || info != null;
            if (addTime) {
                if (!TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.addUpdateItem(this, 1000);
                }
            } else {
                TimeMgr.removeUpdateItem(this);
            }
        }

        update(time: base.Time) {
            this.updateTime();
        }
    }
}