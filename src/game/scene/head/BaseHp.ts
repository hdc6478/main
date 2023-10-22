namespace game.scene {
    import Pool = base.Pool;
    import Texture = egret.Texture;
    import BitmapFillMode = egret.BitmapFillMode;
    import ParamConfig = game.config.ParamConfig;

    export class BaseHp extends BaseDraw {
        protected bmpBg: BitmapBase;
        protected bmpHp: BitmapBase;
        protected bmpGrid: BitmapBase[] = [];
        protected gridTexture: Texture;

        private _width: number;
        private _height: number;
        private _hpWidth: number;

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
            this.bmpBg.width = value;
            this.bmpHp.width = value;
        }

        public set hpWidth(value: number) {
            this._hpWidth = value;
            this.bmpHp.x = (this._width - this._hpWidth) * 0.5;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
            this.bmpBg.y = (value - 14) * 0.5;
        }

        protected initDsp(): void {
            super.initDsp();
            let self = this;
            self.bmpBg = <BitmapBase>self.dsp.addChild(Pool.alloc(BitmapBase));
            self.bmpHp = <BitmapBase>self.dsp.addChild(Pool.alloc(BitmapBase));
            self.bmpHp.fillMode = BitmapFillMode.REPEAT;
        }


        // protected onGetBmpBg(tex: Texture) {
        //     this.bmpBg.texture = tex;
        // }
        //
        // protected onGetBmpHp(tex: Texture) {
        //     this.bmpHp.texture = tex;
        // }

        protected onGetBmpGrid(tex: Texture) {
            this.gridTexture = tex;
            let y = (this.height - 12) * 0.5;
            if (this.bmpGrid && this.bmpGrid.length) {
                for (let i = 0, len = this.bmpGrid.length; i < len; i++) {
                    let bmp = this.bmpGrid[i];
                    bmp.texture = this.gridTexture;
                    bmp.y = y;
                }
            }
        }

        public setHp(hp: number): void {
            this.bmpHp.width = Math.floor(hp * this._hpWidth / 10000);
        }

        public setGridHp(maxHp: Long) {
            let self = this;
            self.clearBmpGrid();
            let cnf: ParamConfig = getConfigByNameId(ConfigName.Param, "role_hp");
            let hpArr:number[] = cnf.value; //[500000,2000000,5000000,10000000,30000000,60000000,100000000];
            let len:number = 0;
            let maxNum:number = maxHp.toNumber();
            if (maxNum <= hpArr[0]) {
                len = 3;
            } else if(maxNum > hpArr[0] && maxNum <= hpArr[1]) {
                len = 4;
            } else if(maxNum > hpArr[1] && maxNum <= hpArr[2]) {
                len = 5;
            } else if(maxNum > hpArr[2] && maxNum <= hpArr[3]) {
                len = 6;
            } else if(maxNum > hpArr[3] && maxNum <= hpArr[4]) {
                len = 7;
            } else if(maxNum > hpArr[4] && maxNum <= hpArr[5]) {
                len = 8;
            } else if(maxNum > hpArr[5] && maxNum <= hpArr[6]) {
                len = 9;
            } else {
                len = 10;
            }

            // let oneGrid: number = cnf.value;
            // let num: number = maxHp.div((oneGrid / 10)).toNumber();//获取有多少格子*10
            // let len = Math.round(num / 10);//获取有多少格子
            let oneWidth = Math.max(Math.round(self._hpWidth / len), 3);//最少3px
            let y = (self.height - (self.bmpHp.height || 12)) * 0.5;
            for (let i = 1; i < len; i++) {
                let width = i * oneWidth;
                if (width > self._hpWidth) continue;
                let bmp = Pool.alloc(BitmapBase);
                bmp.x = width;
                bmp.y = y;
                if (self.gridTexture) bmp.texture = self.gridTexture;
                self.bmpGrid.push(bmp);
                self.dsp.addChild(bmp);
            }
        }

        private clearBmpGrid() {
            let self = this;
            if (self.bmpGrid && self.bmpGrid.length) {
                for (let i = 0, len = self.bmpGrid.length; i < len; i++) {
                    let bmp = self.bmpGrid[i];
                    bmp.texture = null;
                    Pool.release(bmp);
                }
                self.bmpGrid.length = 0;
            }
        }

        public onRelease(): void {
            super.onRelease();
            let self = this;
            self.bmpBg.source = null;
            self.bmpHp.source = null;
            self.gridTexture = null;
            self.scale = 1;
            self.clearBmpGrid();
        }
    }
}
