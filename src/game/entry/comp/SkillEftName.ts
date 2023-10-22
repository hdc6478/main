namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Pool = base.Pool;
    import Rectangle = egret.Rectangle;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import Back = base.Back;

    /**
     * 技能飘字
     */
    export class SkillEftName extends DisplayObjectContainer {

        private static _ins: SkillEftName;

        public static getIns(): SkillEftName {
            if (!this._ins) {
                this._ins = new SkillEftName();
            }
            return this._ins;
        }

        public show(idx: number): void {
            let _skill: SkillEftNameItem = Pool.alloc(SkillEftNameItem);
            _skill.show(idx);
        }
    }

    export class SkillEftNameItem extends DisplayObjectContainer {

        private img_bg: BitmapBase;
        private img_name: BitmapBase;

        constructor() {
            super();
            this.y = 300;
            this.width = 275;
            this.height = 140;
            this.touchEnabled = false;
            this.touchChildren = false;

            this.img_bg = Pool.alloc(BitmapBase);
            this.addChild(this.img_bg);

            this.img_name = Pool.alloc(BitmapBase);
            this.img_name.y = 70;
            this.img_name.anchorOffsetX = 100;
            this.img_name.anchorOffsetY = 64;
            this.addChild(this.img_name);
        }

        public show(idx: number): void {
            this.x = (Layer.main.width - 372) / 2 + 203;
            Layer.main.addChildAt(this, 3);
            if(idx == 123801000){
                //大招
                this.img_bg.source = ResUtil.getSkillEffectSrc("jinengdi3");
            }else{
                this.img_bg.source = ResUtil.getSkillEffectSrc("jinengdi1");
            }
            this.img_bg.mask = Pool.alloc(Rectangle).setTo(0, 0, 0, 143);
            this.img_bg.alpha = 1;
            this.img_bg.x = 0;

            Tween.get(this.img_bg.mask)
                .to({width: 298}, 200);

            Tween.get(this.img_bg)
                .delay(600)
                .to({x: -20, alpha: 0}, 800);

            this.img_name.source = ResUtil.getSkillEffectSrc("jineng_" + idx);
            this.img_name.scaleX = 5;
            this.img_name.scaleY = 5;
            this.img_name.alpha = 0;
            this.img_name.x = 149;

            Tween.get(this.img_name)
                .delay(200)
                .to({scaleX: 1, scaleY: 1, alpha: 1}, 200, null, Back.easeOut)
                .delay(200)
                .to({x: 169, alpha: 0}, 800)
                .delay(300)
                .exec(Handler.alloc(this, this.hideSNShow));
        }

        private hideSNShow(): void {
            this.img_bg.source = null;
            this.img_name.source = null;
            Pool.release(this.img_bg.mask);
            this.img_bg.mask = null;
            if (this.parent) {
                this.parent.removeChild(this);
            }
            Pool.release(this);
        }
    }
}