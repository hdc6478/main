namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class WonderfulActMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: WonderfulActMainBtnType.Btn1,
                icon: "xiannvsonglibiaoqiantubiao",
                mdr: WonderfulActMdr1,
                title: LanDef.jingcaihuodong_tips1,
                bg: "beijingtu_xiannvsongli",
                openIdx: OpenIdx.WonderfulAct,
                hintTypes: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn1]
            },
            {
                btnType: WonderfulActMainBtnType.Btn2,
                icon: 'cangzhengebiaoqiantubiao',
                mdr: WonderfulActMdr2,
                title: LanDef.jingcaihuodong_tips2,
                bg: "beijingtu_cangzhenkuo",
                openIdx: OpenIdx.WonderfulAct1,
                hintTypes: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn2],
                param: ActivityType.Cangzhenge
            },
            {
                btnType: WonderfulActMainBtnType.Btn3,
                icon: 'lianxuchongzhibiaoqiantubiao',
                mdr: WonderfulActMdr3,
                title: LanDef.jingcaihuodong_tips3,
                bg: "",
                openIdx: OpenIdx.WonderfulAct1,
                hintTypes: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn3],
                param: ActivityType.Lianxucharge
            },
            {
                btnType: WonderfulActMainBtnType.Btn4,
                icon: 'leichonghaolibiaoqiantubiao',
                mdr: WonderfulActMdr4,
                title: LanDef.jingcaihuodong_tips4,
                bg: "",
                openIdx: OpenIdx.Leijicharge,
                hintTypes: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn4],
                param: ActivityType.Leijicharge
            },
            {
                btnType: WonderfulActMainBtnType.Btn5,
                icon: 'denglujianglibiaoqiantubiao',
                mdr: WonderfulActMdr5,
                title: LanDef.jingcaihuodong_tips5,
                bg: "",
                openIdx: OpenIdx.WonderfulAct1,
                hintTypes: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn5],
                param: ActivityType.Loginrewards
            },
            {
                btnType: WonderfulActMainBtnType.Btn6,
                icon: 'hongyuncifu',
                mdr: WonderfulActMdr6,
                title: LanDef.jingcaihuodong_tips7,
                bg: "hongyuncifu_bg",
                openIdx: OpenIdx.WonderfulAct6,
                hintTypes: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn6]
            },
            {
                btnType: WonderfulActMainBtnType.Btn7,
                icon: 'tiannvcifu_tab',
                mdr: TiannvWelfareMdr,
                title: LanDef.jingcaihuodong_tips8,
                bg: "tiannvcifu_bg",
                openIdx: OpenIdx.TiannvWelfare,
                hintTypes: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn7],
                tag: "v9"
            },
            {
                btnType: WonderfulActMainBtnType.Btn8,
                icon: 'vipfuli_tab',
                mdr: VipWelfareMdr,
                title: LanDef.jingcaihuodong_tips9,
                bg: "p1_del_bg",
                openIdx: OpenIdx.VipWelfare,
                hintTypes: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn8],
                tag: "v5"
            },
            {
                btnType: WonderfulActMainBtnType.Btn9,
                icon: 'huanjingleichongbiaoqiantubiao',
                title: LanDef.fuchenlinghu_tips4,
                bg: '',
                mdr: HuanjingLeichongMdr,
                openIdx: OpenIdx.Huanjingleichong,
                hintTypes: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn9]
            },
            {
                btnType: WonderfulActMainBtnType.Btn10,
                icon: 'huanjinglibaobiaoqiantubiao',
                title: LanDef.fuchenlinghu_tips5,
                bg: '',
                mdr: HuanjingLibaoMdr,
                openIdx: OpenIdx.Huanjinglibao,
                hintTypes: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn10]
            }
        ];
        private _proxy: WonderfulActProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.WonderfulAct);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ActivityEvent.ON_WONDERFUL_ACT_CLOSE, this.onWonderfulActClose, this);
        }

        /**更新list数据*/
        protected updateBtnList() {
            let list: WndBaseViewData[] = [];
            let mdrs: MdrClsList = [];

            for (let data of this._btnData) {
                if (!this.checkShow(data)) {
                    continue;
                }
                mdrs.push(data.mdr);
                list.push(data);
            }

            this._btnList.source = list;
            this._tab.mdrClsList = mdrs;
        }

        private checkShow(data: WndBaseViewData): boolean {
            if (data.openIdx && !ViewMgr.getIns().checkViewOpen(data.openIdx)) {
                return false;
            }
            //额外的判断活动开启时间
            if (data.openIdx == OpenIdx.WonderfulAct1 || data.openIdx == OpenIdx.Leijicharge) {
                let actType = data.param;
                return this._proxy.canOpen(actType);
            } else if (data.openIdx == OpenIdx.TiannvWelfare) {
                return this._proxy.isTiannvOpen();
            } else if (data.openIdx == OpenIdx.VipWelfare) {
                return this._proxy.isVipOpen();
            }
            return true;
        }

        private onWonderfulActClose(n: GameNT): void {
            let btnType: string = n.body;
            let index = this.getMdrPosByType(btnType);
            if (index < 0) {
                return;
            }
            if (this._tab.selectIndex == index) {
                ViewMgr.getIns().showMain();//当前活动关闭时，返回主界面
            } else {
                this.updateBtnList();//其他分页活动关闭时，刷新页签
            }
        }
    }

}