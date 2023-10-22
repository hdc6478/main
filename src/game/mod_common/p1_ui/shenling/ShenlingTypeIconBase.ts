namespace game.mod {

    /**
     * 神灵属性按钮基类
     * ShenLingTypeIconBaseSkin
     * ShenLingTypeIconBaseUpSkin
     */
    export class ShenlingTypeIconBase extends BaseListenerRenderer {
        public img_di: eui.Image;
        public img_icon: eui.Image;
        public redPoint: eui.Image;

        data: ShenlingTypeIconData;

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_icon.source = `sl_type_` + data.type;
            this.redPoint.visible = !!data.showHint;
            this.img_di.source = 'tubiaokuang';
        }
    }
}