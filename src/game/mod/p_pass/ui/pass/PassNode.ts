namespace game.mod.pass {

    export class PassNode extends BaseRenderer {

        public grp_eff: eui.Group;
        public grp_1: eui.Group;
        public grp_2: eui.Group;
        public grp_touch: eui.Group;
        public grp_font: eui.Group;
        public img_sel: eui.Image;
        public img_state: eui.Image;
        public lab_name: eui.Label;

        /**
         * 关卡，1，2...
         */
        public step: number;

        private _state: number;

        private _isSnode: boolean = false;

        constructor() {
            super();
        }

        public get isSnode(): boolean {
            return this._isSnode;
        }

        public set isSnode(value: boolean) {
            this.grp_1.visible = !value;
            this.grp_2.visible = !value;
            this._isSnode = value;
        }

        public get state(): number {
            return this._state;
        }

        /**
         * 状态
         * @param 0-未完成，1-进行中，2-已通关
         * @return
         */
        public set state(value: number) {
            this._state = value;
            switch (value) {
                case 0:
                    this.img_state.source = "";
                    this.img_sel.visible = false;
                    break;
                case 1:
                    // this.img_state.source = "pass_fighting";
                    this.img_sel.visible = true;
                    this.addEftByParent(UIEftSrc.CurPass, this.grp_eff);
                    break;
                case 2:
                    this.img_state.source = "pass_flag";
                    this.img_sel.visible = true;
                    break;
                default:
                    break;
            }
        }

    }
}