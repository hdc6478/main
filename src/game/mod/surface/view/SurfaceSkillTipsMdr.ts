namespace game.mod.surface {

    import LanDef = game.localization.LanDef;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import GameNT = base.GameNT;
    import sys_attrs = msg.sys_attrs;

    export class SurfaceSkillTipsMdr extends MdrBase {
        protected _view: SurfaceSkillTipsView = this.mark("_view", SurfaceSkillTipsView);
        private _proxy: SurfaceProxy;
        /**技能数据*/
        public _showArgs: BattleSkillItemRenderData;
        private _openIdx: number;
        protected _attrKeys: string[] = [AttrKey.skill_add_damage, AttrKey.cd, AttrKey.crit, AttrKey.critval];//显示的属性key
        protected _huashenAttrKeys: string[] = [AttrKey.skill_add_damage, AttrKey.theGod_addtime];//化神显示的属性key
        private _attrs: sys_attrs;
        private _cfg: BattleSkillConfig;

        protected _state: string = "default";

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Surface);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(MainEvent.UPDATE_COMMON_SURFACE_ATTR, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this._view.currentState = this._state;

            this.initView();
            this.initAttr();

            this.reqSurfaceAttr();
            this.updateAttr();
            this.updateSkill();
            this.updateDesc2();
            this.updateDesc3();
            this.onUpdateDesc2();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onInfoUpdate(n: GameNT): void {
            let attrs: sys_attrs[] = n.body;
            for (let i of attrs) {
                if (i.sys_id == this._openIdx) {
                    this.updateAttr(i);
                    break;
                }
            }
        }

        private reqSurfaceAttr(): void {
            this._openIdx = this._proxy.getOpenIdx(this._proxy.headType);
            RoleUtil.getSurfaceAttr(this._openIdx);
        }

        //技能效果
        private initView(): void {
            let skillId = this._showArgs.skillId;
            let lv = this._showArgs.lv;
            let showZero = this._showArgs.showZero;
            this._view.skill.setData(skillId);

            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            if (!cfg) {
                console.error(`检查${ConfigName.Skill}配置缺少索引${skillId}`);
            }
            this._cfg = cfg;
            this._view.lab_name.text = cfg.name;

            let desc = TextUtil.getSkillDesc(cfg, lv, showZero);
            this._view.baseDescItem.updateShow(desc, getLanById(LanDef.sp_tips1));
        }

        //技能属性
        private initAttr(): void {
            this._attrs = new sys_attrs();
            let attrKeys = this._proxy.headType == ConfigHead.Huashen ? this._huashenAttrKeys : this._attrKeys;
            for (let k of attrKeys) {
                let val = k == AttrKey.cd ? this._cfg.cd : 0;
                this._attrs[k] = val;
            }
        }

        private updateAttr(attr?: sys_attrs): void {
            let replaceStr: { key: string, aStr: string }[] = [];
            if (this._proxy.headType == ConfigHead.Huashen) {
                //化神的另外处理
                replaceStr = [{ key: AttrKey.skill_add_damage, aStr: "变身伤害" }];
            }
            else {
                let aStr = TextUtil.getAttrsText(AttrKey.crit);
                let indexStr = SurfaceConfigList[this._proxy.headType] + "_tips";
                aStr = getLanById(indexStr) + aStr;
                replaceStr = [{ key: AttrKey.crit, aStr: aStr }];
            }

            let infos: string[][] = TextUtil.getSkillListDesc(this._attrs, attr, replaceStr);
            this._view.skillAttrList.updateAttr(infos);
        }

        //天赋效果
        private updateSkill(): void {
            let descList: string[] = [];
            let skillList = this._proxy.getSurfaceSkillList(this._proxy.headType);
            for (let skillId of skillList) {
                let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
                descList.push(cfg.describe);
            }
            this._view.baseDescList.visible = !!descList.length;
            if (this._view.baseDescList.visible) {
                this._view.baseDescList.updateShow(descList, getLanById(LanDef.tianfu_tips1));
            }
        }

        //被动效果
        private updateDesc2(): void {
            let descList: string[] = [];
            let datas = this._proxy.getSurfaceTypes(this._proxy.headType);
            for (let type of datas) {
                let items = this._proxy.getSurfaceCfgList(this._proxy.headType, type);
                for (let i of items) {
                    let star = this._proxy.getSurfacePerStar(i.index);
                    if (!star) {
                        continue;//过滤未激活
                    }
                    if (!i.special_attr_id) {
                        continue;
                    }
                    let desc = i.name + "：" + this._proxy.getSpecialAttrDesc(i.index, i.special_attr_id);
                    descList.push(desc);
                }
            }
            this._view.baseDescList2.visible = !!descList.length;
            if (this._view.baseDescList2.visible) {
                this._view.baseDescList2.updateShow(descList, getLanById(LanDef.skill_tips2));
            }
        }

        //羁绊效果
        private updateDesc3(): void {
            let descList: string[] = [];
            let items = this._proxy.getJibanCfgList(this._proxy.headType);
            for (let i of items) {
                if (!this._proxy.isJibanAct(this._proxy.headType, i.index)) {
                    continue;//过滤未激活
                }
                descList.push(i.desc);
            }
            this._view.baseDescList3.visible = !!descList.length;
            if (this._view.baseDescList3.visible) {
                this._view.baseDescList3.updateShow(descList, getLanById(LanDef.jiban_tips3));
            }
        }

        protected onUpdateDesc2(): void {
            this._view.baseDescItem2.visible = false;
        }
    }
}