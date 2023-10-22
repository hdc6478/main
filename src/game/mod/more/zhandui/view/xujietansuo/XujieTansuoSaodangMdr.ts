namespace game.mod.more {

    import Monster1Config = game.config.Monster1Config;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import GameNT = base.GameNT;
    import xujietansuo_row_grid_struct = msg.xujietansuo_row_grid_struct;
    import LanDef = game.localization.LanDef;

    export class XujieTansuoSaodangMdr extends MdrBase {
        private _view: XujieTansuoSaodangView = this.mark("_view", XujieTansuoSaodangView);
        private _proxy: XujieTansuoProxy;
        private _listData: eui.ArrayCollection;
        private _gridItemData: IXujieTansuoGridItemData;
        private _gridInfo: xujietansuo_row_grid_struct;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_saodang, egret.TouchEvent.TOUCH_TAP, this.onClickSaodang, this);
            addEventListener(this._view.btn_challenge, egret.TouchEvent.TOUCH_TAP, this.onClickChallenge, this);

            this.onNt(ActivityEvent.ON_BTN_BUY_CNT_POST, this.onBtnBuyCntPost, this);
            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_BASE_INFO, this.updateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._gridItemData = this._showArgs;
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        //监听协议，扫荡数据变化
        private onUpdateView(): void {
            this.updateView();
        }

        //最近伤害记录
        public getHurt(): number {
            let gridInfo = this._gridInfo;
            if (!gridInfo) {
                return 0;
            }
            return gridInfo.last_hurt_value ? gridInfo.last_hurt_value.toNumber() : 0;
        }

        //todo 最近的伤害，血条
        private updateView(): void {
            let data = this._gridItemData;
            let grid = data.grid;
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, grid[1]);
            if (!monsterCfg) {
                return;
            }
            let gridInfo: xujietansuo_row_grid_struct = this._proxy.getGridInfo(data.type, data.layer, data.row, data.col);
            this._gridInfo = gridInfo;

            this._view.lb_name.text = monsterCfg.name;
            this._view.img_icon.source = monsterCfg.res_id;

            let cfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, grid[4]);
            if (cfg) {
                this._listData.replaceAll(cfg.content);
            }

            let hurt = this.getHurt();
            this._view.lb_record.textFlow = TextUtil.parseHtml(`最近伤害记录：` + hurt);

            let hp = gridInfo && gridInfo.boss_hp ? gridInfo.boss_hp.toNumber() : 0;
            let maxHp = gridInfo && gridInfo.boss_max_hp ? gridInfo.boss_max_hp.toNumber() : 0;
            this._view.bar.show(hp, maxHp, false, 0, false, ProgressBarType.Percent);

            //最大扫荡次数
            let leftCnt = 0;
            let cnt = BagUtil.getPropCntByIdx(PropIndex.XujieTansuoling);
            if (hurt) {
                leftCnt = Math.ceil(hp / hurt);//使boss死亡
            }
            if (leftCnt && leftCnt < cnt) {
                cnt = leftCnt;
            }
            this._view.btnListView.setMaxCnt(cnt);
            this._view.btnListView.setCostCnt(PropIndex.XujieTansuoling, cnt);
            this.updateHurtStr(cnt);
        }

        //次数更新
        private onBtnBuyCntPost(n: GameNT): void {
            let cnt = n.body as number;
            this.updateHurtStr(cnt);
        }

        //对boss造成xx伤害（y%）
        private updateHurtStr(cnt: number): void {
            let hurt = this.getHurt() * cnt;
            let maxHp = this._gridInfo && this._gridInfo.boss_max_hp ? this._gridInfo.boss_max_hp.toNumber() : 1;
            let progress = Math.max(0, Math.floor(hurt * 100 / maxHp));// 造成的伤害/boss血量
            let str = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips19), [TextUtil.addColor(StringUtil.getHurtNumStr(hurt), WhiteColor.GREEN), progress]);
            this._view.lb_hurt.textFlow = TextUtil.parseHtml(str);
        }

        //todo
        private onClickSaodang(): void {
            let cnt = this._view.btnListView.getCnt();
            if (!BagUtil.checkPropCntUp(PropIndex.XujieTansuoling, cnt)) {
                return;
            }

            let data = this._gridItemData;
            this._proxy.c2s_zhandui_xujietansuo_role_click(XujieTansuoOperType.Oper6, data.type, data.layer, data.row, data.col, null, cnt);
        }

        //todo
        private onClickChallenge(): void {
            if (!BagUtil.checkPropCntUp(PropIndex.XujieTansuoling, 1)) {
                return;
            }

            let data = this._gridItemData;
            this._proxy.c2s_zhandui_xujietansuo_role_click(XujieTansuoOperType.Oper5, data.type, data.layer, data.row, data.col);
            this.hide();
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            if (indexs.indexOf(PropIndex.XujieTansuoling) > -1) {
                this.updateView();
            }
        }
    }
}