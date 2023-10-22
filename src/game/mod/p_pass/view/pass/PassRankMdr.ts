namespace game.mod.pass {

    import TouchEvent = egret.TouchEvent;
    import s2c_mainline_rank = msg.s2c_mainline_rank;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import DisplayObjectContainer = egret.DisplayObjectContainer;

    export class PassRankMdr extends EffectMdrBase {
        private _view: PassRankView = this.mark("_view", PassRankView);
        private _coll: eui.ArrayCollection;

        private _proxy: PassProxy;

        constructor(parent: DisplayObjectContainer) {
            super(parent);
        }

        protected onInit(): void {
            super.onInit();

            this._view.horizontalCenter = 0;

            this._coll = new eui.ArrayCollection();
            this._proxy = this.retProxy(ProxyType.Pass);
            this._view.list.itemRenderer = PassRankRander;
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(PassEvent.UPDATE_PASS_RANK_INFO, this.updateRankInfo, this);
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_record, TouchEvent.TOUCH_TAP, this.openGodRank);
        }

        protected onShow(): void {
            super.onShow();

            this._view.list.dataProvider = this._coll;
            this._proxy.c2s_mainline_rank();
            this._proxy.c2s_mainline_rank_server_award();

            this._view.btn_record.setImage("title_jilu");
            this._view.btn_record.setEffect(UIEftSrc.Baoxiang);
        }

        protected onHide(): void {
            this._view.btn_record.clearEffect();
            super.onHide();
        }

        protected updateRankInfo(n: GameNT): void {
            let pass_date: s2c_mainline_rank = n.body;
            // 模型
            let info = pass_date.top_info;
            if (info) {
                this.updateRankUIRole(this._view.gr_gz_eff, info);
            }

            // 排名
            if (pass_date.my_rank) {
                this._view.lab_my_rank.text = getLanById(LanDef.tishi_12) + "：" + (pass_date.my_rank <= MAX_RANK_NUM ? pass_date.my_rank : "20+");
            } else {
                this._view.lab_my_rank.text = getLanById(LanDef.tishi_12) + "：" + MAX_RANK_NUM + "+";
            }
            if (pass_date.my_count) {
                this._view.lab_my_step.text = getLanById(LanDef.tishi_11) + '：';
                this.addBmpFont(this._proxy.getStepByIdx(pass_date.my_count) + "", BmpTextCfg[BmpTextType.CommonPower], this._view.grp_font, true, 1, true);
            } else {
                this._view.lab_my_step.text = getLanById(LanDef.tishi_11) + '：';
                this.addBmpFont("1", BmpTextCfg[BmpTextType.CommonPower], this._view.grp_font, true, 1, true);
            }
            let temp: msg.rank_role_info[] = [];
            if (pass_date.infos && pass_date.infos.length) {
                temp = pass_date.infos;
            }
            if (this._coll.length) {
                this._coll.replaceAll(temp);
            } else {
                this._coll.source = temp;
            }
        }

        private openGodRank(): void {
            ViewMgr.getIns().showSecondPop(ModName.Pass, PassViewType.PassGodRank);
        }

    }
}