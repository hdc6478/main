namespace game.scene {
    import battle_value = msg.battle_value;

    export class AddImmuneAct extends BaseAct {

        private _value: battle_value;

        public setData(list: battle_value): void {
            this._value = list;
        }

        protected onStart(): void {
            super.onStart();
            this.eftList();
            this.done();
        }

        private eftList() {
            let self = this;
            if (!self._value) {
                return;
            }
            if (self._actor && self._actor.vo) {
                let e = self._actor;
                let v = self._value;
                let dir = MathUtil.randomDir(e.dir);
                STxtMgr.ins.show(v.value.toString(), e.x, e.y, dir, v.value_type, 0);
            }
        }

        public onRelease(): void {
            this._value = undefined;
            super.onRelease();
        }

    }
}