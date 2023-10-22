namespace game {
    import Handler = base.Handler;
    import Theme = eui.Theme;
    import Pool = base.Pool;
    import registerImplementation = egret.registerImplementation;

    export class InitTheme {
        private static handlerMap: { [key: string]: Handler } = {};
        private static ThemeRoot: string = "resource/default.thm.json";

        private static getTheme(source: string, onSuccess: Function, onError: Function, thisObject: any): void {
            let self = InitTheme;
            self.handlerMap[source] = Handler.alloc(thisObject, onSuccess);
            if (gso.configList) {
                self.onListLoaded();
                return;
            }
            // LoadMgr.ins.load(source, Handler.alloc(self, self.onLoadOne), LoadPri.Init);
            let list: string[] = LoadMgr.ins.getRes("dist-product/eui/gameEui.json");
            LoadMgr.ins.unload("dist-product/eui/gameEui.json");
            JSONParseClass.setData({});
            for (let f in list) {
                JSONParseClass.setData({[f]: list[f]});
            }
            let h = self.handlerMap[self.ThemeRoot];
            self.handlerMap[self.ThemeRoot] = null;
            delete self.handlerMap[self.ThemeRoot];
            if (h) {
                h.exec(generateEUI2);
                Pool.release(h);
            }
        }

        private static onListLoaded(): void {
            let self = InitTheme;
            let list: string[] = LoadMgr.ins.getRes("euiKeys");
            LoadMgr.ins.unload("euiKeys");
            JSONParseClass.setData({});
            for (let f of list) {
                let cfg = LoadMgr.ins.getRes(f);
                LoadMgr.ins.unload(f);
                JSONParseClass.setData({[f]: cfg});
            }
            let h = self.handlerMap[self.ThemeRoot];
            self.handlerMap[self.ThemeRoot] = null;
            delete self.handlerMap[self.ThemeRoot];
            if (h) {
                h.exec(generateEUI2);
                Pool.release(h);
            }
        }

        private static onLoadOne(data: any, url: string): void {
            let self = InitTheme;
            let h = self.handlerMap[url];
            self.handlerMap[url] = null;
            delete self.handlerMap[url];
            if (h) {
                h.exec(data);
                Pool.release(h);
            }
            if (url !== self.ThemeRoot) {
                resLoaded();
            }
        }

        public static newTheme(): void {
            registerImplementation("eui.IThemeAdapter", {getTheme: this.getTheme});
            new Theme(this.ThemeRoot, gso.gameStage);
        }

        public static getNum(handler: Handler): void {
            let self = this;
            if (gso.configList) {
                handler.exec(0);
                Pool.release(handler);
                return;
            }
            let path = "dist-product/eui/gameEui.json";
            LoadMgr.ins.load(path,
                Handler.alloc(self, (data: any, url: string) => {
                    handler.exec(0);
                    Pool.release(handler);
                }),
                LoadPri.Init);
            // LoadMgr.ins.load(self.ThemeRoot,
            //     Handler.alloc(self, (data: { exmls: string[] }, url: string) => {
            //         handler.exec(data.exmls.length);
            //         Pool.release(handler);
            //     }),
            //     LoadPri.Init);
        }

        public static load(): void {
            if (gso.configList) {
                return;
            }
            this.newTheme();
        }

    }
}
