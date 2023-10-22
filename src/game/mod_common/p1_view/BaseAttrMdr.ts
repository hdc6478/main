namespace game.mod {

    import LanDef = game.localization.LanDef;

    /**
     * 通用的属性展示面板，分【带有仙力属性，不带有仙力属性】两类
     */
    export class BaseAttrMdr extends MdrBase {
        protected _view: BaseAttrView = this.mark("_view", BaseAttrView);
        protected _listAttr1: eui.ArrayCollection;//基础属性

        /**仙力属性*/
        protected _godKeys: string[] = [AttrKey.god_atk, AttrKey.god_def, AttrKey.god_hp];
        /**基础属性中需要过滤的属性*/
        protected _godFilterKeys: string[] = [AttrKey.god_atk, AttrKey.god_def, AttrKey.god_hp, AttrKey.god];

        /**
         * titleStr: 面板标题
         * attrs: 属性
         * attrTitleStr: 基础属性一栏标题
         * state: 皮肤currentState对应状态
         *        default: 1  只有一种属性展示
         *        oneattr: 2  仙力属性+基础属性
         * layoutType: oneattr下的属性展示布局 1: VerticalLayout, 2: TileLayout
         */
        _showArgs: { titleStr: string, attrs: msg.attributes, attrItemStr?: string, state?: number, layoutType?: number };

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.listAttr1.itemRenderer = AttrItemRender;
            this._view.listAttr1.dataProvider = this._listAttr1 = new eui.ArrayCollection();

            this._view.currentState = 'default';
            this._view.listAttr0.setListGap(18);
            this._view.name0.setTitle('仙力属性');
            this._view.name1.setTitle(getLanById(LanDef.base_attr));
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected updateView(): void {
            this.updateTitleStr(this._showArgs.titleStr || '');
            if (!this._showArgs.attrs) {
                return;
            }

            if (this._showArgs.attrItemStr) {
                this._view.name0.setTitle(this._showArgs.attrItemStr);
            }

            if (this._showArgs.state && this._showArgs.state == 2) {
                this._view.currentState = 'oneattr';
                this.updateOneAttrView();
            } else {
                this._view.currentState = 'default';
                this.updateDefaultView();
            }
        }

        /**默认，带有仙力属性*/
        private updateDefaultView(): void {
            this._view.listAttr0.visible = this._view.scroller.visible = true;
            this.updateXianLiAttr();
            this.updateBaseAttr();
        }

        /**没有仙力属性的，1: VerticalLayout, 2: TileLayout*/
        private updateOneAttrView(): void {
            let layoutType = this._showArgs.layoutType || 1;
            this._view.listAttr0.visible = layoutType == 1;
            this._view.scroller.visible = !this._view.listAttr0.visible;

            if (layoutType == 2) {
                this.updateBaseAttr();
            } else {
                this._view.listAttr0.updateAttr(this._showArgs.attrs, WhiteColor.GREEN, '\n', ': ');
            }
        }

        /**更新【标题】*/
        protected updateTitleStr(str: string): void {
            this._view.secondPop.updateTitleStr(str);
        }

        /**更新【仙力属性】*/
        protected updateXianLiAttr(): void {
            let attrs = this._showArgs.attrs;
            this._view.power.setPowerValue(attrs.god || 0);

            let attr = new msg.attributes();
            for (let i = 0; i < this._godKeys.length; i++) {
                attr[this._godKeys[i]] = attrs[this._godKeys[i]] || 0;
            }
            this._view.listAttr0.updateAttr(attr, WhiteColor.GREEN, '\n', ': ');
        }

        /**更新【基础属性】*/
        protected updateBaseAttr(): void {
            let attrs = this._showArgs.attrs;
            let keys = TextUtil.getAttrOrderKeys(attrs);
            let rst: string[] = [];
            for (let key of keys) {
                if (this._godFilterKeys.indexOf(key) > -1) {
                    continue;
                }
                let name = TextUtil.getAttrsText(key);
                let val = TextUtil.getAttrsPerCent(key, attrs[key]);
                rst.push(`${name}: ${TextUtil.addColor(val + '', WhiteColor.GREEN)}`);
            }
            this._listAttr1.replaceAll(rst);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}