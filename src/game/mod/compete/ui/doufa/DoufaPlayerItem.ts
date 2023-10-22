namespace game.mod.compete {

    import teammate = msg.teammate;

    export class DoufaPlayerItem extends eui.Component {

        public img_di: eui.Image;
        public img_head: eui.Image;
        public img_name_di: eui.Image;
        public lab_name: eui.Label;
        public lab_no: eui.Label;
        public img_win: eui.Image;
        public img_gray: eui.Image;
        public img_has: eui.Image;

        public info: teammate;

        public updateShow(info: teammate, winRoleId: Long, isFirst?: boolean, isGuess?: boolean, isEmpty?: boolean): void {
            this.info = info;
            if(!winRoleId || winRoleId.toNumber() == 0 || !info || !info.role_id){
                //没有赢家,或者没有玩家
                this.currentState = "no";
            }
            else if(winRoleId.eq(info.role_id)){
                //赢家
                this.currentState = "win";
            }
            else {
                //败家
                this.currentState = "fail";
            }

            if(info && info.role_id){
                //有玩家
                this.img_name_di.visible = true;
                this.img_head.source = ResUtil.getDressUpIcon(info.head.toNumber(), info.sex);
                this.lab_name.text = info.name;
            }
            else {
                //没有玩家
                this.img_name_di.visible = false;
                this.img_head.source = "doufa_head";
                this.lab_name.text = "";
            }
            this.img_di.source = isFirst ? "doufa_first_head_frame" : "doufa_head_frame";//第一名底
            this.img_has.visible = !!isGuess;//已下注
            this.lab_no.visible = !!isEmpty;//轮空
        }
    }
}