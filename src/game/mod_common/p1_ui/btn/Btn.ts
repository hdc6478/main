namespace game.mod {


    import DisplayObject = egret.DisplayObject;
    import TouchEvent = egret.TouchEvent;
    import Label = eui.Label;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Handler = base.Handler;

    export class Btn extends eui.Button {

        public img_bg: eui.Image;
        public redPoint: eui.Image;
        public img_hui: eui.Image;
        public lab_value: eui.Label;
        public img_state: eui.Image;
        public img_tag: eui.Image;

        public gr_cost: eui.Group;
        public lab_cost0: eui.Label;//消耗显示前文本
        public img_cost: eui.Image;//消耗显示
        public lab_cost: eui.Label;

        public img: eui.Image;//显示图片

        /**显示原价和现价 */
        public gr_price: eui.Group;
        public lab_price: eui.Label;
        public lab_faker_price: eui.Label;

        public group_eft: eui.Group;
        public pos: number;
        public group_font: eui.Group;//显示font字体

        public touchScale: boolean = true;

        public scaleGroup: eui.Group;

        private _eftHub: UIEftHub;

        protected childrenCreated(): void {
            super.childrenCreated();
            if (this.redPoint && this.redPoint.source === "hongdian") {
                this.redPoint.visible = false;
                let scale = 1 / this.scaleX;
                this.redPoint.scaleY = this.redPoint.scaleX = scale;
            }
            if (this.touchScale && !this.scaleGroup) {
                this.scaleGroup = new eui.Group();
                while (this.numChildren != 0) {
                    this.scaleGroup.addChild(this.getChildAt(0));
                }
                this.scaleGroup.width = this.width;
                this.scaleGroup.height = this.height;
                this.scaleGroup.verticalCenter = 0;
                this.scaleGroup.horizontalCenter = 0;
                this.addChild(this.scaleGroup);
            }
            this.addEventListener(egret.Event.RESIZE, this.updateScaleGroup, this);
        }

        public addBtnChild(child: DisplayObject) {
            if (this.touchScale && this.scaleGroup) {
                this.scaleGroup.addChild(child);
            } else {
                this.addChild(child);
            }
        }

        protected onTouchBegin(event: egret.TouchEvent): void {
            super.onTouchBegin(event);
            if (this.touchScale) {
                this.scaleGroup.scaleX = this.scaleGroup.scaleY = 0.9;
                this.addEventListener(TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
            }
            SoundMgr.ins.playEffect(ResUtil.getSoundUrl("ui"), null, true);
        }

        protected buttonReleased(): void {
            super.buttonReleased();
            if (this.touchScale) {
                this.removeEventListener(TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
                this.scaleGroup.scaleX = this.scaleGroup.scaleY = 1;
            }
            this.removeEventListener(egret.Event.RESIZE, this.updateScaleGroup, this);
        }

        //刷新组大小，设置皮肤不同状态时，按钮大小变更时调用
        private updateScaleGroup(): void {
            this.scaleGroup.width = this.width;
            this.scaleGroup.height = this.height;
        }

        /**
         * btn按钮文本设置超文本
         * @param textFlow 超文本内容
         * @param stroke 外描边
         */
        public setLabelStyle2(textFlow: string, stroke: number = 0) {
            if (this.labelDisplay && egret.is(this.labelDisplay, "eui.Label")) {
                let _lab: Label = this.labelDisplay as Label;
                _lab.textFlow = TextUtil.parseHtml(textFlow);
                _lab.stroke = stroke;
            }
        }

        /**
         * @param props {x:number, y:number,left:number,right:number,...}
         */
        public setLabelStyle3(props: any) {
            if (!props) {
                return;
            }
            if (this.labelDisplay && egret.is(this.labelDisplay, "eui.Label")) {
                let _lab: Label = this.labelDisplay as Label;
                for (let i in props) {
                    _lab[i] = props[i];
                }
            }
        }

        public setLabelStyle(size: number, textColor?: number, strokeColor?: number, text?: string, textFlow?: string) {
            if (this.labelDisplay && egret.is(this.labelDisplay, "eui.Label")) {
                let _lab: Label = this.labelDisplay as Label;
                _lab.size = size;
                if (textColor) {
                    _lab.textColor = textColor;
                }
                if (strokeColor) {
                    _lab.strokeColor = strokeColor;
                }
                if (textFlow) {
                    _lab.textFlow = TextUtil.parseHtml(textFlow);
                } else if (text) {
                    _lab.text = text;
                }
            }
        }

        /**
         * 设置原价和现价
         * @param price 现价
         * @param faker 原价
         * @param clearFontPrice 清除font价格，默认true
         */
        public setTwoPrice(price: number, faker: number, clearFontPrice: boolean = true): void {
            if (this.gr_price) {
                this.gr_price.visible = true;
                this.lab_price.text = `${price}元`;
                this.lab_faker_price.text = `原价${faker}元`;
            }
            if (clearFontPrice) {
                this.clearFontPrice();
            }
        }

        /**隐藏原价和现价的group*/
        public resetTwoPrice(): void {
            if (this.gr_price) {
                this.gr_price.visible = false;
            }
        }

        private addEftHub(): void {
            if (!this._eftHub) {
                this._eftHub = new UIEftHub(this);
            }
        }

        /**设置价格，font字体*/
        public setFontPrice(price: number): void {
            this.addEftHub();
            this.setImage('', true);//清空图片
            this.resetTwoPrice();//重置两种价格
            this._eftHub.addBmpFont(price + 'y', BmpTextCfg[BmpTextType.Price], this.group_font, true, 1, true);
        }

        /**清除font价格*/
        public clearFontPrice(): void {
            if (this._eftHub) {
                this._eftHub.clearFont(this.group_font, false);
            }
        }

        /**设置font字体*/
        public addBmpFont(text: string, font: string, container: DisplayObjectContainer, horizontal: boolean = true, scale: number = 1, center: boolean = false, gap: number = 0, expandParent: boolean = false): void {
            this.addEftHub();
            this._eftHub.addBmpFont(text, font, container, horizontal, scale, center, gap, expandParent);
        }

        /**增加特效 */
        public setEffect(src: string, parent: DisplayObjectContainer = this.group_eft, x: number = 0, y: number = 0,
                         idx: number = -1, cb: Handler = null, times: number = 0, scale: number = 1, autoRemove = true, speed: number = 1,
                         isMirror: boolean = false, scaleXBmpOffX: number = 0): number {

            this.clearEffect();
            this.addEftHub();
            return this._eftHub.add(src, x, y, cb, times, parent, idx, scale, autoRemove, speed, isMirror, scaleXBmpOffX);
        }

        public clearEffect(id?: number | string): void {
            if (this._eftHub) {
                if (id) {
                    this._eftHub.removeEffect(id);
                } else {
                    this._eftHub.removeAllEffects();
                }
            }
        }

        /**不显示文字显示图片 */
        public setImage(skin: string, clearFontPrice?: boolean): void {
            this.img.source = skin;
            if (clearFontPrice) {
                this.clearFontPrice();
            }
        }

        /**黄色底按钮*/
        public setYellow(): void {
            this.currentState = "yellow";
            this.touchEnabled = true;
        }

        /**蓝色底按钮*/
        public setBlue(): void {
            this.currentState = "blue";
            this.touchEnabled = true;
        }

        /**绿色底按钮*/
        public setGreen(): void {
            this.currentState = "green";
            this.touchEnabled = true;
        }

        /**灰色底按钮，不可点击*/
        public setDisabled(): void {
            this.currentState = "disabled";
            this.touchEnabled = false;
        }

        /**设置红点*/
        public setHint(hint: boolean = false): void {
            this.redPoint && (this.redPoint.visible = hint);
        }

        /**
         * 更新 this.redPoint 的 top|right 位置
         * @param top 默认-15
         * @param right 默认-8
         */
        public setHintStyle(top: number = -15, right: number = -8): void {
            if (this.redPoint) {
                this.redPoint.top = top;
                this.redPoint.right = right;
            }
        }

        public setLabelColor(color: number): void {
            let _lab: Label = this.labelDisplay as Label;
            _lab.textColor = color;
        }

        /**
         * 设置消耗
         * @param cost
         * @param preLab 消耗前的文本，默认不显示
         */
        public setCost(cost: number[], preLab?: string): void {
            //用于PriceBtnSkin
            if (this.gr_cost) {
                this.gr_cost.visible = true;
            }
            let idx = cost[0];
            let cnt = cost[1];
            let cfg = getConfigById(idx);
            this.img_cost.source = cfg.icon;
            this.lab_cost.text = cnt + "";
            if (preLab) {
                this.lab_cost0.text = preLab;
            }
        }

        /**重置消耗*/
        public resetCost(): void {
            this.img_cost.source = "";
            this.lab_cost.text = "";
        }

        public setTag(bool: boolean, img: string = "chongbang1"): void {
            this.img_tag.visible = bool;
            this.img_tag.source = img;
        }

        /**
         * 设置 PriceBtnSkin 的消耗
         * @param cost
         */
        public setPriceCost(cost: number[]): void {
            if (this.gr_cost) {
                this.gr_cost.visible = true;
                let cfg = getConfigById(cost[0]);
                let bagCnt = BagUtil.getPropCntByIdx(cost[0]);
                this.img_cost.source = cfg.icon;
                this.lab_cost.text = cost[1] + '';
                let color = bagCnt >= cost[1] ? WhiteColor.GREEN : WhiteColor.RED;
                this.lab_cost.textFlow = TextUtil.parseHtml(TextUtil.addColor(`${bagCnt}/${cost[1]}`, color));
            }
        }

        /**
         * 重置 PriceBtnSkin 的消耗
         */
        public resetPriceCost(): void {
            if (this.img_cost) {
                this.img_cost.visible = false;
                this.resetCost();
            }
        }
    }
}
