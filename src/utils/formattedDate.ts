export default function formattedDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short',
    };

    const formattedDateString = date.toLocaleString('en-US', options);
    return formattedDateString;
}
