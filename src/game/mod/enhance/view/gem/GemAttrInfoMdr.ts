namespace game.mod.enhance {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import gem_data = msg.gem_data;
    import attributes = msg.attributes;
    import TouchEvent = egret.TouchEvent;

    export class GemAttrInfoMdr extends MdrBase {
        private _view: GemAttrInfoView = this.mark("_view", GemAttrInfoView);

        private _listAttr: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.verticalCenter = 0;
            this._view.horizontalCenter = 0;

            this._listAttr = new ArrayCollection();
            this._view.list_gemAttr.dataProvider = this._listAttr;
            this._view.list_gemAttr.itemRenderer = AttrItemRender;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow(): void {
            super.onShow();

            let attrs: attributes[] = [];
            for(let gemInfo of this._showArgs) {
                if(!gemInfo) {
                    continue;
                }
                let perAttr = (gemInfo as gem_data).attrs;
                if(!perAttr) {
                    continue;
                }
                attrs.push(perAttr);
            }
            let totalAttr = TextUtil.calcAttrList(attrs);

            let attr: attributes = new attributes();
            attr.atk = Long.fromValue(0);
            attr.armor = 0;
            attr.max_hp = Long.fromValue(0);
            attr.crit = 0;

            if(totalAttr){
                for(let k in totalAttr){
                    attr[k] = totalAttr[k];
                }
            }

            let infos = TextUtil.getAttrTextInfos(attr);
            this._listAttr.replaceAll(infos);

            let power = totalAttr.showpower || 0;
            this._view.power.setPowerValue(power);
        }

        protected onHide(): void {
            super.onHide();
        }

    }
}