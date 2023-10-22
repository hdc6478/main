namespace game.mod.more {

    import xianwei_log_data = msg.xianwei_log_data;

    export class XianweiTipsItem2 extends BaseRenderer {

        private lab: eui.Label;
        private head: Head;
        private _proxy: XianweiProxy;
        data: xianwei_log_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xianwei);
        }

        protected dataChanged(): void {
            let cfg = this._proxy.cfgArr.get(`${this.data.stage}_${this.data.index}`);
            let info = this.data.target;
            if (!info) {
                info
            }
            if (this.data.act == 2) {
                this.head.updateHeadShow(info.head, info.head_frame, info.sex, info.role_id);
            } else {
                this.head.updateMyHead();
            }

            let name1: string = this.data.act == 1 ? RoleVo.ins.name : info.name;
            let name2: string = this.data.act == 2 ? RoleVo.ins.name : info.name;
            //S999.XXX挑战S999.XXX的"仙位名称"失败，仙位没有变化。
            //S999.XXX挑战S999.XXX的"仙位名称"成功，仙位被夺走了！
            let fail: string = "%s挑战%s的%s失败，仙位没有变化。";
            let success: string = "%s挑战%s的%s成功，仙位被夺走了！";
            let content: string = this.data.is_success ? success : fail;
            this.lab.textFlow = TextUtil.parseHtml(StringUtil.substitute(content, [name1, name2, cfg.name]))
        }
    }
}
