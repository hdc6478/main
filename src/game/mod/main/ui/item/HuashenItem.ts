namespace game.mod.main {

    import HuashenConfig = game.config.HuashenConfig;

    export class HuashenItem extends eui.ItemRenderer {
        public btn_huashen: game.mod.Btn;
        public img_lock: eui.Image;
        public img_mark: eui.Image;
        public lab_huashen_val: eui.Label;

        public data: number;//化神ID

        protected dataChanged(): void {
            if(!this.data){
                //没有化神的时候
                this.btn_huashen.icon = "icon_jia2";
                this.img_lock.visible = this.img_mark.visible = false;
                this.lab_huashen_val.text = "";
                return;
            }
            let id = this.data;
            let cfg: HuashenConfig = getConfigByNameId(ConfigName.Huashen, id);
            this.btn_huashen.icon = cfg.icon;
        }

        public setData(data: number): void {
            this.data = data;
        }
        //技能CD
        public updateCd(cd: number, maxCd?: number): void {
            if(!this.data){
                return;
            }
            if(cd <= 0){
                this.img_lock.visible = this.img_mark.visible = false;
            }
            else {
                this.img_lock.visible = this.img_mark.visible = true;
                this.img_mark.height = 66 * cd / maxCd;//满CD时候显示66
            }
            this.lab_huashen_val.text = cd < 0 ? "" : cd + "";
        }
    }
}