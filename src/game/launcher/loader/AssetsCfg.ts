/** @internal */
namespace game {
    type LegacyResourceConfig = {
        groups: LegacyGroupInfo[],
        resources: LegacyResourceInfo[],
    }

    type LegacyGroupInfo = {
        keys: string,
        name: string
    }

    type LegacyResourceInfo = {
        name: string;
        type: string;
        url: string;
        subkeys?: string
    }

    export type ResourceInfo = {
        name: string;
        url: string;
        subkeys?: string[];
    }

    export class AssetsCfg {
        public resMap: { [key: string]: ResourceInfo };
        public groups: { [key: string]: string[] };
        public subkeyMap: { [key: string]: string };
        public urlMap: { [key: string]: string };

        constructor() {
            this.resMap = Object.create(null);
            this.groups = Object.create(null);
            this.subkeyMap = Object.create(null);
            this.urlMap = Object.create(null);
        }

        public parse(data: LegacyResourceConfig): void {
            let self = this;
            for (let g of data.groups) {
                self.groups[g.name] = g.keys.split(",");
            }
            for (let r of data.resources) {
                let {name, url, subkeys} = r;
                let info: ResourceInfo = {name, url};
                self.resMap[name] = info;
                self.urlMap[url] = name;
                if (subkeys) {
                    info.subkeys = subkeys.split(",");
                    for (let subkey of info.subkeys) {
                        self.subkeyMap[subkey] = name;
                    }
                }
            }

        }

    }

}
