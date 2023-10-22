namespace game.mod.more {


    export class XujieLingbaoMdr extends AmassBaseMdr {
        protected classId: number = AmassClassId.Amass3;

        protected onInit() {
            super.onInit();
            this._view.btn_last.visible = this._view.btn_next.visible = false;
        }

        //更新选中 todo
        protected updateSelIndex(isUpdate?: boolean) {
            let lastSelIndex = this._view.list_type.selectedIndex;
            let selIndex = lastSelIndex >= 0 ? lastSelIndex : 0;
            let canUp: boolean = false;//是否可以升级
            for (let i = 0; i < this._types.length; ++i) {
                let type = this._types[i];
                if (this._proxy.canAmassTypeUp(this.classId, type)) {
                    //选中可以升级的
                    selIndex = i;
                    canUp = true;
                    break;
                }
            }
            this._selType = this._types[selIndex];
            this._view.list_type.selectedIndex = selIndex;
        }

        protected getPropType(): PropType {
            return PropType.ZhanduiLingbao;
        }
    }
}