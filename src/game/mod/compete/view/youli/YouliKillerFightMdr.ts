namespace game.mod.compete {

    import tour_role_info = msg.tour_role_info;
    import delayCall = base.delayCall;
    import s2c_city_war_fight_update = msg.s2c_city_war_fight_update;
    import Handler = base.Handler;
    import facade = base.facade;

    export class YouliKillerFightMdr extends MdrBase {
        private _view: YouliKillerFightView = this.mark("_view", YouliKillerFightView);
        
        private readonly HP_WIDTH: number = 350;//血条宽度
        
        private _proxy: CompeteProxy;

        private _fightData: s2c_city_war_fight_update;
        
        private _data: tour_role_info;

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(CompeteEvent.UPDATE_YOULI_KILLER_FIGHT, this.updateInfo, this);
        }

        protected onShow(): void {
            super.onShow();

            this._data = this._showArgs;
            this.updateInfo();
        }

        protected onHide(): void {
            super.onHide();
        }

        public hide(disposeImmediately?: boolean): void {
            let type = this._proxy.type;
            if(type == YouliType.SpecialKiller) {
                facade.hideView(ModName.Compete, CompeteViewType.YouliSpecialKiller);
            } else if(type == YouliType.ScoreKiller) {
                facade.hideView(ModName.Compete, CompeteViewType.YouliScoreKiller);
            }
            super.hide();
        }

        private updateInfo(): void {
            this._fightData = this._proxy.fightData;
            if(!this._fightData){
                return;
            }

            if(this._fightData.my_hp <= 0 || this._fightData.enemy_hp <= 0) {
                delayCall(Handler.alloc(this, this.hide), 1000);               // 延迟，防止秒杀时看不到界面
                return;
            }

            this.updateSelf();
            this.updateEnemy();

            if(this._fightData.my_hp >= 0) {
                this.updateSelfHp();
            }
            if(this._fightData.enemy_hp >= 0) {
                this.updateEnemyHp();
            }
        }
        
        /**更新自己*/
        private updateSelf(): void {
            let vo = RoleVo.ins;
            this._view.lab_name1.text = vo.name;
            this._view.powerLabel1.setPowerValue(vo.showpower);
            this._view.head1.updateHeadShow(vo.head, vo.head_frame, vo.sex);
        }

        /**更新自己血量*/
        private updateSelfHp() {
            let percent = this._fightData.my_hp;
            this._view.img_hp1.width = percent / 10000 * this.HP_WIDTH;
        }

        /**更新敌人*/
        private updateEnemy(): void {
            let enemies =  this._fightData.enemy_info;
            if(!enemies){
                return;
            }
            this._view.lab_name2.text = enemies.name;
            this._view.powerLabel2.setPowerValue(enemies.showpower);
            this._view.head2.updateHeadShow(enemies.head, enemies.head_frame, enemies.sex);
        }

        /**更新敌人血量*/
        private updateEnemyHp() {
            let percent = this._fightData.enemy_hp;
            this._view.img_hp2.width = percent / 10000 * this.HP_WIDTH;
        }

    }
}