export type rsData<T> = {
    message: string,
    result: T,
}

export type rsDataFrappe<T> = {
    message: T,
    results?: T,
}