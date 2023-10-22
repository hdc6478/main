namespace game {

    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Pool = base.Pool;
    import Handler = base.Handler;
    import delayCall = base.delayCall;
    import Tween = base.Tween;

    export class CloudEffectCtr extends DisplayObjectContainer {

        private static _ins: CloudEffectCtr;

        public static ins(): CloudEffectCtr {
            if (this._ins == null) {
                this._ins = new CloudEffectCtr();
            }
            return this._ins;
        }

        private img_bg0: BitmapBase;
        private img_bg1: BitmapBase;
        private _isTween: boolean;
        private _endHandle: Handler;
        private _handle: Handler;

        constructor() {
            super();
            let _self = this;
            _self.touchEnabled = false;
            _self.touchChildren = false;

            _self.img_bg0 = Pool.alloc(BitmapBase);
            _self.img_bg0.touchEnabled = false;
            _self.addChild(this.img_bg0);

            _self.img_bg1 = Pool.alloc(BitmapBase);
            _self.img_bg1.touchEnabled = false;
            _self.addChild(this.img_bg1);

            _self.img_bg0.source = _self.img_bg1.source = ResUtil.getUiPng("scene_cloud");
        }

        public show(src: string = "scene_cloud", _handler: Handler = null, _endHandler: Handler = null) {
            let _self = this;
            if (_self._isTween) {
                if (_handler) {
                    _handler.exec();
                }
                _handler = null;
                return;
            }
            _self._isTween = true;
            _self._endHandle = _endHandler;
            _self._handle = _handler;

            // _self.img_bg0.source = _self.img_bg1.source = ResUtil.getUiPng(src);

            let sw = _self.width = gso.gameStage.stageWidth;
            let sh = _self.height = gso.gameStage.stageHeight;

            let _scale = sw / 640;
            let imgW = _self.img_bg0.width = _self.img_bg1.width = 868 * 2.5 * _scale;//isFullScene ? 1206 * sw / yyClientGso.contentWidth : 680 * 2.5 * sw / yyClientGso.contentWidth;
            let imgH = _self.img_bg0.height = _self.img_bg1.height = 1136 * 2.5 * _scale;//isFullScene ? yyClientGso.contentHeight : 864 * 2.5 * sh / yyClientGso.contentHeight;

            _self.x = -Layer.tip.x;
            _self.img_bg0.x = -imgW * 0.8;
            _self.img_bg1.x = sw - imgW * 0.4;
            _self.img_bg0.y = _self.img_bg1.y = (sh - imgH) * 0.5;
            Layer.tip.addChild(_self);

            let showTime = 800;
            let hideTime = 800;
            Tween.get(_self.img_bg0)
                .to({x: -imgW * 0.6}, showTime)
                .to({x: sw}, hideTime);

            Tween.get(_self.img_bg1)
                .to({x: sw - imgW * 0.6}, showTime)
                .to({x: -imgW}, hideTime)
                .exec(Handler.alloc(_self, _self.hideCloudEftShow));

            if (_self._handle) {
                delayCall(_self._handle, showTime);
            }
        }

        private hideCloudEftShow(): void {
            let _self = this;
            // _self.img_bg0.source = null;
            // _self.img_bg1.source = null;
            if (_self.parent) {
                _self.parent.removeChild(_self);
            }
            _self._isTween = false;
            if (_self._endHandle) _self._endHandle.exec();
        }

        public isCloudEfting(): boolean {
            return this._isTween;
        }
    }

}