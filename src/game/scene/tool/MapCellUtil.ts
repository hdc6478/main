namespace game.scene {
    export class MapCellUtil {
        public static readonly BLOCK: number = 0; // 障碍0
        public static readonly PASS: number = 1 << 0; // 可通过1
        public static readonly SHELTER: number = 1 << 1; // 遮挡区域2
        public static readonly JUMP: number = 1 << 2; // 跳跃区域4
        public static readonly SAFETY: number = 1 << 3; // 安全区域8

        public static isMask(value: number, mask: number): boolean {
            return (value & mask) != 0;
        }

        public static isPass(value: number): boolean {
            return MapCellUtil.isMask(value, MapCellUtil.PASS);
        }

        public static isBlock(value: number): boolean {
            return !MapCellUtil.isPass(value);
        }

        public static isShelter(value: number): boolean {
            return MapCellUtil.isMask(value, MapCellUtil.SHELTER);
        }
    }
}
