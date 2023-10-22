namespace game.mod.xianfa {

    import GameNT = base.GameNT;
    import facade = base.facade;
    import s2c_normalskill_info = msg.s2c_normalskill_info;
    import c2s_skill_levelup = msg.c2s_skill_levelup;
    import c2s_skill_takeon = msg.c2s_skill_takeon;
    import c2s_skill_takeoff = msg.c2s_skill_takeoff;
    import s2c_normalskill_ok = msg.s2c_normalskill_ok;
    import XianfaSkillInitConfig = game.config.XianfaSkillInitConfig;
    import skill_item = msg.skill_item;

    export class XianfaProxy extends ProxyBase implements IXianfaProxy {

        private _model: XianfaModel;

        //保存服务器发过来的仙法技能列表，供战斗中使用
        public skills: number[];

        getModel(): XianfaModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new XianfaModel();

            this.onProto(s2c_normalskill_info, this.s2c_normalskill_info, this);
            this.onProto(s2c_normalskill_ok, this.s2c_normalskill_ok, this);
        }

        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.xianqi) >= 0) {
                this.updateXianfaHint();
            }
        }

        protected onBagUpdateByBagType(n: base.GameNT): void {
            let keys: number[] = n.body;
            if (keys.indexOf(BagType.Material) >= 0) {
                this.updateXianfaHint();
            }
        }

        /**
         * 仙法信息
         * @param {number} type 1-仙法
         */
        //前端暂时没使用到
        // public c2s_normalskill_info(type: XianfaType = XianfaType.Type1): void {
        //     let msg: c2s_normalskill_info = new c2s_normalskill_info();
        //     msg.type = type;
        //     this.sendProto(msg);
        // }

        private s2c_normalskill_info(n: GameNT) {
            let msg: s2c_normalskill_info = n.body;

            this.skills = [];
            if (msg.godallskill) {
                for (let i = 0; i < msg.godallskill.length; i++) {
                    let d = msg.godallskill[i];
                    this.skills[i] = d.index;
                }
            }

            this._model.updateInfos(msg.godallskill);
            this._model.posSkills = msg.pos_godskill;

            this.updateXianfaHint();
            this.sendNt(XianfaEvent.UPDATE_XIANFA_INFO);
        }

        /**
         * 仙法升级等
         * @param type 1仙法
         * @param oper 1:单次 2:一键（一键不用传index）
         * @param operType 操作类型 1升级，2升星，3精研，4激活
         * @param index 技能编号
         * @return
         */
        public c2s_skill_levelup(type: XianfaType = XianfaType.Type1, oper: number, operType: number, index?: number): void {
            let msg: c2s_skill_levelup = new c2s_skill_levelup();
            msg.type = type;
            msg.oper = oper;
            msg.index = index;
            msg.oper_type = this._model.oper = operType;
            this.sendProto(msg);
        }

        /**
         * 仙法穿戴
         * @param type 1仙法
         * @param operType 操作类型 1:单次 2:一键（一键不用传index、pos）
         * @param pos 装配到的位置，从1开始
         * @param index 技能编号
         * @return
         */
        public c2s_skill_takeon(type: XianfaType = XianfaType.Type1, operType: number, pos?: number, index?: number): void {
            let msg: c2s_skill_takeon = new c2s_skill_takeon();
            msg.type = type;
            msg.index = index;
            // msg.pos = pos;               // 改由服务端计算
            msg.oper_type = operType;
            this.sendProto(msg);
        }

        /**
         * 仙法卸下
         * @param type 1仙法
         * @param pos 装配到的位置，从1开始
         * @return
         */
        public c2s_skill_takeoff(type: XianfaType = XianfaType.Type1, pos: number): void {
            let msg: c2s_skill_takeoff = new c2s_skill_takeoff();
            msg.type = type;
            msg.pos = pos;
            this.sendProto(msg);
        }

        /**
         * 操作成功返回
         * @return
         */
        private s2c_normalskill_ok(n: GameNT) {
            let msg: s2c_normalskill_ok = n.body;
            if (msg.godallskill) {
                this._model.updateInfos([msg.godallskill], true);
            }
            this._model.posSkills = msg.pos_godskill;

            this.updateXianfaHint();

            if (msg.is_auto && msg.godallskill) {
                this.updateOneKeyUpgradeHint();
                facade.showView(ModName.Xianfa, XianfaViewType.XianfaActiveTip, msg.godallskill);
            }
            if (this._model.oper == 1) {
                ViewMgr.getIns().showSuccessTips(SuccessTipsType.Up);
            } else if (this._model.oper == 2) {
                ViewMgr.getIns().showSuccessTips(SuccessTipsType.Star);
            }
            this._model.oper = 0;
            this.sendNt(XianfaEvent.UPDATE_XIANFA_INFO);
        }


        ////////////////////////////////////////红点///////////////////////////////////////
        /**
         * 仙法入口、标签页红点
         * @returns
         */
        public updateXianfaHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianfa)) {
                return;
            }
            let infos: { [id: string]: skill_item } = this._model.getAllInfos();
            if (!infos) {
                return;
            }
            let hint = false;
            for (let id in infos) {
                hint = this.updateListItemHint(Number(id));
                if (hint) {
                    break;
                }
            }
            if (!hint) {
                hint = this.updateOneKeyWearHint();
            }
            HintMgr.setHint(hint, this._model.xianfaHint);
        }

        private updateOneKeyWearHint(): boolean {
            let hint = this.getOneKeyWearHint();
            HintMgr.setHint(hint, this._model.oneKeyWearHint);
            return hint;
        }

        /**
         * 一键穿戴红点
         * @returns
         */
        public getOneKeyWearHint(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianfa)) {
                return false;
            }
            let hint = false;
            let infos: { [id: string]: skill_item } = this._model.getAllInfos();
            if (!infos) {
                return false;
            }

            let allWearInfos: skill_item[] = this._model.getAllWearInfos();
            if (Object.keys(infos).length > allWearInfos.length && allWearInfos.length < XianfaSkillNum) {
                return true;
            }

            let minPower: number = 0;
            for (let wearInfo of allWearInfos) {
                if (wearInfo && (wearInfo.power < minPower || !minPower)) {
                    minPower = wearInfo.power;
                }
            }

            for (let id in infos) {
                let info = infos[id];
                let isWear = this._model.isWear(info.index);
                if (isWear) {
                    continue;
                }

                if (info.power > minPower) {
                    hint = true;
                    break;
                }
            }
            return hint;
        }

        /**
         * 一键升级红点
         * @returns
         */
        public updateOneKeyUpgradeHint(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianfa)) {
                return false;
            }
            let hint = false;
            for (let i: number = 0; i < XianfaSkillNum; i++) {
                let pos = i + 1;
                let info = this._model.getPosInfo(pos);
                if (!info) {
                    continue;
                }
                hint = this.updateUpgradeHint(info.index);
                if (hint) {
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.oneKeyUpgradeHint);
            return hint;
        }

        /**
         * 单个激活红点，仙法是自动激活，无需红点
         * @returns
         */
        // public updateActiveHint(): boolean {
        //     if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianfa)){
        //         return false;
        //     }
        //     let hint = false;
        //     return hint;
        // }

        /**
         * 仙法列表的单个仙法红点
         * @returns
         */
        public updateListItemHint(id: number): boolean {
            let hint = this.updateUpgradeHint(id) || this.updateUpStarHint(id) || this.updateStudyHint(id);
            return hint;
        }

        /**
         * 单个升级红点
         * @returns
         */
        public updateUpgradeHint(id: number): boolean {
            let info = this._model.getInfo(id);
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianfa) || !info) {
                return false;
            }
            let hint = false;
            let cfg = this._model.getXianfaCfg(id);
            if (!cfg) {
                return false;
            }
            let cost = this._model.getUpgradeCost(info.lv + 1, cfg.skill_quality);
            if (!cost.length) {
                return false;
            }
            let isEnough: boolean = BagUtil.checkPropCnt(cost[0], cost[1]);
            hint = isEnough && !this._model.isMaxLv(id, info.lv);          // 消耗足够，且未满级
            return hint;
        }

        /**
         * 单个升星红点
         * @returns
         */
        public updateUpStarHint(id: number): boolean {
            let info = this._model.getInfo(id);
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianfa) || !info) {
                return false;
            }
            let hint = false;
            let cost = this._model.getUpStarCost(id);
            if (!cost.length) {
                return false;
            }
            let isEnough: boolean = BagUtil.checkPropCnt(cost[0], cost[1]);
            hint = isEnough && this._model.isMaxLv(id, info.lv) && !this._model.isMaxStar(id);          // 消耗足够，且已满级未满星
            return hint;
        }

        /**
         * 单个精研红点
         * @returns
         */
        public updateStudyHint(id: number): boolean {
            let info = this._model.getInfo(id);
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianfa) || !info) {
                return false;
            }
            let hint = false;
            let cfg = this._model.getXianfaCultivateCfg(info.cultivate_level + 1);
            let cfg1 = this._model.getXianfaCfg(id);
            let cost = this._model.getStudyCost(info.cultivate_level + 1);
            if (!cfg || !cost.length) {
                return false;
            }
            let isEnough: boolean = BagUtil.checkPropCnt(cost[0], cost[1]);
            hint = isEnough && info.lv >= cfg.yanxi_condition[cfg1.skill_quality - 1] && !this._model.isMaxStudy(id);          // 消耗足够，且等级达到精研未满级
            return hint;
        }

        public get posSkills(): number[] {
            return this._model.posSkills;
        }
    }

    export interface IXianfaSkillData {
        cfg: XianfaSkillInitConfig;
        info: skill_item;
        star?: number;
        sort?: number;
    }

}