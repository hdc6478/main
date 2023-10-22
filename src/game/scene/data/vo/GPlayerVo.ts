namespace game.scene {

    import scene_skill = msg.scene_skill;

    export class GPlayerVo extends ActorVo {
        public role_id: Long;
        public server_id: number;
        public sex: number;
        public level: number;
        public guild_id: number;//宗门id
        public guild_name: string;//宗门名字

        public team_id: Long;//战队ID

        public weapon: number;
        public wing: number;
        public ride: number;
        public fashion: number;
        public head: number;
        public head_frame: number;

        public title_index: number;
        public title_star: number;
        public mate_id: Long;
        public mate_name: string;

        public skills: scene_skill[];
        public skillsMap:{ [key: number]: scene_skill };

        public ride_state: number;

        public vip_lv: number;//vip index

        public the_god: number;//化神id


        //眩晕
        public get isDizzy(): boolean {
            return this.isBuffExist(BuffIndex.Dizzy);
        }

        public get isTie(): boolean {
            return this.isBuffExist(BuffIndex.Tie);
        }

        private isBuffExist(idx: number): boolean {
            if (!this.buffs) {
                return false;
            }
            for (let b of this.buffs) {
                if (b.buff_index == idx) {
                    return true;
                }
            }
            return false;
        }

        public applyUpdate(data: any): string[] {
            let s2c: msg.scene_role_data = data;
            let keys = [
                "role_id",
                "sex",
                "level",
                "guild_id",
                "guild_name",
                "weapon",
                "wing",
                "ride",
                "speed",
                "fashion",
                "title_index",
                "title_star",
                "head",
                "head_frame",
                "mate_id",
                "mate_name",
                "walk_entity_info",
                "server_id",
                "skills",
                "ride_state",
                "vip_lv",
                "the_god",
                "team_id"
            ];
            let res = s2c.walk_entity_info ? super.applyUpdate(s2c.walk_entity_info) : [];
            let longKeys: string[] = [RolePropertyKey.title_index, RolePropertyKey.head, RolePropertyKey.head_frame];//属性类型变成Long
            for (let k of keys) {
                if (!data.hasOwnProperty(k)) {
                    continue;
                }
                if (k === "role_id" && this.role_id && this.role_id.eq(s2c.role_id)) {
                    continue;
                }
                if (k === "walk_entity_info") {
                    continue;
                }

                let v = s2c[k];
                if(k == "skills"){
                    this.skillsMap = {};
                    let skills:scene_skill[] = s2c[k];
                    if(skills instanceof  Array){
                        for(let i = 0; i < skills.length; i++){
                            let d = skills[i];
                            this.skillsMap[d.skill_idx] = d;
                        }
                    }
                    //按照技能优先顺序排序
                    if(v instanceof Array && v){
                        let len = v.length;
                        for (let i=0; i<len-1; i++) /* 外循环为排序趟数，len个数进行len-1趟 */
                            for (let j=0; j<len-1-i; j++) { /* 内循环为每趟比较的次数，第i趟比较len-i次 */
                                let skill1:scene_skill = v[j];
                                let skill2:scene_skill = v[j+1];
                                let priority1 = SkillData.getSkillPriority(skill1.skill_idx);
                                let priority2 = SkillData.getSkillPriority(skill2.skill_idx);
                                if (priority1 > priority2) { /* 相邻元素比较，若逆序则交换（升序为左大于右，降序反之） */
                                    let temp = v[j];
                                    v[j] = v[j+1];
                                    v[j+1] = temp;
                                }
                            }
                    }
                }

                res.push(k);

                if(RoleLongKeys.indexOf(k) > -1){
                    v = (v as Long).toNumber();
                }
                this[k] = v;
            }

            return res;
        }
    }
}
