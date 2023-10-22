namespace game.mod.activity {

    import teammate = msg.teammate;
    import LanDef = game.localization.LanDef;

    export class TongtiangeItem1 extends BaseListenerRenderer {
        public lb_layer: eui.Label;
        public lb_name: eui.Label;
        public head: game.mod.Head;

        data: teammate;

        constructor() {
            super();
            this.skinName = `skins.activity.TongtiangeItemSkin1`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.currentState = data.value && data.value.toNumber() == 1 ? '1' : '0';
            this.lb_layer.text = data.rank_num + getLanById(LanDef.relic3);
            this.lb_name.text = data.name;
            this.head.updateHeadShow(data.head, data.head_frame, data.sex, data.role_id, data.server_id);
        }
    }
}