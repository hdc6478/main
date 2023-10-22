namespace game {

    import ParamConfig = game.config.ParamConfig;
    import TipsConfig = game.config.TipsConfig;
    import PropConfig = game.config.PropConfig;
    import EquipmentConfig = game.config.EquipmentConfig;
    import BuffConfig = game.config.BuffConfig;

    /**
     * 经常调用的配置接口，可统一写在此处
     */
    export class GameConfig {

        public static getParamConfigById(id: number | string): ParamConfig {
            return getConfigByNameId(ConfigName.Param, id);
        }

        public static getPropConfigById(id: number | string): PropConfig {
            let cfg = getConfigById(id);
            if (!cfg) {
                DEBUG && console.error(`道具表没有配置：${id}`);
                return null;
            }
            return cfg;
        }

        public static getEquipmentCfg(id: number): EquipmentConfig {
            let cfg = getConfigById(id);
            if (!cfg) {
                DEBUG && console.error(`装备表没有配置：${id}`);
                return null;
            }
            return cfg;
        }
    }

    const configListMap: { [key: string]: any[] } = {};

    export function getConfigByName(name: string): object {
        return LoadMgr.ins.getRes("assets/data/" + name)
            || LoadMgr.ins.getRes("assets/data_server/" + name);
    }

    export function getConfigListByName(name: string): any[] {
        let list: any[] = configListMap[name];
        if (list) {
            return list;
        }
        let obj = getConfigByName(name);
        if (!obj) return null;
        configListMap[name] = list = [];
        let kList: string[] = getObjKList(obj);
        for (let i: number = 0, len: number = kList.length; i < len; i++) {
            list.push(obj[kList[i]]);
        }
        return list;
    }

    function getObjKList(obj: object): string[] {
        let kList: string[] = Object.keys(obj);
        kList.sort(/^[0-9]*$/.test(kList[0]) ? sortNum : undefined);
        return kList;
    }

    function sortNum(a: string, b: string): number {
        let na: number = +a | 0;
        let nb: number = +b | 0;
        return na < nb ? -1 : 1;
    }

    export function getConfigByNameId(name: string, id: string | number): any {
        if (name == undefined || id == undefined) {
            return null;
        }

        let obj = getConfigByName(name);
        if (obj && obj.hasOwnProperty(id.toString())) {
            return obj[id];
        }

        //for (let configName in SplitConfigMap) {
        let configList = SplitConfigMap[name];// SplitConfigMap[configName];
        if(!configList){
            return null;
        }

        for(let j = 0; j < configList.length; j++){
            let data = configList[j];
            let tab = getConfigByName(data);
            if(!tab[id]){
                continue;
            }
            return tab[id];
        }
        return null;
            //let ret = getNextConfig(configName, configList);
        //}

        // function getNextConfig(configName: string, configList: string[]): any {
        //     let num = parseInt(name.substring(configName.length, configName.length + 1));
        //     if (num >= configList.length) return null;
        //     num++;
        //     let nextName = configName + num + ".json";
        //     return getConfigByNameId(nextName, id);
        // }
    }

    export function getConfigById(id: string | number): any {
        if (id == undefined) {
            return null;
        }
        if(typeof id == "string"){
            id = parseInt(id);
        }
        let head = PropData.getPropParse(id, PropParseType.Type);
        let configName = ConfigMap[head];
        return getConfigByNameId(configName, id);
    }

    export function getLanById(id: string | number) {
        if (id == undefined) {
            return "";
        }
        let obj = getConfigByName(ConfigName.Tips);
        if (obj && obj.hasOwnProperty(id.toString())) {
            let cfg: TipsConfig = obj[id];
            return cfg.content.replace(/\#N/g, "\n");
        }
        return "";
    }

    export function getConfigZh() {
        let key = {};
        let time = Date.now();
        let cfg_list = getConfigListByName(ConfigName.Tips);
        for (let cfg of cfg_list) {
            let str: TipsConfig = cfg;
            let list = str.content.split("");
            for (let i = 0, len = list.length; i < len; i++) {
                if (key[list[i]]) continue;
                key[list[i]] = true;
            }
        }
        let time1 = Date.now();
        console.warn("耗时1 " + ((time1 - time) / 1000) + "s");
        console.warn(key);
        let keys = Object.keys(key);
        let time2 = Date.now();
        console.warn("耗时2 " + ((time2 - time1) / 1000) + "s");
        console.warn(keys);
        console.warn("字符长度为" + keys.length);
        let time3 = Date.now();
        console.warn("耗时3 " + ((time3 - time2) / 1000) + "s");
    }

    export function getProxy<T extends base.IProxy>(modName: ModName, proxyType: ProxyType): T {
        let mod = base.facade.retMod(modName);
        if (!mod) {
            return null;
        }
        return mod.retProxy(proxyType);
    }
}
