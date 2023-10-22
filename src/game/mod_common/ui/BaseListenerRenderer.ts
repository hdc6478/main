namespace game.mod {
    import Event = egret.Event;

    export class BaseListenerRenderer extends eui.ItemRenderer implements eui.UIComponent {

       private  _eventList: {[key: string] : {listener: Function, obj: any}}[];
        constructor() {
            super();
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this._eventList = [];
        }


        addEventListenerEx(type: string,listenerObjParam:egret.DisplayObject,listenerFuncParam: Function, funcObjParam: any):void{
            if(!this._eventList[type]){
                this._eventList[type] = [];
            }

            let maps = this._eventList[type];
            let len = maps.length;
            for(let i = 0;i < len; i ++){
                let d = maps[i];
                if(d.listenerObj == listenerObjParam && d.listener == listenerFuncParam && d.funcObj == funcObjParam){
                    return;
                }
            }

            listenerObjParam.addEventListener(type,listenerFuncParam,funcObjParam);
            maps.push({listenerObj:listenerObjParam,listenerFunc:listenerFuncParam,funcObj:funcObjParam});

        }

        protected onAddToStage() {
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            for(let k in this._eventList){
                let d:any = this._eventList[k] || [];
                let len = d.length;
                for(let i = 0; i < len; i++){
                    let d2 = d[i];
                    if(!d2){
                        continue;
                    }
                    d2.listenerObj.removeEventListener(k,d2.listenerFunc,d2.funcObj);
                }
            }

            this._eventList = [];

            this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }
    }
}
