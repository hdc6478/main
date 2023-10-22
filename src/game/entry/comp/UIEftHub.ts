namespace game {
    import Handler = base.Handler;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Pool = base.Pool;
    import HorseConfig = game.config.HorseConfig;
    import Monster1Config = game.config.Monster1Config;
    import HuashenConfig = game.config.HuashenConfig;

    type FontData = { container: DisplayObjectContainer, url: string, text: string, font: string, horizontal: boolean, scale: number, center: boolean, gap: number, expandParent: boolean };

    export class UIEftHub {
        private readonly _host: DisplayObjectContainer;
        private _id: number;
        private readonly _effect: { [id: number]: { animate: UIAnimate, cb?: Handler, autoRemove: boolean } };

        private _uiRole: UIAvatar;
        private _uiRoleOther: UIAvatar;

        private readonly _fontData: { [key: number]: FontData };

        constructor(host: DisplayObjectContainer) {
            this._host = host;
            this._effect = {};
            this._id = 0;
            this._fontData = {};
        }

        public clearFont(container: DisplayObjectContainer, clearRef: boolean): void {
            let self = this;
            let id: number = container.hashCode;
            if (clearRef && self._fontData[id]) {
                let url: string = self._fontData[id].url;
                if (url) {
                    LoadMgr.ins.decRef(url);
                }
                self._fontData[id] = null;
                delete self._fontData[id];
            }
            for (let i = container.numChildren - 1; i >= 0; i--) {
                let c = container.removeChildAt(i);
                if (c instanceof BitmapBase) {
                    Pool.release(c);
                }
            }
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
        public addBmpFont(text: string, font: string, container: DisplayObjectContainer, horizontal: boolean = true, scale: number = 1, center: boolean = false, gap: number = 0, expandParent: boolean = false): void {
            let self = this;
            let id: number = container.hashCode;
            let url = ResUtil.getFontUiUrl(font);
            let obj: FontData = self._fontData[id];
            if (!obj) {
                self._fontData[id] = obj = {container, text, font, url, horizontal, scale, center, gap, expandParent};
            } else {
                obj.text = text;
                obj.font = font;
                obj.url = url;
                obj.horizontal = horizontal;
                obj.scale = scale;
                obj.gap = gap;
                obj.expandParent = expandParent;
            }
            LoadMgr.ins.addRef(url);
            let data: MergedBmp = LoadMgr.ins.getRes(url);
            if (data) {
                self.updateFont(obj, data);
            } else {
                LoadMgr.ins.loadMerge(url, Handler.alloc(self, self.onLoadedFont), LoadPri.UI);
            }
        }

        private onLoadedFont(data: MergedBmp, url: string): void {
            let keys = Object.keys(this._fontData);
            for (let k of keys) {
                let obj = this._fontData[k];
                let _url = obj.url;
                if (_url != url) {
                    continue;
                }
                this.updateFont(obj, data);
            }
        }

        private updateFont(obj: FontData, data: MergedBmp): void {
            let container: DisplayObjectContainer = obj.container;
            let text: string = obj.text;
            let gap: number = obj.gap || FontGap[obj.font] || 0;
            let numChildren: number = container.numChildren;
            let textLen: number = text.length;
            let bmp: BitmapBase;

            // while (numChildren > textLen) {
            //     Pool.release(<BitmapBase>container.getChildAt(numChildren - 1));
            //     numChildren--;
            // }
            // while (numChildren < textLen) {
            //     container.addChild(Pool.alloc(BitmapBase));
            //     numChildren++;
            // }

            let disNum = numChildren-textLen;
            if(disNum != 0){
                let disAbs = Math.abs(disNum);
                for(let i = 0;i < disAbs;i++){
                    if(disNum < 0){
                        //追加
                        container.addChild(Pool.alloc(BitmapBase));
                    }else{
                        //删除
                        Pool.release(<BitmapBase>container.getChildAt(disAbs-i));
                    }
                }
            }

            let totalWidth: number = 0;
            let totalHeight: number = 0;
            let texW: number = 0;
            let texH: number = 0;
            let bmpY = 0;
            let bmpX = 0;
            if (obj.horizontal) {
                let maxHeight: number = container.height;
                for (let i = 0, l = text.length; i < l; ++i) {
                    bmp = <BitmapBase>container.getChildAt(i);
                    bmp.texture = text[i] == " " ? null : data.getTexture(text[i]);
                    texW = bmp.texture ? bmp.texture.textureWidth : 10;
                    texH = bmp.texture ? bmp.texture.textureHeight : 0;
                    totalWidth += texW;
                    bmp.x = bmpX;
                    bmp.width = texW;
                    bmp.height = texH;
                    bmpX += (texW + gap) * obj.scale;
                    bmp.scaleX = bmp.scaleY = obj.scale;
                    maxHeight = Math.max(texH, maxHeight);
                    if(obj.expandParent && i == l -1){
                        container.width = bmp.x + bmp.width * bmp.scaleX;//设置容器大小
                    }
                }
                container.height = maxHeight;
                for (let i = 0, l = container.numChildren; i < l; ++i) {
                    bmp = <BitmapBase>container.getChildAt(i);
                    bmp.y = (maxHeight - bmp.height) / 2;//居中显示
                }
            } else {
                let maxWidth: number = container.width;
                for (let i = 0, l = text.length; i < l; ++i) {
                    bmp = <BitmapBase>container.getChildAt(i);
                    bmp.texture = data.getTexture(text[i]);
                    texW = bmp.texture.textureWidth;
                    texH = bmp.texture.textureHeight;
                    totalHeight += texH;
                    bmp.y = bmpY;
                    bmpY += (texH + gap) * obj.scale;
                    bmp.scaleX = bmp.scaleY = obj.scale;
                    maxWidth = Math.max(texW, maxWidth);
                    if(obj.expandParent && i == l -1){
                        container.height = bmp.y + bmp.height * bmp.scaleY;//设置容器大小
                    }
                }
                container.width = maxWidth;
                for (let i = 0, l = container.numChildren; i < l; ++i) {
                    bmp = <BitmapBase>container.getChildAt(i);
                    bmp.x = (maxWidth - bmp.width) / 2;//居中显示
                }
            }
            if (obj.center) {
                let offset = (obj.horizontal ? totalWidth : totalHeight) / 2 * obj.scale;
                for (let i = 0, l = container.numChildren; i < l; ++i) {
                    bmp = <BitmapBase>container.getChildAt(i);
                    obj.horizontal ? bmp.x -= offset : bmp.y -= offset;
                }
            }
            // if (obj.expandParent) {
            //     obj.horizontal ? (obj.container.width = bmpX) : (obj.container.height = bmpY);
            // }
        }

        public clearAllFont(): void {
            let self = this;
            let keys = Object.keys(self._fontData);
            for (let k of keys) {
                self.clearFont(self._fontData[k].container, true);
            }
        }

        public stopEffect(id: number): void {
            let e = this._effect[id];
            if (e) {
                e.animate.stop();
            }
        }

        public playEffect(id: number): void {
            let e = this._effect[id];
            if (e) {
                e.animate.play();
            }
        }

        public isPlaying(id: number) {
            let e = this._effect[id];
            if (e) {
                return e.animate.playing;
            }
            return false;
        }

        public getEffectById(id: number | string): UIAnimate {
            let effect = this._effect[id];
            if (!effect) {
                return null;
            }
            return effect.animate;
        }

        public removeEffect(id: number | string): void {
            let effect = this._effect[id];
            this._effect[id] = null;
            if (effect && effect.animate.id2) {
                this.removeEffect(effect.animate.id2);
                effect.animate.id2 = null;
            }
            delete this._effect[id];
            if (effect) {
                if (effect.animate.parent) {
                    effect.animate.parent.removeChild(effect.animate);
                }
                if (effect.cb) {
                    Pool.release(effect.cb);
                    effect.cb = null;
                }
                Pool.release(effect.animate);
            }
        }

        private removeAvatar(role: UIAvatar): void {
            if (role) {
                role.scaleX = role.scaleY = 1;
                Pool.release(role);
            }
        }

        public removeAllEffects() {
            let self = this;
            self.removeAvatar(self._uiRole);
            self._uiRole = null;
            if (this._uiRoleOther) {
                self.removeAvatar(this._uiRoleOther);
                this._uiRoleOther = null;
            }

            for (let k in self._effect) {
                self.removeEffect(k);
            }
        }

        public add(src: string, x: number, y: number, cb: Handler, times: number, parent: DisplayObjectContainer, idx: number,
                   scale: number = 1, autoRemove: boolean = true, speed: number = 1,
                   isMirror:boolean = false,scaleXBmpOffX:number = 0, rotation?: number): number {
            if (!src) {
                return 0;
            }
            let self = this;
            let id = ++self._id;
            let animate = Pool.alloc(UIAnimate);
            let source: string = src.indexOf("assets") > -1 ? src : ResUtil.getEffectUI(src);
            animate.x = x;
            animate.y = y;
            animate.id = id;
            animate.times = times;
            animate.scaleX = animate.scaleY = scale;
            animate.speed = speed;
            animate.complete = Handler.alloc(self, self.onPlayComp);
            if(rotation){
                animate.rotation = rotation;
            }
            parent = parent || self._host;
            if (idx >= 0) {
                parent.addChildAt(animate, idx);
            } else {
                parent.addChild(animate);
            }
            self._effect[id] = {animate, cb, autoRemove};
            let frameRate: number = UIEftSrcFrame[src] || 12;
            animate.load(source, frameRate,false,isMirror,scaleXBmpOffX);
            return id;
        }

        private onPlayComp(animate: UIAnimate): void {
            if (!animate) {
                return;
            }
            let effect = this._effect[animate.id];
            if (!effect) {
                return;
            }
            let cb = effect.cb;
            effect.cb = null;
            if (effect.autoRemove) {
                this.removeEffect(animate.id);
            }
            if (cb) {
                cb.exec();
                Pool.release(cb);
            }
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
            /**坐骑模型统一处理*/
            let headType = PropData.getPropParse(index, PropParseType.Type);
            if(headType == ConfigHead.Horse){
                dir = Direction.RIGHT_DOWN;
                isUi = false;
            }

            let id = ++this._id;
            let animate = Pool.alloc(UIAnimate);
            let data = ResUtil.getSurfaceData(index, dir, act, isUi, isWeapon);
            animate.id = id;
            animate.x = data.x || 0;
            animate.y = data.y || 0;

            let scale = data.scale || 1;
            animate.scaleY = scale;

            let isMir = !!MirDir[dir];
            if(isMir){
                //左下，左，左上支持旋转
                scale = scale * -1;
            }
            animate.scaleX = scale;

            animate.complete = Handler.alloc(this, this.onPlayComp);
            if(times){
                animate.times = times;
            }

            parent.addChild(animate);
            this._effect[id] = {animate, cb: cb, autoRemove: true};
            animate.load(data.url);

            /**坐骑模型加载双层模型，放后面加载*/
            if(headType == ConfigHead.Horse){
                let cfg: HorseConfig = getConfigByNameId(ConfigName.Horse, index);
                if(cfg.is_double && act != ActionName.STAND + 2){
                    /**双层坐骑*/
                    animate.id2 = this.addAnimate(index, parent, dir, ActionName.STAND + 2, isUi);
                }
            }
            else if(headType == ConfigHead.Huashen){
                /**化神需要加载武器*/
                let cfg: HuashenConfig = getConfigByNameId(ConfigName.Huashen, index);
                if(cfg.is_double && !isWeapon && !animate.id2){
                    animate.id2 = this.addAnimate(index, parent, dir, act, isUi, true);
                }
            }

            if(isGray){
                //颜色矩阵滤镜，模型置灰用
                let colorMatrix = [
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                let colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                parent.filters = [colorFlilter];
            }
            else {
                parent.filters = null;
            }

            return id;
        }

        /**
         * 添加怪物模型接口
         * @param index 怪物index
         * @param parent 存放外显的容器，一般为Group
         */
        public addMonster(index: number, parent: DisplayObjectContainer, dir: number = Direction.RIGHT_DOWN, act: string = ActionName.STAND): number {
            let cfg: Monster1Config = getConfigByNameId(ConfigName.Monster, index);
            return this.addMonsterByRes(cfg.res_id, parent, dir, act);
        }
        public addMonsterByRes(res: string, parent: DisplayObjectContainer, dir: number = Direction.RIGHT_DOWN, act: string = ActionName.STAND): number {
            let id = ++this._id;
            let animate = Pool.alloc(UIAnimate);
            let source: string = ResUtil.getModelUrlByModelName(ConfigHead.Creature, res, dir, act);
            animate.id = id;
            animate.x = 0;
            animate.y = 0;

            let scale = 1;
            animate.scaleY = scale;

            let isMir = !!MirDir[dir];
            if(isMir){
                //左下，左，左上支持旋转
                scale = scale * -1;
            }
            animate.scaleX = scale;

            parent.addChild(animate);
            this._effect[id] = {animate, cb: null, autoRemove: true};
            animate.load(source);
            return id;
        }

        private updateAvatar(role: UIAvatar, body: string, weapon: string, wing: string, parent: DisplayObjectContainer, scale: number, dir: number, isMir: boolean): void {
            if (!role.parent) {
                parent = parent || this._host;
                parent.addChild(role);
            }
            role.scaleY = scale;
            role.scaleX = scale * (isMir ? -1 : 1);
            role.sex = body.indexOf("female") >= 0 ? Sex.Female : Sex.Male;
            role.is_ui = body.indexOf("ui_") >= 0;
            role.setBody(body);
            role.setWeapon(weapon);
            role.setWing(wing);
            role.sortPart(dir);
        }
        /**
         * 添加角色模型接口
         * @param body 身体
         * @param weapon 武器
         * @param wing 翅膀
         * @param parent 存放外显的容器，一般为Group
         * @param scale 缩放，默认1
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param otherRole 新的模型，用于展示两个玩家，默认false
         */
        public updateUIRole(body: string, weapon: string, wing: string, parent: DisplayObjectContainer, scale: number = 1,
                            dir: number = Direction.DOWN, act: string = ActionName.STAND, isUi: boolean = true, otherRole: boolean = false): void {
            let self = this;
            let role: UIAvatar = otherRole? this._uiRoleOther : self._uiRole;
            if (!body && !weapon) {
                self.removeAvatar(role);
                if (otherRole) {
                    self._uiRoleOther = null;
                } else {
                    self._uiRole = null;
                }
                return;
            }
            if (!role) {
                role = Pool.alloc(UIAvatar);
                if (otherRole) {
                    self._uiRoleOther = role;
                } else {
                    self._uiRole = role;
                }
            }

            let urlDir = MirDir[dir] ? MirDir[dir] : dir;
            let isMir = urlDir != dir;
            self.updateAvatar(role,
                ResUtil.getModelUrlByModelName(ConfigHead.Body, body, urlDir, act, isUi),
                ResUtil.getModelUrlByModelName(ConfigHead.Weapon, weapon, urlDir, act, isUi),
                ResUtil.getModelUrlByModelName(ConfigHead.Wing, wing, urlDir, act, isUi),
                parent, scale, dir, isMir
            );
        }

        //额外设置 UI 属性
        public updateUIRoleAtr(isLoop:boolean = true, handler:Handler = null):void{
            let role = this._uiRole;
            if(role){
                role.setCtrlLoop(isLoop);
                role.setCtrlCompHandler(handler);
            }
        }

        /**
         * 字体跳动
         * @param txt
         * @param container
         */
        public addBmpDance(txt: string, container: egret.DisplayObjectContainer): void {
            if (!txt || !container) {
                return;
            }
            let bmpDance = new BmpDanceComp();
            container.addChild(bmpDance);
            bmpDance.updateDance(txt);
        }
    }
}
