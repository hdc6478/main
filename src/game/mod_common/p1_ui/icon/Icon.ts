namespace game.mod {
    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;
    import Pool = base.Pool;
    import ITextElement = egret.ITextElement;
    import EquipmentConfig = game.config.EquipmentConfig;
    import LanDef = game.localization.LanDef;

    export class Icon extends BaseRenderer {
        protected img_quality: eui.Image;
        protected img_icon: eui.Image;
        public grp_cnt: eui.Group;
        public lab_cnt: eui.Label;
        protected lab_name: eui.Label;
        protected grp_eft: eui.Group;
        protected img_tag: eui.Image;
        protected img_tag_right: eui.Image;
        protected img_gray: eui.Image;
        protected redPoint: eui.Image;

        public gr_star: eui.Group;
        public lb_starcnt: eui.Label;
        public starListView: game.mod.StarListView;
        public gr_stage: eui.Group;
        public listStarTopRight: eui.List;

        public data: number[] | msg.prop_tips_data | PropData | number | msg.prop_attributes | Long;
        private _clickHandler: Handler;
        protected propData: PropData;//子类可调用
        private _iconShowType: number = 0;//不能设置默认类型，会影响到其他类型使用，比如背包可使用宝箱
        private _tagType: number;//IconTagType

        constructor() {
            super();
            this.skinName = "skins.common.IconSkin";
            this.touchEnabled = false;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.img_icon.addEventListener(TouchEvent.TOUCH_TAP, this.onClickIcon, this);
        }

        protected onRemoveFromStage(): void {
            this.img_icon.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickIcon, this);
            if (this._clickHandler) {
                Pool.release(this._clickHandler);
            }
            this._clickHandler = null;
            this.removeEft();
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            if (!this.data) {
                this.defaultIcon();
                return;
            }

            if (this.data instanceof msg.prop_tips_data) {
                this.propData = PropData.create(this.data.idx.toNumber(), this.data.cnt);
            } else if (this.data instanceof msg.prop_attributes) {
                this.propData = PropData.fromData(this.data);
            } else if (this.data instanceof PropData) {
                this.propData = this.data;
            } else if (Array.isArray(this.data)) {
                this.propData = PropData.create(this.data[0], this.data[1]);
                this._tagType = this.data.length > 2 ? this.data[2] : 0;/**数组第三个为角标定义，IconTagType*/
            } else if (this.data instanceof Long) {
                this.propData = PropData.create(this.data.toNumber());
            } else {
                this.propData = PropData.create(this.data);
            }
            if (!this.propData) {
                return;
            }
            // if (this._iconShowType) {
            //     this.iconShowType = this._iconShowType;
            // }

            this.updateQualityImg();
            this.updateIconImg();
            this.updateCnt();
            this.setEft();
            this.updateTagImg();
            this.updateTagRightImg();
            this.updatePropName();//刷新显示道具名字
            this.updateEquipIcon();
            this.updatePropIcon();
        }

        //点击图标
        protected onClickIcon(e: TouchEvent): void {
            // if(DEBUG){
            //     let proxy:IMiscProxy = getProxy(ModName.Misc,ProxyType.Misc);
            //     proxy.sendGM(`$addprop ${this.propData.index} 1000`);
            // }
            if (this._clickHandler) {
                this._clickHandler.exec(e);
                return;
            }
            if (!this.propData || !this.propData.cfg) {
                return;
            }
            if (this.iconShowType == IconShowType.NotTips) {
                return;
            }
            ViewMgr.getIns().showPropTips(this.propData);
        }

        //特效
        protected setEft(): void {
            let quality = this.propData.quality;
            if (quality < QualityType.RED) {
                //低于4品质不显示特效
                this.removeEft();
                return;
            }
            let eftSrc = "pinzhi_" + quality;
            //let eftSrc = "pinzhi_" + (4 + Math.round(5 * Math.random()));
            if (this.eftSrc == eftSrc) {
                return;
            }
            this.removeEft();
            this.addEftByParent(eftSrc, this.grp_eft);
            this.grp_eft.visible = true;
        }

        /**设置tag资源*/
        protected updateTagImg(): void {
            this.img_tag.visible = !!this._tagType;
            if (this.img_tag.visible) {
                this.img_tag.source = "icon_tag" + this._tagType;
            }
        }

        /**刷新名字显示*/
        private updatePropName(): void {
            if (this.iconShowType == IconShowType.Name) {
                this.updateName();
            } else {
                this.updateName("");
            }
        }

        /**---------------------以下接口支持外部访问-----------------------*/
        /**设置默认显示*/
        public defaultIcon() {
            this.img_gray.visible = false;
            this.img_tag.visible = false;
            this.img_tag_right.visible = false;
            this.propData = null;
            this.setHint();
            this.updateName("");
            this.updateQualityImg("icon_quality_0");
            this.updateIconImg("");
            this.updateCnt("");
            this.removeEft();
            this.updateStar(0);
            this.updateStage(0);
            this.updateStarTopRight(0);
        }

        /**设置点击回调*/
        public setClickHandler(handler: Handler): void {
            this._clickHandler = handler;
        }

        /**设置数据data，单个icon时候调用，iconShowType不会保存进PropData里面*/
        public setData(data: number[] | msg.prop_tips_data | PropData | number | msg.prop_attributes | Long, iconShowType?: number): void {
            if (iconShowType) {
                //不能设置默认类型，会影响到其他类型使用，比如背包可使用宝箱
                this._iconShowType = iconShowType;
            }
            this.data = data;
        }

        /**设置iconShowType，iconShowType会保存进PropData里面**/
        public set iconShowType(type: number) {
            if (!this.propData) {
                return;
            }
            // if (type == IconShowType.Name) {
            //     //显示名字的时候，不保存数据进propData，防止修改数据
            //     return;
            // }
            this.propData.iconShowType = type;
        }

        public get iconShowType(): number {
            if (this._iconShowType) {
                return this._iconShowType;//优先返回
            }
            return this.propData && this.propData.iconShowType;
        }

        /**获取道具名称*/
        public getPropName(isWhite: boolean = true, truncate: boolean = false): ITextElement[] {
            let name: string = this.propData.cfg.name;
            if (truncate) {
                name = TextUtil.truncateString(name);
            }
            if (isWhite) {
                return TextUtil.parseHtml(TextUtil.addColor(name, ColorUtil.getColorByQuality1(this.propData.quality)));
            }
            return TextUtil.parseHtml(TextUtil.addColor(name, ColorUtil.getColorByQuality2(this.propData.quality)));
        }

        /**设置道具名称*/
        public updateName(name?: string): void {
            if (name == undefined) {
                /**支持name设置为空*/
                this.lab_name.textFlow = this.getPropName();
                return;
            }
            this.lab_name.textFlow = TextUtil.parseHtml(name);
        }

        /**设置激活置灰层*/
        public setImgActed(isActed = false): void {
            if (isActed) {
                this.setImgGray('');
            } else {
                this.setImgGray();
            }
        }

        /**设置置灰层*/
        public setImgGray(icon?: string): void {
            if (icon == undefined) {
                /**支持icon设置为空*/
                icon = "common_gray";//通用置灰
            }
            this.img_gray.source = icon;
            this.img_gray.visible = true;
        }

        /**设置置灰层加锁*/
        public setImgLock(): void {
            this.setImgGray("common_gray_icon");
        }

        /**设置红点*/
        public setHint(hint?: boolean): void {
            this.redPoint.visible = !!hint;
        }

        /**设置quality类按钮的样式*/
        public updateQualityImg(icon?: string): void {
            if (icon == undefined) {
                /**支持icon设置为空*/
                icon = ResUtil.getPropQualityImg(this.propData.quality);
            }
            this.img_quality.source = icon;
        }

        /**设置icon资源*/
        public updateIconImg(icon?: string): void {
            if (icon == undefined) {
                /**支持icon设置为空*/
                icon = ResUtil.getUiProp(this.propData.cfg.icon);
            }
            this.img_icon.source = icon;
        }

        /**显示数量文本，支持外部设置*/
        public updateCnt(cntStr?: string): void {
            this.grp_cnt.visible = false;
            if (this.iconShowType == IconShowType.NotCnt) {
                this.lab_cnt.text = "";
                return;
            }
            if (cntStr == undefined) {
                cntStr = this.propData.count > 1 ? StringUtil.getHurtNumStr(this.propData.count) : "";
            }
            this.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
            this.grp_cnt.visible = cntStr != "";
        }

        /**显示消耗数量文本，支持外部设置*/
        public updateCostLab(cost: number[], curCnt?: number): void {
            let cntStr = "";
            if (cost && cost.length) {
                let cnt = cost[1] || 1;
                if (curCnt == undefined) {
                    //支持外部传数据
                    curCnt = BagUtil.getPropCntByIdx(cost[0]);
                }
                let color = curCnt >= cnt ? BlackColor.GREEN : BlackColor.RED;
                cntStr = TextUtil.addColor(`(${StringUtil.getHurtNumStr(curCnt)}/${StringUtil.getHurtNumStr(cnt)})`, color);
            }
            this.updateCnt(cntStr);
        }

        /**
         * 设置右上角tag资源
         * @param tagImg 右上角tag资源，不传则默认配置表规则
         * @protected
         */
        public updateTagRightImg(tagImg?: string): void {
            let scale = 1;
            if (tagImg == undefined) {
                if (this.propData.type == ConfigHead.Equip && this.propData.propType == EquipPropType.Lingqi) {
                    tagImg = "icon_tag_lingqi";//神灵灵器
                } else if (this.propData.type == ConfigHead.Prop && this.propData.propType == PropType.Surface) {
                    tagImg = ResUtil.getSrQuality(this.propData.quality);//外显
                    scale = 0.6;
                } else if (this.propData.type == ConfigHead.Equip && this.propData.propType == EquipPropType.Shouling) {
                    tagImg = 'icon_tag_shouling';//异兽兽灵
                }
            }
            this.img_tag_right.visible = !!tagImg;
            if (!!tagImg) {
                this.img_tag_right.source = tagImg;
                this.img_tag_right.scaleX = this.img_tag_right.scaleY = scale;
            }
        }

        /**
         * 更新左下角的星星
         * 星数大于5，就展示【星数文本+一颗星星资源】
         * @param starCnt
         */
        public updateStar(starCnt: number): void {
            let isShow = starCnt > 0;
            this.gr_star.visible = isShow;
            if (!isShow) {
                return;
            }
            if (starCnt <= 5) {
                this.lb_starcnt.text = '';
                this.starListView.updateStar(starCnt, starCnt);
            } else {
                this.starListView.updateStar(1, 1);
                this.lb_starcnt.text = starCnt + '';
            }
        }

        /**
         * 更新右上角的星星
         * @param starCnt
         */
        public updateStarTopRight(starCnt: number): void {
            let isShow = starCnt > 0;
            this.listStarTopRight.visible = isShow;
            if (!isShow) {
                return;
            }
            let list: any[] = [];
            list.length = starCnt;
            this.listStarTopRight.dataProvider = new eui.ArrayCollection(list);
        }

        /**
         * 更新阶数，左下角
         * @param stage
         * @param str 默认转
         */
        public updateStage(stage: number, str: string = getLanById(LanDef.zhuan)): void {
            let isShow = stage > 0;
            this.gr_stage.removeChildren();
            this.gr_stage.visible = isShow;
            if (isShow) {
                this.addBmpFont(stage + str, BmpTextCfg[BmpTextType.EquipStage], this.gr_stage, true, 1, false, -2);
            }
        }

        /**
         * 角色装备icon，统一处理阶数，星数
         * @private
         */
        private updateEquipIcon(): void {
            if (!this.propData || this.propData.type != ConfigHead.Equip) {
                this.updateStarTopRight(0);
                this.updateStage(0);
                return;
            }
            let cfg = this.propData.cfg as EquipmentConfig;
            if (this.propData.propType == EquipPropType.RoleEquip) {
                //角色装备
                if (cfg.equip_lv) {
                    this.updateStage(cfg.equip_lv);
                } else {
                    this.updateStage(50, getLanById(LanDef.lv));//策划要求，0转默认都显示50级。不用配置表字段
                }
                let star = this.propData.equipStar;
                this.updateStarTopRight(star);
            } else if (this.propData.propType == EquipPropType.Suit) {
                //套装装备
                if (cfg.equip_lv) {
                    this.updateStage(cfg.equip_lv, '阶');
                }
            }
        }

        /**
         * 更新一些通用的展示逻辑
         * @private
         */
        private updatePropIcon(): void {
            if (!this.propData) {
                return;
            }
            if (this.propData.type == ConfigHead.Prop) {
                if (this.propData.propType == PropType.Hunka) {
                    //魂卡
                    let star = this.propData.hunka_star;
                    if (star) {
                        this.updateStar(star);
                    }
                } else {
                    this.updateStar(0);
                }
            } else {
                this.updateStar(0);
            }
        }
    }

}