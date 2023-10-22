namespace game.mod.more {

    import Tween = base.Tween;
    import Monster1Config = game.config.Monster1Config;
    import facade = base.facade;
    import zhandui_battle_round_struct = msg.zhandui_battle_round_struct;
    import zhandui_battle_records = msg.zhandui_battle_records;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Handler = base.Handler;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;
    import s2c_zhandui_kuanmai_pvp_ret = msg.s2c_zhandui_kuanmai_pvp_ret;
    import teammate = msg.teammate;

    /**
     * A 我方
     * B 敌方
     *
     * A 攻击 B  把B秒了  测试ok
     * B 攻击 A  把A秒了  测试ok
     * AB互相攻击，一方死亡 （n回合）测试ok
     * AB同时攻击 （1回合，n回合）todo 待测试 大头
     * 回血 todo 待测试
     * 反弹伤害 todo 待测试
     * 直接伤害 todo 待测试
     */
    export class TBSFightMdr extends EffectMdrBase implements UpdateItem {
        private _view: TBSFightView = this.mark("_view", TBSFightView);
        private _proxy: XujieTansuoProxy;
        private btsMgr: TBSModelMgr;
        /**当前回合*/
        private _curRound = 0;
        /**当前回合战斗记录数据*/
        private _curRoundStruct: zhandui_battle_round_struct;

        //每帧处理的战斗数组
        private _battleRecordList: zhandui_battle_records[][];
        //当前的战斗处理，处理完需要置空
        private _curBattleRecords: zhandui_battle_records[];
        //超过此回合数则出现跳过按钮
        private _skipRound = 4;

        //我方数据  我方在左下
        private _actorEntity: teammate;
        //敌方数据  敌方在右上
        private _enemyEntity: teammate;

        private _delayCallId: number;

        public constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this.btsMgr = TBSModelMgr.getIns();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_skip, egret.TouchEvent.TOUCH_TAP, this.onClickSkin, this);

            this.onNt(`togetherFight`, this.onTogetherFight, this);//todo 测试

            this.onNt(MoreEvent.ON_TBS_FIGHT_HIDE, this.dealHide, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
            this.updateModel();
            //开始回合处理
            console.info(`tbs_fight rounds：`, this._proxy.round_records.length);
            this.doRound();
        }

        private dealHide(): void {
            this._proxy.result_info = null;
            this.hide();
        }

        protected onHide(): void {
            super.onHide();
            this.btsMgr.onRemove();
            this._view.gr_model0.removeChildren();
            this._view.gr_model1.removeChildren();
            Tween.remove(this._view.gr_model0);
            Tween.remove(this._view.gr_model1);
            this._curRound = 0;
            this._curRoundStruct = null;
            this._battleRecordList = null;
            this._actorEntity = null;
            this._enemyEntity = null;
            if (this._delayCallId) {
                clearDelay(this._delayCallId);
            }
            this._proxy.round_records = null;
        }

        private updateView(): void {
            this.updateActorView();
            this.updateEnemyView();
        }

        //更新模型
        private updateModel(): void {
            this.btsMgr.updateActor(this.getActorEntity(), this._view.gr_model0);
            this.btsMgr.updateEnemy(this.getEnemyEntity(), this._view.gr_model1);
        }

        //我方初始信息
        private getActorEntity(): teammate {
            let info = this._proxy.myself_info;
            if (!this._actorEntity) {
                this._actorEntity = info;
            }
            return this._actorEntity;
        }

        //敌方初始信息
        private getEnemyEntity(): teammate {
            let info = this._proxy.target_info;
            if (!this._enemyEntity) {
                this._enemyEntity = info;
            }
            return this._enemyEntity;
        }

        //更新实体血量，每次战斗都要更新血量
        private updateEntityHp(data: zhandui_battle_records): void {
            if (!data) {
                return;
            }
            let myInfo = this._proxy.myself_info;
            let myId = myInfo && myInfo.role_id ? myInfo.role_id : null;//我的id
            let actorId = data.actor && data.actor.id || null;//动作方id
            if (myId && actorId && myId.equals(actorId)) {
                this._actorEntity.legion_data.hp = data.actor.hp;
                this._enemyEntity.legion_data.hp = data.target.hp;
            } else {
                this._actorEntity.legion_data.hp = data.target.hp;
                this._enemyEntity.legion_data.hp = data.actor.hp;
            }
        }

        //己方数据
        private updateActorView(): void {
            let actor = this._actorEntity ? this._actorEntity : this.getActorEntity();
            if (!actor) {
                return;
            }
            let role = this._proxy.myself_info;
            this._view.lab_name1.text = role && role.name || '';

            let hp = !this._actorEntity ? 1 : actor.legion_data.hp.toNumber();
            let maxHp = !this._actorEntity ? 1 : actor.legion_data.legion_max_hp.toNumber();
            this._view.img_hp1.width = 150 * (hp / maxHp);
            if (role) {
                this._view.head1.updateShow(role.head, role.head_frame, role.sex, role.vip);
            }

            let power = actor.legion_data.legion_god && actor.legion_data.legion_god.toNumber() || 0;
            this.addBmpFont(power + '', BmpTextCfg[BmpTextType.CommonPower], this._view.grp_power1);

            if (!this._actorEntity) {
                this._actorEntity = actor;
            }
        }

        //敌方数据
        private updateEnemyView(): void {
            let enemy = this._enemyEntity ? this._enemyEntity : this.getEnemyEntity();
            if (!enemy) {
                return;
            }

            if (enemy.role_id && enemy.role_id.notEquals(Long.ZERO)) {
                //玩家
                this._view.head2.visible = true;
                this._view.img_boss2.visible = false;
                let role = this._proxy.target_info;
                if (role.head) {
                    this._view.head2.updateShow(role.head, role.head_frame, role.sex, role.vip);
                }
                this._view.lab_name2.text = role && role.name ? role.name : '';
            } else {
                //boss
                this._view.head2.visible = false;
                this._view.img_boss2.visible = true;
                let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, enemy.boss_id ? enemy.boss_id.toNumber() : 0);
                this._view.lab_name2.text = monsterCfg && monsterCfg.name || '';
                this._view.img_boss2.source = monsterCfg && monsterCfg.res_id || '';
            }

            let hp = !this._enemyEntity ? 1 : enemy.legion_data.hp.toNumber();
            let maxHp = !this._enemyEntity ? 1 : enemy.legion_data.legion_max_hp.toNumber();
            this._view.img_hp2.width = 150 * (hp / maxHp);

            let power = enemy.legion_data.legion_god && enemy.legion_data.legion_god.toNumber() || 0;
            this.addBmpFont(power + '', BmpTextCfg[BmpTextType.CommonPower], this._view.grp_power2);

            if (!this._enemyEntity) {
                this._enemyEntity = enemy;
            }
        }

        //跳过按钮，当前回合超过4，出现跳过按钮
        private onClickSkin(): void {
            if (this._curRound > this._skipRound) {
                this._battleRecordList = null;
                this._curBattleRecords = null;
                this._proxy.round_records = null;
            }
        }

        /**=============================== 攻击等处理 ===============================*/

        //己方攻击
        private onActorFight(data: zhandui_battle_records): void {
            let val = data && data.value ? data.value.toNumber() : 0;

            let startX = this._view.gr_model0.x;
            let startY = this._view.gr_model0.y;
            this._view.setChildIndex(this._view.gr_model0, this._view.numChildren - 2);//跳过按钮在最上
            Tween.get(this._view.gr_model0)
                .to({x: this._view.gr_model1.x - 100, y: this._view.gr_model1.y + 100}, 500)
                .exec(Handler.alloc(this, () => {
                    if (val) {
                        TBSTxtMgr.getIns().show(val + '', this._view.gr_model1);
                    }
                    this.updateView();
                }))
                .delay(200)
                .to({x: startX, y: startY}, 500)
                .exec(Handler.alloc(this, () => {
                    this._curBattleRecords = null;
                }));
        }

        //敌方攻击
        private onEnemyFight(data: zhandui_battle_records): void {
            let val = data && data.value ? data.value.toNumber() : 0;

            let startX = this._view.gr_model1.x;
            let startY = this._view.gr_model1.y;
            this._view.setChildIndex(this._view.gr_model1, this._view.numChildren - 2);
            Tween.get(this._view.gr_model1)
                .to({x: this._view.gr_model0.x + 100, y: this._view.gr_model0.y - 100}, 500)
                .exec(Handler.alloc(this, () => {
                    if (val) {
                        TBSTxtMgr.getIns().show(val + '', this._view.gr_model0);
                    }
                    this.updateView();
                }))
                .delay(200)
                .to({x: startX, y: startY}, 500)
                .exec(Handler.alloc(this, () => {
                    this._curBattleRecords = null;
                }));
        }

        //双方一起攻击 todo
        private onTogetherFight(actor: zhandui_battle_records, enemy: zhandui_battle_records): void {
            let obj = this.getXYObj();
            let disX = obj.x;
            let disY = obj.y;

            //我方移动
            let startX0 = this._view.gr_model0.x;
            let startY0 = this._view.gr_model0.y;
            this._view.setChildIndex(this._view.gr_model0, this._view.numChildren - 2);
            Tween.get(this._view.gr_model0)
                .to({x: startX0 + disX, y: startY0 - disY}, 500)
                .delay(200)
                .to({x: startX0, y: startY0}, 500);

            //敌方移动
            let startX1 = this._view.gr_model1.x;
            let startY1 = this._view.gr_model1.y;
            Tween.get(this._view.gr_model1)
                .to({x: startX1 - disX, y: startY1 + disY}, 500)
                .exec(Handler.alloc(this, () => {
                    this.updateView();
                    if (actor && actor.value) {
                        TBSTxtMgr.getIns().show(actor.value.toString(), this._view.gr_model1);
                    }
                    if (enemy && enemy.value) {
                        TBSTxtMgr.getIns().show(enemy.value.toString(), this._view.gr_model0);
                    }
                }))
                .delay(200)
                .to({x: startX1, y: startY1}, 500)
                .exec(Handler.alloc(this, () => {
                    this._curBattleRecords = null;
                }));
        }

        private getXYObj(): { x: number, y: number } {
            let x0 = this._view.gr_model0.x;
            let y0 = this._view.gr_model0.y;
            let x1 = this._view.gr_model1.x;
            let y1 = this._view.gr_model1.y;
            let disX = Math.abs(x0 - x1) * 0.5 - 50;
            let disY = Math.abs(y0 - y1) * 0.5 - 50;
            return {x: disX, y: disY};
        }

        /**=============================== 回合战斗处理 ===============================*/

        //下回合信息
        public getNextRoundRecords(): zhandui_battle_round_struct {
            let records = this._proxy.round_records;
            if (records && records.length) {
                return records.shift();
            }
            return null;
        }

        //所有的回合结束，处理结算界面
        public checkAllRoundFinished(): void {
            let record = this.getNextRoundRecords();
            if (record) {
                return;
            }
            TimeMgr.removeUpdateItem(this);

            if (this._proxy.msg) {
                let msg: s2c_zhandui_kuanmai_pvp_ret = this._proxy.msg;
                if (msg.is_success) {
                    ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.MiningResultWin, msg);
                } else {
                    ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.MiningResultFail, msg);
                }
                this.hide();
                this._proxy.msg = null;
                return;
            }

            let info = this._proxy.result_info;
            if (info && info.kill_rewards) {
                // 击杀奖励界面
                facade.showView(ModName.More, MoreViewType.XujieTansuoSceneResultKill, info);
            } else if (info && info.challenge_rewards) {
                // 击打奖励界面
                facade.showView(ModName.More, MoreViewType.XujieTansuoSceneResult, info);
            } else {
                // todo 没有奖励则直接关闭
                // todo 其他界面结算界面处理
                this.hide();
                this._proxy.result_info = null;
                facade.showView(ModName.More, MoreViewType.XujieTansuoSceneResultFail);
            }
        }

        //回合提示
        public showRoundTips(round: number): void {
            let totalRound = 15;//写死15回合

            let curStr = "第" + round + "/" + totalRound + "回";
            this.addBmpFont(curStr, BmpTextCfg[BmpTextType.XujietansuoTbs], this._view.grp_lv, true, 1, true);

            Tween.remove(this._view.grp_tips);
            this._view.grp_tips.visible = true;
            this._view.setChildIndex(this._view.grp_tips, this._view.numChildren - 2);
            Tween.get(this._view.grp_tips)
                .delay(1000)
                .exec(Handler.alloc(this, () => {
                    this._view.grp_tips.visible = false;
                }));
        }

        //处理每回合
        public doRound(): void {
            let curRound = this.getNextRoundRecords();
            if (!curRound) {
                this.checkAllRoundFinished();
                return;
            }
            this._view.btn_skip.visible = curRound.round > this._skipRound;

            if (curRound.round != this._curRound) {
                TimeMgr.removeUpdateItem(this);
                this.showRoundTips(curRound.round);//回合数提示
            }

            if (this._delayCallId) {
                clearDelay(this._delayCallId);
            }

            this._delayCallId = delayCall(Handler.alloc(this, () => {
                this._curRound = curRound.round;//当前回合
                this._curRoundStruct = curRound;//当前回合数据记录

                this.doRoundBattle();
                TimeMgr.addUpdateItem(this, 1000);
            }), 1000);
        }

        //处理每回合的战斗 todo
        public doRoundBattle(): void {
            let roundStruct = this._curRoundStruct;
            if (!roundStruct) {
                // this.doRound();//进入下一回合处理
                return;
            }

            //动作分类
            let obj: Object = {
                [TbsHintType.Attack]: [],
                [TbsHintType.Blood]: [],
                [TbsHintType.DirectInjury]: [],
                [TbsHintType.ReboundInjury]: []
            };

            let battleStr: string = '';//todo 测试打印
            let list = roundStruct.now_list || [];
            for (let i = 0; i < list.length; i++) {
                let item: zhandui_battle_records = list[i];
                if (!obj[item.hit_type]) {
                    obj[item.hit_type] = [];
                }
                if (item.hit_type == TbsHintType.ReboundInjury) {
                    //反弹伤害，需要找到其关联的普攻伤害（最近原则），其一组
                    let attackList = obj[TbsHintType.Attack] || [];
                    let size = Math.max(0, attackList.length - 1);
                    obj[item.hit_type][size] = item;
                } else {
                    obj[item.hit_type].push(item);
                }

                //测试打印拼接
                if (item && item.actor) {
                    let isMyself = this._proxy.isMyself(item.actor.id);
                    if (isMyself) {
                        battleStr += ` [my_${item.hit_type}]`;
                    } else {
                        battleStr += ` [target_${item.hit_type}]`;
                    }
                }
            }
            console.info(`tbs_fight round${roundStruct.round} ` + battleStr);

            //转换成二维数组
            let roundList: zhandui_battle_records[][] = [];

            let attackList: zhandui_battle_records[] = obj[TbsHintType.Attack];
            if (attackList.length == 1) {
                //一方攻击
                roundList.push([attackList[0]]);//普攻
                let reboundList = obj[TbsHintType.ReboundInjury];
                if (reboundList && reboundList[0]) {
                    roundList.push([reboundList[0]]);//反弹伤害
                }
                let directList = obj[TbsHintType.DirectInjury];
                for (let item of directList) {
                    roundList.push([item]);//直接伤害
                }
                let bloodList = obj[TbsHintType.Blood];
                for (let item of bloodList) {
                    roundList.push([item]);//回血
                }
            } else if (attackList.length == 2) {
                //双方都有攻击
                if (this._proxy.is_legion_speed_equal) {
                    //同时进行
                    roundList.push([attackList[0], attackList[1]]);//普攻，只有敌我一起行动，才会是两个
                    let reboundList = obj[TbsHintType.ReboundInjury];
                    let reboundL = [];
                    if (reboundList[0]) {
                        reboundL.push(reboundList[0]);
                    }
                    if (reboundList[1]) {
                        reboundL.push(reboundList[1]);
                    }
                    roundList.push(reboundL);//反弹伤害
                    let directList = obj[TbsHintType.DirectInjury];
                    for (let item of directList) {
                        roundList.push([item]);//直接伤害
                    }
                    let bloodList = obj[TbsHintType.Blood];
                    for (let item of bloodList) {
                        roundList.push([item]);//回血
                    }
                } else {
                    //依次进行
                    if (this._proxy.is_legion_speed_greater) {
                        roundList.push([attackList[0]]);//A普攻
                        let reboundList = obj[TbsHintType.ReboundInjury];
                        if (reboundList[0]) {
                            roundList.push([reboundList[0]]);//A反弹伤害
                        }
                        roundList.push([attackList[1]]);//B普攻
                        if (reboundList[1]) {
                            roundList.push(reboundList[1]);//B反弹伤害
                        }
                        let directList = obj[TbsHintType.DirectInjury];
                        for (let item of directList) {
                            roundList.push([item]);//直接伤害
                        }
                        let bloodList = obj[TbsHintType.Blood];
                        for (let item of bloodList) {
                            roundList.push([item]);//回血
                        }
                    } else {
                        roundList.push([attackList[1]]);//B普攻
                        let reboundList = obj[TbsHintType.ReboundInjury];
                        if (reboundList[1]) {
                            roundList.push([reboundList[1]]);//B反弹伤害
                        }
                        roundList.push([attackList[0]]);//A普攻
                        if (reboundList[0]) {
                            roundList.push(reboundList[0]);//A反弹伤害
                        }
                        let directList = obj[TbsHintType.DirectInjury];
                        for (let item of directList) {
                            roundList.push([item]);//直接伤害
                        }
                        let bloodList = obj[TbsHintType.Blood];
                        for (let item of bloodList) {
                            roundList.push([item]);//回血
                        }
                    }
                }
            }

            this._battleRecordList = roundList;

        }

        update(time: base.Time) {
            //当前这个动作没完成
            if (this._curBattleRecords) {
                return;
            }

            //这一轮的动作播放完成，进入下一回合
            if (!this._battleRecordList || !this._battleRecordList.length) {
                TimeMgr.removeUpdateItem(this);
                this.doRound();//下一回合
                return;
            }

            //当前这个动作处理完成，进入下一个动作处理
            this._curBattleRecords = this._battleRecordList.shift();
            this.doBattleRecord();
        }

        //每帧处理动作 todo
        private doBattleRecord(): void {
            if (!this._curBattleRecords) {
                return;
            }
            let itemList = this._curBattleRecords;
            let isAttack = itemList[0] && itemList[0].hit_type == TbsHintType.Attack;
            let isTogether = false;
            if (isAttack && itemList.length == 2) {
                isTogether = true;
            }
            if (isTogether) {
                //敌我双方一起行动 todo todo todo
                let item0 = itemList[0];
                let item1 = itemList[1];
                let isMyself = this._proxy.isMyself(item0.actor.id);
                this._actorEntity.legion_data.hp = isMyself ? item0.actor.hp : item1.actor.hp;
                this._enemyEntity.legion_data.hp = isMyself ? item1.actor.hp : item0.actor.hp;
                this.onTogetherFight(isMyself ? item0 : item1, isMyself ? item1 : item0);
                return;
            }

            for (let item of itemList) {
                let isMyself = this._proxy.isMyself(item.actor.id);

                this.updateEntityHp(item);

                if (item.hit_type == TbsHintType.Blood) {
                    //飘字回血 todo 表现
                    // PromptBox.getIns().show(`回血飘字`);
                    let val = item.value ? item.value.toNumber() : 0;
                    if (val) {
                        let group = isMyself ? this._view.gr_model0 : this._view.gr_model1;
                        TBSTxtMgr.getIns().show(val + '', group);
                    }
                    this._curBattleRecords = null;
                } else if (item.hit_type == TbsHintType.DirectInjury) {
                    //直接攻击 todo 表现
                    // PromptBox.getIns().show(`直接攻击表现`);
                    let val = item.value ? item.value.toNumber() : 0;
                    if (val) {
                        let group = isMyself ? this._view.gr_model0 : this._view.gr_model1;
                        TBSTxtMgr.getIns().show(val + '', group);
                    }
                    this._curBattleRecords = null;
                } else if (item.hit_type == TbsHintType.Attack) {
                    //普通攻击
                    if (isMyself) {
                        this.onActorFight(item);
                    } else {
                        this.onEnemyFight(item);
                    }
                } else if (item.hit_type == TbsHintType.ReboundInjury) {
                    //反弹伤害 todo 表现
                    // PromptBox.getIns().show(`反弹伤害`);
                    let val = item.value ? item.value.toNumber() : 0;
                    if (val) {
                        let group = isMyself ? this._view.gr_model0 : this._view.gr_model1;
                        TBSTxtMgr.getIns().show(val + '', group);
                    }
                    this._curBattleRecords = null;
                }
            }
        }
    }
}