export function DateToMomentsAgo(date: Date) {
    const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000);

    if (secondsAgo < 60) {
        return secondsAgo + "s ago";
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
        return minutesAgo + "m ago";
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
        return hoursAgo + "h ago";
    }

    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
        return daysAgo + "d ago";
    }

    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
        return weeksAgo + "w ago";
    }

    const monthsAgo = Math.floor(daysAgo / 30);
    // if (monthsAgo < 12) {
    //     return monthsAgo + "M ago";
    // }

    const yearsAgo = Math.floor(monthsAgo / 12);
    return yearsAgo + "y ago";
}

export function parseHour(h: string): string {
    const n = Number.parseInt(h);
    if (n > 12) return (n - 12).toString();
    return h;
}

export function parseMeridian(h: string): string {
    const n = Number.parseInt(h);
    if (n > 12) return "PM";
    return "AM"
}