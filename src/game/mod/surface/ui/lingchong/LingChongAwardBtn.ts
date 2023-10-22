namespace game.mod.surface {

    export class LingChongAwardBtn extends Btn {
        public iconDisplay: eui.Image;
        public redPoint: eui.Image;
        public gr_tips: eui.Group;
        public lb_num: eui.Label;


        public setTip(cnt: number): void {
            this.gr_tips.visible = cnt && cnt > 0;
            this.lb_num.text = cnt + '';
        }
    }

}