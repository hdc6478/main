/** @internal */
namespace uilib {
    export interface IDisplayObject {
        width: number;
        height: number;
        x: number;
        y: number;

        addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;

        removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
    }

    export interface IPageEnabled {
        currentPage: number;

        totalPage: number;
    }

    export interface IScrollEnabled extends IDisplayObject {
        /**
         * 设置滚动区域，当尺寸大于设定滚动尺寸时会出现滚动条，当设置的矩形无效时取消滚动区域
         */
        setScrollRect(sx: Number, sy: Number, sw: Number, sh: Number): void;

        scrollPos: number;

    }
}