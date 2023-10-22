namespace game.mod.more {

    import teammate = msg.teammate;

    export class CrossUnionRole extends BaseRenderer {

        private grp_eft: eui.Group;
        private lab_name: eui.Label;
        private bar: ProgressBarComp;

        public data: { index: number, info: teammate };

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected dataChanged(): void {
            this.removeEft();
            if (!this.data || !this.data.info) {
                return;
            }

            let info: teammate = this.data.info;
            this.lab_name.text = info.name;
            let hp: number = info && info.value && info.value.toNumber() || 0;
            this.bar.show(hp, 100, false, 0, false, ProgressBarType.NoValue);
            this.onUpdateEft(ActionName.ATTACK);
        }

        public setData(index: number, info: teammate): void {
            this.data = { index, info };
        }

        /**单独更新血量 */
        public onUpdateHp(info: teammate): void {
            let hp: number = info && info.value && info.value.toNumber() || 0;
            this.bar.show(hp, 100, false, 0, false, ProgressBarType.NoValue);
        }

        public onUpdateEft(act: ActionName): void {
            let dir: number = this.data.index < 5 ? Direction.LEFT_DOWN : Direction.RIGHT_UP;
            let info: teammate = this.data.info;
            this.updateUIRole(this.grp_eft, info.fashion, info.weapon, info.wing, info.sex, 1, dir, act + "1", false);
            // if (act !== ActionName.ATTACK) {
            //     return;
            // }
            // this.updateUIRoleAtr(true, Handler.alloc(this, () => {
            //     this.onUpdateEft(ActionName.STAND);
            // }))
        }
    }
}