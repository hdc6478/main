namespace game.mod.mail {
    import mail_data = msg.mail_data;

    export class MailModel {
        public isInit: boolean = false;
        public mails: mail_data[] = [];//todo 分类型存
        public mailHint: boolean = false;
        type:number;

        public mails_len: number[];
        public curMailsLen: number[] = [];//当前邮件各个数量
        public isMaxProp: boolean = false;

        public coolTime: number;
        public isOpenMailView: boolean = false;

        public feedBackHint: boolean = false;
    }
}
