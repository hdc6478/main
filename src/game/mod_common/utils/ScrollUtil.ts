namespace game.mod {

    import Button = eui.Button;
    import Scroller = eui.Scroller;
    import Tween = base.Tween;
    import List = eui.List;
    import LinearLayoutBase = eui.LinearLayoutBase;
    import TileLayout = eui.TileLayout;

    export class ScrollUtil {
        private static readonly SCROLL_SPEED: number = 1500;

        public static readonly SCROLL_DIR_LEFT: number = 1;
        public static readonly SCROLL_DIR_RIGHT: number = 2;

        /**
         * 左右按钮显示与红点
         * @param {Scroller} scroller 滚动窗
         * @param {Button} btn_last 左按钮
         * @param {Button} btn_next 右按钮
         * childWidth：item宽度
         * @param {boolean} showHint 显示红点
         * */
        public static changeBtnShow(scroller: Scroller, btn_last: Btn, btn_next: Btn, childWidth: number, showHint: boolean = true): void {
            if (!scroller || !btn_last || !btn_next) return;

            let viewport = scroller.viewport as List;
            let scrollH = viewport.scrollH;
            let contentWidth = viewport.contentWidth;//可能为0

            //let child_num = viewport.numChildren;
            //let child_width = (contentWidth - (child_num - 1) * gap) / child_num;

            btn_last.visible = scrollH > childWidth;//大于一个item时候显示
            let offsetX = 30;//红点宽度，大概遮挡30的时候显示
            btn_next.visible = scrollH <= contentWidth - scroller.width - offsetX;//最后一个item遮挡小于30时候不显示

            if(!showHint){
                return;
            }

            let gap = (viewport.layout as LinearLayoutBase).gap;
            // 左红点
            if (btn_last.visible) {
                let hint = false;
                let leftPos = Math.floor((scrollH + gap) / (childWidth + gap));//向下取整
                for (let i = 0; i < leftPos; i++) {
                    let item = viewport.getVirtualElementAt(i);
                    if (this.checkHint(item)) {
                        hint = true;
                        break;
                    }
                }
                btn_last.redPoint.visible = hint;
            }

            // 右红点
            if (btn_next.visible) {
                let hint = false;
                let child_num = viewport.numElements;
                let rightPos = Math.floor((scroller.width + gap + scrollH) / (childWidth + gap));//列表显示到第几个item，向下取整
                for (let i = rightPos; i < child_num; i++) {
                    let item = viewport.getVirtualElementAt(i);
                    if (this.checkHint(item)) {
                        hint = true;
                        break;
                    }
                }
                btn_next.redPoint.visible = hint;
            }
        }

        private static checkHint(item: any): boolean {
            if (!item) return false;

            if (item["redPoint"] && item["redPoint"].visible) {
                return true;
            }
            // else {
            //     for (let child of item.$children) {
            //         if (!(child instanceof Btn) && !(child instanceof Icon)) continue;
            //         if (child["redPoint"] && child["redPoint"].visible) {
            //             return true;
            //         }
            //     }
            // }
            return false;
        }

        /**
         * 水平滚动
         * @param {Scroller} scroller 滚动窗
         * @param {number} dir 1左 2右
         * @param {number} time 动画时间
         * */
        public static moveH(scroller: Scroller, dir: number, time: number = 100): void {
            if (!scroller) return;
            let viewport = scroller.viewport;
            let scrollH = viewport.scrollH;
            let tarScrollH = 0;
            if (dir == 1) {
                tarScrollH = Math.max((viewport.scrollH - scroller.width), 0);
            } else {
                if (viewport.contentWidth > scroller.width) {
                    tarScrollH = Math.min((scrollH + scroller.width), viewport.contentWidth - scroller.width);
                    if (tarScrollH - scroller.viewport.scrollH <= 0) return;
                }
            }
            let tick = Math.abs(tarScrollH - scroller.viewport.scrollH) / ScrollUtil.SCROLL_SPEED * 1000;
            if (time) {
                tick = time;
            }
            Tween.remove(viewport);
            Tween.get(viewport).to({scrollH: tarScrollH}, tick);
        }

        /**
         * 垂直滚动
         * @param {Scroller} scroller 滚动窗
         * @param {number} dir 1上 2下
         * @param {number} time 动画时间
         * */
        public static moveV(scroller: Scroller, dir: number, time?: number): void {
            if (!scroller) return;
            let viewport = scroller.viewport;
            let scrollV = viewport.scrollV;
            let tarScrollV = 0;
            if (dir == 1) {
                tarScrollV = Math.max((viewport.scrollV - scroller.height), 0);
            } else {
                if (viewport.contentHeight > scroller.height) {
                    tarScrollV = Math.min((scrollV + scroller.height), viewport.contentHeight - scroller.height);
                    if (tarScrollV - scroller.viewport.scrollV <= 0) return;
                }
            }

            let tick = Math.abs(tarScrollV - scroller.viewport.scrollV) / ScrollUtil.SCROLL_SPEED * 1000;
            if (time) {
                tick = time;
            }
            Tween.remove(viewport);
            Tween.get(viewport).to({scrollV: tarScrollV}, tick);
        }

        /** 水平移动到指定位置
         * scroller : 滚动条
         * pos ： 列表的index，0开始
         * childWidth：item宽度
         * time：滚动的时间
         * */
        public static moveHToAssign(scroller: Scroller, pos: number, childWidth: number, time: number = 100) {
            if (!scroller) return;
            let viewport = scroller.viewport as List;
            viewport.scrollH = 0;
            //let list_width: number = viewport.contentWidth;//contentWidth可能为0
            let child_num: number = Math.max(viewport.numChildren, pos + 1);//防止Children未加载
            let gap: number = (viewport.layout as LinearLayoutBase).gap;
            //let child_width: number = (list_width - (child_num - 1) * gap) / child_num;
            let list_width: number = child_num * childWidth + (child_num - 1) * gap;

            let tarScrollH = pos * childWidth + (pos - 1) * gap;
            tarScrollH = Math.max(0, Math.min(tarScrollH, list_width - scroller.width));

            let tick = Math.abs(tarScrollH - scroller.viewport.scrollH) / ScrollUtil.SCROLL_SPEED * 1000;
            if (time) {
                tick = time;
            }
            Tween.remove(viewport);
            Tween.get(viewport).to({scrollH: tarScrollH}, tick);
        }

        /** 垂直移动到指定位置
         * notReset：默认重置scrollV
         * maxScrollV: 默认计算最大ScrollV*/
        public static moveVToAssign(scroller: Scroller, pos: number, childHeight: number, time?: number, child?: number, notReset?: boolean, maxScrollV?: boolean) {
            if (!scroller) return;
            let viewport = scroller.viewport as List;
            if(!notReset){
                viewport.scrollV = 0;
            }

            let child_num: number = Math.max(child || viewport.numChildren, pos + 1);
            let gap: number = (viewport.layout as LinearLayoutBase).gap;
            if(gap == undefined){
                gap = (viewport.layout as TileLayout).verticalGap;
            }
            let list_height: number = child_num * childHeight + (child_num - 1) * gap;
            if(viewport.contentHeight && list_height < viewport.contentHeight){
                //兼容处理，如果取得到contentHeight
                list_height = viewport.contentHeight;
            }

            let tarScrollV = pos * childHeight + (pos - 1) * gap;

            if(!maxScrollV){
                tarScrollV = Math.max(0, Math.min(tarScrollV, list_height - scroller.height));
            }
            else {
                tarScrollV = Math.max(0, tarScrollV);
            }

            let tick = Math.abs(tarScrollV - scroller.viewport.scrollV) / ScrollUtil.SCROLL_SPEED * 1000;
            if (time) {
                tick = time;
            }
            Tween.remove(viewport);
            Tween.get(viewport).to({scrollV: tarScrollV}, tick);
        }
    }
}