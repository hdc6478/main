namespace game.scene {
    import Monster1Config = game.config.Monster1Config;

    export class CollectItem extends BaseActor {

        protected onAdded(): void {
            super.onAdded();
            this.updateIndex();
        }

        protected updateIndex(): void {
            let self = this;
            let vo: CollectVo = <CollectVo>self.vo;
            if (vo.cfg && vo.cfg.res_id) {
                self.dir = Direction.RIGHT_DOWN;
                self.act = ActionName.STAND;
                self.setBody(vo.cfg.res_id);
            }
            self.updateClickArea();
            //self.clickArea.clickEnabled = true;
            self._addEft();
        }


        onNameChanged() {
            // super.onNameChanged();
        }

        public updateClickArea() {
            let self = this;
            // if (!self.clickArea) {
            //     return;
            // }
            let vo: CollectVo = <CollectVo>self.vo;
            if (!vo || !vo.cfg) {
                //super.updateClickArea();
                return;
            }
            let res_id: string = vo.cfg.res_id;
            if (!res_id) {
                return;
            }

            // let big_click_srcs: string[] = ["cjw_11", "cjw_12", "cjw_16", "cjw_17", "cjw_18", "cjw_19", "cjw_20", "cjw_21", "cjw_22", "cjw_23", "cjw_24"];
            // let isSpClick: boolean = big_click_srcs.indexOf(res_id) > -1;
           // let clickHeight: number = self.clickArea.height = (isSpClick ? 160 : 100)*gso.avatarScale; // self.getBodyHeight();
            //let clickWidth: number = isSpClick ? 160 : self.clickArea.width;
            // let offsetY: number = -clickHeight * 0.5;
            // self.clickArea.y = offsetY;
            // self.clickArea.width = clickWidth;
            // self.clickArea.x = -clickWidth * 0.5;
        }

        public onAlloc(): void {
            super.onAlloc();
            this.avatar.resType = ConfigHead.Creature;
        }

        protected _addEft(): void {
            let vo: CollectVo = <CollectVo>this.vo;
            let cfg: Monster1Config = vo.cfg;
            if (!cfg) {
                return;
            }

            // let eftId: string = cfg.effect;
            // if (eftId && eftId.trim() !== "") {
            //     this.addEft(eftId, 0, 0, Direction.RIGHT_DOWN, 1, null, true);
            // }
        }
    }
}
