namespace game.mod.xianyuan {

    export class XianlvDoufaLightItem extends BaseRenderer {

        private img_light: eui.Image;

        protected dataChanged(): void {
            this.img_light.source = `${this.data ? "light" : "light2"}`;
        }

    }
}