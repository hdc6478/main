namespace game {
    import facade = base.facade;

    export class PreloadMgr {
        /** @internal */ private static _isLoading: boolean = false;
        /** @internal */
        public static get isLoading(): boolean {
            return this._isLoading;
        }

        /** @internal */ private static _isAllComplete: boolean = false;
        /** @internal */
        public static get isAllComplete(): boolean {
            return this._isAllComplete;
        }

        /** @internal */ private static _curPro: number = 0;
        /** @internal */
        public static get curPro(): number {
            return this._curPro;
        }

        /** @internal */ private static _allComplete: () => void;
        /** @internal */ private static LoadingPercent: { [key: string]: { start: number, max: number } } = {
            "cod": {start: 0, max: 30},
            "res": {start: 30, max: 70}
        };

        /** @internal */
        public static startLoad(allComplete?: () => void): void {
            let self = PreloadMgr;
            if (self._isAllComplete) {
                console.info("loading is all complete");
                if (typeof allComplete === "function") {
                    allComplete();
                }
                return;
            }
            if (allComplete) {
                self._allComplete = allComplete;
            }
            if (self._isLoading) {
                return;
            }
            gso.modCls = [];
            self._isAllComplete = false;
            self._isLoading = true;
            self.startLoadCod();
        }

        /** @internal */ private static startLoadCod(): void {
            if (typeof ggo.loadScript === "function") {
                ggo.loadScript(PreloadMgr.onCodPro, PreloadMgr.onCodComp);
            } else {
                console.error("loadScript function undefined");
            }
        }

        /** @internal */ private static onCodPro(p: number): void {
            PreloadMgr.updatePro("cod", p);
        }

        /** @internal */ private static onCodComp(): void {
            let cls = gso.gameCls;
            if (cls) {
                new cls();
                for (let mod of gso.modCls) {
                    new mod();
                }
            }
            gso.gameCls = null;
            gso.modCls.length = 0;
        }

        public static onResPro(p: number): void {
            PreloadMgr.updatePro("res", p);
        }

        public static onResComp(): void {
            let self = PreloadMgr;
            self._isAllComplete = true;
            self._isLoading = false;
            let fn = self._allComplete;
            self._allComplete = null;
            if (typeof fn === "function") {
                fn();
            }
            console.info(("onResComp"))
        }

        /** @internal */ private static updatePro(type: string, p: number): void {
            let obj = this.LoadingPercent[type];
            if (!obj) {
                return;
            }
            let p1 = obj.start + Math.floor(p / 100 * obj.max);
            if (p1 === this._curPro) {
                return;
            }
            this._curPro = p1;
            facade.sendNt(LoginEvent.PRELOAD_PROGRESS);
        }

    }

}