namespace game.mod.scene {

    import ArrayCollection = eui.ArrayCollection;
    import ObjectType = game.scene.ObjectType;
    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GPlayerVo = game.scene.GPlayerVo;

    export class EnemyMdr extends MdrBase implements UpdateItem {

        private _view: EnemyView = this.mark("_view", EnemyView);
        private _proxy: SceneProxy;

        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = EnemyItem;
            this._view.list_item.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Scene);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
            this.onNt(SceneEvent.ON_OBJ_ADD, this.onObjAdd, this);
            this.onNt(SceneEvent.ON_OBJ_DEL, this.onObjDel, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateEnemy();
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onObjAdd(n: GameNT) {
            this.updateEnemy();
        }

        private onObjDel(n: GameNT) {
            this.updateEnemy();
        }

        /**更新附近敌人*/
        private updateEnemy(): void {
            let enemies =  this._proxy.getEnemyVos(ObjectType.PLAYER);//获取所有敌对玩家
            if(this._itemList.source.length){
                this._itemList.replaceAll(enemies);
            }
            else {
                this._itemList.source = enemies;
            }
        }

        /**更新敌人血量*/
        private updateEnemyHp(): void {
            if(!this._view.list_item.numChildren || !this._itemList.source.length){
                return;
            }
            let len = this._view.list_item.numChildren;
            for(let i = 0; i < len; ++i){
                let item = this._view.list_item.getChildAt(i) as EnemyItem;
                let data = item.data;
                let vo = this._proxy.getVoById(data.entity_id) as GPlayerVo;
                if(!vo){
                    continue;
                }
                item.updateEnemyHp(vo.percent);
            }
        }

        update(time: base.Time): void {
            this.updateEnemyHp();
        }
    }
}
