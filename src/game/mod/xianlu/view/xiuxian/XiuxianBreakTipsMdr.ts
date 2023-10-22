namespace game.mod.xianlu {

    import Tween = base.Tween;
    import Sine = base.Sine;
    import Handler = base.Handler;
    import RebirthConfig = game.config.RebirthConfig;
    import ArrayCollection = eui.ArrayCollection;
    import attributes = msg.attributes;

    export class XiuxianBreakTipsMdr extends EffectMdrBase{
        private _view: XiuxianBreakTipsView = this.mark("_view", XiuxianBreakTipsView);
        private _proxy: XianluProxy;
        private _itemList: ArrayCollection;

        private _cfg1: RebirthConfig;
        private _cfg2: RebirthConfig;
        private _xianpoAttr1: attributes;
        protected _showArgs: {lastIndex: number, lastLv: number, lastXianpoAttr: attributes};//上一转生index，上一仙魄等级，上一级仙魄属性

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.verticalCenter = 0;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = XiuxianBreakItem;
            this._view.list_item.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateShow();
            this.updateAttr();
            this.showTitleTween();
            //this.showBgTween();
            this.showGrpTween();
            this.showItemTween(this._view.item1);
            this.showItemTween(this._view.item2);
            this.showOpenTween();
            this.showTipsTween();
            this.showEffect();
        }

        protected onHide(): void {
            this.removeTitleTween();
            //this.removeBgTween();
            this.removeGrpTween();
            this.removeOpenTween();
            this.removeItemTween();
            this.removeTipsTween();
            super.onHide();
        }

        private updateShow(): void {
            let index1 = this._showArgs.lastIndex;//上一转生index
            let lv1 = this._showArgs.lastLv;//上一仙魄等级
            this._xianpoAttr1 = this._showArgs.lastXianpoAttr;//上一级仙魄属性

            let cfg1: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index1);
            this._cfg1 = cfg1;

            let index2 = cfg1.next_index;
            let cfg2: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index2);
            this._cfg2 = cfg2;

            let fontStr1 = ResUtil.getRebirthFontStr(index1);
            this.addBmpFont(fontStr1, BmpTextCfg[BmpTextType.RebirthLv], this._view.grp_lv1, true, 1, true);
            let fontStr2 = ResUtil.getRebirthFontStr(index2);
            this.addBmpFont(fontStr2, BmpTextCfg[BmpTextType.RebirthLv], this._view.grp_lv2, true, 1, true);

            this._view.item1.setData(lv1);
            let lv2 = this._proxy.model.xianpolevel;
            this._view.item2.setData(lv2);

            let infos: {icon: string, desc: string}[] = [];
            let i = 1;
            while (cfg2["icon" + i] && cfg2["desc" + i]){
                infos.push({icon: cfg2["icon" + i], desc: cfg2["desc" + i]});
                i++;
            }
            this._itemList.source = infos;
        }

        private updateAttr(): void {
            //属性需要显示：转生属性+仙魄属性
            let attrIndex1 = this._cfg1.attr_index;
            let attr1 = RoleUtil.getAttr(attrIndex1);//上一级转生属性
            let xianpoAttr1 = this._xianpoAttr1;//上一级仙魄属性

            let attrIndex2 = this._cfg2.attr_index;
            let attr2 = RoleUtil.getAttr(attrIndex2);//当前转生属性
            let xianpoAttr2 = this._proxy.model.xianpo_attr;//当前仙魄属性

            let totalAttr1 = TextUtil.calcAttrList([attr1, xianpoAttr1]);//合并后的属性
            let totalAttr2 = TextUtil.calcAttrList([attr2, xianpoAttr2]);//合并后的属性

            let keys1: string[] = TextUtil.getAttrOrderKeys(totalAttr1);//上一级属性keys
            let keys2: string[] = TextUtil.getAttrOrderKeys(totalAttr2);//当前属性keys

            let desc1 = "";
            if(keys1.length != keys2.length){
                //长度不一致时，取当前的
                for (let i = 0, len = keys2.length; i < len; i++) {
                    let k: string = keys2[i];
                    let a: string = TextUtil.getAttrsText(k);
                    let val = totalAttr1[k] || 0;
                    let v = TextUtil.getAttrsPerCent(k, val);
                    desc1 += a + TextUtil.addColor(" +" + v, BlackColor.GREEN) + (i < len - 1 ? "\n" : "");
                }
            }
            else {
                desc1 = TextUtil.getAttrTextAdd(totalAttr1, BlackColor.GREEN);
            }
            this._view.lab_desc1.textFlow = TextUtil.parseHtml(desc1);

            let desc2 = TextUtil.getAttrTextAdd(totalAttr2, BlackColor.GREEN, "\n", " +", undefined, "");
            this._view.lab_desc2.textFlow = TextUtil.parseHtml(desc2);
        }

        private showTitleTween(): void {
            this._view.img_title.scaleX = this._view.img_title.scaleY = 7;
            Tween.get(this._view.img_title)
                .to({scaleX: 1, scaleY: 1}, 200);
        }

        private removeTitleTween(): void {
            Tween.remove(this._view.img_title);
        }

        private showBgTween(): void {
            this._view.img_bg.visible = false;
            this._view.img_bg.height = 0;
            Tween.get(this._view.img_bg)
                .delay(200)
                .exec(Handler.alloc(this, () => {
                    this._view.img_bg.visible = true;
                }))
                .to({height: 720}, 200, null, Sine.easeIn);
        }

        private removeBgTween(): void {
            Tween.remove(this._view.img_bg);
        }

        private showGrpTween(): void {
            this._view.grp_show.visible = false;
            this._view.grp_show.x = 0;
            Tween.get(this._view.grp_show)
                .delay(400)
                .exec(Handler.alloc(this, () => {
                    this._view.grp_show.visible = true;
                }))
                .to({x: 110}, 200, null, Sine.easeIn);
        }

        private removeGrpTween(): void {
            Tween.remove(this._view.grp_show);
        }

        private showOpenTween(): void {
            this._view.grp_open.visible = false;
            this._view.grp_open.x = 0;
            Tween.get(this._view.grp_open)
                .delay(600)
                .exec(Handler.alloc(this, () => {
                    this._view.grp_open.visible = true;
                }))
                .to({x: 175}, 200, null, Sine.easeIn);
        }

        private removeOpenTween(): void {
            Tween.remove(this._view.grp_open);
        }

        private showItemTween(item: XiuxianXianpoRender): void {
            item.visible = false;
            item.scaleX = item.scaleY = 3;
            Tween.get(item)
                .delay(800)
                .exec(Handler.alloc(this, () => {
                    item.visible = true;
                }))
                .to({scaleX: 1, scaleY: 1}, 200, null, Sine.easeIn);
        }

        private removeItemTween(): void {
            Tween.remove(this._view.item1);
            Tween.remove(this._view.item2);
        }

        private showTipsTween(): void {
            this._view.closeTips.visible = false;
            Tween.get(this._view.closeTips)
                .delay(1000)
                .exec(Handler.alloc(this, () => {
                    this._view.closeTips.visible = true;
                }));
        }

        private removeTipsTween(): void {
            Tween.remove(this._view.closeTips);
        }

        private showEffect(): void {
            this.removeEft();
            this.addEftByParent(UIEftSrc.Success, this._view.grp_eft, 0,0,0,null,1);
            this.addEftByParent(UIEftSrc.TipsBg, this._view.grp_eft2);
        }
    }
}