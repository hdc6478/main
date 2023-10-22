namespace game.mod.shilian {

    import yuanling_team = msg.yuanling_team;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;
    import s2c_yuanling_invita = msg.s2c_yuanling_invita;

    // 队伍列表item
    export class YuanLingTeamItem extends BaseListenerRenderer {
        public head: game.mod.HeadVip;
        public lb_name: eui.Label;
        public lb_power: eui.Label;
        public btn_do: game.mod.Btn;
        public lb_state: eui.Label;
        public gr_invite: eui.Group;
        public btn_cancel: game.mod.Btn;
        public btn_ok: game.mod.Btn;
        public lb_diff: eui.Label;
        public img_zhanli: eui.Image;

        protected _proxy: YuanLingProxy;

        constructor() {
            super();
            this.skinName = `skins.shilian.YuanLingTeamItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Shilian, ProxyType.YuanlingFuben);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do, this.onClick, this);
            this.gr_invite.visible = this.img_zhanli.visible = false;
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data as yuanling_team;
            if (!data) {
                return;
            }

            let teamCnt = this._proxy.getTeamCount();
            this.lb_power.text = `人数：${data.count}/${teamCnt}`;
            if (data.fight || data.count >= teamCnt) {
                this.btn_do.visible = false;
                this.lb_state.text = data.fight ? '正在战斗中' : '人员已满';
            } else {
                this.btn_do.visible = true;
                this.lb_state.visible = false;
            }

            let topPlayer = data.info ? data.info[0] : null;
            if (!topPlayer) {
                return;
            }
            this.lb_name.text = topPlayer.name;
            this.head.updateShow(topPlayer.head.toNumber(), topPlayer.head_frame.toNumber(), topPlayer.sex, (topPlayer.vip || 0) % 100);
        }

        protected onClick(): void {
            let data = this.data as yuanling_team;
            let kick_out_team = this._proxy.model.kick_out_team;

            //被提出队伍的，一分钟内无法再进入此队伍
            if (kick_out_team[data.team_id] != null) {
                let time = kick_out_team[data.team_id] || 0;
                let serverTime = TimeMgr.time.serverTimeSecond;
                let left = time + 60 - serverTime;
                if (left > 0) {
                    PromptBox.getIns().show(`在${left}秒后才可进入此队伍`);
                    return;
                }
                kick_out_team[data.team_id] = null;
                delete kick_out_team[data.team_id];
            }
            this._proxy.c2s_yuanling_jion_team(data.team_id, this._proxy.curDiffType);
        }
    }

    // 邀请列表item，被邀请
    export class YuanLingTeamItem2 extends YuanLingTeamItem {

        protected onAddToStage() {
            super.onAddToStage();
            this.lb_state.visible = this.btn_do.visible = false;
            this.gr_invite.visible = true;
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_cancel, this.onClickCancel, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_ok, this.onClickOk, this);
        }

        protected dataChanged() {
            let data = this.data as s2c_yuanling_invita;
            if (!data) {
                return;
            }
            let leader = data.leader ? data.leader[0] : null;
            this.lb_name.text = leader ? leader.name : '';
            this.lb_power.text = `人数：${data.count}/${this._proxy.getTeamCount()}`;
            this.lb_diff.text = `邀请你挑战${YuanLingDiffAry[data.index]}元灵`;
            if (leader) {
                this.head.updateShow(leader.head, leader.head_frame, leader.sex, (leader.vip || 0) % 100);
            }
        }

        // 抛出一个事件，刷新上级list数据，移除当前项
        private onClickCancel(): void {
            facade.sendNt(ShilianEvent.ON_YUANLING_INVITE_LIST_ITEM_DELETE, this.data);
        }

        /**
         * 如果点击接受的队伍已经开了或者满了，则会提示队伍已不存在，服务端飘字提示。
         * 前端不管服务端如何处理，不论是加入队伍还是不给加入队伍，都删除这条信息。
         * （若是加入队伍成功，就会跳到组队界面，全部被邀请信息都会清空了）
         */
        private onClickOk() {
            let data = this.data as s2c_yuanling_invita;
            facade.sendNt(ShilianEvent.ON_YUANLING_INVITE_LIST_ITEM_DELETE, data);
            this._proxy.c2s_yuanling_jion_team(data.team_id, data.index);
        }

    }
}