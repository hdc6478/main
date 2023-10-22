namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import DisplayObject = egret.DisplayObject;
    import Pool = base.Pool;
    import Handler = base.Handler;
    import Rectangle = egret.Rectangle;
    import GameNT = base.GameNT;
    import delayCall = base.delayCall;

    export class EffectMdrBase extends MdrBase {
        protected _effHub: UIEftHub;
        private _eftId: number;//特效

        protected addListeners(): void {
            super.addListeners();

            this.onNt(MainEvent.COMMON_ADD_EFT, this.updateAddEft, this);//特效飞动
        }

        protected newView(): void {
            super.newView();
            this._effHub = new UIEftHub(<DisplayObjectContainer>this.getView());
        }

        protected clearFont(container: DisplayObjectContainer, clearRef: boolean = true): void {
            this._effHub.clearFont(container, clearRef);
        }

        /**
         * 添加字体
         * @param text 显示的文本
         * @param font 字体
         * @param container 存放字体的容器，一般为Group
         * @param horizontal 默认水平显示
         * @param scale 缩放，默认1
         * @param center 默认不居中显示
         * @param gap 字体间隔，默认0
         * @param expandParent 默认不设置container大小
         */
        protected addBmpFont(text: string, font: string, container: DisplayObjectContainer, horizontal: boolean = true, scale: number = 1, center: boolean = false, gap: number = 0, expandParent: boolean = false): void {
            this._effHub.addBmpFont(text, font, container, horizontal, scale, center, gap, expandParent);
        }

        protected addEft(src: string, x: number, y: number, cb: Handler = null, times: number = 1, idx: number = -1, scale: number = 1, autoRemove: boolean = true, speed: number = 1): number {
            return this._effHub.add(src, x, y, cb, times, null, idx, scale, autoRemove, speed);
        }
        /**
         * 添加特效
         * @param src 特效资源，UIEftSrc
         * @param parent 存放特效的Group
         * */
        protected addEftByParent(src: string, parent: DisplayObjectContainer, x: number = 0, y: number = 0,
                                 idx: number = -1, cb: Handler = null, times: number = 0, scale: number = 1, autoRemove = true, speed: number = 1,
                                 isMirror:boolean = false,scaleXBmpOffX:number = 0, rotation?: number): number {
            this._eftId = this._effHub.add(src, x, y, cb, times, parent, idx, scale, autoRemove, speed,isMirror,scaleXBmpOffX, rotation);
            return this._eftId;
        }

        /**
         * 添加特效
         * @param parent 存放特效的Group
         * */
        protected addEftByParentScale(parent: DisplayObjectContainer){
            this.addEftByParent(UIEftSrc.ShouChongQianWang,parent);
        }

        /**
         * 添加特效
         * @param src 特效资源，UIEftSrc
         * @param parent 存放特效的Group
         * */
        protected addEftByParent2(src: string, parent: DisplayObjectContainer,
                                 isMirror:boolean = false,scaleXBmpOffX:number = 0): number {
            this._eftId = this._effHub.add(src, 0, 0, null, 0, parent, -1,
                 1, true, 1,
                isMirror,scaleXBmpOffX);
            return this._eftId;
        }

        protected addEftByDsp(src: string, display: DisplayObject, idx: number = -1, cb: Handler = null, times: number = 0, scale: number = 1): number {
            let rect = display.getTransformedBounds(this.getView(), Pool.alloc(Rectangle));
            let x = display.width * 0.5 + rect.x;
            let y = display.height * 0.5 + rect.y;
            Pool.release(rect);
            return this._effHub.add(src, x, y, cb, times, null, idx, scale);
        }

        protected stopEffect(id: number): void {
            this._effHub.stopEffect(id);
        }

        protected playEffect(id: number): void {
            this._effHub.playEffect(id);
        }

        protected checkEffectPlaying(id: number): boolean {
            return this._effHub.isPlaying(id);
        }

        protected removeEffect(id: number): void {
            if (!id) {
                return;
            }
            this._effHub.removeEffect(id);
        }

        public getEffHub(): UIEftHub {
            return this._effHub;
        }

        public getEffectById(id: number): UIAnimate {
            return this._effHub.getEffectById(id);
        }

        //子类重写，调用setAddEft()
        protected updateAddEft(n:GameNT):void{
        }

        //子类调用setAddEft()
        /**efftContainer：一般是View
         * group_eft1：按钮组件特效容器
         * dest：特效的终点*/
        protected setAddEft(efftContainer:eui.Component,group_eft1:eui.Group,dest:{x:number,y:number}): void {
            let self = this;
            delayCall(Handler.alloc(this, function (){
                self.addRotationEfft(UIEftSrc.Richang_1,efftContainer,group_eft1,dest,-350,0,-10);
            }), 200);

            self.addRotationEfft(UIEftSrc.Richang_1,efftContainer,group_eft1,dest,-350,-20,0);

            delayCall(Handler.alloc(this, function (){
                self.addRotationEfft(UIEftSrc.Richang_1,efftContainer,group_eft1,dest,-350,0,10);
            }), 200);
        }

        private addRotationEfft(src:string,efftContainer:eui.Component,group_eft1:eui.Group,dest:{x:number,y:number},
                      anchorOffsetX = 0,offX:number = 0,offY:number = 0):void{

            let pos = group_eft1.localToGlobal();

            //按钮正中心
            let pos2  = efftContainer.globalToLocal(pos.x,pos.y);

            pos2.x += offX;
            pos2.y += offY;

            //目标中心点

            let eftId = this.addEftByParent(src,efftContainer,0, 0, -1, null, 1);
            let ani:UIAnimate = this.getEffectById(eftId);

            let bmp = ani.bmp;
            let dis = PointUtil.distance(pos2.x,pos2.y,dest.x,dest.y);
            bmp.width = dis;

            ani.x = pos2.x;
            ani.y = pos2.y;
            ani.anchorOffsetX = anchorOffsetX;

            let angle = PointUtil.angle(pos2.x,pos2.y,dest.x,dest.y)*180/Math.PI;
            ani.rotation = angle;
        }

        protected onHide(): void {
            this._effHub.clearAllFont();
            this._effHub.removeAllEffects();
            game.scene.SkillEftMgr.ins.resetUIEf();
            super.onHide();
        }

        public removeAllEffects() {
            this._effHub.removeAllEffects();
        }

        //对外移除特效接口
        protected removeEft() {
            if (this._eftId) {
                this.removeEffect(this._eftId);
                this._eftId = null;
            }
        }

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
         * @param otherRole 新的模型，用于展示两个玩家，默认false
         * @param isSingle 翅膀和神兵模型区分UI显示 默认true
         */
        public updateUIRole(parent: DisplayObjectContainer, fashion: number, weapon: number, wing: number, sex: number,
                             scale: number = 1.1, dir: number = Direction.DOWN, act: string = ActionName.STAND,
                             isUi: boolean = true, otherRole: boolean = false, isSingle: boolean = true): void {

            let body: string = ResUtil.getModelName(fashion, sex);//时装区分性别
            let weaponStr: string = ResUtil.getModelName(weapon);//神兵ui模型有两套，一套身上，一套独立显示
            let wingStr: string = ResUtil.getModelName(wing, sex, isSingle);//羽翼只有一套，取单独显示的
            this._effHub.updateUIRole(body, weaponStr, wingStr, parent, scale, dir, act, isUi, otherRole);
        }

        /**
         * 添加外显模型接口
         * @param index 外显index
         * @param parent 存放外显的容器，一般为Group
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param isWeapon 是否是武器，默认false
         * @param isGray 是否置灰，默认false
         * @param cb 动作播放完的回调
         * @param times 动作播放次数
         */
        public addAnimate(index: number, parent: DisplayObjectContainer, dir: number = Direction.DOWN, act: string = ActionName.STAND,
                          isUi: boolean = true, isWeapon: boolean = false, isGray: boolean = false, cb?: Handler, times?: number): number {
            return this._effHub.addAnimate(index, parent, dir, act, isUi, isWeapon, isGray, cb, times);
        }

        /**
         * 添加怪物模型接口
         * @param index 怪物index
         * @param parent 存放外显的容器，一般为Group
         */
        public addMonster(index: number, parent: DisplayObjectContainer): number {
            return this._effHub.addMonster(index, parent);
        }
        public addMonsterByRes(res: string, parent: DisplayObjectContainer, dir: number = Direction.RIGHT_DOWN, act: string = ActionName.STAND): number {
            return this._effHub.addMonsterByRes(res, parent, dir, act);
        }

        /**
         * 添加自己角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param scale 缩放，默认1.1
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param isSingle 翅膀和神兵模型区分UI显示 默认true
         */
        public updateSelfUIRole(parent: DisplayObjectContainer, scale: number = 1.1, dir: number = Direction.DOWN,
                                act: string = ActionName.STAND, isUi: boolean = true, isSingle: boolean = true): void {
            let vo = RoleVo.ins;

            this.updateUIRole(parent, vo.fashion, vo.weapon, vo.wing, vo.sex, scale, dir, act, isUi, false, isSingle);
        }

        /**
         * 添加排行榜角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param info 通用排行榜外显
         * @param scale 缩放，默认1.1
         * @param otherRole 新的模型，用于展示两个玩家，默认false
         */
        public updateRankUIRole(parent: DisplayObjectContainer, info: msg.teammate | RankUIRoleData, scale: number = 1.1, otherRole: boolean = false): void {
            this.updateUIRole(parent, info.fashion, info.weapon, info.wing, info.sex, scale, Direction.DOWN, ActionName.STAND, true, otherRole);
        }

        //额外设置 UI 属性
        public updateUIRoleAtr(isLoop: boolean = true, handler: Handler = null): void {
            this._effHub.updateUIRoleAtr(isLoop, handler);
        }

        //播放玩家攻击动作，不需要翅膀
        public updateRoleAct(parent: DisplayObjectContainer, dir: number = Direction.DOWN, act: string = ActionName.STAND, isLoop:boolean = true, handler:Handler = null): void {
            let vo = RoleVo.ins;
            this.updateUIRole(parent, vo.fashion, vo.weapon, null, vo.sex, 1, dir, act, false);
            this.updateUIRoleAtr(isLoop,handler);
        }
    }

    /**角色模型显示接口*/
    export interface RankUIRoleData {
        /**时装*/
        fashion?: number,
        /**神兵*/
        weapon?: number,
        /** 羽翼 */
        wing?: number,
        /**性别*/
        sex?: number,
    }
}
