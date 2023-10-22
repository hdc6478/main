namespace game {
    export class ColorUtil {

        private static colorMap: { [quality: number]: Color } = null;
        /**根据品质获取颜色*/
        public static getColorByQuality(quality: number) {
            if (null == ColorUtil.colorMap) {
                ColorUtil.colorMap = {};
                ColorUtil.colorMap[QualityType.DEFAULT] = Color.WHITE;
                ColorUtil.colorMap[QualityType.BLUE] = Color.BLUE;
                ColorUtil.colorMap[QualityType.PURPLE] = Color.PURPLE;
                ColorUtil.colorMap[QualityType.ORANGE] = Color.ORANGE;
                ColorUtil.colorMap[QualityType.RED] = Color.RED;
                ColorUtil.colorMap[QualityType.GOLD] = Color.YELLOW;
                ColorUtil.colorMap[QualityType.GREEN] = Color.GREEN;
                ColorUtil.colorMap[QualityType.WHITE] = Color.WHITE;
                ColorUtil.colorMap[QualityType.BLUE_PURPLE] = Color.WHITE;
                ColorUtil.colorMap[QualityType.COLOR] = Color.WHITE;
            }
            return ColorUtil.colorMap[quality];
        }

        private static colorStrMap: { [quality: number]: string } = null;
        /**根据品质获取#颜色缩写*/
        public static getColorStrByQua(quality: number) {
            if (null == ColorUtil.colorStrMap) {
                ColorUtil.colorStrMap = {};
                ColorUtil.colorStrMap[QualityType.DEFAULT] = "#W";
                ColorUtil.colorStrMap[QualityType.BLUE] = "#B";
                ColorUtil.colorStrMap[QualityType.PURPLE] = "#P";
                ColorUtil.colorStrMap[QualityType.ORANGE] = "#O";
                ColorUtil.colorStrMap[QualityType.RED] = "#R";
                ColorUtil.colorStrMap[QualityType.GOLD] = "#Y";
                ColorUtil.colorStrMap[QualityType.GREEN] = "#G";
                ColorUtil.colorStrMap[QualityType.WHITE] = "#W";
                ColorUtil.colorStrMap[QualityType.BLUE_PURPLE] = "#W";
                ColorUtil.colorStrMap[QualityType.COLOR] = "#W";
            }
            return ColorUtil.colorStrMap[quality];
        }

        private static whitColorMap: { [quality: number]: WhiteColor } = null;
        /**根据品质获取颜色（白底）*/
        public static getColorByQuality1(quality: number) {
            if (null == ColorUtil.whitColorMap) {
                ColorUtil.whitColorMap = {};
                ColorUtil.whitColorMap[QualityType.DEFAULT] = WhiteColor.WHITE;
                ColorUtil.whitColorMap[QualityType.BLUE] = WhiteColor.BLUE;
                ColorUtil.whitColorMap[QualityType.PURPLE] = WhiteColor.PURPLE;
                ColorUtil.whitColorMap[QualityType.ORANGE] = WhiteColor.ORANGE;
                ColorUtil.whitColorMap[QualityType.RED] = WhiteColor.RED;
                ColorUtil.whitColorMap[QualityType.GOLD] = WhiteColor.YELLOW;
                ColorUtil.whitColorMap[QualityType.GREEN] = WhiteColor.GREEN;
                ColorUtil.whitColorMap[QualityType.WHITE] = WhiteColor.WHITE;
                ColorUtil.whitColorMap[QualityType.BLUE_PURPLE] = WhiteColor.WHITE;
                ColorUtil.whitColorMap[QualityType.COLOR] = WhiteColor.WHITE;
            }
            return ColorUtil.whitColorMap[quality];
        }

        private static blackColorMap: { [quality: number]: BlackColor } = null;
        /**根据品质获取颜色（黑底）*/
        public static getColorByQuality2(quality: number) {
            if (null == ColorUtil.blackColorMap) {
                ColorUtil.blackColorMap = {};
                ColorUtil.blackColorMap[QualityType.DEFAULT] = BlackColor.DEFAULT;
                ColorUtil.blackColorMap[QualityType.BLUE] = BlackColor.BLUE;
                ColorUtil.blackColorMap[QualityType.PURPLE] = BlackColor.PURPLE;
                ColorUtil.blackColorMap[QualityType.ORANGE] = BlackColor.ORANGE;
                ColorUtil.blackColorMap[QualityType.RED] = BlackColor.RED;
                ColorUtil.blackColorMap[QualityType.GOLD] = BlackColor.YELLOW;
                ColorUtil.blackColorMap[QualityType.GREEN] = BlackColor.GREEN;
                ColorUtil.blackColorMap[QualityType.WHITE] = BlackColor.WHITE;
                ColorUtil.blackColorMap[QualityType.BLUE_PURPLE] = BlackColor.WHITE;
                ColorUtil.blackColorMap[QualityType.COLOR] = BlackColor.WHITE;
            }
            return ColorUtil.blackColorMap[quality];
        }

        //蓝、紫、橙、红、金、绿、白、蓝紫、彩
        private static colorChineseStrMap: { [quality: number]: string } = null;
        public static getColorChineseStrByQua2(quality: number) {
            if (null == ColorUtil.colorChineseStrMap) {
                ColorUtil.colorChineseStrMap = {};
                ColorUtil.colorChineseStrMap[QualityType.DEFAULT] = "灰";
                ColorUtil.colorChineseStrMap[QualityType.BLUE] = "蓝";
                ColorUtil.colorChineseStrMap[QualityType.PURPLE] = "紫";
                ColorUtil.colorChineseStrMap[QualityType.ORANGE] = "橙";
                ColorUtil.colorChineseStrMap[QualityType.RED] = "红";
                ColorUtil.colorChineseStrMap[QualityType.GOLD] = "金";
                ColorUtil.colorChineseStrMap[QualityType.GREEN] = "绿";
                ColorUtil.colorChineseStrMap[QualityType.WHITE] = "白";
                ColorUtil.colorChineseStrMap[QualityType.BLUE_PURPLE] = "蓝紫";
                ColorUtil.colorChineseStrMap[QualityType.COLOR] = "彩";
            }
            return ColorUtil.colorChineseStrMap[quality];
        }
    }
}
