namespace game.mod {
    import ColorMatrixFilter = egret.ColorMatrixFilter;

    export class FilterUtil {

        /**
         * 返回一个灰色滤镜
         */
        public static getGrapFilter() : ColorMatrixFilter {
            //颜色矩阵滤镜，模型置灰用
            let colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            let colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            return colorFlilter;
        }

    }
}