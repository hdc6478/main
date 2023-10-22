namespace game.mod.yijie {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GameNT = base.GameNT;
    import s2c_boss_srefresh_damage = msg.s2c_boss_srefresh_damage;

    export class SeaSceneMdr extends MdrBase implements UpdateItem {
        private _view: SeaSceneView = this.mark("_view", SeaSceneView);

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit()
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;

        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(SceneEvent.ON_SCENE_DAMAGE_UPDATE, this.onDamageUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateTime();
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onDamageUpdate(n: GameNT) {
            let msg: s2c_boss_srefresh_damage = n.body;
            this.updateDamage(msg);
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let endTime = SceneUtil.getEndTime();
            if(!endTime){
                return;
            }
            let curTime = TimeMgr.time.serverTimeSecond;
            let leftTime = endTime - curTime;
            this._view.lab_time.text = TimeUtil.formatSecond(leftTime, "mm:ss");
            if(leftTime <= 0){
                SceneUtil.clickExit();
                TimeMgr.removeUpdateItem(this);
            }
        }

        private updateDamage(info: s2c_boss_srefresh_damage): void {
            let allDamage = Long.fromValue(0);
            if(info.damage_list && info.damage_list.length){
                for(let i of info.damage_list){
                    allDamage = allDamage.add(i.damage);
                }
            }
            this._view.lab_damage.text = StringUtil.getHurtNumStr(allDamage.toNumber());//总伤害：
        }
    }
}