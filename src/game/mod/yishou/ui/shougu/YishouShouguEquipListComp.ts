namespace game.mod.yishou {


    export class YishouShouguEquipListComp extends eui.Component {
        public icon0: game.mod.yishou.YishouEquipIcon;
        public icon1: game.mod.yishou.YishouEquipIcon;
        public icon2: game.mod.yishou.YishouEquipIcon;
        public icon3: game.mod.yishou.YishouEquipIcon;
        public icon4: game.mod.yishou.YishouEquipIcon;
        public icon5: game.mod.yishou.YishouEquipIcon;
        public icon6: game.mod.yishou.YishouEquipIcon;
        public icon7: game.mod.yishou.YishouEquipIcon;

        private _proxy: YishouProxy;

        constructor() {
            super();
            this.skinName = "skins.yishou.ShouguEquipListSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this._proxy = getProxy(ModName.Yishou, ProxyType.Yishou);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        /**更新部位*/
        public updateEquipListView(type: YishouType): void {
            let size = YishouShouguPosAry.length;
            for (let i = 0; i < size; i++) {
                let pos = YishouShouguPosAry[i];
                let equip = this._proxy.getEquipInfo(type, pos);
                let data: IYishouEquipIconData = {
                    index: equip ? equip.index.toNumber() : 0,
                    showHint: this._proxy.canDressByTypeAndPos(type, pos),
                    isActed: !!equip
                };
                this[`icon${i}`].data = data;
            }
        }

    }
}