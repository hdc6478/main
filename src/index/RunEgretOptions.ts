let runEgretOptions: egret.runEgretOptions;

(function (o: egret.runEgretOptions) {
    o.renderMode = "webgl";
    o.audioType = 0;
    o.calculateCanvasScaleFactor = function (context: any): number {
        let r;
        if (gso.isPc) {
            r = 2;
        } else {
            let backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio ||
                1;
            r = (window.devicePixelRatio || 1) / backingStore;
            // alert("window.devicePixelRatio = "+window.devicePixelRatio);
            // alert("backingStore = "+backingStore);
            let w = screen.width;
            let h = screen.height;
            if ((w === 412 && h === 915 && window.devicePixelRatio === 3.5)) {
                r = 720/1280;
            }
        }

        console.info('canvas scale:' + r);
        return r;
    };
})(runEgretOptions || (runEgretOptions = Object.create(null)));