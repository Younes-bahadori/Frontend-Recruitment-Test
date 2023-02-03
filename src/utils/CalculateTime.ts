export const calculateTime = (date: number) => {
    const now = new Date().getTime()
    const differenceTime = Math.abs(now - date);

    const ms_Min = 60 * 1000;
    const ms_Hour = ms_Min * 60;
    const ms_Day = ms_Hour * 24;
    const ms_Mon = ms_Day * 30;
    const ms_Yr = ms_Day * 365;
    if (differenceTime < ms_Min) {
        return Math.round(differenceTime / 1000) + 's ago';

    } else if (differenceTime < ms_Hour) {
        return Math.round(differenceTime / ms_Min) + 'm ago';

    } else if (differenceTime < ms_Day) {
        return Math.round(differenceTime / ms_Hour) + 'h ago';

    } else if (differenceTime < ms_Mon) {
        return Math.round(differenceTime / ms_Day) + 'd ago';

    } else if (differenceTime < ms_Yr) {
        return 'Around ' + Math.round(differenceTime / ms_Mon) + 'months ago';
    } else {
        return 'Around ' + Math.round(differenceTime / ms_Yr) + 'years ago';
    }
}

export default {
    calculateTime
}