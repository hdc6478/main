namespace game.mod {
    import Event = egret.Event;
    import ArrayCollection = eui.ArrayCollection;

    /**
     * 通用星星列表组件
     */
    export class StarListView extends eui.Component {
        private list_star: eui.List;
        private _starList: ArrayCollection;

        constructor() {
            super();
            //不设置皮肤，支持复用
            this.skinName = "skins.common.StarListSkin";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.initStarList();
        }

        private onRemove() {
        }

        private initStarList(): void {
            if (!this._starList) {
                this._starList = new ArrayCollection();
            }
            this.list_star.itemRenderer = StarItemRender;
            this.list_star.dataProvider = this._starList;
        }

        /**星星显示
         * @param star，当前星级
         * @param maxStar，最大星级
         * @param starSrc，星星资源
         * */
        public updateStar(star: number, maxStar: number = 5, starSrc: string = "star_"): void {
            if (!this._starList) {
                this._starList = new ArrayCollection();
            }
            let infos: string[] = [];
            for (let i = 1; i <= maxStar; ++i) {
                let str = starSrc;
                str += star >= i ? "6" : "0";
                infos.push(str);
            }
            this._starList.replaceAll(infos);
        }

        /**新的星星显示*/
        public updateNewStar(star: number, maxStar: number = 5, starSrc: string = "new_star_"): void {
            this.updateStar(star, maxStar, starSrc);
        }

        /**大星星显示*/
        public updateBigStar(star: number, maxStar: number = 5, starSrc: string = "jitan_star_"): void {
            this.updateStar(star, maxStar, starSrc);
        }

        /**
         * 星星显示数量以及资源
         * @param starCnt 星级
         * @param src   星星资源
         */
        public updateStarSrc(starCnt: number, src: string): void {
            let stars: string[] = [];
            for (let i = 0; i < starCnt; i++) {
                stars.push(src);
            }
            this._starList.replaceAll(stars);
        }

        /**
         * 设置list的gap
         * @param gap
         */
        public set listGap(gap: number) {
            let layout = this.list_star.layout as eui.HorizontalLayout;
            layout && (layout.gap = gap);
        }

        /**
         * 更新外显星级
         * @param index 外显id
         */
        public updateSurfaceStar(index: number): void {
            if (!index) {
                return;
            }
            let headType = PropData.getPropParse(index);
            let star = SurfaceUtil.getStar(index);
            let maxStar = SurfaceUtil.getMaxStar(index);
            if (headType == ConfigHead.Shenling) {
                if (star > maxStar) {
                    //觉醒星级
                    this.updateStarSrc(star - maxStar, 'moon_yellow');
                } else {
                    this.updateStar(star, maxStar);
                }
            } else {
                this.updateStar(star, maxStar);
            }
        }
    }
}