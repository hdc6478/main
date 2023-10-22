namespace game {

    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Pool = base.Pool;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import Back = base.Back;
    import Rectangle = egret.Rectangle;

    /**
     * 神技飘字
     */
    export class GodSkillEftName extends DisplayObjectContainer {

        private static _ins: GodSkillEftName;

        public static getIns(): GodSkillEftName {
            if (!this._ins) {
                this._ins = new GodSkillEftName();
            }
            return this._ins;
        }

        public show(idx: number) {
            let _skill: GodSkillEftNameItem = Pool.alloc(GodSkillEftNameItem);
            _skill.show(idx);
        }
    }

    export class GodSkillEftNameItem extends DisplayObjectContainer {

        private img_godBg: BitmapBase;
        private img_godName: BitmapBase;

        constructor() {
            super();
            this.y = 263;
            this.width = 290;
            this.height = 172;
            this.touchEnabled = false;
            this.touchChildren = false;

            this.img_godBg = Pool.alloc(BitmapBase);
            this.addChild(this.img_godBg);

            this.img_godName = Pool.alloc(BitmapBase);
            this.img_godName.y = 86;
            this.img_godName.anchorOffsetX = 100;
            this.img_godName.anchorOffsetY = 64;
            this.addChild(this.img_godName);
        }

        public show(idx: number): void {
            this.x = (Layer.main.width - 372) / 2 + 187;
            Layer.main.addChild(this);

            this.img_godBg.source = ResUtil.getSkillEffectSrc("jinengdi2");
            this.img_godBg.mask = Pool.alloc(Rectangle).setTo(0, 0, 0, 255);
            this.img_godBg.alpha = 1;
            this.img_godBg.x = 0;

            Tween.get(this.img_godBg.mask)
                .to({width: 450}, 200);

            Tween.get(this.img_godBg)
                .delay(800)
                .to({x: -20, alpha: 0}, 1200);

            this.img_godName.source = ResUtil.getSkillEffectSrc("jineng_" + idx);
            this.img_godName.scaleX = 6;
            this.img_godName.scaleY = 6;
            this.img_godName.alpha = 0;
            this.img_godName.x = 145;

            Tween.get(this.img_godName)
                .delay(200)
                .to({scaleX: 1, scaleY: 1, alpha: 1}, 200, null, Back.easeOut)
                .delay(400)
                .to({x: 245, alpha: 0}, 1200)
                .delay(100)
                .exec(Handler.alloc(this, this.hideGSShow));
        }

        private hideGSShow(): void {
            this.img_godBg.source = null;
            this.img_godName.source = null;
            Pool.release(this.img_godBg.mask);
            this.img_godBg.mask = null;
            if (this.parent) {
                this.parent.removeChild(this);
            }
            Pool.release(this);
        }
    }
}