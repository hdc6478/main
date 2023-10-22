/** @internal */
namespace uilib {
    /**
     * 列表显示元件
     * @author lkp
     */
    export class ItemRender extends UIComponent {
        protected _index: number;
        protected _selected: boolean;
        protected _data: any;

        constructor() {
            super();
        }

        public get index(): number {
            return this._index;
        }

        public set index(value: number) {
            this._index = value;
        }

        public set data(value: any) {
            this._data = value;
            this.display();
        }

        public get data(): any {
            return this._data;
        }

        public get selected(): boolean {
            return this._selected;
        }

        public set selected(value: boolean) {
            if (value == this._selected) {
                return;
            }
            this._selected = value;
            this.onSelected();
        }

        protected onSelected(): void {
        }

    }
}
