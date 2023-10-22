namespace game.mod.shilian {

    /**副本首杀玩家信息*/
    export class YuanLingTopPlayerComp extends eui.Component {
        public head: game.mod.Head;
        public lb_name: eui.Label;
        public img_di: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.shilian.YuanLingTopPlayerSkin";
        }

        /**更新信息*/
        public updatePlayerInfo(info: msg.teammate): void {
            if (!info) {
                this.head.defaultHeadShow();
                this.img_di.visible = this.lb_name.visible = false;
                return;
            }
            this.img_di.visible = this.lb_name.visible = true;
            this.head.updateHeadShow(info.head, info.head_frame, info.sex);
            this.lb_name.text = info.name;
        }
    }
}