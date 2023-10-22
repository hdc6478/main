namespace game.mod.union {

    import member_data = msg.member_data;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class UnionMemberItem extends BaseRenderer {

        private lab_name: eui.Label;
        private lab_power: eui.Label;
        private head: HeadVip;
        // private btn_agree: Btn;
        // private btn_refuse: Btn;
        private lab_online: eui.Label;
        private img_job: eui.Image;
        private img_hero: eui.Image;

        // private _proxy: UnionProxy;

        public data: member_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected dataChanged(): void {
            let data: member_data = this.data;
            if (!data) {
                return;
            }
            this.lab_name.text = data.name;

            this.lab_name.textColor = data.role_id.eq(RoleVo.ins.role_id) ? Color.BLUE : Color.WHITE;
            this.lab_power.text = `战力：${data.power.toNumber()}`;
            this.head.updateShow(data.head, data.head_frame, data.sex, data.vip);

            this.lab_online.text = data.is_online ? getLanById(LanDef.guild_online) : TimeUtil.getLeaveTime(data.last_time);

            this.img_job.visible = data.guild_job != UnionJob.General && data.guild_job != UnionJob.Leave;
            if (this.img_job.visible) {
                this.img_job.source = `biaoqian_job${data.guild_job}`;
            }

            if (data.is_xianzong) {
                this.img_hero.visible = true;
                if (data.guild_job == UnionJob.General) {
                    this.img_hero.x = this.img_job.x;
                } else {
                    this.img_hero.x = 547;
                }
            } else {
                this.img_hero.visible = false;
            }
        }

        private onClick(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionMember, this.data.role_id);
        }
    }
}