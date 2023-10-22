namespace game.mod.jiban {

    export class JibanProxy extends ProxyBase {
        private _model: JibanModel;

        initialize(): void {
            super.initialize();
            this._model = new JibanModel();

            //this.onProto(s2c_spirit_pet_array_info, this.setMatrixInfo, this);
        }

        // private s2c_faerie_info(n: GameNT) {
        //     let msg: s2c_faerie_info = n.body;
        // }

        // public c2s_faerie_info() {
        //     let msg = new c2s_faerie_info();
        //     this.sendProto(msg);
        // }

        public get headType(): number {
            return this._model.headType;
        }
        public set headType(index: number) {
            this._model.headType = index;
        }
    }
}