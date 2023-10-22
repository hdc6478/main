namespace game.mod.more {

    import ZhanduiJitanLibaoConfig = game.config.ZhanduiJitanLibaoConfig;
    import LanDef = game.localization.LanDef;

    export class XujieJitanGiftItem extends BaseGiftItemRender {

        data: IXujieJitanGiftItemData;
        private _proxy: XujieJitanProxy;

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XujieJitan);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let needLv = data.cfg.level;
            let color = data.curLv >= needLv ? WhiteColor.GREEN : WhiteColor.RED;
            let str = StringUtil.substitute(getLanById(LanDef.xujiejitan_tips7), [data.cfg.level]) + TextUtil.addColor(`(${data.curLv}/${needLv})`, color);
            this.lb_desc.textFlow = TextUtil.parseHtml(str);

            this.img_bought.visible = data.status == RewardStatus.Draw;
            this.btn_buy.visible = !this.img_bought.visible;
            this.btn_buy.label = data.status == RewardStatus.Finish ? getLanById(LanDef.lingqu) : getLanById(LanDef.goto);
            this.btn_buy.setHint(data.status == RewardStatus.Finish);
            if (data.status == RewardStatus.Finish) {
                this.btn_buy.setYellow();
            } else {
                this.btn_buy.setBlue();
            }

            this._listData.replaceAll(data.cfg.rewards);
        }

        protected onClick() {
            if (!this.data) {
                return;
            }
            if (this.data.status == RewardStatus.Finish) {
                this._proxy.sendJitanButtonClick(ZhanduiOperType.Oper206, this.data.cfg.index);
                return;
            }
            ViewMgr.getIns().back();
        }
    }

    export interface IXujieJitanGiftItemData {
        cfg: ZhanduiJitanLibaoConfig;
        status: RewardStatus;
        curLv: number;
    }
}