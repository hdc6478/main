namespace game.mod.mail {
    import c2s_mail_online_request = msg.c2s_mail_online_request;
    import c2s_mail_read = msg.c2s_mail_read;
    import c2s_mail_take = msg.c2s_mail_take;
    import c2s_mail_onekey_delete = msg.c2s_mail_onekey_delete;
    import c2s_mail_onekey_take = msg.c2s_mail_onekey_take;
    import s2c_mail_all = msg.s2c_mail_all;
    import GameNT = base.GameNT;
    import s2c_mail_delete = msg.s2c_mail_delete;
    import mail_data = msg.mail_data;
    import TimeMgr = base.TimeMgr;
    import s2c_mail_update = msg.s2c_mail_update;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;

    export class MailProxy extends ProxyBase implements IMailProxy {
        private _model: MailModel;

        onStartReconnect(): void {
            this._model.isInit = false;

            super.onStartReconnect();
        }

        getModel(): MailModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            let self = this;
            self._model = new MailModel();
            self.onProto(s2c_mail_all, self.mail_all_s2c, self);
            self.onProto(s2c_mail_update, self.mail_update_s2c, self);
            self.onProto(s2c_mail_delete, self.mail_delete_s2c, self);
        }

        /**
         * 上线请求邮件
         */
        public mail_online_request_c2s() {
            let msg: c2s_mail_online_request = new c2s_mail_online_request();
            this.sendProto(msg);
        }

        /**
         *读取邮件
         * @param {long.Long} id
         * @param type
         */
        public mail_read_c2s(id: Long, type: number) {
            let msg: c2s_mail_read = new c2s_mail_read();
            msg.mail_id = id;
            msg.mail_type = type;
            this.sendProto(msg);
        }

        /**
         * 领取附件
         * @param {long.Long} id
         * @param type
         */
        public mail_take_c2s(id: Long, type: number) {
            let msg: c2s_mail_take = new c2s_mail_take();
            msg.mail_id = id;
            msg.mail_type = type;
            this.sendProto(msg);
        }

        /**
         * 一键删除
         */
        public mail_onekey_delete_c2s() {
            let msg: c2s_mail_onekey_delete = new c2s_mail_onekey_delete();
            this.sendProto(msg);
        }

        /**
         * 一键领取
         */
        public mail_onekey_take_c2s() {
            let self = this;
            let msg: c2s_mail_onekey_take = new c2s_mail_onekey_take();
            // if (self._model.mails) {
            //     for (let i = 0, len = self._model.mails.length; i < len; i++) {
            //         let mail = self._model.mails[i];
            //         if (mail.is_readed == 0) {
            //             mail.is_readed = 1;
            //         }
            //     }
            // }
            self.sendProto(msg);
        }

        /**
         * 所有邮件
         * @param {base.GameNT} n
         */
        private mail_all_s2c(n: GameNT) {
            let msg: s2c_mail_all = n.body;
            let self = this;
            self._model.isInit = true;
            if (msg.caps) {
                self._model.mails_len = msg.caps;
            }
            if (msg.mails) {
                self._model.mails = msg.mails;
            }
            //console.warn("获取到的邮件列表",msg.mails);

            // let paramCfg: ParamConfig = getConfigByNameId(ConfigName.Param, "mail_max_num");

            //console.warn("s2c_mail_all ParamConfig mail_max_num",paramCfg);
            // todo 策划需求不主动弹窗 ID1010857
            // let limitMailsCnt: number = paramCfg.value;
            // if (self._model.mails.length >= limitMailsCnt) {
            //     ViewMgr.getIns().show(getLanById(LanDef.mail_max_numtips));
            // }

            self.sendNt(MailEvent.ON_MAIL_UPDATE);
            self.checkMailRemind();
        }

        /**
         * 获取总邮件数
         */
        public getTotalMailCnt(): number {
            let self = this;
            if (!self.mails) {
                return 0;
            }
            return this.mails.length;
        }

        /**
         * 更新邮件
         * @param {base.GameNT} n
         */
        private mail_update_s2c(n: GameNT) {
            let msg: s2c_mail_update = n.body;
            let self = this;
            if (msg.mails && msg.mails.length) {
                for (let i of msg.mails) {
                    let mail: mail_data = self.getMail(i.mail_id);
                    if (mail) {
                        for (let key of Object.keys(i)) {
                            if (i[key] != null) {
                                mail[key] = i[key];
                            }
                        }
                    } else {
                        if (self._model.mails == null) {
                            self._model.mails = [];
                        }
                        self._model.mails.push(i);
                    }
                }
                self.sendNt(MailEvent.ON_MAIL_UPDATE);
            }
            self.checkMailRemind();
        }

        /**
         * 删除邮件
         * @param {base.GameNT} n
         */
        private mail_delete_s2c(n: GameNT) {
            let msg: s2c_mail_delete = n.body;
            let self = this;
            if (msg.mail_ids && msg.mail_ids.length) {
                for (let i of msg.mail_ids) {
                    let mail: mail_data = self.getMail(i);
                    if (mail) {
                        ArrayUtil.removeAt(self._model.mails, self._model.mails.indexOf(mail));
                    }
                }
                self.sendNt(MailEvent.ON_MAIL_UPDATE);
            }
            self.checkMailRemind()
        }


        public getMail(id: Long): mail_data {
            let self = this;
            if (self._model.mails && self._model.mails.length) {
                for (let i of self._model.mails) {
                    if (i.mail_id.eq(id)) {
                        return i;
                    }
                }
            }
            return null;
        }

        public get mails(): mail_data[] {
            return this._model.mails;
        }

        public get mails_len(): number[] {
            return this._model.mails_len;
        }

        private updateMailsLen() {
            let self = this;
            self._model.curMailsLen.length = 0;
            let bool = true;
            for (let i = 0; i < self.mails.length; i++) {
                let mail = self.mails[i];
                let type = 0;
                if (mail.mail_type == 5) {//活动类型邮件
                    type = 2;
                    if (mail.is_taken == 1) {
                        bool = false;
                    }
                } else if (mail.mail_type == 4) {//挂机类型邮件
                    type = 1;
                }
                if (self._model.curMailsLen[type] == null) {
                    self._model.curMailsLen[type] = 0;
                }
                self._model.curMailsLen[type] += 1;
            }
            if (!self._model.curMailsLen[2]) {
                bool = false;
            }
            self._model.isMaxProp = bool;
        }

        public checkMailRemind() {
            let self = this;
            self.updateFeedBackHint();
            self.updateMailHint();
            self.updateMailsLen();//在不改原有逻辑上记录邮件数量
            if (self._model.mails_len == null) {
                return;
            }
            if (self._model.mails_len[0] <= self._model.curMailsLen[0] ||
                (self._model.mails_len[2] <= self._model.curMailsLen[2]) && self._model.isMaxProp) {
                self._model.coolTime = TimeMgr.time.serverTimeSecond + MailRemindTime;
            } else {
                self._model.coolTime = null;
            }

        }

        //计算主界面红点逻辑   基于邮件未领取条件下 1、邮件中有道具 2、邮件未浏览
        private updateMailHint(): void {
            let ret1 = false;
            let ret2 = false;
            for (let v of this._model.mails) {
                //是否有道具
                let isHasItem = v.attachments && v.attachments.length > 0;
                if (v.is_taken == 0 && (v.is_readed == 0 || isHasItem)) {
                    if (v.mail_type == 1) {
                        ret1 = true;
                    }
                    if (v.mail_type == 2) {
                        ret2 = true;
                    }
                    if (ret1 && ret2) {
                        break;
                    }
                }
            }

            HintMgr.setHint(ret1, [ModName.Mail, MailViewType.MailMain + MailMainBtnType.BtnMail]);
            HintMgr.setHint(ret2, [ModName.Mail, MailViewType.MailMain + MailMainBtnType.BtnGMMail]);
        }

        public getList(type: number = this.type): mail_data[] {
            let list: mail_data[] = [];
            for (let mail of this._model.mails) {
                if (mail.mail_type == type) {
                    list.push(mail);
                }
            }
            return list.sort((a, b) => {
                if (a.is_taken != b.is_taken) {
                    return a.is_taken ? 1 : -1;
                }
                return b.send_time - a.send_time;
            });
        }

        public get type(): number {
            return this._model.type;
        }

        public set type(val: number) {
            this._model.type = val;
        }

        /*******************************意见反馈***************************/
        private updateFeedBackHint(): void {
            let hint = this.checkFeedBackHint();
            if (hint != this.feedBackHint) {
                this._model.feedBackHint = hint;
                // this.sendNt(ActivityEvent.ON_ACT_HINT_UPDATE);
            }
            //this.sendNt(ActivityEvent.ON_ACTIVITY_ICON_HINT, ViewEnterIcon.feedback_icon);
        }

        private checkFeedBackHint(): boolean {
            for (let i of this.answerMail) {
                if (!i.is_readed) {
                    return true;
                }
            }
            return false;
        }

        public get feedBackHint(): boolean {
            return this._model.feedBackHint;
        }

        /**意见反馈答复邮件*/
        public get answerMail(): mail_data[] {
            let mails: mail_data[] = [];
            for (let i of this.mails) {
                if (i.is_feedback) {
                    mails.push(i);
                }
            }
            return mails.sort(this.sortMail);
        }

        private sortMail(a: mail_data, b: mail_data): number {
            if (a.is_readed != b.is_readed) {
                return a.is_readed == 0 ? -1 : 1;
            }
            if (a.send_time != b.send_time) {
                return a.send_time > b.send_time ? -1 : 1;
            }
            return 0;
        }

        /*******************************意见反馈***************************/
    }
}
