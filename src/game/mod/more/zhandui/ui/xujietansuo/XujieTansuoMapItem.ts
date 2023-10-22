namespace game.mod.more {


    export class XujieTansuoMapItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public img_gray: eui.Image;
        public img_sel: eui.Image;
        public img_name: eui.Image;
        public bossItem: game.mod.more.XujieTansuoMapItemBoss;
        public teamItem: game.mod.more.XujieTansuoMapItemTeam;

        data: IXujieTansuoMapItemData;
        private _proxy: XujieTansuoProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XujieTansuo);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_sel.visible = data.isSel;
            this.bossItem.visible = data.isSel;
            if (data.isSel) {
                this.bossItem.data = data.type;
            }
            this.img_gray.visible = !data.isAct;

            let topTeam = this._proxy.getRankInfo(1);
            if (!topTeam || topTeam.map_index != data.type) {
                this.teamItem.visible = false;
            } else {
                this.teamItem.visible = true;
                this.teamItem.data = topTeam;
            }
        }
    }

    export interface IXujieTansuoMapItemData {
        type: number;//区域类型
        isSel: boolean;
        isAct: boolean;
    }
}