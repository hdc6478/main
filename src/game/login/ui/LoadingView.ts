/** @internal */namespace game.login {
    import UIComponent = uilib.UIComponent;
    import Pool = base.Pool;

    export class LoadingView extends UIComponent {
        public imgBar: BitmapBase;
        public imgPt: BitmapBase;

        public imgSingleBar: BitmapBase;

        constructor() {
            super();
        }


        protected _setup(): void {
            this.width = 720;
            this.height = 1280;


            let img: BitmapBase = Pool.alloc(BitmapBase);

            if (gzyyou.sdk.checkCanPay && !gzyyou.sdk.checkCanPay()){

            }else {

                let res = "assets/loading/3.png";
                if (typeof gso.bgImg === "object" && gso.bgImg["3"]) {
                    res = gso.bgImg["3"];
                }

                // if(gso.isWeixin){
                //     res = "https://cdnsrcex-ljtx.1y-game.com/assets/loading/wx3.png";
                // }else if(gso.isFuyaoWeixin || gso.isWanjianShouq) {
                //     res = "https://cdnsrcex-ljtx.1y-game.com/assets/loading/3.png";
                // }else if(gso.isShouq) {
                //     res = "https://cdnsrcex-ljtx.1y-game.com/assets/loading/shouq3.png";
                // }
                // img.source =  res;
                // img.x = 0;
                // img.y = 550;
                // this.addChild(img);

                let self = this;
                let imgLoader = new egret.ImageLoader();
                imgLoader.crossOrigin = "anonymous";// 跨域请求
                imgLoader.load(res);
                imgLoader.once(egret.Event.COMPLETE, function (evt: egret.Event) {
                    if (evt.currentTarget.data) {
                        let texture = new egret.Texture();
                        texture.bitmapData = evt.currentTarget.data;
                        let bitmap = new egret.Bitmap(texture);
                        bitmap.y = 750;
                        self.addChild(bitmap);
                    }
                }, this);
            }

            img = Pool.alloc(BitmapBase);
            img.source = "assets/game_bg/prog_bg.png";
            img.x = 34;
            img.y = 1070;
            this.addChild(img);

            img = this.imgBar = Pool.alloc(BitmapBase);
            img.source = "assets/game_bg/prog_top.png";
            img.width = 488;
            img.height = 7;
            img.x = 116;
            img.y = 1123;
            this.addChild(img);

            img = this.imgSingleBar = Pool.alloc(BitmapBase);
            img.source = "assets/game_bg/prog_bottom.png";
            img.x = 73;
            img.y = 1152;
            img.width = 574;
            img.height = 13;
            this.addChild(img);

            img = this.imgPt = Pool.alloc(BitmapBase);
            img.source = "assets/game_bg/loading_point.png";
            img.x = this.imgBar.x - 30;
            img.y = this.imgBar.y - 16;
            img.width = 59;
            img.height = 54;
            this.addChild(img);

            img = Pool.alloc(BitmapBase);
            img.source = "assets/game_bg/prog_bg_top.png";
            img.x = 39;
            img.y = 1072;
            this.addChild(img);
        }

    }
}