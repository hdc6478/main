namespace game.mod.role {

    export class SuitUpLvBtn extends Btn {
        public iconDisplay: eui.Image;
        public redPoint: eui.Image;
        public gr_lock: eui.Group;
        public group_eft: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.role.SuitUpLvBtnSkin";
        }

        public setLock(isLock = true): void {
            this.gr_lock.visible = isLock;
        }
    }
}