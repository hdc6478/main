namespace game.mod.shilian {


    import YuanlingFubenConfig = game.config.YuanlingFubenConfig;
    import BuffConfig = game.config.BuffConfig;
    import Handler = base.Handler;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import EffectConfig = game.config.EffectConfig;
    import ObjectType = game.scene.ObjectType;
    import LanDef = game.localization.LanDef;

    export class YuanLingSceneMdr extends EffectMdrBase implements UpdateItem {
        private _view: YuanLingSceneView = this.mark("_view", YuanLingSceneView);
        private _listBuff: eui.ArrayCollection;
        private _listPlayer: eui.ArrayCollection;

        private _proxy: YuanLingProxy;
        private _cfg: YuanlingFubenConfig;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.YuanlingFuben);
            this._view.list_player.itemRenderer = YuanLingSceneHeadVipItem;
            this._view.list_player.dataProvider = this._listPlayer = new eui.ArrayCollection();
            this._view.list_buff.itemRenderer = YuanLingBuffItem;
            this._view.list_buff.dataProvider = this._listBuff = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_buff, eui.ItemTapEvent.ITEM_TAP, this.onClickBuffList, this);
            this.onNt(ShilianEvent.ON_YUANLING_FUBEN_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            // this.updateView();
            TimeMgr.addUpdateItem(this, 1000);
        }

        private updateView(): void {
            this._cfg = this._proxy.getConfig(this._proxy.model.scene_index);
            if (!this._cfg) {
                return;
            }
            this.updateLvInfo();
            this.updateBuff();
            this.updatePlayer();
        }

        private updateLvInfo(): void {
            let layer_score = this._cfg.layer_score;
            let curLayer = this._proxy.model.scene_layer;
            let layerStr = ['C', 'B', 'A', 'S'];
            let _curIdx = 0;
            for (let i = 0; i < layer_score.length; i++) {
                let item = layer_score[i];
                if ((item && item[0] <= curLayer && curLayer <= item[1]) || !curLayer) {
                    _curIdx = i;
                    break;
                }
            }
            this.addBmpFont(layerStr[_curIdx], BmpTextCfg[BmpTextType.Score], this._view.gr_eft, true, 0.7, true);
            let _next = layerStr[_curIdx + 1] || layerStr[layerStr.length - 1];
            let str = StringUtil.substitute(getLanById(LanDef.yuanling_tips15), [TextUtil.addColor(_next, BlackColor.GREEN)]);
            this._view.lb_nextLv.textFlow = TextUtil.parseHtml(str);

            let passStr: string;
            if (_curIdx == layer_score.length - 1) {
                passStr = curLayer + '';
            } else {
                passStr = curLayer + '/' + layer_score[_curIdx][1];
            }
            let str1 = StringUtil.substitute(getLanById(LanDef.yuanling_tips16), [TextUtil.addColor(passStr, BlackColor.GREEN)]);
            this._view.lb_pass.textFlow = TextUtil.parseHtml(str1);
        }

        private updateBuff(): void {
            let list: IYuanLingBuffItemData[] = [];
            let buff_info = this._cfg.buff_info;
            for (let i = 0; i < buff_info.length; i++) {
                let item = buff_info[i];
                let cfg: EffectConfig = getConfigByNameId(ConfigName.Effect, item[0]);
                list.push({
                    index: item[0],
                    duraTime: cfg && cfg.life_time || 0,
                    cd: item[3] || 0
                });
            }
            this._listBuff.replaceAll(list);
        }

        private updatePlayer(): void {
            let proxy: ISceneProxy = getProxy(ModName.Scene, ProxyType.Scene);
            this._listPlayer.replaceAll(proxy.getVosByType(ObjectType.PLAYER));
        }

        protected onHide(): void {
            super.onHide();
            this._buffCost = {};
        }

        private onClickBuffList(e: eui.ItemTapEvent): void {
            let item = e.item as IYuanLingBuffItemData;
            if (!item) {
                return;
            }
            let boughtTime = this._proxy.model.buff_info[e.itemIndex + 1] || 0;
            let endTime = boughtTime + item.duraTime + item.cd;
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, item.index);
            if (!buffCfg || leftTime > 0) {
                if (leftTime > 0) {
                    PromptBox.getIns().show(getLanById(LanDef.yuanling_tips17));
                }
                return;
            }
            let cost = this.getBuffCost(item.index);
            let propCfg = GameConfig.getPropConfigById(cost[0]);
            if (!propCfg) {
                return;
            }
            let lanAry:string[] = [LanDef.yuanling_tips19, LanDef.yuanling_tips20, LanDef.yuanling_tips21];
            let txt = getLanById(lanAry[e.itemIndex]);
            // // 使用%s\n%s秒内%s\n消耗%s
            // let txt = StringUtil.substitute(getLanById(LanDef.yuanling_tips18),
            //     [TextUtil.addColor(buffCfg.name, BlackColor.RED), cost[2], buffCfg.des, TextUtil.addColor(cost[1] + propCfg.name, WhiteColor.GREEN)]);
            ViewMgr.getIns().showConfirm(txt, Handler.alloc(this, this.sendBuyBuff, [e.itemIndex + 1]), null, true);
        }

        private sendBuyBuff(idx: number): void {
            this._proxy.c2s_yuanling_buyBuff(idx);
        }

        private _buffCost = {};

        private getBuffCost(idx: number): number[] {
            if (this._buffCost && this._buffCost[idx]) {
                return this._buffCost[idx];
            }
            this._buffCost = {};
            let buff_info = this._cfg.buff_info;
            for (let i = 0; i < buff_info.length; i++) {
                let item = buff_info[i];
                this._buffCost[item[0]] = [item[1], item[2], item[3]];
            }
            return this._buffCost[idx];
        }

        private _endTime = 0;

        update(time: base.Time) {
            if (!this._cfg) {
                this._endTime = 0;
                return;
            }
            if (!this._endTime) {
                this._endTime = time.serverTimeSecond + this._cfg.time;
            }
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                this._endTime = 0;
                return;
            }
            let mins = Math.floor(leftTime / 60);
            let minsStr = mins < 10 ? `0${mins}` : mins;
            let seconds = leftTime % 60;
            let secondsStr = seconds < 10 ? `0${seconds}` : seconds;
            this._view.lb_time.text = `${minsStr}:${secondsStr}`;
        }
    }
}