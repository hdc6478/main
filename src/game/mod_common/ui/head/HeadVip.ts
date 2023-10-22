namespace game.mod {

    export class HeadVip extends BaseRenderer {
        public head: game.mod.Head;
        public grp_vip: eui.Group;
        public gr_vipLv: eui.Group;
        public grp_name: eui.Group;
        public img_name: eui.Image;

        constructor() {
            super();
            this.skinName = `skins.common.CommonHeadVipSkin`;
        }

        /**
         * 更新显示
         * @param head  头像idx
         * @param frame 头像框idx
         * @param sex 性别
         * @param vipId vipId
         * @param roleId，玩家角色id(传这个参数时候，表示该头像可点击查看玩家信息)
         * @param serverId，玩家服务器id
         * @param isRobot，是否机器人
         */
        public updateShow(head: number | Long, frame: number | Long, sex: number = 1, vipId: number = 0, roleId?: Long, serverId?: number, isRobot?: number): void {
            this.head.updateHeadShow(head, frame, sex, roleId, serverId, isRobot);
            this.grp_name.visible = false;
            this.grp_vip.visible = true;
            this.addBmpFont(VipUtil.getVipFont(vipId), BmpTextCfg[BmpTextType.VipFont], this.gr_vipLv,
                true, 1, true);
        }

        /**默认显示问号头像*/
        public defaultHeadShow(): void {
            this.updateShow(0, 0, 0);
        }

        /**显示自己的头像*/
        public updateMyHead(): void {
            let vo = RoleVo.ins;
            this.updateShow(vo.head, vo.head_frame, vo.sex, vo.vip_lv);
        }

        /**显示带名字的头像，不显示VIP*/
        public updateName(head: number, frame: number, sex: number, nameStr: string): void {
            this.head.updateHeadShow(head, frame, sex);
            this.grp_name.visible = true;
            this.grp_vip.visible = false;
            this.img_name.source = nameStr;
        }

        public updateHeadMask(headmask: string): void {
            this.head.updateHeadMask(headmask);
        }
    }
}