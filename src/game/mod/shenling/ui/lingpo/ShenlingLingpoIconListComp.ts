namespace game.mod.shenling {

    export class ShenlingLingpoIconListComp extends eui.Component {
        public icon0: game.mod.shenling.ShenlingLingpoIcon;
        public icon1: game.mod.shenling.ShenlingLingpoIcon;
        public icon2: game.mod.shenling.ShenlingLingpoIcon;
        public icon3: game.mod.shenling.ShenlingLingpoIcon;
        public icon4: game.mod.shenling.ShenlingLingpoIcon;
        public icon5: game.mod.shenling.ShenlingLingpoIcon;
        public icon6: game.mod.shenling.ShenlingLingpoIcon;
        public icon7: game.mod.shenling.ShenlingLingpoIcon;

        private _proxy: ShenlingLingpoProxy;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingLingpoIconListSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this._proxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingpo);
        }

        /**
         * @param type 神灵类型
         * @param id 灵魄id
         */
        public updateView(type: ShenLingType, id: number): void {
            let cfg = this._proxy.getConfig(id, 1);
            if (!cfg) {
                return;
            }
            for (let i = 0; i < cfg.cost.length; i++) {
                this.updateIcon(id, i + 1, cfg.cost[i][0]);
            }
        }

        private updateIcon(id: number, idx: number, index: number): void {
            let info = this._proxy.getIconInfo(id, idx);
            let level = info ? info.level : 0;
            let data: IShenlingLingpoIconData = {
                id,
                level,
                hint: this._proxy.getIconHint(id, idx),
                index,
                idx
            };
            this[`icon${idx - 1}`].data = data;
        }
    }
}