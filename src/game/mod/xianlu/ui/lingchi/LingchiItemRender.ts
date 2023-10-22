namespace game.mod.xianlu {
    import GridConfig = game.config.GridConfig;
    import facade = base.facade;
    import RebirthConfig = game.config.RebirthConfig;
    import LanDef = game.localization.LanDef;
    import ArrayCollection = eui.ArrayCollection;
    import lingpool_type_data = msg.lingpool_type_data;
    import TimeMgr = base.TimeMgr;
    import ParamConfig = game.config.ParamConfig;
    import TouchEvent = egret.TouchEvent;
    import Tween = base.Tween;
    import Handler = base.Handler;

    export class LingchiItemRender extends BaseListenerRenderer {
        private img_bg: eui.Image;
        private img_type: eui.Image;
        public timeItem: game.mod.TimeItem;
        public grp_icon: eui.Group;
        public img_icon: eui.Image;
        private img_icon2: eui.Image;
        private lab_lv: eui.Label;
        private lab_cnt: eui.Label;
        private lab_desc: eui.Label;
        private grp_item: eui.Group;
        private list_item: eui.List;
        private redPoint: eui.Image;

        public data: GridConfig;//灵池配置
        private _proxy: XianluProxy;
        private _itemList: ArrayCollection;
        private _isOpen: boolean;
        private _info: lingpool_type_data;
        private _openStr: string;
        private _posY: number = -13;
        private _iconY1: number = 47;
        private _iconY2: number = 190;

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Xianlu).retProxy(ProxyType.Xianlu);
            this._itemList = new ArrayCollection();
            this.list_item.itemRenderer = LingchiShenlingHeadRender;
            this.list_item.dataProvider = this._itemList;
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let type = cfg.index;
            this.currentState = type == 1 ? "big" : "default";
            this.img_type.source = "lingchi_type" + type;
            this._isOpen = this._proxy.isPoolOpen(cfg);
            this.img_bg.source = this._isOpen ? "lingchi_icon" : "lingchi_icon_hui";

            let desc = "";
            let lv = 0;
            if(this._isOpen){
                this.grp_item.visible = true;
                this._info = this._proxy.getPoolInfo(type);
                lv = this._info.level;
                let infos = this._proxy.getPoolGridInfos(type);
                this._itemList.source = infos;
                let poolCfg = this._proxy.getPoolCfg(type, 1);
                let propId = poolCfg && poolCfg.output ? poolCfg.output[0][0] : PropIndex.Shenlingjinghua;
                let propCfg = GameConfig.getPropConfigById(propId);
                this.img_icon.source = this.img_icon2.source = propCfg.icon;

                let allGain = this._proxy.calcPoolAllGain(this._info);
                this.lab_cnt.text = allGain + "";
                this.grp_icon.visible = allGain > 0;
                if(this.grp_icon.visible){
                    this.playTween();
                }

                let addNum = this._proxy.calcPoolAdd(this._info) / 100;
                desc = TextUtil.addColor(getLanById(LanDef.shouyi_tips) + "+" + addNum + "%", WhiteColor.GREEN);

                this.redPoint.visible = this._proxy.getPoolHint(this._info);
            }
            else {
                //未开启
                this.grp_icon.visible = this.timeItem.visible = this.grp_item.visible = false;
                let limitIndex = cfg.pool_condition;
                let limitCfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, limitIndex);
                let limitLv = limitCfg.relv;
                let curCfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, this._proxy.model.index);
                let curLv = curCfg.relv;
                let openStr = getLanById(LanDef.xiuxian_tips) + limitLv + getLanById(LanDef.tishi_43);
                desc = TextUtil.addColor(openStr + "(" + curLv + "/" + limitLv + ")", UIColor.RED);
                this._openStr = openStr + getLanById(LanDef.boss_cue5);
                this.redPoint.visible = false;
            }
            this.lab_desc.textFlow = TextUtil.parseHtml(desc);
            this.lab_lv.text = lv + "";
        }

        public updateTime(): void {
            if(!this.data){
                return;
            }
            if(!this._isOpen){
                return;
            }
            let nextTime = this.getPoolNextTime();
            if(!nextTime){
                this.timeItem.visible = false;
            }
            else {
                this.timeItem.visible = true;
                this.timeItem.updateLeftTime(nextTime);
            }
        }

        private getPoolNextTime(): number {
            let startTime = this._info.opentime;
            let pCfg1: ParamConfig = GameConfig.getParamConfigById("lingchi_limit");
            let maxTime = pCfg1.value;
            let leftTime = startTime + maxTime - TimeMgr.time.serverTimeSecond;
            if(leftTime <= 0){
                return 0;
            }
            let pCfg2: ParamConfig = GameConfig.getParamConfigById("lingchi_once");
            let perTime = pCfg2.value;
            let nextTime = leftTime % perTime;
            if(nextTime == 0){
                facade.sendNt(XianluEvent.LINGCHI_TIME_UPDATE);
            }
            return nextTime;
        }

        private onClick(): void {
            if(!this._isOpen){
                PromptBox.getIns().show(this._openStr);
                return;
            }
            let type = this.data.index;
            ViewMgr.getIns().showSecondPop(ModName.Xianlu, XianluViewType.LingchiDetail, type);
        }

        private playTween(): void {
            this.removeTween();
            this.grp_icon.y = this._posY;
            Tween.get(this.grp_icon, {loop: true})
                .to({y: this._posY - 15}, 1000)
                .to({y: this._posY}, 1000);
            this.img_icon2.y = this._iconY2;
            Tween.get(this.img_icon2, {loop: true})
                .to({y: this._iconY1}, 1700)
                .to({alpha: 0}, 300)
                .exec(Handler.alloc(this, () => {
                    this.img_icon2.y = this._iconY2;
                    this.img_icon2.alpha = 1;
                }));
        }

        public removeTween(): void {
            Tween.remove(this.grp_icon)
            Tween.remove(this.img_icon2);
        }
    }
}