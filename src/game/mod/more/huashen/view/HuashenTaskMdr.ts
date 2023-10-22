namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import facade = base.facade;
    import HuashenConfig = game.config.HuashenConfig;
    import Handler = base.Handler;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import EftUIGroup = game.scene.EftUIGroup;
    import SkillEffect = game.scene.SkillEffect;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import SkillShowConfig = game.config.SkillShowConfig;
    import SkillEftMgr = game.scene.SkillEftMgr;

    export class HuashenTaskMdr extends EffectMdrBase {
        private _view: HuashenTaskView = this.mark("_view", HuashenTaskView);
        private _proxy: HuashenProxy;
        private _surfaceProxy: ISurfaceProxy;

        private _taskList: ArrayCollection;
        private _index: number;
        private _cfg: HuashenConfig;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Huashen);
            this._surfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);

            this._taskList = new ArrayCollection();
            this._view.list_task.itemRenderer = TaskRender2;
            this._view.list_task.dataProvider = this._taskList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_play, TouchEvent.TOUCH_TAP, this.onClickPlay);
            addEventListener(this._view.btn_open, TouchEvent.TOUCH_TAP, this.onClickOpen);
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);

            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateModel();
            this.updateTaskList();
        }

        protected onHide(): void {
            this._view.grp_skill.removeChildren();
            super.onHide();
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Huashen) > -1) {
                this.updateTaskList();
            }
        }

        //播放技能
        private onClickPlay(): void {
            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this._cfg.skill);
            let skillShowCfg: SkillShowConfig = getConfigByNameId(ConfigName.SkillShow, skillCfg.skillshow);
            if (!skillShowCfg || !skillShowCfg.res) {
                console.error("技能未配置特效");
                return;
            }
            SkillEftMgr.ins.showGroupUIEft(skillShowCfg.res,0,0,Direction.RIGHT_UP,null,null,1,this._view.grp_skill);
        }

        private onClickOpen(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.HuashenOpenMain);
        }

        private onClickAct(): void {
            this._surfaceProxy.c2s_ride_oper_up_star(SurfaceStarOpType.Act, this._index, ConfigHead.Huashen);
        }

        private updateModel(): void {
            let index = this._surfaceProxy.getDefaultId(ConfigHead.Huashen);
            this._index = index;
            this.addAnimate(index, this._view.grp_eff);
            let cfg: HuashenConfig = getConfigByNameId(ConfigName.Huashen, index);
            this._cfg = cfg;
            this._view.img_type.source = "type_" + cfg.icon;
            this._view.img_name.source = "name_" + cfg.icon;
        }

        private updateTaskList(): void {
            let tasks = TaskUtil.getTaskList(TaskType.Huashen);

            let hasAllDraw = true;//是否全部领取奖励
            for(let task of tasks){
                if(task.status != TaskStatus.Draw){
                    hasAllDraw = false;
                    break;
                }
            }
            this._view.scr.visible = this._view.img_task.visible = !hasAllDraw;
            if(!hasAllDraw){
                if (this._taskList.source.length > 0) {
                    this._taskList.replaceAll(tasks);
                } else {
                    this._taskList.source = tasks;
                }
            }

            this._view.btn_act.visible = hasAllDraw;
            this._view.btn_act.redPoint.visible = true;
        }
    }
}