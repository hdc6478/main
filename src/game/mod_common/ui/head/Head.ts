namespace game.mod {

    import TouchEvent = egret.TouchEvent;
    import Image = eui.Image;
    import Monster1Config = game.config.Monster1Config;

    export class Head extends BaseRenderer {

        public img_head: eui.Image;
        public gr_headEft: eui.Group;
        public img_frame: eui.Image;
        public gr_frameEft: eui.Group;
        public redPoint: eui.Image;
        private _headEftId: number;
        private _frameEftId: number;
        private img_headmask: eui.Image;

        private _roleId: Long;//玩家角色id
        private _serverId: number;//玩家服务器id
        private _isRobot: number;//是否机器人

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onClickHead, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.clearHeadEft();
            this.clearFrameEft();
            this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickHead, this);
        }

        private onClickHead() {
            if (!this._roleId) {
                return;
            }
            ViewMgr.getIns().showRoleTips(this._roleId, this._serverId, this._isRobot);
        }

        /**
         * 通用头像组件显示
         * @param head  头像idx
         * @param frame 头像框idx
         * @param sex 性别
         * @param roleId，玩家角色id(传这个参数时候，表示该头像可点击查看玩家信息)
         * @param serverId，玩家服务器id
         * @param isRobot，是否机器人
         */
        public updateHeadShow(head: number | Long, frame: number | Long, sex: number = 1, roleId?: Long, serverId?: number, isRobot?: number): void {
            if (head instanceof Long) {
                head = head.toNumber();
            }
            if (frame instanceof Long) {
                frame = frame.toNumber();
            }
            this.setDressShow(head, DressUpType.Head, sex);
            this.setDressShow(frame, DressUpType.Frame);
            this._roleId = roleId;
            this._serverId = serverId;
            this._isRobot = isRobot;
        }

        /**默认显示问号头像*/
        public defaultHeadShow(): void {
            this.updateHeadShow(0, 0, 0);
        }

        public updateBossHeadShow(head: number | Long, frame: number | Long): void {
            if (head instanceof Long) {
                head = head.toNumber();
            }
            if (frame instanceof Long) {
                frame = frame.toNumber();
            }
            // this.setDressShow(head, DressUpType.Head);
            this.setDressShow(frame, DressUpType.Frame);
            let img: Image = this.img_head;
            let cfg: Monster1Config = getConfigByNameId(ConfigName.Monster, head);
            img.source = cfg.res_id;
        }

        public updateImgHeadShow(img: string): void {
            this.img_head.source = img;
        }

        public updateHeadMask(headmask: string): void {
            this.img_headmask.source = headmask;
        }

        /**显示自己的头像*/
        public updateMyHead(): void {
            let vo = RoleVo.ins;
            this.updateHeadShow(vo.head, vo.head_frame, vo.sex);
        }

        private setDressShow(idx: number, type: DressUpType, sex?: number) {
            this.setDressIconShow(idx, type, sex);
        }

        public setDressIconShow(idx: number, type: DressUpType, sex: number = null) {
            let img: Image = type == DressUpType.Head ? this.img_head : this.img_frame;
            if (idx == 0) {
                let nullStr = type == DressUpType.Head ? "lttx_shishui" : "ltxk_yuanshi";
                img.source = ResUtil.getDressUpIcon(nullStr);
                return;
            }
            img.source = ResUtil.getDressUpIcon(idx, sex);
        }

        private clearHeadEft() {
            if (this._headEftId) {
                this.removeEffect(this._headEftId);
                this._headEftId = null;
            }
        }

        private clearFrameEft() {
            if (this._frameEftId) {
                this.removeEffect(this._frameEftId);
                this._frameEftId = null;
            }
        }
    }

}