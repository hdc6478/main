(function (a: WebAudio) {
    function getAudioType(): string {
        const audio = document.createElement("audio");
        if (typeof audio.canPlayType !== "function") {
            return ".mp3"
        }
        const extensions: string[] = ["mp3", "ogg", "m4a"];
        const types: { [key: string]: string } = {"m4a": "mp4"};
        const no = /^no$/;
        for (let ext of extensions) {
            const type = types[ext] || ext;
            const canByExt = audio.canPlayType(`audio/${ext}`).replace(no, "");
            const canByType = audio.canPlayType(`audio/${type}`).replace(no, "");
            if (!!canByExt || !!canByType) {
                return "." + ext;
            }
        }
        return ".mp3";
    }

    let ctx: AudioContext;
    a.resumeAudio = function (cb?: base.Handler): void {
        if (!ctx || typeof ctx.resume !== "function" || ctx.state === "running" || ctx.state ==="closed") {
            if (cb) {
                cb.exec();
            }
            return;
        }
        ctx.resume().then(() => {
            if (cb) {
                cb.exec();
            }
        });
    };
    a.initAudio = function (onInit: base.Handler): void {
        let audioType = getAudioType();
        let web: any = (<any>egret).web;
        if (!web || !web.WebAudioDecode || !web.WebAudioDecode.ctx) {
            onInit.exec(audioType);
            return;
        }
        ctx = web.WebAudioDecode.ctx;
        if (ctx.state === "running") {
            onInit.exec(audioType);
            return;
        }

        function onCtxStateChange() {
            if (ctx.state === "running") {
                gso.gameStage.removeEventListener(egret.TouchEvent.TOUCH_TAP, onTapStage, null);
                onInit.exec(audioType);
            }
        }

        function onTapStage(): void {
            let source = ctx.createBufferSource();
            source.buffer = ctx.createBuffer(1, 1, 22050);
            source.connect(ctx.destination);
            a.resumeAudio();
        }

        ctx.onstatechange = onCtxStateChange;
        gso.gameStage.addEventListener(egret.TouchEvent.TOUCH_TAP, onTapStage, null);
    }
})(typeof webAudio === "undefined" ? ((<any>window).webAudio = Object.create(null)) : webAudio);