namespace game.mod.more {
    import HuashenZhiluConfig = game.config.HuashenZhiluConfig;

    export class HuashenZhiluItem extends eui.ItemRenderer {
        public img_di: eui.Image;
        private img_cur: eui.Image;
        public grp_cnt: eui.Group;
        private lab_cnt: eui.Label;
        public btn_draw: game.mod.Btn;

        public data: {cfg: HuashenZhiluConfig, isEnd: boolean, hasDraw?: boolean, isCur?: boolean, canDraw?: boolean};

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data.cfg;
            let hasDraw = this.data.hasDraw;
            let isCur = !!this.data.isCur;
            let isEnd = this.data.isEnd;
            let canDraw = !!this.data.canDraw;

            this.grp_cnt.visible = true;
            this.lab_cnt.text = cfg.point + "";
            this.img_di.source = hasDraw ? "baoxingdiquan_2" : "baoxingdiquan_1";//已领取的点亮
            this.btn_draw.visible = !hasDraw;//已领取的不显示宝箱
            this.btn_draw.redPoint.visible = canDraw;
            this.currentState = isEnd ? "big" : "small";
            this.setIsCur(isCur);
        }

        //起点设置
        public setDefault(): void {
            this.grp_cnt.visible = false;
            this.btn_draw.visible = false;
            this.img_di.source = "baoxingdiquan_2";//起点永远是点亮的
        }
        //当前位置是否起点
        public setIsCur(isCur: boolean): void {
            this.img_cur.visible = isCur;
        }

        public setSel(sel: boolean): void {
            if(!this.data){
                return;
            }
            let isEnd = this.data.isEnd;
            let str = "";
            if(isEnd){
                str = sel ? "baoxiang_state3" : "baoxiang_state4";
            }
            else {
                str = sel ? "baoxiang_state1" : "baoxiang_state2";
            }
            this.btn_draw.iconDisplay.source = str;
        }

        public setData(cfg: HuashenZhiluConfig, isEnd: boolean, hasDraw?: boolean, isCur?: boolean, canDraw?: boolean): void {
            this.data = {cfg: cfg, isEnd: isEnd, hasDraw: hasDraw, isCur: isCur, canDraw: canDraw};
        }
    }
}