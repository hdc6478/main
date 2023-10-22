namespace game.mod.scene {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GPlayerVo = game.scene.GPlayerVo;
    import ObjectType = game.scene.ObjectType;
    import SceneProxy = game.mod.scene.SceneProxy;
    import GameNT = base.GameNT;
    import facade = base.facade;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;
    import Handler = base.Handler;

    export class PvpFightMdr extends EffectMdrBase implements UpdateItem {
        private _view: PvpFightView = this.mark("_view", PvpFightView);

        private _proxy: SceneProxy;
        private _curEnemyVo: GPlayerVo;//显示的第一个敌人
        private readonly HP_WIDTH: number = 150;//血条宽度
        private _showEnter: boolean = false;//弹入场动画
        private _delayEnter: number;//延迟弹窗
        private readonly DELAY_TICK: number = 2000;//延迟2秒弹窗

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Scene);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
            this.onNt(SceneEvent.ON_OBJ_ADD, this.onObjAdd, this);
            this.onNt(SceneEvent.PVP_ENTER_END, this.onPvpEnterEnd, this);
        }

        protected onShow(): void {
            super.onShow();

            this._view.visible = false;//默认隐藏
            this.updateSelf();
            this.updateEnemy();

            TimeMgr.addUpdateItem(this, 1000);
            this.removeEft();
            this._view.img_vs.visible = false;
            this._view.gr_eft2.visible = false;
            this.addEftByParent(UIEftSrc.VS, this._view.gr_eft);
        }

        protected onHide(): void {
            this._curEnemyVo = null;
            this._showEnter = false;
            this.clearDelayEnter();
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onObjAdd(n: GameNT) {
            this.updateEnemy();
        }

        /**更新自己*/
        private updateSelf(): void {
            let vo = RoleVo.ins;
            this._view.lab_name1.text = vo.name;
            this._view.powerLabel1.setPowerValue(vo.showpower);
            this._view.head1.updateShow(vo.head, vo.head_frame, vo.sex, vo.vip_lv);
            this.updateSelfHp();
        }

        /**更新自己血量*/
        private updateSelfHp() {
            let vo = this._proxy.mainPlayerVo;
            let percent = vo ? vo.percent : 0;
            this._view.img_hp1.width = percent / 10000 * this.HP_WIDTH;
        }

        /**更新敌人*/
        private updateEnemy(): void {
            let enemies = this._proxy.getEnemyVos(ObjectType.PLAYER);//获取所有敌对玩家
            this._curEnemyVo = enemies && enemies.length ? enemies[0] as GPlayerVo : null;//取第一个敌人
            if (!this._curEnemyVo) {
                return;
            }
            this._proxy.foeTargetId = this._curEnemyVo.entity_id;//设置攻击目标
            if (!this._showEnter) {
                this.clearDelayEnter();
                this._delayEnter = delayCall(Handler.alloc(this, () => {
                    facade.showView(ModName.Scene, SceneViewType.PvpFightEnter, this._curEnemyVo);
                }), this.DELAY_TICK);
                this._showEnter = true;
            }
            let vo = this._curEnemyVo;
            this._view.lab_name2.text = vo.name;
            this._view.powerLabel2.setPowerValue(vo.showpower);
            this._view.head2.updateShow(vo.head, vo.head_frame, vo.sex, vo.vip_lv);
            this.updateEnemyHp();
        }

        /**更新敌人血量*/
        private updateEnemyHp() {
            let percent = 0;
            if (this._curEnemyVo) {
                let vo = this._proxy.getVoById(this._curEnemyVo.entity_id) as GPlayerVo;
                percent = vo ? vo.percent : 0;
            }
            this._view.img_hp2.width = percent / 10000 * this.HP_WIDTH;
        }

        update(time: base.Time): void {
            this.updateSelfHp();
            this.updateEnemyHp();
        }

        private onPvpEnterEnd(): void {
            this._view.visible = true;//显示
        }

        private clearDelayEnter(): void {
            if (this._delayEnter) {
                clearDelay(this._delayEnter);
                this._delayEnter = null;
            }
        }
    }
}