namespace game.mod.more {

    import XianjiebrawlScoreConfig = game.config.XianjiebrawlScoreConfig;
    import LanDef = game.localization.LanDef;

    export class XianjieLuandouScoreRewardItem extends BaseListenerRenderer {
        public lab_desc: eui.Label;
        public list_reward: eui.List;
        public img_not: eui.Image;
        public img_draw: eui.Image;
        public btn_draw: game.mod.Btn;

        private _proxy: XianjieLuandouProxy;
        private _listData: eui.ArrayCollection;
        data: IXianjieLuandouScoreRewardItemData;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
            this._proxy = getProxy(ModName.More, ProxyType.XianjieLuandou);
            this.img_not.visible = false;

            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_draw, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfg = data.cfg;
            this._listData.replaceAll(cfg.award);
            let color = data.myScore >= cfg.scroe ? WhiteColor.GREEN : WhiteColor.RED;
            let str = StringUtil.substitute(getLanById(LanDef.xianjieluandou_tips16), [TextUtil.addColor(cfg.scroe + '', WhiteColor.GREEN)])
                + TextUtil.addColor(`(${data.myScore}/${cfg.scroe})`, color);
            this.lab_desc.textFlow = TextUtil.parseHtml(str);

            if (data.status == RewardStatus.Draw) {
                this.img_draw.visible = true;
                this.img_not.visible = this.btn_draw.visible = false;
            } else if (data.status == RewardStatus.Finish) {
                this.btn_draw.visible = true;
                this.img_draw.visible = this.img_not.visible = false;
                this.btn_draw.label = getLanById(LanDef.lingqu);
                this.btn_draw.setHint(true);
            } else {
                this.img_not.visible = true;
                this.btn_draw.visible = this.img_draw.visible = false;
            }
        }

        protected onClick() {
            let data = this.data;
            if (data && data.status == RewardStatus.Finish) {
                this._proxy.c2s_xianjie_pvp_oper(XianjieLuandouOperType.Oper4, data.cfg.index);
            }
        }
    }

    export interface IXianjieLuandouScoreRewardItemData {
        cfg: XianjiebrawlScoreConfig;
        status: RewardStatus;
        myScore: number;
    }
}