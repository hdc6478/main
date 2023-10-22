namespace game.mod {
    /**
     * 基础外显组件
     */
    export class BaseSurfaceItem extends BaseRenderer {
        public gr_eft: eui.Group;
        public img_quality: eui.Image;
        public lb_name: eui.Label;
        public btn_god: game.mod.AttrGodItem;
        public special_attr: game.mod.SpecialAttrView;
        public img_icon: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.common.BaseSurfaceItemSkin";
            this.touchEnabled = false;
        }

        /**
         * @param index 外显index
         * @param god 外显仙力
         * @param isWhite 是否白底，默认false
         * @param clickable 设置是否可点击，一般其他玩家不给查看，默认true
         * @param isShowGod 是否展示仙力按钮，默认true
         */
        public updateShow(index: number, god: number, isWhite?: boolean, clickable: boolean = true, isShowGod = true): void {
            let type = PropData.getPropParse(index);
            let data: PropData = PropData.create(index);

            if (type == ConfigHead.Ring) {
                this.isImage();
                this.img_icon.source = ResUtil.getRingSrc(index);
            } else if (type == ConfigHead.Shouyin) {
                this.isImage();
                this.img_icon.source = ResUtil.getShouyinSrc(index);
            } else if (type == ConfigHead.Xianjian) {
                this.gr_eft.y = 380;
                this.isAnimate();
                this.addAnimate(data.index, this.gr_eft);
            } else {
                this.isAnimate();
                this.addAnimate(data.index, this.gr_eft);
            }

            this.img_quality.source = ResUtil.getSrQuality(data.quality);
            this.lb_name.text = data.cfg.name;
            if (!isWhite) {
                this.lb_name.textColor = ColorUtil.getColorByQuality2(data.quality);
            } else {
                this.lb_name.textColor = ColorUtil.getColorByQuality1(data.quality);
            }

            if (type == ConfigHead.Lingchong || !isShowGod) {
                //灵宠不展示仙力按钮
                this.btn_god.visible = false;
                return;
            }
            this.btn_god.visible = true;
            this.btn_god.updateGod(god, clickable);
        }

        //显示图片资源
        public isImage(): void {
            this.img_icon.visible = true;
            this.gr_eft.visible = false;
        }

        //显示动画模型
        public isAnimate(): void {
            this.img_icon.visible = false;
            this.gr_eft.visible = true;
        }
    }
}