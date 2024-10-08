import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
export function formatDateString(date?: string) {
    if (!date) return '';
    const toDate = new Date(date);
    const formattedDate = format(toDate, "dd MMMM", { locale: enUS });
    return formattedDate;
}