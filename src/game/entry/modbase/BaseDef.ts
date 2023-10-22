namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import DisposeObject = base.DisposeObject;
    import Handler = base.Handler;

    export type MdrClsList = (new(p: DisplayObjectContainer) => MdrBase)[];

    export interface MdrTab extends DisposeObject {
        show(): void;

        hide(): void;

        btnList: eui.List;
        mdrClsList: MdrClsList;

        changeHandler: Handler
        condCheck: Handler;
        selectIndex: number;
        params: any;
    }

}
