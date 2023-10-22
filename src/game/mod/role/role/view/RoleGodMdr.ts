namespace game.mod.role {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class RoleGodMdr extends EffectMdrBase {
        private _view: RoleGodView = this.mark("_view", RoleGodView);

        private _itemList: ArrayCollection;
        private _proxy: IXianluProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = BaseZhuangshiItem;
            this._view.list_item.dataProvider = this._itemList;

            this._proxy = facade.retMod(ModName.Xianlu).retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
        }

        protected onShow(): void {
            super.onShow();
            this.updateShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickDesc() {
            facade.showView(ModName.Role, NewRoleViewType.RoleGodDesc);
        }

        private updateShow(): void {
            let vo = RoleVo.ins;
            let god = vo.god || 0;
            let godPower = vo && vo.godpower && vo.godpower.toNumber() || 0;
            let font = BmpTextCfg[BmpTextType.Layer];
            this.addBmpFont(god + "", font, this._view.grp_god);
            this._view.power.setPowerValue(godPower);

            let lv = this._proxy.xianpolevel;
            let lvStr = getLanById(LanDef.xianpo_tips) + getLanById(LanDef.level) + "：" + lv ;
            let godRate = vo.getValueByKey(AttrKey.god_rate);
            if(godRate){
                lvStr += "（仙力效果+" + (godRate / 100) + "%）";
            }
            this._view.lab_desc.text = lvStr;

            let descList: string[] = [];
            let keyList = [AttrKey.god_atk, AttrKey.god_def, AttrKey.god_hp];
            for(let key of keyList){
                let curVal = vo.getValueByKey(key);
                let addStr = "";
                if(godRate){
                    //客户端用172500*(5000 / (5000+10000))计算出加成值57500，显示的时候就是172500（+57500）
                    //仙力效果
                    let addVal = Math.round(curVal * (godRate / (godRate + 10000)));
                    addStr = "（+" + addVal + "）";
                }
                let desc = TextUtil.getAttrsText(key) + "：" + curVal +  TextUtil.addColor(addStr, BlackColor.GREEN);
                descList.push(desc);
            }
            this._itemList.source = descList;
        }
    }
}