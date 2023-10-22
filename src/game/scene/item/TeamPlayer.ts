namespace game.scene {


    export class TeamPlayer extends GPlayer {

        public onStartSprint(sx: number, sy: number, ex: number, ey: number): void {
            this.act = ActionName.JUMP + 3;
        }

        protected onHpChanged() {
            //机器人不显示血条
        }


        updateAvatarClose(): void {

        }

        protected onCreditLvUpdate(): void {

        }

    }
}
