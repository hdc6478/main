namespace game.mod.more {


    import teammate = msg.teammate;
    import TimeMgr = base.TimeMgr;

    export class MiningModalItem extends Btn {

        private lab_name: eui.Label;
        private timeItem: TimeItem;
        private img_add: eui.Image;
        private img_head: eui.Image;
        private grp_info: eui.Group;

        public setModal(info: teammate): void {
            this.grp_info.visible = this.img_head.visible = !!info;
            this.img_add.visible = !info;
            if (!info) {
                return;
            }
            this.lab_name.text = info.name;
            this.timeItem.visible = !!info.value;
            if (info.value) {
                this.timeItem.updateLeftTime(info.value.toNumber() - TimeMgr.time.serverTimeSecond);
            }
        }

        public setCurrentState(state: string = "2"): void {
            this.currentState = state;
        }
    }
}