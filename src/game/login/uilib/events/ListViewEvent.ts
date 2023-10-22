/** @internal */
namespace uilib {
    export class ListViewEvent extends egret.Event {
        public static INDEX_CHANGED: string = "index_changed";
        public static CURRENTPAGE_CHANGED: string = "currentpage_changed";
        public static TOTALPAGE_CHAGED: string = "totalpage_chaged";
        public static OVER_CHANGED: string = "over_changed";

        public oldIndex: number;
        public newIndex: number;
        public click: boolean;

        constructor(type: string) {
            super(type);
        }

        protected clean(): void {
            this.oldIndex = undefined;
            this.newIndex = undefined;
            this.click = false;
            super.clean();
        }

    }
}
