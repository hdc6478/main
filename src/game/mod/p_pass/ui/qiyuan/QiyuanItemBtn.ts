namespace game.mod.pass {

    export class QiyuanItemBtn extends Btn {

        public img_icon: eui.Image;
        public lab_desc: eui.Label;
        public img_finish: eui.Image;
        public img_black: eui.Image;
        public redPoint: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.pass.QiyuanItemBtnSkin";
        }

        public set isFinish(value: boolean) {
            this.img_finish.visible = value;
        }

        public setData(value: IPassQiyuanData): void {
            this.img_icon.source = value.cfg.picture;
            this.currentState = "state" + value.state;
            this.isFinish = value.isFinish;
            this.img_black.visible = !value.isInStep;
            this.lab_desc.text = value.desc;

            let proxy: PassProxy = getProxy(ModName.Pass, ProxyType.Pass);
            let index: number = 0;
            if (value.cfg.event_type == 1) {
                index = proxy.getIndexByCfgIndex(value.cfg.index) || 0;
            }
            let fuben = getConfigByNameId(ConfigName.QiyuanFuben, value.cfg.param1[index]) || 0;
            if (!value.isInStep || value.isFinish) {
                this.redPoint.visible = false;
            } else {
                //玩家战力
                let power = RoleVo.ins.showpower.toNumber();
                let power2 = fuben.power;
                this.redPoint.visible = value.task && value.task.status == 1 && value.task.schedule >= value.task.target || power >= power2;
            }
        }
    }
}