namespace game.mod.shilian {

    import yuanling_damage_info = msg.yuanling_damage_info;

    export class YuanLingResultItem extends BaseListenerRenderer {
        public lb_num: eui.Label;
        public lb_name: eui.Label;
        public lb_damage: eui.Label;

        data: yuanling_damage_info;

        constructor() {
            super();
            this.skinName = `skins.shilian.YuanLingResultItemSkin`;
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
            this.lb_num.text = `${this.itemIndex + 1}`;
            this.lb_name.text = data.name;
            this.lb_damage.text = StringUtil.getHurtNumStr(data.damage.toNumber());
        }
    }
}