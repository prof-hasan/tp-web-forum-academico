function formatDateTime(dateTime?: string): string {
    if(!dateTime) return '';
    const date = new Date(dateTime);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false 
    };

    const formattedDate = date.toLocaleDateString('pt-BR', options);

    return `${formattedDate}`;
}

export { formatDateTime };