
export function timeStampNow() {
    var timestamp = Date.parse(new Date());
    return timestamp / 1000
}