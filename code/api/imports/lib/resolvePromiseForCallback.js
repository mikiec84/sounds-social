export const resolvePromiseForCallback = (res, rej) => (err, data) => (err ? rej(err) : res(data))
