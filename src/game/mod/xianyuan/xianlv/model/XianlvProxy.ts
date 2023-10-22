namespace game.mod.xianyuan {

    import c2s_xianlv_seeking_info = msg.c2s_xianlv_seeking_info;
    import GameNT = base.GameNT;
    import s2c_xianlv_seeking_info = msg.s2c_xianlv_seeking_info;
    import c2s_xianlv_seeking = msg.c2s_xianlv_seeking;
    import s2c_xianlv_banlv_info = msg.s2c_xianlv_banlv_info;
    import c2s_xianlv_propose = msg.c2s_xianlv_propose;
    import teammate = msg.teammate;
    import c2s_xianlv_lihun = msg.c2s_xianlv_lihun;
    import c2s_xianlv_choujiang = msg.c2s_xianlv_choujiang;
    import facade = base.facade;

    /**
     * @description 仙侣系统
     */
    export class XianlvProxy extends ProxyBase implements IXianlvProxy {
        private _model: XianlvModel;

        public getBtnOpenIdxAry(): number[] {
            return this._model.btnOpenIdxAry;
        }

        public getBtnHintPath(openIdx: OpenIdx): string[] {
            return this._model.btnHintPath[openIdx];
        }

        initialize(): void {
            super.initialize();
            this._model = new XianlvModel();
            this.onProto(s2c_xianlv_banlv_info, this.s2c_xianlv_banlv_info, this);
            this.onProto(s2c_xianlv_seeking_info, this.s2c_xianlv_seeking_info, this);
        }

        //求婚，oper：1强制 2普通
        public c2s_xianlv_propose(role_id: Long, oper: number, server_id: number): void {
            let msg = new c2s_xianlv_propose();
            msg.role_id = role_id;
            msg.oper = oper;
            msg.server_id = server_id;
            this.sendProto(msg);
        }

        //是否同意，oper：1同意 2拒绝
        public c2s_xianlv_seeking(role_id: Long, oper: number): void {
            let msg = new c2s_xianlv_seeking();
            msg.role_id = role_id;
            msg.oper = oper;
            this.sendProto(msg);
        }

        //返回伴侣信息
        private s2c_xianlv_banlv_info(n: GameNT): void {
            let msg = n.body as s2c_xianlv_banlv_info;
            let oldInfo = this._model.banlv_infos;
            if(oldInfo && !msg.infos){
                //解除仙侣时候，删除对应私聊信息
                let chatProxy: IChatProxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);
                chatProxy.deletePrivateInfo(oldInfo.role_id);
            }
            this._model.banlv_infos = msg.infos ? msg.infos : null;
            this._model.days = msg.days ? msg.days : 0;
            this.sendNt(XianyuanEvent.ON_UPDATE_BANLV_INFO);
        }

        //邀请记录
        public c2s_xianlv_seeking_info(): void {
            let msg = new c2s_xianlv_seeking_info();
            this.sendProto(msg);
        }

        //返回邀请记录
        private s2c_xianlv_seeking_info(n: GameNT): void {
            let msg = n.body as s2c_xianlv_seeking_info;
            if (msg.infos != null) {
                this._model.invite_records = msg.infos;
            } else {
                this._model.invite_records = [];
            }
            this.sendNt(XianyuanEvent.ON_UPDATE_INVITE_RECORDS);
        }

        //离婚
        public c2s_xianlv_lihun(): void {
            this.sendProto(new c2s_xianlv_lihun());
        }

        // 抽奖 1 低级 2 高级
        public c2s_xianlv_choujiang(oper: number): void {
            let msg = new c2s_xianlv_choujiang();
            msg.oper = oper;
            this.sendProto(msg);
        }

        //强制结婚消耗
        public getForceMarryCost(): number[] {
            return [PropIndex.Kunxiansheng, 1];
        }

        //同修天数
        public getTogetherDay(): number {
            return this._model.days;
        }

        //todo（子女战力+婚戒战力+子女翅膀+子女神兵....）
        public getPower(): number {
            let ringProxy: RingProxy = getProxy(ModName.Xianyuan, ProxyType.Ring);
            let ringPower = ringProxy.getPower();
            let childProxy: ChildProxy = getProxy(ModName.Xianyuan, ProxyType.Child);
            let childPower = childProxy.getPower();
            return ringPower + childPower;
        }

        public isMarried(): boolean {
            return !!this._model.banlv_infos;
        }

        public getBanlvInfo(): teammate {
            return this._model.banlv_infos;
        }

        public getInviteRecords(): teammate[] {
            return this._model.invite_records;
        }

        public getZhaohuanCosts(): number[][] {
            let paramCfg = GameConfig.getParamConfigById('xianlv_zhaohuancost');
            return paramCfg ? paramCfg.value : [];
        }

        public canZhaohuan(): boolean {
            for (let i = 1; i <= 2; i++) {
                if (this.canZhaohuanByOper(i)) {
                    return true;
                }
            }
            return false;
        }

        //1 低级 2 高级
        public canZhaohuanByOper(oper: number, isTips = false): boolean {
            let costs = this.getZhaohuanCosts();
            let cost = costs[oper - 1];
            return cost && cost.length && BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        //仙侣红点
        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianlv)) {
                return;
            }
            let zhaohuanHint = this.canZhaohuan();
            HintMgr.setHint(zhaohuanHint, this._model.hintPath[1]);
        }

        //仙侣任务红点
        private updateHint2(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianlvRenwu)) {
                return;
            }
            let taskList = TaskUtil.getTaskList(TaskType.Xianlv);
            let hint = false;
            for (let task of taskList) {
                if (task && TaskUtil.canRewardDraw(task)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[2]);
        }

        protected onOpenFuncUpdate(n: GameNT) {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(OpenIdx.Xianlv) > -1) {
                this.updateHint();
            }
            if (addIdx.indexOf(OpenIdx.XianlvRenwu) > -1) {
                this.updateHint2();
            }
        }

        protected onTaskHint(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(TaskType.Xianlv) > -1) {
                this.updateHint2();
            }
        }

        protected onRoleUpdate(n: GameNT) {
            let keys = n.body as string[];
            if (keys.indexOf(RolePropertyKey.Xtlqcoin) > -1) {
                this.updateHint();
            }
        }

        protected onBagUpdateByPropIndex(n: GameNT) {
            let indexs = n.body as number[];
            let zhaohuanCosts = this.getZhaohuanCosts();
            let idx = zhaohuanCosts && zhaohuanCosts[1] && zhaohuanCosts[1][0] || 0;
            if (indexs.indexOf(idx) > -1) {
                this.updateHint();
            }
        }

        //能否开启试炼
        public isOpenShilian(): boolean {
            return this.isMarried() && ViewMgr.getIns().checkViewOpen(OpenIdx.XianlvShilian);
        }
    }
}