namespace game.scene {

    export class CampName extends BaseName {

        protected onAdded(): void {
            super.onAdded();
            let self = this;
            self.setName()
        }

        /** 设置阵营名*/
        public setName(name?: string) {
            // let scene = this.parent as Scene;
            // let _vo: GPlayerVo = this._actor.vo as GPlayerVo;
            if (name) {
                this.text = name;
            }
            // else if (_vo.camp) {
            //     let _color = SceneTools.getNameColor(_vo, scene.sceneType);
            //     this.text = getLanById(SceneCampName[_vo.camp]);
            //     this.color = _color;
            // }
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
            this._textField.height = value;
        }

        public get width(): number {
            return this._width;
        }

        public set color(color: number) {
            this._textField.textColor = color;
        }

        public set text(value: string) {
            this._textField.text = value;
            this.width = this._textField.textWidth;
        }

        public set width(value: number) {
            this._width = value;
            // let s: ISceneProxy
        }
    }

}