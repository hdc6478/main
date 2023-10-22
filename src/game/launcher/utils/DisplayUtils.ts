namespace game {
    export class DisplayUtils {

        //把节点从父类中移除
        public static UnParent(node:egret.DisplayObject):void{
            if(node && node.parent){
                node.parent.removeChild(node);
            }
        }

    }
}