namespace game.mod.more {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import s2c_boss_srefresh_damage = msg.s2c_boss_srefresh_damage;

    export class FengmoSceneMdr extends MdrBase implements UpdateItem {
        private _view: FengmoSceneView = this.mark("_view", FengmoSceneView);
        private _proxy: FengmoProxy;
        private _endTime: number;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Fengmo);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(SceneEvent.ON_SCENE_DAMAGE_UPDATE, this.onUpdateHurt, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateHurt();
            this._endTime = this._proxy.guild_fengmo_time + TimeMgr.time.serverTimeSecond;
            this.update(TimeMgr.time);
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onUpdateHurt(n?: GameNT): void {
            let hurt: number = 0;
            if (n) {
                let msg: s2c_boss_srefresh_damage = n.body;
                for (let info of msg.damage_list) {
                    let damage = info.damage && info.damage.toNumber() || 0;
                    hurt += damage;
                }
            }
            this._view.lab_hurt.text = StringUtil.getHurtNumStr(hurt);
        }

        update(time: base.Time): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._view.lab_time.text = getLanById(LanDef.battle_cue29);
                return;
            }
            this._view.lab_time.textFlow = TextUtil.parseHtml(TimeUtil.formatSecond(leftTime, 'mm:ss', true));
        }
    }
}