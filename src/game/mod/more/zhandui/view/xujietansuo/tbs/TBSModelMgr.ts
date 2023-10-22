namespace game.mod.more {


    import PoolObject = base.PoolObject;
    import Pool = base.Pool;
    import teammate = msg.teammate;

    /**
     * 回合制模型控制器 todo
     */
    export class TBSModelMgr {
        private _gr_model0: eui.Group;
        private _gr_model1: eui.Group;

        private _proxy: XujieTansuoProxy;

        private static _instance: TBSModelMgr;

        public static getIns(): TBSModelMgr {
            if (!this._instance) {
                this._instance = new TBSModelMgr();
            }
            return this._instance;
        }

        private _radius = 130;

        /**
         * 己方12个神灵布局，锚点的x正方向是12
         * 相对于group的锚点，象限不同
         */
        private _angle: number[][] = [
            //xy: ++, +-, --, -+
            [-210, 60, -30, -120],  //10 1 4 7 (数字表示时钟刻度)
            [-240, 30, -60, -150],  //11 2 5 8
            [90, 0, -90, -180]      //12 3 6 9
        ];

        /**敌方布局*/
        private _enemyAngle: number[][] = [
            [-30, -120, -210, 60],  //4 7 10 1
            [-60, -150, -240, 30],  //5 8 11 2
            [-90, -180, 90, 0]      //6 9 12 3
        ];

        //获取角度
        private getAngle(idx: number): number {
            let row = Math.abs(Math.ceil(idx / 4 - 1));
            let col = (idx % 4 == 0) ? 3 : idx % 4 - 1;
            return this._angle[row][col];
        }

        //获取x
        private getX(idx: number): number {
            let angle = this.getAngle(idx);
            let x = this._radius * Math.sin(angle * Math.PI / 180);
            // console.log(`btsmgr ${idx} ${angle} x:`, x);
            return x;
        }

        //获取y
        private getY(idx: number): number {
            let angle = this.getAngle(idx);
            let y = this._radius * Math.cos(angle * Math.PI / 180);
            // console.log(`btsmgr ${idx} ${angle} y:`, y);
            return y;
        }

        /**
         * 添加神灵模型 (其他模型暂时不需要展示）
         * @param list 神灵列表
         * @param gr 容器
         * @param dir 方向，默认右上
         */
        private addGeneral(list: number[], gr: eui.Group, dir: Direction = Direction.RIGHT_UP): void {
            let len = list && list.length || 0;
            if (!len) {
                return;
            }
            for (let i = 1; i <= len; i++) {
                let model = Pool.alloc(TBSModelItem);
                model.onAddGeneral(list[i - 1], dir);
                model.x = this.getX(i);
                model.y = this.getY(i);
                gr.addChild(model);
            }
        }

        /**
         * 己方
         * @param info
         * @param gr
         * @param dir 默认右上
         */
        public updateActor(info: teammate, gr: eui.Group, dir: Direction = Direction.RIGHT_UP): void {
            if (!this._gr_model0) {
                this._gr_model0 = gr;
            }
            if (!this._proxy) {
                this._proxy = getProxy(ModName.More, ProxyType.XujieTansuo);
            }

            let list = [];
            let entityList = info.legion_data && info.legion_data.entity_list ? info.legion_data.entity_list : [];
            for (let item of entityList) {
                if (item.entity_type == LegionEntityType.Shenling) {
                    //神灵信息
                    list.push(item.id.toNumber());
                }
            }
            this.addGeneral(list, gr, dir);

            if (info && info.role_id) {
                let model = Pool.alloc(TBSModelItem);
                model.onAddRole(this._proxy.myself_info, dir);
                model.x = 0;
                model.y = 0;
                gr.addChild(model);
            }
        }

        /**
         * 敌方
         * @param info
         * @param gr
         * @param dir 默认左下
         */
        public updateEnemy(info: teammate, gr: eui.Group, dir: Direction = Direction.LEFT_DOWN): void {
            if (!this._gr_model1) {
                this._gr_model1 = gr;
            }
            if (!this._proxy) {
                this._proxy = getProxy(ModName.More, ProxyType.XujieTansuo);
            }

            if (info && info.role_id) {
                let list = [];
                let entityList = info.legion_data && info.legion_data.entity_list ? info.legion_data.entity_list : [];
                for (let item of entityList) {
                    if (item.entity_type == LegionEntityType.Shenling) {
                        //神灵信息
                        list.push(item.id.toNumber());
                    }
                }
                this.addGeneral(list, gr, dir);

                //敌方为玩家
                let model = Pool.alloc(TBSModelItem);
                model.onAddRole(this._proxy.target_info, dir);
                model.x = 0;
                model.y = 0;
                gr.addChild(model);
            } else if (info && info.boss_id) {
                //敌方为boss
                let model = Pool.alloc(TBSModelItem);
                model.onAddMonster(info.boss_id.toNumber(), dir);
                model.x = 0;
                model.y = 0;
                gr.addChild(model);
            }
        }

        public onRemove(): void {
            if (this._gr_model0) {
                let size = this._gr_model0.numChildren;
                for (let i = 0; i < size; i++) {
                    let child = this._gr_model0.getChildAt(i);
                    if (child && child instanceof TBSModelItem) {
                        Pool.release(child);
                    }
                }
                this._gr_model0.removeChildren();
                this._gr_model0 = null;
            }

            if (this._gr_model1) {
                let size = this._gr_model1.numChildren;
                for (let i = 0; i < size; i++) {
                    let child = this._gr_model1.getChildAt(i);
                    if (child && child instanceof TBSModelItem) {
                        Pool.release(child);
                    }
                }
                this._gr_model1.removeChildren();
                this._gr_model1 = null;
            }
        }
    }

    /**模型容器*/
    export class TBSModelItem extends eui.Component implements PoolObject {
        private _dsp: egret.DisplayObjectContainer;
        private _hub: UIEftHub;
        private _url: string;

        constructor() {
            super();
            this._dsp = new egret.DisplayObjectContainer();
            this._dsp.removeChildren();
            this.name = 'btsModelItem';
            this.addChild(this._dsp);
            this._hub = new UIEftHub(this._dsp);
            this._url = null;
        }

        dispose(): void {
            this.onRelease();
        }

        onAlloc(): void {
        }

        onRelease(): void {
            this._hub.removeAllEffects();
            this._url = null;
        }

        // 添加神灵模型
        onAddGeneral(index: number, dir: Direction = Direction.RIGHT_UP): void {
            let url = ResUtil.getModelUrl(index, dir, ActionName.STAND);
            if (this._url == url) {
                return;
            }
            let type = PropData.getPropParse(index);
            let scale = 1;
            if (AlterXDirs3[dir]) {
                scale = AlterXDirs3[dir];//左下方向，需要处理
            }
            if (type == ConfigHead.Shenling) {
                this._dsp.scaleX = 0.7 * scale;
                this._dsp.scaleY = 0.7;
            } else {
                this._dsp.scaleX = scale;
                this._dsp.scaleY = 1;
            }

            this._url = url;
            this._hub.add(url, 0, 0, null, 0, this._dsp, -1);
        }

        // 添加玩家模型
        onAddRole(teammate: teammate, dir: Direction = Direction.RIGHT_UP): void {
            let body: string = ResUtil.getModelName(teammate.fashion, teammate.sex);
            let weaponStr: string = ResUtil.getModelName(teammate.weapon);
            let wingStr: string = ResUtil.getModelName(teammate.wing, teammate.sex, false);
            this._hub.updateUIRole(body, weaponStr, wingStr, this._dsp, 1, dir, ActionName.STAND, false);
        }

        // 添加怪物模型
        onAddMonster(id: number, dir: Direction = Direction.LEFT_DOWN): void {
            let scale = 1;
            if (AlterXDirs3[dir]) {
                scale = AlterXDirs3[dir];//左下方向，需要处理
            }
            this._dsp.scaleX = scale;
            this._hub.addMonster(id, this._dsp);
        }
    }

}