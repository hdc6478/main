/** @internal */
namespace uilib {
    export class ListDataEvent extends egret.Event {
        public static ADD: string = "add";
        public static REMOVE: string = "remove";
        public static CLEAR: string = "clear";
        public static UPDATE: string = "update";
        public static ADDARRAY: string = "addarray";
        public static REFRESH: string = "refresh";

        public index: number;

        constructor(type: string) {
            super(type);
        }

        protected clean(): void {
            this.index = undefined;
            this.data = undefined;
            super.clean();
        }

    }
}
