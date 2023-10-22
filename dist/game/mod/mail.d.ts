declare namespace game.mod.mail {
    class MailMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.mail {
    import mail_data = msg.mail_data;
    class MailModel {
        isInit: boolean;
        mails: mail_data[];
        mailHint: boolean;
        type: number;
        mails_len: number[];
        curMailsLen: number[];
        isMaxProp: boolean;
        coolTime: number;
        isOpenMailView: boolean;
        feedBackHint: boolean;
    }
}
declare namespace game.mod.mail {
    import mail_attachments = msg.mail_attachments;
    class MailPropData {
        prop: mail_attachments;
        is_taken: number;
    }
}
declare namespace game.mod.mail {
    import mail_data = msg.mail_data;
    class MailProxy extends ProxyBase implements IMailProxy {
        private _model;
        onStartReconnect(): void;
        getModel(): MailModel;
        initialize(): void;
        /**
         * 上线请求邮件
         */
        mail_online_request_c2s(): void;
        /**
         *读取邮件
         * @param {long.Long} id
         * @param type
         */
        mail_read_c2s(id: Long, type: number): void;
        /**
         * 领取附件
         * @param {long.Long} id
         * @param type
         */
        mail_take_c2s(id: Long, type: number): void;
        /**
         * 一键删除
         */
        mail_onekey_delete_c2s(): void;
        /**
         * 一键领取
         */
        mail_onekey_take_c2s(): void;
        /**
         * 所有邮件
         * @param {base.GameNT} n
         */
        private mail_all_s2c;
        /**
         * 获取总邮件数
         */
        getTotalMailCnt(): number;
        /**
         * 更新邮件
         * @param {base.GameNT} n
         */
        private mail_update_s2c;
        /**
         * 删除邮件
         * @param {base.GameNT} n
         */
        private mail_delete_s2c;
        getMail(id: Long): mail_data;
        readonly mails: mail_data[];
        readonly mails_len: number[];
        private updateMailsLen;
        checkMailRemind(): void;
        private updateMailHint;
        getList(type?: number): mail_data[];
        type: number;
        /*******************************意见反馈***************************/
        private updateFeedBackHint;
        private checkFeedBackHint;
        readonly feedBackHint: boolean;
        /**意见反馈答复邮件*/
        readonly answerMail: mail_data[];
        private sortMail;
    }
}
declare namespace game.mod.mail {
    class MailDescView extends eui.Component {
        secondPop: game.mod.SecondPop;
        lb_desc: eui.Label;
        list: eui.List;
        btn_get: Btn;
        img_geted: eui.Image;
        constructor();
    }
}
declare namespace game.mod.mail {
    import mail_data = msg.mail_data;
    class MailItem extends BaseRenderer {
        private icon;
        private lab_title;
        private lab_time;
        private img;
        private redPoint;
        data: mail_data;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.mail {
    class MailView extends eui.Component {
        btn_get: Btn;
        btn_del: Btn;
        scroller: eui.Scroller;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.mail {
    class MailDescMdr extends MdrBase {
        private _view;
        private _listData;
        private _proxy;
        private _hasEquip;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private updateGetBtnStatus;
        private onClickGet;
    }
}
declare namespace game.mod.mail {
    class MailMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onInit(): void;
        protected onTabCheck(index: number): boolean;
    }
}
declare namespace game.mod.mail {
    class MailMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _equips;
        protected onInit(): void;
        protected addListeners(): void;
        private onScrollEnd;
        protected onShow(): void;
        private onUpdateView;
        private checkEquipCnt;
        private onClickGet;
        private onClickDel;
        protected onHide(): void;
    }
}
