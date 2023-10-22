namespace game {
    import Component = eui.Component;
    import DisplayObject = egret.DisplayObject;
    import Sprite = egret.Sprite;
    import TouchEvent = egret.TouchEvent;
    import Mdr = base.Mdr;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import clearDelay = base.clearDelay;
    import Pool = base.Pool;
    import Event = egret.Event;

    class BaseLayer extends Component implements UILayer {
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

    class MainLayer extends BaseLayer {

        public onResize(): void {
            let stage = this.stage;
            let top: number = +gso.mainTop | 0;
            let bottom: number = +gso.mainBottom | 0;
            let left: number = +gso.mainLeft | 0;
            let right: number = +gso.mainRight | 0;
            this.width = stage.stageWidth - left - right;
            this.height = stage.stageHeight - top - bottom;
            this.x = left;
            this.y = top;
        }
    }

    class WindowLayer extends BaseLayer {
        constructor() {
            super(LayerIndex.window);
        }

        $doAddChild(child: DisplayObject, index: number, notifyListeners?: boolean): DisplayObject {
            let res = super.$doAddChild(child, index, notifyListeners);
            if (res == Layer.winSp) {
                return res;
            }
            this.updateModal();
            return res;
        }

        $doRemoveChild(index: number, notifyListeners?: boolean): DisplayObject {
            let res = super.$doRemoveChild(index, notifyListeners);
            if (res == Layer.winSp) {
                return res;
            }
            this.updateModal();
            return res;
        }

        public onResize(): void {
            super.onResize();
            this.updateModal();
        }

        private updateModal() {
            if (this.idx != LayerIndex.window) {
                return;
            }
            if (this.numChildren == 0) {
                return;
            }
            let sp: Sprite = Layer.winSp;
            let idx: number = this.getChildIndex(sp);
            if (idx == 0 && this.numChildren == 1) {
                this.remModal();
                return;
            }
            if (idx > -1) {
                //设置压黑的层级
                let guideFinger = this.getChildByName(GuideFingerName);
                let num = guideFinger ? this.numChildren - 3 : this.numChildren - 2;
                this.setChildIndex(sp, num);
                return;
            }
            this.addModal();
        }

        private addModal() {
            let sp: Sprite = Layer.winSp;
            sp.scaleX = gso.gameStage.stageWidth / sp.width;
            sp.scaleY = gso.gameStage.stageHeight / sp.height;
            sp.x = (this.width - sp.width * sp.scaleX) / 2;
            sp.y = (this.height - sp.height * sp.scaleY) / 2;
            this.addChildAt(sp, this.numChildren - 1);
        }

        private remModal() {
            let sp: Sprite = Layer.winSp;
            if (sp == null) {
                return;
            }
            if (!this.contains(sp)) {
                return;
            }
            this.removeChild(sp);
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

        private updateModal() {
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
                //设置压黑的层级
                let guideFinger = this.getChildByName(GuideFingerName);
                let num = guideFinger ? this.numChildren - 3 : this.numChildren - 2;
                this.setChildIndex(modalSp, num);
                return;
            }
            this.addModal();
        }

        private addModal() {
            let modalSp: Sprite = Layer.modalSp;
            modalSp.scaleX = gso.gameStage.stageWidth / modalSp.width;
            modalSp.scaleY = gso.gameStage.stageHeight / modalSp.height;
            modalSp.x = (this.width - modalSp.width * modalSp.scaleX) / 2;
            modalSp.y = (this.height - modalSp.height * modalSp.scaleY) / 2;
            this.addChildAt(modalSp, this.numChildren - 1);
            modalSp.addEventListener(TouchEvent.TOUCH_TAP, ModalLayer.onSpTap, ModalLayer);
        }

        private remModal() {
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

        private static onSpTap(e: TouchEvent) {
            Layer.onSpTap();
        }
    }

    export function initMainLayer() {
        Layer.setLyr(new MainLayer(LayerIndex.main));
        Layer.setLyr(new WindowLayer());
        Layer.setLyr(new MainLayer(LayerIndex.upperWin));
        Layer.setLyr(new ModalLayer());
        Layer.setLyr(new BaseLayer(LayerIndex.bossReliveTip));
        Layer.setLyr(new BaseLayer(LayerIndex.tip));
        Layer.setLyr(new BaseLayer(LayerIndex.top));

        Layer.ins.onResize();
    }

    // export function loadWinBg(): void {
    //     let self = WindowLayer;
    //     self._imgBg.keepOnRem = true;
    //     self._imgBg.addEventListener(Event.COMPLETE, () => {
    //         resLoaded();
    //     }, self);
    //     self._imgBg.source = "assets/game_bg/bg.jpg";
    // }

}

