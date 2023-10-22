/** @internal */
namespace uilib {
    import Event = egret.Event;

    /**
     * ui组件基础类
     * @author lkp
     */
    export class UIComponent extends SpriteBase {
        protected _enabled: boolean = false;

        constructor() {
            super();
            this.enabled = true;
            this._setup();
        }

        protected _setup(): void {
        }

        public get enabled(): boolean {
            return this._enabled;
        }

        public set enabled(value: boolean) {
            this._setEnabled(value);
        }

        protected _setEnabled(value: boolean): void {
            this.touchEnabled = value;
            this._enabled = value;
        }

        protected onAdded(): void {
        }

        protected onRemoved(): void {
        }

        public display(): void {
            this._render();
        }

        protected _render(): void {
        }

        public dispose(): void {
            super.dispose();
        }

        public onRelease(): void {
            let self = this;
            super.onRelease();
            self.removeEventListener(Event.ADDED_TO_STAGE, self.onAdded, self);
            self.removeEventListener(Event.REMOVED_FROM_STAGE, self.onRemoved, self);
            self.clear();
        }

        public onAlloc(): void {
            let self = this;
            super.onAlloc();
            self.addEventListener(Event.ADDED_TO_STAGE, self.onAdded, self);
            self.addEventListener(Event.REMOVED_FROM_STAGE, self.onRemoved, self);
            self.reset();
        }

        public clear(): void {
        }

        public reset(): void {
        }

    }
}
