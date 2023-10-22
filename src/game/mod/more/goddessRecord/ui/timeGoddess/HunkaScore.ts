namespace game.mod.more {

    export class HunkaScore extends BaseRenderer {

        private grp_score: eui.Group;
        public data: {score: number, type: number};

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let type = this.data.type;
            this.currentState = type == HunkaScoreType.Score ? "score" : "all";
            let fontStr = this.data.score + "";
            this.addBmpFont(fontStr, BmpTextCfg[BmpTextType.CommonPower], this.grp_score, true,1, false, 0, true);
        }

        public setData(score: number, type: number = HunkaScoreType.Score): void {
            this.data = {score: score, type: type};
        }
    }

}