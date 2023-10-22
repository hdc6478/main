namespace game {
    export const enum ActionName {
        ATTACK = "atk",
        RUN = "run",
        DIE = "die",
        JUMP = "jmp",
        STAND = "std",
        SIT = "sit",
        HIT = "hit",
        RIDE = "ride",
    }

    export const enum Direction {
        NONE = 0,
        UP = 1,
        RIGHT_UP = 2,
        RIGHT = 3,
        RIGHT_DOWN = 4,
        DOWN = 5,
        LEFT_DOWN = 6,
        LEFT = 7,
        LEFT_UP = 8,
    }

    export const MirDir = {
        [Direction.LEFT]: Direction.RIGHT,
        [Direction.LEFT_UP]: Direction.RIGHT_UP,
        [Direction.LEFT_DOWN]: Direction.RIGHT_DOWN,
    };

    export const ReversalDir = {
        [Direction.RIGHT]: Direction.LEFT,
        [Direction.RIGHT_UP]: Direction.LEFT_DOWN,
        [Direction.UP]: Direction.DOWN,
        [Direction.LEFT_UP]: Direction.RIGHT_DOWN,
        [Direction.LEFT]: Direction.RIGHT,
        [Direction.LEFT_DOWN]: Direction.RIGHT_UP,
        [Direction.DOWN]: Direction.UP,
        [Direction.RIGHT_DOWN]: Direction.LEFT_UP,
    };
    /** 2面资源 纯向左向右时，考虑不切换方向 */
    export const MirDirFor2 = {
        [Direction.UP]: Direction.RIGHT_UP,
        [Direction.LEFT]: Direction.RIGHT_UP,
        [Direction.LEFT_UP]: Direction.RIGHT_UP,
        [Direction.LEFT_DOWN]: Direction.RIGHT_DOWN,
        [Direction.RIGHT]: Direction.RIGHT_DOWN,
        [Direction.DOWN]: Direction.RIGHT_DOWN,
    };

    /** 3面资源 纯向左向右时，考虑不切换方向 */
    export const MirDirFor3 = {
        [Direction.UP]: Direction.RIGHT_UP,
        [Direction.LEFT]: Direction.RIGHT,
        [Direction.LEFT_UP]: Direction.RIGHT_UP,
        [Direction.LEFT_DOWN]: Direction.RIGHT_DOWN,
        [Direction.DOWN]: Direction.RIGHT_DOWN,
    };

    export const AlterXDirs2 = {
        [Direction.LEFT]: -1,
        [Direction.LEFT_UP]: -1,
        [Direction.LEFT_DOWN]: -1,
        [Direction.DOWN]: -1
    };

    export const AlterXDirs3 = {
        [Direction.LEFT]: -1,
        [Direction.LEFT_UP]: -1,
        [Direction.LEFT_DOWN]: -1,
        [Direction.UP]: -1
    };

    export const DefaultSortOrder: number[] = [ConfigHead.Horse, ConfigHead.Wing, ConfigHead.Body, ConfigHead.Huashen, ConfigHead.Weapon, ConfigHead.Huashen2, ConfigHead.Horse2];
    let SortStdDir: { [key: number]: number[] };
    let SortOtherDir: { [key: number]: number[] };

    export function getSortOrder(dir: number, actionName: string = ActionName.STAND): number[] {
        let last_dir = MirDir[dir] ? MirDir[dir] : dir;
        if (SortStdDir == null) {
            SortStdDir = {};
            SortStdDir[Direction.RIGHT_UP] = [ConfigHead.Horse, ConfigHead.Body, ConfigHead.Huashen, ConfigHead.Weapon, ConfigHead.Huashen2, ConfigHead.Wing, ConfigHead.Horse2];
            SortStdDir[Direction.RIGHT] = [ConfigHead.Horse, ConfigHead.Wing, ConfigHead.Body, ConfigHead.Huashen, ConfigHead.Weapon, ConfigHead.Huashen2, ConfigHead.Horse2];
            SortStdDir[Direction.RIGHT_DOWN] = [ConfigHead.Horse, ConfigHead.Wing, ConfigHead.Body, ConfigHead.Huashen, ConfigHead.Weapon, ConfigHead.Huashen2, ConfigHead.Horse2];
            SortOtherDir = {};
            SortOtherDir[Direction.RIGHT_UP] = [ConfigHead.Horse, ConfigHead.Body, ConfigHead.Huashen, ConfigHead.Weapon, ConfigHead.Huashen2, ConfigHead.Wing, ConfigHead.Horse2];
            SortOtherDir[Direction.RIGHT] = [ConfigHead.Horse, ConfigHead.Body, ConfigHead.Huashen, ConfigHead.Wing, ConfigHead.Weapon, ConfigHead.Huashen2, ConfigHead.Horse2];
            SortOtherDir[Direction.RIGHT_DOWN] = [ConfigHead.Horse, ConfigHead.Wing, ConfigHead.Body, ConfigHead.Huashen, ConfigHead.Weapon, ConfigHead.Huashen2, ConfigHead.Horse2];
        }
        if (actionName == ActionName.STAND) {
            return SortStdDir[last_dir] || DefaultSortOrder;
        } else {
            return SortOtherDir[last_dir] || DefaultSortOrder;
        }
    }

    /** 重剑攻击不显示轻剑 */
    export const AtkNoWeapon: string[] = [
        ActionName.ATTACK + 7,
        ActionName.ATTACK + 8,
        ActionName.ATTACK + 9
    ];
    // /** 骑行不显示跑动作 */
    // export const RideNoRun: number[] = [
    //     ConfigHead.Body,
    //     ConfigHead.Wing,
    //     ConfigHead.Weapon,
    // ];
    /**不放大模型*/
    export const NoScaleSurface: number[] = [
        ConfigHead.Creature,
        ConfigHead.Shenling,
    ];
}
