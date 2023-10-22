namespace game.mod.equip {


    import s2c_equip_online_equip_request = msg.s2c_equip_online_equip_request;
    import GameNT = base.GameNT;
    import c2s_equip_operate = msg.c2s_equip_operate;
    import s2c_equip_update = msg.s2c_equip_update;
    import pos_detail = msg.pos_detail;
    import c2s_equip_get_info = msg.c2s_equip_get_info;
    import c2s_equip_pos_detail = msg.c2s_equip_pos_detail;
    import c2s_new_equip_online_request = msg.c2s_new_equip_online_request;
    import EquipmentConfig = game.config.EquipmentConfig;

    export class EquipProxy extends ProxyBase implements IEquipProxy {

        private _model: EquipModel;

        initialize(): void {
            super.initialize();
            this._model = new EquipModel();
            this.onProto(s2c_equip_online_equip_request, this.s2c_equip_online_equip_request, this);
            this.onProto(s2c_equip_update, this.s2c_equip_update, this);
        }

        public onStartReconnect(): void {
            super.onStartReconnect();
            this._model.equips = [];
        }

        /**============================= 新增代码部分 =============================*/

        c2s_new_equip_online_request(): void {
            this.sendProto(new c2s_new_equip_online_request());
        }

        //角色装备返回
        s2c_equip_online_equip_request(n: GameNT) {
            let msg: s2c_equip_online_equip_request = n.body;
            if (!msg || !msg.equips) {
                return;
            }
            for (let equip of msg.equips) {
                this._model.equips.push(PropData.fromData(equip));
            }
            this.updateEquipIconHint();
            this.sendNt(EquipEvent.EQUIP_UPDATE_BACK);
        }

        /**
         * @param oper 1：穿  2：脱  3：一键穿戴
         * @param prop_id 装备的唯一id（一键穿戴可缺省）
         */
        c2s_equip_operate(oper: number, prop_id: Long) {
            let req = new c2s_equip_operate();
            req.oper = oper;
            if (prop_id) {
                req.prop_id = prop_id;
            }
            this.sendProto(req);
        }

        /**
         * 装备更新
         */
        private s2c_equip_update(n: GameNT) {
            let msg: s2c_equip_update = n.body;
            if (!msg || !msg.update_info) {
                return;
            }
            for (let equip of msg.update_info) {
                if (!equip) {
                    continue;
                }
                let pos = this.getEquipInfoPos(equip.index.toNumber());
                let prop: PropData = PropData.fromData(equip);
                if (pos >= 0) {
                    this.sendNt(MainEvent.ON_UPDATE_EASY_USE_PROP_COUNT, prop);
                    this._model.equips[pos] = prop;
                } else {
                    this._model.equips.push(prop);
                }
            }
            this.updateEquipIconHint();
            this.sendNt(EquipEvent.EQUIP_UPDATE_BACK);
        }

        private getEquipInfoPos(index: number): number {
            if (!this._model.equips || !this._model.equips.length) {
                return -1;
            }
            let pos = index % 10;
            let len = this._model.equips.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.equips[i];
                //不应该用info.index==index判断，应该是装备部位pos
                if (info.index % 10 == pos) {
                    return i;
                }
            }
            return -1;
        }

        /**根据部位返回装备数据*/
        public getEquipByPos(pos: number = 0): PropData {
            let equips = this._model.equips;
            if (!equips) {
                return null;
            }
            for (let equip of equips) {
                if (equip && equip.equipPos == pos) {
                    return equip;
                }
            }
            return null;
        }

        /**更新装备进阶等级*/
        public updateEquipAdvancedLv(pos: number, lv: number): void {
            let equip = this.getEquipByPos(pos);
            equip.advanced_lv = lv;
        }

        //根据pos，获取角色装备列表 EquipPropType.RoleEquip
        public getEquipListByPos(pos: number): PropData[] {
            let propData = BagUtil.getBagsByType(BagType.RoleEquip) || [];
            let list: PropData[] = [];
            for (let prop of propData) {
                if (prop && prop.equipPos == pos && prop.propType == EquipPropType.RoleEquip) {
                    list.push(prop);
                }
            }
            return list;
        }

        // public getCurEquipByPos(pos: number): PropData {
        //     let equips = this._model.equips;
        //     if (!equips) {
        //         return null;
        //     }
        //     for (let equip of equips) {
        //         if (equip.equipPos == pos) {
        //             return equip;
        //         }
        //     }
        //     return null;
        // }

        /**检查对应的pos是否有装备可穿戴*/
        public checkEquipByPos(pos: number): boolean {
            let roleVl = RoleVo.ins.reincarnate;//转生等级
            let roleLevel = RoleVo.ins.level;
            let curEquip = this.getEquipByPos(pos);
            let equipList = this.getEquipListByPos(pos);
            if (!equipList || !equipList.length) {
                return false;
            }
            let curPower = curEquip && curEquip.regular_attrs && curEquip.regular_attrs.showpower.toNumber() || 0;
            for (let equip of equipList) {
                if (!equip || !equip.cfg) {
                    continue;
                }
                let cfg = equip.cfg as EquipmentConfig;
                //等级条件不足
                if (cfg.level_demand && cfg.level_demand > roleLevel) {
                    continue;
                }
                //转生条件不足
                if (cfg.rebirth_limit && cfg.rebirth_limit > roleVl) {
                    continue;
                }
                // 比当前穿戴的战力高
                if (equip.regular_attrs && equip.regular_attrs.showpower.toNumber() > curPower) {
                    return true;
                }
            }
            return false;
        }

        /**能否一键装备*/
        public checkOneKey(): boolean {
            for (let pos of EquipPosAry) {
                if (this.checkEquipByPos(pos)) {
                    return true;
                }
            }
            return false;
        }

        /**更新角色界面装备部位的红点*/
        private updateEquipIconHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Role)) {
                return;
            }
            let hintPath = this.getRoleEquipIconHint();
            for (let pos of EquipPosAry) {
                let isHint = this.checkEquipByPos(pos);
                HintMgr.setHint(isHint, [...hintPath, `${pos}`]);
            }
        }

        public getRoleEquipIconHint(): string[] {
            return [ModName.Role, NewRoleViewType.RoleMain, "EquipIcon"];
        }

        protected onBagUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (!types || !types.length || types.indexOf(BagType.RoleEquip) < 0) {
                return;
            }
            this.updateEquipIconHint();
        }

        public checkEquipLimit(prop: PropData): boolean {
            let roleVl = RoleVo.ins.reincarnate;//转生等级
            let roleLevel = RoleVo.ins.level;
            let cfg = prop.cfg as EquipmentConfig;
            //等级条件不足
            if (cfg.level_demand && cfg.level_demand > roleLevel) {
                return false;
            }
            //转生条件不足
            if (cfg.rebirth_limit && cfg.rebirth_limit > roleVl) {
                return false;
            }
            return true;
        }

        /**============================= 新增代码部分 end =============================*/
        /**
         *
         * @param index
         * @param is_robot 1 是【只用于聊天展示装备信息的机器人】  /其他情况不发该字段  null / 0 不是
         */
        c2s_equip_get_info(index: number, is_robot: number) {
            let req = new c2s_equip_get_info();
            req.index = index;
            req.is_robot = is_robot;
            this.sendProto(req);
        }

        /**装备部位查看详情
         * @param posId 装备部位
         * @param roleId 点击查看他人装备时才使用该字段【选择目标的role_id】
         * @param serverId 点击查看他人装备时才使用该字段【服务器ID】
         */
        c2s_equip_pos_detail(posId: number, roleId?: Long, serverId?: number) {
            let req = new c2s_equip_pos_detail();
            req.pos = posId;
            req.choose_id = roleId;
            req.server_id = serverId;
            this.sendProto(req);
        }

        /**
         *获取角色战备列表
         */
        public get equips(): PropData[] {
            return this._model.equips;
        }

        /**
         * 获取装备详情
         */
        public get equipInfo(): pos_detail {
            return this._model.equipInfo;
        }

        public set equipInfo(detail: pos_detail) {
            this._model.equipInfo = detail;
        }

        protected onOpenFuncUpdate(n: GameNT) {
            let addIdx = n.body as number[];
            if (addIdx.indexOf(OpenIdx.Role) > -1) {
                this.updateEquipIconHint();
            }
        }
    }
}
