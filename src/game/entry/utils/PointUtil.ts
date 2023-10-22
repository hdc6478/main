namespace game {
    import Point = egret.Point;
    import Pool = base.Pool;

    export class PointUtil {
        public static distance(x0: number, y0: number, x1: number, y1: number): number {
            let dx: number = (x0 - x1);
            let dy: number = (y0 - y1);
            return Math.sqrt(dx * dx + dy * dy);
        }

        public static distancePt(p0: Point, p1: Point): number {
            return Math.sqrt(this.distanceSquare(p0.x, p0.y, p1.x, p1.y));
        }

        public static distance1(p0: Point, x1: number, y1: number): number {
            return Math.sqrt(this.distanceSquare(p0.x, p0.y, x1, y1));
        }

        public static distanceSquare(x0: number, y0: number, x1: number, y1: number): number {
            let dx: number = x0 - x1;
            let dy: number = y0 - y1;
            return dx * dx + dy * dy;
        }

        public static distanceSquarePt(p0: Point, p1: Point): number {
            return this.distanceSquare(p0.x, p0.y, p1.x, p1.y);
        }

        public static distanceSquare1(p0: Point, x1: number, y1: number): number {
            return this.distanceSquare(p0.x, p0.y, x1, y1);
        }

        public static getDistPt(fromPt: Point, radians: number, dist: number, res?: Point): Point {
            res = res || Pool.alloc(Point);
            dist = +dist | 0;
            let tx: number = Math.cos(radians) * dist;
            let ty: number = Math.sin(radians) * dist;
            res.x = fromPt.x + tx;
            res.y = fromPt.y + ty;
            return res;
        }

        /**
         * 获取从pt0 到距离pt1 dist距离的点，pt0起点，pt1终点
         * @param {egret.Point} pt0
         * @param {egret.Point} pt1
         * @param {number} dist
         * @param {egret.Point} res
         * @return {egret.Point}
         */
        public static getDistPt2(pt0: Point, pt1: Point, dist: number, res?: Point): Point {
            res = res || Pool.alloc(Point);
            dist = +dist | 0;
            let dis = this.distancePt(pt0, pt1);
            if (dis < dist) {
                res.setTo(pt0.x, pt0.y);
                return res;
            }
            let p = 1 - dist / dis;
            res.setTo(pt0.x + (pt1.x - pt0.x) * p, pt0.y + (pt1.y - pt0.y) * p);
            return res;
        }

        public static anglePt(sPt: Point, ePt: Point): number {
            return this.angle(sPt.x, sPt.y, ePt.x, ePt.y);
        }

        public static angle1(sx: number, sy: number, ePt: Point): number {
            return this.angle(sx, sy, ePt.x, ePt.y);
        }

        public static angle(sx: number, sy: number, ex: number, ey: number): number {
            let a: number = Math.atan2(ey - sy, ex - sx);
            return a >= 0 ? a : 2 * Math.PI + a;
        }

        /**坐标转换 某个点转到某个层的坐标  local
         *
         * @param localPos 通过接口 localToGlobal 获得
         * @param layer 需要转到该对象的坐标系统
         */
        public static switchLocalPos(localPos:Point,layer:egret.DisplayObjectContainer):Point{
            return layer.globalToLocal(localPos.x,localPos.y);
        }

        /**坐标转换 某个点转到某个层的坐标  local
         *
         * @param localNode 节点对象
         * @param layer 需要转到该对象的坐标系统
         */
        public static switchLocalPos2(localNode:egret.DisplayObjectContainer,layer:egret.DisplayObjectContainer):Point{
            let pos = localNode.localToGlobal();
            return layer.globalToLocal(pos.x,pos.y);
        }
    }
}
