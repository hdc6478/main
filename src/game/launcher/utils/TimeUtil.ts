namespace game {
    import getTimer = egret.getTimer;
    import TimeMgr = base.TimeMgr;

    export const Second = {
        Day: 86400,
        Hour: 3600,
        Minute: 60,
    };

    const WeekChinese = ["日", "一", "二", "三", "四", "五", "六", "日"];

    const WeekName = [
        LauncherLan.Week_0,
        LauncherLan.Week_1,
        LauncherLan.Week_2,
        LauncherLan.Week_3,
        LauncherLan.Week_4,
        LauncherLan.Week_5,
        LauncherLan.Week_6,
        LauncherLan.Week_0,
    ];

    const ZhouName = [
        LauncherLan.Zhou_0,
        LauncherLan.Zhou_1,
        LauncherLan.Zhou_2,
        LauncherLan.Zhou_3,
        LauncherLan.Zhou_4,
        LauncherLan.Zhou_5,
        LauncherLan.Zhou_6,
        LauncherLan.Zhou_0,
    ];


    export class TimeUtil {
        /** @internal */ private static frameInc: number = 0;
        /** @internal */ private static lastTimer: number = 0;

        /** @internal */ private static SHIFT: number = 200;

        public static getSyncTimer(): number {
            let self = this;
            let timer: number = getTimer();
            if (self.frameInc == self.SHIFT) {
                self.frameInc = 0;
            }
            if (timer != self.lastTimer) {
                self.frameInc = 0;
                self.lastTimer = timer;
            }

            return timer * self.SHIFT + self.frameInc++;
        }

        /** @internal */ private static _tmpDate: Date = new Date();
        /** @internal */ private static _tmpObj: { [key: string]: string } = {};

        /** @internal */ private static _tmpReplacer(k: string): string {
            let obj = TimeUtil._tmpObj;
            let type = k.charAt(0);
            let v = obj[type];
            if (type === "E") {
                let day = WeekChinese.indexOf(v);
                return k.length <= 2 ? ZhouName[day] : WeekName[day];
            }
            if (v.length < k.length) {
                return StringUtil.padString(v, k.length);
            }
            return v;
        }

        /**
         * 格式化时间戳，毫秒
         * @param {number} time 时间戳，毫秒
         * @param {string} [format=yyyy-MM-dd HH:mm:ss.SSS] y年，q季，M月，E星期，d日，h时（12小时），H时，m分，s秒，S毫秒
         * @returns {string}
         */
        public static formatTime(time: number, format: string = "yyyy-MM-dd HH:mm:ss.SSS"): string {
            let date: Date = this._tmpDate;
            date.setTime(time);
            let obj = this._tmpObj;
            obj["y"] = "" + date.getFullYear();
            obj["q"] = "" + Math.floor((date.getMonth() + 3) / 3);
            obj["M"] = "" + (date.getMonth() + 1);
            obj["E"] = WeekChinese[date.getDay()];
            obj["d"] = "" + date.getDate();
            obj["h"] = "" + (date.getHours() % 12 === 0 ? 12 : date.getHours() % 12);
            obj["H"] = "" + date.getHours();
            obj["m"] = "" + date.getMinutes();
            obj["s"] = "" + date.getSeconds();
            obj["S"] = "" + date.getMilliseconds();
            return format.replace(/y+|q+|M+|E+|d+|h+|H+|m+|s+|S+/g, this._tmpReplacer);
        }

        /**
         * 格式化时间戳，秒
         * @param {number} second 时间戳，秒
         * @param {string} [format=yyyy-MM-dd HH:mm:ss] y年，q季，M月，E星期，d日，h时（12小时），H时，m分，s秒，S毫秒
         * @returns {string}
         */
        public static formatTimeSecond(second: number, format: string = "yyyy-MM-dd HH:mm:ss"): string {
            return this.formatTime(second * 1000, format);
        }

        /**
         * 格式化剩余时间，秒
         * @param {number} second 时间，秒
         * @param {string} [format=dd:HH:mm:ss] d日，H时，m分，s秒
         * @param {boolean} adaption 是否自适应，比如显示d日，H时的，小于一小时时显示成m分，s秒
         * @returns {string}
         */
        public static formatSecond(second: number, format: string = "dd:HH:mm:ss", adaption: boolean = false): string {
            let obj = this._tmpObj;
            let remain: number = second;
            if (adaption) {
                if (remain < Second.Hour) {
                    format = "m分s秒";//转换显示文本
                } else if (remain < Second.Day) {
                    format = "H时m分";//转换显示文本
                }
            }
            obj["y"] = "";
            obj["q"] = "";
            obj["M"] = "";
            obj["E"] = "";
            if (format.indexOf("d") > -1) {
                obj["d"] = "" + Math.floor(remain / Second.Day);
                remain = remain % Second.Day;
            } else {
                obj["d"] = "";
            }
            obj["h"] = "";
            if (format.indexOf("H") > -1) {
                obj["H"] = "" + Math.floor(remain / Second.Hour);
                remain = remain % Second.Hour;
            } else {
                obj["H"] = "";
            }
            if (format.indexOf("m") > -1) {
                obj["m"] = "" + Math.floor(remain / Second.Minute);
                remain = remain % Second.Minute;
            } else {
                obj["m"] = "";
            }
            if (format.indexOf("s") > -1) {
                obj["s"] = "" + Math.floor(remain % Second.Minute);
            } else {
                obj["s"] = "";
            }
            obj["S"] = "";
            return format.replace(/y+|M+|d+|H+|m+|s+|S+/g, this._tmpReplacer);
        }

        /**
         * 格式化时间戳，周几（0~6：周日~周六）
         * @param {number} time 时间戳，毫秒
         * @returns {number}
         */
        public static formatWeekday(time: number) {
            let date: Date = this._tmpDate;
            date.setTime(time);
            return date.getDay();
        }

        /**
         * 格式化时间戳，小时（0~23）
         * @param {number} time 时间戳，毫秒
         * @returns {number}
         */
        public static formatHours(time: number) {
            let date: Date = this._tmpDate;
            date.setTime(time);
            return date.getHours();
        }

        /**服务器时间*/
        public static getServerTime() {
            let date: Date = this._tmpDate;
            date.setTime(TimeMgr.time.serverTime);
            return date;
        }

        /**
         * 获取几天后的时间戳，会初始化到0点
         * @param {number} begin 开始时间戳
         * @param {boolean} isMillisecond 是否毫秒
         * @param {number} day 几天后
         * @returns {number}
         */
        public static getNextDayTime(begin: number, isMillisecond?: boolean, day: number = 0): number {
            if (!isMillisecond) {
                begin = begin * 1000;
            }

            let date: Date = new Date(begin);
            date.setHours(0, 0, 0, 0);
            return 60 * 60 * 24 * day + (date.getTime() / 1000);
        }

        /**获取星期一0点时间戳(秒) */
        public static getNextWeekTime(): number {
            let today: number = Math.floor(new Date(this.getServerTime().toLocaleDateString()).getTime() / 1000);
            let day: number = this.getServerTime().getDay() || 7;
            let nextWeek: number = today + (7 - day + 1) * Second.Day;
            // let week: number = nextWeek - (nextWeek % Second.Day) - Second.Hour * 8;
            return nextWeek;
        }

        /**time 单位为秒 */
        public static getSecondByTomorrow(time: number): number {
            let ms = time * 1000;
            // 获取当前时间戳
            const now = new Date(ms).getTime();
            // 获取今天晚上的0点时间戳
            const tonight = new Date(ms).setHours(24, 0, 0, 0);
            // 如果当前时间已经过了今晚的0点，则计算明天晚上的0点
            const target = now > tonight ? new Date(ms).setHours(48, 0, 0, 0) : tonight;
            // 计算距离目标时间戳的秒数
            return Math.floor((target - now) / 1000);
        }

        /**
         * 离线多久
         * */
        public static getLeaveTime(lastTime: number): string {
            let leaveTime: number = TimeMgr.time.serverTimeSecond - lastTime;
            let day: number = Math.floor(leaveTime / Second.Day);
            let hour: number = Math.floor(leaveTime / Second.Hour);
            if (day > 0) {
                return `${day > 7 ? 7 : day}天前`;
            }
            if (hour <= 0) {
                return "刚刚离线";
            } else {
                return `${hour}小时前`;
            }
        }

        /**
         * 供奉时间文本转换
         * */
        public static getConsecrateTime(seconds: number): string {
            let format: string = "";
            if (seconds >= Second.Day) {
                format = "d天";
            } else if (Second.Hour <= seconds && seconds < Second.Day) {
                format = "H时";
            } else {
                format = "m分";
                if (seconds < Second.Minute) {
                    seconds = Second.Minute;
                }
            }
            return this.formatSecond(seconds, format);
        }

    }
}
