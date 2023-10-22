namespace game.mod.role {


    import TouchEvent = egret.TouchEvent;
    import EquipmentConfig = game.config.EquipmentConfig;

    export class SuitIcon extends BaseListenerRenderer {
        public icon: game.mod.Icon;
        public redPoint: eui.Image;
        public img_add: eui.Image;
        public lb_cond: eui.Label;
        public img_lock: eui.Image;
        public img_sel: eui.Image;

        data: ISuitIconData;

        constructor() {
            super();
            this.skinName = "skins.role.SuitIconSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.lb_cond, this.onClickCond, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.img_lock, this.onClickLock, this);
        }

        protected dataChanged() {
            let data = this.data;
            this.redPoint.visible = data && data.showHint;

            //未激活
            if (!data || !data.isAct) {
                this.defaultView();
                return;
            }

            //已激活的
            this.actedView();
        }

        private actedView(): void {
            this.img_lock.visible = false;
            this.lb_cond.visible = false;

            let data = this.data;
            let prop = PropData.create(data.index);
            if (!prop) {
                return;
            }

            this.icon.setData(prop, IconShowType.NotTips);
            this.setSel(!!data.isSel);

            let lvStr: string;
            if (data.type >= SuitType.HaoTian) {
                lvStr = `${data.stage}阶`;
                this.icon.updateStage(0);
            } else {
                lvStr = `+${data.level}`;
                this.icon.updateStage(data.stage || 0, '阶');
            }
            this.icon.updateCnt(lvStr);

            this.img_add.visible = false;
        }

        private defaultView(): void {
            this.setSel(false);
            this.icon.updateStage(0);
            this.icon.updateIconImg(`equip_icon_gray_${this.data.pos}`);

            this.img_lock.visible = false;
            this.lb_cond.visible = false;
            this.img_add.visible = false;

            let operType = this.data.operType;
            if (operType == SuitOperType.JinJie) {
                this.updateIcon();
                this.lb_cond.visible = this.img_lock.visible = true;
                this.lb_cond.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(this.data.cond || '', 0xFFF053));
                this.img_lock.source = this.data.showHint ? `common_gray` : `common_gray_icon`;
            } else if (operType == SuitOperType.DuanZao) {
                this.img_add.visible = this.data.type < SuitType.HaoTian;
            } else if (operType == SuitOperType.JingZhu) {
                this.updateIcon();
            }
        }

        private updateIcon(): void {
            let equipCfg: EquipmentConfig = getConfigByNameId(ConfigName.Equip, this.data.index);
            if (equipCfg) {
                this.icon.updateIconImg(equipCfg.icon);
                this.icon.updateQualityImg(ResUtil.getPropQualityImg(equipCfg.quality));
            }
        }

        private onClickCond(): void {
            if (this.data.type <= SuitType.YanTian && this.data.cond) {
                let equipCfg: EquipmentConfig = getConfigByNameId(ConfigName.Equip, this.data.index);
                let gainId = equipCfg && equipCfg.gain_id && equipCfg.gain_id[0] || 0;
                ViewMgr.getIns().showViewByID(gainId);
                return;
            }

            if (this.data.operType == SuitOperType.JinJie && this.data.cond) {
                this.onClickLock();
                let fdbType = this.data.cond.slice(0, 1);
                ViewMgr.getIns().showView(ModName.Shilian, ShilianViewType.ShilianMain, [ShilianMainBtnType.Forbidden, +fdbType]);
            }
        }

        private onClickLock(): void {
            if (this.data.type <= SuitType.YanTian && this.data.cond) {
                let equipCfg: EquipmentConfig = getConfigByNameId(ConfigName.Equip, this.data.index);
                let gainId = equipCfg && equipCfg.gain_id && equipCfg.gain_id[0] || 0;
                if (gainId && !ViewMgr.getIns().showJumpBtn(gainId)) {
                    PromptBox.getIns().show(`暂未开启`);
                }
                return;
            }

            if (this.data.operType == SuitOperType.JinJie && this.data.cond) {
                let fbdType = this.data.cond.slice(0, 1);
                PromptBox.getIns().show(ForbiddenTypeName[+fbdType] + this.data.cond + '开启');
            }
        }

        /**是否选中*/
        public setSel(isSel = false): void {
            this.img_sel.visible = isSel;
        }
    }

    export interface ISuitIconData {
        type: SuitType;
        operType: SuitOperType;
        pos: number;
        index: number;//装备index
        isAct: boolean;//是否穿戴
        showHint: boolean;//红点
        cond?: string;//快捷跳转条件
        isSel?: boolean;//是否选中，锻造才需要展示
        stage?: number;//阶数，[1,2类型]展示在左下角，[3,4,5类型]展示在右下角
        level?: number;//强化等级，展示在右下角
    }
}