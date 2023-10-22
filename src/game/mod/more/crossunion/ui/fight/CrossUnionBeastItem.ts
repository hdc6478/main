namespace game.mod.more {
    export class CrossUnionBeastItem extends BaseRenderer {

        private grp_eft: eui.Group;

        data: { src: number, scale: number }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.addAnimate(this.data.src, this.grp_eft);
        }

        // TODO:scale
        public setData(src: number, scale: number = 1): void {
            this.data = { src, scale };
        }
    }
}