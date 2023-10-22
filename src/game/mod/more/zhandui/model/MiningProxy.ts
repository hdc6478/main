namespace game.mod.more {

    import c2s_zhandui_zhanbao_show = msg.c2s_zhandui_zhanbao_show;
    import c2s_zhandui_conquer_show = msg.c2s_zhandui_conquer_show;
    import GameNT = base.GameNT;
    import s2c_zhandui_zhanbao_show = msg.s2c_zhandui_zhanbao_show;
    import s2c_zhandui_conquer_show = msg.s2c_zhandui_conquer_show;
    import c2s_zhandui_buy_conquer_num = msg.c2s_zhandui_buy_conquer_num;
    import s2c_zhandui_buy_conquer_num = msg.s2c_zhandui_buy_conquer_num;
    import c2s_zhandui_helot_operate = msg.c2s_zhandui_helot_operate;
    import c2s_zhandui_helot_target_show = msg.c2s_zhandui_helot_target_show;
    import s2c_zhandui_helot_target_show = msg.s2c_zhandui_helot_target_show;
    import c2s_zhandui_lingbao = msg.c2s_zhandui_lingbao;
    import s2c_zhandui_update_call_num = msg.s2c_zhandui_update_call_num;
    import zhandui_zhanbao_data = msg.zhandui_zhanbao_data;
    import zhandui_kuanzhu_data = msg.zhandui_kuanzhu_data;
    import c2s_zhandui_kuanzhu_show = msg.c2s_zhandui_kuanzhu_show;
    import s2c_zhandui_kuanzhu_show = msg.s2c_zhandui_kuanzhu_show;
    import ParamConfig = game.config.ParamConfig;
    import teammate = msg.teammate;
    import HelotTargetRewardConfig = game.config.HelotTargetRewardConfig;
    import c2s_zhandui_target_buy = msg.c2s_zhandui_target_buy;
    import zhandui_oper = msg.zhandui_oper;
    import s2c_zhandui_kuanmai_pvp_ret = msg.s2c_zhandui_kuanmai_pvp_ret;

    export class MiningProxy extends ProxyBase {
        private _model: MiningModel;

        public get model(): MiningModel {
            return this._model;
        }

        //退出战队
        public onExitZhanduiTeam(): void {
            if (this._model) {
                this._model.exitTeam();
            }
        }

        initialize(): void {
            super.initialize();
            this._model = new MiningModel();

            this.onProto(s2c_zhandui_zhanbao_show, this.s2c_zhandui_zhanbao_show, this);
            this.onProto(s2c_zhandui_conquer_show, this.s2c_zhandui_conquer_show, this);
            this.onProto(s2c_zhandui_buy_conquer_num, this.s2c_zhandui_buy_conquer_num, this);
            this.onProto(s2c_zhandui_helot_target_show, this.s2c_zhandui_helot_target_show, this);
            this.onProto(s2c_zhandui_update_call_num, this.s2c_zhandui_update_call_num, this);
            this.onProto(s2c_zhandui_kuanzhu_show, this.s2c_zhandui_kuanzhu_show, this);
        }

        public c2s_zhandui_zhanbao_show(): void {
            let msg: c2s_zhandui_zhanbao_show = new c2s_zhandui_zhanbao_show();
            this.sendProto(msg);
        }

        public c2s_zhandui_conquer_show(): void {
            let msg: c2s_zhandui_conquer_show = new c2s_zhandui_conquer_show();
            this.sendProto(msg);
        }

        public c2s_zhandui_buy_conquer_num(count: number): void {
            let msg: c2s_zhandui_buy_conquer_num = new c2s_zhandui_buy_conquer_num();
            msg.count = count;
            this.sendProto(msg);
        }

        public c2s_zhandui_helot_operate(type: number, role_id: Long, kuanzhu_id: Long = RoleVo.ins.role_id): void {
            let msg: c2s_zhandui_helot_operate = new c2s_zhandui_helot_operate();
            msg.type = type;
            msg.role_id = role_id;
            msg.kuanzhu_id = kuanzhu_id;
            this.sendProto(msg);
        }

        public c2s_zhandui_helot_target_show(): void {
            let msg: c2s_zhandui_helot_target_show = new c2s_zhandui_helot_target_show();
            this.sendProto(msg);
        }

        public c2s_zhandui_target_buy(index: number): void {
            let msg: c2s_zhandui_target_buy = new c2s_zhandui_target_buy();
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_zhandui_lingbao(): void {
            let msg: c2s_zhandui_lingbao = new c2s_zhandui_lingbao();
            this.sendProto(msg);
        }

        /**type2用于矿脉界面领取奖励 */
        public c2s_zhandui_kuanzhu_show(type: number): void {
            let msg: c2s_zhandui_kuanzhu_show = new c2s_zhandui_kuanzhu_show();
            msg.type = type;
            this.sendProto(msg);
        }

        private s2c_zhandui_zhanbao_show(n: GameNT): void {
            let msg: s2c_zhandui_zhanbao_show = n.body;
            if (msg.logs) {
                this._model.logs = msg.logs;
            }
            this.sendNt(MoreEvent.ON_UPDATE_MINING_LOGS_INFO);
        }

        private s2c_zhandui_conquer_show(n: GameNT): void {
            let msg: s2c_zhandui_conquer_show = n.body;
            this._model.conquer_num = msg.conquer_num || 0;
            this._model.dail_buy_num = msg.dail_buy_num || 0;
            this._model.conquest_list = msg.list || [];
            this.sendNt(MoreEvent.ON_UPDATE_MINING_FIGHT_INFO);
        }

        private s2c_zhandui_buy_conquer_num(n: GameNT): void {
            let msg: s2c_zhandui_buy_conquer_num = n.body;
            this._model.conquer_num = msg.conquer_num || 0;
            this._model.dail_buy_num = msg.dail_buy_num || 0;
            this.sendNt(MoreEvent.ON_UPDATE_MINING_CNT_INFO);
        }

        private s2c_zhandui_helot_target_show(n: GameNT): void {
            let msg: s2c_zhandui_helot_target_show = n.body;
            this._model.buy_list = msg.buy_list || [];
            this.sendNt(MoreEvent.ON_UPDATE_MINING_GIFT_INFO);
        }

        private s2c_zhandui_update_call_num(n: GameNT): void {
            let msg: s2c_zhandui_update_call_num = n.body;
            this._model.lingbao_cnt = msg.num || 0;
            this.sendNt(MoreEvent.ON_UPDATE_MINING_LINGBAO_CNT_INFO);
        }

        private s2c_zhandui_kuanzhu_show(n: GameNT): void {
            let msg: s2c_zhandui_kuanzhu_show = n.body;
            if (msg.list) {
                this._model.list = msg.list;
            }
            this._model.total = msg.total || 0;
            this._model.conquer_num = msg.conquer_num || 0;
            this._model.rescue_num = msg.rescue_num || 0;
            this.onUpdateHint();
            this.sendNt(MoreEvent.ON_UPDATE_MINING_MASTER_INFO);
        }

        /**------------------------- 协议end ----------------------------- */

        public get list(): zhandui_kuanzhu_data[] {
            return this._model.list.sort((a, b) => {
                if (a.memeber.role_id.eq(RoleVo.ins.role_id)) {
                    return -1;
                } else if (b.memeber.role_id.eq(RoleVo.ins.role_id)) {
                    return 1;
                } else {
                    return 0;
                }
            }) || [];
        }

        public get conquest_list() {
            if (this.my_info && this.my_info.members) {
                let members = this.my_info.members;
                return this._model.conquest_list.filter(v => {
                    for (let member of members) {
                        if (member.role_id.eq(v.data.role_id)) {
                            return false;
                        }
                    }
                    return true;
                }) || [];
            }
            return this._model.conquest_list || [];
        }

        public get total(): number {
            return this._model.total || 0;
        }

        public get rescue_num(): number {
            return this._model.rescue_num || 0;
        }

        public get conquer_num(): number {
            return this._model.conquer_num || 0;
        }

        public get dail_buy_num(): number {
            return this._model.dail_buy_num || 0;
        }

        public get team_conquest_num(): number {
            if (!this._model.team_conquest_num) {
                let param: ParamConfig = GameConfig.getParamConfigById("team_conquest_num");
                this._model.team_conquest_num = param.value;
            }
            return this._model.team_conquest_num;
        }

        public get team_rescue_num(): number {
            if (!this._model.team_rescue_num) {
                let param: ParamConfig = GameConfig.getParamConfigById("team_rescue_num");
                this._model.team_rescue_num = param.value;
            }
            return this._model.team_rescue_num;
        }

        public get team_buy_num(): number {
            if (!this._model.team_buy_num) {
                let param: ParamConfig = GameConfig.getParamConfigById("team_buy_num");
                this._model.team_buy_num = param.value[2];
            }
            return this._model.team_buy_num;
        }

        public get team_buy_pay_num(): number {
            if (!this._model.team_buy_pay_num) {
                let param: ParamConfig = GameConfig.getParamConfigById("team_buy_num");
                this._model.team_buy_pay_num = param.value[1];
            }
            return this._model.team_buy_pay_num;
        }

        public get team_lingbao_cost(): number[] {
            if (!this._model.team_lingbao_cost) {
                let param: ParamConfig = GameConfig.getParamConfigById("team_lingbao_cost");
                this._model.team_lingbao_cost = param.value;
            }
            return this._model.team_lingbao_cost;
        }

        public get logs(): zhandui_zhanbao_data[] {
            return this._model.logs || [];
        }

        public get my_info(): zhandui_kuanzhu_data {
            return this._model.list.find(v => {
                return v.memeber.role_id.eq(RoleVo.ins.role_id);
            });
        }

        public getSlaveOper(roleId: Long, oper?: number): zhandui_oper | boolean {
            let info = this.my_info;
            if (!info || !info.oper_list) {
                return null;
            }
            let opers = info.oper_list.find(v => {
                return v.role_id.eq(roleId);
            })
            if (!oper) {
                return opers;
            }
            return opers && opers.list && opers.list.indexOf(oper) > -1;
        }

        public get my_slave_list(): teammate[] {
            if (!this.my_info) {
                return [];
            }
            return this.my_info.members;
        }

        /**战队其他队员奴隶 */
        public get slave_list(): teammate[] {
            let list = this._model.list.filter(v => {
                return !v.memeber.role_id.eq(RoleVo.ins.role_id);
            });
            let slave_list: teammate[] = [];
            if (!list || !list.length) {
                return slave_list;
            }
            for (let i in list) {
                let info: zhandui_kuanzhu_data = list[i];
                if (info && info.members) {
                    slave_list.push(...info.members);
                }
            }
            return slave_list;
        }

        public get lingbao_cnt(): number {
            return this._model.lingbao_cnt;
        }

        public get team_lingbao_cishuxianzhi(): number {
            if (!this._model.team_lingbao_cishuxianzhi) {
                let param: ParamConfig = GameConfig.getParamConfigById("team_lingbao_cishuxianzhi");
                this._model.team_lingbao_cishuxianzhi = param.value;
            }
            return this._model.team_lingbao_cishuxianzhi;
        }

        public get mdrType(): number {
            return this._model.mdrType || 1;
        }

        public set mdrType(v: number) {
            this._model.mdrType = v;
        }

        public get refresh_list(): boolean {
            return this._model.refresh_list;
        }

        public set refresh_list(v: boolean) {
            this._model.refresh_list = v;
        }

        public getGiftList(type: number): HelotTargetRewardConfig[] {
            let cfgArr: HelotTargetRewardConfig[] = getConfigListByName(ConfigName.HelotTargetReward);
            let list: HelotTargetRewardConfig[] = [];
            for (let cfg of cfgArr) {
                if (cfg.type == type) {
                    list.push(cfg);
                }
            }
            return list;
        }

        public getGiftBought(index: number): boolean {
            return this._model.buy_list.indexOf(index) > -1;
        }

        public get team_kuanmai_item(): number {
            if (!this._model.team_kuanmai_item) {
                let param: ParamConfig = GameConfig.getParamConfigById("team_kuanmai_item");
                this._model.team_kuanmai_item = param.value;
            }
            return this._model.team_kuanmai_item;
        }

        private onUpdateHint(): void {
            let root: string[] = [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.MiningMain];

            let info = this.my_info;
            if (!info) {
                HintMgr.setHint(false, root);
                return;
            }

            /**可收奴隶 */
            let bool: boolean = (!this.my_slave_list || this.my_slave_list.length < 2) && this.conquer_num > 0;
            if (bool) {
                HintMgr.setHint(bool, [...root, MdrTabBtnType.TabBtnType01]);
                HintMgr.setHint(bool, [...root, MdrTabBtnType.TabBtnType02]);
                return;
            } else {
                HintMgr.setHint(bool, [...root, MdrTabBtnType.TabBtnType01]);
            }
            if (this.getHintByLingbao()) {
                HintMgr.setHint(true, [...root, MdrTabBtnType.TabBtnType02]);
                return;
            }
            if (!this.my_slave_list) {
                HintMgr.setHint(false, [...root, MdrTabBtnType.TabBtnType02]);
                return;
            }
            if (!info.oper_list || !info.oper_list.length) {
                HintMgr.setHint(true, [...root, MdrTabBtnType.TabBtnType02]);
                return;
            }
            for (let opers of info.oper_list) {
                if (!opers.list || opers.list.length < 3) {
                    HintMgr.setHint(true, [...root, MdrTabBtnType.TabBtnType02]);
                    return;
                }
            }
            HintMgr.setHint(false, [...root, MdrTabBtnType.TabBtnType02]);
        }

        public getHintByLingbao(): boolean {
            return this.lingbao_cnt < this.team_lingbao_cishuxianzhi && BagUtil.checkPropCnt(this.team_lingbao_cost[0], this.team_lingbao_cost[1]);
        }
    }

}