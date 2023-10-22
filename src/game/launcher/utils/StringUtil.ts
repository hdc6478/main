namespace game {
    export class StringUtil {
        public static ChineseNum: string[] = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        public static ChineseWeekNum: string[] = ["日", "一", "二", "三", "四", "五", "六", "日"];
        public static ChineseWeekNum2: string[] = ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"];

        /**
         * 拼接字符串，比如将 "1" 拼成 "0001"
         * @param {string} str
         * @param {number} totalLen
         * @param {string} paddingChar
         * @returns {string}
         */
        public static padString(str: string, totalLen: number, paddingChar: string = "0"): string {
            let n: number = +totalLen | 0;
            if (paddingChar == null || n == 0) {
                return str;
            }
            let i: number;
            let buf: string[] = [];
            for (i = 0, n = Math.abs(n) - str.length; i < n; i++) {
                buf.push(paddingChar);
            }
            if (totalLen < 0) {
                buf.unshift(str);
            } else {
                buf.push(str);
            }
            return buf.join("");
        }

        /**
         * 替代字符串
         * @param str
         * @param params
         */
        public static substitute(str: string, params: (string | number)[]): string {
            if (str == null || params == null || params.length == 0) {
                return str;
            }
            for (let i: number = 0, len: number = params.length; i < len; i++) {
                str = str.replace("%s", params[i] && params[i].toString());
            }
            return str;
        }

        /** @internal */
        public static setColorStr(data: { GRAY: string, YELLOW: string, WHITE: string, GREEN: string, BLUE: string, PURPLE: string, ORANGE: string, RED: string, PINK: string }) {
            let keyList: string[] = Object.keys(this._colorData);
            for (let i = 0, len = keyList.length; i < len; i++) {
                this._colorData[keyList[i]] = "<font color='" + data[keyList[i]] + "'>";
            }
            // this._colorData.WHITE = "<font color='" + data.WHITE + "'>";
            // this._colorData.GREEN = "<font color='" + data.GREEN + "'>";
            // this._colorData.BLUE = "<font color='" + data.BLUE + "'>";
            // this._colorData.PURPLE = "<font color='" + data.PURPLE + "'>";
            // this._colorData.ORANGE = "<font color='" + data.ORANGE + "'>";
            // this._colorData.RED = "<font color='" + data.RED + "'>";
            // this._colorData.GRAY = "<font color='" + data.GRAY + "'>";
            // this._colorData.YELLOW = "<font color='" + data.YELLOW + "'>";
            // this._colorData.PINK = "<font color='" + data.PINK + "'>";
        }

        /** @internal */
        public static setColorStr2(data: { GRAY: string, YELLOW: string, WHITE: string, GREEN: string, BLUE: string, PURPLE: string, ORANGE: string, RED: string, PINK: string }) {
            let keyList: string[] = Object.keys(this._colorData2);
            for (let i = 0, len = keyList.length; i < len; i++) {
                this._colorData2[keyList[i]] = "<font color='" + data[keyList[i]] + "'>";
            }
        }

        /** @internal */
        private static _colorData: { GRAY: string, YELLOW: string, WHITE: string, GREEN: string, BLUE: string, PURPLE: string, ORANGE: string, RED: string, PINK: string } = {
            GRAY: "",
            YELLOW: "",
            WHITE: "",
            GREEN: "",
            BLUE: "",
            PURPLE: "",
            ORANGE: "",
            RED: "",
            PINK: ""
        };

        /** @internal */
        private static _colorData2: { GRAY: string, YELLOW: string, WHITE: string, GREEN: string, BLUE: string, PURPLE: string, ORANGE: string, RED: string, PINK: string } = {
            GRAY: "",
            YELLOW: "",
            WHITE: "",
            GREEN: "",
            BLUE: "",
            PURPLE: "",
            ORANGE: "",
            RED: "",
            PINK: ""
        };

        /** @internal */ private static RegN: RegExp = /#N/g;
        /** @internal */ private static RegEnd: RegExp = /#end/g;
        /** @internal */ private static RegG: RegExp = /#G/g;
        /** @internal */ private static RegY: RegExp = /#Y/g;
        /** @internal */ private static RegW: RegExp = /#W/g;
        /** @internal */ private static RegB: RegExp = /#B/g;
        /** @internal */ private static RegP: RegExp = /#P/g;
        /** @internal */ private static RegO: RegExp = /#O/g;
        /** @internal */ private static RegR: RegExp = /#R/g;
        /** @internal */ private static RegI: RegExp = /#I/g;
        /** @internal */ private static RegH: RegExp = /#H/g;
        /** @internal */ private static RegSp: RegExp = /#SP/g;//空格
        /** @internal */ private static RegDefined: RegExp = /#(0x[a-fA-F0-9]{6})/gi;


        /**
         * 颜色符号替换颜色
         * @param str
         * @param isWhite
         */
        public static replaceColorCode(str: string, isWhite: boolean = false): string {
            if (typeof str !== "string") {
                return str;
            }
            str = str.replace(this.RegN, "\n")
                .replace(this.RegSp, " ")
                .replace(this.RegEnd, "</font>")
                .replace(this.RegW, isWhite ? this._colorData2.WHITE : this._colorData.WHITE)
                .replace(this.RegY, isWhite ? this._colorData2.YELLOW : this._colorData.YELLOW)
                .replace(this.RegG, isWhite ? this._colorData2.GREEN : this._colorData.GREEN)
                .replace(this.RegB, isWhite ? this._colorData2.BLUE : this._colorData.BLUE)
                .replace(this.RegP, isWhite ? this._colorData2.PURPLE : this._colorData.PURPLE)
                .replace(this.RegO, isWhite ? this._colorData2.ORANGE : this._colorData.ORANGE)
                .replace(this.RegR, isWhite ? this._colorData2.RED : this._colorData.RED)
                .replace(this.RegI, isWhite ? this._colorData2.PINK : this._colorData.PINK)
                .replace(this.RegH, isWhite ? this._colorData2.GRAY : this._colorData.GRAY)
                .replace(this.RegDefined, "<font color='$1'>");

            return str;
        }

        public static getNumByString(str: string): number[] {
            let numArr = str.match(/\d+/g);
            return numArr.map(Number);
        }

        /**
         * 伤害数值   转成带单位
         * @param hurt
         */
        public static getHurtNumStr(hurt: number): string {
            let resStr: string = "";
            // 6 10  14  18  22
            // let arr:string[] = ["万","亿","万亿","兆","万兆"];
            let len = hurt.toString().length;
            if (len < 6) {
                resStr = hurt.toString();
            } else if (len < 9) {
                resStr = Math.floor(hurt / 10000).toString() + "万";
            } else if (len < 13) {
                //resStr = Math.floor(hurt / 100000000).toString() + "亿";
                resStr = (Math.floor(hurt / 10000000)/10).toString()+ "亿";
            } else if (len < 17) {
                resStr = Math.floor(hurt / 1000000000000).toString() + "万亿";
            } else if (len < 21) {
                resStr = Math.floor(hurt / 10000000000000000).toString() + "兆";
            } else {
                resStr = Math.floor(hurt / 100000000000000000000).toString() + "万兆";
            }

            return resStr;
        }

        /**
         * 战力数值转换，带有单位
         * 超过百万显示“万”，超过亿显示“亿”
         * @param power 战力值
         * @param fractionDigits 保留小数点后几位，默认不保留
         * @param preStr 战力值前文本，默认空
         * @param minionNum 默认百万才显示万，7
         */
        public static getPowerNumStr(power: number, fractionDigits?: number, preStr?: string, minionNum: number = 7): string {
            let res: number = 0;
            let resStr: string = "";
            let unit: string = "";//单位
            let len = power.toString().length;
            if (len < minionNum) {
                res = power;
            } else if (len < 9) {
                unit = "万";
                res = power / 10000;
            } else {
                unit = "亿";
                res = power / 100000000;
            }

            //保留小数点后几位
            if (fractionDigits) {
                resStr = res.toFixed(fractionDigits);
                let dotIndex = resStr.indexOf('.');
                let digitsStr = resStr.slice(dotIndex + 1);//截取小数点后面几位
                //若小数部分是0，则过滤
                if (+digitsStr == 0) {
                    resStr = resStr.slice(0, dotIndex);
                }
            } else {
                resStr = Math.floor(res).toString();
            }

            return (preStr ? preStr : '') + resStr + unit;
        }

        private static units = '个十百千万@#%亿^&~';
        private static chars = '零一二三四五六七八九';

        /**阿拉伯转中文 */
        public static getCNBynumber(number: number): string {
            var a = (number + '').split(''), s = [], t = this;
            if (a.length > 12) {
                throw new Error('too big');
            } else {
                for (var i = 0, j = a.length - 1; i <= j; i++) {
                    if (j == 1 || j == 5 || j == 9) {//两位数 处理特殊的 1*
                        if (i == 0) {
                            if (a[i] != '1') s.push(t.chars.charAt(+a[i]));
                        } else {
                            s.push(t.chars.charAt(+a[i]));
                        }
                    } else {
                        s.push(t.chars.charAt(+a[i]));
                    }
                    if (i != j) {
                        s.push(t.units.charAt(j - i));
                    }
                }
            }
            //return s;
            return s.join('').replace(/零([十百千万亿@#%^&~])/g, function (m, d, b) {//优先处理 零百 零千 等
                b = t.units.indexOf(d);
                if (b != -1) {
                    if (d == '亿') return d;
                    if (d == '万') return d;
                    if (a[j - b] == '0') return '零';
                }
                return '';
            }).replace(/零+/g, '零').replace(/零([万亿])/g, function (m, b) {// 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
                return b;
            }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function (m) {
                return {'@': '十', '#': '百', '%': '千', '^': '十', '&': '百', '~': '千'}[m];
            }).replace(/([亿万])([一-九])/g, function (m, d, b, c) {
                c = t.units.indexOf(d);
                if (c != -1) {
                    if (a[j - c] == '0') return d + '零' + b;
                }
                return m;
            });

        }
    }
}