/** @internal */
namespace uilib {
    import Sprite = egret.Sprite;
    import PoolObject = base.PoolObject;

    export class SpriteBase extends Sprite implements PoolObject {
        public removeFromParent() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public dispose(): void {
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
        }

    }
}