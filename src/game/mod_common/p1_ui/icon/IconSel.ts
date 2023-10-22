namespace game.mod {

    export class IconSel extends BaseRenderer {
        public icon: Icon;
        public redPoint: eui.Image;
        public img_sel: eui.Image;
        //皮肤设置就行了
        // constructor() {
        //     super();
        //     this.skinName = "skins.common.IconSelSkin";
        // }
        /**不做具体实现，子类重写*/
        protected dataChanged(): void {
        }
    }

}