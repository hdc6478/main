namespace game.mod.jiban {

    import BodyJibanConfig = game.config.BodyJibanConfig;
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import attributes = msg.attributes;
    import facade = base.facade;

    export class RoleHuanHuaMdr extends EffectMdrBase {
        private _view: RoleHuanHuaView = this.mark("_view", RoleHuanHuaView);
        private _proxy: ShoujiHuanhuaProxy;
        private _listData: eui.ArrayCollection;
        private _curIdx = -1;//当前选中的
        private _curCfg: BodyJibanConfig;//当前套装配置

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.ShoujiHuanhua);
            this._view.list_item.itemRenderer = RoleHuanHuaItem;
            this._view.list_item.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_item, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct, this);
            this.onNt(JiBanEvent.ON_HUANHUA_INFO_UPDATE, this.onUpdateView, this);
            this.onNt(SurfaceEvent.SURFACE_INFO_UPDATE, this.onUpdateSurfaceInfo, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttr, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateListData();
        }

        private updateListData(): void {
            this._listData.replaceAll(this._proxy.getBodyJiBanCfgList());
            this._view.list_item.selectedIndex = 0;
            this._curIdx = 0;
            this.updateView();
        }

        private onUpdateView(): void {
            this._listData.replaceAll(this._proxy.getBodyJiBanCfgList());
            // this._view.list_item.selectedIndex = this._curIdx;
            this.updateView();
        }

        private updateView(): void {
            if (!this._listData.source[this._curIdx]) {
                return;
            }
            let cfg = this._listData.source[this._curIdx] as BodyJibanConfig;
            if (!cfg) {
                return;
            }
            this._view.img_name.source = `role_huanhua_title${cfg.index}`;
            this._view.img_eff.source = `role_huanhua${cfg.index}`;
            this._curCfg = cfg;
            this._view.nameItem.updateShow(cfg.name, cfg['quality'] || 1);

            let info = this._proxy.getHuanHuaInfo(cfg.index);
            this.onUpdateAttr();

            let isAct = this._proxy.isActed(cfg.index);
            if (isAct) {
                this._view.img_acted.visible = true;
                this._view.btn_act.visible = this._view.lb_actCond.visible = false;
            } else {
                this._view.img_acted.visible = false;
                this._view.btn_act.visible = this._view.lb_actCond.visible = true;
            }

            let fashionPart = cfg.fashion_part;
            let rankInfo: RankUIRoleData = {
                fashion: fashionPart[2],
                weapon: fashionPart[1],
                wing: fashionPart[0],
                sex: RoleVo.ins.sex
            };//性别取玩家性别
            this.updateRankUIRole(this._view.gr_eff, rankInfo);

            let actCnt = 0;
            for (let i = 0; i < fashionPart.length; i++) {
                let part = fashionPart[i];
                let acted = false;
                if (info && info.waixian_id && info.waixian_id.indexOf(part) > -1) {
                    acted = true;
                    actCnt++;
                }
                this.updateIconView(part, i, acted, this._proxy.canActHuanHuaIcon(this._curCfg.index, part));
            }
            if (this._view.lb_actCond.visible) {
                let str = TextUtil.addColor(`(${actCnt}/${fashionPart.length})`, actCnt >= fashionPart.length ? WhiteColor.GREEN : WhiteColor.RED);
                this._view.lb_actCond.textFlow = TextUtil.parseHtml(`激活条件：套装收集` + str);
            }

            let isHint = info && info.is_act && info.is_act == 1;
            this._view.btn_act.setHint(isHint);
        }

        private onUpdateAttr(): void {
            if (!this._listData.source[this._curIdx]) {
                return;
            }
            let cfg = this._listData.source[this._curIdx] as BodyJibanConfig;
            if (!cfg) {
                return;
            }
            let info = this._proxy.getHuanHuaInfo(cfg.index);
            let isActed = info && info.is_act && info.is_act == 2;
            let attr: attributes = RoleUtil.getAttr(cfg.once_property);
            let godRate = 0;
            if (isActed) {
                let xianluProxy: IXianluProxy = facade.retMod(ModName.Xianlu).retProxy(ProxyType.Xianlu);
                let xianlvAttr = xianluProxy.xianpoattr;
                //@yys
                godRate = RoleVo.ins.getValueByKey(AttrKey.god_rate);
                //godRate = xianlvAttr && xianlvAttr[AttrKey.god_rate] || 0;
            }

            let power = attr && attr.showpower ? attr.showpower.toNumber() : 0;// 战力
            let godPower = attr && attr.god ? attr.god : 0;//仙力
            if (godRate) {
                power = power + power * godRate / 10000;
                godPower = godPower + godPower * godRate / 10000;
            }
            this._view.power.setPowerValue(power);
            this._view.godItem.updateGod(godPower);
        }

        private updateIconView(index: number, idx: number, isAct: boolean, hint: boolean): void {
            (this._view[`icon${idx}`] as RoleHuanHuaIconItem).data = {
                index, idx, isAct, hint,
                suitIndex: this._curCfg.index
            } as IRoleHuanHuaIconData;
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickList(e: eui.ItemTapEvent): void {
            this._curIdx = e.itemIndex;
            this.updateView();
        }

        private onClickAct(): void {
            if (!this._curCfg) {
                return;
            }
            let info = this._proxy.getHuanHuaInfo(this._curCfg.index);
            if (info && info.is_act == 1) {
                this._proxy.c2s_huanhua_act(1, this._curCfg.index, null);
            } else {
                PromptBox.getIns().show(`激活条件不足`);
            }
        }

        private onUpdateSurfaceInfo(n: GameNT): void {
            let type = n.body as number;
            if (this._proxy.headTypes.indexOf(type) > -1) {
                this.updateView();
            }
        }
    }
}