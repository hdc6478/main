namespace game.mod {
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import Mdr = base.Mdr;
    import OpenFunctionConfig = game.config.OpenFunctionConfig;
    import GateConfig = game.config.Gate1Config;
    import Handler = base.Handler;
    import Tween = base.Tween;
    import TimeMgr = base.TimeMgr;
    import JumpConfig = game.config.JumpConfig;

    export class ViewMgr {
        private static _instance: ViewMgr;

        private _curName: string;
        private _curType: string;

        /**记录界面数据，用于返回上一级界面用，会记录data*/
        private _curPath: any[][] = [];//用any类型保存，有些界面需要保存特殊的数据
        /**记录副本界面数据，突出场景返回副本界面用*/
        private _lastPath: any[][] = [];//用any类型保存，有些界面需要保存特殊的数据
        /**二级弹窗绑定数据用*/
            // private _curSecondPop: string[][] = [];
        private _propTipsViewType: number = 0;//道具提示界面

        public static getIns(): ViewMgr {
            if (!this._instance) {
                this._instance = new ViewMgr();
            }
            return this._instance;
        }

        private checkVipLv(vipLv: number): boolean {
            let lv = VipUtil.getShowVipLv();//策划配置的是VIP等级
            return lv >= vipLv;
        }

        /**等级开启判断*/
        public checkLv(lv: number): boolean {
            return RoleVo.ins.level >= lv;
        }

        /**等级开启提示文本*/
        public checkLvStr(lv: number): string {
            return StringUtil.substitute(getLanById(LanDef.open_level_funcopen), [lv]);
        }

        private checkPower(power: number | Long): boolean {
            let _power: Long = RoleVo.ins.showpower || Long.fromValue(0);
            return _power.gte(power);
        }

        //达到xx关卡判断
        public checkMainLine(mainline: number): boolean {
            let _p: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
            let nextId = _p.passNextIdx;//下一关id
            return nextId > mainline;
        }

        /**判断是否通过当前关卡 */
        public checkPass(pass: number): boolean {
            let _p: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
            return _p.curStep > pass;
        }

        private checkServerOpen(day: number): boolean {
            return RoleUtil.getServerDay() >= day;
        }

        /**转生开启判断*/
        public checkRebirth(rebirth: number): boolean {
            return (+RoleVo.ins.reincarnate | 0) >= rebirth;
        }

        /**转生开启提示文本*/
        public checkRebirthStr(rebirth: number): string {
            return StringUtil.substitute(getLanById(LanDef.rebirth_funcopen), [RoleUtil.getRebirthStr(rebirth)]);
        }

        /**系统提示，返回的文本剪切前面几位*/
        public getOpenFuncShow(_idx: number, spliceNum?: number) {
            let cfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, _idx);
            let tips = "";
            if (!cfg || !cfg.is_show_tips) {
                return tips;
            }
            if (cfg.attendre && cfg.attendre == 1) {
                return getLanById(LanDef.world_boss1);
            }
            if (cfg.mainline && !this.checkMainLine(cfg.mainline)) {//主线关卡开启
                let line_cfg: GateConfig = getConfigByNameId(ConfigName.Gate, cfg.mainline);
                let str = StringUtil.substitute(getLanById(LanDef.mainline_funcopen),
                    [line_cfg.gate_name]);
                if (spliceNum) {
                    return str.slice(spliceNum, str.length);
                }
                return str;
            } else if (cfg.open_level && !this.checkLv(cfg.open_level)) {//角色等级开启
                return this.checkLvStr(cfg.open_level);
            } else if (cfg.rebirth && !this.checkRebirth(cfg.rebirth)) {//转生开启
                return this.checkRebirthStr(cfg.rebirth);
            } else if (cfg.svr_open && !this.checkServerOpen(cfg.svr_open)) {//开服第几天开启
                return StringUtil.substitute(getLanById(LanDef.svr_open_funcopen), [cfg.svr_open]);
            } else if (cfg.power && !this.checkPower(cfg.power)) {//战力开启
                return StringUtil.substitute(getLanById(LanDef.power_funcopen), [StringUtil.getHurtNumStr(cfg.power)]);
            } else if (cfg.vip_index && !this.checkVipLv(cfg.vip_index)) {//vip开启
                let vipStr = VipUtil.getVipStr(cfg.vip_index);
                return StringUtil.substitute(getLanById(LanDef.vip_index_funcopen), [vipStr]);
            } else if (cfg.main_task_index) { //主线任务开启
                //return StringUtil.substitute(getLanById(LanDef.shenzhuang_tips), [cfg.name]);
                return "主线任务开启";
            } else if (cfg.wear_condition) { //禁地关卡条件
                let shilianProxy: IShilianProxy = getProxy(ModName.Shilian, ProxyType.Shilian);
                let type = Math.floor(cfg.wear_condition[0] / 100);
                let info = shilianProxy.getFbdInfo(type);
                let fbdCfgs = getConfigByNameId(ConfigName.ForbiddenGate, cfg.wear_condition[0]);
                if (fbdCfgs) {
                    let fbdCfg = fbdCfgs[cfg.wear_condition[1]];
                    if (!info || info.index < cfg.wear_condition[0]
                        || (cfg.wear_condition[0] == info.index && cfg.wear_condition[1] > info.id)) {
                        tips = ForbiddenTypeName[type] + cfg.wear_condition[0] % 100 + '章' + fbdCfg.gate_id + '关开启';
                    }
                }
            }
            return tips;
        }

        /**判断当前界面是否已打开，先保留，不推荐使用*/
        public isShow(mName: string, vType: string) {
            let mod = facade.retMod(mName);
            if (!mod) return null;
            let view: Mdr = mod["__mdrIns"][vType];
            if (!view) return null;
            return view["__show"];
        }

        /**当前是否在主界面*/
        public isMain() {
            let self = this;
            if (self._curName == null || self._curType == null) {
                return true;
            }
            return !self.isShow(self._curName, self._curType);
        }

        public checkModOpen(mName: string): boolean {
            return this._curName == mName;
        }

        /***************************以下为新加的接口******************************/
        /**
         * 一级弹窗界面，会关闭旧的一级界面
         * @param {string} mName，ModName
         * @param {string} vType，ViewType
         * @param data，界面数据
         * @param showBack，走通用返回逻辑
         */
        public showView(mName: string, vType: string, data?: any, showBack: boolean = true): void {
            if (this._curName && (this._curName != mName || this._curType != vType)) {
                /**关闭旧的一级弹窗*/
                this.hideMainView();
            }
            // if (this._curSecondPop && this._curSecondPop.length) {
            //     /**关闭二级弹窗*/
            //     for (let i of this._curSecondPop) {
            //         facade.hideView(i[0], i[1]);
            //     }
            //     this._curSecondPop = [];
            // }
            this._curName = mName;
            this._curType = vType;

            if (showBack) {
                this.setLastView(mName, vType, data);
            }

            facade.showView(mName, vType, data);
        }

        /**记录上一个界面*/
        private setLastView(mName: string, vType: string, data?: any): void {
            let last: string[] = this._curPath.length ? this._curPath[this._curPath.length - 1] : [];
            if (!last.length || last[0] != mName || last[1] != vType) {
                let path = [mName, vType];
                if (data) {
                    path = path.concat(data);
                }
                this._curPath.push(path);/**记录上一个界面*/
            }
        }

        /**清除界面数据，断线重连时候也会清除*/
        public clearView(): void {
            this._curPath = [];
        }

        /**
         * 保存的界面数据，退出场景返回界面用
         * @param data 界面数据，一般是BtnType
         */
        public set lastData(data: any[]) {
            if (this._curPath.length) {
                let path = this._curPath[this._curPath.length - 1];
                path.splice(2, path.length - 2);//去除多余数据
                this._curPath[this._curPath.length - 1] = path.concat(data);
            }
        }

        public get lastData(): any[] {
            if (this._curPath.length) {
                let path = this._curPath[this._curPath.length - 1];
                return path.length > 2 ? path.slice(2, path.length) : null;
            }
            return null;
        }

        /**
         * 绑定二级弹窗界面,方便实现关闭按钮
         * @param {string} mName，ModName
         * @param {string} vType，ViewType
         * @param data，界面数据
         */
        public showSecondPop(mName: string, vType: string, data?: any): void {
            // let isSame = false;
            // for (let i of this._curSecondPop) {
            //     if (i[0] == mName && i[1] == vType) {
            //         isSame = true;
            //         break;
            //     }
            // }
            // if (!isSame) {
            //     this._curSecondPop.push([mName, vType]);
            // }
            //this.setLastView(mName, vType, data);
            facade.showView(mName, vType, data);
        }

        // public getSecondPopMod(): string[] {
        //     for (let i = this._curSecondPop.length - 1; i >= 0; --i) {
        //         let info = this._curSecondPop.pop();
        //         let mName = info[0];
        //         let vType = info[1];
        //         if (this.isShow(mName, vType)) {
        //             return info;
        //         }
        //     }
        //     return [];
        // }

        /**
         * 回到主界面
         */
        public showMain() {
            this.hideMainView();//关闭当前界面
            this.clearView();//清除界面数据
            GuideMgr.getIns().backMain();//返回主界面时触发
            PropTipsMgr.getIns().continueBoss();//继续boss弹窗
        }

        /**
         * 统一关闭系统主界面
         */
        public hideMainView() {
            if (this._curName) {
                facade.hideView(this._curName, this._curType);
                this._curName = null;
                this._curType = null;
            }
        }

        /**
         * 返回上一级界面
         */
        public back(): void {
            let path: string[] = this._curPath[this._curPath.length - 2];
            if (path) {
                let mName: string = path[0];
                let vType: string = path[1];
                let data = path.length > 2 ? path.slice(2, path.length) : null;
                this._curPath.length = this._curPath.length - 2;
                this.showView(mName, vType, data);
                return;
            }
            this.showMain();
        }

        /**
         * 返回第一个界面,用于退出副本后返回界面
         */
        public backLast(): void {
            let path = this._lastPath.pop();
            if (path) {
                let mName: string = path[0];
                let vType: string = path[1];
                let data = path.length > 2 ? path.slice(2, path.length) : null;
                this.showView(mName, vType, data);
            }
        }

        /**
         * 保存副本界面数据
         */
        public saveLast(): void {
            let path: string[] = this._curPath[this._curPath.length - 1];
            if (path) {
                this._lastPath.push(path.concat());
                this.clearView();//清除界面数据
            }
        }


        /**
         * 判断是否隐藏按钮
         * @returns {boolean}
         * @param openIdx
         */
        public checkBtnShow(openIdx: number): boolean {
            if (!this.checkViewOpen(openIdx, false)) {
                let cfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, openIdx);
                if (!cfg) {
                    return true; //没功能开启配置先显示着
                }
                return cfg.is_hide != 1;
            }
            return true;
        }

        /**
         * 判断功能开启
         * @param openIdx
         * @param showTips 是否提示，默认false
         */
        public checkViewOpen(openIdx: number | string, showTips: boolean = false): boolean {
            if (typeof openIdx == "string") {
                openIdx = parseInt(openIdx);
            }
            let _m: IMainProxy = facade.retMod(ModName.Main).retProxy(ProxyType.Main);
            let isOpen = _m.openFuncIdx && _m.openFuncIdx.indexOf(openIdx) > -1;
            if (isOpen) {
                return true;
            }
            if (!showTips) {
                return false;
            }
            //先暂时使用前端判断着，等后端
            let _tips: string = this.getOpenFuncShow(openIdx);
            if (_tips) {
                PromptBox.getIns().show(_tips);
            }
            return false;
        }

        /**
         * 根据跳转id跳转
         * @param {number} id 跳转id
         * @param {any} param 附带参数
         * @param showBack，走通用返回逻辑
         * @param showTips 跳转不成功提示
         */
        public showViewByID(id: number, param?: any, showBack: boolean = true, showTips: string = ""): void {
            if (JumpIdx.HangUp2 == id) {
                if (!SceneUtil.isShowMain()) {
                    PromptBox.getIns().show(getLanById(LanDef.area_tips));
                    return;
                }
                //回到挂机界面
                facade.sendNt(ViewEvent.ON_VIEW_HIDE);//跳转界面时发送关闭原界面事件，需要的可以监听
                this.showMain();
                return;
            }

            let jumpData = JumpDataList[id];
            if (!jumpData) {
                // 没配置跳转路径的直接返回
                let cfg: JumpConfig = getConfigByNameId(ConfigName.Jump, id);
                PromptBox.getIns().show(cfg.name);
                return;
            }
            if (jumpData.openIdx && !this.checkViewOpen(jumpData.openIdx, true)) {
                return;
            }
            let openInfo = this.checkJumpOpen(id, jumpData);
            if (!openInfo.isOpen) {
                //跳转的界面特殊情况下关闭的
                if (showTips && showTips != "") {
                    PromptBox.getIns().show(showTips);
                }
                return;
            }

            let list: string[] = jumpData.viewDatas.concat();
            if (list.length == 2) {
                list.push("00");
            }

            let moduleId: string = list.shift();
            let vType: string = list.shift();
            let showArgs: any[] = list.length > 0 ? list : null;
            if (param != undefined) {
                if (!showArgs) {
                    showArgs = [];
                }
                showArgs.push(param);
            }


            facade.sendNt(ViewEvent.ON_VIEW_HIDE);//跳转界面时发送关闭原界面事件，需要的可以监听
            if (jumpData.layer == JumpViewType.SecondPop) {
                //二级界面
                this.showSecondPop(moduleId, vType, showArgs);
            } else if (jumpData.layer == JumpViewType.Third) {
                facade.showView(moduleId, vType, showArgs);
            } else {
                this.showView(moduleId, vType, showArgs, showBack);
            }
        }

        //检测跳转ID，特殊的活动需要处理下，比如领完奖励后关闭的，后台控制的活动等等
        private checkJumpOpen(id: number, jumpData: IJumpData): { isOpen: boolean, isAct: boolean } {
            let isAct = true;//是否特殊的活动
            let isOpen = true;//是否开启，todo，各自系统各自处理
            switch (id) {
                case JumpIdx.HuangGuForbidden:
                case JumpIdx.XianLingForbidden:
                case JumpIdx.TianZhiForbidden:
                    let type = this.decodeJumpData(jumpData);
                    let shilianProxy: IShilianProxy = facade.retMod(ModName.Shilian).retProxy(ProxyType.Shilian);
                    isOpen = shilianProxy.isFbdTypeOpen(type, true);
                    break;
                case JumpIdx.Bossgift:
                case JumpIdx.Yijiegift:
                case JumpIdx.Shiliangift:
                case JumpIdx.Fuben2gift:
                case JumpIdx.Fuben3gift:
                    let productId = this.decodeJumpData(jumpData);
                    isOpen = PayUtil.checkShowGift(productId);
                    break;
                case JumpIdx.UnionJuanXian:
                case JumpIdx.UnionKill:
                case JumpIdx.UnionTreasure:
                case JumpIdx.UnionStorage:
                case JumpIdx.UnionHeroShop:
                case JumpIdx.UnionBeast:
                case JumpIdx.UnionBook:
                case JumpIdx.UnionWage:
                    let unionProxy: IUnionProxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
                    isOpen = unionProxy.isInUnion;
                    break;
                case JumpIdx.PunshList:
                    isOpen = !!ActivityUtil.getType();
                    break;
                case JumpIdx.ZeroBuy:
                    let zerobuyProxy: IZeroBuyProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.ZeroBuy);
                    isOpen = zerobuyProxy.isOpen;
                    break;
                case JumpIdx.XianlvShilian:
                    let xianlvProxy: IXianlvProxy = facade.retMod(ModName.Xianyuan).retProxy(ProxyType.Xianlv);
                    isOpen = xianlvProxy.isOpenShilian();
                    break;
                case JumpIdx.Tiandilu:
                case JumpIdx.Tiandiluxuanyuan:
                    isOpen = RoleUtil.isRoleRingAct();
                    break;
                case JumpIdx.Lottery:
                    let lotteryProxy: ILotteryProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Lottery);
                    isOpen = lotteryProxy.isOpen();
                    break;
                case JumpIdx.Huashenzhilu:
                    let huashenProxy: IHuashenProxy = facade.retMod(ModName.More).retProxy(ProxyType.Huashen);
                    isOpen = huashenProxy.checkRoadOpen(true);
                    break;
                case JumpIdx.Yaojijiangshi3:
                    let yjjsProxy: IYjjsProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Yjjs);
                    isOpen = yjjsProxy.isOpen();
                    break;
                case JumpIdx.XujieJitan:
                case JumpIdx.XujieTansuo:
                case JumpIdx.XujieKuangmai:
                    let zhanduiProxy: IZhanduiProxy = facade.retMod(ModName.More).retProxy(ProxyType.Zhandui);
                    isOpen = zhanduiProxy.haveTeam();
                    break;
                case JumpIdx.XianlvRing:
                    let ringProxy: IRingProxy = facade.retMod(ModName.Xianyuan).retProxy(ProxyType.Ring);
                    isOpen = ringProxy.canOpenGift();
                    break;
                case JumpIdx.XianmaiZhengduo:
                    let XianmaiProxy: IXianmaiProxy = facade.retMod(ModName.More).retProxy(ProxyType.Xianmai);
                    isOpen = XianmaiProxy.isActTime();
                    break;
                case JumpIdx.Xiandi:
                    let XiandiProxy: IXiandiProxy = facade.retMod(ModName.More).retProxy(ProxyType.Xiandi);
                    isOpen = XiandiProxy.checkOpen();
                    break;
                /**这里不要做功能开启判断*/
                default:
                    isAct = false;//默认不是
                    break;
            }
            return {isOpen: isOpen, isAct: isAct};
        }

        //解析JumpData里面viewDatas的最后一个数据，特殊系统用
        private decodeJumpData(jumpData: IJumpData): number {
            let list: string[] = jumpData.viewDatas.concat();
            let data = parseInt(list.pop());
            return data;
        }

        //是否显示跳转按钮
        public showJumpBtn(id: number): boolean {
            let jumpData = JumpDataList[id];
            let showJump: boolean = !!jumpData;
            if (showJump) {
                //显示跳转按钮时候，判断是否特殊的活动，是的话根据活动开启状态显示跳转
                let openInfo = this.checkJumpOpen(id, jumpData);
                if (openInfo.isAct) {
                    return openInfo.isOpen;
                }
            }
            return showJump;
        }

        /**
         * 成功提示，例如激活成功、升级成功
         * @param type 资源类型
         */
        public showSuccessTips(type: SuccessTipsType = SuccessTipsType.Up): void {
            facade.showView(ModName.Main, MainViewType.SuccessTips, type);
        }

        /**
         * 道具提示
         * @param data 道具数据
         * @param iconShowType Icon显示类型：IconShowType
         */
        public showPropTips(data: PropData | number, iconShowType?: number): void {
            if (typeof data == "number") {
                if (iconShowType == IconShowType.Bag) {
                    data = BagUtil.getPropDataByIdx(data);//取背包的数据
                    data.iconShowType = iconShowType;
                } else {
                    data = PropData.create(data);//创建道具数据
                }
            }

            if (data.type == ConfigHead.Equip) {
                //装备
                if (data.propType == EquipPropType.Lingqi) {
                    facade.showView(ModName.Shenling, ShenLingViewType.ShenlingLingqiBagTips, data);
                } else if (data.propType == EquipPropType.Shouling) {
                    facade.showView(ModName.Yishou, YiShouViewType.ShoulingEquipTipsBag, data);
                } else if (data.propType == EquipPropType.Yishou) {
                    facade.showView(ModName.Yishou, YiShouViewType.ShouguEquipTips, data);
                } else if (data.propType == EquipPropType.Suit) {
                    facade.showView(ModName.Role, NewRoleViewType.SuitEquipBagTips, data);
                } else {
                    this.showRoleEquipTips(data);
                }
            } else if (data.type == ConfigHead.Shenling) {
                //神灵
                let shenlingProxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
                let starCfg = shenlingProxy.getStarCfg(data.cfg.index, 1);
                if (starCfg && starCfg.star_consume) {
                    let costId = starCfg.star_consume[0][0];//获取对应消耗id
                    ViewMgr.getIns().showPropTips(costId);
                }
            } else if (data.propType == PropType.Surface) {
                //外显
                facade.showView(ModName.Bag, BagViewType.PropSurfaceTips, data);
            } else if (data.propType == PropType.Amass || data.propType == PropType.ZhanduiLingbao) {
                //图鉴
                facade.showView(ModName.Consecrate, ConsecrateViewType.AmassTips, data);
            } else if (data.propType == PropType.BaozangSuipian) {
                //宝藏碎片
                facade.showView(ModName.Activity, MainActivityViewType.SummonTreasureTips, data);
            } else if (data.propType == PropType.Lianshendan) {
                //炼神丹
                facade.showView(ModName.Bag, BagViewType.PropPillTips, data);
            } else if (data.propType == PropType.Lingpo) {
                //灵魄
                facade.showView(ModName.Shenling, ShenLingViewType.ShenlingLingpoIconTipsBag, data)
            } else {
                //通用道具提示
                this._propTipsViewType = this._propTipsViewType % 5;
                let viewType = (this._propTipsViewType + parseInt(BagViewType.PropTips1)) + "";
                facade.showView(ModName.Bag, viewType, data);
                this._propTipsViewType++;
            }
        }

        /**
         * 玩家身上装备提示
         * @param data 道具数据
         * @param isSelf 是否是自己的信息
         * @param isBag 是否在背包点击
         */
        public showRoleEquipTips(data: PropData | number, isSelf?: boolean, isBag?: boolean): void {
            facade.showView(ModName.Role, NewRoleViewType.RoleEquipTips, {
                data: data,
                isSelf: isSelf,
                isBag: isBag
            });
        }

        /**
         * 获得外显，激活外显提示
         * @param index 外显index
         * @param triggerGuide 关闭后继续指引，服务端下发获得碎片弹窗不执行这个，激活外显时候执行
         */
        public showSurfaceTips(index: number | Long, triggerGuide: boolean = true): void {
            if (index instanceof Long) {
                index = index.toNumber();
            }
            PropTipsMgr.getIns().showSurface(index, triggerGuide);
        }

        /**
         * 外显进阶成功提示
         * @param skillId 技能ID
         * @param lv 技能等级
         * @param lvDesc 直接取等级描述
         */
        public showSurfaceUpTips(skillId: number, lv: number, lvDesc?: boolean): void {
            let data: BattleSkillItemRenderData = {skillId: skillId, lv: lv, lvDesc: lvDesc};
            if (lv <= 1) {
                facade.showView(ModName.Surface, SurfaceViewType.SurfaceUpTips, data);//进阶成功
            } else {
                facade.showView(ModName.Surface, SurfaceViewType.SurfaceUpTips2, data);//进阶成功
            }
        }

        /**
         * 突破成功提示
         * @param skillId 技能id
         * @param lv 突破后的阶数
         * @param attrDesc0 突破前的文本或属性
         * @param attrDesc1 突破后的文本或属性
         */
        public showBreakthroughTips(skillId: number, lv: number, attrDesc0?: string, attrDesc1?: string): void {
            let data: BreakthroughData = {
                skillId,
                lv,
                attrDesc0, attrDesc1
            };
            if (lv <= 1) {
                facade.showView(ModName.Main, MainViewType.BreakthroughTips, data);
            } else {
                facade.showView(ModName.Main, MainViewType.BreakthroughTips2, data);
            }
        }

        /**
         * 升星成功提示
         * @param data
         */
        public showUpStarTips(data: UpStarData): void {
            if (data.skillId) {
                facade.showView(ModName.Main, MainViewType.UpStarTips2, data);//有天赋技能等
            } else {
                facade.showView(ModName.Main, MainViewType.UpStarTips, data);//只有星级+属性
            }
        }

        /**
         * 道具来源提示界面
         * @param index 道具index
         */
        public showGainWaysTips(index: number): void {
            this.showSecondPop(ModName.Bag, BagViewType.GainWaysTips, index);
        }

        /**
         * 通用的属性展示面板 (带有仙力属性)
         * @param titleStr 弹窗标题，未支持传入提示表的key
         * @param attrs 属性
         */
        public showAttrTips(titleStr: string, attrs: msg.attributes): void {
            this.showSecondPop(ModName.Main, MainViewType.BaseAttrTips, {
                titleStr, attrs, state: 1
            });
        }

        /**
         * 通用的属性展示面板（没有仙力属性相关的）
         * @param titleStr 弹窗标题，未支持传入提示表的key
         * @param attrs 属性
         * @param attrItemStr 属性标题，默认【基础属性】
         * @param layoutType 展示属性的list布局，默认【2:TileLayout】 1: VerticalLayout, 2: TileLayout
         */
        public showAttrTipsWithoutGod(titleStr: string, attrs: msg.attributes, attrItemStr = getLanById(LanDef.base_attr), layoutType = 2): void {
            this.showSecondPop(ModName.Main, MainViewType.BaseAttrTips, {
                titleStr, attrs, attrItemStr, state: 2, layoutType
            });
        }

        /**
         * 通用的奖励领取tips
         * @param titleStr 面板title，传空，默认奖励预览
         * @param reward 奖励数组
         * @param state 状态0：未完成，1: 可领取，2：已领取
         * @param handler 点击领取按钮回调。点击后抛出 MainEvent.UPDATE_BASE_REWARD_MDR_STATE 用于更新领取状态
         * @param tipsStr 提示文本，存在提示文本时，不显示领取状态
         */
        public showRewardTips(titleStr: string, reward: number[][], state: number, handler: Handler, tipsStr?: string): void {
            this.showSecondPop(ModName.Main, MainViewType.BaseRewardTips, {
                titleStr, reward, state, handler, tipsStr
            });
        }

        /**
         * 通用的宝箱奖励查看
         * @param tips 描述文本
         * @param reward 奖励数组
         * @param tips1 描述文本2
         * @param okFunc 点击确定函数
         */
        public showBoxReward(tips: string, reward: number[][], tips1?: string, okFunc?: Handler, time?: number): void {
            this.showSecondPop(ModName.Main, MainViewType.BoxReward, {
                tips, reward, tips1, okFunc, time
            });
        }

        /**通用的宝箱奖励查看与上同 参数整合 */
        public showBoxReward2(data: BoxRewardData): void {
            this.showSecondPop(ModName.Main, MainViewType.BoxReward, data);
        }

        /**
         * 通用的购买次数
         * @param tips 描述文本
         * @param cost 单次购买消耗
         * @param cnt 剩余可购买次数
         * @param maxBuyCnt 当前可购买次数
         * @param maxCnt 最大可购买次数
         * @param handler 点击购买按钮回调
         */
        public showBuyTimes(tips: string, cost: number[], cnt: number, maxBuyCnt: number, maxCnt: number, handler: Handler): void {
            this.showSecondPop(ModName.Main, MainViewType.BuyTimes, {
                tips, cost, cnt, maxBuyCnt, maxCnt, handler
            });
        }

        /**
         * 被动技能界面，激活后发送 SurfaceEvent.SURFACE_SKILL_UPDATE 并携带是否激活参数，以刷新状态
         * @param skillId 技能index
         * @param isAct 是否激活
         * @param confirm 激活回调
         * @param condHandler 其他激活条件
         */
        public showSkillTips(skillId: number, isAct: boolean, confirm?: Handler, condHandler?: Handler): void {
            facade.showView(ModName.Surface, SurfaceViewType.SkillTips, {
                skillId: skillId,
                isAct: isAct,
                confirm: confirm,
                condHandler: condHandler
            });
        }

        /**
         * 技能一般提示界面
         * @param skillId 技能index
         * @param lv 等级
         * @param isXianfaSkill 是否仙法技能展示
         */
        public showSkillNormalTips(skillId: number, lv?: number, isXianfaSkill: boolean = false): void {
            facade.showView(ModName.Surface, SurfaceViewType.SkillNormalTips, {
                skillId: skillId,
                lv: lv,
                isXianfaSkill
            });
        }

        /**
         * 技能激活条件展示
         * @param skillId 技能id
         * @param isActed 是否激活
         * @param actStr  未激活时，展示的激活条件
         */
        public showSkillConditionTips(skillId: number, isActed: boolean, actStr?: string): void {
            facade.showView(ModName.Xianyuan, XianyuanViewType.SkillConditionTips, {
                skillId,
                isActed,
                actStr
            });
        }

        /**
         * 规则说明界面
         * @param str 文本
         * @param titleStr 标题，默认玩法说明
         */
        public showRuleTips(str: string, titleStr = getLanById(LanDef.wanfashuoming)): void {
            this.showSecondPop(ModName.Main, MainViewType.BaseRuleDesc, [str, titleStr]);
        }

        /**
         * 挑战第几层
         * @param lv 层级
         */
        public showChallengeTips(lv: number): void {
            facade.showView(ModName.Scene, SceneViewType.ChallengeTips, lv);
        }

        /**
         * 排行榜界面
         * @param rankType 排行榜类型
         */
        public showRank(rankType: RankType): void {
            this.showView(ModName.Rank, RankViewType.RankMain, [RankMainBtnType.Rank, rankType]);
        }

        /**
         * 礼包界面
         * @param productId 商品id
         */
        public showGift(productId: number): void {
            facade.showView(ModName.Pay, PayViewType.Gift, productId);
        }

        /**
         * Boss奖励预览
         * @param rewardId 奖励预览id，可拓展
         * @param tips 提示文本
         */
        public bossReward(rewardId: number, tips?: string[]): void {
            this.showSecondPop(ModName.Boss, BossViewType.BossReward, {rewardId, tips});
        }

        /**
         * 奖励获取
         * @param rewards 奖励
         */
        public bossRewardShow(rewards: msg.prop_tips_data[]): void {
            this.showSecondPop(ModName.Boss, BossViewType.BossRewardShow, rewards);
        }

        /**
         * 奖励预览
         * @param rewards 奖励
         * @param tips 提示文本
         * @param title 标题，不传默认：奖励预览
         */
        public rewardShow(rewards: number[][], tips: string, title?: string): void {
            this.showSecondPop(ModName.More, MoreViewType.RewardShow, {
                rewards: rewards,
                tips: tips,
                title: title
            });
        }


        /**
         * 查看玩家信息
         * @param roleId，玩家角色id
         * @param serverId，玩家服务器id
         * @param isRobot，是否机器人
         */
        public showRoleTips(roleId: Long, serverId?: number, isRobot?: number) {
            let proxy: IChatProxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);
            if (!isRobot) {
                isRobot = 0;
            }
            proxy.c2s_chat_look_user(serverId, roleId, isRobot, ChatLookType.Show);
        }

        /**
         * 私聊玩家
         * @param info，玩家信息或者角色id
         */
        public chat(info: msg.friend_info | Long | msg.teammate) {
            if (!this.checkViewOpen(OpenIdx.ChatPrivate, true)) {
                //未开启私聊时不给聊天
                return;
            }
            let chatProxy: IChatProxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);
            chatProxy.setPrivateInfo(info);
            this.showView(ModName.Chat, ChatViewType.ChatMain, ChatMainBtnType.Private);//跳转私聊
        }

        /**
         * 只有确定按钮
         * @param {string} content
         * @param confirm
         */
        public show(content: string, confirm?: Handler) {
            let showArg = {
                currentState: "1",
                content: content,
                confirm: confirm
            };
            this.showSecondPop(ModName.Main, MainViewType.Alert, showArg);
        }

        /**
         * 有确定和取消按钮
         * @param {string} content
         * @param {base.Handler} confirm
         * @param {base.Handler} cancel
         * @param changeHide 场景变化后关闭否，默认false
         */
        public showConfirm(content: string, confirm?: Handler, cancel?: Handler, changeHide?: boolean) {
            let showArg = {
                currentState: "2",
                content: content,
                confirm: confirm,
                cancel: cancel,
                changeHide: changeHide
            };
            this.showSecondPop(ModName.Main, MainViewType.Alert, showArg);
        }

        /**
         * 只有确定按钮以及本次登录不再提示
         * @param {string} content
         * @param type 不再提示类型
         * @param confirm
         */
        public showNotTips(content: string, type: NotTipsType, confirm?: Handler) {
            let showArg = {
                currentState: "3",
                content: content,
                type: type,
                confirm: confirm
            };
            this.showSecondPop(ModName.Main, MainViewType.Alert, showArg);
        }

        /**
         * 活动最后一天提示
         * @param endTime，活动结束时间戳
         * @param type 不再提示类型
         * @param content，默认：活动仅剩最后一天，若有奖励可领取或兑换，请记得前往
         */
        public showActTips(endTime: number, type: NotTipsType, content?: string) {
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime >= Second.Day) {
                return;
            }
            //小于一天时提示
            let mainProxy: IMainProxy = facade.retMod(ModName.Main).retProxy(ProxyType.Main);
            let isSel = mainProxy.getNotTipsType(type);
            if (!isSel) {
                if (!content) {
                    content = getLanById(LanDef.carnival_tips5);
                }
                this.showNotTips(content, type);
            }
        }

        /** 跳转VIP界面 */
        public openVipView() {
            this.showViewByID(JumpIdx.VIP);
        }

        /**
         * 常规充值流程 先判断首充 再跳转商城
         * */
        public openCommonRechargeView(): void {
            if (PayUtil.checkFirstCharge()) {
                if (!this.checkViewOpen(OpenIdx.StoreXianyu, true)) {
                    return;
                }
                ViewMgr.getIns().showView(ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn2);
            } else {
                if (!this.checkViewOpen(OpenIdx.FirstCharge, true)) {
                    return;
                }
                ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FirstCharge);
            }
        }

        /**
         * 通用的批量购买tips todo
         * @param index 商店表的商品
         * @param left_cnt 剩余购买数量
         * @param handler 购买回调
         */
        public openStoreBuyTips(index: number, left_cnt: number, handler: Handler): void {
            facade.showView(ModName.Store, StoreViewType.StoreBuyTips, {
                index, left_cnt, handler
            });
        }

        /**批量购买（不读配置） */
        public openBuyBulkTips(param: ShopBuyBulkData): void {
            this.showSecondPop(ModName.Activity, MainActivityViewType.ExchangeShopTips, param);
        }

        /**跳转兑换商店界面 */
        public openExchangeShopView(btnType?: string): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.ExchangeShop, btnType);
        }

        /**
         * 检查boss是否开启
         * @param openType boss表开启条件第一个参数 1等级条件 2转生条件
         * @param openLevel boss表开启条件第二个参数
         * @param showTips
         * */
        public checkBossOpen(openType: number, openLevel: number, showTips?: boolean): boolean {
            let isOpen: boolean = false;
            if (openType == ManyBossType.Lv) {
                isOpen = ViewMgr.getIns().checkLv(openLevel);
                if (!isOpen && showTips) {
                    PromptBox.getIns().show(ViewMgr.getIns().checkLvStr(openLevel));
                }
            } else {
                isOpen = ViewMgr.getIns().checkRebirth(openLevel);
                if (!isOpen && showTips) {
                    PromptBox.getIns().show(ViewMgr.getIns().checkRebirthStr(openLevel));
                }
            }
            return isOpen;
        }

        /**
         * 抖动界面，效果还需要调，都是由缓动组成
         * @param layer 被抖动的层
         */
        public shakeUI(view: eui.Component): void {
            let oriX = view.x;
            let oriY = view.y;
            Tween.remove(view);
            let tween = Tween.get(view);
            let dis = 5;
            tween.to({y: oriY - dis}, 100).to({y: oriY + dis}, 100)
                .to({x: oriX - dis}, 100).to({x: oriX + dis}, 100)
                .to({y: oriY - dis}, 100).to({y: oriY + dis}, 100)
                .to({x: oriX - dis}, 100).to({x: oriX + dis}, 100).exec(Handler.alloc(this, function () {
                view.x = oriX;
                view.y = oriY;
                Tween.remove(view);
            }));
        }

        public shakeUI2(view: eui.Component): void {
            let oriX = view.x;
            let oriY = view.y;
            Tween.remove(view);
            let tween = Tween.get(view);
            let dis = 5;
            tween.to({x: oriX - dis}, 50).to({x: oriX + dis}, 50)
                .exec(Handler.alloc(this, function () {
                    view.x = oriX;
                    view.y = oriY;
                    Tween.remove(view);
                }));
        }

        /**
         * 奖励预览弹窗，带有权重
         * @param data
         */
        public openPreviewReward(data: BasePreviewRewardData[]): void {
            this.showSecondPop(ModName.Activity, MainActivityViewType.BasePreviewReward, data);
        }

        /**
         * 达标奖励界面，传入礼包类型【J_进阶奖励的dabiaojiangli页】
         * @param giftType
         */
        public openGiftView(giftType: GiftType): void {
            this.showView(ModName.Gift, GiftViewType.Main, giftType);
        }

        /**检测战队军团阵容是否上阵
         * 没上阵的话跳转上阵界面
         * */
        public checkZhenrong(jump?: boolean): boolean {
            let proxy: IXujieTansuoProxy = facade.retMod(ModName.More).retProxy(ProxyType.XujieTansuo);
            if (!proxy.shenling_list) {
                if (jump) {
                    this.showSecondPop(ModName.More, MoreViewType.Zhenrong);
                }
                return false;//不能挑战
            }
            return true;
        }

        /**检测战队军团阵容仙力
         * 仙力不足时，提示：敌人军团仙力较高，是否继续挑战？*/
        public checkZhenrongGod(god: number, handler?: Handler): boolean {
            let proxy: IXujieTansuoProxy = facade.retMod(ModName.More).retProxy(ProxyType.XujieTansuo);
            let attr = proxy.legion_attr;
            let curGod = attr && attr.legion_god ? attr.legion_god.toNumber() : 0;
            if (god > curGod) {
                if (handler) {
                    this.showConfirm(getLanById(LanDef.huanggu_nvshen_tips16), Handler.alloc(this, () => {
                        handler.exec();
                    }));
                }
                return false;
            }
            if (handler) {
                handler.exec();
            }
            return true;
        }

        /**通用匹配 具体传参看MatchData */
        public showCommonMatch(data: MatchData): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.CommonMatch, data);
        }

        /** 判断中控活动是否开启 */
        public isOpenCentralActivity(data: msg.oper_act_item): boolean {
            //let now = Date.now();
            let now = TimeMgr.time.serverTimeSecond;
            //let now2 = TimeMgr.time.serverTime;
            if (data.s_begin_time <= now && now <= data.s_end_time) {
                return true;
            }
            return false;
        }

        /**仙宗排行榜结算领取奖励弹窗 */
        public showUnionRankTips(type: number): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionRankReward, type);
        }
    }

}
