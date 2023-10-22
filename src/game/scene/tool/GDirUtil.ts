namespace game.utils {
    import Point = egret.Point;
    import Pool = base.Pool;

    export class GDirUtil {
        private static PI8: number = Math.PI / 8;
        private static tan22_5: number = Math.tan(GDirUtil.PI8);
        private static tan67_5: number = Math.tan(GDirUtil.PI8 * 3);

        public static Dir_Res_Num: number = 3;

        public static dir2idx: number[] = [
            Direction.RIGHT,
            Direction.RIGHT_UP,
            Direction.UP,
            Direction.LEFT_UP,
            Direction.LEFT,
            Direction.LEFT_DOWN,
            Direction.DOWN,
            Direction.RIGHT_DOWN,
        ];

        public static getMir(dir: number): number {
            if (MirDir[dir]) {
                return MirDir[dir];
            }
            return dir;
        }

        public static reversalDir(dir: number): number {
            return ReversalDir[dir];
        }

        public static rad2Dir(rad: number): number {
            let angle2: number = MathUtil.rad2deg(rad);
            return this.angle2Dir(angle2);
        }

        public static angle2Dir(angle: number): number {
            let dirIdx: number = MathUtil.round((360 - angle) / 45) % 8;
            return this.dir2idx[dirIdx];
        }

        public static dir2Rad(dir: number): number {
            let indexOf: number = this.dir2idx.indexOf(dir);
            return -MathUtil.deg2rad(45) * indexOf;
        }

        public static randDir(): number {
            return Math.floor(Math.random() * 8 + 1);
        }

        private static calcTan(x0: number, y0: number, x1: number, y1: number): number {
            return (y1 - y0) / (x1 - x0);
        }

        public static getRadian2(p1X: number, p1Y: number, p2X: number, p2Y: number) {
            let x_dis: number = p2X - p1X;
            let y_dis: number = p2Y - p1Y;
            return Math.atan2(y_dis, x_dis);
        }

        public static calcDirection(pt0: Point, pt1: Point): number {
            if (pt0.equals(pt1)) {
                return Direction.NONE;
            }
            return this.directionByTan2(pt0.x, pt0.y, pt1.x, pt1.y);
        }

        public static directionByTan2(x0: number, y0: number, x1: number, y1: number): number {
            let self = this;
            let radian: number = self.getRadian2(x0, y0, x1, y1);

            let angle: number = 180 * radian / Math.PI;
            let dir: number;

            if (angle <= 20 && angle >= -20) {
                dir = Direction.RIGHT;
            } else if (angle > 20 && angle <= 90) {
                dir = Direction.RIGHT_DOWN;
            } else if (angle > 90 && angle < 160) {
                dir = Direction.LEFT_DOWN;
            } else if (angle > -160 && angle <= -90) {
                dir = Direction.LEFT_UP;
            } else if (angle > -90 && angle < -20) {
                dir = Direction.RIGHT_UP;
            } else {
                dir = Direction.LEFT;
            }
            return dir;
        }

        public static moveDirectionByTan2(x0: number, y0: number, x1: number, y1: number): number {
            let self = this;
            let radian: number = self.getRadian2(x0, y0, x1, y1);
            let angle: number = 180 * radian / Math.PI;
            return this.getDirByAngle(angle);
        }
        public static getDirByAngle(angle: number): Direction {
            if (angle >= -22.5 && angle < 22.5) {
                return Direction.RIGHT;
            } else if (angle >= 22.5 && angle < 67.5) {
                return Direction.RIGHT_DOWN;
            } else if (angle >= 67.5 && angle < 112.5) {
                return Direction.DOWN;
            } else if (angle >= 112.5 && angle < 157.5) {
                return Direction.LEFT_DOWN;
            } else if (angle >= -67.5 && angle < -22.5) {
                return Direction.RIGHT_UP;
            } else if (angle >= -157.5 && angle < -112.5) {
                return Direction.LEFT_UP;
            } else if (angle >= -112.5 && angle < -67.5) {
                return Direction.UP;
            } else {
                return Direction.LEFT;
            }
        }

        /** 新方向资源处理 **/
        public static getBmpScaleXFor2(dir: number): number {
            let idx: number = AlterXDirs2[dir];
            return idx ? idx : 1;
        }

        public static getBmpScaleXFor3(dir: number): number {
            let idx: number = AlterXDirs3[dir];
            return idx ? idx : 1;
        }

        public static getMir2(dir: number): number {
            if (MirDirFor2[dir]) {
                return MirDirFor2[dir];
            }
            return dir;
        }

        public static getMir3(dir: number): number {
            if (MirDirFor3[dir]) {
                return MirDirFor3[dir];
            }
            return dir;
        }

        //资源2方向下获取方向
        private static MIR2_DIRECTIONS = [Direction.RIGHT_UP, Direction.RIGHT_DOWN, Direction.LEFT_UP, Direction.LEFT_DOWN];

        public static directionByTanMir2(x0: number, y0: number, x1: number, y1: number): number {
            let dirs: number[] = GDirUtil.MIR2_DIRECTIONS;
            let idx: number = (x0 <= x1 ? 0 : 1) * 2 + (y0 <= y1 ? 1 : 0);
            let ret_dir: number = dirs[idx] || this.randDir();
            return ret_dir;
        }

        /**
         * 一个x,y坐标的一个dir方向dis距离的点（
         * @param x
         * @param y
         * @param dir 方向
         * @param dis 距离
         */
        public static getDirPoint(x: number, y: number, dir: Direction, dis: number): Point {
            let self = this;
            let cur_dir = dir;
            let cur_dis = dis;
            let r = (cur_dir - Direction.RIGHT) * self.PI8 * 2;
            let target_x = Math.round(x + cur_dis * Math.cos(r));
            let target_y = Math.round(y + cur_dis * Math.sin(r));
            let point = Pool.alloc(Point);
            point.setTo(target_x, target_y);
            return point;
        }
    }
}
