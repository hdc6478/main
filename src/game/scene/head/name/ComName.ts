namespace game.scene {


    import ISceneProxy = game.mod.ISceneProxy;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class ComName extends BaseName {

        protected onAdded(): void {
            super.onAdded();
            let self = this;
            self.setName()
        }

        /**
         * 实体名字赋值
         * @param eName 用于调试
         */
        public setName(eName?: string) {
            let _name: string = "";
            let _color: number = 0xffffff;
            if (!eName) {
                let _vo = this._actor.vo;
                if (!_vo) return;
                //旧代码，注释
                // let _sceneProxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                // if (_vo instanceof PetVo) {
                //     let _isEnemy: boolean = SceneTools.isEnemy(_vo);
                //     if (_vo.master_name) {
                //         let _config: any = getConfigById(_vo.index);
                //         if (!_config) return;
                //         let _resType: number = _config.outlook[0];
                //         _name = StringUtil.substitute(getLanById(LanDef.partner), [_vo.master_name, getLanById(PetObjectName[_resType])]);
                //         _color = _vo.isMainPet ? UIColor.GREEN : _isEnemy ? UIColor.RED : UIColor.ORANGE;
                //     } else {
                //         _name = _vo.name;
                //     }
                // } else {
                    _name = this._actor.vo.name;
                    _color = SceneTools.getNameColor(this._actor.vo);
                // }
            } else {
                _name = eName;
            }
            this.text = _name;
            this.color = _color;
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

        public onRelease(): void {
            super.onRelease();
        }
    }
}