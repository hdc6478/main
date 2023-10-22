namespace game.mod.role {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class RoleGodDescMdr extends EffectMdrBase {
        private _view: RoleGodDescView = this.mark("_view", RoleGodDescView);

        private _itemList: ArrayCollection;


        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = BaseDescItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected onShow(): void {
            super.onShow();

            let keyList = [RoleGodKey.Body, RoleGodKey.Wing, RoleGodKey.Weapon, RoleGodKey.Horse,
                RoleGodKey.Tianshen, RoleGodKey.Shenling, RoleGodKey.Xiuxian, RoleGodKey.XianlvChild,
                RoleGodKey.Huashen, RoleGodKey.Xianjian];

            let godRate = RoleVo.ins.getValueByKey(AttrKey.god_rate);//万分比

            let datas: { desc: string, title: string }[] = [];
            for(let k of keyList){
                let desc = this.getGodStr(k, godRate);
                let info: { desc: string, title: string } = {
                    desc : desc,
                    title: k
                };
                datas.push(info);
            }
            this._itemList.source = datas;
        }

        protected onHide(): void {
            super.onHide();
        }

        private getGodStr(k: RoleGodKey, godRate: number): string {
            let attr;
            switch (k) {
                case RoleGodKey.Xiuxian:
                    let _xianluProxy: IXianluProxy = facade.retMod(ModName.Xianlu).retProxy(ProxyType.Xianlu);
                    attr = _xianluProxy.xianpoattr;
                    break;
                case RoleGodKey.XianlvChild:
                    let _childProxy: IChildProxy = facade.retMod(ModName.Xianyuan).retProxy(ProxyType.Child);
                    attr = _childProxy.getAttr();
                    break;
                case RoleGodKey.Shenling:
                    let _shenLingProxy: IShenLingProxy = facade.retMod(ModName.Shenling).retProxy(ProxyType.Shenling);
                    attr = _shenLingProxy.getAttr();
                    break;
                case RoleGodKey.Xianjian:
                    let _xianjianProxy: IXianjianProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Xianjian);
                    attr = _xianjianProxy.getAttr();
                    break;
                default:
                    let headType = RoleGodKeyToConfigHead[k];
                    if(headType){
                        let _surfaceProxy: ISurfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
                        attr = _surfaceProxy.getSurfaceAllAttr(headType);
                    }
                    break;
            }
            let god = attr && attr.god ? attr.god : 0;
            //仙力*2500*(1+神识对应增幅系数)
            let godPower = Math.round(god * 2500 * (1 + godRate / 10000));
            let godStr = TextUtil.getAttrsText(AttrKey.god) + "：" + god + "（" + getLanById(LanDef.showpower) + "：" + godPower + "）";
            return godStr;
        }

    }
}