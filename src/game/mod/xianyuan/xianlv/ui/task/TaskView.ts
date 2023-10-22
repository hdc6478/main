namespace game.mod.xianyuan {

    export class TaskView extends eui.Component {
        public img_banner: eui.Image;
        public list: eui.List;
        public propItem: game.mod.xianyuan.TaskPropItem;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.TaskSkin";
        }
    }
}