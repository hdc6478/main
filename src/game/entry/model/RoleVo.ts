namespace game {
    import property = msg.property;
    import attributes = msg.attributes;
    //import honor_medal_data = msg.honor_medal_data;
    import Watcher = eui.Watcher;
    import RebirthConfig = game.config.RebirthConfig;
    import LanDef = game.localization.LanDef;
    //import VipUtil = game.mod.VipUtil;
    import facade = base.facade;

    export class RoleVo {
        private static _ins: RoleVo;

        public static setIns(value: RoleVo): void {
            this._ins = value;
        }

        public static get ins(): RoleVo {
            return this._ins;
        }
        public starttime: number;//角色登录成功之后服务器下发的时间(协议s2c_login_role 下发) UTC时间 时间戳 单位：秒
        public server_open_date: number;//开服时间戳
        public create_time: number;// 角色创建时间
        public server_id: number;// 服务器ID

        public fashion: number;/** 时装*/
        public weapon: number;/** 轻剑*/
        public wing: number;/** 翅膀*/
        public title_index: number;// 称号index

        public head: number;//头像
        public head_frame: number;//头像框
        public head_lv: number; //头像等级
        public head_frame_lv: number; ///头像框等级

        public mate_id: Long;//伴侣ID
        public mate_name: string;//伴侣名字
        public marry_type: number;// 0:没结婚 1：求婚者   2：被求婚者
        public marry_time: number;// 结婚时间戳

        public charge_rmb: number;//累计充值人民币数
        public day_charge_rmb: number;//每天充值了多少rmb
        //public honor_medals: honor_medal_data[];//勋章
        public extreme_vip: boolean;//是否至尊会员
        public honor_vip: boolean;//是否荣耀会员

        /**角色信息*/
        public role_id: Long;// 角色uuid
        public exp: Long;// 经验
        public levelup_exp: Long;// 升级所需经验
        public name: string;// 名字
        public level: number;// 等级
        public sex: number;// 性别
        public reincarnate: number;//转生index
        public vip_lv: number;// VIP index
        /**角色信息*/
        public entity_id:Long; //实体id

        /**新的货币*/
        // public copper: Long;// 铜钱，废弃
        public gold: Long;// 元宝
        public diamond: Long;// 仙玉
        // public lingqi: Long;// 灵气
        // public godess: Long;// 神灵精华
        // public wood: Long;// 木材
        // public maiqi: Long;//脉气
        /**新的货币这里不用处理，PropIndex需要对应加下*/

        /** 属性相关 */
        public showpower: Long;// 	战斗力
        public godpower: Long;//仙力战力
        // public atk: Long;//	攻击
        private max_hp: Long;//	生命
        // public hp: Long;//	当前生命
        // public armor: number;//	防御
        // public armor_break: number;//	破甲
        // public crit: number;//	暴击
        // public recrit: number;//	抗暴
        // public dodge: number;//	闪避
        // public hit: number;//	命中
        // public block: number;//	格挡
        // public block_break: number;//	破击
        // public true_atk: number;//	真实伤害
        // public true_def: number;//	真实免伤
        // public god_atk: number;//	仙力攻击
        // public god_def: number;//	仙力防御
        public god_hp: number;//	仙力生命
        public atkspeed: number;//	攻速
        // public fire_val: number;//	火系等级
        // public water_val: number;//	水系等级
        // public toxic_val: number;//	风系等级
        // public electric_val: number;//	雷系等级
        // public imprate: number;//	伤害增加
        // public damdeductrate: number;//	伤害减免
        // public pkdamrate: number;//	PK增伤
        // public pkdedamrate: number;//	PK减伤
        // public critrate: number;//	暴击率
        // public critval: number;//	暴伤加成
        // public dorate: number;//	闪避率
        // public hitrate: number;//	命中率
        // public block_rate: number;//	格挡率
        // public block_val: number;//	格挡效果
        // public block_break_rate: number;//	破击率
        // public block_break_val: number;//	破击效果
        // public zhanhun_rate: number;//	斩魂伤害
        // public zhanhun_val: number;//	斩魂概率
        // public back_crit: number;//	背饰暴击率
        // public dt_crit: number;//	神兵暴击率
        // public mount_crit: number;//	坐骑暴击率
        // public purusa_crit: number;//	元神暴击率
        // public child_crit: number;//	子女暴击率
        // public flysword: number;//	飞剑暴击率
        // public un_critrate: number;//	抗暴率加成
        // public un_critval: number;//	暴击伤害减免
        public god: number;//	仙力
        // public god_rate: number;//	仙力效果
        /** 属性相关 */

        /**系统时间相关数值*/
        public storage_time: number;//供奉封印存储时间 单位秒
        /**系统时间相关数值*/

        //private readonly _backVo: RoleVo;

        public isOpenAutoOneKey:boolean = false;

        constructor(isBack: boolean = false) {
            // if (!isBack) {
            //     this._backVo = new RoleVo(true);
            // }
            // eui.Watcher.watch(this,[RolePropertyKey.level],this.levelChange,this);
        }

        private levelChange(value:any):void{
            this.isOpenAutoOneKey = value >= 150;//一键升级限制
        }

        /**通过属性key获取属性数值，统一用这个*/
        public getValueByKey(key: string): number {
            if(key == AttrKey.max_hp){
                //最大生命，服务端需要支持减去仙力生命
                let god_hp = this.god_hp || 0;
                return this.max_hp.toNumber() - god_hp;
            }
            let val = this[key];
            if(val && val instanceof Long){
                val = val.toNumber();
            }
            return val || 0;
        }
        /**外部设置属性数值，不建议使用*/
        public setValueByKey(key: string, val: number): void {
            this[key] = val;
            facade.sendNt(RoleEvent.ON_ROLE_UPDATE, [key]);
        }

        // public backup(): void {
        //     let obj: any = this._backVo;
        //     let self = this;
        //     for (let k in self) {
        //         if (!self.hasOwnProperty(k)
        //             || k.indexOf("__") === 0
        //             || typeof self[k] === "function") {
        //             continue;
        //         }
        //         let v = self[k];
        //         if (v instanceof Long) {
        //             if (!obj[k]) {
        //                 obj[k] = new Long(v.low, v.high);
        //             } else {
        //                 obj[k].low = v.low;
        //                 obj[k].high = v.high;
        //             }
        //         } else if (typeof v === "string" || typeof v === "number") {
        //             obj[k] = v;
        //         }
        //     }
        // }

        public update(prop: property | attributes, res: string[] = null): string[] {
            let list: string[] = res || [];
            for (let k in prop) {
                if (!prop.hasOwnProperty(k)
                    || k.indexOf("__") === 0
                    || typeof prop[k] === "function"
                ) {
                    continue;
                }
                let v = prop[k];
                switch (k) {
                    case RolePropertyKey.level:
                        gso.roleLv = v;
                        console.info("RoleVo gso.roleLv = " + gso.roleLv);
                        gzyyou.sdk.cacheQQPlayerRankInfo && gzyyou.sdk.cacheQQPlayerRankInfo(v);
                        gzyyou.sdk.loadReport(REPORT_LOAD.ROLE_UP);
                        break;
                    case RolePropertyKey.role_id:
                        gso.roleId = v.toString();
                        console.info("RoleVo gso.roleId = " + gso.roleId);
                        break;
                    case RolePropertyKey.name:
                        gso.roleName = v;
                        break;
                    case RolePropertyKey.vip_lv:
                        gso.roleVipLv =  game.mod.VipUtil.getShowVipLv(v);
                        console.info("gso.roleVipLv = " + gso.roleVipLv);
                        break;
                    case RolePropertyKey.sex:
                        gso.roleSex = v;
                        break;
                    case RolePropertyKey.gold:
                        gso.roleMoney = v.toNumber();
                        break;
                    case RolePropertyKey.showpower:
                        gso.rolePower = v.toString();
                        console.info(" gso.rolePower = " + gso.rolePower);
                        break;
                    case RolePropertyKey.reincarnate:
                        gso.roleChangeLv = v;
                        break;
                }
                if(RoleLongKeys.indexOf(k) > -1){
                    v = (v as Long).toNumber();
                }
                this[k] = v;
                list.push(k);
            }
            return list;
        }

        // public get backVo(): RoleVo {
        //     return this._backVo;
        // }
    }
}
