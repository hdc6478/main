namespace game.mod.union {

    import member_data = msg.member_data;
    import GuildJobDataConfig = game.config.GuildJobDataConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    /**成员信息二级弹窗界面 */
    export class UnionMemberPopupMdr extends EffectMdrBase {
        private _view: UnionMemberPopupView = this.mark("_view", UnionMemberPopupView);
        private _proxy: UnionProxy;

        private _info: member_data;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.img_di.source = ResUtil.getUiPng("p1_tongyongbaisedi");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_down, TouchEvent.TOUCH_TAP, this.onClickDown, this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp, this);

            this.onNt(UnionEvent.ON_UPDATE_MEMBER_LIST, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();

            this._view.secondPop.updateTitleStr(getLanById(LanDef.fairy_magic_player_info));
            this._view.secondPop.updateBgSrc(ResUtil.getUiJpg("bg_xinxi"));
        }

        private onUpdateView(): void {
            this._info = this._proxy.getMemberById(this._showArgs);
            let info: RankUIRoleData = {...this._info};
            this.updateRankUIRole(this._view.grp_eff, info);

            this._view.power.setPowerValue(this._info.power);
            this._view.head.updateShow(this._info.head, this._info.head_frame, this._info.sex, this._info.vip);
            this._view.lab_name.text = this._info.name;
            this._view.lab_power.text = `战力：${+this._info.power}`;
            this._view.img_job.source = this._info.guild_job < UnionJob.General ? `biaoqian_job${this._info.guild_job}` : "";
            this._view.img_job.visible = this._info.guild_job < UnionJob.General;

            let job: number = this._proxy.model.guild_job;
            /**!cfg=没权限 */
            let cfg: GuildJobDataConfig = getConfigByNameId(ConfigName.GuildJobData, job);
            /**选中角色是否自己 */
            let self: boolean = this._info.role_id == RoleVo.ins.role_id;
            /**当前选中角色职位是否比自己小 数值越大职位越低 */
            let enough: boolean = this._info.guild_job > job;
            /**已经离开宗门 */
            let level: boolean = this._info.guild_job == UnionJob.Leave;
            if (!cfg || self || !enough || level) {
                this._view.btn_down.visible = false;
                this._view.btn_up.visible = false;
                return;
            }

            if (job == UnionJob.Leader) {
                this._view.btn_up.visible = cfg.change_job == 1;
                this._view.btn_down.visible = cfg.del_member == 1;
            } else {
                this._view.btn_up.visible = cfg.change_job == 1 && this._info.guild_job - 1 > job;
                // if (this._info.guild_job == UnionJob.General) {
                //     this._view.btn_down.visible = cfg.del_member == 1 && enough && cfg.del_member == 1;
                // } else {
                //     this._view.btn_down.visible = cfg.del_member == 1 && enough;
                // }
                this._view.btn_down.visible = cfg.del_member == 1 && enough;
            }
            if (this._view.btn_down.visible) {
                this._view.btn_down.label = this._info.guild_job == UnionJob.General ? "踢出" : "降职";
                this._view.btn_down.setBlue();
            }
            if (this._view.btn_up.visible) {
                this._view.btn_up.label = this._info.guild_job == UnionJob.Deputy ? "禅让" : "升职";
                this._view.btn_up.setYellow();
            }
        }

        private onClickDown(): void {
            let name: string = TextUtil.addColor(`${this._info.name}`, BlackColor.GREEN);
            if (this._info.guild_job == UnionJob.General) {
                let content: string = StringUtil.substitute(getLanById(LanDef.guild_oper_tips_0), [name]);
                ViewMgr.getIns().showConfirm(content, Handler.alloc(this, this.onFired));
            } else {
                let jobText: string = this._proxy.getJobTextByJob(this._info.guild_job + 1);
                let job: string = TextUtil.addColor(`${jobText}`, BlackColor.GREEN);
                let content: string = StringUtil.substitute(getLanById(LanDef.guild_oper_tips_2), [name, job]);
                ViewMgr.getIns().showConfirm(content, Handler.alloc(this, this.onDown));
            }
        }

        private onFired(): void {
            this._proxy.c2s_guild_kick_member(this._info.role_id);
            this.hide();
        }

        private onDown(): void {
            this._proxy.c2s_set_guild_member_job(this._info.role_id, UnionJobOper.DOWN);
        }

        private onClickUp(): void {
            let name: string = TextUtil.addColor(`${this._info.name}`, BlackColor.GREEN);
            let jobText: string = this._proxy.getJobTextByJob(this._info.guild_job - 1);
            let job: string = TextUtil.addColor(`${jobText}`, BlackColor.GREEN);
            let content: string = StringUtil.substitute(getLanById(LanDef.guild_oper_tips_1), [name, job]);
            ViewMgr.getIns().showConfirm(content, Handler.alloc(this, this.onUpgrade));
        }

        private onUpgrade(): void {
            this._proxy.c2s_set_guild_member_job(this._info.role_id, UnionJobOper.UP);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}