namespace game.mod.xianlu {

    import RebirthConfig = game.config.RebirthConfig;
    import LanDef = game.localization.LanDef;
    import GodpowerConfig = game.config.GodpowerConfig;

    export class XiuxianTipsMdr extends MdrBase {
        private _view: XiuxianTipsView= this.mark("_view", XiuxianTipsView);
        private _proxy: XianluProxy;
        public _showArgs: number;/**仙魄等级*/

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let lv = this._showArgs || this._proxy.model.xianpolevel || 1;
            let nameStr = getLanById(LanDef.xianpo_tips) + "·" + lv + getLanById(LanDef.tishi_43);
            this._view.lab_name.text = nameStr;

            let attrStr = getLanById(LanDef.bag_cue20);
            let curLv = this._proxy.model.xianpolevel;
            let attr = lv > curLv ? this._proxy.model.xianpo_nextattr : this._proxy.model.xianpo_attr;

            let godRate = 0;//仙力效果加成万分比
            if(attr && attr.showpower){
                //godRate = attr[AttrKey.god_rate]; @yys
                godRate = RoleVo.ins.getValueByKey(AttrKey.god_rate);

                //@yys
                let cfg:GodpowerConfig = getConfigByNameId(ConfigName.Godpower,curLv);
                attr[AttrKey.god_rate] = cfg && cfg.god_rate || 0;

                attrStr = TextUtil.getAttrText(attr, BlackColor.GREEN);
            }
            let desc1 = TextUtil.addColor(getLanById(LanDef.xianli_effect_tips), BlackColor.YELLOW) + "\n" + attrStr;
            this._view.baseDescItem1.updateShow(desc1, getLanById(LanDef.soul8), 20);

            let desc2 = getLanById(LanDef.tishi_38) + TextUtil.getAttrsText(AttrKey.god) + "："
                + TextUtil.addColor(RoleVo.ins.getValueByKey(AttrKey.god) + "", BlackColor.GREEN)+ "\n";
            let keyList = [AttrKey.god_atk, AttrKey.god_def, AttrKey.god_hp];
            for(let key of keyList){
                let curVal = RoleVo.ins.getValueByKey(key);
                let addStr = "";
                if(godRate){
                    //客户端用172500*(5000 / (5000+10000))计算出加成值57500，显示的时候就是172500（+57500）
                    //仙力效果
                    let addVal = Math.round(curVal * (godRate / (godRate + 10000)));
                    addStr = "（+" + addVal + "）";
                }
                desc2 += TextUtil.getAttrsText(key) + "：" + TextUtil.addColor(curVal + addStr, BlackColor.GREEN) + "\n";
            }
            this._view.baseDescItem2.updateShow(desc2, getLanById(LanDef.xianli_tips) + getLanById(LanDef.tishi_54), 20);

            let godpowerCfg: GodpowerConfig = getConfigByNameId(ConfigName.Godpower, lv);
            let index = godpowerCfg.advance_limit;
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index);
            let zhuanLv = cfg.relv;
            let curCfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, this._proxy.model.index);
            let curZhuanLv = curCfg.relv;
            let actStr = StringUtil.substitute(getLanById(LanDef.xianli_act_tips), [zhuanLv]);
            actStr += TextUtil.addColor("（" + curZhuanLv + "/" + + zhuanLv + "）", curZhuanLv >= zhuanLv ? BlackColor.GREEN : BlackColor.RED);
            this._view.lab_act.textFlow = TextUtil.parseHtml(actStr);
        }
    }
}