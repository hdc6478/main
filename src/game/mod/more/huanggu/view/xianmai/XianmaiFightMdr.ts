namespace game.mod.more {

    import Handler = base.Handler;
    import Tween = base.Tween;
    import facade = base.facade;

    export class XianmaiFightMdr extends MdrBase {
        private _view: YouliKillerFightView = this.mark("_view", YouliKillerFightView);
        private _proxy: XianmaiProxy;

        private readonly HP_WIDTH: number = 350;//血条宽度
        private readonly TWEEN_TIME: number = 3000;//动画时间

        private _data: msg.s2c_city_moment_fight_update;

        public constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Xianmai);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            this._data = this._showArgs;
            this.updateInfo();
        }

        protected onHide(): void {
            super.onHide();
            this._data = null;
            Tween.remove(this._view.img_hp1);
            Tween.remove(this._view.img_hp2);
        }

        private updateInfo(): void {
            this.updateSelf();
            this.updateEnemy();

            let myHp = this._data.atk_hp / 100;
            let enemyHp = this._data.enemy_hp / 100;

            this._view.img_hp1.width = this.HP_WIDTH;
            let initEnemyHp = this._proxy.getInitEnemyHp();//todo 仙脉受击方初始血量
            this._view.img_hp2.width = this.HP_WIDTH * initEnemyHp;

            Tween.remove(this._view.img_hp1);
            Tween.remove(this._view.img_hp2);
            Tween.get(this._view.img_hp1)
                .to({width: myHp / 100 * this.HP_WIDTH}, this.TWEEN_TIME)
                .exec(Handler.alloc(this, () => {
                    if (myHp <= 0) {
                        this.endTween();
                    }
                }));
            Tween.get(this._view.img_hp2)
                .to({width: enemyHp / 100 * this.HP_WIDTH}, this.TWEEN_TIME)
                .exec(Handler.alloc(this, () => {
                    if (enemyHp <= 0) {
                        this.endTween();
                    }
                }));
        }

        private endTween(): void {
            Tween.remove(this._view.img_hp1);
            Tween.remove(this._view.img_hp2);


            if (this._data.atk_hp <= 0) {
                //失败
                facade.showView(ModName.More, MoreViewType.XianmaiFightFail);
            } else if (this._data.enemy_hp <= 0) {
                //成功
                facade.showView(ModName.More, MoreViewType.XianmaiFightSuccess, this._data.props);
            }
            this.hide();
        }

        /**更新自己*/
        private updateSelf(): void {
            let vo = RoleVo.ins;
            this._view.lab_name1.text = vo.name;
            this._view.powerLabel1.setPowerValue(vo.showpower);
            this._view.head1.updateHeadShow(vo.head, vo.head_frame, vo.sex);
        }

        /**更新敌人*/
        private updateEnemy(): void {
            let enemyInfo = this._data.enemy_info;
            if (!enemyInfo) {
                return;
            }
            //怪物
            if (enemyInfo.role_id.eq(Long.ZERO)) {
                let bossNames = this._proxy.getBossNames();
                this._view.lab_name2.text = bossNames[0];
                this._view.powerLabel2.setPowerValue(enemyInfo.showpower);
                this._view.head2.visible = false;
                this._view.img_boss2.visible = true;
                this._view.img_boss2.source = this._proxy.getBossIcon();
                return;
            }
            //玩家
            this._view.head2.visible = true;
            this._view.img_boss2.visible = false;
            this._view.lab_name2.text = enemyInfo.name;
            this._view.powerLabel2.setPowerValue(enemyInfo.showpower);
            this._view.head2.updateHeadShow(enemyInfo.head, enemyInfo.head_frame, enemyInfo.sex);
        }
    }
}