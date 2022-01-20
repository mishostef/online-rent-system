import axios from "axios";

export function getDateString(ddate: Date | string) {
    const date = typeof ddate == 'string' ? new Date(ddate): ddate;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const m = month > 9 ? `${month}` : `0${month}`;
    const d = day > 9 ? `${day}` : `0${day}`;
    return `${year}-${m}-${d}`
}

 export async function sendData(url: string, method: string, formData: FormData) {
    return await axios({
        method: method === 'post' ? 'post' : 'put',
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    });
}