namespace game.mod.role {

    import DressConfig = game.config.DressConfig;
    import base_surface_item = msg.base_surface_item;

    export class DressUpItemIcon extends BaseListenerRenderer {
        // public icon: game.mod.Icon;
        public icon: eui.Image;
        public lb_starLv: eui.Label;
        public img_star: eui.Image;
        public img_use: eui.Image;
        public img_mask: eui.Image;
        public img_yuan: eui.Image;
        public redPoint: eui.Image;

        private _proxy: DressUpProxy;

        constructor() {
            super();
            this._proxy = getProxy(ModName.Role, ProxyType.DressUp);
        }

        protected onRemoveFromStage(): void {
        }

        protected dataChanged(): void {
            let _data: DressConfig = this.data;
            if (!_data) {
                return;
            }
            let _prop: PropData = PropData.create(_data.index);
            // this.icon.setData(_prop,IconShowType.NotTips);

            let _info: base_surface_item = this._proxy.getDressByIdx(_data.index);
            if (!_info || _info.lv == 0) {
                this.img_mask.visible = true;
                this.lb_starLv.visible = this.img_star.visible = false;
            } else {
                this.img_mask.visible = false;
                this.lb_starLv.visible = this.img_star.visible = true;
            }
            this.lb_starLv.text = _info && _info.lv.toString() || '0';

            let _type: number = this._proxy.getDressTypeByIdx(_data.index);
            let isWear: boolean;
            let selectedIdx: number;
            let curIdx = this._proxy.curIdxList[_type - 1];
            if (_type == DressUpType.Bubble) {
                isWear = _data.index == this._proxy.chat_frame;
                selectedIdx = curIdx ? curIdx : this._proxy.chat_frame;
                this.icon.source = _prop.cfg.resource;
            } else if (_type == DressUpType.Head) {
                isWear = _data.index == this._proxy.head;
                selectedIdx = curIdx ? curIdx : this._proxy.head;
                this.img_yuan.visible = true;
                this.icon.source = _prop.cfg.resource;
            } else {
                isWear = _data.index == this._proxy.head_frame;
                selectedIdx = curIdx ? curIdx : this._proxy.head_frame;
                this.img_yuan.visible = false;
                this.icon.source = _prop.cfg.resource;
            }

            // this.currentState = (selectedIdx == _data.index || _data.index == this._proxy.selectedIndex) ? "upAndSelected" : "up";
            this.img_use.visible = isWear;
            this.redPoint.visible = this._proxy.canActOrUpStar(_data.index);
        }
    }
}