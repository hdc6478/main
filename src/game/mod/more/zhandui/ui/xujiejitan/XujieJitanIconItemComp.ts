namespace game.mod.more {

    import TimeMgr = base.TimeMgr;

    export class XujieJitanIconItemComp extends BaseStageEventItem {
        public item0: game.mod.more.XujieJitanIconItem;
        public item1: game.mod.more.XujieJitanIconItem;
        public item2: game.mod.more.XujieJitanIconItem;
        public item3: game.mod.more.XujieJitanIconItem;
        public item4: game.mod.more.XujieJitanIconItem;
        public item5: game.mod.more.XujieJitanIconItem;
        public item6: game.mod.more.XujieJitanIconItem;

        private _proxy: XujieJitanProxy;

        constructor() {
            super();
            this.skinName = "skins.more.XujieJitanIconItemCompSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XujieJitan);
        }

        //todo
        public updateShow(): void {
            let propList = this._proxy.prop_list;
            for (let i = 0; i < XujieJitanSacrificeCnt; i++) {
                let showHint = this.getIconHint(i);
                let status = this.getStatus(i);
                // console.log(`zhandui_jitan ${i} --- showHint:${showHint}, status:${status}`);
                let itemData: IXujieJitanIconItemData = {
                    info: propList[i],
                    showHint,
                    status,
                    idx: i + 1
                };
                this[`item${i}`].data = itemData;
            }
        }

        //icon红点，可以获取奖励或者有道具放入
        private getIconHint(index: number): boolean {
            let propList = this._proxy.prop_list;
            let propItem = propList[index];
            if (propItem) {
                let curTime = TimeMgr.time.serverTimeSecond;
                let endTime = propItem.endtime.toNumber();
                if (endTime) {
                    return curTime >= endTime;//时间到就可以领取奖励
                } else {
                    return false;
                }
            }
            let datas = this._proxy.getBagDatas();
            return datas && datas.length > 0;
        }

        //0空，1排队，2正在供奉，3可领取奖励
        private getStatus(idx: number): number {
            let propList = this._proxy.prop_list;
            let propItem = propList[idx];
            if (!propItem) {
                return 0;
            }
            let endTime = propItem.endtime.toNumber();
            if (endTime == 0) {
                return 1;//时间为0，则是正在排队
            }
            let curTime = TimeMgr.time.serverTimeSecond;
            if (curTime >= endTime) {
                return 3;
            }
            let preProp = propList[idx - 1];
            if (preProp) {
                let preEndTime = preProp.endtime.toNumber();
                if (curTime >= preEndTime) {
                    return 2;//上一个时间已到且当前这个时间未完成，则表示正在供奉
                }
            } else {
                if (idx == 0) {
                    return 2;//如果是第一个，默认就是正在供奉
                }
            }
            return 0;
        }
    }
}