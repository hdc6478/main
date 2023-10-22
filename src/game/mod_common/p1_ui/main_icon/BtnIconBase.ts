namespace game.mod {


    import Handler = base.Handler;
    import TimeMgr = base.TimeMgr;

    /**
     * 按钮基类
     */
    export class BtnIconBase extends Btn {
        public img_bg: eui.Image;
        public iconDisplay: eui.Image;
        public labelDisplay: eui.Label;
        public gr_eff: eui.Group;
        public redPoint: eui.Image;
        public gr_time: eui.Group;
        public lb_time: eui.Label;
        public group: eui.Group;

        /** 按钮数据 */
        private _data: IBtnIconData;
        /**特效id*/
        private _effId: number;
        /**特效id*/
        private _effSweeppId: number;
        /** 按钮id BtnIconId */
        private _id: number;
        // /**初次点击红点*/
        // private _clickHint = false;
        // /**初次点击特效*/
        // private _clickEff = false;
        private _isBig: boolean = false;//是否冲榜按钮

        /**点击缓存*/
        public static _hintCache: { [type: number]: boolean } = {};
        /**点击缓存*/
        public static _effCache: { [type: number]: boolean } = {};

        constructor(id: number, isBig?: boolean) {
            super();
            this.skinName = isBig ? 'skins.activity.BtnIconBigSkin' : 'skins.activity.BtnIconBaseSkin';
            this._isBig = isBig;
            this._id = id;
            this.name = `btnIcon_${id}`;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            if (this.gr_time) {
                this.gr_time.visible = false;
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.addEventListener(eui.UIEvent.MOVE, this.onMove, this);
            this.updateUI();
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.removeEffect();
            if (this.gr_time) {
                this.gr_time.visible = false;
            }
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }

        public set data(data: IBtnIconData) {
            this._data = data;
            // if (data.hintType == BtnIconHintType.Once) {
            //     if (BtnIconBase._hintCache[data.id] == undefined) {
            //         // this._clickHint = true; //初次点击红点，初始为true
            //     }
            // }
            // if (data.effType == BtnIconEffType.Once) {
            //     if (!BtnIconBase._effCache[data.id] == undefined) {
            //         // this._clickEff = true;
            //     }
            // }
        }

        public get data(): IBtnIconData {
            return this._data;
        }

        public get id(): number {
            return this._id;
        }

        /**
         * 设置icon
         * 默认icon都是放在 aaaa\ui_btn_icon1
         */
        private setIcon(): string {
            if (this._data && this._data.icon) {
                return this._data.icon;
            }
            return '';
        }

        /**
         * 点击事件，设置为公共，支持外部指引回调
         */
        public onTap(): void {
            let btnData = this.data;
            if (btnData.guideKey) {
                GuideMgr.getIns().clear(btnData.guideKey);//清除指引
            }

            //点击后，红点处理
            if (btnData.hintType == BtnIconHintType.Once) {
                // this._clickHint = false;
                BtnIconBase._hintCache[btnData.id] = true;//点击过了
                this.setHint(false);
            }
            if (btnData.hintType == BtnIconHintType.FirstCommon) {
                let hint = this.getHint();//红点规则
                // this._clickHint = hint;
                BtnIconBase._hintCache[btnData.id] = true;//点击过了
                this.setHint(hint);
            }

            //点击后，特效处理
            if (btnData.effType == BtnIconEffType.Once) {
                // this._clickEff = false;
                BtnIconBase._effCache[btnData.id] = true;//点击过了
                this.updateEffect(false);
            }
            if (btnData.effType == BtnIconEffType.FirstCommon) {
                let hint = this.getHint();//红点规则
                // this._clickEff = hint;
                BtnIconBase._effCache[btnData.id] = true;//点击过了
                this.updateEffect(hint);
            }

            if (btnData.clickHandler) {
                btnData.clickHandler.exec(this.data);
                return;
            }
            if (btnData) {
                let showBack = !!btnData.showBack;
                ViewMgr.getIns().showView(btnData.m, btnData.v, btnData.param, showBack);
            }
        }

        private onMove(): void {
            let btnData = this.data;
            if (btnData.showTips) {
                BtnTipsMgr.getIns().updatePos(this);
            }
        }

        // /**强制刷一次*/
        // public onUpdateUI(): void {
        //     this.updateUI();
        // }

        /**
         * 更新按钮的ui
         * 只触发一次，添加到舞台时
         */
        private updateUI(): void {
            if (this.setIcon()) {
                this.iconDisplay.source = this.setIcon();
            }

            let hintType = this.data.hintType;
            let hint: boolean = false;
            if (hintType == BtnIconHintType.Once) {
                hint = BtnIconBase._hintCache[this.data.id] == undefined;
            } else if (hintType == BtnIconHintType.FirstCommon) {
                hint = BtnIconBase._hintCache[this.data.id] == undefined || this.getHint();
            } else if (hintType == BtnIconHintType.Common) {
                hint = this.getHint();
            }
            this.setHint(hint);

            let effType = this.data.effType;
            let showEff = false;
            if (effType == BtnIconEffType.Forever) {
                showEff = true;
            } else if (effType == BtnIconEffType.Once) {
                showEff = BtnIconBase._hintCache[this.data.id] == undefined;
            } else if (effType == BtnIconEffType.FirstCommon) {
                showEff = BtnIconBase._hintCache[this.data.id] == undefined || hint;
            } else if (effType == BtnIconEffType.Common) {
                showEff = hint;
            }
            this.updateEffect(showEff);

            let showSweepEff = this.data.sweepType && this.data.sweepType == 1;
            this.updateSweepEffect(showSweepEff);

            this.updateTime();
        }

        private getHint(): boolean {
            if (this.data.hintMsg) {
                return HintMgr.getHint(this.data.hintMsg);//默认红点规则
            } else if (this.data.hintMsgList) {
                let hint = false;
                for (let hintMsg of this.data.hintMsgList) {
                    if (HintMgr.getHint(hintMsg)) {
                        hint = true;
                        break;
                    }
                }
                return hint;//组合模块红点
            }
            return false;
        }

        /**
         * 设置按钮红点
         */
        public setHint(hint: boolean): void {
            this.redPoint.visible = hint;

            if (this.data.effType == BtnIconEffType.Common || this.data.effType == BtnIconEffType.FirstCommon) {
                this.updateEffect(hint);
            }
        }

        /**
         * 0 表示插入末尾
         * >0 表示序号
         */
        public getSortNum(): number {
            if (this._data) {
                return this._data.sort_num;
            }
            return 0;
        }

        /**
         * 更新特效
         * @param showEff 红点规则下的特效展示，默认false
         * @private
         */
        private updateEffect(showEff = false): void {
            if (!showEff) {
                this.removeEffect();
                return;
            }
            if (showEff && !this._effId) {
                let eftSrc = this._isBig ? UIEftSrc.FeiShengBang : UIEftSrc.ActBtnEffect;
                this._effId = BtnIconMgr.ins().addEftByParent(ResUtil.getEffectUI(eftSrc), 0, this.gr_eff);
            }
        }

        private removeEffect() {
            if (this._effId) {
                BtnIconMgr.ins().removeEffect(this._effId);
                this._effId = null;
            }
        }

        /**
         * 更新特效
         * @param showEff 扫描光特效
         * @private
         */
        private updateSweepEffect(showEff = false): void {
            if (!showEff) {
                this.removeSweepEffect();
                return;
            }
            if (showEff && !this._effSweeppId) {
                this._effSweeppId = BtnIconMgr.ins().addEftByParent(ResUtil.getEffectUI(UIEftSrc.SweepBtnEffect), 0, this.gr_eff);
            }
        }

        private removeSweepEffect() {
            if (this._effSweeppId) {
                BtnIconMgr.ins().removeEffect(this._effSweeppId);
                this._effSweeppId = null;
            }
        }

        /**
         * 更新时间或者其他文本
         * @param timeStr 若有，则优先展示这个文本
         */
        public updateTime(timeStr?: string): void {
            if (!this.gr_time) {
                return;
            }
            if (!this.gr_time.visible) {
                this.gr_time.visible = true;
            }
            if (timeStr) {
                this.lb_time.textFlow = TextUtil.parseHtml(timeStr);
                return;
            }

            let endTime = this.data.endTime || 0;
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this.gr_time.visible = false;
                return;
            }
            this.lb_time.text = TimeUtil.formatSecond(leftTime, 'd天H时', true);
        }
    }


    export interface IBtnIconData {
        /**唯一标识，OpenIdx，中控活动存的是活动ID*/
        id: number;
        /**ModName*/
        m: ModName;
        /**ViewType*/
        v: string;
        /**BtnType，或者传入mdr参数*/
        param?: any | any[] | OperActivityData;
        /**红点路径，不传则由m,v组合而成*/
        hintMsg?: string[];
        hintMsgList?: string[][];//支持多模块
        /**是否隐藏*/
        isHide?: boolean;
        /**是否展示倒计时，处理优先级高于 endTime。可强制设true展示字符串文本*/
        showTime?: boolean;
        /**展示倒计时文本，结束时间戳，单位是秒。默认倒计时结束主动移除按钮 todo 待实现*/
        endTime?: number;
        /**额外监听事件*/
        handlerMsg?: string;
        /**额外判断隐藏或展示，处理优先级低于 isHide*/
        handler?: Handler;
        /**按钮红点类型，处理优先级比 hintMsg 高，不传默认hintMsg规则。(若不传红点类型，默认红点规则Common)*/
        hintType?: BtnIconHintType;
        /**按钮特效类型，默认无特效。从配置中读取，不可手动设置*/
        effType?: BtnIconEffType;
        /**按钮扫描光特效，默认无特效*/
        sweepType?: number;
        /**icon，不需要传，中控活动直接传icon进来*/
        icon?: string;
        /**排序，不需要传*/
        sort_num?: number;
        /**通用界面返回逻辑，默认不走*/
        showBack?: boolean;
        /**点击事件，额外的判断等操作，不传默认打开[m,v]*/
        clickHandler?: Handler;
        /**是否已经初始化 */
        isInit?: boolean;
        /**初始化调用函数 */
        initHandler?: Handler;
        /**指引ID*/
        guideKey?: number,
        // /**主界面按钮类型：MainBtnType*/
        // mainBtnType?: number,
        /**中控活动时用的功能开启ID*/
        openIdx?: number,
        /**是否展示BtnTipsMgr的提示*/
        showTips?: boolean,
    }

    //todo 提取到配置表
    export enum BtnIconHintType {
        /**永不展示红点*/
        None = 1,
        /**初次点击红点*/
        Once = 2,
        /**根据红点规则展示*/
        Common = 3,
        /**首次进入有红点，点击之后根据红点规则展示*/
        FirstCommon = 4,
    }

    //对应配置表
    export enum BtnIconEffType {
        /**永不展示特效*/
        None = 1,
        /**单次点击特效*/
        Once = 2,
        /**根据红点显示与否展示*/
        Common = 3,
        /**永久展示*/
        Forever = 4,
        /**首次进入有特效，点击之后根据红点规则展示*/
        FirstCommon = 5,
    }
}