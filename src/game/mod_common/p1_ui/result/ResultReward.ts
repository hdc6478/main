namespace game.mod {
    import Event = egret.Event;
    //import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Handler = base.Handler;
    import Pool = base.Pool;
    import Tween = base.Tween;
    import TouchEvent = egret.TouchEvent;

    export class ResultReward extends BaseRenderer implements UpdateItem {

        public scr: eui.Scroller;
        public grp_reward: eui.Group;
        // public list_reward: eui.List;
        // private _rewardList: ArrayCollection;

        private _rewards: PropData[];//全部奖励
        private _showRewards: PropData[];//已显示的奖励
        private _iconList: Icon[];//奖励Icon列表
        private _showing: boolean;//正在表现动画
        private readonly ITEM_N: number = 4;//item显示的水平数量
        private readonly ITEM_H: number = 94;//item高度
        private readonly SCR_W: number = 471;//滚动区域默认宽度，需要的话可以计算出来
        private _endHandler: Handler;

        protected onAddToStage() {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, Layer.modal, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            this._endHandler = null;
            for(let icon of this._iconList){
                Pool.release(icon);
                if(icon.parent){
                    icon.parent.removeChild(icon);
                }
            }
            TimeMgr.removeUpdateItem(this);
            Tween.remove(this.scr.viewport);
            super.onRemoveFromStage();
        }

        private onClick(): void {
            this.endRewardTween()
            //点击后移除监听
            Layer.modal.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        // private initRewardList(): void {
        //     if(!this._rewardList){
        //         this._rewardList = new ArrayCollection();
        //     }
        //     this.list_reward.itemRenderer = Icon;
        //     this.list_reward.dataProvider = this._rewardList;
        // }

        update(time: base.Time) {
            this.updateRewardTween();
        }

        private updateRewardTween(): void {
            if(!this._rewards || !this._rewards.length){
                this.onRewardTweenEnd();
                return;
            }
            this._showing = true;
            let reward = this._rewards.shift();
            this.setRewardShow([reward]);
        }

        private setRewardShow(rewards: PropData[]): void {
            // let oldRewards = this._rewardList.source.concat();
            // oldRewards = oldRewards.concat(rewards);
            // this._rewardList.replaceAll(oldRewards);
            // let allNum = oldRewards.length;
            for(let prop of rewards){
                let icon: Icon = Pool.alloc(Icon);
                icon.setData(prop);
                this.grp_reward.addChild(icon);
                this._iconList.push(icon);
                this.addEftByParent(UIEftSrc.PropEffect, icon, icon.width / 2, icon.height / 2, -1, null, 1);
            }
            this._showRewards = this._showRewards.concat(rewards);

            let allNum = this._showRewards.length;
            let viewport = this.scr.viewport as eui.List;
            let layout = viewport.layout as eui.TileLayout;
            let gap = layout.verticalGap;
            let showRowCount = Math.floor(this.scr.height / (this.ITEM_H + gap));//最多完整显示多少行
            let showNum = this.ITEM_N * showRowCount;//显示多少个,一列就是4,2列就是8
            if(allNum > showNum){
                let rowCount = Math.ceil(allNum / this.ITEM_N);//行数
                let listHeight = rowCount * this.ITEM_H + (rowCount - 1) * gap + layout.paddingTop + layout.paddingBottom;//加上paddingTop
                let tarScrollV = listHeight - this.scr.height;
                Tween.remove(viewport);
                Tween.get(viewport).to({scrollV: tarScrollV}, 200);
            }
        }

        //结束动画后执行
        private onRewardTweenEnd(): void {
            this._showing = false;
            TimeMgr.removeUpdateItem(this);
            if(this._endHandler){
                this._endHandler.exec();
            }
        }

        //设置滚动区域宽度，用于奖励居中
        private updateScr(): void {
            let viewport = this.scr.viewport as eui.List;
            let layout = viewport.layout as eui.TileLayout;
            let gap = layout.horizontalGap;//水平间距21
            let rewardCnt = this._rewards.length;
            let columnCount = this.ITEM_N;//默认显示4列
            if(rewardCnt < this.ITEM_N){
                //奖励小于4时，做居中处理
                columnCount = rewardCnt;//设置列数
            }
            layout.requestedColumnCount = columnCount;
            //计算滚动区域宽度
            let width = layout.paddingLeft + layout.paddingRight + this.ITEM_H * columnCount + (columnCount - 1) * gap;
            this.scr.width = width;
        }

        //初始化滚动区域宽度，防止奖励居中后没有重置
        private initScr(): void {
            if(this.scr.width != this.SCR_W){
                this.scr.width = this.SCR_W;
                let viewport = this.scr.viewport as eui.List;
                let layout = viewport.layout as eui.TileLayout;
                layout.requestedColumnCount = this.ITEM_N;//默认显示4列
            }
        }

        //设置奖励最大行数，这个改变的是ResultReward的高度
        private setMaxRowCount(maxRowCount: number): void {
            let rewardCnt = this._rewards.length;
            let rowCount = Math.ceil(rewardCnt / this.ITEM_N);//计算奖励行数
            rowCount = Math.min(rowCount, maxRowCount);//行数限制
            let viewport = this.scr.viewport as eui.List;
            let layout = viewport.layout as eui.TileLayout;
            let gap = layout.verticalGap;//垂直间距6
            let height = layout.paddingTop + layout.paddingBottom + this.ITEM_H * rowCount + (rowCount - 1) * gap;
            this.height = height;
        }

        //主动结束动画
        private endRewardTween(): boolean {
            if(!this._showing){
                return false;
            }
            let rewards = this._rewards.concat();
            this.setRewardShow(rewards);
            this._rewards = [];
            return true;
        }

        // 奖励列表
        // endHandler：结束动画后的回调
        // isCenter：奖励小于4时是否居中
        // maxRowCount: 最多显示X行奖励
        public updateRewardList(rewardList: msg.prop_tips_data[], endHandler?: Handler, isCenter?:boolean, maxRowCount?: number): void {
            //this.initRewardList();

            this._rewards = BagUtil.changeRewards(rewardList);
            this._showRewards = [];
            this._iconList = [];
            this.scr.viewport.scrollV = 0;

            if(isCenter){
                this.updateScr();
            }
            else {
                this.initScr();
            }
            if(maxRowCount){
                this.setMaxRowCount(maxRowCount);
            }

            this.updateRewardTween();
            TimeMgr.addUpdateItem(this, 100);

            if(endHandler){
                this._endHandler = endHandler;
            }
        }
    }

}