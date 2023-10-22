namespace game.mod {

    import teammate = msg.teammate;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Handler = base.Handler;

    export class CommonMatchMdr extends MdrBase implements UpdateItem {
        private _view: CommonMatchView = this.mark("_view", CommonMatchView);

        protected _showArgs: MatchData;
        private _timeCnt: number;
        private _names: string[][] = [];
        private _delay: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = false;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.currentState = `${this._showArgs.type}`;

            this.initNameList();
            this.updatePlayer();
            this.updateEnemy();

            TimeMgr.addUpdateItem(this, 600);
        }

        private initNameList(): void {
            this._timeCnt = this._showArgs.times || 5;
            for (let i in this._showArgs.enemys) {
                // let info = this._showArgs.enemys[i];
                this._names[i] = [];
                for (let j = 0; j < this._timeCnt; j++) {
                    this._names[i].push(TextUtil.getRandomName());
                }
            }
        }

        protected onHide(): void {
            if (this._showArgs.handler) {
                this._showArgs.handler.exec();
            }
            TimeMgr.removeUpdateItem(this);
            if (this._delay) {
                base.clearDelay(this._delay);
            }
            super.onHide();
        }

        /**更新自己*/
        private updatePlayer(): void {
            for (let i in this._showArgs.players) {
                let idx: number = +i * 2 + 1;
                let item: CommonMatchItem = this._view[`item${idx}`];
                item.setData(this._showArgs.players[i]);
            }
        }

        /**更新敌人*/
        private updateEnemy(): void {
            for (let i in this._showArgs.enemys) {
                let idx: number = (+i + 1) * 2;
                let item: CommonMatchItem = this._view[`item${idx}`];
                item.visible = false;
            }
            this._delay = base.delayCall(Handler.alloc(this, () => {
                for (let i in this._showArgs.enemys) {
                    let idx: number = (+i + 1) * 2;
                    let item: CommonMatchItem = this._view[`item${idx}`];
                    item.visible = true;
                }
                this._delay = 0;
            }), 100);

            let len: number = this._showArgs.enemys.length;
            for (let i in this._showArgs.enemys) {
                let info = this._showArgs.enemys[i];
                let idx: number = (+i + 1) * 2;
                let item: CommonMatchItem = this._view[`item${idx}`];

                let sex: number = len == 1 ? Math.floor(Math.random() * 2 + 1) : info.sex;
                if (this._names[i].length) {
                    let name: string = this._names[i].pop();
                    item.setData({ name, sex });
                } else {
                    item.setData(info);
                }
            }

        }

        update(time: base.Time): void {
            this._timeCnt--;
            if (this._timeCnt < 0) {
                this.hide();
                return;
            }
            this.updateEnemy();
        }
    }

    export interface MatchData {
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

    export interface MatchItemData {
        name: string;
        sex: number;
        showpower?: Long;
        index?: number;
    }
}