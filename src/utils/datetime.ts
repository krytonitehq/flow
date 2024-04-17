class DateTime {
    private date: Date;

    constructor(date?: Date | string) {
        if (date) {
            if (typeof date === 'string') {
                this.date = new Date(date);
            } else {
                this.date = new Date(date);
            }
        } else {
            this.date = new Date();
        }
    }

    public format(formatString: string): string {
        const year = this.date.getFullYear();
        const month = this.padZero(this.date.getMonth() + 1);
        const day = this.padZero(this.date.getDate());
        const hour = this.padZero(this.date.getHours());
        const minute = this.padZero(this.date.getMinutes());
        const second = this.padZero(this.date.getSeconds());

        return formatString
            .replace('YYYY', year.toString())
            .replace('MM', month)
            .replace('DD', day)
            .replace('hh', hour)
            .replace('mm', minute)
            .replace('ss', second);
    }

    private padZero(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }

    public addDays(days: number): void {
        this.date.setDate(this.date.getDate() + days);
    }

    public addHours(hours: number): void {
        this.date.setHours(this.date.getHours() + hours);
    }

    public addMinutes(minutes: number): void {
        this.date.setMinutes(this.date.getMinutes() + minutes);
    }

    public addSeconds(seconds: number): void {
        this.date.setSeconds(this.date.getSeconds() + seconds);
    }

    public toDate(): Date {
        return new Date(this.date);
    }
}

export default DateTime;
