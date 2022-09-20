export const dateFormat = (data:number) => {
    const result = data.toString().concat('000');
    let DateFormat = new Date(Number(result));
    let format = DateFormat.toISOString().split('T')[0];
    return format;
}