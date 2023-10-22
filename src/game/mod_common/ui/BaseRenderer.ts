namespace game.mod {
    import Handler = base.Handler;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Pool = base.Pool;
    import DisplayObject = egret.DisplayObject;
    import Rectangle = egret.Rectangle;

    export class BaseRenderer extends BaseListenerRenderer {
        private _effHub: UIEftHub;
        private _eftId: number;//特效
        protected eftSrc: string;//特效资源，外部可访问

        constructor() {
            super();
            this._effHub = new UIEftHub(this);
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
            this.onHide();
        }

        protected clearFont(container: DisplayObjectContainer, clearRef: boolean = true): void {
            this._effHub.clearFont(container, clearRef);
        }

        protected addBmpFont(text: string, font: string, container: DisplayObjectContainer, horizontal: boolean = true, scale: number = 1, center: boolean = false, gap = 0, expandParent = false): void {
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
            idx: number = -1, cb: Handler = null, times: number = 0, scale: number = 1, autoRemove: boolean = true, speed: number = 1): number {
            this.eftSrc = src;
            this._eftId = this._effHub.add(src, x, y, cb, times, parent, idx, scale, autoRemove, speed);
            return this._eftId;
        }

        /**
         * 添加特效
         * @param parent 存放特效的Group
         * */
        protected addEftByParentScale(parent: DisplayObjectContainer) {
            this.addEftByParent(UIEftSrc.ShouChongQianWang, parent);
        }


        protected addEftByDsp(src: string, display: DisplayObject, idx: number = -1, cb: Handler = null, times: number = 0): number {
            let rect = display.getTransformedBounds(this, Pool.alloc(Rectangle));
            let x = display.width * 0.5 + rect.x;
            let y = display.height * 0.5 + rect.y;
            Pool.release(rect);
            return this._effHub.add(src, x, y, cb, times, null, idx);
        }

        protected stopEffect(id: number) {
            this._effHub.stopEffect(id);
        }

        protected removeEffect(id: number | string) {
            this._effHub.removeEffect(id);
        }

        protected removeAllEffects() {
            this._effHub.removeAllEffects();
        }

        public getEffectById(id: number): UIAnimate {
            return this._effHub.getEffectById(id);
        }

        private onHide(): void {
            this._effHub.clearAllFont();
            this._effHub.removeAllEffects();
        }

        //对外移除特效接口
        protected removeEft() {
            if (this._eftId) {
                this.removeEffect(this._eftId);
                this._eftId = null;
            }
            this.eftSrc = null;
        }

        /**
         * 添加模型接口
         * @param index 外显index
         * @param parent 存放外显的容器，一般为Group
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         */
        public addAnimate(index: number, parent: DisplayObjectContainer, dir: number = Direction.DOWN, act: string = ActionName.STAND, isUi: boolean = true): number {
            return this._effHub.addAnimate(index, parent, dir, act, isUi);
        }
        /**
         * 添加怪物模型接口
         * @param index 怪物index
         * @param parent 存放外显的容器，一般为Group
         */
        public addMonster(index: number, parent: DisplayObjectContainer): number {
            return this._effHub.addMonster(index, parent);
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
         */
        protected updateUIRole(parent: DisplayObjectContainer, fashion: number, weapon: number, wing: number, sex: number,
            scale: number = 1.1, dir: number = Direction.DOWN, act: string = ActionName.STAND, isUi: boolean = true): void {

            let body: string = ResUtil.getModelName(fashion, sex);//时装区分性别
            let weaponStr: string = ResUtil.getModelName(weapon);//神兵ui模型有两套，一套身上，一套独立显示
            let wingStr: string = ResUtil.getModelName(wing, sex, true);//羽翼只有一套，取单独显示的
            this._effHub.updateUIRole(body, weaponStr, wingStr, parent, scale, dir, act, isUi);
        }
        /**
         * 添加自己角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param scale 缩放，默认1.1
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         */
        public updateSelfUIRole(parent: DisplayObjectContainer, scale: number = 1.1, dir: number = Direction.DOWN,
            act: string = ActionName.STAND, isUi: boolean = true): void {
            let vo = RoleVo.ins;
            this.updateUIRole(parent, vo.fashion, vo.weapon, vo.wing, vo.sex, scale, dir, act, isUi);
        }

        /**
         * 添加排行榜角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param info 通用排行榜外显
         * @param scale 缩放，默认1.1
         */
        public updateRankUIRole(parent: DisplayObjectContainer, info: msg.teammate | RankUIRoleData, scale: number = 1.1): void {
            this.updateUIRole(parent, info.fashion, info.weapon, info.wing, info.sex, scale);
        }

        //额外设置 UI 属性
        public updateUIRoleAtr(isLoop: boolean = true, handler: Handler = null): void {
            this._effHub.updateUIRoleAtr(isLoop, handler);
        }
    }
}
