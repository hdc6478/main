namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import DisplayObject = egret.DisplayObject;

    export class MdrBase extends base.Mdr {
        protected _tab: MdrTab;

        constructor(parent: DisplayObjectContainer) {
            super(parent);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            let view: DisplayObjectContainer = <DisplayObjectContainer>this.getView();
            let secondPop = view && view["secondPop"];
            if(secondPop){
                addEventListener(secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide);
            }
        }

        protected doHide(disposeImmediately: boolean): void {
            let view: DisplayObjectContainer = <DisplayObjectContainer>this.getView();
            if (!view) {
                return;
            }
            if (this._tab) {
                this._tab.hide();
            }
            this.$clearList();
            super.doHide(disposeImmediately);
        }

        // private $clearList(exclude: string = undefined): void {
        private $clearList(): void {
            let view: DisplayObjectContainer = <DisplayObjectContainer>this.getView();
            if (!view) {
                return;
            }
            if (typeof view.numChildren !== "number") {
                return;
            }
            for (let i: number = 0, n: number = view.numChildren; i < n; i++) {
                let list: eui.List = <eui.List>view.getChildAt(i);
                if (egret.is(list, "eui.Scroller")) {
                    list = <eui.List>(<eui.Scroller><egret.DisplayObject>list).viewport;
                }
                if (!list) {
                    continue;
                }
                // if (exclude && list.name === exclude) {
                //     continue;
                // }
                if (!egret.is(list, "eui.List")) {
                    continue;
                }
                let dataProvider: eui.ArrayCollection | eui.ICollection | null = list.dataProvider;
                if (egret.is(dataProvider, "eui.ArrayCollection")) {
                    (<eui.ArrayCollection>dataProvider).removeAll();
                } else {
                    list.dataProvider = null;
                }
            }
        }

        protected onHide(): void {
            super.onHide();
            if (TimeMgr.hasUpdateItem(<UpdateItem><any>this)) {
                TimeMgr.removeUpdateItem(<UpdateItem><any>this);
            }
        }

        public dispose(): void {
            if (this._tab) {
                this._tab.dispose();
                this._tab = undefined;
            }
            let view: DisplayObject | eui.Component = this.getView();
            if (egret.is(view, "eui.Component")) {
                (<eui.Component>view).skinName = null;
            }
            this.$clearList();
            super.dispose();
        }

        protected genMdrTab<T extends MdrTab>(t: new(m: ModBase, p: egret.DisplayObjectContainer, l?: MdrClsList) => T, list?: MdrClsList): T {
            if (this._tab) {
                console.error(this.name, "重复genMdrTab");
                return undefined;
            }
            let m = new t(this._owner, <DisplayObjectContainer>this.getView(), list);
            return this._tab = m;
        }

        //设置View层级
        protected setViewIndex(index: number = 0): void {
            let view: DisplayObjectContainer = <DisplayObjectContainer>this.getView();
            if (!view) {
                return;
            }
            if(view.parent){
                view.parent.setChildIndex(view, index);
            }
        }

        /**解析showArgs数据，notShowArgs传true时，表示不默认返回showArgs*/
        protected decodeShowArgs(notShowArgs?: boolean): number {
            if (this._showArgs && Array.isArray(this._showArgs) && this._showArgs.length) {
                return +this._showArgs.shift();
            }
            if(notShowArgs){
                //不返回showArgs
                return null;
            }
            return this._showArgs;//默认返回showArgs
        }
    }
}
