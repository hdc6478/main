namespace game.mod.more {

    // import guild_pk_scene_data = msg.guild_pk_scene_data;
    // import s2c_guild_pk_update_injur = msg.s2c_guild_pk_update_injur;
    // import s2c_guild_pk_update_dead = msg.s2c_guild_pk_update_dead;
    import GameNT = base.GameNT;
    import teammate = msg.teammate;
    import s2c_guild_pk_enter = msg.s2c_guild_pk_enter;
    import s2c_guild_pk_update_buff = msg.s2c_guild_pk_update_buff;
    import c2s_guild_pk_use_skill = msg.c2s_guild_pk_use_skill;
    import s2c_guild_pk_update_reward = msg.s2c_guild_pk_update_reward;
    import guild_pk_base = msg.guild_pk_base;
    import s2c_guild_pk_use_skill = msg.s2c_guild_pk_use_skill;

    export class CrossUnionFightProxy extends ProxyBase {
        private _model: CrossUnionModel;

        initialize(): void {
            super.initialize();
            this._model = new CrossUnionModel();

            this.onProto(s2c_guild_pk_enter, this.s2c_guild_pk_enter, this);
            // this.onProto(s2c_guild_pk_update_injur, this.s2c_guild_pk_update_injur, this);
            this.onProto(s2c_guild_pk_update_buff, this.s2c_guild_pk_update_buff, this);
            // this.onProto(s2c_guild_pk_update_dead, this.s2c_guild_pk_update_dead, this);
            this.onProto(s2c_guild_pk_update_reward, this.s2c_guild_pk_update_reward, this);
            this.onProto(s2c_guild_pk_use_skill, this.s2c_guild_pk_use_skill, this);
        }

        public c2s_guild_pk_use_skill(index: number): void {
            let msg: c2s_guild_pk_use_skill = new c2s_guild_pk_use_skill();
            msg.skill_id = index;
            this.sendProto(msg);
        }

        private s2c_guild_pk_update_reward(n: GameNT): void {
            let msg: s2c_guild_pk_update_reward = n.body;
            this._model.reward_status = msg.reward_status || 0;
            this._model.reward_num = msg.reward_num || 0;
            this.sendNt(CUFigthEvent.ON_UPDATE_CUF_REWARD_INFO);
        }

        private s2c_guild_pk_enter(n: GameNT): void {
            let msg: s2c_guild_pk_enter = n.body;
            if (msg.my_base) {
                this._model.my_base = msg.my_base;
            }
            if (msg.target_base) {
                this._model.target_base = msg.target_base;
            }
            this._model.reward_status = msg.reward_status || 0;
            this._model.reward_num = msg.reward_num || 0;
            if (msg.skill_cd_list) {
                this._model.skill_cd_list = msg.skill_cd_list;
            }
            if (msg.list) {
                for (let data of msg.list) {
                    let index: number = data.team_index;
                    if (data.target) {
                        this._model.fight_list.set(index, data.target);
                    }
                    if (data.role) {
                        index = index + 4;
                        this._model.fight_list.set(index, data.role);
                    }
                }
            }
            // this.sendNt(CUFigthEvent.ON_UPDATE_FIGHT_ENTER);
            // ViewMgr.getIns().saveLast();
            // ViewMgr.getIns().showMain();
            // ViewMgr.getIns().showView(ModName.More, MoreViewType.CrossUnionScene);
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.CrossUnionScene);
        }

        // private s2c_guild_pk_update_injur(n: GameNT): void {
        //     let msg: s2c_guild_pk_update_injur = n.body;
        //     this._model.fight_step.push({ list: msg.list });
        // }

        private s2c_guild_pk_update_buff(n: GameNT): void {
            let msg: s2c_guild_pk_update_buff = n.body;
            let type: number = msg.type || 0;
            if (msg.list) {
                this._model.fight_step.push({ type, list: msg.list });
            }
            if (msg.dead_list) {
                this._model.fight_step.push({ is_dead: true, list_dead: msg.dead_list })
            }
        }

        private s2c_guild_pk_use_skill(n: GameNT): void {
            let msg: s2c_guild_pk_use_skill = n.body;
            if (msg.skill_id) {
                PromptBox.getIns().show("使用成功");
            }
        }

        // private s2c_guild_pk_update_dead(n: GameNT): void {
        //     let msg: s2c_guild_pk_update_dead = n.body;
        //     if (msg.list) {
        //         this._model.fight_step.push({ is_dead: true, list_dead: msg.list })
        //     }
        //     // this._model.fight_step.push({ dead_id: msg.dead_id, supply_data: msg.supply_data });
        // }

        // public onEnterScene(): void {
        //     this.sendNt(SceneEvent.ON_SCENE_READY, SceneType.Abyss);
        // }

        /**播放表现完成 更新数据 */
        public onUpdateData(step: CUFightData): void {
            if (step.is_dead) {
                for (let data of step.list_dead) {
                    this.setRole(data.dead_id, data.supply_data);
                }
                return;
            }
            for (let info of step.list) {
                if (!info.target_id || +info.target_id === 0) {
                    this.updateBeast(info.type, info.hp);
                    continue;
                }
                this.updateRole(info.target_id, info.hp);
            }
            this.sendNt(CUFigthEvent.ON_UPDATE_FIGHT_INFO);
        }

        /**战斗步骤数据 */
        public getStepData(index: number): CUFightData {
            return this._model.fight_step[index];
        }

        public setRole(dead_id: Long, role: teammate): void {
            let keys: number[] = Array.from(this._model.fight_list.keys());
            for (let key of keys) {
                let info: teammate = this.getRoleInfo(key);
                if (!info || !info.role_id.eq(dead_id)) {
                    continue;
                }
                if (!role) {
                    this._model.fight_list.delete(key);
                } else {
                    this._model.fight_list.set(key, role);
                }
                this.sendNt(CUFigthEvent.ON_UPDATE_FIGHT_POS_INFO, key);
                return;
            }
        }

        public updateRole(target_id: Long, value: number): void {
            let keys: number[] = Array.from(this._model.fight_list.keys());
            for (let key of keys) {
                let info: teammate = this.getRoleInfo(key);
                if (!info || !info.role_id.eq(target_id)) {
                    continue;
                }
                info.value = Long.fromInt(value);
                this._model.fight_list.set(key, info);
                return;
            }
        }

        public updateBeast(type: number, value: number): void {
            if (type == CrossUnionType.Own) {
                this._model.my_base.hp = value;
            } else {
                this._model.target_base.hp = value;
            }
            this.sendNt(CUFigthEvent.ON_UPDATE_BEAST_INFO);
        }

        public getRoleInfo(index: number): teammate {
            return this._model.fight_list.get(index);
        }

        public getRoleIndex(role_id: Long): number {
            if (!role_id) {
                return 0;
            }
            let keys: number[] = Array.from(this._model.fight_list.keys());
            for (let key of keys) {
                let role = this.getRoleInfo(key);
                if (role && role.role_id.eq(role_id)) {
                    return key;
                }
            }
            return 0;
        }

        /**根据传入的index获取对位index */
        public getFightIndex(index: number): number {
            if (index > 4) {
                return index - 4;
            }
            return index + 4;
        }

        public get my_base(): guild_pk_base {
            return this._model.my_base;
        }

        public get target_base(): guild_pk_base {
            return this._model.target_base;
        }

        public get reward_num(): number {
            return this._model.reward_num || 0;
        }

        public get reward_status(): number {
            return this._model.reward_status || 0;
        }

        public onExit(): void {
            this._model.fight_list.clear();
            this._model.fight_step.length = 0;
        }
    }

}