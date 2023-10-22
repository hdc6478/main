namespace game.mod.chat {

    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import ShenlingConfig = game.config.ShenlingConfig;
    import s2c_chat_look_user = msg.s2c_chat_look_user;
    import god_brother_data = msg.god_brother_data;
    import LanDef = game.localization.LanDef;
    import god_brother_type_data = msg.god_brother_type_data;
    import ride_info = msg.ride_info;
    import ride_item = msg.ride_item;

    export class RoleSurfaceTipsMdr extends EffectMdrBase {
        private _view: RoleSurfaceTipsView = this.mark("_view", RoleSurfaceTipsView);
        public _showArgs: {index: number, info: s2c_chat_look_user};//外显index，信息结构

        private _index: number;//外显index
        private _headType: number;
        private _listSkill: eui.ArrayCollection;
        private _cfg: ShenlingConfig;//神灵配置

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._view.list_skill.itemRenderer = ShenLingSkillIconTap;
            this._view.list_skill.dataProvider = this._listSkill = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_skill, TouchEvent.TOUCH_TAP, this.onClickSkill);
            addEventListener(this._view.list_skill, eui.ItemTapEvent.ITEM_TAP, this.onClickTalent, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateShow();
            this.updateShenling();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickSkill(e: egret.TouchEvent): void {
            let sData = e.currentTarget.data as ISLSkillIconData;
            let data: ISLSkillTipsData = {
                index: this._index,
                skill_index: sData.skill_index,
                skill_type: SLSkillType.PuGong
            };
            facade.showView(ModName.Shenling, ShenLingViewType.ShenLingSkill, data);
        }

        private onClickTalent(e: eui.ItemTapEvent): void {
            let sData = e.item as ISLSkillIconData;
            let data: ISLSkillTipsData = {
                index: this._cfg.index,
                skill_index: sData.skill_index,
                skill_type: SLSkillType.Talent
            };
            facade.showView(ModName.Shenling, ShenLingViewType.ShenLingSkill, data);
        }

        private updateShow(): void {
            let index = this._showArgs.index;
            let info = this._showArgs.info;
            let roleInfo = info.check_role;
            this._index = index;
            let headType = PropData.getPropParse(index, PropParseType.Type);
            this._headType = headType;

            let propData = PropData.create(index);
            this._view.baseQualityTips.updateShow(propData.quality);

            this._view.head.updateShow(roleInfo.head, roleInfo.head_frame, roleInfo.sex, roleInfo.vip);
            this._view.lab_name.text = roleInfo.name;

            let totalPower = 0;//该类型外显总战力
            let cnt = 0;//该类型外显总数量
            let totalPowerStr = "";
            let cntStr = "";
            let power;//玩家该外显的战力
            let god;//玩家该外显的仙力
            if(headType == ConfigHead.Shenling){
                let cfg = propData.cfg as ShenlingConfig;
                let type = cfg.type;
                let shenlingInfo = this.getShenlingTypeInfo(type);
                for(let perInfo of shenlingInfo.list){
                    let perPower = perInfo.attrs.showpower && perInfo.attrs.showpower.toNumber() || 0;
                    totalPower += perPower;
                }
                let typename = getLanById(ShenlingTypeName[type]);
                totalPowerStr = typename + getLanById(LanDef.shenling_power) + "：" + StringUtil.getHurtNumStr(totalPower);
                cnt = shenlingInfo.list && shenlingInfo.list.length || 0;
                cntStr = typename + getLanById(LanDef.shenling_count) + "：" + cnt;

                let curShenlingInfo = this.getCurShenlingInfo(shenlingInfo);
                power = curShenlingInfo && curShenlingInfo.attrs && curShenlingInfo.attrs.showpower ? curShenlingInfo.attrs.showpower : 0;
                god = curShenlingInfo && curShenlingInfo.attrs && curShenlingInfo.attrs.god ? curShenlingInfo.attrs.god : 0;
            }
            else {
                //通用外显
                let typeInfo = this.getTypeInfo(headType);
                for(let perInfo of typeInfo.ride_list){
                    let perPower = perInfo.attr.showpower && perInfo.attr.showpower.toNumber() || 0;
                    totalPower += perPower;
                }
                totalPowerStr = getLanById(ConfigHeadToName[headType]) + getLanById(LanDef.total_power) + "：" + StringUtil.getHurtNumStr(totalPower);
                cnt = typeInfo.ride_list && typeInfo.ride_list.length || 0;
                cntStr = getLanById(ConfigHeadToName[headType]) + getLanById(LanDef.count) + "：" + cnt;

                let curInfo = this.getCurInfo(typeInfo);
                power = curInfo && curInfo.attr && curInfo.attr.showpower ? curInfo.attr.showpower : 0;
                god = curInfo && curInfo.attr && curInfo.attr.god ? curInfo.attr.god : 0;
            }

            this._view.lab_power.text = totalPowerStr;//该类型外显总战力
            this._view.lab_cnt.text = cntStr;//该类型外显总数量
            this._view.power.setPowerValue(power);//玩家该外显的战力
            this._view.baseSurfaceItem.updateShow(index, god, false, false);//玩家该外显的仙力
        }

        private getTypeInfo(headType: number): ride_info {
            let info = this._showArgs.info;
            let infos = info.sp_skill_info || [];
            for (let perInfo of infos) {
                if(perInfo.head_type == headType){
                    return perInfo;
                }
            }
            return null;
        }

        private getCurInfo(perInfo: ride_info): ride_item {
            for(let curInfo of perInfo.ride_list){
                if(curInfo.index == this._index){
                    return curInfo;
                }
            }
            return null;
        }

        private getCurShenlingInfo(perInfo: god_brother_type_data): god_brother_data {
            for(let curInfo of perInfo.list){
                if(curInfo.index.toNumber() == this._index){
                    return curInfo;
                }
            }
            return null;
        }

        private getShenlingTypeInfo(type: number): god_brother_type_data {
            let info = this._showArgs.info;
            let infos = info.shenling_list || [];
            for(let perInfo of infos){
                if(perInfo.postype == type){
                    return perInfo;
                }
            }
            return null;
        }

        private updateShenling(): void {
            if (this._headType != ConfigHead.Shenling) {
                this._view.currentState = "default";
                return;
            }
            this._view.currentState = "shenling";
            let _proxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let cfg = _proxy.getShenLingCfg(this._index);
            this._cfg = cfg;
            this._view.img_type.source = `shuxingtubiao_${cfg.type}`;

            this._view.btn_skill.data = {
                skill_index: cfg.common,
                is_act: true,
                skill_type: SLSkillType.PuGong
            };

            let list: ISLSkillIconData[] = [];
            for (let item of cfg.talent1) {
                list.push({
                    skill_index: item[1],
                    is_act: true
                });
            }
            this._listSkill.replaceAll(list);
        }
    }
}