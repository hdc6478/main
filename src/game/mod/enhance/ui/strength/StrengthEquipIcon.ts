namespace game.mod.enhance {

    import facade = base.facade;

    export class StrengthEquipIcon extends IconSel {

        private _proxy: EnhanceProxy;
        private _model: EnhanceModel;

        private _pos: number = 0;
        //private _hasEquip: boolean;

        private _nameImg: eui.Image;

        private _grp: eui.Group;            // 临时使用，进阶名称暂用数字替代
        private _eft: UIEftHub;          // 临时使用

        private _isEqpListIcon: boolean = true;

        private _lv: number = 0;

        public get pos(): number {
            return this._pos;
        }

        // public get hasEquip(): boolean {
        //     return this._hasEquip;
        // }

        protected dataChanged(): void {
            if (this.data == null) {
                this.icon.defaultIcon();
                return;
            }
            this.img_sel.visible = false;
            this._proxy = facade.retMod(ModName.Enhance).retProxy(ProxyType.Enhance);
            this._model = this._proxy.getModel();

            let data1: IAdvancedGridData = this.data;
            this._pos = data1.pos;
            //this._hasEquip = !!data1.equip;

            // 已装备
            if (data1.equip && data1.info) {
                let propData: PropData = data1.equip;
                propData.count = data1.info.advanced_lv;
                this.nameUrl = data1.info.advanced_lv ? "jinjie_" + data1.info.advanced_lv : "";
                this.nameUrl2 = data1.info.advanced_lv;
                this.hint = (data1 as IAdvancedGridData).hint;
                this.icon.setData(propData,IconShowType.NotTips);
                this._lv = data1.info.advanced_lv;
            } else {
                this.icon.updateIconImg(`equip_icon_gray_` + data1.pos);
            }

            this.select(this.pos == this._model.curAdvancedPos);
        }

        public select(b: boolean) {
            this.selected = b;
            if (this.selected && this._isEqpListIcon) {
                this._model.curEqpItem = this;
            }
        }

        /**
         * 暂时用 nameUrl2 代替
         */
        public set nameUrl(value: string) {
            // if(!this._nameImg) {
            //     this._nameImg = new eui.Image();
            //     this._nameImg.scaleX = 0.55;
            //     this._nameImg.scaleY = 0.55;
            //     this._nameImg.x = 5;
            //     this._nameImg.y = 5;
            //     this.addChildAt(this._nameImg, this.getChildIndex(this.icon) + 1);
            // }
            // this._nameImg.source = value;
        }

        public set nameUrl2(lv: number) {
            if(!this._nameImg) {
                this._nameImg = new eui.Image();
                // this._nameImg.scaleX = 0.55;
                // this._nameImg.scaleY = 0.55;
                this._nameImg.x = 6;
                this._nameImg.y = 6;
                this.addChildAt(this._nameImg, this.getChildIndex(this.icon) + 1);
            }
            this._nameImg.source = lv ? 'role_advance_lv' + lv : '';

            // if (!lv || lv < 1) {
            //     if (this._eft) {
            //         this._eft.clearAllFont();
            //     }
            //     return;
            // }
            // if (!this._grp) {
            //     this._grp = new eui.Group();
            //     this._grp.x = 15;
            //     this.addChild(this._grp);
            // }
            // if (!this._eft) {
            //     this._eft = new UIEftHub(this);
            // }
            // this._eft.addBmpFont(lv + "", BmpTextCfg[BmpTextType.CommonPower], this._grp, true, 1, true);
        }

        public set hint(value: boolean) {
            this.redPoint.visible = value;
        }

        public set isEqpListIcon(value: boolean) {
            this._isEqpListIcon = value;
        }

        public get lv(): number {
            return this._lv;
        }

    }
}