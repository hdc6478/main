namespace game.mod.shilian {

    import BuffConfig = game.config.BuffConfig;
    import facade = base.facade;
    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import clearDelay = base.clearDelay;

    export class YuanLingBuffItem extends BaseRenderer implements UpdateItem {
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public img_lock: eui.Image;
        public redPoint: eui.Image;

        data: IYuanLingBuffItemData;
        private _proxy: YuanLingProxy;
        private _gr: eui.Group;
        private _shape: egret.Shape;
        private _radius = 0;
        private _delayId = 0;

        constructor() {
            super();
            this.skinName = `skins.common.SkillItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            facade.onNt(ShilianEvent.ON_YUANLING_BUFF_INFO_UPDATE, this.onUpdateInfo, this);
            this._proxy = getProxy(ModName.Shilian, ProxyType.YuanlingFuben);
        }

        protected childrenCreated() {
            super.childrenCreated();
            if (!this._shape) {
                this._shape = new egret.Shape();
                this.addChild(this._shape);
            }
            if (!this._gr) {
                this._gr = new eui.Group();
                this._gr.horizontalCenter = 0;
                this._gr.verticalCenter = 0;
                this.addChild(this._gr);
            }
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            facade.offNt(ShilianEvent.ON_YUANLING_BUFF_INFO_UPDATE, this.onUpdateInfo, this);
            this._delayId && clearDelay(this._delayId);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, data.index);
            if (!buffCfg) {
                return;
            }
            this.img_icon.source = buffCfg.icon;
        }

        private onUpdateInfo(n: GameNT): void {
            let [idx, time] = n.body as number[];
            if (idx && this.itemIndex + 1 != idx) {
                return;
            }
            this.update(TimeMgr.time);
            TimeMgr.addUpdateItem(this, 1000);
            this._shape.x = this.width * 0.5;
            this._shape.y = this.height * 0.5;
            this._radius = this.width * 0.5;
            this.img_lock.mask = this._shape;
        }

        update(time: base.Time) {
            let boughtTime = this._proxy.model.buff_info[this.itemIndex + 1];
            if (!boughtTime) {
                this.setBuyView();
                return;
            }
            let leftTime = boughtTime + this.data.duraTime + this.data.cd - time.serverTimeSecond;
            if (leftTime <= 0) {
                this.setBuyView();
                return;
            }
            this.img_lock.visible = true;
            let font = BmpTextCfg[BmpTextType.CommonPower2];  //todo
            if (time.serverTimeSecond <= boughtTime + this.data.duraTime) {
                if (this._delayId) {
                    return;
                }
                this.clearFont(this._gr);
                this.addBmpFont(this.data.cd + '', font, this._gr, true, 1, true);
                this._delayId = delayCall(Handler.alloc(this, () => {
                    this.drawCircle(360);
                }), 100);
                return;
            }
            this.clearFont(this._gr);
            this.addBmpFont(leftTime + '', font, this._gr, true, 1, true);

            let totalCd = this.data.cd;
            let angle = (totalCd - leftTime) / totalCd * 360;

            // todo 遮罩倒计时
            this.drawCircle(angle);
        }

        private setBuyView(): void {
            TimeMgr.removeUpdateItem(this);
            this.img_lock.visible = false;
            this.clearFont(this._gr);
            this._shape.graphics.clear();
        }

        private drawCircle(angle: number): void {
            let shape = this._shape;
            shape.graphics.clear();
            shape.graphics.beginFill(0xff0000, 0.8);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(0, -this._radius);
            shape.graphics.drawArc(0, 0, this._radius, -90 * Math.PI / 180, -(angle + 90) * Math.PI / 180, false);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
    }

    export interface IYuanLingBuffItemData {
        index: number; //buff index
        duraTime: number,// 持续时间
        cd: number,//冷却时间
    }
}