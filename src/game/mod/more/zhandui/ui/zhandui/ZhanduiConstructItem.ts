namespace game.mod.more {

    import ZhanduiDengjiConfig = game.config.ZhanduiDengjiConfig;
    import LanDef = game.localization.LanDef;
    import ZhanduiQizhiConfig = game.config.ZhanduiQizhiConfig;

    export class ZhanduiConstructItem extends BaseListenerRenderer {
        public list: eui.List;
        public vBar: game.mod.VProgressBar;
        public lb_val: eui.Label;

        data: IZhanduiConstructItemData;
        private _listData: eui.ArrayCollection;
        private _proxy: ZhanduiProxy;

        constructor() {
            super();
            this.skinName = `skins.more.ZhanduiConstructItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Zhandui);
            this.list.itemRenderer = ZhanduiConstructBtn;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.list, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            this.lb_val.text = data.cfg.level + getLanById(LanDef.lv);
            this.vBar.setData(data.vBarData);

            let list: IZhanduiConstructBtnData[] = [];
            if (data.cfg.gain_id) {
                for (let gainId of data.cfg.gain_id) {
                    if (gainId) {
                        list.push({
                            gainId: gainId
                        });
                    }
                }
            }
            let specialGain = data.cfg.special_gain || [];
            if (specialGain[0]) {
                list.push({
                    bonus: specialGain[0]
                });
            }
            if (specialGain[1]) {
                list.push({
                    flag: specialGain[1]
                });
            }
            this._listData.replaceAll(list);
        }

        private onClick(): void {
            let data: IZhanduiConstructBtnData = this.list.selectedItem;
            if (!data) {
                return;
            }
            if (data.gainId) {
                ViewMgr.getIns().showViewByID(data.gainId);
                return;
            }
            let teamLv = this._proxy.team_level;
            let lv: number = data.bonus;
            if (data.flag) {
                let cfg: ZhanduiQizhiConfig = getConfigByNameId(ConfigName.ZhanduiQizhi, data.flag);
                lv = cfg.cond || 0;
            }
            if (lv <= teamLv) {
                PromptBox.getIns().show(`已解锁`);
            } else {
                PromptBox.getIns().show(`未解锁`);
            }
        }
    }

    export interface IZhanduiConstructItemData {
        cfg: ZhanduiDengjiConfig;
        vBarData: VProgressData;
    }
}