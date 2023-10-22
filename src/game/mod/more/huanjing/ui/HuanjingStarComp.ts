namespace game.mod.more {

    export class HuanjingStarComp extends BaseStageEventItem {
        public starItem0: game.mod.more.HuanjingStarItem;
        public starItem1: game.mod.more.HuanjingStarItem;
        public starItem2: game.mod.more.HuanjingStarItem;
        public starItem3: game.mod.more.HuanjingStarItem;
        public starItem4: game.mod.more.HuanjingStarItem;
        public img_line: eui.Image;

        private _proxy: HuanjingProxy;
        private _systemId: number;
        private _maxNum = 5;
        private _singleLine = 115;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingStarCompSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Huanjing);
        }

        updateShow(systemId: number): void {
            this._systemId = systemId;

            let posNum = this.getPosNum();
            let linePos = 0;
            for (let i = 1; i <= this._maxNum; i++) {
                let starItem = this[`starItem${i - 1}`];
                starItem.visible = i <= posNum;
                if (starItem.visible) {
                    let star = this.getPosStar(i);
                    starItem.data = {
                        systemId: systemId,
                        pos: i,
                        star: star,
                        showHint: this._proxy.canActOrUpStarPos(systemId, i) //todo
                    };
                    if (star > 0) {
                        linePos = i - 1;
                    }
                }
            }
            this.img_line.width = this._singleLine * linePos;
        }

        //配置的槽位
        private getPosNum(): number {
            let cfg = this._proxy.getHuanjingParamCfg(this._systemId);
            return cfg.star_max_pos;
        }

        private getPosStar(pos: number): number {
            let info = this._proxy.getStarPosData(this._systemId, pos);
            return info && info.star || 0;
        }
    }
}