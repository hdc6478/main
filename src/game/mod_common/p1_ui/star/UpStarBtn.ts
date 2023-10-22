namespace game.mod {

    /**升星觉醒按钮*/
    export class UpStarBtn extends Btn {
        public upStarEft: UpStarEft;
        public img_cost: eui.Image;
        public lb_cost: eui.Label;
        public grp_tips: eui.Group;
        public lb_tips: eui.Label;
        public redPoint: eui.Image;

        /**
         * 获取拥有数量
         * @param index
         */
        public getCurCnt(index?: number): number {
            if (!index) {
                return 0;
            }
            return BagUtil.getPropCntByIdx(index);
        }

        /**
         *
         * @param cost
         **@param isAct: 是否已经激活
         * @param tips tips：提示的文本，默认不显示
         * @param isCnt: 显示数量
         * @param curCnt: 当前数量，外部传进来的话，就不取背包的
         */
        public updateCost(cost: number[], isAct: boolean, tips: string, isCnt: boolean = true, curCnt?: number): void {
            if (!cost || !cost.length) {
                return;
            }
            let index = cost[0];
            let costCnt = cost[1];
            let propCfg = GameConfig.getPropConfigById(index);
            if (!propCfg) {
                return;
            }
            this.currentState = 'default';
            if (curCnt == undefined) {
                curCnt = this.getCurCnt(index);//默认不传数量的话，取背包的
            }
            let str: string;
            if (isCnt) {
                str = StringUtil.getHurtNumStr(curCnt) + "/" + StringUtil.getHurtNumStr(costCnt);//拥有的道具 / 消耗的道具
            } else {
                if (curCnt < costCnt) {
                    str = `${Math.floor(curCnt / costCnt * 100)}%`;
                } else {
                    str = "100%";
                }
            }
            this.lb_cost.text = str;//修改为不使用颜色
            let canUp = curCnt >= costCnt && isCnt;//显示数量的时候才判断
            this.grp_tips.visible = !!tips || canUp;
            if (this.grp_tips.visible) {
                if (canUp) {
                    this.lb_tips.text = isAct ? "可升星" : "可激活";
                } else {
                    this.lb_tips.textFlow = TextUtil.parseHtml(tips);
                }
            }
            this.upStarEft.updateCost(curCnt, costCnt);
        }

        public updateLab(str: string): void {
            this.lb_cost.textFlow = TextUtil.parseHtml(str);
        }

        /**满星状态*/
        public updateMaxStar(): void {
            this.currentState = 'maxStar';
            this.upStarEft.updateMaxStar();
        }

        /**神灵觉醒状态*/
        public updateJuexing(): void {
            this.currentState = 'juexing';
            this.upStarEft.updateMaxStar();
        }

        /**设置红点*/
        public setHint(hint: boolean = false): void {
            this.upStarEft.setHint(hint);
        }

        /**满特效，球*/
        public setFullEft(): void {
            this.upStarEft.setFullEft();
        }
    }

}