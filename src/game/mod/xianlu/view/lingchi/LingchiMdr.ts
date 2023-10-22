namespace game.mod.xianlu {

    import TouchEvent = egret.TouchEvent;
    import GridConfig = game.config.GridConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import Tween = base.Tween;
    import Pool = base.Pool;
    import Handler = base.Handler;

    export class LingchiMdr extends MdrBase implements UpdateItem{
        private _view: LingchiView = this.mark("_view", LingchiView);
        private _proxy: XianluProxy;
        private _itemList: LingchiItemRender[];
        private _posInfos: number[] = [670, 500, 240, 106];//存的是y坐标
        private _rewardList: LingchiItemRender[];//播放奖励特效的灵池
        private _iconList: BitmapBase[];

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_draw, TouchEvent.TOUCH_TAP, this.onClickDraw);
            this.onNt(XianluEvent.LINGCHI_INFO_UPDATE, this.onInfoUpdate, this);
            this.onNt(XianluEvent.LINGCHI_TIME_UPDATE, this.onInfoUpdate, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._itemList = this._rewardList = [];
            this.updatePoolList();
            this.updateTime();
            this.updateHint();
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            this.removeTween();
            this.clearIcon();
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickDraw(): void {
            //领取奖励
            let allGain = 0;
            if(this._proxy.model.pool_list){
                for(let i = 1; i <= this._proxy.model.pool_list.length; ++i){
                    let info = this._proxy.model.pool_list[i - 1];
                    let perGain = this._proxy.calcPoolAllGain(info);
                    if(perGain <= 0){
                        continue;
                    }
                    let item = this._view["item" + i];
                    this._rewardList.push(item);
                    allGain += perGain;
                }
                /**放到外层出来，因为需要计算播放特效的灵池*/
                if(allGain > 0){
                    this._proxy.c2s_lingpool_time_reward();
                    this.playRewardTween();
                }
            }
            if(allGain == 0){
                PromptBox.getIns().show(getLanById(LanDef.reward_tips));
            }
        }

        private onInfoUpdate(): void {
            this.updatePoolList();
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._proxy.model.poolRewardHint)) {
                this.updateRewardHint(data.value);
            }
        }

        private updatePoolList(): void {
            let cfgList: GridConfig[] = getConfigListByName(ConfigName.Grid);
            let tmpList = [];
            for(let i = 1; i <= cfgList.length; ++i){
                let cfg = cfgList[i - 1];
                let item = this._view["item" + i];
                item.data = cfg;
                if(this._proxy.isPoolOpen(cfg)){
                    tmpList.push(item);
                }
            }
            if(tmpList.length != this._itemList.length){
                this._itemList = tmpList;
                this.playTween();
            }
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            for(let i = 0; i < this._itemList.length; ++i){
                let item = this._itemList[i];
                item.updateTime();
            }
        }

        /** 更新红点 */
        private updateHint() {
            this.updateRewardHint(HintMgr.getHint(this._proxy.model.poolRewardHint));
        }

        private updateRewardHint(hint: boolean) {
            this._view.btn_draw.redPoint.visible = hint;
        }

        private playTween(): void {
            this.removeTween();
            for(let i = 0; i < this._itemList.length; ++i){
                let item = this._itemList[i];
                let posY = this._posInfos[i];
                item.y = posY;
                Tween.get(item, {loop: true})
                    .to({y: posY - 20}, 1000)
                    .to({y: posY}, 1000)
            }
        }

        private removeTween(): void {
            for(let i = 0; i < this._itemList.length; ++i){
                let item = this._itemList[i];
                item.removeTween();
                Tween.remove(item);
            }
        }
        private playRewardTween(): void {
            //奖励飘动
            let num: number = 5;
            let tarX: number = this._view.x + this._view.width - 170;
            let tarY: number = this._view.y;

            this._iconList = [];
            for(let item of this._rewardList){
                let cfg = item.data;
                let poolCfg = this._proxy.getPoolCfg(cfg.index, 1);//获取第一个
                let propId = poolCfg && poolCfg.output ? poolCfg.output[0][0] : PropIndex.Shenlingjinghua;
                let propCfg = GameConfig.getPropConfigById(propId);//原本写死改成动态获取配置
                for (let i = 0; i < num; i++) {
                    let icon: BitmapBase = Pool.alloc(BitmapBase);
                    icon.source = propCfg.icon;
                    icon.width = icon.height = 36;
                    icon.x = item.x + item.grp_icon.x + item.img_icon.x;
                    icon.y = item.y + item.grp_icon.y + item.img_icon.y;
                    icon.alpha = 0;
                    this._view.addChild(icon);
                    this._iconList.push(icon);

                    let numX = Math.random() > 0.5 ? 1 : -1;
                    let numY = Math.random() > 0.5 ? 1 : -1;
                    let posX = Math.random() * 60 * numX + icon.x;
                    let posY = Math.random() * 60 * numY + icon.y;
                    Tween.get(icon)
                        .to({alpha: 1, x: posX, y: posY}, 200)
                        .delay(800)
                        .to({x: tarX, y: tarY}, 400)
                        .exec(Handler.alloc(this, this.clearPerIcon, [icon]));
                }
            }
        }

        private clearPerIcon(icon: BitmapBase): void {
            if(icon.parent){
                icon.parent.removeChild(icon);
            }
            this._rewardList = [];
        }

        private clearIcon(): void {
            if(!this._iconList || !this._iconList.length){
                return;
            }
            this._rewardList = [];
            for(let icon of this._iconList){
                Tween.remove(icon);
                Pool.release(icon);
                if(icon.parent){
                    icon.parent.removeChild(icon);
                }
            }
        }
    }
}