namespace game.mod.activity {


    export class FuchenlinghuAvatarItem extends AvatarItemLongPress {

        protected dataChanged(): void {
            super.dataChanged();
            this.starCom.visible = false;
            this.img_chuzhan.visible = false;
            this.setGray();
        }
    }
}