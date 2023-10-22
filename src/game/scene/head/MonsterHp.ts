namespace game.scene {

    let Event = egret.Event;

    /**
     * 小怪血条
     */
    export class MonsterHp extends PlayerHp {

        protected getHpRes() {
            this.bmpHp.addEventListener(Event.COMPLETE, this.onGetBmpHp, this);
            this.bmpHp.source = "scene_hp_hong";
        }


        protected onGetBmpHp() {
            super.onGetBmpHp();
            this.scale = 0.8;
        }

        protected onGetBmpBg() {
            super.onGetBmpBg();
            this.scale = 0.8;
        }
    }
}
