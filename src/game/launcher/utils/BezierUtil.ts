namespace game {

    import log = egret.log;
    import Point = egret.Point;

    export class BezierUtil {
        /**
         *
         * @param ctrlPosArr 贝塞尔曲线控制点坐标
         * @param precison 精度，需要计算的该条贝塞尔曲线上的点的数目
         * @param resArr 该条贝塞尔曲线上的点（二维坐标）
         */
        public static getBezierPos(ctrlPosArr:Array<Point>,precison:number):Array<Point>
        {
            log(ctrlPosArr);
            let resArr:Array<Point> = new Array<Point>();

            /**贝塞尔曲线控制点数目（阶数）*/
            let cnt:number = ctrlPosArr.length;

            if(cnt < 2){
                log("控制点数不能小于 2");
                return resArr;
            }

            /**杨辉三角数据 */
            let yangHuiArr:Array<number> = this.getYangHuiTriangle(cnt);

            //计算坐标
            for (let i = 0; i < precison; i++) {

                let t:number = i/precison;
                let tmpX:number = 0;
                let tmpY:number = 0;

                for (let j = 0; j < cnt; j++) {
                    tmpX += Math.pow(1 - t,cnt - j - 1) * ctrlPosArr[j].x * Math.pow(t,j) * yangHuiArr[j];

                    tmpY += Math.pow(1 - t,cnt - j - 1) * ctrlPosArr[j].y * Math.pow(t,j) * yangHuiArr[j];
                }

                // resArr[i].x = tmpX;
                // resArr[i].y = tmpY;

                resArr[i] = new Point(tmpX,tmpY);
            }

            return resArr;
        }
        /**
         * 获取杨辉三角对应阶数的值
         * @param num 杨辉三角阶数
         */
       public static getYangHuiTriangle(num:number):Array<number>
        {
            //计算杨辉三角
            let yangHuiArr = new Array<number>();

            if(num === 1)
            {
                yangHuiArr[0] = 1;
            }
            else
            {
                yangHuiArr[0] = yangHuiArr[1] = 1;

                for (let i = 3; i <= num; i++)
                {
                    let t = new Array<number>();
                    for (let j = 0; j < i - 1; j++)
                    {
                        t[j] = yangHuiArr[j];
                    }

                    yangHuiArr[0] = yangHuiArr[i - 1] = 1;
                    for (let j = 0; j < i - 2; j++)
                    {
                        yangHuiArr[j + 1] = t[j] + t[j + 1];
                    }
                }
            }

            log(yangHuiArr);
            return yangHuiArr;
        }
    }

}