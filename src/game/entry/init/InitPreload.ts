namespace game {
    import Handler = base.Handler;
    import Pool = base.Pool;

    export class InitPreload {
        //private static groupList: string[] = ["common_main"];
        private static groupList: string[] = [];

        private static preloadList: string[] = [];

        public static getNum(handler: Handler): void {
            let self = this;
            self.init();
            let preloadGroups = self.groupList;
            let cnt: number = 0;
            for (let i: number = 0, n: number = preloadGroups.length; i < n; i++) {
                cnt += AssetsMgr.ins.getGroup(preloadGroups[i]).length;
            }
            cnt += this.preloadList.length;
            handler.exec(cnt);
            Pool.release(handler);
        }

        private static init(): void {
            // if (gso.isNew && gso.jzsj_channel != CHANNEL_NAME.SHOUQ) {
            //     this.preloadList[this.preloadList.length] = "assets/anim/effect/xinshou_luojian.png";
            //     this.preloadList[this.preloadList.length] = "assets/anim/effect/chuansong.png";
            //     this.preloadList[this.preloadList.length] = "assets/anim/effect/boss_enter.png";
            //     this.preloadList[this.preloadList.length] = "assets/anim/effect/luojian_xie.png";
            // }
        }

        public static load(): void {
            let self = this;
            let list = self.groupList;
            let n: number = list.length;
            for (let i: number = 0; i < n; i++) {
                AssetsMgr.ins.loadGroup(list[i],
                    Handler.alloc(self, (group: string): void => undefined),
                    Handler.alloc(self, (name: string, url: string, loaded: number, total: number) => resLoaded())
                );
            }
            if (self.preloadList.length) {
                LoadMgr.ins.loadGroup(this.preloadList,
                    Handler.alloc(self, (group: string): void => undefined),
                    LoadPri.Init,
                    Handler.alloc(self, (name: string, url: string, loaded: number, total: number) => resLoaded())
                );
            }
        }

    }

}
