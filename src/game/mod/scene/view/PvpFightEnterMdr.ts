namespace game.mod.scene {

    import GPlayerVo = game.scene.GPlayerVo;
    import SceneProxy = game.mod.scene.SceneProxy;
    import Tween = base.Tween;
    import Elastic = base.Elastic;
    import Handler = base.Handler;

    export class PvpFightEnterMdr extends EffectMdrBase {
        private _view: PvpFightView = this.mark("_view", PvpFightView);

        private _proxy: SceneProxy;
        private _curEnemyVo: GPlayerVo;//显示的第一个敌人
        protected _showArgs: GPlayerVo;
        private readonly HP_WIDTH: number = 150;//血条宽度

        private readonly GRP_POS10: number[] = [-50, 478];
        private readonly GRP_POS11: number[] = [30, 478];

        private readonly GRP_POS20: number[] = [407, 708];
        private readonly GRP_POS21: number[] = [331, 708];

        private readonly GRP_Y30: number = 574;

        constructor() {
            super(Layer.modal);
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
        }

        protected onShow(): void {
            super.onShow();

            this.updateSelf();
            this.updateEnemy();
            this.showTween();

            this.removeEft();
            this.addEftByParent(UIEftSrc.StartFighting, this._view.gr_eft2);
        }

        protected onHide(): void {
            this._curEnemyVo = null;
            Tween.remove(this._view.grp1);
            Tween.remove(this._view.grp2);
            Tween.remove(this._view.grp3);
            this.sendNt(SceneEvent.PVP_ENTER_END);
            super.onHide();
        }

        /**更新自己*/
        private updateSelf(): void {
            let vo = RoleVo.ins;
            this._view.lab_name1.text = vo.name;
            this._view.powerLabel1.setPowerValue(vo.showpower);
            this._view.head1.updateShow(vo.head, vo.head_frame, vo.sex, vo.vip_lv);
            this._view.img_hp1.width = this.HP_WIDTH;
        }

        /**更新敌人*/
        private updateEnemy(): void {
            this._curEnemyVo = this._showArgs;
            if (!this._curEnemyVo) {
                return;
            }
            let vo = this._curEnemyVo;
            this._view.lab_name2.text = vo.name;
            this._view.powerLabel2.setPowerValue(vo.showpower);
            this._view.head2.updateShow(vo.head, vo.head_frame, vo.sex);//todo,vip
            this._view.img_hp2.width = this.HP_WIDTH;
        }

        private showTween(): void {
            this._view.grp1.visible = false;
            this._view.grp1.x = this.GRP_POS10[0];
            this._view.grp1.y = this.GRP_POS10[1];
            let posX1 = this.GRP_POS11[0];
            Tween.get(this._view.grp1)
                .exec(Handler.alloc(this, () => {
                    this._view.grp1.visible = true;
                }))
                .to({x: posX1}, 500, null, Elastic.easeOut);

            this._view.grp2.visible = false;
            this._view.grp2.x = this.GRP_POS20[0];
            this._view.grp2.y = this.GRP_POS20[1];
            let posX2 = this.GRP_POS21[0];
            Tween.get(this._view.grp2)
                .exec(Handler.alloc(this, () => {
                    this._view.grp2.visible = true;
                }))
                .to({x: posX2}, 500, null, Elastic.easeOut);

            this._view.grp3.alpha = 0;
            this._view.grp3.y = this.GRP_Y30;
            Tween.get(this._view.grp3)
                .to({alpha: 1}, 200)
                .delay(1000)
                .exec(Handler.alloc(this, () => {
                    this.hide();
                }));
        }
    }
}