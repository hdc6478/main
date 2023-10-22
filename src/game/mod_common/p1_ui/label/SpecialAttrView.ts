namespace game.mod {
    import Event = egret.Event;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import HorseConfig = game.config.HorseConfig;
    import XianchongConfig = game.config.XianchongConfig;
    import NewPrivilegeConfig = game.config.NewPrivilegeConfig;
    import BuffConfig = game.config.BuffConfig;
    /**
     * 特殊属性组件
     */
    export class SpecialAttrView extends eui.Component {
        public lab_desc: eui.Label;
        private list_desc: eui.List;

        private _index: number;//外显index
        private _maxWidth: number;//最大文本宽度
        private _specialIndexList: number[][];//特殊属性
        private _privilegeIdList: number[][];//特权ID
        private _buffIdList: number[];//buffId
        private _special_desc: string;//特殊属性前置描述

        private _proxy: ISurfaceProxy;
        private _attrList: ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.common.SpecialAttrSkin";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);

            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
        }

        private onAddToStage() {
            facade.onNt(SurfaceEvent.SURFACE_SPECIAL_ATTR_UPDATE, this.onInfoUpdate, this);
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            this.initAttrList();
        }

        private onRemove() {
            facade.offNt(SurfaceEvent.SURFACE_SPECIAL_ATTR_UPDATE, this.onInfoUpdate, this);
            this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        private initAttrList(): void {
            if(!this._attrList){
                this._attrList = new ArrayCollection();
            }
            this.list_desc.itemRenderer = SpecialAttrItemRender;
            this.list_desc.dataProvider = this._attrList;
        }

        private onClick(): void {
            this.visible = false;
        }

        private onInfoUpdate(): void {
            if(!this.visible){
                return;
            }
            if(this.currentState == "1"){
                this.updateShow();
            }
            else {
                this.updateShowList();
            }
        }

        private updateShow(): void {
            let descStr = "";
            if(this._special_desc){
                //特殊属性前置描述
                descStr = this._special_desc;
            }

            if(this._specialIndexList.length){
                //特殊属性
                let specialIndex = this._specialIndexList[0][0];
                descStr += this.getDesc(specialIndex, this._index);
            }
            if(this._privilegeIdList.length){
                //特权ID
                let privilegeId = this._privilegeIdList[0][0];
                descStr += this.getDesc(privilegeId);
            }
            if (this._buffIdList.length) {
                //buffId
                let buffId = this._buffIdList[0];
                descStr += this.getDesc(buffId);
            }
            this.lab_desc.textFlow = TextUtil.parseHtml(descStr);
            if(this._maxWidth){
                this.lab_desc.maxWidth = this._maxWidth;
            }
        }

        private getDesc(id: number, index?: number): string {
            if(index){
                //特殊属性
                return this._proxy.getSpecialAttrDesc(index, id);
            }

            //buffId
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, id);
            if (buffCfg) {
                return buffCfg.des || '';
            }

            let pCfg: NewPrivilegeConfig = getConfigByNameId(ConfigName.NewPrivilege, id);
            if(!pCfg){
                console.info("灵宠ID：", this._index, "灵宠特权配置不对，特权ID：", id);
            }
            return pCfg && pCfg.desc || "";
        }

        private getDescByCfg(id: number, star: number, index?: number): string {
            let descStr = this.getDesc(id, index);
            if(star){
                //星级属性
                descStr = star + "★：" + descStr;
                let curStar = SurfaceUtil.getStar(this._index);
                if(curStar >= star){
                    descStr = TextUtil.addColor(descStr, WhiteColor.GREEN);
                }
            }
            return descStr;
        }

        private updateShowList(): void {
            let infos: {descStr: string, maxWidth: number}[] = [];
            if(this._special_desc){
                //特殊属性前置描述
                infos.push({descStr: this._special_desc, maxWidth: this._maxWidth});
            }
            let tmpList: {sort: number, descStr: string}[] = [];

            for(let i of this._specialIndexList){
                let id = i[0];//第一个是属性ID
                let star = i.length > 1 ? i[1] : 0;//有星级的时候取星级
                let descStr = this.getDescByCfg(id, star, this._index);
                if(star){
                    //存在星级配置
                    tmpList.push({sort: star, descStr: descStr});
                }
                else {
                    infos.push({descStr: descStr, maxWidth: this._maxWidth});
                }
            }
            for(let i of this._privilegeIdList){
                let id = i[0];//第一个是特权ID
                let star = i.length > 1 ? i[1] : 0;//有星级的时候取星级
                let descStr = this.getDescByCfg(id, star);
                if(star){
                    //存在星级配置
                    tmpList.push({sort: star, descStr: descStr});
                }
                else {
                    infos.push({descStr: descStr, maxWidth: this._maxWidth});
                }
            }
            for (let i of this._buffIdList) {
                let descStr = this.getDescByCfg(i, null);
                infos.push({descStr: descStr, maxWidth: this._maxWidth});
            }
            if(tmpList.length){
                tmpList.sort(SortTools.sortByRort);
                for(let i of tmpList){
                    infos.push({descStr: i.descStr, maxWidth: this._maxWidth});
                }
            }
            this._attrList.source = infos;
        }

        /**属性显示
         * cfg 外显配置
         * maxWidth 文本最大宽度，特殊界面设置用
         * */
        public updateDesc(cfg: HorseConfig | XianchongConfig | any, maxWidth?: number): void {
            if (!cfg || (!cfg.special_attr_id && !cfg.privilege_id && !cfg.special_desc && !cfg.buff_id)) {
                //灵宠需要额外判断特权ID
                this.visible = false;
                return;
            }
            this.visible = true;
            this._index = cfg.index;
            this._maxWidth = maxWidth;
            this._specialIndexList = [];//置空
            this._privilegeIdList = [];//置空
            this._buffIdList = [];//置空
            this._special_desc = null;

            let special_attr_id = cfg.special_attr_id;
            if(special_attr_id){
                //特殊属性
                if(Array.isArray(special_attr_id)){
                    //数组
                    this._specialIndexList = special_attr_id;
                }
                else {
                    this._specialIndexList.push([special_attr_id]);
                }
            }
            let privilege_id = cfg.privilege_id;
            if(privilege_id){
                //特权ID
                if(Array.isArray(privilege_id)){
                    //数组
                    this._privilegeIdList = privilege_id;
                }
                else {
                    this._privilegeIdList.push([privilege_id]);
                }
            }
            let buff_id = cfg.buff_id;
            if (buff_id) {
                //buffId
                if (Array.isArray(buff_id)) {
                    this._buffIdList = buff_id;
                } else {
                    this._buffIdList.push(buff_id)
                }
            }
            let len = this._specialIndexList.length + this._privilegeIdList.length + this._buffIdList.length;//属性条数
            if(cfg.special_desc){
                this._special_desc = cfg.special_desc;
                len++;//加上前置属性描述
            }

            if(len > 1){
                //多条属性的时候
                this.currentState = "2";
                this.updateShowList();
            }
            else {
                //只有一条属性的时候
                this.currentState = "1";
                this.updateShow();
            }
        }
    }
}