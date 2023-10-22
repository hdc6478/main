namespace game.mod.yishou {

    export class YishouShoulingAvatarItem extends AvatarItem {

        protected onAddToStage() {
            super.onAddToStage();
            this.starCom.visible = false;
        }

        protected dataChanged(): void {
            super.dataChanged();
        }
    }
}