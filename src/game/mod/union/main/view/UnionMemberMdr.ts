namespace game.mod.union {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;
    import GuildDonateConfig = game.config.GuildDonateConfig;
    import GuildJobDataConfig = game.config.GuildJobDataConfig;
    import GameNT = base.GameNT;

    /**成员列表 */
    export class UnionMemberMdr extends MdrBase {
        private _view: UnionMemberView = this.mark("_view", UnionMemberView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionMemberItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rename, TouchEvent.TOUCH_TAP, this.onRename, this);
            addEventListener(this._view.btn_exit, TouchEvent.TOUCH_TAP, this.onClickExit, this);
            addEventListener(this._view.btn_check, TouchEvent.TOUCH_TAP, this.onClickCheck, this);
            addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onExplain, this);
            addEventListener(this._view.btn_recruit, TouchEvent.TOUCH_TAP, this.onClickRecruit, this);

            this.onNt(UnionEvent.ON_UPDATE_MEMBER_LIST, this.onUpdateList, this);
            this.onNt(UnionEvent.ON_UPDATE_UNION_INFO, this.onUpdateHeader, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
        }

        protected onShow(): void {
            this._proxy.c2s_ask_guild_member();
            super.onShow();

            this.onUpdateView();
        }

        private onUpdateView(): void {
            this._view.lab_level.text = `${this._proxy.model.info.level}级`;

            this._view.btn_check.setHint(HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType02]));

            this.onUpdateHeader();
            this.onUpdateUnionName();
            this.onUpdateUninonCount();
        }

        private onUpdateHeader(): void {
            this._view.lab_leader.text = `宗主：${this._proxy.model.header.name}`;
        }

        private onUpdateUnionName(): void {
            this._view.lab_name.text = this._proxy.model.name;
        }

        private onUpdateUninonCount(): void {
            let info = this._proxy.model.info;
            let cfg: GuildDonateConfig = getConfigByNameId(ConfigName.GuildDonate, info.level);
            this._view.lab_count.text = `人数：${info.num}/${cfg.num}`;
        }

        private onUpdateList(): void {
            this._listData.source = this._proxy.getMemberList();
        }

        /** */
        private onRename(): void {
            let cfg: GuildJobDataConfig = getConfigByNameId(ConfigName.GuildJobData, this._proxy.model.guild_job);
            if (!cfg || !cfg.change_name) {
                PromptBox.getIns().show("暂无权限");
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionRename);
        }

        /**问号 规则 */
        private onExplain(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xianzong_tips17))
        }

        private onClickCheck(): void {
            let cfg: GuildJobDataConfig = getConfigByNameId(ConfigName.GuildJobData, this._proxy.model.guild_job);
            if (!cfg || !cfg.agree_join) {
                PromptBox.getIns().show("暂无权限");
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionApply);
        }

        private onClickExit(): void {
            if (this._proxy.model.guild_job == UnionJob.Leader) {
                PromptBox.getIns().show("宗主不可退出宗门");
                return;
            }
            let str: string = getLanById(LanDef.guild_exit_tips);
            ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.onExit));
        }

        private onExit(): void {
            this._proxy.c2s_quit_guild();
        }

        private onClickRecruit(): void {
            let cfg: GuildJobDataConfig = getConfigByNameId(ConfigName.GuildJobData, this._proxy.model.guild_job);
            if (!cfg || !cfg.change_invita) {
                PromptBox.getIns().show("暂无权限");
                return;
            }
            ViewMgr.getIns().showConfirm("你需要向本服聊天中发送招募成员信息", Handler.alloc(this, this.onRecruit));
        }

        private onRecruit(): void {
            this._proxy.c2s_guild_invita();
        }

        private onUpdateHint(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType02])) {
                this._view.btn_check.setHint(data.value);
            }
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}