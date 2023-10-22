/** @internal */


namespace game.login {
    import HtmlTextParser = egret.HtmlTextParser;
    import StringUtil = game.StringUtil;
    import Mdr = base.Mdr;
    import TouchEvent = egret.TouchEvent;
    import TextFieldBase = uilib.TextFieldBase;
    import Pool = base.Pool;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import Group = eui.Group;

    export class NoticePanelMdr extends Mdr implements UpdateItem {
        /** @internal */ private _view: NoticePanel = this.mark("_view", NoticePanel);

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {

        }

        protected addListeners(): void {
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.hide);
        }


        protected onShow(): void {
            let txt = this._showArgs;

            let v = this._view;
            v.x = (v.parent.width - v.width) / 2;
            v.y = (v.parent.height - v.height) / 2;

            if (null == gso.updateNotice && !txt) {
                return;
            }
            if (this._view.labelContainer.numChildren) {
                this.clearLabContainer();
            }
            // if (this._view.labelContainer.numChildren) {
            //     this._view.labelContainer.removeChildren();
            // }


            /** TODO 公告修改前原代码 */

            let txtList = txt? txt.replace(/\r/g, "").split("\n") : gso.updateNotice.notice.replace(/\r/g, "").split("\n");
            // let _str: string =
            //     "注意：由于目前内网尚无公告，此公告乃<font color='#ff0000'>测试用，测试完成后需要联系客户端开发删除<\/font>" +
            //     "\n" +
            //     "<font size='24'>亲爱的玩家您好，我们将于“<font color='#ff0000'>2020年5月27日19：00”</font>。预计更新时间为“2小时”，视进度可提前或延后完成。停服期间，您将无法登录游戏。更新维护结束，将为您献上停服维护补偿。</font></font> " +
            //     "\n" +
            //     "<font size='24'>感谢您的理解和支持，我们将能力为您带来优秀的游戏体验！！</font>" +
            //     "\n" +
            //     "<title>一     本次更新\n" +
            //     "$【1】 五行元神\n" +
            //     "   本次更新新增“元神”,开服满7日的区服自动开启；\n" +
            //     "$【2】 通天塔\n" +
            //     "      超难度副本，建议组队挑战，通过可获取稀有装备与特殊精灵扭蛋。\n" +
            //     "<title>一     优化相关\n" +
            //     "$装备分解\n" +
            //     "新增多余装备分解活动和玩法\n" +
            //     "新增多余装备分解活动和玩法\n" +
            //     "$背包上限增加 \n" +
            //     "解放背包让你在摸金之旅更进一步\n" +
            //     "<title>一     后续预告\n" +
            //     "$午门试炼\n" +
            //     "万奴王携万妖来袭，和帮众一起守护九门\n" +
            //     "$万妖禁地\n" +
            //     "万妖禁地，魑魅魍魉，一关一险，谁才是禁地之王！\n" +
            //     "<font size='24'>亲爱的玩家,感谢您们一直以来对游戏的支持和热爱,我们将会持续为您带来更好的游戏体验！<\/font>"
            // let txtList = _str.replace(/\r/g, "").split("\n")
            for (let txt of txtList) {
                let lab: TextFieldBase = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 13;
                lab.lineSpacing = 6;
                lab.width = 550;
                lab.bold = true;
                if (txt.charAt(0) === "$") {
                    lab.name = "1";
                    lab.textColor = 0x426e7b;
                    lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt.substring(1)));
                    lab.size = 20;
                } else if (txt.indexOf("<title>") > -1) {
                    lab.name = "2";
                    let gr: Group = Pool.alloc(Group);
                    gr.height = 48;
                    gr.width = 202;

                    // 标题图片
                    let img: BitmapBase = Pool.alloc(BitmapBase);
                    img.source = "common_titleBg24";
                    img.x = lab.x;
                    img.y = 5;
                    gr.addChild(img);

                    // 标题内容
                    txt = txt.replace("<title>", " ");
                    lab.textColor = 0xffffff;
                    lab.stroke = 2;
                    lab.strokeColor = 0x426e7b;
                    lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt.substring(1)));
                    lab.size = 22;
                    lab.y = 15;
                    lab.x = (202 - lab.textWidth) * 0.5 + img.x;
                    gr.addChild(lab);
                    this._view.labelContainer.addChild(gr);
                    continue;
                } else {
                    lab.textColor = 0x426e7b;
                    lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt));
                    lab.size = 20;
                    // lab.x = 59;
                }
                this._view.labelContainer.addChild(lab);
            }
            this._view.labelContainer.touchChildren = false;
            this._view.labelContainer.touchEnabled = false;
            TimeMgr.addUpdateItem(this, 100);
        }

        private clearLabContainer(): void {
            while (this._view.labelContainer.numChildren) {
                let child = this._view.labelContainer.removeChildAt(0);
                if (child instanceof TextFieldBase) {
                    child.name = "";
                }
                Pool.release(child);
            }
        }

        protected onHide(): void {
            this.clearLabContainer();
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        update(time: base.Time): void {
            this.updateLabY();
            TimeMgr.removeUpdateItem(this);
        }


        private updateLabY(): void {
            let num = this._view.labelContainer.numChildren;
            let labY: number = 5;
            let labList = [] = this._view.labelContainer.$children.concat();
            for (let i = 0; i < num; ++i) {
                let lab = labList[i];///as TextFieldBase
                if (lab.name == "1") {
                    lab.y = labY + 6;
                    labY = lab.y + lab.height + 10;
                    // let img = Pool.alloc(BitmapBase);
                    // img.touchEnabled = false;
                    // img.source = "assets/ui_png/notice_title_bg.png";
                    // img.y = lab.y - 20;
                    // this._view.labelContainer.addChildAt(img, 0);
                } else if (lab.name == "2") {
                    // lab.y = labY + 30;
                    // labY = lab.y + lab.height + 6;
                } else {
                    lab.y = labY;
                    labY = lab.y + lab.height + 6;
                }
            }
        }
    }
}
