/** @internal */
namespace uilib {

    export const enum BoxLayoutMode {
        /** 按最大尺寸布局 */
        MAX_SIZE = "max_size",
        /** 按原尺寸布局 */
        FIT_SIZE = "fit_size",
    }

    export const enum ButtonState {
        UP = "up",
        DOWN = "down",
        DISABLED = "disabled",
    }

    export const enum ScrollPolicy {
        POS_LEFT = 1,
        POS_RIGHT = 1 << 1,
        POS_BOTTOM = 1 << 2,
        POS_TOP = 1 << 3,

        POLICY_AUTO = 1 << 4,
        POLICY_ALWAYS = 1 << 5,
        POLICY_OFF = 1 << 6,
    }

    export const enum UILayoutPolicy {
        /** 水平方向，从左到右 */
        HORIZONTAL = "horizontal",
        /** 水平反转，从右到左 */
        HORIZONTAL_REVERSE = "horizontal_reverse",
        /** 垂直方向，从下到上 */
        VERTICAL = "vertical",
        /** 垂直反转，从上到下 */
        VERTICAL_REVERSE = "vertical_reverse",
        /** 网格 */
        GRID = "grid",
    }

}
