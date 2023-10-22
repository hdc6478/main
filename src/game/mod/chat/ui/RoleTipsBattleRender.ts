namespace game.mod.chat {


    import ride_info = msg.ride_info;
    import LanDef = game.localization.LanDef;

    export class RoleTipsBattleRender extends eui.ItemRenderer {
        public icon: Icon;
        public lab_desc: eui.Label;
        public grp_star: eui.Group;
        public lab_star: eui.Label;
        public img_star: eui.Image;

        public data: ride_info;

        protected dataChanged(): void {
            if (!this.data || !this.data.cur_ride) {
                this.icon.defaultIcon();
                this.icon.setImgLock();
                this.lab_desc.text = "";
                this.grp_star.visible = false;
                return;
            }
            let index = this.data.cur_ride;
            this.icon.setData(index, IconShowType.NotTips);
            this.icon.setImgGray("");

            let headType = this.data.head_type;
            let descStr = getLanById(ConfigHeadToName[headType]);
            let stage = SurfaceUtil.calcSurfaceStage(this.data.level, headType);
            if(stage){
                descStr += " " + stage + getLanById(LanDef.tishi_43);
            }
            this.lab_desc.text = descStr;

            this.grp_star.visible = true;
            let star = 0;
            for(let info of this.data.ride_list){
                if(info.index == index){
                    star = info.star;
                    break;
                }
            }
            this.lab_star.text = star + "";
        }
    }
}