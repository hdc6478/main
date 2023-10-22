namespace game {
    import Image = eui.Image;
    import UIComponentImpl = eui.sys.UIComponentImpl;
    import Event = egret.Event;
    import ItemRenderer = eui.ItemRenderer;
    import getQualifiedClassName = egret.getQualifiedClassName;
    import registerImplementation = egret.registerImplementation;
    import Handler = base.Handler;
    import facade = base.facade;
    import getClassName = base.getClassName;

    export function initEui(): void {
        registerImplementation("eui.IAssetAdapter", {getAsset: getAsset});
        testEuiImage();
        testEuiRender();
    }

    function getAsset(source: string, callBack: (content: any, source: string) => void, thisObject: any): void {
        AssetsMgr.ins.getResAsync(source, Handler.alloc(thisObject, callBack));
    }

    function testEuiImage() {
        let sourceStr: string = "source";
        let typeStr: string = "string";
        let prototype: any = Image.prototype;
        let propDesc: PropertyDescriptor = Object.getOwnPropertyDescriptor(prototype, sourceStr);
        let setter: (value: any) => void = propDesc.set;
        propDesc.set = function (value) {
            let img: Image = <Image>this;
            let source = img.source;
            if (source != value) {
                if (typeof source === typeStr) {
                    AssetsMgr.ins.decRef(<string>source);
                }
                source = value;
                if (typeof source === typeStr) {
                    if (DEBUG) {
                        checkImg(img);
                    }
                    AssetsMgr.ins.addRef(<string>source);
                }
            }
            setter.call(img, value);
        };
        Object.defineProperty(prototype, sourceStr, propDesc);
        let initStr: string = "initializeUIValues";
        let oldStr: string = "oldSource";
        prototype.__addedHack__ = function () {
            let img: Image = this;
            if (img[oldStr]) {
                if (!img.source) {
                    img.source = img[oldStr];
                }
                img[oldStr] = undefined;
            }
            if (DEBUG) {
                checkImg(img);
            }
        };
        prototype.__removedHack__ = function () {
            let img: Image = this;
            if (typeof img.source === typeStr) {
                img[oldStr] = img.source;
                img.source = undefined;
            }
        };
        prototype[initStr] = function () {
            let img = this;
            UIComponentImpl.prototype[initStr].call(img);
            img.addEventListener(Event.ADDED_TO_STAGE, img.__addedHack__, img);
            img.addEventListener(Event.REMOVED_FROM_STAGE, img.__removedHack__, img);
        };
    }

    function testEuiRender() {
        let dataStr: string = "data";
        let prototype = ItemRenderer.prototype;
        let propDesc: PropertyDescriptor = Object.getOwnPropertyDescriptor(prototype, dataStr);
        propDesc.set = function (value) {
            let renderer: any = this;
            renderer._data = value;
            eui.PropertyEvent.dispatchPropertyEvent(renderer, eui.PropertyEvent.PROPERTY_CHANGE, dataStr);
            try {
                renderer.dataChanged();
            } catch (e) {
                console.error("data setter at " + getQualifiedClassName(renderer), e);
            }
        };
        Object.defineProperty(prototype, dataStr, propDesc);

        eui.ArrayCollection.prototype.replaceAll = function (newSource) {
            if (!newSource)
                newSource = [];

            newSource = newSource.concat();
            var newLength = newSource.length;

            // @ts-ignore
            var oldLength = this._source.length;
            for (var i = newLength; i < oldLength; i++) {
                this.removeItemAt(newLength);
            }
            for (var i = 0; i < newLength; i++) {
                if (i >= oldLength)
                    this.addItemAt(newSource[i], i);
                else
                    this.replaceItemAt(newSource[i], i);
            }
            // @ts-ignore
            this._source = newSource;
        };
    }

    let getModName: (img: Image) => { mdrName: string, modName: string }, checkImg: (img: Image) => void;
    if (DEBUG) {
        getModName = function (img: Image) {
            let p = img.parent;
            while (p) {
                let property: PropertyDescriptor = Object.getOwnPropertyDescriptor(p, "__mdr__");
                if (property) {
                    let mdr = property.value;
                    let mdrName = egret.getQualifiedClassName(mdr);
                    let mod = mdr._owner;
                    if (mod) {
                        let numName = mod.getName();
                        let map = facade["_moduleMap"]
                        for (let k in map) {
                            if (map[k]["__name"] === numName) {
                                let modName = getClassName(map[k]);
                                let list = modName.split(".")
                                modName = list[list.length - 1];
                                modName = modName.replace("Mod", "");
                                return {mdrName, modName};
                            }
                        }
                    }
                }
                p = p.parent;
            }
            return null;
        };

        checkImg = function (img: Image) {
            // if (!img.stage) {
            //     return;
            // }
            // if (typeof img.source !== "string") {
            //     return;
            // }
            // let resInfo = AssetsMgr.ins["getResInfo"](img.source);
            // if (resInfo) {
            //     let url = resInfo.url;
            //     if (url.indexOf("/common/main") > -1) {
            //         return;
            //     }
            //     if (url.indexOf("/aaaa/ui_btn_icon") > -1) {
            //         return;
            //     }
            //     console.error("新号加载了多余的UI", url);
            //     // if (url.indexOf("/other_ui") > -1) {
            //     //     return;
            //     // }
            //     // if (url.indexOf("ui/") === 0) {
            //     //     let a = url.split("/");
            //     //     let mod = a[1];
            //     //     let obj = getModName(img);
            //     //     if (!obj) {
            //     //         console.error("checkUI:", egret.getQualifiedClassName(img), img, url);
            //     //     } else if (mod.toLowerCase() !== obj.modName.toLowerCase()) {
            //     //         console.error("checkUI:", obj.mdrName, url);
            //     //     }
            //     // }
            // }
        };
    }
}
