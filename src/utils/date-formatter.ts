export const dateFormat = (data:string) => {
    let DateFormat = new Date(data);
    let format = DateFormat.toISOString().split('T')[0];
    return format;
}