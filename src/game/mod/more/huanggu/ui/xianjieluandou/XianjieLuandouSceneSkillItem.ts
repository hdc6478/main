namespace game.mod.more {

    import BuffConfig = game.config.BuffConfig;
    import TimeMgr = base.TimeMgr;

    export class XianjieLuandouSceneSkillItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public img_mark: eui.Image;
        public lab_time: eui.Label;
        public lab_cnt: eui.Label;

        //buff序列_buffid_冷却时间秒_消耗材料_数量
        data: number[];
        private _shape: egret.Shape;
        private _proxy: XianjieLuandouProxy;

        constructor() {
            super();
            this.skinName = `skins.compete.KuafuDoufaSceneSkillItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XianjieLuandou);

            this._shape = new egret.Shape();
            this._shape.x = this.width * 0.5;
            this._shape.y = this.height * 0.5;
            this.addChild(this._shape);

            this.img_mark.mask = this._shape;
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let buffId = data[1];
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
            if (!buffCfg) {
                console.error("buff 表缺少配置 id = " + buffId);
                return;
            }
            this.img_icon.source = buffCfg.icon;
            this.lab_cnt.text = data[4] + '';

            let cdTime = this._proxy.getSkillCd(this.data[0]);
            //限制cd超过配置时间，点击时候后定时器一直存在，可能存在cd超过配置时间
            let leftTime = Math.min(cdTime - TimeMgr.time.serverTimeSecond, this.data[2]);
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
            let cdTime = this._proxy.getSkillCd(this.data[0]);
            let cfgCdTime = this.data[2];
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

        /**
         * 技能列表入口
         */
        public updateSkillItem(): void {
            this.img_icon.source = "kuafu_doufa_skill"; //todo
            this.img_mark.visible = this.lab_time.visible = false;
        }

        public updateCost(cntStr: string): void {
            this.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
        }
    }
}