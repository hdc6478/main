namespace game {
    /**品质：蓝、紫、橙、红、金、绿、白、蓝紫、彩*/
    export const enum QualityType {
        DEFAULT = 0,//灰底
        BLUE,
        PURPLE,
        ORANGE,
        RED,
        GOLD,
        GREEN,
        WHITE,
        BLUE_PURPLE,
        COLOR,
    }

    export const QualityTypeSrName = {
        [QualityType.BLUE]: "R",
        [QualityType.PURPLE]: "SR",
        [QualityType.ORANGE]: "SSR",
        [QualityType.RED]: "SSSR",
        [QualityType.GOLD]: "UR",
        [QualityType.GREEN]: "SP",
        [QualityType.WHITE]: "UTR",
        [QualityType.BLUE_PURPLE]: "UTR+",
        [QualityType.COLOR]: "EX"
    };

    /**品质，黄玄地天(4,5,6,7)*/
    export const enum SpecialQualityType {
        Huang = 1,
        Xuan = 2,
        Di = 3,
        Tian = 4
    }

    /** SpecialQualityType 与 QualityType 映射*/
    export const SpecialQuality = {
        [SpecialQualityType.Huang]: QualityType.RED,
        [SpecialQualityType.Xuan]: QualityType.GOLD,
        [SpecialQualityType.Di]: QualityType.GREEN,
        [SpecialQualityType.Tian]: QualityType.WHITE
    };

    /**SpecialQualityType的特效资源*/
    export const SpecialQualityEftSrc = {
        [SpecialQualityType.Huang]: UIEftSrc.Jinhua1,
        [SpecialQualityType.Xuan]: UIEftSrc.Jinhua2,
        [SpecialQualityType.Di]: UIEftSrc.Jinhua3,
        [SpecialQualityType.Tian]: UIEftSrc.Jinhua4
    };
}