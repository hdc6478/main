/** @internal */
namespace game.login {
    import Event = egret.Event;
    import TouchEvent = egret.TouchEvent;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Handler = base.Handler;
    import Pool = base.Pool;
    import Rectangle = egret.Rectangle;
    import Mdr = base.Mdr;
    import Time = base.Time;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;
    import Tween = base.Tween;

    export class CreateRoleMdr extends Mdr implements UpdateItem {
        private _view: CreateRoleView = this.mark("_view", CreateRoleView);

        private _inputName: boolean = false;
        private _autoCreateTime: number = 10;
        private _curSex: number = Sex.Male;
        private _curAge: number = AgeType.Young;
        private _anim1: UIAnimate;
        private _anim2: UIAnimate;
        private _delayId: number;

        constructor() {
            super(Layer.main);
        }

        protected onShow(): void {
            ggo.removeVerbose();
            let view = this._view;
            view.x = (view.parent.width - view.width) / 2;
            view.y = (view.parent.height - view.height) / 2;
            BgMgr.getIns().setBg(null);
            // gzyyou.sdk.loadReport(REPORT_LOAD.CREATE);
            view.scrollRect = Pool.alloc(Rectangle).setTo(0, 0, view.width, view.height);

            let anim;
            if (!this._anim1) {
                anim = this._anim1 = Pool.alloc(UIAnimate);
                anim.x = 360;
                anim.y = 825;
                anim.times = -1;
                anim.scaleX = anim.scaleY = 1.2;
                anim.speed = 1;
                anim.load("assets/anim/body/create/create_male", 12, true);
                // view.addChildAt(anim, view.getChildIndex(view.btnCreate) + 1);
                view.group_eft.addChild(anim);
            }

            if (!this._anim2) {
                anim = this._anim2 = Pool.alloc(UIAnimate);
                anim.x = 720 + 360 + 40;
                anim.y = 825;
                anim.times = -1;
                anim.scaleX = anim.scaleY = 1.2;
                anim.speed = 1;
                anim.load("assets/anim/body/create/create_female", 12, true);
                // view.addChildAt(anim, view.getChildIndex(view.btnCreate) + 1);
                view.group_eft.addChild(anim);
            }

            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            let sex = proxy.data.sex || Math.floor(Math.random() * 2) + 1;
            this._curSex = sex;
            let _isMale: boolean = sex === Sex.Male;
            view.group_eft.x = _isMale ? 0 : -720;
            // view.imgMale.alpha = _isMale ? 1 : 0;
            // view.imgFemale.alpha = !_isMale ? 1 : 0;
            if(_isMale){
                this.onClickMo();
            }else{
                this.onClickRen();
            }

            this.onClickYoung();

            let name = proxy.data.name;
            if (name && name.trim() != "") {
                view.txtName.text = name;
            } else {
                this.onRandom();
            }
            TimeMgr.addUpdateItem(this, 1000);
            this._delayId = delayCall(Handler.alloc(this, function () {
                console.log("create role start preload");
                PreloadMgr.startLoad();
            }), 1000);
        }

        protected addListeners(): void {
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btnMo, TouchEvent.TOUCH_TAP, this.onClickMo);
            addEventListener(this._view.btnRen, TouchEvent.TOUCH_TAP, this.onClickRen);
            // addEventListener(this._view.btnYoung, TouchEvent.TOUCH_TAP, this.onClickYoung);
            // addEventListener(this._view.btnYouth, TouchEvent.TOUCH_TAP, this.onClickYouth);
            addEventListener(this._view.btnRandom, TouchEvent.TOUCH_TAP, this.onRandom);
            addEventListener(this._view.btnCreate, TouchEvent.TOUCH_TAP, this.onCreate);
            addEventListener(this._view.txtName, Event.CHANGE, this.onNameChanged);
            addEventListener(this._view.txtName, TouchEvent.TOUCH_TAP, this.removeAutoCreate);
        }

        private onCreate() {
            this.removeAutoCreate();
            let name: string = this._view.txtName.text;
            if (!name) {
                this.showView(LoginViewType.Alert, LoginLan.InputName);
                return;
            }
            let sex: number = this._curSex;
            if (!sex) {
                this.showView(LoginViewType.Alert, LoginLan.InputSex);
                return;
            }
            let loginProxy: LoginProxy = this.retProxy(ProxyType.Login);
            loginProxy.createRole(name, sex, this._curAge, 1);
            gzyyou.sdk.loadReport(REPORT_LOAD.kaishiyouxi_click);
            // let roleId = "";
            // let power = 0;
            // let lv = 0;
            // let vip = 0;
            // let money = "0";
            // let time = TimeMgr.time.serverTimeSecond;
            gso.roleName = name;
            // gzyyou.sdk.pointReport(RoleInfoType.Create, lv, roleId, name, vip, money, time, loginProxy.create_time);
        }

        private removeAutoCreate() {
            TimeMgr.removeUpdateItem(this);
            this._view.lab_timeDown.visible = false;
        }

        update(time: Time): void {
            this._autoCreateTime--;
            this._view.lab_timeDown.text = StringUtil.substitute(LoginLan.CreateCountDown, [this._autoCreateTime]);
            this._view.lab_timeDown.visible = true;
            if (this._autoCreateTime <= 1) {
                this.onCreate();
                TimeMgr.removeUpdateItem(this);
            }
        }

        protected onHide(): void {
            // let anim = this._anim;
            // this._anim = null;
            // if (anim) {
            //     if (anim.parent) {
            //         anim.parent.removeChild(anim);
            //     }
            //     Pool.release(anim);
            // }
            let r = this._view.scrollRect;
            Pool.release(r);
            this._view.scrollRect = null;
            TimeMgr.removeUpdateItem(this);
            clearDelay(this._delayId);
            super.onHide();
        }

        private onNameChanged(e: Event) {
            this.removeAutoCreate();
            this._inputName = true;
        }

        private onRandom(e?: TouchEvent) {
            if (e) {
                this.removeAutoCreate();
            }
            let sex: number = this._curSex;
            this._view.txtName.text = TextUtil.getRandomName(sex);
        }

        //选择性别
        private onClickMo() {
            this._curSex = Sex.Male;
            this.updateCurSelSex();
        }

        private onClickRen() {
            this._curSex = Sex.Female;
            this.updateCurSelSex();
        }

        private updateCurSelSex() {
            let _isMo: boolean = this._curSex == Sex.Male;
            // this._view.btnYoung.x = _isMo ? 368 : 152;
            // this._view.btnYouth.x = _isMo ? 504 : 288;
            this._view.btnMo.source = GetCreateRoleUrl(_isMo ? "btn_mo.png" : "btn_mo_hui.png");
            this._view.btnRen.source = GetCreateRoleUrl(_isMo ? "btn_ren_hui.png" : "btn_ren.png");
            this._view.imgTitle.source = GetCreateRoleUrl(_isMo ? "create_title_nan.png" : "create_title_nv.png");
            this.onSexChanged();
        }

        private onClickYoung() {
            this._curAge = AgeType.Young;
            this.updateCurSelAge();
        }

        private onClickYouth() {
            this._curAge = AgeType.Youth;
            this.updateCurSelAge();
        }

        private updateCurSelAge() {
            let _isYoung: boolean = this._curAge == AgeType.Young;
            // this._view.btnYoung.source = GetCreateRoleUrl(_isYoung ? "btn_young.png" : "btn_young_hui.png");
            // this._view.btnYouth.source = GetCreateRoleUrl(_isYoung ? "btn_youth_hui.png" : "btn_youth.png");
        }

        private onSexChanged() {
            this.removeAutoCreate();
            let sex = this._curSex == Sex.Male ? Sex.Male : Sex.Female;
            let isMale: boolean = sex == Sex.Male;
            // this._view.imgFemale.alpha = this._view.imgMale.alpha = 1;
            Tween.remove(this._view.group_eft);
            Tween.get(this._view.group_eft).to({x: isMale ? 0 : -720}, 500);
            //     .exec(Handler.alloc(this, () => {
            //     this._view.imgMale.alpha = isMale ? 1 : 0;
            //     this._view.imgFemale.alpha = !isMale ? 1 : 0;
            // }));
            if (!this._inputName) {
                this.onRandom();
            }
        }
    }
}