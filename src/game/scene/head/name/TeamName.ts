namespace game.scene {

    import Pool = base.Pool;
    import TextField = egret.TextField;

    export class TeamName extends BaseDraw {
        protected _textField: TextField;
        protected _actor: BaseActor;//_headMdr父容器 实体类
        protected _headMdr: HeadMgr;//name父容器 头部Mdr
        private _iconBmp: BitmapBase;
        private _width: number;
        private _height: number;

        private readonly imgSize = 37;

        protected initDsp(): void {
            super.initDsp();
            let self = this;
            self._textField = new TextField();
            // self._textField.verticalAlign = VerticalAlign.MIDDLE;
            self._textField.size = 20;
            self._textField.textColor = BlackColor.YELLOW;
            self._textField.x = self.imgSize;
            self._textField.y = (self.imgSize - self._textField.size) / 2;
            self.height = self.imgSize + 2;
            self.dsp.addChild(self._textField);
        }

        protected onAdded(): void {
            super.onAdded();
            let self = this;
            self._headMdr = self.parent as HeadMgr;
            self._actor = self._headMdr.parent as BaseActor;
            self.setName()
        }

        /**
         * 队伍/战盟名
         */
        public setName(name?: string) {
            let scene = this.parent as Scene;
            let _vo: GPlayerVo = this._actor.vo as GPlayerVo;
            if (DEBUG) {
                this.text = name;
                return;
            }
            // if (_vo.guild_team_id && !_vo.guild_team_id.isZero()) {
            //     // let _color = SceneTools.isEnemy(_vo, scene.sceneType) ? UIColor.RED : UIColor.WHITE;
            //     this.text = `<S${_vo.server_id}.${_vo.guild_team_name}>`;
            //     // this.color = _color;
            //     this.setGuildIcon("guildIcon_" + _vo.guild_team_badge_no);
            // }
        }

        public setGuildIcon(src: string): void {
            let self = this;
            if (!self._iconBmp) {
                self._iconBmp = self.dsp.addChild(Pool.alloc(BitmapBase)) as BitmapBase;
                self._iconBmp.y = 0;
                self._iconBmp.x = 0;
                self._iconBmp.width = self._iconBmp.height = self.imgSize;
            }
            self._iconBmp.source = src;
            // LoadMgr.ins.addRef(src);
            // LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoaded), LoadPri.Scene);
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
        }

        public get width(): number {
            return this._width;
        }

        public set color(color: number) {
            this._textField.textColor = color;
        }

        public set text(value: string) {
            this._textField.text = value;
            this.width = 74 + this._textField.textWidth;
        }

        public set width(value: number) {
            this._width = value;
        }

        public onRelease(): void {
            if (this._iconBmp) {
                this._iconBmp.parent.removeChild(this._iconBmp);
                Pool.release(this._iconBmp);
                this._iconBmp = null;
            }
            this._actor = this._headMdr = null;
            this._textField.text = undefined;
            super.onRelease();
        }
    }

}