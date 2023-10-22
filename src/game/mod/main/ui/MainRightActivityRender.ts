namespace game.mod.main {

    export class MainRightActivityRender extends eui.ItemRenderer {

        public iconDisplay: eui.Image;
        public redPoint: eui.Image;

        public data: MainRightActivityRenderData;//按钮数据

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            if(this.data.icon != undefined){
                this.iconDisplay.source = this.data.icon;
            }
            if(this.data.showHint != undefined){
                this.redPoint.visible = this.data.showHint;
            }
        }
    }
}
