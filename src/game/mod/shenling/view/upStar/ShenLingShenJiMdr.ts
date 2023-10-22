namespace game.mod.shenling {


    import BattleSkillConfig = game.config.BattleSkillConfig;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import clearDelay = base.clearDelay;

    /**神迹*/
    export class ShenLingShenJiMdr extends MdrBase {
        private _view: ShenLingShenJiView = this.mark("_view", ShenLingShenJiView);
        private _proxy: ShenLingProxy;
        private _listData: eui.ArrayCollection;
        private _listAwaken: eui.ArrayCollection;
        private _type: number;
        private _index: number;//神灵index
        private _starMap: { [star: number]: number } = {};//星级对应的天赋
        private _delayId: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Shenling);
            this._view.list.itemRenderer = ShenLingShenJiItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.list_awaken.itemRenderer = Icon;
            this._view.list_awaken.dataProvider = this._listAwaken = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ShenLingEvent.ON_SHEN_LING_REWARD_UPDATE, this.updateList, this);
        }

        protected onShow(): void {
            super.onShow();
            this._type = this._showArgs[0];
            this._index = this._showArgs[1];
            if (!this._index) {
                return;
            }
            this._view.scroller.viewport.scrollV = 0;
            this.updateInfo();
            this.updateList();
            if (this._proxy.haveAwakenStatue(this._index)) {
                this._view.currentState = 'awaken';
                this.updateAwakenReward();
            } else {
                this._view.currentState = 'noAwaken';
            }

            let txt = '';
            let keys = Object.keys(this._starMap);
            for (let i = 0; i < keys.length; i++) {
                let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this._starMap[keys[i]]);
                if (!cfg) {
                    continue;
                }
                txt += cfg.name + (i & 1 ? '\n' : '、');
            }
            this._view.lb_skillName.text = txt;

            this._delayId = delayCall(Handler.alloc(this, this.updateScrollerView), 35);
        }

        private updateInfo(): void {
            let info = this._proxy.getInfoByIndex(this._index);
            let data: AvatarItemData = {
                cfg: this._proxy.getShenLingCfg(this._index),
                showHint: false,
                star: info && info.star || 0,
                isBattle: false
            };
            this._view.avatarItem.data = data;
            this._view.avatarItem.setGray(false);

            let cfg = this._proxy.getShenLingCfg(this._index);
            this._view.lb_name.text = cfg.name;
        }

        private updateAwakenReward(): void {
            let star = this._proxy.getMaxStar(this._index) + 1;
            let cfg = this._proxy.getStarCfg(this._index, star);
            this._listAwaken.replaceAll(cfg.star_award);
        }

        private updateList(): void {
            let cfgObj = this._proxy.getStarCfgList(this._index);
            let rewardList = this._proxy.model.rewardList[this._index] || [];
            let info = this._proxy.getInfoByIndex(this._index);
            let list: ISLShenJiItemData[] = [];
            let i = 0;
            for (let star in cfgObj) {
                let cfg = cfgObj[star];
                if (cfg.awaken) {
                    continue;
                }
                list.push({
                    index: cfg.shenling_index,
                    cfg: cfg,
                    status: rewardList[i] || 0,
                    talent_index: this.getTalentIndex(cfg.shenling_star),
                    curStar: info && info.star || 0
                });
                i++;
            }

            this._listData.replaceAll(list);
        }

        private getTalentIndex(star: number): number {
            if (this._starMap[star]) {
                return this._starMap[star];
            }
            let cfg = this._proxy.getShenLingCfg(this._index);
            for (let item of cfg.talent1) {
                this._starMap[item[0]] = item[1];
            }
            return this._starMap[star];
        }

        protected onHide(): void {
            super.onHide();
            this.clearDelayId();
        }

        private updateScrollerView(): void {
            let size = this._listData.source.length;
            let curItemIndex: number = 0;
            for (let i = 0; i < size; i++) {
                let item = this._listData.source[i] as ISLShenJiItemData;
                if (item && item.status != 2) {
                    curItemIndex = i;
                    break;
                }
            }
            let layout = this._view.list.layout as eui.VerticalLayout;
            let gap = layout && layout.gap || 6;
            let itemH = 152;
            let scrollV = curItemIndex * itemH + gap * curItemIndex;
            let viewport = this._view.scroller.viewport;
            let contentH = viewport.contentHeight;
            let viewH = this._view.scroller.height;
            if (scrollV >= contentH - viewH) {
                scrollV = contentH - viewH;
            }
            viewport.scrollV = scrollV;

            this.clearDelayId();
        }

        private clearDelayId(): void {
            if (this._delayId) {
                clearDelay(this._delayId);
            }
        }
    }
}