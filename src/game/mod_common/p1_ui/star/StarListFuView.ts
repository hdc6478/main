namespace game.mod {
    import Event = egret.Event;
    import ArrayCollection = eui.ArrayCollection;

    /**
     * 通用星星列表组件，列表设置负间距时候用
     */
    export class StarListFuView extends eui.Component {
        private list_star: eui.List;
        private _starList: ArrayCollection;

        constructor() {
            super();

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.initStarList();
        }

        private onRemove() {
        }

        private initStarList(): void {
            if(!this._starList){
                this._starList = new ArrayCollection();
            }
            this.list_star.itemRenderer = StarItemFuRender;
            this.list_star.dataProvider = this._starList;
        }

        /**星星显示
         * @param star，当前星级
         * @param gap 间距
         * */
        public updateStar(star: number, gap?: number): void {
            if(!this._starList){
                this._starList = new ArrayCollection();
            }
            let infos: StarItemFuData[] = [];
            for(let i = 1; i <= star; ++i){
                infos.push({starStr:"star_6", width: 24});
            }
            this._starList.replaceAll(infos);

            if(gap != undefined){
                let layout = this.list_star.layout as eui.HorizontalLayout;
                layout && (layout.gap = gap);
            }
        }
    }
}