namespace game.mod {

    import PropConfig = game.config.PropConfig;
    import ShenlingConfig = game.config.ShenlingConfig;

    export class AvatarItem extends BaseRenderer {
        public item: AvatarBaseItem;
        public redPoint: eui.Image;
        public img_gray: eui.Image;
        public img_gray0: eui.Image;
        public starCom: game.mod.StarListView;
        public img_chuzhan: eui.Image;
        public grp_eft: eui.Group;

        public data: AvatarItemData;
        private _qualityEftId: number;

        constructor() {
            super();
            this.skinName = "skins.common.AvatarItemSkin";
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
            this.removeQualityEft();
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            if (this.data.cfg != undefined) {
                let cfg = this.data.cfg as PropConfig;
                this.item.setData(cfg);
            }
            if (this.data.showHint != undefined) {
                this.redPoint.visible = this.data.showHint;
            }
            if (this.data.star != undefined) {
                let star = this.data.star;
                this.img_gray.visible = this.img_gray0.visible = !star;
                this.starCom.updateStar(star);
            }
            if (this.data.isBattle != undefined) {
                this.img_chuzhan.visible = this.data.isBattle;
            }

            if (this.data.isSel != undefined) {
                this.removeEft();//移除选中特效
                //防止刷新其他数据时影响到选中特效
                if (this.data.isSel) {
                    //选中添加特效
                    this.addEftByParent(UIEftSrc.SurfaceSel, this.grp_eft);
                }
            }

            this.removeQualityEft();

            let head = PropData.getPropParse(this.data.cfg.index, PropParseType.Type);
            //神灵特殊处理
            if (head == ConfigHead.Shenling) {
                let proxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
                let star = this.data.star;
                if (star) {
                    let maxUpStar = proxy.getMaxStar(this.data.cfg.index);
                    let src = star > maxUpStar ? 'moon_yellow' : 'star_6';
                    let starCnt = star > maxUpStar ? star - maxUpStar : star;
                    this.starCom.updateStarSrc(starCnt, src);
                } else {
                    this.starCom.updateStar(0, 0);
                }

                //进化神灵的进化次数或修仙女仆幻化等级
                let evolution: number = this.data.evolution;//可以传入其他玩家的数值，不传就用玩家自身的数值
                let nvpuShenlingId = RoleUtil.getNvpuShenlingId();
                let cfg = this.data.cfg as ShenlingConfig;
                if (evolution || nvpuShenlingId == cfg.index || (cfg.subtype && cfg.subtype == 1)) {
                    if (evolution == undefined) {
                        //获取玩家自身的进化等级，女仆神灵幻化等级也被服务端赋值到此
                        let info = proxy.getInfoByIndex(cfg.index);
                        evolution = info && info.evolutions || 1;
                    }
                    let icons = (cfg.icons || '').split(',');
                    let icon = icons[evolution - 1];
                    if (!icon) {
                        icon = cfg.icon;
                    }
                    //女仆神灵
                    if (cfg.index == nvpuShenlingId) {
                        this.item.img_avatar.source = ResUtil.getBigIcon(icon);
                        return;
                    }
                    //进化神灵
                    let initQua = cfg.character ? cfg.character[0] : 1;
                    let speQuality = Math.max(initQua, initQua + evolution - 1);//特殊品质
                    let eftSrc = SpecialQualityEftSrc[speQuality];
                    if (eftSrc) {
                        this._qualityEftId = this.addEft(eftSrc, 35, 0, null, 0);
                    }
                    this.item.img_quality.source = '';
                    this.item.img_bg.source = ResUtil.getBigBg(0, speQuality);
                    this.item.img_frame.source = ResUtil.getBigFrame(0, speQuality);
                    this.item.img_avatar.source = ResUtil.getBigIcon(icon);
                }
            }
        }

        /**单个item设置用*/
        public setData(data: AvatarItemData): void {
            this.data = data;
        }

        /**是否显示置灰层，默认不显示*/
        public setGray(isShow = false): void {
            this.img_gray.visible = this.img_gray0.visible = isShow;
        }

        /**品质特效*/
        private removeQualityEft(): void {
            if (this._qualityEftId) {
                this.removeEffect(this._qualityEftId);
                this._qualityEftId = null;
            }
        }
    }

}