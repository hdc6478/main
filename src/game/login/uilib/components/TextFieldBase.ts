/** @internal */
namespace uilib {
    import TextField = egret.TextField;
    import PoolObject = base.PoolObject;
    import TextFieldType = egret.TextFieldType;

    export class TextFieldBase extends TextField implements PoolObject {
        private _prompt: string;
        public get prompt(): string {
            return this._prompt;
        }

        public set prompt(value: string) {
            if (this._prompt === value) {
                return;
            }
            this._prompt = value;
            if (!this.text) {
                this.showPromptText();
            }
        }

        private _promptColor: number = 0x888888;
        public get promptColor(): number {
            return this._promptColor;
        }

        public set promptColor(value: number) {
            value = +value | 0;
            if (this._promptColor === value) {
                return;
            }
            this._promptColor = value;
            if (!this.text) {
                this.showPromptText();
            }
        }

        private showPromptText(): void {
            if (this.type !== TextFieldType.INPUT) {
                return;
            }
            super.$setTextColor(this._promptColor);
            this.text = this._prompt;
        }

        public removeFromParent() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            this.x = this.y = 0;
            this.removeFromParent();
            this.stroke = 0;
            this.width = undefined;
            this.name = "";
            this.textFlow = null;
            this.text = "";
            this.lineSpacing = 0;
        }
    }
}