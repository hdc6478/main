namespace game.mod.xianyuan {

    import s2c_instance_fin = msg.s2c_instance_fin;
    import teammate = msg.teammate;
    import TimeMgr = base.TimeMgr;
    import GameNT = base.GameNT;

    export class XianlvDoufaSceneMdr extends EffectMdrBase implements base.UpdateItem {
        protected _view: XianlvDoufaSceneView = this.mark("_view", XianlvDoufaSceneView);

        private _proxy: XianlvDoufaProxy;

        private _xianlv: teammate;
        private _enemy1: teammate;
        private _enemy2: teammate;

        private _endTIme: number;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianlvDoufa);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(SceneEvent.ON_SCENE_DAMAGE_UPDATE, this.onUpdateHurt, this);
        }

        protected onShow(): void {
            super.onShow();
            this._endTIme = TimeMgr.time.serverTimeSecond + this._proxy.xianlvdoufa_time;
            this.onUpdateView();
            TimeMgr.addUpdateItem(this, 1000);
        }

        private onUpdateView(): void {
            this._view.head1.updateMyHead();
            this._xianlv = RoleUtil.getBanlvInfo();
            this._view.head2.updateShow(this._xianlv);

            this._enemy1 = this._proxy.player_info[0];
            this._view.head3.updateShow(this._enemy1);
            this._enemy2 = this._proxy.player_info[1];
            this._view.head4.updateShow(this._enemy2);

            this._view.lab_hurt1.text = StringUtil.getHurtNumStr(0);
            this._view.lab_hurt2.text = StringUtil.getHurtNumStr(0);
        }

        private onUpdateHurt(n: GameNT): void {
            let msg: msg.s2c_boss_srefresh_damage = n.body;
            let hurt: number = 0;
            let type: number = 1;
            let xianlv: teammate = RoleUtil.getBanlvInfo();
            for (let info of msg.damage_list) {
                if (info.index.eq(RoleVo.ins.role_id)) {
                    type = 1;
                }
                if (info.index.eq(xianlv.role_id)) {
                    type = 2;
                }
                let damage = info.damage && info.damage.toNumber() || 0;
                hurt += damage;
            }
            this._view[`lab_hurt${type}`].text = StringUtil.getHurtNumStr(hurt);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        update(time: base.Time): void {
            this.onUpdateHP();

            let leftTime = this._endTIme - TimeMgr.time.serverTimeSecond;
            this._view.lab_time.textFlow = TextUtil.parseHtml(TimeUtil.formatSecond(leftTime, 'mm:ss', true));
        }

        private onUpdateHP(): void {
            let vo1 = SceneUtil.getMainPlayerVo();
            this._view.head1.updateHP(vo1 && vo1.percent || 0);

            let vo2 = SceneUtil.getVoByRoleId(this._xianlv.role_id);
            this._view.head2.updateHP(vo2 && vo2.percent || 0);

            let vo3 = SceneUtil.getVoByRoleId(this._enemy1.role_id);
            this._view.head3.updateHP(vo3 && vo3.percent || 0);

            let vo4 = SceneUtil.getVoByRoleId(this._enemy2.role_id);
            this._view.head4.updateHP(vo4 && vo4.percent || 0);
        }
    }
}