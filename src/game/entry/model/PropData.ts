namespace game {
    import prop_attributes = msg.prop_attributes;
    import PoolObject = base.PoolObject;
    import Pool = base.Pool;
    import attributes = msg.attributes;
    import ITextElement = egret.ITextElement;
    import jipin_attrs_data = msg.jipin_attrs_data;
    import gem_data = msg.gem_data;
    import nvshen_hunka_struct = msg.nvshen_hunka_struct;

    /**
     * 道具数据类
     */
    export class PropData implements PoolObject {
        private _prop_id: Long;/** 唯一id*/
        private _index: number;/** 物品编号*/
        private _count: number;/** 数量*/
        private _quality: number;/** 品质*/
        private _iconShowType: number = IconShowType.Reward;/**显示类型，客户端定义*/

        private _regular_attrs: attributes;/** 装备固定属性*/
        private _zengfu_attrs: attributes;/**装备增幅属性*/
        private _zengfu_lv: number;/**装备增幅属性等级*/
        private _jipin_list: jipin_attrs_data[];/**装备极品属性*/
        private _advanced_lv: number;/**装备进阶等级*/
        private _advanced_attrs: attributes;/**装备进阶属性*/
        private _strength: number;/**强化等级*/
        private _strength_attrs: attributes;/**强化属性*/
        private _gems: gem_data[];/**宝石列表*/
        private _advanced_master_attrs: attributes;/**进阶套装属性*/

        ///////////魂卡相关数据////////////////////////
        private _hunka_star: number;///魂卡星级
        private _hunka_zizhi: number;///魂卡资质
        private _guding: nvshen_hunka_struct;///固定词条
        private _shuiji: nvshen_hunka_struct[];///随机词条
        private _pingfen: number;///魂卡评分

        private _born_login_days: number;//得到时候玩家的登录天数

        static  headMap:{[type:string]:{[index:string]:number}} = {};

        /**
         *更新数据
         * @param {msg.prop_attributes} attr
         * @param {boolean} _isSome 是否缺省替换
         */
        public update(attr: prop_attributes, _isSome: boolean = false): void {
            let self = this;
            let keys;
            keys = Object.keys(attr);
            for (let i = 0, len = keys.length; i < len; i++) {
                let key = keys[i];
                if (_isSome && self[`_${key}`] == undefined) continue;
                if (key == "index" && Long.isLong(attr[key])) {
                    self[`_${key}`] = attr[key].toNumber();/**index转换成number类型*/
                    continue;
                }
                self[`_${key}`] = attr[key];
            }
        }
        /**
         *更新数据
         */
        public update2(obj: any, name: string, _isSome: boolean = false): void {
            let self = this;
            if (obj) {
                self[`_${name}`] = obj;
            }
        }

        onAlloc(): void {
        }

        onRelease(): void {
            let self = this;
            let keys = Object.keys(self);
            for (let i of keys) {
                if (typeof self[i] != "function") {
                    self[i] = null;
                }
            }
        }

        dispose(): void {
            this.onRelease();
        }

        /**
         * 克隆数据
         * @param prop
         */
        public static clone(prop: PropData): PropData {
            if (!prop) {
                return null;
            }
            let data: PropData = Pool.alloc(PropData);
            let keys: string[] = Object.keys(prop);
            for (let k of keys) {
                data[k] = prop[k];
            }
            return data;
        }

        /**
         * 过滤掉属性为 0 的属性
         */
        public static filterAtr0(source:attributes):attributes{
            let attr = {};
            for(let k in source){
                let d = source[k];

                if(Long.isLong(d)){
                    if((d as Long).toNumber() != 0){
                        attr[k] = d;
                    }
                }else{
                    if(d != 0){
                        attr[k] = d;
                    }
                }

                // if(egret.NumberUtils.isNumber(d)){
                //     if(d != 0){
                //         attr[k] = d;
                //     }
                // }
            }
            return attr as attributes;
        }

        /**
         *创建数据
         * @param {number} index
         * @param {number} count
         * @param {number} iconShowType 类型
         * @returns {game.PropData}
         */
        public static create(index: number | Long, count: number = 0, iconShowType?: number): PropData {
            if(index instanceof Long){
                index = index.toNumber();
            }
            let cfg = getConfigById(index);
            if (!cfg) {
                console.error("cfg error! " + index);
                return null;
            }
            let data: PropData = Pool.alloc(PropData);
            data._index = index;
            data._count = count;
            data._quality = cfg.quality;
            if(iconShowType){
                data.iconShowType = iconShowType;
            }
            return data;
        }

        /**转换数据*/
        public static fromData(attr: prop_attributes): PropData {
            if (!attr) {
                return null;
            }
            let data: PropData = this.create(attr.index.toNumber(), attr.count);
            if (!data) return null;
            data._prop_id = attr.prop_id;
            data.update(attr);
            return data;
        }

        /** 根据物品id获取物品类型 -DE，PropType*/
        public static propType(index:number): number {
            return PropData.getPropParse(index, PropParseType.PropType);
        }

        /**显示类型，客户端定义*/
        public get iconShowType(): number {
            return this._iconShowType;
        }
        public set iconShowType(value: number) {
            this._iconShowType = value;
        }
        /** 唯一id*/
        public get prop_id(): Long {
            return this._prop_id;
        }
        /** 物品编号*/
        public get index(): number {
            return this._index;
        }
        /** 数量*/
        public get count(): number {
            return this._count;
        }
        public set count(value: number) {
            this._count = value;
        }
        /** 品质*/
        public get quality(): number {
            return this._quality;
        }
        /** 获取配置*/
        public get cfg() {
            return getConfigById(this._index);
        }

        /**获取index规则对应的类型，目前只有进背包的道具会用到*/
        public static getPropParse(index: number, parseType: PropParseType = PropParseType.Type): number {
            this.headMap[parseType] = this.headMap[parseType] || {};
            let parseMap:{[index:string]:number} = this.headMap[parseType];
            if(parseMap[index]){
                return parseMap[index];
            }else{
                let info = PropParseTypeList[parseType];
                let str = index.toString().slice(info[0], info[0] + info[1]);
                parseMap[index] = parseInt(str);
                return parseMap[index];
            }

            // let info = PropParseTypeList[parseType];
            // let str = index.toString().slice(info[0], info[0] + info[1]);
            // return parseInt(str);
        }

        /** 大类 -ABCDE，用于bag_type配置取排序*/
        public get bigType(): number {
            return PropData.getPropParse(this._index, PropParseType.BigType);
        }

        /** 表头 -ABC，表头ConfigHead*/
        public get type(): number {
            return PropData.getPropParse(this._index, PropParseType.Type);
        }

        /** 道具表物品类型 -DE，PropType*/
        public get propType(): number {
            return PropData.getPropParse(this._index, PropParseType.PropType);
        }

        /** 物品子类型 -FG*/
        public get propSubType(): number {
            return PropData.getPropParse(this._index, PropParseType.PropSubType);
        }

        /** 物品或者装备分解获得*/
        public get resolve(): number[][] {
            return this.cfg.resolve;
        }

        /** 物品描述*/
        public get desc(): string {
            return this.cfg.desc;
        }

        /** 获取途径跳转ID*/
        public get gain_id(): number[] {
            return this.cfg.gain_id;
        }

        /** 物品名称，格式化好的*/
        public getPropName(isWhite: boolean = true): ITextElement[] {
            return TextUtil.parseHtml(this.getPropNameStr(isWhite));
        }

        /** 物品名称*/
        public getPropNameStr(isWhite: boolean = true): string {
            if (isWhite) {
                return TextUtil.addColor(this.cfg.name, ColorUtil.getColorByQuality1(this.quality));
            }
            return TextUtil.addColor(this.cfg.name, ColorUtil.getColorByQuality2(this.quality));
        }

        /**装备部位*/
        public get equipPos(): number {
            return this.index % 10;
        }

        /**装备星级*/
        public get equipStar(): number {
            return Math.floor(this.index / 10) % 10;
        }

        // /** 武器/装备战力*/
        // public get showPower(): Long {
        //     let totalPower: Long = Long.fromValue(0);
        //     if (this.regular_attrs && this.regular_attrs.showpower) {
        //         totalPower = totalPower.add(this.regular_attrs.showpower);
        //     }
        //     //todo，计算强化等战力
        //     return totalPower;
        // }

        /** 装备固定属性*/
        public get regular_attrs(): attributes {
            return this._regular_attrs;
        }

        /**装备增幅属性*/
        public get zengfu_attrs(): attributes {
            return this._zengfu_attrs;
        }

        /**根据属性key获取对应的增幅属性文本*/
        public getZengFuAttrStrByKey(key: string): string {
            let attrs = this.zengfu_attrs;
            let str = '';
            if (attrs && attrs[key]) {
                str = TextUtil.getAttrsPerCent(key, attrs[key]);
            }
            if (!str) {
                str = '0';
            }
            return TextUtil.addColor(`  (增幅+${str})`, BlackColor.BLUE);
        }

        /**装备极品属性*/
        public get jipin_list(): jipin_attrs_data[] {
            return this._jipin_list || [];
        }

        /**装备增幅属性等级*/
        public get zengfu_lv(): number {
            return this._zengfu_lv;
        }

        /**装备进阶等级*/
        public get advanced_lv(): number {
            return this._advanced_lv;
        }
        public set advanced_lv(val: number) {
            this._advanced_lv = val;
        }
        /**装备进阶属性*/
        public get advanced_attrs(): attributes {
            return this._advanced_attrs;
        }
        public set advanced_attrs(val: attributes) {
            this._advanced_attrs = val;
        }

        /**强化等级*/
        public get strength(): number {
            return this._strength;
        }
        public set strength(val: number) {
            this._strength = val;
        }
        /**强化属性*/
        public get strength_attrs(): attributes {
            return this._strength_attrs;
        }
        public set strength_attrs(val: attributes) {
            this._strength_attrs = val;
        }

        /**宝石列表 */
        public get gems(): gem_data[] {
            return this._gems;
        }
        public set gems(val: gem_data[]) {
            this._gems = val;
        }

        /**进阶套装属性*/
        public get advanced_master_attrs(): attributes {
            return this._advanced_master_attrs;
        }
        public set advanced_master_attrs(val: attributes) {
            this._advanced_master_attrs = val;
        }

        //魂卡星级
        public get hunka_star(): number {
            return this._hunka_star;
        }
        //魂卡资质
        public get hunka_zizhi(): number {
            return this._hunka_zizhi;
        }
        //固定词条
        public get guding(): nvshen_hunka_struct {
            return this._guding;
        }
        //随机词条
        public get shuiji(): nvshen_hunka_struct[] {
            return this._shuiji;
        }
        //魂卡评分
        public get pingfen(): number {
            return this._pingfen;
        }

        //得到时候玩家的登录天数
        public get born_login_days(): number {
            return this._born_login_days;
        }
    }
}
