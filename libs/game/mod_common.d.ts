declare namespace game.mod {
    class BaseListenerRenderer extends eui.ItemRenderer implements eui.UIComponent {
        private _eventList;
        constructor();
        addEventListenerEx(type: string, listenerObjParam: egret.DisplayObject, listenerFuncParam: Function, funcObjParam: any): void;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import DisplayObject = egret.DisplayObject;
    class BaseRenderer extends BaseListenerRenderer {
        private _effHub;
        private _eftId;
        protected eftSrc: string;
        constructor();
        protected onRemoveFromStage(): void;
        protected clearFont(container: DisplayObjectContainer, clearRef?: boolean): void;
        protected addBmpFont(text: string, font: string, container: DisplayObjectContainer, horizontal?: boolean, scale?: number, center?: boolean, gap?: number, expandParent?: boolean): void;
        protected addEft(src: string, x: number, y: number, cb?: Handler, times?: number, idx?: number, scale?: number, autoRemove?: boolean, speed?: number): number;
        /**
         * 添加特效
         * @param src 特效资源，UIEftSrc
         * @param parent 存放特效的Group
         * */
        protected addEftByParent(src: string, parent: DisplayObjectContainer, x?: number, y?: number, idx?: number, cb?: Handler, times?: number, scale?: number, autoRemove?: boolean, speed?: number): number;
        /**
         * 添加特效
         * @param parent 存放特效的Group
         * */
        protected addEftByParentScale(parent: DisplayObjectContainer): void;
        protected addEftByDsp(src: string, display: DisplayObject, idx?: number, cb?: Handler, times?: number): number;
        protected stopEffect(id: number): void;
        protected removeEffect(id: number | string): void;
        protected removeAllEffects(): void;
        getEffectById(id: number): UIAnimate;
        private onHide;
        protected removeEft(): void;
        /**
         * 添加模型接口
         * @param index 外显index
         * @param parent 存放外显的容器，一般为Group
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         */
        addAnimate(index: number, parent: DisplayObjectContainer, dir?: number, act?: string, isUi?: boolean): number;
        /**
         * 添加怪物模型接口
         * @param index 怪物index
         * @param parent 存放外显的容器，一般为Group
         */
        addMonster(index: number, parent: DisplayObjectContainer): number;
        /**
         * 添加角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param fashion 时装
         * @param weapon 武器
         * @param wing 翅膀
         * @param sex 性别
         * @param scale 缩放，默认1.1
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         */
        protected updateUIRole(parent: DisplayObjectContainer, fashion: number, weapon: number, wing: number, sex: number, scale?: number, dir?: number, act?: string, isUi?: boolean): void;
        /**
         * 添加自己角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param scale 缩放，默认1.1
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         */
        updateSelfUIRole(parent: DisplayObjectContainer, scale?: number, dir?: number, act?: string, isUi?: boolean): void;
        /**
         * 添加排行榜角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param info 通用排行榜外显
         * @param scale 缩放，默认1.1
         */
        updateRankUIRole(parent: DisplayObjectContainer, info: msg.teammate | RankUIRoleData, scale?: number): void;
        updateUIRoleAtr(isLoop?: boolean, handler?: Handler): void;
    }
}
declare namespace game.mod {
    /**
     * 拥有Icon组件的消耗组件，水平布局
     */
    class CostIcon2 extends eui.ItemRenderer {
        icon: game.mod.Icon;
        lab_cost: eui.Label;
        constructor();
        protected dataChanged(): void;
        /**
         * (拥有数量/消耗数量)
         */
        private updateView;
        /**
         * 设置icon的缩放
         * @param scale 默认1
         */
        setIconScale(scale?: number): void;
        /**设置数值*/
        setLabCost(str: string, color?: number): void;
        /**设置消耗显示，一般会配置一个数组【index，count】*/
        updateShow(cost: number[], isShowName?: boolean): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import rank_info = msg.rank_info;
    interface IPunshListProxy extends IProxy {
        type: number;
        surfaceType: number[];
        roleType: number[];
        openIdxs: number[];
        getEndTime(): number;
        getRankFirst(): rank_info;
        getRankTypeByOpenIdx(openIdx: number): number;
        getSurfaceHintNodes(type: number): string[];
        getOpenIdx(type: number): number;
    }
}
declare namespace game.mod {
    class AvatarIcon extends BaseRenderer {
        img_quality: eui.Image;
        img_icon: eui.Image;
        img_battle: eui.Image;
        img_type: eui.Image;
        starListView: game.mod.StarListView;
        redPoint: eui.Image;
        data: AvatarItemData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        protected defaultView(): void;
    }
}
declare namespace game.mod {
    class AvatarItem extends BaseRenderer {
        item: AvatarBaseItem;
        redPoint: eui.Image;
        img_gray: eui.Image;
        img_gray0: eui.Image;
        starCom: game.mod.StarListView;
        img_chuzhan: eui.Image;
        grp_eft: eui.Group;
        data: AvatarItemData;
        private _qualityEftId;
        constructor();
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        /**单个item设置用*/
        setData(data: AvatarItemData): void;
        /**是否显示置灰层，默认不显示*/
        setGray(isShow?: boolean): void;
        /**品质特效*/
        private removeQualityEft;
    }
}
declare namespace game.mod {
    import DisplayObject = egret.DisplayObject;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Handler = base.Handler;
    class Btn extends eui.Button {
        img_bg: eui.Image;
        redPoint: eui.Image;
        img_hui: eui.Image;
        lab_value: eui.Label;
        img_state: eui.Image;
        img_tag: eui.Image;
        gr_cost: eui.Group;
        lab_cost0: eui.Label;
        img_cost: eui.Image;
        lab_cost: eui.Label;
        img: eui.Image;
        /**显示原价和现价 */
        gr_price: eui.Group;
        lab_price: eui.Label;
        lab_faker_price: eui.Label;
        group_eft: eui.Group;
        pos: number;
        group_font: eui.Group;
        touchScale: boolean;
        scaleGroup: eui.Group;
        private _eftHub;
        protected childrenCreated(): void;
        addBtnChild(child: DisplayObject): void;
        protected onTouchBegin(event: egret.TouchEvent): void;
        protected buttonReleased(): void;
        private updateScaleGroup;
        /**
         * btn按钮文本设置超文本
         * @param textFlow 超文本内容
         * @param stroke 外描边
         */
        setLabelStyle2(textFlow: string, stroke?: number): void;
        /**
         * @param props {x:number, y:number,left:number,right:number,...}
         */
        setLabelStyle3(props: any): void;
        setLabelStyle(size: number, textColor?: number, strokeColor?: number, text?: string, textFlow?: string): void;
        /**
         * 设置原价和现价
         * @param price 现价
         * @param faker 原价
         * @param clearFontPrice 清除font价格，默认true
         */
        setTwoPrice(price: number, faker: number, clearFontPrice?: boolean): void;
        /**隐藏原价和现价的group*/
        resetTwoPrice(): void;
        private addEftHub;
        /**设置价格，font字体*/
        setFontPrice(price: number): void;
        /**清除font价格*/
        clearFontPrice(): void;
        /**设置font字体*/
        addBmpFont(text: string, font: string, container: DisplayObjectContainer, horizontal?: boolean, scale?: number, center?: boolean, gap?: number, expandParent?: boolean): void;
        /**增加特效 */
        setEffect(src: string, parent?: DisplayObjectContainer, x?: number, y?: number, idx?: number, cb?: Handler, times?: number, scale?: number, autoRemove?: boolean, speed?: number, isMirror?: boolean, scaleXBmpOffX?: number): number;
        clearEffect(id?: number | string): void;
        /**不显示文字显示图片 */
        setImage(skin: string, clearFontPrice?: boolean): void;
        /**黄色底按钮*/
        setYellow(): void;
        /**蓝色底按钮*/
        setBlue(): void;
        /**绿色底按钮*/
        setGreen(): void;
        /**灰色底按钮，不可点击*/
        setDisabled(): void;
        /**设置红点*/
        setHint(hint?: boolean): void;
        /**
         * 更新 this.redPoint 的 top|right 位置
         * @param top 默认-15
         * @param right 默认-8
         */
        setHintStyle(top?: number, right?: number): void;
        setLabelColor(color: number): void;
        /**
         * 设置消耗
         * @param cost
         * @param preLab 消耗前的文本，默认不显示
         */
        setCost(cost: number[], preLab?: string): void;
        /**重置消耗*/
        resetCost(): void;
        setTag(bool: boolean, img?: string): void;
        /**
         * 设置 PriceBtnSkin 的消耗
         * @param cost
         */
        setPriceCost(cost: number[]): void;
        /**
         * 重置 PriceBtnSkin 的消耗
         */
        resetPriceCost(): void;
    }
}
declare namespace game.mod {
    class CostIcon extends BaseListenerRenderer {
        img_cost: eui.Image;
        lab_cost: eui.Label;
        /**消耗道具【index, count】*/
        private _index;
        constructor();
        protected onAddToStage(): void;
        /**点击弹出道具tips*/
        protected onClick(): void;
        protected dataChanged(): void;
        /**设置图标*/
        imgCost: string;
        /**设置数值*/
        setLabCost(str: string, color?: number): void;
        /**设置道具索引*/
        updateIndex(index: number): void;
        /**设置消耗显示，一般会配置一个数组【index，count】*/
        updateShow(cost: number[]): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IFirstProxy extends IProxy {
        one_first: boolean;
        cache_times: boolean;
    }
}
declare namespace game.mod {
    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;
    import ITextElement = egret.ITextElement;
    class Icon extends BaseRenderer {
        protected img_quality: eui.Image;
        protected img_icon: eui.Image;
        grp_cnt: eui.Group;
        lab_cnt: eui.Label;
        protected lab_name: eui.Label;
        protected grp_eft: eui.Group;
        protected img_tag: eui.Image;
        protected img_tag_right: eui.Image;
        protected img_gray: eui.Image;
        protected redPoint: eui.Image;
        gr_star: eui.Group;
        lb_starcnt: eui.Label;
        starListView: game.mod.StarListView;
        gr_stage: eui.Group;
        listStarTopRight: eui.List;
        data: number[] | msg.prop_tips_data | PropData | number | msg.prop_attributes | Long;
        private _clickHandler;
        protected propData: PropData;
        private _iconShowType;
        private _tagType;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        protected onClickIcon(e: TouchEvent): void;
        protected setEft(): void;
        /**设置tag资源*/
        protected updateTagImg(): void;
        /**刷新名字显示*/
        private updatePropName;
        /**---------------------以下接口支持外部访问-----------------------*/
        /**设置默认显示*/
        defaultIcon(): void;
        /**设置点击回调*/
        setClickHandler(handler: Handler): void;
        /**设置数据data，单个icon时候调用，iconShowType不会保存进PropData里面*/
        setData(data: number[] | msg.prop_tips_data | PropData | number | msg.prop_attributes | Long, iconShowType?: number): void;
        /**设置iconShowType，iconShowType会保存进PropData里面**/
        iconShowType: number;
        /**获取道具名称*/
        getPropName(isWhite?: boolean, truncate?: boolean): ITextElement[];
        /**设置道具名称*/
        updateName(name?: string): void;
        /**设置激活置灰层*/
        setImgActed(isActed?: boolean): void;
        /**设置置灰层*/
        setImgGray(icon?: string): void;
        /**设置置灰层加锁*/
        setImgLock(): void;
        /**设置红点*/
        setHint(hint?: boolean): void;
        /**设置quality类按钮的样式*/
        updateQualityImg(icon?: string): void;
        /**设置icon资源*/
        updateIconImg(icon?: string): void;
        /**显示数量文本，支持外部设置*/
        updateCnt(cntStr?: string): void;
        /**显示消耗数量文本，支持外部设置*/
        updateCostLab(cost: number[], curCnt?: number): void;
        /**
         * 设置右上角tag资源
         * @param tagImg 右上角tag资源，不传则默认配置表规则
         * @protected
         */
        updateTagRightImg(tagImg?: string): void;
        /**
         * 更新左下角的星星
         * 星数大于5，就展示【星数文本+一颗星星资源】
         * @param starCnt
         */
        updateStar(starCnt: number): void;
        /**
         * 更新右上角的星星
         * @param starCnt
         */
        updateStarTopRight(starCnt: number): void;
        /**
         * 更新阶数，左下角
         * @param stage
         * @param str 默认转
         */
        updateStage(stage: number, str?: string): void;
        /**
         * 角色装备icon，统一处理阶数，星数
         * @private
         */
        private updateEquipIcon;
        /**
         * 更新一些通用的展示逻辑
         * @private
         */
        private updatePropIcon;
    }
}
declare namespace game.mod {
    class IconSel extends BaseRenderer {
        icon: Icon;
        redPoint: eui.Image;
        img_sel: eui.Image;
        /**不做具体实现，子类重写*/
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    import task_data = msg.task_data;
    class TaskRender extends BaseListenerRenderer {
        protected lab_num: eui.Label;
        private lab_desc;
        private bar;
        private img_finished;
        protected btn_go: game.mod.Btn;
        data: task_data;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClickDraw(): void;
    }
}
declare namespace game.mod {
    /**
     * 基础的 egret.Event.ADDED_TO_STAGE 和 egret.Event.REMOVED_FROM_STAGE 事件
     */
    class BaseStageEventItem extends eui.Component {
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
    }
    /**基础文本*/
    class BaseLabelItem extends BaseListenerRenderer {
        lb_desc: eui.Label;
        constructor();
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        /**
         * 设置文本样式
         * @param props {textColor: 0xffffff, size: 22, ...}
         */
        private setLabelStyle;
        /**
         * 设置文本
         * @param txt 文本
         * @param props 文本样式 比如：{textColor: 0xffffff, size: 22, ...}
         */
        setLabel(txt: string, props?: any): void;
    }
}
declare namespace game.mod {
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    class WndMdr extends MdrBase {
        protected _btnList: ArrayCollection;
        protected _btnData: WndBaseViewData[]; /**子类重写，赋值*/
        protected _firstEnter: boolean; /**是否首次进入，用于保存界面数据*/
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected onClickBack(): void;
        /**更新list数据*/
        protected updateBtnList(): void;
        /**刷新显示界面*/
        protected updateViewShow(): void;
        /**获取对应的mdr*/
        protected getMdrPosByType(type: string): number;
        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string;
        /**分页点击时检测*/
        protected onTabCheck(index: number): boolean;
        /**分页选中变更时调用，比Mdr的onShow()方法晚执行*/
        protected onTabChanged(): void;
        /** 通用背景监听 */
        private onBgUpdate;
        /**更新背景，子类重写 */
        protected updateBg(bg: string): void;
        /** 通用移动层级监听，子类重写 */
        protected setTop(): void;
        /**保存分页数据，子类可重写*/
        protected setViewData(): void;
        private onTabUpdate;
        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void;
        /** 刷新分页红点 */
        protected updateTabHint(): void;
        /**功能开启刷新按钮*/
        private onOpenFuncUpdate;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    class ViewMgr {
        private static _instance;
        private _curName;
        private _curType;
        /**记录界面数据，用于返回上一级界面用，会记录data*/
        private _curPath;
        /**记录副本界面数据，突出场景返回副本界面用*/
        private _lastPath;
        /**二级弹窗绑定数据用*/
        private _propTipsViewType;
        static getIns(): ViewMgr;
        private checkVipLv;
        /**等级开启判断*/
        checkLv(lv: number): boolean;
        /**等级开启提示文本*/
        checkLvStr(lv: number): string;
        private checkPower;
        checkMainLine(mainline: number): boolean;
        /**判断是否通过当前关卡 */
        checkPass(pass: number): boolean;
        private checkServerOpen;
        /**转生开启判断*/
        checkRebirth(rebirth: number): boolean;
        /**转生开启提示文本*/
        checkRebirthStr(rebirth: number): string;
        /**系统提示，返回的文本剪切前面几位*/
        getOpenFuncShow(_idx: number, spliceNum?: number): string;
        /**判断当前界面是否已打开，先保留，不推荐使用*/
        isShow(mName: string, vType: string): any;
        /**当前是否在主界面*/
        isMain(): boolean;
        checkModOpen(mName: string): boolean;
        /***************************以下为新加的接口******************************/
        /**
         * 一级弹窗界面，会关闭旧的一级界面
         * @param {string} mName，ModName
         * @param {string} vType，ViewType
         * @param data，界面数据
         * @param showBack，走通用返回逻辑
         */
        showView(mName: string, vType: string, data?: any, showBack?: boolean): void;
        /**记录上一个界面*/
        private setLastView;
        /**清除界面数据，断线重连时候也会清除*/
        clearView(): void;
        /**
         * 保存的界面数据，退出场景返回界面用
         * @param data 界面数据，一般是BtnType
         */
        lastData: any[];
        /**
         * 绑定二级弹窗界面,方便实现关闭按钮
         * @param {string} mName，ModName
         * @param {string} vType，ViewType
         * @param data，界面数据
         */
        showSecondPop(mName: string, vType: string, data?: any): void;
        /**
         * 回到主界面
         */
        showMain(): void;
        /**
         * 统一关闭系统主界面
         */
        hideMainView(): void;
        /**
         * 返回上一级界面
         */
        back(): void;
        /**
         * 返回第一个界面,用于退出副本后返回界面
         */
        backLast(): void;
        /**
         * 保存副本界面数据
         */
        saveLast(): void;
        /**
         * 判断是否隐藏按钮
         * @returns {boolean}
         * @param openIdx
         */
        checkBtnShow(openIdx: number): boolean;
        /**
         * 判断功能开启
         * @param openIdx
         * @param showTips 是否提示，默认false
         */
        checkViewOpen(openIdx: number | string, showTips?: boolean): boolean;
        /**
         * 根据跳转id跳转
         * @param {number} id 跳转id
         * @param {any} param 附带参数
         * @param showBack，走通用返回逻辑
         * @param showTips 跳转不成功提示
         */
        showViewByID(id: number, param?: any, showBack?: boolean, showTips?: string): void;
        private checkJumpOpen;
        private decodeJumpData;
        showJumpBtn(id: number): boolean;
        /**
         * 成功提示，例如激活成功、升级成功
         * @param type 资源类型
         */
        showSuccessTips(type?: SuccessTipsType): void;
        /**
         * 道具提示
         * @param data 道具数据
         * @param iconShowType Icon显示类型：IconShowType
         */
        showPropTips(data: PropData | number, iconShowType?: number): void;
        /**
         * 玩家身上装备提示
         * @param data 道具数据
         * @param isSelf 是否是自己的信息
         * @param isBag 是否在背包点击
         */
        showRoleEquipTips(data: PropData | number, isSelf?: boolean, isBag?: boolean): void;
        /**
         * 获得外显，激活外显提示
         * @param index 外显index
         * @param triggerGuide 关闭后继续指引，服务端下发获得碎片弹窗不执行这个，激活外显时候执行
         */
        showSurfaceTips(index: number | Long, triggerGuide?: boolean): void;
        /**
         * 外显进阶成功提示
         * @param skillId 技能ID
         * @param lv 技能等级
         * @param lvDesc 直接取等级描述
         */
        showSurfaceUpTips(skillId: number, lv: number, lvDesc?: boolean): void;
        /**
         * 突破成功提示
         * @param skillId 技能id
         * @param lv 突破后的阶数
         * @param attrDesc0 突破前的文本或属性
         * @param attrDesc1 突破后的文本或属性
         */
        showBreakthroughTips(skillId: number, lv: number, attrDesc0?: string, attrDesc1?: string): void;
        /**
         * 升星成功提示
         * @param data
         */
        showUpStarTips(data: UpStarData): void;
        /**
         * 道具来源提示界面
         * @param index 道具index
         */
        showGainWaysTips(index: number): void;
        /**
         * 通用的属性展示面板 (带有仙力属性)
         * @param titleStr 弹窗标题，未支持传入提示表的key
         * @param attrs 属性
         */
        showAttrTips(titleStr: string, attrs: msg.attributes): void;
        /**
         * 通用的属性展示面板（没有仙力属性相关的）
         * @param titleStr 弹窗标题，未支持传入提示表的key
         * @param attrs 属性
         * @param attrItemStr 属性标题，默认【基础属性】
         * @param layoutType 展示属性的list布局，默认【2:TileLayout】 1: VerticalLayout, 2: TileLayout
         */
        showAttrTipsWithoutGod(titleStr: string, attrs: msg.attributes, attrItemStr?: string, layoutType?: number): void;
        /**
         * 通用的奖励领取tips
         * @param titleStr 面板title，传空，默认奖励预览
         * @param reward 奖励数组
         * @param state 状态0：未完成，1: 可领取，2：已领取
         * @param handler 点击领取按钮回调。点击后抛出 MainEvent.UPDATE_BASE_REWARD_MDR_STATE 用于更新领取状态
         * @param tipsStr 提示文本，存在提示文本时，不显示领取状态
         */
        showRewardTips(titleStr: string, reward: number[][], state: number, handler: Handler, tipsStr?: string): void;
        /**
         * 通用的宝箱奖励查看
         * @param tips 描述文本
         * @param reward 奖励数组
         * @param tips1 描述文本2
         * @param okFunc 点击确定函数
         */
        showBoxReward(tips: string, reward: number[][], tips1?: string, okFunc?: Handler, time?: number): void;
        /**通用的宝箱奖励查看与上同 参数整合 */
        showBoxReward2(data: BoxRewardData): void;
        /**
         * 通用的购买次数
         * @param tips 描述文本
         * @param cost 单次购买消耗
         * @param cnt 剩余可购买次数
         * @param maxBuyCnt 当前可购买次数
         * @param maxCnt 最大可购买次数
         * @param handler 点击购买按钮回调
         */
        showBuyTimes(tips: string, cost: number[], cnt: number, maxBuyCnt: number, maxCnt: number, handler: Handler): void;
        /**
         * 被动技能界面，激活后发送 SurfaceEvent.SURFACE_SKILL_UPDATE 并携带是否激活参数，以刷新状态
         * @param skillId 技能index
         * @param isAct 是否激活
         * @param confirm 激活回调
         * @param condHandler 其他激活条件
         */
        showSkillTips(skillId: number, isAct: boolean, confirm?: Handler, condHandler?: Handler): void;
        /**
         * 技能一般提示界面
         * @param skillId 技能index
         * @param lv 等级
         * @param isXianfaSkill 是否仙法技能展示
         */
        showSkillNormalTips(skillId: number, lv?: number, isXianfaSkill?: boolean): void;
        /**
         * 技能激活条件展示
         * @param skillId 技能id
         * @param isActed 是否激活
         * @param actStr  未激活时，展示的激活条件
         */
        showSkillConditionTips(skillId: number, isActed: boolean, actStr?: string): void;
        /**
         * 规则说明界面
         * @param str 文本
         * @param titleStr 标题，默认玩法说明
         */
        showRuleTips(str: string, titleStr?: string): void;
        /**
         * 挑战第几层
         * @param lv 层级
         */
        showChallengeTips(lv: number): void;
        /**
         * 排行榜界面
         * @param rankType 排行榜类型
         */
        showRank(rankType: RankType): void;
        /**
         * 礼包界面
         * @param productId 商品id
         */
        showGift(productId: number): void;
        /**
         * Boss奖励预览
         * @param rewardId 奖励预览id，可拓展
         * @param tips 提示文本
         */
        bossReward(rewardId: number, tips?: string[]): void;
        /**
         * 奖励获取
         * @param rewards 奖励
         */
        bossRewardShow(rewards: msg.prop_tips_data[]): void;
        /**
         * 奖励预览
         * @param rewards 奖励
         * @param tips 提示文本
         * @param title 标题，不传默认：奖励预览
         */
        rewardShow(rewards: number[][], tips: string, title?: string): void;
        /**
         * 查看玩家信息
         * @param roleId，玩家角色id
         * @param serverId，玩家服务器id
         * @param isRobot，是否机器人
         */
        showRoleTips(roleId: Long, serverId?: number, isRobot?: number): void;
        /**
         * 私聊玩家
         * @param info，玩家信息或者角色id
         */
        chat(info: msg.friend_info | Long | msg.teammate): void;
        /**
         * 只有确定按钮
         * @param {string} content
         * @param confirm
         */
        show(content: string, confirm?: Handler): void;
        /**
         * 有确定和取消按钮
         * @param {string} content
         * @param {base.Handler} confirm
         * @param {base.Handler} cancel
         * @param changeHide 场景变化后关闭否，默认false
         */
        showConfirm(content: string, confirm?: Handler, cancel?: Handler, changeHide?: boolean): void;
        /**
         * 只有确定按钮以及本次登录不再提示
         * @param {string} content
         * @param type 不再提示类型
         * @param confirm
         */
        showNotTips(content: string, type: NotTipsType, confirm?: Handler): void;
        /**
         * 活动最后一天提示
         * @param endTime，活动结束时间戳
         * @param type 不再提示类型
         * @param content，默认：活动仅剩最后一天，若有奖励可领取或兑换，请记得前往
         */
        showActTips(endTime: number, type: NotTipsType, content?: string): void;
        /** 跳转VIP界面 */
        openVipView(): void;
        /**
         * 常规充值流程 先判断首充 再跳转商城
         * */
        openCommonRechargeView(): void;
        /**
         * 通用的批量购买tips todo
         * @param index 商店表的商品
         * @param left_cnt 剩余购买数量
         * @param handler 购买回调
         */
        openStoreBuyTips(index: number, left_cnt: number, handler: Handler): void;
        /**批量购买（不读配置） */
        openBuyBulkTips(param: ShopBuyBulkData): void;
        /**跳转兑换商店界面 */
        openExchangeShopView(btnType?: string): void;
        /**
         * 检查boss是否开启
         * @param openType boss表开启条件第一个参数 1等级条件 2转生条件
         * @param openLevel boss表开启条件第二个参数
         * @param showTips
         * */
        checkBossOpen(openType: number, openLevel: number, showTips?: boolean): boolean;
        /**
         * 抖动界面，效果还需要调，都是由缓动组成
         * @param layer 被抖动的层
         */
        shakeUI(view: eui.Component): void;
        shakeUI2(view: eui.Component): void;
        /**
         * 奖励预览弹窗，带有权重
         * @param data
         */
        openPreviewReward(data: BasePreviewRewardData[]): void;
        /**
         * 达标奖励界面，传入礼包类型【J_进阶奖励的dabiaojiangli页】
         * @param giftType
         */
        openGiftView(giftType: GiftType): void;
        /**检测战队军团阵容是否上阵
         * 没上阵的话跳转上阵界面
         * */
        checkZhenrong(jump?: boolean): boolean;
        /**检测战队军团阵容仙力
         * 仙力不足时，提示：敌人军团仙力较高，是否继续挑战？*/
        checkZhenrongGod(god: number, handler?: Handler): boolean;
        /**通用匹配 具体传参看MatchData */
        showCommonMatch(data: MatchData): void;
        /** 判断中控活动是否开启 */
        isOpenCentralActivity(data: msg.oper_act_item): boolean;
        /**仙宗排行榜结算领取奖励弹窗 */
        showUnionRankTips(type: number): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IGodProxy extends IProxy {
        getActivate(type: number): boolean;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    class ComProgressRewardItem extends BaseRenderer {
        private btn_box;
        private lab_value;
        private img_got;
        private redPoint;
        data: ComRewardData;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickBtn;
        setData(data: ComRewardData): void;
    }
    interface ComRewardData {
        /**index改变currentState 宝箱资源显示 !index使用另一套资源 */
        index?: number;
        /**次数 */
        count: number;
        /**0不可领取 1可领取 2已领取 */
        state: ComRewardState;
        /**奖励预览 */
        rewards: number[][];
        /**领取回调 */
        handler: Handler;
        /**奖励预览文本 */
        content?: string;
    }
    /**0不可领取 1可领取 2已领取 */
    const enum ComRewardState {
        NotReward = 0,
        Reward = 1,
        Done = 2
    }
    /**ComRewardSkin 宽度 */
    const ITEM_WIDTH: number;
    const BOX_ASSETS_COUNT: number;
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import friend_info = msg.friend_info;
    import friend_add_data = msg.friend_add_data;
    import qiecuo_param_data = msg.qiecuo_param_data;
    interface IFriendProxy extends IProxy {
        isFriend(roleId: Long): boolean;
        getFriendInfo(roleId: Long): friend_info;
        c2s_friend_apply(roleList: friend_add_data[]): void;
        c2s_friend_list(type: number): void;
        friendList: friend_info[];
        c2s_friend_pvp_challenge(roleId: Long, data?: qiecuo_param_data): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IFuchenlinghuProxy extends IProxy {
        isOpenSea(seaType: SeaType, isTips?: boolean): boolean;
        getCostIds(): number[];
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import jinjie_list = msg.jinjie_list;
    import common_reward_status = msg.common_reward_status;
    interface IGiftProxy extends IProxy {
        /** 点击阶段奖励信息 */
        c2s_jinjie_stage_get_list(type: GiftType): void;
        /**领取奖励*/
        c2s_jinjie_stage_get_reward(type: GiftType, index: number): void;
        /**根据类型，获取对应的进阶奖励列表*/
        getGiftInfo(type: GiftType): jinjie_list;
        /**根据类型和索引，获取对应的奖励状态信息*/
        getGiftStatus(type: GiftType, index: number): common_reward_status;
        /**根据 GiftType 获取红点*/
        getHintByGiftType(type: GiftType): boolean;
    }
}
declare namespace game.mod {
    interface IActRiLi {
        map_type: number;
        round_no: number;
        beg_timestamp: number;
        end_timestamp: number;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IHintProxy extends IProxy {
        /**不要直接访问proxy数据，通过HintMgr访问*/
        getHint(node: string[]): boolean; /**获取红点*/
        setHint(value: boolean, node: string[], openIdx?: number): void; /**设置红点 （注意子节点key的唯一）*/
        getHintByOpenIdx(openIdx: number): boolean; /**根据功能idx获取红点*/
        getTypeByOpenIdx(openIdx: number): string; /**根据功能idx获取红点唯一key*/
        addTimeEvent(type: number, time: number, proxy: any, method: Function, args?: any[]): void; /**添加定时器事件*/
        hasTimeEvent(type: number): boolean;
        removeTimeEvent(type: number): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IHuanjingProxy extends IProxy {
        getGrowHintPath(systemId: number): string[];
        getSurfaceActedNum(systemId: number): number;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IHuashenProxy extends IProxy {
        checkRoadOpen(showTips?: boolean): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import lingchong_item = msg.lingchong_item;
    interface ILingChongProxy extends IProxy {
        /**
         * 获取激活的灵宠信息
         * @param index 灵宠index
         */
        getInfo(index: number): lingchong_item;
        getMaxStar(index?: number): number;
        canUpStar(index: number, isTips?: boolean): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface ILotteryProxy extends IProxy {
        isOpen(): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IMailProxy extends IProxy {
        mail_online_request_c2s(): void;
        getTotalMailCnt(): number;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import attributes = msg.attributes;
    import prop_tips_data = msg.prop_tips_data;
    interface IMainProxy extends IProxy {
        init(): void;
        readonly openFuncIdx: number[];
        saveSettingInfo(): void;
        /**统一通过RoleUtil访问*/
        getAttr(index: number, type?: number): attributes;
        /**统一通过RoleUtil访问*/
        getAttrList(indexList: number[], type?: number): attributes[];
        /**统一通过RoleUtil访问*/
        c2s_sys_attributes(openIdx: number): void;
        /**判断是否有某属性，只判断不请求，统一通过RoleUtil访问*/
        checkAttr(index: number): boolean;
        /**判断是否有某属性，只判断不请求，统一通过RoleUtil访问*/
        checkAttrList(indexList: number[]): boolean;
        /**不再提示*/
        getNotTipsType(type: number): boolean;
        readonly offlineTotalTime: number;
        readonly offlineMaxtime: number;
        readonly rewards: prop_tips_data[];
        c2s_hangup_get_rwd(type?: number): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import setting = msg.setting;
    interface IMiscProxy extends IProxy {
        lastSyncTick: number;
        isGou: boolean;
        intiGameSetting(settings: setting[]): void;
        getSetting(key: string): string;
        getSettingN(key: string): number;
        setSetting(key: string, val: string, now?: boolean): void;
        sendGM(text: string): void;
        changeName(name: string, sex: number): void;
        syncTime(): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import s2c_rank_info = msg.s2c_rank_info;
    interface INewRankProxy extends IProxy {
        getRankInfo(type: RankType, eventType?: number): s2c_rank_info;
        getMyRankTypeDesc(rankType: number, powerCN?: boolean): string;
        c2s_rank_req_rank(rankType: number, event_type?: number): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IPassProxy extends IProxy {
        readonly passNextIdx: number;
        readonly passSceneChan: number;
        readonly passMaxIdx: number;
        readonly target_wave_cnt: number;
        readonly now_wave_cnt: number;
        curIndex: number;
        passIsAuto: boolean;
        c2s_mainline_task_auto(bool: boolean): void;
        readonly curStep: number; /**闯关关卡数*/
        changeIdxToNum(idx: number): number;
        getStepByIdx(stepIdx: number): number;
        challengeBoss: boolean;
        c2s_mainline_enter(): void;
        getShowIndex(): number;
        getIcon(index: number): string;
        getOpenTxt(index: number): string;
        onCheckMainShow(): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IPayProxy extends IProxy {
        /**统一由PayUtil访问*/
        c2s_check_product_id(productId: number): void;
        c2s_direct_buy_reward(productId: number): void;
        hasReceived(productId: number): boolean;
        /**礼包是否已领取*/
        canReceived(productId: number): boolean;
        /**礼包是否可领取*/
        getBuyTimes(productId: number): number;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IPrerogativeWritProxy extends IProxy {
        /**特权令是否全部购买了*/
        isAllBought(): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import oper_act_item = msg.oper_act_item;
    interface IActivityProxy extends IProxy {
        getOperActList(actType: number): oper_act_item[];
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import s2c_new_rank_info = msg.s2c_new_rank_info;
    interface IRankProxy extends IProxy {
        /**不要直接访问proxy数据，通过RankUtil访问*/
        c2s_new_rank_req_rank(rankType: number): void; /**请求排行榜信息*/
        c2s_first_rank_award(rankType: number, index: number): void; /**请求领取大神榜 奖励*/
        getRankInfo(rankType: number): s2c_new_rank_info; /**获取排行榜信息*/
        getGodInfos(rankType: number): RankGodRenderData[]; /**获取大神榜信息*/
        getHintTypes(rankType: number): string[]; /**获取红点类型*/
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IResultProxy extends IProxy {
        is_success: boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IRingProxy extends IProxy {
        canOpenGift(): boolean;
    }
}
declare namespace game.mod {
    import property = msg.property;
    import attributes = msg.attributes;
    import IProxy = base.IProxy;
    interface IRoleProxy extends IProxy {
        updateDay(serverDay: number, loginDay: number): void;
        readonly serverDay: number;
        readonly loginDay: number;
        updateRole(prop: property, attr: attributes): string[];
        getLeftTime(endDay: number): number;
        hasPrivilege(key: string): boolean;
        getPrivilegeValue(key: string): number;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IRoleRingProxy extends IProxy {
        /**不要直接访问proxy数据，通过RoleUtil访问*/
        isRoleRingAct(type?: number): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface ISceneExpandProxy extends IProxy {
        end_time: number;
        jumpToStrength: string;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import SceneObjVo = game.scene.SceneObjVo;
    import MonsterVo = game.scene.MonsterVo;
    import ActorVo = game.scene.ActorVo;
    import GPlayerVo = game.scene.GPlayerVo;
    import battle_buff = msg.battle_buff;
    import teammate = msg.teammate;
    import scene_monster_data = msg.scene_monster_data;
    import MainGPlayer = game.scene.MainGPlayer;
    import MainGPlayerVo = game.scene.MainGPlayerVo;
    import Scene = game.scene.Scene;
    import CommonAi = game.scene.CommonAi;
    import s2c_battle_role_die = msg.s2c_battle_role_die;
    interface ISceneProxy extends IProxy {
        readonly curSceneIdx: number;
        readonly scene: Scene;
        isMapOk: boolean;
        foeTargetId: Long;
        readonly isEnterScene: boolean;
        readonly lastSceneIdx: number;
        readonly mainPlayerVo: MainGPlayerVo;
        readonly mainPlayerObj: MainGPlayer;
        readonly mainPlayerBuffList: battle_buff[];
        readonly firstEnter: boolean;
        readonly curSceneType: number;
        readonly isAutoHangUp: boolean;
        readonly isServerControl: boolean;
        readonly voList: {
            [key: string]: SceneObjVo;
        };
        enemyInfo: {
            id: Long;
            type: number;
        };
        readonly isSceneEft: number;
        setFirstEnter(ret: boolean): void;
        getSceneType(id: number): number;
        isTargetAtkEnable(id: Long): boolean;
        getFoeTarget(camp?: number): GPlayerVo;
        addVo(vo: SceneObjVo, type: number): void;
        delVo(id: Long): SceneObjVo;
        getVosByCamp(camp: number): ActorVo[];
        getEnemyVos(type?: number): ActorVo[];
        getBossVo(): MonsterVo;
        getVosByType(type: number): SceneObjVo[];
        getVosByTeamId(teamId?: Long): GPlayerVo[];
        getVoByRoleId(roleId: Long, camp?: number): GPlayerVo;
        getVoById(id: Long): SceneObjVo;
        resetModel(): void;
        initialize(): void;
        onStartReconnect(): void;
        enterScene(mapId: number): void;
        confirmEnterMap(): void;
        doMove(list: {
            x: number;
            y: number;
        }[], moveType?: number): void;
        useSkill(skillIdx: number, focus: Long, type?: number[], x?: number, y?: number, tx?: number, ty?: number): void;
        requestMonster(entity_id?: Long): void;
        setAutoHangUp(): void;
        clearFoeTarget(): void;
        getRoleVoById(id: Long): GPlayerVo;
        getVosTypeById(_id: Long): number;
        change_scene_c2s(scene_index?: number): void;
        scene_ride_oper_c2s(ride_state: number, ride_x?: number, ride_y?: number): void;
        pop_progressbar_c2s(id: number, ret?: number): void;
        addMonsterDataClient(data: scene_monster_data): void;
        play_conversation_c2s(index: number): void;
        clickExit(): void;
        exitScene(): void;
        belong: teammate;
        readonly maxHurt: teammate;
        curBossId: Long;
        requestControlAI(ret: ControlAIType): void;
        readonly mainAi: CommonAi;
        readonly endTime: number;
        readonly diedInfo: s2c_battle_role_die;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface ISeaProxy extends IProxy {
        /**能否开启排行榜，幻境系统有用到*/
        canOpenRank(): boolean;
        /**是否开启某区域*/
        isEnter(type: SeaType): boolean;
        getRankHintType(type: number): string[];
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import ShenlingJibanConfig = game.config.ShenlingJibanConfig;
    import god_brother_group_data = msg.god_brother_group_data;
    import ShenlingConfig = game.config.ShenlingConfig;
    import god_brother_data = msg.god_brother_data;
    import ShenlingXingjiConfig = game.config.ShenlingXingjiConfig;
    import attributes = msg.attributes;
    interface IShenLingProxy extends IProxy {
        /**羁绊配置的羁绊id列表*/
        getJiBanIdxList(): number[];
        /**羁绊配置*/
        getJiBanCfg(index: number): ShenlingJibanConfig[];
        /**获取羁绊信息*/
        getJiBanInfo(index: number): god_brother_group_data;
        /**神灵配置*/
        getShenLingCfg(index: number): ShenlingConfig;
        /**
         * 单个神灵服务端下发的信息
         * @param index 神灵index
         */
        getInfoByIndex(index: number): god_brother_data;
        /**羁绊激活和升级红点*/
        getJiBanActHint(index: number, isTips?: boolean): boolean;
        /**羁绊奖励红点*/
        getJiBanRewardHint(index: number): boolean;
        /**
         *  羁绊激活
         * @param index 羁绊ID
         * @param rewardList 带rewardindex字段时表示领取羁绊组合达标奖励,不带则表示激活
         * @param shenlingIndex
         */
        c2s_god_brother_groupup(index: number, rewardList: number[], shenlingIndex: number): void;
        /**升星的最大星级*/
        getMaxStar(index: number): number;
        /**
         * 羁绊神灵激活红点
         * @param jbIndex 羁绊ID
         * @param index 神灵index
         */
        getJiBanShenLingActHint(jbIndex: number, index: number): boolean;
        /**神灵星级配置*/
        getStarCfg(index: number, star: number): ShenlingXingjiConfig;
        /**获取已激活的神灵index列表*/
        getActedList(): number[];
        /**系列神灵信息，类型用any接收*/
        getTypeInfo(type: number): any;
        /**羁绊item的红点：神灵激活红点，羁绊激活升级红点，羁绊奖励红点*/
        getJibanHint(jbIndex: number): boolean;
        /**神灵总属性*/
        getAttr(): attributes;
        /**神灵模型名称*/
        getShenlingModelName(index: number): string;
        /**神灵品质*/
        getCurQuality(index: number): number;
        /**某阵位可激活，isFirst判断阵位*/
        haveActType(isFirst?: boolean): boolean;
        /**某阵位可升星*/
        haveUpStarType(): boolean;
        /**根据类型获取已激活的神灵列表，按战力高低排序*/
        getActedListByType(type: number, sort?: boolean): god_brother_data[];
        canAwaken(index: number, isTips?: boolean): boolean;
        /**是否觉醒阶段了*/
        isAwaken(index: number): boolean;
        /**
         * 通用升星碎片id，只用于非进化神灵的升星。
         * （激活不可使用，进化神灵不可使用）
         * @param index
         */
        getCommonCost(index: number): number;
        canUpStar(index: number, isTips?: boolean): boolean;
        c2s_god_brother_starup(index: number): void;
        /**获取具体神灵所有星级配置信息*/
        getStarCfgList(index: number): {
            [star: number]: ShenlingXingjiConfig;
        };
        /**神迹奖励红点*/
        getShenJiRewardHint(index: number): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IShenlingGiftProxy extends IProxy {
        canOpen(): boolean;
        giftHint: boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import forbidden_item = msg.forbidden_item;
    import material_item = msg.material_item;
    interface IShilianProxy extends IProxy {
        isEndSmallGate: boolean;
        isXiantaShowExit(): boolean;
        /**获取关卡信息*/
        getFbdInfo(type: number): forbidden_item;
        getFubenInfo(type: number): material_item;
        isFbdTypeOpen(type: number, showTips?: boolean): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IShoujiHuanhuaProxy extends IProxy {
        canTaskActGather(): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import HorseJibanConfig = game.config.HorseJibanConfig;
    import HorseConfig = game.config.HorseConfig;
    import attributes = msg.attributes;
    import ride_item = msg.ride_item;
    interface ISurfaceProxy extends IProxy {
        c2s_ride_oper_jiban(headType: number, index: number, rideIndex?: number): void;
        /**羁绊是否激活*/
        isJibanAct(headType: number, index: number): boolean;
        /**羁绊单个外显是否已激活*/
        isJibanItemAct(headType: number, index: number, rideIndex: number): boolean;
        /**羁绊配置列表*/
        getJibanCfgList(headType: number): HorseJibanConfig[];
        /**羁绊系统是否可以激活*/
        canJibanSysAct(headType: number, cfg: HorseJibanConfig): boolean;
        /**羁绊是否可以激活*/
        canJibanAct(headType: number, cfg: HorseJibanConfig): boolean;
        canJibanItemAct(headType: number, cfg: HorseJibanConfig, index: number): boolean;
        /**单个外显星级*/
        getSurfacePerStar(index: number): number;
        /**通用的属性描述*/
        getSpecialAttrDesc(index: number, specialindex: number): string;
        selJibanCfg: HorseJibanConfig;
        /**小等级*/
        getSurfaceSmallLv(headType: number): number;
        headType: number;
        selData: AvatarItemData;
        /**炼神丹使用数量*/
        getPillUseCnt(surfaceId: number, index: number): number;
        /**使用炼神丹*/
        c2s_lianshendan_swal(surfaceId: number, index: number): void;
        /**幻化激活/升星*/
        c2s_ride_oper_up_star(oper: number, surfaceId: number, headType: number, pos?: number): void;
        canUpStar(index: number): boolean;
        getSurfaceTypes(headType: number): number[];
        getSurfaceTypeHint(headType: number, type: number): boolean;
        getSurfaceId(headType: number): number;
        getSurfaceCfgList(headType: number, type: number): HorseConfig[];
        getSurfacePerHint(cfg: HorseConfig): boolean;
        getSurfacePerAttr(index: number): attributes;
        getSurfaceMaxStar(headType: number): number;
        getStarPropCnt(headType: number, quality: number, propIndex: number, star: number): number;
        getSurfacePillCost(quality: number, star: number, headType: number): number[][];
        getBtnType(headType: number): string;
        c2s_ride_oper_skill_active(skillId: number, headType: number): void;
        c2s_ride_oper_up(oper: number, headType: number): void;
        getJibanHint(headType: number): string[];
        getGiftHint(headType: number): string[];
        getDefaultId(headType: number): number;
        getSurfaceAllAttr(headType: number): attributes;
        getSurfaceSkillId(headType: number): number;
        getSurfaceStage(headType: number): number;
        getSurfaceSkillList(headType: number): number[];
        isSurfaceSkillAct(headType: number, skillId: number): boolean;
        getSurfacePerLv(headType: number): number;
        getSurfaceLv(headType: number): number;
        getSurfaceExp(headType: number): number;
        getSurfaceUpExp(headType: number, index: number): number;
        getSurfaceUpCost(headType: number, index: number): number[][];
        /**进阶奖励是否购买*/
        hasGiftBuy(headType: number, index: number): boolean;
        /**购买礼包*/
        c2s_buy_reward(headType: number, index: number): void;
        isJiban(headType?: number): boolean;
        isStar(headType?: number): boolean;
        getStarRoadByHeadType(headType?: number): string;
        getHeadTypeToStarHint(headType?: number): string[];
        isDefaultAct(headType: number): boolean;
        isBattle(headType: number, index: number): boolean;
        getPosIndex(headType: number, pos: number): number;
        canPosBattle(headType: number): boolean;
        getCanBattleInfos(headType: number): ride_item[];
        getSurfacePerInfo(index: number): ride_item;
        getBattleHint(headType: number): string[];
        getOpenIdx(headType: number): number;
        getActHint(headType: number): boolean;
        getSurfaceActCnt(headType: number): number;
        resetHuashenIds(): void;
        setHuashenIds(curId: number): void;
        readonly huashenIds: number[];
        huashenTime: number;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import task_data = msg.task_data;
    interface ITaskProxy extends IProxy {
        /**不要直接访问proxy数据，通过TaskUtil访问*/
        all_task_info_c2s(types: number[]): void; /**请求任务信息*/
        c2s_quick_task(taskId: number): void; /**快速完成任务*/
        task_recv_reward_c2s(taskId: number): void; /**领取奖励 */
        getTaskList(type: number): task_data[]; /**获取任务列表*/
        getTask(taskId: number): task_data; /**获取任务*/
        getTaskHint(type: number): boolean; /**获取任务红点*/
        getTaskList(type: number): task_data[]; /**获取任务列表*/
        c2s_one_key_task_recv_reward(type: number): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface ITehuiLibaoProxy extends IProxy {
        getInfo(type: number): number;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IUnionProxy extends IProxy {
        readonly isInUnion: boolean;
        readonly guild_id: number;
        readonly guild_name: string;
        readonly guild_job: number;
        c2s_guild_ware_exchange(prop_index: Long): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IVipProxy extends IProxy {
        /**是否已达最大vip等级*/
        isMaxVip(): boolean;
        /**当前vip等级索引*/
        getIdx(): number;
        /**当前vip经验*/
        getExp(): number;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IXiandiProxy extends IProxy {
        checkOpen(): boolean;
        c2s_xiandi_zhengba_oper(oper_type: number, params?: number, role_id?: Long): void;
        xiandi_open: number;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IXianfaProxy extends IProxy {
        posSkills: number[];
        skills: number[];
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import fly_sword_info = msg.fly_sword_info;
    import attributes = msg.attributes;
    import XianjianJibanConfig = game.config.XianjianJibanConfig;
    import jiban_item = msg.jiban_item;
    interface IXianjianProxy extends IProxy {
        c2s_fly_sword_operation(index: number, op: number, param: number): void;
        getInfo(index: number): fly_sword_info;
        getAttr(): attributes;
        jibans: jiban_item[];
        skills: number[];
        canJibanAct(cfg: XianjianJibanConfig): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import attributes = msg.attributes;
    interface IXianluProxy extends IProxy {
        readonly xianpolevel: number;
        readonly xianpoattr: attributes;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import teammate = msg.teammate;
    interface IXianlvProxy extends IProxy {
        isOpenShilian(): boolean;
        getBanlvInfo(): teammate;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IXianmaiProxy extends IProxy {
        isActTime(): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import Handler = base.Handler;
    interface IXiuxianNvpuProxy extends IProxy {
        /**女仆是否激活，true为激活。isTips是否飘字，showConfirm是否展示确定弹窗*/
        isActed(isTips?: boolean, showConfirm?: boolean): boolean;
        /**
         * 添加可挑战的副本事件
         */
        addAutoChallengeEvent(type: XiuxianNvpuEventType, handler: Handler): void;
        /**
         * 移除副本事件
         * @param type 事件类型
         * @param isReset 当前正在处理类型==type且是特殊情况，马上重置处理下一轮，默认false。一般不需要传，退出副本或者关闭扫荡界面等，会重置处理下一轮。
         */
        removeAutoChallengeEvent(type: XiuxianNvpuEventType, isReset?: boolean): void;
        /**
         * 当前正在处理的事件类型
         */
        readonly autoChallengeEventType: XiuxianNvpuEventType;
        readonly show_index: number;
        readonly shenlingId: number;
        /**判断挂机类型勾选状态*/
        isNvpuOnlineSelected(eventType: XiuxianNvpuEventType): boolean;
        /**修改勾选状态 selected表示勾选状态*/
        setNvpuOnlineSetting(eventType: XiuxianNvpuEventType, selected: boolean): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import zhandui_legion_attribute = msg.zhandui_legion_attribute;
    interface IXujieTansuoProxy extends IProxy {
        readonly shenling_list: Long[];
        readonly legion_attr: zhandui_legion_attribute;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IYishouProxy extends IProxy {
        c2s_yishou_shouying_jiban(index: number, id?: number): void;
        isJibanIconActed(jibanIndex: number, partnerIndex: number): boolean;
        isJibanActed(jibanIndex: number): boolean;
        canJibanIconAct(jibanIndex: number, partnerIndex: number): boolean;
        canJibanAct(jibanIndex: number): boolean;
        getJibanIconActedList(jibanIndex: number): number[];
        getJibanHint(jibanIndex: number): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IYjjsProxy extends IProxy {
        /**是否开启 玩家领取了“送神灵”的活动奖励 且在活动时间内*/
        isOpen(): boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import s2c_yuanling_invita = msg.s2c_yuanling_invita;
    interface IYuanLingProxy extends IProxy {
        /**获取邀请列表*/
        getInvitedTeamList(): s2c_yuanling_invita[];
        /**当前挑战层数*/
        curLayer(): number;
        /**有队伍*/
        onTeam(): boolean;
        onClearInvitedTeam(): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IZeroBuyProxy extends IProxy {
        isOpen: boolean;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IZhanduiProxy extends IProxy {
        /**拥有队伍*/
        haveTeam(): boolean;
        readonly team_id: Long;
    }
}
declare namespace game.mod {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import teammate = msg.teammate;
    import draw_luck_gift_data = msg.draw_luck_gift_data;
    import GameOrderConfig = game.config.GameOrderConfig;
    import DemonRewardConfig = game.config.DemonRewardConfig;
    import demon_reward_info = msg.demon_reward_info;
    import Handler = base.Handler;
    import DailyLimitTimeConfig = game.config.DailyLimitTimeConfig;
    import Texture = egret.Texture;
    /**红点数据结构接口*/
    interface IHintData {
        /**节点唯一key*/
        node: string;
        /**红点值*/
        value: boolean;
    }
    /**新的界面数据结构接口*/
    interface WndBaseViewData {
        /**分页类型 */
        btnType: string;
        /**分页图标，命名规则"xiuxian_tab" */
        icon: string;
        /**对应界面mdr*/
        mdr: new (parent: DisplayObjectContainer) => MdrBase;
        /**分页名称图标 */
        nameIcon?: string;
        /**标题*/
        title?: string;
        /**背景，统一让美术输出jpg格式*/
        bg?: string;
        /**功能开启id*/
        openIdx?: number;
        /** 红点类型 */
        hintTypes?: string[];
        /** 红点 */
        showHint?: boolean;
        /** 顶部显示的货币道具index */
        coinIndex1?: number;
        /** 顶部显示的货币道具index */
        coinIndex2?: number;
        /** 顶部显示的特殊展示道具index */
        coinIndex0?: number;
        param?: any;
        /**tag */
        tag?: string;
    }
    /**新的分页结构接口*/
    interface TabBaseItemData {
        /**分页图标 */
        icon?: string;
        /** 红点 */
        showHint?: boolean;
        /**分页名称图标 */
        nameIcon?: string;
        /** 灰色遮罩 */
        gray?: boolean;
        /**分页名称位文本 */
        nameGrpStr?: string;
        /**分页名称位文本 */
        nameGrpFont?: string;
        /**功能开启id*/
        openIdx?: number;
        param?: any;
        /**指引ID*/
        guideKey?: number;
        /**tag */
        tag?: string;
        /**榜单id */
        rankType?: number;
        /**数量显示 */
        strCount?: string;
        /**名字文本*/
        nameStr?: string;
    }
    interface BtnTabItemData {
        name: string;
        /** 红点 */
        showHint?: boolean;
        param?: any;
    }
    /**装备IconEquip结构接口*/
    interface IconEquipData {
        /**装备数据或者部位 */
        prop?: PropData | number;
        /** 红点 */
        showHint?: boolean;
        /**是否选中*/
        sel?: boolean;
        /**强化进阶等级*/
        lv?: number;
    }
    /**装备IconEquip结构选中时候接口*/
    interface IconEquipSelData {
        /**部位index，0~9 */
        pos?: number;
        /**是否选中*/
        sel?: boolean;
    }
    /**IconSelMany结构接口*/
    interface IconSelManyData {
        /**道具数据 */
        prop?: PropData;
        /** 红点 */
        showHint?: boolean;
        /**是否选中*/
        sel?: boolean;
        /**选中钩子 */
        selTrue?: boolean;
    }
    /**奖励icon结构 有选中和领取效果 */
    interface IconRewardData {
        /**道具数据 */
        prop?: PropData | number[];
        /** 红点 */
        showHint?: boolean;
        /**是否选中*/
        sel?: boolean;
        /**是否已领取 */
        isGot?: boolean;
        /**是否大奖 */
        isReward?: boolean;
        /**点击tips*/
        showTips?: boolean;
        /**是否上锁 */
        isLock?: boolean;
    }
    /**SkillItemRender结构接口*/
    interface SkillItemRenderData {
        /**技能index */
        skillId?: number;
        /** 红点 */
        showHint?: boolean;
        /**是否激活*/
        isAct?: boolean;
        /**上锁图片*/
        lockStr?: string;
        /**背景图片*/
        bgStr?: string;
        /**技能等级 */
        level?: number;
        /**解锁条件 */
        limitStr?: string;
    }
    /**BattleSkillItemRender结构接口*/
    interface BattleSkillItemRenderData {
        /**技能index */
        skillId?: number;
        /** 红点 */
        showHint?: boolean;
        /**技能等级*/
        lv?: number;
        /**是否隐藏技能激活提示*/
        hideTips?: boolean;
        /**技能标签*/
        imgTag?: string;
        /**是否显示技能等级，默认显示*/
        showLv?: boolean;
        /**是否显示0级技能，默认不显示*/
        showZero?: boolean;
        /**展示技能类型（减益） */
        skillType?: string;
        /**直接取技能等级描述*/
        lvDesc?: boolean;
    }
    /**AvatarItem结构接口*/
    interface AvatarItemData {
        /**外显配置 */
        cfg?: any;
        /** 红点 */
        showHint?: boolean;
        /**外显星级*/
        star?: number;
        /**是否上阵或者出战*/
        isBattle?: boolean;
        /**是否选中*/
        isSel?: boolean;
        sort?: number;
        /**进化神灵的进化次数*/
        evolution?: any;
    }
    /**上阵数据, AvatarIcon上阵结构接口*/
    interface AvatarItemBattleData {
        index: number;
        isBattle: boolean;
    }
    /**神灵技能icon的数据接口*/
    interface ISLSkillIconData {
        /**技能index*/
        skill_index: number;
        /**激活否*/
        is_act: boolean;
        /**等级*/
        lv?: number;
        /**红点*/
        hint?: boolean;
        /**技能类型，SLSkillType*/
        skill_type?: number;
    }
    /**神灵技能tips数据类*/
    interface ISLSkillTipsData {
        /**神灵index*/
        index: number;
        /**技能index*/
        skill_index: number;
        /**技能类型，SLSkillType*/
        skill_type: number;
    }
    /**MainRightActivityRender结构接口*/
    interface MainRightActivityRenderData {
        /**分页图标*/
        icon?: string;
        /**功能开启id*/
        openIdx?: number;
        /** 界面数据，ModName和ViewType */
        viewDatas?: string[];
        /** 红点 */
        showHint?: boolean;
        /**指引ID*/
        guideKey?: number;
    }
    /**RankGodRender结构接口*/
    interface RankGodRenderData {
        /**排行榜类型*/
        rankType?: number;
        /**大神奖励配置，chapteraward*/
        cfg?: any;
        /**上榜数据*/
        rankInfo?: teammate;
        /** 奖励领取状态 */
        status?: RankRewardStatus;
    }
    /**暂用召唤系统风云录 */
    interface ISummonFengYunData {
        /**配置信息*/
        cfg?: any;
        /**上榜玩家信息*/
        rankInfo?: teammate;
        /**奖励状态*/
        status?: number;
    }
    /**召唤系统礼券购买数据 */
    interface ISummonShopData {
        /**配置信息 */
        cfg?: any;
        /**剩余可买次数 */
        count: number;
    }
    /**召唤系统命运豪礼数据 */
    interface ISummonGiftData {
        /**命运豪礼类型 */
        type: number;
        /**配置信息 */
        cfg?: any;
        /**奖励状态 */
        status: draw_luck_gift_data;
    }
    /**送召唤卷列表数据 */
    interface IGivingItemData {
        type: GameOrderType;
        /**配置信息 */
        cfg: GameOrderConfig;
        /**战令是否购买了*/
        isBought?: boolean;
        /**状态，免费奖励*/
        freeStatus?: RewardStatus;
        /**状态，付费奖励*/
        payStatus?: RewardStatus;
        /**当前战令的值，不传则默认规则获取*/
        val?: number;
        /**上个配置的值 */
        before?: number;
        /**下一个目标值 */
        next?: number;
    }
    /**通用战令item数据结构*/
    interface IGameOrderItemData {
        /**战令类型*/
        type: GameOrderType;
        /**配置信息 */
        cfg?: GameOrderConfig;
        /**战令是否购买了*/
        isBought?: boolean;
        /**状态，免费奖励*/
        freeStatus?: RewardStatus;
        /**状态，付费奖励*/
        payStatus?: RewardStatus;
        /**当前战令的值，不传则默认规则获取*/
        val?: number;
        /**上个配置的值 */
        before?: number;
        /**下一个目标值 */
        next?: number;
    }
    interface VProgressData {
        /**当前值 */
        val: number;
        /**上个配置的值 */
        start?: number;
        /**下一个目标值 */
        target?: number;
        /**进度条结束值(下个目标值的一半） */
        next?: number;
    }
    /**场景排行榜数据接口*/
    interface SceneRankData {
        /**伤害列表*/
        hurtList: teammate[];
        /**我的信息*/
        myInfo: teammate;
    }
    interface IRankSectionData {
        /**排名 */
        rank: number;
        /**名字 */
        name: string;
        /**数值 */
        value: number | string;
    }
    /**奖励排行榜数据接口*/
    interface RankRewardRenderData {
        /**排名*/
        rank: number | string;
        /**名字*/
        name: string;
        /**伤害文本*/
        hurtStr?: string;
        /**排名奖励*/
        reward: number[][];
        /**排名文本，传这个的话，优先显示*/
        rankStr?: string;
        /**参数 */
        param?: any;
        /**查看排名回调*/
        lookHandler?: Handler;
    }
    /**奖励排行榜数据接口*/
    interface RankCommonRenderData {
        /**排名*/
        rank: number;
        /**名字*/
        name: string;
        /**战力文本*/
        powerStr: string;
        /**伤害文本*/
        hurtStr: string;
    }
    /**首充豪礼每日奖励 */
    interface IFirstItemData {
        /**奖励列表 */
        rewards: number[][];
        /**天数 */
        day: number;
    }
    /**根据类型和id获取配置和状态 */
    interface IKillBossData {
        /**配置 */
        cfg: DemonRewardConfig;
        /**状态和数据 */
        status?: demon_reward_info;
    }
    /**聊天信息结构 */
    interface ChatInfoListData {
        type?: ChatType;
        content?: string;
        imgSource?: string;
        senderInfo?: teammate;
        chatChannel?: number;
        eventData?: {
            [event: string]: [string[], ChatType];
        };
        contentSystem?: string;
    }
    /**私聊信息结构 */
    interface ChatPrivateData {
        roleId: Long;
        serverId: number;
        name: string;
        head?: Long;
        headFrame?: Long;
        sex?: number;
        isOnline?: number;
        vipIndex?: number;
    }
    /**批量购买结构 */
    interface ShopBuyBulkData {
        /**物品id和数量 */
        prop?: number[];
        /**消耗道具和数量 */
        cost?: number[];
        /**限购类型 */
        lmt_type?: number;
        /**限购数量 */
        lmt_cnt?: number;
        /**限购左边数字 */
        left_cnt?: number;
        /**购买回调 */
        handler?: Handler;
    }
    interface IDailyLimitActData {
        cfg: DailyLimitTimeConfig;
        startTime: number;
        endTime: number;
        showHint: boolean;
        state: number;
    }
    /**图标飞动效果结构接口*/
    interface IconImageFlyData {
        /**起始X坐标，相对于当前View坐标*/
        startPosX: number;
        /**起始Y坐标，相对于当前View坐标*/
        startPosY: number;
        /**图标资源*/
        imgSource: string | Texture;
        /**图标宽度*/
        imgWidth: number;
        /**图标高度*/
        imgHeight: number;
        type: number;
        /**图标所属界面Layer，默认tip层*/
        layer?: Layer;
        /**飞动时间，默认1秒*/
        time?: number;
        /**结束后执行的回调*/
        handler?: Handler;
    }
    /**奖励预览弹窗item数据接口*/
    interface BasePreviewRewardData {
        /**奖池名称*/
        readonly nameStr?: string;
        /**权重(万分比)*/
        readonly weight?: number;
        /**奖励*/
        readonly award: number[][];
        /**描述文本，和nameStr，weight互斥*/
        readonly descStr?: string;
    }
    /**羁绊icon数据接口*/
    interface IJibanBaseRenderData {
        /**羁绊配置*/
        cfg: any;
        isActed: boolean;
        showHint: boolean;
    }
    /**羁绊外显icon数据类*/
    interface IJibanBaseItemRenderData {
        headType: number;
        /**羁绊配置*/
        jibanCfg: any;
        /**外显配置*/
        cfg: any;
        isActed: boolean;
        showHint: boolean;
        /**其他参数*/
        param?: any;
    }
    /**中控活动数据接口，修改时候需要注意下，搜下OperActivityData在哪里用到*/
    interface OperActivityData {
        actInfo: msg.oper_act_item;
        isSingleIcon: boolean;
    }
    /**中控活动分页数据*/
    interface ActMainBtnData {
        /**对应界面mdr*/
        mdr: new (parent: DisplayObjectContainer) => MdrBase;
        /**分页图标，命名规则"xiuxian_tab" */
        icon?: string;
        /**背景，统一让美术输出jpg格式*/
        bg?: string;
        /** 顶部显示的特殊展示道具index */
        coinIndex0?: number;
    }
    /**BOSS复活提示*/
    interface BossReviveData {
        nameStr: string;
        index: number;
        jumpId: number;
    }
    /**清除场景数据*/
    interface CleanSceneData {
        clearAll?: boolean;
    }
    /**星星结构数据*/
    interface StarItemFuData {
        starStr: string;
        width?: number;
    }
    /**神灵属性按钮数据*/
    interface ShenlingTypeIconData {
        type: ShenLingType;
        showHint: boolean;
    }
    /**神灵模型数据，进化神灵或女仆神灵的模型名字品质等会有不同*/
    interface ShenlingModelData {
        index: number;
        name: string;
        quality: QualityType;
        icon: string;
        specialQuality?: SpecialQualityType;
    }
    /**召唤特效界面数据*/
    interface SummonEffectData {
        type: SummonEffectType;
        list: msg.prop_tips_data[];
        luckNum: number;
        cost?: PropData;
        handler?: Handler;
    }
    /**突破成功数据*/
    interface BreakthroughData {
        skillId: number;
        lv: number;
        attrDesc0?: string;
        attrDesc1?: string;
    }
    /**升星成功数据*/
    interface UpStarData {
        star: number;
        attrFont0?: string;
        attrFont1?: string;
        attrDesc0?: string;
        attrDesc1?: string;
        skillId?: number;
    }
}
declare namespace game.mod {
    class WndBaseNewView extends eui.Component {
        img_bg: eui.Image;
        grp_top: eui.Group;
        list_menu: eui.List;
        btn_back: Btn;
        constructor();
    }
}
declare namespace game.mod {
    class WndBaseView extends eui.Component {
        img_bg: eui.Image;
        grp_top: eui.Group;
        lab_title: eui.Label;
        list_menu: eui.List;
        btn_close: Btn;
        btn_back: Btn;
        item1: TopCoinItem;
        item2: TopCoinItem;
        /**特殊的道具展示*/
        item0: TopCoinItem;
        constructor();
    }
}
declare namespace game.mod {
    class WndSecondMainView extends eui.Component {
        secondPop: SecondPop;
        list_menu: eui.List;
        constructor();
    }
}
declare namespace game.mod {
    class WndSecondView extends eui.Component {
        timeItem: game.mod.TimeItem;
        grp_top: eui.Group;
        list_type: eui.List;
        img_bg: eui.Image;
        constructor();
    }
}
declare namespace game.mod {
    class AmassItem extends eui.ItemRenderer {
        img_icon: eui.Image;
        lab_name: eui.Label;
        lab_lv: eui.Label;
        img_gray: eui.Image;
        redPoint: eui.Image;
        data: number;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class AmassView extends eui.Component {
        list_item: eui.List;
        img_type: eui.Image;
        bar: ProgressBarComp;
        btn_up: Btn;
        lab_goto: eui.Label;
        list_suit: eui.List;
        btn_last: Btn;
        btn_next: Btn;
        scr_type: eui.Scroller;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod {
    import PropConfig = game.config.PropConfig;
    class AvatarBaseItem extends eui.ItemRenderer {
        img_bg: eui.Image;
        img_frame: eui.Image;
        img_avatar: eui.Image;
        img_quality: eui.Image;
        /**外显配置 */
        data: PropConfig;
        constructor();
        protected dataChanged(): void;
        /**
         * 更新
         * @param cfg 配置中须有quality,icon字段
         */
        updateShow(cfg: any): void;
        /**单个item设置用*/
        setData(data: PropConfig): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import prop_tips_data = msg.prop_tips_data;
    import prop_use = msg.prop_use;
    interface IBagProxy extends IProxy {
        /**不要直接访问proxy数据，通过BagUtil访问*/
        c2s_bag_props(): void;
        getBagByType(type: number): PropData[];
        getPropsByIndex(index: number): PropData[];
        c2s_prop_one_key_resolve(props: prop_tips_data[]): void;
        isHasItem(itemId: number | string): boolean;
        readonly meltTip: boolean;
        clickMelt(items?: PropData[]): void;
        autoUseBox(): void;
        c2s_prop_list_use(props: prop_use[]): void;
        getBagMaxCnt(type: number): number;
        easyUse: PropData;
    }
}
declare namespace game.mod {
    /**
     * 具有长按弹出tips效果的外显组件
     */
    class AvatarIconLongPress extends AvatarIcon {
        private isBegin;
        private delayId;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected onBegin(): void;
        protected callOpenTips(): void;
        protected onCancel(): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IBossProxy extends IProxy {
        c2s_new_multiple_boss_info(): void;
        getCurVal(): number;
        readonly bossTime: number;
        isBossOpen(type: number, showTips?: boolean): boolean;
        onUpdateTips(): void;
        updateCrossBossTips(): void;
    }
}
declare namespace game.mod {
    /**
     * 具有长按弹出tips效果的外显组件
     */
    class AvatarItemLongPress extends AvatarItem {
        private isBegin;
        private delayId;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onBegin;
        private callOpenTips;
        private onCancel;
    }
}
declare namespace game.mod {
    /**
     * 基础外显名称组件
     */
    class AvatarNameItem extends eui.Component {
        lab_name: eui.Label;
        img_sr: eui.Image;
        constructor();
        /**
         * @param name 属性
         * @param quality 品质
         */
        updateShow(name: string, quality?: number): void;
        updateSr(img: string): void;
    }
}
declare namespace game.mod {
    /**
     * 基础外显名称组件,SR
     */
    class AvatarNameSrItem extends eui.Component {
        img_sr: eui.Image;
        lab_name: eui.Label;
        gr_eft: eui.Group;
        private _eftHub;
        private _eftId;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**
         * @param name 属性
         * @param quality 品质
         * @param specialQua 特殊品质（黄玄地天，SpecialQualityType）
         */
        updateShow(name: string, quality: number, specialQua?: SpecialQualityType): void;
    }
}
declare namespace game.mod {
    class UnionMasterItem extends eui.Component {
        lab_name: eui.Label;
        lab_job: eui.Label;
        img_bg: eui.Image;
        constructor();
        updateShow(name: string, job?: string): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import teammate = msg.teammate;
    interface IChatProxy extends IProxy {
        c2s_chat_look_user(serverId: number, roleId: Long, isRobot: number, type: number): void;
        c2s_chat_look_user(serverId: number, roleId: Long, isRobot: number, type: number): void;
        onClickBlack(serverId: number, roleId: Long, isRobot: number): void;
        readonly blackInfos: teammate[];
        c2s_chat_open_blacklist(): void;
        setPrivateInfo(info: msg.friend_info | Long | msg.teammate): void;
        deletePrivateInfo(roleId: Long, type?: number): void;
        readonly mainChatList: ChatInfoListData[];
        onClickChatLink(_info: ChatInfoListData, event: string): void;
        openChat: boolean;
        readonly systemList: string[];
        getChatCD(chatChannel: ChatChannel, roleId?: Long): number;
        getCfgCD(chatChannel: ChatChannel, roleId?: Long): number;
    }
}
declare namespace game.mod {
    /**
     * 购买按钮组件
     * 设置最大购买次数 setMaxCnt(cnt:number)
     * 抛出 ActivityEvent.ON_BTN_BUY_CNT_POST，带有文本的购买次数
     */
    class BuyBtnListView extends eui.Component {
        private btn_subTen;
        private btn_sub;
        private btn_add;
        private btn_addTen;
        private lb_cnt;
        img_cost: eui.Image;
        /**最大购买数量*/
        private _maxCnt;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onSub;
        private onSubTen;
        private onAdd;
        private onAddTen;
        /**
         * 设置购买次数，并抛出事件 ActivityEvent.ON_BTN_BUY_CNT_POST
         * @param cnt
         * @private
         */
        private setCntAndNt;
        /**
         * 购买数量
         * @param cnt 默认1
         */
        private setCnt;
        /**
         * 设置最大购买数量
         * @param cnt 默认1
         */
        setMaxCnt(cnt?: number): void;
        /**
         * 获取购买数量
         */
        getCnt(): number;
        /**
         * 设置消耗道具icon和数量
         * @param index
         * @param cnt
         * @param color 数量色号，默认 BlackColor.GREEN
         */
        setCostCnt(index: number, cnt: number, color?: BlackColor): void;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    class GiftBtn extends Btn {
        private _eftId_sel;
        private _eftId_sel2;
        private _productId;
        private _clickHandler;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected onClick(): void;
        private removeEftSel;
        updateGift(productId: number, showEffect?: boolean, clickHandler?: Handler): void;
    }
}
declare namespace game.mod {
    class CoinItem extends BaseListenerRenderer {
        img_cost: eui.Image;
        lab_cost: eui.Label;
        private _index;
        private _clickable;
        constructor();
        protected onAddToStage(): void;
        /**点击弹出道具tips*/
        protected onClick(): void;
        /**设置显示的道具index*/
        setData(index: number, clickable?: boolean): void;
        /**获取显示道具index*/
        readonly index: number;
        /**刷新图标显示*/
        initIcon(index: number, clickable?: boolean): void;
        /**刷新显示，外部监听时候会调用*/
        updateShow(): void;
    }
}
declare namespace game.mod {
    class CoinItemCenter extends CostIcon {
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import child_jiban_infos = msg.child_jiban_infos;
    import attributes = msg.attributes;
    interface IChildProxy extends IProxy {
        /**激活羁绊*/
        c2s_child_oper_jiban(jiban_index: number, child_index: number): void;
        /**子女升星消耗*/
        getCost(index: number, star?: number): number[];
        /**羁绊信息*/
        getJibanInfo(jiban_index: number): child_jiban_infos;
        /**羁绊是否激活*/
        isActedJiban(jiban_index: number): boolean;
        /**羁绊红点*/
        getHintByJibanIndex(jiban_index: number): boolean;
        /**羁绊子女是否已激活*/
        isJibanChildActed(jiban_index: number, child_index: number): boolean;
        /**羁绊子女能否激活*/
        canActJibanChild(jiban_index: number, child_index: number): boolean;
        /**能否激活羁绊*/
        canActJiban(jiban_index: number, isTips?: boolean): boolean;
        /**总属性*/
        getAttr(): attributes;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface ICompeteProxy extends IProxy {
        getCurVal(): number;
        getCurValDoufa(): number;
        readonly nextFightTime: number;
        readonly attackStatus: number;
        findCurMonsterIndex(camp: number): number;
        readonly noticeList: msg.s2c_scene_kill_notice[];
        clearNotice(): void;
    }
}
declare namespace game.mod {
    /**
     * 垂直布局的消耗组件
     */
    class CostIcon3 extends CostIcon2 {
        constructor();
    }
}
declare namespace game.mod {
    class TopCoinItem extends eui.Component {
        private img_cost;
        private lab_cost;
        private lab_add;
        private btn_add;
        private _index;
        private _lastCnt;
        private _perAdd;
        private _curCnt;
        private _endCnt;
        private _isAdd;
        constructor();
        private onAddToStage;
        private onRemove;
        private onClickAdd;
        /**设置显示的道具index*/
        setData(index: number, currentState?: string): void;
        setDataYellow(index: number): void;
        /**获取显示道具index*/
        readonly index: number;
        /**刷新显示，外部监听时候会调用，是否显示增加文本*/
        updateShow(showAdd?: boolean): void;
        private removeTween;
        private playCntTween;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    class CountItem extends BaseListenerRenderer {
        lb_cnt: eui.Label;
        btn_add: Btn;
        btn_addTen: Btn;
        btn_subtract: Btn;
        btn_subtractTen: Btn;
        private _leftCnt;
        /**回调 用于更新消耗之类的 */
        private _handler;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        setData(_leftCnt: number, handler?: Handler): void;
        private setCnt;
        private onAdd;
        private onAddTen;
        private onSubtract;
        private onSubtractTen;
        readonly getCnt: number;
    }
}
declare namespace game.mod {
    /**
     * 通用装备列表组件
     */
    class EquipListView extends eui.Component {
        list_equip: eui.List;
        private _equipList;
        private _equipProxy;
        private _lastSelPos;
        constructor();
        private onAddToStage;
        private onRemove;
        private initEquipList;
        private getBtnData;
        /**刷新装备显示*/
        updateEquip(lvList?: number[]): void;
        /**刷新装备红点，红点逻辑自己判断*/
        updateHint(hints: boolean[]): void;
        /**刷新装备选中，选中逻辑自己判断，selList是所有数据*/
        updateSel(selList: boolean[]): void;
        /**刷新装备选中，pos是需要选中的部位：EquipPosAry*/
        updateSelByPos(pos: number): void;
    }
}
declare namespace game.mod {
    class IconEquip extends eui.ItemRenderer {
        icon: Icon;
        redPoint: eui.Image;
        img_sel: eui.Image;
        img_tag: eui.Image;
        data: IconEquipData;
        constructor();
        protected dataChanged(): void;
        /**设置数据data，单个icon时候调用*/
        setData(data: IconEquipData): void;
    }
}
declare namespace game.mod {
    class ExchangeView extends eui.Component {
        /**列表 */
        list: eui.List;
        /**可不用 用tab的bg */
        img_bg: eui.Image;
        /**大奖banner图 */
        img_banner: eui.Image;
        /**刷新按钮 */
        btn_refresh: Btn;
        timeItem: game.mod.TimeItem;
        iconBigReward: game.mod.IconBigReward;
        constructor();
        /**更新顶部大奖数据*/
        updateBigReward(data: number[] | msg.prop_tips_data): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import consecrate_infos = msg.consecrate_infos;
    import AmassConfig = game.config.AmassConfig;
    interface IConsecrateProxy extends IProxy {
        getConsecrateCount(): number;
        getDoingInfo(): consecrate_infos;
        getEndTime(): number;
        c2s_amass_advance(classId: number, type: number, index: number): void;
        /**根据模块类型获取图鉴类型列表*/
        getAmassTypes(classId: number): number[];
        /**根据模块类型和图鉴类型，获取配置id列表*/
        getAmassIndexList(classId: number, type: number): number[];
        /**获取图鉴配置*/
        getAmassCfg(index: number): AmassConfig;
        getAmassLv(index: number): number;
        canAmassItemUp(index: number): boolean;
        canAmassTypeUp(classId: number, type: number): boolean;
        canAmassClassIdUp(classId: number): boolean;
        getAmassActNum(classId: number, type: number): number;
    }
}
declare namespace game.mod {
    class IconBigReward extends BaseRenderer {
        icon: Icon;
        grp_eft1: eui.Group;
        grp_eft2: eui.Group;
        data: number[] | msg.prop_tips_data | PropData | number | msg.prop_attributes | Long;
        private _eftId1;
        private _eftId2;
        constructor();
        protected dataChanged(): void;
        private removeEftSel;
        setData(data: number[] | msg.prop_tips_data | PropData | number | msg.prop_attributes | Long): void;
    }
}
declare namespace game.mod {
    class IconGot extends BaseListenerRenderer {
        icon: Icon;
        redPoint: eui.Image;
        gr_got: eui.Group;
        img_gou: eui.Image;
        img_gray: eui.Image;
        data: IconRewardData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        /**设置数据data，单个icon时候调用*/
        setData(data: IconRewardData): void;
        onClick(): void;
    }
}
declare namespace game.mod {
    class IconName extends Icon {
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class IconReward extends BaseListenerRenderer {
        icon: Icon;
        redPoint: eui.Image;
        img_sel: eui.Image;
        gr_got: eui.Group;
        img_get: eui.Image;
        img_reward: eui.Image;
        data: IconRewardData;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        /**设置数据data，单个icon时候调用*/
        setData(data: IconRewardData): void;
        private onClick;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IDailyLimitTimeActProxy extends IProxy {
        isOpen(type: number): boolean;
        getNextStartTime(type: number): number;
    }
}
declare namespace game.mod {
    class IconSelMany extends eui.ItemRenderer {
        icon: Icon;
        redPoint: eui.Image;
        img_sel: eui.Image;
        img_true: eui.Image;
        data: IconSelManyData;
        constructor();
        protected dataChanged(): void;
        /**设置数据data，单个icon时候调用*/
        setData(data: IconSelManyData): void;
    }
}
declare namespace game.mod {
    import ShopConfig = game.config.ShopConfig;
    class IconShop extends BaseListenerRenderer {
        icon: game.mod.Icon;
        btn: game.mod.Btn;
        lab_name: eui.Label;
        lab_limit: eui.Label;
        img_bought: eui.Image;
        /**[消耗道具id, 消耗数量]*/
        protected _cost: number[];
        data: ShopConfig;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        /**
         * 更新限购次数label
         * @param left_cnt 剩余次数 默认0
         * @param total_cnt 总共次数 默认：商店表的限购次数lmt_cnt
         * @param str 限购文本，默认：限购
         */
        protected updateLmtLab(left_cnt?: number, total_cnt?: number, str?: string): void;
        /**
         * 按钮购买消耗
         * @param cost 购买消耗，不传则默认商店表的 price * discount / 10000
         * @protected
         */
        protected updateCostBtn(cost?: number[]): void;
        /**
         * 能否购买，只判断购买消耗
         */
        protected canBuy(): boolean;
        /**
         * 点击购买，子类重载实现
         */
        protected onClickBuy(): void;
    }
}
declare namespace game.mod {
    /**带有文本以及加号的组件，比如副本收益次数*/
    class AddCntComp extends eui.Component {
        lb_cnt: eui.Label;
        btn_add: game.mod.Btn;
        constructor();
        /**
         * 更新文本
         * @param str
         * @param prefixStr str的前缀，默认 次数：
         */
        updateShow(str: string, prefixStr?: string): void;
        /**蓝色按钮*/
        setBlue(): void;
        /**黄色按钮*/
        setYellow(): void;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    /**
     * 通用仙力组件
     */
    class AttrGodItem extends Btn {
        private grp_god;
        private grp_eft;
        redPoint: eui.Image;
        private _clickable;
        private _clickHandler;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onClick;
        /**仙力值，clickable：设置是否可点击，一般其他玩家不给查看*/
        updateGod(god: number, clickable?: boolean, clickHandler?: Handler): void;
    }
}
declare namespace game.mod {
    /**
     * 带有属性提升值的item
     * 例子：攻击+5000     向上绿色箭头 +8000
     */
    class AttrItemAddRender extends eui.ItemRenderer {
        lb_cur: eui.Label;
        img_add: eui.Image;
        lb_add: eui.Label;
        data: IAttrItemAddData;
        constructor();
        protected dataChanged(): void;
        private setAttr;
    }
    interface IAttrItemAddData {
        key: string;
        val: number;
        add_val: number;
    }
}
declare namespace game.mod {
    /**
     * 属性前带有图片的组件
     * 【图片 属性文本】
     */
    class AttrItemImgRender extends eui.ItemRenderer {
        img_tag: eui.Image;
        lb_attr: eui.Label;
        data: IAttrItemImgData;
        constructor();
        protected dataChanged(): void;
        /**
         * 更新属性信息
         * @param attrStr 属性文本
         * @param imgTag 属性前面的图片资源，没有则隐藏，默认星星资源
         */
        private setAttr;
    }
    /**属性前带有图片的属性组件数据接口*/
    interface IAttrItemImgData {
        img?: string;
        attrStr: string;
    }
}
declare namespace game.mod {
    /**
     * 通用属性组件
     */
    class AttrItemRender extends eui.ItemRenderer {
        lab_attr: eui.Label;
        data: string;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    /**
     * 带有属性提升值的list
     */
    class AttrListAddView extends eui.Component {
        private list;
        private _listData;
        constructor();
        private onAddToStage;
        /**
         * 更新属性，带有属性提升值
         * @param attr
         * @param next_attr
         */
        updateShow(attr: msg.attributes, next_attr: msg.attributes): void;
    }
}
declare namespace game.mod {
    /**
     * 属性前带有图片的列表组件
     */
    class AttrListImgView extends eui.Component {
        private list;
        private _listData;
        constructor();
        private onAddToStage;
        /**
         * 更新属性文本
         * @param attrAry 属性文本数组
         * @param img 属性文本前面的图片资源，默认星星资源
         */
        private updateShow;
        /**
         * 更新属性
         * @param attrList
         */
        updateAttr(attrList: IAttrItemImgData[]): void;
        /**
         * 更新属性，+号
         * @param attr
         * @param color 默认 WhiteColor.GREEN
         * @param endStr 默认 \n
         * @param joinStr 默认 +
         * @param defaultColor 默认null
         * @param imgTag 不传则默认star_6资源
         */
        updateAttrAdd(attr: msg.attributes, color?: number, endStr?: string, joinStr?: string, defaultColor?: number, imgTag?: string): void;
    }
}
declare namespace game.mod {
    /**
     * 通用属性列表组件
     */
    class AttrListView extends eui.Component {
        private list_attr;
        private _attrList;
        constructor();
        private onAddToStage;
        private onRemove;
        private initAttrList;
        /**属性赋值，defaultColor文本默认颜色*/
        updateAttr(attr: msg.attributes, color?: number, endStr?: string, joinStr?: string, defaultColor?: number): void;
        /**属性赋值，显示 +号，defaultColor文本默认颜色*/
        updateAttrAdd(attr: msg.attributes, color?: number, endStr?: string, joinStr?: string, defaultColor?: number): void;
        /**属性赋值，不建议使用，先保留*/
        updateAttr2(list: string[]): void;
        setListGap(gap?: number): void;
    }
}
declare namespace game.mod {
    /**
     * 通用属性列表组件，带装饰角标
     */
    class AttrListZhuangshiView extends eui.Component {
        private list_attr;
        private _attrList;
        constructor();
        private onAddToStage;
        private onRemove;
        private initAttrList;
        /**属性赋值，defaultColor文本默认颜色*/
        updateAttr(attr: msg.attributes, color?: number, endStr?: string, joinStr?: string, defaultColor?: number): void;
        /**属性赋值，显示 +号，defaultColor文本默认颜色*/
        updateAttrAdd(attr: msg.attributes, color?: number, endStr?: string, joinStr?: string, defaultColor?: number): void;
        /**直接显示属性文本*/
        updateAttrByDescList(infos: string[]): void;
        /**设置间距*/
        setListGap(gap?: number): void;
        /**设置x坐标*/
        setListX(x?: number): void;
    }
}
declare namespace game.mod {
    /**
     * 属性面板的属性项标题
     */
    class AttrNameItem extends BaseStageEventItem {
        lb_name: eui.Label;
        private _titleStr;
        constructor();
        protected onAddToStage(): void;
        /**皮肤设置标题用*/
        titleStr: string;
        private updateTitleSrc;
        /**
         * 设置属性项标题
         * @param str 默认基础属性
         */
        setTitle(str?: string): void;
    }
}
declare namespace game.mod {
    class BaseAttrView extends eui.Component {
        secondPop: game.mod.SecondPop;
        name0: game.mod.AttrNameItem;
        name1: game.mod.AttrNameItem;
        power: game.mod.XianLiPower;
        listAttr0: game.mod.AttrListView;
        scroller: eui.Scroller;
        listAttr1: eui.List;
        constructor();
    }
}
declare namespace game.mod {
    class BubbleFrameItem extends eui.Component {
        lb_desc: eui.Label;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**
         * 更新文本
         * @param str
         */
        updateShow(str: string): void;
    }
}
declare namespace game.mod {
    class CommonLimitItemRender extends eui.ItemRenderer {
        lab_desc: eui.Label;
        data: number[];
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class SpecialAttrItemRender extends eui.ItemRenderer {
        lab_desc: eui.Label;
        data: {
            descStr: string;
            maxWidth: number;
        };
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    import HorseConfig = game.config.HorseConfig;
    import XianchongConfig = game.config.XianchongConfig;
    /**
     * 特殊属性组件
     */
    class SpecialAttrView extends eui.Component {
        lab_desc: eui.Label;
        private list_desc;
        private _index;
        private _maxWidth;
        private _specialIndexList;
        private _privilegeIdList;
        private _buffIdList;
        private _special_desc;
        private _proxy;
        private _attrList;
        constructor();
        private onAddToStage;
        private onRemove;
        private initAttrList;
        private onClick;
        private onInfoUpdate;
        private updateShow;
        private getDesc;
        private getDescByCfg;
        private updateShowList;
        /**属性显示
         * cfg 外显配置
         * maxWidth 文本最大宽度，特殊界面设置用
         * */
        updateDesc(cfg: HorseConfig | XianchongConfig | any, maxWidth?: number): void;
    }
}
declare namespace game.mod {
    /**
     * 线条
     * 两种状态：蓝色，黄色
     */
    class CommonLine extends eui.Component {
        constructor();
        /**设置蓝色*/
        setBlue(): void;
        /**设置黄色*/
        setYellow(): void;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    /**
     * 按钮基类
     */
    class BtnIconBase extends Btn {
        img_bg: eui.Image;
        iconDisplay: eui.Image;
        labelDisplay: eui.Label;
        gr_eff: eui.Group;
        redPoint: eui.Image;
        gr_time: eui.Group;
        lb_time: eui.Label;
        group: eui.Group;
        /** 按钮数据 */
        private _data;
        /**特效id*/
        private _effId;
        /**特效id*/
        private _effSweeppId;
        /** 按钮id BtnIconId */
        private _id;
        private _isBig;
        /**点击缓存*/
        static _hintCache: {
            [type: number]: boolean;
        };
        /**点击缓存*/
        static _effCache: {
            [type: number]: boolean;
        };
        constructor(id: number, isBig?: boolean);
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        data: IBtnIconData;
        readonly id: number;
        /**
         * 设置icon
         * 默认icon都是放在 aaaa\ui_btn_icon1
         */
        private setIcon;
        /**
         * 点击事件，设置为公共，支持外部指引回调
         */
        onTap(): void;
        private onMove;
        /**
         * 更新按钮的ui
         * 只触发一次，添加到舞台时
         */
        private updateUI;
        private getHint;
        /**
         * 设置按钮红点
         */
        setHint(hint: boolean): void;
        /**
         * 0 表示插入末尾
         * >0 表示序号
         */
        getSortNum(): number;
        /**
         * 更新特效
         * @param showEff 红点规则下的特效展示，默认false
         * @private
         */
        private updateEffect;
        private removeEffect;
        /**
         * 更新特效
         * @param showEff 扫描光特效
         * @private
         */
        private updateSweepEffect;
        private removeSweepEffect;
        /**
         * 更新时间或者其他文本
         * @param timeStr 若有，则优先展示这个文本
         */
        updateTime(timeStr?: string): void;
    }
    interface IBtnIconData {
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
        hintMsgList?: string[][];
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
        guideKey?: number;
        /**中控活动时用的功能开启ID*/
        openIdx?: number;
        /**是否展示BtnTipsMgr的提示*/
        showTips?: boolean;
    }
    enum BtnIconHintType {
        /**永不展示红点*/
        None = 1,
        /**初次点击红点*/
        Once = 2,
        /**根据红点规则展示*/
        Common = 3,
        /**首次进入有红点，点击之后根据红点规则展示*/
        FirstCommon = 4
    }
    enum BtnIconEffType {
        /**永不展示特效*/
        None = 1,
        /**单次点击特效*/
        Once = 2,
        /**根据红点显示与否展示*/
        Common = 3,
        /**永久展示*/
        Forever = 4,
        /**首次进入有特效，点击之后根据红点规则展示*/
        FirstCommon = 5
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    class BtnIconMgr {
        /**所有的按钮*/
        _btnDataMap: {
            [id: number]: IBtnIconData;
        };
        /**展示中的按钮*/
        _showBtnMap: {
            [id: number]: BtnIconBase;
        };
        /**有倒计时文本的按钮*/
        _btnTimeMap: {
            [id: number]: BtnIconBase;
        };
        /**按钮的监听事件*/
        _btnNtMap: {
            [key: string]: BtnIconId[];
        };
        /**按钮容器，传入*/
        private _group;
        /**缓存的开启关闭数据，收到数据时Mdr还未实例化BtnIconMgr时做数据缓存，存的是isOpen*/
        static _btnTmpMap: {
            [id: number]: boolean;
        };
        static _btnTmpCacheMap: {
            [id: number]: boolean;
        };
        /**中控活动openIdx映射活动ID列表*/
        _btnOpenIdxMap: {
            [openIdx: number]: number[];
        };
        constructor(group?: eui.Group);
        private static _ins;
        static ins(): BtnIconMgr;
        static _insTop: BtnIconMgr;
        static insTop(): BtnIconMgr;
        static _insBig: BtnIconMgr;
        static insBig(): BtnIconMgr;
        static _insLeft: BtnIconMgr;
        static insLeft(): BtnIconMgr;
        static _insChaozhilibao: BtnIconMgr;
        static insChaozhilibao(): BtnIconMgr;
        private findInsertIndex;
        private addBtn;
        private removeBtn;
        /**
         * 初始所有的按钮
         * @param btnData 按钮数组
         * @param isShow 是否显示
         * @param isBig 是否冲榜按钮
         */
        dealBtnIconList(btnData: IBtnIconData[], isShow?: boolean, isBig?: boolean): void;
        /**
         * 处理单个按钮
         * @param id 按钮id
         * @param isShow 是否显示
         * @param isBig 是否冲榜按钮
         * @return 返回true或false，true表示展示按钮
         */
        dealSingleBtnIcon(id: BtnIconId, isShow?: boolean, isBig?: boolean): boolean;
        /**
         * 清理数据
         */
        clear(): void;
        /**
         * 注册按钮
         * @param btnData 按钮数据
         * @param isShow 是否显示所有按钮
         * @param isBig 是否冲榜按钮
         */
        private regBtn;
        /**
         * 展示时间否
         * @param btnData
         */
        checkBtnTime(btnData: IBtnIconData): boolean;
        /**================================ 按钮特效 ================================*/
        private _id;
        private _effect;
        /**
         * 特效播放 ---- 搭配removeEffect使用
         * @param src 特效资源
         * @param times 播放次数， <1 无限次播放
         * @param parent 特效容器，默认加入容器的显示列表尾部
         * @param cb 特效播放完回调函数
         * @param scale scale，默认1
         * @param autoRemove 播放完是否移除，默认true
         * @param speed 播放速度，默认1
         * @param frameRate 播放帧率，默认12
         */
        addEftByParent(src: string, times: number, parent: egret.DisplayObjectContainer, cb?: Handler, scale?: number, autoRemove?: boolean, speed?: number, frameRate?: number): number;
        add(src: string, x: number, y: number, cb: Handler, times: number, parent: egret.DisplayObjectContainer, idx: number, scale?: number, autoRemove?: boolean, speed?: number, frameRate?: number): number;
        private onPlayComp;
        removeEffect(id: number): void;
        showGuide(): void;
        clearGuide(): void;
        /**
         * 更新活动开启，中控活动不用缓存，一般设置关闭的时候才用
         * @param id BtnIconId
         * @param isOpen 开启
         * @param isAct 是否中控活动
         * @param isCache 删除缓存isOpen否，默认删除。传入true不删除
         */
        updateOpen(id: BtnIconId, isOpen: boolean, isAct?: boolean, isCache?: boolean): boolean;
    }
}
declare namespace game.mod {
    import teammate = msg.teammate;
    class CommonMatchItem extends BaseRenderer {
        private img_player;
        private lab_name;
        private powerLabel;
        data: MatchItemData | teammate;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(data: MatchItemData | teammate): void;
    }
}
declare namespace game.mod {
    class CommonMatchView extends eui.Component {
        item1: CommonMatchItem;
        item2: CommonMatchItem;
        item3: CommonMatchItem;
        item4: CommonMatchItem;
        constructor();
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    class PassBossTip {
        static show(handler: Handler): void;
    }
}
declare namespace game.mod {
    /**
     * 战力组件
     */
    class Power extends eui.Component {
        group_power: eui.Group;
        group_flame: eui.Group;
        img_bg: eui.Image;
        private _effIdx;
        private _effHub;
        constructor();
        protected createChildren(): void;
        private showFlameEff;
        private removeFlameEff;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onHide;
        /**
         * 添加字体
         * @param text 显示的文本
         * @param expandParent 默认不设置container大小
         */
        setPowerValue(text: Long | string | number, expandParent?: boolean): void;
    }
}
declare namespace game.mod {
    /**
     * 战力组件，带详情按钮
     */
    class Power2 extends eui.Component {
        private power;
        btn_desc: game.mod.Btn;
        private _powerR;
        private _powerW;
        constructor();
        /** 战力赋值 */
        setPowerValue(value: Long | string | number): void;
    }
}
declare namespace game.mod {
    /**
     * 战力文本组件
     */
    class PowerLabel extends eui.Component {
        lab_power: eui.Label;
        img_icon: eui.Image;
        /**
         * @param power 战力
         * @param color 文本颜色
         * @param size 文本大小
         */
        setPowerValue(power: Long | number, color?: number, size?: number): void;
        setIcon(src: string): void;
    }
}
declare namespace game.mod {
    /**推荐战力 */
    class RecommendPower extends eui.Component {
        grp_font: eui.Group;
        private _hub;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**
         * 设置推荐战力
         * @param value 战力值
         */
        setPowerValue(value: Long | string | number): void;
    }
}
declare namespace game.mod {
    /**战队军团仙力组件*/
    class TeamGodPower extends eui.Component {
        img_bg: eui.Image;
        img_xianli: eui.Image;
        gr_power: eui.Group;
        private _hub;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**
         * 设置军团仙力等
         * @param value
         */
        setPowerValue(value: Long | string | number): void;
    }
}
declare namespace game.mod {
    /**仙力战力组件*/
    class XianLiPower extends eui.Component {
        img_bg: eui.Image;
        gr_power: eui.Group;
        private _hub;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**
         * 设置仙力等
         * @param value 战力值
         * @param prefixStr 数值前面文本，默认：当前仙力:
         * @param gap 间距，默认-2
         */
        setPowerValue(value: Long | string | number, prefixStr?: string, gap?: number): void;
    }
}
declare namespace game.mod {
    import ArrayCollection = eui.ArrayCollection;
    class BasePreviewRewardItem extends BaseRenderer {
        img_type: eui.Image;
        lab_desc: eui.Label;
        list_reward: eui.List;
        data: BasePreviewRewardData;
        protected _rewardList: ArrayCollection;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onUpdateType(): void;
        protected onUpdateDesc(): void;
        protected onUpdateReward(): void;
    }
}
declare namespace game.mod {
    class BasePreviewRewardView extends eui.Component {
        secondPop: game.mod.SecondPop;
        scroller: eui.Scroller;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod {
    class ComProgressItem extends BaseRenderer {
        progress: ProgressBarComp;
        data: VProgressData;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Handler = base.Handler;
    class TabMdr implements MdrTab {
        condCheck: Handler;
        changeHandler: Handler;
        params: any;
        private _owner;
        private _parent;
        private _mdrClsList;
        private _selectIndex;
        private _mdrInstList;
        private _btnList;
        constructor(m: ModBase, p: DisplayObjectContainer, list?: MdrClsList);
        mdrClsList: MdrClsList;
        btnList: eui.List;
        selectIndex: number;
        show(): void;
        hide(): void;
        hideCurMdr(): void;
        private onBtnSelected;
        private onBtnChanging;
        dispose(): void;
    }
}
declare namespace game.mod {
    class ProgressBarCntComp extends eui.Component {
        img_bg: eui.Image;
        lb_cnt: eui.Label;
        constructor();
        /**
         * @param cnt
         * @param light 是否点亮，默认灰色
         */
        updateShow(cnt: number, light?: boolean): void;
        private setLight;
    }
}
declare namespace game.mod {
    class ProgressBarCntComp2 extends eui.Component {
        bar: game.mod.ProgressBarComp;
        barCnt: game.mod.ProgressBarCntComp;
        constructor();
        /**
         * @param cnt 当前进度值，与maxCnt判断展示次数点亮状态
         * @param minCnt 进度条最小值
         * @param maxCnt 进度条最大值
         */
        updateShow(cnt: number, minCnt: number, maxCnt: number): void;
    }
}
declare namespace game.mod {
    /**
     * 此组件含有scroller，若其祖先节点中也有scroller，则其祖先节点的scroller需要设置 ["$hasScissor"] = true;
     */
    class VProgressBar extends BaseRenderer {
        data: VProgressData;
        private _height;
        private thumb;
        private scr;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(data: VProgressData): void;
    }
}
declare namespace game.mod {
    /**
     * 排行榜组件，公共结构
     */
    class RankCommonRender extends eui.ItemRenderer {
        img_rank: eui.Image;
        lab_rank: eui.Label;
        lab_name: eui.Label;
        lab_power: eui.Label;
        lab_num: eui.Label;
        data: RankCommonRenderData;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    /**
     * 榜首大神组件
     */
    class RankFirstItem extends eui.Component {
        lab_rank: eui.Label;
        lab_more: eui.Label;
        redPoint: eui.Image;
        private _rankType;
        constructor();
        private onAddToStage;
        private onRemove;
        protected onClickMore(): void;
        /** 通用红点事件监听 */
        private onHintUpdate;
        /** 更新红点 */
        private updateHint;
        /** 设置红点 */
        setHint(val: boolean): void;
        /**
         * @param rankType 排行榜类型
         * @param nameStr 第一名玩家
         * @param cntStr 层数文本
         */
        updateShow(rankType: number, nameStr?: string, cntStr?: string): void;
    }
}
declare namespace game.mod {
    import ArrayCollection = eui.ArrayCollection;
    /**
     * 排行榜组件
     */
    class RankGodRender extends BaseListenerRenderer {
        lab_title: eui.Label;
        head: game.mod.Head;
        lab_name: eui.Label;
        btn_check: game.mod.Btn;
        list_reward: eui.List;
        img_get: eui.Image;
        btn_get: game.mod.Btn;
        data: RankGodRenderData;
        protected _itemList: ArrayCollection;
        protected onAddToStage(): void;
        protected onClickCheck(): void;
        protected onClickGet(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class RankGodView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list_rank: eui.List;
        scroller: eui.Scroller;
        constructor();
    }
}
declare namespace game.mod {
    import rank_common_struct = msg.rank_common_struct;
    /**
     * 排行榜组件
     */
    class RankRender extends eui.ItemRenderer {
        img_rank: eui.Image;
        lab_rank: eui.Label;
        lab_name: eui.Label;
        lab_power: eui.Label;
        lab_num: eui.Label;
        data: rank_common_struct;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    /**
     * 带奖励的排行榜组件
     */
    class RankRewardRender extends BaseListenerRenderer {
        img_rank: eui.Image;
        lab_rank: eui.Label;
        lab_name: eui.Label;
        lab_power: eui.Label;
        lab_num: eui.Label;
        private list_reward;
        lab_look: eui.Label;
        private _rewardList;
        data: RankRewardRenderData;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickRank;
    }
}
declare namespace game.mod {
    /**
     * 排行榜组件
     */
    class RankSectionItem extends BaseRenderer {
        data: IRankSectionData;
        lab_rank: eui.Label;
        lab_name: eui.Label;
        lab_num: eui.Label;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class RankSectionView extends eui.Component {
        secondPop: SecondPop;
        img_bg: eui.Image;
        img_type1: eui.Image;
        img_type2: eui.Image;
        img_rank: eui.Image;
        lab_rank: eui.Label;
        img_score: eui.Image;
        lab_score: eui.Label;
        scroller: eui.Scroller;
        list: eui.List;
        timeItem: game.mod.TimeItem;
        lab_time: eui.Label;
        constructor();
    }
}
declare namespace game.mod {
    class RankView extends eui.Component {
        timeItem: game.mod.TimeItem;
        img_type1: eui.Image;
        img_type2: eui.Image;
        img_type3: eui.Image;
        img_myRank: eui.Image;
        grp_eff: eui.Group;
        list_rank: eui.List;
        lab_rank: eui.Label;
        lab_num: eui.Label;
        lab_tips: eui.Label;
        btn_god: Btn;
        grp_eff0: eui.Group;
        btn_lastRank: game.mod.Btn;
        btn_rule: game.mod.Btn;
        masterItem: UnionMasterItem;
        img_tips: eui.Image;
        btn_reward: Btn;
        scr: eui.Scroller;
        constructor();
        /**
         * 更新 img_type3 和 img_type2 的 horizontalCenter位置。
         * img_type3 不展示，则 img_type2 展示到 img_type3 的位置
         * @param isShowType3 是否展示 img_type3，默认展示true
         */
        updateImgTypeHorizontal(isShowType3?: boolean): void;
    }
}
declare namespace game.mod {
    import boss_srefresh_damage = msg.boss_srefresh_damage;
    class ResultHurt extends eui.Component {
        list_hurt: eui.List;
        private _hurtList;
        constructor();
        private onAddToStage;
        private onRemove;
        private initHurtList;
        updateHurtList(hurtList: boss_srefresh_damage[]): void;
    }
}
declare namespace game.mod {
    import boss_srefresh_damage = msg.boss_srefresh_damage;
    class ResultWinRender extends BaseRenderer {
        img_icon: eui.Image;
        img_shuxing: eui.Image;
        img_mvp: eui.Image;
        lab_act: eui.Label;
        progress: ProgressBarComp;
        labelDisplay: eui.Label;
        data: {
            type: number;
            hurt?: boss_srefresh_damage;
            maxHurt?: boss_srefresh_damage;
        };
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    import UpdateItem = base.UpdateItem;
    import Handler = base.Handler;
    class ResultReward extends BaseRenderer implements UpdateItem {
        scr: eui.Scroller;
        grp_reward: eui.Group;
        private _rewards;
        private _showRewards;
        private _iconList;
        private _showing;
        private readonly ITEM_N;
        private readonly ITEM_H;
        private readonly SCR_W;
        private _endHandler;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onClick;
        update(time: base.Time): void;
        private updateRewardTween;
        private setRewardShow;
        private onRewardTweenEnd;
        private updateScr;
        private initScr;
        private setMaxRowCount;
        private endRewardTween;
        updateRewardList(rewardList: msg.prop_tips_data[], endHandler?: Handler, isCenter?: boolean, maxRowCount?: number): void;
    }
}
declare namespace game.mod {
    class BaseGiftDrawView extends eui.Component {
        img_banner: eui.Image;
        timeItem: game.mod.TimeItem;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod {
    /**
     * 通用的奖励领取项
     * 弹窗类使用：skins.common.BaseGiftItemSkin
     * 一级界面使用：skins.common.BaseGiftItemSkin2
     * (todo width不一致，看下能不能统一起来)
     */
    class BaseGiftItemRender extends BaseListenerRenderer {
        protected lb_desc: eui.Label;
        protected list: eui.List;
        protected img_bought: eui.Image;
        protected btn_buy: game.mod.Btn;
        protected _listData: eui.ArrayCollection;
        data: any;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        /**点击购买*/
        protected onClick(): void;
    }
}
declare namespace game.mod {
    /**
     * 通用的礼包界面，有倒计时、大奖
     */
    class BaseGiftView extends eui.Component {
        img_banner: eui.Image;
        iconBigReward: game.mod.IconBigReward;
        timeItem: game.mod.TimeItem;
        scroller: eui.Scroller;
        list: eui.List;
        constructor();
        /**
         * 更新顶部的banner资源
         * @param imgStr 资源名称
         * @param isJpg 是否为jpg，默认false
         */
        updateBanner(imgStr: string, isJpg?: boolean): void;
        /**更新顶部大奖数据*/
        updateBigReward(data: number[] | msg.prop_tips_data): void;
    }
}
declare namespace game.mod {
    class BaseRewardView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        btn_get: game.mod.Btn;
        img_state: eui.Image;
        lab_tips: eui.Label;
        lb_desc: eui.Label;
        constructor();
    }
}
declare namespace game.mod {
    /**
     * 修仙女仆的自动挑战勾选框
     */
    class XiuxianNvpuCheckBox extends eui.CheckBox {
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private _eventType;
        /**
         * 更新展示
         * @param eventType
         */
        updateShow(eventType: XiuxianNvpuEventType): void;
        private onClick;
        private onOpenFuncUpdate;
    }
}
declare namespace game.mod {
    class BaseRuleDescView extends eui.Component {
        secondPop: game.mod.SecondPop;
        lb_desc: eui.Label;
        constructor();
    }
}
declare namespace game.mod {
    import teammate = msg.teammate;
    class EnemyInfoView extends eui.Component {
        lab_name: eui.Label;
        lab_power: eui.Label;
        lab_guild: eui.Label;
        constructor();
        /**
         * 更新信息
         * @param info
         */
        updateShow(info: teammate): void;
        /**
         * 更新信息
         * @param vo
         */
        updateShowByObj(vo: {
            name: string;
            showpower: Long;
            guild_name: string;
        }): void;
        /**
         * 默认展示
         * 昵称：无
         * 战力：0
         * 仙宗：无
         */
        updateShowDefault(): void;
    }
}
declare namespace game.mod {
    /**
     * 积分奖励
     */
    class KuafuDoufaScoreView extends eui.Component {
        list_reward: eui.List;
        constructor();
    }
}
declare namespace game.mod {
    /**
     * 战场技能列表
     */
    class KuafuDoufaSkillView extends eui.Component {
        list_reward: eui.List;
        cost: game.mod.CoinItem;
        constructor();
    }
}
declare namespace game.mod {
    /**
     * 角色复活界面
     * 战场技能
     */
    class RoleBuffReviveView extends eui.Component {
        grp_died: eui.Group;
        lab_reviveTime: eui.Label;
        lab_revive: eui.Label;
        constructor();
        /**
         * 更新复活倒计时
         * @param leftTime 剩余时间
         * @param sufStr 时间末尾文本，默认：秒后复活
         */
        updateShow(leftTime: number, sufStr?: string): void;
    }
}
declare namespace game.mod {
    class YouliKillerFightView extends eui.Component {
        lab_name1: eui.Label;
        powerLabel1: game.mod.PowerLabel;
        img_hp1: eui.Image;
        head1: game.mod.Head;
        lab_name2: eui.Label;
        powerLabel2: game.mod.PowerLabel;
        img_hp2: eui.Image;
        head2: game.mod.Head;
        img_boss2: eui.Image;
        constructor();
    }
}
declare namespace game.mod {
    class ShenLingSkillIcon extends BaseListenerRenderer {
        img_bg: eui.Image;
        img_quality: eui.Image;
        img_icon: eui.Image;
        gr_lb: eui.Group;
        lb_num: eui.Label;
        img_gray: eui.Image;
        redPoint: eui.Image;
        img_ji: eui.Image;
        data: ISLSkillIconData;
        constructor();
        protected dataChanged(): void;
        protected defaultIcon(): void;
        setIcon(src?: string): void;
        setLabel(str?: string): void;
        setHint(hint?: boolean): void;
        /**改变技能底框*/
        setBg(src?: string): void;
    }
    /**拥有点击缩放效果的技能icon*/
    class ShenLingSkillIconTap extends BaseListenerRenderer {
        skill_icon: game.mod.ShenLingSkillIcon;
        data: ISLSkillIconData;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    /**神灵类型按钮*/
    class ShenlingTypeBtn extends BaseListenerRenderer {
        img_icon: eui.Image;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    /**
     * 神灵属性按钮基类
     * ShenLingTypeIconBaseSkin
     * ShenLingTypeIconBaseUpSkin
     */
    class ShenlingTypeIconBase extends BaseListenerRenderer {
        img_di: eui.Image;
        img_icon: eui.Image;
        redPoint: eui.Image;
        data: ShenlingTypeIconData;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class BattleSkillItemRender extends eui.ItemRenderer {
        img_bg: eui.Image;
        img_icon: eui.Image;
        img_lock: eui.Image;
        img_tag: eui.Image;
        redPoint: eui.Image;
        grp_lv: eui.Group;
        lab_lv: eui.Label;
        data: BattleSkillItemRenderData;
        protected dataChanged(): void;
        /**单个技能外部调用*/
        setData(skillId: number, lv?: number, showLv?: boolean, showZero?: boolean): void;
    }
}
declare namespace game.mod {
    class SkillConditionTipsView extends eui.Component {
        baseQualityTips: game.mod.BaseQualityTips;
        skill: game.mod.SkillItemRender;
        lab_name: eui.Label;
        img_type: eui.Image;
        baseDescItem: game.mod.BaseDescItem;
        img_act: eui.Image;
        lb_act: eui.Label;
        constructor();
    }
}
declare namespace game.mod {
    class SkillItemRender extends eui.ItemRenderer {
        img_bg: eui.Image;
        img_icon: eui.Image;
        img_lock: eui.Image;
        redPoint: eui.Image;
        grp_level: eui.Group;
        lab_level: eui.Label;
        data: SkillItemRenderData;
        protected dataChanged(): void;
        /**单个技能外部调用*/
        setData(skillId: number): void;
        setIcon(icon: string): void;
    }
}
declare namespace game.mod {
    class SkillNormalTipsView extends eui.Component {
        private baseQualityTips;
        skill: SkillItemRender;
        lab_name: eui.Label;
        img_type: eui.Image;
        power: game.mod.Power;
        baseDescItem: BaseDescItem;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod {
    class SkillTipsView extends eui.Component {
        private baseQualityTips;
        skill: SkillItemRender;
        lab_name: eui.Label;
        power: game.mod.Power;
        baseDescItem: BaseDescItem;
        baseDescItem2: BaseDescItem;
        icon: game.mod.Icon;
        btn_act: game.mod.Btn;
        img_act: eui.Image;
        img_tips: eui.Image;
        lab_limit: eui.Label;
        constructor();
    }
}
declare namespace game.mod {
    class StarItemFuRender extends eui.ItemRenderer {
        img_star: eui.Image;
        data: StarItemFuData;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class StarItemRender extends eui.ItemRenderer {
        img_star: eui.Image;
        data: string;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    /**
     * 通用星星列表组件，列表设置负间距时候用
     */
    class StarListFuView extends eui.Component {
        private list_star;
        private _starList;
        constructor();
        private onAddToStage;
        private onRemove;
        private initStarList;
        /**星星显示
         * @param star，当前星级
         * @param gap 间距
         * */
        updateStar(star: number, gap?: number): void;
    }
}
declare namespace game.mod {
    /**
     * 通用星星列表组件
     */
    class StarListView extends eui.Component {
        private list_star;
        private _starList;
        constructor();
        private onAddToStage;
        private onRemove;
        private initStarList;
        /**星星显示
         * @param star，当前星级
         * @param maxStar，最大星级
         * @param starSrc，星星资源
         * */
        updateStar(star: number, maxStar?: number, starSrc?: string): void;
        /**新的星星显示*/
        updateNewStar(star: number, maxStar?: number, starSrc?: string): void;
        /**大星星显示*/
        updateBigStar(star: number, maxStar?: number, starSrc?: string): void;
        /**
         * 星星显示数量以及资源
         * @param starCnt 星级
         * @param src   星星资源
         */
        updateStarSrc(starCnt: number, src: string): void;
        /**
         * 设置list的gap
         * @param gap
         */
        listGap: number;
        /**
         * 更新外显星级
         * @param index 外显id
         */
        updateSurfaceStar(index: number): void;
    }
}
declare namespace game.mod {
    /**升星觉醒按钮*/
    class UpStarBtn extends Btn {
        upStarEft: UpStarEft;
        img_cost: eui.Image;
        lb_cost: eui.Label;
        grp_tips: eui.Group;
        lb_tips: eui.Label;
        redPoint: eui.Image;
        /**
         * 获取拥有数量
         * @param index
         */
        getCurCnt(index?: number): number;
        /**
         *
         * @param cost
         **@param isAct: 是否已经激活
         * @param tips tips：提示的文本，默认不显示
         * @param isCnt: 显示数量
         * @param curCnt: 当前数量，外部传进来的话，就不取背包的
         */
        updateCost(cost: number[], isAct: boolean, tips: string, isCnt?: boolean, curCnt?: number): void;
        updateLab(str: string): void;
        /**满星状态*/
        updateMaxStar(): void;
        /**神灵觉醒状态*/
        updateJuexing(): void;
        /**设置红点*/
        setHint(hint?: boolean): void;
        /**满特效，球*/
        setFullEft(): void;
    }
}
declare namespace game.mod {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Handler = base.Handler;
    /**升星觉醒按钮*/
    class UpStarEft extends Btn {
        group_eft1: eui.Group;
        group_eft2: eui.Group;
        group_eft3: eui.Group;
        img_mark: eui.Image;
        labelDisplay: eui.Label;
        redPoint: eui.Image;
        private _effHub;
        private _eftIdx1;
        private _eftIdx2;
        private _eftIdx3;
        protected childrenCreated(): void;
        /**
         * 添加特效
         * @param src 特效资源，UIEftSrc
         * @param parent 存放特效的Group
         * */
        protected addEftByParent(src: string, parent: DisplayObjectContainer, x?: number, y?: number, idx?: number, cb?: Handler, times?: number, scale?: number, autoRemove?: boolean, speed?: number): number;
        private addEft1;
        private addEft2;
        private addEft3;
        private clearEft1;
        private clearEft2;
        private clearEft3;
        private clearAllEft;
        /**
         * @param curCnt: 当前数量
         * @param costCnt: 最大数量
         * @param showRate: 显示百分比
         * @param fullTips: 满级后显示文本
         */
        updateCost(curCnt: number, costCnt: number, showRate?: boolean, fullTips?: string): void;
        /**满星状态*/
        updateMaxStar(): void;
        /**满特效，球*/
        setFullEft(): void;
        /**设置红点*/
        setHint(hint?: boolean): void;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    /**通用的批量购买tips*/
    class StoreBuyTipsMdr extends MdrBase {
        private _view;
        _showArgs: {
            index: number;
            left_cnt: number;
            handler: Handler;
        };
        private _cfg;
        private _cost;
        private _leftCnt;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        private updateCostIcon;
        protected onHide(): void;
        private onConfirm;
        /**todo 有通用组件，待处理*/
        private getCnt;
        private setCnt;
        private onAdd;
        private onAddTen;
        private onSubtract;
        private onSubtractTen;
    }
}
declare namespace game.mod {
    class StoreBuyTipsView extends eui.Component {
        secondPop: game.mod.SecondPop;
        lb_cnt: eui.Label;
        btn_add: game.mod.Btn;
        btn_addTen: game.mod.Btn;
        btn_subtract: game.mod.Btn;
        btn_subtractTen: game.mod.Btn;
        lb_name: eui.Label;
        icon: game.mod.Icon;
        lb_buyDesc: eui.Label;
        costIcon: game.mod.CostIcon;
        btn_cancel: game.mod.Btn;
        btn_confirm: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod {
    class SurfaceGiftView extends eui.Component {
        img_bg: eui.Image;
        icon: game.mod.Icon;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod {
    class SurfaceLvItemRender extends eui.ItemRenderer {
        img_icon: eui.Image;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class SurfacePillItemRender extends BaseRenderer {
        private img_icon;
        private img_lock;
        private redPoint;
        private grp_cnt;
        private lab_cnt;
        private grp_eft;
        private grp_add;
        data: number[];
        private _proxy;
        private _canUseCnt;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
        private removeTween;
    }
}
declare namespace game.mod {
    class SurfaceStarView extends eui.Component {
        grp_eff: eui.Group;
        power2: game.mod.Power2;
        name_item: AvatarNameSrItem;
        btn_battle: game.mod.Btn;
        god_item: game.mod.AttrGodItem;
        item_pill0: SurfacePillItemRender;
        item_pill1: SurfacePillItemRender;
        item_pill2: SurfacePillItemRender;
        list_star: game.mod.StarListView;
        btn_up: game.mod.UpStarBtn;
        list_item: eui.List;
        list_type: eui.List;
        special_attr: game.mod.SpecialAttrView;
        grp_skill: eui.Group;
        item_skill: BattleSkillItemRender;
        constructor();
    }
}
declare namespace game.mod {
    class SurfaceView extends eui.Component {
        grp_eff: eui.Group;
        power2: game.mod.Power2;
        grp_lv: eui.Group;
        name_item: AvatarNameItem;
        btn_gift: game.mod.Btn;
        btn_jiban: game.mod.Btn;
        item_skill: BattleSkillItemRender;
        list_skill: eui.List;
        list_item: eui.List;
        bar: game.mod.ProgressBarComp;
        cost: game.mod.CostIcon;
        btn_up: game.mod.Btn;
        btn_onekey: game.mod.Btn;
        img_max: eui.Image;
        special_attr: game.mod.SpecialAttrView;
        btn_huan: game.mod.TabSecondItem;
        btn_zhanshendian: game.mod.Btn;
        btn_god: game.mod.Btn;
        btn_act: Btn;
        lab_time: eui.Label;
        grp_act: eui.Group;
        btn_flyRank: Btn;
        lab_flyRank: eui.Label;
        grp_flyRank: eui.Group;
        constructor();
    }
}
declare namespace game.mod {
    class BtnTabItem extends BaseRenderer {
        lab: eui.Label;
        redPoint: eui.Image;
        data: BtnTabItemData;
        setData(data: BtnTabItemData): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class TabBaseItem extends eui.ItemRenderer {
        img_icon: eui.Image;
        redPoint: eui.Image;
        img_tag: eui.Image;
        data: TabBaseItemData;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class TabSecondItem extends BaseRenderer {
        img_icon: eui.Image;
        img_name: eui.Image;
        grp_name: eui.Group;
        img_gray: eui.Image;
        redPoint: eui.Image;
        img_tag: eui.Image;
        grp_count: eui.Group;
        lab_count: eui.Label;
        lb_name: eui.Label;
        img_status: eui.Image;
        data: TabBaseItemData;
        setData(data: TabBaseItemData): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    interface IDailyProxy extends IProxy {
        getOtherHint(): boolean;
        isOtherHint(node: string): boolean;
    }
}
declare namespace game.mod {
    import task_data = msg.task_data;
    class TaskRender2 extends BaseListenerRenderer {
        private lab_desc;
        private lab_schedule;
        private icon;
        private img_finished;
        private btn_go;
        data: task_data;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickDraw;
    }
}
declare namespace game.mod {
    import task_data = msg.task_data;
    class TaskRenderIcon extends TaskRender {
        private img_icon;
        private lab_icon;
        data: task_data;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    /**时间组件*/
    class TimeItem extends eui.Component {
        lab_time: eui.Label;
        constructor();
        /**
         * 更新倒计时
         * 大于1天：dd天HH时
         * 大于1小时：HH时mm分
         * 小于1小时：mm分ss秒
         * @param endTime 结束时间戳，单位秒
         * @param sufStr 时间末尾文本，默认空
         * @param zeroStr 倒计时为0时显示的文本，默认空
         */
        updateTime(endTime?: number, sufStr?: string, zeroStr?: string): void;
        /**
         * 更新倒计时
         * @param leftTime 剩余时间，单位：秒
         * @param sufStr 时间末尾文本，默认空
         * @param zeroStr 倒计时为0时显示的文本，默认空
         * @param textColor 文本颜色
         */
        updateLeftTime(leftTime?: number, sufStr?: string, zeroStr?: string, textColor?: number): void;
        /**
         * 更新中控活动倒计时
         * */
        updateActTime(actInfo: msg.oper_act_item): void;
    }
}
declare namespace game.mod {
    import attributes = msg.attributes;
    /**
     * 基础道具描述组件
     */
    class BaseAttrItem extends eui.Component {
        private baseNameItem;
        private list_attr;
        constructor();
        /**
         * @param attr 属性
         * @param showAdd 是否显示+号属性
         * @param title 描述标题，默认：基础属性
         */
        updateShow(attr: attributes, showAdd?: boolean, title?: string, color?: number): void;
    }
}
declare namespace game.mod {
    import attributes = msg.attributes;
    /**
     * 带有属性提升值的属性组件
     */
    class BaseAttrItemAdd extends eui.Component {
        baseNameItem: game.mod.BaseNameItem;
        list_attr: game.mod.AttrListAddView;
        constructor();
        /**
         * 带有提升属性的
         * @param attr
         * @param next_attr
         * @param title
         */
        updateShow(attr: attributes, next_attr: attributes, title?: string): void;
    }
}
declare namespace game.mod {
    /**
     * 基础道具描述组件
     */
    class BaseDescItem extends BaseRenderer {
        private baseNameItem;
        private lab_desc;
        private _descY;
        private _lineSpacing;
        data: {
            desc: string;
            title: string;
            lineSpacing?: number;
            color: number;
        };
        constructor();
        protected dataChanged(): void;
        /**
         * @param desc 描述文本
         * @param title 描述标题，默认：道具描述
         * @param lineSpacing 描述的间距，默认10
         */
        updateShow(desc: string, title?: string, lineSpacing?: number, color?: number): void;
    }
}
declare namespace game.mod {
    /**
     * 基础道具描述组件
     */
    class BaseDescList extends eui.Component {
        private baseNameItem;
        private list_desc;
        private _attrList;
        constructor();
        private onAddToStage;
        private onRemove;
        private initAttrList;
        /**
         * @param descList 文本描述
         * @param title 描述标题，默认：基础属性
         */
        updateShow(descList: string[], title?: string): void;
    }
}
declare namespace game.mod {
    /**
     * 基础道具描述组件
     */
    class BaseDescList2 extends eui.Component {
        private baseNameItem;
        private list_desc;
        private _attrList;
        constructor();
        private onAddToStage;
        private onRemoveFromStage;
        /**
         * @param descList 文本描述
         * @param title 描述标题，默认：基础属性
         */
        updateShow(descList: string[][], title?: string): void;
    }
}
declare namespace game.mod {
    /**
     * 通用的获取途径item
     * 跳转界面后监听 ViewEvent.ON_VIEW_HIDE 以关闭界面
     */
    class BaseGainItem extends BaseStageEventItem {
        title_item: game.mod.BaseNameItem;
        list: eui.List;
        private _listData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onClickList;
        /**
         * 设置标题
         * @param titleName 标题文本
         */
        private setTitle;
        /**
         * 设置物品来源跳转路径（需监听 ViewEvent.ON_VIEW_HIDE 以关闭界面）
         * @param gain 获取途径跳转ID
         * @param titleName 默认：物品来源
         */
        updateShow(gain: number[], titleName?: string): void;
    }
    class BaseGainBtn extends BaseRenderer {
        iconDisplay: eui.Image;
        labelDisplay: eui.Label;
        redPoint: eui.Image;
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    import jipin_attrs_data = msg.jipin_attrs_data;
    /**
     * 极品属性组件
     */
    class BaseJipinAttrItem extends eui.Component {
        private baseNameItem;
        private list_attr;
        constructor();
        /**
         * 更新极品属性
         * @param attr 属性
         * @param title 描述标题，默认：基础属性
         */
        updateShow(attr: jipin_attrs_data[], title?: string): void;
        /**极品属性文本*/
        private getJiPinAttr;
        /**单条极品属性数据，品质6才需要在属性文本前加图片标识*/
        private getSingleJiPinAttr;
        /**
         * 更新装备极品文本
         * @param index 装备id
         * @param title 默认:极品属性
         */
        updateEquipJipinDesc(index: number, title?: string): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import equip_strength_data = msg.equip_strength_data;
    import gem_data = msg.gem_data;
    import advanced_master_data = msg.advanced_master_data;
    interface IEnhanceProxy extends IProxy {
        /**
         * 根据部位获取强化信息
         * @param pos
         */
        getStrengthInfo(pos: number): equip_strength_data;
        /**
         * 宝石数据
         * @param pos 部位，0~9
         * @returns
         */
        getGemInfo(pos: number): gem_data[];
        /**
         * 进阶大师属性（套装属性）
         */
        getAdvancedMaster(): advanced_master_data;
    }
}
declare namespace game.mod {
    /**
     * 可通过对象池获得，代码手动添加到容器中展示
     * 基础的title
     */
    class BaseNameItem extends BaseStageEventItem {
        img_bg: eui.Image;
        img_flag: eui.Image;
        lb_name: eui.Label;
        constructor();
        /**
         * 设置标题底图
         * @param bg 底图资源 ，默认 wenbenlansedi
         */
        setBg(bg?: string): void;
        /**
         * 设置标题文本以及标题前面图片标识
         * @param name 标题文本
         * @param imgFlag 标题前面图片标识，默认 tipshuangsedian
         */
        setTitle(name: string, imgFlag?: string): void;
    }
}
declare namespace game.mod {
    /**
     * 基础道具来源跳转组件
     */
    class BasePropGainItem extends BaseListenerRenderer {
        baseZhuangshiItem: BaseZhuangshiItem;
        btn_gain: Btn;
        data: number;
        constructor();
        protected onAddToStage(): void;
        protected onClick(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    /**
     * 基础道具来源列表组件
     */
    class BasePropGainList extends eui.Component {
        private baseNameItem;
        private list_item;
        private _attrList;
        constructor();
        private onAddToStage;
        private onRemove;
        private initAttrList;
        /**
         * @param gainList 获取途径跳转ID
         * @param title 描述标题，默认：获取途径
         */
        updateShow(gainList: number[], title?: string): void;
    }
}
declare namespace game.mod {
    /**
     * 基础道具提示组件
     */
    class BasePropTips extends eui.Component {
        private baseQualityTips;
        private icon;
        private lab_name;
        private _propData;
        constructor();
        updateShow(data: PropData | number | Long, starCnt?: number): void;
        /**
         * @param quality
         * @param name
         * @param icon
         */
        updateShowByArgs(quality: number, name: string, icon: string): void;
        /**
         * 更新icon的星星
         * @param starCnt
         */
        updateIconStar(starCnt: number): void;
    }
}
declare namespace game.mod {
    /**
     * 基础带品质提示组件
     */
    class BaseQualityTips extends eui.Component {
        img_quality: eui.Image;
        constructor();
        updateShow(quality: number): void;
    }
}
declare namespace game.mod {
    /**
     * 道具奖励
     */
    class BaseRewardList extends eui.Component {
        private list_icon;
        private _listData;
        private _selIndex;
        private _selectShow;
        constructor();
        private onAddToStage;
        private onRemove;
        private initAttrList;
        private initSelIndex;
        private onClickList;
        private onSelectShow;
        /**获取选中的道具index*/
        getSelIndex(): number;
        /**
         * @param rewards 道具index和cnt数组
         * @param isSel 是否显示可选择道具
         */
        updateShow(rewards: number[][] | number[], isSel?: boolean): void;
    }
}
declare namespace game.mod {
    class BaseRewardSelItem extends IconSel {
        private _delayProp;
        data: number[];
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onClickBegin;
        private onClickEnd;
        private clearDelayProp;
        private showPropTips;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    /**
     * 通用属性组件
     */
    class BaseSkillAttrItem extends eui.ItemRenderer {
        lb_name: eui.Label;
        lb_val: eui.Label;
        icon: eui.Image;
        data: string[];
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    /**
     * 基础外显组件
     */
    class BaseSurfaceItem extends BaseRenderer {
        gr_eft: eui.Group;
        img_quality: eui.Image;
        lb_name: eui.Label;
        btn_god: game.mod.AttrGodItem;
        special_attr: game.mod.SpecialAttrView;
        img_icon: eui.Image;
        constructor();
        /**
         * @param index 外显index
         * @param god 外显仙力
         * @param isWhite 是否白底，默认false
         * @param clickable 设置是否可点击，一般其他玩家不给查看，默认true
         * @param isShowGod 是否展示仙力按钮，默认true
         */
        updateShow(index: number, god: number, isWhite?: boolean, clickable?: boolean, isShowGod?: boolean): void;
        isImage(): void;
        isAnimate(): void;
    }
}
declare namespace game.mod {
    class BaseTips extends eui.Component {
    }
}
declare namespace game.mod {
    /**
     * 装饰描述标题以及文本
     */
    class BaseZhuangShiDescItem extends eui.ItemRenderer {
        nameItem: game.mod.BaseZhuangshiItem;
        lb_desc: eui.Label;
        constructor();
        protected dataChanged(): void;
        /**
         * 更新标题以及描述文本
         * @param title 标题文本
         * @param desc 传入null或者空字符串，则只展示只有标题的皮肤状态
         */
        updateShow(title: string, desc: string): void;
        /**设置皮肤状态，只有标题，没有文本描述*/
        private setDescState;
        /**设置皮肤状态，有标题有文本描述*/
        private setNoDescState;
    }
}
declare namespace game.mod {
    /**
     * 基础装饰组件
     */
    class BaseZhuangshiItem extends eui.ItemRenderer {
        private lab_desc;
        data: string;
        protected dataChanged(): void;
        /**
         * @param desc 描述文本，不推荐使用
         */
        updateShow(desc: string): void;
    }
}
declare namespace game.mod {
    class BossTipsView extends eui.Component {
        lab_desc: eui.Label;
        list_reward: eui.List;
        btn_get: Btn;
        timeItem: TimeItem;
        constructor();
    }
}
declare namespace game.mod {
    import UpdateItem = base.UpdateItem;
    import Handler = base.Handler;
    class CloseTips extends eui.Component implements UpdateItem {
        private lab_tips;
        private _time;
        private _closeHandler;
        male: eui.CheckBox;
        constructor();
        private onAddToStage;
        private onRemove;
        private updateTips;
        update(time: base.Time): void;
        private updateTime;
        /**设置提示
         * @param time 倒计时
         * @param closeHandler 倒计时结束的回调
         */
        updateShow(time: number, closeHandler?: Handler): void;
        updateTxt(str: string): void;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    class ExchangeTips extends BaseListenerRenderer {
        costItem: CostIcon;
        btn_buy: Btn;
        lab_count: eui.Label;
        private _propData;
        private _clickHandler;
        protected onAddToStage(): void;
        private onClick;
        updateExchangeTips(data: PropData, clickHandler?: Handler): void;
    }
}
declare namespace game.mod {
    class SecondPop extends eui.Component {
        private img_bg;
        private lab_title;
        btn_close: game.mod.Btn;
        private _titleStr;
        private _bgStr;
        constructor();
        private onAddToStage;
        private onRemove;
        private updateTitleSrc;
        updateBgSrc(str?: string): void;
        /**皮肤设置标题用*/
        titleStr: string;
        /**皮肤设置背景用*/
        bgStr: string;
        /**代码设置标题用*/
        updateTitleStr(str: string): void;
    }
}
declare namespace game.mod {
    /**
     * 通用属性列表组件
     */
    class SkillAttrList extends eui.Component {
        private list_attr;
        private _attrList;
        constructor();
        private onAddToStage;
        private onRemove;
        private initAttrList;
        /**属性赋值*/
        updateAttr(infos: string[][]): void;
    }
}
declare namespace game.mod {
    /**
     * 突破界面
     */
    class BreakthroughTipsView extends eui.Component {
        img_bg: eui.Image;
        grp_eft2: eui.Group;
        img_title: eui.Image;
        grp_eft: eui.Group;
        grp_show: eui.Group;
        grp_lv1: eui.Group;
        grp_lv2: eui.Group;
        skill: game.mod.SkillItemRender;
        grp_desc: eui.Group;
        lab_name: eui.Label;
        lab_desc: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod {
    class BreakthroughTipsView2 extends eui.Component {
        img_bg: eui.Image;
        grp_eft2: eui.Group;
        img_title: eui.Image;
        grp_eft: eui.Group;
        grp_show: eui.Group;
        grp_lv1: eui.Group;
        grp_lv2: eui.Group;
        skill1: game.mod.SkillItemRender;
        skill2: game.mod.SkillItemRender;
        grp_desc1: eui.Group;
        lab_lv1: eui.Label;
        lab_name1: eui.Label;
        lab_desc1: eui.Label;
        grp_desc2: eui.Group;
        lab_lv2: eui.Label;
        lab_name2: eui.Label;
        lab_desc2: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod {
    /**
     * 升星界面
     */
    class UpStarTipsView extends eui.Component {
        img_bg: eui.Image;
        grp_eft2: eui.Group;
        img_title: eui.Image;
        grp_eft: eui.Group;
        grp_starlist: eui.Group;
        starListView1: game.mod.StarListView;
        starListView2: game.mod.StarListView;
        grp_desc1: eui.Group;
        lab_desc1: eui.Label;
        grp_lv1: eui.Group;
        grp_desc2: eui.Group;
        lab_desc2: eui.Label;
        grp_lv2: eui.Group;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod {
    /**
     * 升星界面
     */
    class UpStarTipsView2 extends eui.Component {
        img_bg: eui.Image;
        grp_eft2: eui.Group;
        img_title: eui.Image;
        grp_eft: eui.Group;
        grp_starlist: eui.Group;
        starListView1: game.mod.StarListView;
        starListView2: game.mod.StarListView;
        grp_show: eui.Group;
        img_arrow: eui.Image;
        grp_lv1: eui.Group;
        grp_lv2: eui.Group;
        skill: game.mod.SkillItemRender;
        grp_desc: eui.Group;
        lab_name: eui.Label;
        lab_desc: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod {
    /**
     * 通用的属性展示面板，分【带有仙力属性，不带有仙力属性】两类
     */
    class BaseAttrMdr extends MdrBase {
        protected _view: BaseAttrView;
        protected _listAttr1: eui.ArrayCollection;
        /**仙力属性*/
        protected _godKeys: string[];
        /**基础属性中需要过滤的属性*/
        protected _godFilterKeys: string[];
        /**
         * titleStr: 面板标题
         * attrs: 属性
         * attrTitleStr: 基础属性一栏标题
         * state: 皮肤currentState对应状态
         *        default: 1  只有一种属性展示
         *        oneattr: 2  仙力属性+基础属性
         * layoutType: oneattr下的属性展示布局 1: VerticalLayout, 2: TileLayout
         */
        _showArgs: {
            titleStr: string;
            attrs: msg.attributes;
            attrItemStr?: string;
            state?: number;
            layoutType?: number;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected updateView(): void;
        /**默认，带有仙力属性*/
        private updateDefaultView;
        /**没有仙力属性的，1: VerticalLayout, 2: TileLayout*/
        private updateOneAttrView;
        /**更新【标题】*/
        protected updateTitleStr(str: string): void;
        /**更新【仙力属性】*/
        protected updateXianLiAttr(): void;
        /**更新【基础属性】*/
        protected updateBaseAttr(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    import GameNT = base.GameNT;
    /**
     * 基础的奖励领取界面
     */
    class BaseRewardMdr extends MdrBase {
        protected _view: BaseRewardView;
        /**
         * titleStr 面板标题，传空，默认奖励预览
         * reward 奖励数组[[index, count], [index, count], ...]
         * state: 领取状态 0：未完成，1: 可领取，2：已领取
         * handler: 点击领取按钮回调
         * tipsStr 提示文本，存在提示文本时，不显示领取状态
         * @protected
         */
        protected _showArgs: {
            titleStr: string;
            reward: number[][];
            state: number;
            handler: Handler;
            tipsStr?: string;
        };
        protected _listData: eui.ArrayCollection;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateState;
        /**
         * 点击领取按钮
         * @protected
         */
        protected onClick(): void;
        /**
         * 监听 MainEvent.UPDATE_BASE_REWARD_MDR_STATE，带有参数state
         * @param n
         */
        protected onUpdateState(n: GameNT): void;
        protected onHide(): void;
    }
}
declare namespace game.mod {
    /**
     * 规则说明
     */
    class BaseRuleDescMdr extends MdrBase {
        private _view;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
    }
}
declare namespace game.mod {
    class WndBaseMdr extends WndMdr {
        protected _view: WndBaseView;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected onClickClose(): void;
        /**分页选中变更时调用，比Mdr的onShow()方法晚执行*/
        protected onTabChanged(): void;
        /**更新标题*/
        private updateTitle;
        /**更新背景，子类重写 */
        protected updateBg(bg: string): void;
        /** 通用标题监听 */
        private onTitleUpdate;
        /** 通用移动层级监听，子类重写 */
        protected setTop(): void;
        /**更新货币*/
        private updateCoin;
        private onRoleUpdate;
        private updateItemShow;
        private onUpdateByPropIndex;
        private updateItemShowByIndex;
        private onGuideTrigger;
        private showBackGuide;
    }
}
declare namespace game.mod {
    class WndBaseNewMdr extends WndMdr {
        protected _view: WndBaseNewView;
        protected onInit(): void;
        protected addListeners(): void;
        /**更新背景，子类重写 */
        protected updateBg(bg: string): void;
        /** 通用移动层级监听，子类重写 */
        protected setTop(): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import pos_detail = msg.pos_detail;
    interface IEquipProxy extends IProxy {
        equipInfo: pos_detail;
        readonly equips: PropData[];
        c2s_equip_operate(oper: number, prop_id: Long): void;
        c2s_equip_pos_detail(posId: number, roleId?: Long, serverId?: number): void;
        /**==========new=============*/
        c2s_new_equip_online_request(): void;
        getEquipByPos(pos: number): PropData;
        getRoleEquipIconHint(): string[];
        checkOneKey(): boolean;
        updateEquipAdvancedLv(pos: number, lv: number): void;
        checkEquipLimit(prop: PropData): boolean;
        checkEquipByPos(pos: number): boolean;
    }
}
declare namespace game.mod {
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    class WndSecondMainMdr extends MdrBase {
        protected _view: WndSecondMainView;
        protected _btnList: ArrayCollection;
        protected _btnData: WndBaseViewData[]; /**子类重写，赋值*/
        protected _height: number;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /**更新list数据*/
        protected updateBtnList(): void;
        /**刷新显示界面*/
        protected updateViewShow(): void;
        /**获取对应的mdr*/
        protected getMdrPosByType(type: string): number;
        /**分页点击时检测*/
        protected onTabCheck(index: number): boolean;
        /**分页选中变更时调用，比Mdr的onShow()方法晚执行*/
        protected onTabChanged(): void;
        /**更新标题*/
        private updateTitle;
        /**更新背景*/
        private updateBg;
        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void;
        /** 刷新分页红点 */
        protected updateTabHint(): void;
    }
}
declare namespace game.mod {
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    class WndSecondMdr extends MdrBase {
        protected _view: WndSecondView;
        protected _btnList: ArrayCollection;
        protected _btnData: WndBaseViewData[]; /**子类重写，赋值*/
        private _firstEnter; /**是否首次进入，用于保存界面数据*/
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /**更新list数据*/
        protected updateBtnList(): void;
        /**刷新显示界面*/
        protected updateViewShow(): void;
        /**获取对应的mdr*/
        protected getMdrPosByType(type: string): number;
        /**分页点击时检测*/
        protected onTabCheck(index: number): boolean;
        /**分页选中变更时调用，比Mdr的onShow()方法晚执行*/
        protected onTabChanged(): void;
        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void;
        /** 刷新分页红点 */
        protected updateTabHint(): void;
        /**功能开启刷新按钮*/
        private onOpenFuncUpdate;
        /** 通用移动层级监听 */
        private onTopUpdate;
    }
}
declare namespace game.mod {
    class AmassBaseMdr extends MdrBase {
        protected _view: AmassView;
        protected _proxy: IConsecrateProxy;
        protected classId: number;
        private _itemList;
        private _btnList;
        private _suitList;
        /**当前选中的类型*/
        protected _selType: number;
        protected _curCnt: number;
        protected _types: number[];
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickUp;
        private onClickGoto;
        private onClickType;
        private onClickItem;
        private onInfoUpdate;
        /** 通用背包事件监听 */
        private onBagUpdate;
        /**道具物品类型DE*/
        protected getPropType(): PropType;
        private initTypeList;
        protected updateSelIndex(isUpdate?: boolean): void;
        private updateTypeHint;
        private typeUpdateInfo;
        private updateBar;
        private updateItemList;
        private updateSuitList;
        /** 滚动 */
        private onScrollMove;
        /** 滚动 */
        private move;
        /** 显示左右按钮 */
        private refreshPos;
    }
}
declare namespace game.mod {
    import teammate = msg.teammate;
    import UpdateItem = base.UpdateItem;
    import Handler = base.Handler;
    class CommonMatchMdr extends MdrBase implements UpdateItem {
        private _view;
        protected _showArgs: MatchData;
        private _timeCnt;
        private _names;
        private _delay;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private initNameList;
        protected onHide(): void;
        /**更新自己*/
        private updatePlayer;
        /**更新敌人*/
        private updateEnemy;
        update(time: base.Time): void;
    }
    interface MatchData {
        /**1单挑 2群挑 */
        type: number;
        /**用户属性列表 */
        players: teammate[] | MatchItemData[];
        /**匹配到列表 */
        enemys: teammate[] | MatchItemData[];
        /**结束回调 */
        handler?: Handler;
        /**匹配动画跳动次数 */
        times?: number;
    }
    interface MatchItemData {
        name: string;
        sex: number;
        showpower?: Long;
        index?: number;
    }
}
declare namespace game.mod {
    import ArrayCollection = eui.ArrayCollection;
    /**
     * 通用的奖励预览弹窗
     */
    class BasePreviewRewardMdr extends MdrBase {
        protected _view: BasePreviewRewardView;
        protected _itemList: ArrayCollection;
        protected _showArgs: BasePreviewRewardData[];
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected updateItemList(): void;
    }
}
declare namespace game.mod {
    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    class SurfaceMdr extends EffectMdrBase implements UpdateItem {
        protected _view: SurfaceView;
        private _itemList;
        private _skillList;
        private _proxy;
        private _headType;
        private _cost;
        /**当前外显属性*/
        private _attr;
        private _skillId;
        private _isFirst;
        private _actTime;
        private _flyRankTime;
        private _flyRankActInfo;
        /**幻化按钮data */
        private _huanData;
        protected showLv: boolean;
        protected showZero: boolean;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickAct;
        private onClickDesc;
        private onClickGift;
        private onClickJiban;
        private onClickItemSkill;
        private onClickSkill;
        private onClickStar;
        private onClickUp;
        private onClickOnekey;
        private onUpdateAct;
        private onInfoUpdate;
        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void;
        private updateModel;
        private updateInfo;
        private updatePower;
        private updateSkillList;
        private updateLv;
        private updateHint;
        private updateJibanHint;
        private updateGiftHint;
        private updateStarHint;
        /**初始化显示不同的ui，子类可重写*/
        protected initView(): void;
        update(time: base.Time): void;
        private updateTime;
        /**************************飞升榜********************************/
        private onClickFlyRank;
        /** 通用中控活动事件监听 */
        private onActivityUpdateByType;
        private updateFlyRank;
        private getFlyRank;
        private updateFlyRankTime;
    }
}
declare namespace game.mod {
    import HorseConfig = game.config.HorseConfig;
    class SurfaceStarMdr extends EffectMdrBase {
        protected _view: SurfaceStarView;
        private _itemList;
        private _typeList;
        private _proxy;
        private _headType;
        /**当前选中的外显类型*/
        private _selType;
        /**当前选中的外显下标*/
        private _selIndex;
        /**当前选中的外显信息*/
        private _selData;
        protected _selCfg: HorseConfig | any;
        /**当前选中的外显属性*/
        private _attr;
        private _isMaxStar;
        private _lastIndex;
        private _effIdx;
        private _cost;
        private _pillList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickDesc;
        private onClickStar;
        private onClickType;
        private onClickItem;
        private onInfoUpdate;
        private onRideInfoUpdate;
        private onPillUpdate;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private initPillList;
        private initTypeList;
        private updateTypeListHint;
        private typeUpdateInfo;
        private updateItemList;
        private updatePower;
        private updateModel;
        private updateStar;
        private updatePill;
        private updateHint;
        private updateBattleHint;
        /**初始化显示不同的ui，子类可重写*/
        protected initView(): void;
        /**点击幻化或出战，子类可重写*/
        protected onClickBattle(): void;
        /**刷新幻化或出战，子类可重写*/
        protected updateBattle(): void;
        /**刷新选中，子类可重写*/
        protected indexUpdateInfo(): void;
    }
}
declare namespace game.mod {
    /**
     * 突破成功
     * 参考 SurfaceUpTipsMdr
     */
    class BreakthroughTipsMdr extends EffectMdrBase {
        private _view;
        _showArgs: BreakthroughData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private showTitleTween;
        private removeTitleTween;
        private showBgTween;
        private removeBgTween;
        private showGrpTween;
        private removeGrpTween;
        private showDescTween;
        private removeDescTween;
        private showSkillTween;
        private removeSkillTween;
        private showTipsTween;
        private removeTipsTween;
        private showEffect;
    }
}
declare namespace game.mod {
    class BreakthroughTipsMdr2 extends EffectMdrBase {
        private _view;
        _showArgs: BreakthroughData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private showTitleTween;
        private removeTitleTween;
        private showBgTween;
        private removeBgTween;
        private showGrpTween;
        private removeGrpTween;
        private showDescTween;
        private removeDescTween;
        private showSkillTween;
        private removeSkillTween;
        private showTipsTween;
        private removeTipsTween;
        private showEffect;
    }
}
declare namespace game.mod {
    /**
     * 升星成功
     * 参考 BreakthroughTipsMdr
     */
    class UpStarTipsMdr extends EffectMdrBase {
        private _view;
        _showArgs: UpStarData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private showTitleTween;
        private removeTitleTween;
        private showBgTween;
        private removeBgTween;
        private showGrpStarlistTween;
        private removeGrpStarlistTween;
        private showDescTween;
        private removeDescTween;
        private showSkillTween;
        private removeSkillTween;
        private showTipsTween;
        private removeTipsTween;
        private showEffect;
    }
}
declare namespace game.mod {
    class UpStarTipsMdr2 extends EffectMdrBase {
        private _view;
        _showArgs: UpStarData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private showTitleTween;
        private removeTitleTween;
        private showBgTween;
        private removeBgTween;
        private showGrpTween;
        private removeGrpTween;
        private showGrpStarlistTween;
        private removeGrpStarlistTween;
        private showDescTween;
        private removeDescTween;
        private showSkillTween;
        private removeSkillTween;
        private showTipsTween;
        private removeTipsTween;
        private showEffect;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import treasure_house_info = msg.treasure_house_info;
    import daolv_house_info = msg.daolv_house_info;
    interface IExchangeShopProxy extends IProxy {
        getHintByExchangeType(type: ExchangeShopType): boolean;
        c2s_exchange_shop_info(shop_type: number): void;
        c2s_exchange_shop_buy_prop(index: number, buy_cnt: number, shop_type?: number): void;
        getInfoByTypeIndex(index: number, type?: number): treasure_house_info | daolv_house_info;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    class ProgressBarComp extends BaseRenderer {
        thumb_preview: eui.Image;
        thumb: eui.Image;
        labelDisplay: eui.Label;
        gr_eft: eui.Group;
        private progressBar;
        private effIdx;
        private _max;
        isFirst: boolean;
        private _onceCallback;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private initBar;
        private checkRemoveEff;
        private finallyCallBack;
        private onceCallBack;
        protected dataChanged(): void;
        /**显示进度
         * type:文本类型，具体数值或者百分比
         * tweenTime: Tween时间
         * */
        show(value: number, max: number, tween?: boolean, lv?: number, isEff?: boolean, type?: ProgressBarType, onceCallback?: Handler, tweenTime?: number): void;
        /**显示进度预览*/
        showPreview(value: number): void;
        /**显示已满级*/
        showMax(): void;
        showLabel(str: string): void;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    import Group = eui.Group;
    class CommonProgressBar extends BaseRenderer {
        img_bg: eui.Image;
        thumb: eui.Image;
        labelDisplay: eui.Label;
        gr_eff: Group;
        fullHandler: Handler;
        overHandler: Handler;
        maxTimes: number;
        maxRate: number;
        tweenTime: number;
        maxTip: string;
        protected _lastValue: number;
        protected _lastMax: number;
        protected _record: number[][];
        protected _isTweening: boolean;
        protected _lastLv: number;
        private _thumbSrc;
        private _thumbSrcType;
        protected childrenCreated(): void;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        thumbSrc: string;
        private setThumbSrc;
        thumbSrcType: number;
        private setThumbSrcType;
        /**
         * 绑定回调
         * @param {base.Handler} full 每次满回调
         * @param {base.Handler} over 结束回调
         */
        setProHandler(full: Handler, over: Handler): void;
        /**
         * 赋值
         * @param {number} val
         * @param {number} max
         * @param {boolean} isTween
         * @param {number} lv，当前等级，当上下级的最大进度一致时需要用等级区分上下级
         */
        setProValue(val: number, max?: number, isTween?: boolean, lv?: number): void;
        /**
         * 清除数据
         */
        clearProData(): void;
        protected showProTween(val: number, max: number, isNext: boolean, lv: number): void;
        protected fullToShowNext(val: number, max: number, lv: number): void;
        protected checkToShowNext(val: number, max: number, lv: number): void;
        protected showRecordInfo(): void;
        protected setOverShow(val: number, max: number, lv: number): void;
    }
}
declare namespace game.mod {
    class Head extends BaseRenderer {
        img_head: eui.Image;
        gr_headEft: eui.Group;
        img_frame: eui.Image;
        gr_frameEft: eui.Group;
        redPoint: eui.Image;
        private _headEftId;
        private _frameEftId;
        private img_headmask;
        private _roleId;
        private _serverId;
        private _isRobot;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onClickHead;
        /**
         * 通用头像组件显示
         * @param head  头像idx
         * @param frame 头像框idx
         * @param sex 性别
         * @param roleId，玩家角色id(传这个参数时候，表示该头像可点击查看玩家信息)
         * @param serverId，玩家服务器id
         * @param isRobot，是否机器人
         */
        updateHeadShow(head: number | Long, frame: number | Long, sex?: number, roleId?: Long, serverId?: number, isRobot?: number): void;
        /**默认显示问号头像*/
        defaultHeadShow(): void;
        updateBossHeadShow(head: number | Long, frame: number | Long): void;
        updateImgHeadShow(img: string): void;
        updateHeadMask(headmask: string): void;
        /**显示自己的头像*/
        updateMyHead(): void;
        private setDressShow;
        setDressIconShow(idx: number, type: DressUpType, sex?: number): void;
        private clearHeadEft;
        private clearFrameEft;
    }
}
declare namespace game.mod {
    import teammate = msg.teammate;
    class HeadHP extends BaseRenderer {
        head: HeadVip;
        lab_name: eui.Label;
        progress: ProgressBarComp;
        constructor();
        updateMyHead(): void;
        updateShow(info: teammate): void;
        updateHP(value: number): void;
    }
}
declare namespace game.mod {
    class HeadKillView extends eui.Component {
        img_kill: eui.Image;
        img_frame0: eui.Image;
        img_head0: eui.Image;
        lab_name0: eui.Label;
        img_frame1: eui.Image;
        img_head1: eui.Image;
        lab_name1: eui.Label;
        constructor();
        /**
         * 更新击杀提示
         * @param msgInfo
         */
        updateShow(msgInfo: msg.s2c_scene_kill_notice): void;
    }
}
declare namespace game.mod {
    import teammate = msg.teammate;
    class HeadMvp extends BaseRenderer {
        private head;
        private lab_nobody;
        private lab_name;
        private lab_count;
        private lab_power;
        private img_power;
        private img_title;
        private grp_power;
        private readonly _defaultStr;
        private readonly _defaultMvp;
        constructor();
        updateMvp(data: HeadMvpData): void;
    }
    interface HeadMvpData {
        info: teammate;
        title?: string;
        /**xxx:%s */
        countStr?: string;
    }
}
declare namespace game.mod {
    class HeadVip extends BaseRenderer {
        head: game.mod.Head;
        grp_vip: eui.Group;
        gr_vipLv: eui.Group;
        grp_name: eui.Group;
        img_name: eui.Image;
        constructor();
        /**
         * 更新显示
         * @param head  头像idx
         * @param frame 头像框idx
         * @param sex 性别
         * @param vipId vipId
         * @param roleId，玩家角色id(传这个参数时候，表示该头像可点击查看玩家信息)
         * @param serverId，玩家服务器id
         * @param isRobot，是否机器人
         */
        updateShow(head: number | Long, frame: number | Long, sex?: number, vipId?: number, roleId?: Long, serverId?: number, isRobot?: number): void;
        /**默认显示问号头像*/
        defaultHeadShow(): void;
        /**显示自己的头像*/
        updateMyHead(): void;
        /**显示带名字的头像，不显示VIP*/
        updateName(head: number, frame: number, sex: number, nameStr: string): void;
        updateHeadMask(headmask: string): void;
    }
}
declare namespace game.mod {
    import Time = base.Time;
    import EventDispatcher = egret.EventDispatcher;
    import UpdateItem = base.UpdateItem;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Group = eui.Group;
    import DisplayObject = egret.DisplayObject;
    class SceneInUI extends Group implements UpdateItem {
        private _dispatcher;
        private _layerDown;
        private _layerAvatar;
        private _layerEffect;
        private _ctrl;
        constructor();
        readonly dispatcher: EventDispatcher;
        protected init(): void;
        protected initDsp(): void;
        private addLayer;
        private initScene;
        clean(): void;
        onStageResize(): void;
        addAvatar(obj: game.scene.BaseActor): void;
        removeAvatar(obj: game.scene.BaseActor): void;
        sortAvatar(): void;
        addBottomChild(obj: DisplayObject): void;
        removeBottomChild(obj: DisplayObject): void;
        addEftChild(obj: DisplayObject): void;
        removeEftChild(obj: DisplayObject): void;
        update(time: Time): void;
        readonly layerDown: DisplayObjectContainer;
        readonly layerEffect: DisplayObjectContainer;
    }
}
declare namespace game.mod {
    import Time = base.Time;
    /** EDIT BY YULIANG */
    class SceneInUICtrl {
        /** 基类只提供LayerAvatar层添加对象逻辑（特效Eft层 和 底图层添加对象，可以在子类中继承添加处理） */
        protected _scene: SceneInUI;
        protected _avatarDict: {
            [avatar_key: string]: game.scene.BaseActor;
        };
        constructor();
        init(scene: SceneInUI): void;
        addAvatar(avatar: game.scene.BaseActor, avatar_key: string): void;
        removeAvatar(avatar_key: string): void;
        clean(): void;
        update(time: Time): void;
    }
}
declare namespace game.mod {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Texture = egret.Texture;
    class SceneInUIMap extends DisplayObjectContainer {
        private _blur;
        private _mapId;
        private _sliceW;
        private _sliceH;
        private _mapWidth;
        private _mapHeight;
        private _sliceCol;
        private _sliceRow;
        private _curSC;
        private _curSR;
        private _curEC;
        private _curER;
        private readonly _bmpMap;
        private _curShow;
        constructor();
        init(mapId: number, map_params: number[]): void;
        setBlur(texture: Texture): void;
        updateTiles(sc: number, sr: number, ec: number, er: number): void;
        private loadOne;
        private updateBlur;
        clean(): void;
        private static ROW_SHIFT;
        private static LOW_WORD;
        private static NRM;
        private static getSliceId;
        private static getCol;
        private static getRow;
        private static centerCol;
        private static centerRow;
        static sortId(id1: number, id2: number): number;
    }
}
declare namespace game.mod {
    import Time = base.Time;
    class UISceneObj extends BaseRenderer {
        update(time: Time): void;
    }
}
declare namespace game {
    import rank_info = msg.rank_info;
    class ActivityUtil {
        static getType(): number;
        static getOpenIdx(type: number): number;
        static checkOpen(type?: number): boolean;
        static getRoleType(): number[];
        static checkRoleType(): boolean;
        static getSurfaceType(): number[];
        static checkSurfaceType(): boolean;
        static getPunshListEndTime(): number;
        static getRankTypeByOpenIdx(openIdx: number): number;
        static getOpenIdxs(): number[];
        static getSurfaceHintNodes(type: number): string[];
        static getRankFirst(): rank_info;
        static getFirstChargeCacheTimes(): boolean;
        /**天帝激活 */
        static getActivateByTiandi(type: number): boolean;
    }
}
declare namespace game.mod {
    class BagUtil {
        /**
         *  根据背包类型获取背包数据
         * @param type 背包类型
         * @param isSort 是否排序，默认不排序
         */
        static getBagsByType(type: BagType, isSort?: boolean): PropData[];
        /**
         *  根据背包类型，道具类型，获取背包数据
         * @param type 背包类型
         * @param propType 道具类型
         */
        static getBagsByTypeAndPropType(type: BagType, propType: PropType): PropData[];
        /**
         *  根据背包类型，道具子类型，获取背包数据
         * @param type 背包类型
         * @param propSubType 道具子类型
         * @param isSort 是否排序，默认不排序
         */
        static getBagsByTypeAndPropSubType(type: BagType, propSubType: number, isSort?: boolean): PropData[];
        /**
         *  根据背包类型，品质，获取背包数据
         * @param type 背包类型
         * @param minQuality 道具品质，小于当前品质的不取
         * @param maxQuality 道具品质，大于当前品质的不取
         */
        static getBagsByTypeAndQuality(type: BagType, minQuality: number, maxQuality?: number): PropData[];
        /**
         * 根据index获取背包内道具数量
         * @param index
         */
        static getPropCntByIdx(index: number): number;
        /**
         * 根据index获取背包内道具信息
         * @param index
         * @param isCalCount 是否统计数量，默认true
         */
        static getPropDataByIdx(index: number, isCalCount?: boolean): PropData;
        /**
         * 计算道具扣除消耗后数量
         * @param index 当前消耗道具index
         * @param pos 当前消耗道具下标
         * @param costInfoList 消耗信息列表
         * @param calcEquip 是否计算身上的装备
         */
        static calcPropCnt(index: number, pos: number, costInfoList: number[][], calcEquip?: boolean): number;
        /**
         *检查道具数量是否足够，一般红点使用
         * @param {number} index  道具index
         * @param {number} cnt   满足道具数量，默认1
         * @param tipsType  道具不足提示类型，默认不提示
         */
        static checkPropCnt(index: number, cnt?: number, tipsType?: PropLackType): boolean;
        /**
         *升级时候检查道具数量是否足够，会弹获取途径
         * @param {number} index  道具index
         * @param {number} cnt   满足道具数量
         */
        static checkPropCntUp(index: number, cnt?: number): boolean;
        /**
         *检测背包是否已满，装备背包会弹熔炼提示
         * @param type 背包类型，默认装备背包
         * @param tipsCnt 提示的数量
         */
        static checkBagFull(type?: number, tipsCnt?: number): boolean;
        /**
         *合并相同奖励道具
         * @param {PropData[]} rewards  奖励列表
         */
        static mergeRewards(rewards: PropData[]): PropData[];
        /**
         *转化奖励为PropData，并排序奖励
         * @param {PropData[]} rewards  奖励列表
         * @param sort 默认排序
         */
        static changeRewards(rewards: msg.prop_tips_data[], sort?: boolean): PropData[];
        /** */
        static getEasyUse(): PropData;
    }
}
declare namespace game.mod {
    import PoolObject = base.PoolObject;
    import Handler = base.Handler;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    class BtnTipsMgr {
        private static _instance;
        static getIns(): BtnTipsMgr;
        private _tipsMap;
        private _tips;
        showTips(data: BtnTipsData, parent?: DisplayObjectContainer): void;
        /**移除弹窗调用 会走销毁流程 不要直接调用deletTips */
        hideTips(idx: number): void;
        hideAllTips(): void;
        deletTips(idx: number): void;
        updatePos(btnIcon: BtnIconBase): void;
    }
    class BtnTipsBase extends eui.Component implements PoolObject {
        private data;
        private img_bg;
        private img_jian;
        private lb_tips;
        private readonly tween_scale;
        constructor();
        show(data: BtnTipsData, parent: DisplayObjectContainer): void;
        private addTween;
        /**
         * 更新tips气泡提示
         * @param tips
         * @param handler 点击事件，默认无
         * @param tween 缓动，默认无
         */
        updateShow(tips: string, handler?: Handler, tween?: boolean): void;
        private onClick;
        onAlloc(): void;
        onRelease(): void;
        dispose(): void;
    }
    interface BtnTipsData {
        idx: number;
        x: number;
        y: number;
        tips: string;
        handler: Handler;
        tween?: boolean;
    }
}
declare namespace game.mod {
    import ColorMatrixFilter = egret.ColorMatrixFilter;
    class FilterUtil {
        /**
         * 返回一个灰色滤镜
         */
        static getGrapFilter(): ColorMatrixFilter;
    }
}
declare namespace game.mod {
    import DisplayObject = egret.DisplayObject;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import Handler = base.Handler;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import PoolObject = base.PoolObject;
    class GuideMgr implements UpdateItem {
        private static _instance;
        static getIns(): GuideMgr;
        private _guideKey;
        private _target;
        private _finger;
        private _onTimeOut;
        private _pauseGuideKey;
        private _isPause;
        private _hasShowBack;
        private _delayGuide;
        private _startTime;
        private _guideType;
        private _arrowType;
        private _tipsTime;
        private _timeAuto;
        private readonly GROUP_NAME;
        private _timeTips;
        private _layer;
        firstFailedPass: boolean;
        private _isSpecialGuide;
        private _specialGuideMap;
        /**
         * @param guideKey，指引ID
         * @param target，需要指引的组件
         * @param onTimeOut，指引回调，策划配置了自动引导才会执行
         * @param pauseGuideKey，需要暂停执行的指引，指下一步指引
         * @param offset，指引位置偏移
         */
        show(guideKey: GuideKey, target: DisplayObject, onTimeOut?: Handler, pauseGuideKey?: number, offset?: {
            x?: number;
            y?: number;
        }): void;
        clear(guideKey: GuideKey): void;
        taskUpdate(): void;
        backMain(): void;
        triggerGuide(): void;
        hasGuideKey(guideKeyList: GuideKey[]): boolean;
        tips(): void;
        clearGuide(): void;
        private updateGuide;
        private isCurGuide;
        private isHasSpecialGuide;
        private isSpecialGuide;
        recordSpecialGuideMap(key: GuideKey): void;
        private isTipsGuide;
        private getGuideInfo;
        private checkAutoGuide;
        private getArrowType;
        private getGuideInfoList;
        private hasGuideInfoList;
        private isArrowTips;
        private checkGuideType;
        private addTopGroup;
        private delTopGroup;
        private onClickTopGroup;
        private execTimeOut;
        private resetStartTime;
        private resetTipsTime;
        update(time?: Time): void;
    }
    class GuideFinger extends DisplayObjectContainer implements PoolObject {
        private _finger;
        private _eftId;
        private _eftHub;
        constructor();
        show(target: DisplayObject, offset?: {
            x?: number;
            y?: number;
        }): void;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game.mod {
    class HintMgr {
        /**
         * 设置红点 （注意子节点key的唯一）
         * @param value，红点值
         * @param node 第一层为ModName，后序需要自身模块Def文件定义，例如ModName.Role_RoleViewType.RoleMain_RoleMainBtnType.BtnRole
         * @param openIdx，功能id，可缺省
         */
        static setHint(value: boolean, node: string[], openIdx?: number): void;
        /**
         * 获取红点
         * @param node
         */
        static getHint(node: string[]): boolean;
        /**
         * 根据功能idx获取红点
         * @param openIdx
         */
        static getHintByOpenIdx(openIdx: number): boolean;
        /**
         * 根据功能idx获取红点唯一key
         * @param openIdx
         */
        static getTypeByOpenIdx(openIdx: number): string;
        /**红点类型转换*/
        static getType(node: string[]): string;
        /**
         * 添加定时器事件
         * @param type：TimeEventType，定时器类型
         * @param time：到点执行的时间戳
         * @param proxy：自己的proxy
         * @param method：执行的方法
         * @param args：方法携带的参数
         */
        static addTimeEvent(type: number, time: number, proxy: any, method: Function, args?: any[]): void;
        /**
         * 是否存在定时器事件
         * @param type：TimeEventType，定时器类型
         */
        static hasTimeEvent(type: number): boolean;
        /**
         * 移除定时器事件
         * @param type：TimeEventType，定时器类型
         */
        static removeTimeEvent(type: number): void;
    }
}
declare namespace game.mod {
    import NewPrivilegeConfig = game.config.NewPrivilegeConfig;
    class PayUtil {
        /**获取礼包奖励*/
        static getRewards(productId: number): number[][];
        /**获取礼包特权配置*/
        static getPrivilegeCfgList(productId: number): NewPrivilegeConfig[];
        /**礼包是否已购买*/
        static hasBuy(productId: number): boolean;
        /**礼包是否已领取*/
        static hasReceived(productId: number): boolean;
        /**礼包是否可领取*/
        static canReceived(productId: number): boolean;
        /**礼包是否可领取*/
        static getBuyTimes(productId: number): number;
        /**领取奖励*/
        static drawReward(productId: number): void;
        /**获取商品价格*/
        static getRmbValue(productId: number): number;
        /**todo 获取单位，默认元*/
        static getRmbUnit(): string;
        /**获取商品原价*/
        static getFakeRmbValue(productId: number): number;
        /**获取商品名称*/
        static getPayName(productId: number): string;
        /**购买商品*/
        static pay(productId: number): void;
        /** 检查是否首充,todo*/
        static checkFirstCharge(): boolean;
        /** 判断是否能显示充值入口,todo*/
        static checkShowPay(): boolean;
        /** 判断是否显示礼包，一般首充后开启,todo*/
        static checkShowGift(productId: number): boolean;
        /**
         * 特权令是否全部购买
         * true：表示全购买了
         */
        static checkTequanling(): boolean;
    }
}
declare namespace game.mod {
    import PoolObject = base.PoolObject;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import UpdateItem = base.UpdateItem;
    import prop_tips_data = msg.prop_tips_data;
    class PropTipsMgr implements UpdateItem {
        private _tips;
        private _lastShowTime;
        private readonly DURATION;
        private SHOW_PER;
        private static _instance;
        props: PropTips[];
        private _prop_queue;
        private _isShowing;
        private _surface_queue;
        private _isShowSurface;
        private _delaySurface;
        private _pauseSurface;
        private _prop_queue_center;
        private _isShowingCenter;
        private _delayCenter;
        private _boss_queue;
        private _isShowBoss;
        private _delayBoss;
        private _pauseBoss;
        static getIns(): PropTipsMgr;
        /**黑底掉落*/
        show(drops: prop_tips_data[]): void;
        private showProps;
        private showTips;
        private checkNext;
        update(time: base.Time): void;
        /**清除黑底掉落*/
        clear(): void;
        clearData(): void;
        /**恭喜获得掉落*/
        showBestProp(drops: prop_tips_data[]): void;
        /**恭喜获得掉落，客户端读取配置时用*/
        showBestPropArray(datas: number[][]): void;
        private showNextBestProp;
        private popBestProp;
        closeBestProp(): void;
        /**获得外显*/
        showSurface(index: number, triggerGuide?: boolean): void;
        private showNextSurface;
        private popSurface;
        closeSurface(): void;
        pauseSurface(): void;
        continueSurface(): void;
        /**居中的恭喜获得掉落*/
        showBestPropCenter(drops: prop_tips_data[]): void;
        private startNextBestPropCenter;
        private showNextBestPropCenter;
        private popBestPropCenter;
        closeBestPropCenter(): void;
        /**BOSS开启*/
        showBoss(type: number, endTime: number): void;
        private showNextBoss;
        private popBoss;
        closeBoss(): void;
        continueBoss(): void;
    }
    class PropTips extends DisplayObjectContainer implements PoolObject {
        private readonly MIN_W;
        private _txt;
        private _imgBg;
        constructor();
        private initUI;
        show(item: prop_tips_data, index: number): void;
        private onTweenDone;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game.mod {
    import s2c_new_rank_info = msg.s2c_new_rank_info;
    import s2c_rank_info = msg.s2c_rank_info;
    class RankUtil {
        /**请求排行榜信息*/
        static c2s_new_rank_req_rank(rankType: number): void;
        /**请求领取大神榜 奖励*/
        static c2s_first_rank_award(rankType: number, index: number): void;
        /**获取排行榜信息*/
        static getRankInfo(rankType: number): s2c_new_rank_info;
        /**获取大神榜信息*/
        static getGodInfos(rankType: number): RankGodRenderData[];
        /**获取红点类型*/
        static getHintTypes(rankType: number): string[];
        /**新排行榜文本 */
        static getMyRankTypeDesc(rankType: number, powerCN?: boolean): string;
        /**新排行榜信息 */
        static getNewRankInfo(rankType: number): s2c_rank_info;
        static c2s_rank_req_rank(rankType: number, event_type?: number): void;
    }
}
declare namespace game.mod {
    import Handler = base.Handler;
    class RoleUtil {
        /**开服天数*/
        static getServerDay(): number;
        /**登录天数*/
        static getLoginDay(): number;
        /**获取当前周几，周日返回：7*/
        static getCurWeekDay(): number;
        /**
         * 向服务端请求属性，监听 MainEvent.UPDATE_COMMON_ATTR 更新数据
         * @param {number} index，策划配置的属性index
         * @param type 传1表示请求军团属性，默认不传
         * @returns {attributes}
         */
        static getAttr(index: number, type?: number): msg.attributes;
        /**
         * 向服务端请求属性列表，监听 MainEvent.UPDATE_COMMON_ATTR 更新数据
         * @param {number[]} indexList，策划配置的属性index
         * @param type 传1表示请求军团属性，默认不传
         * @returns {attributes[]}
         */
        static getAttrList(indexList: number[], type?: number): msg.attributes[];
        /**判断是否有某属性，只判断不请求*/
        static checkAttr(index: number): boolean;
        /**
         * 判断是否有某属性，只判断不请求
         * 全都有返回true，否则false
         */
        static checkAttrList(indexList: number[]): boolean;
        /**
         * 向服务端请求外显系统属性
         * @param openIdx，功能开启index
         */
        static getSurfaceAttr(openIdx: number): void;
        /**
         * 取得限制开启的文本描述
         * @param {number[]} info，策划配置的数值，限制类型_数值
         * @param {boolean} isColor, 默认显示颜色
         * @param {boolean} isProgress, 默认显示进度
         * @returns {string}
         */
        static getLimitStr(info: number[], isColor?: boolean, isProgress?: boolean): string;
        /**
         * 取得当前达成条件数值
         * @param {number} type，限制类型
         * @returns {number}
         */
        private static getLimitValueByType;
        /**
         * 当前限制条件是否满足
         * @param {number[]} info，策划配置的数值，限制类型_数值
         * @returns {boolean}
         */
        static isLimitOpen(info: number[]): boolean;
        /**X转X重，文本,比如：仙人1转1重
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        static getRebirthStr(index?: number): string;
        /**转生名字，文本
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        static getRebirthName(index?: number): string;
        /**转生转数
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        static getRebirthLv(index?: number): number;
        /**转生转数文本，X转
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        static getRebirthLvStr(index?: number): string;
        /**转生转数文本，不带转，如：仙人1
         * >=10 就是仙人转数了，比如：10就是仙人1转   【ID1015683】BOSS转生显示
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        static getRebirthLvStrNoZhuan(index?: number): string;
        /**转生重数
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        static getRebirthSubLv(index?: number): number;
        /**转生重数文本，X重
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        static getRebirthSubLvStr(index?: number): string;
        /**是否有特权*/
        static hasPrivilege(key: string): boolean;
        /**特权值，万分比*/
        static getPrivilegeValue(key: string): number;
        /**主角光环是否激活*/
        static isRoleRingAct(type?: RoleRingType): boolean;
        /**是否加入仙宗 */
        static isInUnion(): boolean;
        /**仙宗id */
        static getGuildId(): number;
        /**仙宗名字 */
        static getGuildName(): string;
        static getGuildJob(): number;
        /**战队id */
        static getTeamId(): Long;
        /**仙侣信息*/
        static getBanlvInfo(): msg.teammate;
        /**
         * 克隆数据
         */
        static clone(obj: any): any;
        static hasObj(obj: object): boolean;
        static calcGuanqia(index: number): number;
        /**添加修仙女仆的自动挑战副本*/
        static addAutoChallengeEvent(type: XiuxianNvpuEventType, handler: Handler): void;
        /**
         * 移除修仙女仆的自动挑战副本
         * @param type
         * @param isReset 当前正在处理类型==type且是特殊情况，马上重置处理下一轮，默认false。一般不需要传，退出副本或者关闭扫荡界面等，会重置处理下一轮。
         */
        static removeAutoChallengeEvent(type: XiuxianNvpuEventType, isReset?: boolean): void;
        /**当前正在处理的修仙女仆自动挑战副本类型*/
        static getAutoChallengeEventType(): XiuxianNvpuEventType;
        /**女仆是否激活，true为激活。isTips是否飘字，showConfirm是否展示确定弹窗*/
        static isNvpuAct(isTips?: boolean, showConfirm?: boolean): boolean;
        /**女仆神灵幻化等级*/
        static getNvpuShowIndex(): number;
        /**女仆神灵id*/
        static getNvpuShenlingId(): number;
        /**判断挂机类型勾选状态*/
        static isNvpuOnlineSelected(eventType: XiuxianNvpuEventType): boolean;
        /**修改勾选状态 selected表示勾选状态*/
        static setNvpuOnlineSetting(eventType: XiuxianNvpuEventType, selected: boolean): void;
        /**
         * god 仙力
         * cfgShowpower 配置表战力  包括道具表和属性表 的 Showpower
         * */
        static getSurfacePower(god: number, cfgShowpower: number): number;
    }
}
declare namespace game.mod {
    import SceneObjVo = game.scene.SceneObjVo;
    import MainGPlayerVo = game.scene.MainGPlayerVo;
    import MainGPlayer = game.scene.MainGPlayer;
    import Scene = game.scene.Scene;
    import BaseSceneObj = game.scene.BaseSceneObj;
    import SceneConfig = game.config.SceneConfig;
    import GPlayerVo = game.scene.GPlayerVo;
    class SceneUtil {
        private static _rewardInfo;
        /** 获取当前场景类型*/
        static getCurSceneType(): number;
        /** 获取当前场景idx*/
        static getCurSceneIdx(): number;
        /**
         * 根据id获取实体vo
         * @param id
         */
        static getVoByIdx(id: Long): SceneObjVo;
        static getVoByRoleId(roleId: Long, camp?: number): GPlayerVo;
        /** 主角Vo*/
        static getMainPlayerVo(): MainGPlayerVo;
        /** 主角Obj*/
        static getMainPlayerObj(): MainGPlayer;
        /** 场景Obj*/
        static getSceneObj(): Scene;
        static getSceneObjById(id: Long): BaseSceneObj;
        /** 场景Obj*/
        static getCurSceneCfg(): SceneConfig;
        /** 点击退出场景，实际上不退出场景，而是提前结算奖励*/
        static clickExit(): void;
        /** 退出场景*/
        static exitScene(): void;
        /** 显示主界面 UI */
        static isShowMain(): boolean;
        /** 清除奖励预览id */
        static resetReward(): void;
        static getReward(): number[];
        /** 设置奖励预览id
         * @param sceneType，场景类型
         * @param rewardId，奖励预览id
         * */
        static setReward(sceneType: number, rewardId: number): void;
        /** 归属者 */
        static getBelong(): msg.teammate;
        /** 最高伤害攻击者 */
        static getMaxHurt(): msg.teammate;
        /** 副本通用结束时间戳 */
        static getEndTime(): number;
        static requestControlAI(ret: ControlAIType): void;
        /** 是否是Pvp场景 */
        static isPvpScene(): boolean;
        /** 是否是对应场景 */
        static isSceneType(sceneType: number): boolean;
        /**
         * 场景震屏
         * @param times 震屏次数
         * @param times 震屏的时间
         */
        static shake(times?: number, time?: number): void;
        /**
         * 场景表中 atk_delay
         * @param sceneId 场景id
         */
        static atkDelay(): number;
        /**
         * 获取可攻击目标ID
         */
        static getAttackTargetId(showTips?: boolean): Long;
        /**
         * 使用技能
         */
        static useSkill(skillIdx: number, focus: Long, type?: number[], x?: number, y?: number, tx?: number, ty?: number): void;
    }
}
declare namespace game.mod {
    import Scroller = eui.Scroller;
    class ScrollUtil {
        private static readonly SCROLL_SPEED;
        static readonly SCROLL_DIR_LEFT: number;
        static readonly SCROLL_DIR_RIGHT: number;
        /**
         * 左右按钮显示与红点
         * @param {Scroller} scroller 滚动窗
         * @param {Button} btn_last 左按钮
         * @param {Button} btn_next 右按钮
         * childWidth：item宽度
         * @param {boolean} showHint 显示红点
         * */
        static changeBtnShow(scroller: Scroller, btn_last: Btn, btn_next: Btn, childWidth: number, showHint?: boolean): void;
        private static checkHint;
        /**
         * 水平滚动
         * @param {Scroller} scroller 滚动窗
         * @param {number} dir 1左 2右
         * @param {number} time 动画时间
         * */
        static moveH(scroller: Scroller, dir: number, time?: number): void;
        /**
         * 垂直滚动
         * @param {Scroller} scroller 滚动窗
         * @param {number} dir 1上 2下
         * @param {number} time 动画时间
         * */
        static moveV(scroller: Scroller, dir: number, time?: number): void;
        /** 水平移动到指定位置
         * scroller : 滚动条
         * pos ： 列表的index，0开始
         * childWidth：item宽度
         * time：滚动的时间
         * */
        static moveHToAssign(scroller: Scroller, pos: number, childWidth: number, time?: number): void;
        /** 垂直移动到指定位置
         * notReset：默认重置scrollV
         * maxScrollV: 默认计算最大ScrollV*/
        static moveVToAssign(scroller: Scroller, pos: number, childHeight: number, time?: number, child?: number, notReset?: boolean, maxScrollV?: boolean): void;
    }
}
declare namespace game.mod {
    import ShopConfig = game.config.ShopConfig;
    import DirectShopConfig = game.config.DirectShopConfig;
    class StoreUtil {
        private static _storeMap;
        /**
         * 根据类型获取对应的商店数据
         * @param type
         */
        static getStoreCfgListByType(type: StoreType): ShopConfig[];
        /**
         * 商品是否展示
         * @param cfg
         */
        static checkStoreCfgShow(cfg: ShopConfig): boolean;
        private static _directShopMap;
        /**
         * 获取 direct_shop 配置
         * @param type DirectShopType
         */
        static getDirectShopCfgListByType(type: DirectShopType): DirectShopConfig[];
        /**兑换信息请求 */
        static c2s_exchange_shop_info(shop_type: number): void;
        static c2s_exchange_shop_buy_prop(index: number, shop_type: number, buy_cnt: number): void;
        static getInfoByTypeIndex(index: number, shop_type?: number): msg.treasure_house_info | msg.daolv_house_info;
    }
}
declare namespace game.mod {
    class SurfaceUtil {
        private static _proxy;
        private static _sProxy;
        private static _lProxy;
        private static initProxy;
        /**
         *外显是否激活
         * @param index，外显index
         */
        static isAct(index: number): boolean;
        /**
         *获取外显星级
         * @param index，外显index
         */
        static getStar(index: number): number;
        /**
         * 获取配置最大星级
         * @param index
         */
        static getMaxStar(index: number): number;
        /**
         * 外显能否激活或升星
         * @param index 外显id
         * @param isShenlingAwaken 是否包含神灵觉醒阶段的升星，默认不包含
         */
        static canUpStar(index: number, isShenlingAwaken?: boolean): boolean;
        /**主动技能*/
        static getSurfaceSkillId(headType: number): number;
        /**外显等级计算阶级*/
        static calcSurfaceStage(lv: number, headType: number): number;
        /**
         * 获取当前玩家的神灵进化次数或女仆神灵幻化等级
         * @param index
         */
        static getShenlingEvolution(index: number): number;
        /**
         * 获取神灵信息
         * @param index
         * @param evolutions 神灵进化次数或者女仆神灵幻化等级。不传则使用当前玩家的
         */
        static getShenlingModelData(index: number, evolutions?: number): ShenlingModelData;
    }
}
declare namespace game.mod {
    import task_data = msg.task_data;
    import MainTask1Config = game.config.MainTask1Config;
    class TaskUtil {
        /**
         *获取任务
         * @param taskId
         */
        static getTask(taskId: number): task_data;
        /**
         * 获取任务列表
         * @param type, 任务类型
         * @param isSort, 是否排序，默认排好序
         * @param isMerge, 是否合并任务，默认不合并
         */
        static getTaskList(type: number, isSort?: boolean, isMerge?: boolean): task_data[];
        private static getMergeType;
        /**
         * 获取任务列表红点
         * @param type, 任务类型
         */
        static getTaskHint(type: number): boolean;
        /** 获取任务描述，包含进度（0/2）*/
        static getTaskDesc(task: task_data, blackColor?: boolean): string;
        /** 获取任务描述，不包含进度 */
        static getTaskDescNotSchedule(task: task_data): string;
        /** 获取任务进度显示，（0/2） */
        static getTaskSchedule(task: task_data, blackColor?: boolean): string;
        /**点击任务，eftBtn: 特效起始按钮*/
        static clickTask(task: task_data, eftBtn?: eui.Component): void;
        /**快速完成任务*/
        static quickTask(task: task_data): void;
        /**任务奖励是否可领取*/
        static canRewardDraw(task: task_data): boolean;
        /**任务奖励是否已领取*/
        static hasRewardDraw(task: task_data): boolean;
        /**任务奖励是否已全部领取*/
        static hasRewardAllDraw(type: number): boolean;
        /** 获取任务类型*/
        static getTaskType(taskId: number): number;
        /** 获取任务配置*/
        static getCfg(taskId: number): MainTask1Config;
        /** 获取任务奖励 */
        static getTaskReward(taskId: number): number[][];
        /**
         *获取主线任务
         */
        static getMainTask(): task_data;
        static drawRewardByType(type: number): void;
    }
}
declare namespace game.mod {
    import IProxy = base.IProxy;
    import oper_act_item = msg.oper_act_item;
    interface IFlyRankProxy extends IProxy {
        getRankProp(actInfo: oper_act_item): number;
    }
}
declare namespace game.mod {
    class VipUtil {
        /**获取VIP、SVIP图标*/
        static getShowVipMainBg(vipId: number): string;
        /**获取VIP等级，缺省表示自己的VIP等级*/
        static getShowVipLv(vipId?: number): number;
        /**获取VIP、SVIP文本，例如：VIP1*/
        static getVipStr(vipId?: number): string;
        /**获取VIP、SVIP字体*/
        static getVipFont(vipId?: number): string;
        /**VIP提示弹窗，vip等级不足，是否前往提升？*/
        static showTips(): void;
        private static vipRmbMap;
        /**
         * 购买后可达vip等级
         * @param rmb 金额
         */
        static getNextVipByPay(rmb: number): number;
    }
}
declare namespace game.mod {
    class WebReqUtil {
        /** 点击shouq意见反馈 */
        static onClickFeedBack(qq: string, content: string, cb: (obj: any) => void, type?: number, images?: string[]): void;
        static getFeekBackUrl(): string;
        private static encodeUriData;
    }
}
