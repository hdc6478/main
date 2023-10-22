namespace game.mod.jiban {

    import GameNT = base.GameNT;
    import god_brother_group_data = msg.god_brother_group_data;

    export class ShenLingJiBanMdr extends MdrBase {
        private _view: ShenLingJiBanView = this.mark("_view", ShenLingJiBanView);
        private _proxy: IShenLingProxy;
        private _listData: eui.ArrayCollection;
        private _pos: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            this._view.list.itemRenderer = ShenLingJiBanItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ShenLingEvent.ON_SHEN_LING_JI_BAN_UPDATE, this.onUpdateInfo, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateListData, this);
        }

        protected onShow(): void {
            super.onShow();

            let attrIds = this.getJibanAttrIds();
            if (RoleUtil.checkAttrList(attrIds)) {
                this.updateListData();
            } else {
                RoleUtil.getAttrList(attrIds);//请求回调刷新list
                this.updateListData();
            }
        }

        //羁绊属性列表
        private getJibanAttrIds(): number[] {
            let idxList = this._proxy.getJiBanIdxList();
            let list: number[] = [];
            for (let id of idxList) {
                let cfgs = this._proxy.getJiBanCfg(id);
                if (cfgs && cfgs[0] && cfgs[0].property && list.indexOf(cfgs[0].property) < 0) {
                    list.push(cfgs[0].property);
                }
            }
            return list;
        }

        private updateListData(): void {
            let idxList = this._proxy.getJiBanIdxList();
            let listData: IShenLingJiBanItemData[] = [];
            let pos: number;
            for (let i = 0; i < idxList.length; i++) {
                let idx = idxList[i];
                let cfgs = this._proxy.getJiBanCfg(idx);
                let hint = this._proxy.getJibanHint(idx);
                if (hint && pos == undefined) {
                    pos = i;
                }
                let itemData = {
                    index: idx,
                    info: this._proxy.getJiBanInfo(idx),
                    maxLv: cfgs.length
                };
                listData.push(itemData);
            }
            this._listData.source = listData;

            if (pos != null) {
                this.gotoPos(pos);
            }
        }

        private onUpdateInfo(n: GameNT): void {
            let msg = n.body as god_brother_group_data;
            if (!msg) {
                return;
            }
            let num = this._listData.source.length;
            for (let i = 0; i < num; i++) {
                let data = this._listData.source[i] as IShenLingJiBanItemData;
                if (data && data.index && data.index == msg.groupindex) {
                    data.info = msg;
                    this._listData.itemUpdated(data);
                    break;
                }
            }
            let nextPos = this.getNextPos();
            console.log(`next pos: ${nextPos}`);
            this.gotoPos(nextPos);
        }

        protected onHide(): void {
            super.onHide();
            this._pos = null;
        }

        private gotoPos(pos?: number): void {
            if (pos == this._pos) {
                return;
            }
            this._pos = pos;
            let size = this._listData.source.length;
            egret.callLater(() => {
                ScrollUtil.moveVToAssign(this._view.scroller, pos, 335, 10, size);
            }, this);
        }

        private getNextPos(): number {
            let size = this._listData.source.length;
            for (let i = 0; i < size; i++) {
                let data: IShenLingJiBanItemData = this._listData.source[i];
                if (!data) {
                    continue;
                }
                let hint = this._proxy.getJibanHint(data.index);
                if (hint) {
                    return i;
                }
            }
            return this._pos;
        }
    }
}