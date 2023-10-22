namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import Tween = base.Tween;
    import Handler = base.Handler;

    export class ZhanduiMdr extends EffectMdrBase {
        private _view: ZhanduiView = this.mark("_view", ZhanduiView);
        private _proxy: ZhanduiProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhandui);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            addEventListener(this._view.btn_jixing, egret.TouchEvent.TOUCH_TAP, this.onClickJixing, this);
            addEventListener(this._view.btn_rename, egret.TouchEvent.TOUCH_TAP, this.onClickRename, this);
            addEventListener(this._view.btn_apply, egret.TouchEvent.TOUCH_TAP, this.onClickApply, this);
            addEventListener(this._view.btn_channel, egret.TouchEvent.TOUCH_TAP, this.onClickChannel, this);
            addEventListener(this._view.img_flag, egret.TouchEvent.TOUCH_TAP, this.onClickFlag, this);
            addEventListener(this._view.btn_jitan, egret.TouchEvent.TOUCH_TAP, this.onClickJitan, this);
            addEventListener(this._view.btn_tansuo, egret.TouchEvent.TOUCH_TAP, this.onClickTansuo, this);
            addEventListener(this._view.btn_kuangmai, egret.TouchEvent.TOUCH_TAP, this.onClickKuangmai, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_BASE_INFO, this.onUpdateView, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_TEAM_ROLE_APPLY_LIST_INFO, this.onUpdateBtnHint, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_JITAN_BASE_INFO, this.updateBtnInfo, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.sendButtonClick(ZhanduiOperType.Oper100);
            this.updateBtnInfo();
            this.isShowEft();
            this.updateData();

        }

        protected isShowEft():void{
            this.removeEft();
            this.addEftByParent(UIEftSrc.XuJieCloud,this._view.group_eft1);
            this.addEftByParent(UIEftSrc.XuJieCloud,this._view.group_eft2);
            this.addEftByParent(UIEftSrc.XuJieCloud,this._view.group_eft3);
            this.addEftByParent(UIEftSrc.XuJieCloud,this._view.group_eft4);
            this.addEftByParent(UIEftSrc.XuJieCloud,this._view.group_eft5);
        }

        protected onHide(): void {
            Tween.remove(this._view.group_eft1);
            Tween.remove(this._view.group_eft2);
            Tween.remove(this._view.group_eft3);
            Tween.remove(this._view.group_eft4);
            Tween.remove(this._view.group_eft5);
            this.sendNt(MoreEvent.ON_UPDATE_ZHANDUI_CHECK_VIEW_HIDE);
            super.onHide();
        }

        protected updateData() {
            Tween.remove(this._view.group_eft1);
            Tween.remove(this._view.group_eft2);
            Tween.remove(this._view.group_eft3);
            Tween.remove(this._view.group_eft4);
            Tween.remove(this._view.group_eft5);
            Tween.get(this._view.group_eft1,{loop:true})
                .to({x:160,alpha:1},3000)
                .to({x:160,alpha:0},3000)
            Tween.get(this._view.group_eft2,{loop:true})
                .to({x: 530,alpha:1}, 3000)
                .to({x: 530,alpha:0}, 3000)
            Tween.get(this._view.group_eft3,{loop:true})
                .to({x:160,alpha:1}, 3000)
                .to({x:160,alpha:0}, 3000)
            Tween.get(this._view.group_eft4,{loop:true})
                .to({x:530,alpha:1}, 3000)
                .to({x:530,alpha:0}, 3000)
            Tween.get(this._view.group_eft5,{loop:true})
                .to({x: 530,alpha:1}, 3000)
                .to({x: 530,alpha:0}, 3000)
        }

        private onUpdateView(): void {
            if (!this._proxy.haveTeam()) {
                ViewMgr.getIns().showMain();//退出队伍后，返回主界面
                return;
            }
            this.updateView();
            this.updateData();
        }

        private onUpdateBtnHint(): void {
            this._view.btn_apply.setHint(this._proxy.getApplyHint());
        }

        private updateView(): void {
            let num = this._proxy.total_team_count;
            let str = StringUtil.substitute(getLanById(LanDef.zhandui_tips4), [TextUtil.addColor(num + '', BlackColor.GREEN)]);
            this._view.lb_text.textFlow = TextUtil.parseHtml(str);

            this._view.lb_name.text = this._proxy.team_name;
            this._view.lb_lv.text = this._proxy.team_level + getLanById(LanDef.lv);
            this._view.img_flag.source = ResUtil.getZhanduiFlag(this._proxy.flag_index);

            let teamRoles = this._proxy.team_roles;
            this._view.teammateItem0.data = teamRoles[0];
            this._view.teammateItem1.data = teamRoles[1];
            this._view.teammateItem2.data = teamRoles[2];
            this._view.teammateItem3.data = teamRoles[3];

            this.onUpdateBtnHint();
            this._view.redPoint.visible = this._proxy.getRewardHint();
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.zhandui_tips13));
        }

        private onClickJixing(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.ZhanduiXianjiMain);
        }

        private onClickRename(): void {
            if (!this._proxy.isCaption()) {
                PromptBox.getIns().show(getLanById(LanDef.zhandui_tips10));
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.ZhanduiRename);
        }

        private onClickApply(): void {
            if (!this._proxy.isCaption()) {
                PromptBox.getIns().show(getLanById(LanDef.zhandui_tips10));
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.ZhanduiInviteList);
        }

        private onClickChannel(): void {
            ViewMgr.getIns().showView(ModName.Chat, ChatViewType.ChatMain, ChatMainBtnType.Zhandui);
        }

        private onClickFlag(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.ZhanduiLevelSecondMainMdr);
        }

        private onClickJitan(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XujieJitan, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XujieJitanMain);
        }

        private onClickTansuo(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XujieTansuo, true)) {
                return;
            }
            // PromptBox.getIns().show(`墟界探索，敬请期待`);
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XujieTansuoMain);
        }

        private onClickKuangmai(): void {
            // PromptBox.getIns().show(`墟界矿脉，敬请期待`);
            ViewMgr.getIns().showView(ModName.More, MoreViewType.MiningMain);
        }

        //todo 其他系统入口红点处理
        private updateBtnInfo(): void {
            let tansuoHint = HintMgr.getHint([ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieTansuoMain]);
            this._view.btn_tansuo.setData(XujieType.Tansuo, tansuoHint);

            let kuangmaiHint = HintMgr.getHint([ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.MiningMain]);
            this._view.btn_kuangmai.setData(XujieType.Kuangmai, kuangmaiHint);

            let jitanHint = HintMgr.getHint([ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieJitanMain]);
            this._view.btn_jitan.setData(XujieType.Jitan, jitanHint);
        }

    }
}