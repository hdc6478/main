namespace game.mod.jiban {

    import ShenlingJibanConfig = game.config.ShenlingJibanConfig;
    import LanDef = game.localization.LanDef;

    export class ShenLingJiBanAwardItem extends BaseListenerRenderer {
        public lb_desc: eui.Label;
        public list_reward: eui.List;
        public btn_get: game.mod.Btn;
        public img_statue: eui.Image;
        public lb_cond: eui.Label;

        public data: IShenLingJiBanAwardItemData;
        private _listData: eui.ArrayCollection;
        private _proxy: IShenLingProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_get, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this._listData.removeAll();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.btn_get.visible = data.status == 1;
            this.btn_get.visible && this.btn_get.setHint(true);
            this.img_statue.visible = !this.btn_get.visible;
            this.img_statue.source = data.status == 0 ? 'hongseweiwancheng' : 'lvseyilingqu';

            let str = TextUtil.addColor(`(${data.jiBanLv}/${this.itemIndex + 1})`, data.jiBanLv >= this.itemIndex + 1 ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_cond.textFlow = TextUtil.parseHtml(str);
            this.lb_desc.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.shenling_tips6), [TextUtil.addColor((this.itemIndex + 1) + '', WhiteColor.GREEN)]));
            this._listData.replaceAll(data.cfg.prop);
        }

        private onClick(): void {
            let data = this.data;
            if (data.status == 1) {
                this._proxy.c2s_god_brother_groupup(data.index, [this.itemIndex + 1], null);
            }
        }
    }

    /**神灵羁绊奖励列表item类*/
    export interface IShenLingJiBanAwardItemData {
        index: number;              //神灵羁绊表jibanid字段
        cfg: ShenlingJibanConfig;   //神灵羁绊配置
        status: number;             //0未达标，1可领取，2已领取
        jiBanLv: number;            //羁绊等级
    }
}