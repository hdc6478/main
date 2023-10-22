namespace game {
    import Bitmap = egret.Bitmap;
    import PoolObject = base.PoolObject;
    import Texture = egret.Texture;
    import Event = egret.Event;
    import Handler = base.Handler;

    export class BitmapBase extends Bitmap implements PoolObject {
        /** @internal */ private _source: string | Texture;
        /** @internal */ private _oldStr: string;
        public keepOnRem: boolean = false;

        constructor(value?: Texture) {
            super(value);
        }

        /** @internal */
        $onAddToStage(stage: egret.Stage, nestLevel: number): void {
            super.$onAddToStage(stage, nestLevel);
            let self = this;
            if (self.keepOnRem) {
                return;
            }
            if (self._oldStr) {
                if (!self._source) {
                    self.source = self._oldStr;
                }
                self._oldStr = null;
            }
        }

        /** @internal */
        $onRemoveFromStage(): void {
            super.$onRemoveFromStage();
            let self = this;
            if (self.keepOnRem) {
                return;
            }
            if (typeof self._source === "string") {
                self._oldStr = self._source;
                self.source = null;
            }
        }

        /**
         * 设置显示内容，支持贴图地址，贴图对象
         */
        public set source(value: string | Texture) {
            let self = this;
            if (value === self._source) {
                if (self.texture) {
                    self.dispatchEventWith(Event.COMPLETE);
                    self.onLoaded();
                }
                return;
            }
            if (typeof value === "string") {
                self.removeCur();
                self._source = value;
                AssetsMgr.ins.addRef(self._source);
                AssetsMgr.ins.getResAsync(value, Handler.alloc(self, self.onComplete));
                return;
            }
            self.removeCur();
            self._source = value;
            self.texture = <Texture>value;
        }

        public get source(): string | Texture {
            return this._source;
        }

        /** @internal */ private removeCur(): void {
            let self = this;
            self.texture = null;
            if (typeof self._source === "string") {
                AssetsMgr.ins.decRef(self._source);
            }
            self._source = null;
        }

        /** @internal */ private onComplete(r: Texture, url: string): void {
            let self = this;
            if (self._source !== url) {
                return;
            }
            self.texture = r;
            self.dispatchEventWith(Event.COMPLETE);
            self.onLoaded();
        }

        protected onLoaded(): void {
        }

        public removeFromParent(): void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public verCenter(): void {
            let p = this.parent;
            if (p) {
                this.y = (p.height - this.height) * 0.5;
            }
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            let self = this;
            self.x = self.y = 0;
            self.scaleX = self.scaleY = self.alpha = 1;
            self.anchorOffsetX = self.anchorOffsetY = 0;
            self.width = self.height = NaN;
            self.removeCur();
            self.removeFromParent();
            self._oldStr = null;
        }

    }
}
