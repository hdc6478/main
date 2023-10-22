namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class TongtiangeStageItem extends eui.Component {
        public lb_desc: eui.Label;
        public list: eui.List;
        public img_status: eui.Image;
        public btn_do: game.mod.Btn;
        private _proxy: TongtiangeProxy;
        private _listData: eui.ArrayCollection;

        private _curStage: number;

        constructor() {
            super();
            this.skinName = `skins.activity.TongtiangeStageItemSkin`;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage(): void {
            this._proxy = getProxy(ModName.Activity, ProxyType.Tongtiange);
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btn_do.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btn_do.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        //更新界面
        public updateView(curStage: number): void {
            this._curStage = curStage;
            let cfgList = this._proxy.getPersonChallengeCfg(curStage);
            let stageInfo = this._proxy.model.stage_list[curStage];//轮次数据
            let doneCnt = 0;
            for (let cfg of cfgList) {
                let info = this._proxy.model.role_challenge_list[cfg.index];
                if (info && (info.status == 1 || info.status == 2)) {
                    doneCnt++;
                }
            }
            let totalCnt = cfgList.length;
            let str = StringUtil.substitute(getLanById(LanDef.tongtiange_tips13), [curStage])
                + TextUtil.addColor(`(${doneCnt}/${totalCnt})`,
                    doneCnt >= totalCnt ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_desc.textFlow = TextUtil.parseHtml(str);

            for (let i = totalCnt - 1; i >= 0; i--) {
                let cfg = cfgList[i];
                if (cfg && cfg.stage_reward) {
                    this._listData.replaceAll(cfg.stage_reward);
                    break;
                }
            }

            let status = stageInfo && stageInfo.status || RewardStatus.NotFinish;
            if (status == RewardStatus.NotFinish) {
                this.btn_do.visible = false;
                this.img_status.visible = true;
                this.img_status.source = `hongseweiwancheng`;
            } else if (status == RewardStatus.Draw) {
                this.btn_do.visible = false;
                this.img_status.visible = true;
                this.img_status.source = `lvseyiwancheng`;
            } else {
                this.btn_do.visible = true;
                this.img_status.visible = false;
                this.btn_do.setHint(true);
            }
        }

        private onClick(): void {
            let model = this._proxy.model;
            let info = model.stage_list[this._curStage];
            if (info && info.status == 1) {
                this._proxy.c2s_attic_get_reward(2, this._curStage);
            }
        }
    }
}