namespace game.mod.more {


    import facade = base.facade;
    import Handler = base.Handler;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class XujieTansuoGridItem extends BaseRenderer {
        public img_gray: eui.Image;
        public img_light: eui.Image;
        public img_bg: eui.Image;
        public head: game.mod.Head;
        public img_yuanzhengzhong: eui.Image;
        public timeItem: game.mod.TimeItem;
        public gr_eft: eui.Group;
        public rect: eui.Rect;

        data: IXujieTansuoGridItemData;
        private _proxy: XujieTansuoProxy;
        private _isActed: boolean;
        private _transferUrl: string = 'assets/anim/creature/door_01/std_4';//传送格资源

        private _imgBg: { [type: number]: string } = {
            [XujieTansuoGridStatus.Reward]: 'tubiao_shangdian',
            [XujieTansuoGridStatus.Business]: 'tubiao_xianren',
            [XujieTansuoGridStatus.Expedition]: 'tubiao_baoxiang'
        };

        constructor() {
            super();
            this.skinName = `skins.more.XujieTansuoGridItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XujieTansuo);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.rect, this.onClick, this);
            this.gr_eft.scaleX = 0.5;
            this.gr_eft.scaleY = 0.5;
            this.img_light.touchEnabled = false;
            this.touchEnabled = false;
            this.gr_eft.y = 80;
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                this.defaultView();
                this.img_gray.visible = true;
                this.img_light.visible = false;
                return;
            }

            let isActed = this._proxy.isActedByRow(data.type, data.layer, data.row);
            this.img_gray.visible = !isActed;
            if (isActed) {
                this.img_light.visible = data.status != XujieTansuoGridStatus.Null;
            } else {
                this.img_light.visible = data.status == XujieTansuoGridStatus.Reward
                    || data.status == XujieTansuoGridStatus.Business
                    || data.status == XujieTansuoGridStatus.Expedition
                    || (data.status == XujieTansuoGridStatus.Monster && data.row == XujieTansuoRowCnt);
            }
            this._isActed = isActed;

            // todo
            if (data.status == XujieTansuoGridStatus.Monster) {
                this.monsterView();
                if (data.row == XujieTansuoRowCnt) {
                    //boss格
                    this.addMonster(data.grid[1], this.gr_eft);
                } else {
                    //怪物格
                    if (isActed) {
                        this.addMonster(data.grid[1], this.gr_eft);
                    } else {
                        this.defaultView();
                    }
                }
            } else if (data.status == XujieTansuoGridStatus.Reward) {
                this.rewardView();
            } else if (data.status == XujieTansuoGridStatus.Business) {
                this.businessView();
            } else if (data.status == XujieTansuoGridStatus.Expedition) {
                let gridInfo = this._proxy.getGridInfo(data.type, data.layer, data.row, data.col);
                let isExpedition = false;
                if (gridInfo && gridInfo.endtime) {
                    let endTime = gridInfo.endtime.toNumber();
                    if (endTime && TimeMgr.time.serverTimeSecond < endTime) {
                        isExpedition = true;//正在远征
                    }
                }
                this.expeditionView(isExpedition);
            } else if (data.status == XujieTansuoGridStatus.Transfer) {
                //传送特效
                this.transferView();
            } else {
                this.nullView();
            }
        }

        //空格子和未解锁的怪物格子， 不可点击
        private onClick(): void {
            let data = this.data;
            if (!data || data.status == XujieTansuoGridStatus.Null /*|| !this._isActed*/) {//todo
                return;
            }
            if (!this._isActed) {
                PromptBox.getIns().show(getLanById(LanDef.xujietansuo_tips28));
                return;
            }
            // todo
            if (!BagUtil.checkPropCntUp(PropIndex.XujieTansuoling, 1)) {
                return;
            }
            if (data.status == XujieTansuoGridStatus.Business) {
                //格子数据，3_消耗货币id_消耗货币的数量_掉落id(奖励为必掉的)_奖励预览id
                facade.showView(ModName.More, MoreViewType.XujieTansuoBusinessGrid, data);
            } else if (data.status == XujieTansuoGridStatus.Reward) {
                //2_任务id
                facade.showView(ModName.More, MoreViewType.XujieTansuoRewardGrid, data);
            } else if (data.status == XujieTansuoGridStatus.Monster) {
                if (!this._isActed) {
                    return;
                }
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XujieTansuoBossGrid, data);
            } else if (data.status == XujieTansuoGridStatus.Expedition) {
                //格子数据，4_数量_品质_需要挂机时长（秒）_掉落id_展示id
                let curInfo = this._proxy.expedition_info;
                if (!curInfo || (curInfo && curInfo.map_index == data.type && curInfo.layer == data.layer && curInfo.row == data.row && curInfo.pos == data.col)) {
                    facade.showView(ModName.More, MoreViewType.XujieTansuoExpeditionGrid, data);
                } else {
                    PromptBox.getIns().show(getLanById(LanDef.xujietansuo_tips32));
                    return;
                }
            } else if (data.status == XujieTansuoGridStatus.Transfer) {
                let maxLayer = this._proxy.getMaxLayerByType(data.type);
                if (maxLayer <= data.layer) {
                    PromptBox.getIns().show(getLanById(LanDef.xujietansuo_tips29));
                    return;
                }
                ViewMgr.getIns().showConfirm(getLanById(LanDef.xujietansuo_tips30), Handler.alloc(this, () => {
                    facade.sendNt(MoreEvent.ON_GOTO_XUJIETANSUO_NEXT_LAYER, data.layer + 1);
                }));
            }
        }

        //未激活空格
        private defaultView(): void {
            this.img_bg.visible = this.head.visible
                = this.img_yuanzhengzhong.visible = this.timeItem.visible = false;
            this.gr_eft.removeChildren();
            this.gr_eft.visible = false;
            // this.img_gray.visible = true;
        }

        //空格子
        private nullView(): void {
            this.defaultView();
        }

        //怪物格，boss格
        private monsterView(): void {
            this.defaultView();
            this.gr_eft.visible = true;
            this.gr_eft.y = 80;
        }

        //奖励格
        private rewardView(): void {
            this.defaultView();
            this.img_bg.visible = true;
            this.img_bg.source = this._imgBg[XujieTansuoGridStatus.Reward];
            this.img_bg.bottom = 70;
        }

        //商人格
        private businessView(): void {
            this.rewardView();
            this.img_bg.source = this._imgBg[XujieTansuoGridStatus.Business];
        }

        //远征格
        private expeditionView(inExpedition = false): void {
            this.defaultView();
            this.img_yuanzhengzhong.visible = this.timeItem.visible = this.head.visible = inExpedition;
            this.img_bg.visible = !inExpedition;
            if (this.img_bg.visible) {
                this.img_bg.source = this._imgBg[XujieTansuoGridStatus.Expedition];
                this.img_bg.bottom = 58;
            }
        }

        //传送格
        private transferView(): void {
            this.defaultView();
            this.gr_eft.visible = true;
            this.addEftByParent(this._transferUrl, this.gr_eft, 0, 0, -1, null, 0);
            this.gr_eft.y = 50;
        }

        //远征格子倒计时
        public updateTime(): void {
            let data = this.data;
            if (!data || data.status != XujieTansuoGridStatus.Expedition) {
                return;
            }
            let endTime = this._proxy.getExpeditionGridEndTimeByLayer(data.type, data.layer);
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this.expeditionView(false);
                return;
            }
            this.timeItem.updateLeftTime(leftTime);
        }
    }

    export interface IXujieTansuoGridItemData {
        type: number;//区域id
        layer: number;//当前层数
        row: number;//行数从1开始
        col: number;//列数从1开始
        status: XujieTansuoGridStatus;//0空格子，1怪物格，2奖励格，3商人格，4远征格，5传送格
        grid: number[];//格子数据
        isActed?: boolean;
    }


}