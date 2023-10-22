namespace game.mod.surface {

    export class TianshenTypeRender extends BaseRenderer {
        public img_bg: eui.Image;
        public img_frame: eui.Image;
        public img_icon: eui.Image;
        public img_qua: eui.Image;
        public img_gray: eui.Image;
        public lab_num: eui.Label;
        public redPoint: eui.Image;
        public grp_eft: eui.Group;

        public data: {type: number, suitActive: boolean, reachCnt: number, hint: boolean, isSel?: boolean};            // type：1~4

        constructor() {
            super();
            this.skinName = "skins.common.TianshenTypeSkin";
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.img_icon.source = "tianshen_type_" + this.data.type;
            this.img_qua.source = "tiansen_qua_" + this.data.type;
            this.lab_num.text = `（${this.data.reachCnt}/${8}）`;
            this.redPoint.visible = this.data.hint;
            this.img_gray.visible = !this.data.suitActive;

            if(this.data.isSel != undefined){
                this.removeEft();//移除选中特效
                //防止刷新其他数据时影响到选中特效
                if(this.data.isSel){
                    //选中添加特效
                    this.addEftByParent(UIEftSrc.SurfaceSel, this.grp_eft);
                }
            }
        }

    }
}