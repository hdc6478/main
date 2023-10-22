namespace game.mod.compete {


    import DoufaJinengConfig = game.config.DoufaJinengConfig;
    import BuffConfig = game.config.BuffConfig;
    import facade = base.facade;
    import TimeMgr = base.TimeMgr;

    export class KuafuDoufaSceneSkillItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public img_mark: eui.Image;
        public lab_time: eui.Label;
        public lab_cnt: eui.Label;

        public data: DoufaJinengConfig;
        private _proxy: CompeteProxy;
        private _shape: egret.Shape;

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);

            this._shape = new egret.Shape();
            this._shape.x = this.width * 0.5;
            this._shape.y = this.height * 0.5;
            this.addChild(this._shape);

            this.img_mark.mask = this._shape;
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let buffId = this.data.buffid;
            let cfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
            if (!cfg) {
                console.error("buff 表缺少配置 id = " + buffId);
                return;
            }

            this.img_icon.source = cfg.icon;

            this.lab_cnt.text = this.data.cost[1] + "";

            let cdTime = this._proxy.getSkillCd(this.data.index);
            //限制cd超过配置时间，点击时候后定时器一直存在，可能存在cd超过配置时间
            let leftTime = Math.min(cdTime - TimeMgr.time.serverTimeSecond, this.data.cd_time);
            if (leftTime > 0) {
                this.img_mark.visible = true;
                this.lab_time.text = leftTime + '';
                this.changeMask();
            } else {
                this.lab_time.text = '';
                this.img_mark.visible = false;
            }
        }

        //绘制cd动画
        private changeMask(): void {
            let cdTime = this._proxy.getSkillCd(this.data.index);
            let cfgCdTime = this.data.cd_time;
            let leftTime = Math.min(cdTime - TimeMgr.time.serverTimeSecond, cfgCdTime);
            let angle = leftTime / cfgCdTime * 360;
            let radius = this.img_mark.height * 0.5;

            let shape = this._shape;
            shape.graphics.clear();
            shape.graphics.beginFill(0xffffff, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(0, radius);
            shape.graphics.drawArc(0, 0, radius, -90 * Math.PI / 180, (angle - 90) * Math.PI / 180, false);//顺时针绘制
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
    }
}
