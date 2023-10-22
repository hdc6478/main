namespace game {
    export class Game {

        constructor() {
            this.init();
        }

        private init(): void {
            initLog();

            initEui();

            loadRes();
        }

    }

    gso.gameCls = Game;

}
