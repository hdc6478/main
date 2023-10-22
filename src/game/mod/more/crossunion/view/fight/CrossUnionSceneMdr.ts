namespace game.mod.more {

    import GameNT = base.GameNT;
    import teammate = msg.teammate;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GuildPkSkillConfig = game.config.GuildPkSkillConfig;
    import ParamConfig = game.config.ParamConfig;
    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;

    export class CrossUnionSceneMdr extends EffectMdrBase implements UpdateItem {
        private _view: CrossUnionSceneView = this.mark("_view", CrossUnionSceneView);
        private _proxy: CrossUnionProxy;
        private _fight: CrossUnionFightProxy;

        private readonly _len: number = 8;
        private _stepData: CUFightData;
        private _step: number;

        private _listData: eui.ArrayCollection = new eui.ArrayCollection();

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.CrossUnion);
            this._fight = this.retProxy(ProxyType.CrossUnionFight);

            this._view.list.itemRenderer = SkillItemRender;//
            this._view.list.dataProvider = this._listData;

            this._view.lab_tips.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(this._view.lab_tips.text, this._view.lab_tips.textColor));
            this._view.lab_info.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(this._view.lab_info.text, this._view.lab_info.textColor));
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickSkill, this);
            addEventListener(this._view.lab_tips, TouchEvent.TOUCH_TAP, this.onClickTips, this);
            addEventListener(this._view.lab_info, TouchEvent.TOUCH_TAP, this.onClickInfo, this);
            addEventListener(this._view.icon, TouchEvent.TOUCH_TAP, this.onClickReward, this);
            addEventListener(this._view.btn_exit, TouchEvent.TOUCH_TAP, this.hide, this);

            // this.onNt(CUFigthEvent.ON_UPDATE_FIGHT_ENTER, this.onEnter, this);
            this.onNt(CUFigthEvent.ON_UPDATE_BEAST_INFO, this.onUpdateBeast, this);
            this.onNt(CUFigthEvent.ON_UPDATE_FIGHT_POS_INFO, this.onUpdateRoleByIndex, this);
            this.onNt(CUFigthEvent.ON_UPDATE_FIGHT_INFO, this.onUpdateRole, this);
            this.onNt(CUFigthEvent.ON_UPDATE_CUF_REWARD_INFO, this.onUpdateReward, this);
            this.onNt(CUFigthEvent.ON_UPDATE_CUF_EXIT, this.hide, this);
            // this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_OVER_VIEW, this.hide, this);
            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_OVER_VIEW, this.onUpdateResult, this);

        }

        protected onShow(): void {
            super.onShow();
            this._step = 0;
            this.onEnter();
            // Layer.main.setChildIndex(this._view, 0);
        }

        private onEnter(): void {
            this.onInitBeast();

            this.onUpdateRole();

            this.onUpdateBeast();

            this.onUpdateSkill();

            this.onUpdateReward();

            TimeMgr.addUpdateItem(this);
        }

        private onInitBeast(): void {
            this.removeAllEffects();

            let param: ParamConfig = GameConfig.getParamConfigById("guild_xianshou_model");
            // this.addAnimate(param.value, this._view.grp_own, Direction.UP);
            // this.addAnimate(param.value, this._view.grp_target, Direction.DOWN);
            this._view.grp_own.setData(param.value);
            this._view.grp_target.setData(param.value);
        }

        private onUpdateReward(): void {
            this._view.icon.setData(this._proxy.guild_pk_see_reward[0], IconShowType.NotTips);
            this._view.lab_cnt.text = `${this._fight.reward_num}`;
            this._view.img_got.visible = this._fight.reward_status == 2;
        }

        /**更新阵营血量 */
        private onUpdateBeast(): void {
            // let own = this._proxy.getTeamInfo(CrossUnionType.Own);
            this._view.item_1.setData(this._fight.my_base);

            // let target = this._proxy.getTeamInfo(CrossUnionType.Target);
            this._view.item_2.setData(this._fight.target_base);
        }

        /**死亡时更新单个数据 */
        private onUpdateRoleByIndex(n: GameNT): void {
            let i = n.body;
            let role: CrossUnionRole = this._view[`role_${i}`];
            if (!role) {
                return;
            }
            let info: teammate = this._fight.getRoleInfo(i);
            role.visible = !!info;
            role.setData(i, info);
        }

        /**更新全部角色的数据 */
        private onUpdateRole(): void {
            for (let i = 1; i <= this._len; i++) {
                let role: CrossUnionRole = this._view[`role_${i}`];
                if (!role) {
                    return;
                }
                let info: teammate = this._fight.getRoleInfo(i);
                role.visible = !!info;
                role.setData(i, info);
            }
        }

        private onUpdateSkill(): void {
            let cfgArr: GuildPkSkillConfig[] = getConfigListByName(ConfigName.GuildPkSkill);
            let list: SkillItemRenderData[] = [];
            for (let cfg of cfgArr) {
                list.push({ skillId: cfg.skill_id });
            }
            this._listData.replaceAll(list);
        }

        private onClickSkill(e: ItemTapEvent): void {
            let index: number = e.itemIndex + 1;
            let cfg: GuildPkSkillConfig = getConfigByNameId(ConfigName.GuildPkSkill, index);
            if (!BagUtil.checkPropCnt(cfg.cost[0][0], cfg.cost[0][1], PropLackType.Dialog)) {
                return;
            }
            this._fight.c2s_guild_pk_use_skill(e.itemIndex + 1);
        }

        private onClickTips(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.CrossUnionSkill);
        }

        private onClickInfo(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.CrossUnionInfo);
        }

        private onClickReward(): void {
            if (this._fight.reward_num) {
                this._proxy.c2s_guild_pk_oper(5);
            }
        }

        private onUpdateResult(n: GameNT): void {
            let msg = n.body;
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.CrossUnionWin, msg);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
            this._proxy.c2s_guild_pk_oper(7);
            this._fight.onExit();
        }

        update(time: base.Time): void {
            this.onUpdateStep();
        }

        private onUpdateStep(): void {
            this._stepData = this._fight.getStepData(this._step);
            if (!this._stepData) {
                return;
            }
            this._step++;
            if (this._stepData.is_dead) {
                this._fight.onUpdateData(this._stepData);
                this.onUpdateStep();
                return;
            }
            if (this._stepData.type == 2) {
                // TODO:治疗
            } else {
                //发动天雷技能
                if (this._stepData.type == 1) {
                    // TODO:播放特效
                }
                for (let info of this._stepData.list) {
                    let index: number = this._fight.getRoleIndex(info.target_id);
                    let value: number = info.value.toNumber();
                    if (!index) {
                        if (info.type == CrossUnionType.Own) {
                            TBSTxtMgr.getIns().show(`${value}`, this._view.grp_own);
                        } else {
                            TBSTxtMgr.getIns().show(`${value}`, this._view.grp_target);
                        }
                        continue;
                    }
                    let fightIndex: number = this._fight.getFightIndex(index);
                    let roleFight: CrossUnionRole = this._view[`role_${fightIndex}`];
                    roleFight.onUpdateEft(ActionName.ATTACK);

                    let roleHurt: CrossUnionRole = this._view[`role_${index}`];
                    TBSTxtMgr.getIns().show(`${value}`, roleHurt);
                }
            }
            this._fight.onUpdateData(this._stepData);
        }
    }
}