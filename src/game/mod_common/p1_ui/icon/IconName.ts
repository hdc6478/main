namespace game.mod {

    export class IconName extends Icon {
        protected dataChanged(): void {
            super.dataChanged();
            if (this.data) {
                this.updateName();
            }
        }
    }

}