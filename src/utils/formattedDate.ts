export default function formattedDate(date: Date): string {
    const currentDate = new Date();
    const seconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 364);

    if (years) {
        return `${years}y`;
    } else if (days) {
        return `${days}d`;
    } else if (hours || minutes || seconds) {
        const formattedDateString = date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZoneName: 'short',
        });

        return formattedDateString.replace(',', '');
    } else {
        return 'Just now';
    }
}
