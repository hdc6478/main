namespace game.mod.more {

    import xianwei_member_data = msg.xianwei_member_data;
    import teammate = msg.teammate;

    export class XianweiTopItem extends BaseRenderer {
        private head: Head;
        private img_title: eui.Image;
        private lab_name: eui.Label;
        private powerLabel: PowerLabel;

        private _proxy: XianweiProxy;
        data: string;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xianwei);
        }

        protected dataChanged(): void {
            let key: string = this.data;
            let cfg = this._proxy.cfgArr.get(key);
            let info: xianwei_member_data = this._proxy.list.get(key);

            let role: teammate = info && info.data;
            let is_robot: number = role && role.is_robot;
            if (!role || is_robot) {
                let head: number[] = cfg.head_frame[0];
                this.head.updateHeadShow(head[0], head[1]);
                this.powerLabel.setPowerValue(cfg.rebot_power);
                this.lab_name.text = cfg.name;
            } else {
                this.head.updateHeadShow(role.head, role.head_frame);
                this.powerLabel.setPowerValue(role.showpower);
                this.lab_name.text = role.name;
            }
            this.img_title.source = `xianweititle${key}`;
        }

        public setData(key: string): void {
            this.data = key;
        }
    }
}