namespace game.mod.chat {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import facade = base.facade;
    import Tween = base.Tween;
    import friend_add_data = msg.friend_add_data;
    import LanDef = game.localization.LanDef;

    export class RoleTipsMdr extends MdrBase {
        private _view: RoleTipsView= this.mark("_view", RoleTipsView);
        private _proxy: ChatProxy;
        private _itemList: ArrayCollection;
        private _equipList: ArrayCollection;
        private _skillList: ArrayCollection;
        private _otherSkillList: ArrayCollection;
        private _friendProxy: IFriendProxy;
        private _isFriend: boolean;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Chat);
            this._friendProxy = facade.retMod(ModName.Friend).retProxy(ProxyType.Friend);

            this._itemList = new ArrayCollection();
            this._view.shenling.list_item.itemRenderer = AvatarItem;
            this._view.shenling.list_item.dataProvider = this._itemList;

            this._equipList = new ArrayCollection();
            this._view.equip.list_equip.itemRenderer = IconEquip;
            this._view.equip.list_equip.dataProvider = this._equipList;

            this._skillList = new ArrayCollection();
            this._view.skill.list_skill.itemRenderer = SkillItemRender;
            this._view.skill.list_skill.dataProvider = this._skillList;

            this._otherSkillList = new ArrayCollection();
            this._view.otherSkill.list_skill.itemRenderer = BattleSkillItemRender;
            this._view.otherSkill.list_skill.dataProvider = this._otherSkillList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.btn_black, TouchEvent.TOUCH_TAP, this.onClickBlack);
            addEventListener(this._view.btn_next, TouchEvent.TOUCH_TAP, this.onClickNext);

            addEventListener(this._view.shenling.list_item, ItemTapEvent.ITEM_TAP, this.onClickShenling);
            addEventListener(this._view.equip.list_equip, eui.ItemTapEvent.ITEM_TAP, this.onClickEquip);
            addEventListener(this._view.skill.list_skill, ItemTapEvent.ITEM_TAP, this.onClickSkill);

            this.onNt(ChatEvent.ON_CHAT_BLACK_UPDATE, this.updateBtn, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateRoleInfo();
            this.updateBtn();
            this.updateShenling();
            this.updateEquip();
            this.updateSkill();
            this.updateOtherSkill();
        }

        protected onHide(): void {
            Tween.remove(this._view.scr.viewport);
            super.onHide();
        }

        private onClickAdd(): void {
            let info = this._proxy.lookInfo && this._proxy.lookInfo.check_role;
            if(!info){
                return;
            }
            if(this._isFriend){
                //私聊
                ViewMgr.getIns().chat(info.role_id);
            }
            else {
                //添加
                let friendInfo: friend_add_data = new friend_add_data();
                friendInfo.role_id = info.role_id;
                friendInfo.server_id = info.server_id;
                this._friendProxy.c2s_friend_apply([friendInfo]);
            }
        }

        private onClickBlack(): void {
            let info = this._proxy.lookInfo.check_role;
            this._proxy.onClickBlack(info.server_id, info.role_id, info.is_robot);
        }

        private onClickNext(): void {
            ScrollUtil.moveV(this._view.scr, 2);
        }
        /**------------------------基础信息-----------------------------*/
        private updateRoleInfo(): void {
            let info = this._proxy.lookInfo && this._proxy.lookInfo.check_role;
            if(!info){
                return;
            }
            this._view.btn_god.updateGod(info.god.toNumber(), false);
            this._view.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
            this._view.power.setPowerValue(info.showpower);
            this._view.lab_name.text = info.name;
            let guildName = info.guild_name || getLanById(LanDef.bag_cue20);
            this._view.lab_guild.text = getLanById(LanDef.union_title_2) + "：" + guildName;
            this._view.lab_rebirth.text = RoleUtil.getRebirthName(info.reincarnate.toNumber());
            let teamName = info.team_name || getLanById(LanDef.bag_cue20);
            this._view.lab_team.text = getLanById(LanDef.zhandui_tips1) + "：" + teamName;
        }

        private updateBtn(): void {
            let info = this._proxy.lookInfo && this._proxy.lookInfo.check_role;
            if(!info){
                return;
            }
            let isSelf = info && info.role_id && info.role_id.eq(RoleVo.ins.role_id);
            if(isSelf){
                //玩家自己
                this._view.btn_add.visible = this._view.btn_black.visible = false;
            }
            else {
                this._view.btn_add.visible = true;
                this._isFriend = this._friendProxy.isFriend(info.role_id);
                this._view.btn_add.icon = this._isFriend ? "siliaotubiao" : "tianjiahaoyoutubiao";//好友或私聊
                this._view.btn_black.visible = !this._proxy.isBlackUser(info.role_id);
            }
        }
        /**------------------------神灵-----------------------------*/
        private updateShenling(): void {
            let infos = this._proxy.lookInfo && this._proxy.lookInfo.shenling_list || [];
            let datas: AvatarItemData[] = [];
            for(let info of infos){
                let idx = info.upindex;
                let cfg = getConfigById(idx.toString());
                let star = 0;
                let evolution = 0;//进化神灵的进化次数或修仙女仆幻化等级
                for(let starInfo of info.list){
                    if(starInfo.index.eq(idx)){
                        star = starInfo.star;
                        evolution = starInfo.evolutions;
                        break;
                    }
                }
                datas.push({cfg: cfg, star: star, isBattle: false, showHint: false, evolution: evolution});
            }
            this._itemList.source = datas;
        }
        private onClickShenling(e: ItemTapEvent): void {
            let data: AvatarItemData = e.item;
           facade.showView(ModName.Chat, ChatViewType.RoleSurfaceTips, {index: data.cfg.index, info: this._proxy.lookInfo});
        }
        /**------------------------装备-----------------------------*/
        private updateEquip(): void {
            let datas: IconEquipData[] = [];
            for (let i = 0; i < EquipPosAry.length; ++i) {
                let pos = EquipPosAry[i];
                let equip = this.getEquipByPos(pos);
                let prop = equip ? equip : pos;
                let data: IconEquipData = this._equipList.source && this._equipList.source.length ? this._equipList.source[i] : {};
                data.prop = prop;
                datas.push(data);
            }
            this._equipList.source = datas;
        }

        private getEquipByPos(pos: number): PropData {
            let infos = this._proxy.lookInfo && this._proxy.lookInfo.equips || [];
            for(let info of infos){
                let prop = PropData.fromData(info);
                if(prop.equipPos == pos){
                    return prop;
                }
            }
            return null;
        }
        private onClickEquip(e: eui.ItemTapEvent): void {
            let data = e.item as IconEquipData;
            if (!data || typeof data.prop === 'number') {
                return;
            }
            ViewMgr.getIns().showRoleEquipTips(data.prop);
        }
        /**------------------------仙法-----------------------------*/
        private updateSkill(): void {
            let datas: SkillItemRenderData[] = [];
            let skills = this._proxy.lookInfo && this._proxy.lookInfo.godallskill || [];
            for (let info of skills) {
                let skillId = info.index;
                let isAct = skillId > 0;
                let skillData: SkillItemRenderData = {
                    skillId : skillId,
                    isAct: isAct,
                    lockStr: "suotou2",
                    bgStr: "common_skill_bg",
                    level:info.lv
                };
                datas.push(skillData);
            }
            this._skillList.source = datas;
        }
        private onClickSkill(e: ItemTapEvent): void {
            let data: SkillItemRenderData = e.item;
            let skillId = data.skillId;
            if(!skillId){
                return;
            }
            ViewMgr.getIns().showSkillNormalTips(skillId,data.level,true);
        }

        /**------------------------其他技能-----------------------------*/
        private updateOtherSkill(): void {
            let datas: BattleSkillItemRenderData[] = [];
            let skills = this._proxy.lookInfo && this._proxy.lookInfo.sp_skill_info || [];
            for (let info of skills) {
                let headType = info.head_type;
                if(headType == ConfigHead.Body || headType == ConfigHead.Huashen){
                    continue;//过滤时装，时装没有技能，化神也不显示
                }
                let skillId = SurfaceUtil.getSurfaceSkillId(headType);//技能id取配置
                let lv = info.level;
                let stage = SurfaceUtil.calcSurfaceStage(lv, headType);
                let skillData: BattleSkillItemRenderData = {
                    skillId : skillId,
                    lv: stage,
                    hideTips: true,
                    imgTag: "tag_" + headType
                };
                datas.push(skillData);
            }
            this._otherSkillList.source = datas;
        }
    }
}