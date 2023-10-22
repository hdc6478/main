namespace game.mod.shilian {

    import teammate = msg.teammate;

    /**组队邀请item*/
    export class YuanLingTeamInviteItem extends YuanLingTeamItem {

        protected dataChanged(): void {
            let data = this.data as teammate;
            if (!data) {
                return;
            }
            this.btn_do.visible = true;
            this.img_zhanli.visible = true;
            this.btn_do.label = '邀请';
            this.lb_state.text = '';
            this.lb_name.text = data.name;
            this.lb_power.x = 237;
            this.lb_power.text = StringUtil.getHurtNumStr(data.showpower.toNumber());
            this.head.updateShow(data.head.toNumber(), data.head_frame.toNumber(), data.sex, data.vip);
        }

        protected onClick() {
            let data = this.data as teammate;
            this._proxy.c2s_yuanling_invita(data.role_id, this._proxy.curDiffType);
            this.btn_do.visible = false;
            this.lb_state.text = '已邀请';
            PromptBox.getIns().show(`邀请成功`);
        }
    }
}