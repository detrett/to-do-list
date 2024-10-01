import { startOfToday, format } from "date-fns";

export function getToday() {
    const dateString = startOfToday();
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
}

export function formatDate(date) {
    return format(date, "PPP");
}