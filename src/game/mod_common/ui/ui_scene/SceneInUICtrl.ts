namespace game.mod {

    import Time = base.Time;
    import TimeMgr = base.TimeMgr;
    /** EDIT BY YULIANG */
    export class SceneInUICtrl {
        /** 基类只提供LayerAvatar层添加对象逻辑（特效Eft层 和 底图层添加对象，可以在子类中继承添加处理） */

        protected _scene: SceneInUI;

        protected _avatarDict: { [avatar_key: string]: game.scene.BaseActor; };

        constructor() {
            this._avatarDict = Object.create(null);
        }

        public init(scene: SceneInUI): void {
            this._scene = scene;
        }

        public addAvatar(avatar: game.scene.BaseActor, avatar_key: string): void {
            if (this._avatarDict[avatar_key]) {
                return;
            }
            this._avatarDict[avatar_key] = avatar;
            this._scene.addAvatar(avatar);
        }

        public removeAvatar(avatar_key: string): void {
            let tar_avatar: game.scene.BaseActor = this._avatarDict[avatar_key];
            if (!tar_avatar) {
                return;
            }
            this._scene.removeAvatar(tar_avatar);
            delete this._avatarDict[avatar_key];
        }

        public clean(): void {
            for (let key in this._avatarDict) {
                let tmp_avatar: game.scene.BaseActor = this._avatarDict[key];
                this._scene.removeAvatar(tmp_avatar);
            }
            this._avatarDict = Object.create(null);
            this._scene = null;
        }

        public update(time: Time): void {
            for (let key in this._avatarDict) {
                let tmp_avatar: game.scene.BaseActor = this._avatarDict[key];
                let advTime = TimeMgr.getElapseTime(this);
                tmp_avatar.advanceTime(advTime);
            }
        }

    }
}
