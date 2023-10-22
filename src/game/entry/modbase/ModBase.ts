namespace game {

    export class ModBase extends base.Mod {
        regProxy<T extends base.IProxy>(type: number, cls: { new(): T }) {
            super.regProxy(type, cls);
            //内网调试使用
            if (DEBUG && window) {
                let name = egret.getQualifiedClassName(cls);
                let lastName = name.split('.');
                let className = lastName[lastName.length - 1];
                window[className] = this.retProxy(type);
            }
        }

    }

}
