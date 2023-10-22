namespace game.scene {

    import PoolObject = base.PoolObject;
    import Pool = base.Pool;
    import Point = egret.Point;
    const MAX: number = 999999;

    class Dis implements PoolObject {

        value: number;
        path: number[] = [];
        visit: boolean;

        dispose(): void {
            this.onRelease();
        }

        onAlloc(): void {
            this.path.length = 0;
            this.value = MAX;
        }

        onRelease(): void {
            this.path.length = 0;
            this.value = MAX;
            this.visit = false;
        }
    }

    export class OptimalPath {

        private static _matrixMap: { [mapId: number]: { matrix: number[][], points: number[] } } = {};
        private static _disList: Dis[] = [];

        private static _tmpPt1: Point = Pool.alloc(Point);
        private static _tmpPt2: Point = Pool.alloc(Point);

        private static clearDis() {
            for (let d of this._disList) {
                Pool.release(d);
            }
            this._disList.length = 0;
        }

        private static initData(mapId: number) {
            let path = MapData.ins.path;
            // if (gso["test"]) {
            //     path = [[2903, 1963], [1963, 2929], [4994, 6511], [6511, 6109], [6511, 7048], [7048, 8012], [8012, 9221], [11936, 13311], [10542, 12022], [11446, 10897], [10897, 10095], [10095, 9270], [6285, 5321], [4785, 5321], [6285, 7093]];
            // }
            let self = this;
            if (!path || path.length == 0) {
                return;
            }
            let data = self._matrixMap[mapId];
            if (!data) {
                data = self._matrixMap[mapId] = {matrix: [], points: []};
            }
            for (let pts of path) {
                for (let p of pts) {
                    if (data.points.indexOf(p) < 0) {
                        data.points.push(p);
                    }
                }
            }
            let pointCnt = data.points.length;
            if (self._disList.length) {
                self.clearDis();
            }
            for (let i = 0; i < pointCnt; ++i) {
                data.matrix[i] = [];
                for (let k = 0; k < pointCnt; ++k) {
                    data.matrix[i][k] = MAX;
                }
            }
            for (let pts of path) {
                let pt0 = pts[0];
                let pt1 = pts[1];
                let pt0Idx = data.points.indexOf(pt0);
                let pt1Idx = data.points.indexOf(pt1);
                self._tmpPt1 = MapData.ins.getCellPtByIdx(pt0, self._tmpPt1);
                self._tmpPt2 = MapData.ins.getCellPtByIdx(pt1, self._tmpPt2);
                let dis = Math.round(PointUtil.distancePt(self._tmpPt1, self._tmpPt2));
                data.matrix[pt0Idx][pt1Idx] = data.matrix[pt1Idx][pt0Idx] = dis;
            }
        }

        private static Dijkstra(begin: number, matrix: number[][], disList?: Dis[]): Dis[] {
            disList = disList || [];
            let i: number;
            let pointCnt = matrix.length;
            if (disList.length) {
                this.clearDis();
            }
            for (i = 0; i < pointCnt; i++) {
                //设置当前的路径
                let d = Pool.alloc(Dis);
                disList.push(d);
                d.path.length = 0;
                d.path.push(begin);
                d.path.push(i);
                d.value = matrix[begin][i];
            }
            //设置起点的到起点的路径为0
            disList[begin].value = 0;
            disList[begin].visit = true;

            //计算剩余的顶点的最短路径（剩余pointCnt-1个顶点）
            for (let count = 1; count <= pointCnt; ++i) {
                let temp = 0;  //temp用于保存当前dis数组中最小的那个下标
                let min = MAX; //min记录的当前的最小值
                for (i = 0; i < pointCnt; i++) {
                    if (!disList[i].visit && disList[i].value < min) {
                        min = disList[i].value;
                        temp = i;
                    }
                }
                disList[temp].visit = true;  //把temp对应的顶点加入到已经找到的最短路径的集合中
                ++count;
                for (i = 0; i < pointCnt; i++) {
                    if (!disList[i].visit && matrix[temp][i] != MAX && (disList[temp].value + matrix[temp][i]) < disList[i].value) {
                        disList[i].value = disList[temp].value + matrix[temp][i]; //如果新得到的边可以影响其他为访问的顶点，那就就更新它的最短路径和长度
                        disList[i].path.length = 0;
                        for (let p of disList[temp].path) {
                            disList[i].path.push(p);
                        }
                        disList[i].path.push(i);
                    }
                }
            }
            return disList;
        }

        static getPath(beginPt: Point, endPt: Point, mapId: number): Point[] {
            this.initData(mapId);
            let data = this._matrixMap[mapId];
            if (!data || data.matrix.length == 0) {
                return null;
            }
            let begin: number = this.findPointIdx(beginPt, data.points);
            if (begin == -1) {//找到起点
                return null;
            }
            let end: number = this.findPointIdx(endPt, data.points);
            if (end == -1) {//找到终点
                return null;
            }
            if (begin == end) { //起点和终点是相同点
                return null;
            }
            this._disList = this.Dijkstra(begin, data.matrix, this._disList);
            let ptPath: Point[] = [];
            for (let dis of this._disList) {
                if (dis.value == MAX) {
                    continue;
                }
                if (dis.path[0] == begin && dis.path[dis.path.length - 1] == end) {

                    let res = this.findPathIdx(beginPt, data.points[dis.path[0]], data.points[dis.path[1]]);
                    let beginIdx = res == data.points[dis.path[0]] ? 0 : 1;
                    let tmpPt1 = MapData.ins.getCellPtByIdx(data.points[dis.path[beginIdx]]);
                    let path = Scene.findPath(beginPt.x, beginPt.y, tmpPt1.x, tmpPt1.y);
                    if (!path) {
                        break;
                    }
                    for (let p of path) {
                        ptPath.push(p);
                    }

                    let pathLen = dis.path.length;

                    res = this.findPathIdx(endPt, data.points[dis.path[pathLen - 1]], data.points[dis.path[pathLen - 2]]);
                    let endIdx = res == data.points[dis.path[pathLen - 1]] ? pathLen - 1 : pathLen - 2;

                    if (beginIdx == endIdx) {
                        ptPath.pop();
                    }

                    for (let i = beginIdx + 1; i < endIdx; ++i) { //中间的点
                        ptPath.push(MapData.ins.getCellPtByIdx(data.points[dis.path[i]]));
                    }

                    let tmpPt2 = MapData.ins.getCellPtByIdx(data.points[dis.path[endIdx]]);
                    path = Scene.findPath(tmpPt2.x, tmpPt2.y, endPt.x, endPt.y);
                    if (!path) {
                        break;
                    }
                    for (let p of path) {
                        ptPath.push(p);
                    }
                    break;
                }
            }
            this.clearDis();
            return ptPath;
        }

        private static findPointIdx(pt: Point, points: number[]): number {
            let min = -1;
            let dis = MAX;
            let endPt = Pool.alloc(Point);
            for (let i = 0; i < points.length; ++i) {
                let ptIdx = points[i];
                endPt = MapData.ins.getCellPtByIdx(ptIdx, endPt);
                if (endPt.x == pt.x && endPt.y == pt.y) {
                    min = i;
                    break;
                }
                let d = Scene.getFindPathDis(pt.x, pt.y, endPt.x, endPt.y);
                if (d != null && d < dis) {
                    dis = d;
                    min = i;
                }
            }
            Pool.release(endPt);
            return min;
        }

        private static findPathIdx(pA: Point, b: number, c: number): number {
            let pB = MapData.ins.getCellPtByIdx(b);
            let pC = MapData.ins.getCellPtByIdx(c);

            let a_2_b = PointUtil.distancePt(pA, pB);
            let a_2_c = PointUtil.distancePt(pA, pC);
            let b_2_c = PointUtil.distancePt(pB, pC);
            Pool.release(pB);
            Pool.release(pC);
            return a_2_c > a_2_b && a_2_c > b_2_c ? b : c; //当起点到路径第二个是钝角边时，去路径第一个点，其他情况需要去第二点
        }
    }

}