namespace game.mod.more {

    import TimeMgr = base.TimeMgr;

    export class XujieJitanHuanhuaItem extends BaseRenderer {
        public img_icon: eui.Image;
        public gr_time: eui.Group;
        public lb_time: eui.Label;
        public lb_name: eui.Label;
        public img_gray: eui.Image;
        public gr_star: eui.Group;
        public list_star: eui.List;
        public gr_eft: eui.Group;
        public redPoint: eui.Image;

        public avatarItem: game.mod.AvatarItem;

        data: AvatarItemData;
        private _listData: eui.ArrayCollection;

        constructor() {
            super();
            this.skinName = `skins.more.XujieJitanHuanhuaItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.list_star.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                this.lb_name.text = `祭主名称`;
                this.img_icon.source = 'kapai_wenhao';
                this.gr_star.visible = this.gr_time.visible = false;
                this.redPoint.visible = false;
                return;
            }

            this.redPoint.visible = !!data.showHint;
            this.lb_name.text = data.cfg.name;
            this.img_icon.source = ResUtil.getBigIcon(data.cfg.icon);
            this.img_gray.visible = data.star < 1;
            this.updateTime();

            let starList: string[] = [];
            if (data.star) {
                for (let i = 0; i < data.star; i++) {
                    starList.push('jitan_star_6');
                }
            }
            this.gr_star.visible = starList && starList.length > 0;
            this._listData.replaceAll(starList);

            if (this.data.isSel != undefined) {
                this.removeEft();//移除选中特效
                //防止刷新其他数据时影响到选中特效
                if (this.data.isSel) {
                    //选中添加特效
                    this.addEftByParent(UIEftSrc.SurfaceSel, this.gr_eft);
                }
            }
        }

        //todo 赛季期限 期限获得赛季效果，赛季功能后再处理
        public updateTime(endTime: number = 0): void {
            let curTime = TimeMgr.time.serverTimeSecond;
            let leftTime = endTime - curTime;
            if (leftTime <= 0) {
                this.gr_time.visible = false;
                return;
            }
            this.gr_time.visible = true;
            this.lb_time.text = TimeUtil.formatSecond(leftTime, 'd天H时', true);
        }
    }
}