namespace game.mod.xianyuan {

    export class ChildLingyiMdr extends ChildShenbingMdr {
        protected _surfaceType = XianlvSurfaceType.Lingyi;
        protected _tabType = XianlvSecondTabType.Type1;

        protected onInit(): void {
            super.onInit();
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
        }

        protected onHide(): void {
            super.onHide();
        }
    }

    export class ChildLingyiMdr2 extends ChildLingyiMdr {
        protected _surfaceType = XianlvSurfaceType.Lingyi;
        protected _tabType = XianlvSecondTabType.Type2;
    }
}