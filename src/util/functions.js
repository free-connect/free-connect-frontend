export const siftPhone = (val) => {
    val = val.split(/[^\d]/gi).join('');
    return val
};