namespace game {
    import Sprite = egret.Sprite;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import DisplayObject = egret.DisplayObject;
    import TouchEvent = egret.TouchEvent;
    import Mdr = base.Mdr;
    import Event = egret.Event;

    export interface UILayer extends DisplayObjectContainer {
        idx: number;

        onResize(): void;
    }

    export const enum LayerIndex {
        sceneBottom,
        scene,
        main,
        window,
        upperWin,
        modal,
        bossReliveTip,
        tip,
        top//最顶层，用于强指引禁止点击
    }

    export class Layer extends DisplayObjectContainer {
        public static winSp: Sprite = new Sprite();
        public static modalSp: Sprite = new Sprite();
        /** @internal */ private static _ins: Layer;

        public static get ins(): Layer {
            return this._ins;
        }

        public static init(): void {
            if (this._ins) {
                return;
            }
            this._ins = new Layer();
        }

        /** 场景 */
        public static get sceneBottom(): UILayer {
            return this._ins._layers[LayerIndex.sceneBottom];
        }

        /** 场景 */
        public static get scene(): UILayer {
            return this._ins._layers[LayerIndex.scene];
        }

        /** 主界面 */
        public static get main(): UILayer {
            return this._ins._layers[LayerIndex.main];
        }

        /** 一般界面 */
        public static get window(): UILayer {
            return this._ins._layers[LayerIndex.window];
        }

        /** 一般界面上一层 */
        public static get upperWin(): UILayer {
            return this._ins._layers[LayerIndex.upperWin];
        }

        /** 压黑弹窗 */
        public static get modal(): UILayer {
            return this._ins._layers[LayerIndex.modal];
        }

        /**boss复活提示*/
        public static get bossReliveTip():UILayer{
            return this._ins._layers[LayerIndex.bossReliveTip];
        }

        /** 飘字提示 */
        public static get tip(): UILayer {
            return this._ins._layers[LayerIndex.tip];
        }

        /** 最顶层，用于强制指引 */
        public static get top(): UILayer {
            return this._ins._layers[LayerIndex.top];
        }

        public static setLyr(layer: UILayer): void {
            this._ins.setLyr(layer);
        }

        public static remLyr(layer: UILayer): void {
            this._ins.remLyr(layer);
        }

        public static getViewMdr(view: DisplayObject): Mdr {
            let property: PropertyDescriptor = Object.getOwnPropertyDescriptor(view, "__mdr__");
            if (property) {
                return property.value;
            }
            return null;
        }

        public static hideMdr(layer: UILayer, exclude?: DisplayObject): void {
            for (let i: number = 0; i < layer.numChildren; i++) {
                let tmp: DisplayObject = layer.getChildAt(i);
                if (tmp == Layer.modalSp || tmp == Layer.winSp || tmp == exclude) {
                    continue;
                }
                let mdr: Mdr = this.getViewMdr(tmp);
                if (mdr) {
                    mdr.hide(true);
                    i--;
                }
            }
        }

        //点击压黑关闭界面
        public static onSpTap() {
            let layer: ModalLayer = <ModalLayer><any>Layer.modalSp.parent;
            if (!layer) {
                return;
            }
            //设置压黑的层级
            let child = layer.getChildAt(layer.numChildren - 1);
            if(child && child.name == GuideFingerName){
                //取到的是指引，则继续向下取
                child = layer.getChildAt(layer.numChildren - 2);
            }
            let mdr: Mdr = Layer.getViewMdr(child);
            if (!mdr) {
                return;
            }
            if(mdr.isEasyHide){
                mdr.hide();
            }
        }

        //关闭所有压黑界面
        public static onHideModalLayer() {
            let layer: ModalLayer = <ModalLayer><any>Layer.modalSp.parent;
            if (!layer) {
                return;
            }
            for(let i = layer.numChildren - 1; i >= 1; --i){
                //压黑底不用处理
                let child = layer.getChildAt(i);
                let mdr: Mdr = Layer.getViewMdr(child);
                if (!mdr) {
                    continue;
                }
                mdr.hide();
            }
        }


        /** @internal */ private readonly _layers: { [key: number]: UILayer };

        /** @internal */
        constructor() {
            super();
            this._layers = Object.create(null);

            this.setLyr(new SceneBottomLayer());
            this.setLyr(new SceneLayer());
            this.setLyr(new BaseLayer(LayerIndex.main));
            this.setLyr(new BaseLayer(LayerIndex.window));
            this.setLyr(new BaseLayer(LayerIndex.upperWin));
            this.setLyr(new ModalLayer());
            this.setLyr(new BaseLayer(LayerIndex.bossReliveTip));
            this.setLyr(new BaseLayer(LayerIndex.tip));
            this.setLyr(new BaseLayer(LayerIndex.top));
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);

            let winSp = Layer.winSp;
            winSp.touchEnabled = true;
            winSp.graphics.beginFill(0, 0.8);
            winSp.graphics.drawRect(0, 0, 16, 16);
            winSp.graphics.endFill();

            let modalSp = Layer.modalSp;
            modalSp.touchEnabled = true;
            modalSp.graphics.beginFill(0, 0.8);
            modalSp.graphics.drawRect(0, 0, 16, 16);
            modalSp.graphics.endFill();
        }

        /** @internal */ private setLyr(layer: UILayer): void {
            if (!layer) {
                return;
            }
            let old = this._layers[layer.idx];
            if (old && old !== layer) {
                for (let i = 0, n = old.numChildren; i < n; i++) {
                    layer.addChild(old.getChildAt(0));
                }
                super.removeChild(old);
            }
            this._layers[layer.idx] = layer;
            this.addLyr(layer);
        }

        /** @internal */ private addLyr(layer: UILayer): void {
            super.addChildAt(layer, layer.idx);
        }

        /** @internal */ private remLyr(layer: UILayer): void {
            if (!layer) {
                return;
            }
            if (this.contains(layer)) {
                super.removeChild(layer);
            }
        }

        /** @internal */ private onAddToStage(e: Event): void {
            this.onResize();
        }

        public onResize(): void {
            if (!this.stage) {
                return;
            }
            for (let i = 0, n = this.numChildren; i < n; i++) {
                (<UILayer><any>this.getChildAt(i)).onResize();
            }
        }

    }

    class BaseLayer extends DisplayObjectContainer implements UILayer {
        public idx: number;

        constructor(idx: number) {
            super();
            this.width = gso.contentWidth;
            this.height = gso.contentHeight;
            this.idx = idx;
            this.touchEnabled = false;
            this.name = "Layer_" + this.idx;
        }

        public onResize(): void {
            let stage = this.stage;
            this.x = (stage.stageWidth - this.width) / 2;
            this.y = (stage.stageHeight - this.height) / 2;
        }
    }

    class SceneBottomLayer extends BaseLayer {
        constructor() {
            super(LayerIndex.sceneBottom);
        }

        public onResize(): void {
            let stage = this.stage;
            this.width = stage.stageWidth;
            this.height = stage.stageHeight;
        }
    }

    class SceneLayer extends BaseLayer {
        constructor() {
            super(LayerIndex.scene);
        }

        public onResize(): void {
            let stage = this.stage;
            this.width = stage.stageWidth;
            this.height = stage.stageHeight;
        }
    }

    class ModalLayer extends BaseLayer {
        constructor() {
            super(LayerIndex.modal);
        }

        $doAddChild(child: DisplayObject, index: number, notifyListeners?: boolean): DisplayObject {
            let res = super.$doAddChild(child, index, notifyListeners);
            if (res == Layer.modalSp) {
                return res;
            }
            if ((<any>child).horizontalCenter === 0) {
                child.x = (this.width - child.width) / 2;
            }
            if ((<any>child).verticalCenter === 0) {
                child.y = (this.height - child.height) / 2;
            }
            this.updateModal();
            return res;
        }

        $doRemoveChild(index: number, notifyListeners?: boolean): DisplayObject {
            let res = super.$doRemoveChild(index, notifyListeners);
            if (res == Layer.modalSp) {
                return res;
            }
            this.updateModal();
            return res;
        }

        public onResize(): void {
            super.onResize();
            this.updateModal();
        }

        /** @internal */ private updateModal() {
            if (this.idx != LayerIndex.modal) {
                return;
            }
            if (this.numChildren == 0) {
                return;
            }
            let modalSp: Sprite = Layer.modalSp;
            let idx: number = this.getChildIndex(modalSp);
            if (idx == 0 && this.numChildren == 1) {
                this.remModal();
                return;
            }
            if (idx > -1) {
                this.setChildIndex(modalSp, this.numChildren - 2);
                return;
            }
            this.addModal();
        }

        /** @internal */ private addModal() {
            let modalSp: Sprite = Layer.modalSp;
            modalSp.scaleX = gso.gameStage.stageWidth / modalSp.width;
            modalSp.scaleY = gso.gameStage.stageHeight / modalSp.height;
            modalSp.x = (this.width - modalSp.width * modalSp.scaleX) / 2;
            modalSp.y = (this.height - modalSp.height * modalSp.scaleY) / 2;
            this.addChildAt(modalSp, this.numChildren - 1);
            modalSp.addEventListener(TouchEvent.TOUCH_TAP, ModalLayer.onSpTap, ModalLayer);
        }

        /** @internal */ private remModal() {
            let modalSp: Sprite = Layer.modalSp;
            if (modalSp == null) {
                return;
            }
            if (!this.contains(modalSp)) {
                return;
            }
            this.removeChild(modalSp);
            modalSp.removeEventListener(TouchEvent.TOUCH_TAP, ModalLayer.onSpTap, ModalLayer);
        }

        /** @internal */ private static onSpTap(e: TouchEvent) {
            Layer.onSpTap();
        }
    }

}
