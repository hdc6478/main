namespace game.mod.compete {

    import teammate = msg.teammate;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Tween = base.Tween;
    import Handler = base.Handler;

    export class DoufaVsMdr extends MdrBase implements UpdateItem {
        private _view: DoufaVsView = this.mark("_view", DoufaVsView);
        private _proxy: CompeteProxy;
        protected _showArgs: teammate;
        private readonly MAX_NUM: number = 5;//5个虚假玩家
        private _timeCnt: number;
        private _nameList: string[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = false;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();

            this.initNameList();
            this.updateSelf();
            this.updateEnemy();

            TimeMgr.addUpdateItem(this, 600);
        }

        protected onHide(): void {
            this._proxy.c2s_pvp_battle_rank_challenge();
            TimeMgr.removeUpdateItem(this);
            Tween.remove(this._view.grp_player2);
            super.onHide();
        }

        /**更新自己*/
        private updateSelf(): void {
            let vo = RoleVo.ins;
            this._view.lab_name1.text = vo.name;
            this._view.powerLabel1.setPowerValue(vo.showpower);
            this._view.img_player1.source = "doufa_palyer" + RoleVo.ins.sex;
        }

        private initNameList(): void {
            this._nameList = [this._showArgs.name];
            this._timeCnt = this.MAX_NUM;
            for(let i = 0; i < this.MAX_NUM; ++i){
                let name = TextUtil.getRandomName();
                this._nameList.push(name);
            }
        }

        /**更新敌人*/
        private updateEnemy(): void {
            this._view.grp_player2.visible = false;
            Tween.remove(this._view.grp_player2);
            Tween.get(this._view.grp_player2)
                .delay(100)
                .exec(Handler.alloc(this, () => {
                    this._view.grp_player2.visible = true;
                }));

            let name = this._nameList.pop();
            this._view.lab_name2.text = name;
            let isFinal = this._nameList.length <= 0;
            this._view.powerLabel2.visible = isFinal;
            this._view.powerLabel2.setPowerValue(this._showArgs.showpower || 0);
            let sex = Math.random() < 0.5 ? Sex.Male : Sex.Female;
            this._view.img_player2.source = "doufa_palyer" + sex;
        }

        update(time: base.Time): void {
            this._timeCnt--;
            if(this._timeCnt < 0){
                this.hide();
                return;
            }
            this.updateEnemy();
        }
    }
}