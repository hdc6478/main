namespace game {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import TimeMgr = base.TimeMgr;
    import scene_skill = msg.scene_skill;
    import SkillShowConfig = game.config.SkillShowConfig;
    import ParamConfig = game.config.ParamConfig;
    import ISceneProxy = game.mod.ISceneProxy;
    import facade = base.facade;
    import MainGPlayer = game.scene.MainGPlayer;

    export class SkillData {

        public static NEXT_SKILL_CD: number = 500;
        public static USE_SKILL_TIME: number = 0;

        private static _lastActIdx: number;

        private static _normal_skill: number[] = null;
        private static _isHuashenXing:boolean = false;

        public static getActIdx(skillIdx: number): number[] {
            let cfg: BattleSkillConfig = this.getCfg(skillIdx);

            if( 0 == cfg.skillshow){
                //目前用于处理化神技能
                return [];
            }

            let showCfg: SkillShowConfig = this.getEffCfg(cfg.skillshow);
            if (!showCfg) {
                console.error("技能id " + skillIdx + " 对应的表 skillshow 缺少 " + cfg.skillshow + " 配置记录");
                return [];
            }

            let list = [];
            for (let i = 1; i <= 3; i++) {
                let act = showCfg["act" + i];
                if (!act) continue;
                list.push(act);
            }
            return list;
        }

        /**
         * 获取某个技能的信息
         * @param skillId
         */
        public static getSkillInfo(skillId: number): scene_skill {
            let self = this;
            let secnePoxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            let mainPlayer: MainGPlayer = secnePoxy.mainPlayerObj;
            if (!mainPlayer || !mainPlayer.vo || !mainPlayer.vo.skills) {
                return null;
            }
            let skills = mainPlayer.vo.skills;
            if (!skills || !skills.length) {
                return null;
            }
            for (let s of skills) {
                if (s.skill_idx == skillId) {
                    return s;
                }
            }
            return null;
        }

        public static getLeftCd(skill: scene_skill): number {
            let curTime = TimeMgr.time.serverTime;
            let t = skill.next_use_time | 0;
            if (!t) {
                return 0;
            }
            let nextUseTime = t * 10 + (RoleVo.ins.starttime * 1000);
            return nextUseTime - curTime;
        }

        public static getPassTime(skill: scene_skill): number {
            let curTime = TimeMgr.time.serverTime;
            let t = +skill.use_time | 0;
            let useTime = t * 10 + (RoleVo.ins.starttime * 1000);
            return curTime - useTime;
        }

        public static getTotalCd(skill: scene_skill): number {
            let n = +skill.next_use_time | 0;
            let u = +skill.use_time | 0;
            return (n - u) * 10;
        }

        /**判断是否冷却*/
        public static isEnable(skill: scene_skill): boolean {
            return skill && this.getLeftCd(skill) <= 0;
        }

        /**普攻技能*/
        public static isCommonAtk(idx: number): boolean {
            if (!this._normal_skill) {
                let param: ParamConfig = getConfigByNameId(ConfigName.Param, "normal_skill")
                this._normal_skill = param.value[0];
            }
            return this._normal_skill.indexOf(idx) != -1;
        }

        /**是否是仙法技能*/
        public static isImmortalSkill(idx: number): boolean {
            let cfg = this.getCfg(idx);
            return cfg && cfg.type1 == SkillType1.Immortal;
        }

        /**是否是仙剑技能*/
        public static isXianjianSkill(idx: number): boolean {
            let cfg = this.getCfg(idx);
            return cfg && cfg.type1 == SkillType1.Xianjian;
        }

        /**是否是化神技能 */
        public static isHuashenSkill(idx: number): boolean {
            let cfg = this.getCfg(idx);
            return cfg && cfg.type1 == SkillType1.Huasheng;
        }

        /**是否是化神普工 */
        public static isHuashenCommonSkill(idx: number): boolean {
            let cfg = this.getCfg(idx);
            return cfg && cfg.type1 == SkillType1.HuashengCommon;
        }

        /**是否在化神中*/
        public static isHuashenXing():boolean{
            return this._isHuashenXing;
        }

        /**是否在化神中*/
        public static setHuashenXing(ret:boolean):void{
            this._isHuashenXing = ret || false;
        }




        /**是否是需要特殊处理的技能 */
        public static isSpecialSkill(idx: number): boolean {
            let cfg = this.getCfg(idx);
            return cfg && !!SpecialSkillList[cfg.type1];
        }

        /**是否是需要特殊处理的技能2 */
        public static isSpecialSkill2(idx: number): boolean {
            let cfg = this.getCfg(idx);
            return SpecialSkillList2.skillTypes.indexOf(cfg.type1) > -1;
        }



        // public static isGodSkill(idx: number): boolean {
        //     let cfg = this.getCfg(idx);
        //     return cfg && cfg.type1 == SkillType.RoleHighSkill;
        // }

        // public static isElementarySkill(idx: number): boolean {
        //     let cfg = this.getCfg(idx);
        //     return cfg && cfg.type1 == SkillType.firstSword;
        // }

        public static isShenJueSkill(idx: number): boolean {
            let cfg = this.getCfg(idx);
            return cfg != null && cfg.type2 == 13;
        }

        public static isDiBingSkill(idx: number): boolean {
            let cfg = this.getCfg(idx);
            return cfg != null && cfg.type2 == 15;
        }

        public static getCfg(idx: number): BattleSkillConfig {
            return getConfigByNameId(ConfigName.Skill, idx);
        }

        /**获取技能类型*/
        public static getSkillType1(idx:number):SkillType1{
            let cfg = this.getCfg(idx);
            return cfg.type1;
        }

        public static getEffCfg(idx: number): SkillShowConfig {
            return getConfigByNameId(ConfigName.SkillShow, idx);
        }

        /**获取技能优先级*/
        public static getSkillPriority(idx: number): number {
            let cfg = this.getCfg(idx);
            return (cfg && cfg.precedence) || 1;
        }
    }
}
