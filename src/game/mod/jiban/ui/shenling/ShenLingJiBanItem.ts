namespace game.mod.jiban {

    import god_brother_group_data = msg.god_brother_group_data;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class ShenLingJiBanItem extends BaseListenerRenderer {
        public lb_name: eui.Label;
        public lb_num: eui.Label;
        public power: game.mod.Power;
        public btn_reward: game.mod.Btn;
        public list: eui.List;
        public lb_attr: eui.Label;
        public btn_act: game.mod.Btn;
        public img_max: eui.Image;

        public data: IShenLingJiBanItemData;
        private _proxy: IShenLingProxy;
        private _listData: eui.ArrayCollection;

        constructor() {
            super();
            this.skinName = `skins.jiban.ShenLingJiBanItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            this.list.itemRenderer = AvatarItem;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_act, this.onClickAct, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_reward, this.onClickReward, this);
            this.addEventListenerEx(eui.ItemTapEvent.ITEM_TAP, this.list, this.onClickList, this);
            // facade.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
            this.btn_reward.setHintStyle(-3, -8);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            // facade.offNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let jibanCfg = this._proxy.getJiBanCfg(data.index)[0];
            if (!jibanCfg) {
                return;
            }
            this.lb_name.text = jibanCfg.name;
            let info = data.info;
            this.updateAttr();
            let actNum = 0;
            let listData: AvatarItemData[] = [];
            let actedList = info && info.idlist ? info.idlist : [];
            let actedMap = {};//激活的神灵
            for (let id of actedList) {
                actedMap[id.toNumber()] = true;
            }
            for (let index of jibanCfg.partners) {
                let info = this._proxy.getInfoByIndex(index);
                if (info) {
                    actNum++;
                }
                let isAct = !!actedMap[index];
                let showHint = this._proxy.getJiBanShenLingActHint(data.index, index);
                let avatarItem: AvatarItemData = {
                    cfg: this._proxy.getShenLingCfg(index),
                    showHint: showHint,
                    star: !isAct ? 0 : (info && info.star || 0),
                    isBattle: false,
                    isSel: showHint //红点就有选中框
                };
                listData.push(avatarItem);
            }
            this._listData.replaceAll(listData);

            let isMax = info && info.level >= data.maxLv;
            this.img_max.visible = isMax;
            this.btn_act.visible = !isMax;
            if (!isMax) {
                this.btn_act.label = getLanById((!info || info.level < 1) ? LanDef.active : LanDef.uplv);
                this.btn_act.setHint(this._proxy.getJiBanActHint(data.index));
            }
            let totalNum = jibanCfg.partners.length;
            let color = actNum >= totalNum ? WhiteColor.GREEN : WhiteColor.RED;
            this.lb_num.textFlow = TextUtil.parseHtml(TextUtil.addColor(`(${actNum}/${totalNum})`, color));

            this.btn_reward.setHint(this._proxy.getJiBanRewardHint(data.index));
        }

        private onClickReward(): void {
            ViewMgr.getIns().showSecondPop(ModName.Jiban, JibanViewType.ShenLingJiBanAward, this.data.index);
        }

        private onClickAct(): void {
            let data = this.data;
            if (!data || !this._proxy.getJiBanActHint(data.index, true)) {
                return;
            }
            if (!data.info || data.info.level >= data.maxLv) {
                return;
            }
            this._proxy.c2s_god_brother_groupup(data.index, null, null);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let item = e.item as AvatarItemData;
            if (item && item.showHint) {
                this._proxy.c2s_god_brother_groupup(this.data.index, null, item.cfg.index);
                return;
            }
            ViewMgr.getIns().showPropTips(item.cfg.index);
            this.list.selectedIndex = null;
        }

        private updateAttr(): void {
            let info = this.data.info;
            let jibanCfg = this._proxy.getJiBanCfg(this.data.index)[0];

            let attrs: msg.attributes;
            if (info && info.level) {
                attrs = info.attrs;
                jibanCfg = this._proxy.getJiBanCfg(this.data.index)[info.level - 1];
            } else {
                attrs = RoleUtil.getAttr(jibanCfg && jibanCfg.property || 0);
            }

            this.power.setPowerValue(attrs && attrs.showpower ? attrs.showpower : 0);
            let key = AttrKey.god;
            let txt = (jibanCfg && jibanCfg.desc || '') + '\n' +
                TextUtil.getAttrsText(key) + TextUtil.addColor(' +' + (attrs && attrs[key] || 0), WhiteColor.GREEN);
            this.lb_attr.textFlow = TextUtil.parseHtml(txt, true);
        }
    }

    /**神灵羁绊列表item类*/
    export interface IShenLingJiBanItemData {
        index: number;                  //羁绊index
        info: god_brother_group_data;   //神灵羁绊信息
        maxLv: number;                  //最大羁绊等级
    }
}