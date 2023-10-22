namespace game.mod.surface {

    import LanDef = game.localization.LanDef;
    import PropConfig = game.config.PropConfig;
    import ArrayCollection = eui.ArrayCollection;

    export class SurfacePillTipsMdr extends MdrBase {
        private _view: SurfacePillTipsView = this.mark("_view", SurfacePillTipsView);
        private _proxy: SurfaceProxy;
        public _showArgs: {selData: AvatarItemData, data: number[]};/**外显配置，炼神丹_max数量*/
        private _propData: PropData;
        private _attrList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._attrList = new ArrayCollection();
            this._view.list_attr.itemRenderer = BaseZhuangshiItem;
            this._view.list_attr.dataProvider = this._attrList;

            this._proxy = this.retProxy(ProxyType.Surface);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
            this.updateAttr();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let selData = this._showArgs.selData;
            let data = this._showArgs.data;
            let cfg = selData.cfg;
            let index = data[0];
            this._propData = PropData.create(index);
            this._view.basePropTips.updateShow(this._propData);

            let maxCnt = selData.star ? data[1] : 0;
            let useCnt = this._proxy.getPillUseCnt(cfg.index, index);
            this._view.lab_cnt.text = getLanById(LanDef.tundan_tips3) + "：" + useCnt + "/" + maxCnt;
        }

        private updateAttr(): void {
            let selData = this._showArgs.selData;
            let data = this._showArgs.data;
            let cfg = selData.cfg;
            let index = data[0];

            let propCfg = this._propData.cfg as PropConfig;
            let attrIndex = propCfg.param1[0][0];
            let attr = RoleUtil.getAttr(attrIndex);
            if(!attr){
                return;
            }
            this._view.power.setPowerValue(attr.showpower);
            this._view.baseAttrItem.updateShow(attr, true, getLanById(LanDef.add_attr_tips));

            let desc = propCfg.desc + "\n" + TextUtil.addColor(StringUtil.substitute(getLanById(LanDef.tundan_tips2), [cfg.name]), BlackColor.DEFAULT);
            this._view.baseDescItem.updateShow(desc, getLanById(LanDef.tundan_tips1));

            let headType = PropData.getPropParse(cfg.index, PropParseType.Type);

            let costList = this._proxy.getSurfacePillCostList(cfg.quality, headType, index);
            let infos: string[] = [];
            for(let i = 0; i < costList.length; ++i){
                let upStar = i + 1;
                let costInfo = costList[i];
                let cost = costInfo[1];

                // let propType = PropData.propType(costInfo[0]);

                let isAct = selData.star >= upStar;
                let starStr = upStar + getLanById(LanDef.soul2);
                let costStr = `${cost}`;
                if(isAct){
                    starStr = TextUtil.addColor(starStr, BlackColor.GREEN);
                    costStr = TextUtil.addColor(costStr, BlackColor.GREEN);
                }
                let desc = starStr + "，" + getLanById(LanDef.tundan_tips1) + costStr;
                if(!isAct){
                    desc = TextUtil.addColor(desc + "（" + selData.star + "/" + upStar + "）", BlackColor.GRAY);
                }
                infos.push(desc);
            }
            this._attrList.source = infos;
        }
    }
}