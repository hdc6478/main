namespace game.scene {
    import Pool = base.Pool;
    import Tween = base.Tween;
    import Handler = base.Handler;

    export class CloudEffect extends BaseEnterEffect {

        private _imgs: BitmapBase[] = [];
        private static _ins: CloudEffect;

        public static getIns(onComplete: Handler): CloudEffect {
            let self = this;
            if (!self._ins) {
                self._ins = new CloudEffect(onComplete);
            }
            return self._ins;
        }

        public start(): void {
            super.start();
            let parent = Layer.tip;


            let sw = gso.gameStage.stageWidth;
            let sh = gso.gameStage.stageHeight;
            let isFullScene: boolean = sw >= 1700;

            let imgW = isFullScene ? 1206 * sw / gso.contentWidth : 680 * 2.5 * sw / gso.contentWidth;
            let imgH = isFullScene ? gso.contentHeight : 864 * 2.5 * sh / gso.contentHeight;

            let imgSrc = isFullScene ? "scene_cloud2" : "scene_cloud";

            let leftX = -(imgW + parent.x);
            let rightX = sw - parent.x;

            let img = Pool.alloc(BitmapBase);
            img.source = ResUtil.getUiPng(imgSrc);
            img.width = imgW;
            img.height = imgH;
            img.y = (sh - img.height) * 0.5;
            img.x = leftX;
            parent.addChild(img);
            this._imgs.push(img);

            let hideTime = isFullScene ? 1000 : 1500;
            let moveDis = sw + 100;
            let showTime = isFullScene ? 700 : 200;
            Tween.get(img).to({x: leftX + moveDis}, showTime).to({x: rightX}, hideTime).exec(Handler.alloc(this, this.step, [EnterEffectStep.ANIM]));

            img = Pool.alloc(BitmapBase);
            img.source = ResUtil.getUiPng(imgSrc);
            img.width = imgW;
            img.height = imgH;
            img.y = (sh - img.height) * 0.5;

            img.x = rightX;
            parent.addChild(img);
            this._imgs.push(img);

            Tween.get(img).to({x: rightX - moveDis}, showTime).to({x: leftX}, hideTime);
        }

        public stop(callComplete: boolean = false): void {
            while (this._imgs.length) {
                let img = this._imgs[0];
                if (img) {
                    Tween.remove(img);
                    if (img.parent) {
                        img.parent.removeChild(img);
                    }
                }
                ArrayUtil.removeAt(this._imgs, 0);
                Pool.release(img);
            }
            super.stop(callComplete);
        }
    }
}
