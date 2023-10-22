namespace game.mod.xianyuan {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;
    import sys_attrs = msg.sys_attrs;

    export class ChildSkillTipsMdr extends MdrBase {
        private _view: ChildSkillTipsView = this.mark("_view", ChildSkillTipsView);
        private _proxy: ChildProxy;
        private _attrInfos: any;
        private _isShow = false;
        private _atrrList: number[] = [];
        private _openIdx = OpenIdx.XianlvChild;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Child);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MainEvent.UPDATE_COMMON_SURFACE_ATTR, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._isShow = true;

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._isShow = false;
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

        private updateAttr(attr?: sys_attrs): void {
            let critical = attr.crit;
            this._attrInfos[2][1] = Math.floor(critical / 100) + "%";
            this._view.skillAttrList.updateAttr(this._attrInfos);
        }

        private updateView(): void {
            let skillId = this._proxy.getChildSkill(1);
            if (!skillId) {
                return;
            }
            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId[0]);
            if (!cfg) {
                return;
            }
            this._view.qualityTips.updateShow(cfg.quality);
            this._view.skillIcon.setData(skillId[0]);
            this._view.lb_name.text = cfg.name;
            this._view.img_type.source = `jineng_show_type_${cfg.show_type}`;

            //技能效果
            this._view.baseDescItem.updateShow(TextUtil.getSkillDesc(cfg, 1, null, true), getLanById(LanDef.sp_tips1));

            let attrName = TextUtil.getAttrsText(AttrKey.child_crit);
            let attrVal = TextUtil.getAttrsPerCent(AttrKey.child_crit, RoleVo.ins.getValueByKey(AttrKey.child_crit));
            this._attrInfos = [
                ['攻击目标', `${cfg.max_count}`],
                [getLanById(LanDef.tishi_15), `${(cfg.cd / 1000).toFixed(2)}秒`],
                [attrName, attrVal]
            ];
            RoleUtil.getSurfaceAttr(this._openIdx);

            // 天赋效果
            let descList: string[] = [];
            let skillList = this._proxy.getChildSkill(2) || [];
            for (let id of skillList) {
                let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, id);
                if (cfg) {
                    descList.push(cfg.describe);
                }
            }
            this._view.baseDescList.updateShow(descList, getLanById(LanDef.tianfu_tips1));
        }
    }
}